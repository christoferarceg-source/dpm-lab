"use client";

// Shared practice UI for SQL and Python. The page supplies exercises plus
// `run` and `grade`; this component owns the chapter-grouped sidebar,
// editor, run/check loop, feedback, and progress bookkeeping. The active
// exercise is the URL hash (#slug) so chapter pages can deep-link.

import Link from "next/link";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { Markdown } from "./Markdown";
import { useProgress, type ExerciseStatus } from "@/lib/progress-store";
import { getKbEntry } from "@/lib/kb";
import { setHash, useHash } from "@/lib/use-hash";
import { units } from "@/content/lessons";
import type { Difficulty, DpmConnection, ExerciseKind, UnitNumber } from "@/lib/types";

const CodeEditor = dynamic(() => import("./CodeEditor").then((m) => m.CodeEditor), {
  ssr: false,
  loading: () => <div className="h-[180px] rounded-lg border border-border bg-code-bg animate-pulse" />,
});

export type WorkspaceExercise = {
  slug: string;
  chapter: UnitNumber;
  title: string;
  difficulty: Difficulty;
  prompt: string;
  starter: string;
  hint: string;
  solution: string;
  walkthrough: string;
  dpmConnection: DpmConnection;
};

export type RunOutcome =
  | { ok: true; payload: unknown; ms: number; stdout?: string }
  | { ok: false; error: string; stdout?: string };

export type GradeOutcome = { passed: boolean; reason?: string };

type Props = {
  kind: ExerciseKind;
  title: string;
  intro: ReactNode;
  /** Rendered under the intro, e.g. a table reference. */
  reference?: ReactNode;
  exercises: WorkspaceExercise[];
  prepare?: (onStatus: (s: string) => void) => Promise<void>;
  run: (code: string) => Promise<RunOutcome>;
  grade: (slug: string, payload: unknown) => GradeOutcome;
  renderResult: (payload: unknown) => ReactNode;
};

const DIFF_LABEL: Record<Difficulty, string> = { warmup: "Warm-up", core: "Core", advanced: "Advanced" };
const DIFF_CLASS: Record<Difficulty, string> = {
  warmup: "bg-success-soft text-success",
  core: "bg-accent-soft text-accent",
  advanced: "bg-warn-soft text-warn",
};

/** Light formatter so single-line reference SQL reads as a query; Python is shown as written. */
function formatSolution(code: string, kind: ExerciseKind): string {
  if (kind !== "sql" || code.includes("\n")) return code;
  return code
    .replace(/\s+(FROM|WHERE|GROUP BY|HAVING|ORDER BY|LIMIT|LEFT JOIN|JOIN|UNION)\s+/g, "\n$1 ")
    .replace(/\)\s+SELECT\s+/g, ")\nSELECT ")
    .replace(/,\s+(\w+) AS \(/g, ",\n$1 AS (")
    .replace(/^WITH\s+/, "WITH ")
    .trim();
}

function StatusDot({ status }: { status: ExerciseStatus }) {
  const cls = status === "solved" ? "bg-success" : status === "attempted" ? "bg-warn" : "bg-border";
  const label = status === "solved" ? "Solved" : status === "attempted" ? "Attempted" : "Not started";
  return <span className={`inline-block w-2 h-2 rounded-full shrink-0 ${cls}`} title={label} aria-label={label} />;
}

export function PracticeWorkspace(props: Props) {
  const { exercises, title, intro, reference } = props;
  const { data, hydrated } = useProgress();
  const hash = useHash();
  const active = useMemo(() => exercises.find((e) => e.slug === hash) ?? exercises[0], [exercises, hash]);

  const preparedRef = useRef(!props.prepare);
  const [prepStatus, setPrepStatus] = useState<string | null>(null);
  const ensurePrepared = useCallback(async () => {
    if (preparedRef.current || !props.prepare) return;
    await props.prepare((s) => setPrepStatus(s));
    preparedRef.current = true;
    setPrepStatus(null);
  }, [props]);

  const progressOf = (slug: string): ExerciseStatus => data.exercises[slug]?.status ?? "not_started";
  const solvedCount = exercises.filter((e) => progressOf(e.slug) === "solved").length;
  const grouped = units
    .map((u) => ({ chapter: u, items: exercises.filter((e) => e.chapter === u.number) }))
    .filter((g) => g.items.length > 0);
  const numberOf = new Map(exercises.map((e, i) => [e.slug, i + 1]));

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="lg:sticky lg:top-6 self-start min-w-0 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto">
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-muted mt-1">
          {hydrated ? `${solvedCount} / ${exercises.length} solved` : `${exercises.length} exercises`}
        </p>
        <div className="mt-4 space-y-4">
          {grouped.map(({ chapter, items }) => (
            <div key={chapter.number}>
              <Link
                href={`/chapters/${chapter.number}`}
                className="block text-[0.7rem] uppercase tracking-wide text-muted hover:text-fg px-3 mb-1"
              >
                {chapter.week}
              </Link>
              <ol className="space-y-0.5">
                {items.map((e) => {
                  const isActive = e.slug === active.slug;
                  const n = numberOf.get(e.slug);
                  return (
                    <li key={e.slug}>
                      <button
                        onClick={() => setHash(e.slug)}
                        className={`w-full text-left px-3 py-1.5 rounded-md text-sm flex items-center gap-2.5 transition-colors ${
                          isActive ? "bg-accent-soft text-accent" : "hover:bg-surface-2"
                        }`}
                      >
                        <StatusDot status={hydrated ? progressOf(e.slug) : "not_started"} />
                        <span className="text-muted tabular-nums w-5 shrink-0">{n}.</span>
                        <span className="truncate min-w-0">{e.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      </aside>

      <section className="min-w-0 space-y-5">
        <div className="text-sm text-muted space-y-3">
          {intro}
          {reference}
        </div>
        <ExercisePanel
          key={active.slug}
          exercise={active}
          kind={props.kind}
          ensurePrepared={ensurePrepared}
          prepStatus={prepStatus}
          run={props.run}
          grade={props.grade}
          renderResult={props.renderResult}
        />
      </section>
    </div>
  );
}

function ExercisePanel({
  exercise,
  kind,
  ensurePrepared,
  prepStatus,
  run,
  grade,
  renderResult,
}: {
  exercise: WorkspaceExercise;
  kind: ExerciseKind;
  ensurePrepared: () => Promise<void>;
  prepStatus: string | null;
  run: Props["run"];
  grade: Props["grade"];
  renderResult: Props["renderResult"];
}) {
  const { recordAttempt } = useProgress();
  const [code, setCode] = useState(exercise.starter);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [running, setRunning] = useState(false);
  const [outcome, setOutcome] = useState<RunOutcome | null>(null);
  const [gradeResult, setGradeResult] = useState<GradeOutcome | null>(null);
  const chapter = units.find((u) => u.number === exercise.chapter);

  const onRun = useCallback(
    async (check: boolean) => {
      setRunning(true);
      setGradeResult(null);
      try {
        await ensurePrepared();
        const res = await run(code);
        setOutcome(res);
        if (check) {
          if (res.ok) {
            const g = grade(exercise.slug, res.payload);
            setGradeResult(g);
            recordAttempt(exercise.slug, kind, code, g.passed);
          } else {
            setGradeResult({ passed: false, reason: "Fix the error above, then check again." });
            recordAttempt(exercise.slug, kind, code, false);
          }
        }
      } catch (e) {
        setOutcome({ ok: false, error: e instanceof Error ? e.message : String(e) });
      } finally {
        setRunning(false);
      }
    },
    [code, ensurePrepared, exercise.slug, grade, kind, recordAttempt, run]
  );

  const kbEntry = getKbEntry(exercise.dpmConnection.kbSlug);

  return (
    <>
      <div className="bg-surface border border-border rounded-xl p-5 space-y-4">
        {chapter && (
          <Link href={`/chapters/${chapter.number}`} className="text-xs text-muted hover:text-fg">
            {chapter.week} · {chapter.title}
          </Link>
        )}
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-semibold">{exercise.title}</h2>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFF_CLASS[exercise.difficulty]}`}>
            {DIFF_LABEL[exercise.difficulty]}
          </span>
        </div>
        <Markdown className="text-[0.95rem]">{exercise.prompt}</Markdown>
      </div>

      <div className="space-y-3">
        <CodeEditor value={code} onChange={setCode} language={kind} />
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onRun(false)}
            disabled={running}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold border-2 border-border bg-surface hover:border-accent disabled:opacity-50"
          >
            Run
          </button>
          <button
            onClick={() => onRun(true)}
            disabled={running}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-accent text-accent-fg hover:opacity-90 disabled:opacity-50 node-shadow"
          >
            {running ? "Running…" : "Run & Check"}
          </button>
          <button
            onClick={() => setCode(exercise.starter)}
            disabled={running}
            className="px-3 py-2 rounded-md text-sm text-muted hover:text-fg disabled:opacity-50"
          >
            Reset
          </button>
          <button onClick={() => setShowHint((s) => !s)} className="px-3 py-2 rounded-md text-sm text-muted hover:text-fg ml-auto">
            {showHint ? "Hide hint" : "Hint"}
          </button>
          <button onClick={() => setShowSolution((s) => !s)} className="px-3 py-2 rounded-md text-sm text-muted hover:text-fg">
            {showSolution ? "Hide solution" : "Show solution"}
          </button>
        </div>
        {prepStatus && <p className="text-sm text-muted">{prepStatus}</p>}
        {showHint && (
          <p className="text-sm bg-warn-soft text-warn border border-warn/20 rounded-md px-3 py-2">{exercise.hint}</p>
        )}
        {showSolution && (
          <div className="bg-surface border border-border rounded-xl p-4 space-y-3 animate-pop">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-wide text-muted">Reference solution</p>
              <button
                onClick={() => setCode(formatSolution(exercise.solution, kind))}
                disabled={running}
                className="text-xs px-2.5 py-1.5 rounded-md border border-border hover:bg-surface-2"
              >
                Use this solution
              </button>
            </div>
            <pre className="text-sm font-mono bg-code-bg border border-border rounded-lg px-3 py-2 overflow-x-auto whitespace-pre">
              {formatSolution(exercise.solution, kind)}
            </pre>
            <p className="text-xs uppercase tracking-wide text-muted">Why it works</p>
            <Markdown className="text-sm">{exercise.walkthrough}</Markdown>
          </div>
        )}
      </div>

      {gradeResult && (
        <div
          role="status"
          className={`rounded-lg px-4 py-3 text-sm border ${
            gradeResult.passed ? "bg-success-soft text-success border-success/20" : "bg-danger-soft text-danger border-danger/20"
          }`}
        >
          <span className="font-semibold">{gradeResult.passed ? "Correct." : "Not yet."}</span>{" "}
          {gradeResult.reason ?? (gradeResult.passed ? "Marked solved." : "")}
        </div>
      )}

      {outcome && (
        <div className="space-y-2">
          {outcome.ok ? (
            <>
              <p className="text-xs text-muted">Ran in {outcome.ms} ms</p>
              {renderResult(outcome.payload)}
            </>
          ) : (
            <pre className="text-sm font-mono bg-danger-soft text-danger border border-danger/20 rounded-lg px-3 py-2 overflow-x-auto whitespace-pre-wrap">
              {outcome.error}
            </pre>
          )}
          {outcome.stdout && outcome.stdout.trim() !== "" && (
            <details className="text-sm">
              <summary className="cursor-pointer text-muted">stdout</summary>
              <pre className="mt-1 font-mono bg-code-bg border border-border rounded-lg px-3 py-2 overflow-x-auto whitespace-pre-wrap">
                {outcome.stdout}
              </pre>
            </details>
          )}
        </div>
      )}

      <div className="bg-accent-soft/40 border border-accent/20 rounded-xl p-4 text-sm space-y-1.5">
        <p className="font-semibold text-accent">Why this matters for a data product</p>
        <p>{exercise.dpmConnection.text}</p>
        {kbEntry && (
          <p className="text-muted">
            Related:{" "}
            <Link href={`/kb/${kbEntry.slug}`} className="text-accent underline underline-offset-2">
              {kbEntry.title}
            </Link>
          </p>
        )}
      </div>
    </>
  );
}
