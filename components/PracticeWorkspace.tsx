"use client";

// Shared practice UI for both SQL and Python. The page supplies the
// exercise list plus `run` and `grade` functions; this component owns the
// editor, run/check loop, feedback, and progress bookkeeping.

import Link from "next/link";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { Markdown } from "./Markdown";
import { useProgress, type ExerciseStatus } from "@/lib/progress-store";
import { getKbEntry } from "@/lib/kb";
import type { Difficulty, DpmConnection, ExerciseKind } from "@/lib/types";

const CodeEditor = dynamic(() => import("./CodeEditor").then((m) => m.CodeEditor), {
  ssr: false,
  loading: () => <div className="h-[180px] rounded-lg border border-border bg-code-bg animate-pulse" />,
});

export type WorkspaceExercise = {
  slug: string;
  title: string;
  difficulty: Difficulty;
  prompt: string;
  starter: string;
  hint: string;
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
  exercises: WorkspaceExercise[];
  /** Called once before the first run; use it to warm up the runtime. */
  prepare?: (onStatus: (s: string) => void) => Promise<void>;
  run: (code: string) => Promise<RunOutcome>;
  grade: (slug: string, payload: unknown) => GradeOutcome;
  renderResult: (payload: unknown) => ReactNode;
};

const DIFF_LABEL: Record<Difficulty, string> = { intro: "Intro", core: "Core", stretch: "Stretch" };
const DIFF_CLASS: Record<Difficulty, string> = {
  intro: "bg-success-soft text-success",
  core: "bg-accent-soft text-accent",
  stretch: "bg-warn-soft text-warn",
};

function StatusDot({ status }: { status: ExerciseStatus }) {
  const cls = status === "solved" ? "bg-success" : status === "attempted" ? "bg-warn" : "bg-border";
  const label = status === "solved" ? "Solved" : status === "attempted" ? "Attempted" : "Not started";
  return <span className={`inline-block w-2 h-2 rounded-full ${cls}`} title={label} aria-label={label} />;
}

export function PracticeWorkspace(props: Props) {
  const { exercises, title, intro } = props;
  const { data, hydrated } = useProgress();
  const [activeSlug, setActiveSlug] = useState(exercises[0]?.slug);
  const active = useMemo(() => exercises.find((e) => e.slug === activeSlug) ?? exercises[0], [exercises, activeSlug]);

  // Runtime warm-up is shared across exercises, so it lives here rather
  // than in the per-exercise panel.
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

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="lg:sticky lg:top-6 self-start min-w-0">
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-muted mt-1">
          {hydrated ? `${solvedCount} / ${exercises.length} solved` : `${exercises.length} exercises`}
        </p>
        <ol className="mt-4 space-y-1">
          {exercises.map((e, i) => {
            const isActive = e.slug === active.slug;
            return (
              <li key={e.slug}>
                <button
                  onClick={() => setActiveSlug(e.slug)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-2.5 transition-colors ${
                    isActive ? "bg-accent-soft text-accent" : "hover:bg-surface-2"
                  }`}
                >
                  <StatusDot status={hydrated ? progressOf(e.slug) : "not_started"} />
                  <span className="text-muted tabular-nums w-5">{i + 1}.</span>
                  <span className="truncate min-w-0">{e.title}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </aside>

      <section className="min-w-0 space-y-5">
        <div className="text-sm text-muted">{intro}</div>
        {/* Keyed by slug so editor/outcome state resets on switch without an effect. */}
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
  const [running, setRunning] = useState(false);
  const [outcome, setOutcome] = useState<RunOutcome | null>(null);
  const [gradeResult, setGradeResult] = useState<GradeOutcome | null>(null);

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
            className="px-4 py-2 rounded-md text-sm font-medium border border-border bg-surface hover:bg-surface-2 disabled:opacity-50"
          >
            Run
          </button>
          <button
            onClick={() => onRun(true)}
            disabled={running}
            className="px-4 py-2 rounded-md text-sm font-medium bg-accent text-accent-fg hover:opacity-90 disabled:opacity-50"
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
          <button
            onClick={() => setShowHint((s) => !s)}
            className="px-3 py-2 rounded-md text-sm text-muted hover:text-fg ml-auto"
          >
            {showHint ? "Hide hint" : "Hint"}
          </button>
        </div>
        {prepStatus && <p className="text-sm text-muted">{prepStatus}</p>}
        {showHint && (
          <p className="text-sm bg-warn-soft text-warn border border-warn/20 rounded-md px-3 py-2">{exercise.hint}</p>
        )}
      </div>

      {gradeResult && (
        <div
          role="status"
          className={`rounded-lg px-4 py-3 text-sm border ${
            gradeResult.passed
              ? "bg-success-soft text-success border-success/20"
              : "bg-danger-soft text-danger border-danger/20"
          }`}
        >
          <span className="font-semibold">{gradeResult.passed ? "Correct." : "Not yet."}</span>{" "}
          {gradeResult.reason ?? (gradeResult.passed ? "Nice — this one is marked solved." : "")}
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
