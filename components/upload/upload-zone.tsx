"use client";

import type { ChangeEvent, DragEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, FileImage, FileText, ImageIcon, ShieldCheck, UploadCloud, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useDocumentContext } from "@/contexts/document-context";

const maximumFileSize = 10 * 1024 * 1024;

function formatFileSize(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(bytes < 1024 * 1024 ? 1 : 2)} MB`;
}

function isSupportedFile(file: File) {
  return ["application/pdf", "image/jpeg", "image/png"].includes(file.type);
}

/** UI-only file picker and drop zone with clear drag states and auto-reset capability. */
export function UploadZone() {
  const { documentFile, setDocumentFile, resetSession } = useDocumentContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(documentFile);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync selectedFile if documentFile changes externally
  useEffect(() => {
    setSelectedFile(documentFile);
  }, [documentFile]);

  function chooseFile(file: File | null) {
    if (!file) return;

    if (!isSupportedFile(file)) {
      setSelectedFile(null);
      setDocumentFile(null);
      setError("Please select a PDF, JPG, or PNG file.");
      return;
    }

    if (file.size > maximumFileSize) {
      setSelectedFile(null);
      setDocumentFile(null);
      setError("Please select a file smaller than 10 MB.");
      return;
    }

    setError(null);
    setSelectedFile(file);
    setDocumentFile(file);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    chooseFile(event.target.files?.[0] ?? null);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    chooseFile(event.dataTransfer.files?.[0] ?? null);
  }

  function clearSelection() {
    resetSession();
    setSelectedFile(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  const isPdf = selectedFile?.type === "application/pdf";
  const FileIcon = isPdf ? FileText : FileImage;

  return (
    <div className="mx-auto w-full max-w-2xl">
      <input
        ref={inputRef}
        id="document-upload"
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
        className="sr-only"
        onChange={handleFileChange}
      />

      {!selectedFile ? (
        <div
          className={`group rounded-3xl border-2 border-dashed bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.06)] transition-all duration-200 sm:p-10 ${
            isDragging
              ? "border-primary bg-blue-50/70 shadow-[0_20px_50px_rgba(37,99,235,0.12)] scale-[1.01]"
              : "border-slate-200/90 hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
          }`}
          onDragEnter={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragOver={(event) => event.preventDefault()}
          onDragLeave={(event) => {
            event.preventDefault();
            setIsDragging(false);
          }}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center text-center">
            <span className="grid size-16 place-items-center rounded-2xl bg-blue-50 text-primary shadow-sm transition duration-200 group-hover:scale-110 group-hover:bg-blue-100/70">
              <UploadCloud className="size-8" aria-hidden="true" />
            </span>
            <h2 className="mt-6 text-xl font-bold tracking-[-0.03em] text-ink sm:text-2xl">
              Drop your document here
            </h2>
            <p className="mt-2.5 max-w-sm text-sm leading-6 text-slate-500">
              Drag and drop your file here, or choose a file from your device.
            </p>

            <label
              htmlFor="document-upload"
              className="mt-6 inline-flex cursor-pointer items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(37,99,235,0.22)] transition duration-200 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-[0_14px_28px_rgba(37,99,235,0.28)] focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
            >
              Choose File
            </label>

            <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-medium text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <FileText className="size-3.5 text-primary" aria-hidden="true" /> PDF
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ImageIcon className="size-3.5 text-primary" aria-hidden="true" /> JPG, PNG
              </span>
              <span>Maximum file size: 10 MB</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-blue-100 bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.08)] sm:p-7">
          <div className="flex items-start gap-4">
            <span
              className={`grid size-12 shrink-0 place-items-center rounded-2xl ${
                isPdf ? "bg-rose-50 text-rose-500" : "bg-blue-50 text-primary"
              }`}
            >
              <FileIcon className="size-6" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-bold text-ink">{selectedFile.name}</p>
              <p className="mt-1 text-sm text-slate-500">
                {isPdf ? "PDF document" : "Image document"} · {formatFileSize(selectedFile.size)}
              </p>
            </div>
            <button
              type="button"
              onClick={clearSelection}
              className="grid size-9 shrink-0 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Remove selected file"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="size-4 text-emerald-500" aria-hidden="true" /> Secure local analysis.
            </p>
            <Button href="/processing" className="gap-2 whitespace-nowrap">
              Analyze Document <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}

      {error ? (
        <p className="mt-3 text-center text-sm font-medium text-rose-600" role="alert">
          {error}
        </p>
      ) : null}
      <p className="mt-6 text-center text-xs leading-5 text-slate-400">
        Supported formats: PDF, JPG, and PNG. Maximum file size: 10 MB.
      </p>
    </div>
  );
}
