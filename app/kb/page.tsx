"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { kbEntries } from "@/content/kb";
import { allParts, libraryEntry } from "@/lib/library";
import { useProgress } from "@/lib/progress-store";

export default function LibraryPage() {
  const { data, hydrated } = useProgress();
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();

  const matches = useMemo(() => {
    if (!needle) return null;
    return kbEntries.filter(
      (e) =>
        e.title.toLowerCase().includes(needle) ||
        e.summary.toLowerCase().includes(needle) ||
        e.tags.some((t) => t.includes(needle)) ||
        e.body.toLowerCase().includes(needle)
    );
  }, [needle]);

  const readCount = hydrated ? kbEntries.filter((e) => data.reads[e.slug]).length : 0;

  return (
    <div className="space-y-8">
      <PageHeader
        kicker="Library"
        title="The reading path"
        description={
          <>
            Everything the lessons and labs point back to, in the order it&apos;s worth reading. Four parts, about an hour
            end to end. Dip in from a lesson, or read it straight through.
          </>
        }
        aside={
          hydrated ? (
            <div className="text-right">
              <p className="text-2xl font-semibold tabular-nums">
                {readCount}
                <span className="text-muted text-base">/{kbEntries.length}</span>
              </p>
              <p className="text-xs text-muted">read</p>
            </div>
          ) : undefined
        }
      />

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search the library…"
        className="w-full px-4 py-2.5 rounded-xl border-2 border-border bg-surface text-sm focus:outline-none focus:border-accent"
      />

      {matches ? (
        <ul className="grid gap-3 sm:grid-cols-2">
          {matches.map((e) => (
            <li key={e.slug}>
              <EntryCard slug={e.slug} read={hydrated && !!data.reads[e.slug]} />
            </li>
          ))}
          {matches.length === 0 && <li className="text-sm text-muted">Nothing matches “{q}”.</li>}
        </ul>
      ) : (
        allParts.map((part) => {
          const done = hydrated ? part.entries.filter((s) => data.reads[s]).length : 0;
          return (
            <section key={part.slug} className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                <div>
                  <p className="text-[0.7rem] uppercase tracking-wide text-accent font-semibold">
                    Part {part.number} · {part.kicker}
                  </p>
                  <h2 className="text-xl font-semibold tracking-tight">{part.title}</h2>
                  <p className="text-sm text-muted mt-1.5 max-w-3xl">{part.intro}</p>
                </div>
                {hydrated && (
                  <p className="text-xs text-muted tabular-nums sm:text-right">
                    {done}/{part.entries.length} read
                  </p>
                )}
              </div>
              <ol className="grid gap-3 sm:grid-cols-2">
                {part.entries.map((slug) => (
                  <li key={slug}>
                    <EntryCard slug={slug} read={hydrated && !!data.reads[slug]} />
                  </li>
                ))}
              </ol>
            </section>
          );
        })
      )}
    </div>
  );
}

function EntryCard({ slug, read }: { slug: string; read: boolean }) {
  const ix = libraryEntry(slug);
  if (!ix) return null;
  const { entry, position, readMinutes } = ix;
  return (
    <Link
      href={`/kb/${slug}`}
      className={`flex gap-3 h-full bg-surface border rounded-2xl p-4 hover:border-accent transition-colors ${read ? "border-success/40" : "border-border"}`}
    >
      <span
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${
          read ? "bg-success text-white" : "bg-surface-2 text-muted"
        }`}
      >
        {read ? "✓" : position}
      </span>
      <span className="min-w-0">
        <span className="block font-semibold leading-snug">{entry.title}</span>
        <span className="block text-sm text-muted mt-1 line-clamp-2">{entry.summary}</span>
        <span className="block text-xs text-muted mt-2">{readMinutes} min read</span>
      </span>
    </Link>
  );
}
