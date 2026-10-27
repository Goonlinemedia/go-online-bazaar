import { Timestamp } from "firebase/firestore";

export type ServiceType = 
  | "business_website"
  | "ecommerce_website"
  | "website_redesign"
  | "landing_page"
  | "web_application_booking";

export const SERVICE_LABELS: Record<ServiceType, string> = {
  business_website: "Business Website",
  ecommerce_website: "E-commerce Website",
  website_redesign: "Website Redesign",
  landing_page: "Landing Page",
  web_application_booking: "Web Application & Booking System",
};

/**
 * Verified Website Status as required by GoOnline Prospecting Specification:
 * - no_website_found: No official website was found after configured multi-source checks.
 * - website_exists: An official website was identified.
 * - social_only: Only social media or directory profiles were found.
 * - uncertain: Available evidence is insufficient to determine the status.
 * Legacy aliases (none_found, has_website) preserved for backwards compatibility.
 */
export type WebsiteStatus = 
  | "no_website_found" 
  | "website_exists" 
  | "social_only" 
  | "uncertain"
  | "none_found" 
  | "has_website";

export const WEBSITE_STATUS_LABELS: Record<string, string> = {
  no_website_found: "No Official Website Found",
  website_exists: "Official Website Exists",
  social_only: "Social / Directory Only",
  uncertain: "Uncertain (Needs Review)",
  none_found: "No Official Website Found",
  has_website: "Official Website Exists",
};

export type ContactStatus = 
  | "verified" 
  | "unverified" 
  | "not_found" 
  | "conflicting" 
  | "invalid";

export const CONTACT_STATUS_LABELS: Record<ContactStatus, string> = {
  verified: "Verified Source-Backed",
  unverified: "Unverified / Extracted",
  not_found: "Not Found",
  conflicting: "Conflicting Records",
  invalid: "Invalid / Malformed",
};

export type VerificationStatus = 
  | "verified" 
  | "needs_review" 
  | "unverified" 
  | "rejected";

export type ProspectStatus = 
  | "discovered"
  | "qualified"
  | "needs_review"
  | "disqualified"
  | "queued"
  | "sent"
  | "replied"
  | "converted"
  | "opted_out";

export type ProspectSourcePlatform = 
  | "google_places"
  | "google_search"
  | "openstreetmap"
  | "business_directory"
  | "social_media"
  | "manual"
  | "reddit"
  | "job_board";

export type TargetRegion = 
  | "United States"
  | "United Kingdom"
  | "Canada"
  | "Europe"
  | "Nigeria"
  | "Global";

export interface TargetMarketPreset {
  country: string;
  region: TargetRegion;
  priority: "Priority 1" | "Priority 2" | "Expansion";
  cities: string[];
  suggestedIndustries: string[];
  directoryName: string;
  directoryBaseUrl: string;
}

export interface ContactEvidence {
  sourceUrl: string;
  sourceType: "google_places" | "search_snippet" | "directory" | "website_contact_page" | "social_profile" | "manual" | "openstreetmap";
  extractedField: "email" | "phone" | "website" | "address";
  rawValue: string;
  extractedAt: string;
  confidence: number; // 0.0 - 1.0
  snippetOrContext?: string;
  verifiedBy?: string;
}

export interface WebsiteVerificationEvidence {
  sourceUrl: string;
  domainFound?: string;
  classification: "official" | "social" | "directory" | "booking_portal" | "unrelated";
  detectedAt: string;
  notes?: string;
}

export interface LocalBusinessLeadInput {
  businessName: string;
  country: string;
  city: string;
  industry: string;
  websiteStatus?: WebsiteStatus;
  websiteUrl?: string | null;
  mapsUrl?: string;
  email?: string | null;
  emailSourceUrl?: string | null;
  phoneNumber?: string | null;
  phoneSourceUrl?: string | null;
  decisionMaker?: string;
  opportunity?: ServiceType;
  notes?: string;
  placeId?: string;
  address?: string;
}

export interface ProspectContact {
  fullName?: string;
  companyName: string;
  email: string | null;
  emailDomain?: string;
  emailSourceUrl?: string | null;
  emailStatus: ContactStatus;
  emailVerifiedAt?: string | null;
  
  phoneNumber?: string | null;
  phoneNormalized?: string | null;
  phoneSourceUrl?: string | null;
  phoneStatus: ContactStatus;
  phoneVerifiedAt?: string | null;

  websiteUrl?: string | null;
  websiteStatus: WebsiteStatus;
  websiteCheckedAt?: string | null;
  websiteEvidence: WebsiteVerificationEvidence[];
  contactEvidence: ContactEvidence[];

  decisionMaker?: string;
  country: string;
  city: string;
  industry: string;
  formattedAddress?: string;
  postalCode?: string;
  placeId?: string;
}

export interface ProspectScores {
  websiteOpportunityScore: number; // 0 - 100
  contactConfidenceScore: number;  // 0 - 100
  leadQualificationScore: number;  // 0 - 100
  score: number;                   // 0 - 100 (overall alias)
  isEligible: boolean;             // strictly eligible for automatic outreach
  reasons: string[];
  redFlags: string[];
  ineligibilityReason?: string;
}

export interface Prospect {
  id: string;
  prospectType: "local_business_no_website" | "online_job_request";
  
  source: {
    platform: ProspectSourcePlatform;
    externalId: string;
    sourceUrl: string;
    rawTitle: string;
    rawContent: string;
    discoveredAt: Timestamp | string;
    mapsUrl?: string;
  };
  
  contact: ProspectContact;
  
  classification: {
    matchedService: ServiceType;
    confidenceScore: number;
    extractedKeywords: string[];
    budgetMentioned?: string;
    region?: TargetRegion;
    opportunity?: string;
  };
  
  qualification: ProspectScores;
  
  proposal: {
    subjectLine: string;
    bodyHtml: string;
    bodyText: string;
    suggestedTimeline: string;
    portfolioLinksIncluded: string[];
    generatedAt: Timestamp | string;
  };
  
  status: ProspectStatus;
  verificationStatus: VerificationStatus;
  lastVerifiedAt?: Timestamp | string;
  
  delivery?: {
    scheduledFor?: Timestamp | string;
    sentAt?: Timestamp | string;
    messageId?: string;
    threadId?: string;
    error?: string;
  };
  
  createdAt: Timestamp | string;
  updatedAt: Timestamp | string;
}

export interface DailyQuota {
  date: string; // YYYY-MM-DD
  sentCount: number;
  dailyLimit: number; // strictly 10
  isExhausted: boolean;
  sentProspectIds: string[];
  lastSentAt?: Timestamp | string;
}

export interface SuppressionRecord {
  id: string; // sha256 or email
  emailOrDomain: string;
  type: "email" | "domain";
  reason: "user_opt_out" | "bounce" | "manual_admin" | "competitor";
  optedOutAt: Timestamp | string;
  sourceProspectId?: string;
}

export interface SearchRunRecord {
  id: string;
  startedAt: string;
  completedAt?: string;
  query: {
    country: string;
    city: string;
    industry: string;
    keyword?: string;
  };
  totalDiscovered: number;
  totalQualified: number;
  duplicatesPrevented: number;
  errors: string[];
  status: "running" | "completed" | "failed";
}

export interface ProspectingSettings {
  autoPilotEnabled: boolean;
  dailyLimit: number; // strictly 10
  minQualificationScore: number; // default 70
  activeServices: Record<ServiceType, boolean>;
  senderProfile: {
    senderName: string;
    senderEmail: string;
    replyToEmail: string;
    physicalAddress: string;
    calendlyOrBookingUrl?: string;
  };
}
