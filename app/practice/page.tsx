"use client";

import Link from "next/link";
import { units } from "@/content/lessons";
import { sqlExercisesForChapter } from "@/content/exercises-sql";
import { pythonExercisesForChapter } from "@/content/exercises-python";
import { useProgress, type ExerciseStatus } from "@/lib/progress-store";
import { PageHeader } from "@/components/PageHeader";

function Dot({ status }: { status: ExerciseStatus }) {
  const cls = status === "solved" ? "bg-success" : status === "attempted" ? "bg-warn" : "bg-border";
  return <span className={`w-2 h-2 rounded-full shrink-0 ${cls}`} />;
}

export default function PracticeIndex() {
  const { data, hydrated } = useProgress();
  const statusOf = (slug: string): ExerciseStatus => (hydrated ? (data.exercises[slug]?.status ?? "not_started") : "not_started");

  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Practice"
        title="Labs"
        description={
          <>
            Real SQLite and pandas in your browser, on Meridian&apos;s data. Each solved exercise earns 20 XP. Pick an
            exercise below, or open the{" "}
            <Link href="/practice/sql" className="text-accent underline underline-offset-2">
              SQL workspace
            </Link>{" "}
            or{" "}
            <Link href="/practice/python" className="text-accent underline underline-offset-2">
              Python workspace
            </Link>{" "}
            directly.
          </>
        }
      />

      {units.map((u) => {
        const sql = sqlExercisesForChapter(u.number);
        const py = pythonExercisesForChapter(u.number);
        return (
          <section key={u.number} className="bg-surface border border-border rounded-2xl overflow-hidden">
            <div className="px-4 py-3 text-white flex items-center justify-between" style={{ background: u.color }}>
              <p className="font-semibold text-sm">
                {u.week} · {u.title}
              </p>
              <p className="text-xs opacity-90 tabular-nums">
                {hydrated ? `${[...sql, ...py].filter((e) => statusOf(e.slug) === "solved").length}/${sql.length + py.length}` : `${sql.length + py.length}`} solved
              </p>
            </div>
            <div className="grid sm:grid-cols-2">
              <ul className="p-2">
                <li className="text-[0.7rem] uppercase tracking-wide text-muted px-3 pt-1 pb-1">SQL</li>
                {sql.map((e) => (
                  <li key={e.slug}>
                    <Link href={`/practice/sql#${e.slug}`} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-surface-2 text-sm">
                      <Dot status={statusOf(e.slug)} />
                      <span className="flex-1 min-w-0 break-words">{e.title}</span>
                      <span className="text-[0.7rem] text-muted uppercase">{e.difficulty}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="p-2 sm:border-l border-border">
                <li className="text-[0.7rem] uppercase tracking-wide text-muted px-3 pt-1 pb-1">Python</li>
                {py.length === 0 && <li className="text-sm text-muted px-3 py-2">Coming in the next pass.</li>}
                {py.map((e) => (
                  <li key={e.slug}>
                    <Link href={`/practice/python#${e.slug}`} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-surface-2 text-sm">
                      <Dot status={statusOf(e.slug)} />
                      <span className="flex-1 min-w-0 break-words">{e.title}</span>
                      <span className="text-[0.7rem] text-muted uppercase">{e.difficulty}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}
    </div>
  );
}
