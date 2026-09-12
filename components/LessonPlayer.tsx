"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ItemView, canCheck, correctAnswerText, initialAnswer, isCorrect, type Answer } from "./lesson-items";
import { units } from "@/content/lessons";
import { getKbEntry } from "@/lib/kb";
import { useProgress } from "@/lib/progress-store";
import { XP_LESSON, XP_PERFECT_BONUS } from "@/lib/xp";
import type { Lesson, LessonItem } from "@/lib/types";

const MAX_HEARTS = 3;

type Phase = "answer" | "feedback" | "complete" | "failed";

type State = {
  queue: number[]; // indices into lesson.items still to do (missed items are re-queued once)
  pos: number; // position in queue
  answer: Answer;
  phase: Phase;
  hearts: number;
  lastCorrect: boolean;
  firstTry: Record<number, boolean>; // item index → correct on first attempt
  requeued: Set<number>;
  missed: number[]; // item indices answered wrong at least once
};

function initState(lesson: Lesson): State {
  const queue = lesson.items.map((_, i) => i);
  return {
    queue,
    pos: 0,
    answer: initialAnswer(lesson.items[0]),
    phase: "answer",
    hearts: MAX_HEARTS,
    lastCorrect: false,
    firstTry: {},
    requeued: new Set(),
    missed: [],
  };
}

function Heart({ full }: { full: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={full ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden className={full ? "text-danger" : "text-border"}>
      <path d="M12 21s-7-4.6-9.3-8.6C.8 9.1 2.6 5 6.5 5c2.1 0 3.4 1.2 4.1 2.2h2.8C14.1 6.2 15.4 5 17.5 5c3.9 0 5.7 4.1 3.8 7.4C19 16.4 12 21 12 21z" />
    </svg>
  );
}

export function LessonPlayer({ lesson }: { lesson: Lesson }) {
  const router = useRouter();
  const { recordLessonComplete } = useProgress();
  const [s, setS] = useState<State>(() => initState(lesson));
  const unit = units.find((u) => u.number === lesson.unit)!;
  const itemIdx = s.queue[s.pos];
  const item: LessonItem | undefined = lesson.items[itemIdx];
  const scorable = lesson.items.filter((it) => it.kind !== "concept").length;
  const answeredCount = Object.keys(s.firstTry).length;
  const progress = lesson.items.length ? (s.pos + (s.phase === "feedback" ? 1 : 0)) / s.queue.length : 0;

  const accuracy = useMemo(() => {
    const vals = Object.values(s.firstTry);
    return vals.length ? vals.filter(Boolean).length / vals.length : 1;
  }, [s.firstTry]);

  const advance = (wasCorrect: boolean) => {
    setS((prev) => {
      let queue = prev.queue;
      let requeued = prev.requeued;
      if (!wasCorrect && !prev.requeued.has(itemIdx)) {
        queue = [...prev.queue, itemIdx];
        requeued = new Set(prev.requeued);
        requeued.add(itemIdx);
      }
      const nextPos = prev.pos + 1;
      if (nextPos >= queue.length) {
        return { ...prev, queue, requeued, phase: "complete" };
      }
      return { ...prev, queue, requeued, pos: nextPos, answer: initialAnswer(lesson.items[queue[nextPos]]), phase: "answer" };
    });
  };

  const check = () => {
    if (!item) return;
    if (item.kind === "concept") {
      advance(true);
      return;
    }
    const ok = isCorrect(item, s.answer);
    setS((prev) => {
      const firstTry = prev.firstTry[itemIdx] === undefined ? { ...prev.firstTry, [itemIdx]: ok } : prev.firstTry;
      const hearts = ok ? prev.hearts : prev.hearts - 1;
      const missed = ok ? prev.missed : prev.missed.includes(itemIdx) ? prev.missed : [...prev.missed, itemIdx];
      return { ...prev, phase: hearts <= 0 ? "failed" : "feedback", lastCorrect: ok, hearts, firstTry, missed };
    });
  };

  // Persist completion once.
  useEffect(() => {
    if (s.phase === "complete") recordLessonComplete(lesson.id, accuracy);
  }, [s.phase, lesson.id, accuracy, recordLessonComplete]);

  // Keyboard: Enter checks / continues. Handlers are re-bound per render on
  // purpose (they close over the current state); cheap for one listener.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      if (s.phase === "answer" && item && canCheck(item, s.answer)) check();
      else if (s.phase === "feedback") advance(s.lastCorrect);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const retry = () => setS(initState(lesson));

  // ---------- end screens ----------
  if (s.phase === "complete") {
    const perfect = accuracy >= 1;
    const xp = XP_LESSON + (perfect ? XP_PERFECT_BONUS : 0);
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-10 gap-4 animate-pop">
        <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl" style={{ background: unit.color }}>
          {perfect ? "★" : "✓"}
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">{perfect ? "Perfect lesson" : "Lesson complete"}</h1>
        <p className="text-muted">{lesson.title}</p>
        <div className="grid grid-cols-2 gap-3 w-full max-w-xs mt-2">
          <div className="rounded-xl border border-border bg-surface p-3">
            <p className="text-xs uppercase tracking-wide text-muted">XP earned</p>
            <p className="text-2xl font-semibold tabular-nums text-accent">+{xp}</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-3">
            <p className="text-xs uppercase tracking-wide text-muted">Accuracy</p>
            <p className="text-2xl font-semibold tabular-nums">{Math.round(accuracy * 100)}%</p>
          </div>
        </div>
        <button onClick={() => router.push("/")} className="mt-4 w-full max-w-xs px-5 py-3.5 rounded-xl font-semibold text-white node-shadow" style={{ background: unit.color }}>
          Continue
        </button>
      </div>
    );
  }

  if (s.phase === "failed") {
    return (
      <div className="flex-1 flex flex-col px-5 py-8 gap-4 max-w-xl mx-auto w-full animate-pop">
        <div className="text-center space-y-2">
          <div className="flex justify-center gap-1">
            {Array.from({ length: MAX_HEARTS }).map((_, i) => (
              <Heart key={i} full={false} />
            ))}
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Out of hearts</h1>
          <p className="text-muted">Review what you missed, then try again. No XP this round.</p>
        </div>
        <ul className="space-y-3">
          {s.missed.map((i) => {
            const it = lesson.items[i];
            if (it.kind === "concept") return null;
            const right = correctAnswerText(it);
            return (
              <li key={i} className="rounded-xl border border-border bg-surface p-4 text-sm space-y-1">
                <p className="text-xs uppercase tracking-wide text-muted">{it.kind === "truefalse" ? "True or false" : it.kind}</p>
                {right && (
                  <p>
                    <span className="font-semibold">Answer:</span> {right}
                  </p>
                )}
                <p className="text-muted">{it.explanation}</p>
              </li>
            );
          })}
        </ul>
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <Link href="/" className="px-4 py-3 rounded-xl border-2 border-border text-center font-semibold">
            Back
          </Link>
          <button onClick={retry} className="px-4 py-3 rounded-xl font-semibold text-white node-shadow" style={{ background: unit.color }}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!item) return null;
  const locked = s.phase === "feedback";
  const kb = item.kbSlug ? getKbEntry(item.kbSlug) : undefined;
  const right = correctAnswerText(item);
  const chosenNote =
    item.kind === "mcq" && s.answer.kind === "mcq" && s.answer.choice !== null && !s.lastCorrect ? item.optionNotes?.[s.answer.choice] : undefined;

  return (
    <div className="flex-1 flex flex-col">
      {/* top bar */}
      <div className="px-4 pt-4 pb-2 flex items-center gap-3 max-w-2xl w-full mx-auto">
        <Link href="/" aria-label="Quit lesson" className="text-muted hover:text-fg text-2xl leading-none px-1">
          ×
        </Link>
        <div className="flex-1 h-3 rounded-full bg-border overflow-hidden">
          <div className="h-full rounded-full transition-all duration-300" style={{ width: `${Math.round(progress * 100)}%`, background: unit.color }} />
        </div>
        <div className="flex gap-0.5" aria-label={`${s.hearts} hearts left`}>
          {Array.from({ length: MAX_HEARTS }).map((_, i) => (
            <Heart key={i} full={i < s.hearts} />
          ))}
        </div>
      </div>
      <p className="text-center text-[0.7rem] uppercase tracking-wide text-muted">
        {unit.week} · {lesson.title}
        {s.requeued.has(itemIdx) && s.pos >= lesson.items.length ? " · one more time" : ""}
      </p>

      {/* item */}
      <div className="flex-1 px-5 py-6 max-w-2xl w-full mx-auto">
        <ItemView item={item} answer={s.answer} setAnswer={(a) => setS((prev) => ({ ...prev, answer: a }))} locked={locked} />
      </div>

      {/* bottom: check / feedback */}
      <div className={`border-t safe-bottom pt-4 ${locked ? (s.lastCorrect ? "bg-success-soft border-success/30" : "bg-danger-soft border-danger/30") : "bg-surface border-border"}`}>
        <div className="max-w-2xl w-full mx-auto px-5 space-y-3">
          {locked && (
            <div className={`animate-slide-up ${s.lastCorrect ? "text-success" : "text-danger"}`}>
              <p className="font-semibold text-lg">{s.lastCorrect ? "Correct!" : "Not quite"}</p>
              {!s.lastCorrect && right && (
                <p className="text-sm">
                  <span className="font-semibold">Answer:</span> {right}
                </p>
              )}
              {chosenNote && <p className="text-sm mt-1">{chosenNote}</p>}
              <p className="text-sm mt-1 text-fg/80">{item.kind !== "concept" ? item.explanation : ""}</p>
              {kb && (
                <Link href={`/kb/${kb.slug}`} className="text-xs underline underline-offset-2 mt-1 inline-block">
                  Read: {kb.title}
                </Link>
              )}
            </div>
          )}
          {!locked ? (
            <button
              onClick={check}
              disabled={!canCheck(item, s.answer)}
              className="w-full px-5 py-3.5 rounded-xl font-semibold text-white disabled:opacity-40 node-shadow"
              style={{ background: unit.color }}
            >
              {item.kind === "concept" ? "Continue" : "Check"}
            </button>
          ) : (
            <button
              onClick={() => advance(s.lastCorrect)}
              className={`w-full px-5 py-3.5 rounded-xl font-semibold text-white node-shadow ${s.lastCorrect ? "bg-success" : "bg-danger"}`}
            >
              Continue
            </button>
          )}
          <p className="text-center text-[0.7rem] text-muted">
            {answeredCount}/{scorable} answered · Enter to {locked ? "continue" : "check"}
          </p>
        </div>
      </div>
    </div>
  );
}
