/**
 * Comprehensive sitemap generator.
 * Run: npx tsx scripts/generate-sitemap.ts
 *
 * Pulls routes from the actual data files used by the app.
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

/* ── Static pages ── */
const staticPages: SitemapEntry[] = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/reviews", priority: "0.9", changefreq: "weekly" },
  { loc: "/rankings", priority: "0.8", changefreq: "weekly" },
  { loc: "/compare", priority: "0.7", changefreq: "weekly" },
  { loc: "/categories", priority: "0.7", changefreq: "monthly" },
  { loc: "/about", priority: "0.4", changefreq: "yearly" },
  { loc: "/contact", priority: "0.3", changefreq: "yearly" },
  { loc: "/advertise", priority: "0.3", changefreq: "yearly" },
  { loc: "/write-for-us", priority: "0.3", changefreq: "yearly" },
  { loc: "/privacy-policy", priority: "0.2", changefreq: "yearly" },
  { loc: "/terms", priority: "0.2", changefreq: "yearly" },
];

/* ── Review pages ── */
const reviewPages: SitemapEntry[] = reviewPlatforms.map((p) => ({
  loc: `/reviews/${p.slug}`,
  priority: "0.9",
  changefreq: "monthly",
}));

/* ── Comparison pages ── */
const comparisonPages: SitemapEntry[] = comparisons.map((c) => ({
  loc: `/compare/${c.slug}`,
  priority: "0.7",
  changefreq: "monthly",
}));

/* ── Best-list pages ── */
const bestListPages: SitemapEntry[] = bestLists.map((l) => ({
  loc: `/best-lists/${l.slug}`,
  priority: "0.8",
  changefreq: "monthly",
}));

/* ── Alternatives pages ── */
const alternativePages: SitemapEntry[] = reviewPlatforms.map((p) => ({
  loc: `/alternatives/${p.slug}`,
  priority: "0.6",
  changefreq: "monthly",
}));

/* ── Category pages ── */
const categoryPages: SitemapEntry[] = [...reviewCategories]
  .filter((c) => c !== "All")
  .map((c) => ({
    loc: `/category/${categorySlug(c)}`,
    priority: "0.7",
    changefreq: "weekly",
  }));

/* ── Combine & generate ── */
const allPages = [
  ...staticPages,
  ...reviewPages,
  ...comparisonPages,
  ...bestListPages,
  ...alternativePages,
  ...categoryPages,
];

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
