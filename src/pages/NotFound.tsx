import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { platforms } from "@/data/platforms";
import { RatingBadge } from "@/components/RatingBadge";
import { Search, Home, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const popular = [...platforms].sort((a, b) => b.rating - a.rating).slice(0, 4);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <Layout>
      <SEO title="Page Not Found" description="The page you're looking for doesn't exist." noindex />

      <div className="container py-20 max-w-2xl text-center">
        <div className="text-8xl font-black spicy-text-gradient mb-4">404</div>
        <h1 className="text-3xl font-black mb-3">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved. Try searching or check out our popular reviews.
        </p>

        {/* Search */}
        <form onSubmit={handleSearch} className="relative max-w-md mx-auto mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reviews..."
            className="w-full bg-card border border-border/50 rounded-xl pl-12 pr-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
          />
        </form>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Link to="/" className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-surface-hover transition-colors btn-hover">
            <Home className="h-4 w-4" /> Home
          </Link>
          <Link to="/category/all" className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-surface-hover transition-colors btn-hover">
            All Reviews
          </Link>
          <Link to="/compare" className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-surface-hover transition-colors btn-hover">
            Compare
          </Link>
          <Link to="/rankings" className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-surface-hover transition-colors btn-hover">
            Rankings
          </Link>
        </div>

        {/* Popular Content */}
        <div className="text-left">
          <h2 className="text-lg font-bold mb-4 text-center">Popular Reviews</h2>
          <div className="space-y-3">
            {popular.map((p) => (
              <Link
                key={p.slug}
                to={`/reviews/${p.slug}`}
                className="flex items-center gap-4 bg-card rounded-xl border border-border/50 p-4 card-hover group"
              >
                <span className="text-2xl">{p.logo}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{p.name}</h3>
                  <p className="text-xs text-muted-foreground truncate">{p.tagline}</p>
                </div>
                <RatingBadge rating={p.rating} size="sm" />
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
