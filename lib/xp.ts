import type { ProgressData } from "./progress-store";

export const XP_LESSON = 10;
export const XP_PERFECT_BONUS = 5;
export const XP_LAB_EXERCISE = 20;
export const XP_PER_LEVEL = 100;

/** XP is derived from progress records, never stored, so it can't drift. */
export function computeXp(data: ProgressData): { total: number; fromLessons: number; fromLabs: number } {
  let fromLessons = 0;
  for (const l of Object.values(data.lessons)) fromLessons += XP_LESSON + (l.perfect ? XP_PERFECT_BONUS : 0);
  let fromLabs = 0;
  for (const e of Object.values(data.exercises)) if (e.status === "solved") fromLabs += XP_LAB_EXERCISE;
  return { total: fromLessons + fromLabs, fromLessons, fromLabs };
}

export function levelFor(xp: number): { level: number; intoLevel: number; toNext: number; fraction: number } {
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const intoLevel = xp % XP_PER_LEVEL;
  return { level, intoLevel, toNext: XP_PER_LEVEL - intoLevel, fraction: intoLevel / XP_PER_LEVEL };
}

export const LEVEL_TITLES = [
  "Newcomer",
  "Question asker",
  "Metric mapper",
  "Data auditor",
  "Launch lead",
  "Root-cause finder",
  "Definition owner",
  "Data Product Manager",
];

export function levelTitle(level: number): string {
  return LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)];
}
