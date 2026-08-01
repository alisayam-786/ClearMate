import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

import { DashboardPreview } from "@/components/marketing/dashboard-preview";
import { Button } from "@/components/ui/button";

/** Hero introduction and dashboard preview for the public landing page. */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_72%_30%,rgba(191,219,254,0.7),transparent_28%),radial-gradient(circle_at_20%_0%,rgba(219,234,254,0.65),transparent_32%)]" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-20 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10 lg:pb-32 lg:pt-28">
        <div className="max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1.5 text-sm font-semibold text-primary">
            <Sparkles className="size-4" aria-hidden="true" />
            Clarity for everyday documents
          </div>

          <h1 className="max-w-xl text-4xl font-bold tracking-[-0.055em] text-ink sm:text-5xl lg:text-6xl lg:leading-[1.04]">
            Understand Complex Documents Without the Confusion.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            ClearMate uses AI to explain medical reports, electricity bills,
            bank notices, resumes and official documents in simple language.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            {/* Primary CTA */}
            <Button href="/analyze" className="gap-2">
              Upload Document
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>

            {/* Secondary CTA */}
            <Button href="#how-it-works" variant="secondary">
              Learn More
            </Button>
          </div>

          <p className="mt-6 flex items-center gap-2 text-sm text-slate-500">
            <ShieldCheck
              className="size-4 text-emerald-500"
              aria-hidden="true"
            />
            Clear explanations, designed with care.
          </p>
        </div>

        <DashboardPreview />
      </div>
    </section>
  );
}