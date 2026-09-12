"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { kbEntries } from "@/content/kb";
import { CATEGORY_LABELS } from "@/lib/kb";
import type { KbCategory } from "@/lib/types";

const CATEGORIES: (KbCategory | "all")[] = ["all", "framework", "definition", "case-study", "industry-context"];

export default function KbIndex() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<KbCategory | "all">("all");

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return kbEntries.filter((e) => {
      if (cat !== "all" && e.category !== cat) return false;
      if (!needle) return true;
      return (
        e.title.toLowerCase().includes(needle) ||
        e.summary.toLowerCase().includes(needle) ||
        e.tags.some((t) => t.includes(needle)) ||
        e.body.toLowerCase().includes(needle)
      );
    });
  }, [q, cat]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Knowledge Base</h1>
        <p className="text-muted mt-1">
          {kbEntries.length} entries, seeded from your PRD, the 6-Week Playbook, State of Data Products Q2 2026, and
          the Big Book of Data Science.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search titles, tags, body…"
          className="flex-1 px-3 py-2 rounded-md border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-accent-soft"
        />
        <div className="flex gap-1 overflow-x-auto">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3 py-1.5 rounded-md text-sm whitespace-nowrap ${
                cat === c ? "bg-accent-soft text-accent font-medium" : "text-muted hover:bg-surface-2"
              }`}
            >
              {c === "all" ? "All" : CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {list.map((e) => (
          <li key={e.slug}>
            <Link
              href={`/kb/${e.slug}`}
              className="block h-full bg-surface border border-border rounded-xl p-4 hover:border-accent transition-colors"
            >
              <div className="flex items-center gap-2 text-xs text-muted">
                <span className="px-2 py-0.5 rounded-full bg-surface-2">{CATEGORY_LABELS[e.category]}</span>
              </div>
              <h2 className="font-semibold mt-2">{e.title}</h2>
              <p className="text-sm text-muted mt-1">{e.summary}</p>
              <p className="text-xs text-muted mt-3">{e.tags.map((t) => `#${t}`).join("  ")}</p>
            </Link>
          </li>
        ))}
        {list.length === 0 && <li className="text-sm text-muted">No entries match.</li>}
      </ul>
    </div>
  );
}
