import { Layout } from "@/components/Layout";
import { SEO, breadcrumbSchema } from "@/components/SEO";

const PrivacyPolicyPage = () => {
  return (
    <Layout>
      <SEO
        title="Privacy Policy"
        description="SpicyRanked privacy policy. How we collect, use, and protect your data."
        canonical="/privacy-policy"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Privacy Policy", url: "/privacy-policy" },
        ])}
      />

      <div className="container py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-black mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last Updated: March 2026</p>

        <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Information We Collect</h2>
            <p>We collect the following types of information when you use SpicyRanked:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5">
              <li><strong className="text-foreground">Analytics data</strong> through Google Analytics, including page views, device information, browser type, and approximate geographic location.</li>
              <li><strong className="text-foreground">Email addresses</strong> voluntarily provided through newsletter signups.</li>
              <li><strong className="text-foreground">Form submissions</strong> from our contact, advertise, and write-for-us pages, including name, email, and message content.</li>
              <li><strong className="text-foreground">Cookies</strong> for site functionality, analytics, and remembering your preferences such as theme settings.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">How We Use Your Information</h2>
            <p>We use the information we collect to improve our site content and user experience, send newsletters to subscribers who have opted in, respond to inquiries and business proposals, and analyze traffic patterns to better serve our audience. We do <strong className="text-foreground">not</strong> sell your personal data to third parties under any circumstances.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Affiliate Links and Third Parties</h2>
            <p>SpicyRanked uses affiliate links throughout our reviews and recommendations. When you click an affiliate link and make a purchase or sign up on a third-party platform, we may earn a commission at no additional cost to you. These third-party platforms have their own privacy policies, and we encourage you to review them before creating accounts or sharing personal information. Affiliate relationships never influence our editorial ratings or reviews.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Cookies</h2>
            <p>We use the following types of cookies:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5">
              <li><strong className="text-foreground">Essential cookies</strong> required for basic site functionality such as theme preferences.</li>
              <li><strong className="text-foreground">Analytics cookies</strong> from Google Analytics to understand how visitors interact with our site.</li>
            </ul>
            <p className="mt-2">You can manage or disable cookies through your browser settings. Disabling cookies may affect some site functionality. Most modern browsers allow you to block third-party cookies while keeping essential cookies enabled.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Age Requirement</h2>
            <p>SpicyRanked is intended for users who are 18 years of age or older. We do not knowingly collect personal data from individuals under 18. If we become aware that we have collected information from a minor, we will take steps to delete that information promptly.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Your Rights (GDPR / CCPA)</h2>
            <p>Depending on your jurisdiction, you may have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5">
              <li>The right to access the personal data we hold about you.</li>
              <li>The right to request correction of inaccurate data.</li>
              <li>The right to request deletion of your personal data.</li>
              <li>The right to opt out of data collection and marketing communications.</li>
            </ul>
            <p className="mt-2">To exercise any of these rights, please contact us at <a href="mailto:privacy@spicyranked.com" className="text-primary hover:underline">privacy@spicyranked.com</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Data Security</h2>
            <p>We take reasonable measures to protect your information. Our site is served over HTTPS with TLS encryption, hosted on secure infrastructure with Cloudflare protection. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time to reflect changes in our practices or applicable laws. The "Last Updated" date at the top of this page indicates when the policy was last revised. We encourage you to review this page periodically.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">Contact Us</h2>
            <p>If you have questions or concerns about this privacy policy or our data practices, please contact us at <a href="mailto:privacy@spicyranked.com" className="text-primary hover:underline">privacy@spicyranked.com</a>.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicyPage;
