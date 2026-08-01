"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

import type { AnalysisResult } from "@/types/analysis";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type DocumentContextValue = {
  documentFile: File | null;
  setDocumentFile: (file: File | null) => void;
  extractedText: string;
  setExtractedText: (text: string) => void;
  analysisResult: AnalysisResult | null;
  setAnalysisResult: (analysis: AnalysisResult | null) => void;
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
};

/** In-memory document session shared by the upload, processing, and results routes. */
export const DocumentContext = createContext<DocumentContextValue | undefined>(undefined);

/** Provides the selected browser File for the lifetime of the current application session. */
export function DocumentProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [documentFile, setDocumentFileState] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const setDocumentFile = useCallback((file: File | null) => {
    setDocumentFileState(file);
    setExtractedText("");
    setAnalysisResult(null);
    setChatMessages([]);
  }, []);

  const value = useMemo(
    () => ({
      documentFile,
      setDocumentFile,
      extractedText,
      setExtractedText,
      analysisResult,
      setAnalysisResult,
      chatMessages,
      setChatMessages,
    }),
    [analysisResult, chatMessages, documentFile, extractedText, setDocumentFile],
  );

  return <DocumentContext value={value}>{children}</DocumentContext>;
}

/** Reads the active in-memory document session. */
export function useDocumentContext() {
  const context = useContext(DocumentContext);

  if (!context) {
    throw new Error("useDocumentContext must be used within a DocumentProvider.");
  }

  return context;
}
