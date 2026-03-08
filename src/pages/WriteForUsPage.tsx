import { Layout } from "@/components/Layout";
import { SEO, breadcrumbSchema } from "@/components/SEO";
import { useState } from "react";
import {
  Send, Users, Award, Link2, TrendingUp, CheckCircle2, XCircle,
  FileText, Clock, Pencil, Rocket, Share2, CalendarDays, Tag
} from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const benefits = [
  { icon: Users, title: "Reach Our Audience", desc: "Get exposure to 50K+ monthly readers interested in digital platforms." },
  { icon: Award, title: "Build Authority", desc: "Establish yourself as an industry expert with a published byline." },
  { icon: Link2, title: "Quality Backlinks", desc: "Get a do-follow link from a growing authority site (DA XX+)." },
  { icon: TrendingUp, title: "Long-term Visibility", desc: "Your content stays published permanently with ongoing organic traffic." },
];

const weAccept = [
  "Platform reviews and honest assessments",
  "Comparison articles (Platform A vs Platform B)",
  "Industry trend analysis and opinion pieces",
  "How-to guides for creators and users",
  "List posts (Top X platforms for specific needs)",
  "Creator economy insights and strategies",
];

const weReject = [
  "Thin or AI-generated content without original insights",
  "Duplicate content published elsewhere",
  "Overly promotional content without genuine analysis",
  "Content with explicit imagery or NSFW media",
  "Gambling, pharma, or unrelated niche content",
];

const qualityStandards = [
  "Minimum 1500 words",
  "Original research or first-hand experience preferred",
  "Proper heading structure (H2, H3)",
  "Include relevant internal links to existing SpicyRanked content",
  "1-2 external links to authoritative sources",
  "Author bio with headshot (100 words max)",
];

const steps = [
  { icon: FileText, title: "Submit", desc: "Send your article or topic pitch." },
  { icon: Clock, title: "Review", desc: "Our editorial team reviews within 48 hours (paid) or 7 days (free)." },
  { icon: Pencil, title: "Revisions", desc: "We may suggest edits for quality." },
  { icon: Rocket, title: "Publish", desc: "Article goes live with your byline." },
  { icon: Share2, title: "Promote", desc: "Shared on our social channels (paid posts get extra promotion)." },
];

const publishedPosts = [
  { title: "How I Grew My Creator Platform to 10K Subscribers", author: "Alex Rivera", date: "Feb 12, 2026", category: "Creator Platforms" },
  { title: "The Future of AI in Adult Entertainment", author: "Mia Chen", date: "Jan 28, 2026", category: "AI Platforms" },
  { title: "5 Mistakes New Creators Make on OnlyFans", author: "Jordan Blake", date: "Jan 15, 2026", category: "Creator Platforms" },
  { title: "Streaming Wars: Who Wins in 2026?", author: "Sam Ortiz", date: "Dec 20, 2025", category: "Streaming" },
];

const faqs = [
  { q: "How much does a paid guest post cost?", a: "Pricing varies based on content type and link requirements. Contact us for current rates." },
  { q: "Can you write the article for me?", a: "Yes, we offer content creation services for sponsored posts at an additional fee." },
  { q: "Do you accept AI-generated content?", a: "We accept AI-assisted content that includes original insights and has been thoroughly edited by a human expert." },
  { q: "How long will my article stay published?", a: "All published content remains on our site permanently." },
  { q: "Can I include affiliate links in my guest post?", a: "Affiliate links are only permitted in paid guest posts and must be disclosed." },
  { q: "What is your Domain Authority?", a: "Our current DA is XX. Contact us for the latest metrics." },
];

const WriteForUsPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmed) return;
    setSubmitted(true);
  };

  const scrollToForm = () => {
    document.getElementById("write-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout>
      <SEO
        title="Write For Us - Guest Posts & Sponsored Content"
        description="Write for SpicyRanked. Submit a free guest post or inquire about sponsored content opportunities. Reach 50K+ monthly readers."
        canonical="/write-for-us"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Write For Us", url: "/write-for-us" },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
        <div className="container relative text-center max-w-3xl">
          <AnimatedSection animation="fade-up">
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Write For <span className="spicy-text-gradient">SpicyRanked</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Share your expertise with our growing community of platform enthusiasts
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={scrollToForm} className="inline-flex items-center justify-center gap-2 spicy-gradient text-primary-foreground font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity">
                Submit a Guest Post
              </button>
              <button onClick={scrollToForm} className="inline-flex items-center justify-center gap-2 border border-primary text-primary font-semibold px-8 py-3 rounded-lg hover:bg-primary/10 transition-colors">
                Sponsored Content Inquiry
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Benefits */}
      <section className="container py-16">
        <AnimatedSection animation="fade-up">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Why Write For Us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((b) => (
              <div key={b.title} className="bg-card border border-border/50 rounded-xl p-6 card-hover">
                <b.icon className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-bold mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Content Guidelines */}
      <section className="container py-16">
        <AnimatedSection animation="fade-up">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Content Guidelines</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-border/50 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" /> What We Accept
              </h3>
              <ul className="space-y-2">
                {weAccept.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5 shrink-0">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card border border-border/50 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <XCircle className="h-5 w-5 text-destructive" /> What We Don't Accept
              </h3>
              <ul className="space-y-2">
                {weReject.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-destructive mt-0.5 shrink-0">✗</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card border border-border/50 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" /> Quality Standards
              </h3>
              <ul className="space-y-2">
                {qualityStandards.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5 shrink-0">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Free vs Paid */}
      <section className="container py-16">
        <AnimatedSection animation="fade-up">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Submission Types</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Free */}
            <div className="bg-card border border-border/50 rounded-xl p-6 flex flex-col">
              <span className="inline-block text-xs font-bold bg-secondary text-muted-foreground px-3 py-1 rounded-full w-fit mb-4">For Contributors</span>
              <h3 className="text-xl font-bold mb-4">Free Guest Post</h3>
              <ul className="space-y-3 text-sm text-muted-foreground flex-1">
                <li>✦ For genuine industry experts and creators</li>
                <li>✦ Must meet all quality guidelines</li>
                <li>✦ One do-follow link in author bio</li>
                <li>✦ No link in article body</li>
                <li>✦ Review time: 5–7 business days</li>
              </ul>
              <p className="mt-6 pt-4 border-t border-border/50 text-lg font-bold">Free</p>
              <button onClick={scrollToForm} className="mt-4 w-full border border-primary text-primary font-semibold py-2.5 rounded-lg hover:bg-primary/10 transition-colors text-sm">
                Submit Post
              </button>
            </div>
            {/* Paid */}
            <div className="relative bg-card border-2 border-primary rounded-xl p-6 flex flex-col shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)] md:-translate-y-2">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 spicy-gradient text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                Recommended
              </div>
              <span className="inline-block text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full w-fit mb-4">For Businesses</span>
              <h3 className="text-xl font-bold mb-4">Sponsored / Paid Post</h3>
              <ul className="space-y-3 text-sm text-muted-foreground flex-1">
                <li>✦ For brands, platforms, and businesses</li>
                <li>✦ 1–2 contextual do-follow links in article body</li>
                <li>✦ Priority review: 24–48 hours</li>
                <li>✦ Optional: we can write the article for you</li>
                <li>✦ Includes social media promotion</li>
                <li>✦ Permanent placement guaranteed</li>
              </ul>
              <p className="mt-6 pt-4 border-t border-border/50 text-lg font-bold">Starting at $XXX</p>
              <button onClick={scrollToForm} className="mt-4 w-full spicy-gradient text-primary-foreground font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm">
                Inquire Now
              </button>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Editorial Process */}
      <section className="container py-16">
        <AnimatedSection animation="fade-up">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Our Editorial Process</h2>
          <div className="max-w-3xl mx-auto">
            {steps.map((s, i) => (
              <div key={s.title} className="flex gap-4 items-start mb-6 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full spicy-gradient flex items-center justify-center text-primary-foreground shrink-0">
                    <s.icon className="h-5 w-5" />
                  </div>
                  {i < steps.length - 1 && <div className="w-px h-8 bg-border/50 mt-1" />}
                </div>
                <div className="pt-2">
                  <h3 className="font-bold">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Published Posts */}
      <section className="container py-16">
        <AnimatedSection animation="fade-up">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Published Guest Posts</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {publishedPosts.map((p) => (
              <div key={p.title} className="bg-card border border-border/50 rounded-xl p-5 card-hover flex flex-col">
                <span className="inline-block text-xs font-medium bg-secondary text-muted-foreground px-2 py-0.5 rounded-full w-fit mb-3">
                  <Tag className="h-3 w-3 inline -mt-0.5 mr-1" />{p.category}
                </span>
                <h3 className="font-bold text-sm mb-3 flex-1 leading-snug">{p.title}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{p.author}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" />{p.date}</span>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Form */}
      <section id="write-form" className="container py-16 max-w-2xl">
        <AnimatedSection animation="fade-up">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Submit Your Content</h2>

          {submitted ? (
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-8 text-center">
              <CheckCircle2 className="h-10 w-10 text-primary mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">Submission Received!</h3>
              <p className="text-sm text-muted-foreground">We'll review your submission and get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="wfName" className="block text-sm font-medium mb-2">Full Name</label>
                  <input id="wfName" type="text" required maxLength={100}
                    className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="wfEmail" className="block text-sm font-medium mb-2">Email</label>
                  <input id="wfEmail" type="email" required maxLength={255}
                    className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="you@example.com" />
                </div>
              </div>
              <div>
                <label htmlFor="wfPortfolio" className="block text-sm font-medium mb-2">Website / Portfolio URL</label>
                <input id="wfPortfolio" type="url" maxLength={255}
                  className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="https://yoursite.com" />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="wfType" className="block text-sm font-medium mb-2">Submission Type</label>
                  <select id="wfType" className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <option>Free Guest Post</option>
                    <option>Paid / Sponsored Post</option>
                    <option>Topic Pitch Only</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="wfCategory" className="block text-sm font-medium mb-2">Target Category</label>
                  <select id="wfCategory" className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <option>Creator Platforms</option>
                    <option>Streaming</option>
                    <option>Dating</option>
                    <option>AI Platforms</option>
                    <option>Industry Analysis</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="wfTitle" className="block text-sm font-medium mb-2">Article Title</label>
                <input id="wfTitle" type="text" required maxLength={200}
                  className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Your proposed article title" />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="wfDoc" className="block text-sm font-medium mb-2">Article URL (Google Doc or file link)</label>
                  <input id="wfDoc" type="url" maxLength={500}
                    className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="https://docs.google.com/..." />
                </div>
                <div>
                  <label htmlFor="wfLinks" className="block text-sm font-medium mb-2">Backlinks Needed</label>
                  <select id="wfLinks" className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="wfMessage" className="block text-sm font-medium mb-2">Message / Notes</label>
                <textarea id="wfMessage" maxLength={2000}
                  className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground resize-none h-28 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Anything else you'd like us to know..." />
              </div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)}
                  className="mt-1 accent-[hsl(var(--primary))]" />
                <span className="text-sm text-muted-foreground">I confirm this content is original and not published elsewhere.</span>
              </label>
              <button type="submit" disabled={!confirmed}
                className="inline-flex items-center gap-2 spicy-gradient text-primary-foreground font-semibold px-6 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
                <Send className="h-4 w-4" /> Submit
              </button>
            </form>
          )}
        </AnimatedSection>
      </section>

      {/* FAQ */}
      <section className="container py-16 max-w-2xl">
        <AnimatedSection animation="fade-up">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-sm">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </section>
    </Layout>
  );
};

export default WriteForUsPage;
