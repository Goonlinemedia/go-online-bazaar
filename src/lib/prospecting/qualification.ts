import { ServiceType, TargetRegion } from "./types";

interface ClassificationResult {
  matchedService: ServiceType;
  confidenceScore: number;
  extractedKeywords: string[];
  budgetMentioned?: string;
  region: TargetRegion;
}

interface QualificationResult {
  score: number;
  isEligible: boolean;
  reasons: string[];
  redFlags: string[];
}

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
    score: finalScore,
    isEligible,
    reasons,
    redFlags,
  };
}

export interface LocalBusinessScoreInput {
  businessName: string;
  country: string;
  city: string;
  industry: string;
  websiteStatus: "none_found" | "social_only" | "has_website";
  hasEmail: boolean;
  hasPhone: boolean;
  hasDecisionMaker: boolean;
  hasMapsUrl: boolean;
}

/**
 * Scores a local business lead based on website status, industry, contactability, and market priority.
 */
export function scoreLocalBusinessLead(input: LocalBusinessScoreInput): QualificationResult {
  let score = 0;
  const reasons: string[] = [];
  const redFlags: string[] = [];

  // 1. Website Status (Max 35 points)
  if (input.websiteStatus === "none_found") {
    score += 35;
    reasons.push("High Opportunity: No website found on Google Maps or search");
  } else if (input.websiteStatus === "social_only") {
    score += 30;
    reasons.push("High Opportunity: Relies exclusively on Facebook/Instagram");
  } else {
    score += 5;
    reasons.push("Existing website detected (requires redesign or modernization angle)");
  }

  // 2. High-converting service industry (Max 25 points)
  const normIndustry = input.industry.toLowerCase();
  const highIntentKeywords = [
    "plumb", "clean", "roof", "landscap", "renovat", "auto", "detail", 
    "mechanic", "builder", "garden", "decorat", "paint", "beauty", "salon", 
    "barber", "pressure wash", "contractor", "electric", "hvac", "handyman"
  ];
  const isHighIntent = highIntentKeywords.some(kw => normIndustry.includes(kw));

  if (isHighIntent) {
    score += 25;
    reasons.push(`High-demand local service sector (${input.industry}) with high booking/quote value`);
  } else {
    score += 15;
    reasons.push(`Standard local service business (${input.industry})`);
  }

  // 3. Contactability & Decision-Maker (Max 25 points)
  if (input.hasEmail) {
    score += 15;
    reasons.push("Verified direct business email available");
  } else {
    redFlags.push("Missing email contact (requires phone or social outreach)");
  }

  if (input.hasDecisionMaker) {
    score += 10;
    reasons.push("Owner / decision-maker identified for personalized outreach");
  } else if (input.hasPhone) {
    score += 5;
    reasons.push("Business phone number available as secondary contact");
  }

  // 4. Source & Verification (Max 15 points)
  if (input.hasMapsUrl) {
    score += 10;
    reasons.push("Verified Google Maps business listing");
  }

  // 5. Target Region Priority Match
  const normCountry = input.country.toLowerCase();
  if (normCountry.includes("canada") || normCountry.includes("united kingdom") || normCountry.includes("uk")) {
    score += 5;
    reasons.push("Priority 1 market target (Canada / United Kingdom)");
  } else if (normCountry.includes("united states") || normCountry.includes("usa") || normCountry.includes("us")) {
    score += 3;
    reasons.push("Priority 2 market target (United States)");
  }

  const finalScore = Math.max(0, Math.min(100, score));
  const isEligible = finalScore >= 65 && input.hasEmail;

  return {
    score: finalScore,
    isEligible,
    reasons,
    redFlags,
  };
}

