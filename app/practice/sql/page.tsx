"use client";

import { useCallback, useRef } from "react";
import type { Database } from "sql.js";
import { PracticeWorkspace, type RunOutcome } from "@/components/PracticeWorkspace";
import { ResultTable } from "@/components/ResultTable";
import { sqlExercises } from "@/content/exercises-sql";
import { createSeededDb, gradeSql, runQuery, type QueryResult } from "@/lib/sql-engine";

const bySlug = new Map(sqlExercises.map((e) => [e.slug, e]));

export default function SqlPracticePage() {
  const dbRef = useRef<Database | null>(null);

  const prepare = useCallback(async (onStatus: (s: string) => void) => {
    onStatus("Loading SQLite runtime…");
    dbRef.current = await createSeededDb();
  }, []);

  const run = useCallback(async (code: string): Promise<RunOutcome> => {
    if (!dbRef.current) dbRef.current = await createSeededDb();
    const res = runQuery(dbRef.current, code);
    if (!res.ok) return { ok: false, error: res.error };
    return { ok: true, payload: res.result, ms: res.ms };
  }, []);

  const grade = useCallback((slug: string, payload: unknown) => {
    const ex = bySlug.get(slug)!;
    return gradeSql(ex, payload as QueryResult);
  }, []);

  return (
    <PracticeWorkspace
      kind="sql"
      title="SQL Practice"
      intro={
        <p>
          Real SQLite, running in your browser. Tables: <code className="font-mono">accounts</code>,{" "}
          <code className="font-mono">customers</code>, <code className="font-mono">deals</code>,{" "}
          <code className="font-mono">transactions</code> — the Sales Funnel Accelerator example from the Playbook.
          Try <code className="font-mono">SELECT * FROM deals LIMIT 5;</code> to explore.
        </p>
      }
      exercises={sqlExercises.map((e) => ({
        slug: e.slug,
        title: e.title,
        difficulty: e.difficulty,
        prompt: e.prompt,
        starter: e.starterQuery,
        hint: e.hint,
        dpmConnection: e.dpmConnection,
      }))}
      prepare={prepare}
      run={run}
      grade={grade}
      renderResult={(payload) => {
        const r = payload as QueryResult;
        return <ResultTable columns={r.columns} rows={r.rows} />;
      }}
    />
  );
}
