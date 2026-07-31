import { FileUp, Sparkles } from "lucide-react";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { UploadZone } from "@/components/upload/upload-zone";

/** UI-only document selection page for the future ClearMate analysis flow. */
export default function AnalyzePage() {
  return (
    <main>
      <Navbar />
      <section className="relative min-h-[calc(100vh-80px)] overflow-hidden py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_50%_0%,rgba(191,219,254,0.68),transparent_48%),radial-gradient(circle_at_4%_30%,rgba(219,234,254,0.55),transparent_27%)]" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1.5 text-sm font-semibold text-primary">
              <Sparkles className="size-4" aria-hidden="true" />
              Start with your document
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-[-0.055em] text-ink sm:text-5xl">Upload a document for a clearer explanation.</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">Choose a medical report, electricity bill, or bank notice. This page is a visual preview—no file is uploaded or analyzed yet.</p>
          </div>
          <div className="mx-auto mt-12 max-w-2xl rounded-[2rem] border border-slate-200/80 bg-white/65 p-3 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-5">
            <div className="flex items-center gap-3 border-b border-slate-100 px-2 pb-4">
              <span className="grid size-9 place-items-center rounded-xl bg-blue-50 text-primary"><FileUp className="size-4" aria-hidden="true" /></span>
              <div><p className="text-sm font-bold text-ink">Upload document</p><p className="text-xs text-slate-400">PDF, JPG, or PNG</p></div>
            </div>
            <div className="p-2 pt-5 sm:p-4 sm:pt-6"><UploadZone /></div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
