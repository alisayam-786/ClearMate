import { AlertCircle, CheckCircle2, FileText, Sparkles } from "lucide-react";

/** Decorative, static preview of ClearMate's future document dashboard. */
export function DashboardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-2xl lg:ml-auto">
      <div className="absolute -right-10 top-16 -z-10 size-40 rounded-full bg-blue-200/45 blur-3xl" />
      <div className="absolute -bottom-8 -left-8 -z-10 size-32 rounded-full bg-sky-100 blur-2xl" />
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-3 shadow-[0_24px_80px_rgba(15,23,42,0.14)] sm:p-5">
        <div className="flex items-center justify-between border-b border-slate-100 px-2 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-blue-50 text-primary"><FileText className="size-4" aria-hidden="true" /></span>
            <div>
              <p className="text-sm font-bold text-ink">Document insights</p>
              <p className="text-xs text-slate-400">Sample analysis</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">Ready</span>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Document Type</p>
            <div className="mt-3 flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-white text-primary shadow-sm"><FileText className="size-4" aria-hidden="true" /></span>
              <p className="text-sm font-bold text-ink">Electricity Bill</p>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-600 p-4 text-white">
            <div className="flex items-center gap-2 text-blue-100"><Sparkles className="size-3.5" aria-hidden="true" /><p className="text-xs font-semibold uppercase tracking-[0.14em]">AI Summary</p></div>
            <p className="mt-2 text-sm font-medium leading-5">Your bill is within the usual range this month.</p>
          </div>
          <div className="rounded-2xl border border-slate-100 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Important Information</p>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Amount due</span><span className="font-bold text-ink">₹1,240</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Due date</span><span className="font-bold text-ink">28 Mar</span></div>
            </div>
          </div>
          <div className="rounded-2xl border border-amber-100 bg-amber-50/70 p-4">
            <div className="flex items-center gap-2 text-amber-700"><AlertCircle className="size-4" aria-hidden="true" /><p className="text-xs font-semibold uppercase tracking-[0.14em]">Action Required</p></div>
            <p className="mt-2 text-sm font-medium leading-5 text-amber-950">Pay before the due date to avoid late fees.</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 px-3.5 py-3 text-xs text-slate-500">
          <CheckCircle2 className="size-4 shrink-0 text-emerald-500" aria-hidden="true" />
          This is a visual preview using placeholder information.
        </div>
      </div>
    </div>
  );
}
