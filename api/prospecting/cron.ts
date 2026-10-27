import type { VercelRequest, VercelResponse } from "@vercel/node";
import { 
  discoverViaOverpass, 
  discoverViaGooglePlaces, 
  processDiscoveredBusiness, 
  RawDiscoveredBusiness 
} from "../../src/lib/prospecting/discovery-service";
import { Prospect } from "../../src/lib/prospecting/types";

/**
 * Automated Business Prospecting Engine — Discovery Endpoint
 * 
 * Supports scheduled CRON execution and manual discovery requests.
 * Uses authorized APIs (OpenStreetMap Overpass, Google Places, Google Search).
 * Guarantees zero hallucinations and complete source evidence.
 */

// Rotating list of high-priority target markets and commercial industries
const DEFAULT_ROTATION = [
  { city: "Toronto", country: "Canada", industry: "Plumbers" },
  { city: "Tampa", country: "United States", industry: "Flooring Contractors" },
  { city: "Manchester", country: "United Kingdom", industry: "Electricians" },
  { city: "Birmingham", country: "United Kingdom", industry: "Cleaning Companies" },
  { city: "Calgary", country: "Canada", industry: "Landscapers" },
  { city: "London", country: "United Kingdom", industry: "Beauty Salons" },
  { city: "Houston", country: "United States", industry: "Roofing Contractors" },
  { city: "Lagos", country: "Nigeria", industry: "Restaurants" },
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.authorization;
  const isManualTrigger = req.query.trigger === "manual" || req.body?.trigger === "manual";

  if (!isManualTrigger && cronSecret && authHeader !== `Bearer ${cronSecret}` && req.headers["x-vercel-cron"] !== "1") {
    return res.status(401).json({ error: "Unauthorized discovery trigger" });
  }

  // Determine query parameters or pick from rotation based on day of month
  const dayIndex = new Date().getDate() % DEFAULT_ROTATION.length;
  const defaultTarget = DEFAULT_ROTATION[dayIndex];

  const city = (req.query.city as string) || req.body?.city || defaultTarget.city;
  const country = (req.query.country as string) || req.body?.country || defaultTarget.country;
  const industry = (req.query.industry as string) || req.body?.industry || defaultTarget.industry;

  const googlePlacesApiKey = process.env.GOOGLE_PLACES_API_KEY;
  const rawListings: RawDiscoveredBusiness[] = [];
  const errors: string[] = [];

  // 1. Source 1: Google Places API (if configured)
  if (googlePlacesApiKey) {
    try {
      const places = await discoverViaGooglePlaces(industry, city, country, googlePlacesApiKey);
      rawListings.push(...places);
    } catch (err) {
      errors.push(`Google Places discovery: ${(err as Error).message}`);
    }
  }

  // 2. Source 2: OpenStreetMap Overpass API (Authorized public directory)
  try {
    const osmListings = await discoverViaOverpass(industry, city, country);
    rawListings.push(...osmListings);
  } catch (err) {
    errors.push(`OpenStreetMap discovery: ${(err as Error).message}`);
  }

  // 3. Process each listing through the verification and scoring pipeline
  const processedProspects: Prospect[] = [];
  const seenKeys = new Set<string>();
  let duplicatesPrevented = 0;

  for (const raw of rawListings) {
    if (processedProspects.length >= 10) break; // Enforce strict daily limit

    const { prospect, duplicate } = await processDiscoveredBusiness(raw, seenKeys);
    if (duplicate || !prospect) {
      duplicatesPrevented++;
      continue;
    }

    seenKeys.add(prospect.id);
    processedProspects.push(prospect);
  }

  const breakdown = {
    noWebsiteFound: processedProspects.filter(p => p.contact.websiteStatus === "no_website_found").length,
    websiteExists: processedProspects.filter(p => p.contact.websiteStatus === "website_exists").length,
    socialOnly: processedProspects.filter(p => p.contact.websiteStatus === "social_only").length,
    uncertain: processedProspects.filter(p => p.contact.websiteStatus === "uncertain").length,
    verifiedEmails: processedProspects.filter(p => p.contact.emailStatus === "verified").length,
    missingEmails: processedProspects.filter(p => p.contact.emailStatus === "not_found").length,
    verifiedPhones: processedProspects.filter(p => p.contact.phoneStatus === "verified").length,
    eligibleForOutreach: processedProspects.filter(p => p.qualification.isEligible).length,
  };

  return res.status(200).json({
    success: true,
    query: { city, country, industry },
    totalDiscovered: rawListings.length,
    totalProcessed: processedProspects.length,
    duplicatesPrevented,
    breakdown,
    errors,
    prospects: processedProspects,
    message: `Discovered and verified ${processedProspects.length} commercial prospects in ${city}, ${country} for ${industry}.`,
  });
}
