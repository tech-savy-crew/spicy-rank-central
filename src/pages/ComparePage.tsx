import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { RatingBadge } from "@/components/RatingBadge";
import { SEO, breadcrumbSchema, articleSchema } from "@/components/SEO";
import { platforms } from "@/data/platforms";
import { Trophy, ExternalLink, ChevronRight, Check, X } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const comparisonRows = [
  { key: "rating", label: "Overall Rating", type: "rating" },
  { key: "pricing", label: "Pricing", type: "value", field: "pricing" },
  { key: "freeTier", label: "Free Tier", type: "boolean", check: (p: any) => p.pricingModel === "Free" || p.pricingModel === "Freemium" },
  { key: "contentLibrary", label: "Content Library", type: "value", field: "contentTypes" },
  { key: "ui", label: "User Interface", type: "score", index: 1 },
  { key: "mobileApp", label: "Mobile App", type: "boolean", check: (p: any) => {
    const facts = p.quickFacts.find((f: any) => f.label === "Platforms");
    return facts ? (facts.value.includes("iOS") || facts.value.includes("Android") || facts.value === "All") : false;
  }},
  { key: "paymentMethods", label: "Payment Methods", type: "value", field: "paymentMethods" },
  { key: "creatorEarnings", label: "Creator Earnings", type: "score", index: 2 },
  { key: "privacy", label: "Privacy Features", type: "score", index: 3 },
  { key: "communitySize", label: "Community Size", type: "value", check: (p: any) => {
    const facts = p.quickFacts.find((f: any) => f.label === "Users");
    return facts?.value || "N/A";
  }},
] as const;

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

  const getWinner = () => {
    if (compared.length < 2) return null;
    const wins: Record<string, number> = {};
    compared.forEach((p) => { wins[p.slug] = 0; });
    compared[0]?.ratings.forEach((_, i) => {
      const maxScore = Math.max(...compared.map((c) => c.ratings[i]?.score || 0));
      compared.forEach((p) => {
        if ((p.ratings[i]?.score || 0) === maxScore) wins[p.slug]++;
      });
    });
    const maxRating = Math.max(...compared.map((c) => c.rating));
    compared.forEach((p) => { if (p.rating === maxRating) wins[p.slug]++; });
    const topSlug = Object.entries(wins).sort((a, b) => b[1] - a[1])[0][0];
    return compared.find((p) => p.slug === topSlug) || null;
  };
  const winner = getWinner();

  const comparedNames = compared.map((p) => p.name).join(" vs ");

  const renderCell = (row: typeof comparisonRows[number], p: typeof compared[0]) => {
    if (row.type === "rating") return <RatingBadge rating={p.rating} />;
    if (row.type === "boolean") {
      const val = (row as any).check(p);
      return val ? (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-success/20 text-success">
          <Check className="h-4 w-4" />
        </span>
      ) : (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-destructive/20 text-destructive">
          <X className="h-4 w-4" />
        </span>
      );
    }
    if (row.type === "score") {
      const score = p.ratings[(row as any).index]?.score || 0;
      const isMax = score === Math.max(...compared.map((c) => c.ratings[(row as any).index]?.score || 0));
      return <span className={isMax ? "font-bold text-primary" : "text-muted-foreground"}>{score}/10</span>;
    }
    if ((row as any).check) return <span className="text-muted-foreground text-xs">{(row as any).check(p)}</span>;
    const val = (p as any)[(row as any).field] || "—";
    return <span className="text-muted-foreground text-xs">{val}</span>;
  };

  const relatedComparisons = (() => {
    const pairs: { slugs: string[]; names: string[] }[] = [];
    for (let i = 0; i < platforms.length; i++) {
      for (let j = i + 1; j < platforms.length; j++) {
        const key = [platforms[i].slug, platforms[j].slug].sort().join("-");
        const currentKey = [...selected].sort().join("-");
        if (key !== currentKey) {
          pairs.push({ slugs: [platforms[i].slug, platforms[j].slug], names: [platforms[i].name, platforms[j].name] });
        }
      }
    }
    return pairs.slice(0, 6);
  })();

  const getUserTypeVerdict = () => {
    if (compared.length < 2) return [];
    const sorted = [...compared].sort((a, b) => b.rating - a.rating);
    return [
      { type: "Casual Users", rec: sorted.find((p) => p.pricingModel === "Free") || sorted[0] },
      { type: "Content Creators", rec: sorted.reduce((a, b) => ((a.ratings[0]?.score || 0) >= (b.ratings[0]?.score || 0) ? a : b)) },
      { type: "Privacy-Conscious", rec: sorted.reduce((a, b) => ((a.ratings[3]?.score || 0) >= (b.ratings[3]?.score || 0) ? a : b)) },
      { type: "Best Overall Value", rec: sorted[0] },
    ];
  };

  return (
    <Layout>
      <SEO
        title={`${comparedNames} Comparison`}
        description={`Side-by-side comparison of ${comparedNames}. Compare features, pricing, ratings, and more to find the best platform.`}
        canonical="/compare"
        jsonLd={[
          articleSchema(`${comparedNames} — Complete Comparison`),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Compare Platforms", url: "/compare" },
          ]),
        ]}
      />

      <div className="container py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Compare Platforms</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl md:text-4xl font-black mb-2">Compare Platforms</h1>
        <p className="text-muted-foreground mb-8">Select 2–4 platforms for a side-by-side breakdown</p>

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

        <div className="overflow-x-auto rounded-xl border border-border/50 bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-5 px-5 text-muted-foreground font-medium w-44">Feature</th>
                {compared.map((p) => (
                  <th key={p.slug} className="py-5 px-4 text-center min-w-[170px]">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-3xl">{p.logo}</span>
                      <span className="font-bold text-base">{p.name}</span>
                      {winner?.slug === p.slug && (
                        <span className="inline-flex items-center gap-1 text-xs bg-rating text-rating-foreground px-2.5 py-1 rounded-full font-bold">
                          <Trophy className="h-3 w-3" /> Winner
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.key} className={`border-b border-border/50 ${i % 2 === 0 ? "bg-card/50" : "bg-surface/30"}`}>
                  <td className="py-4 px-5 font-medium">{row.label}</td>
                  {compared.map((p) => (
                    <td key={p.slug} className="py-4 px-4 text-center">{renderCell(row, p)}</td>
                  ))}
                </tr>
              ))}
              {(() => {
                const allFeatureKeys = [...new Set(compared.flatMap((p) => Object.keys(p.features)))];
                return allFeatureKeys.map((feature, i) => (
                  <tr key={feature} className={`border-b border-border/50 ${(comparisonRows.length + i) % 2 === 0 ? "bg-card/50" : "bg-surface/30"}`}>
                    <td className="py-4 px-5 font-medium">{feature}</td>
                    {compared.map((p) => (
                      <td key={p.slug} className="py-4 px-4 text-center">
                        {typeof p.features[feature] === "boolean" ? (
                          p.features[feature] ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-success/20 text-success mx-auto"><Check className="h-4 w-4" /></span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-destructive/20 text-destructive mx-auto"><X className="h-4 w-4" /></span>
                          )
                        ) : (
                          <span className="text-muted-foreground text-xs">{p.features[feature] || "—"}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ));
              })()}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {compared.map((p) => (
            <a key={p.slug} href={p.url} target="_blank" rel="noopener nofollow noreferrer"
              className="inline-flex items-center gap-2 spicy-gradient text-primary-foreground px-6 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
              {p.logo} Visit {p.name} <ExternalLink className="h-4 w-4" />
            </a>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-black mb-6">Our Verdict</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getUserTypeVerdict().map((v) => (
              <div key={v.type} className="bg-card border border-border/50 rounded-xl p-6">
                <p className="text-muted-foreground text-sm mb-1">Best for {v.type}</p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{v.rec.logo}</span>
                  <div>
                    <p className="font-bold text-lg">{v.rec.name}</p>
                    <p className="text-xs text-muted-foreground">{v.rec.tagline}</p>
                  </div>
                  <RatingBadge rating={v.rec.rating} size="sm" className="ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-black mb-6">Related Comparisons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedComparisons.map((comp) => {
              const p1 = platforms.find((p) => p.slug === comp.slugs[0])!;
              const p2 = platforms.find((p) => p.slug === comp.slugs[1])!;
              return (
                <button key={comp.slugs.join("-")} onClick={() => setSelected(comp.slugs)}
                  className="bg-card border border-border/50 rounded-xl p-5 text-left card-hover group">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{p1.logo}</span>
                    <span className="text-muted-foreground font-bold">vs</span>
                    <span className="text-2xl">{p2.logo}</span>
                  </div>
                  <p className="font-bold group-hover:text-primary transition-colors">{comp.names[0]} vs {comp.names[1]}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">Compare now <ChevronRight className="h-3 w-3" /></p>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ComparePage;
