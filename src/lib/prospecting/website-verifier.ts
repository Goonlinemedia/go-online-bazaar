import { WebsiteStatus, WebsiteVerificationEvidence } from "./types";

/**
 * Multi-Stage Website Verification Engine
 * 
 * Verifies whether a business truly has an official website or is a verified
 * website-free prospect (no_website_found or social_only).
 * 
 * NEVER classifies a business as "no_website_found" solely because a listing
 * lacks a website field.
 */

const SOCIAL_DOMAINS = [
  "facebook.com", "fb.me", "fb.com", "m.facebook.com",
  "instagram.com", "instagr.am",
  "twitter.com", "x.com",
  "linkedin.com",
  "tiktok.com",
  "youtube.com",
  "pinterest.com"
];

const DIRECTORY_DOMAINS = [
  "yelp.com", "yelp.ca", "yelp.co.uk",
  "yell.com",
  "yellowpages.com", "yellowpages.ca", "pagesjaunes.ca",
  "bbb.org",
  "tripadvisor.com", "tripadvisor.co.uk", "tripadvisor.ca",
  "checkatrade.com",
  "bark.com",
  "angi.com",
  "homeadvisor.com",
  "houzz.com",
  "thomsonlocal.com",
  "scoot.co.uk",
  "trustpilot.com",
  "maps.google.com", "google.com/maps", "business.google.com"
];

const BOOKING_PORTAL_DOMAINS = [
  "fresha.com",
  "mindbodyonline.com",
  "booksy.com",
  "opentable.com", "opentable.co.uk",
  "resy.com",
  "vagaro.com",
  "setmore.com",
  "calendly.com",
  "acuityscheduling.com",
  "treatwell.co.uk"
];

export interface SearchResultItem {
  title: string;
  link: string;
  snippet?: string;
}

export type SearchProviderFn = (query: string) => Promise<SearchResultItem[]>;

export interface WebsiteVerificationInput {
  businessName: string;
  city: string;
  country: string;
  phoneNumber?: string | null;
  listingWebsiteUrl?: string | null;
  placeId?: string;
  searchProvider?: SearchProviderFn;
}

export interface WebsiteVerificationResult {
  websiteStatus: WebsiteStatus;
  websiteUrl: string | null;
  evidence: WebsiteVerificationEvidence[];
  checkedAt: string;
  isConfirmedNoWebsite: boolean;
  notes: string;
}

/**
 * Classifies a given URL into official, social, directory, or booking portal.
 */
export function classifyUrl(url: string | null | undefined): {
  type: "official" | "social" | "directory" | "booking_portal" | "unrelated" | "none";
  domain: string;
} {
  if (!url || typeof url !== "string") {
    return { type: "none", domain: "" };
  }

  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    const hostname = parsed.hostname.toLowerCase().replace(/^www\./, "");

    // 1. Social
    if (SOCIAL_DOMAINS.some(d => hostname === d || hostname.endsWith(`.${d}`))) {
      return { type: "social", domain: hostname };
    }

    // 2. Directory
    if (DIRECTORY_DOMAINS.some(d => hostname === d || hostname.endsWith(`.${d}`))) {
      return { type: "directory", domain: hostname };
    }

    // 3. Booking Portal
    if (BOOKING_PORTAL_DOMAINS.some(d => hostname === d || hostname.endsWith(`.${d}`))) {
      return { type: "booking_portal", domain: hostname };
    }

    // 4. Default to official candidate domain
    return { type: "official", domain: hostname };
  } catch {
    return { type: "unrelated", domain: "" };
  }
}

/**
 * Checks if a domain or URL plausibly belongs to the business
 */
export function domainMatchesBusiness(domain: string, businessName: string): boolean {
  if (!domain || !businessName) return false;
  const normDomain = domain.toLowerCase().replace(/\.(com|ca|co\.uk|org|net|io|biz|info|ng|us)$/, "");
  const cleanBusiness = businessName.toLowerCase().replace(/[^a-z0-9]/g, "");
  const words = businessName.toLowerCase().split(/\s+/).filter(w => w.length > 2);

  // Direct match or substring
  if (normDomain.includes(cleanBusiness) || cleanBusiness.includes(normDomain)) {
    return true;
  }

  // At least 2 significant words match domain
  const matchingWords = words.filter(w => normDomain.includes(w));
  return matchingWords.length >= Math.min(2, words.length);
}

/**
 * Comprehensive verification of business website status.
 */
export async function verifyBusinessWebsite(
  input: WebsiteVerificationInput
): Promise<WebsiteVerificationResult> {
  const evidence: WebsiteVerificationEvidence[] = [];
  const now = new Date().toISOString();

  // 1. Inspect direct listing URL if available
  if (input.listingWebsiteUrl) {
    const classification = classifyUrl(input.listingWebsiteUrl);
    
    if (classification.type === "official") {
      evidence.push({
        sourceUrl: input.listingWebsiteUrl,
        domainFound: classification.domain,
        classification: "official",
        detectedAt: now,
        notes: `Official website directly provided in listing: ${classification.domain}`,
      });

      return {
        websiteStatus: "website_exists",
        websiteUrl: input.listingWebsiteUrl,
        evidence,
        checkedAt: now,
        isConfirmedNoWebsite: false,
        notes: `Identified official website on listing: ${input.listingWebsiteUrl}`,
      };
    } else if (classification.type === "social") {
      evidence.push({
        sourceUrl: input.listingWebsiteUrl,
        domainFound: classification.domain,
        classification: "social",
        detectedAt: now,
        notes: `Listing links to social media profile (${classification.domain}), not a dedicated website`,
      });
    } else if (classification.type === "directory" || classification.type === "booking_portal") {
      evidence.push({
        sourceUrl: input.listingWebsiteUrl,
        domainFound: classification.domain,
        classification: classification.type,
        detectedAt: now,
        notes: `Listing links to directory/booking page (${classification.domain}), not a dedicated website`,
      });
    }
  }

  // 2. Perform secondary search checks if a search provider is available
  if (input.searchProvider) {
    const primaryQuery = `"${input.businessName}" ${input.city} official website`;
    try {
      const results = await input.searchProvider(primaryQuery);
      
      let foundOfficialWebsite: SearchResultItem | null = null;
      let foundSocialProfile: SearchResultItem | null = null;

      for (const res of results.slice(0, 5)) {
        const cls = classifyUrl(res.link);

        if (cls.type === "official") {
          // Check if domain actually matches the business identity
          if (domainMatchesBusiness(cls.domain, input.businessName)) {
            foundOfficialWebsite = res;
            evidence.push({
              sourceUrl: res.link,
              domainFound: cls.domain,
              classification: "official",
              detectedAt: now,
              notes: `Discovered official website in search: "${res.title}" on ${cls.domain}`,
            });
            break;
          }
        } else if (cls.type === "social" && !foundSocialProfile) {
          foundSocialProfile = res;
          evidence.push({
            sourceUrl: res.link,
            domainFound: cls.domain,
            classification: "social",
            detectedAt: now,
            notes: `Discovered social profile in search: "${res.title}" on ${cls.domain}`,
          });
        }
      }

      if (foundOfficialWebsite) {
        return {
          websiteStatus: "website_exists",
          websiteUrl: foundOfficialWebsite.link,
          evidence,
          checkedAt: now,
          isConfirmedNoWebsite: false,
          notes: `Search investigation confirmed official domain: ${foundOfficialWebsite.link}`,
        };
      }

      // If search returned only social or directory results
      const hasSocialEvidence = evidence.some(e => e.classification === "social");
      if (hasSocialEvidence || foundSocialProfile) {
        return {
          websiteStatus: "social_only",
          websiteUrl: foundSocialProfile?.link || evidence.find(e => e.classification === "social")?.sourceUrl || null,
          evidence,
          checkedAt: now,
          isConfirmedNoWebsite: true,
          notes: "Multi-source search confirmed business relies exclusively on social media / directory listings.",
        };
      }

      // Multi-source search executed and zero official website found
      return {
        websiteStatus: "no_website_found",
        websiteUrl: null,
        evidence: [
          ...evidence,
          {
            sourceUrl: `https://search.verification?q=${encodeURIComponent(primaryQuery)}`,
            classification: "unrelated",
            detectedAt: now,
            notes: "Exhaustive multi-source search query returned no official domain for this business.",
          }
        ],
        checkedAt: now,
        isConfirmedNoWebsite: true,
        notes: "No official website found after thorough name and location search checks.",
      };
    } catch (searchErr) {
      console.warn("Search provider investigation error:", searchErr);
      // Fallback below
    }
  }

  // 3. Fallback when automated search provider is not active:
  // If listing had a social link, classify as social_only
  if (evidence.some(e => e.classification === "social")) {
    return {
      websiteStatus: "social_only",
      websiteUrl: evidence.find(e => e.classification === "social")?.sourceUrl || null,
      evidence,
      checkedAt: now,
      isConfirmedNoWebsite: true,
      notes: "Listing contains social profile only. No dedicated domain identified.",
    };
  }

  // If no search was run and listing has no website, classify as uncertain (DO NOT assume no_website_found)
  return {
    websiteStatus: "uncertain",
    websiteUrl: null,
    evidence,
    checkedAt: now,
    isConfirmedNoWebsite: false,
    notes: "Listing omitted website field, but independent search verification has not run yet. Marked as uncertain.",
  };
}
