"use client";

import Link from "next/link";
import { Markdown } from "./Markdown";
import { CAST, chapters, getChapter } from "@/content/story";
import { units } from "@/content/lessons";
import { sqlExercisesForChapter } from "@/content/exercises-sql";
import { getKbEntry } from "@/lib/kb";
import { unitProgress } from "@/lib/chapter-progress";
import { useProgress } from "@/lib/progress-store";
import type { ChapterNumber } from "@/lib/types";

/** The story behind a unit: brief, readings, lessons, labs, and the debrief once the unit's lessons are done. */
export function ChapterView({ number }: { number: ChapterNumber }) {
  const chapter = getChapter(number)!;
  const unit = units.find((u) => u.number === number)!;
  const { data, hydrated } = useProgress();
  const p = unitProgress(data, number);
  const sql = sqlExercisesForChapter(number);
  const prev = chapters.find((c) => c.number === number - 1);
  const next = chapters.find((c) => c.number === number + 1);

  return (
    <article className="max-w-2xl space-y-8">
      <header className="rounded-2xl p-5 text-white" style={{ background: unit.color }}>
        <Link href="/" className="text-xs opacity-80 hover:opacity-100">
          ← Back to the path
        </Link>
        <p className="text-[0.7rem] uppercase tracking-wide opacity-80 mt-3">{chapter.week}</p>
        <h1 className="text-2xl font-semibold tracking-tight">{chapter.title}</h1>
        <p className="opacity-90 mt-1">{chapter.tagline}</p>
        {hydrated && (
          <p className="text-xs opacity-80 mt-3 tabular-nums">
            {p.lessonsDone}/{p.lessonsTotal} lessons · {p.labDone}/{p.labTotal} lab exercises
          </p>
        )}
      </header>

      {number === 1 && (
        <aside className="bg-surface border border-border rounded-xl p-4 text-sm">
          <p className="font-semibold mb-2">Who you&apos;ll be dealing with</p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {CAST.map((c) => (
              <li key={c.name}>
                <span className="font-medium">{c.name}</span> <span className="text-muted">· {c.role}</span>
                <p className="text-muted text-xs mt-0.5">{c.agenda}</p>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-2">The brief</h2>
        <div className="bg-surface border border-border rounded-xl p-5">
          <Markdown>{chapter.brief}</Markdown>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-2">Lessons</h2>
        <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {unit.lessons.map((l, i) => {
            const done = hydrated && !!data.lessons[l.id];
            return (
              <li key={l.id}>
                <Link href={`/lesson/${l.id}`} className="flex items-center gap-3 bg-surface border border-border rounded-xl px-3 py-2.5 hover:border-accent text-sm">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0" style={{ background: done ? unit.color : "var(--border)" }}>
                    {done ? "★" : i + 1}
                  </span>
                  <span className="flex-1 min-w-0 break-words">{l.title}</span>
                  <span className="text-[0.7rem] text-muted">1 min</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-2">Read</h2>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {chapter.readings.map((slug) => {
            const e = getKbEntry(slug);
            if (!e) return null;
            return (
              <li key={slug}>
                <Link href={`/kb/${slug}`} className="block h-full bg-surface border border-border rounded-xl p-3 hover:border-accent text-sm">
                  <p className="font-medium">{e.title}</p>
                  <p className="text-xs text-muted mt-1 line-clamp-2">{e.summary}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-2">Lab</h2>
        <ul className="bg-surface border border-border rounded-xl p-2">
          {sql.map((e) => {
            const st = hydrated ? (data.exercises[e.slug]?.status ?? "not_started") : "not_started";
            return (
              <li key={e.slug}>
                <Link href={`/practice/sql#${e.slug}`} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-surface-2 text-sm">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${st === "solved" ? "bg-success" : st === "attempted" ? "bg-warn" : "bg-border"}`} />
                  <span className="flex-1 min-w-0 break-words">{e.title}</span>
                  <span className="text-[0.7rem] text-muted uppercase">{e.difficulty}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-2">Debrief</h2>
        {hydrated && p.complete ? (
          <div className="bg-success-soft/40 border border-success/20 rounded-xl p-5">
            <Markdown>{chapter.debrief}</Markdown>
          </div>
        ) : (
          <div className="bg-surface-2/60 border border-dashed border-border rounded-xl p-4 text-sm text-muted">
            Finish this unit&apos;s {unit.lessons.length} lessons to unlock the debrief: what a good week looked like, and what carries into the next one.
          </div>
        )}
      </section>

      <nav className="flex justify-between text-sm border-t border-border pt-4">
        {prev ? (
          <Link href={`/chapters/${prev.number}`} className="text-muted hover:text-fg">
            ← {prev.week}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/chapters/${next.number}`} className="text-accent hover:underline underline-offset-2">
            {next.week} →
          </Link>
        ) : (
          <Link href="/" className="text-accent hover:underline underline-offset-2">
            Back to the path →
          </Link>
        )}
      </nav>
    </article>
  );
}
