import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { RatingBadge } from "@/components/RatingBadge";
import { RelatedContent } from "@/components/RelatedContent";
import { SEO, itemListSchema, breadcrumbSchema } from "@/components/SEO";
import { getPlatformBySlug, platforms } from "@/data/platforms";
import { ExternalLink } from "lucide-react";

const AlternativesPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const platform = getPlatformBySlug(slug || "");

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

  const alts = platforms
    .filter((p) => p.slug !== platform.slug)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  return (
    <Layout>
      <SEO
        title={`Top 10 Alternatives to ${platform.name}`}
        description={`Looking for alternatives to ${platform.name}? Compare the best ${platform.category} platforms ranked by our editors.`}
        canonical={`/alternatives/${platform.slug}`}
        jsonLd={[
          itemListSchema(
            `Alternatives to ${platform.name}`,
            alts.map((a, i) => ({ name: a.name, url: `/review/${a.slug}`, position: i + 1 }))
          ),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: platform.name, url: `/review/${platform.slug}` },
            { name: `Alternatives to ${platform.name}`, url: `/alternatives/${platform.slug}` },
          ]),
        ]}
      />

      <div className="container py-12">
        <h1 className="text-3xl md:text-4xl font-black mb-2">
          Top 10 Alternatives to {platform.name}
        </h1>
        <p className="text-muted-foreground mb-10">
          Looking for something different? Here are the best alternatives ranked by our editors.
        </p>

        <div className="space-y-4">
          {alts.map((alt, i) => (
            <div key={alt.id} className="flex items-center gap-5 bg-card rounded-xl border border-border/50 p-5 card-hover">
              <span className="text-2xl font-black text-primary w-8">#{i + 1}</span>
              <span className="text-3xl">{alt.logo}</span>
              <div className="flex-1 min-w-0">
                <Link to={`/review/${alt.slug}`} className="font-bold hover:text-primary transition-colors">
                  {alt.name}
                </Link>
                <p className="text-sm text-muted-foreground truncate">{alt.tagline}</p>
                <p className="text-xs text-primary font-medium mt-1">{alt.category} · {alt.pricing}</p>
              </div>
              <RatingBadge rating={alt.rating} />
              <a href={alt.url} target="_blank" rel="noopener nofollow noreferrer"
                className="hidden sm:inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium">
                Visit <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>

        <RelatedContent currentSlug={platform.slug} category={platform.category} title="You Might Also Like" />
      </div>
    </Layout>
  );
};

export default AlternativesPage;
