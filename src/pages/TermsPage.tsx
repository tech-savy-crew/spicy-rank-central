import { Layout } from "@/components/Layout";
import { SEO, breadcrumbSchema } from "@/components/SEO";

const TermsPage = () => {
  return (
    <Layout>
      <SEO
        title="Terms of Service"
        description="SpicyRanked terms of service. Rules and guidelines for using our site."
        canonical="/terms"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Terms of Service", url: "/terms" },
        ])}
      />

      <div className="container py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-black mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-10">Last Updated: March 2026</p>

        <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Acceptance of Terms</h2>
            <p>By accessing and using SpicyRanked ("the Site"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Site. We reserve the right to update or modify these terms at any time, and your continued use of the Site constitutes acceptance of any changes.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Age Requirement</h2>
            <p>SpicyRanked publishes reviews and information about adult entertainment platforms. You must be at least 18 years of age (or the age of majority in your jurisdiction) to access and use this Site. By using the Site, you represent and warrant that you meet this age requirement. We do not host or provide access to explicit content; we provide editorial reviews and comparisons only.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Content and Reviews</h2>
            <p>All reviews, ratings, rankings, and opinions published on SpicyRanked represent the subjective editorial opinions of our review team. Ratings are based on our proprietary scoring methodology and reflect our honest assessment at the time of publication. We make no guarantees about the accuracy, completeness, or timeliness of any information on the Site. Platform features, pricing, and policies may change after our reviews are published.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Affiliate Disclosure</h2>
            <p>SpicyRanked participates in affiliate marketing programs. Some links on our Site are affiliate links, meaning we may earn a commission if you click through and make a purchase or sign up on a third-party platform. Affiliate relationships do <strong className="text-foreground">not</strong> influence our editorial ratings, rankings, or review content. We clearly label sponsored content where applicable. Our editorial team operates independently from our business relationships.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">User Submissions</h2>
            <p>If you submit content to SpicyRanked through our guest post or write-for-us program, you grant us a non-exclusive, royalty-free, perpetual license to publish, edit, and distribute your submission. You represent that any content you submit is original, does not infringe on any third-party rights, and complies with our content guidelines. We reserve the right to reject, edit, or remove any submitted content at our discretion.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Intellectual Property</h2>
            <p>All original content on SpicyRanked, including text, graphics, logos, design elements, and code, is the intellectual property of SpicyRanked and is protected by applicable copyright and trademark laws. You may not reproduce, distribute, or create derivative works from our content without prior written permission. Platform names, logos, and trademarks mentioned in our reviews belong to their respective owners.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Disclaimer</h2>
            <p>SpicyRanked is an independent review site and is <strong className="text-foreground">not</strong> affiliated with, endorsed by, or officially connected to any of the platforms we review. All platform names and trademarks are the property of their respective owners. The Site and its content are provided "as is" without warranties of any kind, either express or implied. We do not guarantee that the Site will be available at all times or free of errors.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, SpicyRanked and its owners, employees, and contributors shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the Site, reliance on any information provided, or your interactions with third-party platforms linked from the Site. Your use of any third-party platform is at your own risk and subject to that platform's terms and conditions.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Governing Law</h2>
            <p>These Terms of Service shall be governed by and construed in accordance with the laws of the United States. Any disputes arising from these terms or your use of the Site shall be subject to the exclusive jurisdiction of the courts in that jurisdiction.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Changes to Terms</h2>
            <p>We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the Site. The "Last Updated" date at the top of this page indicates when these terms were last revised. Your continued use of the Site after any changes constitutes your acceptance of the updated terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Contact</h2>
            <p>For questions about these Terms of Service, please contact us at <a href="mailto:legal@spicyranked.com" className="text-primary hover:underline">legal@spicyranked.com</a>.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage;
