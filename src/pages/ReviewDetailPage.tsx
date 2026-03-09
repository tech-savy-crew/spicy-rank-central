import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { RatingBadge } from "@/components/RatingBadge";
import { SEO, reviewSchema, faqSchema, breadcrumbSchema } from "@/components/SEO";
import { getReviewBySlug, detailedReviews } from "@/data/reviewDetails";
import { getUserExperience, getPrivacyTrust, getTips, getExtraFaqs } from "@/data/reviewExtraContent";
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
  const isFeetFinder = review.slug === "feetfinder";
  const isOnlyFans = review.slug === "onlyfans";
  const isFansly = review.slug === "fansly";
  const isDreamGF = review.slug === "dreamgf-ai";
  const isBumble = review.slug === "bumble";
  const isChaturbate = review.slug === "chaturbate";

  const candyJsonLd = isCandyAi ? [
    {"@context":"https://schema.org","@type":"Review","name":"Candy.ai Review 2026","description":"In-depth review of Candy.ai AI girlfriend platform covering features, pricing, safety, and user experience. Tested for 30+ days.","datePublished":"2026-03-01","dateModified":"2026-03-09","author":{"@type":"Organization","name":"SpicyRanked","url":"https://spicyranked.com"},"publisher":{"@type":"Organization","name":"SpicyRanked","url":"https://spicyranked.com"},"itemReviewed":{"@type":"SoftwareApplication","name":"Candy.ai","applicationCategory":"EntertainmentApplication","operatingSystem":"Web, Android, iOS","url":"https://candy.ai","offers":{"@type":"AggregateOffer","lowPrice":"0","highPrice":"12.99","priceCurrency":"USD","offerCount":"3"}},"reviewRating":{"@type":"Rating","ratingValue":"8.3","bestRating":"10","worstRating":"0"},"positiveNotes":{"@type":"ItemList","itemListElement":[{"@type":"ListItem","position":1,"name":"Most realistic AI conversations in the market"},{"@type":"ListItem","position":2,"name":"Excellent AI image generation quality"},{"@type":"ListItem","position":3,"name":"Deep personality customization options"},{"@type":"ListItem","position":4,"name":"Strong conversation memory and continuity"},{"@type":"ListItem","position":5,"name":"Clean interface on desktop and mobile"}]},"negativeNotes":{"@type":"ItemList","itemListElement":[{"@type":"ListItem","position":1,"name":"Premium pricing higher than some competitors"},{"@type":"ListItem","position":2,"name":"Free tier is very limited"},{"@type":"ListItem","position":3,"name":"No video generation yet"}]}},
    {"@context":"https://schema.org","@type":"FAQPage","mainEntity":allFaqs.map(f => ({"@type":"Question","name":f.question,"acceptedAnswer":{"@type":"Answer","text":f.answer}}))},
    {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://spicyranked.com/"},{"@type":"ListItem","position":2,"name":"Reviews","item":"https://spicyranked.com/reviews"},{"@type":"ListItem","position":3,"name":"Candy.ai Review","item":"https://spicyranked.com/reviews/candy-ai"}]},
    {"@context":"https://schema.org","@type":"SoftwareApplication","name":"Candy.ai","applicationCategory":"EntertainmentApplication","operatingSystem":"Web, Android, iOS","url":"https://candy.ai","description":"AI girlfriend platform with deep customization, realistic conversations, AI image generation, and voice messages.","offers":[{"@type":"Offer","name":"Free Trial","price":"0","priceCurrency":"USD"},{"@type":"Offer","name":"Premium Monthly","price":"12.99","priceCurrency":"USD"},{"@type":"Offer","name":"Annual Plan","price":"71.88","priceCurrency":"USD"}],"aggregateRating":{"@type":"AggregateRating","ratingValue":"8.3","bestRating":"10","worstRating":"0","ratingCount":"1","reviewCount":"1"}}
  ] : undefined;

  const feetFinderJsonLd = isFeetFinder ? [
    {"@context":"https://schema.org","@type":"Review","name":"FeetFinder Review 2026","description":"Honest review of FeetFinder feet content marketplace covering pricing, seller income, safety, and alternatives. Tested from both buyer and seller sides.","datePublished":"2026-03-01","dateModified":"2026-03-09","author":{"@type":"Organization","name":"SpicyRanked","url":"https://spicyranked.com"},"publisher":{"@type":"Organization","name":"SpicyRanked","url":"https://spicyranked.com"},"itemReviewed":{"@type":"SoftwareApplication","name":"FeetFinder","applicationCategory":"LifestyleApplication","operatingSystem":"Web, Android, iOS","url":"https://feetfinder.com","offers":{"@type":"AggregateOffer","lowPrice":"4.99","highPrice":"14.99","priceCurrency":"USD","offerCount":"3"}},"reviewRating":{"@type":"Rating","ratingValue":"8.0","bestRating":"10","worstRating":"0"},"positiveNotes":{"@type":"ItemList","itemListElement":[{"@type":"ListItem","position":1,"name":"Largest buyer base in feet content niche"},{"@type":"ListItem","position":2,"name":"Strong identity verification for all users"},{"@type":"ListItem","position":3,"name":"Reliable payment processing"},{"@type":"ListItem","position":4,"name":"Content protection via watermarking and DMCA"},{"@type":"ListItem","position":5,"name":"Established reputation and brand recognition"}]},"negativeNotes":{"@type":"ItemList","itemListElement":[{"@type":"ListItem","position":1,"name":"Subscription fee required for sellers"},{"@type":"ListItem","position":2,"name":"20% commission on top of subscription"},{"@type":"ListItem","position":3,"name":"High seller competition"}]}},
    {"@context":"https://schema.org","@type":"FAQPage","mainEntity":allFaqs.map(f => ({"@type":"Question","name":f.question,"acceptedAnswer":{"@type":"Answer","text":f.answer}}))},
    {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://spicyranked.com/"},{"@type":"ListItem","position":2,"name":"Reviews","item":"https://spicyranked.com/reviews"},{"@type":"ListItem","position":3,"name":"FeetFinder Review","item":"https://spicyranked.com/reviews/feetfinder"}]},
    {"@context":"https://schema.org","@type":"SoftwareApplication","name":"FeetFinder","applicationCategory":"LifestyleApplication","operatingSystem":"Web, Android, iOS","url":"https://feetfinder.com","description":"The largest dedicated marketplace for buying and selling feet content online.","offers":[{"@type":"Offer","name":"Buyer","price":"0","priceCurrency":"USD"},{"@type":"Offer","name":"Seller Basic","price":"4.99","priceCurrency":"USD"},{"@type":"Offer","name":"Seller Premium","price":"14.99","priceCurrency":"USD"}],"aggregateRating":{"@type":"AggregateRating","ratingValue":"8.0","bestRating":"10","worstRating":"0","ratingCount":"1","reviewCount":"1"}}
  ] : undefined;

  const onlyFansJsonLd = isOnlyFans ? [
    {"@context":"https://schema.org","@type":"Review","name":"OnlyFans Review 2026","description":"Honest OnlyFans review covering pricing, creator earnings, safety, features, and alternatives. Tested as both creator and subscriber for 60+ days.","datePublished":"2026-03-01","dateModified":"2026-03-09","author":{"@type":"Organization","name":"SpicyRanked","url":"https://spicyranked.com"},"publisher":{"@type":"Organization","name":"SpicyRanked","url":"https://spicyranked.com"},"itemReviewed":{"@type":"SoftwareApplication","name":"OnlyFans","applicationCategory":"EntertainmentApplication","operatingSystem":"Web","url":"https://onlyfans.com","offers":{"@type":"AggregateOffer","lowPrice":"0","highPrice":"49.99","priceCurrency":"USD","offerCount":"3"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"8.5","bestRating":"10","worstRating":"0","ratingCount":"1","reviewCount":"1"}},"reviewRating":{"@type":"Rating","ratingValue":"8.5","bestRating":"10","worstRating":"0"},"positiveNotes":{"@type":"ItemList","itemListElement":[{"@type":"ListItem","position":1,"name":"Largest audience — 300M+ registered users"},{"@type":"ListItem","position":2,"name":"Highest brand recognition in creator economy"},{"@type":"ListItem","position":3,"name":"Multiple monetization methods"},{"@type":"ListItem","position":4,"name":"Strong privacy with no public discovery"},{"@type":"ListItem","position":5,"name":"80% creator payout rate"},{"@type":"ListItem","position":6,"name":"Reliable payment processing"}]},"negativeNotes":{"@type":"ItemList","itemListElement":[{"@type":"ListItem","position":1,"name":"No content discovery or recommendation"},{"@type":"ListItem","position":2,"name":"20% commission higher than some competitors"},{"@type":"ListItem","position":3,"name":"No native mobile app"}]}},
    {"@context":"https://schema.org","@type":"FAQPage","mainEntity":allFaqs.map(f => ({"@type":"Question","name":f.question,"acceptedAnswer":{"@type":"Answer","text":f.answer}}))},
    {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://spicyranked.com/"},{"@type":"ListItem","position":2,"name":"Reviews","item":"https://spicyranked.com/reviews"},{"@type":"ListItem","position":3,"name":"OnlyFans Review","item":"https://spicyranked.com/reviews/onlyfans"}]}
  ] : undefined;

  const fanslyJsonLd = isFansly ? [
    {"@context":"https://schema.org","@type":"Review","name":"Fansly Review 2026","description":"Honest Fansly review covering pricing, creator earnings, content discovery, features, and OnlyFans comparison. Tested 45+ days as creator and subscriber.","datePublished":"2026-03-01","dateModified":"2026-03-09","author":{"@type":"Organization","name":"SpicyRanked","url":"https://spicyranked.com"},"publisher":{"@type":"Organization","name":"SpicyRanked","url":"https://spicyranked.com"},"itemReviewed":{"@type":"SoftwareApplication","name":"Fansly","applicationCategory":"EntertainmentApplication","operatingSystem":"Web","url":"https://fansly.com","offers":{"@type":"AggregateOffer","lowPrice":"0","highPrice":"49.99","priceCurrency":"USD","offerCount":"3"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"8.2","bestRating":"10","worstRating":"0","ratingCount":"1","reviewCount":"1"}},"reviewRating":{"@type":"Rating","ratingValue":"8.2","bestRating":"10","worstRating":"0"},"positiveNotes":{"@type":"ItemList","itemListElement":[{"@type":"ListItem","position":1,"name":"Built-in content discovery and explore page"},{"@type":"ListItem","position":2,"name":"Multi-tier subscription pricing flexibility"},{"@type":"ListItem","position":3,"name":"Superior content organization"},{"@type":"ListItem","position":4,"name":"More modern interface than OnlyFans"},{"@type":"ListItem","position":5,"name":"Advanced creator analytics"}]},"negativeNotes":{"@type":"ItemList","itemListElement":[{"@type":"ListItem","position":1,"name":"Smaller subscriber base than OnlyFans"},{"@type":"ListItem","position":2,"name":"$100 minimum payout threshold"},{"@type":"ListItem","position":3,"name":"Same 20% commission as OnlyFans"}]}},
    {"@context":"https://schema.org","@type":"FAQPage","mainEntity":allFaqs.map(f => ({"@type":"Question","name":f.question,"acceptedAnswer":{"@type":"Answer","text":f.answer}}))},
    {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://spicyranked.com/"},{"@type":"ListItem","position":2,"name":"Reviews","item":"https://spicyranked.com/reviews"},{"@type":"ListItem","position":3,"name":"Fansly Review","item":"https://spicyranked.com/reviews/fansly"}]}
  ] : undefined;

  const dreamGFJsonLd = isDreamGF ? [
    {"@context":"https://schema.org","@type":"Review","name":"DreamGF.ai Review 2026","description":"Honest DreamGF.ai review covering AI image generation, pricing, NSFW features, and alternatives. Tested 30+ days.","datePublished":"2026-03-01","dateModified":"2026-03-09","author":{"@type":"Organization","name":"SpicyRanked","url":"https://spicyranked.com"},"publisher":{"@type":"Organization","name":"SpicyRanked","url":"https://spicyranked.com"},"itemReviewed":{"@type":"SoftwareApplication","name":"DreamGF.ai","applicationCategory":"EntertainmentApplication","operatingSystem":"Web","url":"https://dreamgf.ai","offers":{"@type":"AggregateOffer","lowPrice":"0","highPrice":"49.99","priceCurrency":"USD","offerCount":"4"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"7.8","bestRating":"10","worstRating":"0","ratingCount":"1","reviewCount":"1"}},"reviewRating":{"@type":"Rating","ratingValue":"7.8","bestRating":"10","worstRating":"0"},"positiveNotes":{"@type":"ItemList","itemListElement":[{"@type":"ListItem","position":1,"name":"Outstanding AI image generation quality"},{"@type":"ListItem","position":2,"name":"Strong character consistency"},{"@type":"ListItem","position":3,"name":"Intuitive visual character builder"},{"@type":"ListItem","position":4,"name":"Unrestricted NSFW for premium users"},{"@type":"ListItem","position":5,"name":"Multiple AI girlfriend support"}]},"negativeNotes":{"@type":"ItemList","itemListElement":[{"@type":"ListItem","position":1,"name":"Conversation AI lags behind competitors"},{"@type":"ListItem","position":2,"name":"No voice or audio features"},{"@type":"ListItem","position":3,"name":"Gold tier pricing is expensive"}]}},
    {"@context":"https://schema.org","@type":"FAQPage","mainEntity":allFaqs.map(f => ({"@type":"Question","name":f.question,"acceptedAnswer":{"@type":"Answer","text":f.answer}}))},
    {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://spicyranked.com/"},{"@type":"ListItem","position":2,"name":"Reviews","item":"https://spicyranked.com/reviews"},{"@type":"ListItem","position":3,"name":"DreamGF.ai Review","item":"https://spicyranked.com/reviews/dreamgf-ai"}]}
  ] : undefined;

  const bumbleJsonLd = isBumble ? [
    {"@context":"https://schema.org","@type":"Review","name":"Bumble Review 2026","description":"Honest Bumble dating app review covering premium pricing, features, safety, and alternatives. Tested 60+ days with real matches.","datePublished":"2026-03-01","dateModified":"2026-03-09","author":{"@type":"Organization","name":"SpicyRanked","url":"https://spicyranked.com"},"publisher":{"@type":"Organization","name":"SpicyRanked","url":"https://spicyranked.com"},"itemReviewed":{"@type":"SoftwareApplication","name":"Bumble","applicationCategory":"LifestyleApplication","operatingSystem":"iOS, Android","url":"https://bumble.com","offers":{"@type":"AggregateOffer","lowPrice":"0","highPrice":"54.99","priceCurrency":"USD","offerCount":"3"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"8.0","bestRating":"10","worstRating":"0","ratingCount":"1","reviewCount":"1"}},"reviewRating":{"@type":"Rating","ratingValue":"8.0","bestRating":"10","worstRating":"0"},"positiveNotes":{"@type":"ItemList","itemListElement":[{"@type":"ListItem","position":1,"name":"Women-first model creates safer environment"},{"@type":"ListItem","position":2,"name":"Higher profile quality than Tinder"},{"@type":"ListItem","position":3,"name":"Clean modern interface"},{"@type":"ListItem","position":4,"name":"Strong safety features with verification"},{"@type":"ListItem","position":5,"name":"Multi-purpose with BFF and Bizz"}]},"negativeNotes":{"@type":"ItemList","itemListElement":[{"@type":"ListItem","position":1,"name":"Premium pricing expensive at $39.99/month"},{"@type":"ListItem","position":2,"name":"Free experience increasingly limited"},{"@type":"ListItem","position":3,"name":"Smaller user base than Tinder outside major cities"}]}},
    {"@context":"https://schema.org","@type":"FAQPage","mainEntity":allFaqs.map(f => ({"@type":"Question","name":f.question,"acceptedAnswer":{"@type":"Answer","text":f.answer}}))},
    {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://spicyranked.com/"},{"@type":"ListItem","position":2,"name":"Reviews","item":"https://spicyranked.com/reviews"},{"@type":"ListItem","position":3,"name":"Bumble Review","item":"https://spicyranked.com/reviews/bumble"}]}
  ] : undefined;

  const chaturbateJsonLd = isChaturbate ? [
    {"@context":"https://schema.org","@type":"Review","name":"Chaturbate Review 2026","description":"Honest Chaturbate review covering free cams, token pricing, model earnings, safety, and alternatives. Tested 45+ days.","datePublished":"2026-03-01","dateModified":"2026-03-09","author":{"@type":"Organization","name":"SpicyRanked","url":"https://spicyranked.com"},"publisher":{"@type":"Organization","name":"SpicyRanked","url":"https://spicyranked.com"},"itemReviewed":{"@type":"SoftwareApplication","name":"Chaturbate","applicationCategory":"EntertainmentApplication","operatingSystem":"Web","url":"https://chaturbate.com","aggregateRating":{"@type":"AggregateRating","ratingValue":"7.8","bestRating":"10","worstRating":"0","ratingCount":"1","reviewCount":"1"}},"reviewRating":{"@type":"Rating","ratingValue":"7.8","bestRating":"10","worstRating":"0"},"positiveNotes":{"@type":"ItemList","itemListElement":[{"@type":"ListItem","position":1,"name":"Largest free cam site with unmatched traffic"},{"@type":"ListItem","position":2,"name":"Completely free viewing without subscription"},{"@type":"ListItem","position":3,"name":"Interactive toy integration"},{"@type":"ListItem","position":4,"name":"Open broadcasting model"},{"@type":"ListItem","position":5,"name":"Comprehensive tip menu and goal systems"}]},"negativeNotes":{"@type":"ItemList","itemListElement":[{"@type":"ListItem","position":1,"name":"Visually outdated interface"},{"@type":"ListItem","position":2,"name":"40-50% platform cut is high"},{"@type":"ListItem","position":3,"name":"Unpredictable performer income"}]}},
    {"@context":"https://schema.org","@type":"FAQPage","mainEntity":allFaqs.map(f => ({"@type":"Question","name":f.question,"acceptedAnswer":{"@type":"Answer","text":f.answer}}))},
    {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://spicyranked.com/"},{"@type":"ListItem","position":2,"name":"Reviews","item":"https://spicyranked.com/reviews"},{"@type":"ListItem","position":3,"name":"Chaturbate Review","item":"https://spicyranked.com/reviews/chaturbate"}]}
  ] : undefined;

  const customJsonLd = candyJsonLd || feetFinderJsonLd || onlyFansJsonLd || fanslyJsonLd || dreamGFJsonLd || bumbleJsonLd || chaturbateJsonLd;

  return (
    <Layout>
      <SEO
        title={isCandyAi ? "Candy.ai Review 2026: Is It Worth It? Honest Rating & Pricing" : isFeetFinder ? "FeetFinder Review 2026: Is It Legit? Honest Seller & Buyer Rating" : isOnlyFans ? "OnlyFans Review 2026: Is It Still Worth It for Creators & Fans?" : isFansly ? "Fansly Review 2026: Is It Better Than OnlyFans? Honest Creator Rating" : isDreamGF ? "DreamGF.ai Review 2026: Is This AI Girlfriend App Worth It?" : isBumble ? "Bumble Review 2026: Is It Worth It? Honest Dating App Rating" : isChaturbate ? "Chaturbate Review 2026: Is It Still the Best Free Cam Site?" : `${review.name} Review 2026: ${review.verdict}`}
        description={isCandyAi ? "Our in-depth Candy.ai review covers pricing, features, safety, and whether this AI girlfriend app is legit. Tested for 30+ days. See our honest 8.3/10 rating." : isFeetFinder ? "Our honest FeetFinder review covers pricing, seller income, safety, and whether FeetFinder is legit. Tested from both seller and buyer sides. 8.0/10 rating." : isOnlyFans ? "Honest OnlyFans review for both creators and subscribers. We cover pricing, creator earnings, safety, features, and whether OnlyFans is still worth it in 2026. Rated 8.5/10." : isFansly ? "Our honest Fansly review covers pricing, creator earnings, content discovery, and how it compares to OnlyFans. Tested for 45+ days as creator and subscriber. Rated 8.2/10." : isDreamGF ? "Our honest DreamGF.ai review covers AI image generation, pricing, NSFW features, and how it compares to Candy.ai. Tested for 30+ days. Rated 7.8/10 by SpicyRanked." : isBumble ? "Our honest Bumble review covers premium pricing, features, safety, and how it compares to Tinder. Tested for 60+ days with real matches. Rated 8.0/10 by SpicyRanked." : isChaturbate ? "Honest Chaturbate review covering free cams, token pricing, model earnings, safety, and alternatives. Tested for 45+ days. Rated 7.8/10." : `${review.name} review — scored ${review.score}/10. ${review.verdict}. Pricing, features, pros & cons, and alternatives.`}
        canonical={`/reviews/${review.slug}`}
        ogType="article"
        extraMeta={isCandyAi ? [
          { name: "keywords", content: "candy ai review, candy.ai review, is candy ai safe, is candy ai legit, candy ai pricing, candy ai free, candy ai app, candy ai cost, is candy ai free, candy ai chat, what is candy ai, candy ai alternatives, is candy.ai worth it, candy ai girlfriend, candy ai nsfw, candy ai features, candy ai premium" },
          { name: "author", content: "SpicyRanked" },
          { property: "og:image:alt", content: "Candy.ai Review 2026 - SpicyRanked Rating 8.3/10" },
          { property: "article:published_time", content: "2026-03-01T00:00:00Z" },
          { property: "article:modified_time", content: "2026-03-09T00:00:00Z" },
          { property: "article:section", content: "AI Companions" },
          { property: "article:tag", content: "candy ai, ai girlfriend, ai companion, nsfw ai" },
        ] : isFeetFinder ? [
          { name: "keywords", content: "feetfinder review, feetfinder reviews, is feetfinder legit, feetfinder income, feetfinder pricing, feetfinder fees, feetfinder app, feetfinder seller reviews, is feetfinder safe, feetfinder alternatives, feetfinder bio, feetfinder names, how to sell on feetfinder, feetfinder salary, feetfinder pay" },
          { name: "author", content: "SpicyRanked" },
          { property: "og:title", content: "FeetFinder Review 2026 — Is This Feet Pic Marketplace Legit?" },
          { property: "og:description", content: "We tested FeetFinder as both a buyer and seller. Full review of fees, income potential, safety, and alternatives. Rated 8.0/10." },
          { property: "article:published_time", content: "2026-03-01T00:00:00Z" },
          { property: "article:modified_time", content: "2026-03-09T00:00:00Z" },
          { property: "article:section", content: "Creator Platforms" },
        ] : isOnlyFans ? [
          { name: "keywords", content: "onlyfans review, onlyfans reviews, is onlyfans worth it, how does onlyfans work, onlyfans pricing, onlyfans app, onlyfans free, is onlyfans safe, onlyfans creator, onlyfans alternatives, onlyfans earnings, onlyfans subscription, onlyfans cost, onlyfans payout, is onlyfans legit, onlyfans tips" },
          { name: "author", content: "SpicyRanked" },
          { property: "og:title", content: "OnlyFans Review 2026 — Still the Best Creator Platform?" },
          { property: "og:description", content: "We tested OnlyFans for 60+ days as both creator and subscriber. Full review of earnings, pricing, features, and alternatives. Rated 8.5/10." },
          { property: "article:published_time", content: "2026-03-01T00:00:00Z" },
          { property: "article:modified_time", content: "2026-03-09T00:00:00Z" },
          { property: "article:section", content: "Creator Platforms" },
        ] : isFansly ? [
          { name: "keywords", content: "fansly review, fansly reviews, what is fansly, fansly vs onlyfans, fansly app, fansly pricing, fansly creator, is fansly safe, is fansly legit, fansly alternatives, fansly features, free fansly, fansly cost, fansly subscription, fansly payout, is fansly worth it, fansly tips" },
          { name: "author", content: "SpicyRanked" },
          { property: "og:title", content: "Fansly Review 2026 — Better Than OnlyFans for Creators?" },
          { property: "og:description", content: "We tested Fansly for 45+ days as both creator and subscriber. Full review of pricing, discovery, features, and OnlyFans comparison. Rated 8.2/10." },
          { property: "article:published_time", content: "2026-03-01T00:00:00Z" },
          { property: "article:modified_time", content: "2026-03-09T00:00:00Z" },
          { property: "article:section", content: "Creator Platforms" },
        ] : isDreamGF ? [
          { name: "keywords", content: "dreamgf review, dreamgf ai review, dreamgf ai, dreamgf pricing, dreamgf app, dreamgf nsfw, dreamgf ai girlfriend, dreamgf alternatives, dreamgf promo code, dreamgf ai pricing, dreamgf free, is dreamgf legit, is dreamgf safe, dreamgf ai nsfw, dreamgf cost" },
          { name: "author", content: "SpicyRanked" },
          { property: "og:title", content: "DreamGF.ai Review 2026 — Best AI Girlfriend for Image Generation?" },
          { property: "og:description", content: "We tested DreamGF.ai for 30+ days. Full review of AI image generation, pricing, NSFW features, and Candy.ai comparison. 7.8/10." },
          { property: "article:published_time", content: "2026-03-01T00:00:00Z" },
          { property: "article:modified_time", content: "2026-03-09T00:00:00Z" },
          { property: "article:section", content: "AI Companions" },
        ] : isBumble ? [
          { name: "keywords", content: "bumble review, bumble app review, bumble dating app, is bumble worth it, bumble premium, bumble cost, bumble pricing, is bumble free, bumble vs tinder, bumble features, is bumble safe, bumble subscription, bumble alternatives, bumble tips, how does bumble work, bumble boost, bumble superswipe" },
          { name: "author", content: "SpicyRanked" },
          { property: "og:title", content: "Bumble Review 2026 — Best Dating App for Serious Connections?" },
          { property: "og:description", content: "We tested Bumble for 60+ days with real matches. Full review of premium pricing, features, safety, and Tinder comparison. 8.0/10." },
          { property: "article:published_time", content: "2026-03-01T00:00:00Z" },
          { property: "article:modified_time", content: "2026-03-09T00:00:00Z" },
          { property: "article:section", content: "Dating & Hookup Apps" },
        ] : undefined}
        jsonLd={customJsonLd || [
          reviewSchema({ name: review.name, slug: review.slug, rating: review.score, summary: review.verdict, lastUpdated: "2026-03-08", url: review.url }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Reviews", url: "/reviews" },
            { name: `${review.name} Review`, url: `/reviews/${review.slug}` },
          ]),
          faqSchema(allFaqs),
        ]}
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
                  {isCandyAi
                    ? "Candy.ai is the best AI girlfriend platform we tested in 2026. Realistic conversations, excellent image generation, and deep personality customization earn it our top rating of 8.3/10 — though premium pricing may not suit every budget."
                    : isFeetFinder
                    ? "FeetFinder is the most established feet content marketplace with a massive buyer base, verified profiles, and strong safety features. At 8.0/10, it earns our recommendation for serious sellers — though the subscription fees and high competition mean beginners need a solid strategy to succeed."
                    : isOnlyFans
                    ? "OnlyFans remains the most recognized creator platform in 2026, with the largest audience and highest earning potential for established creators. At 8.5/10, we rate it as the best overall creator platform — but the 20% commission, increasing competition, and lack of content discovery mean newer creators may struggle without an existing audience."
                    : isFansly
                    ? "Fansly is the strongest OnlyFans alternative available in 2026. Better content discovery, flexible subscription tiers, and a growing creator community earn it an 8.2/10 rating. While its audience is still smaller than OnlyFans, Fansly's creator-first approach and discovery features make it the better choice for new creators building from scratch."
                    : isDreamGF
                    ? "DreamGF.ai excels at visual AI companion creation with some of the best image generation in the space. At 7.8/10, it earns our recommendation for users who prioritize visuals over conversation depth. The character builder is intuitive, NSFW content is unrestricted, and pricing is competitive — but conversation quality still trails behind Candy.ai."
                    : isBumble
                    ? "Bumble remains one of the best dating apps in 2026 thanks to its women-first messaging model, clean design, and strong safety features. At 8.0/10, we recommend it for anyone serious about finding real connections — though Bumble Premium pricing has gotten expensive and the free experience is increasingly limited."
                    : review.verdict}
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
