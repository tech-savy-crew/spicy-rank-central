import { Link } from "react-router-dom";
import { platforms } from "@/data/platforms";
import { RatingBadge } from "./RatingBadge";
import { ArrowRight } from "lucide-react";

interface RelatedContentProps {
  currentSlug?: string;
  category?: string;
  max?: number;
  title?: string;
}

export function RelatedContent({ currentSlug, category, max = 4, title = "Related Reviews" }: RelatedContentProps) {
  const related = platforms
    .filter((p) => p.slug !== currentSlug && (!category || p.category === category))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, max);

  if (related.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold mb-5">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {related.map((p) => (
          <Link
            key={p.slug}
            to={`/review/${p.slug}`}
            className="flex items-center gap-4 bg-card rounded-xl border border-border/50 p-4 card-hover group"
          >
            <span className="text-2xl">{p.logo}</span>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{p.name}</h3>
              <p className="text-xs text-muted-foreground truncate">{p.tagline}</p>
            </div>
            <RatingBadge rating={p.rating} size="sm" />
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
          </Link>
        ))}
      </div>
    </section>
  );
}
