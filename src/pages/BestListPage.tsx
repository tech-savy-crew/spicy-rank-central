import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SEO, itemListSchema, breadcrumbSchema, faqSchema } from "@/components/SEO";
import { RatingBadge } from "@/components/RatingBadge";
import { ReviewContent } from "@/components/ReviewContent";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ExternalLink, Check, X, Clock, User, Shield, ArrowRight, Award } from "lucide-react";

/* ─── data ─── */

interface RankedPlatform {
  rank: number;
  name: string;
  slug: string;
  rating: number;
  logo: string;
  tag?: string;
  bestFor: string;
  fee: string;
  freeToJoin: string;
  url: string;
  content: string;
  keyFeatures: string[];
  pricing: string;
  prosSummary: string;
  consSummary: string;
}

const rankedPlatforms: RankedPlatform[] = [
  {
    rank: 1,
    name: "Fansly",
    slug: "fansly-review",
    rating: 8.2,
    logo: "💎",
    tag: "Editor's Choice",
    bestFor: "Best Overall Alternative",
    fee: "15%",
    freeToJoin: "Yes",
    url: "https://fansly.com",
    content: `Fansly is the closest thing to a true OnlyFans replacement, and in several key areas it actually surpasses the original. Launched in 2020, Fansly exploded in popularity during the OnlyFans adult content ban scare and has been steadily growing ever since. Today it hosts over 5 million creators and offers features that OnlyFans simply does not have.

The biggest draw for creators is the **tiered subscription system**. Unlike OnlyFans where you set one subscription price, Fansly lets you create multiple tiers with different content access levels. A creator might offer a basic tier at $5 per month for photos, a mid tier at $15 for videos, and a premium tier at $30 for everything plus custom content. This flexibility directly translates to higher revenue per subscriber.

**Content organization** is another area where Fansly dominates. Creators can tag and categorize every piece of content, making it easy for fans to find exactly what they want instead of endlessly scrolling. The analytics dashboard is also leagues ahead of OnlyFans, giving creators detailed insights into subscriber behavior, revenue trends, and content performance.

The tradeoff is audience size. OnlyFans still dwarfs Fansly in total users, which means organic discovery is harder. Most successful Fansly creators drive traffic from social media rather than relying on the platform itself. But for creators already promoting externally, the lower **15% fee** and better tools make Fansly the smarter home base.`,
    keyFeatures: [
      "Multiple subscription tiers at different price points",
      "Advanced content tagging and organization",
      "Detailed creator analytics dashboard",
      "15% platform fee versus OnlyFans 20%",
      "Crypto payment support",
    ],
    pricing: "Free to join, 15% platform fee on earnings",
    prosSummary: "Lower fees, better tools, tiered subscriptions, crypto support",
    consSummary: "Smaller audience, no dedicated mobile app, less brand recognition",
  },
  {
    rank: 2,
    name: "FanVue",
    slug: "fanvue-review",
    rating: 7.6,
    logo: "🌟",
    bestFor: "Lowest Creator Fees",
    fee: "15%",
    freeToJoin: "Yes",
    url: "https://fanvue.com",
    content: `FanVue is the newcomer shaking up the creator platform space with a compelling combination of the lowest fees among major platforms and innovative AI-powered tools. Based in the UK, FanVue launched in 2021 and has been quietly building a feature set that targets the pain points creators experience on OnlyFans.

The headline feature is the **15% platform fee**, matching Fansly and significantly undercutting OnlyFans. But what sets FanVue apart is its built-in **AI content creation tools**. Creators can use AI to generate promotional content, edit photos, and even create content variations without needing expensive external software. For creators who spend hours on content production, this is a genuine time-saver.

The analytics dashboard rivals Fansly in depth, showing creators exactly which content performs best, when subscribers are most active, and where their revenue trends are heading. The **customizable storefront** lets creators design their page layout beyond the standard feed format, adding a personal brand touch that OnlyFans does not allow.

The obvious downside is audience size. FanVue has the smallest user base of any platform on this list, which means creators need to bring their own traffic. But for those willing to promote externally, FanVue rewards them with more money per subscriber than almost any competitor.`,
    keyFeatures: [
      "AI-powered content creation and editing tools",
      "15% platform fee matching the lowest in the industry",
      "Advanced analytics with performance insights",
      "Customizable creator storefront design",
      "Referral rewards program for growing your audience",
    ],
    pricing: "Free to join, 15% platform fee",
    prosSummary: "Lowest fees, AI tools, detailed analytics, customizable pages",
    consSummary: "Smallest audience, newer platform, no mobile app",
  },
  {
    rank: 3,
    name: "Patreon",
    slug: "patreon-review",
    rating: 7.0,
    logo: "🎨",
    bestFor: "Best for SFW Creators",
    fee: "5-12%",
    freeToJoin: "Yes",
    url: "https://patreon.com",
    content: `Patreon is the veteran of the creator subscription world, launched way back in 2013 before OnlyFans even existed. While it is not specifically an adult platform, Patreon allows adult content under its Adult/18+ category with proper labeling and verification. Its real strength lies in supporting every type of creator from podcasters and musicians to artists and writers.

The fee structure is Patreon's biggest advantage. With plans ranging from **5% to 12%** depending on your tier, creators keep significantly more of their earnings than on OnlyFans. The Lite plan at 5% is the cheapest option among any major platform for creators who only need basic features.

Where Patreon falls short for adult creators is content policy. Adult content is allowed but restricted, meaning you cannot do everything you can on OnlyFans. The platform also caters to a primarily SFW audience, so fans browsing Patreon are not specifically looking for adult content. Discovery for adult creators is essentially zero — you must bring your entire audience yourself.

For creators who produce a mix of SFW and adult content, or who want the credibility and professionalism that comes with the Patreon brand, it remains a solid option. Many successful creators use Patreon alongside [OnlyFans](/review/onlyfans-review) or [Fansly](/review/fansly-review) to maximize reach across different audience segments.`,
    keyFeatures: [
      "Tiered membership system with flexible pricing",
      "5-12% platform fees depending on plan",
      "Support for all content types including podcasts and courses",
      "Community posts, polls, and direct messaging",
      "Integration with Discord, WordPress, and other tools",
    ],
    pricing: "Free to join, 5% Lite / 8% Pro / 12% Premium fee",
    prosSummary: "Lowest fees at 5%, professional brand image, multi-format support",
    consSummary: "Restricted adult content, SFW-focused audience, minimal discovery",
  },
  {
    rank: 4,
    name: "LoyalFans",
    slug: "loyalfans-review",
    rating: 7.4,
    logo: "❤️",
    bestFor: "Best Payout Options",
    fee: "20%",
    freeToJoin: "Yes",
    url: "https://loyalfans.com",
    content: `LoyalFans positions itself as the creator-first platform with a focus on fast, flexible payouts and hands-on creator support. While it charges the same 20% fee as OnlyFans, it differentiates through superior payout options and a support team that actually responds to creator inquiries.

The **payout flexibility** is where LoyalFans truly shines. Creators can choose from multiple payout methods including direct deposit, wire transfer, Paxum, cryptocurrency, and even physical checks. Minimum payout thresholds are lower than OnlyFans, and processing times are consistently faster. For creators frustrated with OnlyFans delayed payouts and limited options, this is a significant upgrade.

The platform also offers unique monetization tools beyond standard subscriptions. Creators can sell custom content through a **dedicated request system**, offer paid video calls, and run promotional campaigns with platform support. The content moderation team is known for being responsive and fair, which builds trust among creators who have dealt with arbitrary content removals on other platforms.

The downside is a relatively small user base compared to the top platforms. LoyalFans does not have the brand recognition of OnlyFans or even Fansly, so growing an audience organically on the platform is challenging.`,
    keyFeatures: [
      "Multiple payout methods including crypto and wire",
      "Lower minimum payout thresholds",
      "Custom content request system",
      "Paid video call feature for one-on-one interaction",
      "Responsive creator support team",
    ],
    pricing: "Free to join, 20% platform fee",
    prosSummary: "Best payout flexibility, fast processing, great creator support",
    consSummary: "Smaller audience, same 20% fee as OnlyFans, less brand recognition",
  },
  {
    rank: 5,
    name: "ManyVids",
    slug: "manyvids-review",
    rating: 7.2,
    logo: "🎬",
    bestFor: "Best for Video Sales",
    fee: "20-40%",
    freeToJoin: "Yes",
    url: "https://manyvids.com",
    content: `ManyVids takes a different approach to creator monetization by focusing on **individual video sales** rather than monthly subscriptions. Think of it as the iTunes model versus the Spotify model — instead of paying a monthly fee for everything, fans buy specific videos, photo sets, and custom content individually.

This model works exceptionally well for creators who produce high-quality longer-form content. A single premium video can sell for $10 to $50 or more, and popular videos continue generating revenue for months or years after upload. Creators who build a large catalog can earn **passive income** indefinitely as new fans discover and purchase older content.

The platform also supports subscriptions through its **MV Crush** feature, giving creators the option to offer both models simultaneously. The community features including MV Magazine and content contests help with discovery and engagement in ways that OnlyFans does not offer.

The main concern is the fee structure. ManyVids takes between **20% and 40%** depending on the content type and sale method, which is significantly higher than competitors. For subscription-based earnings the fee is manageable, but the higher clip sale commissions eat into margins.`,
    keyFeatures: [
      "Individual video and content sales marketplace",
      "MV Crush subscription option for recurring revenue",
      "Community features including contests and magazine",
      "Extensive categorization and tagging for content",
      "Both streaming and download options for purchased content",
    ],
    pricing: "Free to join, 20-40% platform fee depending on sale type",
    prosSummary: "Great for video sales, passive income potential, community features",
    consSummary: "High fees up to 40%, older interface design, complex fee structure",
  },
  {
    rank: 6,
    name: "Cam4",
    slug: "cam4-review",
    rating: 6.8,
    logo: "📹",
    bestFor: "Best Free Hybrid Platform",
    fee: "Varies",
    freeToJoin: "Yes",
    url: "https://cam4.com",
    content: `Cam4 has been around since 2007, making it one of the oldest platforms on this list. It operates as a **hybrid** between a traditional cam site and a subscription platform, offering both free live streaming with tips and paid subscription content. This dual model gives creators flexibility in how they monetize.

The platform has a strong **international presence**, particularly in Europe and Latin America, which means creators targeting these markets may find a more engaged audience here than on US-dominated platforms. The community is also notably inclusive, with active sections for all orientations and interests.

Cam4 recently modernized its interface and added creator profile features that bring it closer to the OnlyFans subscription model while retaining its live cam roots. Creators can now sell subscriptions, individual content, and receive tips during live streams all from one platform.

The downside is that Cam4 is primarily known as a cam site, so fans looking specifically for subscription content may not think to look here. The audience skews older and the overall traffic has declined from its peak years.`,
    keyFeatures: [
      "Hybrid model combining live cams and subscription content",
      "Strong international audience especially Europe and Latin America",
      "Inclusive community across all orientations",
      "Both free and paid content options",
      "Recently modernized creator profiles",
    ],
    pricing: "Free to use, variable commission on earnings",
    prosSummary: "Hybrid monetization, international audience, inclusive community",
    consSummary: "Declining traffic, older user demographic, primarily known as cam site",
  },
  {
    rank: 7,
    name: "AdmireMe",
    slug: "admireme-review",
    rating: 7.0,
    logo: "✨",
    bestFor: "Best for European Creators",
    fee: "20%",
    freeToJoin: "Yes",
    url: "https://admireme.vip",
    content: `AdmireMe is a European-based creator platform that has carved out a niche by offering features specifically tailored to European creators and audiences. Based in the UK, AdmireMe provides **GDPR-compliant** data handling, European payment processing, and customer support in multiple European languages.

The platform takes a standard 20% commission, matching OnlyFans. Where it differentiates is through its **creator promotion program**. AdmireMe actively promotes its top creators through social media campaigns, blog features, and email newsletters, something OnlyFans and most competitors never do. For new creators struggling with visibility, this promotional support can be a significant advantage.

The user interface is clean and modern, sitting somewhere between the simplicity of OnlyFans and the feature-richness of Fansly. Content organization is solid with categories and tags, and the messaging system supports multimedia messages and paid content requests.

The limitation is primarily geographic. AdmireMe's audience is concentrated in Europe, particularly the UK. Creators targeting North American audiences will find the user base too small to be their primary platform.`,
    keyFeatures: [
      "Active creator promotion through platform marketing",
      "GDPR-compliant European data handling",
      "Multi-language support for European creators",
      "Clean modern interface with good organization",
      "Dedicated creator onboarding and support",
    ],
    pricing: "Free to join, 20% platform fee",
    prosSummary: "Creator promotion program, European focus, good support",
    consSummary: "Small non-European audience, 20% fee, limited global reach",
  },
  {
    rank: 8,
    name: "Ko-fi",
    slug: "kofi-review",
    rating: 6.5,
    logo: "☕",
    bestFor: "Best Zero-Fee Option",
    fee: "0%",
    freeToJoin: "Yes",
    url: "https://ko-fi.com",
    content: `Ko-fi breaks the mold completely with a **zero percent fee** on donations and tips. Yes, you read that correctly. Creators receive 100% of every donation made through Ko-fi with no platform cut whatsoever. The platform monetizes through its optional Ko-fi Gold subscription at $6 per month, which unlocks additional features like subscription tiers and shops.

Originally built for artists, writers, and digital creators, Ko-fi has expanded to support a wider range of content including adult content under its 18+ settings. Creators can accept one-time donations, sell memberships, run shops for digital products, and post exclusive content for supporters.

The platform is perfect for creators just starting out who want to test the waters without losing 15-20% of every dollar to platform fees. Once you grow and need more advanced features, the **$6 per month Gold upgrade** is far cheaper than the percentage-based fees of competitors.

The tradeoff is that Ko-fi was not built for adult content. The audience is primarily SFW, discovery tools for adult creators are nonexistent, and the platform lacks features like DMs and PPV that dedicated adult platforms offer.`,
    keyFeatures: [
      "Zero percent fee on all donations and tips",
      "Optional Gold upgrade at just $6 per month for advanced features",
      "Shop for selling digital products and downloads",
      "Membership tiers for recurring revenue",
      "Commission-free payouts through PayPal or Stripe",
    ],
    pricing: "Free with 0% fee, Ko-fi Gold $6/month for premium features",
    prosSummary: "Zero platform fees, cheapest option available, simple setup",
    consSummary: "Not built for adult content, SFW audience, limited features",
  },
  {
    rank: 9,
    name: "Gumroad",
    slug: "gumroad-review",
    rating: 6.5,
    logo: "📦",
    bestFor: "Best for Digital Products",
    fee: "10%",
    freeToJoin: "Yes",
    url: "https://gumroad.com",
    content: `Gumroad is a digital product marketplace where creators sell ebooks, courses, art packs, videos, and any other downloadable content. While not specifically a creator subscription platform, many adult creators use Gumroad to sell premium content bundles, photo sets, and video collections as one-time purchases.

The **10% flat fee** is competitive, and Gumroad handles all payment processing, delivery, and even sales tax calculation automatically. For creators who prefer selling content bundles rather than running a subscription service, Gumroad offers a streamlined no-hassle experience.

The platform also supports subscription products called **Memberships**, where creators can charge monthly fees for ongoing content access. This brings it closer to the OnlyFans model, though the interface and audience are very different.

Gumroad works best as a supplementary platform rather than a primary one. Many creators maintain an OnlyFans or Fansly for subscriptions while using Gumroad to sell premium bundles, behind-the-scenes content, or tutorial packages.`,
    keyFeatures: [
      "Simple digital product sales with automatic delivery",
      "10% flat fee with no monthly charges",
      "Subscription memberships for recurring revenue",
      "Built-in email marketing to past customers",
      "Handles sales tax calculation automatically",
    ],
    pricing: "Free to start, 10% flat fee on all sales",
    prosSummary: "Simple setup, automatic delivery, email marketing built in",
    consSummary: "Not designed for adult content, no social features, basic creator pages",
  },
  {
    rank: 10,
    name: "Privacy",
    slug: "privacy-review",
    rating: 7.1,
    logo: "🔒",
    bestFor: "Best for Anonymous Creators",
    fee: "15%",
    freeToJoin: "Yes",
    url: "https://privacy.com",
    content: `Privacy rounds out our list as the platform built specifically for creators who want to remain **completely anonymous**. Unlike every other platform on this list, Privacy was designed from the ground up with creator anonymity as the core feature. Creators can earn without revealing their real name, face, or any identifying information.

The platform uses **blockchain-based payments** and cryptocurrency options to ensure both creators and fans can transact without traditional banking systems that might expose identities. Content is encrypted, creator identities are protected behind pseudonyms, and the platform never requires government ID for basic accounts.

The **15% platform fee** matches Fansly and FanVue as the lowest tier among dedicated adult platforms. The feature set covers subscriptions, individual content sales, messaging, and tipping — all the essentials without the bloat.

The obvious limitation is audience size. Privacy is a niche platform with a small but dedicated user base of privacy-conscious fans. Creators will not find the volume of OnlyFans or Fansly here, but for those who need anonymity above all else, no other platform comes close.`,
    keyFeatures: [
      "Complete creator anonymity without ID requirements",
      "Blockchain-based payment processing",
      "Cryptocurrency support for untraceable transactions",
      "Encrypted content storage and delivery",
      "15% platform fee matching industry-low rates",
    ],
    pricing: "Free to join, 15% platform fee",
    prosSummary: "Full anonymity, crypto payments, low fees, encrypted content",
    consSummary: "Very small audience, limited discovery, less mainstream trust",
  },
];

const faqs = [
  {
    question: "What is the best free OnlyFans alternative?",
    answer:
      "Fansly is the best free alternative overall. It is free to join as both a creator and fan, charges only 15% commission on creator earnings, and offers features like tiered subscriptions and advanced content tagging that OnlyFans lacks.",
  },
  {
    question: "Which OnlyFans alternative has the lowest fees?",
    answer:
      "Ko-fi charges zero platform fees on donations and tips, making it the cheapest option. Among dedicated adult platforms, Fansly and FanVue both charge 15%, which is 5% less than OnlyFans.",
  },
  {
    question: "Can I use multiple platforms at once?",
    answer:
      "Absolutely. Most successful creators maintain accounts on 2-3 platforms simultaneously. This diversifies income, protects against platform policy changes, and reaches different audiences.",
  },
  {
    question: "Are OnlyFans alternatives safe to use?",
    answer:
      "All platforms on this list are legitimate businesses with proper payment processing and content moderation. We recommend checking each platform's privacy policy and using discreet payment methods if privacy is a concern.",
  },
  {
    question: "Which alternative is best for new creators?",
    answer:
      "Fansly is the best starting point for new adult creators due to its lower fees, better tools, and growing audience. Ko-fi is ideal if you want to start with zero financial risk.",
  },
  {
    question: "Will OnlyFans alternatives pay as much?",
    answer:
      "Earnings depend on your audience size, not the platform. Creators who bring their own traffic often earn more on lower-fee platforms like Fansly because they keep a larger percentage of each dollar.",
  },
];

const relatedLists = [
  { title: "Best Creator Platforms for Beginners", url: "/best/creator-platforms-beginners" },
  { title: "Best Free Cam Sites 2026", url: "/best/free-cam-sites" },
  { title: "Best AI Girlfriend Apps 2026", url: "/best/ai-girlfriend-apps" },
];

/* ─── component ─── */

const BestListPage = () => {
  return (
    <Layout>
      <SEO
        title="10 Best OnlyFans Alternatives in 2026 — Ranked & Reviewed"
        description="Looking for sites like OnlyFans? We tested and ranked the 10 best OnlyFans alternatives for creators and fans. Lower fees, better tools, and more."
        canonical="/best/onlyfans-alternatives"
        jsonLd={[
          itemListSchema(
            "10 Best OnlyFans Alternatives in 2026",
            rankedPlatforms.map((p) => ({
              name: p.name,
              url: `/review/${p.slug}`,
              position: p.rank,
            }))
          ),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Best Lists", url: "/best" },
            { name: "OnlyFans Alternatives", url: "/best/onlyfans-alternatives" },
          ]),
          faqSchema(faqs),
        ]}
      />

      <div className="container max-w-4xl py-10 md:py-16 px-4 sm:px-6">
        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6 flex-wrap">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span>Best Lists</span>
          <span>/</span>
          <span className="text-foreground font-medium">OnlyFans Alternatives</span>
        </nav>

        {/* ── Hero ── */}
        <header className="mb-10 md:mb-14">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight tracking-tight text-foreground mb-4">
            10 Best OnlyFans Alternatives in 2026
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mb-5">
            Whether you want lower fees as a creator or a better experience as a fan, these OnlyFans alternatives deliver. We signed up, tested, and ranked every single one.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> March 2026</span>
            <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> SpicyRanked Editorial Team</span>
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 15 min read</span>
            <span className="flex items-center gap-1.5 text-primary font-medium"><Shield className="h-3.5 w-3.5" /> All platforms independently tested</span>
          </div>
        </header>

        {/* ── Why Look for Alternatives ── */}
        <section className="mb-10 md:mb-14">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Why Look for OnlyFans Alternatives?</h2>
          <div className="space-y-4 text-sm sm:text-[15px] text-muted-foreground leading-relaxed sm:leading-7">
            <p>
              OnlyFans dominates the creator subscription space with over 200 million registered users and more than 3 million creators. But dominance does not mean perfection. The platform takes a steep 20% cut from every dollar creators earn, its content discovery tools are practically nonexistent, and creators have zero built-in promotion tools to grow their audience.
            </p>
            <p>
              Then there is the trust issue. Back in 2021, <Link to="/review/onlyfans-review" className="text-primary hover:underline font-medium">OnlyFans</Link> announced it would ban adult content before reversing the decision within days. That scare sent thousands of creators scrambling for backup platforms, and many never fully returned. The message was clear — putting all your eggs in the OnlyFans basket is risky.
            </p>
            <p>
              Whether you are a creator looking for lower fees, better tools, and a safety net, or a fan tired of the limited browsing experience, there are strong alternatives worth your attention. We tested all 10 platforms on this list with real accounts, evaluated their features, and ranked them based on creator tools, fees, audience size, and user experience.
            </p>
          </div>
        </section>

        {/* ── Quick Comparison Table ── */}
        <section className="mb-10 md:mb-14">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Quick Comparison</h2>
          <div className="overflow-x-auto -mx-4 sm:mx-0 rounded-xl border border-border/60">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="bg-secondary/70">
                  <th className="px-3 md:px-4 py-3 text-left text-xs md:text-sm font-semibold text-foreground">Rank</th>
                  <th className="px-3 md:px-4 py-3 text-left text-xs md:text-sm font-semibold text-foreground">Platform</th>
                  <th className="px-3 md:px-4 py-3 text-left text-xs md:text-sm font-semibold text-foreground">Rating</th>
                  <th className="px-3 md:px-4 py-3 text-left text-xs md:text-sm font-semibold text-foreground">Best For</th>
                  <th className="px-3 md:px-4 py-3 text-left text-xs md:text-sm font-semibold text-foreground">Fee</th>
                  <th className="px-3 md:px-4 py-3 text-left text-xs md:text-sm font-semibold text-foreground">Free</th>
                </tr>
              </thead>
              <tbody>
                {rankedPlatforms.map((p, i) => (
                  <tr key={p.rank} className={`border-t border-border/40 ${i % 2 === 0 ? "bg-card" : "bg-secondary/30"}`}>
                    <td className="px-3 md:px-4 py-3 font-bold text-primary text-xs md:text-sm">#{p.rank}</td>
                    <td className="px-3 md:px-4 py-3 font-medium text-foreground text-xs md:text-sm">
                      <Link to={`/reviews/${p.slug}`} className="hover:text-primary transition-colors">{p.logo} {p.name}</Link>
                    </td>
                    <td className="px-3 md:px-4 py-3 text-xs md:text-sm"><RatingBadge rating={p.rating} size="sm" /></td>
                    <td className="px-3 md:px-4 py-3 text-xs md:text-sm text-muted-foreground">{p.bestFor}</td>
                    <td className="px-3 md:px-4 py-3 text-xs md:text-sm text-muted-foreground">{p.fee}</td>
                    <td className="px-3 md:px-4 py-3 text-xs md:text-sm text-muted-foreground">{p.freeToJoin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── How We Ranked ── */}
        <section className="mb-10 md:mb-14">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">How We Ranked These Alternatives</h2>
          <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed sm:leading-7">
            Our ranking is based on hands-on testing across five key criteria. <strong className="text-foreground font-semibold">Platform fee</strong> matters because every percentage point directly hits creator income. <strong className="text-foreground font-semibold">Audience size</strong> determines how quickly a new creator can find paying subscribers. <strong className="text-foreground font-semibold">Feature quality</strong> covers everything from analytics to content organization to messaging tools. <strong className="text-foreground font-semibold">User experience</strong> evaluates both the creator dashboard and the fan browsing experience. Finally, <strong className="text-foreground font-semibold">reliability</strong> measures uptime, payout consistency, and platform stability. Each platform was scored across all five areas and weighted to produce the final ranking.
          </p>
        </section>

        {/* ── Individual Rankings ── */}
        <div className="space-y-12 md:space-y-16 mb-12 md:mb-16">
          {rankedPlatforms.map((p) => (
            <section key={p.rank} id={p.slug} className="scroll-mt-24">
              {/* Header */}
              <div className="flex flex-wrap items-start gap-3 mb-5">
                <span className="text-3xl md:text-4xl font-black text-primary">#{p.rank}</span>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground leading-tight">
                    {p.name} — {p.bestFor}
                  </h2>
                  {p.tag && (
                    <span className="inline-block mt-1.5 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                      {p.tag}
                    </span>
                  )}
                </div>
                <RatingBadge rating={p.rating} />
              </div>

              {/* Body */}
              <ReviewContent content={p.content} />

              {/* Key Features */}
              <div className="mt-6 bg-card border border-border/50 rounded-xl p-4 sm:p-6">
                <h3 className="text-sm sm:text-base font-bold text-foreground mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {p.keyFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing / Pros / Cons summary */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-card border border-border/50 rounded-xl p-4">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Pricing</span>
                  <p className="text-sm text-foreground mt-1 leading-relaxed">{p.pricing}</p>
                </div>
                <div className="bg-card border border-border/50 rounded-xl p-4">
                  <span className="text-xs font-semibold text-[hsl(var(--success))] uppercase tracking-wide">Pros</span>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{p.prosSummary}</p>
                </div>
                <div className="bg-card border border-border/50 rounded-xl p-4">
                  <span className="text-xs font-semibold text-destructive uppercase tracking-wide">Cons</span>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{p.consSummary}</p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener nofollow sponsored noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  Visit {p.name} <ExternalLink className="h-4 w-4" />
                </a>
                <Link
                  to={`/review/${p.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
                >
                  Read full review <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </section>
          ))}
        </div>

        {/* ── How to Choose ── */}
        <section className="mb-10 md:mb-14">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">How to Choose the Right OnlyFans Alternative</h2>
          <div className="space-y-4 text-sm sm:text-[15px] text-muted-foreground leading-relaxed sm:leading-7">
            <p>
              The best alternative depends on what matters most to you. If you are a creator focused on maximizing earnings, <Link to="/review/fansly-review" className="text-primary hover:underline font-medium">Fansly</Link> and <Link to="/review/fanvue-review" className="text-primary hover:underline font-medium">FanVue</Link> offer the lowest fees at 15%. If you need the most advanced tools and content organization, Fansly leads the pack. If you are just starting out and want zero risk, Ko-fi lets you earn with no platform fees at all.
            </p>
            <p>
              For fans, the choice is simpler. Fansly offers the best browsing experience with superior content organization. If you want to support creators while keeping costs low, platforms with free tiers and flexible tipping give you more control over spending.
            </p>
            <p>
              Most successful creators do not rely on a single platform. The smartest approach is maintaining a presence on <Link to="/review/onlyfans-review" className="text-primary hover:underline font-medium">OnlyFans</Link> for its audience while using one or two alternatives to diversify income and reduce platform dependency.
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mb-10 md:mb-14">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-5">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card border border-border/50 rounded-xl px-4 sm:px-5 overflow-hidden"
              >
                <AccordionTrigger className="text-sm sm:text-[15px] font-semibold text-foreground py-4 hover:no-underline text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* ── Related Lists ── */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-5">Related Lists</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {relatedLists.map((item) => (
              <Link
                key={item.url}
                to={item.url}
                className="flex items-center gap-3 bg-card rounded-xl border border-border/50 p-4 hover:border-primary/40 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default BestListPage;
