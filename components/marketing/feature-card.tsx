import type { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  tag?: string;
};

/** High-grade glassmorphic feature card showcasing ClearMate capabilities. */
export function FeatureCard({
  title,
  description,
  icon: Icon,
  tag,
}: Readonly<FeatureCardProps>) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-7 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.15)]">
      {/* Subtle top border gradient highlight on hover */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex items-center justify-between">
        <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white group-hover:shadow-md">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        {tag && (
          <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold text-blue-700 uppercase tracking-wider">
            {tag}
          </span>
        )}
      </div>

      <h3 className="mt-6 text-xl font-bold tracking-[-0.03em] text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
        {title}
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
        {description}
      </p>
    </article>
  );
}

