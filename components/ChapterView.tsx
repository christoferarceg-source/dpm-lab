"use client";

import Link from "next/link";
import { Markdown } from "./Markdown";
import { Quiz } from "./Quiz";
import { CAST, chapters, getChapter } from "@/content/story";
import { quizForChapter } from "@/content/quiz";
import { sqlExercisesForChapter } from "@/content/exercises-sql";
import { pythonExercisesForChapter } from "@/content/exercises-python";
import { getKbEntry } from "@/lib/kb";
import { chapterProgress } from "@/lib/chapter-progress";
import { useProgress, type ExerciseStatus } from "@/lib/progress-store";
import type { ChapterNumber } from "@/lib/types";

function Step({ n, title, done, children }: { n: number; title: string; done?: boolean; children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 sm:gap-x-4">
      <div className="flex flex-col items-center">
        <span
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${
            done ? "bg-success text-white" : "bg-accent-soft text-accent"
          }`}
        >
          {done ? "✓" : n}
        </span>
        <span className="flex-1 w-px bg-border my-2" />
      </div>
      <div className="pb-10 min-w-0">
        <h2 className="text-lg font-semibold mb-3 leading-8">{title}</h2>
        {children}
      </div>
    </section>
  );
}

function ExerciseRow({ href, title, status }: { href: string; title: string; status: ExerciseStatus }) {
  const cls = status === "solved" ? "bg-success" : status === "attempted" ? "bg-warn" : "bg-border";
  return (
    <li>
      <Link href={href} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-surface-2 text-sm">
        <span className={`w-2 h-2 rounded-full shrink-0 ${cls}`} />
        <span className="flex-1 min-w-0 break-words">{title}</span>
        <span className="text-xs text-muted">{status === "solved" ? "Solved" : status === "attempted" ? "In progress" : "Open"}</span>
      </Link>
    </li>
  );
}

export function ChapterView({ number }: { number: ChapterNumber }) {
  const chapter = getChapter(number)!;
  const { data, hydrated, recordQuizAnswer, resetQuiz } = useProgress();
  const p = chapterProgress(data, number);
  const quiz = quizForChapter(number);
  const sql = sqlExercisesForChapter(number);
  const py = pythonExercisesForChapter(number);
  const prev = chapters.find((c) => c.number === number - 1);
  const next = chapters.find((c) => c.number === number + 1);
  const statusOf = (slug: string): ExerciseStatus => (hydrated ? (data.exercises[slug]?.status ?? "not_started") : "not_started");

  return (
    <article className="max-w-3xl space-y-8">
      <header className="space-y-2">
        <Link href="/" className="text-sm text-muted hover:text-fg">
          ← Your six weeks
        </Link>
        <p className="text-xs uppercase tracking-wide text-accent font-semibold">{chapter.week}</p>
        <h1 className="text-3xl font-semibold tracking-tight">{chapter.title}</h1>
        <p className="text-muted">{chapter.tagline}</p>
        {hydrated && (
          <div className="flex items-center gap-3 pt-1">
            <div className="h-1.5 flex-1 rounded-full bg-border overflow-hidden">
              <div className="h-full bg-accent transition-all" style={{ width: `${Math.round(p.fraction * 100)}%` }} />
            </div>
            <span className="text-xs text-muted tabular-nums">
              {p.complete ? "Complete" : `${p.quizAnswered}/${p.quizTotal} decisions · ${p.sqlSolved}/${p.sqlTotal} SQL`}
            </span>
          </div>
        )}
      </header>

      {number === 1 && (
        <aside className="bg-surface-2/60 border border-border rounded-xl p-4 text-sm">
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

      <div>
        <Step n={1} title="The brief" done={hydrated && p.nextStep !== "brief"}>
          <div className="bg-surface border border-border rounded-xl p-5 sm:p-6">
            <Markdown>{chapter.brief}</Markdown>
          </div>
        </Step>

        <Step n={2} title="Read" done={hydrated && p.nextStep !== "brief"}>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {chapter.readings.map((slug) => {
              const e = getKbEntry(slug);
              if (!e) return null;
              return (
                <li key={slug}>
                  <Link href={`/kb/${slug}`} className="block h-full bg-surface border border-border rounded-lg p-3 hover:border-accent text-sm">
                    <p className="font-medium">{e.title}</p>
                    <p className="text-xs text-muted mt-1 line-clamp-2">{e.summary}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Step>

        <Step n={3} title="Decide" done={hydrated && p.quizAnswered === p.quizTotal}>
          <p className="text-sm text-muted mb-3">
            {quiz.length} questions: judgment calls, concept checks, and reading SQL. Every option comes with a
            rationale, so a wrong pick still teaches something.
          </p>
          {hydrated ? (
            <Quiz
              questions={quiz}
              answers={data.quiz}
              onAnswer={recordQuizAnswer}
              onReset={() => resetQuiz(quiz.map((q) => q.id))}
            />
          ) : (
            <div className="h-40 bg-surface border border-border rounded-xl animate-pulse" />
          )}
        </Step>

        <Step n={4} title="Build" done={hydrated && p.sqlSolved === p.sqlTotal}>
          <p className="text-sm text-muted mb-3">
            Compute it yourself. SQL is required to complete the chapter; the pandas twins are extra credit.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="bg-surface border border-border rounded-xl p-2 min-w-0">
              <p className="text-xs uppercase tracking-wide text-muted px-3 pt-2 pb-1">SQL · {p.sqlSolved}/{p.sqlTotal}</p>
              <ul>
                {sql.map((e) => (
                  <ExerciseRow key={e.slug} href={`/practice/sql#${e.slug}`} title={e.title} status={statusOf(e.slug)} />
                ))}
              </ul>
            </div>
            <div className="bg-surface border border-border rounded-xl p-2 min-w-0">
              <p className="text-xs uppercase tracking-wide text-muted px-3 pt-2 pb-1">
                Python · {py.length ? `${p.pySolved}/${p.pyTotal}` : "none yet"}
              </p>
              {py.length ? (
                <ul>
                  {py.map((e) => (
                    <ExerciseRow key={e.slug} href={`/practice/python#${e.slug}`} title={e.title} status={statusOf(e.slug)} />
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted px-3 pb-3">Python exercises for this chapter arrive in the next pass.</p>
              )}
            </div>
          </div>
        </Step>

        <Step n={5} title="Debrief" done={hydrated && p.complete}>
          {hydrated && p.complete ? (
            <div className="bg-success-soft/40 border border-success/20 rounded-xl p-5 sm:p-6">
              <Markdown>{chapter.debrief}</Markdown>
            </div>
          ) : (
            <div className="bg-surface-2/60 border border-dashed border-border rounded-xl p-5 text-sm text-muted">
              Finish the decision quiz and the SQL exercises to unlock the debrief: what a good week looked like, and
              what carries into the next one.
            </div>
          )}
        </Step>
      </div>

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
            Back to overview →
          </Link>
        )}
      </nav>
    </article>
  );
}
