import { BadgeCheck } from "lucide-react";

/** Indicates the confidence level of the AI analysis. */
export function ConfidenceCard() {
  return (
    <div className="inline-flex shrink-0 items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
      <BadgeCheck className="size-5" aria-hidden="true" />
      <div className="flex flex-col leading-tight">
        <span className="text-[11px] font-medium uppercase tracking-wide text-emerald-600">
          Analysis Confidence
        </span>
        <span>High (98%)</span>
      </div>
    </div>
  );
}