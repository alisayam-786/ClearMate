"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
};

export function Button({
  children,
  href,
  className = "",
  variant = "primary",
  onClick,
}: Readonly<ButtonProps>) {
  const variants = {
    primary:
      "bg-primary text-white shadow-[0_10px_24px_rgba(37,99,235,0.22)] hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-[0_14px_28px_rgba(37,99,235,0.28)] focus-visible:ring-primary",
    secondary:
      "border border-slate-200 bg-white text-slate-700 shadow-sm hover:-translate-y-0.5 hover:border-blue-200 hover:text-primary hover:shadow-md focus-visible:ring-slate-400",
  };

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}