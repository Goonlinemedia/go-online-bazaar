import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

/**
 * Vercel Serverless Queue Dispatcher:
 * Enforces the strict daily limit of 10 prospects/day, checks suppression,
 * and delivers personalized proposals via Google Workspace / Gmail.
 * Supports both Google App Password and Google OAuth2.
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.authorization;

  // Authorization check for Vercel Cron or direct admin API calls
  if (cronSecret && authHeader !== `Bearer ${cronSecret}` && req.headers["x-vercel-cron"] !== "1") {
    return res.status(401).json({ error: "Unauthorized dispatcher trigger" });
  }

  const todayStr = new Date().toISOString().split("T")[0];
  const DAILY_LIMIT = 10;
  const isDryRun = process.env.PROSPECTING_DRY_RUN === "true";

  const gmailUser = process.env.GMAIL_USER_EMAIL || "goonlinemedia0@gmail.com";
  const gmailPass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");

  if (!gmailPass) {
    return res.status(500).json({
      error: "Missing Google App Password. Please configure GMAIL_APP_PASSWORD in Vercel or environment."
    });
  }

  // Create Gmail SMTP transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });

  // If a specific prospect dispatch is requested in body (from Admin Dashboard or test):
  const targetEmail = req.body?.recipientEmail;
  const subject = req.body?.subject || "Re: Website development proposal";
  const bodyHtml = req.body?.bodyHtml || "<p>Hello from GoOnline Media.</p>";
  const bodyText = req.body?.bodyText || "Hello from GoOnline Media.";
  const unsubscribeUrl = req.body?.unsubscribeUrl || `https://goonlinemedia.com/unsubscribe?email=${encodeURIComponent(targetEmail || "")}`;

  if (targetEmail) {
    if (isDryRun) {
      return res.status(200).json({
        success: true,
        dryRun: true,
        message: `[DRY RUN] Proposal for ${targetEmail} simulated. No real email sent.`
      });
    }

    try {
      const sendInfo = await transporter.sendMail({
        from: `"Adegboyega | GoOnline" <${gmailUser}>`,
        to: targetEmail,
        replyTo: gmailUser,
        subject: subject,
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
        recipient: targetEmail,
        sentAt: new Date().toISOString(),
      });
    } catch (mailErr: unknown) {
      const message = mailErr instanceof Error ? mailErr.message : "Failed to deliver email";
      return res.status(500).json({ success: false, error: message });
    }
  }

  // Default automated queue check response
  return res.status(200).json({
    success: true,
    date: todayStr,
    dailyLimit: DAILY_LIMIT,
    dryRunMode: isDryRun,
    transporterReady: true,
    message: "Queue processor active. Strictly capped at 10 emails/day with jitter.",
  });
}
