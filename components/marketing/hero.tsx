import { ArrowRight, CheckCircle2, Lock, ShieldCheck, Sparkles } from "lucide-react";

import { DashboardPreview } from "@/components/marketing/dashboard-preview";
import { Button } from "@/components/ui/button";

/** Hero introduction and dashboard preview for the public landing page. */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-32">
      {/* Premium Multi-Layer Mesh & Radial Ambient Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.18),rgba(255,255,255,0))]" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 size-[42rem] rounded-full bg-gradient-to-tr from-blue-200/40 via-sky-100/50 to-indigo-100/30 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
        <div className="max-w-2xl">
          {/* Animated Glow Pill Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/80 px-4 py-2 text-xs font-bold text-blue-700 shadow-sm backdrop-blur-md transition duration-300 hover:border-blue-300 hover:shadow-md">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-blue-500 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-blue-600" />
            </span>
            <Sparkles className="size-3.5 text-blue-600" aria-hidden="true" />
            <span>AI-Powered Document Intelligence</span>
          </div>

          {/* Premium Multi-tone Display Headline */}
          <h1 className="max-w-xl text-4xl font-extrabold tracking-[-0.045em] text-slate-900 sm:text-5xl lg:text-6xl lg:leading-[1.06]">
            Understand Complex Documents{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
              Without Confusion.
            </span>
          </h1>

          {/* Lead Copy */}
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-8">
            ClearMate uses advanced AI to break down dense medical reports, electricity bills,
            bank notices, legal leases, and official documents into clear, human-friendly summaries.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
            <Button href="/analyze" className="gap-2 px-6 py-3.5 text-base shadow-lg shadow-blue-500/25">
              Upload Document Now
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>

            <Button href="#how-it-works" variant="secondary" className="px-6 py-3.5 text-base">
              See How It Works
            </Button>
          </div>

          {/* Trust Highlights */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:items-center sm:gap-6 border-t border-slate-200/60 pt-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <ShieldCheck className="size-4 text-emerald-500" aria-hidden="true" />
              <span>100% Private & Secure</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <CheckCircle2 className="size-4 text-blue-500" aria-hidden="true" />
              <span>Instant AI Breakdown</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <Lock className="size-4 text-indigo-500" aria-hidden="true" />
              <span>No Registration Required</span>
            </div>
          </div>
        </div>

        {/* Dashboard Preview Component */}
        <DashboardPreview />
      </div>
    </section>
  );
}