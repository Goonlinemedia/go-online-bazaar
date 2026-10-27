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
  LocalBusinessLeadInput,
  WebsiteStatus,
  ContactStatus,
  VerificationStatus,
  ProspectScores
} from "./types";
import { classifyRequest, qualifyProspect, scoreLocalBusinessLead, detectTargetRegion } from "./qualification";
import { generatePersonalizedProposal, generateLocalBusinessProposal } from "./proposal-gen";
import { normalizeEmail, extractDomain, computeHash, buildUnsubscribeUrl } from "./dedup";
import { buildSeedProspects } from "./seed-data";
import { validateAndExtractEmail, normalizePhoneNumber } from "./contact-extractor";
import { verifyBusinessWebsite, SearchProviderFn } from "./website-verifier";
import { discoverViaOverpass, processDiscoveredBusiness } from "./discovery-service";

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
    senderName: "Emmanuel",
    senderEmail: "goonlinemedia0@gmail.com",
    replyToEmail: "goonlinemedia0@gmail.com",
    physicalAddress: "GoOnline Media, Victoria Island, Lagos / London HQ",
    calendlyOrBookingUrl: "https://goonlinemedia.com/#contact",
  },
};

const LOCAL_STORAGE_PROSPECTS_KEY = "goonline_prospects_cache_v9";
const LOCAL_STORAGE_QUOTA_KEY = "goonline_quota_cache_v9";

const LEGACY_EMAIL_MAPPINGS: Record<string, string> = {
  "enquiries@leedspremiercleaners.co.uk": "platinumcitycleaning@gmail.com",
  "service@calgaryprecisionplumbing.ca": "koplumbingcalgary@gmail.com",
  "quotes@pacificgreenvancouver.ca": "greenlotuslandscapes@gmail.com",
  "bookings@apexautospatoronto.ca": "valueproautodetailing@gmail.com",
  "contact@manchesterheritagejoinery.co.uk": "manchesterjoinery@gmail.com",
  "dispatch@fasttrackmechanics.co.uk": "levoskindenis@gmail.com",
  "inspections@lonestarapexroofing.com": "talismanroofing@gmail.com",
  "clean@phoenixsunwashing.com": "coppercanyonpressurewash@gmail.com",
  "sales@tampabayhardwood.com": "allaboutflooring.fl@gmail.com",
  "hello@degrachtbakery.nl": "delaatstekruimel@gmail.com",
  "info@dublinheritageelectric.ie": "castlewoodelectrical@gmail.com",
  "booking@mittestudiomedia.de": "edmehravaran.media@gmail.com",
  "booking@mittestudiophoto.de": "edmehravaran.media@gmail.com",
};

/**
 * Strips the plain text opt-out and address disclaimer footer starting with ---
 */
export function stripDisclaimerFooter(text: string): string {
  if (!text) return "";
  return text
    .replace(/\r?\n*---\s*\r?\n[\s\S]*?(?:You received this note|To opt out|opt out)[\s\S]*$/gi, "")
    .trimEnd();
}

/**
 * Sanitizes any occurrence of outdated emails or sender names in proposal text
 */
export function sanitizeSenderEmail(text: string): string {
  if (!text) return "";
  let res = text
    .replace(/info@goonlinemedia\.com/gi, "goonlinemedia0@gmail.com")
    .replace(/info@goonline(?!\.com)/gi, "goonlinemedia0@gmail.com")
    .replace(/Adegboyega/gi, "Emmanuel");

  for (const [oldEmail, newEmail] of Object.entries(LEGACY_EMAIL_MAPPINGS)) {
    if (res.includes(oldEmail)) {
      res = res.replaceAll(oldEmail, newEmail);
    }
  }
  return res;
}

export function sanitizeProposalText(text: string): string {
  if (!text) return "";
  return stripDisclaimerFooter(sanitizeSenderEmail(text));
}

/**
 * Normalizes legacy or partial prospects so that missing evidence fields default cleanly
 */
export function sanitizeProspect(p: Prospect): Prospect {
  if (!p) return p;

  let rawEmail = p.contact?.email || null;
  if (rawEmail && LEGACY_EMAIL_MAPPINGS[rawEmail.toLowerCase()]) {
    rawEmail = LEGACY_EMAIL_MAPPINGS[rawEmail.toLowerCase()];
  }

  // Normalize website status
  let normWebsiteStatus: WebsiteStatus = p.contact?.websiteStatus || "uncertain";
  if (normWebsiteStatus === "none_found") normWebsiteStatus = "no_website_found";
  if (normWebsiteStatus === "has_website") normWebsiteStatus = "website_exists";

  const email = rawEmail;
  const emailStatus: ContactStatus = p.contact?.emailStatus || (email ? "verified" : "not_found");
  const phone = p.contact?.phoneNumber || null;
  const phoneStatus: ContactStatus = p.contact?.phoneStatus || (phone ? "verified" : "not_found");

  const contact = {
    ...p.contact,
    companyName: p.contact?.companyName || "Local Business",
    email,
    emailDomain: email ? email.split("@")[1] || "gmail.com" : undefined,
    emailStatus,
    emailSourceUrl: p.contact?.emailSourceUrl || (email ? p.source?.sourceUrl : null),
    phoneNumber: phone,
    phoneNormalized: p.contact?.phoneNormalized || phone,
    phoneStatus,
    phoneSourceUrl: p.contact?.phoneSourceUrl || (phone ? p.source?.sourceUrl : null),
    websiteStatus: normWebsiteStatus,
    websiteEvidence: p.contact?.websiteEvidence || [],
    contactEvidence: p.contact?.contactEvidence || [],
    country: p.contact?.country || "United States",
    city: p.contact?.city || "Local",
    industry: p.contact?.industry || "Services",
  };

  const websiteOppScore = p.qualification?.websiteOpportunityScore ?? (
    normWebsiteStatus === "no_website_found" ? 100 : normWebsiteStatus === "social_only" ? 85 : 15
  );
  const contactConfScore = p.qualification?.contactConfidenceScore ?? (email ? 90 : 0);
  const leadScore = p.qualification?.leadQualificationScore ?? (p.qualification?.score || 70);

  const qualification: ProspectScores = {
    websiteOpportunityScore: websiteOppScore,
    contactConfidenceScore: contactConfScore,
    leadQualificationScore: leadScore,
    score: leadScore,
    isEligible: Boolean(p.qualification?.isEligible && email && (normWebsiteStatus === "no_website_found" || normWebsiteStatus === "social_only")),
    reasons: p.qualification?.reasons || [],
    redFlags: p.qualification?.redFlags || [],
    ineligibilityReason: p.qualification?.ineligibilityReason,
  };

  const proposal = p.proposal
    ? {
        ...p.proposal,
        bodyText: sanitizeProposalText(p.proposal.bodyText),
        bodyHtml: sanitizeSenderEmail(p.proposal.bodyHtml),
      }
    : p.proposal;

  return {
    ...p,
    contact,
    qualification,
    proposal,
    verificationStatus: p.verificationStatus || (qualification.isEligible ? "verified" : "needs_review"),
  };
}

/**
 * Returns stored prospects from localStorage or initializes from the verified seed data
 */
export function getCachedProspects(): Prospect[] {
  if (typeof window === "undefined") {
    return buildSeedProspects().map(sanitizeProspect);
  }
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_PROSPECTS_KEY);
    if (cached) {
      const sanitizedJsonStr = sanitizeSenderEmail(cached);
      const parsed = JSON.parse(sanitizedJsonStr);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(sanitizeProspect);
      }
    }
  } catch (e) {
    console.warn("Failed to parse cached prospects:", e);
  }
  const seed = buildSeedProspects().map(sanitizeProspect);
  try {
    localStorage.setItem(LOCAL_STORAGE_PROSPECTS_KEY, JSON.stringify(seed));
  } catch (e) {}
  return seed;
}

export function setCachedProspects(prospects: Prospect[]) {
  if (typeof window === "undefined") return;
  try {
    const sanitized = prospects.map(sanitizeProspect);
    localStorage.setItem(LOCAL_STORAGE_PROSPECTS_KEY, JSON.stringify(sanitized));
  } catch (e) {
    console.warn("Failed to store prospects cache:", e);
  }
}

/**
 * Resets the pipeline to the default curated list of verified commercial leads
 */
export function resetProspectsToDefault(): Prospect[] {
  const seed = buildSeedProspects().map(sanitizeProspect);
  setCachedProspects(seed);
  return seed;
}

export function getTodayQuotaDocId(): string {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

export function getCachedQuota(): DailyQuota {
  const docId = getTodayQuotaDocId();
  if (typeof window !== "undefined") {
    try {
      const cached = localStorage.getItem(`${LOCAL_STORAGE_QUOTA_KEY}_${docId}`);
      if (cached) return JSON.parse(cached);
    } catch (e) {}
  }
  return {
    date: docId,
    sentCount: 0,
    dailyLimit: 10,
    isExhausted: false,
    sentProspectIds: [],
  };
}

export function incrementDailyQuotaSent(prospectId: string): DailyQuota {
  const docId = getTodayQuotaDocId();
  const quota = getCachedQuota();
  quota.sentCount = Math.min(quota.dailyLimit, quota.sentCount + 1);
  quota.isExhausted = quota.sentCount >= quota.dailyLimit;
  if (!quota.sentProspectIds.includes(prospectId)) {
    quota.sentProspectIds.push(prospectId);
  }
  quota.lastSentAt = new Date().toISOString();
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_QUOTA_KEY}_${docId}`, JSON.stringify(quota));
    } catch (e) {}
  }
  return quota;
}

/**
 * Subscribes to real-time prospects list with instant local seed fallback
 */
export function subscribeToProspects(callback: (prospects: Prospect[]) => void) {
  const initial = getCachedProspects();
  callback(initial);

  try {
    const q = query(collection(db, "prospects"), orderBy("createdAt", "desc"), limit(200));
    return onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const prospects: Prospect[] = [];
          snapshot.forEach((doc) => {
            const data = { id: doc.id, ...doc.data() } as Prospect;
            prospects.push(sanitizeProspect(data));
          });
          setCachedProspects(prospects);
          callback(prospects);
        } else {
          callback(initial);
          initial.forEach((p) => {
            setDoc(doc(db, "prospects", p.id), p).catch(() => {});
          });
        }
      },
      (error) => {
        console.warn("Firestore prospects listener fallback to local persistence:", error.message);
        callback(getCachedProspects());
      }
    );
  } catch (err) {
    console.warn("Error establishing prospects listener:", err);
    return () => {};
  }
}

export function subscribeToTodayQuota(callback: (quota: DailyQuota) => void) {
  const docId = getTodayQuotaDocId();
  const initialQuota = getCachedQuota();
  callback(initialQuota);

  try {
    const quotaRef = doc(db, "daily_quotas", docId);
    return onSnapshot(
      quotaRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as DailyQuota;
          if (typeof window !== "undefined") {
            try {
              localStorage.setItem(`${LOCAL_STORAGE_QUOTA_KEY}_${docId}`, JSON.stringify(data));
            } catch (e) {}
          }
          callback(data);
        } else {
          callback(initialQuota);
        }
      },
      (error) => {
        console.warn("Firestore quota listener fallback:", error.message);
        callback(getCachedQuota());
      }
    );
  } catch (err) {
    return () => {};
  }
}

export function subscribeToSuppressionList(callback: (records: SuppressionRecord[]) => void) {
  try {
    const q = query(collection(db, "suppression_list"), orderBy("optedOutAt", "desc"), limit(100));
    return onSnapshot(
      q,
      (snapshot) => {
        const records: SuppressionRecord[] = [];
        snapshot.forEach((doc) => {
          records.push({ id: doc.id, ...doc.data() } as SuppressionRecord);
        });
        callback(records);
      },
      (error) => {
        console.warn("Firestore suppression listener fallback:", error.message);
        callback([]);
      }
    );
  } catch (err) {
    return () => {};
  }
}

/**
 * Manually ingest and qualify a prospect with strict contact validation
 */
export async function ingestManualProspect(params: {
  title: string;
  content: string;
  sourceUrl?: string;
  email: string;
  fullName?: string;
  companyName?: string;
  forceService?: ServiceType;
}): Promise<{ success: boolean; prospectId?: string; prospect?: Prospect; error?: string; qualification?: unknown }> {
  try {
    if (!params.email || !params.email.includes("@") || params.email.includes(".inquiry")) {
      return { success: false, error: "Visible public contact email is required to ingest this prospect." };
    }

    const emailResult = validateAndExtractEmail(params.email, params.sourceUrl, params.companyName || params.title, "manual");
    if (emailResult.status === "invalid") {
      return { success: false, error: emailResult.rejectionReason || "Invalid or blacklisted contact email." };
    }

    const normEmail = emailResult.email || "";

    // 1. Check suppression list
    const hash = await computeHash(normEmail);
    const suppDoc = await getDoc(doc(db, "suppression_list", hash));
    if (suppDoc.exists()) {
      return { success: false, error: "This email address is on the opt-out suppression list." };
    }

    // 2. Check for duplicate email in prospects
    if (normEmail) {
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
    const nowTimestamp = new Date().toISOString();

    const prospectDoc: Prospect = {
      id: prospectId,
      prospectType: "online_job_request",
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
        companyName: params.companyName || params.title,
        email: emailResult.email,
        emailDomain: emailResult.email ? extractDomain(emailResult.email) : undefined,
        emailSourceUrl: params.sourceUrl || null,
        emailStatus: emailResult.status,
        emailVerifiedAt: nowTimestamp,
        phoneNumber: null,
        phoneStatus: "not_found",
        websiteStatus: "no_website_found",
        websiteEvidence: [],
        contactEvidence: emailResult.evidence,
        country: "Global",
        city: "Remote",
        industry: "Web Development",
      },
      classification,
      qualification,
      proposal: {
        ...proposal,
        generatedAt: nowTimestamp,
      },
      status: qualification.isEligible ? "qualified" : "needs_review",
      verificationStatus: qualification.isEligible ? "verified" : "needs_review",
      lastVerifiedAt: nowTimestamp,
      createdAt: nowTimestamp,
      updatedAt: nowTimestamp,
    };

    // Save locally
    const currentCached = getCachedProspects();
    setCachedProspects([prospectDoc, ...currentCached.filter(p => p.id !== prospectId)]);

    try {
      await setDoc(doc(db, "prospects", prospectId), prospectDoc);
    } catch (fsErr) {
      console.warn("Firestore prospect save skipped (cached locally):", fsErr);
    }

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
 * Ingests a local business lead with complete website verification and contact extraction
 */
export async function ingestLocalBusinessProspect(params: LocalBusinessLeadInput): Promise<{
  success: boolean;
  prospectId?: string;
  prospect?: Prospect;
  error?: string;
  qualification?: unknown;
}> {
  try {
    if (!params.email || !params.email.includes("@") || params.email.includes(".inquiry")) {
      return { success: false, error: "A visible public business email is required to log this lead." };
    }

    // 1. Verify Website Status
    const websiteResult = await verifyBusinessWebsite({
      businessName: params.businessName,
      city: params.city,
      country: params.country,
      phoneNumber: params.phoneNumber,
      listingWebsiteUrl: params.websiteUrl,
      placeId: params.placeId,
    });

    // 2. Validate and Extract Email
    const emailResult = validateAndExtractEmail(
      params.email,
      params.emailSourceUrl || params.mapsUrl,
      params.businessName,
      "manual"
    );

    // 3. Normalize Phone Number
    const phoneResult = normalizePhoneNumber(
      params.phoneNumber,
      params.country,
      params.phoneSourceUrl || params.mapsUrl,
      "manual"
    );

    const normEmail = emailResult.email || "";

    // 4. Check suppression list if email exists
    if (normEmail) {
      const hash = await computeHash(normEmail);
      const suppDoc = await getDoc(doc(db, "suppression_list", hash));
      if (suppDoc.exists()) {
        return { success: false, error: "This email address is on the opt-out suppression list." };
      }
    }

    // 5. Score lead with 3-tier model
    const qualification = scoreLocalBusinessLead({
      businessName: params.businessName,
      country: params.country,
      city: params.city,
      industry: params.industry,
      websiteStatus: websiteResult.websiteStatus,
      hasEmail: Boolean(emailResult.email),
      hasPhone: Boolean(phoneResult.phoneNumber),
      hasDecisionMaker: Boolean(params.decisionMaker),
      hasMapsUrl: Boolean(params.mapsUrl),
    });

    // 6. Generate proposal
    const unsubUrl = buildUnsubscribeUrl(normEmail || "no-email@goonlinemedia.com");
    const matchedService: ServiceType = params.opportunity || "business_website";
    const detectedRegion = detectTargetRegion(`${params.country} ${params.city}`, normEmail);

    const proposal = generateLocalBusinessProposal({
      businessName: params.businessName,
      decisionMaker: params.decisionMaker,
      city: params.city,
      country: params.country,
      industry: params.industry,
      websiteStatus: websiteResult.websiteStatus,
      opportunity: matchedService,
      unsubscribeUrl: unsubUrl,
    });

    const prospectId = `local_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const nowTimestamp = new Date().toISOString();

    const prospectDoc: Prospect = {
      id: prospectId,
      prospectType: "local_business_no_website",
      source: {
        platform: "google_places",
        externalId: params.placeId || `manual_${Date.now()}`,
        sourceUrl: params.mapsUrl || "https://maps.google.com",
        mapsUrl: params.mapsUrl,
        rawTitle: `${params.businessName} - ${params.industry} in ${params.city}`,
        rawContent: `Local business in ${params.city}, ${params.country}. Status: ${websiteResult.websiteStatus}. ${params.notes || ""}`,
        discoveredAt: nowTimestamp,
      },
      contact: {
        fullName: params.decisionMaker,
        companyName: params.businessName,
        email: emailResult.email,
        emailDomain: emailResult.email ? extractDomain(emailResult.email) : undefined,
        emailSourceUrl: emailResult.sourceUrl,
        emailStatus: emailResult.status,
        emailVerifiedAt: emailResult.email ? nowTimestamp : null,

        phoneNumber: phoneResult.phoneNumber,
        phoneNormalized: phoneResult.phoneNormalized,
        phoneSourceUrl: phoneResult.sourceUrl,
        phoneStatus: phoneResult.status,
        phoneVerifiedAt: phoneResult.phoneNumber ? nowTimestamp : null,

        websiteUrl: websiteResult.websiteUrl,
        websiteStatus: websiteResult.websiteStatus,
        websiteCheckedAt: websiteResult.checkedAt,
        websiteEvidence: websiteResult.evidence,
        contactEvidence: [...emailResult.evidence, ...phoneResult.evidence],

        decisionMaker: params.decisionMaker,
        country: params.country,
        city: params.city,
        industry: params.industry,
        formattedAddress: params.address,
        placeId: params.placeId,
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
      verificationStatus: qualification.isEligible ? "verified" : "needs_review",
      lastVerifiedAt: nowTimestamp,
      createdAt: nowTimestamp,
      updatedAt: nowTimestamp,
    };

    // Save locally
    const currentCached = getCachedProspects();
    setCachedProspects([prospectDoc, ...currentCached.filter(p => p.id !== prospectId)]);

    try {
      await setDoc(doc(db, "prospects", prospectId), prospectDoc);
    } catch (fsErr) {
      console.warn("Firestore prospect save skipped (cached locally):", fsErr);
    }

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
 * Executes multi-source discovery for a target market and ingests results
 */
export async function discoverAndIngestProspects(queryInput: {
  city: string;
  country: string;
  industry: string;
  searchProvider?: SearchProviderFn;
}): Promise<{
  discovered: number;
  qualified: number;
  duplicatesPrevented: number;
  prospects: Prospect[];
  errors: string[];
}> {
  const errors: string[] = [];
  const existing = getCachedProspects();
  const seenKeys = new Set<string>(existing.map(p => p.id));
  
  let rawListings: any[] = [];
  try {
    rawListings = await discoverViaOverpass(queryInput.industry, queryInput.city, queryInput.country);
  } catch (err) {
    errors.push(`Overpass error: ${(err as Error).message}`);
  }

  const added: Prospect[] = [];
  let duplicatesPrevented = 0;

  for (const raw of rawListings) {
    if (added.length >= 10) break; // Enforce strict daily limit
    const { prospect, duplicate } = await processDiscoveredBusiness(raw, seenKeys, queryInput.searchProvider);
    if (duplicate || !prospect) {
      duplicatesPrevented++;
      continue;
    }
    seenKeys.add(prospect.id);
    added.push(prospect);
  }

  if (added.length > 0) {
    const updated = [...added, ...existing];
    setCachedProspects(updated);

    for (const p of added) {
      try {
        await setDoc(doc(db, "prospects", p.id), p);
      } catch (_) {}
    }
  }

  return {
    discovered: rawListings.length,
    qualified: added.filter(p => p.qualification.isEligible).length,
    duplicatesPrevented,
    prospects: added,
    errors,
  };
}

/**
 * Retries website and contact verification for an existing prospect
 */
export async function retryProspectVerification(
  id: string,
  searchProvider?: SearchProviderFn
): Promise<Prospect | null> {
  const current = getCachedProspects();
  const target = current.find(p => p.id === id);
  if (!target) return null;

  const websiteResult = await verifyBusinessWebsite({
    businessName: target.contact.companyName,
    city: target.contact.city,
    country: target.contact.country,
    phoneNumber: target.contact.phoneNumber,
    listingWebsiteUrl: target.contact.websiteUrl,
    placeId: target.contact.placeId,
    searchProvider,
  });

  const updatedContact = {
    ...target.contact,
    websiteStatus: websiteResult.websiteStatus,
    websiteUrl: websiteResult.websiteUrl,
    websiteCheckedAt: websiteResult.checkedAt,
    websiteEvidence: websiteResult.evidence,
  };

  const qualification = scoreLocalBusinessLead({
    businessName: target.contact.companyName,
    country: target.contact.country,
    city: target.contact.city,
    industry: target.contact.industry,
    websiteStatus: websiteResult.websiteStatus,
    hasEmail: Boolean(target.contact.email),
    hasPhone: Boolean(target.contact.phoneNumber),
    hasDecisionMaker: Boolean(target.contact.decisionMaker),
    hasMapsUrl: Boolean(target.source?.mapsUrl),
  });

  const updated: Prospect = {
    ...target,
    contact: updatedContact,
    qualification,
    verificationStatus: qualification.isEligible ? "verified" : "needs_review",
    status: qualification.isEligible ? "qualified" : "needs_review",
    lastVerifiedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const newList = current.map(p => p.id === id ? updated : p);
  setCachedProspects(newList);

  try {
    await updateDoc(doc(db, "prospects", id), {
      contact: updatedContact,
      qualification,
      verificationStatus: updated.verificationStatus,
      status: updated.status,
      lastVerifiedAt: updated.lastVerifiedAt,
      updatedAt: updated.updatedAt,
    });
  } catch (_) {}

  return updated;
}

/**
 * Marks a record as incorrect / rejected with reason
 */
export async function markProspectIncorrect(id: string, reason: string): Promise<void> {
  const current = getCachedProspects();
  const updated = current.map((p) => {
    if (p.id !== id) return p;
    return {
      ...p,
      verificationStatus: "rejected" as VerificationStatus,
      status: "disqualified" as Prospect["status"],
      qualification: {
        ...p.qualification,
        isEligible: false,
        redFlags: [...(p.qualification.redFlags || []), `Marked incorrect by admin: ${reason}`],
        ineligibilityReason: `Marked incorrect: ${reason}`,
      },
      updatedAt: new Date().toISOString(),
    };
  });

  setCachedProspects(updated);

  try {
    await updateDoc(doc(db, "prospects", id), {
      verificationStatus: "rejected",
      status: "disqualified",
      updatedAt: new Date().toISOString(),
    });
  } catch (_) {}
}

/**
 * Excludes a lead and adds it to suppression list
 */
export async function excludeProspect(id: string, reason: string): Promise<void> {
  const current = getCachedProspects();
  const target = current.find(p => p.id === id);
  if (!target) return;

  if (target.contact.email) {
    await addToSuppressionList(target.contact.email, "manual_admin");
  }

  await updateProspectStatus(id, "opted_out");
}

export async function updateProspectStatus(id: string, status: Prospect["status"]) {
  const current = getCachedProspects();
  const updated = current.map((p) => (p.id === id ? { ...p, status, updatedAt: new Date().toISOString() } : p));
  setCachedProspects(updated);

  try {
    const ref = doc(db, "prospects", id);
    await updateDoc(ref, { 
      status,
      updatedAt: Timestamp.now(),
    });
  } catch (err) {
    console.warn("Firestore status update error (saved locally):", err);
  }
}

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
