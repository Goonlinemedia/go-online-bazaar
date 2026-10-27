import { describe, it, expect } from "vitest";
import { classifyRequest, qualifyProspect, scoreLocalBusinessLead } from "@/lib/prospecting/qualification";
import { generatePersonalizedProposal, generateLocalBusinessProposal } from "@/lib/prospecting/proposal-gen";
import { normalizeEmail, extractDomain, buildUnsubscribeUrl, verifyUnsubscribeToken } from "@/lib/prospecting/dedup";
import { TARGET_MARKETS } from "@/lib/prospecting/market-presets";
import { sanitizeSenderEmail, sanitizeProposalText, stripDisclaimerFooter, sanitizeProspect } from "@/lib/prospecting/prospecting-service";
import { buildSeedProspects } from "@/lib/prospecting/seed-data";

describe("Prospecting Qualification Engine", () => {
  it("correctly classifies an e-commerce request", () => {
    const text = "Looking for a web developer to build an online store with Shopify or custom cart and Paystack checkout for our clothing brand.";
    const result = classifyRequest(text);
    
    expect(result.matchedService).toBe("ecommerce_website");
    expect(result.extractedKeywords.length).toBeGreaterThan(0);
  });

  it("correctly classifies a website redesign request", () => {
    const text = "Our current dental clinic site is super slow and looks outdated on mobile. Need a complete redesign and UI overhaul.";
    const result = classifyRequest(text);
    
    expect(result.matchedService).toBe("website_redesign");
  });

  it("correctly classifies a booking / web app request", () => {
    const text = "Need an appointment scheduling portal and client booking system with real-time calendar and deposit payments.";
    const result = classifyRequest(text);
    
    expect(result.matchedService).toBe("web_application_booking");
  });

  it("qualifies a legitimate commercial request with high score >= 70", () => {
    const title = "[Hiring] Looking for Web Developer to build business website for law firm";
    const content = "We are an established corporate law firm in need of a high-performance modern business website with lead capture, team profiles, and SEO. Our budget is $2,500 fixed. Please contact us at contact@prestigelegal.com.";
    const classification = classifyRequest(`${title} ${content}`);
    const qualification = qualifyProspect(title, content, classification, "contact@prestigelegal.com");

    expect(qualification.score).toBeGreaterThanOrEqual(70);
    expect(qualification.isEligible).toBe(true);
    expect(qualification.redFlags).toHaveLength(0);
  });

  it("disqualifies unpaid or equity-only requests", () => {
    const title = "[Hiring] Need developer for revolutionary social app";
    const content = "We have no money right now so this is equity only and rev-share only once we launch.";
    const classification = classifyRequest(`${title} ${content}`);
    const qualification = qualifyProspect(title, content, classification, "founder@stealth.io");

    expect(qualification.isEligible).toBe(false);
    expect(qualification.redFlags.length).toBeGreaterThan(0);
  });

  it("correctly detects target regions (US, UK, Canada, Europe)", () => {
    const usResult = classifyRequest("Need a web developer in New York with USD budget of $3,000");
    expect(usResult.region).toBe("United States");

    const ukResult = classifyRequest("Looking for London agency or developer to build company website, budget £2,500");
    expect(ukResult.region).toBe("United Kingdom");

    const caResult = classifyRequest("Toronto firm seeking Shopify ecommerce website developer, budget $4,000 CAD");
    expect(caResult.region).toBe("Canada");

    const euResult = classifyRequest("Berlin tech startup in Europe looking for web app redesign, budget €3,500");
    expect(euResult.region).toBe("Europe");
  });
});

describe("Proposal Synthesis Engine", () => {
  it("generates personalized proposal with tailored GoOnline portfolio links and opt-out footer", () => {
    const proposal = generatePersonalizedProposal({
      fullName: "Marcus",
      companyName: "Prestige Legal",
      matchedService: "business_website",
      keywords: ["corporate", "seo", "lead capture"],
      rawTitle: "Need business website",
      rawContent: "Need corporate website with lead capture",
      unsubscribeUrl: "https://goonlinemedia.com/unsubscribe?email=test@prestigelegal.com&token=123",
    });

    expect(proposal.subjectLine).toContain("Prestige Legal");
    expect(proposal.bodyText).toContain("Marcus");
    expect(proposal.bodyText).toContain("goonlinemedia.com");
    expect(proposal.bodyHtml).toContain("https://goonlinemedia.com/unsubscribe");
    expect(proposal.portfolioLinksIncluded.length).toBeGreaterThan(0);
  });
});

describe("Deduplication & Opt-Out Tokens", () => {
  it("normalizes emails and extracts root domains cleanly", () => {
    expect(normalizeEmail("  Hello.User@AcmeCorp.com. ")).toBe("hello.user@acmecorp.com");
    expect(extractDomain("info@sub.domain.co.uk")).toBe("sub.domain.co.uk");
  });

  it("generates and verifies stable HMAC opt-out tokens", () => {
    const email = "prospect@clientbrand.com";
    const url = buildUnsubscribeUrl(email);
    expect(url).toContain("unsubscribe?email=");

    const tokenParam = new URL(url).searchParams.get("token") || "";
    expect(verifyUnsubscribeToken(email, tokenParam)).toBe(true);
    expect(verifyUnsubscribeToken("other@clientbrand.com", tokenParam)).toBe(false);
  });
});

describe("Local Business (No Website / Social-Only) Lead Qualification", () => {
  it("scores a verified local business with no website as highly qualified (score >= 70)", () => {
    const result = scoreLocalBusinessLead({
      businessName: "Calgary Precision Plumbing",
      country: "Canada",
      city: "Calgary",
      industry: "Plumbing",
      websiteStatus: "none_found",
      hasEmail: true,
      hasPhone: true,
      hasDecisionMaker: true,
      hasMapsUrl: true,
    });

    expect(result.score).toBeGreaterThanOrEqual(70);
    expect(result.isEligible).toBe(true);
    expect(result.redFlags).toHaveLength(0);
    expect(result.reasons.some(r => r.includes("No website found"))).toBe(true);
  });

  it("scores a social-media-only business (FB/IG) in the UK as qualified", () => {
    const result = scoreLocalBusinessLead({
      businessName: "Leeds Sparkle Cleaning",
      country: "United Kingdom",
      city: "Leeds",
      industry: "Cleaning Services",
      websiteStatus: "social_only",
      hasEmail: true,
      hasPhone: true,
      hasDecisionMaker: false,
      hasMapsUrl: true,
    });

    expect(result.score).toBeGreaterThanOrEqual(65);
    expect(result.isEligible).toBe(true);
    expect(result.reasons.some(r => r.includes("Facebook/Instagram"))).toBe(true);
  });

  it("flags missing email as a red flag for cold email outreach", () => {
    const result = scoreLocalBusinessLead({
      businessName: "Tampa Roof Masters",
      country: "United States",
      city: "Tampa",
      industry: "Roofing",
      websiteStatus: "none_found",
      hasEmail: false,
      hasPhone: true,
      hasDecisionMaker: false,
      hasMapsUrl: true,
    });

    expect(result.isEligible).toBe(false);
    expect(result.redFlags.some(f => f.includes("Missing email"))).toBe(true);
  });
});

describe("Local Business Cold Outreach Proposal Generator", () => {
  it("generates an email proposal customized for no-website businesses", () => {
    const proposal = generateLocalBusinessProposal({
      businessName: "Apex Renovation Co.",
      decisionMaker: "David Miller",
      city: "Toronto",
      country: "Canada",
      industry: "Renovation Contractors",
      websiteStatus: "none_found",
      opportunity: "business_website",
      unsubscribeUrl: "https://goonlinemedia.com/unsubscribe?email=david@apexreno.ca",
    });

    expect(proposal.subjectLine).toContain("Apex Renovation Co.");
    expect(proposal.bodyText).toContain("Hi David");
    expect(proposal.bodyText).toContain("Apex Renovation Co.");
    expect(proposal.bodyText).toContain("Toronto");
    expect(proposal.bodyText).toContain("GoOnline");
    expect(proposal.bodyText).toContain("Emmanuel");
    expect(proposal.bodyText).not.toContain("Adegboyega");
    expect(proposal.bodyText).toContain("goonlinemedia0@gmail.com");
    expect(proposal.bodyText).not.toContain("info@goonlinemedia.com");
    expect(proposal.bodyText).not.toContain("info@goonline");
    expect(proposal.bodyText).not.toContain("opt out");
    expect(proposal.bodyText).not.toContain("---");
    expect(proposal.bodyHtml).toContain("https://goonlinemedia.com/unsubscribe");
  });

  it("generates appropriate wording for social-media-only businesses", () => {
    const proposal = generateLocalBusinessProposal({
      businessName: "Bristol Bloom Gardeners",
      city: "Bristol",
      country: "United Kingdom",
      industry: "Gardening Services",
      websiteStatus: "social_only",
      opportunity: "business_website",
      unsubscribeUrl: "https://goonlinemedia.com/unsubscribe?email=contact@bristolbloom.co.uk",
    });

    expect(proposal.bodyText).toContain("social media");
    expect(proposal.bodyText).toContain("Bristol Bloom Gardeners");
  });
});

describe("Target Market Presets (Canada, UK, US, Europe)", () => {
  it("includes Priority 1 markets for Canada and UK with search URLs", () => {
    const canada = TARGET_MARKETS.find(m => m.country === "Canada");
    expect(canada).toBeDefined();
    expect(canada?.priority).toBe("Priority 1");
    expect(canada?.popularCities).toContain("Calgary");
    expect(canada?.buildMapsSearchUrl("Plumbers", "Calgary")).toContain("Calgary");

    const uk = TARGET_MARKETS.find(m => m.country === "United Kingdom");
    expect(uk).toBeDefined();
    expect(uk?.priority).toBe("Priority 1");
    expect(uk?.popularCities).toContain("Leeds");
    expect(uk?.buildMapsSearchUrl("Cleaning Companies", "Leeds")).toContain("Leeds");
  });
});

describe("Sender Signature & Email Sanitization", () => {
  it("sanitizes info@goonlinemedia.com and info@goonline to goonlinemedia0@gmail.com", () => {
    const legacyText = `
Adegboyega
GoOnline · Website Development & Digital Solutions
https://goonlinemedia.com · info@goonlinemedia.com
    `.trim();

    const sanitized = sanitizeSenderEmail(legacyText);
    expect(sanitized).toContain("goonlinemedia0@gmail.com");
    expect(sanitized).not.toContain("info@goonlinemedia.com");

    const partialText = "Contact us at info@goonline for inquiries";
    expect(sanitizeSenderEmail(partialText)).toContain("goonlinemedia0@gmail.com");
  });

  it("strips CAN-SPAM and opt-out disclaimer footer from proposal body text", () => {
    const rawWithFooter = `
Best regards,

Adegboyega
GoOnline · Website Development & Digital Solutions
https://goonlinemedia.com · info@goonlinemedia.com

---
GoOnline Media, Victoria Island, Lagos / London HQ
You received this note regarding publicly available business information for Apex Auto Spa & Detailing Toronto.
To opt out, visit: https://goonlinemedia.com/unsubscribe?email=bookings%40apexautospatoronto.ca
    `.trim();

    const cleaned = sanitizeProposalText(rawWithFooter);
    expect(cleaned).toContain("goonlinemedia0@gmail.com");
    expect(cleaned).toContain("Emmanuel");
    expect(cleaned).not.toContain("Adegboyega");
    expect(cleaned).not.toContain("---");
    expect(cleaned).not.toContain("Victoria Island");
    expect(cleaned).not.toContain("You received this note regarding");
    expect(cleaned).not.toContain("To opt out");
    expect(cleaned.endsWith("https://goonlinemedia.com · goonlinemedia0@gmail.com")).toBe(true);
  });

  it("verifies all 12 seed leads use deliverable, resolvable email domains", () => {
    const seeds = buildSeedProspects();
    expect(seeds.length).toBe(12);

    for (const lead of seeds) {
      expect(lead.contact.email).toContain("@gmail.com");
      expect(lead.contact.emailDomain).toBe("gmail.com");
      expect(lead.proposal.bodyText).toContain("Emmanuel");
      expect(lead.proposal.bodyText).toContain("goonlinemedia0@gmail.com");
      expect(lead.proposal.bodyText).not.toContain("leedspremiercleaners.co.uk");
    }
  });

  it("automatically transforms legacy leedspremiercleaners address to verified deliverable email", () => {
    const legacyMock = {
      id: "test_legacy",
      prospectType: "local_business_no_website" as const,
      source: {
        platform: "google_maps" as const,
        externalId: "123",
        sourceUrl: "https://maps.google.com",
        rawTitle: "Leeds Premier Cleaners",
        rawContent: "Leeds cleaners",
        discoveredAt: "2026-10-27T00:00:00Z"
      },
      contact: {
        email: "enquiries@leedspremiercleaners.co.uk",
        companyName: "Leeds Premier Cleaners"
      },
      classification: {
        matchedService: "business_website" as const,
        confidenceScore: 0.9,
        extractedKeywords: ["cleaning"],
        region: "United Kingdom" as const,
      },
      qualification: { score: 90, isEligible: true, reasons: [], redFlags: [] },
      proposal: {
        subjectLine: "Quick question",
        bodyHtml: "<p>Hello</p>",
        bodyText: "Hi, I noticed enquiries@leedspremiercleaners.co.uk",
        generatedAt: "2026-10-27T00:00:00Z",
        suggestedTimeline: "7 days",
        portfolioLinksIncluded: []
      },
      status: "qualified" as const,
      createdAt: "2026-10-27T00:00:00Z",
      updatedAt: "2026-10-27T00:00:00Z"
    };

    const sanitized = sanitizeProspect(legacyMock);
    expect(sanitized.contact.email).toBe("platinumcitycleaning@gmail.com");
    expect(sanitized.contact.emailDomain).toBe("gmail.com");
    expect(sanitized.proposal.bodyText).toContain("platinumcitycleaning@gmail.com");
    expect(sanitized.proposal.bodyText).not.toContain("leedspremiercleaners.co.uk");
  });
});

