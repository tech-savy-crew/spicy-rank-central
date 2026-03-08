import { Layout } from "@/components/Layout";
import { SEO, breadcrumbSchema } from "@/components/SEO";
import { useState } from "react";
import { Send } from "lucide-react";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout>
      <SEO
        title="Contact Us"
        description="Have a question, correction, or platform suggestion for SpicyRanked? Get in touch with our editorial team."
        canonical="/contact"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ])}
      />

      <div className="container py-12 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-black mb-2">Contact Us</h1>
        <p className="text-muted-foreground mb-10">Have a question, correction, or platform suggestion? We'd love to hear from you.</p>

        {submitted ? (
          <div className="bg-success/10 border border-success/20 rounded-xl p-8 text-center">
            <h2 className="text-xl font-bold text-success mb-2">Message Sent!</h2>
            <p className="text-sm text-muted-foreground">Thanks for reaching out. We'll get back to you within 48 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
              <input id="name" type="text" required maxLength={100}
                className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input id="email" type="email" required maxLength={255}
                className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
              <select id="subject" className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option>General Inquiry</option>
                <option>Review Correction</option>
                <option>Platform Suggestion</option>
                <option>Partnership</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <textarea id="message" required maxLength={2000}
                className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground resize-none h-32 focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Tell us what's on your mind..." />
            </div>
            <button type="submit"
              className="inline-flex items-center gap-2 spicy-gradient text-primary-foreground font-semibold px-6 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity">
              <Send className="h-4 w-4" /> Send Message
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default ContactPage;
