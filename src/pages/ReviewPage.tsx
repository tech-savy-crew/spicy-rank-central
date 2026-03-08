import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { RatingBadge } from "@/components/RatingBadge";
import { PlatformCard } from "@/components/PlatformCard";
import { RelatedContent } from "@/components/RelatedContent";
import { ReviewContent } from "@/components/ReviewContent";
import { SEO, reviewSchema, faqSchema, breadcrumbSchema } from "@/components/SEO";
import { getPlatformBySlug, platforms } from "@/data/platforms";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, XCircle, ExternalLink, Star, Clock, Calendar, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";

function StarRating({ score, max = 10 }: { score: number; max?: number }) {
  const stars = 5;
  const filled = (score / max) * stars;
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${score} out of ${max}`}>
      {Array.from({ length: stars }).map((_, i) => {
        const fill = Math.min(1, Math.max(0, filled - i));
        return (
          <div key={i} className="relative h-4 w-4">
            <Star className="absolute inset-0 h-4 w-4 text-muted" />
            {fill > 0 && (
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star className="h-4 w-4 fill-rating text-rating" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function VisitButton({ name, url, className = "" }: { name: string; url: string; className?: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 spicy-gradient text-primary-foreground font-semibold px-6 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity ${className}`}
    >
      Visit {name} <ExternalLink className="h-4 w-4" />
    </a>
  );
}

const ReviewPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const platform = getPlatformBySlug(slug || "");
  const [comment, setComment] = useState("");

  const readingTime = useMemo(() => {
    if (!platform) return 0;
    const text = platform.summary + platform.reviewSections.map((s) => s.content).join(" ") + platform.pros.join(" ") + platform.cons.join(" ");
    return Math.max(3, Math.ceil(text.split(/\s+/).length / 200));
  }, [platform]);

  const tocItems = useMemo(() => {
    if (!platform) return [];
    const items = [
      ...platform.reviewSections.map((s) => ({ id: s.title.toLowerCase().replace(/\s+/g, "-"), label: s.title })),
      { id: "pros-cons", label: "Pros & Cons" },
      { id: "rating-breakdown", label: "Rating Breakdown" },
    ];
    if (platform.alternatives.length > 0) items.push({ id: "alternatives", label: "Alternatives" });
    if (platform.faqs.length > 0) items.push({ id: "faq", label: "FAQ" });
    items.push({ id: "comments", label: "Comments" });
    return items;
  }, [platform]);

  if (!platform) {
    return (
      <Layout>
        <SEO title="Review Not Found" description="The requested review could not be found." noindex />
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-black mb-4">Review Not Found</h1>
          <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
        </div>
      </Layout>
    );
  }

  const altPlatforms = platform.alternatives
    .map((s) => platforms.find((p) => p.slug === s))
    .filter(Boolean);

  const categorySlug = platform.category.toLowerCase().replace(" ", "-");

  const jsonLdData = [
    reviewSchema(platform),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: platform.category, url: `/category/${categorySlug}` },
      { name: `${platform.name} Review`, url: `/review/${platform.slug}` },
    ]),
    ...(platform.faqs.length > 0 ? [faqSchema(platform.faqs)] : []),
  ];

  return (
    <Layout>
      <SEO
        title={`${platform.name} Review ${new Date().getFullYear()} — Rating ${platform.rating}/10`}
        description={platform.verdict}
        canonical={`/review/${platform.slug}`}
        ogType="article"
        jsonLd={jsonLdData}
      />

      {/* Breadcrumb */}
      <nav className="container pt-6 pb-0" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
          <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
          <ChevronRight className="h-3 w-3" />
          <li><Link to={`/category/${categorySlug}`} className="hover:text-foreground transition-colors">{platform.category}</Link></li>
          <ChevronRight className="h-3 w-3" />
          <li className="text-foreground font-medium">{platform.name} Review</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 spicy-gradient opacity-5" />
        <div className="container px-4 sm:px-6 lg:px-8 py-8 md:py-14 relative">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <div className="flex-1 min-w-0">
              <div className="text-4xl md:text-5xl mb-3 md:mb-4">{platform.logo}</div>
              <p className="text-xs sm:text-sm text-primary font-medium mb-1.5 md:mb-2">{platform.category} Review</p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-2 md:mb-3 leading-tight">{platform.name} Review</h1>
              <p className="text-base md:text-lg text-muted-foreground mb-3 leading-relaxed">{platform.verdict}</p>
              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {readingTime} min read
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> Updated {platform.lastUpdated}
                </span>
              </div>
              <div className="mt-4 md:mt-5">
                <VisitButton name={platform.name} url={platform.url} />
              </div>
            </div>
            <div className="text-center bg-card rounded-xl border border-border/50 p-4 md:p-6 min-w-[120px] md:min-w-[140px] self-start md:self-auto">
              <div className="text-xs text-muted-foreground mb-1.5 md:mb-2 uppercase tracking-wider font-medium">Overall</div>
              <RatingBadge rating={platform.rating} size="lg" />
              <div className="text-xs text-muted-foreground mt-1.5 md:mt-2">out of 10</div>
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
              <div key={section.title} id={section.title.toLowerCase().replace(/\s+/g, "-")}>
                <h2 className="text-xl font-bold mb-3">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
              </div>
            ))}

            {/* Pros & Cons */}
            <div id="pros-cons" className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
            <div id="rating-breakdown">
              <h2 className="text-xl font-bold mb-5">Rating Breakdown</h2>
              <div className="space-y-4 bg-card rounded-xl border border-border/50 p-6">
                {platform.ratings.map((r) => (
                  <div key={r.label} className="flex items-center gap-4">
                    <span className="text-sm font-medium w-36 shrink-0">{r.label}</span>
                    <StarRating score={r.score} />
                    <div className="flex-1 bg-secondary rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-full spicy-gradient rounded-full transition-all duration-700"
                        style={{ width: `${r.score * 10}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold w-10 text-right">{r.score}/10</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alternatives */}
            {altPlatforms.length > 0 && (
              <div id="alternatives">
                <h2 className="text-xl font-bold mb-5">Alternatives to {platform.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {altPlatforms.map((alt) => alt && <PlatformCard key={alt.id} platform={alt} />)}
                </div>
              </div>
            )}

            {/* FAQ */}
            {platform.faqs.length > 0 && (
              <div id="faq">
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

            {/* Bottom CTA */}
            <div className="bg-card rounded-xl border border-border/50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold">Ready to try {platform.name}?</h3>
                <p className="text-sm text-muted-foreground">Start using it today — {platform.pricingModel}.</p>
              </div>
              <VisitButton name={platform.name} url={platform.url} />
            </div>

            {/* Related Content */}
            <RelatedContent currentSlug={platform.slug} category={platform.category} title={`More ${platform.category} Reviews`} />

            {/* Comments */}
            <div id="comments">
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

          {/* Sticky Sidebar */}
          <div>
            <div className="space-y-5 lg:sticky lg:top-24">
              <div className="bg-card rounded-xl border border-border/50 p-6 text-center">
                <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-medium">Our Score</div>
                <RatingBadge rating={platform.rating} size="lg" />
                <div className="text-xs text-muted-foreground mt-2 mb-5">out of 10</div>
                <VisitButton name={platform.name} url={platform.url} className="w-full" />
              </div>

              <div className="bg-card rounded-xl border border-border/50 p-6">
                <h3 className="font-bold mb-4">Quick Facts</h3>
                <dl className="space-y-3 text-sm">
                  {[
                    { label: "Category", value: platform.category },
                    ...platform.quickFacts,
                    { label: "Pricing Model", value: platform.pricingModel },
                    { label: "Starting Price", value: platform.startingPrice },
                    { label: "Payment Methods", value: platform.paymentMethods },
                    { label: "Content Types", value: platform.contentTypes },
                  ].map((fact) => (
                    <div key={fact.label} className="flex justify-between gap-3">
                      <dt className="text-muted-foreground shrink-0">{fact.label}</dt>
                      <dd className="font-medium text-right">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="bg-card rounded-xl border border-border/50 p-6">
                <h3 className="font-bold mb-3">Table of Contents</h3>
                <nav className="space-y-1.5">
                  {tocItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="bg-card rounded-xl border border-border/50 p-5 text-center">
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
