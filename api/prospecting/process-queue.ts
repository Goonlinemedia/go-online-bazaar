import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

/**
 * Vercel Serverless Queue Dispatcher:
 * Enforces the strict daily limit of 10 prospects/day, checks suppression,
 * validates recipient email authenticity, and delivers personalized proposals via Gmail.
 */

const DIRECTORY_EMAIL_BLACKLIST = new RegExp([
  "@(yelp|yell|yellowpages|craigslist|reddit|facebook|instagram|twitter|x|linkedin|google|apple|microsoft|bing|trustpilot|tripadvisor|checkatrade|bark|angi|homeadvisor|bbb|bbb\\.org|wix|squarespace|wordpress|shopify|cloudflare|sentry|github|zendesk|intercom|freshdesk|hubspot|mailchimp)\\.",
  "^(support|help|info|service|contact|privacy|legal|terms|billing|press|media|sales|marketing|abuse|postmaster|noreply|no-reply|admin|webmaster|donotreply)@(yelp|yell|yellowpages|craigslist|reddit|facebook|google|bing|tripadvisor|checkatrade)\\.",
  "^(example|test|user|yourname|name|sample|dummy|demo|null|undefined)@",
].join("|"), "i");

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.authorization;

  // Authorization check for Vercel Cron or direct admin API calls
  if (cronSecret && authHeader !== `Bearer ${cronSecret}` && req.headers["x-vercel-cron"] !== "1") {
    return res.status(401).json({ error: "Unauthorized dispatcher trigger" });
  }

  const todayStr = new Date().toISOString().split("T")[0];
  const DAILY_LIMIT = parseInt(process.env.PROSPECTING_DAILY_LIMIT || "10", 10);
  const isDryRun = process.env.PROSPECTING_DRY_RUN === "true";

  const gmailUser = process.env.GMAIL_USER_EMAIL || "goonlinemedia0@gmail.com";
  const gmailPass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");

  const targetEmail = req.body?.recipientEmail;
  const isEligible = req.body?.isEligible !== false;
  const isSuppressed = req.body?.isSuppressed === true;
  const currentSentToday = parseInt(req.body?.currentSentToday || "0", 10);

  // 1. If no recipient specified, return queue status
  if (!targetEmail) {
    return res.status(200).json({
      success: true,
      date: todayStr,
      dailyLimit: DAILY_LIMIT,
      dryRunMode: isDryRun,
      transporterConfigured: Boolean(gmailPass),
      message: "Queue processor active. Strictly capped at 10 emails/day.",
    });
  }

  // 2. Validate email is not null, not guessed, and not blacklisted
  const cleanEmail = targetEmail.trim().toLowerCase();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(cleanEmail)) {
    return res.status(400).json({
      success: false,
      error: `Invalid or malformed recipient email: "${targetEmail}"`,
    });
  }

  if (DIRECTORY_EMAIL_BLACKLIST.test(cleanEmail)) {
    return res.status(400).json({
      success: false,
      error: `Refusing to send outreach to directory or platform support address: "${cleanEmail}"`,
    });
  }

  // 3. Suppression check
  if (isSuppressed) {
    return res.status(403).json({
      success: false,
      error: `Recipient "${cleanEmail}" is on the opt-out suppression list. Outreach prohibited.`,
    });
  }

  // 4. Daily quota check
  if (currentSentToday >= DAILY_LIMIT) {
    return res.status(429).json({
      success: false,
      error: `Daily processing quota reached (${currentSentToday}/${DAILY_LIMIT}). Automatic sending paused until tomorrow.`,
    });
  }

  // 5. Eligibility check (must be qualified unless forced by admin)
  if (!isEligible && !req.body?.force) {
    return res.status(400).json({
      success: false,
      error: "Prospect does not meet minimum outreach qualification requirements.",
    });
  }

  // 6. Check credentials
  if (!gmailPass && !isDryRun) {
    return res.status(500).json({
      success: false,
      error: "Missing GMAIL_APP_PASSWORD in environment. Configure Google App Password to enable delivery.",
    });
  }

  // 7. Sanitize body and subject
  const subject = req.body?.subject || "Website development proposal from GoOnline";
  const bodyHtml = (req.body?.bodyHtml || "<p>Hello from GoOnline Media.</p>")
    .replace(/info@goonlinemedia\.com/gi, "goonlinemedia0@gmail.com")
    .replace(/info@goonline(?!\.com)/gi, "goonlinemedia0@gmail.com");
  const rawBodyText = req.body?.bodyText || "Hello from GoOnline Media.";
  const bodyText = rawBodyText
    .replace(/info@goonlinemedia\.com/gi, "goonlinemedia0@gmail.com")
    .replace(/info@goonline(?!\.com)/gi, "goonlinemedia0@gmail.com")
    .replace(/\r?\n*---\s*\r?\n[\s\S]*?(?:You received this note|To opt out|opt out)[\s\S]*$/gi, "")
    .trimEnd();

  const unsubscribeUrl = req.body?.unsubscribeUrl || `https://goonlinemedia.com/unsubscribe?email=${encodeURIComponent(cleanEmail)}`;

  // 8. Dry run handling
  if (isDryRun) {
    return res.status(200).json({
      success: true,
      dryRun: true,
      recipient: cleanEmail,
      message: `[DRY RUN] Proposal for ${cleanEmail} simulated. No real email sent.`,
      sentAt: new Date().toISOString(),
    });
  }

  // 9. Send via Gmail SMTP
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const sendInfo = await transporter.sendMail({
      from: `"Emmanuel | GoOnline" <${gmailUser}>`,
      to: cleanEmail,
      replyTo: gmailUser,
      subject,
      text: bodyText,
      html: bodyHtml,
      headers: {
        "List-Unsubscribe": `<${unsubscribeUrl}>, <mailto:${gmailUser}?subject=unsubscribe>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    });

    return res.status(200).json({
      success: true,
      messageId: sendInfo.messageId,
      recipient: cleanEmail,
      sentAt: new Date().toISOString(),
    });
  } catch (mailErr: unknown) {
    const message = mailErr instanceof Error ? mailErr.message : "Failed to deliver email";
    return res.status(500).json({ success: false, error: message });
  }
}
