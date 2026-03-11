import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { SEO, breadcrumbSchema } from "@/components/SEO";
import { reviewCategories } from "@/data/reviews";
import { ArrowRight, Users, Camera, Heart, Bot, MessageCircle } from "lucide-react";

const categoryMeta: Record<string, { icon: React.ElementType; emoji: string; description: string }> = {
  "Creator Platforms": { icon: Users, emoji: "💰", description: "OnlyFans, Fansly, FanVue, Patreon" },
  "Live Cam Sites": { icon: Camera, emoji: "🎥", description: "Chaturbate, Stripchat, Jerkmate, LiveJasmin & more" },
  "Dating & Hookup Apps": { icon: Heart, emoji: "❤️", description: "Tinder, Bumble, Seeking, Ashley Madison & more" },
  "AI Companions": { icon: Bot, emoji: "🤖", description: "Candy.ai, CrushOn, DreamGF, GirlfriendGPT, Replika" },
  "Fetish & Niche Marketplaces": { icon: MessageCircle, emoji: "🔥", description: "FeetFinder, FetishFinder, Snifffr" },
};

function categorySlug(cat: string) {
  return cat.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-");
}

const CategoriesPage = () => {
  return (
    <Layout>
      <SEO
        title="Browse Categories — Adult Platform Reviews | SpicyRanked"
        description="Explore adult platform reviews by category — Creator Platforms, Live Cam Sites, AI Companions, Dating Apps & Fetish Marketplaces."
        canonical="/categories"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Categories", url: "/categories" },
        ])}
      />

      <div className="container py-12">
        <h1 className="text-3xl md:text-4xl font-black mb-2">Categories</h1>
        <p className="text-muted-foreground mb-10">Browse platforms by category</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviewCategories.filter((c) => c !== "All").map((cat) => {
            const meta = categoryMeta[cat] || { icon: Users, emoji: "📦", description: "" };
            const Icon = meta.icon;
            return (
              <Link
                key={cat}
                to={`/category/${categorySlug(cat)}`}
                className="group bg-card rounded-xl border border-border/50 p-8 card-hover flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-xl spicy-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{cat}</h2>
                <p className="text-sm text-muted-foreground mb-3">{meta.description}</p>
                <span className="text-sm text-primary font-medium inline-flex items-center gap-1">
                  Browse <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default CategoriesPage;
