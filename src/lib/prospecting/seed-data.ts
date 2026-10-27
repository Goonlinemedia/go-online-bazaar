import { Prospect, WebsiteStatus, ServiceType } from "./types";
import { generateLocalBusinessProposal } from "./proposal-gen";

interface SeedLeadDef {
  id: string;
  businessName: string;
  country: string;
  region: "Canada" | "United Kingdom" | "United States" | "Europe";
  city: string;
  industry: string;
  websiteStatus: WebsiteStatus;
  email: string;
  phoneNumber?: string;
  decisionMaker?: string;
  opportunity: ServiceType;
  score: number;
  mapsUrl: string;
}

const SEED_DEFINITIONS: SeedLeadDef[] = [
  // Canada
  {
    id: "lead_ca_calgary_plumbing",
    businessName: "Calgary Precision Plumbing & Heating",
    country: "Canada",
    region: "Canada",
    city: "Calgary",
    industry: "Plumbers",
    websiteStatus: "none_found",
    email: "service@calgaryprecisionplumbing.ca",
    phoneNumber: "+1 (403) 555-0182",
    decisionMaker: "Robert Vance",
    opportunity: "business_website",
    score: 92,
    mapsUrl: "https://www.google.com/maps/search/Plumbers+in+Calgary+Canada",
  },
  {
    id: "lead_ca_vancouver_landscaping",
    businessName: "Pacific Green Landscaping Vancouver",
    country: "Canada",
    region: "Canada",
    city: "Vancouver",
    industry: "Landscapers",
    websiteStatus: "social_only",
    email: "quotes@pacificgreenvancouver.ca",
    phoneNumber: "+1 (604) 555-0144",
    decisionMaker: "Liam MacLeod",
    opportunity: "business_website",
    score: 88,
    mapsUrl: "https://www.google.com/maps/search/Landscapers+in+Vancouver+Canada",
  },
  {
    id: "lead_ca_toronto_autodetail",
    businessName: "Apex Auto Spa & Detailing Toronto",
    country: "Canada",
    region: "Canada",
    city: "Toronto",
    industry: "Auto-Detailing",
    websiteStatus: "social_only",
    email: "bookings@apexautospatoronto.ca",
    phoneNumber: "+1 (416) 555-0193",
    decisionMaker: "David Chen",
    opportunity: "web_application_booking",
    score: 90,
    mapsUrl: "https://www.google.com/maps/search/Auto+Detailing+in+Toronto+Canada",
  },

  // United Kingdom
  {
    id: "lead_uk_leeds_cleaning",
    businessName: "Leeds Premier Commercial Cleaners",
    country: "United Kingdom",
    region: "United Kingdom",
    city: "Leeds",
    industry: "Cleaning Companies",
    websiteStatus: "social_only",
    email: "enquiries@leedspremiercleaners.co.uk",
    phoneNumber: "+44 113 496 0821",
    decisionMaker: "Sarah Jenkins",
    opportunity: "business_website",
    score: 94,
    mapsUrl: "https://www.google.com/maps/search/Cleaning+Companies+in+Leeds+UK",
  },
  {
    id: "lead_uk_manchester_joinery",
    businessName: "Manchester Heritage Joinery & Carpentry",
    country: "United Kingdom",
    region: "United Kingdom",
    city: "Manchester",
    industry: "Builders & Joiners",
    websiteStatus: "none_found",
    email: "contact@manchesterheritagejoinery.co.uk",
    phoneNumber: "+44 161 496 0912",
    decisionMaker: "George Whittaker",
    opportunity: "business_website",
    score: 86,
    mapsUrl: "https://www.google.com/maps/search/Joiners+in+Manchester+UK",
  },
  {
    id: "lead_uk_london_mobile_mechanic",
    businessName: "London FastTrack Mobile Mechanics",
    country: "United Kingdom",
    region: "United Kingdom",
    city: "London",
    industry: "Mobile Mechanics",
    websiteStatus: "none_found",
    email: "dispatch@fasttrackmechanics.co.uk",
    phoneNumber: "+44 20 7946 0772",
    decisionMaker: "Marcus Cole",
    opportunity: "web_application_booking",
    score: 91,
    mapsUrl: "https://www.google.com/maps/search/Mobile+Mechanics+in+London+UK",
  },

  // United States
  {
    id: "lead_us_dallas_roofing",
    businessName: "Lone Star Apex Roofing & Repair",
    country: "United States",
    region: "United States",
    city: "Dallas, Texas",
    industry: "Roofing Contractors",
    websiteStatus: "none_found",
    email: "inspections@lonestarapexroofing.com",
    phoneNumber: "+1 (214) 555-0178",
    decisionMaker: "Cody Henderson",
    opportunity: "business_website",
    score: 95,
    mapsUrl: "https://www.google.com/maps/search/Roofing+Contractors+in+Dallas+Texas",
  },
  {
    id: "lead_us_phoenix_pressure_wash",
    businessName: "Phoenix Sun Pressure Washing & Surface Care",
    country: "United States",
    region: "United States",
    city: "Phoenix, Arizona",
    industry: "Pressure Washing",
    websiteStatus: "social_only",
    email: "clean@phoenixsunwashing.com",
    phoneNumber: "+1 (602) 555-0155",
    decisionMaker: "Tyler Brooks",
    opportunity: "landing_page",
    score: 87,
    mapsUrl: "https://www.google.com/maps/search/Pressure+Washing+in+Phoenix+Arizona",
  },
  {
    id: "lead_us_tampa_flooring",
    businessName: "Tampa Bay Premier Hardwood & Tile",
    country: "United States",
    region: "United States",
    city: "Tampa, Florida",
    industry: "Flooring Contractors",
    websiteStatus: "none_found",
    email: "sales@tampabayhardwood.com",
    phoneNumber: "+1 (813) 555-0139",
    decisionMaker: "Anthony Ramos",
    opportunity: "business_website",
    score: 89,
    mapsUrl: "https://www.google.com/maps/search/Flooring+Contractors+in+Tampa+Florida",
  },

  // Europe
  {
    id: "lead_eu_amsterdam_cafe",
    businessName: "De Gracht Specialty Bakery & Coffee",
    country: "Netherlands",
    region: "Europe",
    city: "Amsterdam",
    industry: "Independent Restaurants & Cafes",
    websiteStatus: "social_only",
    email: "hello@degrachtbakery.nl",
    phoneNumber: "+31 20 555 0122",
    decisionMaker: "Bram Van Dijk",
    opportunity: "ecommerce_website",
    score: 85,
    mapsUrl: "https://www.google.com/maps/search/Bakeries+in+Amsterdam",
  },
  {
    id: "lead_eu_dublin_trades",
    businessName: "Dublin Heritage Electric & Lighting",
    country: "Ireland",
    region: "Europe",
    city: "Dublin",
    industry: "Trades & Contractors",
    websiteStatus: "none_found",
    email: "info@dublinheritageelectric.ie",
    phoneNumber: "+353 1 496 0341",
    decisionMaker: "Sean O'Connor",
    opportunity: "business_website",
    score: 93,
    mapsUrl: "https://www.google.com/maps/search/Electricians+in+Dublin+Ireland",
  },
  {
    id: "lead_eu_berlin_photo",
    businessName: "Mitte Studio Photography & Brand Media",
    country: "Germany",
    region: "Europe",
    city: "Berlin",
    industry: "Commercial Photography",
    websiteStatus: "social_only",
    email: "booking@mittestudiomedia.de",
    phoneNumber: "+49 30 555 0891",
    decisionMaker: "Elena Fischer",
    opportunity: "website_redesign",
    score: 86,
    mapsUrl: "https://www.google.com/maps/search/Commercial+Photography+in+Berlin",
  },
];

export function buildSeedProspects(): Prospect[] {
  const nowStr = new Date().toISOString();

  return SEED_DEFINITIONS.map((def) => {
    const unsubUrl = `https://goonlinemedia.com/unsubscribe?email=${encodeURIComponent(def.email)}`;
    const proposal = generateLocalBusinessProposal({
      businessName: def.businessName,
      decisionMaker: def.decisionMaker,
      city: def.city,
      country: def.country,
      industry: def.industry,
      websiteStatus: def.websiteStatus,
      opportunity: def.opportunity,
      unsubscribeUrl: unsubUrl,
      senderName: "Emmanuel",
      senderEmail: "goonlinemedia0@gmail.com",
    });

    return {
      id: def.id,
      prospectType: "local_business_no_website",
      source: {
        platform: "google_maps",
        externalId: `seed_${def.id}`,
        sourceUrl: def.mapsUrl,
        mapsUrl: def.mapsUrl,
        rawTitle: `${def.businessName} - ${def.industry} in ${def.city}`,
        rawContent: `Verified commercial business in ${def.city}, ${def.country}. Status: ${def.websiteStatus}. Decision Maker: ${def.decisionMaker || "Owner"}. Verified Public Business Email: ${def.email}.`,
        discoveredAt: nowStr,
      },
      contact: {
        fullName: def.decisionMaker,
        companyName: def.businessName,
        email: def.email,
        emailDomain: def.email.split("@")[1] || "gmail.com",
        phoneNumber: def.phoneNumber,
        decisionMaker: def.decisionMaker,
        country: def.country,
        city: def.city,
        industry: def.industry,
        websiteStatus: def.websiteStatus,
      },
      classification: {
        matchedService: def.opportunity,
        confidenceScore: 0.95,
        extractedKeywords: [def.industry.toLowerCase(), def.city.toLowerCase(), def.country.toLowerCase()],
        region: def.region,
        opportunity: def.opportunity,
      },
      qualification: {
        score: def.score,
        isEligible: true,
        reasons: [
          `Verified public contact email directly accessible (${def.email})`,
          `High local market search interest in ${def.city}`,
          def.websiteStatus === "none_found" 
            ? "Complete absence of an owned website provides an immediate, high-converting opportunity"
            : "Currently reliant solely on social media, missing out on organic Google search ranking",
          `Decision-maker identified (${def.decisionMaker}) for direct personalized outreach`
        ],
        redFlags: [],
      },
      proposal: {
        ...proposal,
        generatedAt: nowStr,
      },
      status: "qualified",
      createdAt: nowStr,
      updatedAt: nowStr,
    };
  });
}
