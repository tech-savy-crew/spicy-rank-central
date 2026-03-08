import { Layout } from "@/components/Layout";
import { SEO, breadcrumbSchema } from "@/components/SEO";
import { Shield, Eye, Heart } from "lucide-react";

const AboutPage = () => {
  return (
    <Layout>
      <SEO
        title="About Us — Editorial Policy"
        description="SpicyRanked is an independent editorial platform providing honest, in-depth reviews and rankings of digital entertainment and social platforms."
        canonical="/about"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ])}
      />

      <div className="container py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-black mb-6">About SpicyRanked</h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10">
          SpicyRanked is an independent editorial platform dedicated to providing honest, in-depth reviews and rankings of digital entertainment and social platforms.
        </p>

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

        <h2 className="text-2xl font-black mb-4">Editorial Policy</h2>
        <div className="prose prose-invert max-w-none text-muted-foreground space-y-4 text-sm leading-relaxed">
          <p>Our editorial team independently researches, tests, and rates every platform featured on SpicyRanked. We maintain strict editorial independence and never allow advertising relationships to influence our reviews or rankings.</p>
          <p>Some links on our site may be affiliate links, meaning we earn a small commission if you make a purchase. This never affects our editorial judgment or the ratings we assign. We clearly disclose affiliate relationships where they exist.</p>
          <p>Reviews are updated periodically to reflect significant platform changes, new feature releases, or shifts in competitive landscape. The date of the last update is noted on each review.</p>
          <p>We welcome corrections and feedback from platforms and readers alike. If you believe any information in our reviews is inaccurate, please contact us and we'll investigate promptly.</p>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
