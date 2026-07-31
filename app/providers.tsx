"use client";

import type { ReactNode } from "react";

import { DocumentProvider } from "@/contexts/document-context";

/** Application-wide client-side providers. */
export function Providers({ children }: Readonly<{ children: ReactNode }>) {
  return <DocumentProvider>{children}</DocumentProvider>;
}
