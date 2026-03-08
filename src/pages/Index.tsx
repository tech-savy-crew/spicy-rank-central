import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { RatingBadge } from "@/components/RatingBadge";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SEO, websiteSchema, organizationSchema, itemListSchema } from "@/components/SEO";
import { useState } from "react";
import { PlatformRatingsTable } from "@/components/PlatformRatingsTable";
import { EditorsPicks } from "@/components/EditorsPicks";
import { LatestNews } from "@/components/LatestNews";
import {
  ArrowRight,
  Flame,
  Search,
  Shield,
  BarChart3,
  Mail,
  Users,
  Camera,
  Heart,
  Play,
  Bot,
  MessageCircle,
  Layers,
  Trophy,
  RefreshCw,
  Ban,
  Star,
  TrendingUp,
  Zap,
  Crown,
} from "lucide-react";

/* ── Static Data ── */

const featuredReviews = [
  { title: "OnlyFans", category: "Creator Platform", rating: 8.5, slug: "onlyfans-review", desc: "Still the biggest name in creator subscriptions — but rising fees and growing competition mean it's no longer the only option. Full breakdown inside." },
  { title: "Fansly", category: "Creator Platform", rating: 8.2, slug: "fansly-review", desc: "Lower creator fees, better content organization, and a rapidly growing user base make Fansly the top OnlyFans alternative for both creators and fans." },
  { title: "Chaturbate", category: "Live Cam Site", rating: 7.8, slug: "chaturbate-review", desc: "The most popular free live cam platform with thousands of broadcasters online 24/7. Great free experience but the token system can get expensive." },
  { title: "Stripchat", category: "Live Cam Site", rating: 7.5, slug: "stripchat-review", desc: "AI-powered cam site with virtual reality support and innovative features. Strong Chaturbate alternative with a modern, clean interface." },
  { title: "Bumble", category: "Dating App", rating: 8.0, slug: "bumble-review", desc: "Women-make-the-first-move dating app with a solid matching algorithm. Premium features are worth it if you're serious about dating in 2026." },
  { title: "FanVue", category: "Creator Platform", rating: 7.6, slug: "fanvue-review", desc: "UK-based OnlyFans competitor with built-in AI tools for creators. Lower fees and better analytics, but still building its audience." },
];

const categoryCards = [
  { label: "Creator Platforms", icon: Users, sub: "OnlyFans, Fansly, Patreon & more", count: "25+ reviewed", slug: "creator-platforms" },
  { label: "Live Cam Sites", icon: Camera, sub: "Chaturbate, Stripchat, Cam4 & more", count: "18+ reviewed", slug: "live-cam-sites" },
  { label: "Dating & Hookup Apps", icon: Heart, sub: "Tinder, Bumble, Hinge & more", count: "20+ reviewed", slug: "dating-apps" },
  { label: "Tube & Streaming", icon: Play, sub: "Free and premium video platforms", count: "15+ reviewed", slug: "streaming-sites" },
  { label: "AI Companions", icon: Bot, sub: "AI girlfriend, chatbots & companions", count: "12+ reviewed", slug: "ai-companions" },
  { label: "Sexting & Chat", icon: MessageCircle, sub: "Anonymous chat and messaging platforms", count: "10+ reviewed", slug: "sexting-apps" },
  { label: "Content Aggregators", icon: Layers, sub: "Multi-platform content access", count: "8+ reviewed", slug: "aggregators" },
];

const comparisons = [
  { title: "OnlyFans vs Fansly — Which Is Better in 2026?", a: { name: "OnlyFans", rating: 8.5 }, b: { name: "Fansly", rating: 8.2 }, winner: "a", teaser: "We compare pricing, features, creator tools, and audience size to find the better platform.", slug: "onlyfans-vs-fansly" },
  { title: "Chaturbate vs Stripchat — Best Free Cam Site?", a: { name: "Chaturbate", rating: 7.8 }, b: { name: "Stripchat", rating: 7.5 }, winner: "a", teaser: "Two biggest free cam sites compared on model selection, video quality, features, and value.", slug: "chaturbate-vs-stripchat" },
  { title: "Tinder vs Bumble — Best Dating App?", a: { name: "Tinder", rating: 7.5 }, b: { name: "Bumble", rating: 8.0 }, winner: "b", teaser: "Matching algorithm, user base, premium features, and success rates compared side by side.", slug: "tinder-vs-bumble" },
  { title: "OnlyFans vs Patreon — Best for Adult Creators?", a: { name: "OnlyFans", rating: 8.5 }, b: { name: "Patreon", rating: 7.0 }, winner: "a", teaser: "Creator earnings, content policies, audience reach, and payout options compared.", slug: "onlyfans-vs-patreon" },
];

const topLists = [
  { title: "10 Best OnlyFans Alternatives (2026)", category: "Creator Platforms", slug: "onlyfans-alternatives" },
  { title: "Best Free Cam Sites — Top 8 Ranked", category: "Live Cam", slug: "free-cam-sites" },
  { title: "Best Hookup Apps That Actually Work (2026)", category: "Dating", slug: "hookup-apps" },
  { title: "Best AI Girlfriend Apps — Top 10 Ranked", category: "AI Companions", slug: "ai-girlfriend-apps" },
  { title: "Best Chaturbate Alternatives — Top 8", category: "Live Cam", slug: "chaturbate-alternatives" },
  { title: "Best Creator Platforms for Beginners", category: "Creator Platforms", slug: "creator-platforms-beginners" },
];

const trending = [
  { emoji: "🔥", text: "Fansly surpasses 5M creators", link: "/review/fansly-review" },
  { emoji: "📊", text: "OnlyFans updates creator payout policy", link: "/review/onlyfans-review" },
  { emoji: "🆕", text: "New AI companion app CrushOn reviewed", link: "/review/crushon-review" },
  { emoji: "⚡", text: "Stripchat launches VR 2.0 features", link: "/review/stripchat-review" },
  { emoji: "📱", text: "Bumble redesigns matching algorithm", link: "/review/bumble-review" },
];

const howWeReview = [
  { icon: Shield, title: "Independent Testing", desc: "Every platform is tested first-hand by our review team. We sign up, explore features, and evaluate the real user experience." },
  { icon: BarChart3, title: "Transparent Ratings", desc: "Our 10-point rating system scores platforms across 5 categories: Content, UI, Value, Privacy, and Features." },
  { icon: RefreshCw, title: "Regular Updates", desc: "Reviews are updated quarterly to reflect platform changes, new features, and pricing updates." },
  { icon: Ban, title: "No Pay-for-Play", desc: "Platforms cannot pay for higher ratings. Sponsored content is always clearly labeled and separated from editorial." },
];

/* ── Component ── */

const Index = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <Layout>
      <SEO
        title="SpicyRanked — Honest Adult Platform Reviews & Rankings"
        description="Independent reviews, comparisons, and rankings of the top adult creator platforms, cam sites, dating apps, and AI companions. Updated weekly."
        canonical="/"
        jsonLd={[
          websiteSchema(),
          organizationSchema(),
          itemListSchema("Featured Platform Reviews", featuredReviews.map((p, i) => ({ name: p.title, url: `/review/${p.slug}`, position: i + 1 }))),
        ]}
      />

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 spicy-gradient opacity-5" />
        <div className="container py-20 md:py-28 relative">
          <AnimatedSection className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-xs font-medium text-primary mb-6">
              <Flame className="h-3.5 w-3.5" />
              Honest reviews, spicy takes
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6 text-balance">
              Honest Reviews of Adult Platforms —{" "}
              <span className="spicy-text-gradient">Ranked & Rated</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              We review, compare, and rank the top creator platforms, live cam sites, adult streaming services, and dating apps so you don't waste your time or money.
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
              <Link to="/category/all" className="inline-flex items-center gap-2 spicy-gradient text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity btn-hover">
                Browse All Reviews <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/rankings" className="inline-flex items-center gap-2 border border-primary text-primary font-semibold px-6 py-3 rounded-lg hover:bg-primary/10 transition-colors btn-hover">
                <Trophy className="h-4 w-4" /> Top 10 Lists
              </Link>
            </div>

            <p className="text-xs text-muted-foreground">
              150+ platforms reviewed · Updated weekly · Independent & unbiased
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ TRENDING ═══ */}
      <AnimatedSection animation="fade-in">
        <section className="border-y border-border/50 bg-card/30 overflow-hidden">
          <div className="container py-3">
            <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
              <span className="text-xs font-bold text-primary uppercase tracking-wider shrink-0 flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5" /> Trending
              </span>
              {trending.map((t, i) => (
                <Link key={i} to={t.link} className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap shrink-0">
                  {t.emoji} {t.text}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ═══ FEATURED REVIEWS ═══ */}
      <section className="container py-16">
        <AnimatedSection>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black flex items-center gap-2">
                <Star className="h-6 w-6 text-primary" />
                Featured Reviews
              </h2>
              <p className="text-sm text-muted-foreground mt-1">Our most popular and recently updated platform reviews</p>
            </div>
            <Link to="/category/all" className="text-sm text-primary font-medium hover:underline hidden md:block">View all →</Link>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredReviews.map((card, i) => (
            <AnimatedSection key={card.slug} delay={i * 100}>
              <Link to={`/review/${card.slug}`} className="bg-card rounded-xl border border-border/50 p-5 card-hover block group flex flex-col h-full">
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
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ═══ PLATFORM RATINGS TABLE ═══ */}
      <PlatformRatingsTable />

      {/* ═══ CATEGORIES ═══ */}
      <section className="container py-16">
        <AnimatedSection>
          <h2 className="text-2xl md:text-3xl font-black mb-2">Browse by Category</h2>
          <p className="text-sm text-muted-foreground mb-8">Find exactly what you are looking for</p>
        </AnimatedSection>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {categoryCards.map((cat, i) => (
            <AnimatedSection key={cat.slug} delay={i * 60} animation="scale-in">
              <Link to={`/category/${cat.slug}`} className="group bg-card rounded-xl border border-border/50 p-5 card-hover flex flex-col min-w-[200px] snap-start">
                <div className="w-12 h-12 rounded-xl spicy-gradient flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <cat.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{cat.label}</h3>
                <p className="text-xs text-muted-foreground mt-1">{cat.sub}</p>
                <span className="text-xs text-primary font-medium mt-2">{cat.count}</span>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ═══ EDITOR'S PICKS ═══ */}
      <EditorsPicks />

      {/* ═══ LATEST COMPARISONS ═══ */}
      <section className="container py-16">
        <AnimatedSection>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black flex items-center gap-2">
                <Zap className="h-6 w-6 text-primary" />
                Latest Comparisons
              </h2>
              <p className="text-sm text-muted-foreground mt-1">Head-to-head platform battles</p>
            </div>
            <Link to="/compare" className="text-sm text-primary font-medium hover:underline hidden md:block">Compare more →</Link>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {comparisons.map((c, i) => (
            <AnimatedSection key={c.slug} delay={i * 100}>
              <Link to={`/compare/${c.slug}`} className="bg-card rounded-xl border border-border/50 p-6 card-hover block group">
                <h3 className="font-bold text-base mb-4 group-hover:text-primary transition-colors">{c.title}</h3>
                <div className="flex items-center justify-center gap-6 mb-4">
                  <div className="text-center flex-1">
                    {c.winner === "a" && <Crown className="h-4 w-4 text-primary mx-auto mb-1" />}
                    <span className="font-bold text-sm block">{c.a.name}</span>
                    <span className="text-xs text-muted-foreground">{c.a.rating}/10</span>
                  </div>
                  <span className="text-muted-foreground font-black text-lg">vs</span>
                  <div className="text-center flex-1">
                    {c.winner === "b" && <Crown className="h-4 w-4 text-primary mx-auto mb-1" />}
                    <span className="font-bold text-sm block">{c.b.name}</span>
                    <span className="text-xs text-muted-foreground">{c.b.rating}/10</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{c.teaser}</p>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ═══ TOP LISTS ═══ */}
      <section className="container py-16">
        <AnimatedSection>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black flex items-center gap-2">
                <Trophy className="h-6 w-6 text-primary" />
                Top Ranked Lists
              </h2>
              <p className="text-sm text-muted-foreground mt-1">Curated rankings updated monthly</p>
            </div>
            <Link to="/rankings" className="text-sm text-primary font-medium hover:underline hidden md:block">View all lists →</Link>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topLists.map((list, i) => (
            <AnimatedSection key={list.slug} delay={i * 80}>
              <Link to={`/best/${list.slug}`} className="bg-card rounded-xl border border-border/50 p-5 card-hover block group">
                <span className="text-xs font-medium bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full">{list.category}</span>
                <h3 className="font-bold text-sm mt-3 group-hover:text-primary transition-colors">{list.title}</h3>
                <span className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-2">
                  View list <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ═══ HOW WE REVIEW ═══ */}
      <section className="container py-16">
        <AnimatedSection>
          <h2 className="text-2xl md:text-3xl font-black text-center mb-10">How SpicyRanked Reviews Work</h2>
        </AnimatedSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {howWeReview.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 80} animation="scale-in">
              <div className="bg-card rounded-xl border border-border/50 p-6 text-center card-hover h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ═══ LATEST NEWS ═══ */}
      <LatestNews />

      {/* ═══ NEWSLETTER ═══ */}
      <section className="container py-16">
        <AnimatedSection animation="scale-in">
          <div className="relative overflow-hidden rounded-2xl border border-border/50">
            <div className="absolute inset-0 spicy-gradient opacity-10" />
            <div className="relative p-8 md:p-12 text-center max-w-2xl mx-auto">
              <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-black mb-3">Get Weekly Platform Updates</h2>
              <p className="text-muted-foreground mb-6">
                New reviews, comparisons, and exclusive deals delivered to your inbox every Friday. No spam, unsubscribe anytime.
              </p>
              {subscribed ? (
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-5">
                  <p className="text-primary font-bold">You're in! 🎉</p>
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
                    placeholder="Enter your email"
                    className="flex-1 bg-card border border-border/50 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button type="submit" className="spicy-gradient text-primary-foreground font-semibold px-6 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity btn-hover whitespace-nowrap">
                    Subscribe
                  </button>
                </form>
              )}
              <p className="text-xs text-muted-foreground mt-4">We respect your privacy. Read our <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.</p>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </Layout>
  );
};

export default Index;
