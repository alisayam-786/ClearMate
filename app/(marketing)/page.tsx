import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  CircleAlert,
  FileCheck,
  FileSearch,
  FileText,
  HeartPulse,
  Lock,
  MessageCircleMore,
  Receipt,
  ShieldCheck,
  Sparkles,
  Upload,
  XCircle,
  Zap,
} from "lucide-react";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { FeatureCard } from "@/components/marketing/feature-card";
import { Hero } from "@/components/marketing/hero";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "AI Instant Summary",
    description:
      "Translates complex medical jargon, legal clauses, and dense text into plain, everyday language.",
    icon: BrainCircuit,
    tag: "Plain English",
  },
  {
    title: "Key Details & Dates",
    description:
      "Automatically brings critical figures, due dates, billing amounts, and notices into immediate focus.",
    icon: FileSearch,
    tag: "Smart Extraction",
  },
  {
    title: "Action Required Alerts",
    description:
      "Highlights urgent next steps, payment deadlines, or response requirements so nothing gets missed.",
    icon: CircleAlert,
    tag: "No Surcharges",
  },
  {
    title: "Interactive AI Chat",
    description:
      "Ask follow-up questions directly about your document to get personalized, instant answers.",
    icon: MessageCircleMore,
    tag: "24/7 Assistance",
  },
];

const steps = [
  {
    number: "01",
    title: "Upload Document",
    description:
      "Drag and drop any medical report, utility bill, tax notice, or legal agreement.",
    icon: Upload,
  },
  {
    number: "02",
    title: "AI Analysis",
    description:
      "ClearMate's multi-layered AI identifies key information, translates terms, and flags actions.",
    icon: FileSearch,
  },
  {
    number: "03",
    title: "Instant Understanding",
    description:
      "Review a clear 1-page summary, key metrics, and recommended next steps with confidence.",
    icon: BrainCircuit,
  },
];

const documentTypes = [
  { name: "Medical & Lab Reports", icon: HeartPulse },
  { name: "Electricity & Utility Bills", icon: Zap },
  { name: "Lease & Property Contracts", icon: FileCheck },
  { name: "Tax & Bank Statements", icon: Receipt },
  { name: "Employment Contracts", icon: FileText },
];

/** Premium, hackathon-ready marketing landing page for ClearMate. */
export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-blue-200 selection:text-blue-900">
      <Navbar />

      <main>
        {/* Apple-Style Hero Section */}
        <Hero />

        {/* Supported Document Types Marquee / Pill Strip */}
        <section className="border-y border-slate-200/80 bg-white py-10 shadow-xs">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400">
              Trusted for all critical everyday documents
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
              {documentTypes.map((doc) => {
                const Icon = doc.icon;
                return (
                  <div
                    key={doc.name}
                    className="inline-flex items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-2xs backdrop-blur-md transition duration-200 hover:border-blue-300 hover:bg-blue-50/60 hover:text-blue-600"
                  >
                    <Icon className="size-4 text-blue-600" aria-hidden="true" />
                    <span>{doc.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full bg-blue-100/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-700">
                Everything In Context
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                A Calmer Way to Read the Documents That Matter.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                ClearMate turns dense, intimidating paperwork into clean, structured takeaways—so you can act with total confidence.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 px-6 py-16 text-white shadow-2xl sm:px-12 lg:px-16 lg:py-20">
              {/* Ambient radial glows inside how-it-works card */}
              <div className="pointer-events-none absolute -right-20 -top-20 size-96 rounded-full bg-blue-600/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 size-80 rounded-full bg-indigo-600/20 blur-3xl" />

              <div className="relative max-w-2xl">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-300 border border-blue-500/30">
                  <Sparkles className="size-3.5 text-blue-400" aria-hidden="true" />
                  Three Simple Steps
                </span>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  From Confusing PDF to Complete Clarity in Seconds.
                </h2>
              </div>

              <div className="relative mt-14 grid gap-8 md:grid-cols-3">
                {steps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <article
                      key={step.number}
                      className="group relative rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-md transition duration-300 hover:border-blue-500/50 hover:bg-white/10"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-blue-400">
                          {step.number}
                        </span>
                        <span className="grid size-10 place-items-center rounded-xl bg-blue-600/20 text-blue-300 group-hover:bg-blue-600 group-hover:text-white transition duration-300">
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-6 text-xl font-bold text-white">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">
                        {step.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Before vs After Comparison Section */}
        <section id="comparison" className="py-24 sm:py-32 bg-white">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full bg-indigo-100 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-700">
                The ClearMate Difference
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Before vs. After ClearMate
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                See how ClearMate transforms stressful, unreadable documents into straightforward intelligence.
              </p>
            </div>

            <div className="mt-14 grid gap-8 lg:grid-cols-2">
              {/* BEFORE Card */}
              <div className="rounded-3xl border border-rose-200/80 bg-rose-50/50 p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-2 text-rose-700">
                  <XCircle className="size-5 shrink-0" aria-hidden="true" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Without ClearMate (Standard PDF)
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  Dense Legalese & Medical Fine Print
                </h3>
                <div className="mt-4 space-y-3 rounded-2xl bg-white p-5 text-xs leading-relaxed text-slate-500 font-mono border border-rose-100">
                  <p>
                    &quot;...Pursuant to Section 14(b) hereof, the lessee hereby agrees to indemnify and hold harmless the lessor from any liabilities arising out of sub-clause (iv), notwithstanding any prior notice delivered prior to the expiration date...&quot;
                  </p>
                  <p className="text-rose-600 font-semibold">
                    ❌ Hard to parse • Important deadlines hidden • Risks missing late fee penalties
                  </p>
                </div>
              </div>

              {/* AFTER Card */}
              <div className="rounded-3xl border border-emerald-200/80 bg-emerald-50/50 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-2 text-emerald-700">
                  <CheckCircle2 className="size-5 shrink-0" aria-hidden="true" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    With ClearMate AI Breakdown
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  Instant, Structured & Actionable Insights
                </h3>
                <div className="mt-4 space-y-3 rounded-2xl bg-white p-5 text-xs leading-relaxed text-slate-800 border border-emerald-100 shadow-2xs">
                  <div className="flex items-start gap-2">
                    <Sparkles className="size-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900">AI Summary:</span> You are responsible for damage repairs unless you notify your landlord in writing 60 days before moving out.
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold pt-1">
                    <CheckCircle2 className="size-4" />
                    <span>Clear 10-second summary • Action items flagged • 100% Confidence</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 sm:py-28 bg-slate-50">
          <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
            <span className="inline-block rounded-full bg-blue-100 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-700">
              Built for Peace of Mind
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Important Information Should Feel Easy to Understand.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
              Every day, millions of people struggle with complex medical results, unexpected electricity bills, and confusing legal agreements. ClearMate was created to empower everyone with instant document comprehension.
            </p>

            {/* Stat Counters */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-b border-slate-200 py-8">
              <div>
                <p className="text-3xl font-extrabold text-blue-600 sm:text-4xl">100%</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">Private & Confidential</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-blue-600 sm:text-4xl">&lt; 10s</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">Analysis Speed</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-blue-600 sm:text-4xl">0</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">Jargon Confusion</p>
              </div>
            </div>
          </div>
        </section>

        {/* High-Impact Call To Action Banner */}
        <section className="pb-24 sm:pb-32 pt-8">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-6 py-16 text-center text-white shadow-2xl sm:px-12 sm:py-20">
              {/* Radial glow backdrop */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/30 via-transparent to-transparent blur-3xl" />

              <div className="relative mx-auto max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/20 px-4 py-1.5 text-xs font-bold text-blue-300">
                  <Sparkles className="size-4 text-blue-400" aria-hidden="true" />
                  Instant Document Intelligence
                </span>

                <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Stop Guessing. Understand Your Documents Today.
                </h2>

                <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
                  Upload your medical report, electricity bill, lease contract, or notice now to get a clear AI explanation in seconds.
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button
                    href="/analyze"
                    className="gap-2 px-8 py-4 text-base font-bold shadow-xl shadow-blue-600/30"
                  >
                    <span>Upload Document Now</span>
                    <ArrowRight className="size-5" aria-hidden="true" />
                  </Button>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="size-4 text-emerald-400" />
                    No sign-up required
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Lock className="size-4 text-blue-400" />
                    Encrypted file processing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

