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

export type WebsiteStatus = "none_found" | "social_only" | "has_website";

export const WEBSITE_STATUS_LABELS: Record<WebsiteStatus, string> = {
  none_found: "No Website Found",
  social_only: "Social Media Only (FB/IG)",
  has_website: "Existing / Outdated Website",
};

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
  | "reddit"
  | "hacker_news"
  | "rss_feed"
  | "manual"
  | "twitter_x"
  | "job_board"
  | "google_maps"
  | "business_directory"
  | "social_media";

export type TargetRegion = 
  | "United States"
  | "United Kingdom"
  | "Canada"
  | "Europe"
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

export interface LocalBusinessLeadInput {
  businessName: string;
  country: string;
  city: string;
  industry: string;
  websiteStatus: WebsiteStatus;
  mapsUrl?: string;
  email: string;
  phoneNumber?: string;
  decisionMaker?: string;
  opportunity?: ServiceType;
  notes?: string;
}

export interface Prospect {
  id: string;
  prospectType?: "local_business_no_website" | "online_job_request";
  source: {
    platform: ProspectSourcePlatform;
    externalId: string;
    sourceUrl: string;
    rawTitle: string;
    rawContent: string;
    discoveredAt: Timestamp | string;
    mapsUrl?: string;
  };
  contact: {
    fullName?: string;
    companyName?: string;
    email: string;
    emailDomain: string;
    websiteUrl?: string;
    phoneNumber?: string;
    decisionMaker?: string;
    country?: string;
    city?: string;
    industry?: string;
    websiteStatus?: WebsiteStatus;
  };
  classification: {
    matchedService: ServiceType;
    confidenceScore: number;
    extractedKeywords: string[];
    budgetMentioned?: string;
    region?: TargetRegion;
    opportunity?: string;
  };
  qualification: {
    score: number; // 0 - 100
    isEligible: boolean; // >= 70
    reasons: string[];
    redFlags: string[];
  };
  proposal: {
    subjectLine: string;
    bodyHtml: string;
    bodyText: string;
    suggestedTimeline: string;
    portfolioLinksIncluded: string[];
    generatedAt: Timestamp | string;
  };
  status: ProspectStatus;
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
  dailyLimit: number; // 10
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

export interface ProspectingSettings {
  autoPilotEnabled: boolean; // default true for automatic sending for eligible leads
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
