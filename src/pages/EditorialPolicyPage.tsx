import { Layout } from "@/components/Layout";
import { SEO, breadcrumbSchema } from "@/components/SEO";
import { Link } from "react-router-dom";
import { ChevronRight, Shield, BookOpen, Scale, AlertCircle } from "lucide-react";

const EditorialPolicyPage = () => {
  return (
    <Layout>
      <SEO
        title="Editorial Policy — How We Maintain Independence"
        description="SpicyRanked's editorial policy explains how we maintain independence, handle affiliate relationships, and ensure every review reflects genuine editorial judgment."
        canonical="/editorial-policy"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Editorial Policy", url: "/editorial-policy" },
        ])}
      />

      <nav className="container pt-4 md:pt-6 pb-0" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <li className="text-foreground font-medium">Editorial Policy</li>
        </ol>
      </nav>

      <div className="container py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-black mb-6">Editorial Policy</h1>
        <p className="text-xs text-muted-foreground mb-8">Last updated: March 2026</p>

        <div className="space-y-8 text-[15px] text-muted-foreground leading-7">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" /> Editorial Independence
            </h2>
            <p>SpicyRanked is an independently operated editorial publication. Our reviews, ratings, and rankings reflect the genuine opinions of our editorial team based on extensive hands-on testing. No platform, advertiser, or affiliate partner has any influence over our editorial content, review scores, or ranking positions.</p>
            <p className="mt-3">We do not accept payment from platforms in exchange for favorable reviews. We do not offer platforms the ability to preview, edit, or approve reviews before publication. Every review published on SpicyRanked represents the unfiltered assessment of our editorial team.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" /> How We Select Platforms
            </h2>
            <p>We select platforms for review based on user demand, market relevance, and category coverage. We prioritize platforms that have significant user bases, offer unique features, or represent important alternatives in their category. We do not accept requests from platforms to be reviewed in exchange for compensation.</p>
            <p className="mt-3">Our current coverage spans 24 platforms across 5 categories: <Link to="/category/creator-platforms" className="text-primary hover:underline">Creator Platforms</Link>, <Link to="/category/live-cam-sites" className="text-primary hover:underline">Live Cam Sites</Link>, <Link to="/category/ai-companions" className="text-primary hover:underline">AI Companions</Link>, <Link to="/category/dating-hookup-apps" className="text-primary hover:underline">Dating & Hookup Apps</Link>, and <Link to="/category/fetish-niche-marketplaces" className="text-primary hover:underline">Fetish & Niche Marketplaces</Link>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" /> Affiliate Relationships
            </h2>
            <p>SpicyRanked participates in affiliate programs with some of the platforms we review. When you click certain links on our site and sign up for a platform, we may earn a commission at no additional cost to you. These affiliate relationships are our primary revenue source and allow us to fund our testing and editorial operations.</p>
            <p className="mt-3">Critically, affiliate relationships never influence our editorial content. Platforms with affiliate partnerships do not receive higher scores, more favorable language, or preferential ranking positions. We have published negative reviews and low ratings for platforms with which we have affiliate relationships, and we have published positive reviews for platforms with which we have no financial relationship.</p>
            <p className="mt-3">Affiliate links are identified with external link icons and use appropriate link attributes (rel="nofollow sponsored") to maintain search engine transparency.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" /> Corrections & Updates
            </h2>
            <p>We take accuracy seriously. If a platform updates its features, pricing, or policies after our review is published, we update our review to reflect the changes. All reviews display a "Last Updated" date indicating the most recent editorial revision.</p>
            <p className="mt-3">If you believe any information in our reviews is inaccurate, we welcome corrections. Please <Link to="/contact" className="text-primary hover:underline">contact our editorial team</Link> with specific details and we will investigate and update promptly. Material corrections are noted in the review.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Content Standards</h2>
            <p>SpicyRanked reviews adult platforms but does not host explicit content. Our reviews describe platform features, pricing, and user experience in professional editorial language. We link to external platforms where appropriate but do not embed or display adult content on our site.</p>
            <p className="mt-3">All content on SpicyRanked is intended for adults aged 18 and older. By accessing our site, visitors confirm they are of legal age in their jurisdiction.</p>
          </section>
        </div>

        <div className="mt-12 bg-card rounded-xl border border-border/50 p-6">
          <h3 className="font-bold mb-2">Related Policies</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/review-methodology" className="text-primary hover:underline">Review Methodology</Link> — How we test and score platforms</li>
            <li><Link to="/affiliate-disclosure" className="text-primary hover:underline">Affiliate Disclosure</Link> — Full affiliate transparency</li>
            <li><Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> — How we handle your data</li>
            <li><Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> — Site usage terms</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default EditorialPolicyPage;
