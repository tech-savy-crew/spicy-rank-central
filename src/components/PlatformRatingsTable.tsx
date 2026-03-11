import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, ChevronDown, ChevronUp } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { RatingBadge } from "@/components/RatingBadge";

type SortDir = "asc" | "desc";

interface PlatformRow {
  name: string;
  category: string;
  score: number;
  pricing: string;
  bestFor: string;
  slug: string;
}

const rows: PlatformRow[] = [
  { name: "OnlyFans", category: "Creator Platform", score: 8.5, pricing: "Free (20% fee)", bestFor: "Established creators with large following", slug: "onlyfans" },
  { name: "Candy.ai", category: "AI Companion", score: 8.3, pricing: "$12.99/mo", bestFor: "Immersive AI girlfriend experience", slug: "candy-ai" },
  { name: "Fansly", category: "Creator Platform", score: 8.2, pricing: "Free (20% fee)", bestFor: "Creators migrating from OnlyFans", slug: "fansly" },
  { name: "Bumble", category: "Dating App", score: 8.0, pricing: "Free / $39.99/mo", bestFor: "Women who want to make the first move", slug: "bumble" },
  { name: "FeetFinder", category: "Fetish Marketplace", score: 8.0, pricing: "$4.99/mo seller", bestFor: "Selling feet pics professionally", slug: "feetfinder" },
  { name: "Chaturbate", category: "Live Cam", score: 7.8, pricing: "Free (tokens)", bestFor: "Free live cam viewing experience", slug: "chaturbate" },
  { name: "DreamGF.ai", category: "AI Companion", score: 7.8, pricing: "$9.99/mo", bestFor: "Visual AI girlfriend experience", slug: "dreamgf-ai" },
  { name: "FanVue", category: "Creator Platform", score: 7.6, pricing: "Free (15% fee)", bestFor: "Maximum creator earnings", slug: "fanvue" },
  { name: "Stripchat", category: "Live Cam", score: 7.5, pricing: "Free (tokens)", bestFor: "VR cam shows + modern interface", slug: "stripchat" },
  { name: "Tinder", category: "Dating App", score: 7.5, pricing: "Free / $39.99/mo", bestFor: "Largest dating user base", slug: "tinder" },
];

const categoryStyles: Record<string, string> = {
  "Creator Platform": "bg-primary/10 text-primary",
  "Live Cam": "bg-destructive/10 text-destructive",
  "Dating App": "bg-accent/30 text-accent-foreground",
  "AI Companion": "bg-secondary text-secondary-foreground",
  "Fetish Marketplace": "bg-primary/10 text-primary",
};

export function PlatformRatingsTable() {
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const sorted = [...rows].sort((a, b) =>
    sortDir === "desc" ? b.score - a.score : a.score - b.score
  );

  const toggleSort = () => setSortDir((d) => (d === "desc" ? "asc" : "desc"));

  return (
    <section className="border-y border-border/50 bg-card/50">
      <div className="container py-16">
        <AnimatedSection>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                Platform Ratings at a Glance
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Quick scores for the top-rated platforms we've reviewed
              </p>
            </div>
            <Link to="/rankings" className="text-sm text-primary font-medium hover:underline hidden md:block">
              See all ratings →
            </Link>
          </div>
        </AnimatedSection>

        {/* Desktop Table */}
        <AnimatedSection>
          <div className="hidden md:block rounded-xl border border-border/50 overflow-hidden bg-card">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary">
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-secondary-foreground px-5 py-3">Platform</th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-secondary-foreground px-5 py-3">Category</th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-secondary-foreground px-5 py-3 cursor-pointer select-none" onClick={toggleSort}>
                    <span className="inline-flex items-center gap-1">
                      Score
                      {sortDir === "desc" ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
                    </span>
                  </th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-secondary-foreground px-5 py-3">Pricing</th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-secondary-foreground px-5 py-3">Best For</th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-secondary-foreground px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((row, i) => (
                  <tr key={row.slug} className={`border-b border-border/50 transition-colors hover:bg-secondary/30 ${i % 2 === 0 ? "bg-card" : "bg-secondary/10"}`}>
                    <td className="px-5 py-3.5">
                      <span className="font-semibold text-sm text-foreground">{row.name}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryStyles[row.category] || "bg-secondary text-secondary-foreground"}`}>
                        {row.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <RatingBadge rating={row.score} size="sm" />
                    </td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">{row.pricing}</td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">{row.bestFor}</td>
                    <td className="px-5 py-3.5">
                      <Link to={`/reviews/${row.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                        Read Review <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {sorted.map((row) => (
            <div key={row.slug} className="bg-card rounded-lg border border-border/50 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm text-foreground">{row.name}</span>
                <RatingBadge rating={row.score} size="sm" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryStyles[row.category] || "bg-secondary text-secondary-foreground"}`}>
                  {row.category}
                </span>
                <span className="text-xs text-muted-foreground">{row.pricing}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{row.bestFor}</p>
              <Link
                to={`/reviews/${row.slug}`}
                className="flex items-center justify-center gap-1 w-full border border-primary text-primary rounded-lg py-2 text-sm font-medium transition-colors hover:bg-primary/10"
              >
                Read Review <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-4 md:hidden text-center">
          <Link to="/rankings" className="text-sm text-primary font-medium">See all ratings →</Link>
        </div>
      </div>
    </section>
  );
}
