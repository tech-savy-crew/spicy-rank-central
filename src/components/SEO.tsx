/**
 * Backward-compatible re-export layer.
 * All new code should import directly from "@/components/SEOHead".
 */
export {
  SEOHead,
  // Constants
  SITE_NAME,
  SITE_URL,
  DEFAULT_OG_IMAGE,
  // Schema helpers
  websiteSchema,
  organizationSchema,
  webPageSchema,
  reviewSchema,
  articleSchema,
  blogPostingSchema,
  productSchema,
  faqSchema,
  breadcrumbSchema,
  itemListSchema,
  generateArticleBreadcrumbs,
  // Utilities
  estimateReadingTime,
  countWords,
} from "./SEOHead";

export type { SEOHeadProps, Author, ArticleMeta } from "./SEOHead";

// Legacy adapter: map old `jsonLd` prop → `structuredData`
import { SEOHead } from "./SEOHead";
import type { SEOHeadProps } from "./SEOHead";
import React from "react";

interface LegacySEOProps extends Omit<SEOHeadProps, "structuredData"> {
  /** @deprecated Use structuredData instead */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

export function SEO(props: LegacySEOProps) {
  const { jsonLd, structuredData, ...rest } = props;
  return React.createElement(SEOHead, {
    ...rest,
    structuredData: structuredData || jsonLd,
  });
}
