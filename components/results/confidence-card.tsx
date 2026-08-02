import { BadgeCheck } from "lucide-react";

/** Indicates the confidence level of the AI analysis with premium gradient pill styling. */
export function ConfidenceCard() {
  return (
    <div className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-emerald-200/90 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50/90 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-xs backdrop-blur-xs transition duration-200 hover:shadow-md">
      <BadgeCheck className="size-5 text-emerald-600 shrink-0" aria-hidden="true" />
      <div className="flex flex-col leading-tight">
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600/90">
          Analysis Confidence
        </span>
        <span className="font-bold text-emerald-900">High (98%)</span>
      </div>
    </div>
  );
}