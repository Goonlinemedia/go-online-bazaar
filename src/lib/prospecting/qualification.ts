import { ServiceType, TargetRegion, WebsiteStatus, ProspectScores } from "./types";

interface ClassificationResult {
  matchedService: ServiceType;
  confidenceScore: number;
  extractedKeywords: string[];
  budgetMentioned?: string;
  region: TargetRegion;
}

export type QualificationResult = ProspectScores;

/**
 * Detects whether inquiry targets the US, UK, Canada, or Europe
 */
export function detectTargetRegion(text: string, email: string = ""): TargetRegion {
  const norm = text.toLowerCase();
  const domain = email.toLowerCase().split("@")[1] || "";

  // 1. United Kingdom
  if (
    /£|gbp|united\s*kingdom|\buk\b|london|manchester|birmingham|england|scotland|wales|\bgmt\b|\bbst\b/i.test(norm) ||
    domain.endsWith(".uk") || domain.endsWith(".co.uk")
  ) {
    return "United Kingdom";
  }

  // 2. Canada
  if (
    /cad|c\$|canada|toronto|vancouver|montreal|calgary|ottawa|ontario|quebec|alberta/i.test(norm) ||
    domain.endsWith(".ca")
  ) {
    return "Canada";
  }

  // 3. Europe
  if (
    /€|eur|europe|\beu\b|germany|france|netherlands|berlin|paris|amsterdam|dublin|ireland|madrid|spain|italy|\bcet\b/i.test(norm) ||
    domain.endsWith(".eu") || domain.endsWith(".de") || domain.endsWith(".fr") || domain.endsWith(".nl") || domain.endsWith(".ie") || domain.endsWith(".es")
  ) {
    return "Europe";
  }

  // 4. United States
  if (
    /usd|\$|united\s*states|\busa\b|\bus\b|new\s*york|california|texas|florida|chicago|los\s*angeles|seattle|austin|miami|san\s*francisco|\best\b|\bpst\b|\bcst\b/i.test(norm) ||
    domain.endsWith(".us")
  ) {
    return "United States";
  }

  return "Global";
}

// Service keyword lexicons tailored to GoOnline's 5 offerings
const SERVICE_KEYWORDS: Record<ServiceType, string[]> = {
  ecommerce_website: [
    "ecommerce", "e-commerce", "online store", "shop", "shopify", "woocommerce", 
    "cart", "checkout", "product catalog", "stripe", "paystack", "inventory", 
    "merch", "selling online", "storefront", "payment gateway"
  ],
  website_redesign: [
    "redesign", "revamp", "modernize", "refresh website", "rebuild website", 
    "outdated site", "slow website", "ui overhaul", "migrate website", "responsive fix", 
    "upgrade site", "new look", "fix mobile view"
  ],
  landing_page: [
    "landing page", "one pager", "lead page", "squeeze page", "single page website", 
    "conversion page", "waitlist page", "launch page", "clickfunnels", "sales page", 
    "lead magnet", "product launch page"
  ],
  web_application_booking: [
    "booking system", "appointment", "booking website", "reservation", "schedule", 
    "portal", "web application", "web app", "dashboard", "client portal", 
    "saas", "database", "calendar integration", "booking engine", "login system"
  ],
  business_website: [
    "business website", "company website", "corporate website", "agency site", 
    "professional website", "portfolio website", "law firm", "consultant website", 
    "church website", "school website", "ngo website", "organization website", 
    "brochure website", "brand website"
  ],
};

const DISQUALIFICATION_SIGNALS = [
  { pattern: /equity\s*only|rev[\s-]*share\s*only|unpaid/i, reason: "Equity / Rev-share only request (no commercial budget)" },
  { pattern: /homework|school\s*project|assignment\s*help/i, reason: "Academic/Student homework request" },
  { pattern: /crypto\s*airdrop|pump\s*and\s*dump|telegram\s*bot\s*scam/i, reason: "Spam / High-risk crypto scheme" },
  { pattern: /native\s*ios|swift\s*only|native\s*android|kotlin\s*only/i, reason: "Native mobile app request (outside web scope)" },
];

/**
 * Classifies public request text into GoOnline's 5 primary service offerings.
 */
export function classifyRequest(text: string): ClassificationResult {
  const normalized = text.toLowerCase();
  
  const scores: Record<ServiceType, { count: number; matches: string[] }> = {
    ecommerce_website: { count: 0, matches: [] },
    website_redesign: { count: 0, matches: [] },
    landing_page: { count: 0, matches: [] },
    web_application_booking: { count: 0, matches: [] },
    business_website: { count: 0, matches: [] },
  };

  for (const [service, keywords] of Object.entries(SERVICE_KEYWORDS)) {
    for (const kw of keywords) {
      if (normalized.includes(kw)) {
        scores[service as ServiceType].count += 1;
        scores[service as ServiceType].matches.push(kw);
      }
    }
  }

  // Find service with highest count
  let topService: ServiceType = "business_website";
  let maxCount = 0;
  let allMatchedKeywords: string[] = [];

  for (const [serviceKey, data] of Object.entries(scores)) {
    if (data.count > maxCount) {
      maxCount = data.count;
      topService = serviceKey as ServiceType;
    }
    allMatchedKeywords = allMatchedKeywords.concat(data.matches);
  }

  // Deduplicate matched keywords
  const uniqueKeywords = Array.from(new Set(allMatchedKeywords));

  // Extract budget mention if present
  const budgetRegex = /(\$\s*\d{2,6}(?:,\d{3})*(?:\s*-\s*\$?\s*\d{2,6}(?:,\d{3})*)?|£\s*\d{2,6}|€\s*\d{2,6}|budget[:\s]+(?:of\s*)?\$?\d+k?)/i;
  const budgetMatch = text.match(budgetRegex);
  const budgetMentioned = budgetMatch ? budgetMatch[0].trim() : undefined;

  const confidenceScore = maxCount > 0 ? Math.min(1.0, 0.4 + maxCount * 0.15) : 0.4;
  const region = detectTargetRegion(text);

  return {
    matchedService: topService,
    confidenceScore: parseFloat(confidenceScore.toFixed(2)),
    extractedKeywords: uniqueKeywords.slice(0, 8),
    budgetMentioned,
    region,
  };
}

/**
 * Evaluates candidate leads against GoOnline's qualification heuristics.
 * Strict scoring (0 - 100), requiring >= 70 for automatic outreach.
 */
export function qualifyProspect(
  title: string, 
  content: string, 
  classification: ClassificationResult,
  email: string
): QualificationResult {
  const combinedText = `${title} ${content}`;
  let score = 0;
  const reasons: string[] = [];
  const redFlags: string[] = [];

  // Check critical disqualification signals
  for (const signal of DISQUALIFICATION_SIGNALS) {
    if (signal.pattern.test(combinedText)) {
      redFlags.push(signal.reason);
      score -= 50;
    }
  }

  // 1. Service Alignment (Max 35 points)
  if (classification.extractedKeywords.length >= 3) {
    score += 35;
    reasons.push(`Strong service alignment with ${classification.matchedService.replace('_', ' ')} (${classification.extractedKeywords.length} matching keywords)`);
  } else if (classification.extractedKeywords.length >= 1) {
    score += 25;
    reasons.push(`Moderate service match for ${classification.matchedService.replace('_', ' ')}`);
  } else {
    score += 10;
    reasons.push("Generic web development request");
  }

  // 2. Scope Clarity & Technical Detail (Max 25 points)
  const length = content.length;
  if (length > 400) {
    score += 25;
    reasons.push("Detailed project scope and feature breakdown provided");
  } else if (length > 150) {
    score += 15;
    reasons.push("Sufficient project requirements outlined");
  } else {
    score += 5;
    reasons.push("Brief or minimal request description");
  }

  // 3. Commercial Legitimacy & Budget (Max 25 points)
  if (classification.budgetMentioned) {
    score += 25;
    reasons.push(`Explicit budget specified: "${classification.budgetMentioned}"`);
  } else if (/budget|paying|paid|rate|hourly|fixed price|contract/i.test(combinedText)) {
    score += 15;
    reasons.push("Commercial budget indicator detected");
  } else {
    reasons.push("No explicit budget stated");
  }

  // 4. Contact Legitimacy (Max 15 points)
  const isCorporateDomain = !/@(?:gmail|yahoo|hotmail|outlook|aol|proton|icloud)\.com$/i.test(email);
  if (isCorporateDomain && email.includes("@")) {
    score += 15;
    reasons.push("Direct company domain contact");
  } else if (email.includes("@")) {
    score += 10;
    reasons.push("Direct verified email provided");
  }

  // 5. Target Region Match (US, UK, Canada, Europe)
  if (classification.region && classification.region !== "Global") {
    score += 15;
    reasons.push(`Target Market Match: ${classification.region} commercial request`);
  }

  // Clamp score between 0 and 100
  const finalScore = Math.max(0, Math.min(100, score));
  const isEligible = finalScore >= 70 && redFlags.length === 0;

  return {
    websiteOpportunityScore: 80,
    contactConfidenceScore: isCorporateDomain ? 95 : 85,
    leadQualificationScore: finalScore,
    score: finalScore,
    isEligible,
    reasons,
    redFlags,
    ineligibilityReason: !isEligible ? (redFlags[0] || "Score below 70 threshold") : undefined,
  };
}

export interface LocalBusinessScoreInput {
  businessName: string;
  country: string;
  city: string;
  industry: string;
  websiteStatus: WebsiteStatus;
  hasEmail: boolean;
  hasPhone: boolean;
  hasDecisionMaker?: boolean;
  hasMapsUrl?: boolean;
  isSuppressed?: boolean;
  hasContactConflict?: boolean;
}

/**
 * Scores a local business lead based on website status, industry, contactability, and market priority.
 * Computes 3 distinct scores:
 * 1. websiteOpportunityScore (0-100)
 * 2. contactConfidenceScore (0-100)
 * 3. leadQualificationScore (0-100)
 */
export function scoreLocalBusinessLead(input: LocalBusinessScoreInput): QualificationResult {
  const reasons: string[] = [];
  const redFlags: string[] = [];

  // ==========================================
  // 1. Website Opportunity Score (0 - 100)
  // ==========================================
  let websiteOpportunityScore = 0;
  const status = input.websiteStatus;

  if (status === "no_website_found" || status === "none_found") {
    websiteOpportunityScore = 100;
    reasons.push("High Opportunity: No website found on Google Maps or search");
  } else if (status === "social_only") {
    websiteOpportunityScore = 85;
    reasons.push("High Opportunity: Relies exclusively on Facebook/Instagram");
  } else if (status === "uncertain") {
    websiteOpportunityScore = 40;
    redFlags.push("Uncertain website status: Search verification is incomplete or inconclusive (manual review required)");
    reasons.push("Moderate Opportunity: Missing website field on listing, but secondary search has not verified absence");
  } else {
    websiteOpportunityScore = 15;
    redFlags.push("Existing official website identified (low probability for initial website build)");
    reasons.push("Low Opportunity: Official website already exists (requires redesign or performance angle)");
  }

  // ==========================================
  // 2. Contact Confidence Score (0 - 100)
  // ==========================================
  let contactConfidenceScore = 0;
  if (input.hasContactConflict) {
    contactConfidenceScore = 20;
    redFlags.push("Conflicting contact records detected across different sources");
  } else if (input.hasEmail) {
    contactConfidenceScore = 85;
    if (input.hasDecisionMaker) {
      contactConfidenceScore = 95;
      reasons.push("High Contact Confidence: Verified direct business email with identified decision-maker");
    } else {
      reasons.push("High Contact Confidence: Verified source-backed business email address");
    }
  } else if (input.hasPhone) {
    contactConfidenceScore = 35;
    redFlags.push("Missing email contact (phone number available for phone/WhatsApp outreach only)");
    reasons.push("Partial Contact: Verified business phone number available, but no email discovered");
  } else {
    contactConfidenceScore = 0;
    redFlags.push("No contact details discovered from verified sources");
  }

  // ==========================================
  // 3. Industry & Market Opportunity (0 - 100)
  // ==========================================
  let industryScore = 50;
  const normIndustry = (input.industry || "").toLowerCase();
  const highIntentKeywords = [
    "plumb", "clean", "roof", "landscap", "renovat", "auto", "detail", 
    "mechanic", "builder", "garden", "decorat", "paint", "beauty", "salon", 
    "barber", "pressure wash", "contractor", "electric", "hvac", "handyman",
    "flooring", "restaurant", "cafe", "joiner", "joinery"
  ];

  if (highIntentKeywords.some(kw => normIndustry.includes(kw))) {
    industryScore = 90;
    reasons.push(`High-converting commercial service sector (${input.industry}) with high quote/lead value`);
  } else {
    reasons.push(`Standard local commercial service category (${input.industry})`);
  }

  // Market priority bonus
  const normCountry = (input.country || "").toLowerCase();
  if (normCountry.includes("canada") || normCountry.includes("united kingdom") || normCountry === "uk" || normCountry === "ca") {
    reasons.push("Priority 1 target market (Canada / United Kingdom)");
  } else if (normCountry.includes("united states") || normCountry === "usa" || normCountry === "us") {
    reasons.push("Priority 2 target market (United States)");
  }

  // Suppression check
  if (input.isSuppressed) {
    redFlags.push("Recipient or domain is on the opt-out suppression list");
  }

  // ==========================================
  // 4. Overall Composite Lead Qualification Score
  // ==========================================
  // 40% Website Opportunity + 40% Contact Confidence + 20% Industry Intent
  const rawComposite = Math.round(
    (0.40 * websiteOpportunityScore) + 
    (0.40 * contactConfidenceScore) + 
    (0.20 * industryScore)
  );
  const leadQualificationScore = Math.max(0, Math.min(100, rawComposite));

  // Automated Outreach Eligibility Rules:
  // 1. Must score >= 70
  // 2. Must have verified source-backed email
  // 3. Website status must be confirmed no_website_found or social_only
  // 4. Zero red flags
  const isEligible = 
    leadQualificationScore >= 70 &&
    input.hasEmail &&
    (status === "no_website_found" || status === "social_only" || status === "none_found") &&
    redFlags.length === 0;

  let ineligibilityReason: string | undefined;
  if (!isEligible) {
    if (!input.hasEmail) ineligibilityReason = "Missing verified source-backed email";
    else if (status === "uncertain") ineligibilityReason = "Uncertain website status requires manual review";
    else if (status === "website_exists" || status === "has_website") ineligibilityReason = "Official website already exists";
    else if (input.isSuppressed) ineligibilityReason = "Recipient is on the opt-out suppression list";
    else if (input.hasContactConflict) ineligibilityReason = "Conflicting contact records";
    else if (leadQualificationScore < 70) ineligibilityReason = `Score ${leadQualificationScore} is below the 70 eligibility threshold`;
  }

  return {
    websiteOpportunityScore,
    contactConfidenceScore,
    leadQualificationScore,
    score: leadQualificationScore,
    isEligible,
    reasons,
    redFlags,
    ineligibilityReason,
  };
}

