import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { RatingBadge } from "@/components/RatingBadge";
import { SEO, reviewSchema, faqSchema, breadcrumbSchema } from "@/components/SEO";
import { getReviewBySlug, detailedReviews } from "@/data/reviewDetails";
import { getUserExperience, getPrivacyTrust, getTips, getExtraFaqs } from "@/data/reviewExtraContent";
import { reviewSEO, buildReviewExtraMeta } from "@/data/reviewSEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, XCircle, ExternalLink, Star, Clock, Calendar, ChevronRight, ChevronDown, Zap, Users, Shield, DollarSign, Sparkles, ArrowRight, Monitor, ShieldCheck, Lightbulb, Lock, CreditCard, EyeOff, Camera } from "lucide-react";
import { useState, useMemo } from "react";
import candyAiInterface from "@/assets/candy-ai-interface.webp";
import { ReviewContent } from "@/components/ReviewContent";

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
    <a href={url} target="_blank" rel="nofollow sponsored noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 spicy-gradient text-primary-foreground font-semibold px-6 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity ${className}`}>
      Visit {name} <ExternalLink className="h-4 w-4" />
    </a>
  );
}

const featureIcons = [Zap, Users, Shield, DollarSign, Sparkles, Star];
const trustIcons = { lock: Lock, "credit-card": CreditCard, "shield-check": ShieldCheck, "eye-off": EyeOff };

const ReviewDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const review = getReviewBySlug(slug || "");
  const [tocOpen, setTocOpen] = useState(false);

  const readingTime = useMemo(() => {
    if (!review) return 0;
    if (review.readingTime) return review.readingTime;
    const text = review.overview.join(" ") + review.pros.join(" ") + review.cons.join(" ") + review.finalVerdict;
    return Math.max(5, Math.ceil(text.split(/\s+/).length / 200));
  }, [review]);

  const ux = useMemo(() => review ? getUserExperience(review) : null, [review]);
  const privacy = useMemo(() => review ? getPrivacyTrust(review) : null, [review]);
  const tips = useMemo(() => review ? getTips(review) : null, [review]);
  const extraFaqs = useMemo(() => review ? getExtraFaqs(review) : [], [review]);
  const allFaqs = useMemo(() => review ? [...review.faqs, ...extraFaqs] : [], [review, extraFaqs]);

  const tocItems = useMemo(() => {
    if (!review) return [];
    return [
      { id: "overview", label: `What is ${review.name}?` },
      { id: "features", label: "Key Features" },
      { id: "pricing", label: "Pricing & Plans" },
      { id: "user-experience", label: "User Experience & Interface" },
      { id: "rating-breakdown", label: "Our Rating Breakdown" },
      { id: "pros-cons", label: "Pros & Cons" },
      { id: "privacy-trust", label: "Privacy, Safety & Trust" },
      { id: "who-should-use", label: `Who Should Use ${review.name}?` },
      { id: "tips", label: "Tips & Best Practices" },
      { id: "alternatives", label: `${review.name} Alternatives` },
      ...(review.comparisons.length > 0 ? [{ id: "comparisons", label: `How ${review.name} Compares` }] : []),
      { id: "faq", label: "FAQ" },
      { id: "verdict", label: "Final Verdict" },
    ];
  }, [review]);

  const relatedReviews = useMemo(() => {
    if (!review) return [];
    return detailedReviews
      .filter((r) => r.slug !== review.slug && r.category === review.category)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [review]);

  const altReviews = useMemo(() => {
    if (!review) return [];
    return review.alternatives
      .map((s) => detailedReviews.find((r) => r.slug === s))
      .filter(Boolean) as typeof detailedReviews;
  }, [review]);

  if (!review) {
    return (
      <Layout>
        <SEO title="Review Not Found" description="The requested review could not be found." noindex />
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-black mb-4">Review Not Found</h1>
          <p className="text-muted-foreground mb-6">We couldn't find a review for this platform.</p>
          <Link to="/reviews" className="text-primary hover:underline font-medium">← Browse All Reviews</Link>
        </div>
      </Layout>
    );
  }

  const categorySlug = review.category.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-");

  const isCandyAi = review.slug === "candy-ai";

  // Centralized SEO config lookup
  const seoConfig = reviewSEO[review.slug];
  const seoExtraMeta = seoConfig ? buildReviewExtraMeta(seoConfig) : undefined;

  // JSON-LD schemas — use existing per-platform custom schemas if available, else generate defaults
  const defaultJsonLd = [
    reviewSchema({ name: review.name, slug: review.slug, rating: review.score, summary: review.verdict, lastUpdated: "2026-03-08", url: review.url }),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Reviews", url: "/reviews" },
      { name: `${review.name} Review`, url: `/reviews/${review.slug}` },
    ]),
    faqSchema(allFaqs),
  ];

  return (
    <Layout>
      <SEO
        title={seoConfig?.title || `${review.name} Review 2026: ${review.verdict}`}
        description={seoConfig?.description || `${review.name} review — scored ${review.score}/10. ${review.verdict}. Pricing, features, pros & cons, and alternatives.`}
        canonical={`/reviews/${review.slug}`}
        ogType="article"
        extraMeta={seoExtraMeta}
        jsonLd={defaultJsonLd}
      />

      {/* Breadcrumb */}
      <nav className="container pt-4 md:pt-6 pb-0" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
          <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <li><Link to="/reviews" className="hover:text-foreground transition-colors">Reviews</Link></li>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <li className="text-foreground font-medium">{review.name} Review</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 spicy-gradient opacity-5" />
        <div className="container py-8 md:py-14 relative">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">{review.category}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> Updated {review.lastUpdated}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 leading-tight">
                {review.name} Review 2026
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mb-3 leading-relaxed">{review.verdict}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {readingTime} min read</span>
              </div>
              <div className="mt-5 bg-card rounded-xl border border-primary/20 p-4">
                <p className="text-sm font-medium text-foreground">
                  <span className="text-primary font-bold">Quick Verdict:</span>{" "}
                  {seoConfig?.quickVerdict || review.verdict}
                </p>
              </div>
            </div>
            <div className="text-center bg-card rounded-xl border border-border/50 p-6 min-w-[140px] self-start md:self-auto">
              <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-medium">Overall Score</div>
              <div className="w-16 h-16 mx-auto rounded-full spicy-gradient flex items-center justify-center mb-2">
                <span className="text-2xl font-black text-primary-foreground">{review.score}</span>
              </div>
              <div className="text-xs text-muted-foreground">out of 10</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 md:gap-10">
          {/* Main Content */}
          <div className="space-y-10 max-w-[800px]">
            {/* Overview */}
            <section id="overview" className="scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-bold mb-4">What is {review.name}?</h2>
              <div className="space-y-4">
                {review.overview.map((p, i) => (
                  <p key={i} className="text-[15px] text-muted-foreground leading-7">{p}</p>
                ))}
              </div>
            </section>

            {/* Key Features */}
            <section id="features" className="scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-bold mb-5">Key Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {review.keyFeatures.map((f, i) => {
                  const Icon = featureIcons[i % featureIcons.length];
                  return (
                    <div key={f.title} className="bg-card rounded-xl border border-border/50 p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <h3 className="font-bold text-sm">{f.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-bold mb-5">Pricing & Plans</h2>
              {review.pricingIntro && (
                <p className="text-[15px] text-muted-foreground leading-7 mb-5">{review.pricingIntro}</p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {review.pricingDetails.map((plan) => (
                  <div key={plan.plan} className="bg-card rounded-xl border border-border/50 p-5">
                    <h3 className="font-bold text-sm mb-1">{plan.plan}</h3>
                    <p className="text-xl font-black text-primary mb-3">{plan.price}</p>
                    <ul className="space-y-1.5">
                      {plan.features.map((f) => (
                        <li key={f} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-success mt-0.5 shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {review.pricingOutro && (
                <div className="mt-5">
                  <ReviewContent content={review.pricingOutro} />
                </div>
              )}
            </section>

            {/* NEW: User Experience & Interface */}
            {ux && (
              <section id="user-experience" className="scroll-mt-24">
                <h2 className="text-xl md:text-2xl font-bold mb-5 flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-primary" /> User Experience & Interface
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-bold mb-2">Getting Started</h3>
                    <p className="text-[15px] text-muted-foreground leading-7">{ux.gettingStarted}</p>
                  </div>
                  <div>
                    <h3 className="text-base font-bold mb-2">Interface & Navigation</h3>
                    <p className="text-[15px] text-muted-foreground leading-7">{ux.interfaceNavigation}</p>
                  </div>
                  {/* Screenshot placeholder */}
                  {review.slug === "candy-ai" ? (
                    <img src={candyAiInterface} alt="Candy.ai chat interface showing AI companion conversation" className="w-full rounded-xl border border-border/50" loading="lazy" />
                  ) : (
                    <div className="w-full rounded-xl border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center py-12" style={{ aspectRatio: "16/9" }}>
                      <Camera className="h-8 w-8 text-muted-foreground/40 mb-2" />
                      <p className="text-xs text-muted-foreground/50">Screenshot coming soon</p>
                    </div>
                  )}
                  <div>
                    <h3 className="text-base font-bold mb-2">Mobile Experience</h3>
                    <p className="text-[15px] text-muted-foreground leading-7">{ux.mobileExperience}</p>
                  </div>
                </div>
              </section>
            )}

            {/* Rating Breakdown */}
            <section id="rating-breakdown" className="scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-bold mb-5">Our Rating Breakdown</h2>
              <div className="bg-card rounded-xl border border-border/50 p-5 md:p-6 space-y-4">
                {review.scores.map((s) => (
                  <div key={s.label}>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                      <span className="text-sm font-medium sm:w-40 shrink-0">{s.label}</span>
                      <div className="flex items-center gap-3 flex-1">
                        <StarRating score={s.score} />
                        <div className="flex-1 bg-secondary rounded-full h-2.5 overflow-hidden">
                          <div className="h-full spicy-gradient rounded-full transition-all duration-700" style={{ width: `${s.score * 10}%` }} />
                        </div>
                        <span className="text-sm font-bold w-10 text-right">{s.score}/10</span>
                      </div>
                    </div>
                    {s.description && (
                      <p className="text-xs text-muted-foreground mt-1.5 sm:ml-[calc(10rem+1rem)] leading-relaxed">{s.description}</p>
                    )}
                  </div>
                ))}
                <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                  <span className="font-bold text-lg">Overall Score</span>
                  <RatingBadge rating={review.score} size="lg" />
                </div>
              </div>
            </section>

            {/* Pros & Cons */}
            <section id="pros-cons" className="scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-bold mb-5">Pros & Cons</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-success/10 border border-success/20 rounded-xl p-5">
                  <h3 className="font-bold text-success mb-4 flex items-center gap-2"><CheckCircle className="h-5 w-5" /> Pros</h3>
                  <ul className="space-y-2.5">
                    {review.pros.map((p) => (
                      <li key={p} className="text-sm text-muted-foreground flex items-start gap-2.5 leading-relaxed">
                        <span className="text-success mt-0.5 shrink-0">✓</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-5">
                  <h3 className="font-bold text-destructive mb-4 flex items-center gap-2"><XCircle className="h-5 w-5" /> Cons</h3>
                  <ul className="space-y-2.5">
                    {review.cons.map((c) => (
                      <li key={c} className="text-sm text-muted-foreground flex items-start gap-2.5 leading-relaxed">
                        <span className="text-destructive mt-0.5 shrink-0">✗</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {review.prosConsNote && (
                <p className="text-[15px] text-muted-foreground leading-7 mt-5">{review.prosConsNote}</p>
              )}
            </section>

            {/* NEW: Privacy, Safety & Trust */}
            {privacy && (
              <section id="privacy-trust" className="scroll-mt-24">
                <h2 className="text-xl md:text-2xl font-bold mb-5 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" /> Privacy, Safety & Trust
                </h2>
                {review.privacyIntro && (
                  <p className="text-[15px] text-muted-foreground leading-7 mb-5">{review.privacyIntro}</p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {privacy.cards.map((card) => {
                    const TrustIcon = trustIcons[card.icon];
                    return (
                      <div key={card.title} className="rounded-xl border border-success/20 bg-success/5 p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                            <TrustIcon className="h-4 w-4 text-success" />
                          </div>
                          <h3 className="font-bold text-sm">{card.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[15px] text-muted-foreground leading-7">{privacy.analysis}</p>
              </section>
            )}

            {/* Who Should Use */}
            <section id="who-should-use" className="scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-bold mb-5">Who Should Use {review.name}?</h2>
              <div className="space-y-3">
                {review.whoShouldUse.map((w) => (
                  <div key={w.persona} className={`rounded-xl border p-4 ${w.ideal ? "bg-success/5 border-success/20" : "bg-destructive/5 border-destructive/20"}`}>
                    <div className="flex items-start gap-3">
                      {w.ideal ? <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" /> : <XCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />}
                      <div>
                        <p className="font-bold text-sm">{w.ideal ? "Perfect for:" : "Not ideal for:"} {w.persona}</p>
                        <p className="text-sm text-muted-foreground mt-1">{w.reason}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* NEW: Tips & Best Practices */}
            {tips && (
              <section id="tips" className="scroll-mt-24">
                <h2 className="text-xl md:text-2xl font-bold mb-5 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" /> Tips for Getting the Most Out of {review.name}
                </h2>
                <div className="bg-card rounded-xl border border-border/50 p-5">
                  <div className="space-y-4">
                    {tips.map((tip, i) => (
                      <div key={tip.title} className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                          <span className="text-sm font-bold text-primary-foreground">{i + 1}</span>
                        </div>
                        <div>
                          <p className="font-bold text-sm">{tip.title}</p>
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{tip.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Alternatives */}
            {altReviews.length > 0 && (
              <section id="alternatives" className="scroll-mt-24">
                <h2 className="text-xl md:text-2xl font-bold mb-5">{review.name} Alternatives</h2>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                  {altReviews.map((alt) => (
                    <Link key={alt.slug} to={`/reviews/${alt.slug}`}
                      className="group bg-card rounded-xl border border-border/50 p-5 card-hover min-w-[240px] snap-start flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{alt.category}</span>
                        <RatingBadge rating={alt.score} size="sm" />
                      </div>
                      <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{alt.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1 flex-1 line-clamp-2">{alt.bestFor}</p>
                      <span className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-3">Read Review <ArrowRight className="h-3 w-3" /></span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Comparisons */}
            {review.comparisons.length > 0 && (
              <section id="comparisons" className="scroll-mt-24">
                <h2 className="text-xl md:text-2xl font-bold mb-5">How {review.name} Compares</h2>
                <div className="space-y-3">
                  {review.comparisons.map((c) => (
                    <Link key={c.slug} to={`/compare/${c.slug}`}
                      className="block bg-card rounded-xl border border-border/50 p-4 card-hover group">
                      <span className="font-bold text-sm group-hover:text-primary transition-colors">{c.title}</span>
                      <span className="text-xs text-primary ml-2">Compare →</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ — now includes extra 4 questions */}
            <section id="faq" className="scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-bold mb-5">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="space-y-2.5">
                {allFaqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border/50 px-5">
                    <AccordionTrigger className="text-sm font-medium hover:no-underline text-left py-4">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-7">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Final Verdict */}
            <section id="verdict" className="scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-bold mb-5">Final Verdict</h2>
              <div className="bg-card rounded-xl border border-border/50 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <RatingBadge rating={review.score} size="lg" />
                  <div>
                    <p className="font-bold text-lg">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.bestFor}</p>
                  </div>
                </div>
                <p className="text-[15px] text-muted-foreground leading-7 mb-5">{review.finalVerdict}</p>
                <VisitButton name={review.name} url={review.url} />
              </div>
            </section>

            {/* Related Reviews */}
            {relatedReviews.length > 0 && (
              <section className="scroll-mt-24">
                <h2 className="text-xl md:text-2xl font-bold mb-5">Related Reviews</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedReviews.map((r) => (
                    <Link key={r.slug} to={`/reviews/${r.slug}`}
                      className="group bg-card rounded-xl border border-border/50 p-5 card-hover">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{r.category}</span>
                        <RatingBadge rating={r.score} size="sm" />
                      </div>
                      <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{r.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{r.bestFor}</p>
                      <span className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-2">Read Review <ArrowRight className="h-3 w-3" /></span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="order-first lg:order-last">
            <div className="space-y-4 lg:sticky lg:top-24">
              {/* Quick Info */}
              <div className="bg-card rounded-xl border border-border/50 p-5 text-center">
                <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏷️</span>
                </div>
                <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-medium">Our Score</div>
                <RatingBadge rating={review.score} size="lg" />
                <div className="text-xs text-muted-foreground mt-1 mb-4">out of 10</div>

                <div className="text-left space-y-3 text-sm border-t border-border/50 pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pricing</span>
                    <span className="font-medium text-right max-w-[55%]">{review.pricing}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Best For</span>
                    <span className="font-medium text-right max-w-[55%]">{review.bestFor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">{review.category}</span>
                  </div>
                </div>

                {/* Mini pros/cons */}
                <div className="text-left mt-4 pt-4 border-t border-border/50">
                  <p className="text-xs font-bold text-success mb-2">Top Pros</p>
                  {review.pros.slice(0, 3).map((p) => (
                    <p key={p} className="text-xs text-muted-foreground flex items-start gap-1.5 mb-1.5">
                      <span className="text-success shrink-0">✓</span> {p}
                    </p>
                  ))}
                  <p className="text-xs font-bold text-destructive mb-2 mt-3">Top Cons</p>
                  {review.cons.slice(0, 2).map((c) => (
                    <p key={c} className="text-xs text-muted-foreground flex items-start gap-1.5 mb-1.5">
                      <span className="text-destructive shrink-0">✗</span> {c}
                    </p>
                  ))}
                </div>

                <VisitButton name={review.name} url={review.url} className="w-full mt-4" />
              </div>

              {/* TOC - Desktop */}
              <div className="bg-card rounded-xl border border-border/50 p-5 hidden lg:block">
                <h3 className="font-bold mb-3 text-sm">Table of Contents</h3>
                <nav className="space-y-1.5">
                  {tocItems.map((item) => (
                    <a key={item.id} href={`#${item.id}`}
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1">
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* TOC - Mobile */}
              <div className="bg-card rounded-xl border border-border/50 p-4 lg:hidden">
                <button onClick={() => setTocOpen(!tocOpen)} className="flex items-center justify-between w-full text-sm font-bold">
                  Table of Contents
                  <ChevronDown className={`h-4 w-4 transition-transform ${tocOpen ? "rotate-180" : ""}`} />
                </button>
                {tocOpen && (
                  <nav className="mt-3 space-y-1.5 border-t border-border/50 pt-3">
                    {tocItems.map((item) => (
                      <a key={item.id} href={`#${item.id}`} onClick={() => setTocOpen(false)}
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1">
                        {item.label}
                      </a>
                    ))}
                  </nav>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReviewDetailPage;
