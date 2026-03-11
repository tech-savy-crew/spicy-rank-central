import { getReviewBySlug, DetailedReview } from "./reviewDetails";

export interface BestList {
  slug: string;
  title: string;
  subtitle: string;
  faqs: { question: string; answer: string }[];
  platformSlugs: string[];
}

export const bestLists: BestList[] = [
  {
    slug: "best-onlyfans-alternatives",
    title: "Best OnlyFans Alternatives in 2026",
    subtitle: "OnlyFans dominates the creator economy, but rising fees and increasing competition mean creators have better options than ever. We tested every major alternative to help you find the best platform for your content and audience.",
    platformSlugs: ["fansly", "fanvue", "patreon", "feetfinder"],
    faqs: [
      { question: "What is the best OnlyFans alternative in 2026?", answer: "Fansly is the best overall OnlyFans alternative, offering comparable features with better content discovery and organization tools." },
      { question: "Which OnlyFans alternative pays creators the most?", answer: "FanVue offers the highest creator payout at 85% (15% commission), compared to OnlyFans and Fansly at 80%." },
      { question: "Can I use multiple creator platforms at once?", answer: "Yes, most creators cross-post on 2-3 platforms to maximize revenue and audience reach." },
      { question: "Are OnlyFans alternatives safe for creators?", answer: "All platforms listed here offer identity verification, secure payments, and content protection. Always read the terms of service before joining." },
    ],
  },
  {
    slug: "best-chaturbate-alternatives",
    title: "Best Chaturbate Alternatives in 2026",
    subtitle: "Chaturbate is the biggest free cam site, but it's not the only option. Whether you want higher video quality, better privacy, or different performer styles, these alternatives deliver.",
    platformSlugs: ["stripchat", "livejasmin", "jerkmate", "camsoda", "flirt4free", "bongacams"],
    faqs: [
      { question: "What is the best Chaturbate alternative?", answer: "Stripchat is the strongest overall alternative with VR support, AI recommendations, and a modern interface." },
      { question: "Which cam site has the best free shows?", answer: "BongaCams and CamSoda both offer extensive free content with optional token tipping." },
      { question: "Are these cam sites safe?", answer: "All listed sites use secure payment processing and offer anonymous viewing options. Always use a unique username and strong password." },
      { question: "Which cam site has the best video quality?", answer: "LiveJasmin consistently offers the highest HD stream quality with professional-grade performer setups." },
    ],
  },
  {
    slug: "best-ai-girlfriend-apps",
    title: "Best AI Girlfriend Apps in 2026 — Ranked",
    subtitle: "AI companions have evolved dramatically, offering realistic conversations, image generation, and emotional intelligence. We tested every major platform to rank the best AI girlfriend apps available today.",
    platformSlugs: ["candy-ai", "dreamgf-ai", "crushon-ai", "girlfriendgpt", "replika"],
    faqs: [
      { question: "What is the best AI girlfriend app?", answer: "Candy.ai is the best overall AI girlfriend app with superior conversation quality, deep customization, and AI image generation." },
      { question: "Are AI girlfriend apps safe?", answer: "Reputable apps like Candy.ai and Replika use encryption and don't share personal data. Always review privacy policies before sharing sensitive information." },
      { question: "Are there free AI girlfriend apps?", answer: "Most apps offer free tiers with limited features. CrushOn.ai has one of the most generous free tiers with 50 daily messages." },
      { question: "Can AI girlfriends remember conversations?", answer: "Yes, most premium AI companions have memory features that remember past interactions and build on shared experiences." },
    ],
  },
  {
    slug: "best-free-cam-sites",
    title: "Best Free Cam Sites in 2026 — Ranked",
    subtitle: "You don't need to spend money to enjoy live cam shows. These sites offer genuine free content with optional tipping. We ranked them by free content quality, performer variety, and user experience.",
    platformSlugs: ["chaturbate", "stripchat", "bongacams", "camsoda", "jerkmate", "livejasmin", "flirt4free"],
    faqs: [
      { question: "Are free cam sites really free?", answer: "Yes, all listed sites offer free public shows. Tokens/credits are optional for tipping, private shows, or interactive features." },
      { question: "Which free cam site has the most performers?", answer: "Chaturbate has the most performers online at any given time, followed by Stripchat." },
      { question: "Are free cam sites safe?", answer: "Yes, these sites use secure connections and don't require payment for basic viewing. Use an ad blocker for the best experience." },
    ],
  },
  {
    slug: "best-sites-sell-feet-pics",
    title: "Best Sites to Sell Feet Pics in 2026",
    subtitle: "Selling feet pics is a legitimate side hustle that can earn $500-$5,000+ per month. We ranked the best platforms by earning potential, buyer traffic, and seller experience.",
    platformSlugs: ["feetfinder", "fetishfinder", "snifffr"],
    faqs: [
      { question: "How much can you make selling feet pics?", answer: "Earnings vary widely — beginners make $200-500/month, while top sellers earn $2,000-5,000+ monthly on platforms like FeetFinder." },
      { question: "What is the best site to sell feet pics?", answer: "FeetFinder is the largest and most trusted platform with the highest buyer traffic and verified profiles." },
      { question: "Is selling feet pics legal?", answer: "Yes, selling feet pictures is completely legal. You must be 18+ and comply with each platform's terms of service." },
      { question: "Do I need to show my face?", answer: "No, most feet pic sellers remain completely anonymous." },
    ],
  },
  {
    slug: "best-creator-platforms-beginners",
    title: "Best Creator Platforms for Beginners in 2026",
    subtitle: "Starting your creator career? The platform you choose matters. We ranked the most beginner-friendly options based on ease of setup, audience reach, support, and earning potential.",
    platformSlugs: ["fansly", "fanvue", "feetfinder", "onlyfans", "patreon"],
    faqs: [
      { question: "What is the best platform for new creators?", answer: "Fansly is the best overall for beginners thanks to easy setup, strong tools, and a growing audience. FeetFinder is best for niche foot content." },
      { question: "How much can beginner creators earn?", answer: "Most beginners earn $100-500 in their first month. Consistent posting and marketing can grow this to $1,000-5,000+ within 3-6 months." },
      { question: "Do I need a large social media following?", answer: "No, platforms like Fansly and FeetFinder have built-in discovery features that help new creators find buyers without external promotion." },
      { question: "Which platform has the lowest fees?", answer: "FanVue charges only 15%, followed by Fansly at 20%. OnlyFans also charges 20%." },
    ],
  },
];

export function getBestListBySlug(slug: string): BestList | undefined {
  return bestLists.find((l) => l.slug === slug);
}

export function getBestListPlatforms(list: BestList): (DetailedReview & { rank: number })[] {
  return list.platformSlugs
    .map((s) => getReviewBySlug(s))
    .filter((r): r is DetailedReview => !!r)
    .sort((a, b) => b.score - a.score)
    .map((r, i) => ({ ...r, rank: i + 1 }));
}
