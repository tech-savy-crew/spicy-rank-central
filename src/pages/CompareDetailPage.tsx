import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { RatingBadge } from "@/components/RatingBadge";
import { SEO, faqSchema, breadcrumbSchema, articleSchema } from "@/components/SEO";
import { getComparisonBySlug, comparisons } from "@/data/comparisonData";
import { getReviewBySlug } from "@/data/reviewDetails";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Trophy, ChevronRight, CheckCircle, XCircle, ExternalLink, ArrowRight, Check, X } from "lucide-react";

const CompareDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const comparison = getComparisonBySlug(slug || "");

  if (!comparison) {
    return (
      <Layout>
        <SEO title="Comparison Not Found" description="The requested comparison could not be found." noindex />
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-black mb-4">Comparison Not Found</h1>
          <Link to="/compare" className="text-primary hover:underline">← Browse All Comparisons</Link>
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
          <Link to="/compare" className="text-primary hover:underline">← Browse All Comparisons</Link>
        </div>
      </Layout>
    );
  }

  const winner = a.score >= b.score ? a : b;
  const loser = a.score >= b.score ? b : a;

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
    .filter((c) => c.slug !== comparison.slug && (c.platformA === comparison.platformA || c.platformB === comparison.platformB || c.platformA === comparison.platformB || c.platformB === comparison.platformA))
    .slice(0, 4);

  return (
    <Layout>
      <SEO
        title={`${a.name} vs ${b.name} — Which Is Better in 2026?`}
        description={`Head-to-head comparison: ${a.name} (${a.score}/10) vs ${b.name} (${b.score}/10). Compare features, pricing, and user experience.`}
        canonical={`/compare/${comparison.slug}`}
        jsonLd={[
          articleSchema(`${a.name} vs ${b.name} — Complete Comparison 2026`),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Compare", url: "/compare" },
            { name: `${a.name} vs ${b.name}`, url: `/compare/${comparison.slug}` },
          ]),
          ...(comparison.faqs.length > 0 ? [faqSchema(comparison.faqs)] : []),
        ]}
      />

      <div className="container max-w-4xl py-8 md:py-12 px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6 flex-wrap">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/compare" className="hover:text-primary transition-colors">Compare</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{a.name} vs {b.name}</span>
        </nav>

        {/* Header */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 leading-tight">
          {a.name} vs {b.name} — Which Is Better in 2026?
        </h1>
        <p className="text-muted-foreground mb-8">Head-to-head comparison of features, pricing, and user experience</p>

        {/* VS Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className={`bg-card rounded-xl border p-5 text-center ${winner === a ? "border-primary" : "border-border/50"}`}>
            {winner === a && <Trophy className="h-5 w-5 text-primary mx-auto mb-2" />}
            <h2 className="font-bold text-lg">{a.name}</h2>
            <RatingBadge rating={a.score} className="mx-auto mt-2" />
            <p className="text-xs text-muted-foreground mt-2">{a.category}</p>
          </div>
          <div className={`bg-card rounded-xl border p-5 text-center ${winner === b ? "border-primary" : "border-border/50"}`}>
            {winner === b && <Trophy className="h-5 w-5 text-primary mx-auto mb-2" />}
            <h2 className="font-bold text-lg">{b.name}</h2>
            <RatingBadge rating={b.score} className="mx-auto mt-2" />
            <p className="text-xs text-muted-foreground mt-2">{b.category}</p>
          </div>
        </div>

        {/* Quick Verdict */}
        <div className="bg-card rounded-xl border border-primary/20 p-5 mb-10">
          <p className="font-bold text-sm text-primary mb-1">Winner: {winner.name}</p>
          <p className="text-sm text-muted-foreground">{comparison.verdict}</p>
          <div className="flex gap-3 mt-3">
            <span className="text-xs bg-secondary px-2.5 py-1 rounded-full">{a.name}: Best for {a.bestFor}</span>
            <span className="text-xs bg-secondary px-2.5 py-1 rounded-full">{b.name}: Best for {b.bestFor}</span>
          </div>
        </div>

        {/* Comparison Table */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Feature-by-Feature Comparison</h2>
          <div className="rounded-xl border border-border/50 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/70">
                  <th className="px-4 py-3 text-left font-semibold">Category</th>
                  <th className="px-4 py-3 text-center font-semibold">{a.name}</th>
                  <th className="px-4 py-3 text-center font-semibold">{b.name}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => {
                  const aWins = row.type === "score" && Number(row.aVal) > Number(row.bVal);
                  const bWins = row.type === "score" && Number(row.bVal) > Number(row.aVal);
                  return (
                    <tr key={row.label} className={`border-t border-border/40 ${i % 2 === 0 ? "bg-card" : "bg-secondary/20"}`}>
                      <td className="px-4 py-3 font-medium">{row.label}</td>
                      <td className={`px-4 py-3 text-center ${aWins ? "text-primary font-bold" : "text-muted-foreground"}`}>
                        {row.type === "score" ? <>{row.aVal}/10 {aWins && <Check className="h-3.5 w-3.5 inline text-success ml-1" />}</> : row.aVal}
                      </td>
                      <td className={`px-4 py-3 text-center ${bWins ? "text-primary font-bold" : "text-muted-foreground"}`}>
                        {row.type === "score" ? <>{row.bVal}/10 {bWins && <Check className="h-3.5 w-3.5 inline text-success ml-1" />}</> : row.bVal}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Detailed Breakdown */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xl font-bold mb-4">Detailed Breakdown</h2>
          {comparison.detailedBreakdown.map((p, i) => (
            <p key={i} className="text-[15px] text-muted-foreground leading-7">{p}</p>
          ))}
        </section>

        {/* Who Should Choose */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          <div className="bg-card rounded-xl border border-border/50 p-5">
            <h2 className="font-bold mb-3">Who Should Choose {a.name}?</h2>
            <ul className="space-y-2">
              {comparison.whoShouldChooseA.map((item) => (
                <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card rounded-xl border border-border/50 p-5">
            <h2 className="font-bold mb-3">Who Should Choose {b.name}?</h2>
            <ul className="space-y-2">
              {comparison.whoShouldChooseB.map((item) => (
                <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Verdict CTAs */}
        <div className="bg-card rounded-xl border border-border/50 p-6 mb-10 text-center">
          <h2 className="font-bold text-lg mb-2">Our Verdict: {winner.name} Wins</h2>
          <p className="text-sm text-muted-foreground mb-5">{comparison.verdict}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={a.url} target="_blank" rel="nofollow sponsored noopener noreferrer"
              className="inline-flex items-center gap-2 spicy-gradient text-primary-foreground px-5 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90">
              Try {a.name} <ExternalLink className="h-4 w-4" />
            </a>
            <a href={b.url} target="_blank" rel="nofollow sponsored noopener noreferrer"
              className="inline-flex items-center gap-2 border border-primary text-primary px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary/10">
              Try {b.name} <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Related Comparisons */}
        {relatedComparisons.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4">Related Comparisons</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedComparisons.map((c) => {
                const ca = getReviewBySlug(c.platformA);
                const cb = getReviewBySlug(c.platformB);
                return (
                  <Link key={c.slug} to={`/compare/${c.slug}`}
                    className="bg-card rounded-xl border border-border/50 p-4 card-hover group">
                    <p className="font-bold text-sm group-hover:text-primary transition-colors">
                      {ca?.name || c.platformA} vs {cb?.name || c.platformB}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{c.category}</p>
                    <span className="text-xs text-primary font-medium mt-2 inline-flex items-center gap-1">Compare <ArrowRight className="h-3 w-3" /></span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* FAQ */}
        {comparison.faqs.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="space-y-2">
              {comparison.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border/50 px-5">
                  <AccordionTrigger className="text-sm font-medium hover:no-underline text-left py-4">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-7">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default CompareDetailPage;
