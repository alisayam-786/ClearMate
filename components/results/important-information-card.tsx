import { ReceiptText } from "lucide-react";

import { ResultCard } from "@/components/results/result-card";

type ImportantInformationCardProps = { information: Array<{ label: string; value: string }> };

/** Key-value summary of important information from the analyzed document. */
export function ImportantInformationCard({ information }: Readonly<ImportantInformationCardProps>) {
  return (
    <ResultCard>
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-xl bg-blue-50 text-primary"><ReceiptText className="size-4" aria-hidden="true" /></span>
        <h2 className="text-lg font-bold tracking-[-0.025em] text-ink">
          📌 Key Information
        </h2>
      </div>
      <dl className="mt-5 divide-y divide-slate-100">
        {information.map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between gap-5 py-3 first:pt-0 last:pb-0">
            <dt className="text-sm font-medium text-slate-500">{label}</dt>
            <dd className="text-right text-sm font-bold text-ink">{value}</dd>
          </div>
        ))}
      </dl>
    </ResultCard>
  );
}
