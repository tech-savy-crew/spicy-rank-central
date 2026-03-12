import { Link } from "react-router-dom";
import { Calendar, Clock, Shield } from "lucide-react";

interface ReviewAuthorBoxProps {
  platformName: string;
  lastUpdated: string;
  readingTime: number;
  category: string;
}

export function ReviewAuthorBox({ platformName, lastUpdated, readingTime, category }: ReviewAuthorBoxProps) {
  return (
    <div className="bg-card rounded-xl border border-border/50 p-5 mb-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm">SpicyRanked Editorial Team</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Independent review based on 30–60 days of hands-on testing with real accounts
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Updated {lastUpdated}</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {readingTime} min read</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <Link to="/review-methodology" className="text-xs text-primary hover:underline font-medium">Our Testing Methodology</Link>
            <span className="text-muted-foreground/40">·</span>
            <Link to="/editorial-policy" className="text-xs text-primary hover:underline font-medium">Editorial Policy</Link>
            <span className="text-muted-foreground/40">·</span>
            <Link to="/affiliate-disclosure" className="text-xs text-primary hover:underline font-medium">Affiliate Disclosure</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
