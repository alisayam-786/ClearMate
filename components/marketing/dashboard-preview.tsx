"use client";

import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  FileCheck2,
  FileText,
  HeartPulse,
  Sparkles,
  Zap,
} from "lucide-react";

type SampleDocKey = "medical" | "electricity" | "lease";

interface SampleDoc {
  id: SampleDocKey;
  label: string;
  badge: string;
  icon: typeof FileText;
  docTitle: string;
  category: string;
  summary: string;
  keyInfo: { label: string; value: string }[];
  actionRequired: string;
  confidenceScore: string;
}

const sampleDocuments: Record<SampleDocKey, SampleDoc> = {
  medical: {
    id: "medical",
    label: "Medical Report",
    badge: "Healthcare AI",
    icon: HeartPulse,
    docTitle: "Annual Metabolic & Blood Panel",
    category: "Lab Analysis",
    summary:
      "All primary metabolic indicators are within healthy thresholds. Vitamin D is slightly low.",
    keyInfo: [
      { label: "Cholesterol (HDL)", value: "58 mg/dL (Optimal)" },
      { label: "Fasting Blood Sugar", value: "92 mg/dL (Normal)" },
      { label: "Vitamin D3", value: "18 ng/mL (Slightly Low)" },
    ],
    actionRequired:
      "Schedule a routine follow-up with your primary physician to discuss Vitamin D3 supplementation.",
    confidenceScore: "99.4% Clarity",
  },
  electricity: {
    id: "electricity",
    label: "Electricity Bill",
    badge: "Utility Analysis",
    icon: Zap,
    docTitle: "City Power & Light - Monthly Invoice",
    category: "Monthly Bill",
    summary:
      "Your total charges for March are ₹1,240. Usage decreased by 12% compared to February.",
    keyInfo: [
      { label: "Total Amount Due", value: "₹1,240.00" },
      { label: "Payment Due Date", value: "March 28, 2026" },
      { label: "Units Consumed", value: "215 kWh" },
    ],
    actionRequired:
      "Pay before March 28 to avoid a ₹150 late payment surcharge.",
    confidenceScore: "100% Verified",
  },
  lease: {
    id: "lease",
    label: "Lease Agreement",
    badge: "Legal Contract",
    icon: FileCheck2,
    docTitle: "Residential Property Lease Agreement",
    category: "Legal Agreement",
    summary:
      "Standard 12-month residential contract with fixed monthly rent and 60-day notice clause.",
    keyInfo: [
      { label: "Monthly Rent", value: "₹22,000 / month" },
      { label: "Security Deposit", value: "₹44,000 (Refundable)" },
      { label: "Notice Period", value: "60 Days Written" },
    ],
    actionRequired:
      "Written non-renewal notice must be submitted 60 days prior to contract expiration.",
    confidenceScore: "98.9% Accuracy",
  },
};

/** Interactive, high-fidelity document dashboard preview component. */
export function DashboardPreview() {
  const [activeTab, setActiveTab] = useState<SampleDocKey>("medical");
  const activeDoc = sampleDocuments[activeTab];

  return (
    <div className="relative mx-auto w-full max-w-2xl lg:ml-auto">
      {/* Radiant ambient background glows */}
      <div className="pointer-events-none absolute -right-12 -top-12 -z-10 size-56 rounded-full bg-gradient-to-br from-blue-400/30 to-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 -z-10 size-48 rounded-full bg-sky-300/30 blur-2xl" />

      {/* Main Glassmorphic Container */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-[0_25px_70px_-15px_rgba(15,23,42,0.14)] backdrop-blur-xl sm:p-6">
        {/* Interactive Tab Switcher Header */}
        <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-blue-600/10 text-blue-600">
              <Sparkles className="size-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Interactive Preview
              </p>
              <p className="text-sm font-bold text-slate-900">
                Live AI Document Intelligence
              </p>
            </div>
          </div>

          {/* Document Switcher Buttons */}
          <div
            className="flex items-center gap-1 rounded-xl bg-slate-100/80 p-1"
            role="tablist"
            aria-label="Sample document types"
          >
            {(Object.keys(sampleDocuments) as SampleDocKey[]).map((key) => {
              const doc = sampleDocuments[key];
              const Icon = doc.icon;
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    isActive
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Icon className="size-3.5" aria-hidden="true" />
                  <span>{doc.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Content Display */}
        <div className="mt-4 space-y-3">
          {/* Document Header & AI Badge */}
          <div className="grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
            {/* Document Title Block */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 transition-all duration-300">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold uppercase tracking-wider">
                  Document Type
                </span>
                <span className="font-medium text-emerald-600">
                  {activeDoc.confidenceScore}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-blue-600 text-white shadow-sm">
                  <activeDoc.icon className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {activeDoc.docTitle}
                  </h4>
                  <p className="text-xs text-slate-500">{activeDoc.category}</p>
                </div>
              </div>
            </div>

            {/* AI Summary Highlight Block */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 p-4 text-white shadow-md transition-all duration-300">
              <div className="flex items-center gap-1.5 text-blue-100">
                <Sparkles className="size-3.5" aria-hidden="true" />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  ClearMate Summary
                </span>
              </div>
              <p className="mt-2 text-xs font-medium leading-relaxed text-blue-50">
                {activeDoc.summary}
              </p>
            </div>
          </div>

          {/* Key Information Grid */}
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Key Details Extracted
            </p>
            <div className="mt-2.5 grid gap-2 sm:grid-cols-3">
              {activeDoc.keyInfo.map((info, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-slate-50 p-2.5 transition duration-200 hover:bg-blue-50/50"
                >
                  <p className="text-[11px] text-slate-500">{info.label}</p>
                  <p className="mt-1 text-xs font-bold text-slate-900">
                    {info.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Required Banner */}
          <div className="rounded-2xl border border-amber-200/80 bg-amber-50/70 p-4">
            <div className="flex items-center gap-2 text-amber-800">
              <AlertCircle className="size-4 shrink-0 text-amber-600" aria-hidden="true" />
              <p className="text-[11px] font-bold uppercase tracking-wider">
                Action Required
              </p>
            </div>
            <p className="mt-1.5 text-xs font-medium leading-relaxed text-amber-950">
              {activeDoc.actionRequired}
            </p>
          </div>
        </div>

        {/* Live Indicator Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle2
              className="size-4 text-emerald-500"
              aria-hidden="true"
            />
            <span>Instant AI Analysis • Encrypted & Confidential</span>
          </div>
          <span className="hidden font-mono text-[11px] text-slate-400 sm:inline">
            ClearMate v2.0
          </span>
        </div>
      </div>
    </div>
  );
}

