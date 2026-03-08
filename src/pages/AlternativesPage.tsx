import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { RatingBadge } from "@/components/RatingBadge";
import { getPlatformBySlug, platforms } from "@/data/platforms";
import { ExternalLink } from "lucide-react";

const AlternativesPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const platform = getPlatformBySlug(slug || "");

  if (!platform) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-black mb-4">Platform Not Found</h1>
          <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
        </div>
      </Layout>
    );
  }

  // Get alternatives + same category platforms
  const alts = platforms
    .filter((p) => p.slug !== platform.slug)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl md:text-4xl font-black mb-2">
          Top 10 Alternatives to {platform.name}
        </h1>
        <p className="text-muted-foreground mb-10">
          Looking for something different? Here are the best alternatives ranked by our editors.
        </p>

        <div className="space-y-4">
          {alts.map((alt, i) => (
            <div
              key={alt.id}
              className="flex items-center gap-5 bg-card rounded-xl border border-border/50 p-5 card-hover"
            >
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
              <a
                href={alt.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium"
              >
                Visit <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AlternativesPage;
