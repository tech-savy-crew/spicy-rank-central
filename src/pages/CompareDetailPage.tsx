import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { RatingBadge } from "@/components/RatingBadge";
import { SEO, faqSchema, breadcrumbSchema, articleSchema } from "@/components/SEO";
import { getComparisonBySlug, comparisons } from "@/data/comparisonData";
import { getReviewBySlug } from "@/data/reviewDetails";
import {
  Trophy,
  CheckCircle,
  XCircle,
  ExternalLink,
  ArrowRight,
  Check,
  ThumbsUp,
  ThumbsDown,
  DollarSign,
  ClipboardCheck,
} from "lucide-react";

const CompareDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const comparison = getComparisonBySlug(slug || "");

  if (!comparison) {
    return (
      <Layout>
        <SEO title="Comparison Not Found" description="The requested comparison could not be found." noindex />
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-black mb-4">Comparison Not Found</h1>
          <Link to="/compare" className="text-primary hover:underline">
            {"\u2190"} Browse All Comparisons
          </Link>
        </div>
      </Layout>
    );
  }

  const a = getReviewBySlug(comparison.platformA);
  const b = getReviewBySlug(comparison.platformB);

  if (!a || !b) {
    return (
      <Layout>
        <SEO title="Comparison Error" description="Platform data could not be loaded." noindex />
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-black mb-4">Platform Data Not Available</h1>
          <Link to="/compare" className="text-primary hover:underline">
            {"\u2190"} Browse All Comparisons
          </Link>
        </div>
      </Layout>
    );
  }

  const winner = a.score >= b.score ? a : b;
  const loser = a.score >= b.score ? b : a;
  const isTied = a.score === b.score;

  const comparisonRows = [
    { label: "Overall Score", aVal: a.score, bVal: b.score, type: "score" as const },
    { label: "Pricing", aVal: a.pricing, bVal: b.pricing, type: "text" as const },
    ...a.scores.map((s, i) => ({
      label: s.label,
      aVal: s.score,
      bVal: b.scores[i]?.score || 0,
      type: "score" as const,
    })),
    { label: "Best For", aVal: a.bestFor, bVal: b.bestFor, type: "text" as const },
  ];

  const relatedComparisons = comparisons
    .filter(
      (c) =>
        c.slug !== comparison.slug &&
        (c.platformA === comparison.platformA ||
          c.platformB === comparison.platformB ||
          c.platformA === comparison.platformB ||
          c.platformB === comparison.platformA),
    )
    .slice(0, 4);

  /* Default H3 headings for Detailed Breakdown if not provided in data */
  const defaultBreakdownHeadings = [
    `${a.name} vs ${b.name}: Core Differences`,
    `Content & User Experience Compared`,
    `Value for Money: Which Delivers More?`,
  ];
  const breakdownHeadings = comparison.detailedBreakdownHeadings || defaultBreakdownHeadings;

  /* Default Pros/Cons if not provided in data */
  const defaultProsA = comparison.whoShouldChooseA.slice(0, 4);
  const defaultConsA = [
    `May not suit users who prefer ${b.name}'s approach`,
    `${b.name} offers features ${a.name} lacks`,
  ];
  const defaultProsB = comparison.whoShouldChooseB.slice(0, 4);
  const defaultConsB = [
    `May not suit users who prefer ${a.name}'s approach`,
    `${a.name} offers features ${b.name} lacks`,
  ];

  const prosA = comparison.prosA || defaultProsA;
  const consA = comparison.consA || defaultConsA;
  const prosB = comparison.prosB || defaultProsB;
  const consB = comparison.consB || defaultConsB;

  return (
    <Layout>
      {/* ===== SEO — FIX 2: Optimized title with exact-match keywords ===== */}
      <SEO
        title={comparison.metaTitle || `${a.name} vs ${b.name} 2026: Side-by-Side Comparison | SpicyRanked`}
        description={
          comparison.metaDescription ||
          `${a.name} (${a.score}/10) vs ${b.name} (${b.score}/10) \u2014 which is better? We tested both for 30+ days. Compare pricing, features, user experience, and see our honest verdict.`
        }
        canonical={`/compare/${comparison.slug}`}
        jsonLd={[
          articleSchema(`${a.name} vs ${b.name} \u2014 Complete Comparison 2026`),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Compare", url: "/compare" },
            { name: `${a.name} vs ${b.name}`, url: `/compare/${comparison.slug}` },
          ]),
          ...(comparison.faqs.length > 0 ? [faqSchema(comparison.faqs)] : []),
        ]}
      />

      <div className="container max-w-4xl py-6 sm:py-8 md:py-12 px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4 sm:mb-6 flex-wrap">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/compare" className="hover:text-primary transition-colors">
            Compare
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">
            {a.name} vs {b.name}
          </span>
        </nav>

        {/* H1 */}
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-2 leading-tight">
          {a.name} vs {b.name} {"\u2014"} Which Is Better in 2026?
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
          Head-to-head comparison of features, pricing, and user experience
        </p>

        {/* ===== VS Cards — FIX 3: Our Pick badge ===== */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div
            className={`bg-card rounded-xl border p-3 sm:p-5 text-center ${winner === a && !isTied ? "border-primary" : "border-border/50"}`}
          >
            {winner === a && !isTied && (
              <div className="flex items-center justify-center gap-1 sm:gap-1.5 mb-2">
                <Trophy className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                <span className="bg-primary text-primary-foreground text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                  Our Pick
                </span>
              </div>
            )}
            <h2 className="font-bold text-sm sm:text-lg">{a.name}</h2>
            <RatingBadge rating={a.score} className="mx-auto mt-1.5 sm:mt-2" />
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 sm:mt-2">{a.category}</p>
          </div>
          <div
            className={`bg-card rounded-xl border p-3 sm:p-5 text-center ${winner === b && !isTied ? "border-primary" : "border-border/50"}`}
          >
            {winner === b && !isTied && (
              <div className="flex items-center justify-center gap-1 sm:gap-1.5 mb-2">
                <Trophy className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                <span className="bg-primary text-primary-foreground text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                  Our Pick
                </span>
              </div>
            )}
            <h2 className="font-bold text-sm sm:text-lg">{b.name}</h2>
            <RatingBadge rating={b.score} className="mx-auto mt-1.5 sm:mt-2" />
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 sm:mt-2">{b.category}</p>
          </div>
        </div>

        {/* Quick Verdict */}
        <div className="bg-card rounded-xl border border-primary/20 p-4 sm:p-5 mb-8 sm:mb-10">
          <p className="font-bold text-xs sm:text-sm text-primary mb-1">
            {isTied ? "Different Strengths" : `Winner: ${winner.name}`}
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">{comparison.verdict}</p>
          <div className="flex flex-wrap gap-2 sm:gap-3 mt-3">
            <span className="text-[10px] sm:text-xs bg-secondary px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
              {a.name}: Best for {a.bestFor}
            </span>
            <span className="text-[10px] sm:text-xs bg-secondary px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
              {b.name}: Best for {b.bestFor}
            </span>
          </div>
        </div>

        {/* Comparison Table */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Feature-by-Feature Comparison</h2>
          <div className="rounded-xl border border-border/50 overflow-x-auto">
            <table className="w-full text-xs sm:text-sm min-w-[400px]">
              <thead>
                <tr className="bg-secondary/70">
                  <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left font-semibold">Category</th>
                  <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-center font-semibold">{a.name}</th>
                  <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-center font-semibold">{b.name}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => {
                  const aWins = row.type === "score" && Number(row.aVal) > Number(row.bVal);
                  const bWins = row.type === "score" && Number(row.bVal) > Number(row.aVal);
                  return (
                    <tr
                      key={row.label}
                      className={`border-t border-border/40 ${i % 2 === 0 ? "bg-card" : "bg-secondary/20"}`}
                    >
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3 font-medium">{row.label}</td>
                      <td
                        className={`px-3 sm:px-4 py-2.5 sm:py-3 text-center ${aWins ? "text-primary font-bold" : "text-muted-foreground"}`}
                      >
                        {row.type === "score" ? (
                          <>
                            {row.aVal}/10{" "}
                            {aWins && <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 inline text-success ml-0.5" />}
                          </>
                        ) : (
                          <span className="line-clamp-2">{row.aVal}</span>
                        )}
                      </td>
                      <td
                        className={`px-3 sm:px-4 py-2.5 sm:py-3 text-center ${bWins ? "text-primary font-bold" : "text-muted-foreground"}`}
                      >
                        {row.type === "score" ? (
                          <>
                            {row.bVal}/10{" "}
                            {bWins && <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 inline text-success ml-0.5" />}
                          </>
                        ) : (
                          <span className="line-clamp-2">{row.bVal}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ===== NEW SECTION 3: Pros & Cons ===== */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-5">Pros & Cons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {/* Platform A Pros/Cons */}
            <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
              <div className="bg-secondary/50 px-4 sm:px-5 py-3 border-b border-border/40">
                <h3 className="font-bold text-sm sm:text-base">{a.name}</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground">
                  {a.score}/10 · {a.category}
                </p>
              </div>
              <div className="p-4 sm:p-5 space-y-4">
                <div>
                  <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <ThumbsUp className="h-3.5 w-3.5" /> Pros
                  </p>
                  <ul className="space-y-1.5">
                    {prosA.map((item, i) => (
                      <li
                        key={i}
                        className="text-xs sm:text-sm text-muted-foreground flex items-start gap-1.5 sm:gap-2"
                      >
                        <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-red-500 dark:text-red-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <ThumbsDown className="h-3.5 w-3.5" /> Cons
                  </p>
                  <ul className="space-y-1.5">
                    {consA.map((item, i) => (
                      <li
                        key={i}
                        className="text-xs sm:text-sm text-muted-foreground flex items-start gap-1.5 sm:gap-2"
                      >
                        <XCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Platform B Pros/Cons */}
            <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
              <div className="bg-secondary/50 px-4 sm:px-5 py-3 border-b border-border/40">
                <h3 className="font-bold text-sm sm:text-base">{b.name}</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground">
                  {b.score}/10 · {b.category}
                </p>
              </div>
              <div className="p-4 sm:p-5 space-y-4">
                <div>
                  <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <ThumbsUp className="h-3.5 w-3.5" /> Pros
                  </p>
                  <ul className="space-y-1.5">
                    {prosB.map((item, i) => (
                      <li
                        key={i}
                        className="text-xs sm:text-sm text-muted-foreground flex items-start gap-1.5 sm:gap-2"
                      >
                        <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-red-500 dark:text-red-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <ThumbsDown className="h-3.5 w-3.5" /> Cons
                  </p>
                  <ul className="space-y-1.5">
                    {consB.map((item, i) => (
                      <li
                        key={i}
                        className="text-xs sm:text-sm text-muted-foreground flex items-start gap-1.5 sm:gap-2"
                      >
                        <XCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FIX 2: Detailed Breakdown WITH H3 headings ===== */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-5">Detailed Breakdown</h2>
          <div className="space-y-6 sm:space-y-8">
            {comparison.detailedBreakdown.map((paragraph, i) => (
              <div key={i}>
                {breakdownHeadings[i] && (
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">{breakdownHeadings[i]}</h3>
                )}
                <p className="text-[13px] sm:text-[15px] text-muted-foreground leading-6 sm:leading-7">{paragraph}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== NEW SECTION 4: Pricing Comparison ===== */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" /> Pricing Comparison
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-card rounded-xl border border-border/50 p-4 sm:p-5">
              <h3 className="font-bold text-sm sm:text-base mb-2">{a.name}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3">{a.pricing}</p>
              <div className="space-y-1.5">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Best for:</span> {a.bestFor}
                </p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Score:</span> {a.score}/10
                </p>
              </div>
            </div>
            <div className="bg-card rounded-xl border border-border/50 p-4 sm:p-5">
              <h3 className="font-bold text-sm sm:text-base mb-2">{b.name}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3">{b.pricing}</p>
              <div className="space-y-1.5">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Best for:</span> {b.bestFor}
                </p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Score:</span> {b.score}/10
                </p>
              </div>
            </div>
          </div>
          {/* Pricing verdict line */}
          <p className="text-xs sm:text-sm text-muted-foreground mt-3 bg-secondary/30 rounded-lg px-4 py-2.5">
            <span className="font-medium text-foreground">Bottom line:</span>{" "}
            {a.score > b.score
              ? `${a.name} scores higher overall (${a.score} vs ${b.score}), but ${b.name} may offer better value depending on your specific needs.`
              : b.score > a.score
                ? `${b.name} scores higher overall (${b.score} vs ${a.score}), but ${a.name} may offer better value depending on your specific needs.`
                : `Both platforms score ${a.score}/10. Your choice should depend on which features matter most to you.`}
          </p>
        </section>

        {/* Who Should Choose */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-8 sm:mb-10">
          <div className="bg-card rounded-xl border border-border/50 p-4 sm:p-5">
            <h2 className="font-bold text-sm sm:text-base mb-2 sm:mb-3">Who Should Choose {a.name}?</h2>
            <ul className="space-y-1.5 sm:space-y-2">
              {comparison.whoShouldChooseA.map((item) => (
                <li key={item} className="text-xs sm:text-sm text-muted-foreground flex items-start gap-1.5 sm:gap-2">
                  <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-success mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card rounded-xl border border-border/50 p-4 sm:p-5">
            <h2 className="font-bold text-sm sm:text-base mb-2 sm:mb-3">Who Should Choose {b.name}?</h2>
            <ul className="space-y-1.5 sm:space-y-2">
              {comparison.whoShouldChooseB.map((item) => (
                <li key={item} className="text-xs sm:text-sm text-muted-foreground flex items-start gap-1.5 sm:gap-2">
                  <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-success mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Verdict CTAs */}
        <div className="bg-card rounded-xl border border-border/50 p-4 sm:p-6 mb-8 sm:mb-10 text-center">
          <h2 className="font-bold text-base sm:text-lg mb-2">
            {isTied ? "Our Verdict: Both Have Unique Strengths" : `Our Verdict: ${winner.name} Wins`}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-5">{comparison.verdict}</p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-3">
            <a
              href={a.url}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 spicy-gradient text-primary-foreground px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm hover:opacity-90"
            >
              Try {a.name} <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </a>
            <a
              href={b.url}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-primary text-primary px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm hover:bg-primary/10"
            >
              Try {b.name} <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </a>
          </div>
        </div>

        {/* ===== NEW SECTION 5: How We Test (E-E-A-T) ===== */}
        <section className="mb-8 sm:mb-10">
          <div className="bg-secondary/30 rounded-xl border border-border/50 p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <ClipboardCheck className="h-5 w-5 sm:h-6 sm:w-6 text-primary shrink-0 mt-0.5" />
              <div>
                <h2 className="font-bold text-sm sm:text-base mb-2">How We Test</h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-6 sm:leading-7">
                  We create real accounts on both {a.name} and {b.name} and test for 30{"\u2013"}60 days with real
                  usage. We evaluate pricing, features, user experience, content quality, safety, and customer support.
                  Our scores are based on hands-on testing across 6 criteria, each weighted equally. We update
                  comparisons quarterly to reflect platform changes. SpicyRanked is editorially independent {"\u2014"}{" "}
                  platforms cannot pay for higher scores.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Read Full Reviews */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Read the Full Reviews</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Link
              to={`/reviews/${a.slug}`}
              className="bg-card rounded-xl border border-border/50 p-4 sm:p-5 card-hover group"
            >
              <p className="font-bold text-xs sm:text-sm group-hover:text-primary transition-colors">
                {a.name} Review 2026
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                Score: {a.score}/10 {"\u00B7"} {a.category}
              </p>
              <span className="text-[10px] sm:text-xs text-primary font-medium mt-2 inline-flex items-center gap-1">
                Read full {a.name} review <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
            <Link
              to={`/reviews/${b.slug}`}
              className="bg-card rounded-xl border border-border/50 p-4 sm:p-5 card-hover group"
            >
              <p className="font-bold text-xs sm:text-sm group-hover:text-primary transition-colors">
                {b.name} Review 2026
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                Score: {b.score}/10 {"\u00B7"} {b.category}
              </p>
              <span className="text-[10px] sm:text-xs text-primary font-medium mt-2 inline-flex items-center gap-1">
                Read full {b.name} review <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          </div>
          <div className="mt-3 text-center">
            <Link
              to={`/alternatives/${winner.slug}`}
              className="text-xs sm:text-sm text-primary hover:underline font-medium"
            >
              Browse all {winner.name} alternatives {"\u2192"}
            </Link>
          </div>
        </section>

        {/* Related Comparisons */}
        {relatedComparisons.length > 0 && (
          <section className="mb-8 sm:mb-10">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Related Comparisons</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {relatedComparisons.map((c) => {
                const ca = getReviewBySlug(c.platformA);
                const cb = getReviewBySlug(c.platformB);
                return (
                  <Link
                    key={c.slug}
                    to={`/compare/${c.slug}`}
                    className="bg-card rounded-xl border border-border/50 p-3 sm:p-4 card-hover group"
                  >
                    <p className="font-bold text-xs sm:text-sm group-hover:text-primary transition-colors">
                      {ca?.name || c.platformA} vs {cb?.name || c.platformB}
                    </p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">{c.category}</p>
                    <span className="text-[10px] sm:text-xs text-primary font-medium mt-2 inline-flex items-center gap-1">
                      Compare <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ===== FIX 1: FAQ — VISIBLE (not collapsed accordion) ===== */}
        {comparison.faqs.length > 0 && (
          <section className="mb-8 sm:mb-10">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3 sm:space-y-4">
              {comparison.faqs.map((faq, i) => (
                <div key={i} className="bg-card rounded-xl border border-border/50 p-4 sm:p-5">
                  <h3 className="text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">{faq.question}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-6 sm:leading-7">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default CompareDetailPage;
