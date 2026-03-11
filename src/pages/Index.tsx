import { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { RatingBadge } from "@/components/RatingBadge";
import { SEO, websiteSchema, organizationSchema, itemListSchema } from "@/components/SEO";
import {
  ArrowRight,
  Search,
  Trophy,
  Star,
  Flame,
} from "lucide-react";

/* ── Lazy-loaded below-fold components ── */
const PlatformRatingsTable = lazy(() => import("@/components/PlatformRatingsTable").then(m => ({ default: m.PlatformRatingsTable })));
const EditorsPicks = lazy(() => import("@/components/EditorsPicks").then(m => ({ default: m.EditorsPicks })));
const LatestNews = lazy(() => import("@/components/LatestNews").then(m => ({ default: m.LatestNews })));
const BelowFoldSections = lazy(() => import("@/components/HomeBelowFold"));

/* ── Static Data (above-fold only) ── */

const featuredReviews = [
  { title: "OnlyFans", category: "Creator Platform", rating: 8.5, slug: "onlyfans", desc: "Still the biggest name in creator subscriptions — but rising fees and growing competition mean it's no longer the only option. Full breakdown inside." },
  { title: "Fansly", category: "Creator Platform", rating: 8.2, slug: "fansly", desc: "Lower creator fees, better content organization, and a rapidly growing user base make Fansly the top OnlyFans alternative for both creators and fans." },
  { title: "Chaturbate", category: "Live Cam Site", rating: 7.8, slug: "chaturbate", desc: "The most popular free live cam platform with thousands of broadcasters online 24/7. Great free experience but the token system can get expensive." },
  { title: "Stripchat", category: "Live Cam Site", rating: 7.5, slug: "stripchat", desc: "AI-powered cam site with virtual reality support and innovative features. Strong Chaturbate alternative with a modern, clean interface." },
  { title: "Bumble", category: "Dating App", rating: 8.0, slug: "bumble", desc: "Women-make-the-first-move dating app with a solid matching algorithm. Premium features are worth it if you're serious about dating in 2026." },
  { title: "FanVue", category: "Creator Platform", rating: 7.6, slug: "fanvue", desc: "UK-based OnlyFans competitor with built-in AI tools for creators. Lower fees and better analytics, but still building its audience." },
];

const LazyFallback = () => <div className="py-16" />;

/* ── Component ── */

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Layout>
      <SEO
        title="SpicyRanked — Honest Reviews & Rankings of Adult Platforms, Cam Sites & Dating Apps"
        description="Independent reviews, ratings & comparisons of 24 adult platforms. OnlyFans, Fansly, Chaturbate, Stripchat & more — ranked by real testing. Updated weekly."
        canonical="/"
        jsonLd={[
          websiteSchema(),
          organizationSchema(),
          itemListSchema("Featured Platform Reviews", featuredReviews.map((p, i) => ({ name: p.title, url: `/reviews/${p.slug}`, position: i + 1 }))),
        ]}
      />

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 spicy-gradient opacity-5" />
        <div className="container py-20 md:py-28 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6 text-balance">
              Honest Reviews of Adult Platforms —{" "}
              <span className="spicy-text-gradient">Ranked & Rated</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              We review, compare, and rank the top creator platforms, live cam sites, AI companions, and dating apps — so you don't waste your time or money. Every platform is independently tested and rated on a 10-point scale.
            </p>

            {/* Search */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
              }}
              className="relative max-w-xl mb-8"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search platforms, categories, features..."
                className="w-full bg-card border border-border/50 rounded-xl pl-12 pr-28 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 spicy-gradient text-primary-foreground font-semibold px-5 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity btn-hover">
                Search
              </button>
            </form>

            <div className="flex flex-wrap gap-3 mb-6">
              <Link to="/reviews" className="inline-flex items-center gap-2 spicy-gradient text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity btn-hover">
                Browse All Reviews <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/rankings" className="inline-flex items-center gap-2 border border-primary text-primary font-semibold px-6 py-3 rounded-lg hover:bg-primary/10 transition-colors btn-hover">
                <Trophy className="h-4 w-4" /> Top 10 Lists
              </Link>
            </div>

            <p className="text-xs text-muted-foreground">
              24 platforms reviewed · Updated weekly · Independent & unbiased
            </p>
          </div>
        </div>
      </section>

      {/* ═══ FEATURED REVIEWS (above fold — not lazy) ═══ */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black flex items-center gap-2">
              <Star className="h-6 w-6 text-primary" />
              Featured Reviews
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Our most popular and recently updated adult platform reviews</p>
          </div>
          <Link to="/reviews" className="text-sm text-primary font-medium hover:underline hidden md:block">View all →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredReviews.map((card) => (
            <Link key={card.slug} to={`/reviews/${card.slug}`} className="bg-card rounded-xl border border-border/50 p-5 card-hover block group flex flex-col h-full">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full">{card.category}</span>
                <RatingBadge rating={card.rating} />
              </div>
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{card.desc}</p>
              <span className="inline-flex items-center gap-1 text-sm text-primary font-medium mt-4 group-hover:underline">
                Read Review <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ BELOW-FOLD: lazy-loaded sections ═══ */}
      <Suspense fallback={<LazyFallback />}>
        <PlatformRatingsTable />
      </Suspense>

      <Suspense fallback={<LazyFallback />}>
        <BelowFoldSections />
      </Suspense>

      <Suspense fallback={<LazyFallback />}>
        <EditorsPicks />
      </Suspense>

      <Suspense fallback={<LazyFallback />}>
        <LatestNews />
      </Suspense>
    </Layout>
  );
};

export default Index;
