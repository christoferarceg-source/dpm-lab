import { units, allLessons } from "@/content/lessons";
import { sqlExercisesForChapter } from "@/content/exercises-sql";
import { pythonExercisesForChapter } from "@/content/exercises-python";
import type { ProgressData } from "./progress-store";
import type { ChapterNumber, Lesson } from "./types";

export type UnitProgress = {
  number: ChapterNumber;
  lessonsTotal: number;
  lessonsDone: number;
  labTotal: number;
  labDone: number;
  /** 0–1 over lessons only; labs are bonus. */
  fraction: number;
  complete: boolean;
  nextLessonId: string | null;
};

export function unitProgress(data: ProgressData, number: ChapterNumber): UnitProgress {
  const unit = units.find((u) => u.number === number)!;
  const done = unit.lessons.filter((l) => data.lessons[l.id]);
  const labs = [...sqlExercisesForChapter(number), ...pythonExercisesForChapter(number)];
  const labDone = labs.filter((e) => data.exercises[e.slug]?.status === "solved").length;
  const next = unit.lessons.find((l) => !data.lessons[l.id]);
  return {
    number,
    lessonsTotal: unit.lessons.length,
    lessonsDone: done.length,
    labTotal: labs.length,
    labDone,
    fraction: unit.lessons.length ? done.length / unit.lessons.length : 0,
    complete: unit.lessons.length > 0 && done.length === unit.lessons.length,
    nextLessonId: next?.id ?? null,
  };
}

export function allUnitProgress(data: ProgressData): UnitProgress[] {
  return units.map((u) => unitProgress(data, u.number));
}

/** First lesson not yet completed, in path order; null when everything is done. */
export function nextLesson(data: ProgressData): Lesson | null {
  return allLessons.find((l) => !data.lessons[l.id]) ?? null;
}

export function currentUnit(data: ProgressData): ChapterNumber {
  return (nextLesson(data)?.unit ?? 6) as ChapterNumber;
}

export function totals(data: ProgressData): { lessonsDone: number; lessonsTotal: number; labsDone: number; labsTotal: number } {
  const up = allUnitProgress(data);
  return {
    lessonsDone: up.reduce((s, u) => s + u.lessonsDone, 0),
    lessonsTotal: up.reduce((s, u) => s + u.lessonsTotal, 0),
    labsDone: up.reduce((s, u) => s + u.labDone, 0),
    labsTotal: up.reduce((s, u) => s + u.labTotal, 0),
  };
}
