"use client";

import { useCallback, useRef } from "react";
import type { Database } from "sql.js";
import { PracticeWorkspace, type RunOutcome } from "@/components/PracticeWorkspace";
import { ResultTable } from "@/components/ResultTable";
import { TableReference } from "@/components/TableReference";
import { sqlExercises } from "@/content/exercises-sql";
import expectedSqlJson from "@/content/expected-sql.json";
import { createSeededDb, gradeSql, runQuery, type QueryResult } from "@/lib/sql-engine";
import type { SqlExpected } from "@/lib/types";

const expectedSql = expectedSqlJson as Record<string, SqlExpected>;
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
    const expected = expectedSql[slug];
    if (!expected) return { passed: false, reason: "No expected result on file for this exercise. Run npm run verify:answers." };
    return gradeSql(ex, expected, payload as QueryResult);
  }, []);

  return (
    <PracticeWorkspace
      kind="sql"
      title="SQL Practice"
      intro={
        <p>
          Real SQLite in your browser, on Meridian&apos;s sales data. Exercises follow the six chapters: warm-ups first,
          then CTEs, window functions, data-quality audits, and reconciliation. Explore freely, e.g.{" "}
          <code className="font-mono">SELECT * FROM deals LIMIT 5;</code>
        </p>
      }
      reference={<TableReference />}
      exercises={sqlExercises.map((e) => ({
        slug: e.slug,
        chapter: e.chapter,
        title: e.title,
        difficulty: e.difficulty,
        prompt: e.prompt,
        starter: e.starterQuery,
        hint: e.hint,
        solution: e.solution,
        walkthrough: e.walkthrough,
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
