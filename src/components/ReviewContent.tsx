import React from "react";

/**
 * Renders review section content with support for:
 * - Paragraphs (split by \n\n)
 * - Bold text (**text**)
 * - Bullet points (lines starting with - )
 */
export function ReviewContent({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/);

  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Check if block is a list (lines starting with -)
        const lines = trimmed.split("\n");
        const isList = lines.every((l) => l.trim().startsWith("- ") || l.trim().startsWith("**") && lines.length === 1 === false);
        
        // Check if it's a subheading (**Title:** pattern at start, standalone)
        if (/^\*\*[^*]+\*\*$/.test(trimmed) || /^\*\*[^*]+:\*\*$/.test(trimmed)) {
          return (
            <h3 key={i} className="text-base md:text-lg font-bold text-foreground mt-6 first:mt-0">
              {trimmed.replace(/\*\*/g, "")}
            </h3>
          );
        }

        // Check if block starts with **SubHeading:** followed by content
        const subheadingMatch = trimmed.match(/^\*\*([^*]+?)(?::)?\*\*\s*([\s\S]*)/);
        if (subheadingMatch) {
          const heading = subheadingMatch[1].trim();
          const body = subheadingMatch[2].trim();
          
          // If the body contains bullet points
          const bodyLines = body.split("\n").filter(l => l.trim());
          const hasBullets = bodyLines.some(l => l.trim().startsWith("- "));

          if (hasBullets) {
            const introParts: string[] = [];
            const bulletItems: string[] = [];
            bodyLines.forEach(l => {
              if (l.trim().startsWith("- ")) {
                bulletItems.push(l.trim().replace(/^- /, ""));
              } else {
                introParts.push(l.trim());
              }
            });

            return (
              <div key={i} className="mt-6 first:mt-0">
                <h3 className="text-base md:text-lg font-bold text-foreground mb-2">{heading}</h3>
                {introParts.length > 0 && (
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed md:leading-7 mb-3">
                    {renderInlineFormatting(introParts.join(" "))}
                  </p>
                )}
                <ul className="space-y-2 ml-1">
                  {bulletItems.map((item, j) => (
                    <li key={j} className="text-sm md:text-base text-muted-foreground leading-relaxed md:leading-7 flex items-start gap-2.5">
                      <span className="text-primary mt-1.5 shrink-0 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{renderInlineFormatting(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }

          return (
            <div key={i} className="mt-6 first:mt-0">
              <h3 className="text-base md:text-lg font-bold text-foreground mb-2">{heading}</h3>
              {body && (
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed md:leading-7">
                  {renderInlineFormatting(body)}
                </p>
              )}
            </div>
          );
        }

        // Regular paragraph
        return (
          <p key={i} className="text-sm md:text-base text-muted-foreground leading-relaxed md:leading-7">
            {renderInlineFormatting(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

function renderInlineFormatting(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}
