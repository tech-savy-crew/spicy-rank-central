import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { reviewPlatforms } from "@/data/reviews";
import { bestLists } from "@/data/bestListsData";
import { comparisons } from "@/data/comparisonData";
import { getReviewBySlug } from "@/data/reviewDetails";
import { RatingBadge } from "@/components/RatingBadge";
import { Search, X, ArrowRight } from "lucide-react";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return { platforms: [], lists: [], comparisons: [] };

    const platforms = reviewPlatforms.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );

    const lists = bestLists.filter(
      (l) => l.title.toLowerCase().includes(q) || l.subtitle.toLowerCase().includes(q)
    );

    const comps = comparisons.filter((c) => {
      const a = getReviewBySlug(c.platformA);
      const b = getReviewBySlug(c.platformB);
      return (
        c.slug.includes(q) ||
        a?.name.toLowerCase().includes(q) ||
        b?.name.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    });

    return { platforms, lists, comparisons: comps };
  }, [query]);

  const totalResults = results.platforms.length + results.lists.length + results.comparisons.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(query ? { q: query } : {});
  };

  return (
    <Layout>
      <SEO
        title={query ? `Search: ${query} | SpicyRanked` : "Search Reviews | SpicyRanked"}
        description="Search across all platform reviews, comparisons, and rankings on SpicyRanked."
        canonical="/search"
        noindex
      />

      <div className="container py-12">
        <h1 className="text-3xl md:text-4xl font-black mb-6">Search Reviews</h1>

        <form onSubmit={handleSubmit} className="relative mb-10 max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSearchParams(e.target.value ? { q: e.target.value } : {});
            }}
            placeholder="Search platforms, categories, comparisons..."
            className="w-full bg-card border border-border/50 rounded-xl pl-12 pr-12 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(""); setSearchParams({}); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </form>

        {query && (
          <p className="text-sm text-muted-foreground mb-6">
            {totalResults} result{totalResults !== 1 ? "s" : ""} for "{query}"
          </p>
        )}

        {/* Platform results */}
        {results.platforms.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-bold mb-4">Platforms</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {results.platforms.map((p) => (
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
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{p.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Best lists results */}
        {results.lists.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-bold mb-4">Best Lists</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.lists.map((l) => (
                <Link key={l.slug} to={`/best-lists/${l.slug}`}
                  className="bg-card rounded-xl border border-border/50 p-5 card-hover group">
                  <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{l.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{l.subtitle}</p>
                  <span className="text-xs text-primary font-medium mt-2 inline-flex items-center gap-1">View list <ArrowRight className="h-3 w-3" /></span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Comparison results */}
        {results.comparisons.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-bold mb-4">Comparisons</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.comparisons.map((c) => {
                const a = getReviewBySlug(c.platformA);
                const b = getReviewBySlug(c.platformB);
                return (
                  <Link key={c.slug} to={`/compare/${c.slug}`}
                    className="bg-card rounded-xl border border-border/50 p-5 card-hover group">
                    <h3 className="font-bold text-sm group-hover:text-primary transition-colors">
                      {a?.name || c.platformA} vs {b?.name || c.platformB}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">{c.category}</p>
                    <span className="text-xs text-primary font-medium mt-2 inline-flex items-center gap-1">Compare <ArrowRight className="h-3 w-3" /></span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {query && totalResults === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg mb-2">No results found for "{query}"</p>
            <Link to="/reviews" className="text-primary hover:underline text-sm">Browse all reviews →</Link>
          </div>
        )}

        {!query && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">Start typing to search across all reviews</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;
