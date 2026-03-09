import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { RatingBadge } from "@/components/RatingBadge";
import { SEO, itemListSchema, breadcrumbSchema } from "@/components/SEO";
import { detailedReviews, getReviewBySlug } from "@/data/reviewDetails";
import { ExternalLink } from "lucide-react";

const AlternativesPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const platform = getReviewBySlug(slug || "");

  if (!platform) {
    return (
      <Layout>
        <SEO title="Platform Not Found" description="The requested platform could not be found." noindex />
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-black mb-4">Platform Not Found</h1>
          <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
        </div>
      </Layout>
    );
  }

  const alts = detailedReviews
    .filter((p) => p.slug !== platform.slug && p.category === platform.category)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  return (
    <Layout>
      <SEO
        title={`Top ${alts.length} Alternatives to ${platform.name} in 2026`}
        description={`Looking for alternatives to ${platform.name}? Compare the best ${platform.category} platforms ranked by our editors.`}
        canonical={`/alternatives/${platform.slug}`}
        jsonLd={[
          itemListSchema(
            `Alternatives to ${platform.name}`,
            alts.map((a, i) => ({ name: a.name, url: `/reviews/${a.slug}`, position: i + 1 }))
          ),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: platform.name, url: `/reviews/${platform.slug}` },
            { name: `Alternatives to ${platform.name}`, url: `/alternatives/${platform.slug}` },
          ]),
        ]}
      />

      <div className="container py-12">
        <h1 className="text-3xl md:text-4xl font-black mb-2">
          Top {alts.length} Alternatives to {platform.name}
        </h1>
        <p className="text-muted-foreground mb-10">
          Looking for something different? Here are the best alternatives ranked by our editors.
        </p>

        <div className="space-y-4">
          {alts.map((alt, i) => (
            <div key={alt.slug} className="flex items-center gap-5 bg-card rounded-xl border border-border/50 p-5 card-hover">
              <span className="text-2xl font-black text-primary w-8">#{i + 1}</span>
              <div className="flex-1 min-w-0">
                <Link to={`/reviews/${alt.slug}`} className="font-bold hover:text-primary transition-colors">
                  {alt.name}
                </Link>
                <p className="text-sm text-muted-foreground truncate">{alt.verdict}</p>
                <p className="text-xs text-primary font-medium mt-1">{alt.category} · {alt.pricing}</p>
              </div>
              <RatingBadge rating={alt.score} />
              <a href={alt.url} target="_blank" rel="nofollow sponsored noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium">
                Visit <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>

        {alts.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p>No alternatives found in this category yet.</p>
            <Link to="/reviews" className="text-primary hover:underline mt-2 inline-block">Browse all reviews →</Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AlternativesPage;
