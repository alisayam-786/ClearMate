"use client";

import { useEffect } from "react";
import { ArrowLeft, FileCheck2, FileQuestion } from "lucide-react";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ActionCard } from "@/components/results/action-card";
import { ConfidenceCard } from "@/components/results/confidence-card";
import { DocumentTypeCard } from "@/components/results/document-type-card";
import { ImportantInformationCard } from "@/components/results/important-information-card";
import { SummaryCard } from "@/components/results/summary-card";
import { Button } from "@/components/ui/button";
import { useDocumentContext } from "@/contexts/document-context";

/** Results page */
export default function ResultsPage() {
  const { analysisResult, documentFile, extractedText } = useDocumentContext();

  useEffect(() => {
    if (documentFile?.type === "application/pdf" && extractedText) {
      console.info("ClearMate PDF text extraction completed.");
    }
  }, [documentFile, extractedText]);

  if (!documentFile || !analysisResult) {
    return (
      <main>
        <Navbar />
        <section className="relative grid min-h-[calc(100vh-80px)] place-items-center overflow-hidden px-5 py-20">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(circle_at_50%_25%,rgba(219,234,254,0.68),transparent_32%),radial-gradient(circle_at_8%_60%,rgba(219,234,254,0.55),transparent_29%)]" />

          <div className="max-w-lg rounded-3xl border border-slate-200/80 bg-white p-6 text-center shadow-[0_18px_60px_rgba(15,23,42,0.08)] sm:p-8">
            <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-blue-50 text-primary">
              <FileQuestion className="size-6" aria-hidden="true" />
            </span>

            <h1 className="mt-5 text-3xl font-bold tracking-[-0.045em] text-ink">
              No analysis is ready yet
            </h1>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Upload a PDF and complete the analysis to view its results here.
            </p>

            <Button href="/analyze" className="mt-7">
              Analyze a Document
            </Button>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />

      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[26rem] bg-[radial-gradient(circle_at_72%_0%,rgba(191,219,254,0.7),transparent_34%),radial-gradient(circle_at_5%_15%,rgba(219,234,254,0.6),transparent_28%)]" />

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* Header */}
          <div className="animate-clearmate-fade-up flex flex-col gap-6 rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-7 md:flex-row md:items-center md:justify-between">
            <DocumentTypeCard
              documentName={documentFile.name}
              documentType={analysisResult.documentType}
            />

            <ConfidenceCard />
          </div>

          {/* Result Cards */}
          <div className="mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-5">
              <div
                className="animate-clearmate-fade-up"
                style={{ animationDelay: "80ms" }}
              >
                <SummaryCard summary={analysisResult.summary} />
              </div>

              <div
                className="animate-clearmate-fade-up"
                style={{ animationDelay: "160ms" }}
              >
                <ActionCard actions={analysisResult.actionsRequired} />
              </div>
            </div>

            <div className="space-y-5">
              <div
                className="animate-clearmate-fade-up"
                style={{ animationDelay: "120ms" }}
              >
                <ImportantInformationCard
                  information={analysisResult.importantInformation}
                />
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div
            className="animate-clearmate-fade-up mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row"
            style={{ animationDelay: "280ms" }}
          >
            <p className="flex items-center gap-2 text-sm text-slate-500">
              <FileCheck2
                className="size-4 text-emerald-500"
                aria-hidden="true"
              />
              AI analysis completed successfully. Please review the extracted
              information before making any important decisions.
            </p>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button href="/analyze" className="gap-2">
                Analyze Another Document
                <FileCheck2 className="size-4" aria-hidden="true" />
              </Button>

              <Button href="/" variant="secondary" className="gap-2">
                <ArrowLeft className="size-4" aria-hidden="true" />
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}