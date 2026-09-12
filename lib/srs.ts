// SM-2 spaced repetition (the SuperMemo 2 algorithm). Pure functions, no
// storage — progress-store.ts persists the state this produces.

export type SrsState = {
  ease: number; // easiness factor, >= 1.3
  interval: number; // days until next review
  repetitions: number; // consecutive successful reviews
  due: string; // ISO date (YYYY-MM-DD)
};

/** 0–5 quality of recall. 3+ counts as a pass. */
export type Quality = 0 | 1 | 2 | 3 | 4 | 5;

export function todayIso(now: Date = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function addDays(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + days);
  return todayIso(dt);
}

export function initialSrs(now: Date = new Date()): SrsState {
  return { ease: 2.5, interval: 0, repetitions: 0, due: todayIso(now) };
}

export function review(state: SrsState, quality: Quality, now: Date = new Date()): SrsState {
  let { ease, interval, repetitions } = state;

  if (quality < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * ease);
    repetitions += 1;
  }

  ease = ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (ease < 1.3) ease = 1.3;

  return {
    ease: Math.round(ease * 100) / 100,
    interval,
    repetitions,
    due: addDays(todayIso(now), interval),
  };
}

export function isDue(state: SrsState | undefined, now: Date = new Date()): boolean {
  if (!state) return true; // never reviewed → due
  return state.due <= todayIso(now);
}
