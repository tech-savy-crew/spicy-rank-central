// Dynamic content generators for review page extra sections
// These generate UX, Privacy, Tips, and extra FAQ content per platform

import type { DetailedReview } from "./reviewDetails";

export interface UserExperienceContent {
  gettingStarted: string;
  interfaceNavigation: string;
  mobileExperience: string;
}

export interface TrustCard {
  icon: "lock" | "credit-card" | "shield-check" | "eye-off";
  title: string;
  description: string;
}

export interface PrivacyTrustContent {
  cards: TrustCard[];
  analysis: string;
}

export interface Tip {
  title: string;
  description: string;
}

// ── Platform-specific overrides ──
const uxOverrides: Record<string, UserExperienceContent> = {
  "candy-ai": {
    gettingStarted: "Signing up for Candy.ai takes less than two minutes. You can register through the Candy.ai website using an email address or Google account — no phone verification or ID required. The login process is straightforward, and returning users can sign in with one tap. After registration, an onboarding wizard walks you through creating your first AI companion by selecting appearance, personality traits, and communication style. Within five minutes of completing signup, you can already be deep in a natural-feeling conversation.",
    interfaceNavigation: "The interface is clean, modern, and built around conversations. A left sidebar lets you switch between companions, access settings, and browse your image gallery. Message input feels responsive, and AI replies typically arrive within two to three seconds on premium. The image generation feature is integrated directly into the chat flow — you request visuals without ever leaving the conversation window. Settings are well-organized and nothing feels buried behind unnecessary menus.",
    mobileExperience: "The Candy.ai app is available for both Android and iOS, and the mobile experience closely mirrors what you get on desktop. Scrolling is smooth, load times are fast, and the interface adapts well to smaller screens with thumb-friendly navigation. If you primarily use your phone, you will not feel like you are getting a compromised experience.",
  },
  "dreamgf-ai": {
    gettingStarted: "Under three minutes to sign up. Email registration, age verification, straight into character builder. Within five minutes you can have your first AI girlfriend created and be generating images. Fastest signup-to-content experience we tested.",
    interfaceNavigation: "Visually focused dashboard centering on characters. Easy access to chat, image generation, and gallery. Character builder is most polished element with real-time preview updates. Image generation integrated into chat flow.",
    mobileExperience: "No native DreamGF app on iOS/Android. Mobile browser experience is solid with responsive design, touch-friendly character builder, reasonable image loading speeds. Desktop preferred for detailed creation.",
  },
  "feetfinder": {
    gettingStarted: "Setting up a seller account on FeetFinder takes about ten minutes. You will need a valid email, government-issued ID for age and identity verification, and a payment method for the subscription. The verification process typically completes within 24 to 48 hours. Once approved, your FeetFinder login gives you access to the seller dashboard where you can start uploading content immediately.",
    interfaceNavigation: "The seller dashboard is functional but not flashy. You can manage uploads, view messages, track earnings, and update your profile from a central hub. Content uploading is straightforward — drag and drop files, add descriptions and pricing, and choose categories. The buyer-side interface is a grid-based discovery system where users browse seller profiles filtered by categories, popularity, and price. Navigation works but feels dated compared to newer platforms like Footly.",
    mobileExperience: "The FeetFinder app is available for download on both Android and iOS devices. The mobile experience covers all essential functions — uploading, messaging, and managing sales. However, the app download has occasionally been flagged or removed from app stores due to content policies, so many users access the platform through mobile browsers instead. The responsive web version works well on phones.",
  },
  "onlyfans": {
    gettingStarted: "Creating an account is straightforward. Login works via email or social sign-in. Subscribers can browse and subscribe within minutes. Creators need ID verification (24-72 hours). Once verified, set subscription price, upload content, start accepting subscribers immediately.",
    interfaceNavigation: "Functional but noticeably basic compared to social media. Home feed shows content chronologically. Navigation includes feed, notifications, messages, bookmarks, and search. Search is intentionally limited — no content discovery system. Subscribers find creators only through direct links or external promotion. This is simultaneously the biggest weakness for new creators and the strongest privacy feature.",
    mobileExperience: "No dedicated OnlyFans app on iOS or Android app stores due to content restrictions. OnlyFans offers a progressive web app (PWA) that works in mobile browsers and can be added to home screen. Mobile web version is fully functional for both creators and subscribers. Absence of native app is a frequent complaint but PWA works well enough.",
  },
  "fansly": {
    gettingStarted: "Under five minutes to create account. Email registration + ID verification for creators. Onboarding guides profile setup, tier configuration, first upload. More structured than OnlyFans onboarding.",
    interfaceNavigation: "Modern, clean dark-themed dashboard. Intuitive navigation between feed, explore, messages, notifications, analytics. Explore page with search functionality is the standout. Content organization with labels superior to OnlyFans' chronological feed.",
    mobileExperience: "No native app on iOS/Android. Mobile browser experience is excellent — responsive, fast, touch-optimized. PWA available for home screen. Many creators report smoother mobile experience than OnlyFans.",
  },
  "bumble": {
    gettingStarted: "Five to ten minutes. Sign up via phone, Apple ID, or Facebook. Onboarding covers photos, bio, preferences. Photo verification optional but recommended — verified profiles get significantly more matches.",
    interfaceNavigation: "One of the cleanest dating app interfaces. Uncluttered swiping screen, large photos, clear text. Bottom tab navigation. Modern and pleasant to use. Settings logically organized.",
    mobileExperience: "Mobile-first app available on iOS and Android. Web version exists but limited. Push notifications reliable. App runs smoothly on all devices. Polished, stable, best-in-class.",
  },
  "chaturbate": {
    gettingStarted: "Creating an account takes two minutes. Viewers need only an email. Performers require age verification with government ID, typically processed within 24-48 hours. Broadcasting begins immediately after verification.",
    interfaceNavigation: "Chaturbate's interface is its weakest point. The design looks like it has not been significantly updated since launch. The homepage displays a grid of live thumbnails sorted by viewer count. Navigation is basic with category tabs and a search bar. It works, but it feels dated compared to Stripchat's modern design or LiveJasmin's polished interface.",
    mobileExperience: "The Chaturbate app is not available on app stores, but the mobile website works adequately. Browsing, watching, and tipping all function on mobile. The experience is serviceable but not optimized for touch interaction in the way that Stripchat's mobile experience is.",
  },
  "stripchat": {
    gettingStarted: "Quick registration via email. Performer verification within 24-48 hours. Viewers can start watching immediately without an account.",
    interfaceNavigation: "Modern, dark-themed design that feels contemporary. Homepage features a mix of trending performers, categories, and AI-recommended streams. Search and filtering are significantly better than Chaturbate. The overall experience feels like a platform built in the 2020s rather than the 2010s.",
    mobileExperience: "Excellent mobile experience. The responsive design works smoothly on phones with touch-optimized controls. No native Stripchat app on app stores, but the mobile website functions effectively as a PWA.",
  },
  "tinder": {
    gettingStarted: "Five minutes. Phone number or social login. Add photos, write bio, set preferences. Straightforward onboarding.",
    interfaceNavigation: "The original swipe UI remains intuitive and fast. Tinder has added more features over the years, and the app can feel cluttered compared to its original simplicity. Ads appear frequently for free users, pushing upgrades aggressively. The messaging interface is functional but basic.",
    mobileExperience: "Tinder is mobile-first with excellent iOS and Android apps. Also available as a web app. Push notifications for matches and messages work reliably. App performance is smooth and stable.",
  },
  "fanvue": {
    gettingStarted: "Quick registration with email and ID verification. Creator approval within 24-48 hours. Clean onboarding flow guides profile setup and first content upload.",
    interfaceNavigation: "Modern, polished design with a dark theme. The creator dashboard is well-organized with analytics, content management, messaging, and AI tools accessible from a single navigation bar. Cleaner and more intuitive than OnlyFans.",
    mobileExperience: "No native FanVue app. Mobile browser experience is functional with responsive design. Desktop provides the best experience for detailed analytics and content management.",
  },
  "patreon": {
    gettingStarted: "Registration is straightforward. No ID verification required for non-adult creators. Set up your page, create tiers, describe benefits, and start accepting patrons immediately.",
    interfaceNavigation: "Professional and polished. The creator dashboard is well-organized with clear navigation between posts, patrons, analytics, and settings. The patron experience is equally clean with easy access to content, community, and membership management.",
    mobileExperience: "Native Patreon app on iOS and Android. Smooth experience for both creators and patrons. Content consumption, posting, messaging, and patron management all work well on mobile.",
  },
};

const privacyCardOverrides: Record<string, TrustCard[]> = {
  "candy-ai": [
    { icon: "lock", title: "Data Encryption", description: "Candy.ai uses SSL/TLS encryption to protect all data transmitted between your browser and their servers. Conversations and personal data are encrypted in transit, meeting industry norms for AI companion platforms." },
    { icon: "credit-card", title: "Discreet Billing", description: "Charges appear discreetly on credit card and bank statements using a generic billing descriptor. The platform name does not show up, which is important for users who value financial privacy." },
    { icon: "shield-check", title: "Content Moderation", description: "Candy.ai enforces content policies in line with industry standards, including DMCA compliance and age verification for adult content access. All users must confirm they are 18 or older." },
    { icon: "eye-off", title: "Account Privacy", description: "You can use Candy.ai with minimal personal information. No social media linking is required, and account deletion is available upon request. Personal information is not sold to third parties." },
  ],
  "dreamgf-ai": [
    { icon: "lock", title: "Data Encryption", description: "SSL/TLS encryption for all connections. Content, account data, payments encrypted in transit." },
    { icon: "credit-card", title: "Discreet Billing", description: "Generic billing descriptor on statements. Platform name not visible." },
    { icon: "shield-check", title: "Content Moderation", description: "NSFW restricted to verified premium users. Age verification required. Boundaries against illegal content." },
    { icon: "eye-off", title: "Account Privacy", description: "Anonymous usage without social media linking. Account deletion available. Privacy policy less detailed than Candy.ai on data retention specifics." },
  ],
  "feetfinder": [
    { icon: "lock", title: "Data Encryption", description: "FeetFinder uses SSL/TLS encryption across the entire platform. All data transfers between your browser and their servers are secured, including payment information and uploaded content." },
    { icon: "credit-card", title: "Discreet Billing", description: "Charges appear on bank and credit card statements under a generic billing descriptor. The FeetFinder name does not show up on financial statements." },
    { icon: "shield-check", title: "Content Protection", description: "All uploaded content is watermarked and protected against unauthorized downloading. FeetFinder actively enforces DMCA takedown requests when content is stolen." },
    { icon: "eye-off", title: "Identity Verification", description: "Both sellers and buyers must verify their identity. Sellers provide government ID for age verification. This dramatically reduces fake accounts and scam attempts." },
  ],
  "onlyfans": [
    { icon: "lock", title: "Data Encryption", description: "Bank-grade SSL/TLS encryption across the entire platform. No major data breaches despite high profile and sensitive user data." },
    { icon: "credit-card", title: "Discreet Billing", description: "Charges appear under 'OnlyFans' or 'Fenix International'. Does not indicate content type purchased." },
    { icon: "shield-check", title: "Age Verification", description: "Government-issued ID required for all creators. Subscribers must confirm 18+. Strengthened over the years in response to regulatory pressure." },
    { icon: "eye-off", title: "Content Protection", description: "DMCA takedown enforcement, watermarking, and screenshot detection. Subscriber activity is private and not publicly visible. Creator anonymity possible with stage name but real ID is tied to the platform." },
  ],
  "fansly": [
    { icon: "lock", title: "Data Encryption", description: "SSL/TLS encryption for all data transfers including content, messages, and payments." },
    { icon: "credit-card", title: "Discreet Billing", description: "Generic billing descriptor on statements. Fansly name not explicitly visible." },
    { icon: "shield-check", title: "Content Protection", description: "DMCA enforcement and watermarking. Fansly downloader tools exist online and content theft remains a challenge, but Fansly actively combats this." },
    { icon: "eye-off", title: "Identity Verification", description: "Government ID required for all creators before posting. Reduces fake accounts and ensures age compliance." },
  ],
  "bumble": [
    { icon: "lock", title: "Photo Verification", description: "Real-time selfie matching specific pose. Blue checkmark badge. Dramatically reduces catfishing and fake profiles." },
    { icon: "shield-check", title: "AI Content Moderation", description: "Detects and flags inappropriate messages and photos. Offensive content auto-detected. Warnings and bans for violations." },
    { icon: "eye-off", title: "Block & Report", description: "Comprehensive reporting for fake profiles and inappropriate behavior. Moderation team reviews reports. Instant blocking available." },
    { icon: "credit-card", title: "Incognito Mode", description: "Premium feature — profile visible only to people you swiped right on. Essential for users needing discretion." },
  ],
  "chaturbate": [
    { icon: "lock", title: "SSL Encryption", description: "SSL/TLS encryption for all data transfers including streams, chat, and payment information." },
    { icon: "credit-card", title: "Discreet Billing", description: "Token purchases appear under a generic billing descriptor. Chaturbate name not visible on statements." },
    { icon: "shield-check", title: "Age Verification", description: "Government ID required for all performers before broadcasting. Ensures age compliance and reduces fake accounts." },
    { icon: "eye-off", title: "Anonymous Viewing", description: "No account required for basic viewing. Free browsing without providing personal information." },
  ],
  "stripchat": [
    { icon: "lock", title: "SSL Encryption", description: "SSL/TLS encryption for all connections including streams, chat, and payments." },
    { icon: "credit-card", title: "Discreet Billing", description: "Generic billing descriptor on statements. Stripchat name not visible." },
    { icon: "shield-check", title: "Performer Verification", description: "Age and identity verification for all performers. Standard compliance measures." },
    { icon: "eye-off", title: "Account Privacy", description: "Anonymous browsing available. Invisible mode for Ultimate members. Account deletion available." },
  ],
};

const privacyOverrides: Record<string, string> = {
  "candy-ai": "So, is Candy.ai a scam? Based on our 30+ days of testing: absolutely not. It is a legitimate, well-built platform with a clear business model. Is Candy.ai safe? Yes, with reasonable privacy protections that meet what we would expect for this category. Is Candy.ai legit? The company operates transparently, processes refund requests, and has a growing presence on review platforms like Trustpilot. We found no red flags during our extended testing period.",
  "dreamgf-ai": "Is DreamGF legit? Yes — functioning platform with working payments and active users. Is DreamGF safe? Reasonably — standard protections in place. Is it a scam? No — delivers on promises, especially image generation. Free tier is very limited; full experience requires subscription.",
  "feetfinder": "So, is FeetFinder legit? Absolutely. After testing the platform extensively from both sides, FeetFinder is a legitimate, well-established marketplace with a real business model, genuine buyer traffic, and functioning payout systems. Is FeetFinder safe? Yes — the combination of identity verification, encryption, content protection, and discreet billing makes it one of the safest options available. Is FeetFinder a scam? No. There are legitimate criticisms around pricing and competition levels, but the platform itself operates transparently and has been doing so since 2019.",
  "onlyfans": "Is OnlyFans legit? Without question. Operated by Fenix International Limited, a UK-based company processing billions in creator payouts annually. Is OnlyFans safe? Yes, with strong privacy protections and reliable security. Is OnlyFans a scam? Absolutely not — individual creator quality varies but the platform itself is entirely legitimate and one of the most established names in the creator economy.",
  "fansly": "Is Fansly legit? Yes — legitimate platform with functioning payments, real payouts, growing user base. Is Fansly safe? Yes, with standard security meeting industry norms. Is Fansly a scam? No — platform is legitimate though some Trustpilot reviewers report support issues worth noting.",
  "bumble": "Is Bumble safe? Yes — among the safest mainstream dating apps. Is Bumble legit? Absolutely — publicly traded company (NASDAQ: BMBL). Is Bumble a scam? No — genuine dating experience with real users. Some frustration around pricing, but platform is legitimate.",
  "chaturbate": "Is Chaturbate safe? Yes, with standard security protections. SSL encryption, age verification for performers, and discreet billing for token purchases. Is Chaturbate legit? Absolutely — one of the longest-running and most established cam platforms globally. Is Chaturbate a scam? No — legitimate platform with millions of daily users. Is Chaturbate free? Yes, public broadcasts are completely free to watch. Tokens are only needed for interacting with performers.",
  "stripchat": "Is Stripchat safe? Yes. SSL encryption, performer verification, discreet billing, and standard account security. Is Stripchat legit? Yes — operated by a legitimate company with millions of daily users. Is Stripchat free? Yes, public broadcasts are completely free to watch. Tokens are only needed for tipping and private shows.",
};

const tipsOverrides: Record<string, Tip[]> = {
  "candy-ai": [
    { title: "Start with the Free Tier Before Committing", description: "Spend at least two or three days on the free plan before purchasing a subscription. This gives you enough time to evaluate conversation quality and decide if the platform matches your expectations without risking any money." },
    { title: "Invest Time in Character Creation", description: "The more detail you provide during setup — interests, humor level, communication style, emotional depth — the more natural and personalized your chat experience will feel from day one. Do not rush the character builder." },
    { title: "Use Voice Messages for Deeper Immersion", description: "The voice feature adds a layer of realism that text alone simply cannot replicate. Enable it in settings and try sending voice-based requests — the responses feel surprisingly natural and emotionally appropriate." },
    { title: "Reference Past Conversations", description: "Candy.ai's memory feature works best when you actively build on previous interactions. Mention things you discussed earlier, reference inside jokes, and the AI will pick up continuity that makes the experience feel like an evolving relationship." },
    { title: "Experiment with Multiple Companions", description: "Do not limit yourself to a single character. Different personality configurations produce completely different experiences. Try creating two or three AI girlfriends with contrasting traits to discover what you enjoy most." },
  ],
  "dreamgf-ai": [
    { title: "Start Free to Test the Builder", description: "Explore creation tools before paying. Free tier shows builder quality and sample images." },
    { title: "Invest Time in Character Customization", description: "More specific character creation = better results across all future generations." },
    { title: "Use Silver Tier for Best Value", description: "Bronze is fine for exploring but Silver at $19.99 unlocks genuine quality. Skip Gold unless generating daily." },
    { title: "Build a Gallery Over Time", description: "Save favorites and learn what prompts/scenarios produce best results." },
    { title: "Pair with a Chat-Focused Platform", description: "Use DreamGF for visuals and Candy.ai or CrushOn.ai for conversation. Best of both worlds." },
  ],
  "feetfinder": [
    { title: "Invest Time in Your FeetFinder Bio", description: "Your bio is the first thing buyers see. Write a clear, engaging description that explains your content style, upload schedule, and specialties. A strong FeetFinder bio converts browsers into buyers." },
    { title: "Choose a Memorable Username", description: "Spend time on FeetFinder username ideas before committing. Avoid generic names and pick something catchy, easy to remember, and relevant to feet content. Good FeetFinder names create instant brand recognition." },
    { title: "Post Consistently and Build Volume", description: "Sellers with larger content libraries get more visibility. Aim for three to five new uploads per week. Consistency signals to both the algorithm and buyers that you are active and reliable." },
    { title: "Use Social Media to Drive External Traffic", description: "Do not rely solely on internal discovery. Promote your profile on Twitter/X, Reddit, TikTok, and Instagram. The most successful sellers combine platform presence with external marketing." },
    { title: "Respond to Messages Quickly", description: "Buyer interest has a short lifespan. Sellers who respond within a few hours consistently outsell those who take days. Custom content requests are where the real money is." },
  ],
  "onlyfans": [
    { title: "Build Your Audience Before You Launch", description: "Spend 1-2 months building followers on Twitter/X, TikTok, Instagram, or Reddit before launching OnlyFans. Even 500-1,000 engaged followers is enough for a strong start." },
    { title: "Use a Free Page as a Funnel", description: "Create a free OnlyFans alongside your paid one. Post teaser content on free page to convert fans toward paid subscription. Consistently outperforms paid-only approaches." },
    { title: "Prioritize PPV and Custom Content", description: "Highest earners make the majority from pay-per-view messages and custom requests. Send regular PPV drops and be responsive to custom inquiries." },
    { title: "Post Consistently and Engage Daily", description: "Post 3-5 times per week minimum, respond to messages daily, go live weekly. Consistency is the single strongest predictor of earnings growth." },
    { title: "Diversify Across Platforms", description: "Use Fansly or FanVue as backups, maintain active social media, consider FeetFinder or Snifffr for physical items. Platform diversification protects your income." },
  ],
  "fansly": [
    { title: "Set Up Multiple Tiers from Day One", description: "Low-cost entry, mid-range popular, premium VIP. Price middle tier as best value." },
    { title: "Use Labels and Content Organization", description: "Categorize every piece of content. Organized profiles convert better." },
    { title: "Leverage the Explore Page", description: "Post consistently with relevant tags. Fansly rewards active creators with organic visibility." },
    { title: "Cross-Promote Between OnlyFans and Fansly", description: "Run both simultaneously. Promote each in the other's bio." },
    { title: "Engage in DMs and Build Relationships", description: "Respond promptly, offer custom content. DMs drive tips, PPV, and retention." },
  ],
  "bumble": [
    { title: "Invest in Profile Photos", description: "Clear headshot first, one full-body, hobby photos. Six photos significantly outperform three." },
    { title: "Verify Immediately", description: "Free, takes 30 seconds, adds blue checkmark, meaningfully improves match rate." },
    { title: "Answer Bio Prompts Thoughtfully", description: "Specific answers always outperform generic ones. Invite conversation." },
    { title: "Be Active During Peak Hours", description: "Sunday-Thursday evenings 7-10 PM. Consistent daily usage beats binge-swiping." },
    { title: "Women: Send Engaging First Messages", description: "Reference something specific from their profile. Personalized messages convert 3-5x better than generic greetings." },
  ],
  "chaturbate": [
    { title: "Create a Free Account", description: "Viewers: Create a free account to access chat, follow favorites, and get notifications when performers go live." },
    { title: "Buy Tokens in Larger Bundles", description: "Viewers: Buy tokens in larger bundles for better per-token value. The 500-token bundle offers the best balance." },
    { title: "Invest in a Lovense Toy", description: "Performers: Interactive tip-activated shows earn 2-3x more than standard broadcasting." },
    { title: "Set Clear Tip Menus and Room Goals", description: "Performers: Viewers tip more when they know exactly what each amount unlocks." },
    { title: "Broadcast Consistently at Set Times", description: "Performers: Regular scheduling builds a loyal viewer base." },
  ],
  "stripchat": [
    { title: "Try VR If You Have a Headset", description: "The VR experience is Stripchat's biggest differentiator. Even basic VR headsets provide a dramatically more immersive experience." },
    { title: "Use AI Recommendations", description: "Let the algorithm learn your preferences. The more you watch, the better the AI suggestions become." },
    { title: "Buy Tokens in Bulk", description: "The 520-token bundle at $49.99 offers the best per-token value for regular viewers." },
    { title: "Performers: Leverage VR Shows", description: "VR-compatible performers earn premium rates. Invest in VR setup to access this growing market." },
    { title: "Use Mobile for Casual Browsing", description: "Stripchat's mobile experience is excellent. Save desktop for VR and private shows." },
  ],
};

// ── Generic generators ──

function getCategorySignupFlow(category: string, name: string): string {
  const flows: Record<string, string> = {
    "AI Companions": `Getting started with ${name} is straightforward. You can sign up using an email address or social login — the process takes just a couple of minutes. Once registered, the platform guides you through initial setup, helping you configure your preferences and start your first interaction quickly.`,
    "Creator Platforms": `Creating an account on ${name} is simple and takes under five minutes. You'll need to provide basic information and verify your identity for security purposes. The onboarding process walks you through setting up your profile, configuring payment preferences, and understanding the platform's features before you start.`,
    "Live Cam Sites": `Signing up for ${name} is quick and free — just provide an email and create a password. No credit card is required for basic access. The platform drops you into the action immediately, with live rooms visible right from the homepage. Purchasing tokens or credits takes just a few additional clicks.`,
    "Dating & Hookup Apps": `Registration on ${name} involves creating a profile with photos and basic details about yourself. The verification process helps ensure authentic users. Depending on your subscription level, you can start browsing and messaging matches within minutes of completing your profile.`,
    "Sexting & Chat": `Getting started on ${name} is designed to be fast and anonymous. You can register with minimal personal information and begin chatting almost immediately. The platform prioritizes quick connections, so the onboarding process is streamlined to get you into conversations as fast as possible.`,
    "Tube & Streaming": `${name} requires no registration for basic browsing. Creating a free account unlocks additional features like favorites, playlists, and personalized recommendations. The signup process takes under a minute with just an email address.`,
  };
  return flows[category] || flows["AI Companions"];
}

function getCategoryInterfaceDesc(category: string, name: string): string {
  const descs: Record<string, string> = {
    "AI Companions": `The ${name} interface follows a modern chat-centric layout. The main conversation area is front and center, with navigation options accessible through a sidebar or menu. Settings and account management are easy to find, and the overall design feels responsive and polished. Response times are generally fast, keeping conversations flowing naturally.`,
    "Creator Platforms": `${name} features a dashboard-style interface with clear navigation between content management, messaging, analytics, and earnings. The content upload process is intuitive, and the discovery/search system helps connect creators with their audience. The platform's layout is functional and gets the job done without unnecessary complexity.`,
    "Live Cam Sites": `The ${name} interface is built around live content discovery. The homepage displays a grid of active streams with thumbnails, viewer counts, and category tags. Filtering and search tools help you find specific content, and the chat interface within streams is straightforward. The video player supports multiple quality settings for different connection speeds.`,
    "Dating & Hookup Apps": `${name} uses a familiar dating app interface with profile browsing, matching, and messaging sections. The profile cards are clean and informative, and the messaging system supports text, photos, and in some cases video. Search filters and preferences help narrow down potential matches to your specific interests.`,
    "Sexting & Chat": `The ${name} interface is built for fast, private conversations. The chat window is clean and distraction-free, with easy access to media sharing and profile information. The platform keeps things simple — no unnecessary features to navigate around. Connection matching and chat initiation are designed to be as seamless as possible.`,
    "Tube & Streaming": `${name} features a familiar video platform layout with a search bar, category navigation, and content grid. The video player is responsive with adjustable quality settings. Related content suggestions and trending sections help with discovery, and the overall browsing experience is smooth and intuitive.`,
  };
  return descs[category] || descs["AI Companions"];
}

function getCategoryMobileDesc(category: string, name: string): string {
  const descs: Record<string, string> = {
    "AI Companions": `${name} offers a responsive mobile experience through the browser, and may also have a dedicated app available. The mobile layout adapts well to smaller screens, maintaining full functionality. Chat interactions feel natural on mobile, with optimized input and quick response rendering.`,
    "Creator Platforms": `${name} is accessible on mobile devices through a responsive web design. Content uploading, messaging, and account management all work on mobile, though the desktop version offers a more comprehensive experience for content management tasks. Push notifications keep you informed of new activity.`,
    "Live Cam Sites": `${name} works on mobile browsers with adaptive streaming quality. The mobile experience provides access to live streams, chat, and tipping features. While the full-screen viewing experience is best on desktop, mobile users can enjoy shows on the go with reasonable video quality.`,
    "Dating & Hookup Apps": `${name} is designed mobile-first, with a smooth experience on both iOS and Android. The app (or mobile site) provides full access to profiles, messaging, and matching features. Push notifications ensure you never miss a new match or message.`,
    "Sexting & Chat": `${name} works well on mobile devices with a responsive design that adapts to any screen size. The chat experience is optimized for mobile use, with easy media sharing and a clean interface. Mobile users get the full feature set available on desktop.`,
    "Tube & Streaming": `${name} is fully responsive on mobile devices with adaptive video streaming. The mobile experience provides easy browsing, search, and playback with quality that adjusts to your connection speed. The interface is touch-friendly and navigation is intuitive.`,
  };
  return descs[category] || descs["AI Companions"];
}

export function getUserExperience(review: DetailedReview): UserExperienceContent {
  if (uxOverrides[review.slug]) return uxOverrides[review.slug];
  return {
    gettingStarted: getCategorySignupFlow(review.category, review.name),
    interfaceNavigation: getCategoryInterfaceDesc(review.category, review.name),
    mobileExperience: getCategoryMobileDesc(review.category, review.name),
  };
}

function getCategoryPrivacyCards(category: string, name: string): TrustCard[] {
  return [
    { icon: "lock", title: "Data Encryption", description: `${name} uses SSL/TLS encryption to protect all data transmitted between your browser and their servers. Your conversations and personal data are encrypted in transit.` },
    { icon: "credit-card", title: "Discreet Billing", description: `Charges from ${name} appear discreetly on credit card and bank statements. The platform uses a generic billing descriptor to protect your privacy.` },
    { icon: "shield-check", title: "Content Moderation", description: `${name} enforces content policies in line with industry standards, including DMCA compliance and age verification for adult content access.` },
    { icon: "eye-off", title: "Account Privacy", description: `${name} allows anonymous usage with minimal personal information required. Account deletion is available upon request, removing your data from their systems.` },
  ];
}

function getCategoryPrivacyAnalysis(category: string, name: string): string {
  const analyses: Record<string, string> = {
    "AI Companions": `${name} implements standard security measures including SSL encryption and secure data storage. The platform's privacy policy outlines data collection practices, and users can request full account deletion. While AI platforms do collect conversation data to improve their models, ${name} states that personal information is not shared with third parties. For an AI companion platform, the privacy protections are in line with industry expectations.`,
    "Creator Platforms": `${name} prioritizes creator and buyer privacy with verified accounts and secure payment processing. The platform complies with relevant data protection regulations and offers account privacy controls. Payment information is handled through secure third-party processors, and content is protected by DMCA policies. Creators retain control over their content and can request full data removal.`,
    "Live Cam Sites": `${name} uses encrypted connections for all streaming and payment activity. The platform processes payments through reputable third-party providers with discreet billing descriptors. User data is protected under the platform's privacy policy, and accounts can be fully deleted upon request. As with most cam sites, anonymous browsing is supported for basic access.`,
    "Dating & Hookup Apps": `${name} takes user privacy seriously with profile verification, encrypted messaging, and discreet billing practices. The platform complies with applicable data protection laws including GDPR where relevant. Users can control profile visibility and manage their data through account settings. Photo verification and moderation help maintain a trustworthy environment.`,
    "Sexting & Chat": `${name} emphasizes anonymity and discretion as core features. The platform uses encryption for all communications and minimizes the personal information required to create an account. Billing is handled discreetly, and conversation data can be deleted at any time. The platform's privacy-first approach is appropriate for its intimate use case.`,
    "Tube & Streaming": `${name} provides standard privacy protections for a content platform, including encrypted browsing and account security features. No personal information is required for basic browsing. Registered users can manage their data and delete their accounts. The platform complies with DMCA and relevant content regulations.`,
  };
  return analyses[category] || analyses["AI Companions"];
}

export function getPrivacyTrust(review: DetailedReview): PrivacyTrustContent {
  return {
    cards: privacyCardOverrides[review.slug] || getCategoryPrivacyCards(review.category, review.name),
    analysis: privacyOverrides[review.slug] || getCategoryPrivacyAnalysis(review.category, review.name),
  };
}

function getCategoryTips(category: string, name: string, review: DetailedReview): Tip[] {
  const tipsMap: Record<string, Tip[]> = {
    "AI Companions": [
      { title: "Start with the Free Tier", description: `Test ${name}'s basic features before upgrading. This lets you evaluate the conversation quality and see if the platform fits your needs.` },
      { title: "Invest Time in Customization", description: `The more detail you provide during setup — personality preferences, interests, communication style — the better your experience will be from the start.` },
      { title: "Explore All Features", description: `Don't just stick to text chat. Try voice messages, image generation, or any premium features available to get the full experience.` },
      { title: "Build Conversation History", description: `The AI improves with context. Reference past topics and build on shared interactions for more natural, engaging conversations over time.` },
      { title: "Try Different Characters", description: `Experiment with multiple AI companions or personality settings. Different configurations offer different experiences and help you discover what you enjoy most.` },
    ],
    "Creator Platforms": [
      { title: "Optimize Your Profile First", description: `Before posting content, make sure your profile is complete with a compelling bio, quality profile photo, and clear description of what you offer on ${name}.` },
      { title: "Post Consistently", description: `Regular uploads keep your audience engaged and help you appear in discovery feeds. Aim for a consistent posting schedule rather than sporadic bulk uploads.` },
      { title: "Engage with Your Audience", description: `Respond to messages and comments promptly. Engaged creators earn more and build loyal fan bases that provide steady income over time.` },
      { title: "Cross-Promote Your Content", description: `Share your ${name} profile on social media and other platforms to drive traffic. Diversifying your audience sources protects against platform changes.` },
      { title: "Price Strategically", description: `Research what similar creators charge on ${name}. Start with competitive pricing to build a customer base, then adjust as your reputation grows.` },
    ],
    "Live Cam Sites": [
      { title: "Browse Free Content First", description: `${name} offers plenty of free content to explore before spending money. Use this to find performers and content types you enjoy most.` },
      { title: "Set a Budget", description: `Tokens and credits can add up quickly. Set a monthly spending limit before you start tipping to keep your entertainment spending in check.` },
      { title: "Follow Your Favorites", description: `Follow or favorite performers you enjoy so you're notified when they go live. This ensures you never miss their shows.` },
      { title: "Try Different Show Types", description: `${name} offers various show formats — public, private, group, and more. Experiment with different types to find what gives you the best experience.` },
      { title: "Use Interactive Features", description: `Many performers use tip-activated toys and interactive features. Engaging with these creates a more immersive and personal experience.` },
    ],
    "Dating & Hookup Apps": [
      { title: "Complete Your Profile Fully", description: `Profiles with detailed bios and multiple photos get significantly more matches on ${name}. Take time to present yourself authentically.` },
      { title: "Be Clear About Intentions", description: `Honesty about what you're looking for saves time for both you and potential matches. ${name} works best when expectations are aligned.` },
      { title: "Upgrade Strategically", description: `Try the free tier first to gauge the user base in your area. Premium features are worth it only if you're seeing potential matches worth pursuing.` },
      { title: "Stay Safe", description: `Always meet in public places for first dates. Share your plans with a friend and trust your instincts. Safety should always come first.` },
      { title: "Be Responsive", description: `Quick replies show genuine interest. The ${name} algorithm often favors active users, so regular engagement can improve your visibility.` },
    ],
    "Sexting & Chat": [
      { title: "Start with Free Features", description: `Explore ${name}'s free options before purchasing credits or a subscription. This helps you understand the platform and find the right connections.` },
      { title: "Set Clear Boundaries", description: `Be upfront about your comfort levels and preferences. Good communication leads to better experiences for everyone involved.` },
      { title: "Protect Your Identity", description: `Use a username that doesn't reveal your real identity. Be cautious about sharing personal information until you're comfortable.` },
      { title: "Use Platform Features", description: `${name} has built-in tools for safe interactions. Use platform messaging rather than sharing personal contact information.` },
      { title: "Report Issues Promptly", description: `If you encounter inappropriate behavior, report it immediately. This helps keep the ${name} community safe and enjoyable for everyone.` },
    ],
    "Tube & Streaming": [
      { title: "Create an Account for Extras", description: `While ${name} allows anonymous browsing, creating a free account unlocks favorites, playlists, and personalized recommendations.` },
      { title: "Use Search Filters", description: `${name}'s search and filter tools help you find exactly what you're looking for. Learn the category system to browse more efficiently.` },
      { title: "Adjust Video Quality", description: `If videos are buffering, lower the quality setting. If your connection is strong, switch to HD for the best viewing experience.` },
      { title: "Build Playlists", description: `Save content you enjoy to playlists for easy access later. This saves time browsing and creates a curated collection.` },
      { title: "Explore Categories", description: `Don't just stick to the homepage. Browse different categories and tags to discover content you might not have found otherwise.` },
    ],
  };
  return tipsMap[category] || tipsMap["AI Companions"];
}

export function getTips(review: DetailedReview): Tip[] {
  if (tipsOverrides[review.slug]) return tipsOverrides[review.slug];
  return getCategoryTips(review.category, review.name, review);
}

export function getExtraFaqs(review: DetailedReview): { question: string; answer: string }[] {
  const alts = review.alternatives.slice(0, 3);
  const altNames = alts.map(s => {
    const nameMap: Record<string, string> = {
      "candy-ai": "Candy.ai", "crushon-ai": "CrushOn.ai", "dreamgf-ai": "DreamGF.ai",
      "replika": "Replika", "soulfun-ai": "SoulFun.ai", "girlfriendgpt": "GirlfriendGPT",
      "kupid-ai": "Kupid.ai", "get-honey-ai": "Get-Honey.ai", "kalon-ai": "Kalon.ai",
      "myanima": "MyAnima", "infatuated-ai": "Infatuated.ai", "ourdream-ai": "OurDream.ai",
      "soulgen-ai": "SoulGen.ai", "pornpen-ai": "Pornpen.ai",
      "feetfinder": "FeetFinder", "fetishfinder": "FetishFinder", "footly": "Footly",
      "funwithfeet": "FunWithFeet", "feetify": "Feetify", "snifffr": "Snifffr",
      "sofia-gray": "Sofia Gray", "pantydeal": "PantyDeal", "all-things-worn": "All Things Worn",
      "manyvids": "ManyVids", "clips4sale": "Clips4Sale", "loyalfans": "LoyalFans",
      "justforfans": "JustFor.Fans", "admireme-vip": "AdmireMe VIP",
      "cam4": "Cam4", "bongacams": "BongaCams", "livejasmin": "LiveJasmin",
      "jerkmate": "Jerkmate", "flirt4free": "Flirt4Free", "camsoda": "CamSoda",
      "myfreecams": "MyFreeCams", "slutroulette": "SlutRoulette",
      "sugardaddy": "SugarDaddy.com", "secret-benefits": "Secret Benefits",
      "seeking": "Seeking", "sugardaddymeet": "SugarDaddyMeet", "sugarbook": "Sugarbook",
      "whats-your-price": "WhatsYourPrice", "adultfriendfinder": "AdultFriendFinder",
      "pure-app": "Pure", "feeld": "Feeld",
      "arousr": "Arousr", "sextfriend": "SextFriend", "flingster": "Flingster",
      "chatrandom": "ChatRandom", "smutfinder": "SmutFinder",
    };
    return nameMap[s] || s;
  });

  const altList = altNames.length > 0
    ? altNames.join(", ")
    : "several platforms in this category";

  return [
    {
      question: `Is ${review.name} worth the money?`,
      answer: `${review.name} offers solid value for its ${review.pricing} pricing. The free tier lets you test core features before committing. Premium adds ${review.category === "AI Companions" ? "unlimited messaging, image generation, and priority responses" : review.category === "Creator Platforms" ? "better visibility, lower fees, and advanced analytics" : "full access to premium content and enhanced features"} that significantly improve the experience. Whether it's worth it depends on how much you use the platform — regular users will find the upgrade pays for itself.`,
    },
    {
      question: `How do I cancel my ${review.name} subscription?`,
      answer: `You can cancel your ${review.name} subscription anytime through your account settings. Navigate to the billing or subscription section and click "Cancel Subscription." Your access continues until the end of your current billing period. If you have trouble cancelling, you can also contact ${review.name}'s support team via email for assistance.`,
    },
    {
      question: `What are the best alternatives to ${review.name}?`,
      answer: `The top alternatives to ${review.name} include ${altList}. Each offers different strengths — check our individual reviews to find which platform best matches your specific needs and budget. We recommend trying free tiers on multiple platforms before committing.`,
    },
    {
      question: `Does ${review.name} work outside the US?`,
      answer: `Yes, ${review.name} is accessible internationally in most countries. The platform supports users worldwide, though some features or payment methods may vary by region. ${review.category === "Dating & Hookup Apps" ? "User bases tend to be larger in the US, UK, and Western Europe." : "Content and services are generally the same regardless of location."} Check the platform's terms of service for any regional restrictions.`,
    },
  ];
}
