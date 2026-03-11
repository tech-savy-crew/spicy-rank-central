import { Link } from "react-router-dom";
import { ArrowRight, Award } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { RatingBadge } from "@/components/RatingBadge";

interface PickCard {
  title: string;
  winner: string;
  score: number;
  reason: string;
  link: string;
}

const picks: PickCard[] = [
  { title: "Best for Creator Earnings", winner: "OnlyFans", score: 8.5, reason: "Largest audience base means highest earning potential for established creators", link: "/reviews/onlyfans" },
  { title: "Best Free Cam Experience", winner: "Chaturbate", score: 7.8, reason: "Thousands of free live broadcasts 24/7 with no signup required", link: "/reviews/chaturbate" },
  { title: "Best OnlyFans Alternative", winner: "Fansly", score: 8.2, reason: "Lower fees, better content organization, rapidly growing community", link: "/reviews/fansly" },
  { title: "Best AI Companion App", winner: "Candy.ai", score: 8.3, reason: "Most polished AI girlfriend experience with deep customization and realistic conversations", link: "/reviews/candy-ai" },
  { title: "Best Dating App", winner: "Bumble", score: 8.0, reason: "Women-first model creates higher-quality conversations and real connections", link: "/reviews/bumble" },
];

export function EditorsPicks() {
  return (
    <section className="border-y border-border/50 bg-card/50">
      <div className="container py-16">
        <AnimatedSection>
          <h2 className="text-2xl md:text-3xl font-black flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            Editor's Picks: Best Platforms by Use Case
          </h2>
          <p className="text-sm text-muted-foreground mt-1 mb-8">
            Our top recommendation for every type of user
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {picks.map((card, i) => (
            <AnimatedSection key={card.title} delay={i * 80} animation="scale-in">
              <Link
                to={card.link}
                className="group bg-card rounded-xl border border-border/50 p-6 card-hover flex flex-col h-full"
              >
                <h3 className="font-bold text-base mb-3 group-hover:text-primary transition-colors">{card.title}</h3>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-bold text-foreground">{card.winner}</span>
                  <RatingBadge rating={card.score} size="sm" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-2">
                  {card.reason}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-4 group-hover:underline">
                  Read Full Review <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
