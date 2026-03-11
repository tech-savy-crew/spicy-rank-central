/**
 * Vite plugin: generates per-route static HTML at build time so every URL
 * returns unique <title>, <meta description>, <link canonical>, <h1>, and
 * body text in the initial server response — making the SPA fully crawlable.
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
  bodyText: string;
  ogType?: string;
  ogTitle?: string;
  ogDescription?: string;
  links?: { href: string; text: string }[];
  noindex?: boolean;
}

function categorySlug(cat: string) {
  return cat.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-");
}

function buildRoutes(): RouteEntry[] {
  const routes: RouteEntry[] = [];

  /* ── Homepage ── */
  routes.push({
    path: "/",
    title:
      "SpicyRanked — Honest Reviews & Rankings of Adult Platforms, Cam Sites & Dating Apps",
    description:
      "Independent reviews, ratings & comparisons of 150+ adult platforms. OnlyFans, Fansly, Chaturbate, Stripchat & more — ranked by real testing. Updated weekly.",
    canonical: "/",
    h1: "SpicyRanked — Honest Adult Platform Reviews and Rankings",
    bodyText:
      "SpicyRanked provides independent reviews, comparisons, and rankings of the top adult creator platforms, cam sites, dating apps, and AI companion apps. Every platform is tested by our editorial team and scored on a 10-point scale.",
    links: [
      ...reviewPlatforms
        .sort((a, b) => b.score - a.score)
        .slice(0, 12)
        .map((p) => ({
          href: `/reviews/${p.slug}`,
          text: `${p.name} Review — ${p.score}/10`,
        })),
      { href: "/reviews", text: "All Reviews" },
      { href: "/compare", text: "Compare Platforms" },
      { href: "/rankings", text: "Rankings" },
      { href: "/categories", text: "Categories" },
    ],
  });

  /* ── Review pages ── */
  for (const platform of reviewPlatforms) {
    const seo: ReviewSEOMeta | undefined = reviewSEO[platform.slug];
    const review = getReviewBySlug(platform.slug);

    const overview = review?.overview?.[0] || platform.description;
    const verdict = review?.verdict || platform.description;

    const links: { href: string; text: string }[] = [
      { href: "/reviews", text: "All Reviews" },
      { href: `/alternatives/${platform.slug}`, text: `${platform.name} Alternatives` },
    ];
    if (review?.comparisons) {
      for (const comp of review.comparisons.slice(0, 3)) {
        links.push({ href: `/compare/${comp.slug}`, text: comp.title });
      }
    }

    routes.push({
      path: `/reviews/${platform.slug}`,
      title: seo?.title || `${platform.name} Review 2026 — ${platform.score}/10 | ${SITE_NAME}`,
      description: seo?.description || `${platform.name} review — scored ${platform.score}/10. ${verdict}`,
      canonical: `/reviews/${platform.slug}`,
      h1: `${platform.name} Review 2026`,
      bodyText: seo?.quickVerdict || overview,
      ogType: "article",
      ogTitle: seo?.ogTitle || `${platform.name} Review 2026`,
      ogDescription: seo?.ogDescription || `Honest ${platform.name} review — ${platform.score}/10.`,
      links,
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
      bodyText: comp.verdict,
      ogType: "article",
      links: [
        { href: `/reviews/${a.slug}`, text: `${a.name} Review` },
        { href: `/reviews/${b.slug}`, text: `${b.name} Review` },
        { href: "/compare", text: "All Comparisons" },
      ],
    });
  }

  /* ── Best-list pages ── */
  for (const list of bestLists) {
    routes.push({
      path: `/best-lists/${list.slug}`,
      title: `${list.title} | ${SITE_NAME}`,
      description: list.subtitle.slice(0, 155),
      canonical: `/best-lists/${list.slug}`,
      h1: list.title,
      bodyText: list.subtitle,
      links: list.platformSlugs.slice(0, 6).map((s) => {
        const r = getReviewBySlug(s);
        return { href: `/reviews/${s}`, text: r ? `${r.name} — ${r.score}/10` : s };
      }),
    });
  }

  /* ── Alternatives pages ── */
  for (const platform of reviewPlatforms) {
    const review = getReviewBySlug(platform.slug);
    const altSlugs = review?.alternatives || [];
    routes.push({
      path: `/alternatives/${platform.slug}`,
      title: `Top Alternatives to ${platform.name} in 2026 | ${SITE_NAME}`,
      description: `Looking for alternatives to ${platform.name}? Compare the best ${platform.category} platforms ranked by our editors.`,
      canonical: `/alternatives/${platform.slug}`,
      h1: `Top Alternatives to ${platform.name}`,
      bodyText: `Compare the best alternatives to ${platform.name} in the ${platform.category} category, ranked by our editorial team.`,
      links: altSlugs.slice(0, 5).map((s) => {
        const r = getReviewBySlug(s);
        return { href: `/reviews/${s}`, text: r ? `${r.name} Review` : s };
      }),
    });
  }

  /* ── Category pages ── */
  const cats = [...reviewCategories].filter((c) => c !== "All");
  for (const cat of cats) {
    const slug = categorySlug(cat);
    const platformsInCat = reviewPlatforms
      .filter((p) => categorySlug(p.category) === slug)
      .sort((a, b) => b.score - a.score);

    routes.push({
      path: `/category/${slug}`,
      title: `${cat} Reviews & Rankings | ${SITE_NAME}`,
      description: `Browse ${platformsInCat.length} ${cat.toLowerCase()} platform reviews. In-depth ratings, comparisons, and honest editorial opinions.`,
      canonical: `/category/${slug}`,
      h1: `${cat} Reviews & Rankings`,
      bodyText: `Independent reviews and rankings of ${cat.toLowerCase()} platforms. Every platform tested by our editorial team and scored on a 10-point scale.`,
      links: platformsInCat.slice(0, 8).map((p) => ({
        href: `/reviews/${p.slug}`,
        text: `${p.name} — ${p.score}/10`,
      })),
    });
  }

  /* ── Static pages ── */
  const staticPages: Omit<RouteEntry, "links">[] = [
    {
      path: "/reviews",
      title: "All Platform Reviews | SpicyRanked — Honest Adult Platform Reviews",
      description:
        "Browse 24 honest, independent reviews of adult platforms. Creator sites, cam sites, AI companions, dating apps & more.",
      canonical: "/reviews",
      h1: "All Platform Reviews",
      bodyText:
        "Browse every adult platform review on SpicyRanked. Creator platforms, cam sites, AI companions, dating apps, and more — all rated on our 10-point scale.",
    },
    {
      path: "/compare",
      title: "Compare Adult Platforms — Head-to-Head Comparisons | SpicyRanked",
      description:
        "Side-by-side comparisons of top adult platforms. Compare features, pricing, ratings, and more.",
      canonical: "/compare",
      h1: "Compare Adult Platforms",
      bodyText:
        "Side-by-side comparisons of top adult platforms. Compare features, pricing, ratings, and user experience to find the best platform for you.",
    },
    {
      path: "/rankings",
      title: "Platform Rankings — All Adult Platforms Ranked | SpicyRanked",
      description:
        "Every adult platform we've reviewed, ranked by score. Creator platforms, cam sites, AI companions, dating apps & more.",
      canonical: "/rankings",
      h1: "Platform Rankings",
      bodyText:
        "Every adult platform we have reviewed, ranked by editorial score. Filter by category and sort by rating or name.",
    },
    {
      path: "/categories",
      title: "Browse Categories — Adult Platform Reviews | SpicyRanked",
      description:
        "Explore adult platform reviews by category — Creator Platforms, Live Cam Sites, AI Companions, Dating Apps, Sexting & more.",
      canonical: "/categories",
      h1: "Platform Categories",
      bodyText:
        "Browse adult platform reviews by category. Creator Platforms, Live Cam Sites, AI Companions, Dating & Hookup Apps, Sexting & Chat, and Tube & Streaming.",
    },
    {
      path: "/about",
      title: "About Us — Editorial Policy | SpicyRanked",
      description:
        "SpicyRanked is an independent editorial platform providing honest, in-depth reviews and rankings of digital entertainment and social platforms.",
      canonical: "/about",
      h1: "About SpicyRanked",
      bodyText:
        "SpicyRanked is an independent editorial platform dedicated to providing honest, in-depth reviews and rankings of digital entertainment and social platforms.",
    },
    {
      path: "/contact",
      title: "Contact Us | SpicyRanked",
      description:
        "Have a question, correction, or platform suggestion for SpicyRanked? Get in touch with our editorial team.",
      canonical: "/contact",
      h1: "Contact Us",
      bodyText:
        "Have a question, correction, or platform suggestion? Get in touch with our editorial team.",
    },
    {
      path: "/advertise",
      title: "Advertise With Us | SpicyRanked",
      description:
        "Reach thousands of engaged users researching digital entertainment platforms. Banner ads, sponsored reviews, and custom packages.",
      canonical: "/advertise",
      h1: "Advertise With Us",
      bodyText:
        "Reach thousands of engaged users researching digital entertainment platforms.",
    },
    {
      path: "/write-for-us",
      title: "Write For Us — Guest Posts & Sponsored Content | SpicyRanked",
      description:
        "Write for SpicyRanked. Submit a free guest post or inquire about sponsored content opportunities.",
      canonical: "/write-for-us",
      h1: "Write For Us",
      bodyText:
        "Submit a free guest post or inquire about sponsored content opportunities. Reach 50K+ monthly readers.",
    },
    {
      path: "/privacy-policy",
      title: "Privacy Policy | SpicyRanked",
      description:
        "SpicyRanked privacy policy. How we collect, use, and protect your data.",
      canonical: "/privacy-policy",
      h1: "Privacy Policy",
      bodyText:
        "This privacy policy describes how SpicyRanked collects, uses, and protects your personal data.",
    },
    {
      path: "/terms",
      title: "Terms of Service | SpicyRanked",
      description:
        "SpicyRanked terms of service. Rules and guidelines for using our site.",
      canonical: "/terms",
      h1: "Terms of Service",
      bodyText:
        "These terms of service govern your use of the SpicyRanked website.",
    },
  ];

  for (const page of staticPages) {
    routes.push({ ...page, links: undefined });
  }

  return routes;
}

/* ------------------------------------------------------------------ */
/*  HTML generation                                                    */
/* ------------------------------------------------------------------ */

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function generateHtml(template: string, route: RouteEntry): string {
  let html = template;

  // ── <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(route.title)}</title>`);

  // ── <meta name="description">
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${esc(route.description)}" />`
  );

  // ── <meta name="robots"> – no change for indexable pages
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
  const linksHtml = route.links?.length
    ? `<nav aria-label="Page navigation"><ul>${route.links
        .map((l) => `<li><a href="${l.href}">${esc(l.text)}</a></li>`)
        .join("")}</ul></nav>`
    : "";

  const siteNav = `<nav aria-label="Site navigation"><ul><li><a href="/">Home</a></li><li><a href="/reviews">Reviews</a></li><li><a href="/compare">Compare</a></li><li><a href="/rankings">Rankings</a></li><li><a href="/categories">Categories</a></li></ul></nav>`;

  const rootContent = [
    `<div id="root">`,
    `<div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:system-ui,-apple-system,sans-serif;color:#e0e0e0;background:#1A1A2E">`,
    `<h1>${esc(route.h1)}</h1>`,
    `<p>${esc(route.bodyText)}</p>`,
    linksHtml,
    siteNav,
    `<p style="margin-top:32px;font-size:12px;color:#888">© 2026 ${SITE_NAME} — Adults 18+ only.</p>`,
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
          // Overwrite root index.html with pre-rendered homepage
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
