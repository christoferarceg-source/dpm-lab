"use client";

import { TABLE_DOCS } from "@/content/dataset";

/** Collapsible schema reference shown above the editor. */
export function TableReference() {
  return (
    <details className="bg-surface border border-border rounded-lg px-4 py-2 text-sm">
      <summary className="cursor-pointer text-muted hover:text-fg">Tables and columns (as of 31 Aug 2026)</summary>
      <ul className="mt-3 space-y-2">
        {TABLE_DOCS.map((t) => (
          <li key={t.table}>
            <span className="font-mono font-semibold">{t.table}</span>
            <span className="text-muted"> · {t.description}</span>
            <p className="font-mono text-xs text-muted mt-0.5 break-words">{t.columns.join(", ")}</p>
          </li>
        ))}
      </ul>
    </details>
  );
}
