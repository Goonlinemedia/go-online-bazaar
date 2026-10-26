import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Automated Lead Discovery Engine:
 * Scans Google, public developer forums, and RSS feeds for people/businesses
 * actively looking for website developers.
 */

interface DiscoveredLead {
  id: string;
  platform: "reddit_feed" | "google_search" | "hacker_news" | "job_board";
  title: string;
  content: string;
  url: string;
  authorEmail?: string;
  companyName?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.authorization;
  const isManualTrigger = req.query.trigger === "manual" || req.body?.trigger === "manual";

  if (!isManualTrigger && cronSecret && authHeader !== `Bearer ${cronSecret}` && req.headers["x-vercel-cron"] !== "1") {
    return res.status(401).json({ error: "Unauthorized discovery trigger" });
  }

  const discoveredLeads: DiscoveredLead[] = [];

  // ========================================================
  // SOURCE 1: Live Reddit RSS Hiring Feeds (100% Free, No Key Required)
  // ========================================================
  try {
    const rssRes = await fetch("https://www.reddit.com/r/forhire/new.rss", {
      headers: { "User-Agent": "web:goonline-prospecting:v1.0 (by /u/goonlinemedia)" }
    });

    if (rssRes.ok) {
      const xml = await rssRes.text();
      const entries = xml.split("<entry>").slice(1);

      for (const entry of entries) {
        const titleMatch = entry.match(/<title>(.*?)<\/title>/);
        const linkMatch = entry.match(/<link href="([^"]+)"/);
        const contentMatch = entry.match(/<content type="html">([\s\S]*?)<\/content>/);

        if (titleMatch) {
          const rawTitle = titleMatch[1];
          const url = linkMatch ? linkMatch[1] : "";
          const rawContent = contentMatch ? contentMatch[1].replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " ") : "";

          // Filter for hiring posts that mention website, dev, ecommerce, app, redesign
          const isHiring = /\[hiring\]/i.test(rawTitle);
          const isWebRelated = /web|site|dev|store|app|redesign|landing|booking/i.test(rawTitle + " " + rawContent);

          if (isHiring && isWebRelated) {
            // Extract contact email if provided
            const emailMatch = (rawTitle + " " + rawContent).match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);

            discoveredLeads.push({
              id: `feed_${Buffer.from(url).toString("base64").slice(0, 16)}`,
              platform: "reddit_feed",
              title: rawTitle.replace(/&amp;/g, "&"),
              content: rawContent.trim().slice(0, 800),
              url: url,
              authorEmail: emailMatch ? emailMatch[0].toLowerCase() : undefined,
            });
          }
        }
      }
    }
  } catch (err) {
    console.warn("Reddit RSS fetch warning:", err);
  }

  // ========================================================
  // SOURCE 2: Google Custom Search API (If GOOGLE_SEARCH_KEY provided)
  // Google provides 100 free searches every single day.
  // ========================================================
  const googleApiKey = process.env.GOOGLE_SEARCH_API_KEY;
  const googleCx = process.env.GOOGLE_SEARCH_CX;

  if (googleApiKey && googleCx) {
    try {
      const queries = [
        '"looking for a web developer" OR "need a website designer" budget',
        '"request for proposal" "website redesign" 2026',
      ];
      
      for (const q of queries) {
        const gUrl = `https://www.googleapis.com/customsearch/v1?key=${googleApiKey}&cx=${googleCx}&q=${encodeURIComponent(q)}&num=10`;
        const gRes = await fetch(gUrl);
        if (gRes.ok) {
          const gData = await gRes.json();
          const items = gData.items || [];
          for (const item of items) {
            const emailMatch = (item.title + " " + item.snippet).match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
            discoveredLeads.push({
              id: `google_${Buffer.from(item.link).toString("base64").slice(0, 16)}`,
              platform: "google_search",
              title: item.title,
              content: item.snippet,
              url: item.link,
              authorEmail: emailMatch ? emailMatch[0].toLowerCase() : undefined,
            });
          }
        }
      }
    } catch (gErr) {
      console.warn("Google search warning:", gErr);
    }
  }

  return res.status(200).json({
    success: true,
    totalDiscovered: discoveredLeads.length,
    leads: discoveredLeads,
    message: `Discovered ${discoveredLeads.length} active website developer requests.`,
  });
}
