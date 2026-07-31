import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import { Providers } from "./providers";

/** Shared document shell for every ClearMate route. */
export const metadata: Metadata = {
  title: "ClearMate",
  description: "AI document intelligence for everyday documents.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
