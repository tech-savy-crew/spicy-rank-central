import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SEO, itemListSchema, breadcrumbSchema } from "@/components/SEO";
import { reviewPlatforms, reviewCategories } from "@/data/reviews";
import { RatingBadge } from "@/components/RatingBadge";
import { ArrowRight } from "lucide-react";

function categorySlug(cat: string) {
  return cat.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-");
}

function categoryFromSlug(slug: string) {
  return reviewCategories.find((c) => categorySlug(c) === slug) || slug;
}

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const isAll = category === "all";
  const categoryName = isAll ? "All Platforms" : categoryFromSlug(category || "");

  const filtered = isAll
    ? reviewPlatforms
    : reviewPlatforms.filter((p) => categorySlug(p.category) === category);

  const sorted = [...filtered].sort((a, b) => b.score - a.score);

  return (
    <Layout>
      <SEO
        title={`${categoryName} Reviews & Rankings | SpicyRanked`}
        description={`Browse ${sorted.length} ${isAll ? "" : categoryName + " "}platform reviews. In-depth ratings, comparisons, and honest editorial opinions.`}
        canonical={`/category/${category}`}
        jsonLd={[
          itemListSchema(
            `${categoryName} Reviews`,
            sorted.map((p, i) => ({ name: p.name, url: `/reviews/${p.slug}`, position: i + 1 }))
          ),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Categories", url: "/categories" },
            { name: String(categoryName), url: `/category/${category}` },
          ]),
        ]}
      />

      <div className="container py-12">
        <h1 className="text-3xl md:text-4xl font-black mb-2">{categoryName}</h1>
        <p className="text-muted-foreground mb-8">
          {sorted.length} platform{sorted.length !== 1 ? "s" : ""} reviewed
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            to="/category/all"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isAll ? "spicy-gradient text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent/20"
            }`}
          >
            All
          </Link>
          {reviewCategories.filter((c) => c !== "All").map((cat) => {
            const slug = categorySlug(cat);
            return (
              <Link
                key={cat}
                to={`/category/${slug}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  category === slug ? "spicy-gradient text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent/20"
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {sorted.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sorted.map((p) => (
              <Link
                key={p.slug}
                to={`/reviews/${p.slug}`}
                className="group block bg-card rounded-xl border border-border/50 overflow-hidden transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">{p.category}</span>
                    <RatingBadge rating={p.score} size="sm" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{p.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">{p.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Read Review <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">No platforms found in this category yet.</p>
            <Link to="/categories" className="text-primary hover:underline mt-2 inline-block">← Browse Categories</Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
