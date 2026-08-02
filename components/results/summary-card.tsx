import { Sparkles } from "lucide-react";

import { ResultCard } from "@/components/results/result-card";

type SummaryCardProps = { summary: string };

/** AI summary card for the analyzed document with enhanced readability. */
export function SummaryCard({ summary }: Readonly<SummaryCardProps>) {
  // Split paragraphs by newlines or group sentences cleanly for optimal reading hierarchy
  const paragraphs = summary
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <ResultCard>
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-xl bg-blue-50 text-primary">
          <Sparkles className="size-4" aria-hidden="true" />
        </span>
        <h2 className="text-lg font-bold tracking-[-0.025em] text-ink">
          ✨ AI Summary
        </h2>
      </div>

      <div className="mt-4 space-y-3">
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="text-sm leading-relaxed text-slate-700 sm:text-base sm:leading-7"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </ResultCard>
  );
}
