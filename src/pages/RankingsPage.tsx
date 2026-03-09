import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SEO, itemListSchema, breadcrumbSchema } from "@/components/SEO";
import { reviewPlatforms, reviewCategories } from "@/data/reviews";
import { RatingBadge } from "@/components/RatingBadge";
import { ArrowRight } from "lucide-react";

const RankingsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"rating" | "name">("rating");

  const filtered = activeCategory === "All"
    ? reviewPlatforms
    : reviewPlatforms.filter((p) => p.category === activeCategory);

  const sorted = [...filtered].sort((a, b) =>
    sortBy === "rating" ? b.score - a.score : a.name.localeCompare(b.name)
  );

  return (
    <Layout>
      <SEO
        title="Platform Rankings — All Adult Platforms Ranked | SpicyRanked"
        description="Every adult platform we've reviewed, ranked by score. Creator platforms, cam sites, AI companions, dating apps & more."
        canonical="/rankings"
        jsonLd={[
          itemListSchema(
            "Platform Rankings",
            sorted.map((p, i) => ({ name: p.name, url: `/reviews/${p.slug}`, position: i + 1 }))
          ),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Rankings", url: "/rankings" },
          ]),
        ]}
      />

      <div className="container py-12">
        <h1 className="text-3xl md:text-4xl font-black mb-2">Platform Rankings</h1>
        <p className="text-muted-foreground mb-8">Every platform we've reviewed, ranked and sorted</p>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex flex-wrap gap-2">
            {reviewCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "spicy-gradient text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-accent/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "rating" | "name")}
            className="ml-auto bg-secondary text-secondary-foreground rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="rating">Sort by Rating</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Showing {sorted.length} platform{sorted.length !== 1 ? "s" : ""}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((p, i) => (
            <Link
              key={p.slug}
              to={`/reviews/${p.slug}`}
              className="group block bg-card rounded-xl border border-border/50 overflow-hidden transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">{p.category}</span>
                  <RatingBadge rating={p.score} size="sm" />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{p.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">{p.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Read Review <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default RankingsPage;
