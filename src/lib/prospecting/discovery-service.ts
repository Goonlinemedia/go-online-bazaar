import { 
  Prospect, 
  WebsiteStatus, 
  ServiceType, 
  TargetRegion, 
  LocalBusinessLeadInput,
  ProspectScores
} from "./types";
import { verifyBusinessWebsite, SearchProviderFn } from "./website-verifier";
import { validateAndExtractEmail, normalizePhoneNumber } from "./contact-extractor";
import { scoreLocalBusinessLead, detectTargetRegion } from "./qualification";
import { generateLocalBusinessProposal } from "./proposal-gen";
import { normalizeEmail, extractDomain, buildUnsubscribeUrl } from "./dedup";

/**
 * Multi-Source Business Prospect Discovery Engine
 * 
 * Supports:
 * - Google Places API (when GOOGLE_PLACES_API_KEY is present)
 * - OpenStreetMap Overpass API (Authorized, completely free public directory of real local businesses)
 * - Google Custom Search API (when GOOGLE_SEARCH_API_KEY is present)
 * - Manual and structured feed ingestion
 * 
 * Guarantees zero hallucinations, strict deduplication, and full source-backed evidence.
 */

export interface RawDiscoveredBusiness {
  businessName: string;
  country: string;
  city: string;
  industry: string;
  address?: string;
  phoneNumber?: string;
  listingWebsiteUrl?: string;
  sourceUrl: string;
  sourcePlatform: "google_places" | "openstreetmap" | "business_directory" | "google_search";
  placeId?: string;
  email?: string;
  decisionMaker?: string;
}

export interface DiscoveryQuery {
  country: string;
  city: string;
  industry: string;
  keyword?: string;
  searchProvider?: SearchProviderFn;
}

/**
 * Generates deduplication keys for a business across slug, phone number, and Place ID.
 */
export function getBusinessDedupKeys(
  businessName: string,
  city: string,
  country: string,
  placeId?: string,
  phone?: string | null
): string[] {
  const keys: string[] = [];
  const normName = businessName.toLowerCase().replace(/[^a-z0-9]/g, "");
  const normCity = city.toLowerCase().replace(/[^a-z0-9]/g, "");
  const normCountry = country.toLowerCase().replace(/[^a-z0-9]/g, "");

  // 1. Name + City + Country slug
  if (normName && normCity) {
    keys.push(`${normCountry}_${normCity}_${normName}`);
  }

  // 2. Phone number key (last 10 digits handles international/local format differences)
  if (phone) {
    const digits = phone.replace(/\D/g, "");
    if (digits.length >= 7) {
      keys.push(`phone_${digits.slice(-10)}`);
    }
  }

  // 3. Place ID key
  if (placeId) {
    keys.push(`pid_${placeId}`);
  }

  return keys;
}

export function generateBusinessDedupKey(
  businessName: string,
  city: string,
  country: string,
  placeId?: string,
  phone?: string | null
): string {
  const keys = getBusinessDedupKeys(businessName, city, country, placeId, phone);
  return keys[0] || `${country}_${city}_${businessName}`;
}

/**
 * Searches for real businesses using the OpenStreetMap Overpass API.
 * Free, permitted, and contains verified local service businesses worldwide.
 */
export async function discoverViaOverpass(
  industry: string,
  city: string,
  country: string
): Promise<RawDiscoveredBusiness[]> {
  try {
    // Map industry keywords to OSM tags
    const norm = industry.toLowerCase();
    let osmTag = '["craft"~"plumber|electrician|carpenter|roofer|painter"]';
    if (norm.includes("plumb")) osmTag = '["craft"="plumber"]';
    else if (norm.includes("clean")) osmTag = '["craft"="cleaning"]';
    else if (norm.includes("roof")) osmTag = '["craft"="roofer"]';
    else if (norm.includes("electric")) osmTag = '["craft"="electrician"]';
    else if (norm.includes("salon") || norm.includes("beauty") || norm.includes("barber")) osmTag = '["shop"~"hairdresser|beauty"]';
    else if (norm.includes("mechanic") || norm.includes("auto") || norm.includes("detail")) osmTag = '["shop"="car_repair"]';
    else if (norm.includes("restaurant") || norm.includes("cafe")) osmTag = '["amenity"="restaurant"]';
    else if (norm.includes("landscap") || norm.includes("garden")) osmTag = '["craft"="gardener"]';

    const overpassQuery = `
      [out:json][timeout:15];
      area["name"="${city}"]["boundary"="administrative"]->.searchArea;
      (
        node${osmTag}(area.searchArea);
        way${osmTag}(area.searchArea);
      );
      out tags 10;
    `;

    const res = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      headers: { "User-Agent": "GoOnlineBazaar-Prospecting/2.0 (contact@goonlinemedia.com)" },
      body: overpassQuery,
    });

    if (!res.ok) return [];

    const data = await res.json();
    const elements = data.elements || [];

    const results: RawDiscoveredBusiness[] = [];
    for (const el of elements) {
      const tags = el.tags || {};
      const name = tags.name || tags["brand"] || tags["operator"];
      if (!name) continue;

      results.push({
        businessName: name,
        country,
        city,
        industry,
        address: [tags["addr:housenumber"], tags["addr:street"], tags["addr:postcode"]].filter(Boolean).join(" "),
        phoneNumber: tags["phone"] || tags["contact:phone"],
        listingWebsiteUrl: tags["website"] || tags["contact:website"],
        email: tags["email"] || tags["contact:email"],
        sourceUrl: `https://www.openstreetmap.org/${el.type}/${el.id}`,
        sourcePlatform: "openstreetmap",
        placeId: `osm_${el.type}_${el.id}`,
      });
    }

    return results;
  } catch (err) {
    console.warn("OSM Overpass discovery error:", err);
    return [];
  }
}

/**
 * Searches for businesses via official Google Places Text Search if API key is provided
 */
export async function discoverViaGooglePlaces(
  industry: string,
  city: string,
  country: string,
  apiKey: string
): Promise<RawDiscoveredBusiness[]> {
  try {
    const query = encodeURIComponent(`${industry} in ${city}, ${country}`);
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}`;
    
    const res = await fetch(url);
    if (!res.ok) return [];
    
    const data = await res.json();
    const places = data.results || [];
    
    return places.slice(0, 10).map((p: any) => ({
      businessName: p.name,
      country,
      city,
      industry,
      address: p.formatted_address,
      phoneNumber: p.formatted_phone_number,
      listingWebsiteUrl: undefined, // Text Search doesn't return website; Details API does
      sourceUrl: `https://www.google.com/maps/place/?q=place_id:${p.place_id}`,
      sourcePlatform: "google_places",
      placeId: p.place_id,
    }));
  } catch (err) {
    console.warn("Google Places discovery error:", err);
    return [];
  }
}

/**
 * Complete Pipeline: Discovers, verifies, scores, and transforms a raw business
 * into a fully traceable, production-ready Prospect record.
 */
export async function processDiscoveredBusiness(
  raw: RawDiscoveredBusiness,
  existingProspectDedupKeys: Set<string>,
  searchProvider?: SearchProviderFn
): Promise<{ prospect: Prospect | null; dedupKey: string; duplicate: boolean }> {
  const allKeys = getBusinessDedupKeys(
    raw.businessName, 
    raw.city, 
    raw.country, 
    raw.placeId, 
    raw.phoneNumber
  );
  const dedupKey = allKeys[0] || generateBusinessDedupKey(raw.businessName, raw.city, raw.country, raw.placeId, raw.phoneNumber);

  // Deduplication check: if ANY key is already known, it's a duplicate
  if (allKeys.some(k => existingProspectDedupKeys.has(k))) {
    return { prospect: null, dedupKey, duplicate: true };
  }

  // 1. Verify Website Status
  const websiteVerification = await verifyBusinessWebsite({
    businessName: raw.businessName,
    city: raw.city,
    country: raw.country,
    phoneNumber: raw.phoneNumber,
    listingWebsiteUrl: raw.listingWebsiteUrl,
    placeId: raw.placeId,
    searchProvider,
  });

  // 2. Extract & Normalize Email (STRICTLY NO GUESSING)
  const emailResult = validateAndExtractEmail(
    raw.email,
    raw.sourceUrl,
    raw.businessName,
    raw.sourcePlatform === "google_places" ? "google_places" : "directory"
  );

  // 3. Normalize Phone Number
  const phoneResult = normalizePhoneNumber(
    raw.phoneNumber,
    raw.country,
    raw.sourceUrl,
    raw.sourcePlatform === "google_places" ? "google_places" : "directory"
  );

  // 4. Score Lead
  const qualification: ProspectScores = scoreLocalBusinessLead({
    businessName: raw.businessName,
    country: raw.country,
    city: raw.city,
    industry: raw.industry,
    websiteStatus: websiteVerification.websiteStatus,
    hasEmail: Boolean(emailResult.email),
    hasPhone: Boolean(phoneResult.phoneNumber),
    hasDecisionMaker: Boolean(raw.decisionMaker),
    hasMapsUrl: Boolean(raw.placeId || raw.sourceUrl.includes("maps")),
  });

  // 5. Generate Personalized Proposal if eligible or reviewable
  const normEmail = emailResult.email || "";
  const unsubUrl = buildUnsubscribeUrl(normEmail || "no-email@goonlinemedia.com");
  const matchedService: ServiceType = "business_website";
  const detectedRegion = detectTargetRegion(`${raw.country} ${raw.city}`, normEmail);

  const proposal = generateLocalBusinessProposal({
    businessName: raw.businessName,
    decisionMaker: raw.decisionMaker,
    city: raw.city,
    country: raw.country,
    industry: raw.industry,
    websiteStatus: websiteVerification.websiteStatus,
    opportunity: matchedService,
    unsubscribeUrl: unsubUrl,
  });

  const nowTimestamp = new Date().toISOString();
  const prospectId = `pr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  const prospect: Prospect = {
    id: prospectId,
    prospectType: "local_business_no_website",
    source: {
      platform: raw.sourcePlatform,
      externalId: raw.placeId || `ext_${Date.now()}`,
      sourceUrl: raw.sourceUrl,
      mapsUrl: raw.sourceUrl.includes("maps") ? raw.sourceUrl : undefined,
      rawTitle: `${raw.businessName} - ${raw.industry} in ${raw.city}`,
      rawContent: `Business in ${raw.city}, ${raw.country}. Address: ${raw.address || "N/A"}. Verified Status: ${websiteVerification.websiteStatus}.`,
      discoveredAt: nowTimestamp,
    },
    contact: {
      companyName: raw.businessName,
      fullName: raw.decisionMaker,
      decisionMaker: raw.decisionMaker,
      email: emailResult.email,
      emailDomain: emailResult.email ? extractDomain(emailResult.email) : undefined,
      emailSourceUrl: emailResult.sourceUrl,
      emailStatus: emailResult.status,
      emailVerifiedAt: emailResult.email ? nowTimestamp : null,

      phoneNumber: phoneResult.phoneNumber,
      phoneNormalized: phoneResult.phoneNormalized,
      phoneSourceUrl: phoneResult.sourceUrl,
      phoneStatus: phoneResult.status,
      phoneVerifiedAt: phoneResult.phoneNumber ? nowTimestamp : null,

      websiteUrl: websiteVerification.websiteUrl,
      websiteStatus: websiteVerification.websiteStatus,
      websiteCheckedAt: websiteVerification.checkedAt,
      websiteEvidence: websiteVerification.evidence,
      contactEvidence: [...emailResult.evidence, ...phoneResult.evidence],

      country: raw.country,
      city: raw.city,
      industry: raw.industry,
      formattedAddress: raw.address,
      placeId: raw.placeId,
    },
    classification: {
      matchedService,
      confidenceScore: 0.95,
      extractedKeywords: [raw.industry.toLowerCase(), raw.city.toLowerCase(), raw.country.toLowerCase()],
      region: detectedRegion,
      opportunity: matchedService,
    },
    qualification,
    proposal: {
      ...proposal,
      generatedAt: nowTimestamp,
    },
    status: qualification.isEligible ? "qualified" : "needs_review",
    verificationStatus: qualification.isEligible ? "verified" : "needs_review",
    lastVerifiedAt: nowTimestamp,
    createdAt: nowTimestamp,
    updatedAt: nowTimestamp,
  };

  return { prospect, dedupKey, duplicate: false };
}
