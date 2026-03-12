import { Layout } from "@/components/Layout";
import { SEO, breadcrumbSchema } from "@/components/SEO";
import { Link } from "react-router-dom";
import { ChevronRight, Clock, Star, CheckCircle, BarChart3, Shield, Users } from "lucide-react";

const ReviewMethodologyPage = () => {
  const scoringCategories = [
    { label: "Content Quality", weight: "25%", description: "Depth, variety, and quality of content or service offered. For cam sites: performer variety and stream quality. For dating apps: user base quality." },
    { label: "User Interface & Experience", weight: "20%", description: "Design quality, navigation ease, mobile responsiveness, loading speed, and overall usability across devices." },
    { label: "Value for Money", weight: "25%", description: "Pricing fairness relative to features provided. Free tier generosity, premium value, and hidden cost transparency." },
    { label: "Privacy & Safety", weight: "15%", description: "Data protection, payment security, identity verification, content moderation, and anti-fraud measures." },
    { label: "Features & Innovation", weight: "15%", description: "Unique capabilities, technological innovation, and feature completeness compared to category competitors." },
  ];

  return (
    <Layout>
      <SEO
        title="Review Methodology — How We Test & Score Every Platform"
        description="Our review methodology explained: 30-60 day testing periods, 5-category scoring system, real accounts, real money. Learn exactly how SpicyRanked reviews and rates adult platforms."
        canonical="/review-methodology"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Review Methodology", url: "/review-methodology" },
        ])}
      />

      <nav className="container pt-4 md:pt-6 pb-0" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <li className="text-foreground font-medium">Review Methodology</li>
        </ol>
      </nav>

      <div className="container py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-black mb-6">Review Methodology</h1>
        <p className="text-base text-muted-foreground leading-relaxed mb-10">
          Every review on SpicyRanked follows a standardized methodology designed for fairness, depth, and reproducibility. Here is exactly how we test, evaluate, and score every platform.
        </p>

        {/* Testing Process */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" /> Testing Process
          </h2>
          <div className="space-y-4 text-[15px] text-muted-foreground leading-7">
            <p>Each platform undergoes a minimum 30-day testing period, with major platforms tested for 60 days or longer. During this period, our editorial team uses the platform as a genuine user would — creating real accounts, spending real money on premium features, and engaging with the platform's full functionality.</p>
            <p>For creator platforms and cam sites, we test from both the viewer/subscriber and creator/performer perspective where applicable. For dating apps, we create genuine profiles and evaluate the matching experience. For AI companions, we conduct extensive conversations across multiple scenarios.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {[
              { icon: Users, label: "Real Accounts", detail: "Genuine sign-ups with real profiles" },
              { icon: Star, label: "Premium Testing", detail: "Real money spent on paid features" },
              { icon: Shield, label: "Both Perspectives", detail: "Tested as user AND creator when applicable" },
            ].map(({ icon: Icon, label, detail }) => (
              <div key={label} className="bg-card rounded-xl border border-border/50 p-4 text-center">
                <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="font-bold text-sm">{label}</p>
                <p className="text-xs text-muted-foreground mt-1">{detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Scoring System */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" /> Scoring System
          </h2>
          <p className="text-[15px] text-muted-foreground leading-7 mb-6">
            Every platform is evaluated across five standardized categories. Each category receives a score from 1 to 10, and the overall score is calculated as a weighted average. The weighting reflects what matters most to users.
          </p>

          <div className="space-y-3">
            {scoringCategories.map((cat) => (
              <div key={cat.label} className="bg-card rounded-xl border border-border/50 p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-sm">{cat.label}</h3>
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{cat.weight}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{cat.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Review Template */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" /> Review Structure
          </h2>
          <p className="text-[15px] text-muted-foreground leading-7 mb-4">
            Every review follows our 14-section template to ensure comprehensive coverage and consistent readability:
          </p>
          <ol className="space-y-2 text-sm text-muted-foreground">
            {[
              "What Is [Platform]?",
              "Key Features",
              "Pricing & Plans",
              "User Experience & Interface",
              "Our Rating Breakdown",
              "Pros & Cons",
              "Privacy, Safety & Trust",
              "Who Should Use [Platform]?",
              "Tips & Best Practices",
              "Alternatives",
              "How [Platform] Compares",
              "Frequently Asked Questions (10 questions)",
              "Final Verdict",
              "Related Reviews",
            ].map((section, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-xs font-bold text-primary">{i + 1}</span>
                <span>{section}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Update Policy */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-5">Content Update Policy</h2>
          <div className="space-y-4 text-[15px] text-muted-foreground leading-7">
            <p>Platform features, pricing, and policies change frequently. We update our reviews on a rolling basis to ensure accuracy. Every review displays a "Last Updated" date indicating the most recent editorial revision.</p>
            <p>We conduct full re-reviews annually for all major platforms, and issue updates within 7 days when platforms announce significant changes to pricing, features, or policies that affect our scoring.</p>
            <p>Score changes of more than 0.5 points are accompanied by an editorial note explaining the reason for the revision. Minor factual corrections (pricing updates, feature additions) are made without score changes unless the update materially affects the user experience.</p>
          </div>
        </section>

        <div className="bg-card rounded-xl border border-border/50 p-6">
          <h3 className="font-bold mb-2">Questions About Our Methodology?</h3>
          <p className="text-sm text-muted-foreground mb-3">
            We welcome questions and feedback about our review process. If you believe a review is inaccurate or have suggestions for improving our methodology, please reach out.
          </p>
          <Link to="/contact" className="text-sm text-primary hover:underline font-medium">Contact Our Editorial Team →</Link>
        </div>
      </div>
    </Layout>
  );
};

export default ReviewMethodologyPage;
