import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SEO, itemListSchema, breadcrumbSchema, faqSchema } from "@/components/SEO";
import { RatingBadge } from "@/components/RatingBadge";
import { getBestListBySlug, getBestListPlatforms, bestLists } from "@/data/bestListsData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, XCircle, ExternalLink, ArrowRight, Calendar, ChevronRight, Award } from "lucide-react";

const BestListDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const list = getBestListBySlug(slug || "");

  if (!list) {
    return (
      <Layout>
        <SEO title="List Not Found" description="The requested list could not be found." noindex />
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-black mb-4">List Not Found</h1>
          <Link to="/reviews" className="text-primary hover:underline">← Browse All Reviews</Link>
        </div>
      </Layout>
    );
  }

  const platforms = getBestListPlatforms(list);
  const top3 = platforms.slice(0, 3);

  return (
    <Layout>
      <SEO
        title={list.title}
        description={list.subtitle.slice(0, 155)}
        canonical={`/best-lists/${list.slug}`}
        jsonLd={[
          itemListSchema(list.title, platforms.map((p) => ({ name: p.name, url: `/reviews/${p.slug}`, position: p.rank }))),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Best Lists", url: "/reviews" },
            { name: list.title, url: `/best-lists/${list.slug}` },
          ]),
          ...(list.faqs.length > 0 ? [faqSchema(list.faqs)] : []),
        ]}
      />

      <div className="container max-w-4xl py-8 md:py-12 px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6 flex-wrap">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/reviews" className="hover:text-primary transition-colors">Reviews</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium truncate">{list.title}</span>
        </nav>

        {/* Header */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 leading-tight">{list.title}</h1>
        <p className="text-muted-foreground mb-4 leading-relaxed text-[15px]">{list.subtitle}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Calendar className="h-3.5 w-3.5" /> Updated March 2026
        </div>

        {/* Quick Picks */}
        <div className="bg-card rounded-xl border border-primary/20 p-5 mb-10">
          <h2 className="font-bold text-sm text-primary mb-4 flex items-center gap-2"><Award className="h-4 w-4" /> Our Top 3 Picks</h2>
          <div className="space-y-3">
            {top3.map((p) => (
              <Link key={p.slug} to={`/reviews/${p.slug}`} className="flex items-center gap-3 group">
                <span className="w-7 h-7 rounded-full spicy-gradient flex items-center justify-center text-xs font-black text-primary-foreground shrink-0">{p.rank}</span>
                <span className="font-bold text-sm group-hover:text-primary transition-colors flex-1">{p.name}</span>
                <RatingBadge rating={p.score} size="sm" />
              </Link>
            ))}
          </div>
        </div>

        {/* Platform List */}
        <div className="space-y-8 mb-12">
          {platforms.map((p) => (
            <section key={p.slug} className="bg-card rounded-xl border border-border/50 overflow-hidden">
              <div className="p-5 md:p-6">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-3xl font-black text-primary/30 leading-none">#{p.rank}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <h2 className="text-lg font-bold">{p.name}</h2>
                      <RatingBadge rating={p.score} size="sm" />
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{p.category}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{p.bestFor}</p>
                  </div>
                </div>

                {/* Overview */}
                {p.overview.slice(0, 2).map((text, i) => (
                  <p key={i} className="text-sm text-muted-foreground leading-7 mb-3">{text}</p>
                ))}

                {/* Pros/Cons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                  <div>
                    <p className="text-xs font-bold text-success mb-2">Pros</p>
                    {p.pros.slice(0, 3).map((pro) => (
                      <p key={pro} className="text-xs text-muted-foreground flex items-start gap-1.5 mb-1.5">
                        <span className="text-success shrink-0">✓</span> {pro}
                      </p>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-destructive mb-2">Cons</p>
                    {p.cons.slice(0, 2).map((con) => (
                      <p key={con} className="text-xs text-muted-foreground flex items-start gap-1.5 mb-1.5">
                        <span className="text-destructive shrink-0">✗</span> {con}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <p className="text-sm text-muted-foreground mb-4">
                  <span className="font-medium text-foreground">Pricing:</span> {p.pricing}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <Link to={`/reviews/${p.slug}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                    Read Full Review <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <a href={p.url} target="_blank" rel="nofollow sponsored noopener noreferrer"
                    className="inline-flex items-center gap-1.5 spicy-gradient text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90">
                    Visit {p.name} <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Comparison Table */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Quick Comparison</h2>
          <div className="rounded-xl border border-border/50 overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead>
                <tr className="bg-secondary/70">
                  <th className="px-4 py-3 text-left font-semibold">Rank</th>
                  <th className="px-4 py-3 text-left font-semibold">Platform</th>
                  <th className="px-4 py-3 text-center font-semibold">Score</th>
                  <th className="px-4 py-3 text-left font-semibold">Pricing</th>
                  <th className="px-4 py-3 text-left font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody>
                {platforms.map((p, i) => (
                  <tr key={p.slug} className={`border-t border-border/40 ${i % 2 === 0 ? "bg-card" : "bg-secondary/20"}`}>
                    <td className="px-4 py-3 font-bold text-primary">#{p.rank}</td>
                    <td className="px-4 py-3">
                      <Link to={`/reviews/${p.slug}`} className="font-medium hover:text-primary transition-colors">{p.name}</Link>
                    </td>
                    <td className="px-4 py-3 text-center"><RatingBadge rating={p.score} size="sm" /></td>
                    <td className="px-4 py-3 text-muted-foreground">{p.pricing}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How We Ranked */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">How We Ranked</h2>
          <div className="bg-card rounded-xl border border-border/50 p-5">
            <p className="text-sm text-muted-foreground leading-7">
              Every platform is evaluated across five key categories: Content Quality, User Interface, Value for Money,
              Privacy & Safety, and Features. Each category is scored on a 10-point scale by our editorial team based on
              hands-on testing, creator/user interviews, and ongoing monitoring. The overall score is a weighted average
              that reflects real-world usability and value. Rankings are updated monthly.
            </p>
          </div>
        </section>

        {/* FAQ */}
        {list.faqs.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="space-y-2">
              {list.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border/50 px-5">
                  <AccordionTrigger className="text-sm font-medium hover:no-underline text-left py-4">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-7">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}

        {/* Related Lists */}
        <section>
          <h2 className="text-xl font-bold mb-4">More Best Lists</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bestLists.filter((l) => l.slug !== list.slug).slice(0, 4).map((l) => (
              <Link key={l.slug} to={`/best-lists/${l.slug}`}
                className="bg-card rounded-xl border border-border/50 p-4 card-hover group">
                <p className="font-bold text-sm group-hover:text-primary transition-colors">{l.title}</p>
                <span className="text-xs text-primary font-medium mt-2 inline-flex items-center gap-1">View List <ArrowRight className="h-3 w-3" /></span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default BestListDetailPage;
