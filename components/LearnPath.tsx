"use client";

import Link from "next/link";
import { units } from "@/content/lessons";
import { getChapter } from "@/content/story";
import { sqlExercisesForChapter } from "@/content/exercises-sql";
import { allUnitProgress, nextLesson } from "@/lib/chapter-progress";
import { useProgress } from "@/lib/progress-store";
import { computeXp, levelFor, levelTitle } from "@/lib/xp";

// Winding offsets for lesson nodes, Duolingo-style.
const OFFSETS = [0, 44, 64, 44, 0, -44, -64, -44];

function Check() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}
function Flask() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 3h6M10 3v6l-5.5 9a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 9V3" />
    </svg>
  );
}
function Star() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" />
    </svg>
  );
}

export function LearnPath() {
  const { data, hydrated } = useProgress();
  const progress = allUnitProgress(data);
  const next = hydrated ? nextLesson(data) : null;
  const xp = computeXp(data);
  const lvl = levelFor(xp.total);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Six weeks as a Data PM</h1>
          <p className="text-sm text-muted">One-minute lessons. Real labs. Meridian&apos;s data has problems planted in it.</p>
        </div>
        {hydrated && (
          <Link href="/profile" className="shrink-0 text-right">
            <p className="text-xs uppercase tracking-wide text-muted">Level {lvl.level}</p>
            <p className="font-semibold tabular-nums">{xp.total} XP</p>
            <p className="text-[0.7rem] text-muted">{levelTitle(lvl.level)}</p>
          </Link>
        )}
      </div>

      {units.map((unit, ui) => {
        const p = progress[ui];
        const labs = sqlExercisesForChapter(unit.number);
        const labHref = labs.length ? `/practice/sql#${labs[0].slug}` : "/practice";
        return (
          <section key={unit.number} className="space-y-4">
            <div className="rounded-2xl p-4 sm:p-5 text-white flex items-start justify-between gap-3" style={{ background: unit.color }}>
              <div className="min-w-0">
                <p className="text-[0.7rem] uppercase tracking-wide opacity-80">{unit.week}</p>
                <h2 className="text-lg font-semibold leading-tight">{unit.title}</h2>
                <p className="text-sm opacity-90 mt-0.5">{unit.tagline}</p>
              </div>
              <div className="shrink-0 text-right">
                {getChapter(unit.number) ? (
                  <Link href={`/chapters/${unit.number}`} className="inline-block text-xs font-medium bg-white/20 hover:bg-white/30 rounded-md px-2.5 py-1.5">
                    Story
                  </Link>
                ) : (
                  <span className="inline-block text-xs font-medium bg-white/20 rounded-md px-2.5 py-1.5">Basics</span>
                )}
                {hydrated && (
                  <p className="text-xs opacity-80 mt-2 tabular-nums">
                    {p.lessonsDone}/{p.lessonsTotal} lessons
                  </p>
                )}
              </div>
            </div>

            <ol className="flex flex-col items-center gap-11 py-4 pb-10">
              {unit.lessons.map((lesson, li) => {
                const done = !!data.lessons[lesson.id];
                const isNext = next?.id === lesson.id;
                const offset = OFFSETS[li % OFFSETS.length];
                return (
                  <li key={lesson.id} className="relative" style={{ transform: `translateX(${offset}px)` }}>
                    {isNext && (
                      <span
                        className="absolute left-full top-1/2 -translate-y-1/2 ml-3 text-[0.65rem] font-bold uppercase tracking-wide px-2 py-1 rounded-md text-white animate-pop whitespace-nowrap"
                        style={{ background: unit.color }}
                      >
                        Start
                      </span>
                    )}
                    <Link
                      href={`/lesson/${lesson.id}`}
                      aria-label={`${lesson.title}${done ? " (done)" : ""}`}
                      className={`node-shadow flex items-center justify-center w-16 h-16 rounded-full transition-transform ${
                        done || isNext ? "text-white" : "bg-surface-2 text-muted border border-border"
                      } ${isNext ? "ring-4 ring-offset-2 ring-offset-bg" : ""}`}
                      style={{
                        background: done || isNext ? unit.color : undefined,
                        // ring colour follows the unit
                        ["--tw-ring-color" as string]: `${unit.color}55`,
                        ["--node-shadow" as string]: done || isNext ? "rgba(0,0,0,0.25)" : "var(--border)",
                      }}
                    >
                      {done ? <Star /> : <span className="text-lg font-semibold">{li + 1}</span>}
                    </Link>
                    <p className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-36 text-center text-[0.7rem] text-muted leading-tight line-clamp-2">
                      {lesson.title}
                    </p>
                  </li>
                );
              })}
              <li className="relative" style={{ transform: `translateX(${OFFSETS[unit.lessons.length % OFFSETS.length]}px)` }}>
                <Link
                  href={labHref}
                  aria-label={`Lab: unit ${unit.number}`}
                  className={`node-shadow flex items-center justify-center w-16 h-16 rounded-2xl border-2 transition-transform ${
                    p.labDone > 0 && p.labDone === p.labTotal ? "text-white" : "bg-surface text-fg"
                  }`}
                  style={{
                    borderColor: unit.color,
                    background: p.labDone > 0 && p.labDone === p.labTotal ? unit.color : undefined,
                    ["--node-shadow" as string]: `${unit.color}66`,
                  }}
                >
                  {p.labDone > 0 && p.labDone === p.labTotal ? <Check /> : <Flask />}
                </Link>
                <p className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-36 text-center text-[0.7rem] text-muted leading-tight line-clamp-2">
                  Lab{hydrated ? ` · ${p.labDone}/${p.labTotal}` : ""}
                </p>
              </li>
            </ol>
          </section>
        );
      })}
    </div>
  );
}
