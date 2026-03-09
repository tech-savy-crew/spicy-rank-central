import { Link } from "react-router-dom";
import { RatingBadge } from "./RatingBadge";
import type { Platform } from "@/data/platforms";

export function PlatformCard({ platform }: { platform: Platform }) {
  return (
    <Link
      to={`/reviews/${platform.slug}`}
      className="group block bg-card rounded-xl border border-border/50 overflow-hidden card-hover"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl">{platform.logo}</div>
          <RatingBadge rating={platform.rating} />
        </div>
        <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
          {platform.name}
        </h3>
        <p className="text-xs text-primary font-medium mb-2">{platform.category}</p>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {platform.tagline}
        </p>
      </div>
    </Link>
  );
}
