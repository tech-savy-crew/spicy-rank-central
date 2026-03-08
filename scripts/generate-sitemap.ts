// Run: npx tsx scripts/generate-sitemap.ts
// Generates public/sitemap.xml from platform data

import { writeFileSync } from "fs";
import { platforms, categories } from "../src/data/platforms";

const SITE_URL = "https://spicyranked.com";
const today = new Date().toISOString().split("T")[0];

const staticPages = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/rankings", priority: "0.8", changefreq: "weekly" },
  { loc: "/compare", priority: "0.7", changefreq: "monthly" },
  { loc: "/categories", priority: "0.7", changefreq: "monthly" },
  { loc: "/about", priority: "0.4", changefreq: "yearly" },
  { loc: "/contact", priority: "0.3", changefreq: "yearly" },
];

const reviewPages = platforms.map((p) => ({
  loc: `/review/${p.slug}`,
  priority: "0.9",
  changefreq: "monthly",
}));

const alternativePages = platforms.map((p) => ({
  loc: `/alternatives/${p.slug}`,
  priority: "0.6",
  changefreq: "monthly",
}));

const categoryPages = categories
  .filter((c) => c !== "All")
  .map((c) => ({
    loc: `/category/${c.toLowerCase().replace(" ", "-")}`,
    priority: "0.7",
    changefreq: "weekly",
  }));

const allPages = [...staticPages, ...reviewPages, ...alternativePages, ...categoryPages];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (p) => `  <url>
    <loc>${SITE_URL}${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

writeFileSync("public/sitemap.xml", xml);
console.log(`✅ Sitemap generated with ${allPages.length} URLs`);
