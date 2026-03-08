import { Link } from "react-router-dom";
import { ArrowRight, Award } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

interface PickCard {
  emoji: string;
  title: string;
  winner: string;
  score: number;
  reason: string;
  topColor: string;
  link: string;
}

const picks: PickCard[] = [
  { emoji: "💰", title: "Best for Creator Earnings", winner: "OnlyFans", score: 8.5, reason: "Largest audience base means highest earning potential for established creators", topColor: "#48BB78", link: "/review/onlyfans-review" },
  { emoji: "🎥", title: "Best Free Cam Experience", winner: "Chaturbate", score: 7.8, reason: "Thousands of free live broadcasts 24/7 with no signup required", topColor: "#E53E3E", link: "/review/chaturbate-review" },
  { emoji: "⭐", title: "Best OnlyFans Alternative", winner: "Fansly", score: 8.2, reason: "Lower fees, better content organization, rapidly growing community", topColor: "#4299E1", link: "/review/fansly-review" },
  { emoji: "🤖", title: "Best AI Companion App", winner: "CrushOn AI", score: 7.4, reason: "Most realistic NSFW AI chatbot with uncensored conversations and memory", topColor: "#9F7AEA", link: "/review/crushon-review" },
  { emoji: "🔒", title: "Best for Anonymous Sexting", winner: "Arousr", score: 7.2, reason: "Verified real people, anonymous by default, pay-per-chat pricing", topColor: "#ED8936", link: "/review/arousr-review" },
];

function scoreBg(s: number) {
  if (s >= 8) return "bg-[hsl(145,45%,51%)]";
  if (s >= 7) return "bg-[hsl(44,74%,55%)]";
  return "bg-[hsl(0,87%,67%)]";
}

export function EditorsPicks() {
  return (
    <section className="bg-white">
      <div className="max-w-[1200px] mx-auto py-16 px-4">
        <AnimatedSection>
          <h2 className="text-[28px] font-bold flex items-center gap-2" style={{ color: "#1A202C" }}>
            <Award className="h-6 w-6" style={{ color: "#E53E3E" }} />
            Editor's Picks: Best Platforms by Use Case
          </h2>
          <p className="text-base mt-1 mb-8" style={{ color: "#718096" }}>
            Our top recommendation for every type of user
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {picks.map((card, i) => (
            <AnimatedSection key={card.title} delay={i * 80} animation="scale-in">
              <div
                className="bg-white rounded-2xl p-6 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] h-full flex flex-col"
                style={{
                  border: "2px solid #E2E8F0",
                  borderTopWidth: "4px",
                  borderTopColor: card.topColor,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#E53E3E", e.currentTarget.style.borderTopColor = card.topColor)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E2E8F0", e.currentTarget.style.borderTopColor = card.topColor)}
              >
                <span className="text-5xl mb-3">{card.emoji}</span>
                <h3 className="font-bold text-lg mb-3" style={{ color: "#1A202C" }}>{card.title}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded bg-gray-200 shrink-0" />
                  <span className="font-bold" style={{ color: "#1A202C" }}>{card.winner}</span>
                  <span className={`text-xs font-bold text-white px-2 py-0.5 rounded-full ${scoreBg(card.score)}`}>
                    {card.score}/10
                  </span>
                </div>
                <p className="text-sm leading-relaxed flex-1 line-clamp-2" style={{ color: "#4A5568" }}>
                  {card.reason}
                </p>
                <Link
                  to={card.link}
                  className="inline-flex items-center gap-1 text-sm font-medium mt-4 hover:underline"
                  style={{ color: "#E53E3E" }}
                >
                  Read Full Review <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
