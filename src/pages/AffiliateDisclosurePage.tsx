import { Layout } from "@/components/Layout";
import { SEO, breadcrumbSchema } from "@/components/SEO";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const AffiliateDisclosurePage = () => {
  return (
    <Layout>
      <SEO
        title="Affiliate Disclosure — How We Make Money"
        description="Full transparency on how SpicyRanked earns revenue through affiliate partnerships, and why it never affects our editorial independence or review scores."
        canonical="/affiliate-disclosure"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Affiliate Disclosure", url: "/affiliate-disclosure" },
        ])}
      />

      <nav className="container pt-4 md:pt-6 pb-0" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <li className="text-foreground font-medium">Affiliate Disclosure</li>
        </ol>
      </nav>

      <div className="container py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-black mb-6">Affiliate Disclosure</h1>
        <p className="text-xs text-muted-foreground mb-8">Last updated: March 2026</p>

        <div className="space-y-6 text-[15px] text-muted-foreground leading-7">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">How SpicyRanked Earns Revenue</h2>
            <p>SpicyRanked is a free publication supported primarily by affiliate partnerships. When you click on certain links on our website and subsequently sign up for or purchase a service, we may receive a commission from the platform at no additional cost to you.</p>
            <p className="mt-3">This affiliate revenue funds our editorial operations, including the significant time and cost required to test platforms for 30-60 days with real accounts and real money.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">What This Means for You</h2>
            <ul className="space-y-3 pl-1">
              {[
                "You never pay more by clicking our links — affiliate commissions come from the platform, not from you.",
                "Our review scores and editorial opinions are never influenced by affiliate relationships.",
                "We publish honest reviews including negative assessments of platforms with which we have affiliate partnerships.",
                "Platforms cannot pay for higher scores, favorable language, or preferential ranking positions.",
                "Affiliate links are clearly marked with external link icons and rel=\"nofollow sponsored\" attributes.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-[9px] shrink-0 h-[6px] w-[6px] rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Which Platforms Have Affiliate Relationships?</h2>
            <p>We maintain affiliate relationships with some — but not all — of the platforms we review. The presence or absence of an affiliate relationship has no bearing on whether we review a platform, how we score it, or how we rank it relative to competitors.</p>
            <p className="mt-3">Some of our highest-rated platforms have no affiliate program, and some of our lowest-rated platforms are affiliate partners. Our editorial judgment is completely independent of revenue considerations.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">FTC Compliance</h2>
            <p>This disclosure is provided in accordance with the Federal Trade Commission's guidelines on endorsements and testimonials. We are committed to full transparency about our business relationships and revenue sources.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Questions?</h2>
            <p>If you have questions about our affiliate relationships or how we earn revenue, please <Link to="/contact" className="text-primary hover:underline">contact us</Link>. We're committed to transparency.</p>
          </section>
        </div>

        <div className="mt-12 bg-card rounded-xl border border-border/50 p-6">
          <h3 className="font-bold mb-2">Related</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/editorial-policy" className="text-primary hover:underline">Editorial Policy</Link> — Our independence standards</li>
            <li><Link to="/review-methodology" className="text-primary hover:underline">Review Methodology</Link> — How we test platforms</li>
            <li><Link to="/about" className="text-primary hover:underline">About SpicyRanked</Link> — Who we are</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default AffiliateDisclosurePage;
