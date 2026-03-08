import { Link } from "react-router-dom";
import { Search, Menu, X, Flame } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { label: "Reviews", to: "/category/all" },
  { label: "Compare", to: "/compare" },
  { label: "Best Lists", to: "/rankings" },
  { label: "Categories", to: "/categories" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-xl tracking-tight">
          <Flame className="h-6 w-6 text-primary" />
          <span className="spicy-text-gradient">SpicyRanked</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Link to="/search" className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <Search className="h-5 w-5 text-muted-foreground" />
          </Link>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden border-t border-border/50 bg-card overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-60" : "max-h-0"
        }`}
      >
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className="block px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
