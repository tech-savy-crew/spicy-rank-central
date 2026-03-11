/**
 * Vite plugin: generates per-route static HTML at build time so every URL
 * returns unique <title>, <meta description>, <link canonical>, <h1>, and
 * SUBSTANTIAL body text in the initial server response — making the SPA fully crawlable.
 *
 * For review pages, the full content (overview, features, pricing, pros/cons,
 * who should use, FAQ answers, and final verdict) is rendered into the static HTML.
 *
 * Runs in the `closeBundle` hook (after Vite writes dist/).
 */

import type { Plugin, ResolvedConfig } from "vite";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname, resolve } from "path";

import { reviewSEO, type ReviewSEOMeta } from "../src/data/reviewSEO";
import {
  reviewPlatforms,
  reviewCategories,
} from "../src/data/reviews";
import { comparisons } from "../src/data/comparisonData";
import { bestLists } from "../src/data/bestListsData";
import {
  detailedReviews,
  getReviewBySlug,
} from "../src/data/reviewDetails";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SITE = "https://spicyranked.com";
const SITE_NAME = "SpicyRanked";
const OG_IMAGE = `${SITE}/og-image.png`;

/* ------------------------------------------------------------------ */
/*  Route manifest                                                     */
/* ------------------------------------------------------------------ */

interface RouteEntry {
  path: string;
  title: string;
  description: string;
  canonical: string;
  h1: string;
  bodyHtml: string; // full HTML body content
  ogType?: string;
  ogTitle?: string;
  ogDescription?: string;
  noindex?: boolean;
}

function categorySlug(cat: string) {
  return cat.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-");
}

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ------------------------------------------------------------------ */
/*  Build full review body HTML                                        */
/* ------------------------------------------------------------------ */

function buildReviewBodyHtml(slug: string): string {
  const review = getReviewBySlug(slug);
  if (!review) return "";

  const seo = reviewSEO[slug];
  const parts: string[] = [];

  // Quick Verdict
  if (seo?.quickVerdict) {
    parts.push(`<p><strong>Quick Verdict:</strong> ${esc(seo.quickVerdict)}</p>`);
  }

  // Overview
  parts.push(`<h2>What is ${esc(review.name)}?</h2>`);
  for (const p of review.overview) {
    parts.push(`<p>${esc(p)}</p>`);
  }

  // Key Features
  parts.push(`<h2>Key Features</h2>`);
  parts.push(`<ul>`);
  for (const f of review.keyFeatures) {
    parts.push(`<li><strong>${esc(f.title)}</strong>: ${esc(f.description)}</li>`);
  }
  parts.push(`</ul>`);

  // Pricing
  parts.push(`<h2>Pricing &amp; Plans</h2>`);
  if (review.pricingIntro) parts.push(`<p>${esc(review.pricingIntro)}</p>`);
  for (const plan of review.pricingDetails) {
    parts.push(`<h3>${esc(plan.plan)} — ${esc(plan.price)}</h3>`);
    parts.push(`<ul>`);
    for (const f of plan.features) {
      parts.push(`<li>${esc(f)}</li>`);
    }
    parts.push(`</ul>`);
  }

  // Rating Breakdown
  parts.push(`<h2>Our Rating Breakdown</h2>`);
  parts.push(`<table><thead><tr><th>Category</th><th>Score</th></tr></thead><tbody>`);
  for (const s of review.scores) {
    parts.push(`<tr><td>${esc(s.label)}</td><td>${s.score}/10</td></tr>`);
  }
  parts.push(`<tr><td><strong>Overall</strong></td><td><strong>${review.score}/10</strong></td></tr>`);
  parts.push(`</tbody></table>`);

  // Pros & Cons
  parts.push(`<h2>Pros &amp; Cons</h2>`);
  parts.push(`<h3>Pros</h3><ul>`);
  for (const p of review.pros) {
    parts.push(`<li>${esc(p)}</li>`);
  }
  parts.push(`</ul>`);
  parts.push(`<h3>Cons</h3><ul>`);
  for (const c of review.cons) {
    parts.push(`<li>${esc(c)}</li>`);
  }
  parts.push(`</ul>`);

  // Who Should Use
  parts.push(`<h2>Who Should Use ${esc(review.name)}?</h2>`);
  for (const w of review.whoShouldUse) {
    parts.push(`<p><strong>${w.ideal ? "Perfect for" : "Not ideal for"}:</strong> ${esc(w.persona)} — ${esc(w.reason)}</p>`);
  }

  // FAQ
  if (review.faqs.length > 0) {
    parts.push(`<h2>Frequently Asked Questions</h2>`);
    for (const faq of review.faqs) {
      parts.push(`<h3>${esc(faq.question)}</h3>`);
      parts.push(`<p>${esc(faq.answer)}</p>`);
    }
  }

  // Final Verdict
  parts.push(`<h2>Final Verdict</h2>`);
  parts.push(`<p>${esc(review.finalVerdict)}</p>`);
  parts.push(`<p><strong>${esc(review.name)}: ${review.score}/10</strong> — ${esc(review.bestFor)}</p>`);

  // Related links
  const links: string[] = [];
  links.push(`<a href="/reviews">All Reviews</a>`);
  if (review.alternatives.length > 0) {
    links.push(`<a href="/alternatives/${review.slug}">${review.name} Alternatives</a>`);
    for (const altSlug of review.alternatives.slice(0, 4)) {
      const alt = getReviewBySlug(altSlug);
      if (alt) links.push(`<a href="/reviews/${alt.slug}">${alt.name} Review</a>`);
    }
  }
  for (const comp of review.comparisons.slice(0, 4)) {
    links.push(`<a href="/compare/${comp.slug}">${comp.title}</a>`);
  }
  // Related reviews in same category
  const related = detailedReviews
    .filter((r) => r.slug !== review.slug && r.category === review.category)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
  if (related.length > 0) {
    parts.push(`<h2>Related Reviews</h2><ul>`);
    for (const r of related) {
      parts.push(`<li><a href="/reviews/${r.slug}">${r.name} Review — ${r.score}/10</a></li>`);
    }
    parts.push(`</ul>`);
  }

  parts.push(`<nav aria-label="Page navigation"><ul>${links.map((l) => `<li>${l}</li>`).join("")}</ul></nav>`);

  return parts.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Build comparison body HTML                                         */
/* ------------------------------------------------------------------ */

function buildComparisonBodyHtml(comp: typeof comparisons[0]): string {
  const a = getReviewBySlug(comp.platformA);
  const b = getReviewBySlug(comp.platformB);
  if (!a || !b) return "";

  const parts: string[] = [];
  parts.push(`<p>${esc(comp.verdict)}</p>`);

  // Score comparison
  parts.push(`<h2>Score Comparison</h2>`);
  parts.push(`<table><thead><tr><th>Category</th><th>${esc(a.name)}</th><th>${esc(b.name)}</th></tr></thead><tbody>`);
  for (let i = 0; i < Math.min(a.scores.length, b.scores.length); i++) {
    parts.push(`<tr><td>${esc(a.scores[i].label)}</td><td>${a.scores[i].score}/10</td><td>${b.scores[i].score}/10</td></tr>`);
  }
  parts.push(`<tr><td><strong>Overall</strong></td><td><strong>${a.score}/10</strong></td><td><strong>${b.score}/10</strong></td></tr>`);
  parts.push(`</tbody></table>`);

  // Quick pros/cons
  parts.push(`<h2>${esc(a.name)} Pros</h2><ul>${a.pros.slice(0, 4).map((p) => `<li>${esc(p)}</li>`).join("")}</ul>`);
  parts.push(`<h2>${esc(b.name)} Pros</h2><ul>${b.pros.slice(0, 4).map((p) => `<li>${esc(p)}</li>`).join("")}</ul>`);

  parts.push(`<h2>Which Should You Choose?</h2>`);
  parts.push(`<p>Choose <strong>${esc(a.name)}</strong> if you want: ${esc(a.bestFor)}.</p>`);
  parts.push(`<p>Choose <strong>${esc(b.name)}</strong> if you want: ${esc(b.bestFor)}.</p>`);

  parts.push(`<nav aria-label="Related"><ul>`);
  parts.push(`<li><a href="/reviews/${a.slug}">${a.name} Review</a></li>`);
  parts.push(`<li><a href="/reviews/${b.slug}">${b.name} Review</a></li>`);
  parts.push(`<li><a href="/compare">All Comparisons</a></li>`);
  parts.push(`</ul></nav>`);

  return parts.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Build routes                                                       */
/* ------------------------------------------------------------------ */

function buildRoutes(): RouteEntry[] {
  const routes: RouteEntry[] = [];

  /* ── Homepage ── */
  const homePlatforms = reviewPlatforms
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);
  const homeLinks = homePlatforms.map((p) => `<li><a href="/reviews/${p.slug}">${esc(p.name)} Review — ${p.score}/10</a></li>`).join("");
  const categoryLinks = [...reviewCategories].filter((c) => c !== "All").map((c) => {
    const slug = categorySlug(c);
    const count = reviewPlatforms.filter((p) => categorySlug(p.category) === slug).length;
    return `<li><a href="/category/${slug}">${esc(c)} (${count} reviews)</a></li>`;
  }).join("");
  const compLinks = comparisons.slice(0, 6).map((c) => {
    const a = getReviewBySlug(c.platformA);
    const b = getReviewBySlug(c.platformB);
    return a && b ? `<li><a href="/compare/${c.slug}">${esc(a.name)} vs ${esc(b.name)}</a></li>` : "";
  }).join("");
  const bestLinks = bestLists.map((l) => `<li><a href="/best-lists/${l.slug}">${esc(l.title)}</a></li>`).join("");

  routes.push({
    path: "/",
    title: "SpicyRanked — Honest Reviews & Rankings of Adult Platforms, Cam Sites & Dating Apps",
    description: "Independent reviews, ratings & comparisons of 24 adult platforms. OnlyFans, Fansly, Chaturbate, Stripchat & more — ranked by real testing. Updated weekly.",
    canonical: "/",
    h1: "SpicyRanked — Honest Adult Platform Reviews and Rankings",
    bodyHtml: [
      `<p>SpicyRanked provides independent reviews, comparisons, and rankings of 24 adult creator platforms, cam sites, dating apps, and AI companion apps. Every platform is tested by our editorial team for 30-60 days and scored on a 10-point scale.</p>`,
      `<h2>Top-Rated Reviews</h2><ul>${homeLinks}</ul>`,
      `<h2>Categories</h2><ul>${categoryLinks}</ul>`,
      `<h2>Popular Comparisons</h2><ul>${compLinks}</ul>`,
      `<h2>Best Lists</h2><ul>${bestLinks}</ul>`,
      `<p><a href="/reviews">Browse All 24 Reviews</a> · <a href="/rankings">Rankings</a> · <a href="/about">About Us</a></p>`,
    ].join("\n"),
  });

  /* ── Review pages ── */
  for (const platform of reviewPlatforms) {
    const seo: ReviewSEOMeta | undefined = reviewSEO[platform.slug];
    const bodyHtml = buildReviewBodyHtml(platform.slug);

    routes.push({
      path: `/reviews/${platform.slug}`,
      title: seo?.title || `${platform.name} Review 2026 — ${platform.score}/10 | ${SITE_NAME}`,
      description: seo?.description || `${platform.name} review — scored ${platform.score}/10. Pricing, features, pros & cons, and alternatives.`,
      canonical: `/reviews/${platform.slug}`,
      h1: `${platform.name} Review 2026`,
      bodyHtml,
      ogType: "article",
      ogTitle: seo?.ogTitle || `${platform.name} Review 2026`,
      ogDescription: seo?.ogDescription || `Honest ${platform.name} review — ${platform.score}/10.`,
    });
  }

  /* ── Comparison pages ── */
  for (const comp of comparisons) {
    const a = getReviewBySlug(comp.platformA);
    const b = getReviewBySlug(comp.platformB);
    if (!a || !b) continue;

    routes.push({
      path: `/compare/${comp.slug}`,
      title: `${a.name} vs ${b.name} — Which Is Better in 2026? | ${SITE_NAME}`,
      description: `Head-to-head comparison: ${a.name} (${a.score}/10) vs ${b.name} (${b.score}/10). Compare features, pricing, and user experience.`,
      canonical: `/compare/${comp.slug}`,
      h1: `${a.name} vs ${b.name} — Complete Comparison 2026`,
      bodyHtml: buildComparisonBodyHtml(comp),
      ogType: "article",
    });
  }

  /* ── Best-list pages ── */
  for (const list of bestLists) {
    const platformItems = list.platformSlugs.map((s, i) => {
      const r = getReviewBySlug(s);
      return r
        ? `<li><strong>#${i + 1} <a href="/reviews/${r.slug}">${esc(r.name)}</a></strong> — ${r.score}/10. ${esc(r.bestFor)}</li>`
        : "";
    }).join("");

    routes.push({
      path: `/best-lists/${list.slug}`,
      title: `${list.title} | ${SITE_NAME}`,
      description: list.subtitle.slice(0, 155),
      canonical: `/best-lists/${list.slug}`,
      h1: list.title,
      bodyHtml: [
        `<p>${esc(list.subtitle)}</p>`,
        `<h2>Our Top Picks</h2><ol>${platformItems}</ol>`,
        `<p><a href="/reviews">All Reviews</a> · <a href="/rankings">Rankings</a></p>`,
      ].join("\n"),
    });
  }

  /* ── Alternatives pages ── */
  for (const platform of reviewPlatforms) {
    const review = getReviewBySlug(platform.slug);
    const altSlugs = review?.alternatives || [];
    const altItems = altSlugs.map((s) => {
      const r = getReviewBySlug(s);
      return r ? `<li><a href="/reviews/${r.slug}">${esc(r.name)} — ${r.score}/10</a>: ${esc(r.bestFor)}</li>` : "";
    }).join("");

    routes.push({
      path: `/alternatives/${platform.slug}`,
      title: `Top Alternatives to ${platform.name} in 2026 | ${SITE_NAME}`,
      description: `Looking for alternatives to ${platform.name}? Compare the best ${platform.category} platforms ranked by our editors.`,
      canonical: `/alternatives/${platform.slug}`,
      h1: `Top Alternatives to ${platform.name}`,
      bodyHtml: [
        `<p>Compare the best alternatives to ${esc(platform.name)} in the ${esc(platform.category)} category, ranked by our editorial team.</p>`,
        altItems ? `<h2>Best Alternatives</h2><ul>${altItems}</ul>` : "",
        `<p><a href="/reviews/${platform.slug}">Read ${esc(platform.name)} Review</a> · <a href="/reviews">All Reviews</a></p>`,
      ].join("\n"),
    });
  }

  /* ── Category pages ── */
  const cats = [...reviewCategories].filter((c) => c !== "All");
  for (const cat of cats) {
    const slug = categorySlug(cat);
    const platformsInCat = reviewPlatforms
      .filter((p) => categorySlug(p.category) === slug)
      .sort((a, b) => b.score - a.score);

    const platformItems = platformsInCat.map((p) => `<li><a href="/reviews/${p.slug}">${esc(p.name)} — ${p.score}/10</a>: ${esc(p.description)}</li>`).join("");

    routes.push({
      path: `/category/${slug}`,
      title: `${cat} Reviews & Rankings | ${SITE_NAME}`,
      description: `Browse ${platformsInCat.length} ${cat.toLowerCase()} platform reviews. In-depth ratings, comparisons, and honest editorial opinions.`,
      canonical: `/category/${slug}`,
      h1: `${cat} Reviews & Rankings`,
      bodyHtml: [
        `<p>Independent reviews and rankings of ${platformsInCat.length} ${esc(cat.toLowerCase())} platforms. Every platform tested by our editorial team and scored on a 10-point scale.</p>`,
        `<h2>All ${esc(cat)} Reviews</h2><ul>${platformItems}</ul>`,
        `<p><a href="/categories">All Categories</a> · <a href="/reviews">All Reviews</a></p>`,
      ].join("\n"),
    });
  }

  /* ── Static pages ── */
  const staticPages: { path: string; title: string; description: string; canonical: string; h1: string; bodyHtml: string }[] = [
    {
      path: "/reviews",
      title: "All Platform Reviews | SpicyRanked — Honest Adult Platform Reviews",
      description: "Browse 24 honest, independent reviews of adult platforms. Creator sites, cam sites, AI companions, dating apps & more.",
      canonical: "/reviews",
      h1: "All Platform Reviews",
      bodyHtml: `<p>Browse all 24 adult platform reviews on SpicyRanked. Creator platforms, cam sites, AI companions, dating apps, and fetish marketplaces — all rated on our 10-point scale.</p><ul>${reviewPlatforms.sort((a, b) => b.score - a.score).map((p) => `<li><a href="/reviews/${p.slug}">${esc(p.name)} — ${p.score}/10</a></li>`).join("")}</ul>`,
    },
    {
      path: "/compare",
      title: "Compare Adult Platforms — Head-to-Head Comparisons | SpicyRanked",
      description: "Side-by-side comparisons of top adult platforms. Compare features, pricing, ratings, and more.",
      canonical: "/compare",
      h1: "Compare Adult Platforms",
      bodyHtml: `<p>Side-by-side comparisons of top adult platforms. Compare features, pricing, ratings, and user experience to find the best platform for you.</p><ul>${comparisons.map((c) => { const a = getReviewBySlug(c.platformA); const b = getReviewBySlug(c.platformB); return a && b ? `<li><a href="/compare/${c.slug}">${esc(a.name)} vs ${esc(b.name)}</a></li>` : ""; }).join("")}</ul>`,
    },
    {
      path: "/rankings",
      title: "Platform Rankings — All Adult Platforms Ranked | SpicyRanked",
      description: "Every adult platform we've reviewed, ranked by score. Creator platforms, cam sites, AI companions, dating apps & more.",
      canonical: "/rankings",
      h1: "Platform Rankings",
      bodyHtml: `<p>Every adult platform we have reviewed, ranked by editorial score.</p><ol>${reviewPlatforms.sort((a, b) => b.score - a.score).map((p, i) => `<li><a href="/reviews/${p.slug}">${esc(p.name)}</a> — ${p.score}/10</li>`).join("")}</ol>`,
    },
    {
      path: "/categories",
      title: "Browse Categories — Adult Platform Reviews | SpicyRanked",
      description: "Explore adult platform reviews by category — Creator Platforms, Live Cam Sites, AI Companions, Dating & Hookup Apps, Fetish & Niche Marketplaces.",
      canonical: "/categories",
      h1: "Platform Categories",
      bodyHtml: `<p>Browse adult platform reviews by category.</p><ul>${[...reviewCategories].filter((c) => c !== "All").map((c) => { const s = categorySlug(c); const count = reviewPlatforms.filter((p) => categorySlug(p.category) === s).length; return `<li><a href="/category/${s}">${esc(c)}</a> (${count} reviews)</li>`; }).join("")}</ul>`,
    },
    {
      path: "/about",
      title: "About Us — Editorial Policy & Review Methodology | SpicyRanked",
      description: "SpicyRanked is an independent editorial team that tests and reviews adult platforms for 30-60 days each.",
      canonical: "/about",
      h1: "About SpicyRanked",
      bodyHtml: `<p>SpicyRanked is an independent editorial team that reviews and ranks adult platforms, cam sites, dating apps, and AI companion apps. We test every platform we review for 30 to 60 days using real accounts, real money, and real interactions before publishing our assessments.</p><p>Our editorial methodology is simple: we sign up, we use the platform as a real user would, we evaluate it across five standardized categories (Content Quality, User Interface, Value for Money, Privacy & Safety, and Features), and we publish an honest review with a score out of 10.</p>`,
    },
    {
      path: "/contact",
      title: "Contact Us | SpicyRanked",
      description: "Have a question, correction, or platform suggestion for SpicyRanked? Get in touch with our editorial team.",
      canonical: "/contact",
      h1: "Contact Us",
      bodyHtml: `<p>Have a question, correction, or platform suggestion? Get in touch with our editorial team at hello@spicyranked.com.</p>`,
    },
    {
      path: "/advertise",
      title: "Advertise With Us | SpicyRanked",
      description: "Reach thousands of engaged users researching digital entertainment platforms.",
      canonical: "/advertise",
      h1: "Advertise With Us",
      bodyHtml: `<p>Reach thousands of engaged users researching digital entertainment platforms. Banner ads, sponsored reviews, and custom packages.</p>`,
    },
    {
      path: "/write-for-us",
      title: "Write For Us — Guest Posts & Sponsored Content | SpicyRanked",
      description: "Write for SpicyRanked. Submit a free guest post or inquire about sponsored content opportunities.",
      canonical: "/write-for-us",
      h1: "Write For Us",
      bodyHtml: `<p>Submit a free guest post or inquire about sponsored content opportunities.</p>`,
    },
    {
      path: "/privacy-policy",
      title: "Privacy Policy | SpicyRanked",
      description: "SpicyRanked privacy policy. How we collect, use, and protect your data.",
      canonical: "/privacy-policy",
      h1: "Privacy Policy",
      bodyHtml: `<p>This privacy policy describes how SpicyRanked collects, uses, and protects your personal data.</p>`,
    },
    {
      path: "/terms",
      title: "Terms of Service | SpicyRanked",
      description: "SpicyRanked terms of service. Rules and guidelines for using our site.",
      canonical: "/terms",
      h1: "Terms of Service",
      bodyHtml: `<p>These terms of service govern your use of the SpicyRanked website.</p>`,
    },
  ];

  for (const page of staticPages) {
    routes.push(page);
  }

  return routes;
}

/* ------------------------------------------------------------------ */
/*  HTML generation                                                    */
/* ------------------------------------------------------------------ */

function generateHtml(template: string, route: RouteEntry): string {
  let html = template;

  // ── <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(route.title)}</title>`);

  // ── <meta name="description">
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${esc(route.description)}" />`
  );

  // ── <meta name="robots">
  if (route.noindex) {
    html = html.replace(
      /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/,
      `<meta name="robots" content="noindex, nofollow" />`
    );
  }

  // ── <link rel="canonical">
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${SITE}${route.canonical}" />`
  );

  // ── Open Graph
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${esc(route.ogTitle || route.title)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${esc(route.ogDescription || route.description)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${SITE}${route.canonical}" />`
  );
  if (route.ogType) {
    html = html.replace(
      /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:type" content="${route.ogType}" />`
    );
  }

  // ── Twitter Card
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${esc(route.ogTitle || route.title)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${esc(route.ogDescription || route.description)}" />`
  );

  // ── Pre-rendered body content inside <div id="root">
  const siteNav = `<nav aria-label="Site navigation"><ul><li><a href="/">Home</a></li><li><a href="/reviews">Reviews</a></li><li><a href="/compare">Compare</a></li><li><a href="/rankings">Rankings</a></li><li><a href="/categories">Categories</a></li><li><a href="/about">About</a></li></ul></nav>`;

  const rootContent = [
    `<div id="root">`,
    `<div id="seo-content" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0">`,
    siteNav,
    `<h1>${esc(route.h1)}</h1>`,
    route.bodyHtml,
    `<p>© 2026 ${SITE_NAME} — Adults 18+ only.</p>`,
    `</div>`,
    `</div>`,
  ].join("");

  html = html.replace(/<div id="root"><\/div>/, rootContent);

  return html;
}

/* ------------------------------------------------------------------ */
/*  Plugin export                                                      */
/* ------------------------------------------------------------------ */

export function seoPrerender(): Plugin {
  let config: ResolvedConfig;

  return {
    name: "seo-prerender",
    apply: "build",

    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },

    closeBundle() {
      const outDir = resolve(config.root, config.build.outDir);
      const templatePath = join(outDir, "index.html");

      if (!existsSync(templatePath)) {
        console.warn("[seo-prerender] dist/index.html not found — skipping");
        return;
      }

      const template = readFileSync(templatePath, "utf-8");
      const routes = buildRoutes();

      let generated = 0;

      for (const route of routes) {
        const html = generateHtml(template, route);

        if (route.path === "/") {
          writeFileSync(templatePath, html);
          generated++;
          continue;
        }

        const filePath = join(outDir, route.path, "index.html");
        const dir = dirname(filePath);

        if (!existsSync(dir)) {
          mkdirSync(dir, { recursive: true });
        }

        writeFileSync(filePath, html);
        generated++;
      }

      console.log(
        `\x1b[32m✓ [seo-prerender] Generated ${generated} pre-rendered HTML pages\x1b[0m`
      );
    },
  };
}
