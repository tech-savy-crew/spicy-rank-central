import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { RatingBadge } from "@/components/RatingBadge";
import { PlatformCard } from "@/components/PlatformCard";
import { getPlatformBySlug, platforms } from "@/data/platforms";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, XCircle, ExternalLink, ChevronLeft } from "lucide-react";
import { useState } from "react";

const ReviewPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const platform = getPlatformBySlug(slug || "");
  const [comment, setComment] = useState("");

  if (!platform) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-black mb-4">Review Not Found</h1>
          <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
        </div>
      </Layout>
    );
  }

  const altPlatforms = platform.alternatives
    .map((slug) => platforms.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 spicy-gradient opacity-5" />
        <div className="container py-12 md:py-16 relative">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ChevronLeft className="h-4 w-4" /> Back to Reviews
          </Link>
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <div className="flex-1">
              <div className="text-5xl mb-4">{platform.logo}</div>
              <p className="text-sm text-primary font-medium mb-2">{platform.category} Review</p>
              <h1 className="text-3xl md:text-5xl font-black mb-3">{platform.name} Review</h1>
              <p className="text-lg text-muted-foreground">{platform.verdict}</p>
            </div>
            <div className="text-center bg-card rounded-xl border border-border/50 p-6 min-w-[140px]">
              <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-medium">Overall</div>
              <RatingBadge rating={platform.rating} size="lg" />
              <div className="text-xs text-muted-foreground mt-2">out of 10</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Summary */}
            <div className="bg-card rounded-xl border border-border/50 p-6">
              <p className="text-muted-foreground leading-relaxed">{platform.summary}</p>
            </div>

            {/* Review Sections */}
            {platform.reviewSections.map((section) => (
              <div key={section.title}>
                <h2 className="text-xl font-bold mb-3">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
              </div>
            ))}

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-success/10 border border-success/20 rounded-xl p-6">
                <h3 className="font-bold text-success mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" /> Pros
                </h3>
                <ul className="space-y-2">
                  {platform.pros.map((pro) => (
                    <li key={pro} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-success mt-0.5">✓</span> {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6">
                <h3 className="font-bold text-destructive mb-4 flex items-center gap-2">
                  <XCircle className="h-5 w-5" /> Cons
                </h3>
                <ul className="space-y-2">
                  {platform.cons.map((con) => (
                    <li key={con} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-destructive mt-0.5">✗</span> {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div>
              <h2 className="text-xl font-bold mb-5">Rating Breakdown</h2>
              <div className="space-y-4">
                {platform.ratings.map((r) => (
                  <div key={r.label} className="flex items-center gap-4">
                    <span className="text-sm font-medium w-32 shrink-0">{r.label}</span>
                    <div className="flex-1 bg-secondary rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full spicy-gradient rounded-full transition-all duration-700"
                        style={{ width: `${r.score * 10}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold w-8 text-right">{r.score}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alternatives */}
            {altPlatforms.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-5">Alternatives to {platform.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {altPlatforms.map((alt) => alt && <PlatformCard key={alt.id} platform={alt} />)}
                </div>
              </div>
            )}

            {/* FAQ */}
            {platform.faqs.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-5">FAQ</h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {platform.faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border/50 px-5">
                      <AccordionTrigger className="text-sm font-medium hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}

            {/* Comments */}
            <div>
              <h2 className="text-xl font-bold mb-5">Comments</h2>
              <div className="bg-card rounded-xl border border-border/50 p-5">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts on this platform..."
                  className="w-full bg-secondary rounded-lg p-4 text-sm text-foreground placeholder:text-muted-foreground resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button className="mt-3 spicy-gradient text-primary-foreground font-semibold px-5 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity">
                  Post Comment
                </button>
                <p className="text-xs text-muted-foreground mt-4">No comments yet. Be the first to share your opinion!</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Facts */}
            <div className="bg-card rounded-xl border border-border/50 p-6 sticky top-24">
              <h3 className="font-bold mb-4">Quick Facts</h3>
              <dl className="space-y-3">
                {platform.quickFacts.map((fact) => (
                  <div key={fact.label} className="flex justify-between text-sm">
                    <dt className="text-muted-foreground">{fact.label}</dt>
                    <dd className="font-medium">{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 spicy-gradient text-primary-foreground font-semibold px-5 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity"
              >
                Visit {platform.name} <ExternalLink className="h-4 w-4" />
              </a>

              <div className="mt-6 pt-5 border-t border-border/50">
                <Link
                  to={`/alternatives/${platform.slug}`}
                  className="text-sm text-primary hover:underline font-medium"
                >
                  View alternatives to {platform.name} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReviewPage;
