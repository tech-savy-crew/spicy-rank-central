import { useState } from "react";
import { Layout } from "@/components/Layout";
import { RatingBadge } from "@/components/RatingBadge";
import { platforms } from "@/data/platforms";
import { Trophy } from "lucide-react";

const ComparePage = () => {
  const [selected, setSelected] = useState<string[]>(["tiktok", "youtube"]);

  const togglePlatform = (slug: string) => {
    if (selected.includes(slug)) {
      if (selected.length > 2) setSelected(selected.filter((s) => s !== slug));
    } else if (selected.length < 4) {
      setSelected([...selected, slug]);
    }
  };

  const compared = selected.map((s) => platforms.find((p) => p.slug === s)!).filter(Boolean);
  const allFeatureKeys = [...new Set(compared.flatMap((p) => Object.keys(p.features)))];

  const getWinner = () => {
    if (compared.length < 2) return null;
    return compared.reduce((best, p) => (p.rating > best.rating ? p : best));
  };
  const winner = getWinner();

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl md:text-4xl font-black mb-2">Compare Platforms</h1>
        <p className="text-muted-foreground mb-8">Select 2–4 platforms for a side-by-side breakdown</p>

        {/* Selector */}
        <div className="flex flex-wrap gap-2 mb-10">
          {platforms.map((p) => (
            <button
              key={p.slug}
              onClick={() => togglePlatform(p.slug)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selected.includes(p.slug)
                  ? "spicy-gradient text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-surface-hover"
              }`}
            >
              {p.logo} {p.name}
            </button>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-4 px-4 text-muted-foreground font-medium w-40">Feature</th>
                {compared.map((p) => (
                  <th key={p.slug} className="py-4 px-4 text-center min-w-[160px]">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-2xl">{p.logo}</span>
                      <span className="font-bold">{p.name}</span>
                      {winner?.slug === p.slug && (
                        <span className="inline-flex items-center gap-1 text-xs bg-rating text-rating-foreground px-2 py-0.5 rounded-full font-semibold">
                          <Trophy className="h-3 w-3" /> Winner
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50 bg-card/50">
                <td className="py-3 px-4 font-medium">Overall Rating</td>
                {compared.map((p) => (
                  <td key={p.slug} className="py-3 px-4 text-center">
                    <RatingBadge rating={p.rating} />
                  </td>
                ))}
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 font-medium">Pricing</td>
                {compared.map((p) => (
                  <td key={p.slug} className="py-3 px-4 text-center text-muted-foreground">{p.pricing}</td>
                ))}
              </tr>
              <tr className="border-b border-border/50 bg-card/50">
                <td className="py-3 px-4 font-medium">Category</td>
                {compared.map((p) => (
                  <td key={p.slug} className="py-3 px-4 text-center text-muted-foreground">{p.category}</td>
                ))}
              </tr>
              {compared[0]?.ratings.map((_, i) => (
                <tr key={i} className={`border-b border-border/50 ${i % 2 ? "bg-card/50" : ""}`}>
                  <td className="py-3 px-4 font-medium">{compared[0].ratings[i].label}</td>
                  {compared.map((p) => {
                    const score = p.ratings[i]?.score || 0;
                    const isMax = score === Math.max(...compared.map((c) => c.ratings[i]?.score || 0));
                    return (
                      <td key={p.slug} className="py-3 px-4 text-center">
                        <span className={isMax ? "font-bold text-primary" : "text-muted-foreground"}>{score}/10</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
              {allFeatureKeys.map((feature, i) => (
                <tr key={feature} className={`border-b border-border/50 ${i % 2 ? "bg-card/50" : ""}`}>
                  <td className="py-3 px-4 font-medium">{feature}</td>
                  {compared.map((p) => (
                    <td key={p.slug} className="py-3 px-4 text-center">
                      {typeof p.features[feature] === "boolean" ? (
                        p.features[feature] ? (
                          <span className="text-success font-bold">✓</span>
                        ) : (
                          <span className="text-muted-foreground">✗</span>
                        )
                      ) : (
                        <span className="text-muted-foreground">{p.features[feature] || "—"}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default ComparePage;
