"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Bot, Check, CheckCircle2, Circle, LoaderCircle, Sparkles } from "lucide-react";

import { useDocumentContext } from "@/contexts/document-context";
import { extractPdfText } from "@/lib/document/extract-pdf-text";
import { isAnalysisResult } from "@/types/analysis";

const workflowSteps = [
  "Detecting document type",
  "Reading document structure",
  "Extracting important information",
  "Generating AI explanation",
];

const ANALYSIS_TIMEOUT_MS = 45_000;

function getStatusMessage(progress: number) {
  if (progress < 12) return "Preparing AI...";
  if (progress < 30) return "Scanning document...";
  if (progress < 52) return "Understanding content...";
  if (progress < 75) return "Extracting key details...";
  if (progress < 95) return "Generating explanation...";
  if (progress < 100) return "Finalizing results...";
  return "Analysis Complete";
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "An unexpected error occurred.";
}

async function readAnalysisResponse(response: Response) {
  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload !== null && "error" in payload && typeof payload.error === "string"
        ? payload.error
        : `Analysis request failed with status ${response.status}.`;
    throw new Error(message);
  }

  if (!isAnalysisResult(payload)) {
    throw new Error("The analysis service returned an unexpected response format.");
  }

  return payload;
}

async function requestAnalysis(extractedText: string, signal: AbortSignal) {
  const requestController = new AbortController();
  let timedOut = false;
  const abortRequest = () => requestController.abort();
  const timeoutId = window.setTimeout(() => {
    timedOut = true;
    requestController.abort();
  }, ANALYSIS_TIMEOUT_MS);
  signal.addEventListener("abort", abortRequest, { once: true });

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ extractedText }),
      signal: requestController.signal,
    });
    return await readAnalysisResponse(response);
  } catch (error) {
    if (timedOut) throw new Error("The analysis request timed out.");
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
    signal.removeEventListener("abort", abortRequest);
  }
}

/** Visual-only document-analysis progress experience with timed local state. */
export function ProcessingStatus() {
  const router = useRouter();
  const { documentFile, setAnalysisResult, setExtractedText } = useDocumentContext();
  const [progress, setProgress] = useState(0);
  const [isPreparing, setIsPreparing] = useState(true);
  const [analysisReady, setAnalysisReady] = useState(false);
  const [processingError, setProcessingError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const runIdRef = useRef(0);

  useEffect(() => {
    if (!documentFile) {
      router.replace("/analyze");
      return;
    }

    const file = documentFile;
    const runId = runIdRef.current + 1;
    const abortController = new AbortController();
    runIdRef.current = runId;
    const isCurrentRun = () => runIdRef.current === runId && !abortController.signal.aborted;

    async function prepareDocument() {
      setProgress(0);
      setProcessingError(null);
      setIsPreparing(true);
      setAnalysisReady(false);
      setExtractedText("");
      setAnalysisResult(null);

      try {
        if (file.type !== "application/pdf") {
          throw new Error("ClearMate can currently analyze readable PDF documents only.");
        }

        const extractedText = await extractPdfText(file, abortController.signal);
        if (!isCurrentRun()) return;
        setExtractedText(extractedText);
        setIsPreparing(false);

        const payload = await requestAnalysis(extractedText, abortController.signal);

        if (!isCurrentRun()) return;
        setAnalysisResult(payload);
        setAnalysisReady(true);
      } catch (error) {
        if (!isCurrentRun()) return;
        console.error("Document processing failed", error);
        setProcessingError(getErrorMessage(error));
        setIsPreparing(false);
      }
    }

    void prepareDocument();

    return () => {
      abortController.abort();
    };
  }, [attempt, documentFile, router, setAnalysisResult, setExtractedText]);

  useEffect(() => {
    if (!documentFile || isPreparing || processingError) return;

    const timer = window.setInterval(() => {
      setProgress((current) => {
        const maximumProgress = analysisReady ? 100 : 85;
        if (current >= maximumProgress) {
          window.clearInterval(timer);
          return current;
        }
        const next = Math.min(current + 1, maximumProgress);
        if (next === 100) window.clearInterval(timer);
        return next;
      });
    }, 56);

    return () => window.clearInterval(timer);
  }, [analysisReady, documentFile, isPreparing, processingError]);

  useEffect(() => {
    if (!documentFile || isPreparing || processingError || !analysisReady || progress !== 100) return;

    const redirectTimer = window.setTimeout(() => router.push("/results"), 1000);
    return () => window.clearTimeout(redirectTimer);
  }, [analysisReady, documentFile, isPreparing, processingError, progress, router]);

  const activeStep = useMemo(() => {
    if (progress < 25) return 0;
    if (progress < 50) return 1;
    if (progress < 75) return 2;
    return 3;
  }, [progress]);
  const remainingSeconds = Math.max(1, Math.ceil((100 - progress) * 0.056));
  const isComplete = progress === 100 && !processingError;

  if (!documentFile) return null;

  return (
    <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.12)] sm:p-8">
      <div className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-blue-100/70 blur-3xl" />
      <div className="relative text-center">
        <span className="animate-clearmate-pulse mx-auto grid size-20 place-items-center rounded-3xl bg-primary text-white shadow-[0_16px_34px_rgba(37,99,235,0.3)]">
          {isComplete ? <Check className="size-9" aria-hidden="true" /> : <Bot className="animate-clearmate-float size-9" aria-hidden="true" />}
        </span>
        <div className={`mt-6 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold ${isComplete ? "bg-emerald-50 text-emerald-700" : processingError ? "bg-rose-50 text-rose-700" : "border border-blue-100 bg-blue-50 text-primary"}`}>
          {isComplete ? <CheckCircle2 className="size-4" aria-hidden="true" /> : <Sparkles className="size-4" aria-hidden="true" />}
          {isComplete ? "Analysis Complete" : processingError ? "Analysis Error" : "AI Analysis in Progress"}
        </div>
        <h1 className="mt-5 text-3xl font-bold tracking-[-0.045em] text-ink sm:text-4xl">{isComplete ? "Your analysis is ready." : processingError ? "We couldn’t analyze this document." : "Analyzing your document..."}</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600 sm:text-base" role={processingError ? "alert" : undefined}>{isComplete ? "Taking you to your document overview now." : processingError ?? "Please wait while ClearMate identifies the document type, extracts important information, and prepares an easy-to-understand explanation."}</p>
        {processingError ? <button type="button" onClick={() => setAttempt((current) => current + 1)} className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(37,99,235,0.22)] transition duration-200 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-[0_14px_28px_rgba(37,99,235,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">Retry</button> : null}
      </div>

      <div className="relative mt-8 rounded-2xl bg-slate-50 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="text-left">
            <p className="text-sm font-bold text-ink">{processingError ? "Document analysis failed" : getStatusMessage(progress)}</p>
            <p className="mt-1 text-xs text-slate-500">{processingError ? "Please retry the analysis." : isComplete ? "Opening your results" : `About ${remainingSeconds} second${remainingSeconds === 1 ? "" : "s"} remaining`}</p>
          </div>
          <span className="tabular-nums text-2xl font-bold tracking-[-0.04em] text-primary" aria-label={`${progress} percent complete`}>{progress}%</span>
        </div>
        <div className="relative mt-4 h-2.5 overflow-hidden rounded-full bg-slate-200" role="progressbar" aria-label="Document analysis progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
          <div className="relative h-full rounded-full bg-primary transition-[width] duration-100 ease-linear" style={{ width: `${progress}%` }}>
            <span className="animate-clearmate-shimmer absolute inset-y-0 w-1/3 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/50 to-transparent" />
          </div>
        </div>
      </div>

      <ol className="relative mt-6 space-y-2.5" aria-label="Analysis workflow">
        {workflowSteps.map((step, index) => {
          const isFinished = isComplete || (!processingError && index < activeStep);
          const isActive = !isComplete && !processingError && index === activeStep;
          return (
            <li key={step} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition duration-500 ${isActive ? "bg-blue-50 text-primary" : "text-slate-500"}`}>
              {isFinished ? (
                <span className="grid size-5 place-items-center rounded-full bg-emerald-500 text-white"><Check className="size-3" strokeWidth={3} aria-hidden="true" /></span>
              ) : isActive ? (
                <LoaderCircle className="animate-clearmate-spin size-5 text-primary" aria-label="In progress" />
              ) : (
                <Circle className="size-5 text-slate-300" aria-hidden="true" />
              )}
              <span className={`text-sm font-medium transition duration-500 ${isActive || isFinished ? "text-ink" : ""}`}>{step}</span>
              {isActive ? <span className="ml-auto text-xs font-semibold text-primary">In progress</span> : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
