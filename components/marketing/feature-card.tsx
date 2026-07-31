import type { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

/** Reusable feature card for communicating a ClearMate capability. */
export function FeatureCard({ title, description, icon: Icon }: Readonly<FeatureCardProps>) {
  return (
    <article className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-[0_16px_36px_rgba(15,23,42,0.09)]">
      <span className="grid size-11 place-items-center rounded-xl bg-blue-50 text-primary transition duration-300 group-hover:scale-105 group-hover:bg-blue-100">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-lg font-bold tracking-[-0.025em] text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </article>
  );
}
