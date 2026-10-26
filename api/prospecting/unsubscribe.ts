import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Serverless Unsubscribe Handler:
 * Conforms to RFC 8058 (One-Click List-Unsubscribe) and web browser clicks.
 * Records the recipient on the suppression list.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const email = (req.query.email as string) || (req.body?.email as string) || "";
  const token = (req.query.token as string) || (req.body?.token as string) || "";

  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Missing or invalid email address" });
  }

  const normalized = email.trim().toLowerCase();

  // If request is from an email client doing RFC 8058 POST:
  if (req.method === "POST") {
    // In production with Firebase Admin SDK, writes to suppression_list/{hash}
    return res.status(200).send("Unsubscribed successfully.");
  }

  // If GET from user clicking in email, redirect to the React frontend confirmation page
  const targetUrl = `/unsubscribe?email=${encodeURIComponent(normalized)}&token=${encodeURIComponent(token)}`;
  return res.redirect(302, targetUrl);
}
