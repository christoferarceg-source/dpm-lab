"use client";

import { useCallback } from "react";
import { PracticeWorkspace, type RunOutcome } from "@/components/PracticeWorkspace";
import { PyResultView } from "@/components/ResultTable";
import { TableReference } from "@/components/TableReference";
import { pythonExercises } from "@/content/exercises-python";
import expectedPythonJson from "@/content/expected-python.json";
import { getPyodide, gradePython, runPython, type PyLoadStage } from "@/lib/py-engine";

const expectedPython = expectedPythonJson as Record<string, unknown>;
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
    if (!(slug in expectedPython)) return { passed: false, reason: "No expected result on file for this exercise. Run npm run verify:answers." };
    return gradePython(ex, expectedPython[slug], payload);
  }, []);

  return (
    <PracticeWorkspace
      kind="python"
      title="Python Practice"
      intro={
        <p>
          Real Python + pandas in your browser, same Meridian data as the SQL practice. All seven tables are pre-loaded
          as DataFrames. Assign your answer to <code className="font-mono">result</code>; use{" "}
          <code className="font-mono">print()</code> to explore (output appears under “stdout”). The first run
          downloads the runtime; later runs are instant. The Python ladder currently mirrors chapters 1–2; more comes
          after the SQL ladder settles.
        </p>
      }
      reference={<TableReference />}
      exercises={pythonExercises.map((e) => ({
        slug: e.slug,
        chapter: e.chapter,
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
