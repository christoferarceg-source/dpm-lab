"use client";

// Local-only progress persistence (localStorage). The shape deliberately
// carries a user_id and flat, id-keyed records so it can be lifted into
// Supabase tables (exercise_progress, attempts, srs_state) later without a
// redesign — each top-level map becomes a table keyed by (user_id, id).
//
// Exposed to React through useSyncExternalStore: the server (and the
// hydration pass) see a stable empty snapshot, then the client swaps in
// what's actually in localStorage. No setState-in-effect needed.

import { useCallback, useSyncExternalStore } from "react";
import { initialSrs, isDue, review, todayIso, type Quality, type SrsState } from "./srs";
import type { ExerciseKind, Flashcard } from "./types";

const STORAGE_KEY = "dpm-lab:progress:v1";
const LOCAL_USER_ID = "local";
const MAX_ATTEMPTS_KEPT = 200;

export type ExerciseStatus = "not_started" | "attempted" | "solved";

export type ExerciseProgress = {
  kind: ExerciseKind;
  status: ExerciseStatus;
  attempts: number;
  lastAttemptAt?: string;
  solvedAt?: string;
};

export type Attempt = {
  id: string;
  slug: string;
  kind: ExerciseKind;
  code: string;
  passed: boolean;
  at: string;
};

export type LessonProgress = {
  completedAt: string;
  completions: number;
  /** 0–1, best accuracy across completions. */
  bestAccuracy: number;
  perfect: boolean;
};

export type ProgressData = {
  version: 1;
  user_id: string;
  exercises: Record<string, ExerciseProgress>;
  attempts: Attempt[];
  srs: Record<string, SrsState>;
  /** Completed micro-lessons by lesson id. */
  lessons: Record<string, LessonProgress>;
  streak: { current: number; lastActiveDate: string | null };
};

export function emptyProgress(): ProgressData {
  return {
    version: 1,
    user_id: LOCAL_USER_ID,
    exercises: {},
    attempts: [],
    srs: {},
    lessons: {},
    streak: { current: 0, lastActiveDate: null },
  };
}

// ---------- persistence ----------

export function loadProgress(): ProgressData {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    const parsed = JSON.parse(raw) as ProgressData;
    if (parsed?.version !== 1) return emptyProgress();
    return { ...emptyProgress(), ...parsed };
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(data: ProgressData): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage may be unavailable (private mode, quota). Fail silently: the
    // in-memory state still drives the UI for this session.
  }
}

// ---------- pure updates ----------

function yesterdayIso(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return todayIso(d);
}

/** Bump the daily streak if this is the first activity today. */
function touchStreak(data: ProgressData): ProgressData {
  const today = todayIso();
  const { current, lastActiveDate } = data.streak;
  if (lastActiveDate === today) return data;
  const next = lastActiveDate === yesterdayIso() ? current + 1 : 1;
  return { ...data, streak: { current: next, lastActiveDate: today } };
}

export function applyAttempt(
  data: ProgressData,
  slug: string,
  kind: ExerciseKind,
  code: string,
  passed: boolean
): ProgressData {
  const now = new Date().toISOString();
  const prev = data.exercises[slug] ?? { kind, status: "not_started", attempts: 0 };
  const status: ExerciseStatus = passed || prev.status === "solved" ? "solved" : "attempted";
  const exercises = {
    ...data.exercises,
    [slug]: {
      ...prev,
      kind,
      status,
      attempts: prev.attempts + 1,
      lastAttemptAt: now,
      solvedAt: passed && !prev.solvedAt ? now : prev.solvedAt,
    },
  };
  const attempt: Attempt = { id: `${slug}:${now}`, slug, kind, code, passed, at: now };
  const attempts = [attempt, ...data.attempts].slice(0, MAX_ATTEMPTS_KEPT);
  return touchStreak({ ...data, exercises, attempts });
}

export function applyReview(data: ProgressData, cardId: string, quality: Quality): ProgressData {
  const prev = data.srs[cardId] ?? initialSrs();
  return touchStreak({ ...data, srs: { ...data.srs, [cardId]: review(prev, quality) } });
}

export function applyLessonComplete(data: ProgressData, lessonId: string, accuracy: number): ProgressData {
  const prev = data.lessons[lessonId];
  const best = Math.max(prev?.bestAccuracy ?? 0, accuracy);
  return touchStreak({
    ...data,
    lessons: {
      ...data.lessons,
      [lessonId]: {
        completedAt: new Date().toISOString(),
        completions: (prev?.completions ?? 0) + 1,
        bestAccuracy: best,
        perfect: best >= 1,
      },
    },
  });
}

export function dueCards(data: ProgressData, cards: Flashcard[]): Flashcard[] {
  return cards.filter((c) => isDue(data.srs[c.id]));
}

// ---------- external store ----------

const SERVER_SNAPSHOT: ProgressData = emptyProgress();
let cache: ProgressData | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): ProgressData {
  if (cache === null) cache = loadProgress();
  return cache;
}

function getServerSnapshot(): ProgressData {
  return SERVER_SNAPSHOT;
}

function emit() {
  for (const l of listeners) l();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  // Keep tabs in sync: if another tab writes progress, reload ours.
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cache = loadProgress();
      emit();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function setProgress(next: ProgressData) {
  cache = next;
  saveProgress(next);
  emit();
}

/**
 * React hook over the local progress store. `hydrated` is false during SSR
 * and the hydration render, true once the real localStorage data is in.
 */
export function useProgress() {
  const data = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = data !== SERVER_SNAPSHOT;

  const update = useCallback((fn: (d: ProgressData) => ProgressData) => {
    setProgress(fn(getSnapshot()));
  }, []);

  const recordAttempt = useCallback(
    (slug: string, kind: ExerciseKind, code: string, passed: boolean) =>
      update((d) => applyAttempt(d, slug, kind, code, passed)),
    [update]
  );

  const recordReview = useCallback(
    (cardId: string, quality: Quality) => update((d) => applyReview(d, cardId, quality)),
    [update]
  );

  const recordLessonComplete = useCallback(
    (lessonId: string, accuracy: number) => update((d) => applyLessonComplete(d, lessonId, accuracy)),
    [update]
  );

  const reset = useCallback(() => update(() => emptyProgress()), [update]);

  return { data, hydrated, recordAttempt, recordReview, recordLessonComplete, reset };
}
