import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SEO, breadcrumbSchema, faqSchema } from "@/components/SEO";
import { comparisons } from "@/data/comparisonData";
import { getReviewBySlug } from "@/data/reviewDetails";
import { RatingBadge } from "@/components/RatingBadge";
import { ArrowRight, Crown, Zap } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

/* Category descriptions for SEO */
const categoryDescriptions: Record<string, string> = {
  "AI Companion": "Compare companion apps on conversation quality, features, image generation, and pricing.",
  "Creator Platform":
    "Compare subscription platforms on commission rates, audience size, creator tools, and content discovery.",
  "Live Cam": "Compare streaming platforms on performer variety, quality, token pricing, and features.",
  "Dating App": "Compare dating apps on user base, matching quality, subscription pricing, and conversation quality.",
  Dating: "Compare premium platforms on privacy features, pricing models, and security.",
};

/* Rename map for display */
const categoryDisplayNames: Record<string, string> = {
  Dating: "Dating — Premium & Discreet",
};

/* Hub page FAQs */
const hubFaqs = [
  {
    question: "How do you compare platforms?",
    answer:
      "We test both platforms for 30 to 60 days with real accounts. We evaluate pricing, features, user experience, safety, and content quality, then declare a winner based on overall value for specific user types.",
  },
  {
    question: "Which creator platform has the lowest commission?",
    answer:
      "FanVue at 15% has the lowest commission. OnlyFans and Fansly both charge 20%. Patreon charges 5-12% plus payment processing.",
  },
  {
    question: "Which dating app has more users?",
    answer:
      "Tinder with 75M+ monthly active users globally. Bumble is second. Both cost approximately $39.99 at mid-tier subscriptions.",
  },
  {
    question: "Which platform has the best free experience?",
    answer:
      "Chaturbate for streaming content with thousands of live performers. GirlfriendGPT for AI companions with a generous free tier. Both offer genuinely useful experiences without requiring payment.",
  },
  {
    question: "Can I use multiple platforms simultaneously?",
    answer:
      "Yes. Many users and creators run 2-3 platforms at the same time for different strengths. Creators often use one for brand recognition and another for content discovery or better economics.",
  },
];

const ComparePage = () => {
  return (
    <Layout>
      <SEO
        title="Compare Platforms Side by Side — SpicyRanked 2026"
        description="Head-to-head comparisons of the top platforms. Side-by-side pricing, features, and honest verdicts to help you choose the right platform. Updated March 2026."
        canonical="/compare"
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Compare Platforms", url: "/compare" },
          ]),
          faqSchema(hubFaqs),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Compare Platforms",
            description: "Head-to-head platform comparisons with pricing, features, and verdicts",
            url: "https://spicyranked.com/compare",
            publisher: { "@type": "Organization", name: "SpicyRanked", url: "https://spicyranked.com" },
          },
        ]}
      />

      <div className="container py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Compare Platforms</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl md:text-4xl font-black mb-2">Compare Platforms Side by Side</h1>
        <p className="text-muted-foreground mb-4">Head-to-head comparisons of top adult platforms</p>

        {/* SEO Intro Paragraph */}
        <p className="text-base text-muted-foreground max-w-3xl mb-10 leading-relaxed">
          Not sure which platform is right for you? Our head-to-head comparisons break down the real differences between
          the top platforms in every category. Each comparison includes side-by-side pricing, feature analysis, user
          experience evaluation, and a clear verdict based on our hands-on testing. We test every platform for 30 to 60
          days before publishing, so these comparisons reflect real experience rather than spec-sheet analysis.
        </p>

        {/* Group by category */}
        {(() => {
          const categories = [...new Set(comparisons.map((c) => c.category))];
          return categories.map((cat) => {
            const catComps = comparisons.filter((c) => c.category === cat);
            const displayName = categoryDisplayNames[cat] || cat;
            const description = categoryDescriptions[cat];
            return (
              <section key={cat} className="mb-10">
                <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" /> {displayName}
                </h2>
                {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {catComps.map((c) => {
                    const a = getReviewBySlug(c.platformA);
                    const b = getReviewBySlug(c.platformB);
                    if (!a || !b) return null;
                    const winner = a.score > b.score ? "A" : b.score > a.score ? "B" : "tie";
                    return (
                      <div
                        key={c.slug}
                        className="bg-card rounded-xl border border-border/50 p-6 card-hover block group relative"
                      >
                        {/* Our Pick badge */}
                        {winner !== "tie" && (
                          <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                            Our Pick: {winner === "A" ? a.name : b.name}
                          </span>
                        )}
                        {winner === "tie" && (
                          <span className="absolute top-3 right-3 bg-muted-foreground text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">
                            Different Strengths
                          </span>
                        )}

                        <Link to={`/compare/${c.slug}`}>
                          <h3 className="font-bold text-base mb-4 group-hover:text-primary transition-colors pr-24">
                            {a.name} vs {b.name}
                          </h3>
                        </Link>

                        <div className="flex items-center justify-center gap-6 mb-4">
                          <div className="text-center flex-1">
                            {winner === "A" && <Crown className="h-4 w-4 text-primary mx-auto mb-1" />}
                            <Link
                              to={`/reviews/${a.slug}`}
                              className="font-bold text-sm block hover:underline hover:text-primary transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {a.name}
                            </Link>
                            <RatingBadge rating={a.score} size="sm" className="mx-auto mt-1" />
                          </div>
                          <span className="text-muted-foreground font-black text-lg">VS</span>
                          <div className="text-center flex-1">
                            {winner === "B" && <Crown className="h-4 w-4 text-primary mx-auto mb-1" />}
                            <Link
                              to={`/reviews/${b.slug}`}
                              className="font-bold text-sm block hover:underline hover:text-primary transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {b.name}
                            </Link>
                            <RatingBadge rating={b.score} size="sm" className="mx-auto mt-1" />
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">{c.verdict}</p>
                        <Link
                          to={`/compare/${c.slug}`}
                          className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-3"
                        >
                          Full Comparison <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          });
        })()}

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto py-12">
          <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {hubFaqs.map((faq, i) => (
              <div key={i} className="bg-card rounded-xl border border-border/50 p-5">
                <h3 className="text-base font-semibold mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground leading-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ComparePage;
