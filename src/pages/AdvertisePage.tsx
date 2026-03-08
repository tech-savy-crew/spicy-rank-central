import { Layout } from "@/components/Layout";
import { SEO, breadcrumbSchema, faqSchema } from "@/components/SEO";
import { useState } from "react";
import {
  TrendingUp, Clock, FileText, Users, Send, ChevronRight,
  BarChart3, Star, Zap, Shield, MessageSquareQuote
} from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const stats = [
  { label: "Monthly Visitors", value: "50K+", icon: TrendingUp },
  { label: "Avg. Time on Site", value: "4:30 min", icon: Clock },
  { label: "Pages Per Session", value: "3.2", icon: FileText },
  { label: "Audience", value: "18-35, Tech-Savvy", icon: Users },
];

const audienceData = [
  { label: "Creator Platforms", pct: 35 },
  { label: "Streaming", pct: 25 },
  { label: "Dating", pct: 20 },
  { label: "AI Platforms", pct: 15 },
  { label: "Other", pct: 5 },
];

const faqs = [
  { q: "What is the minimum ad commitment?", a: "Our minimum commitment is one month for banner ads and a one-time fee for sponsored reviews. We offer flexible terms to fit your budget." },
  { q: "Do you offer discounts for long-term placements?", a: "Yes! We offer 10% off for 3-month commitments and 20% off for 6-month or longer commitments across all ad formats." },
  { q: "Can I see analytics and performance reports?", a: "Absolutely. All advertisers receive monthly reports with impressions, clicks, CTR, and audience demographics for their placements." },
  { q: "Do you accept platforms in all categories?", a: "We accept advertisers from all digital platform categories we cover, subject to our editorial guidelines and quality standards." },
  { q: "How quickly can my ad go live?", a: "Most ads go live within 48 hours of receiving your creative assets and payment confirmation." },
];

const AdvertisePage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const scrollToForm = () => {
    document.getElementById("advertise-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout>
      <SEO
        title="Advertise With Us - SpicyRanked"
        description="Reach thousands of engaged users researching digital entertainment platforms. Banner ads, sponsored reviews, and custom packages available."
        canonical="/advertise"
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Advertise", url: "/advertise" },
          ]),
          faqSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
        <div className="container relative text-center max-w-3xl">
          <AnimatedSection animation="fade-up">
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Advertise on <span className="spicy-text-gradient">SpicyRanked</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Reach thousands of engaged users actively researching digital entertainment platforms
            </p>
            <button onClick={scrollToForm} className="inline-flex items-center gap-2 spicy-gradient text-primary-foreground font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity">
              Get Media Kit <ChevronRight className="h-4 w-4" />
            </button>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="container py-16">
        <AnimatedSection animation="fade-up">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Why Advertise With Us</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-card border border-border/50 rounded-xl p-6 text-center card-hover">
                <s.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <p className="text-2xl font-black mb-1">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Pricing Cards */}
      <section className="container py-16">
        <AnimatedSection animation="fade-up">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Advertising Options</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Banner Ads */}
            <div className="bg-card border border-border/50 rounded-xl p-6 flex flex-col card-hover">
              <BarChart3 className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-4">Banner Ads</h3>
              <ul className="space-y-3 text-sm text-muted-foreground flex-1">
                <li className="flex justify-between"><span>Header banner (728×90)</span><span className="font-semibold text-foreground">$XX/mo</span></li>
                <li className="flex justify-between"><span>Sidebar (300×250)</span><span className="font-semibold text-foreground">$XX/mo</span></li>
                <li className="flex justify-between"><span>In-content (728×90)</span><span className="font-semibold text-foreground">$XX/mo</span></li>
              </ul>
              <div className="mt-6 pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground">High visibility · All pages · Responsive</p>
              </div>
              <button onClick={scrollToForm} className="mt-4 w-full border border-primary text-primary font-semibold py-2.5 rounded-lg hover:bg-primary/10 transition-colors text-sm">
                Get Started
              </button>
            </div>

            {/* Sponsored Reviews - Popular */}
            <div className="relative bg-card border-2 border-primary rounded-xl p-6 flex flex-col shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)] md:-translate-y-2">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 spicy-gradient text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                Popular
              </div>
              <Star className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-4">Sponsored Reviews</h3>
              <ul className="space-y-3 text-sm text-muted-foreground flex-1">
                <li>✦ Dedicated review article on your platform</li>
                <li>✦ Permanent placement in relevant category</li>
                <li>✦ Includes do-follow backlink</li>
                <li>✦ Social media promotion included</li>
              </ul>
              <p className="mt-6 pt-4 border-t border-border/50 text-lg font-bold">Starting at $XXX</p>
              <button onClick={scrollToForm} className="mt-4 w-full spicy-gradient text-primary-foreground font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm">
                Get Started
              </button>
            </div>

            {/* Custom Packages */}
            <div className="bg-card border border-border/50 rounded-xl p-6 flex flex-col card-hover">
              <Zap className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-4">Custom Packages</h3>
              <ul className="space-y-3 text-sm text-muted-foreground flex-1">
                <li>✦ Homepage featured placement</li>
                <li>✦ Newsletter sponsorship</li>
                <li>✦ Category page takeover</li>
                <li>✦ Bundle deals available</li>
              </ul>
              <p className="mt-6 pt-4 border-t border-border/50 text-lg font-bold">Contact Us</p>
              <button onClick={scrollToForm} className="mt-4 w-full border border-primary text-primary font-semibold py-2.5 rounded-lg hover:bg-primary/10 transition-colors text-sm">
                Get Started
              </button>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Audience */}
      <section className="container py-16">
        <AnimatedSection animation="fade-up">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Our Audience</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {audienceData.map((d) => (
              <div key={d.label} className="flex items-center gap-4">
                <span className="text-sm w-40 text-right text-muted-foreground shrink-0">{d.label}</span>
                <div className="flex-1 bg-secondary rounded-full h-6 overflow-hidden">
                  <div
                    className="h-full spicy-gradient rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${d.pct}%` }}
                  >
                    <span className="text-xs font-bold text-primary-foreground">{d.pct}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-8 max-w-lg mx-auto text-sm">
            Our readers are active consumers who are ready to try new platforms. They trust our recommendations.
          </p>
        </AnimatedSection>
      </section>

      {/* Brands */}
      <section className="container py-16">
        <AnimatedSection animation="fade-up">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Brands We've Worked With</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-secondary/50 border border-border/30 rounded-xl h-24 flex items-center justify-center">
                <span className="text-sm text-muted-foreground font-medium">Brand Logo</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* How It Works */}
      <section className="container py-16">
        <AnimatedSection animation="fade-up">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Get in Touch", desc: "Fill out the form below with your details and advertising goals." },
              { step: "2", title: "Choose Your Package", desc: "We'll send you tailored options and a media kit within 24 hours." },
              { step: "3", title: "Go Live", desc: "Your ad goes live within 48 hours of creative approval." },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 rounded-full spicy-gradient flex items-center justify-center text-primary-foreground font-black text-lg mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Testimonial */}
      <section className="container py-16">
        <AnimatedSection animation="fade-up">
          <div className="max-w-2xl mx-auto bg-card border border-border/50 rounded-xl p-8 text-center">
            <MessageSquareQuote className="h-10 w-10 text-primary mx-auto mb-4 opacity-60" />
            <blockquote className="text-lg italic text-foreground mb-4">
              "SpicyRanked drove real traffic to our platform. Professional team and great ROI."
            </blockquote>
            <p className="font-semibold text-sm">Jane D.</p>
            <p className="text-xs text-muted-foreground">Marketing Director, ExampleCo</p>
          </div>
        </AnimatedSection>
      </section>

      {/* Contact Form */}
      <section id="advertise-form" className="container py-16 max-w-2xl">
        <AnimatedSection animation="fade-up">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Get in Touch</h2>

          {submitted ? (
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-8 text-center">
              <Shield className="h-10 w-10 text-primary mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">Request Received!</h3>
              <p className="text-sm text-muted-foreground">We'll get back to you within 24 hours with a media kit and options.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">Company Name</label>
                  <input id="company" type="text" required maxLength={100}
                    className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Your company" />
                </div>
                <div>
                  <label htmlFor="contact" className="block text-sm font-medium mb-2">Contact Person</label>
                  <input id="contact" type="text" required maxLength={100}
                    className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Your name" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="adEmail" className="block text-sm font-medium mb-2">Email</label>
                  <input id="adEmail" type="email" required maxLength={255}
                    className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="you@company.com" />
                </div>
                <div>
                  <label htmlFor="website" className="block text-sm font-medium mb-2">Website URL</label>
                  <input id="website" type="url" maxLength={255}
                    className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="https://yoursite.com" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="interest" className="block text-sm font-medium mb-2">Interested In</label>
                  <select id="interest" className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <option>Banner Ads</option>
                    <option>Sponsored Review</option>
                    <option>Custom Package</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium mb-2">Budget Range</label>
                  <select id="budget" className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <option>$100 – $500</option>
                    <option>$500 – $1,000</option>
                    <option>$1,000 – $5,000</option>
                    <option>$5,000+</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="adMessage" className="block text-sm font-medium mb-2">Message</label>
                <textarea id="adMessage" required maxLength={2000}
                  className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground resize-none h-32 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Tell us about your advertising goals..." />
              </div>
              <button type="submit"
                className="inline-flex items-center gap-2 spicy-gradient text-primary-foreground font-semibold px-6 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity">
                <Send className="h-4 w-4" /> Submit Request
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

export default AdvertisePage;
