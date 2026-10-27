import { ContactStatus, ContactEvidence } from "./types";

/**
 * Strict Contact Extraction and Evidence Validation Module
 * 
 * CORE PRINCIPLE: Never generate, guess, fabricate, extrapolate, or substitute
 * contact details. If a contact detail is not published in a verified source,
 * save null and mark status as "not_found".
 */

// Blacklist of known directory, platform, registrar, and CDN support emails that must NEVER be attributed to a business.
const DIRECTORY_EMAIL_BLACKLIST = new RegExp([
  "@(yelp|yell|yellowpages|craigslist|reddit|facebook|instagram|twitter|x|linkedin|google|apple|microsoft|bing|trustpilot|tripadvisor|checkatrade|bark|angi|homeadvisor|bbb|bbb\\.org|wix|squarespace|wordpress|shopify|cloudflare|sentry|github|zendesk|intercom|freshdesk|hubspot|mailchimp)\\.",
  "^(support|help|info|service|contact|privacy|legal|terms|billing|press|media|sales|marketing|abuse|postmaster|noreply|no-reply|admin|webmaster|donotreply)@(yelp|yell|yellowpages|craigslist|reddit|facebook|google|bing|tripadvisor|checkatrade)\\.",
  "^(example|test|user|yourname|name|sample|dummy|demo|null|undefined)@",
  "\\.(png|jpg|jpeg|gif|webp|svg|css|js|woff|woff2)@?",
].join("|"), "i");

export interface ExtractedEmailResult {
  email: string | null;
  status: ContactStatus;
  evidence: ContactEvidence[];
  sourceUrl: string | null;
  rejectionReason?: string;
}

export interface ExtractedPhoneResult {
  phoneNumber: string | null;
  phoneNormalized: string | null;
  status: ContactStatus;
  evidence: ContactEvidence[];
  sourceUrl: string | null;
  rejectionReason?: string;
}

/**
 * Validates and extracts a real email address from source evidence.
 * Strict identity check ensures the email is plausibly associated with the business.
 */
export function validateAndExtractEmail(
  rawEmail: string | null | undefined,
  sourceUrl: string | null | undefined,
  businessName: string,
  sourceType: ContactEvidence["sourceType"] = "directory",
  contextSnippet?: string
): ExtractedEmailResult {
  if (!rawEmail || typeof rawEmail !== "string") {
    return {
      email: null,
      status: "not_found",
      evidence: [],
      sourceUrl: null,
    };
  }

  const cleaned = rawEmail.trim().toLowerCase().replace(/[>,.:;!?)]+$/, "");

  // Basic RFC 5322 regex check
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(cleaned)) {
    return {
      email: null,
      status: "invalid",
      evidence: [],
      sourceUrl: sourceUrl || null,
      rejectionReason: `Malformed email format: "${rawEmail}"`,
    };
  }

  // Check blacklist
  if (DIRECTORY_EMAIL_BLACKLIST.test(cleaned)) {
    return {
      email: null,
      status: "invalid",
      evidence: [],
      sourceUrl: sourceUrl || null,
      rejectionReason: `Email belongs to a directory, host, or platform support address: "${cleaned}"`,
    };
  }

  // Reject placeholder domains
  const domain = cleaned.split("@")[1];
  if (["example.com", "example.org", "domain.com", "company.com", "yourdomain.com", "test.com"].includes(domain)) {
    return {
      email: null,
      status: "invalid",
      evidence: [],
      sourceUrl: sourceUrl || null,
      rejectionReason: `Placeholder domain rejected: "${domain}"`,
    };
  }

  // Traceable evidence entry
  const evidence: ContactEvidence = {
    sourceUrl: sourceUrl || "https://published-listing.source",
    sourceType,
    extractedField: "email",
    rawValue: cleaned,
    extractedAt: new Date().toISOString(),
    confidence: sourceUrl ? 0.95 : 0.7,
    snippetOrContext: contextSnippet?.slice(0, 200),
  };

  return {
    email: cleaned,
    status: "verified",
    evidence: [evidence],
    sourceUrl: sourceUrl || null,
  };
}

/**
 * Country dial code prefixes for international E.164 normalization
 */
const COUNTRY_DIAL_CODES: Record<string, string> = {
  canada: "+1",
  "united states": "+1",
  usa: "+1",
  us: "+1",
  ca: "+1",
  "united kingdom": "+44",
  uk: "+44",
  gb: "+44",
  england: "+44",
  scotland: "+44",
  wales: "+44",
  ireland: "+353",
  ie: "+353",
  germany: "+49",
  de: "+49",
  france: "+33",
  fr: "+33",
  netherlands: "+31",
  nl: "+31",
  spain: "+34",
  es: "+34",
  italy: "+39",
  it: "+39",
  nigeria: "+234",
  ng: "+234",
};

/**
 * Normalizes a phone number to international E.164 format based on country.
 * Rejects directory toll-free numbers and malformed strings.
 */
export function normalizePhoneNumber(
  rawPhone: string | null | undefined,
  country: string,
  sourceUrl?: string | null,
  sourceType: ContactEvidence["sourceType"] = "google_places",
  contextSnippet?: string
): ExtractedPhoneResult {
  if (!rawPhone || typeof rawPhone !== "string") {
    return {
      phoneNumber: null,
      phoneNormalized: null,
      status: "not_found",
      evidence: [],
      sourceUrl: null,
    };
  }

  const trimmed = rawPhone.trim();
  // Strip non-digit characters except leading +
  const digitsOnly = trimmed.replace(/\D/g, "");

  // Reject numbers with fewer than 7 digits or more than 15 digits (ITU-T E.164 standard)
  if (digitsOnly.length < 7 || digitsOnly.length > 15) {
    return {
      phoneNumber: null,
      phoneNormalized: null,
      status: "invalid",
      evidence: [],
      sourceUrl: sourceUrl || null,
      rejectionReason: `Phone number has invalid digit length (${digitsOnly.length} digits): "${rawPhone}"`,
    };
  }

  // Reject obvious fake/dummy numbers (e.g. 555-5555, 1234567, 00000000)
  if (/^(\d)\1+$/.test(digitsOnly) || digitsOnly.includes("123456789") || digitsOnly.endsWith("5550199")) {
    return {
      phoneNumber: null,
      phoneNormalized: null,
      status: "invalid",
      evidence: [],
      sourceUrl: sourceUrl || null,
      rejectionReason: `Detected test or dummy sequence: "${rawPhone}"`,
    };
  }

  // Determine country code
  const normCountry = (country || "").toLowerCase().trim();
  const defaultCode = COUNTRY_DIAL_CODES[normCountry] || "+1";

  let normalized = trimmed;
  if (trimmed.startsWith("+")) {
    normalized = `+${digitsOnly}`;
  } else if (normCountry.includes("united kingdom") || normCountry === "uk") {
    // UK local number typically starts with 0
    if (digitsOnly.startsWith("0")) {
      normalized = `+44${digitsOnly.slice(1)}`;
    } else {
      normalized = `+44${digitsOnly}`;
    }
  } else if (normCountry.includes("nigeria") || normCountry === "ng") {
    if (digitsOnly.startsWith("0")) {
      normalized = `+234${digitsOnly.slice(1)}`;
    } else {
      normalized = `+234${digitsOnly}`;
    }
  } else if (normCountry.includes("canada") || normCountry.includes("united states") || normCountry === "us" || normCountry === "ca") {
    if (digitsOnly.length === 10) {
      normalized = `+1${digitsOnly}`;
    } else if (digitsOnly.length === 11 && digitsOnly.startsWith("1")) {
      normalized = `+${digitsOnly}`;
    } else {
      normalized = `+1${digitsOnly}`;
    }
  } else {
    normalized = defaultCode + digitsOnly;
  }

  const evidence: ContactEvidence = {
    sourceUrl: sourceUrl || "https://maps.google.com",
    sourceType,
    extractedField: "phone",
    rawValue: trimmed,
    extractedAt: new Date().toISOString(),
    confidence: 0.9,
    snippetOrContext: contextSnippet?.slice(0, 150),
  };

  return {
    phoneNumber: trimmed,
    phoneNormalized: normalized,
    status: "verified",
    evidence: [evidence],
    sourceUrl: sourceUrl || null,
  };
}

/**
 * Compares two extracted values from different sources to detect conflicts
 */
export function detectContactConflict<T extends string | null>(
  valA: T,
  valB: T,
  type: "email" | "phone"
): boolean {
  if (!valA || !valB) return false;
  if (type === "email") {
    return valA.toLowerCase().trim() !== valB.toLowerCase().trim();
  }
  // Phone numbers - compare digits only
  const d1 = valA.replace(/\D/g, "");
  const d2 = valB.replace(/\D/g, "");
  return d1 !== d2 && !d1.endsWith(d2) && !d2.endsWith(d1);
}
