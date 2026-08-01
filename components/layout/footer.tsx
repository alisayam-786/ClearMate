"use client";

import Link from "next/link";
import { ArrowUp, Lock, ShieldCheck, Sparkles } from "lucide-react";

/** High-grade dark glassmorphic footer component. */
export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="border-t border-slate-800 bg-slate-950 text-slate-400"
    >
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-lg font-black text-white shadow-md">
                C
              </span>
              <span className="text-xl font-bold tracking-tight text-white">
                ClearMate
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              ClearMate turns dense, intimidating everyday documents—medical reports,
              utility bills, legal contracts, and notices—into clear, actionable takeaways.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-emerald-500" aria-hidden="true" />
                100% Confidential
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Lock className="size-4 text-blue-500" aria-hidden="true" />
                Secure Processing
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-5 sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Navigation
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <a
                    href="#features"
                    className="transition hover:text-white focus-visible:outline-none focus-visible:text-white"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="transition hover:text-white focus-visible:outline-none focus-visible:text-white"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#comparison"
                    className="transition hover:text-white focus-visible:outline-none focus-visible:text-white"
                  >
                    Before & After
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="transition hover:text-white focus-visible:outline-none focus-visible:text-white"
                  >
                    About ClearMate
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Supported Documents
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
                <li>Medical & Lab Reports</li>
                <li>Electricity & Water Bills</li>
                <li>Legal & Lease Agreements</li>
                <li>Bank Notices & Taxes</li>
              </ul>
            </div>
          </div>

          {/* Back to Top */}
          <div className="lg:col-span-2 flex flex-col items-start lg:items-end justify-between">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-300 transition hover:border-slate-700 hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Scroll back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-900 pt-8 sm:flex-row text-xs text-slate-500">
          <p>© 2026 ClearMate. Built for clarity & peace of mind.</p>
          <div className="flex items-center gap-2 text-slate-400">
            <Sparkles className="size-3.5 text-blue-500" aria-hidden="true" />
            <span>Empowering everyday document comprehension</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

