import { Sparkles } from "lucide-react";

import { ResultCard } from "@/components/results/result-card";

type SummaryCardProps = { summary: string };

/** AI summary card for the analyzed document. */
export function SummaryCard({ summary }: Readonly<SummaryCardProps>) {
  return (
    <ResultCard>
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-xl bg-blue-50 text-primary"><Sparkles className="size-4" aria-hidden="true" /></span>
        <h2 className="text-lg font-bold tracking-[-0.025em] text-ink">✨ AI Summary</h2>
      </div>
      <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">{summary}</p>
    </ResultCard>
  );
}
