import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div className={cn("bg-card rounded-xl border border-border/50 overflow-hidden", className)}>
      <div className="p-6 space-y-4 animate-pulse">
        <div className="flex items-start justify-between">
          <div className="h-10 w-10 rounded-lg bg-muted" />
          <div className="h-7 w-12 rounded-lg bg-muted" />
        </div>
        <div className="h-5 w-3/4 rounded bg-muted" />
        <div className="h-3 w-1/3 rounded bg-muted" />
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-muted" />
          <div className="h-3 w-5/6 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonRow({ className }: SkeletonCardProps) {
  return (
    <div className={cn("flex items-center gap-5 bg-card rounded-xl border border-border/50 p-5 animate-pulse", className)}>
      <div className="h-8 w-8 rounded bg-muted" />
      <div className="h-10 w-10 rounded-lg bg-muted" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-1/3 rounded bg-muted" />
        <div className="h-3 w-2/3 rounded bg-muted" />
      </div>
      <div className="h-7 w-12 rounded-lg bg-muted" />
    </div>
  );
}
