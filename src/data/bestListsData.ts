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
    title: "10 Best OnlyFans Alternatives in 2026",
    subtitle: "OnlyFans dominates the creator economy, but rising fees and increasing competition mean creators have better options than ever. We tested every major alternative to help you find the best platform for your content and audience.",
    platformSlugs: ["fansly", "fanvue", "manyvids", "loyalfans", "justforfans", "admireme-vip", "patreon", "clips4sale", "feetfinder", "footly"],
    faqs: [
      { question: "What is the best OnlyFans alternative in 2026?", answer: "Fansly is the best overall OnlyFans alternative, offering lower fees (15% vs 20%), tiered subscriptions, and better content organization tools." },
      { question: "Which OnlyFans alternative pays creators the most?", answer: "Footly offers the highest creator payout at 90%, followed by Fansly and LoyalFans at 80%." },
      { question: "Can I use multiple creator platforms at once?", answer: "Yes, most creators cross-post on 2-3 platforms to maximize revenue and audience reach." },
      { question: "Are OnlyFans alternatives safe for creators?", answer: "All platforms listed here offer identity verification, secure payments, and content protection. Always read the terms of service before joining." },
    ],
  },
  {
    slug: "best-chaturbate-alternatives",
    title: "8 Best Chaturbate Alternatives in 2026",
    subtitle: "Chaturbate is the biggest free cam site, but it's not the only option. Whether you want higher video quality, better privacy, or different performer styles, these alternatives deliver.",
    platformSlugs: ["bongacams", "livejasmin", "jerkmate", "camsoda", "myfreecams", "cam4", "flirt4free", "slutroulette"],
    faqs: [
      { question: "What is the best Chaturbate alternative?", answer: "Jerkmate is the best overall alternative with its AI-powered matching system and high-quality streams." },
      { question: "Which cam site has the best free shows?", answer: "BongaCams and CamSoda both offer extensive free content with optional token tipping." },
      { question: "Are these cam sites safe?", answer: "All listed sites use secure payment processing and offer anonymous viewing options. Always use a unique username and strong password." },
      { question: "Which cam site has the best video quality?", answer: "LiveJasmin consistently offers the highest HD stream quality with professional-grade performer setups." },
    ],
  },
  {
    slug: "best-ai-girlfriend-apps",
    title: "12 Best AI Girlfriend Apps in 2026 — Ranked",
    subtitle: "AI companions have evolved dramatically, offering realistic conversations, image generation, and emotional intelligence. We tested every major platform to rank the best AI girlfriend apps available today.",
    platformSlugs: ["candy-ai", "infatuated-ai", "dreamgf-ai", "girlfriendgpt", "soulfun-ai", "myanima", "soulgen-ai", "crushon-ai", "kalon-ai", "kupid-ai", "get-honey-ai", "ourdream-ai"],
    faqs: [
      { question: "What is the best AI girlfriend app?", answer: "Candy.ai is the best overall AI girlfriend app with superior conversation quality, deep customization, and AI image generation." },
      { question: "Are AI girlfriend apps safe?", answer: "Reputable apps like Candy.ai and Replika use encryption and don't share personal data. Always review privacy policies before sharing sensitive information." },
      { question: "Are there free AI girlfriend apps?", answer: "Most apps offer free tiers with limited features. CrushOn.ai has one of the most generous free tiers with 50 daily messages." },
      { question: "Can AI girlfriends remember conversations?", answer: "Yes, most premium AI companions have memory features that remember past interactions and build on shared experiences." },
    ],
  },
  {
    slug: "best-free-cam-sites",
    title: "Best Free Cam Sites in 2026 — Top 8 Ranked",
    subtitle: "You don't need to spend money to enjoy live cam shows. These sites offer genuine free content with optional tipping. We ranked them by free content quality, performer variety, and user experience.",
    platformSlugs: ["bongacams", "camsoda", "jerkmate", "cam4", "myfreecams", "livejasmin", "flirt4free", "slutroulette"],
    faqs: [
      { question: "Are free cam sites really free?", answer: "Yes, all listed sites offer free public shows. Tokens/credits are optional for tipping, private shows, or interactive features." },
      { question: "Which free cam site has the most performers?", answer: "BongaCams and MyFreeCams typically have the most performers online at any given time." },
      { question: "Are free cam sites safe?", answer: "Yes, these sites use secure connections and don't require payment for basic viewing. Use an ad blocker for the best experience." },
    ],
  },
  {
    slug: "best-hookup-apps",
    title: "Best Hookup Apps That Actually Work in 2026",
    subtitle: "Finding genuine hookup apps that deliver real connections is harder than it should be. We tested the top platforms to find which ones actually work for casual encounters.",
    platformSlugs: ["feeld", "pure-app", "adult-friend-finder", "arousr", "flingster"],
    faqs: [
      { question: "What is the best hookup app in 2026?", answer: "Feeld is the best overall for open-minded dating, while Pure App is best for quick anonymous hookups." },
      { question: "Are hookup apps safe?", answer: "Use apps with identity verification and always meet in public places first. Never share financial information." },
      { question: "Do hookup apps actually work?", answer: "Yes, apps like Feeld and AdultFriendFinder have large active user bases. Success depends on your location and profile quality." },
    ],
  },
  {
    slug: "best-sugar-daddy-sites",
    title: "Best Sugar Daddy Websites & Apps in 2026",
    subtitle: "Sugar dating has gone mainstream, with millions of sugar daddies and sugar babies connecting online. We reviewed every major platform to find the safest and most effective options.",
    platformSlugs: ["seeking", "sugardaddy", "secret-benefits", "whats-your-price", "sugardaddymeet", "sugarbook"],
    faqs: [
      { question: "What is the best sugar daddy site?", answer: "Seeking (formerly SeekingArrangement) is the largest and most established sugar dating platform with millions of verified members." },
      { question: "Are sugar daddy sites legal?", answer: "Yes, sugar dating platforms are legal. They facilitate dating relationships between consenting adults." },
      { question: "How much do sugar daddy sites cost?", answer: "Premium memberships range from $49/month (SugarDaddy.com) to $109/month (Seeking). Some use credit-based systems." },
      { question: "Are sugar daddy sites safe?", answer: "Reputable sites offer profile verification and secure messaging. Always meet in public and never send money before meeting in person." },
    ],
  },
  {
    slug: "best-sexting-apps",
    title: "Best Sexting Apps & Sites in 2026",
    subtitle: "Whether you want AI-powered sexting, real human chat hosts, or anonymous video connections, these platforms deliver the best sexting experiences available.",
    platformSlugs: ["arousr", "infatuated-ai", "flingster", "sextfriend", "chatrandom"],
    faqs: [
      { question: "What is the best sexting app?", answer: "Arousr is the best for real human sexting with verified chat hosts. Infatuated.ai is best for AI-powered sexting." },
      { question: "Are sexting apps safe?", answer: "Platforms like Arousr verify all chat hosts and use encrypted messaging. For random chat apps, never share personal information." },
      { question: "Are there free sexting apps?", answer: "Flingster and ChatRandom offer free video chat. Arousr provides 100 free credits to start." },
    ],
  },
  {
    slug: "best-sites-sell-feet-pics",
    title: "Best Sites to Sell Feet Pics in 2026",
    subtitle: "Selling feet pics is a legitimate side hustle that can earn $500-$5,000+ per month. We ranked the best platforms by earning potential, buyer traffic, and seller experience.",
    platformSlugs: ["feetfinder", "footly", "fetishfinder", "funwithfeet", "feetify", "snifffr"],
    faqs: [
      { question: "How much can you make selling feet pics?", answer: "Earnings vary widely — beginners make $200-500/month, while top sellers earn $2,000-5,000+ monthly on platforms like FeetFinder." },
      { question: "What is the best site to sell feet pics?", answer: "FeetFinder is the largest and most trusted platform with the highest buyer traffic and verified profiles." },
      { question: "Is selling feet pics legal?", answer: "Yes, selling feet pictures is completely legal. You must be 18+ and comply with each platform's terms of service." },
      { question: "Do I need to show my face?", answer: "No, most feet pic sellers remain completely anonymous. Platforms like FunWithFeet specifically emphasize anonymity." },
    ],
  },
  {
    slug: "best-sites-sell-used-panties",
    title: "Best Sites to Sell Used Panties in 2026",
    subtitle: "The used panties market is thriving, with dedicated marketplaces making it easy and safe to buy and sell worn items. Here are the best platforms ranked by traffic, safety, and earning potential.",
    platformSlugs: ["sofia-gray", "snifffr", "all-things-worn", "pantydeal"],
    faqs: [
      { question: "How much can you make selling used panties?", answer: "Prices range from $20-$100+ per pair depending on customization and platform. Active sellers report $500-2,000/month." },
      { question: "Is selling used panties legal?", answer: "Yes, it is legal in most countries. Platforms handle payment processing and provide seller protection." },
      { question: "Which platform has the most buyers?", answer: "Sofia Gray has 1M+ monthly visitors, making it the largest dedicated used panties marketplace." },
    ],
  },
  {
    slug: "best-nsfw-ai-tools",
    title: "Best NSFW AI Tools in 2026 — Image, Chat & More",
    subtitle: "AI-generated adult content has exploded in quality and accessibility. From image generators to conversational companions, these are the best NSFW AI tools available.",
    platformSlugs: ["candy-ai", "soulgen-ai", "dreamgf-ai", "infatuated-ai", "crushon-ai", "pornpen-ai"],
    faqs: [
      { question: "What is the best NSFW AI tool?", answer: "Candy.ai is the best all-around NSFW AI platform. SoulGen.ai is best specifically for AI image generation." },
      { question: "Are NSFW AI tools legal?", answer: "Yes, generating AI adult content is legal in most jurisdictions. Never create content depicting minors or non-consenting real individuals." },
      { question: "Are there free NSFW AI tools?", answer: "Pornpen.ai offers free NSFW image generation. Most other platforms offer limited free tiers." },
    ],
  },
  {
    slug: "best-feetfinder-alternatives",
    title: "7 Best FeetFinder Alternatives in 2026",
    subtitle: "FeetFinder is the market leader, but it's not your only option. Whether you want lower fees, better discovery, or a different community vibe, these alternatives are worth exploring.",
    platformSlugs: ["footly", "funwithfeet", "feetify", "fetishfinder", "snifffr"],
    faqs: [
      { question: "What is the best FeetFinder alternative?", answer: "Footly is the best alternative with its TikTok-style discovery algorithm and 90% creator payout rate." },
      { question: "Why look for FeetFinder alternatives?", answer: "Common reasons include lower fees, different audience demographics, or wanting to diversify across multiple platforms." },
      { question: "Can I use FeetFinder and alternatives simultaneously?", answer: "Yes, most successful feet content creators sell on 2-3 platforms to maximize their reach and income." },
    ],
  },
  {
    slug: "best-creator-platforms-beginners",
    title: "Best Creator Platforms for Beginners in 2026",
    subtitle: "Starting your creator career? The platform you choose matters. We ranked the most beginner-friendly options based on ease of setup, audience reach, support, and earning potential.",
    platformSlugs: ["fansly", "fanvue", "loyalfans", "manyvids", "feetfinder", "footly"],
    faqs: [
      { question: "What is the best platform for new creators?", answer: "Fansly is the best overall for beginners thanks to easy setup, strong tools, and a growing audience. FeetFinder is best for niche foot content." },
      { question: "How much can beginner creators earn?", answer: "Most beginners earn $100-500 in their first month. Consistent posting and marketing can grow this to $1,000-5,000+ within 3-6 months." },
      { question: "Do I need a large social media following?", answer: "No, platforms like FeetFinder and Footly have built-in discovery features that help new creators find buyers without external promotion." },
      { question: "Which platform has the lowest fees?", answer: "Footly charges only 10%, followed by Fansly and LoyalFans at 20%. OnlyFans charges the highest at 20%." },
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
