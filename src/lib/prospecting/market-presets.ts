import { TargetRegion } from "./types";

export interface TargetMarket {
  country: string;
  region: TargetRegion;
  priority: "Priority 1" | "Priority 2" | "Expansion";
  popularCities: string[];
  recommendedIndustries: string[];
  defaultDirectoryName: string;
  buildMapsSearchUrl: (industry: string, city: string) => string;
  buildGoogleSearchVerificationUrl: (businessName: string, city: string) => string;
  buildDirectoryUrl: (industry: string, city: string) => string;
  buildGoogleGmailSearchUrl: (industry: string, city: string) => string;
  buildCraigslistSearchUrl: (industry: string, city: string) => string;
}

export const TARGET_MARKETS: TargetMarket[] = [
  {
    country: "Canada",
    region: "Canada",
    priority: "Priority 1",
    popularCities: ["Calgary", "Ottawa", "Winnipeg", "Toronto", "Vancouver", "Edmonton", "Halifax"],
    recommendedIndustries: [
      "Plumbers",
      "Cleaning Services",
      "Landscapers",
      "Renovation Contractors",
      "Auto-Detailing",
      "Roofing Contractors",
      "Electricians",
      "HVAC Specialists",
    ],
    defaultDirectoryName: "YellowPages Canada / Yelp",
    buildMapsSearchUrl: (industry: string, city: string) => 
      `https://www.google.com/maps/search/${encodeURIComponent(`${industry} in ${city} Canada`)}`,
    buildGoogleSearchVerificationUrl: (businessName: string, city: string) => 
      `https://www.google.com/search?q=${encodeURIComponent(`"${businessName}" ${city} Canada website`)}`,
    buildDirectoryUrl: (industry: string, city: string) => 
      `https://www.yellowpages.ca/search/si/1/${encodeURIComponent(industry)}/${encodeURIComponent(`${city}+AB`)}`,
    buildGoogleGmailSearchUrl: (industry: string, city: string) => 
      `https://www.google.com/search?q=${encodeURIComponent(`"${industry}" "${city}" Canada "@gmail.com"`)}`,
    buildCraigslistSearchUrl: (industry: string, city: string) => 
      `https://www.google.com/search?q=${encodeURIComponent(`site:craigslist.org ("${industry}" OR "website" OR "services") "${city}" "@gmail.com"`)}`,
  },
  {
    country: "United Kingdom",
    region: "United Kingdom",
    priority: "Priority 1",
    popularCities: ["Leeds", "Birmingham", "Bristol", "Manchester", "London", "Sheffield", "Newcastle"],
    recommendedIndustries: [
      "Cleaning Companies",
      "Painters & Decorators",
      "Mobile Mechanics",
      "Builders & Joiners",
      "Gardening Services",
      "Independent Beauty Salons",
      "Roofing Contractors",
      "Plumbing & Heating",
    ],
    defaultDirectoryName: "Yell.com",
    buildMapsSearchUrl: (industry: string, city: string) => 
      `https://www.google.com/maps/search/${encodeURIComponent(`${industry} in ${city} UK`)}`,
    buildGoogleSearchVerificationUrl: (businessName: string, city: string) => 
      `https://www.google.com/search?q=${encodeURIComponent(`"${businessName}" ${city} UK website`)}`,
    buildDirectoryUrl: (industry: string, city: string) => 
      `https://www.yell.com/ucs/UcsSearchAction.do?keywords=${encodeURIComponent(industry)}&location=${encodeURIComponent(city)}`,
    buildGoogleGmailSearchUrl: (industry: string, city: string) => 
      `https://www.google.com/search?q=${encodeURIComponent(`"${industry}" "${city}" UK "@gmail.com"`)}`,
    buildCraigslistSearchUrl: (industry: string, city: string) => 
      `https://www.google.com/search?q=${encodeURIComponent(`site:craigslist.org ("${industry}" OR "website" OR "services") "${city}" "@gmail.com"`)}`,
  },
  {
    country: "United States",
    region: "United States",
    priority: "Priority 2",
    popularCities: ["Columbus, Ohio", "Tampa, Florida", "Phoenix, Arizona", "Dallas, Texas", "Atlanta, Georgia", "Denver, Colorado"],
    recommendedIndustries: [
      "Roofing Contractors",
      "Landscaping Services",
      "Home Cleaning",
      "Pressure Washing",
      "Local Repair & Handyman",
      "Auto Detailing",
      "Flooring Contractors",
      "Tree Service",
    ],
    defaultDirectoryName: "Yelp US",
    buildMapsSearchUrl: (industry: string, city: string) => 
      `https://www.google.com/maps/search/${encodeURIComponent(`${industry} in ${city}`)}`,
    buildGoogleSearchVerificationUrl: (businessName: string, city: string) => 
      `https://www.google.com/search?q=${encodeURIComponent(`"${businessName}" ${city} website`)}`,
    buildDirectoryUrl: (industry: string, city: string) => 
      `https://www.yelp.com/search?find_desc=${encodeURIComponent(industry)}&find_loc=${encodeURIComponent(city)}`,
    buildGoogleGmailSearchUrl: (industry: string, city: string) => 
      `https://www.google.com/search?q=${encodeURIComponent(`"${industry}" "${city}" "@gmail.com"`)}`,
    buildCraigslistSearchUrl: (industry: string, city: string) => 
      `https://www.google.com/search?q=${encodeURIComponent(`site:craigslist.org ("${industry}" OR "website" OR "services") "${city}" "@gmail.com"`)}`,
  },
  {
    country: "Europe (Selected)",
    region: "Europe",
    priority: "Expansion",
    popularCities: ["Amsterdam (Netherlands)", "Dublin (Ireland)", "Berlin (Germany)", "Rotterdam (Netherlands)", "Munich (Germany)"],
    recommendedIndustries: [
      "Trades & Contractors",
      "Local Service Providers",
      "Independent Restaurants & Cafes",
      "Beauty & Hair Salons",
      "Cleaning Services",
      "Commercial Photography",
    ],
    defaultDirectoryName: "Europages / Golden Pages",
    buildMapsSearchUrl: (industry: string, city: string) => 
      `https://www.google.com/maps/search/${encodeURIComponent(`${industry} in ${city}`)}`,
    buildGoogleSearchVerificationUrl: (businessName: string, city: string) => 
      `https://www.google.com/search?q=${encodeURIComponent(`"${businessName}" ${city} website`)}`,
    buildDirectoryUrl: (industry: string, city: string) => 
      `https://www.europages.com/companies/${encodeURIComponent(industry)}.html`,
    buildGoogleGmailSearchUrl: (industry: string, city: string) => 
      `https://www.google.com/search?q=${encodeURIComponent(`"${industry}" "${city}" "@gmail.com"`)}`,
    buildCraigslistSearchUrl: (industry: string, city: string) => 
      `https://www.google.com/search?q=${encodeURIComponent(`site:craigslist.org ("${industry}" OR "website") "${city}" "@gmail.com"`)}`,
  },
];
