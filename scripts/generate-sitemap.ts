/**
 * Comprehensive sitemap generator with index.
 * Run: npx tsx scripts/generate-sitemap.ts
 */

import { writeFileSync } from "fs";
import { reviewPlatforms, reviewCategories } from "../src/data/reviews";
import { comparisons } from "../src/data/comparisonData";
import { bestLists } from "../src/data/bestListsData";

const SITE_URL = "https://spicyranked.com";
const today = new Date().toISOString().split("T")[0];

interface SitemapEntry {
  loc: string;
  priority: string;
  changefreq: string;
}

function categorySlug(cat: string) {
  return cat.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-");
}

function buildXml(entries: SitemapEntry[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
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
}

/* ── Static pages ── */
const staticPages: SitemapEntry[] = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/reviews", priority: "0.9", changefreq: "weekly" },
  { loc: "/rankings", priority: "0.8", changefreq: "weekly" },
  { loc: "/compare", priority: "0.7", changefreq: "monthly" },
  { loc: "/categories", priority: "0.7", changefreq: "monthly" },
  { loc: "/about", priority: "0.5", changefreq: "yearly" },
  { loc: "/contact", priority: "0.4", changefreq: "yearly" },
  { loc: "/editorial-policy", priority: "0.5", changefreq: "yearly" },
  { loc: "/review-methodology", priority: "0.5", changefreq: "yearly" },
  { loc: "/affiliate-disclosure", priority: "0.4", changefreq: "yearly" },
  { loc: "/advertise", priority: "0.3", changefreq: "yearly" },
  { loc: "/write-for-us", priority: "0.3", changefreq: "yearly" },
  { loc: "/privacy-policy", priority: "0.2", changefreq: "yearly" },
  { loc: "/terms", priority: "0.2", changefreq: "yearly" },
];

/* ── Review pages ── */
const reviewPages: SitemapEntry[] = reviewPlatforms.flatMap((p) => [
  { loc: `/reviews/${p.slug}`, priority: "0.9", changefreq: "monthly" },
  { loc: `/alternatives/${p.slug}`, priority: "0.6", changefreq: "monthly" },
]);

/* ── Best-list pages ── */
const bestListPages: SitemapEntry[] = bestLists.map((l) => ({
  loc: `/best-lists/${l.slug}`,
  priority: "0.8",
  changefreq: "monthly",
}));

/* ── Comparison pages ── */
const comparisonPages: SitemapEntry[] = comparisons.map((c) => ({
  loc: `/compare/${c.slug}`,
  priority: "0.7",
  changefreq: "monthly",
}));

/* ── Category pages ── */
const categoryPages: SitemapEntry[] = [...reviewCategories]
  .filter((c) => c !== "All")
  .map((c) => ({
    loc: `/category/${categorySlug(c)}`,
    priority: "0.7",
    changefreq: "monthly",
  }));

/* ── Write individual sitemaps ── */
writeFileSync("public/sitemap-pages.xml", buildXml(staticPages));
writeFileSync("public/sitemap-reviews.xml", buildXml([...reviewPages, ...bestListPages]));
writeFileSync("public/sitemap-comparisons.xml", buildXml(comparisonPages));
writeFileSync("public/sitemap-categories.xml", buildXml(categoryPages));

/* ── Write sitemap index ── */
const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap-pages.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-reviews.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-comparisons.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-categories.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;

writeFileSync("public/sitemap_index.xml", indexXml);

/* ── Also keep legacy sitemap.xml pointing to all URLs for backward compat ── */
const allPages = [...staticPages, ...reviewPages, ...bestListPages, ...comparisonPages, ...categoryPages];
writeFileSync("public/sitemap.xml", buildXml(allPages));

console.log(`✅ Sitemap index + 4 sitemaps generated with ${allPages.length} total URLs`);
