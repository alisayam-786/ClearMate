import { Check, CircleCheckBig } from "lucide-react";

import { ResultCard } from "@/components/results/result-card";

type ActionCardProps = {
  actions: string[];
};

/** Recommended next steps based on the analyzed document. */
export function ActionCard({ actions }: Readonly<ActionCardProps>) {
  return (
    <ResultCard className="border-emerald-200/60 bg-emerald-50/40">
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
          <CircleCheckBig className="size-4" aria-hidden="true" />
        </span>

        <div>
          <h2 className="text-lg font-bold tracking-[-0.025em] text-ink">
            ✅ Recommended Next Steps
          </h2>

          <p className="mt-0.5 text-xs font-medium text-emerald-800">
            Suggested actions based on your document
          </p>
        </div>
      </div>

      <ul className="mt-5 space-y-3.5">
        {actions.map((action) => (
          <li
            key={action}
            className="group flex items-start gap-3 text-sm leading-6 text-slate-700 transition duration-150 hover:text-slate-900"
          >
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-white shadow-xs transition duration-150 group-hover:scale-105">
              <Check
                className="size-3"
                strokeWidth={3}
                aria-hidden="true"
              />
            </span>

            <span className="flex-1 font-medium">{action}</span>
          </li>
        ))}
      </ul>
    </ResultCard>
  );
}