"use client";

import Link from "next/link";
import { useState } from "react";
import { Markdown } from "./Markdown";
import { getKbEntry } from "@/lib/kb";
import type { QuizAnswer } from "@/lib/progress-store";
import type { QuizKind, QuizQuestion } from "@/lib/types";

const KIND_LABEL: Record<QuizKind, string> = {
  judgment: "Judgment call",
  concept: "Concept check",
  "sql-prediction": "Read the SQL",
};
const KIND_CLASS: Record<QuizKind, string> = {
  judgment: "bg-accent-soft text-accent",
  concept: "bg-success-soft text-success",
  "sql-prediction": "bg-warn-soft text-warn",
};

export function Quiz({
  questions,
  answers,
  onAnswer,
  onReset,
}: {
  questions: QuizQuestion[];
  answers: Record<string, QuizAnswer>;
  onAnswer: (questionId: string, chosen: number, correct: boolean) => void;
  onReset: () => void;
}) {
  const firstUnanswered = questions.findIndex((q) => !answers[q.id]);
  const [cursor, setCursor] = useState(firstUnanswered === -1 ? 0 : firstUnanswered);
  const q = questions[cursor];
  const answered = questions.filter((x) => answers[x.id]).length;
  const correct = questions.filter((x) => answers[x.id]?.correct).length;
  const allDone = answered === questions.length;
  const current = q ? answers[q.id] : undefined;
  const kb = q ? getKbEntry(q.kbSlug) : undefined;

  if (!q) return null;

  return (
    <div className="bg-surface border border-border rounded-xl p-5 sm:p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${KIND_CLASS[q.kind]}`}>{KIND_LABEL[q.kind]}</span>
          <span className="text-sm text-muted tabular-nums">
            Question {cursor + 1} of {questions.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {questions.map((x, i) => {
            const a = answers[x.id];
            const cls = a ? (a.correct ? "bg-success" : "bg-danger") : i === cursor ? "bg-accent" : "bg-border";
            return (
              <button
                key={x.id}
                onClick={() => setCursor(i)}
                aria-label={`Go to question ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full ${cls} ${i === cursor ? "ring-2 ring-accent-soft" : ""}`}
              />
            );
          })}
        </div>
      </div>

      <Markdown className="text-[0.98rem]">{q.prompt}</Markdown>

      <ol className="space-y-2">
        {q.options.map((opt, i) => {
          const chosen = current?.chosen === i;
          const isCorrect = i === q.correctIndex;
          let cls = "border-border hover:border-accent bg-surface";
          if (current) {
            if (isCorrect) cls = "border-success bg-success-soft";
            else if (chosen) cls = "border-danger bg-danger-soft";
            else cls = "border-border opacity-70";
          }
          return (
            <li key={i}>
              <button
                disabled={!!current}
                onClick={() => onAnswer(q.id, i, isCorrect)}
                className={`w-full text-left rounded-lg border px-4 py-3 text-sm transition-colors disabled:cursor-default ${cls}`}
              >
                <div className="flex gap-3">
                  <span className="font-mono text-muted shrink-0">{String.fromCharCode(65 + i)}.</span>
                  <div className="space-y-1.5">
                    <p>{opt.text}</p>
                    {current && (
                      <p className={`text-xs ${isCorrect ? "text-success" : chosen ? "text-danger" : "text-muted"}`}>
                        {isCorrect ? "Best answer. " : chosen ? "Your pick. " : ""}
                        {opt.explanation}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="flex flex-wrap items-center gap-3 text-sm">
        {current && kb && (
          <Link href={`/kb/${kb.slug}`} className="text-accent underline underline-offset-2">
            Read: {kb.title}
          </Link>
        )}
        <span className="ml-auto text-muted tabular-nums">
          {correct} / {answered} correct
        </span>
        {cursor > 0 && (
          <button onClick={() => setCursor((c) => c - 1)} className="px-3 py-1.5 rounded-md border border-border hover:bg-surface-2">
            Back
          </button>
        )}
        {current && cursor < questions.length - 1 && (
          <button
            onClick={() => setCursor((c) => c + 1)}
            className="px-3 py-1.5 rounded-md bg-accent text-accent-fg font-medium hover:opacity-90"
          >
            Next
          </button>
        )}
        {allDone && (
          <button
            onClick={() => {
              onReset();
              setCursor(0);
            }}
            className="px-3 py-1.5 rounded-md text-muted hover:text-fg"
          >
            Retake quiz
          </button>
        )}
      </div>
    </div>
  );
}
