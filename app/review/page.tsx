"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { flashcards } from "@/content/flashcards";
import { dueCards, useProgress } from "@/lib/progress-store";
import { getKbEntry } from "@/lib/kb";
import { PageHeader } from "@/components/PageHeader";
import { libraryEntry } from "@/lib/library";
import type { Quality } from "@/lib/srs";

const GRADES: { q: Quality; label: string; hint: string; cls: string }[] = [
  { q: 1, label: "Again", hint: "Didn't know it", cls: "bg-danger-soft text-danger border-danger/20" },
  { q: 3, label: "Hard", hint: "Got there, slowly", cls: "bg-warn-soft text-warn border-warn/20" },
  { q: 4, label: "Good", hint: "Recalled it", cls: "bg-accent-soft text-accent border-accent/20" },
  { q: 5, label: "Easy", hint: "Instant", cls: "bg-success-soft text-success border-success/20" },
];

export default function ReviewPage() {
  const { data, hydrated, recordReview } = useProgress();
  // The queue is snapshotted when you press Start, so grading a card
  // doesn't re-shuffle the deck under you.
  const [queue, setQueue] = useState<string[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(0);

  const due = useMemo(() => (hydrated ? dueCards(data, flashcards) : []), [hydrated, data]);

  const start = (ids: string[]) => {
    setQueue(ids);
    setIdx(0);
    setFlipped(false);
    setDone(0);
  };

  const card = useMemo(() => {
    if (!queue) return null;
    return flashcards.find((c) => c.id === queue[idx]) ?? null;
  }, [queue, idx]);

  if (!hydrated) {
    return <p className="text-sm text-muted">Loading your deck…</p>;
  }

  // ----- Start / finished screen -----
  if (!card) {
    const finished = queue !== null;
    const nextDue = Object.values(data.srs)
      .map((s) => s.due)
      .sort()[0];
    return (
      <div className="max-w-xl space-y-4">
        <PageHeader kicker="Review" title="Spaced recall" description="Short questions on the frameworks, scheduled by how well you knew them last time. Rate honestly; the intervals depend on it." />
        <div className="bg-surface border border-border rounded-2xl p-6">
          {finished ? (
            <p className="font-semibold">
              Done — {done} card{done === 1 ? "" : "s"} reviewed.
            </p>
          ) : due.length > 0 ? (
            <p className="font-semibold">
              {due.length} card{due.length === 1 ? "" : "s"} due today.
            </p>
          ) : (
            <p className="font-semibold">Nothing due right now.</p>
          )}
          <p className="text-sm text-muted mt-1">
            {flashcards.length} cards in the deck.
            {nextDue ? ` Next review due ${nextDue}.` : " Rate honestly — SM-2 spaces the intervals from your ratings."}
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            {due.length > 0 && !finished && (
              <button
                onClick={() => start(due.map((c) => c.id))}
                className="px-4 py-2 rounded-md font-medium bg-accent text-accent-fg hover:opacity-90"
              >
                Start review
              </button>
            )}
            <button
              onClick={() => start(flashcards.map((c) => c.id))}
              className="px-3 py-2 rounded-md border border-border hover:bg-surface-2"
            >
              Review everything
            </button>
            <Link href="/kb" className="px-3 py-2 rounded-md text-muted hover:text-fg">
              Browse the KB
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ----- Card screen -----
  const total = queue!.length;
  const kb = getKbEntry(card.kbSlug);
  const part = libraryEntry(card.kbSlug)?.part;

  return (
    <div className="max-w-xl space-y-4">
      <div className="flex items-center gap-3">
        <p className="text-[0.7rem] uppercase tracking-wide text-accent font-semibold">Review</p>
        <div className="flex-1 h-2 rounded-full bg-border overflow-hidden">
          <div className="h-full bg-accent transition-all" style={{ width: `${Math.round(((idx) / total) * 100)}%` }} />
        </div>
        <p className="text-xs text-muted tabular-nums">
          {idx + 1} / {total}
        </p>
      </div>

      <div className="bg-surface border border-border rounded-2xl p-6 min-h-[240px] flex flex-col animate-pop" key={`${card.id}-${flipped}`}>
        <p className="text-[0.7rem] uppercase tracking-wide text-muted mb-3">
          {flipped ? "Answer" : "Question"}
          {part ? ` · ${part.title}` : ""}
        </p>
        <p className="text-lg leading-relaxed flex-1">{flipped ? card.back : card.front}</p>
        {flipped && kb && (
          <p className="text-xs text-muted mt-4">
            From:{" "}
            <Link href={`/kb/${kb.slug}`} className="text-accent underline underline-offset-2">
              {kb.title}
            </Link>
          </p>
        )}
      </div>

      {!flipped ? (
        <button
          onClick={() => setFlipped(true)}
          className="w-full px-4 py-3.5 rounded-xl text-sm font-semibold bg-accent text-accent-fg hover:opacity-90 node-shadow"
        >
          Show answer
        </button>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {GRADES.map((g) => (
            <button
              key={g.q}
              onClick={() => {
                recordReview(card.id, g.q);
                setDone((d) => d + 1);
                setFlipped(false);
                setIdx((i) => i + 1);
              }}
              className={`px-3 py-2.5 rounded-xl text-sm border-2 ${g.cls} hover:opacity-90`}
            >
              <span className="font-semibold block">{g.label}</span>
              <span className="text-xs opacity-80">{g.hint}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
