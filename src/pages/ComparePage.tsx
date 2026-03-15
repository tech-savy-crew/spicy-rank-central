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

/* Category descriptions for SEO content */
const categoryDescriptions: Record<string, string> = {
  "AI Companion": "Compare companion apps on conversation quality, features, image generation, and pricing.",
  "Creator Platform":
    "Compare subscription platforms on commission rates, audience size, creator tools, and content discovery.",
  "Live Cam": "Compare streaming platforms on performer variety, quality, token pricing, and features.",
  "Dating App": "Compare dating apps on user base, matching quality, subscription pricing, and conversation quality.",
  Dating: "Compare premium platforms on privacy features, pricing models, and security.",
  "Fetish & Niche Marketplaces":
    "Compare niche marketplaces on buyer audience, seller earnings, fees, and content specialization.",
};

/* Category display name overrides */
const categoryDisplayNames: Record<string, string> = {
  Dating: "Dating \u2014 Premium & Discreet",
};

/* Desired category order */
const categoryOrder = [
  "AI Companion",
  "Creator Platform",
  "Live Cam",
  "Dating App",
  "Dating",
  "Fetish & Niche Marketplaces",
];

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
      "FanVue at 15% has the lowest commission. OnlyFans and Fansly both charge 20%. Patreon charges 5\u201312% plus payment processing.",
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
      "Yes. Many users and creators run 2\u20133 platforms at the same time for different strengths. Creators often use one for brand recognition and another for content discovery or better economics.",
  },
  {
    question: "How many platforms do you review?",
    answer:
      "We currently review and compare 24 platforms across 6 categories: AI Companions, Creator Platforms, Live Cam Sites, Dating Apps, Premium Dating, and Niche Marketplaces. Each platform is tested for 30\u201360 days before we publish.",
  },
];

const ComparePage = () => {
  /* Get unique categories in preferred order */
  const dataCategories = [...new Set(comparisons.map((c) => c.category))];
  const categories = categoryOrder.filter((cat) => dataCategories.includes(cat));
  /* Add any categories not in our preferred order */
  dataCategories.forEach((cat) => {
    if (!categories.includes(cat)) categories.push(cat);
  });

  return (
    <Layout>
      <SEO
        title="Compare Adult Platforms Side by Side — SpicyRanked 2026"
        description="24 head-to-head comparisons across 6 categories. Compare OnlyFans vs Fansly, Tinder vs Bumble, Chaturbate vs Stripchat and more. Pricing, features, honest verdicts."
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
            description: "Head-to-head platform comparisons with pricing, features, and verdicts across 24 platforms",
            url: "https://spicyranked.com/compare",
            publisher: {
              "@type": "Organization",
              name: "SpicyRanked",
              url: "https://spicyranked.com",
            },
          },
        ]}
      />

      <div className="container py-6 sm:py-8 px-4 sm:px-6">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-4 sm:mb-6">
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

        {/* H1 */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2">Compare Platforms Side by Side</h1>
        <p className="text-muted-foreground text-sm sm:text-base mb-3">
          Head-to-head comparisons of top adult platforms
        </p>

        {/* SEO Intro Paragraph */}
        <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mb-8 sm:mb-10 leading-relaxed">
          Not sure which platform is right for you? Our head-to-head comparisons break down the real differences between
          the top platforms in every category. Each comparison includes side-by-side pricing, feature analysis, user
          experience evaluation, and a clear verdict based on our hands-on testing. We test every platform for 30 to 60
          days before publishing, so these comparisons reflect real experience rather than spec-sheet analysis. All 24
          platforms across 6 categories are covered.
        </p>

        {/* Quick Stats */}
        <div className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-10">
          <span className="text-xs sm:text-sm bg-secondary px-3 py-1.5 rounded-full font-medium">
            {comparisons.length} Comparisons
          </span>
          <span className="text-xs sm:text-sm bg-secondary px-3 py-1.5 rounded-full font-medium">24 Platforms</span>
          <span className="text-xs sm:text-sm bg-secondary px-3 py-1.5 rounded-full font-medium">6 Categories</span>
          <span className="text-xs sm:text-sm bg-secondary px-3 py-1.5 rounded-full font-medium">
            Updated March 2026
          </span>
        </div>

        {/* Category sections */}
        {categories.map((cat) => {
          const catComps = comparisons.filter((c) => c.category === cat);
          if (catComps.length === 0) return null;
          const displayName = categoryDisplayNames[cat] || cat;
          const description = categoryDescriptions[cat];

          return (
            <section key={cat} className="mb-8 sm:mb-12">
              {/* Category heading */}
              <h2 className="text-lg sm:text-xl font-bold mb-1 flex items-center gap-2">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
                <span>{displayName}</span>
                <span className="text-xs sm:text-sm font-normal text-muted-foreground ml-1">({catComps.length})</span>
              </h2>
              {description && (
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 ml-6 sm:ml-7">{description}</p>
              )}

              {/* Comparison cards grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {catComps.map((comp) => {
                  const a = getReviewBySlug(comp.platformA);
                  const b = getReviewBySlug(comp.platformB);
                  if (!a || !b) return null;

                  const winner = a.score > b.score ? "A" : b.score > a.score ? "B" : "tie";

                  return (
                    <div
                      key={comp.slug}
                      className="bg-card rounded-xl border border-border/50 p-4 sm:p-6 card-hover group relative"
                    >
                      {/* Our Pick / Different Strengths badge */}
                      {winner !== "tie" ? (
                        <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-primary text-primary-foreground text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full font-bold uppercase tracking-wide whitespace-nowrap">
                          Our Pick: {winner === "A" ? a.name : b.name}
                        </span>
                      ) : (
                        <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-muted-foreground text-white text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full font-semibold whitespace-nowrap">
                          Different Strengths
                        </span>
                      )}

                      {/* Card title */}
                      <Link to={`/compare/${comp.slug}`}>
                        <h3 className="font-bold text-sm sm:text-base mb-3 sm:mb-4 group-hover:text-primary transition-colors pr-20 sm:pr-32 leading-snug">
                          {a.name} vs {b.name}
                        </h3>
                      </Link>

                      {/* VS layout */}
                      <div className="flex items-center justify-center gap-3 sm:gap-6 mb-3 sm:mb-4">
                        {/* Platform A */}
                        <div className="text-center flex-1 min-w-0">
                          {winner === "A" && <Crown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary mx-auto mb-1" />}
                          <Link
                            to={`/reviews/${a.slug}`}
                            className="font-bold text-xs sm:text-sm block hover:underline hover:text-primary transition-colors truncate"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {a.name}
                          </Link>
                          <RatingBadge rating={a.score} size="sm" className="mx-auto mt-1" />
                        </div>

                        <span className="text-muted-foreground font-black text-base sm:text-lg shrink-0">VS</span>

                        {/* Platform B */}
                        <div className="text-center flex-1 min-w-0">
                          {winner === "B" && <Crown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary mx-auto mb-1" />}
                          <Link
                            to={`/reviews/${b.slug}`}
                            className="font-bold text-xs sm:text-sm block hover:underline hover:text-primary transition-colors truncate"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {b.name}
                          </Link>
                          <RatingBadge rating={b.score} size="sm" className="mx-auto mt-1" />
                        </div>
                      </div>

                      {/* Summary */}
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{comp.verdict}</p>

                      {/* Full Comparison link */}
                      <Link
                        to={`/compare/${comp.slug}`}
                        className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-2 sm:mt-3 hover:underline"
                      >
                        Full Comparison <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto py-8 sm:py-12 border-t border-border/50 mt-4">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4 sm:space-y-6">
            {hubFaqs.map((faq, i) => (
              <div key={i} className="bg-card rounded-xl border border-border/50 p-4 sm:p-5">
                <h3 className="text-sm sm:text-base font-semibold mb-2">{faq.question}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-6 sm:leading-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ComparePage;
