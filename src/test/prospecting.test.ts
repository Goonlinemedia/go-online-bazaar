import { describe, it, expect } from "vitest";
import { classifyRequest, qualifyProspect } from "@/lib/prospecting/qualification";
import { generatePersonalizedProposal } from "@/lib/prospecting/proposal-gen";
import { normalizeEmail, extractDomain, buildUnsubscribeUrl, verifyUnsubscribeToken } from "@/lib/prospecting/dedup";

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
