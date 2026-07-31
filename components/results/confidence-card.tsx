import { BadgeCheck } from "lucide-react";

/** Compact confidence indicator for the static document-analysis preview. */
export function ConfidenceCard() {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700">
      <BadgeCheck className="size-4" aria-hidden="true" />
      98% Confidence
    </span>
  );
}
