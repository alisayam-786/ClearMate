import type { ReactNode } from "react";

type ResultCardProps = {
  children: ReactNode;
  className?: string;
};

/** Shared elevated card shell used across the document-results dashboard. */
export function ResultCard({ children, className = "" }: Readonly<ResultCardProps>) {
  return <section className={`rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:p-6 ${className}`}>{children}</section>;
}
