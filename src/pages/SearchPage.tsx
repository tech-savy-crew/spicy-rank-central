import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PlatformCard } from "@/components/PlatformCard";
import { SEO } from "@/components/SEO";
import { platforms } from "@/data/platforms";
import { Search, X } from "lucide-react";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return platforms.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.verdict.toLowerCase().includes(q) ||
        p.contentTypes.toLowerCase().includes(q)
    );
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(query ? { q: query } : {});
  };

  return (
    <Layout>
      <SEO
        title={query ? `Search: ${query}` : "Search Reviews"}
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
            placeholder="Search platforms, categories, features..."
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
            {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
          </p>
        )}

        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.map((p) => (
              <PlatformCard key={p.id} platform={p} />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg mb-2">No platforms found matching "{query}"</p>
            <Link to="/category/all" className="text-primary hover:underline text-sm">Browse all reviews →</Link>
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">Start typing to search across all reviews</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;
