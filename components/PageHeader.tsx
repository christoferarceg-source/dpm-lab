import type { ReactNode } from "react";

/** Consistent page header: small kicker, title, one-line description, optional right-side slot. */
export function PageHeader({
  kicker,
  title,
  description,
  aside,
}: {
  kicker?: string;
  title: string;
  description?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div className="min-w-0">
        {kicker && <p className="text-[0.7rem] uppercase tracking-wide text-accent font-semibold">{kicker}</p>}
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mt-0.5">{title}</h1>
        {description && <p className="text-sm sm:text-[0.95rem] text-muted mt-1.5 max-w-2xl">{description}</p>}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </div>
  );
}
