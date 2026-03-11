import { Layout } from "@/components/Layout";
import { SEO, breadcrumbSchema } from "@/components/SEO";
import { Shield, Eye, Heart, BookOpen, CheckCircle, Users } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SpicyRanked",
    url: "https://spicyranked.com",
    description: "Independent adult platform review site providing honest, in-depth reviews and rankings.",
    foundingDate: "2026",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "hello@spicyranked.com",
    },
    sameAs: [],
  };

  return (
    <Layout>
      <SEO
        title="About Us — Editorial Policy & Review Methodology"
        description="SpicyRanked is an independent editorial team that tests and reviews adult platforms for 30-60 days each. Learn about our methodology, scoring system, and editorial standards."
        canonical="/about"
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "About", url: "/about" },
          ]),
          orgSchema,
        ]}
      />

      <nav className="container pt-4 md:pt-6 pb-0" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
          <span className="text-muted-foreground/50">›</span>
          <li className="text-foreground font-medium">About</li>
        </ol>
      </nav>

      <div className="container py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-black mb-6">About SpicyRanked</h1>

        <div className="space-y-6 text-[15px] text-muted-foreground leading-7 mb-12">
          <p>
            SpicyRanked is an independent editorial team that reviews and ranks adult platforms, cam sites, dating apps, and AI companion apps. We test every platform we review for 30 to 60 days using real accounts, real money, and real interactions before publishing our assessments.
          </p>
          <p>
            Our editorial methodology is simple: we sign up, we use the platform as a real user would, we evaluate it across five standardized categories (Content Quality, User Interface, Value for Money, Privacy & Safety, and Features), and we publish an honest review with a score out of 10. We do not accept payment from platforms for positive reviews. Our revenue comes from affiliate partnerships, but our scores and recommendations are independent of those partnerships.
          </p>
          <p>
            SpicyRanked was launched in 2026 to provide the kind of honest, detailed reviews that mainstream tech publications are unwilling to write about adult platforms. We believe that the millions of people who use these platforms deserve the same quality of consumer guidance that exists for mainstream software and services.
          </p>
        </div>

        <div className="grid gap-6 mb-12">
          {[
            { icon: Shield, title: "Independent & Unbiased", desc: "We don't accept payment for reviews. Our ratings reflect genuine editorial opinion based on extensive testing and research." },
            { icon: Eye, title: "Transparent Methodology", desc: "Every platform is scored across 5 categories: Content Quality, User Experience, Value, Privacy, and Innovation. Each score is out of 10." },
            { icon: Heart, title: "User-First Approach", desc: "We evaluate platforms from the perspective of real users, not investors or advertisers. What matters to you matters to us." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-card rounded-xl border border-border/50 p-6 flex gap-4">
              <Icon className="h-6 w-6 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-black mb-4 flex items-center gap-2"><BookOpen className="h-5 w-5 text-primary" /> What We Review</h2>
        <div className="space-y-4 text-[15px] text-muted-foreground leading-7 mb-12">
          <p>We currently cover <strong className="text-foreground">24 platforms</strong> across 5 categories:</p>
          <ul className="space-y-2 pl-1">
            {[
              { cat: "Creator Platforms", platforms: "OnlyFans, Fansly, FanVue, Patreon", link: "/category/creator-platforms" },
              { cat: "Live Cam Sites", platforms: "Chaturbate, Stripchat, BongaCams, CamSoda, LiveJasmin, Flirt4Free, Jerkmate", link: "/category/live-cam-sites" },
              { cat: "AI Companions", platforms: "Candy.ai, DreamGF.ai, CrushOn.ai, GirlfriendGPT, Replika", link: "/category/ai-companions" },
              { cat: "Dating & Hookup Apps", platforms: "Bumble, Tinder, Seeking, Ashley Madison, Adult Friend Finder", link: "/category/dating-hookup-apps" },
              { cat: "Fetish & Niche", platforms: "FeetFinder, FetishFinder, Snifffr", link: "/category/fetish-niche-marketplaces" },
            ].map((c) => (
              <li key={c.cat} className="flex items-start gap-3">
                <span className="mt-[9px] shrink-0 h-[6px] w-[6px] rounded-full bg-primary" />
                <span><Link to={c.link} className="font-semibold text-foreground hover:text-primary transition-colors">{c.cat}</Link>: {c.platforms}</span>
              </li>
            ))}
          </ul>
          <p>Every review follows our 15-section template covering What Is, Features, Pricing, User Experience, Rating Breakdown, Pros & Cons, Privacy & Safety, Who Should Use, Tips, Alternatives, Comparisons, FAQ, and Final Verdict.</p>
        </div>

        <h2 className="text-2xl font-black mb-4 flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Our Editorial Standards</h2>
        <div className="space-y-4 text-[15px] text-muted-foreground leading-7 mb-12">
          <ul className="space-y-3 pl-1">
            {[
              "Every platform tested 30–60 days minimum with real accounts",
              "Real money spent on premium features to evaluate value",
              "Both viewer/subscriber AND creator/performer perspectives tested where applicable",
              "Independent scoring not influenced by affiliate partnerships",
              "Regular content updates to reflect platform changes",
              "Reviews updated periodically with the last update date noted on each review",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <h2 className="text-2xl font-black mb-4 flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Editorial Policy</h2>
        <div className="space-y-4 text-[15px] text-muted-foreground leading-7">
          <p>Our editorial team independently researches, tests, and rates every platform featured on SpicyRanked. We maintain strict editorial independence and never allow advertising relationships to influence our reviews or rankings.</p>
          <p>Some links on our site may be affiliate links, meaning we earn a small commission if you make a purchase. This never affects our editorial judgment or the ratings we assign. We clearly disclose affiliate relationships where they exist.</p>
          <p>We welcome corrections and feedback from platforms and readers alike. If you believe any information in our reviews is inaccurate, please <Link to="/contact" className="text-primary hover:underline">contact us</Link> and we'll investigate promptly.</p>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
