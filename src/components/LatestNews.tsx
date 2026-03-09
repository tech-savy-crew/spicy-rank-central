import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

interface NewsPost {
  category: string;
  categoryColor: string;
  categoryBg: string;
  gradientFrom: string;
  gradientTo: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  link: string;
}

const posts: NewsPost[] = [
  {
    category: "Creator Platforms",
    categoryColor: "#C05621",
    categoryBg: "#FEEBC8",
    gradientFrom: "#DD6B20",
    gradientTo: "#ED8936",
    title: "OnlyFans Updates Creator Payout Policy in 2026: What It Means for You",
    date: "March 5, 2026",
    readTime: "4 min read",
    excerpt: "OnlyFans has rolled out major changes to its creator payout structure. Here's what every creator needs to know about the new fee schedule.",
    link: "/reviews/onlyfans",
  },
  {
    category: "Creator Platforms",
    categoryColor: "#C05621",
    categoryBg: "#FEEBC8",
    gradientFrom: "#DD6B20",
    gradientTo: "#F6AD55",
    title: "Fansly Surpasses 5 Million Creators: Is It the New OnlyFans?",
    date: "March 2, 2026",
    readTime: "6 min read",
    excerpt: "Fansly just hit a massive milestone. We break down what this growth means for creators and whether it's time to switch.",
    link: "/blog/fansly-5-million-creators",
  },
  {
    category: "AI Companions",
    categoryColor: "#6B46C1",
    categoryBg: "#E9D8FD",
    gradientFrom: "#805AD5",
    gradientTo: "#B794F4",
    title: "Best NSFW AI Chatbots in 2026: Our Full Comparison",
    date: "February 28, 2026",
    readTime: "8 min read",
    excerpt: "We tested 12 AI companion apps head-to-head. From CrushOn to Candy AI, here's which ones actually deliver on their promises.",
    link: "/blog/best-nsfw-ai-chatbots-2026",
  },
  {
    category: "Live Cam",
    categoryColor: "#C53030",
    categoryBg: "#FED7E2",
    gradientFrom: "#E53E3E",
    gradientTo: "#FC8181",
    title: "Stripchat Launches VR 2.0: First Look at the New Features",
    date: "February 25, 2026",
    readTime: "5 min read",
    excerpt: "Stripchat's updated VR experience promises more immersive cam shows. We got early access to test the new features.",
    link: "/blog/stripchat-vr-2-features",
  },
];

export function LatestNews() {
  return (
    <section style={{ background: "#F7FAFC" }}>
      <div className="max-w-[1200px] mx-auto py-16 px-4">
        {/* Header */}
        <AnimatedSection>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-[28px] font-bold flex items-center gap-2" style={{ color: "#1A202C" }}>
                <Zap className="h-6 w-6" style={{ color: "#E53E3E" }} />
                Latest Platform News &amp; Updates
              </h2>
              <p className="text-base mt-1" style={{ color: "#718096" }}>
                Stay informed with the latest changes across adult platforms
              </p>
            </div>
            <Link to="/blog" className="text-sm font-medium hover:underline hidden md:block" style={{ color: "#E53E3E" }}>
              Read all articles →
            </Link>
          </div>
        </AnimatedSection>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post, i) => (
            <AnimatedSection key={post.link} delay={i * 80}>
              <Link
                to={post.link}
                className="group bg-white rounded-xl border overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex flex-col h-full"
                style={{ borderColor: "#E2E8F0" }}
              >
                {/* Image placeholder */}
                <div className="relative aspect-video">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${post.gradientFrom}, ${post.gradientTo})`,
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(45,55,72,0.6) 0%, transparent 60%)",
                    }}
                  />
                  {/* Category pill */}
                  <span
                    className="absolute bottom-2 left-3 text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ background: post.categoryBg, color: post.categoryColor }}
                  >
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-base leading-snug line-clamp-2 group-hover:text-[#E53E3E] transition-colors" style={{ color: "#1A202C" }}>
                    {post.title}
                  </h3>
                  <p className="text-xs mt-1.5 mb-2" style={{ color: "#A0AEC0" }}>
                    {post.date} · {post.readTime}
                  </p>
                  <p className="text-sm line-clamp-2 flex-1" style={{ color: "#718096" }}>
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium mt-3 group-hover:underline" style={{ color: "#E53E3E" }}>
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {/* Mobile link */}
        <div className="mt-4 lg:hidden text-center">
          <Link to="/blog" className="text-sm font-medium" style={{ color: "#E53E3E" }}>Read all articles →</Link>
        </div>
      </div>
    </section>
  );
}
