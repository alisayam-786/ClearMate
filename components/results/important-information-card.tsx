import { ReceiptText } from "lucide-react";

import { ResultCard } from "@/components/results/result-card";

type ImportantInformationCardProps = {
  information: Array<{ label: string; value: string }>;
};

/** Render value with status highlight badges if medical/financial keywords are detected. */
function renderValue(label: string, value: string) {
  const combined = `${label} ${value}`.toLowerCase();

  const isHighOrCritical =
    combined.includes("high") ||
    combined.includes("critical") ||
    combined.includes("abnormal") ||
    combined.includes("positive") ||
    combined.includes("overdue") ||
    combined.includes("penalty") ||
    combined.includes("urgent");

  const isLowOrWarning =
    combined.includes("low") ||
    combined.includes("borderline") ||
    combined.includes("warning") ||
    combined.includes("pending") ||
    combined.includes("due");

  const isNormalOrPaid =
    combined.includes("normal") ||
    combined.includes("paid") ||
    combined.includes("negative") ||
    combined.includes("verified") ||
    combined.includes("valid") ||
    combined.includes("complete") ||
    combined.includes("good");

  if (isHighOrCritical) {
    return (
      <dd className="break-words text-sm font-semibold">
        <span className="inline-flex items-center rounded-full border border-rose-200/90 bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700 shadow-xs">
          {value}
        </span>
      </dd>
    );
  }

  if (isLowOrWarning) {
    return (
      <dd className="break-words text-sm font-semibold">
        <span className="inline-flex items-center rounded-full border border-amber-200/90 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 shadow-xs">
          {value}
        </span>
      </dd>
    );
  }

  if (isNormalOrPaid) {
    return (
      <dd className="break-words text-sm font-semibold">
        <span className="inline-flex items-center rounded-full border border-emerald-200/90 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 shadow-xs">
          {value}
        </span>
      </dd>
    );
  }

  return (
    <dd className="break-words text-left text-sm font-bold text-ink sm:max-w-[65%] sm:text-right">
      {value}
    </dd>
  );
}

/** Key-value summary of important information with text wrapping and status highlights. */
export function ImportantInformationCard({
  information,
}: Readonly<ImportantInformationCardProps>) {
  return (
    <ResultCard className="flex h-full flex-col justify-between">
      <div>
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-blue-50 text-primary">
            <ReceiptText className="size-4" aria-hidden="true" />
          </span>
          <h2 className="text-lg font-bold tracking-[-0.025em] text-ink">
            📌 Key Information
          </h2>
        </div>

        <dl className="mt-5 divide-y divide-slate-100">
          {information.map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col gap-1 py-3.5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
            >
              <dt className="text-sm font-medium text-slate-500">{label}</dt>
              {renderValue(label, value)}
            </div>
          ))}
        </dl>
      </div>
    </ResultCard>
  );
}
