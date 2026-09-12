"use client";

// Renderers for each lesson item type. Each takes the item, the learner's
// current answer state, a setter, and whether the item is locked (after
// Check). Correctness is decided in LessonPlayer via `isCorrect`.

import { useMemo } from "react";
import { Markdown } from "./Markdown";
import { seededShuffle } from "@/lib/shuffle";
import type { ConceptItem, FillItem, LessonItem, MatchItem, McqItem, OrderItem, TrueFalseItem } from "@/lib/types";

export type Answer =
  | { kind: "mcq"; choice: number | null }
  | { kind: "truefalse"; choice: boolean | null }
  | { kind: "fill"; word: string | null }
  | { kind: "order"; sequence: number[] } // indices into the shuffled steps
  | { kind: "match"; matched: Set<number>; selectedLeft: number | null; selectedRight: number | null; mistakes: number }
  | { kind: "concept" };

export function initialAnswer(item: LessonItem): Answer {
  switch (item.kind) {
    case "mcq":
      return { kind: "mcq", choice: null };
    case "truefalse":
      return { kind: "truefalse", choice: null };
    case "fill":
      return { kind: "fill", word: null };
    case "order":
      return { kind: "order", sequence: [] };
    case "match":
      return { kind: "match", matched: new Set(), selectedLeft: null, selectedRight: null, mistakes: 0 };
    default:
      return { kind: "concept" };
  }
}

export function canCheck(item: LessonItem, a: Answer): boolean {
  switch (item.kind) {
    case "mcq":
      return a.kind === "mcq" && a.choice !== null;
    case "truefalse":
      return a.kind === "truefalse" && a.choice !== null;
    case "fill":
      return a.kind === "fill" && a.word !== null;
    case "order":
      return a.kind === "order" && a.sequence.length === item.steps.length;
    case "match":
      return a.kind === "match" && a.matched.size === item.pairs.length;
    default:
      return true;
  }
}

/** Shuffled step order for an order item (stable per item). */
export function shuffledSteps(item: OrderItem): number[] {
  return seededShuffle(
    item.steps.map((_, i) => i),
    item.id
  );
}

export function isCorrect(item: LessonItem, a: Answer): boolean {
  switch (item.kind) {
    case "mcq":
      return a.kind === "mcq" && a.choice === item.correct;
    case "truefalse":
      return a.kind === "truefalse" && a.choice === item.answer;
    case "fill":
      return a.kind === "fill" && a.word === item.answer;
    case "order": {
      if (a.kind !== "order") return false;
      const order = shuffledSteps(item);
      return a.sequence.every((shuffledIdx, pos) => order[shuffledIdx] === pos);
    }
    case "match":
      return a.kind === "match" && a.mistakes === 0;
    default:
      return true;
  }
}

/** The right answer, in words, for the feedback panel. */
export function correctAnswerText(item: LessonItem): string | null {
  switch (item.kind) {
    case "mcq":
      return item.options[item.correct];
    case "truefalse":
      return item.answer ? "True" : "False";
    case "fill":
      return item.answer;
    case "order":
      return item.steps.map((s, i) => `${i + 1}. ${s}`).join("  ");
    default:
      return null;
  }
}

const optionBase =
  "w-full text-left rounded-xl border-2 px-4 py-3 text-[0.95rem] transition-colors disabled:cursor-default";
const optionIdle = "border-border bg-surface hover:border-accent";
const optionSelected = "border-accent bg-accent-soft";
const optionRight = "border-success bg-success-soft";
const optionWrong = "border-danger bg-danger-soft";

export function ConceptCard({ item }: { item: ConceptItem }) {
  return (
    <div className="animate-pop">
      <p className="text-xs uppercase tracking-wide text-accent font-semibold mb-2">Concept</p>
      <h2 className="text-2xl font-semibold tracking-tight mb-3">{item.title}</h2>
      <Markdown className="text-[1.02rem]">{item.body}</Markdown>
    </div>
  );
}

export function McqView({ item, answer, setAnswer, locked }: { item: McqItem; answer: Answer; setAnswer: (a: Answer) => void; locked: boolean }) {
  const choice = answer.kind === "mcq" ? answer.choice : null;
  return (
    <div className="space-y-4 animate-pop">
      <Markdown className="text-[1.02rem]">{item.prompt}</Markdown>
      <ol className="space-y-2">
        {item.options.map((opt, i) => {
          let cls = optionIdle;
          if (locked) cls = i === item.correct ? optionRight : i === choice ? optionWrong : "border-border opacity-60";
          else if (choice === i) cls = optionSelected;
          return (
            <li key={i}>
              <button disabled={locked} onClick={() => setAnswer({ kind: "mcq", choice: i })} className={`${optionBase} ${cls}`}>
                <span className="font-mono text-muted mr-3">{String.fromCharCode(65 + i)}</span>
                {opt}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function TrueFalseView({ item, answer, setAnswer, locked }: { item: TrueFalseItem; answer: Answer; setAnswer: (a: Answer) => void; locked: boolean }) {
  const choice = answer.kind === "truefalse" ? answer.choice : null;
  return (
    <div className="space-y-5 animate-pop">
      <p className="text-xs uppercase tracking-wide text-muted">True or false?</p>
      <p className="text-xl font-medium leading-snug">{item.statement}</p>
      <div className="grid grid-cols-2 gap-3">
        {[true, false].map((v) => {
          let cls = optionIdle;
          if (locked) cls = v === item.answer ? optionRight : v === choice ? optionWrong : "border-border opacity-60";
          else if (choice === v) cls = optionSelected;
          return (
            <button key={String(v)} disabled={locked} onClick={() => setAnswer({ kind: "truefalse", choice: v })} className={`${optionBase} text-center font-semibold py-4 ${cls}`}>
              {v ? "True" : "False"}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function FillView({ item, answer, setAnswer, locked }: { item: FillItem; answer: Answer; setAnswer: (a: Answer) => void; locked: boolean }) {
  const word = answer.kind === "fill" ? answer.word : null;
  const bank = useMemo(() => seededShuffle(item.bank, item.id), [item]);
  const [before, after] = item.prompt.split("___");
  return (
    <div className="space-y-5 animate-pop">
      <p className="text-xs uppercase tracking-wide text-muted">Fill the blank</p>
      <p className="text-xl leading-relaxed">
        {before}
        <span
          className={`inline-block min-w-[6rem] border-b-2 px-2 mx-1 text-center font-semibold ${
            locked ? (word === item.answer ? "border-success text-success" : "border-danger text-danger") : word ? "border-accent text-accent" : "border-border"
          }`}
        >
          {word ?? " "}
        </span>
        {after}
      </p>
      <div className="flex flex-wrap gap-2">
        {bank.map((w) => {
          const picked = word === w;
          let cls = "border-border bg-surface hover:border-accent";
          if (locked) cls = w === item.answer ? optionRight : picked ? optionWrong : "border-border opacity-60";
          else if (picked) cls = "border-accent bg-accent-soft";
          return (
            <button key={w} disabled={locked} onClick={() => setAnswer({ kind: "fill", word: picked ? null : w })} className={`rounded-xl border-2 px-4 py-2.5 text-[0.95rem] font-medium transition-colors ${cls}`}>
              {w}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function OrderView({ item, answer, setAnswer, locked }: { item: OrderItem; answer: Answer; setAnswer: (a: Answer) => void; locked: boolean }) {
  const order = useMemo(() => shuffledSteps(item), [item]);
  const seq = answer.kind === "order" ? answer.sequence : [];
  const remaining = order.map((_, i) => i).filter((i) => !seq.includes(i));
  return (
    <div className="space-y-5 animate-pop">
      <p className="text-xs uppercase tracking-wide text-muted">Put in order</p>
      <p className="text-lg font-medium leading-snug">{item.prompt}</p>
      <ol className="space-y-2 min-h-[3rem]">
        {seq.map((shuffledIdx, pos) => {
          const stepIdx = order[shuffledIdx];
          const right = stepIdx === pos;
          return (
            <li key={shuffledIdx}>
              <button
                disabled={locked}
                onClick={() => setAnswer({ kind: "order", sequence: seq.filter((s) => s !== shuffledIdx) })}
                className={`${optionBase} flex gap-3 ${locked ? (right ? optionRight : optionWrong) : optionSelected}`}
              >
                <span className="font-mono text-muted">{pos + 1}.</span>
                <span>{item.steps[stepIdx]}</span>
              </button>
            </li>
          );
        })}
        {seq.length === 0 && <li className="text-sm text-muted px-1">Tap the steps below in the right order.</li>}
      </ol>
      <div className="flex flex-wrap gap-2">
        {remaining.map((shuffledIdx) => (
          <button
            key={shuffledIdx}
            disabled={locked}
            onClick={() => setAnswer({ kind: "order", sequence: [...seq, shuffledIdx] })}
            className="rounded-xl border-2 border-border bg-surface hover:border-accent px-4 py-2.5 text-[0.95rem] text-left transition-colors"
          >
            {item.steps[order[shuffledIdx]]}
          </button>
        ))}
      </div>
    </div>
  );
}

export function MatchView({ item, answer, setAnswer, locked }: { item: MatchItem; answer: Answer; setAnswer: (a: Answer) => void; locked: boolean }) {
  const a = answer.kind === "match" ? answer : { kind: "match" as const, matched: new Set<number>(), selectedLeft: null, selectedRight: null, mistakes: 0 };
  const rightOrder = useMemo(
    () =>
      seededShuffle(
        item.pairs.map((_, i) => i),
        item.id
      ),
    [item]
  );

  const pick = (side: "left" | "right", idx: number) => {
    if (locked || a.matched.has(idx) && side === "left") return;
    const next = { ...a, matched: new Set(a.matched) };
    if (side === "left") next.selectedLeft = a.selectedLeft === idx ? null : idx;
    else next.selectedRight = a.selectedRight === idx ? null : idx;
    if (next.selectedLeft !== null && next.selectedRight !== null) {
      if (next.selectedLeft === next.selectedRight) {
        next.matched.add(next.selectedLeft);
      } else {
        next.mistakes += 1;
      }
      next.selectedLeft = null;
      next.selectedRight = null;
    }
    setAnswer(next);
  };

  const cell = (idx: number, side: "left" | "right", text: string) => {
    const matched = a.matched.has(idx);
    const selected = side === "left" ? a.selectedLeft === idx : a.selectedRight === idx;
    let cls = "border-border bg-surface hover:border-accent";
    if (matched) cls = "border-success bg-success-soft opacity-80";
    else if (selected) cls = "border-accent bg-accent-soft";
    return (
      <button
        key={`${side}-${idx}`}
        disabled={locked || matched}
        onClick={() => pick(side, idx)}
        className={`w-full min-h-[3.25rem] rounded-xl border-2 px-3 py-2 text-sm text-left transition-colors ${cls}`}
      >
        {text}
      </button>
    );
  };

  return (
    <div className="space-y-4 animate-pop">
      <p className="text-xs uppercase tracking-wide text-muted">Match the pairs</p>
      <p className="text-lg font-medium leading-snug">{item.prompt}</p>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-2">{item.pairs.map((p, i) => cell(i, "left", p[0]))}</div>
        <div className="space-y-2">{rightOrder.map((i) => cell(i, "right", item.pairs[i][1]))}</div>
      </div>
      {a.mistakes > 0 && !locked && <p className="text-xs text-danger">Not that pair. {a.mistakes} miss{a.mistakes === 1 ? "" : "es"} so far.</p>}
    </div>
  );
}

export function ItemView(props: { item: LessonItem; answer: Answer; setAnswer: (a: Answer) => void; locked: boolean }) {
  const { item } = props;
  switch (item.kind) {
    case "concept":
      return <ConceptCard item={item} />;
    case "mcq":
      return <McqView {...props} item={item} />;
    case "truefalse":
      return <TrueFalseView {...props} item={item} />;
    case "fill":
      return <FillView {...props} item={item} />;
    case "order":
      return <OrderView {...props} item={item} />;
    case "match":
      return <MatchView {...props} item={item} />;
  }
}
