"use client";

import Link from "next/link";
import { COMPANY, chapters } from "@/content/story";
import { flashcards } from "@/content/flashcards";
import { kbEntries } from "@/content/kb";
import { allChapterProgress, currentChapter, STEP_LABEL } from "@/lib/chapter-progress";
import { dueCards, useProgress } from "@/lib/progress-store";

export default function Home() {
  const { data, hydrated, reset } = useProgress();
  const progress = allChapterProgress(data);
  const current = currentChapter(data);
  const cur = progress[current - 1];
  const chapter = chapters[current - 1];
  const due = hydrated ? dueCards(data, flashcards).length : 0;
  const totalDone = progress.filter((p) => p.complete).length;
  const started = hydrated && progress.some((p) => p.fraction > 0);

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <p className="text-xs uppercase tracking-wide text-accent font-semibold">DPM Lab</p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight max-w-2xl">
          Your first six weeks as {COMPANY.name}&apos;s first Data Product Manager.
        </h1>
        <p className="text-muted max-w-2xl">
          {COMPANY.blurb} Each week you get a situation, the framework it needs, decisions to make, and the SQL to
          prove your answer. The data has real problems planted in it. Find them.
        </p>
      </section>

      <section className="bg-surface border border-border rounded-2xl p-5 sm:p-6 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wide text-muted">{started ? "Continue" : "Start here"}</p>
          <p className="text-lg font-semibold mt-1">
            {chapter.week} · {chapter.title}
          </p>
          <p className="text-sm text-muted mt-1">
            {hydrated
              ? cur.complete
                ? "All six chapters complete. Revisit any chapter, or retake a quiz."
                : `Next: ${STEP_LABEL[cur.nextStep].toLowerCase()}.`
              : chapter.tagline}
          </p>
        </div>
        <Link
          href={`/chapters/${current}`}
          className="inline-flex justify-center px-5 py-2.5 rounded-md bg-accent text-accent-fg font-medium hover:opacity-90 whitespace-nowrap"
        >
          {started ? "Continue chapter" : "Begin week 1"}
        </Link>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">The six weeks</h2>
          {hydrated && (
            <span className="text-xs text-muted tabular-nums">
              {totalDone} / {chapters.length} complete
            </span>
          )}
        </div>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((c, i) => {
            const p = progress[i];
            const isCurrent = c.number === current && !p.complete;
            return (
              <li key={c.number}>
                <Link
                  href={`/chapters/${c.number}`}
                  className={`block h-full bg-surface border rounded-xl p-4 hover:border-accent transition-colors ${
                    isCurrent ? "border-accent" : "border-border"
                  }`}
                >
                  <p className="text-xs uppercase tracking-wide text-muted">{c.week}</p>
                  <p className="font-semibold mt-1">{c.title}</p>
                  <p className="text-sm text-muted mt-1 line-clamp-2">{c.tagline}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-border overflow-hidden">
                      <div
                        className={`h-full ${p.complete ? "bg-success" : "bg-accent"}`}
                        style={{ width: `${hydrated ? Math.round(p.fraction * 100) : 0}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted tabular-nums">
                      {hydrated ? (p.complete ? "Done" : `${p.quizTotal} Q · ${p.sqlTotal} SQL`) : `${p.quizTotal} Q · ${p.sqlTotal} SQL`}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Link href="/review" className="bg-surface border border-border rounded-xl p-4 hover:border-accent transition-colors">
          <p className="text-xs uppercase tracking-wide text-muted">Review</p>
          <p className="font-semibold mt-1">{hydrated ? (due > 0 ? `${due} card${due === 1 ? "" : "s"} due` : "Deck is clear") : `${flashcards.length} cards`}</p>
          <p className="text-sm text-muted mt-1">Spaced recall of the frameworks, scheduled by how well you knew them.</p>
        </Link>
        <Link href="/kb" className="bg-surface border border-border rounded-xl p-4 hover:border-accent transition-colors">
          <p className="text-xs uppercase tracking-wide text-muted">Knowledge base</p>
          <p className="font-semibold mt-1">{kbEntries.length} entries</p>
          <p className="text-sm text-muted mt-1">The frameworks behind every chapter, with links to the exercises that use them.</p>
        </Link>
        <Link href="/practice" className="bg-surface border border-border rounded-xl p-4 hover:border-accent transition-colors">
          <p className="text-xs uppercase tracking-wide text-muted">Practice</p>
          <p className="font-semibold mt-1">SQL and Python</p>
          <p className="text-sm text-muted mt-1">The full exercise ladder, if you&apos;d rather skip the story and just drill.</p>
        </Link>
      </section>

      {hydrated && (data.attempts.length > 0 || Object.keys(data.quiz).length > 0 || Object.keys(data.srs).length > 0) && (
        <section className="text-xs text-muted flex items-center gap-3">
          <span>Progress is stored in this browser only.</span>
          <button
            onClick={() => {
              if (window.confirm("Reset all local progress? This cannot be undone.")) reset();
            }}
            className="underline underline-offset-2 hover:text-fg"
          >
            Reset progress
          </button>
        </section>
      )}
    </div>
  );
}
