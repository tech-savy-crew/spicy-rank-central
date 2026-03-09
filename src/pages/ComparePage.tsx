import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SEO, breadcrumbSchema } from "@/components/SEO";
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

const ComparePage = () => {
  return (
    <Layout>
      <SEO
        title="Compare Adult Platforms — Head-to-Head Comparisons | SpicyRanked"
        description="Side-by-side comparisons of top adult platforms. Compare features, pricing, ratings, and more to find the best platform for you."
        canonical="/compare"
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Compare Platforms", url: "/compare" },
          ]),
        ]}
      />

      <div className="container py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Compare Platforms</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl md:text-4xl font-black mb-2">Compare Platforms</h1>
        <p className="text-muted-foreground mb-10">Head-to-head comparisons of top adult platforms</p>

        {/* Group by category */}
        {(() => {
          const categories = [...new Set(comparisons.map((c) => c.category))];
          return categories.map((cat) => {
            const catComps = comparisons.filter((c) => c.category === cat);
            return (
              <section key={cat} className="mb-10">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" /> {cat}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {catComps.map((c) => {
                    const a = getReviewBySlug(c.platformA);
                    const b = getReviewBySlug(c.platformB);
                    if (!a || !b) return null;
                    const winner = a.score >= b.score ? a : b;
                    return (
                      <Link key={c.slug} to={`/compare/${c.slug}`}
                        className="bg-card rounded-xl border border-border/50 p-6 card-hover block group">
                        <h3 className="font-bold text-base mb-4 group-hover:text-primary transition-colors">
                          {a.name} vs {b.name}
                        </h3>
                        <div className="flex items-center justify-center gap-6 mb-4">
                          <div className="text-center flex-1">
                            {winner === a && <Crown className="h-4 w-4 text-primary mx-auto mb-1" />}
                            <span className="font-bold text-sm block">{a.name}</span>
                            <RatingBadge rating={a.score} size="sm" className="mx-auto mt-1" />
                          </div>
                          <span className="text-muted-foreground font-black text-lg">VS</span>
                          <div className="text-center flex-1">
                            {winner === b && <Crown className="h-4 w-4 text-primary mx-auto mb-1" />}
                            <span className="font-bold text-sm block">{b.name}</span>
                            <RatingBadge rating={b.score} size="sm" className="mx-auto mt-1" />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{c.verdict}</p>
                        <span className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-3">
                          Full Comparison <ArrowRight className="h-3 w-3" />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          });
        })()}
      </div>
    </Layout>
  );
};

export default ComparePage;
