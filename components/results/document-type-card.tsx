import { FileText } from "lucide-react";

type DocumentTypeCardProps = { documentName: string; documentType: string };

/** Displays the analyzed document name and detected document category. */
export function DocumentTypeCard({ documentName, documentType }: Readonly<DocumentTypeCardProps>) {
  return (
    <div className="flex min-w-0 items-center gap-4">
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-blue-50 text-primary sm:size-14"><FileText className="size-6" aria-hidden="true" /></span>
      <div className="min-w-0">
        <p className="truncate text-base font-bold tracking-[-0.025em] text-ink sm:text-lg">{documentName}</p>
        <p className="mt-1 text-sm text-slate-500">{documentType}</p>
      </div>
    </div>
  );
}
