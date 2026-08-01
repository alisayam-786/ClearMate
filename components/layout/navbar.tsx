"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const navigation = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#comparison", label: "Before vs After" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

/** Modern floating glassmorphic primary navigation bar. */
export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl transition-all duration-300">
      <nav
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8"
        aria-label="Main navigation"
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 text-lg font-black text-white shadow-[0_4px_16px_rgba(37,99,235,0.35)] transition duration-300 group-hover:scale-105 group-hover:shadow-[0_6px_22px_rgba(37,99,235,0.45)]">
            C
          </span>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-slate-900">
              ClearMate
            </span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-wider text-blue-600 sm:inline">
              Document Intelligence
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-1 rounded-full border border-slate-200/70 bg-slate-50/70 px-4 py-1.5 backdrop-blur-md lg:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-1.5 text-sm font-medium text-slate-600 transition duration-200 hover:bg-white hover:text-blue-600 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Button href="/analyze" className="hidden sm:inline-flex gap-2">
            <span>Upload Document</span>
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="grid size-10 place-items-center rounded-xl border border-slate-200/80 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle main menu"
          >
            {mobileMenuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white/95 px-5 py-6 backdrop-blur-2xl lg:hidden">
          <div className="flex flex-col space-y-2">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-slate-100">
              <Button
                href="/analyze"
                className="w-full gap-2 text-center py-3.5"
              >
                <span>Upload Document</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

