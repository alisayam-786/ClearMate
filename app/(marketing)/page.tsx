import { BrainCircuit, CircleAlert, FileSearch, MessageCircleMore, Upload } from "lucide-react";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { FeatureCard } from "@/components/marketing/feature-card";
import { Hero } from "@/components/marketing/hero";

const features = [
  { title: "AI Summary", description: "Explains documents in simple language.", icon: BrainCircuit },
  { title: "Important Information", description: "Brings key values, dates and notices into focus.", icon: FileSearch },
  { title: "Action Required", description: "Highlights what you may need to do next.", icon: CircleAlert },
  { title: "Ask AI", description: "Makes it easy to explore questions about your document.", icon: MessageCircleMore },
];

const steps = [
  { number: "01", title: "Upload", description: "Add a supported document when the analysis experience is available.", icon: Upload },
  { number: "02", title: "Analyze", description: "ClearMate will identify key details and translate complex language.", icon: FileSearch },
  { number: "03", title: "Understand", description: "Review a focused explanation and the most relevant next steps.", icon: BrainCircuit },
];

/** Public marketing landing page; all content is presentational placeholder copy. */
export default function MarketingPage() {
  return (
    <main>
      <Navbar />
      <Hero />

      <section id="features" className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Everything in context</p>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.045em] text-ink sm:text-4xl">A calmer way to read the documents that matter.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">ClearMate turns dense information into a clear, structured view—so the important parts are easier to find.</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => <FeatureCard key={feature.title} {...feature} />)}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="rounded-3xl bg-slate-950 px-6 py-14 text-white sm:px-10 lg:px-14 lg:py-18">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-300">How it works</p>
              <h2 className="mt-4 text-3xl font-bold tracking-[-0.045em] sm:text-4xl">From document to understanding in three simple steps.</h2>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <article key={step.number} className="relative border-t border-white/15 pt-6">
                    <span className="text-sm font-bold text-blue-300">{step.number}</span>
                    <div className="mt-5 flex size-11 items-center justify-center rounded-xl bg-white/10 text-blue-200"><Icon className="size-5" aria-hidden="true" /></div>
                    <h3 className="mt-5 text-xl font-bold">{step.title}</h3>
                    <p className="mt-2 max-w-xs text-sm leading-6 text-slate-300">{step.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="pb-24 sm:pb-28">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Built for clarity</p>
          <h2 className="mt-4 text-3xl font-bold tracking-[-0.045em] text-ink sm:text-4xl">Important information should feel easier to understand.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">ClearMate is designed to make complex everyday documents feel less intimidating and more approachable.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
