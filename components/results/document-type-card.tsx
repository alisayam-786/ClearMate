import { FileText, Tag } from "lucide-react";

type DocumentTypeCardProps = {
  documentName: string;
  documentType: string;
};

/** Displays the analyzed document name and detected document category badge. */
export function DocumentTypeCard({
  documentName,
  documentType,
}: Readonly<DocumentTypeCardProps>) {
  return (
    <div className="flex min-w-0 items-center gap-4">
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-blue-50 text-primary sm:size-14">
        <FileText className="size-6 sm:size-7" aria-hidden="true" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-bold tracking-[-0.025em] text-ink sm:text-lg">
          {documentName}
        </p>

        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50 px-3 py-1 text-xs font-semibold text-primary">
            <Tag className="size-3" aria-hidden="true" />
            {documentType || "Document"}
          </span>
        </div>
      </div>
    </div>
  );
}
