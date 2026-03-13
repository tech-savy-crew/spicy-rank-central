/**
 * Backward-compatible re-export layer.
 * All new code should import directly from "@/components/SEOHead".
 */
export {
  SEOHead as SEO,
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

// Legacy adapter: map old SEO props → SEOHead props
// The old `jsonLd` prop is now `structuredData` in SEOHead,
// but since we're re-exporting SEOHead as SEO and it doesn't have `jsonLd`,
// we need a thin wrapper for backward compat.

import { SEOHead } from "./SEOHead";
import type { SEOHeadProps } from "./SEOHead";
import React from "react";

interface LegacySEOProps extends Omit<SEOHeadProps, "structuredData"> {
  /** @deprecated Use structuredData instead */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Drop-in replacement that supports the old `jsonLd` prop name.
 * New code should use `structuredData` directly via SEOHead.
 */
export function SEO(props: LegacySEOProps) {
  const { jsonLd, structuredData, ...rest } = props;
  return React.createElement(SEOHead, {
    ...rest,
    structuredData: structuredData || jsonLd,
  });
}
