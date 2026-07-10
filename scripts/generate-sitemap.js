#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');
const STATIC_ROUTES_PATH = path.join(ROOT, 'src/prerender/staticRoutes.json');
const PUBLIC_DIR = path.join(ROOT, 'public');
const SITEMAP_PATH = path.join(PUBLIC_DIR, 'sitemap.xml');
const DIST_DIR = path.join(ROOT, 'dist');

async function main() {
  if (!fs.existsSync(STATIC_ROUTES_PATH)) {
    console.error(`✖ Static routes file not found at ${STATIC_ROUTES_PATH}`);
    process.exit(1);
  }

  const routes = JSON.parse(fs.readFileSync(STATIC_ROUTES_PATH, 'utf8'));
  const baseUrl = 'https://www.goonline.com.ng';
  const today = new Date().toISOString().split('T')[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const route of routes) {
    // Exclude login or other private paths from index/sitemap if needed
    if (route.path === '/login') continue;
    
    const cleanPath = route.path ? (route.path.startsWith('/') ? route.path : `/${route.path}`) : '';
    const url = `${baseUrl}${cleanPath === '/' ? '' : cleanPath}`;
    
    xml += '  <url>\n';
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>${cleanPath === '/' ? '1.0' : '0.8'}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  fs.writeFileSync(SITEMAP_PATH, xml, 'utf8');
  console.log(`✔ Generated sitemap.xml at ${SITEMAP_PATH}`);

  // If dist already exists, copy sitemap.xml there too
  if (fs.existsSync(DIST_DIR)) {
    fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), xml, 'utf8');
    console.log(`✔ Copied sitemap.xml to ${DIST_DIR}`);
  }
}

main().catch((err) => {
  console.error('✖ Sitemap generation failed:', err);
  process.exit(1);
});
