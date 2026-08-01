import { Check, CircleCheckBig } from "lucide-react";

import { ResultCard } from "@/components/results/result-card";

type ActionCardProps = {
  actions: string[];
};

/** Recommended next steps based on the analyzed document. */
export function ActionCard({
  actions,
}: Readonly<ActionCardProps>) {
  return (
    <ResultCard className="border-emerald-100 bg-emerald-50/40">
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
          <CircleCheckBig className="size-4" aria-hidden="true" />
        </span>

        <div>
          <h2 className="text-lg font-bold tracking-[-0.025em] text-ink">
            ✅ Recommended Next Steps
          </h2>

          <p className="mt-0.5 text-xs text-emerald-800">
            Suggested actions based on your document
          </p>
        </div>
      </div>

      <ul className="mt-5 space-y-3">
        {actions.map((action) => (
          <li
            key={action}
            className="flex items-start gap-3 text-sm leading-6 text-slate-700"
          >
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
              <Check
                className="size-3"
                strokeWidth={3}
                aria-hidden="true"
              />
            </span>

            {action}
          </li>
        ))}
      </ul>
    </ResultCard>
  );
}