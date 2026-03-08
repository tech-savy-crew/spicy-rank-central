import { useState } from "react";
import { Layout } from "@/components/Layout";
import { PlatformCard } from "@/components/PlatformCard";
import { SEO, itemListSchema, breadcrumbSchema } from "@/components/SEO";
import { platforms, categories } from "@/data/platforms";

const RankingsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"rating" | "name">("rating");

  const filtered = activeCategory === "All" ? platforms : platforms.filter((p) => p.category === activeCategory);
  const sorted = [...filtered].sort((a, b) =>
    sortBy === "rating" ? b.rating - a.rating : a.name.localeCompare(b.name)
  );

  return (
    <Layout>
      <SEO
        title="Platform Rankings — Best Digital Platforms"
        description="Every digital platform we've reviewed, ranked and sorted by rating. Find the best social media, streaming, gaming, and messaging platforms."
        canonical="/rankings"
        jsonLd={[
          itemListSchema(
            "Platform Rankings",
            sorted.map((p, i) => ({ name: p.name, url: `/review/${p.slug}`, position: i + 1 }))
          ),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Rankings", url: "/rankings" },
          ]),
        ]}
      />

      <div className="container py-12">
        <h1 className="text-3xl md:text-4xl font-black mb-2">Platform Rankings</h1>
        <p className="text-muted-foreground mb-8">Every platform we've reviewed, ranked and sorted</p>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "spicy-gradient text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-surface-hover"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "rating" | "name")}
            className="ml-auto bg-secondary text-secondary-foreground rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="rating">Sort by Rating</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {sorted.map((p) => (
            <PlatformCard key={p.id} platform={p} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default RankingsPage;
