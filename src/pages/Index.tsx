import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PlatformCard } from "@/components/PlatformCard";
import { RatingBadge } from "@/components/RatingBadge";
import { SEO, websiteSchema, itemListSchema } from "@/components/SEO";
import { platforms, categories } from "@/data/platforms";
import { useState } from "react";
import {
  ArrowRight,
  Flame,
  TrendingUp,
  Zap,
  Search,
  Shield,
  Clock,
  BarChart3,
  Mail,
  Sparkles,
  Tv,
  Heart,
  Users,
  Bot,
  Camera,
  Layers,
} from "lucide-react";

/* ── Category cards config ── */
const homepageCategories = [
  { label: "Creators", icon: Sparkles, slug: "social-media", desc: "Platforms for content creators" },
  { label: "Streaming", icon: Tv, slug: "streaming", desc: "Video & live streaming" },
  { label: "Dating", icon: Heart, slug: "social-media", desc: "Meeting new people" },
  { label: "Social", icon: Users, slug: "social-media", desc: "Social networks & communities" },
  { label: "AI", icon: Bot, slug: "productivity", desc: "AI-powered platforms" },
  { label: "Cam", icon: Camera, slug: "streaming", desc: "Live cam & video chat" },
  { label: "Aggregators", icon: Layers, slug: "productivity", desc: "Content aggregation hubs" },
];

const Index = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filtered = activeCategory === "All" ? platforms : platforms.filter((p) => p.category === activeCategory);
  const featured = platforms.slice(0, 6);
  const trending = [...platforms].sort((a, b) => b.rating - a.rating).slice(0, 5);
  const latest = [...platforms].sort((a, b) => b.rating - a.rating).slice(0, 4);

  // Generate comparison pairs for "Latest Comparisons"
  const comparisonPairs = [
    { a: platforms[0], b: platforms[1] },
    { a: platforms[2], b: platforms[3] },
    { a: platforms[4], b: platforms[5] },
    { a: platforms[6], b: platforms[7] },
  ].filter((c) => c.a && c.b);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  const lastSiteUpdate = platforms.reduce((latest, p) => {
    return p.lastUpdated > latest ? p.lastUpdated : latest;
  }, platforms[0]?.lastUpdated || "");

  return (
    <Layout>
      <SEO
        title="Honest Reviews & Rankings of Digital Platforms"
        description="In-depth reviews, head-to-head comparisons, and brutally honest rankings of the apps and platforms that shape your digital life."
        canonical="/"
        jsonLd={[
          websiteSchema(),
          itemListSchema(
            "Featured Platform Reviews",
            featured.map((p, i) => ({ name: p.name, url: `/review/${p.slug}`, position: i + 1 }))
          ),
        ]}
      />

      {/* ── Hero with Search ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 spicy-gradient opacity-5" />
        <div className="container py-20 md:py-28 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-xs font-medium text-primary mb-6">
              <Flame className="h-3.5 w-3.5" />
              Honest reviews, spicy takes
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6 text-balance">
              The hottest takes on{" "}
              <span className="spicy-text-gradient">digital platforms</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              In-depth reviews, head-to-head comparisons, and brutally honest rankings of the apps and platforms that shape your digital life.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-xl mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search platforms, categories, features..."
                className="w-full bg-card border border-border/50 rounded-xl pl-12 pr-28 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 spicy-gradient text-primary-foreground font-semibold px-5 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity"
              >
                Search
              </button>
            </form>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/category/all"
                className="inline-flex items-center gap-2 spicy-gradient text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Browse Reviews <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/compare"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-semibold px-6 py-3 rounded-lg hover:bg-surface-hover transition-colors"
              >
                Compare Platforms
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Signals ── */}
      <section className="border-y border-border/50 bg-card/30">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-black spicy-text-gradient">{platforms.length}+</div>
              <div className="text-xs text-muted-foreground mt-1">Platforms Reviewed</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black spicy-text-gradient">5</div>
              <div className="text-xs text-muted-foreground mt-1">Rating Categories</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5 text-2xl md:text-3xl font-black spicy-text-gradient">
                <Shield className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                100%
              </div>
              <div className="text-xs text-muted-foreground mt-1">Editorially Independent</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1.5 text-sm font-bold text-foreground">
                <Clock className="h-4 w-4 text-primary" />
                {lastSiteUpdate}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Last Updated</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trending / Popular Reviews ── */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black flex items-center gap-2">
              <Flame className="h-6 w-6 text-primary" />
              Trending Reviews
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Most popular platform breakdowns right now</p>
          </div>
          <Link to="/rankings" className="text-sm text-primary font-medium hover:underline hidden md:block">
            View all →
          </Link>
        </div>
        <div className="space-y-3">
          {trending.map((p, i) => (
            <Link
              key={p.id}
              to={`/review/${p.slug}`}
              className="flex items-center gap-5 bg-card rounded-xl border border-border/50 p-5 card-hover"
            >
              <span className="text-2xl font-black text-primary w-8 shrink-0">#{i + 1}</span>
              <span className="text-3xl shrink-0">{p.logo}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold">{p.name}</h3>
                <p className="text-sm text-muted-foreground truncate">{p.tagline}</p>
              </div>
              <div className="hidden sm:block">
                <span className="text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full font-medium">
                  {p.category}
                </span>
              </div>
              <RatingBadge rating={p.rating} />
            </Link>
          ))}
        </div>
      </section>

      {/* ── Category Cards ── */}
      <section className="container py-16">
        <h2 className="text-2xl md:text-3xl font-black mb-2">Browse by Category</h2>
        <p className="text-sm text-muted-foreground mb-8">Find the perfect platform for your needs</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {homepageCategories.map((cat) => (
            <Link
              key={cat.label}
              to={`/category/${cat.slug}`}
              className="group bg-card rounded-xl border border-border/50 p-5 card-hover flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-xl spicy-gradient flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <cat.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{cat.label}</h3>
              <p className="text-xs text-muted-foreground mt-1 hidden sm:block">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Reviews Grid ── */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              Featured Reviews
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Our latest in-depth platform analyses</p>
          </div>
          <Link to="/category/all" className="text-sm text-primary font-medium hover:underline hidden md:block">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((p) => (
            <PlatformCard key={p.id} platform={p} />
          ))}
        </div>
      </section>

      {/* ── Latest Comparisons ── */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              Latest Comparisons
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Head-to-head platform showdowns</p>
          </div>
          <Link to="/compare" className="text-sm text-primary font-medium hover:underline hidden md:block">
            Compare more →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {comparisonPairs.map((pair) => (
            <Link
              key={`${pair.a.slug}-${pair.b.slug}`}
              to={`/compare?a=${pair.a.slug}&b=${pair.b.slug}`}
              className="bg-card rounded-xl border border-border/50 p-5 card-hover group"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="text-center">
                  <span className="text-3xl block">{pair.a.logo}</span>
                  <span className="text-xs font-medium mt-1 block">{pair.a.name}</span>
                </div>
                <span className="text-muted-foreground font-black text-lg">vs</span>
                <div className="text-center">
                  <span className="text-3xl block">{pair.b.logo}</span>
                  <span className="text-xs font-medium mt-1 block">{pair.b.name}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{pair.a.rating}/10</span>
                <span className="text-primary font-medium group-hover:underline">Compare →</span>
                <span>{pair.b.rating}/10</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Category Filter ── */}
      <section className="container py-16">
        <h2 className="text-2xl md:text-3xl font-black mb-6 flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          All Reviews
        </h2>
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "spicy-gradient text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-surface-hover"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <PlatformCard key={p.id} platform={p} />
          ))}
        </div>
      </section>

      {/* ── Newsletter Signup ── */}
      <section className="container py-16">
        <div className="relative overflow-hidden rounded-2xl border border-border/50">
          <div className="absolute inset-0 spicy-gradient opacity-10" />
          <div className="relative p-8 md:p-12 text-center max-w-2xl mx-auto">
            <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-black mb-3">Stay in the loop</h2>
            <p className="text-muted-foreground mb-6">
              Get our latest reviews, comparisons, and spicy takes delivered straight to your inbox. No spam, ever.
            </p>
            {subscribed ? (
              <div className="bg-success/10 border border-success/20 rounded-xl p-5">
                <p className="text-success font-bold">You're in! 🎉</p>
                <p className="text-sm text-muted-foreground mt-1">Check your inbox for a confirmation email.</p>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  maxLength={255}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 bg-card border border-border/50 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  type="submit"
                  className="spicy-gradient text-primary-foreground font-semibold px-6 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Top Rated ── */}
      <section className="container py-16">
        <h2 className="text-2xl md:text-3xl font-black mb-8">Top Rated</h2>
        <div className="space-y-4">
          {latest.map((p, i) => (
            <Link
              key={p.id}
              to={`/review/${p.slug}`}
              className="flex items-center gap-5 bg-card rounded-xl border border-border/50 p-5 card-hover"
            >
              <span className="text-2xl font-black text-muted-foreground w-8">#{i + 1}</span>
              <span className="text-3xl">{p.logo}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold">{p.name}</h3>
                <p className="text-sm text-muted-foreground truncate">{p.tagline}</p>
              </div>
              <RatingBadge rating={p.rating} />
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
