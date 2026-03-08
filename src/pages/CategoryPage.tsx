import { useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PlatformCard } from "@/components/PlatformCard";
import { SEO, itemListSchema, breadcrumbSchema } from "@/components/SEO";
import { platforms, categories } from "@/data/platforms";
import { Link } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const isAll = category === "all";
  const categoryName = isAll
    ? "All Platforms"
    : categories.find((c) => c.toLowerCase().replace(" ", "-") === category) || category;

  const filtered = isAll
    ? platforms
    : platforms.filter((p) => p.category.toLowerCase().replace(" ", "-") === category);

  return (
    <Layout>
      <SEO
        title={`${categoryName} Reviews & Rankings`}
        description={`Browse ${filtered.length} ${isAll ? "" : categoryName + " "}platform reviews. In-depth ratings, comparisons, and honest editorial opinions.`}
        canonical={`/category/${category}`}
        jsonLd={[
          itemListSchema(
            `${categoryName} Reviews`,
            filtered.map((p, i) => ({ name: p.name, url: `/review/${p.slug}`, position: i + 1 }))
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
          {filtered.length} platform{filtered.length !== 1 ? "s" : ""} reviewed
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            to="/category/all"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isAll ? "spicy-gradient text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-surface-hover"
            }`}
          >
            All
          </Link>
          {categories.filter((c) => c !== "All").map((cat) => {
            const slug = cat.toLowerCase().replace(" ", "-");
            return (
              <Link
                key={cat}
                to={`/category/${slug}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  category === slug ? "spicy-gradient text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-surface-hover"
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <PlatformCard key={p.id} platform={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">No platforms found in this category yet.</p>
            <Link to="/" className="text-primary hover:underline mt-2 inline-block">← Back to Home</Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
