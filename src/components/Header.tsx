import { Link } from "react-router-dom";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import logoImg from "@/assets/logo-transparent.png";

const reviewDropdown = [
  { label: "Creator Platforms", to: "/category/creator-platforms" },
  { label: "Live Cam Sites", to: "/category/live-cam-sites" },
  { label: "Dating & Hookup Apps", to: "/category/dating-hookup-apps" },
  { label: "AI Companions", to: "/category/ai-companions" },
  { label: "Fetish & Niche", to: "/category/fetish-niche-marketplaces" },
  { label: "All Reviews", to: "/reviews" },
];

const moreDropdown = [
  { label: "About", to: "/about" },
  { label: "Advertise", to: "/advertise" },
  { label: "Write For Us", to: "/write-for-us" },
  { label: "Contact", to: "/contact" },
];

function Dropdown({ label, items, open, setOpen, dropRef }: {
  label: string;
  items: { label: string; to: string }[];
  open: boolean;
  setOpen: (v: boolean) => void;
  dropRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div ref={dropRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        {label} <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-2 w-48 bg-card border border-border/50 rounded-lg shadow-lg py-1 z-50">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (reviewsRef.current && !reviewsRef.current.contains(e.target as Node)) setReviewsOpen(false);
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const allMobileLinks = [
    ...reviewDropdown,
    { label: "Compare", to: "/compare" },
    { label: "Best Lists", to: "/rankings" },
    { label: "Categories", to: "/categories" },
    ...moreDropdown,
  ];

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-1">
          <img src={logoImg} alt="SpicyRanked" className="h-9 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Dropdown label="Reviews" items={reviewDropdown} open={reviewsOpen} setOpen={setReviewsOpen} dropRef={reviewsRef as React.RefObject<HTMLDivElement>} />
          <Link to="/compare" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left">
            Compare
          </Link>
          <Link to="/rankings" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left">
            Best Lists
          </Link>
          <Link to="/categories" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left">
            Categories
          </Link>
          <Dropdown label="More" items={moreDropdown} open={moreOpen} setOpen={setMoreOpen} dropRef={moreRef as React.RefObject<HTMLDivElement>} />
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Link to="/search" className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <Search className="h-5 w-5 text-muted-foreground" />
          </Link>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden border-t border-border/50 bg-card overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        {allMobileLinks.map((item) => (
          <Link
            key={item.label + item.to}
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
