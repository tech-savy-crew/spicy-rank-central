export interface Platform {
  id: string;
  name: string;
  slug: string;
  category: string;
  logo: string;
  tagline: string;
  rating: number;
  verdict: string;
  summary: string;
  pros: string[];
  cons: string[];
  ratings: { label: string; score: number }[];
  quickFacts: { label: string; value: string }[];
  reviewSections: { title: string; content: string }[];
  faqs: { question: string; answer: string }[];
  alternatives: string[];
  features: Record<string, string | boolean>;
  pricing: string;
  pricingModel: string;
  startingPrice: string;
  paymentMethods: string;
  contentTypes: string;
  url: string;
  lastUpdated: string;
}

export const categories = [
  "All",
  "Social Media",
  "Streaming",
  "Gaming",
  "Messaging",
  "Productivity",
  "Music",
];

export const platforms: Platform[] = [
  {
    id: "1",
    name: "TikTok",
    slug: "tiktok",
    category: "Social Media",
    logo: "🎵",
    tagline: "Short-form video that conquered the world",
    rating: 8.5,
    verdict: "The undisputed king of short-form video content",
    summary: "TikTok has revolutionized how we consume and create content, offering an addictive algorithmic feed that keeps billions scrolling.",
    pros: ["Best-in-class algorithm", "Massive creator ecosystem", "Easy video editing tools", "Trending audio library"],
    cons: ["Privacy concerns", "Addictive by design", "Content moderation issues", "Limited long-form content"],
    ratings: [
      { label: "Content Quality", score: 9 },
      { label: "User Experience", score: 8 },
      { label: "Value", score: 9 },
      { label: "Privacy", score: 6 },
      { label: "Innovation", score: 9 },
    ],
    quickFacts: [
      { label: "Founded", value: "2016" },
      { label: "Users", value: "1.5B+" },
      { label: "Price", value: "Free" },
      { label: "Platforms", value: "iOS, Android, Web" },
    ],
    reviewSections: [
      { title: "The Algorithm That Knows You", content: "TikTok's For You Page is arguably the most sophisticated content recommendation system ever built. Within minutes of use, it starts surfacing content that matches your interests with uncanny accuracy. This is both its greatest strength and most significant concern." },
      { title: "Creator Tools & Monetization", content: "The platform offers robust in-app editing tools that make content creation accessible to everyone. Filters, effects, and a vast library of trending sounds make it easy to create engaging content. The Creator Fund and LIVE gifting provide monetization paths, though payouts remain a point of contention." },
      { title: "Community & Culture", content: "TikTok has become a cultural phenomenon, launching trends, songs, and even careers. The platform's duet and stitch features foster genuine community interaction and creative collaboration in ways other platforms haven't matched." },
    ],
    faqs: [
      { question: "Is TikTok safe for kids?", answer: "TikTok offers a Restricted Mode and Family Pairing features, but parents should actively monitor usage. The platform is rated 13+ in most regions." },
      { question: "Can you make money on TikTok?", answer: "Yes, through the Creator Fund, brand partnerships, LIVE gifts, and the TikTok Shop. Top creators earn millions annually." },
    ],
    alternatives: ["instagram", "youtube", "snapchat"],
    features: { "Short Video": true, "Live Streaming": true, "Stories": true, "E-commerce": true, "Direct Messages": true, "Desktop App": false },
    pricing: "Free",
    pricingModel: "Free",
    startingPrice: "Free",
    paymentMethods: "N/A",
    contentTypes: "Short Video, Live Streams",
    url: "https://tiktok.com",
    lastUpdated: "March 1, 2026",
  },
  {
    id: "2",
    name: "YouTube",
    slug: "youtube",
    category: "Streaming",
    logo: "▶️",
    tagline: "The world's video library",
    rating: 9.0,
    verdict: "Still the gold standard for video content",
    summary: "YouTube remains the most comprehensive video platform with unmatched content diversity and creator monetization.",
    pros: ["Unmatched content library", "Strong monetization", "YouTube Shorts", "Premium ad-free option"],
    cons: ["Aggressive ads on free tier", "Algorithm rabbit holes", "Comment section quality", "Copyright system issues"],
    ratings: [
      { label: "Content Quality", score: 9 },
      { label: "User Experience", score: 8 },
      { label: "Value", score: 8 },
      { label: "Privacy", score: 7 },
      { label: "Innovation", score: 9 },
    ],
    quickFacts: [
      { label: "Founded", value: "2005" },
      { label: "Users", value: "2.5B+" },
      { label: "Price", value: "Free / $13.99/mo" },
      { label: "Platforms", value: "All" },
    ],
    reviewSections: [
      { title: "Content For Everyone", content: "From tutorials to documentaries, music videos to live streams, YouTube has it all. The platform's breadth is unmatched, making it the go-to destination for virtually any video content need." },
      { title: "Creator Economy Leader", content: "YouTube's Partner Program remains the gold standard for creator monetization, offering ad revenue, memberships, Super Chats, and merchandise shelves. The platform has minted more millionaire creators than any competitor." },
      { title: "The Premium Experience", content: "YouTube Premium eliminates ads, enables background play, and includes YouTube Music. At $13.99/month, it's a solid value proposition for heavy users, though the free tier remains fully functional." },
    ],
    faqs: [
      { question: "Is YouTube Premium worth it?", answer: "If you watch more than an hour daily, the ad-free experience and background playback make Premium a worthwhile investment." },
      { question: "How do YouTubers make money?", answer: "Through AdSense revenue, sponsorships, memberships, Super Chats during live streams, and merchandise sales." },
    ],
    alternatives: ["tiktok", "twitch", "vimeo"],
    features: { "Long Video": true, "Short Video": true, "Live Streaming": true, "Stories": false, "E-commerce": true, "Desktop App": true },
    pricing: "Free / $13.99/mo",
    url: "https://youtube.com",
  },
  {
    id: "3",
    name: "Discord",
    slug: "discord",
    category: "Messaging",
    logo: "💬",
    tagline: "Where communities thrive",
    rating: 8.8,
    verdict: "The best platform for community building",
    summary: "Discord has evolved from a gaming chat app to the ultimate community platform with voice, video, and text channels.",
    pros: ["Excellent voice chat", "Highly customizable servers", "Strong bot ecosystem", "Free core features"],
    cons: ["Steep learning curve", "Can be overwhelming", "Moderation challenges", "Nitro pricing"],
    ratings: [
      { label: "Content Quality", score: 8 },
      { label: "User Experience", score: 8 },
      { label: "Value", score: 9 },
      { label: "Privacy", score: 7 },
      { label: "Innovation", score: 9 },
    ],
    quickFacts: [
      { label: "Founded", value: "2015" },
      { label: "Users", value: "200M+" },
      { label: "Price", value: "Free / $9.99/mo" },
      { label: "Platforms", value: "All" },
    ],
    reviewSections: [
      { title: "Beyond Gaming", content: "Discord has successfully expanded beyond its gaming roots to become a versatile community platform used by study groups, professional teams, content creators, and hobbyist communities worldwide." },
      { title: "Voice & Video Excellence", content: "The platform's voice channels remain best-in-class, offering low-latency communication with screen sharing, noise suppression, and the ability to drop in and out of conversations naturally." },
      { title: "Customization & Bots", content: "Discord's bot ecosystem is incredibly rich, allowing server owners to add music, moderation, games, and custom functionality. The permission system, while complex, offers granular control over every aspect of a server." },
    ],
    faqs: [
      { question: "Is Discord free?", answer: "Yes, Discord's core features are completely free. Nitro ($9.99/mo) adds larger uploads, HD streaming, custom profiles, and server boosts." },
      { question: "Is Discord safe?", answer: "Discord offers robust privacy settings and moderation tools, but users should be cautious about joining unknown servers and sharing personal information." },
    ],
    alternatives: ["slack", "telegram", "teamspeak"],
    features: { "Text Chat": true, "Voice Chat": true, "Video Calls": true, "Screen Share": true, "Bots": true, "Desktop App": true },
    pricing: "Free / $9.99/mo",
    url: "https://discord.com",
  },
  {
    id: "4",
    name: "Spotify",
    slug: "spotify",
    category: "Music",
    logo: "🎧",
    tagline: "Music for every moment",
    rating: 8.7,
    verdict: "The streaming service that defined modern music",
    summary: "Spotify leads the music streaming space with its intelligent playlists, podcast integration, and massive catalog.",
    pros: ["Superior music discovery", "Excellent playlists", "Podcast integration", "Cross-device sync"],
    cons: ["Low artist payouts", "Shuffle issues", "Social features lacking", "Audio quality caps"],
    ratings: [
      { label: "Content Quality", score: 9 },
      { label: "User Experience", score: 9 },
      { label: "Value", score: 8 },
      { label: "Privacy", score: 7 },
      { label: "Innovation", score: 8 },
    ],
    quickFacts: [
      { label: "Founded", value: "2006" },
      { label: "Users", value: "600M+" },
      { label: "Price", value: "Free / $10.99/mo" },
      { label: "Platforms", value: "All" },
    ],
    reviewSections: [
      { title: "Discovery Engine", content: "Spotify's Discover Weekly, Release Radar, and Daily Mix playlists use sophisticated algorithms to surface new music that matches your taste. It's the best music discovery tool available." },
      { title: "The Podcast Play", content: "Spotify has invested heavily in podcasts, becoming a major player in the space. While this diversification has been divisive among music purists, it adds significant value to the subscription." },
      { title: "Free vs Premium", content: "The free tier is functional but limited by ads and shuffle-only playback on mobile. Premium unlocks offline downloads, higher quality audio, and on-demand playback—essential for serious listeners." },
    ],
    faqs: [
      { question: "Is Spotify Premium worth it?", answer: "For regular music listeners, absolutely. Ad-free listening, offline downloads, and on-demand playback make it a significant upgrade over the free tier." },
      { question: "How much do artists earn on Spotify?", answer: "Artists earn between $0.003-$0.005 per stream on average, which remains a point of industry debate." },
    ],
    alternatives: ["apple-music", "youtube", "tidal"],
    features: { "On-Demand": true, "Offline Mode": true, "Podcasts": true, "Lyrics": true, "Social Features": true, "Desktop App": true },
    pricing: "Free / $10.99/mo",
    url: "https://spotify.com",
  },
  {
    id: "5",
    name: "Twitch",
    slug: "twitch",
    category: "Gaming",
    logo: "🎮",
    tagline: "Live streaming for gamers and beyond",
    rating: 7.8,
    verdict: "The live streaming pioneer facing new competition",
    summary: "Twitch remains the dominant live streaming platform for gaming but faces growing competition and creator concerns.",
    pros: ["Largest streaming community", "Strong chat culture", "Bits & subs monetization", "Extensions ecosystem"],
    cons: ["Revenue split changes", "DMCA issues", "Ad experience", "Discovery challenges"],
    ratings: [
      { label: "Content Quality", score: 8 },
      { label: "User Experience", score: 7 },
      { label: "Value", score: 7 },
      { label: "Privacy", score: 7 },
      { label: "Innovation", score: 8 },
    ],
    quickFacts: [
      { label: "Founded", value: "2011" },
      { label: "Users", value: "140M+" },
      { label: "Price", value: "Free / $8.99/mo" },
      { label: "Platforms", value: "All" },
    ],
    reviewSections: [
      { title: "The Live Streaming King", content: "Twitch built the live streaming culture we know today. Its chat system, emotes, and community features create an interactive viewing experience that pre-recorded content simply can't match." },
      { title: "Creator Challenges", content: "Recent changes to revenue splits and increasing competition from YouTube and Kick have put pressure on Twitch's relationship with creators. The platform needs to balance profitability with creator satisfaction." },
      { title: "Beyond Gaming", content: "While gaming remains its core, Twitch has expanded into music, art, cooking, and 'Just Chatting' categories, broadening its appeal beyond the gaming demographic." },
    ],
    faqs: [
      { question: "How do Twitch streamers make money?", answer: "Through subscriptions, bits (virtual currency), ads, sponsorships, and donations from viewers." },
      { question: "Do you need to be a gamer to enjoy Twitch?", answer: "Not at all. Twitch has thriving communities around music, art, cooking, talk shows, and many other non-gaming categories." },
    ],
    alternatives: ["youtube", "kick", "facebook-gaming"],
    features: { "Live Streaming": true, "Chat": true, "Clips": true, "VODs": true, "Extensions": true, "Desktop App": false },
    pricing: "Free / $8.99/mo",
    url: "https://twitch.tv",
  },
  {
    id: "6",
    name: "Instagram",
    slug: "instagram",
    category: "Social Media",
    logo: "📸",
    tagline: "Capture and share the world's moments",
    rating: 7.5,
    verdict: "A social media giant struggling with identity",
    summary: "Instagram remains hugely popular but faces criticism for prioritizing Reels over its photo-sharing roots.",
    pros: ["Massive user base", "Strong for businesses", "Reels growth", "Visual storytelling"],
    cons: ["Algorithm frustrations", "Reduced organic reach", "Mental health concerns", "Feature bloat"],
    ratings: [
      { label: "Content Quality", score: 7 },
      { label: "User Experience", score: 7 },
      { label: "Value", score: 8 },
      { label: "Privacy", score: 6 },
      { label: "Innovation", score: 7 },
    ],
    quickFacts: [
      { label: "Founded", value: "2010" },
      { label: "Users", value: "2B+" },
      { label: "Price", value: "Free" },
      { label: "Platforms", value: "iOS, Android, Web" },
    ],
    reviewSections: [
      { title: "The Reels Pivot", content: "Instagram's aggressive push toward Reels has divided its user base. While short-form video drives engagement, many users miss the platform's photo-first identity." },
      { title: "Business & Creator Tools", content: "For businesses and creators, Instagram remains essential. Shopping features, branded content tools, and detailed analytics make it a powerful marketing platform." },
      { title: "The Algorithm Problem", content: "Users increasingly report seeing content from accounts they don't follow, while posts from friends get buried. The chronological feed option helps but isn't the default experience." },
    ],
    faqs: [
      { question: "Is Instagram still relevant?", answer: "Absolutely. With over 2 billion users, Instagram remains one of the most important social platforms, especially for visual content and business marketing." },
      { question: "How does Instagram make money?", answer: "Primarily through advertising. Instagram's ad platform, integrated with Facebook/Meta's tools, is one of the most sophisticated in digital marketing." },
    ],
    alternatives: ["tiktok", "snapchat", "pinterest"],
    features: { "Photos": true, "Reels": true, "Stories": true, "Live": true, "Shopping": true, "Desktop App": false },
    pricing: "Free",
    url: "https://instagram.com",
  },
  {
    id: "7",
    name: "Notion",
    slug: "notion",
    category: "Productivity",
    logo: "📝",
    tagline: "All-in-one workspace",
    rating: 8.9,
    verdict: "The ultimate productivity Swiss Army knife",
    summary: "Notion combines notes, docs, databases, and project management into one elegant workspace.",
    pros: ["Incredibly flexible", "Beautiful interface", "Strong templates", "Team collaboration"],
    cons: ["Steep learning curve", "Can be slow", "Offline mode limited", "Mobile app needs work"],
    ratings: [
      { label: "Content Quality", score: 9 },
      { label: "User Experience", score: 8 },
      { label: "Value", score: 9 },
      { label: "Privacy", score: 8 },
      { label: "Innovation", score: 9 },
    ],
    quickFacts: [
      { label: "Founded", value: "2013" },
      { label: "Users", value: "30M+" },
      { label: "Price", value: "Free / $10/mo" },
      { label: "Platforms", value: "All" },
    ],
    reviewSections: [
      { title: "Infinite Flexibility", content: "Notion's block-based editor lets you build anything from simple notes to complex project management systems. The learning curve is real, but the payoff is a workspace that adapts to exactly how you think and work." },
      { title: "Templates & Community", content: "The template gallery is a goldmine. From CRM systems to habit trackers, the community has created thousands of ready-to-use templates that showcase what's possible with the platform." },
      { title: "AI Integration", content: "Notion AI adds writing assistance, summarization, and content generation directly into your workspace. It's one of the more thoughtful AI integrations we've seen in productivity tools." },
    ],
    faqs: [
      { question: "Is Notion free?", answer: "Yes, the free plan is generous for individual use. Team features require a paid plan starting at $10/user/month." },
      { question: "Can Notion replace Google Docs?", answer: "For many users, yes. Notion handles documents, spreadsheets, and presentations, though it lacks some advanced features of dedicated office suites." },
    ],
    alternatives: ["obsidian", "evernote", "coda"],
    features: { "Notes": true, "Databases": true, "Wiki": true, "Projects": true, "AI Assistant": true, "Desktop App": true },
    pricing: "Free / $10/mo",
    url: "https://notion.so",
  },
  {
    id: "8",
    name: "Snapchat",
    slug: "snapchat",
    category: "Social Media",
    logo: "👻",
    tagline: "Life's more fun when you live in the moment",
    rating: 7.2,
    verdict: "Still beloved by Gen Z despite fierce competition",
    summary: "Snapchat pioneered ephemeral messaging and AR filters, maintaining a loyal young audience despite TikTok's rise.",
    pros: ["Best AR filters", "Snap Map innovation", "Private messaging focus", "Discover content"],
    cons: ["Redesign controversies", "Spotlight underperforms", "Revenue challenges", "Limited web presence"],
    ratings: [
      { label: "Content Quality", score: 7 },
      { label: "User Experience", score: 7 },
      { label: "Value", score: 7 },
      { label: "Privacy", score: 8 },
      { label: "Innovation", score: 8 },
    ],
    quickFacts: [
      { label: "Founded", value: "2011" },
      { label: "Users", value: "750M+" },
      { label: "Price", value: "Free / $3.99/mo" },
      { label: "Platforms", value: "iOS, Android" },
    ],
    reviewSections: [
      { title: "AR Pioneer", content: "Snapchat's augmented reality technology remains industry-leading. From fun face filters to try-on experiences for brands, Snap's AR capabilities consistently push the boundaries of what's possible on mobile." },
      { title: "The Privacy Advantage", content: "In an era of permanent digital footprints, Snapchat's ephemeral messaging still resonates. The disappearing messages and stories create a more casual, authentic communication environment." },
      { title: "Competing with TikTok", content: "Spotlight, Snapchat's TikTok competitor, has struggled to gain the same traction. While the platform excels at private communication, its public content strategy needs refinement." },
    ],
    faqs: [
      { question: "Is Snapchat still popular?", answer: "Yes, especially among users under 25. It remains one of the most-used messaging apps in North America and Europe." },
      { question: "What is Snapchat+ ?", answer: "Snapchat+ is a $3.99/month subscription offering exclusive features like custom app icons, story rewatch indicators, and priority support." },
    ],
    alternatives: ["instagram", "tiktok", "bereal"],
    features: { "Snaps": true, "Stories": true, "Spotlight": true, "AR Filters": true, "Snap Map": true, "Desktop App": false },
    pricing: "Free / $3.99/mo",
    url: "https://snapchat.com",
  },
];

export const getPlatformBySlug = (slug: string) => platforms.find((p) => p.slug === slug);
export const getPlatformsByCategory = (category: string) =>
  category === "All" ? platforms : platforms.filter((p) => p.category === category);
