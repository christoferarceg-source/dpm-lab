"use client";

import { useCallback } from "react";
import { PracticeWorkspace, type RunOutcome } from "@/components/PracticeWorkspace";
import { PyResultView } from "@/components/ResultTable";
import { pythonExercises } from "@/content/exercises-python";
import { getPyodide, gradePython, runPython, type PyLoadStage } from "@/lib/py-engine";

const bySlug = new Map(pythonExercises.map((e) => [e.slug, e]));

const STAGE_TEXT: Record<PyLoadStage, string> = {
  script: "Fetching Python runtime (first time only, ~10 MB)…",
  runtime: "Starting Python…",
  pandas: "Loading pandas…",
  ready: "Ready.",
};

export default function PythonPracticePage() {
  const prepare = useCallback(async (onStatus: (s: string) => void) => {
    await getPyodide((stage) => onStatus(STAGE_TEXT[stage]));
  }, []);

  const run = useCallback(async (code: string): Promise<RunOutcome> => {
    const res = await runPython(code);
    if (!res.ok) return { ok: false, error: res.error, stdout: res.stdout };
    return { ok: true, payload: res.result, ms: res.ms, stdout: res.stdout };
  }, []);

  const grade = useCallback((slug: string, payload: unknown) => {
    const ex = bySlug.get(slug)!;
    return gradePython(ex, payload);
  }, []);

  return (
    <PracticeWorkspace
      kind="python"
      title="Python Practice"
      intro={
        <p>
          Real Python + pandas, running in your browser. DataFrames <code className="font-mono">accounts</code>,{" "}
          <code className="font-mono">customers</code>, <code className="font-mono">deals</code>,{" "}
          <code className="font-mono">transactions</code> are pre-loaded (same data as SQL practice). Assign your
          answer to <code className="font-mono">result</code>. You can <code className="font-mono">print()</code>{" "}
          to explore — output shows under “stdout”. The first run downloads the runtime; later runs are instant.
        </p>
      }
      exercises={pythonExercises.map((e) => ({
        slug: e.slug,
        title: e.title,
        difficulty: e.difficulty,
        prompt: e.prompt,
        starter: e.starterCode,
        hint: e.hint,
        dpmConnection: e.dpmConnection,
      }))}
      prepare={prepare}
      run={run}
      grade={grade}
      renderResult={(payload) => <PyResultView value={payload} />}
    />
  );
}
