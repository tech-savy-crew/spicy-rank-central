import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SEO, breadcrumbSchema, itemListSchema } from "@/components/SEO";
import { reviewPlatforms, reviewCategories } from "@/data/reviews";
import { RatingBadge } from "@/components/RatingBadge";
import { Search, X, ArrowRight } from "lucide-react";

type SortOption = "highest" | "lowest" | "az" | "za" | "newest";

const ReviewsPage = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("highest");

  const results = useMemo(() => {
    let list = reviewPlatforms;

    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }

    const q = query.toLowerCase().trim();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    return [...list].sort((a, b) => {
      switch (sortBy) {
        case "highest": return b.score - a.score;
        case "lowest": return a.score - b.score;
        case "az": return a.name.localeCompare(b.name);
        case "za": return b.name.localeCompare(a.name);
        case "newest": return 0; // maintain original order as proxy
        default: return 0;
      }
    });
  }, [query, activeCategory, sortBy]);

  return (
    <Layout>
      <SEO
        title="All Platform Reviews | SpicyRanked - Honest Adult Platform Reviews"
        description="Browse 24 honest, independent reviews of adult platforms. Creator sites, cam sites, AI companions, dating apps & more - all rated on our 10-point scale."
        canonical="/reviews"
        jsonLd={[
          itemListSchema(
            "All Platform Reviews",
            results.map((p, i) => ({ name: p.name, url: `/reviews/${p.slug}`, position: i + 1 }))
          ),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Reviews", url: "/reviews" },
          ]),
        ]}
      />

      <div className="container py-12">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-black mb-2">All Platform Reviews</h1>
        <p className="text-muted-foreground mb-8">
          Honest, independent reviews of 24 adult platforms — rated and ranked
        </p>

        {/* Search */}
        <div className="relative mb-6 max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search platforms..."
            className="w-full bg-card border border-border/50 rounded-xl pl-12 pr-12 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Filters + Sort */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex flex-wrap gap-2">
            {reviewCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-accent/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="ml-auto bg-secondary text-secondary-foreground rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="highest">Sort by: Highest Rated</option>
            <option value="lowest">Sort by: Lowest Rated</option>
            <option value="az">Sort by: A–Z</option>
            <option value="za">Sort by: Z–A</option>
            <option value="newest">Sort by: Newest</option>
          </select>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          Showing {results.length} platform{results.length !== 1 ? "s" : ""}
        </p>

        {/* Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((p) => (
              <Link
                key={p.slug}
                to={`/reviews/${p.slug}`}
                className="group block bg-card rounded-xl border border-border/50 overflow-hidden transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
                      {p.category}
                    </span>
                    <RatingBadge rating={p.score} size="sm" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                    {p.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Read Review <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg mb-2">No platforms found</p>
            <button onClick={() => { setQuery(""); setActiveCategory("All"); }} className="text-primary hover:underline text-sm">
              Clear filters
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 bg-card border border-border/50 rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Can't find a platform?</h2>
          <p className="text-muted-foreground mb-4">
            We're adding new reviews every week. Suggest a platform and we'll review it.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Suggest a platform <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ReviewsPage;
