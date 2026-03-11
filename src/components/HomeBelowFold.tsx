import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Shield,
  BarChart3,
  Users,
  Camera,
  Heart,
  Bot,
  MessageCircle,
  Mail,
  Trophy,
  RefreshCw,
  Ban,
  Zap,
  Crown,
  TrendingUp,
} from "lucide-react";

/* ── Static data for below-fold homepage sections ── */

const categoryCards = [
  { label: "Creator Platforms", icon: Users, sub: "OnlyFans, Fansly, FanVue, Patreon", count: "4 reviewed", slug: "creator-platforms" },
  { label: "Live Cam Sites", icon: Camera, sub: "Chaturbate, Stripchat, Jerkmate & more", count: "7 reviewed", slug: "live-cam-sites" },
  { label: "Dating & Hookup Apps", icon: Heart, sub: "Tinder, Bumble, Seeking & more", count: "5 reviewed", slug: "dating-hookup-apps" },
  { label: "AI Companions", icon: Bot, sub: "Candy.ai, DreamGF, CrushOn & more", count: "5 reviewed", slug: "ai-companions" },
  { label: "Fetish & Niche", icon: MessageCircle, sub: "FeetFinder, FetishFinder, Snifffr", count: "3 reviewed", slug: "fetish-niche-marketplaces" },
];

const comparisons = [
  { title: "OnlyFans vs Fansly — Which Is Better in 2026?", a: { name: "OnlyFans", rating: 8.5 }, b: { name: "Fansly", rating: 8.2 }, winner: "a", teaser: "We compare pricing, features, creator tools, and audience size to find the better creator platform for fans and creators alike.", slug: "onlyfans-vs-fansly" },
  { title: "Chaturbate vs Stripchat — Best Free Cam Site?", a: { name: "Chaturbate", rating: 7.8 }, b: { name: "Stripchat", rating: 7.5 }, winner: "a", teaser: "Two biggest free cam sites compared on model selection, video quality, features, and value for viewers and performers.", slug: "chaturbate-vs-stripchat" },
  { title: "Tinder vs Bumble — Best Dating App?", a: { name: "Tinder", rating: 7.5 }, b: { name: "Bumble", rating: 8.0 }, winner: "b", teaser: "Matching algorithm, user base, premium features, and success rates compared side by side for serious and casual daters.", slug: "tinder-vs-bumble" },
  { title: "OnlyFans vs Patreon — Best for Adult Creators?", a: { name: "OnlyFans", rating: 8.5 }, b: { name: "Patreon", rating: 7.0 }, winner: "a", teaser: "Creator earnings, content policies, audience reach, and payout options compared for adult and non-adult creators.", slug: "onlyfans-vs-patreon" },
];

const topLists = [
  { title: "10 Best OnlyFans Alternatives (2026)", category: "Creator Platforms", slug: "best-onlyfans-alternatives" },
  { title: "Best Free Cam Sites — Top 8 Ranked", category: "Live Cam", slug: "best-free-cam-sites" },
  { title: "Best AI Girlfriend Apps — Top 12 Ranked", category: "AI Companions", slug: "best-ai-girlfriend-apps" },
  { title: "Best Chaturbate Alternatives — Top 8", category: "Live Cam", slug: "best-chaturbate-alternatives" },
  { title: "Best Creator Platforms for Beginners", category: "Creator Platforms", slug: "best-creator-platforms-beginners" },
];

const trending = [
  { emoji: "🔥", text: "Fansly surpasses 5M creators", link: "/reviews/fansly" },
  { emoji: "📈", text: "OnlyFans updates creator payout policy", link: "/reviews/onlyfans" },
  { emoji: "💻", text: "New AI companion app CrushOn reviewed", link: "/reviews/crushon-ai" },
  { emoji: "✨", text: "Stripchat launches VR 2.0 features", link: "/reviews/stripchat" },
  { emoji: "💡", text: "Best cam sites list updated for March 2026", link: "/best-lists/best-free-cam-sites" },
  { emoji: "⚡", text: "Tinder vs Bumble: latest comparison published", link: "/compare/tinder-vs-bumble" },
];

const howWeReview = [
  { icon: Shield, title: "Independent Testing", desc: "Every platform is tested first-hand by our review team. We sign up, explore features, and evaluate the real user experience — no shortcuts." },
  { icon: BarChart3, title: "Transparent Ratings", desc: "Our 10-point rating system scores platforms across 5 categories: Content, UI, Value, Privacy, and Features. Every score is fully explained." },
  { icon: RefreshCw, title: "Regular Updates", desc: "Reviews are updated quarterly to reflect platform changes, new features, and pricing updates. You always get the latest information." },
  { icon: Ban, title: "No Pay-for-Play", desc: "Platforms cannot pay for higher ratings. Sponsored content is always clearly labeled and separated from editorial reviews." },
];

export default function HomeBelowFold() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <>
      {/* ═══ TRENDING ═══ */}
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

      {/* ═══ CATEGORIES ═══ */}
      <section className="container py-16">
        <h2 className="text-2xl md:text-3xl font-black mb-2">Browse by Category</h2>
        <p className="text-sm text-muted-foreground mb-8">Find exactly what you are looking for</p>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {categoryCards.map((cat) => (
            <Link key={cat.slug} to={`/category/${cat.slug}`} className="group bg-card rounded-xl border border-border/50 p-5 card-hover flex flex-col min-w-[200px] snap-start">
              <div className="w-12 h-12 rounded-xl spicy-gradient flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <cat.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{cat.label}</h3>
              <p className="text-xs text-muted-foreground mt-1">{cat.sub}</p>
              <span className="text-xs text-primary font-medium mt-2">{cat.count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ LATEST COMPARISONS ═══ */}
      <section className="container py-16">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {comparisons.map((c) => (
            <Link key={c.slug} to={`/compare/${c.slug}`} className="bg-card rounded-xl border border-border/50 p-6 card-hover block group">
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
          ))}
        </div>
      </section>

      {/* ═══ TOP LISTS ═══ */}
      <section className="container py-16">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topLists.map((list) => (
            <Link key={list.slug} to={`/best-lists/${list.slug}`} className="bg-card rounded-xl border border-border/50 p-5 card-hover block group">
              <span className="text-xs font-medium bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full">{list.category}</span>
              <h3 className="font-bold text-sm mt-3 group-hover:text-primary transition-colors">{list.title}</h3>
              <span className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-2">
                View list <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ HOW WE REVIEW ═══ */}
      <section className="container py-16">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-10">How SpicyRanked Reviews Work</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {howWeReview.map((item) => (
            <div key={item.title} className="bg-card rounded-xl border border-border/50 p-6 text-center card-hover h-full">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-sm mb-2">{item.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <section className="container py-16">
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
      </section>
    </>
  );
}
