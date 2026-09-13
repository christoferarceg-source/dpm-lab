"use client";

import Link from "next/link";
import { setHash, useHash } from "@/lib/use-hash";
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

  const hash = useHash();
  const nextUnit = next ? units.find((u) => u.number === next.unit) : null;
  const hashUnit = hash.startsWith("unit-") ? Number(hash.slice(5)) : NaN;
  const openNumber = units.some((u) => u.number === hashUnit) ? hashUnit : (nextUnit?.number ?? units[0].number);
  const openIndex = units.findIndex((u) => u.number === openNumber);
  const unit = units[openIndex];
  const p = progress[openIndex];
  const labs = sqlExercisesForChapter(unit.number);
  const labHref = labs.length ? `/practice/sql#${labs[0].slug}` : "/practice";
  const prevUnit = units[openIndex - 1];
  const nextUnitOnPath = units[openIndex + 1];
  const nextIndex = next && nextUnit ? nextUnit.lessons.findIndex((l) => l.id === next.id) + 1 : 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Six weeks as a Data PM</h1>
          <p className="text-sm text-muted">One-minute lessons. Real labs. Meridian&apos;s data has problems planted in it.</p>
        </div>
        {hydrated && (
          <Link href="/profile" className="shrink-0 flex items-center gap-3 bg-surface border border-border rounded-xl px-3 py-2 hover:border-accent">
            <span className="w-9 h-9 rounded-full bg-accent text-accent-fg flex items-center justify-center font-semibold tabular-nums">{lvl.level}</span>
            <span className="text-right leading-tight">
              <span className="block font-semibold tabular-nums">{xp.total} XP</span>
              <span className="block text-[0.7rem] text-muted">{levelTitle(lvl.level)}</span>
            </span>
          </Link>
        )}
      </div>

      {hydrated && next && nextUnit && (
        <Link
          href={`/lesson/${next.id}`}
          className="block bg-surface border-2 rounded-2xl p-4 sm:p-5 hover:-translate-y-0.5 transition-transform node-shadow"
          style={{ borderColor: nextUnit.color, ["--node-shadow" as string]: `${nextUnit.color}55` }}
        >
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-semibold shrink-0" style={{ background: nextUnit.color }}>
              {nextIndex}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[0.7rem] uppercase tracking-wide text-muted">Continue · {nextUnit.week}</span>
              <span className="block font-semibold truncate">{next.title}</span>
              <span className="block text-xs text-muted">About 1 minute · concept + 5 questions</span>
            </span>
            <span className="shrink-0 px-4 py-2 rounded-xl text-white font-semibold text-sm" style={{ background: nextUnit.color }}>
              Start
            </span>
          </div>
        </Link>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        {/* Table of contents */}
        <nav aria-label="Chapters" className="lg:sticky lg:top-6 self-start min-w-0">
          <p className="hidden lg:block text-[0.7rem] uppercase tracking-wide text-muted font-semibold mb-2 px-1">Contents</p>
          <ol className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible -mx-4 px-4 lg:mx-0 lg:px-0 pb-1">
            {units.map((u, i) => {
              const up = progress[i];
              const isOpen = u.number === openNumber;
              return (
                <li key={u.number} className="shrink-0 lg:shrink">
                  <button
                    onClick={() => setHash(`unit-${u.number}`)}
                    className={`w-full text-left flex items-center gap-3 rounded-xl border-2 px-3 py-2 transition-colors ${
                      isOpen ? "bg-surface" : "border-transparent hover:bg-surface"
                    }`}
                    style={{ borderColor: isOpen ? u.color : undefined }}
                  >
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0"
                      style={{ background: up.complete ? u.color : `${u.color}99` }}
                    >
                      {up.complete ? "★" : i}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.65rem] uppercase tracking-wide text-muted">{u.week}</span>
                      <span className="block text-sm font-medium truncate max-w-[10rem] lg:max-w-none">{u.title}</span>
                      {hydrated && (
                        <span className="block h-1 rounded-full bg-border overflow-hidden mt-1">
                          <span className="block h-full" style={{ width: `${Math.round(up.fraction * 100)}%`, background: u.color }} />
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Open chapter */}
        <section key={unit.number} className="bg-surface border border-border rounded-2xl overflow-hidden animate-pop min-w-0">
          <div className="p-5 sm:p-6 text-white" style={{ background: unit.color }}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[0.7rem] uppercase tracking-wide opacity-80">
                  Chapter {openIndex + 1} of {units.length} · {unit.week}
                </p>
                <h2 className="text-2xl font-semibold leading-tight mt-1">{unit.title}</h2>
                <p className="text-sm opacity-90 mt-1.5 max-w-xl">{unit.tagline}</p>
              </div>
              <div className="shrink-0">
                {getChapter(unit.number) ? (
                  <Link href={`/chapters/${unit.number}`} className="inline-block text-xs font-medium bg-white/20 hover:bg-white/30 rounded-md px-2.5 py-1.5">
                    Story
                  </Link>
                ) : (
                  <span className="inline-block text-xs font-medium bg-white/20 rounded-md px-2.5 py-1.5">{unit.number === 0 ? "Basics" : "Reference"}</span>
                )}
              </div>
            </div>
            {hydrated && (
              <div className="flex items-center gap-3 mt-4">
                <div className="h-1.5 flex-1 rounded-full bg-white/25 overflow-hidden">
                  <div className="h-full rounded-full bg-white transition-all" style={{ width: `${Math.round(p.fraction * 100)}%` }} />
                </div>
                <p className="text-xs opacity-90 tabular-nums shrink-0">
                  {p.lessonsDone}/{p.lessonsTotal} lessons{p.labTotal > 0 ? ` · Lab ${p.labDone}/${p.labTotal}` : ""}
                </p>
              </div>
            )}
          </div>

          <ol className="flex flex-col items-center gap-11 py-8 pb-12 px-4">
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
                    } ${isNext ? "ring-4 ring-offset-2 ring-offset-surface" : ""}`}
                    style={{
                      background: done || isNext ? unit.color : undefined,
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
            {p.labTotal > 0 && (
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
            )}
          </ol>

          <div className="flex items-center justify-between gap-3 border-t border-border px-4 sm:px-6 py-4 text-sm">
            {prevUnit ? (
              <button onClick={() => setHash(`unit-${prevUnit.number}`)} className="text-muted hover:text-fg text-left">
                ← <span className="hidden sm:inline">{prevUnit.week} · </span>{prevUnit.title}
              </button>
            ) : (
              <span />
            )}
            <span className="text-xs text-muted tabular-nums shrink-0">
              {openIndex + 1} / {units.length}
            </span>
            {nextUnitOnPath ? (
              <button onClick={() => setHash(`unit-${nextUnitOnPath.number}`)} className="font-semibold text-right" style={{ color: nextUnitOnPath.color }}>
                <span className="hidden sm:inline">{nextUnitOnPath.week} · </span>{nextUnitOnPath.title} →
              </button>
            ) : (
              <span className="text-muted">The end</span>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
