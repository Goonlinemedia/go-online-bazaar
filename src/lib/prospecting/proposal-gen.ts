import { ServiceType, Prospect } from "./types";

interface ProposalOutput {
  subjectLine: string;
  bodyHtml: string;
  bodyText: string;
  suggestedTimeline: string;
  portfolioLinksIncluded: string[];
}

interface ProposalContext {
  fullName?: string;
  companyName?: string;
  matchedService: ServiceType;
  keywords: string[];
  rawTitle: string;
  rawContent: string;
  unsubscribeUrl: string;
  senderName?: string;
  senderEmail?: string;
  physicalAddress?: string;
}

const SERVICE_BLUEPRINTS: Record<ServiceType, {
  serviceHeadline: string;
  defaultTimeline: string;
  keyBullets: string[];
  portfolioAnchor: string;
}> = {
  business_website: {
    serviceHeadline: "high-performance, modern business websites engineered for credibility and lead generation",
    defaultTimeline: "10 to 14 business days",
    keyBullets: [
      "Mobile-first, lightning-fast responsive interface built on modern React and cloud infrastructure",
      "Built-in search engine optimization (SEO) architecture and Google Core Web Vitals compliance",
      "Direct lead capture routing with instant email/WhatsApp notification delivery"
    ],
    portfolioAnchor: "https://goonlinemedia.com/#services"
  },
  ecommerce_website: {
    serviceHeadline: "high-converting e-commerce storefronts with seamless catalog management and checkout flows",
    defaultTimeline: "2 to 3 weeks",
    keyBullets: [
      "Frictionless checkout experience with integrated payment gateways (Paystack, Stripe, Card, Transfer)",
      "Intuitive product inventory management, category filtering, and real-time order alerts",
      "Optimized cart abandonment safeguards and mobile-speed checkout engineering"
    ],
    portfolioAnchor: "https://goonlinemedia.com/#pricing"
  },
  website_redesign: {
    serviceHeadline: "complete website redesigns that modernize visual branding and dramatically accelerate loading speeds",
    defaultTimeline: "7 to 10 business days",
    keyBullets: [
      "Comprehensive UI/UX overhaul removing sluggish legacy code and broken mobile layouts",
      "Performance optimization targeting 90+ Google PageSpeed and Lighthouse benchmarks",
      "Preservation and enhancement of your existing SEO rankings and domain equity"
    ],
    portfolioAnchor: "https://goonlinemedia.com/#services"
  },
  landing_page: {
    serviceHeadline: "laser-focused, conversion-optimized landing pages designed for campaign launches and lead capture",
    defaultTimeline: "5 to 7 business days",
    keyBullets: [
      "Single-minded narrative architecture engineered to maximize visitor-to-lead conversions",
      "A/B test ready with micro-interactions, trust badges, and prominent CTA anchors",
      "Instant analytics tracking and seamless integration with your CRM or email provider"
    ],
    portfolioAnchor: "https://goonlinemedia.com/#services"
  },
  web_application_booking: {
    serviceHeadline: "interactive web applications and automated booking/scheduling portals built for operational scale",
    defaultTimeline: "2 to 4 weeks",
    keyBullets: [
      "Intuitive real-time appointment calendar interface with timezone and buffer-time management",
      "Automated confirmation emails, client reminders, and payment/deposit collection",
      "Secure administrative dashboard for managing appointments, customer records, and metrics"
    ],
    portfolioAnchor: "https://goonlinemedia.com/#solutions"
  }
};

/**
 * Synthesizes a personalized proposal draft tailored to the prospect's public request.
 */
export function generatePersonalizedProposal(ctx: ProposalContext): ProposalOutput {
  const blueprint = SERVICE_BLUEPRINTS[ctx.matchedService];
  const greeting = ctx.fullName ? `Hi ${ctx.fullName}` : (ctx.companyName ? `Hi ${ctx.companyName} Team` : "Hello");
  const projectRef = ctx.companyName 
    ? `your project for ${ctx.companyName}` 
    : (ctx.rawTitle.length > 50 ? `${ctx.rawTitle.slice(0, 48)}...` : ctx.rawTitle);

  const senderName = ctx.senderName || "Adegboyega | GoOnline";
  const senderEmail = ctx.senderEmail || "goonlinemedia0@gmail.com";
  const physicalAddress = ctx.physicalAddress || "GoOnline Media, Victoria Island, Lagos / London HQ";

  // Tailored subject line
  const subjectLine = `Re: Website development for ${ctx.companyName || "your project"} — proposal & structure`;

  // Tailor bullet points based on extracted keywords if present
  const bullets = [...blueprint.keyBullets];
  if (ctx.keywords.length > 0) {
    const matchedKwStr = ctx.keywords.slice(0, 3).join(", ");
    bullets[0] = `${bullets[0]} (specifically addressing your need for ${matchedKwStr})`;
  }

  // Generate HTML Version
  const bodyHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .bullet { margin-bottom: 8px; }
    .btn { display: inline-block; background-color: #004a8b; color: #ffffff !important; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; margin-top: 15px; }
    .footer { font-size: 11px; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 16px; margin-top: 30px; }
    .unsub { color: #9ca3af; text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <p>${greeting},</p>
    
    <p>I came across your public request regarding website development for <strong>${projectRef}</strong>.</p>
    
    <p>At <strong>GoOnline</strong> (<a href="https://goonlinemedia.com" style="color: #004a8b; text-decoration: none; font-weight: 600;">goonlinemedia.com</a>), we engineer ${blueprint.serviceHeadline}.</p>
    
    <p>Based on your requirements, here is how we would approach delivering this cleanly:</p>
    
    <ul>
      ${bullets.map(b => `<li class="bullet">${b}</li>`).join("\n      ")}
    </ul>
    
    <p>We typically deliver this tier of build in <strong>${blueprint.defaultTimeline}</strong> with production quality, rigorous mobile testing, and post-launch support.</p>
    
    <p>You can preview our live work and architectural standards here:<br>
      <a href="${blueprint.portfolioAnchor}" style="color: #004a8b; font-weight: 600;">👉 View GoOnline Showcase & Case Studies</a>
    </p>
    
    <p>Would you be open to a quick 10-minute discovery exchange this week, or would you prefer I send over a preliminary site layout mockup first?</p>
    
    <p style="margin-top: 25px;">
      Warm regards,<br>
      <strong>${senderName}</strong><br>
      <span style="color: #4b5563; font-size: 13px;">Lead Solutions Architect · GoOnline Media</span><br>
      <a href="https://goonlinemedia.com" style="color: #004a8b; font-size: 13px;">goonlinemedia.com</a> · <span style="color: #4b5563; font-size: 13px;">${senderEmail}</span>
    </p>
    
    <div class="footer">
      <p style="margin: 0 0 6px 0;">${physicalAddress}</p>
      <p style="margin: 0;">You received this note regarding your public request for web developers. If this project has concluded or you prefer not to receive development proposals, <a href="${ctx.unsubscribeUrl}" class="unsub">click here to opt out immediately</a>.</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  // Plain Text Version
  const bodyText = `
${greeting},

I came across your public request regarding website development for ${projectRef}.

At GoOnline (https://goonlinemedia.com), we engineer ${blueprint.serviceHeadline}.

Based on your requirements, here is how we would approach delivering this cleanly:
${bullets.map(b => `* ${b}`).join("\n")}

We typically turn this around in ${blueprint.defaultTimeline} with production-ready quality, rigorous mobile testing, and post-launch support.

You can preview our live showcase and architectural standards here:
${blueprint.portfolioAnchor}

Would you be open to a quick 10-minute discovery exchange this week, or would you prefer I send over a preliminary site layout mockup first?

Warm regards,

${senderName}
Lead Solutions Architect · GoOnline Media
https://goonlinemedia.com · ${senderEmail}

---
${physicalAddress}
You received this note regarding your public request for web developers.
To opt out of future proposals, visit: ${ctx.unsubscribeUrl}
  `.trim();

  return {
    subjectLine,
    bodyHtml,
    bodyText,
    suggestedTimeline: blueprint.defaultTimeline,
    portfolioLinksIncluded: [blueprint.portfolioAnchor]
  };
}

export interface LocalBusinessProposalContext {
  businessName: string;
  decisionMaker?: string;
  city: string;
  country?: string;
  industry: string;
  websiteStatus: "none_found" | "social_only" | "has_website";
  opportunity?: ServiceType;
  senderName?: string;
  senderEmail?: string;
  physicalAddress?: string;
  unsubscribeUrl: string;
}

/**
 * Generates cold outreach proposals specifically tailored for local businesses
 * that have no website or rely solely on Facebook / Instagram.
 */
export function generateLocalBusinessProposal(ctx: LocalBusinessProposalContext): ProposalOutput {
  const recipient = ctx.decisionMaker 
    ? ctx.decisionMaker.split(" ")[0] 
    : (ctx.businessName || "Owner");
  
  const senderName = ctx.senderName || "Adegboyega | GoOnline";
  const senderEmail = ctx.senderEmail || "goonlinemedia0@gmail.com";
  const physicalAddress = ctx.physicalAddress || "GoOnline Media, Victoria Island, Lagos / London HQ";

  const subjectLine = ctx.decisionMaker 
    ? `Quick question for ${recipient} regarding ${ctx.businessName}`
    : `Website idea for ${ctx.businessName} in ${ctx.city}`;

  const observationPhrase = ctx.websiteStatus === "social_only"
    ? "I noticed that customers may currently be finding you mainly through your social media pages."
    : "I noticed that customers may currently be finding you mainly through your business directory or local listing.";

  const bodyHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .btn { display: inline-block; background-color: #004a8b; color: #ffffff !important; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; margin-top: 15px; }
    .footer { font-size: 11px; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 16px; margin-top: 30px; }
    .unsub { color: #9ca3af; text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <p>Hi ${recipient},</p>
    
    <p>I came across <strong>${ctx.businessName}</strong> while looking at local ${ctx.industry.toLowerCase()} services in ${ctx.city}. ${observationPhrase}</p>
    
    <p>I build professional, mobile-friendly websites that help businesses showcase their work, build trust with prospective clients, and generate more direct enquiries.</p>
    
    <p>I'd love to explore creating a clean, affordable website tailored specifically to <strong>${ctx.businessName}</strong> — with clear service information, customer reviews, and an easy way for local customers in ${ctx.city} to contact you or request a quote.</p>
    
    <p>Would you be open to seeing a few ideas or a quick concept layout for your business?</p>
    
    <p style="margin-top: 25px;">
      Best regards,<br>
      <strong>${senderName}</strong><br>
      <span style="color: #4b5563; font-size: 13px;">GoOnline · Website Development & Digital Solutions</span><br>
      <a href="https://goonlinemedia.com" style="color: #004a8b; font-size: 13px;">goonlinemedia.com</a> · <span style="color: #4b5563; font-size: 13px;">${senderEmail}</span>
    </p>
    
    <div class="footer">
      <p style="margin: 0 0 6px 0;">${physicalAddress}</p>
      <p style="margin: 0;">You received this note regarding publicly available business information for ${ctx.businessName}. If you do not wish to receive website concepts, <a href="${ctx.unsubscribeUrl}" class="unsub">click here to opt out immediately</a>.</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  const bodyText = `
Hi ${recipient},

I came across ${ctx.businessName} while looking at local ${ctx.industry.toLowerCase()} services in ${ctx.city}. ${observationPhrase}

I build professional websites that help businesses showcase their services, build trust, and generate more enquiries.

I'd love to explore creating a simple, affordable website tailored to ${ctx.businessName}, with clear service information and an easy way for customers in ${ctx.city} to contact you or request a quote.

Would you be open to seeing a few ideas for your business?

Best regards,

${senderName}
GoOnline · Website Development & Digital Solutions
https://goonlinemedia.com · ${senderEmail}

---
${physicalAddress}
You received this note regarding publicly available business information for ${ctx.businessName}.
To opt out, visit: ${ctx.unsubscribeUrl}
  `.trim();

  return {
    subjectLine,
    bodyHtml,
    bodyText,
    suggestedTimeline: "7 to 10 business days",
    portfolioLinksIncluded: ["https://goonlinemedia.com/#services"]
  };
}

