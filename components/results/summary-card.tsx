import { CheckCircle2, Sparkles } from "lucide-react";

import { ResultCard } from "@/components/results/result-card";

type SummaryCardProps = { summary: string };

/** Split text into clean sentences. */
function splitIntoSentences(text: string): string[] {
  if (!text) return [];

  // Match sentences ending with . ! or ?
  const matched = text.match(/[^.!?]+[.!?]+/g);
  if (!matched || matched.length === 0) {
    const trimmed = text.trim();
    return trimmed ? [trimmed] : [];
  }

  return matched
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/** AI summary card with smart sentence bullet formatting and enhanced readability. */
export function SummaryCard({ summary }: Readonly<SummaryCardProps>) {
  const sentences = splitIntoSentences(summary);
  const isBulletMode = sentences.length > 3;

  return (
    <ResultCard className="flex h-full flex-col justify-between">
      <div>
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-blue-50 text-primary">
            <Sparkles className="size-4" aria-hidden="true" />
          </span>
          <h2 className="text-lg font-bold tracking-[-0.025em] text-ink">
            ✨ AI Summary
          </h2>
        </div>

        {isBulletMode ? (
          <ul className="mt-5 space-y-3" aria-label="Summary points">
            {sentences.map((sentence, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-sm leading-relaxed text-slate-700 sm:text-base sm:leading-7"
              >
                <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-blue-50 text-primary">
                  <CheckCircle2 className="size-3.5" aria-hidden="true" />
                </span>
                <span className="flex-1">{sentence}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-5 space-y-3">
            <p className="text-sm leading-relaxed text-slate-700 sm:text-base sm:leading-7">
              {summary}
            </p>
          </div>
        )}
      </div>
    </ResultCard>
  );
}
