export interface ReviewPlatform {
  name: string;
  category: string;
  score: number;
  slug: string;
  description: string;
}

export const reviewCategories = [
  "All",
  "Creator Platforms",
  "Live Cam Sites",
  "AI Companions",
  "Dating & Hookup Apps",
  "Sexting & Chat",
  "Tube & Streaming",
] as const;

export const reviewPlatforms: ReviewPlatform[] = [
  // AI Companions
  { name: "Candy.ai", category: "AI Companions", score: 8.3, slug: "candy-ai", description: "Premium AI companion with highly realistic conversations and customizable personalities. Top-rated for immersive roleplay." },
  { name: "CrushOn.ai", category: "AI Companions", score: 7.4, slug: "crushon-ai", description: "Uncensored AI chatbot with memory and realistic NSFW conversations. Popular for its lack of content filters." },
  { name: "DreamGF.ai", category: "AI Companions", score: 7.8, slug: "dreamgf-ai", description: "AI girlfriend generator with image creation and chat. Create and interact with custom virtual companions." },
  { name: "Replika", category: "AI Companions", score: 7.0, slug: "replika", description: "One of the original AI companion apps. Great for emotional connection but limited NSFW capabilities after recent updates." },
  { name: "SoulFun.ai", category: "AI Companions", score: 7.5, slug: "soulfun-ai", description: "AI companion platform with voice chat and image generation. Growing user base with diverse character options." },
  { name: "GirlfriendGPT", category: "AI Companions", score: 7.6, slug: "girlfriendgpt", description: "Open-source AI girlfriend platform with uncensored models. Good customization but requires some technical knowledge." },
  { name: "Kupid.ai", category: "AI Companions", score: 7.3, slug: "kupid-ai", description: "AI dating simulator with realistic profiles and conversations. Fun concept but limited depth in interactions." },
  { name: "Get-Honey.ai", category: "AI Companions", score: 7.2, slug: "get-honey-ai", description: "Newer AI companion app with photo generation and chat features. Affordable pricing but still building its feature set." },
  { name: "Kalon.ai", category: "AI Companions", score: 7.4, slug: "kalon-ai", description: "AI companion with focus on emotional intelligence and realistic personality modeling. Solid mid-tier option." },
  { name: "MyAnima", category: "AI Companions", score: 7.5, slug: "myanima", description: "AI companion focused on emotional wellbeing with roleplay features. Clean interface and thoughtful conversation design." },
  { name: "Infatuated.ai", category: "AI Companions", score: 7.8, slug: "infatuated-ai", description: "Advanced AI companion with memory features and deep conversation capabilities. Strong contender in the AI companion space." },
  { name: "OurDream.ai", category: "AI Companions", score: 7.1, slug: "ourdream-ai", description: "Couple-focused AI platform for shared fantasy exploration. Unique concept but still in early development." },
  { name: "SoulGen.ai", category: "AI Companions", score: 7.5, slug: "soulgen-ai", description: "AI image generation platform for creating custom companion visuals. Great art quality but limited chat features." },
  { name: "Pornpen.ai", category: "AI Companions", score: 7.0, slug: "pornpen-ai", description: "AI-powered adult image generator with extensive customization options. Focused on visual content rather than conversation." },

  // Creator Platforms
  { name: "FeetFinder", category: "Creator Platforms", score: 8.0, slug: "feetfinder", description: "The largest dedicated marketplace for foot content creators. High earnings potential with a focused, active buyer community." },
  { name: "FetishFinder", category: "Creator Platforms", score: 7.5, slug: "fetishfinder", description: "Niche fetish content marketplace connecting creators with enthusiasts. Good discovery features for specialized content." },
  { name: "Footly", category: "Creator Platforms", score: 7.6, slug: "footly", description: "Newer FeetFinder competitor with lower fees and modern interface. Growing fast but smaller audience than established platforms." },
  { name: "FunWithFeet", category: "Creator Platforms", score: 7.0, slug: "funwithfeet", description: "Budget-friendly foot content platform with simple setup. Lower traffic than FeetFinder but decent for beginners." },
  { name: "Feetify", category: "Creator Platforms", score: 6.8, slug: "feetify", description: "Social-media-style foot content platform with free and premium tiers. Limited monetization options compared to competitors." },
  { name: "Snifffr", category: "Creator Platforms", score: 7.2, slug: "snifffr", description: "Marketplace for selling worn items with built-in messaging. Niche but loyal user base with decent earning potential." },
  { name: "Sofia Gray", category: "Creator Platforms", score: 7.5, slug: "sofia-gray", description: "Established used clothing marketplace with strong brand recognition. Premium pricing and verified sellers make it trustworthy." },
  { name: "PantyDeal", category: "Creator Platforms", score: 7.0, slug: "pantydeal", description: "One of the oldest worn item marketplaces with a large community. Free to join but requires active marketing to succeed." },
  { name: "All Things Worn", category: "Creator Platforms", score: 7.3, slug: "all-things-worn", description: "UK-based worn items marketplace with a supportive community. Clean interface and fair commission structure for sellers." },
  { name: "ManyVids", category: "Creator Platforms", score: 7.8, slug: "manyvids", description: "Video-first adult content platform with clip sales, subscriptions, and live shows. Great for established video creators." },
  { name: "Clips4Sale", category: "Creator Platforms", score: 6.5, slug: "clips4sale", description: "Long-running fetish clip marketplace with massive catalog. Outdated interface but loyal customer base for niche content." },
  { name: "LoyalFans", category: "Creator Platforms", score: 7.3, slug: "loyalfans", description: "OnlyFans alternative with live streaming and tip-based features. Competitive fees and growing creator community." },
  { name: "JustFor.Fans", category: "Creator Platforms", score: 7.0, slug: "justforfans", description: "Creator subscription platform popular with male and LGBTQ+ creators. Decent features but smaller audience than OnlyFans." },
  { name: "AdmireMe VIP", category: "Creator Platforms", score: 6.8, slug: "admireme-vip", description: "European creator platform with competitive 20% commission. Smaller user base but growing with solid creator tools." },

  // Live Cam Sites
  { name: "Cam4", category: "Live Cam Sites", score: 6.8, slug: "cam4", description: "Community-focused cam site popular for amateur performers. Free shows are plentiful but video quality is inconsistent." },
  { name: "BongaCams", category: "Live Cam Sites", score: 7.0, slug: "bongacams", description: "Europe's largest free cam site with aggressive promotions, competitive performer payouts, and a massive Eastern European model roster." },
  { name: "LiveJasmin", category: "Live Cam Sites", score: 7.5, slug: "livejasmin", description: "Premium cam site known for high-quality HD streams and professional models. Expensive but the production quality is top-tier." },
  { name: "Jerkmate", category: "Live Cam Sites", score: 7.6, slug: "jerkmate", description: "AI-powered cam matching service that connects you with compatible performers. Innovative concept with a polished interface." },
  { name: "Flirt4Free", category: "Live Cam Sites", score: 7.2, slug: "flirt4free", description: "Upscale cam site with HD streams and interactive features. Smaller model selection but consistently high quality." },
  { name: "CamSoda", category: "Live Cam Sites", score: 7.0, slug: "camsoda", description: "The most innovative free cam site with voyeur mode, AR features, and real-time interaction technology that competitors have not matched." },
  { name: "MyFreeCams", category: "Live Cam Sites", score: 7.0, slug: "myfreecams", description: "One of the oldest cam sites with a loyal community. Dated interface but genuine performers and free show access." },
  { name: "SlutRoulette", category: "Live Cam Sites", score: 6.5, slug: "slutroulette", description: "Chatroulette-style random cam site. Fun concept for spontaneous connections but quality varies significantly." },

  // Dating & Hookup Apps
  { name: "SugarDaddy.com", category: "Dating & Hookup Apps", score: 7.5, slug: "sugardaddy", description: "Premium sugar dating platform with verified profiles and secure messaging. Higher cost but attracts serious members." },
  { name: "Secret Benefits", category: "Dating & Hookup Apps", score: 7.3, slug: "secret-benefits", description: "Discreet sugar dating site with credit-based messaging system. Good privacy features but costs add up quickly." },
  { name: "Seeking", category: "Dating & Hookup Apps", score: 7.0, slug: "seeking", description: "The dominant sugar dating platform where the entry price is the point — filtering for serious arrangements through premium positioning." },
  { name: "SugarDaddyMeet", category: "Dating & Hookup Apps", score: 7.0, slug: "sugardaddymeet", description: "Established sugar dating site with straightforward matching. Smaller pool than Seeking but less competition." },
  { name: "SugarBook", category: "Dating & Hookup Apps", score: 6.8, slug: "sugarbook", description: "Asian-focused sugar dating app with growing global presence. Clean design but limited features on free tier." },
  { name: "WhatsYourPrice", category: "Dating & Hookup Apps", score: 7.2, slug: "whats-your-price", description: "Unique auction-style dating platform where you bid on first dates. Interesting concept with mixed user reviews." },
  { name: "Adult Friend Finder", category: "Dating & Hookup Apps", score: 6.5, slug: "adult-friend-finder", description: "The internet's oldest surviving hookup platform — 80 million registered members, the most established swinger community, and an interface from another era. 6.5/10." },
  { name: "Pure App", category: "Dating & Hookup Apps", score: 7.2, slug: "pure-app", description: "Anonymous hookup app where posts expire in 24 hours. Great privacy but limited to major cities for best results." },
  { name: "Feeld", category: "Dating & Hookup Apps", score: 7.5, slug: "feeld", description: "Open-minded dating app for couples and singles exploring non-traditional relationships. Best for ethically non-monogamous dating." },
  { name: "Ashley Madison", category: "Dating & Hookup Apps", score: 6.5, slug: "ashley-madison", description: "The world's most infamous affair platform rebuilt its security from scratch after the 2015 breach — we tested whether the product behind the reputation actually delivers." },

  // Sexting & Chat
  { name: "Arousr", category: "Sexting & Chat", score: 7.2, slug: "arousr", description: "Verified sexting platform connecting users with real chat hosts. Pay-per-minute pricing with anonymous, safe interactions." },
  { name: "SextFriend", category: "Sexting & Chat", score: 6.5, slug: "sextfriend", description: "Free sexting matchmaking site with location-based connections. Simple concept but watch out for fake profiles." },
  { name: "Flingster", category: "Sexting & Chat", score: 6.8, slug: "flingster", description: "Video chat platform with AR face filters for anonymity. Fun random connections but premium needed for gender filters." },
  { name: "ChatRandom", category: "Sexting & Chat", score: 6.5, slug: "chatrandom", description: "Random video chat platform with country and gender filters. Large user base but moderation can be inconsistent." },

  // Tube & Streaming
  { name: "SmutFinder", category: "Tube & Streaming", score: 6.5, slug: "smutfinder", description: "Aggregator site that indexes content across multiple tube sites. Useful search tool but no original content." },

  // Major Platforms (Featured)
  { name: "OnlyFans", category: "Creator Platforms", score: 8.5, slug: "onlyfans", description: "Still the biggest name in creator subscriptions — but rising fees and growing competition mean it's no longer the only option." },
  { name: "Fansly", category: "Creator Platforms", score: 8.2, slug: "fansly", description: "Lower creator fees, better content organization, and a rapidly growing user base make Fansly the top OnlyFans alternative." },
  { name: "FanVue", category: "Creator Platforms", score: 7.6, slug: "fanvue", description: "UK-based OnlyFans competitor with built-in AI tools for creators. Lower fees and better analytics, but still building its audience." },
  { name: "Patreon", category: "Creator Platforms", score: 7.0, slug: "patreon", description: "The mainstream creator subscription platform where credibility comes standard but the fee structure (5-12% + processing) demands your attention. Native apps, tiered memberships, and zero stigma." },
  { name: "Chaturbate", category: "Live Cam Sites", score: 7.8, slug: "chaturbate", description: "The original free cam site with 5M+ daily visitors, token tipping culture, and performer freedom — an interface nobody would design today that somehow still wins." },
  { name: "Stripchat", category: "Live Cam Sites", score: 7.5, slug: "stripchat", description: "AI-powered cam site with virtual reality support and innovative features. Strong Chaturbate alternative with a modern, clean interface." },
  { name: "Bumble", category: "Dating & Hookup Apps", score: 8.0, slug: "bumble", description: "Women-make-the-first-move dating app with a solid matching algorithm. Premium features are worth it if you're serious about dating." },
  { name: "Tinder", category: "Dating & Hookup Apps", score: 7.5, slug: "tinder", description: "The most popular dating app worldwide with the largest user base. Great for casual dating but premium pricing has increased significantly." },
];
