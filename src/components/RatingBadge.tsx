import { cn } from "@/lib/utils";

interface RatingBadgeProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

function getRatingColor(rating: number) {
  if (rating >= 8.5) return "bg-success text-success-foreground";
  if (rating >= 7) return "spicy-gradient text-primary-foreground";
  if (rating >= 5) return "bg-rating text-rating-foreground";
  return "bg-destructive text-destructive-foreground";
}

const sizes = {
  sm: "text-xs px-2 py-0.5 rounded-md font-semibold",
  md: "text-sm px-3 py-1 rounded-lg font-bold",
  lg: "text-2xl px-4 py-2 rounded-xl font-black",
};

export function RatingBadge({ rating, size = "md", className }: RatingBadgeProps) {
  return (
    <span className={cn(getRatingColor(rating), sizes[size], "inline-flex items-center", className)}>
      {rating.toFixed(1)}
    </span>
  );
}
