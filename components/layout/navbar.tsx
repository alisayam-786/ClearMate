import Link from "next/link";

import { Button } from "@/components/ui/button";

const navigation = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

/** Primary site navigation for the ClearMate marketing page. */
export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Main navigation">
        <Link href="/" className="group flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-lg font-bold text-white shadow-[0_6px_16px_rgba(37,99,235,0.28)] transition duration-200 group-hover:scale-105">
            C
          </span>
          <span className="text-lg font-bold tracking-[-0.04em] text-ink">ClearMate</span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-medium text-slate-600 transition hover:text-primary focus-visible:outline-none focus-visible:text-primary">
              {item.label}
            </a>
          ))}
        </div>

        <Button href="/analyze" className="px-4 py-2.5 text-sm sm:px-5">
          Upload Document
        </Button>
      </nav>
    </header>
  );
}
