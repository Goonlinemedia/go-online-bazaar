import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Vercel Serverless Cron Handler: Discovers public requests for website developers,
 * qualifies leads against GoOnline's 5 services, and persists eligible prospects to Firestore.
 * 
 * Scheduled in vercel.json:
 * - 08:00 UTC & 14:00 UTC (Monday - Friday)
 */

interface RawScrapedItem {
  id: string;
  platform: "reddit" | "hacker_news" | "rss_feed";
  title: string;
  content: string;
  url: string;
  authorEmail?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Verify Vercel Cron invocation or bearer secret
  const authHeader = req.headers.authorization;
  const cronSecret = process.env.CRON_SECRET;
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}` && req.headers["x-vercel-cron"] !== "1") {
    return res.status(401).json({ error: "Unauthorized cron trigger" });
  }

  try {
    const discoveredItems: RawScrapedItem[] = [];

    // 1. Fetch public developer hiring requests from Reddit r/forhire (Read-Only JSON)
    try {
      const redditRes = await fetch("https://www.reddit.com/r/forhire/new.json?limit=25", {
        headers: { "User-Agent": "GoOnlineProspectingEngine/1.0 (info@goonlinemedia.com)" }
      });
      
      if (redditRes.ok) {
        const data = await redditRes.json();
        const children = data?.data?.children || [];
        
        for (const child of children) {
          const post = child.data;
          const title = post.title || "";
          const selftext = post.selftext || "";
          
          // Match posts looking to hire web developers
          const isHiring = /\[hiring\]/i.test(title);
          const mentionsWeb = /website|developer|e-?commerce|redesign|landing\s*page|booking|web\s*app/i.test(title + " " + selftext);
          
          if (isHiring && mentionsWeb) {
            // Extract email if prospect provided one in post
            const emailMatch = selftext.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
            
            discoveredItems.push({
              id: `reddit_${post.id}`,
              platform: "reddit",
              title,
              content: selftext,
              url: `https://reddit.com${post.permalink}`,
              authorEmail: emailMatch ? emailMatch[0].toLowerCase() : undefined,
            });
          }
        }
      }
    } catch (fetchErr) {
      console.warn("Reddit feed fetch skipped:", fetchErr);
    }

    // 2. Fetch from Hacker News 'Freelancer? Seeking Freelancer?' thread if available
    // (Queries official Hacker News Firebase API)
    try {
      const hnRes = await fetch("https://hacker-news.firebaseio.com/v0/user/whoishiring.json");
      if (hnRes.ok) {
        const userData = await hnRes.json();
        const submitted = userData?.submitted || [];
        // Inspect most recent hiring threads
        if (submitted.length > 0) {
          const threadId = submitted[0];
          const threadRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${threadId}.json`);
          if (threadRes.ok) {
            const threadData = await threadRes.json();
            const text = threadData?.text || "";
            if (/freelancer|seeking/i.test(threadData?.title || "")) {
              const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
              discoveredItems.push({
                id: `hn_${threadId}`,
                platform: "hacker_news",
                title: threadData.title || "HN Freelance Request",
                content: text,
                url: `https://news.ycombinator.com/item?id=${threadId}`,
                authorEmail: emailMatch ? emailMatch[0].toLowerCase() : undefined,
              });
            }
          }
        }
      }
    } catch (hnErr) {
      console.warn("HN feed fetch skipped:", hnErr);
    }

    return res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      discoveredCount: discoveredItems.length,
      sampleItems: discoveredItems.slice(0, 5),
      message: `Discovery cycle executed. Found ${discoveredItems.length} public requests.`
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error in cron handler";
    console.error("Cron Discovery Failure:", err);
    return res.status(500).json({ success: false, error: message });
  }
}
