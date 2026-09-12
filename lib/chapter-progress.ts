import { chapters } from "@/content/story";
import { quizForChapter } from "@/content/quiz";
import { sqlExercisesForChapter } from "@/content/exercises-sql";
import { pythonExercisesForChapter } from "@/content/exercises-python";
import type { ProgressData } from "./progress-store";
import type { ChapterNumber } from "./types";

export type ChapterStep = "brief" | "quiz" | "build" | "debrief";

export type ChapterProgress = {
  number: ChapterNumber;
  quizTotal: number;
  quizAnswered: number;
  quizCorrect: number;
  sqlTotal: number;
  sqlSolved: number;
  pyTotal: number;
  pySolved: number;
  /** 0–1, quiz answered + SQL solved (Python is optional extra credit). */
  fraction: number;
  complete: boolean;
  nextStep: ChapterStep;
};

export function chapterProgress(data: ProgressData, number: ChapterNumber): ChapterProgress {
  const quiz = quizForChapter(number);
  const sql = sqlExercisesForChapter(number);
  const py = pythonExercisesForChapter(number);
  const quizAnswered = quiz.filter((q) => data.quiz[q.id]).length;
  const quizCorrect = quiz.filter((q) => data.quiz[q.id]?.correct).length;
  const sqlSolved = sql.filter((e) => data.exercises[e.slug]?.status === "solved").length;
  const pySolved = py.filter((e) => data.exercises[e.slug]?.status === "solved").length;
  const total = quiz.length + sql.length;
  const done = quizAnswered + sqlSolved;
  const complete = total > 0 && done === total;
  const nextStep: ChapterStep =
    quizAnswered === 0 && sqlSolved === 0
      ? "brief"
      : quizAnswered < quiz.length
        ? "quiz"
        : sqlSolved < sql.length
          ? "build"
          : "debrief";
  return {
    number,
    quizTotal: quiz.length,
    quizAnswered,
    quizCorrect,
    sqlTotal: sql.length,
    sqlSolved,
    pyTotal: py.length,
    pySolved,
    fraction: total === 0 ? 0 : done / total,
    complete,
    nextStep,
  };
}

export function allChapterProgress(data: ProgressData): ChapterProgress[] {
  return chapters.map((c) => chapterProgress(data, c.number));
}

/** The chapter to continue: first incomplete one, or the last if all done. */
export function currentChapter(data: ProgressData): ChapterNumber {
  const all = allChapterProgress(data);
  const firstOpen = all.find((c) => !c.complete);
  return (firstOpen?.number ?? 6) as ChapterNumber;
}

export const STEP_LABEL: Record<ChapterStep, string> = {
  brief: "Read the brief",
  quiz: "Take the decision quiz",
  build: "Build the SQL",
  debrief: "Read the debrief",
};
