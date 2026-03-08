import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, ChevronDown, ChevronUp } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

type SortDir = "asc" | "desc";

interface PlatformRow {
  name: string;
  category: "Creator Platform" | "Live Cam" | "Dating App";
  score: number;
  pricing: string;
  bestFor: string;
  slug: string;
}

const rows: PlatformRow[] = [
  { name: "OnlyFans", category: "Creator Platform", score: 8.5, pricing: "Free (20% fee)", bestFor: "Established creators with large following", slug: "onlyfans-review" },
  { name: "Fansly", category: "Creator Platform", score: 8.2, pricing: "Free (20% fee)", bestFor: "Creators migrating from OnlyFans", slug: "fansly-review" },
  { name: "Bumble", category: "Dating App", score: 8.0, pricing: "Free / $39.99/mo", bestFor: "Women who want to make the first move", slug: "bumble-review" },
  { name: "Chaturbate", category: "Live Cam", score: 7.8, pricing: "Free (tokens)", bestFor: "Free live cam viewing experience", slug: "chaturbate-review" },
  { name: "FanVue", category: "Creator Platform", score: 7.6, pricing: "Free (15% fee)", bestFor: "AI tools + lower platform fees", slug: "fanvue-review" },
  { name: "Stripchat", category: "Live Cam", score: 7.5, pricing: "Free (tokens)", bestFor: "VR cam shows + modern interface", slug: "stripchat-review" },
  { name: "Tinder", category: "Dating App", score: 7.5, pricing: "Free / $29.99/mo", bestFor: "Casual dating with huge user base", slug: "tinder-review" },
  { name: "Patreon", category: "Creator Platform", score: 7.0, pricing: "Free (5-12% fee)", bestFor: "Non-adult + adult content mix", slug: "patreon-review" },
];

const categoryStyles: Record<string, string> = {
  "Creator Platform": "bg-[hsl(205,79%,95%)] text-[hsl(213,56%,48%)]",
  "Live Cam": "bg-[hsl(350,80%,92%)] text-[hsl(0,58%,48%)]",
  "Dating App": "bg-[hsl(48,96%,87%)] text-[hsl(38,59%,34%)]",
};

function scoreColor(s: number) {
  if (s >= 8) return "bg-[hsl(145,45%,51%)]";
  if (s >= 7) return "bg-[hsl(44,74%,55%)]";
  return "bg-[hsl(0,87%,67%)]";
}

export function PlatformRatingsTable() {
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const sorted = [...rows].sort((a, b) =>
    sortDir === "desc" ? b.score - a.score : a.score - b.score
  );

  const toggleSort = () => setSortDir((d) => (d === "desc" ? "asc" : "desc"));

  return (
    <section className="w-full" style={{ background: "#F7FAFC" }}>
      <div className="max-w-[1200px] mx-auto py-16 px-4">
        {/* Header */}
        <AnimatedSection>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-[28px] font-bold flex items-center gap-2" style={{ color: "#1A202C" }}>
                <BarChart3 className="h-6 w-6" style={{ color: "#E53E3E" }} />
                Platform Ratings at a Glance
              </h2>
              <p className="text-base mt-1" style={{ color: "#718096" }}>
                Quick scores for the top-rated platforms we've reviewed
              </p>
            </div>
            <Link to="/rankings" className="text-sm font-medium hover:underline hidden md:block" style={{ color: "#E53E3E" }}>
              See all ratings →
            </Link>
          </div>
        </AnimatedSection>

        {/* Desktop Table */}
        <AnimatedSection>
          <div className="hidden md:block rounded-xl border overflow-hidden" style={{ borderColor: "#E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <table className="w-full">
              <thead>
                <tr style={{ background: "#2D3748" }}>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-white px-5 py-3">Platform</th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-white px-5 py-3">Category</th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-white px-5 py-3 cursor-pointer select-none" onClick={toggleSort}>
                    <span className="inline-flex items-center gap-1">
                      Score
                      {sortDir === "desc" ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
                    </span>
                  </th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-white px-5 py-3">Pricing</th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-white px-5 py-3">Best For</th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-white px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((row, i) => (
                  <tr
                    key={row.slug}
                    className="transition-colors"
                    style={{
                      background: i % 2 === 0 ? "#FFFFFF" : "#FAFBFC",
                      borderBottom: "1px solid #EDF2F7",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#F7FAFC")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? "#FFFFFF" : "#FAFBFC")}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded bg-gray-200 shrink-0" />
                        <span className="font-semibold text-sm" style={{ color: "#1A202C" }}>{row.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryStyles[row.category]}`}>
                        {row.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-sm ${scoreColor(row.score)}`}>
                        {row.score}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm" style={{ color: "#718096" }}>{row.pricing}</td>
                    <td className="px-5 py-3.5 text-sm" style={{ color: "#718096" }}>{row.bestFor}</td>
                    <td className="px-5 py-3.5">
                      <Link to={`/review/${row.slug}`} className="inline-flex items-center gap-1 text-sm font-medium hover:underline" style={{ color: "#E53E3E" }}>
                        Read Review <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {sorted.map((row) => (
            <div key={row.slug} className="bg-white rounded-lg border p-4" style={{ borderColor: "#E2E8F0" }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-gray-200 shrink-0" />
                  <span className="font-semibold text-sm" style={{ color: "#1A202C" }}>{row.name}</span>
                </div>
                <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-sm ${scoreColor(row.score)}`}>
                  {row.score}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryStyles[row.category]}`}>
                  {row.category}
                </span>
                <span className="text-xs" style={{ color: "#718096" }}>{row.pricing}</span>
              </div>
              <p className="text-sm mb-3" style={{ color: "#718096" }}>{row.bestFor}</p>
              <Link
                to={`/review/${row.slug}`}
                className="flex items-center justify-center gap-1 w-full border rounded-lg py-2 text-sm font-medium transition-colors hover:bg-[#FFF5F5]"
                style={{ borderColor: "#E53E3E", color: "#E53E3E" }}
              >
                Read Review <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile link */}
        <div className="mt-4 md:hidden text-center">
          <Link to="/rankings" className="text-sm font-medium" style={{ color: "#E53E3E" }}>See all ratings →</Link>
        </div>
      </div>
    </section>
  );
}
