import { Link } from "react-router-dom";
import { Flame } from "lucide-react";
import { categories } from "@/data/platforms";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50 mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-extrabold text-lg mb-3">
              <Flame className="h-5 w-5 text-primary" />
              <span className="spicy-text-gradient">SpicyRanked</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Honest, in-depth reviews and rankings of digital platforms. No fluff, just real takes.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Categories</h4>
            <ul className="space-y-2">
              {categories.filter((c) => c !== "All").map((cat) => (
                <li key={cat}>
                  <Link to={`/category/${cat.toLowerCase().replace(" ", "-")}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Editorial Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/compare" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Compare Platforms</Link></li>
              <li><Link to="/rankings" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Top Rankings</Link></li>
              <li><Link to="/category/all" className="text-sm text-muted-foreground hover:text-foreground transition-colors">All Reviews</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 SpicyRanked. All rights reserved. Reviews represent editorial opinions. We may earn commissions from affiliate links.
          </p>
        </div>
      </div>
    </footer>
  );
}
