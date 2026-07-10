#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const ROBOTS_PATH = path.join(PUBLIC_DIR, 'robots.txt');
const DIST_DIR = path.join(ROOT, 'dist');

async function main() {
  const isProduction = 
    process.env.NODE_ENV === 'production' || 
    process.env.VERCEL_ENV === 'production' ||
    process.env.PUBLIC_PROD === 'true'; // custom fallback

  let robotsContent = '';

  if (isProduction) {
    robotsContent = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/
Disallow: /api/

Sitemap: https://www.goonline.com.ng/sitemap.xml
`;
    console.log('✔ Environment is PRODUCTION. Writing production robots.txt');
  } else {
    robotsContent = `User-agent: *
Disallow: /
`;
    console.log('✔ Environment is NON-PRODUCTION. Writing restrictive robots.txt');
  }

  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  fs.writeFileSync(ROBOTS_PATH, robotsContent, 'utf8');

  // If dist already exists, copy robots.txt there too
  if (fs.existsSync(DIST_DIR)) {
    fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robotsContent, 'utf8');
    console.log(`✔ Copied robots.txt to ${DIST_DIR}`);
  }
}

main().catch((err) => {
  console.error('✖ robots.txt generation failed:', err);
  process.exit(1);
});
