import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Automated Lead Discovery Engine:
 * Specifically tuned to discover commercial website requests from:
 * - United States (US)
 * - United Kingdom (UK)
 * - Canada (CA)
 * - Europe (EU)
 */

export type TargetRegion = "United States" | "United Kingdom" | "Canada" | "Europe" | "Global";

interface DiscoveredLead {
  id: string;
  platform: "reddit_feed" | "google_search" | "job_board";
  title: string;
  content: string;
  url: string;
  authorEmail?: string;
  companyName?: string;
  region: TargetRegion;
}

function detectRegion(text: string, domain: string = ""): TargetRegion {
  const norm = text.toLowerCase();

  // 1. United Kingdom
  if (
    /£|gbp|united\s*kingdom|\buk\b|london|manchester|birmingham|england|scotland|\bgmt\b|\bbst\b/i.test(norm) ||
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.authorization;
  const isManualTrigger = req.query.trigger === "manual" || req.body?.trigger === "manual";
  const emailOnly = req.query.emailOnly === "true" || req.body?.emailOnly === true;

  if (!isManualTrigger && cronSecret && authHeader !== `Bearer ${cronSecret}` && req.headers["x-vercel-cron"] !== "1") {
    return res.status(401).json({ error: "Unauthorized discovery trigger" });
  }

  const discoveredLeads: DiscoveredLead[] = [];

  // ========================================================
  // SOURCE 1: Multi-Region Developer RSS Feeds (US, UK, Canada, Europe)
  // ========================================================
  const feedSources = [
    { name: "Reddit ForHire", url: "https://www.reddit.com/r/forhire/new.rss" },
    { name: "Reddit Freelance", url: "https://www.reddit.com/r/freelance_forhire/new.rss" },
    { name: "WeWorkRemotely", url: "https://weworkremotely.com/categories/remote-programming-jobs.rss" }
  ];

  for (const feed of feedSources) {
    try {
      const rssRes = await fetch(feed.url, {
        headers: { "User-Agent": "web:goonline-prospecting:v1.0 (by /u/goonlinemedia)" }
      });

      if (rssRes.ok) {
        const xml = await rssRes.text();
        const isAtom = xml.includes("<entry>");
        const items = isAtom ? xml.split("<entry>").slice(1) : xml.split("<item>").slice(1);

        for (const item of items) {
          const titleMatch = item.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/);
          const linkMatch = item.match(/<link(?: href="([^"]+)"|>([^<]+)<\/link>)/);
          const contentMatch = item.match(/<(?:content type="html"|description)>([\s\S]*?)<\/(?:content|description)>/);

          if (titleMatch) {
            const rawTitle = titleMatch[1];
            const url = linkMatch ? (linkMatch[1] || linkMatch[2] || "") : "";
            const rawContent = contentMatch ? contentMatch[1].replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " ") : "";

            const combined = `${rawTitle} ${rawContent}`;
            const isHiring = /\[hiring\]|hiring|contract|developer needed|looking for/i.test(combined);
            const isWebRelated = /web|site|dev|store|app|redesign|landing|booking|ecommerce|e-commerce/i.test(combined);

            if (isHiring && isWebRelated) {
              const emailMatch = combined.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
              
              // If narrowing to leads with email only, skip entries without email
              if (emailOnly && !emailMatch) {
                continue;
              }

              const region = detectRegion(combined, emailMatch ? emailMatch[0].split("@")[1] : "");

              discoveredLeads.push({
                id: `feed_${Buffer.from(url).toString("base64").slice(0, 16)}`,
                platform: feed.name.includes("Reddit") ? "reddit_feed" : "job_board",
                title: rawTitle.replace(/&amp;/g, "&"),
                content: rawContent.trim().slice(0, 800),
                url: url,
                authorEmail: emailMatch ? emailMatch[0].toLowerCase() : undefined,
                region,
              });
            }
          }
        }
      }
    } catch (feedErr) {
      console.warn(`Feed error (${feed.name}):`, feedErr);
    }
  }

  // ========================================================
  // SOURCE 2: Google Search Targeting US, UK, Canada & Europe
  // ========================================================
  const googleApiKey = process.env.GOOGLE_SEARCH_API_KEY;
  const googleCx = process.env.GOOGLE_SEARCH_CX;

  if (googleApiKey && googleCx) {
    const regionalQueries = [
      '"looking for a web developer" ("email" OR "@") (US OR UK OR Canada OR Europe OR London OR "New York")',
      '"request for proposal" "website redesign" ("email" OR "@gmail") 2026',
      '"need an e-commerce website" ("contact" OR "email") (USD OR GBP OR CAD OR EUR)',
      '"need a booking system" ("email" OR "@") (London OR "New York" OR Toronto OR Berlin)',
    ];

    for (const q of regionalQueries) {
      try {
        const gUrl = `https://www.googleapis.com/customsearch/v1?key=${googleApiKey}&cx=${googleCx}&q=${encodeURIComponent(q)}&num=10`;
        const gRes = await fetch(gUrl);
        if (gRes.ok) {
          const gData = await gRes.json();
          const items = gData.items || [];
          for (const item of items) {
            const combined = `${item.title} ${item.snippet}`;
            const emailMatch = combined.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
            
            if (emailOnly && !emailMatch) {
              continue;
            }

            const region = detectRegion(combined);

            discoveredLeads.push({
              id: `google_${Buffer.from(item.link).toString("base64").slice(0, 16)}`,
              platform: "google_search",
              title: item.title,
              content: item.snippet,
              url: item.link,
              authorEmail: emailMatch ? emailMatch[0].toLowerCase() : undefined,
              region,
            });
          }
        }
      } catch (gErr) {
        console.warn("Google regional search error:", gErr);
      }
    }
  }

  return res.status(200).json({
    success: true,
    totalDiscovered: discoveredLeads.length,
    regionsCovered: ["United States", "United Kingdom", "Canada", "Europe"],
    leads: discoveredLeads,
    message: `Discovered ${discoveredLeads.length} developer requests across US, UK, Canada, and Europe.`,
  });
}
