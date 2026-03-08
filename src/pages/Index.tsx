import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PlatformCard } from "@/components/PlatformCard";
import { RatingBadge } from "@/components/RatingBadge";
import { SEO, websiteSchema, itemListSchema } from "@/components/SEO";
import { platforms, categories } from "@/data/platforms";
import { useState } from "react";
import { ArrowRight, Flame, TrendingUp, Zap } from "lucide-react";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? platforms : platforms.filter((p) => p.category === activeCategory);
  const featured = platforms.slice(0, 6);
  const latest = [...platforms].sort((a, b) => b.rating - a.rating).slice(0, 4);

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

      {/* Hero */}
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

      {/* Stats */}
      <section className="border-y border-border/50 bg-card/30">
        <div className="container py-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-black spicy-text-gradient">{platforms.length}+</div>
              <div className="text-xs text-muted-foreground mt-1">Platforms Reviewed</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black spicy-text-gradient">5</div>
              <div className="text-xs text-muted-foreground mt-1">Rating Categories</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black spicy-text-gradient">100%</div>
              <div className="text-xs text-muted-foreground mt-1">Independent</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Reviews */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              Featured Reviews
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Our most popular platform breakdowns</p>
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

      {/* Category Filter */}
      <section className="container py-16">
        <h2 className="text-2xl md:text-3xl font-black mb-6 flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          Browse by Category
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

      {/* Latest Reviews */}
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
