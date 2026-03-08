import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { categories } from "@/data/platforms";
import { ArrowRight } from "lucide-react";

const categoryIcons: Record<string, string> = {
  "Social Media": "📱",
  "Streaming": "🎬",
  "Gaming": "🎮",
  "Messaging": "💬",
  "Productivity": "⚡",
  "Music": "🎵",
};

const CategoriesPage = () => {
  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl md:text-4xl font-black mb-2">Categories</h1>
        <p className="text-muted-foreground mb-10">Browse platforms by category</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.filter((c) => c !== "All").map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat.toLowerCase().replace(" ", "-")}`}
              className="group bg-card rounded-xl border border-border/50 p-8 card-hover flex flex-col items-center text-center"
            >
              <span className="text-5xl mb-4">{categoryIcons[cat] || "📦"}</span>
              <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{cat}</h2>
              <span className="text-sm text-primary font-medium inline-flex items-center gap-1">
                Browse <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoriesPage;
