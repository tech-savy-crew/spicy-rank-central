import React from "react";

/**
 * Renders review section content with support for:
 * - Paragraphs (split by \n\n)
 * - Bold text (**text**)
 * - Bullet points (lines starting with - )
 * - Tables (| col | col | format)
 */
export function ReviewContent({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/);

  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Table block: starts with ||| title ||| or | header |
        if (trimmed.startsWith("|||") || (trimmed.startsWith("|") && trimmed.includes("\n|"))) {
          return <TableBlock key={i} raw={trimmed} />;
        }

        // Standalone subheading: **Title** or **Title:**
        if (/^\*\*[^*]+\*\*$/.test(trimmed) || /^\*\*[^*]+:\*\*$/.test(trimmed)) {
          return (
            <h3 key={i} className="text-base md:text-lg font-bold text-foreground mt-8 first:mt-0">
              {trimmed.replace(/\*\*/g, "")}
            </h3>
          );
        }

        // Block starts with **SubHeading:** followed by content
        const subheadingMatch = trimmed.match(/^\*\*([^*]+?)(?::)?\*\*\s*([\s\S]*)/);
        if (subheadingMatch) {
          const heading = subheadingMatch[1].trim();
          const body = subheadingMatch[2].trim();

          const bodyLines = body.split("\n").filter((l) => l.trim());
          const hasBullets = bodyLines.some((l) => l.trim().startsWith("- "));

          if (hasBullets) {
            const introParts: string[] = [];
            const bulletItems: string[] = [];
            bodyLines.forEach((l) => {
              if (l.trim().startsWith("- ")) {
                bulletItems.push(l.trim().replace(/^- /, ""));
              } else {
                introParts.push(l.trim());
              }
            });

            return (
              <div key={i} className="mt-7 first:mt-0">
                <h3 className="text-base md:text-lg font-bold text-foreground mb-3">{heading}</h3>
                {introParts.length > 0 && (
                  <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed md:leading-7 mb-3">
                    {renderInlineFormatting(introParts.join(" "))}
                  </p>
                )}
                <ul className="space-y-2.5 pl-1">
                  {bulletItems.map((item, j) => (
                    <li
                      key={j}
                      className="text-sm md:text-[15px] text-muted-foreground leading-relaxed md:leading-7 flex items-start gap-3"
                    >
                      <span className="mt-[9px] shrink-0 h-[6px] w-[6px] rounded-full bg-primary" />
                      <span>{renderInlineFormatting(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }

          return (
            <div key={i} className="mt-7 first:mt-0">
              <h3 className="text-base md:text-lg font-bold text-foreground mb-3">{heading}</h3>
              {body && (
                <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed md:leading-7">
                  {renderInlineFormatting(body)}
                </p>
              )}
            </div>
          );
        }

        // Check if entire block is a bullet list
        const lines = trimmed.split("\n");
        if (lines.every((l) => l.trim().startsWith("- "))) {
          return (
            <ul key={i} className="space-y-2.5 pl-1">
              {lines.map((line, j) => (
                <li
                  key={j}
                  className="text-sm md:text-[15px] text-muted-foreground leading-relaxed md:leading-7 flex items-start gap-3"
                >
                  <span className="mt-[9px] shrink-0 h-[6px] w-[6px] rounded-full bg-primary" />
                  <span>{renderInlineFormatting(line.trim().replace(/^- /, ""))}</span>
                </li>
              ))}
            </ul>
          );
        }

        // Regular paragraph
        return (
          <p key={i} className="text-sm md:text-[15px] text-muted-foreground leading-relaxed md:leading-7">
            {renderInlineFormatting(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

/** Renders a markdown-style table from raw text */
function TableBlock({ raw }: { raw: string }) {
  const lines = raw.split("\n").filter((l) => l.trim());

  // Extract optional title from ||| Title |||
  let title = "";
  let dataLines = lines;
  if (lines[0]?.trim().startsWith("|||")) {
    title = lines[0].replace(/\|{3}/g, "").trim();
    dataLines = lines.slice(1);
  }

  // Parse rows
  const rows = dataLines
    .map((line) =>
      line
        .split("|")
        .map((cell) => cell.trim())
        .filter((cell) => cell.length > 0)
    )
    .filter((row) => row.length > 0);

  if (rows.length === 0) return null;

  const headerRow = rows[0];
  const bodyRows = rows.slice(1);

  return (
    <div className="mt-6 first:mt-0">
      {title && (
        <h4 className="text-sm md:text-base font-bold text-foreground mb-3">{title}</h4>
      )}
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="min-w-[400px] sm:min-w-0 px-4 sm:px-0">
          <table className="w-full text-sm border border-border/60 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-secondary/70">
                {headerRow.map((cell, j) => (
                  <th
                    key={j}
                    className="px-3 md:px-4 py-2.5 md:py-3 text-left text-xs md:text-sm font-semibold text-foreground whitespace-nowrap first:rounded-tl-lg last:rounded-tr-lg"
                  >
                    {renderInlineFormatting(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, ri) => (
                <tr
                  key={ri}
                  className={`border-t border-border/40 ${ri % 2 === 0 ? "bg-card" : "bg-secondary/30"}`}
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm leading-relaxed ${
                        ci === 0
                          ? "font-medium text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {renderInlineFormatting(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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
