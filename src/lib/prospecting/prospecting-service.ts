import { 
  collection, 
  doc, 
  query, 
  orderBy, 
  onSnapshot, 
  setDoc, 
  updateDoc, 
  getDoc, 
  getDocs,
  where,
  Timestamp, 
  limit 
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { 
  Prospect, 
  DailyQuota, 
  SuppressionRecord, 
  ProspectingSettings,
  ServiceType,
  LocalBusinessLeadInput 
} from "./types";
import { classifyRequest, qualifyProspect, scoreLocalBusinessLead, detectTargetRegion } from "./qualification";
import { generatePersonalizedProposal, generateLocalBusinessProposal } from "./proposal-gen";
import { normalizeEmail, extractDomain, computeHash, buildUnsubscribeUrl } from "./dedup";

export const DEFAULT_SETTINGS: ProspectingSettings = {
  autoPilotEnabled: true,
  dailyLimit: 10,
  minQualificationScore: 70,
  activeServices: {
    business_website: true,
    ecommerce_website: true,
    website_redesign: true,
    landing_page: true,
    web_application_booking: true,
  },
  senderProfile: {
    senderName: "Adegboyega | GoOnline",
    senderEmail: "info@goonlinemedia.com",
    replyToEmail: "info@goonlinemedia.com",
    physicalAddress: "GoOnline Media, Victoria Island, Lagos / London HQ",
    calendlyOrBookingUrl: "https://goonlinemedia.com/#contact",
  },
};

/**
 * Returns formatted YYYY-MM-DD string for today's quota doc
 */
export function getTodayQuotaDocId(): string {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

/**
 * Subscribes to real-time prospects list
 */
export function subscribeToProspects(callback: (prospects: Prospect[]) => void) {
  const q = query(collection(db, "prospects"), orderBy("createdAt", "desc"), limit(200));
  return onSnapshot(q, (snapshot) => {
    const prospects: Prospect[] = [];
    snapshot.forEach((doc) => {
      prospects.push({ id: doc.id, ...doc.data() } as Prospect);
    });
    callback(prospects);
  });
}

/**
 * Subscribes to today's daily quota doc
 */
export function subscribeToTodayQuota(callback: (quota: DailyQuota) => void) {
  const docId = getTodayQuotaDocId();
  const quotaRef = doc(db, "daily_quotas", docId);
  return onSnapshot(quotaRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.data() as DailyQuota);
    } else {
      callback({
        date: docId,
        sentCount: 0,
        dailyLimit: 10,
        isExhausted: false,
        sentProspectIds: [],
      });
    }
  });
}

/**
 * Subscribes to suppression list
 */
export function subscribeToSuppressionList(callback: (records: SuppressionRecord[]) => void) {
  const q = query(collection(db, "suppression_list"), orderBy("optedOutAt", "desc"), limit(100));
  return onSnapshot(q, (snapshot) => {
    const records: SuppressionRecord[] = [];
    snapshot.forEach((doc) => {
      records.push({ id: doc.id, ...doc.data() } as SuppressionRecord);
    });
    callback(records);
  });
}

/**
 * Manually ingest and qualify a prospect from raw pasted text or post info
 */
export async function ingestManualProspect(params: {
  title: string;
  content: string;
  sourceUrl?: string;
  email: string;
  fullName?: string;
  companyName?: string;
  forceService?: ServiceType;
}): Promise<{ success: boolean; prospectId?: string; error?: string; qualification?: unknown }> {
  try {
    const uniqueSuffix = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const effectiveEmail = params.email && params.email.includes("@") 
      ? params.email 
      : `dm_lead_${uniqueSuffix}@reddit.inquiry`;

    const normEmail = normalizeEmail(effectiveEmail);
    const domain = extractDomain(normEmail);

    // 1. Check suppression list
    const hash = await computeHash(normEmail);
    const suppDoc = await getDoc(doc(db, "suppression_list", hash));
    if (suppDoc.exists()) {
      return { success: false, error: "This email address is on the opt-out suppression list." };
    }

    // 2. Check for duplicate email in prospects (only for real email addresses)
    if (!normEmail.includes(".inquiry")) {
      const existingQ = query(collection(db, "prospects"), where("contact.email", "==", normEmail), limit(1));
      const existingSnap = await getDocs(existingQ);
      if (!existingSnap.empty) {
        return { success: false, error: "A prospect with this email address has already been processed." };
      }
    }

    // 3. Classify and Qualify
    const classification = classifyRequest(`${params.title} ${params.content}`);
    if (params.forceService) {
      classification.matchedService = params.forceService;
    }

    const qualification = qualifyProspect(params.title, params.content, classification, normEmail);

    // 4. Generate proposal
    const unsubUrl = buildUnsubscribeUrl(normEmail);
    const proposal = generatePersonalizedProposal({
      fullName: params.fullName,
      companyName: params.companyName,
      matchedService: classification.matchedService,
      keywords: classification.extractedKeywords,
      rawTitle: params.title,
      rawContent: params.content,
      unsubscribeUrl: unsubUrl,
    });

    const prospectId = `pr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const nowTimestamp = Timestamp.now();

    const prospectDoc: Prospect = {
      id: prospectId,
      source: {
        platform: "manual",
        externalId: `manual_${Date.now()}`,
        sourceUrl: params.sourceUrl || "https://goonlinemedia.com/admin",
        rawTitle: params.title,
        rawContent: params.content,
        discoveredAt: nowTimestamp,
      },
      contact: {
        fullName: params.fullName,
        companyName: params.companyName,
        email: normEmail,
        emailDomain: domain,
      },
      classification,
      qualification,
      proposal: {
        ...proposal,
        generatedAt: nowTimestamp,
      },
      status: qualification.isEligible ? "qualified" : "needs_review",
      createdAt: nowTimestamp,
      updatedAt: nowTimestamp,
    };

    await setDoc(doc(db, "prospects", prospectId), prospectDoc);

    return { 
      success: true, 
      prospectId, 
      prospect: prospectDoc,
      qualification 
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to ingest prospect";
    return { success: false, error: message };
  }
}

/**
 * Ingests a local business lead (no website or social-only) with dedicated qualification & proposal synthesis.
 */
export async function ingestLocalBusinessProspect(params: LocalBusinessLeadInput): Promise<{
  success: boolean;
  prospectId?: string;
  prospect?: Prospect;
  error?: string;
  qualification?: unknown;
}> {
  try {
    const normEmail = normalizeEmail(params.email);
    const domain = extractDomain(normEmail);

    // 1. Check suppression list
    const hash = await computeHash(normEmail);
    const suppDoc = await getDoc(doc(db, "suppression_list", hash));
    if (suppDoc.exists()) {
      return { success: false, error: "This email address is on the opt-out suppression list." };
    }

    // 2. Check for duplicate email in prospects
    if (normEmail && !normEmail.includes(".inquiry")) {
      const existingQ = query(collection(db, "prospects"), where("contact.email", "==", normEmail), limit(1));
      const existingSnap = await getDocs(existingQ);
      if (!existingSnap.empty) {
        return { success: false, error: `A lead with email "${normEmail}" has already been logged.` };
      }
    }

    // 3. Score lead using the Local Business Qualification Model
    const qualification = scoreLocalBusinessLead({
      businessName: params.businessName,
      country: params.country,
      city: params.city,
      industry: params.industry,
      websiteStatus: params.websiteStatus,
      hasEmail: Boolean(normEmail),
      hasPhone: Boolean(params.phoneNumber),
      hasDecisionMaker: Boolean(params.decisionMaker),
      hasMapsUrl: Boolean(params.mapsUrl),
    });

    // 4. Generate the personalized cold outreach proposal
    const unsubUrl = buildUnsubscribeUrl(normEmail);
    const matchedService: ServiceType = params.opportunity || "business_website";
    const detectedRegion = detectTargetRegion(`${params.country} ${params.city}`, normEmail);

    const proposal = generateLocalBusinessProposal({
      businessName: params.businessName,
      decisionMaker: params.decisionMaker,
      city: params.city,
      country: params.country,
      industry: params.industry,
      websiteStatus: params.websiteStatus,
      opportunity: matchedService,
      unsubscribeUrl: unsubUrl,
    });

    const prospectId = `local_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const nowTimestamp = Timestamp.now();

    const prospectDoc: Prospect = {
      id: prospectId,
      prospectType: "local_business_no_website",
      source: {
        platform: "google_maps",
        externalId: `maps_${Date.now()}`,
        sourceUrl: params.mapsUrl || "https://maps.google.com",
        mapsUrl: params.mapsUrl,
        rawTitle: `${params.businessName} - ${params.industry} in ${params.city}`,
        rawContent: `Local business in ${params.city}, ${params.country}. Status: ${params.websiteStatus}. ${params.notes || ""}`,
        discoveredAt: nowTimestamp,
      },
      contact: {
        fullName: params.decisionMaker,
        companyName: params.businessName,
        email: normEmail,
        emailDomain: domain,
        phoneNumber: params.phoneNumber,
        decisionMaker: params.decisionMaker,
        country: params.country,
        city: params.city,
        industry: params.industry,
        websiteStatus: params.websiteStatus,
      },
      classification: {
        matchedService,
        confidenceScore: 0.95,
        extractedKeywords: [params.industry.toLowerCase(), params.city.toLowerCase(), params.country.toLowerCase()],
        region: detectedRegion,
        opportunity: matchedService,
      },
      qualification,
      proposal: {
        ...proposal,
        generatedAt: nowTimestamp,
      },
      status: qualification.isEligible ? "qualified" : "needs_review",
      createdAt: nowTimestamp,
      updatedAt: nowTimestamp,
    };

    await setDoc(doc(db, "prospects", prospectId), prospectDoc);

    return {
      success: true,
      prospectId,
      prospect: prospectDoc,
      qualification,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to ingest local business lead";
    return { success: false, error: message };
  }
}

/**
 * Updates status of a prospect (e.g. mark sent, qualified, converted, disqualified)
 */
export async function updateProspectStatus(id: string, status: Prospect["status"]) {
  const ref = doc(db, "prospects", id);
  await updateDoc(ref, { 
    status,
    updatedAt: Timestamp.now(),
  });
}

/**
 * Adds an email or domain directly to suppression list
 */
export async function addToSuppressionList(emailOrDomain: string, reason: SuppressionRecord["reason"] = "manual_admin") {
  const normalized = emailOrDomain.trim().toLowerCase();
  const hash = await computeHash(normalized);
  const isDomain = !normalized.includes("@") || normalized.startsWith("@");
  
  await setDoc(doc(db, "suppression_list", hash), {
    id: hash,
    emailOrDomain: normalized,
    type: isDomain ? "domain" : "email",
    reason,
    optedOutAt: Timestamp.now(),
  });
}
