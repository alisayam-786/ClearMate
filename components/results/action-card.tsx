import { Check, TriangleAlert } from "lucide-react";

import { ResultCard } from "@/components/results/result-card";

type ActionCardProps = { actions: string[] };

/** Recommended follow-up actions from the analyzed document. */
export function ActionCard({ actions }: Readonly<ActionCardProps>) {
  return (
    <ResultCard className="border-amber-100 bg-amber-50/40">
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-xl bg-amber-100 text-amber-700"><TriangleAlert className="size-4" aria-hidden="true" /></span>
        <div><h2 className="text-lg font-bold tracking-[-0.025em] text-ink">Action Required</h2><p className="mt-0.5 text-xs text-amber-800">A few helpful next steps</p></div>
      </div>
      <ul className="mt-5 space-y-3">
        {actions.map((action) => (
          <li key={action} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-white"><Check className="size-3" strokeWidth={3} aria-hidden="true" /></span>
            {action}
          </li>
        ))}
      </ul>
    </ResultCard>
  );
}
