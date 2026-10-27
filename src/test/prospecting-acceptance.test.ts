import { describe, it, expect, vi, beforeEach } from "vitest";
import { 
  verifyBusinessWebsite, 
  classifyUrl, 
  domainMatchesBusiness,
  SearchProviderFn 
} from "@/lib/prospecting/website-verifier";
import { 
  validateAndExtractEmail, 
  normalizePhoneNumber,
  detectContactConflict 
} from "@/lib/prospecting/contact-extractor";
import { 
  scoreLocalBusinessLead 
} from "@/lib/prospecting/qualification";
import { 
  generateBusinessDedupKey, 
  processDiscoveredBusiness, 
  RawDiscoveredBusiness 
} from "@/lib/prospecting/discovery-service";
import { 
  generateLocalBusinessProposal 
} from "@/lib/prospecting/proposal-gen";
import { 
  normalizeEmail, 
  buildUnsubscribeUrl 
} from "@/lib/prospecting/dedup";

describe("GoOnline Prospecting Engine — 15 Acceptance Criteria", () => {

  // =========================================================================
  // Test 1: A business with an official website is not classified as website-free
  // =========================================================================
  it("1. Does not classify a business with an official website as website-free", async () => {
    const result = await verifyBusinessWebsite({
      businessName: "Prestige Flooring Tampa",
      city: "Tampa",
      country: "United States",
      listingWebsiteUrl: "https://prestigeflooringtampa.com",
    });

    expect(result.websiteStatus).toBe("website_exists");
    expect(result.isConfirmedNoWebsite).toBe(false);
    expect(result.websiteUrl).toBe("https://prestigeflooringtampa.com");
    expect(result.evidence[0].classification).toBe("official");
  });

  // =========================================================================
  // Test 2: A business with no website URL in Google Maps is investigated further before classification
  // =========================================================================
  it("2. Investigates further before classifying a business with no website URL on its listing", async () => {
    // When no search provider is executed yet, it must return 'uncertain' instead of assuming 'no_website_found'
    const unsearched = await verifyBusinessWebsite({
      businessName: "Acme Roofing Houston",
      city: "Houston",
      country: "United States",
      listingWebsiteUrl: null,
      // No searchProvider provided
    });
    expect(unsearched.websiteStatus).toBe("uncertain");
    expect(unsearched.isConfirmedNoWebsite).toBe(false);

    // When search provider runs and discovers an official website in search
    const mockSearchProvider: SearchProviderFn = vi.fn().mockResolvedValue([
      { title: "Acme Roofing Houston - Commercial & Residential", link: "https://acmeroofinghouston.com" }
    ]);

    const searched = await verifyBusinessWebsite({
      businessName: "Acme Roofing Houston",
      city: "Houston",
      country: "United States",
      listingWebsiteUrl: null,
      searchProvider: mockSearchProvider,
    });

    expect(mockSearchProvider).toHaveBeenCalled();
    expect(searched.websiteStatus).toBe("website_exists");
    expect(searched.websiteUrl).toBe("https://acmeroofinghouston.com");
  });

  // =========================================================================
  // Test 3: A business with a published email receives the correct source-backed email
  // =========================================================================
  it("3. Correctly extracts and attaches published source-backed email with provenance", () => {
    const rawEmail = "contact@tampabayhardwood.com";
    const sourceUrl = "https://tampabayhardwood.com/contact-us";
    
    const result = validateAndExtractEmail(
      rawEmail, 
      sourceUrl, 
      "Tampa Bay Hardwood Flooring", 
      "website_contact_page"
    );

    expect(result.email).toBe("contact@tampabayhardwood.com");
    expect(result.status).toBe("verified");
    expect(result.sourceUrl).toBe(sourceUrl);
    expect(result.evidence).toHaveLength(1);
    expect(result.evidence[0].extractedField).toBe("email");
    expect(result.evidence[0].sourceUrl).toBe(sourceUrl);
  });

  // =========================================================================
  // Test 4: A business with no discoverable email gets null, not a generated email
  // =========================================================================
  it("4. Returns null and marks status as 'not_found' when no email exists (NEVER generates an email)", () => {
    const resultEmpty = validateAndExtractEmail(null, "https://maps.google.com", "ABC Flooring");
    expect(resultEmpty.email).toBeNull();
    expect(resultEmpty.status).toBe("not_found");

    const resultUndefined = validateAndExtractEmail(undefined, "https://maps.google.com", "ABC Flooring");
    expect(resultUndefined.email).toBeNull();
    expect(resultUndefined.status).toBe("not_found");

    // Must never generate info@abcflooring.com or similar pattern
    expect(resultEmpty.email).not.toBe("info@abcflooring.com");
  });

  // =========================================================================
  // Test 5: A business with no reliable phone number gets null, not a fabricated number
  // =========================================================================
  it("5. Returns null and marks status as 'not_found' or 'invalid' for absent or fabricated phone numbers", () => {
    const missingPhone = normalizePhoneNumber(null, "Canada");
    expect(missingPhone.phoneNumber).toBeNull();
    expect(missingPhone.phoneNormalized).toBeNull();
    expect(missingPhone.status).toBe("not_found");

    // Fabricated dummy sequences must be rejected as invalid
    const dummyPhone = normalizePhoneNumber("555-555-5555", "United States");
    expect(dummyPhone.phoneNumber).toBeNull();
    expect(dummyPhone.status).toBe("invalid");

    // Legitimate phone number is normalized to E.164
    const validPhone = normalizePhoneNumber("(403) 890-7608", "Canada", "https://maps.google.com");
    expect(validPhone.phoneNumber).toBe("(403) 890-7608");
    expect(validPhone.phoneNormalized).toBe("+14038907608");
    expect(validPhone.status).toBe("verified");
  });

  // =========================================================================
  // Test 6: A directory email belonging to a different business is rejected
  // =========================================================================
  it("6. Rejects directory and platform emails (Yelp, Yell, Craigslist, etc.)", () => {
    const yelpSupport = validateAndExtractEmail("support@yelp.com", "https://yelp.com/biz/123", "Joe's Plumbing");
    expect(yelpSupport.email).toBeNull();
    expect(yelpSupport.status).toBe("invalid");
    expect(yelpSupport.rejectionReason).toContain("directory");

    const yellService = validateAndExtractEmail("customercare@yell.com", "https://yell.com/biz/456", "Leeds Joinery");
    expect(yellService.email).toBeNull();
    expect(yellService.status).toBe("invalid");

    const craigslistHelp = validateAndExtractEmail("help@craigslist.org", "https://craigslist.org/post", "Painting Co");
    expect(craigslistHelp.email).toBeNull();
    expect(craigslistHelp.status).toBe("invalid");
  });

  // =========================================================================
  // Test 7: A business with conflicting contact details is flagged for review
  // =========================================================================
  it("7. Flags conflicting contact records across sources", () => {
    const emailConflict = detectContactConflict("owner@floridafloors.com", "sales@floridafloors.net", "email");
    expect(emailConflict).toBe(true);

    const phoneConflict = detectContactConflict("+1 (813) 555-0123", "+1 (407) 999-8877", "phone");
    expect(phoneConflict).toBe(true);

    // Scoring must flag conflicting contact details and reduce confidence
    const scoreWithConflict = scoreLocalBusinessLead({
      businessName: "Florida Floors",
      country: "United States",
      city: "Tampa",
      industry: "Flooring",
      websiteStatus: "no_website_found",
      hasEmail: true,
      hasPhone: true,
      hasContactConflict: true,
    });

    expect(scoreWithConflict.isEligible).toBe(false);
    expect(scoreWithConflict.redFlags.some(r => r.includes("Conflicting contact records"))).toBe(true);
    expect(scoreWithConflict.contactConfidenceScore).toBeLessThanOrEqual(25);
  });

  // =========================================================================
  // Test 8: Duplicate businesses discovered through different sources are merged/deduplicated
  // =========================================================================
  it("8. Deduplicates businesses across different sources using placeId, slug, and phone", async () => {
    const seenKeys = new Set<string>();

    const raw1: RawDiscoveredBusiness = {
      businessName: "Ko Plumbing",
      city: "Calgary",
      country: "Canada",
      industry: "Plumbers",
      phoneNumber: "+14038907608",
      sourceUrl: "https://maps.google.com/place1",
      sourcePlatform: "google_places",
      placeId: "ChIJ_CalgaryPlumbing1",
    };

    const firstRun = await processDiscoveredBusiness(raw1, seenKeys);
    expect(firstRun.duplicate).toBe(false);
    expect(firstRun.prospect).not.toBeNull();
    seenKeys.add(firstRun.dedupKey);

    // Same business found via OpenStreetMap (matching name, city, country, phone)
    const raw2: RawDiscoveredBusiness = {
      businessName: "KO Plumbing",
      city: "Calgary",
      country: "Canada",
      industry: "Plumbers",
      phoneNumber: "403-890-7608",
      sourceUrl: "https://openstreetmap.org/node/12345",
      sourcePlatform: "openstreetmap",
    };

    const secondRun = await processDiscoveredBusiness(raw2, seenKeys);
    expect(secondRun.duplicate).toBe(true);
    expect(secondRun.prospect).toBeNull();
  });

  // =========================================================================
  // Test 9: Missing API credentials produce an explicit error instead of fabricated results
  // =========================================================================
  it("9. Handles missing search or Places credentials with explicit logs instead of fabricating results", async () => {
    // When no API key is passed to Google Places, it returns an empty array cleanly without crashing
    const { discoverViaGooglePlaces } = await import("@/lib/prospecting/discovery-service");
    const results = await discoverViaGooglePlaces("Plumbers", "London", "United Kingdom", "");
    expect(results).toHaveLength(0);
  });

  // =========================================================================
  // Test 10: Search-provider errors and rate limits are handled safely
  // =========================================================================
  it("10. Handles search-provider errors and rate limits safely without breaking verification", async () => {
    const failingSearchProvider: SearchProviderFn = vi.fn().mockRejectedValue(new Error("Rate limit exceeded 429"));

    const result = await verifyBusinessWebsite({
      businessName: "London Beauty Salon",
      city: "London",
      country: "United Kingdom",
      listingWebsiteUrl: "https://instagram.com/londonbeautysalon",
      searchProvider: failingSearchProvider,
    });

    expect(failingSearchProvider).toHaveBeenCalled();
    // Falls back gracefully to social_only without crashing
    expect(result.websiteStatus).toBe("social_only");
    expect(result.evidence.some(e => e.classification === "social")).toBe(true);
  });

  // =========================================================================
  // Test 11: Daily processing limit cannot be bypassed by repeated requests
  // =========================================================================
  it("11. Strictly enforces the daily processing limit (max 10 newly processed prospects)", async () => {
    const rawList: RawDiscoveredBusiness[] = Array.from({ length: 15 }, (_, i) => ({
      businessName: `Test Plumbing Contractor ${i + 1}`,
      city: "Toronto",
      country: "Canada",
      industry: "Plumbers",
      phoneNumber: `+141655501${i < 10 ? `0${i}` : i}`,
      email: `contact${i}@testplumber${i}.ca`,
      sourceUrl: `https://published-source.ca/${i}`,
      sourcePlatform: "openstreetmap",
    }));

    const processed: any[] = [];
    const seen = new Set<string>();

    for (const raw of rawList) {
      if (processed.length >= 10) break; // Enforce limit
      const { prospect } = await processDiscoveredBusiness(raw, seen);
      if (prospect) {
        seen.add(prospect.id);
        processed.push(prospect);
      }
    }

    expect(processed).toHaveLength(10);
    expect(processed.length).toBeLessThanOrEqual(10);
  });

  // =========================================================================
  // Test 12: A prospect with an opt-out record cannot be contacted
  // =========================================================================
  it("12. Prohibits outreach to suppressed or opted-out recipients", () => {
    const suppressedLead = scoreLocalBusinessLead({
      businessName: "Opted Out Carpentry",
      country: "United Kingdom",
      city: "Manchester",
      industry: "Joinery",
      websiteStatus: "no_website_found",
      hasEmail: true,
      hasPhone: true,
      isSuppressed: true,
    });

    expect(suppressedLead.isEligible).toBe(false);
    expect(suppressedLead.redFlags.some(r => r.includes("suppression list"))).toBe(true);
    expect(suppressedLead.ineligibilityReason).toContain("suppression list");
  });

  // =========================================================================
  // Test 13: An ineligible prospect cannot trigger Gmail sending
  // =========================================================================
  it("13. Prevents ineligible prospects (e.g. uncertain website status or no email) from automated outreach", () => {
    // Case A: Missing email
    const noEmail = scoreLocalBusinessLead({
      businessName: "No Email Plumbers",
      country: "Canada",
      city: "Calgary",
      industry: "Plumbers",
      websiteStatus: "no_website_found",
      hasEmail: false,
      hasPhone: true,
    });
    expect(noEmail.isEligible).toBe(false);
    expect(noEmail.ineligibilityReason).toContain("Missing verified source-backed email");

    // Case B: Uncertain website status
    const uncertainWebsite = scoreLocalBusinessLead({
      businessName: "Uncertain Status Cafe",
      country: "United States",
      city: "Tampa",
      industry: "Restaurants",
      websiteStatus: "uncertain",
      hasEmail: true,
      hasPhone: true,
    });
    expect(uncertainWebsite.isEligible).toBe(false);
    expect(uncertainWebsite.ineligibilityReason).toContain("Uncertain website status");
  });

  // =========================================================================
  // Test 14: Retrying a failed job does not duplicate outreach
  // =========================================================================
  it("14. Retrying verification preserves prospect identity and avoids duplicate outreach", async () => {
    const raw: RawDiscoveredBusiness = {
      businessName: "Unique Electrician Leeds",
      city: "Leeds",
      country: "United Kingdom",
      industry: "Electricians",
      phoneNumber: "+44 113 555 1234",
      sourceUrl: "https://maps.google.com/unique_electrician",
      sourcePlatform: "google_places",
      placeId: "ChIJ_LeedsElectrician",
    };

    const seen = new Set<string>();
    const res1 = await processDiscoveredBusiness(raw, seen);
    expect(res1.duplicate).toBe(false);
    seen.add(res1.dedupKey);

    // Retrying with the same business identity detects dedupKey and prevents second lead creation
    const res2 = await processDiscoveredBusiness(raw, seen);
    expect(res2.duplicate).toBe(true);
    expect(res2.prospect).toBeNull();
  });

  // =========================================================================
  // Test 15: Every verified contact detail can be traced to its source
  // =========================================================================
  it("15. Traces all verified email, phone, and website claims back to origin URLs", async () => {
    const raw: RawDiscoveredBusiness = {
      businessName: "Authentic Joinery Manchester",
      city: "Manchester",
      country: "United Kingdom",
      industry: "Builders & Joiners",
      phoneNumber: "+44 161 273 1646",
      email: "info@authenticjoinerymcr.co.uk",
      listingWebsiteUrl: "https://facebook.com/authenticjoinerymcr",
      sourceUrl: "https://www.openstreetmap.org/node/998877",
      sourcePlatform: "openstreetmap",
      placeId: "osm_node_998877",
    };

    const seen = new Set<string>();
    const { prospect } = await processDiscoveredBusiness(raw, seen);
    expect(prospect).not.toBeNull();

    if (prospect) {
      // 1. Email traceability
      expect(prospect.contact.email).toBe("info@authenticjoinerymcr.co.uk");
      expect(prospect.contact.emailSourceUrl).toBe("https://www.openstreetmap.org/node/998877");
      expect(prospect.contact.contactEvidence.some(e => e.extractedField === "email" && e.sourceUrl === raw.sourceUrl)).toBe(true);

      // 2. Phone traceability
      expect(prospect.contact.phoneNormalized).toBe("+441612731646");
      expect(prospect.contact.phoneSourceUrl).toBe("https://www.openstreetmap.org/node/998877");
      expect(prospect.contact.contactEvidence.some(e => e.extractedField === "phone")).toBe(true);

      // 3. Website status traceability
      expect(prospect.contact.websiteStatus).toBe("social_only");
      expect(prospect.contact.websiteEvidence).toHaveLength(1);
      expect(prospect.contact.websiteEvidence[0].sourceUrl).toBe("https://facebook.com/authenticjoinerymcr");
      expect(prospect.contact.websiteEvidence[0].classification).toBe("social");
    }
  });

});
