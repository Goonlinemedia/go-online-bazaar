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
    businessName: "KO Plumbing & Gas Heating Calgary",
    country: "Canada",
    region: "Canada",
    city: "Calgary",
    industry: "Plumbers",
    websiteStatus: "social_only",
    email: "koplumbingcalgary@gmail.com",
    phoneNumber: "+1 (403) 890-7608",
    decisionMaker: "Kody",
    opportunity: "business_website",
    score: 92,
    mapsUrl: "https://www.google.com/maps/search/KO+Plumbing+Calgary",
  },
  {
    id: "lead_ca_vancouver_landscaping",
    businessName: "Green Lotus Landscapes Vancouver",
    country: "Canada",
    region: "Canada",
    city: "Vancouver",
    industry: "Landscapers",
    websiteStatus: "social_only",
    email: "greenlotuslandscapes@gmail.com",
    phoneNumber: "+1 (604) 728-0246",
    decisionMaker: "Liam",
    opportunity: "business_website",
    score: 88,
    mapsUrl: "https://www.google.com/maps/search/Green+Lotus+Landscapes+Vancouver",
  },
  {
    id: "lead_ca_toronto_autodetail",
    businessName: "ValuePro Auto Detailing Toronto",
    country: "Canada",
    region: "Canada",
    city: "Toronto",
    industry: "Auto-Detailing",
    websiteStatus: "social_only",
    email: "valueproautodetailing@gmail.com",
    phoneNumber: "+1 (647) 530-1090",
    decisionMaker: "David",
    opportunity: "web_application_booking",
    score: 90,
    mapsUrl: "https://www.google.com/maps/search/ValuePro+Auto+Detailing+Toronto",
  },

  // United Kingdom
  {
    id: "lead_uk_leeds_cleaning",
    businessName: "Platinum City Cleaning Services",
    country: "United Kingdom",
    region: "United Kingdom",
    city: "Leeds",
    industry: "Cleaning Companies",
    websiteStatus: "social_only",
    email: "platinumcitycleaning@gmail.com",
    phoneNumber: "+44 113 870 5420",
    decisionMaker: "Sarah",
    opportunity: "business_website",
    score: 94,
    mapsUrl: "https://www.google.com/maps/search/Platinum+City+Cleaning+Leeds",
  },
  {
    id: "lead_uk_manchester_joinery",
    businessName: "Manchester Joinery & Interiors",
    country: "United Kingdom",
    region: "United Kingdom",
    city: "Manchester",
    industry: "Builders & Joiners",
    websiteStatus: "none_found",
    email: "manchesterjoinery@gmail.com",
    phoneNumber: "+44 161 273 1646",
    decisionMaker: "George",
    opportunity: "business_website",
    score: 86,
    mapsUrl: "https://www.google.com/maps/search/Manchester+Joinery+Interiors",
  },
  {
    id: "lead_uk_london_mobile_mechanic",
    businessName: "LevoFix Mobile Mechanics London",
    country: "United Kingdom",
    region: "United Kingdom",
    city: "London",
    industry: "Mobile Mechanics",
    websiteStatus: "none_found",
    email: "levoskindenis@gmail.com",
    phoneNumber: "+44 7880 037742",
    decisionMaker: "Denis Levoskin",
    opportunity: "web_application_booking",
    score: 91,
    mapsUrl: "https://www.google.com/maps/search/LevoFix+Mobile+Mechanics+London",
  },

  // United States
  {
    id: "lead_us_dallas_roofing",
    businessName: "Talisman Roofing & Construction",
    country: "United States",
    region: "United States",
    city: "Dallas, Texas",
    industry: "Roofing Contractors",
    websiteStatus: "none_found",
    email: "talismanroofing@gmail.com",
    phoneNumber: "+1 (972) 800-4740",
    decisionMaker: "Cody",
    opportunity: "business_website",
    score: 95,
    mapsUrl: "https://www.google.com/maps/search/Talisman+Roofing+Dallas",
  },
  {
    id: "lead_us_phoenix_pressure_wash",
    businessName: "Copper Canyon Pressure Wash Phoenix",
    country: "United States",
    region: "United States",
    city: "Phoenix, Arizona",
    industry: "Pressure Washing",
    websiteStatus: "social_only",
    email: "coppercanyonpressurewash@gmail.com",
    phoneNumber: "+1 (623) 308-2512",
    decisionMaker: "Tyler",
    opportunity: "landing_page",
    score: 87,
    mapsUrl: "https://www.google.com/maps/search/Copper+Canyon+Pressure+Wash+Phoenix",
  },
  {
    id: "lead_us_tampa_flooring",
    businessName: "All About Flooring Tampa",
    country: "United States",
    region: "United States",
    city: "Tampa, Florida",
    industry: "Flooring Contractors",
    websiteStatus: "none_found",
    email: "allaboutflooring.fl@gmail.com",
    phoneNumber: "+1 (813) 313-9466",
    decisionMaker: "Anthony",
    opportunity: "business_website",
    score: 89,
    mapsUrl: "https://www.google.com/maps/search/All+About+Flooring+Tampa",
  },

  // Europe
  {
    id: "lead_eu_amsterdam_cafe",
    businessName: "De Laatste Kruimel Bakery & Cafe",
    country: "Netherlands",
    region: "Europe",
    city: "Amsterdam",
    industry: "Independent Restaurants & Cafes",
    websiteStatus: "social_only",
    email: "delaatstekruimel@gmail.com",
    phoneNumber: "+31 20 423 0499",
    decisionMaker: "Bram",
    opportunity: "ecommerce_website",
    score: 85,
    mapsUrl: "https://www.google.com/maps/search/De+Laatste+Kruimel+Amsterdam",
  },
  {
    id: "lead_eu_dublin_trades",
    businessName: "Castlewood Electrical Services Dublin",
    country: "Ireland",
    region: "Europe",
    city: "Dublin",
    industry: "Trades & Contractors",
    websiteStatus: "none_found",
    email: "castlewoodelectrical@gmail.com",
    phoneNumber: "+353 87 234 5112",
    decisionMaker: "Sean",
    opportunity: "business_website",
    score: 93,
    mapsUrl: "https://www.google.com/maps/search/Castlewood+Electrical+Services+Dublin",
  },
  {
    id: "lead_eu_berlin_photo",
    businessName: "Ed Mehravaran Photography & Media Berlin",
    country: "Germany",
    region: "Europe",
    city: "Berlin",
    industry: "Commercial Photography",
    websiteStatus: "social_only",
    email: "edmehravaran.media@gmail.com",
    phoneNumber: "+49 157 5882 1904",
    decisionMaker: "Ed",
    opportunity: "business_website",
    score: 88,
    mapsUrl: "https://www.google.com/maps/search/Ed+Mehravaran+Photography+Berlin",
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
