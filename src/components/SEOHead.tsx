import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

// ─── Constants ───────────────────────────────────────────────
export const SITE_NAME = "SpicyRanked";
export const SITE_URL = "https://spicyranked.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
const DEFAULT_DESCRIPTION =
  "Independent reviews and rankings of adult platforms, cam sites, dating apps and AI companions.";
const TWITTER_SITE = "@spicyranked";

// ─── Types ───────────────────────────────────────────────────

export interface Author {
  name: string;
  url?: string;
}

export interface ArticleMeta {
  publishedTime: string;
  modifiedTime?: string;
  authors?: Author[];
  section?: string;
  tags?: string[];
}

export interface SEOHeadProps {
  /** Page title — suffixed with " | SiteName" automatically */
  title: string;
  /** Meta description (max ~160 chars recommended). Falls back to site default. */
  description?: string;
  /** Array of keyword strings */
  keywords?: string[];
  /** Canonical path (e.g. "/reviews/onlyfans"). Auto-derived from current route if omitted. */
  canonical?: string;
  /** Absolute URL override for canonical — use instead of path when needed */
  canonicalUrl?: string;
  /** OG image URL. Falls back to default site image. */
  ogImage?: string;
  /** Open Graph type. Defaults to "website". Use "article" for blog/review content. */
  ogType?: "website" | "article" | "product";
  /** Set true to add noindex,nofollow */
  noindex?: boolean;
  /** One or more JSON-LD structured data objects */
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
  /** Extra meta tags (for backward compat with old SEO component) */
  extraMeta?: { name?: string; property?: string; content: string }[];
  /** Article-specific metadata (published/modified time, authors, section, tags) */
  article?: ArticleMeta;
  /** Word count for automatic reading time estimation */
  wordCount?: number;
}

// ─── Reading time helper ─────────────────────────────────────

// ─── Canonical URL utility ───────────────────────────────────

/** Tracking params to strip from canonical URLs */
const STRIP_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "ref", "fbclid", "gclid", "msclkid"];

/**
 * Build a clean canonical URL.
 * - Strips tracking query params
 * - Normalizes to lowercase, no trailing slash (except root)
 * - Always uses https and the canonical domain
 */
export function getCanonicalUrl(path: string, params?: URLSearchParams): string {
  let normalized = path.toLowerCase().replace(/\/+$/, "") || "/";
  if (params) {
    const clean = new URLSearchParams(params);
    STRIP_PARAMS.forEach((p) => clean.delete(p));
    // Also strip any utm_* wildcards
    for (const key of [...clean.keys()]) {
      if (key.startsWith("utm_")) clean.delete(key);
    }
    const qs = clean.toString();
    if (qs) normalized += `?${qs}`;
  }
  return `${SITE_URL}${normalized}`;
}

// ─── Reading time helpers ────────────────────────────────────

/** Estimate reading time in minutes from word count (avg 200 wpm) */
export function estimateReadingTime(wordCount: number): number {
  return Math.max(1, Math.ceil(wordCount / 200));
}

/** Count words in one or more text blocks */
export function countWords(...texts: string[]): number {
  return texts.join(" ").split(/\s+/).filter(Boolean).length;
}

// ─── Component ───────────────────────────────────────────────

export function SEOHead({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords,
  canonical,
  canonicalUrl: canonicalUrlProp,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noindex = false,
  structuredData,
  extraMeta,
  article,
  wordCount,
}: SEOHeadProps) {
  const { pathname } = useLocation();

  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  // Canonical URL resolution
  const resolvedCanonical =
    canonicalUrlProp ||
    (canonical ? `${SITE_URL}${canonical}` : `${SITE_URL}${pathname}`);

  // JSON-LD array
  const ldArray = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  // Reading time
  const readingTime = wordCount ? estimateReadingTime(wordCount) : undefined;

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"}
      />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <link rel="canonical" href={resolvedCanonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={resolvedCanonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_SITE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Article meta */}
      {article?.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {article?.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {article?.section && (
        <meta property="article:section" content={article.section} />
      )}
      {article?.authors?.map((author, i) => (
        <meta key={`author-${i}`} property="article:author" content={author.url || author.name} />
      ))}
      {article?.tags?.map((tag, i) => (
        <meta key={`tag-${i}`} property="article:tag" content={tag} />
      ))}

      {/* Reading time (non-standard but widely used) */}
      {readingTime && (
        <meta name="twitter:label1" content="Reading time" />
      )}
      {readingTime && (
        <meta name="twitter:data1" content={`${readingTime} min read`} />
      )}

      {/* Extra meta tags (backward compat) */}
      {extraMeta?.map((meta, i) =>
        meta.property ? (
          <meta key={`extra-${i}`} property={meta.property} content={meta.content} />
        ) : (
          <meta key={`extra-${i}`} name={meta.name!} content={meta.content} />
        )
      )}

      {/* JSON-LD */}
      {ldArray.map((ld, i) => (
        <script key={`ld-${i}`} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
}

// ─── JSON-LD Schema Helpers ──────────────────────────────────

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Independent reviews and rankings of adult platforms, cam sites, dating apps and AI companions",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: "Independent reviews and rankings of adult platforms",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "hello@spicyranked.com",
    },
  };
}

export function webPageSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: `${SITE_URL}${url}`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  };
}

export function reviewSchema(platform: {
  name: string;
  slug: string;
  rating: number;
  summary: string;
  lastUpdated: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "SoftwareApplication",
      name: platform.name,
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      ...(platform.url ? { url: platform.url } : {}),
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: platform.rating,
      bestRating: 10,
      worstRating: 1,
    },
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    description: platform.summary,
    datePublished: "2026-03-08",
    dateModified: platform.lastUpdated,
    url: `${SITE_URL}/reviews/${platform.slug}`,
  };
}

export function articleSchema(
  headline: string,
  options?: {
    description?: string;
    image?: string;
    datePublished?: string;
    dateModified?: string;
    authors?: Author[];
    section?: string;
    url?: string;
    wordCount?: number;
  }
) {
  const o = options || {};
  const publisherOrg = {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
  };

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    ...(o.description ? { description: o.description } : {}),
    ...(o.image ? { image: o.image } : {}),
    author:
      o.authors && o.authors.length > 0
        ? o.authors.map((a) => ({
            "@type": "Person",
            name: a.name,
            ...(a.url ? { url: a.url } : {}),
          }))
        : { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: publisherOrg,
    datePublished: o.datePublished || "2026-03-08",
    dateModified: o.dateModified || o.datePublished || "2026-03-08",
    ...(o.section ? { articleSection: o.section } : {}),
    ...(o.url ? { mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${o.url}` } } : {}),
    ...(o.wordCount ? { wordCount: o.wordCount } : {}),
  };
}

export function blogPostingSchema(
  headline: string,
  options?: {
    description?: string;
    image?: string;
    datePublished?: string;
    dateModified?: string;
    authors?: Author[];
    section?: string;
    url?: string;
    wordCount?: number;
  }
) {
  const base = articleSchema(headline, options);
  return { ...base, "@type": "BlogPosting" };
}

export function productSchema(product: {
  name: string;
  description: string;
  image?: string;
  url?: string;
  rating?: number;
  ratingCount?: number;
  priceLow?: number;
  priceHigh?: number;
  currency?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    ...(product.image ? { image: product.image } : {}),
    ...(product.url ? { url: product.url } : {}),
    ...(product.rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            bestRating: 10,
            worstRating: 0,
            ratingCount: product.ratingCount || 1,
          },
        }
      : {}),
    ...(product.priceLow !== undefined
      ? {
          offers: {
            "@type": "AggregateOffer",
            lowPrice: product.priceLow,
            highPrice: product.priceHigh ?? product.priceLow,
            priceCurrency: product.currency || "USD",
          },
        }
      : {}),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function itemListSchema(
  name: string,
  items: { name: string; url: string; position: number }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      url: `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * Generate breadcrumb items for an article category hierarchy.
 * E.g. generateArticleBreadcrumbs("Live Cam Sites", "Chaturbate Review", "/reviews/chaturbate")
 */
export function generateArticleBreadcrumbs(
  category: string,
  pageTitle: string,
  pageUrl: string
): { name: string; url: string }[] {
  const categorySlug = category
    .toLowerCase()
    .replace(/ & /g, "-")
    .replace(/\s+/g, "-");
  return [
    { name: "Home", url: "/" },
    { name: "Reviews", url: "/reviews" },
    { name: category, url: `/category/${categorySlug}` },
    { name: pageTitle, url: pageUrl },
  ];
}
