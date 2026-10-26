/**
 * Utility functions for prospect normalization, deduplication, and suppression verification.
 */

export function normalizeEmail(email: string): string {
  if (!email) return "";
  const cleaned = email.trim().toLowerCase();
  // Remove trailing periods or brackets commonly attached in text scrapes
  return cleaned.replace(/[>,.:;!?)]+$/, "");
}

export function extractDomain(emailOrUrl: string): string {
  if (!emailOrUrl) return "";
  if (emailOrUrl.includes("@")) {
    const parts = emailOrUrl.split("@");
    return parts[parts.length - 1].toLowerCase().trim();
  }
  try {
    const urlObj = new URL(emailOrUrl.startsWith("http") ? emailOrUrl : `https://${emailOrUrl}`);
    return urlObj.hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return emailOrUrl.toLowerCase().trim();
  }
}

/**
 * Creates a stable deterministic hash for suppression list indexing
 */
export async function computeHash(input: string): Promise<string> {
  const normalized = input.trim().toLowerCase();
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const msgBuffer = new TextEncoder().encode(normalized);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  }
  // Simple fallback string hash if crypto.subtle not available
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `h_${Math.abs(hash)}`;
}

/**
 * Generates an unsubscribe URL with an HMAC-like token
 */
export function buildUnsubscribeUrl(email: string, baseUrl = "https://goonlinemedia.com"): string {
  const norm = normalizeEmail(email);
  // Base64 encode for clean URL transport
  const encodedEmail = encodeURIComponent(norm);
  const token = btoa(`${norm}:goonline_optout_${norm.length * 37}`).replace(/=/g, "");
  return `${baseUrl}/unsubscribe?email=${encodedEmail}&token=${token}`;
}

/**
 * Verifies if an unsubscribe token matches the email
 */
export function verifyUnsubscribeToken(email: string, token: string): boolean {
  if (!email || !token) return false;
  const norm = normalizeEmail(email);
  const expectedToken = btoa(`${norm}:goonline_optout_${norm.length * 37}`).replace(/=/g, "");
  return token === expectedToken;
}
