import { Link } from "react-router-dom";
import { Flame } from "lucide-react";

const reviewLinks = [
  { label: "OnlyFans Review", to: "/reviews/onlyfans" },
  { label: "Fansly Review", to: "/reviews/fansly" },
  { label: "Chaturbate Review", to: "/reviews/chaturbate" },
  { label: "Candy.ai Review", to: "/reviews/candy-ai" },
  { label: "FeetFinder Review", to: "/reviews/feetfinder" },
  { label: "All Reviews", to: "/reviews" },
];

const compareLinks = [
  { label: "Candy.ai vs DreamGF", to: "/compare/candy-ai-vs-dreamgf" },
  { label: "Tinder vs Bumble", to: "/compare/tinder-vs-bumble" },
  { label: "Jerkmate vs Chaturbate", to: "/compare/jerkmate-vs-chaturbate" },
  { label: "OnlyFans vs Fansly", to: "/compare/onlyfans-vs-fansly" },
];

const bestLinks = [
  { label: "Best OnlyFans Alternatives", to: "/best-lists/best-onlyfans-alternatives" },
  { label: "Best AI Girlfriend Apps", to: "/best-lists/best-ai-girlfriend-apps" },
  { label: "Best Free Cam Sites", to: "/best-lists/best-free-cam-sites" },
  { label: "Best Creator Platforms", to: "/best-lists/best-creator-platforms-beginners" },
];

const companyLinks = [
  { label: "About Us", to: "/about" },
  { label: "Advertise With Us", to: "/advertise" },
  { label: "Write For Us", to: "/write-for-us" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms of Service", to: "/terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50 mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-extrabold text-lg mb-3">
              <Flame className="h-5 w-5 text-primary" />
              <span className="spicy-text-gradient">SpicyRanked</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Honest, in-depth reviews and rankings of adult platforms. No fluff, just real takes.
            </p>
          </div>

          {/* Top Reviews */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Top Reviews</h4>
            <ul className="space-y-2">
              {reviewLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Comparisons */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Popular Comparisons</h4>
            <ul className="space-y-2">
              {compareLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Best Lists */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Best Lists</h4>
            <ul className="space-y-2">
              {bestLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Age Disclaimer */}
        <div className="mt-10 pt-6 border-t border-border/50">
          <p className="text-xs text-muted-foreground leading-relaxed mb-4">
            SpicyRanked contains reviews and information about adult platforms. All visitors must be 18 years or older. We do not host any explicit content. This site contains affiliate links and we may earn a commission at no extra cost to you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              © 2026 SpicyRanked.com — All rights reserved. Adults 18+ only.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://x.com/spicyranked" target="_blank" rel="noopener noreferrer nofollow" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter/X">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://reddit.com/r/spicyranked" target="_blank" rel="noopener noreferrer nofollow" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Reddit">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
