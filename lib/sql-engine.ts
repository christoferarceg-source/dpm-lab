"use client";

// In-browser SQL via sql.js (SQLite compiled to WASM). The loader script and
// .wasm are served from /public so nothing goes through the bundler.

import type { Database, SqlJsStatic } from "sql.js";
import { SCHEMA_SQL, buildSeedSql } from "@/content/dataset";
import { loadScript } from "./load-script";
import { withBasePath } from "./base-path";
import { columnsEqual, deepEqual } from "./compare";
import type { SqlExercise } from "./types";

declare global {
  interface Window {
    initSqlJs?: (config?: { locateFile?: (file: string) => string }) => Promise<SqlJsStatic>;
  }
}

export type QueryResult = {
  columns: string[];
  rows: (string | number | null | Uint8Array)[][];
};

export type SqlRunOutcome =
  | { ok: true; result: QueryResult; ms: number }
  | { ok: false; error: string };

let sqlPromise: Promise<SqlJsStatic> | null = null;

async function getSql(): Promise<SqlJsStatic> {
  if (!sqlPromise) {
    sqlPromise = (async () => {
      await loadScript(withBasePath("/sql-wasm.js"));
      if (!window.initSqlJs) throw new Error("sql.js loader did not expose initSqlJs");
      return window.initSqlJs({ locateFile: (file) => withBasePath(`/${file}`) });
    })();
  }
  return sqlPromise;
}

/** A fresh seeded database. Cheap to build (a few dozen rows). */
export async function createSeededDb(): Promise<Database> {
  const SQL = await getSql();
  const db = new SQL.Database();
  db.run(SCHEMA_SQL);
  db.run(buildSeedSql());
  return db;
}

export function runQuery(db: Database, query: string): SqlRunOutcome {
  const t0 = performance.now();
  try {
    const res = db.exec(query);
    const ms = Math.round(performance.now() - t0);
    if (res.length === 0) return { ok: true, result: { columns: [], rows: [] }, ms };
    // For grading we only look at the last result set (matches how a
    // "final SELECT" is treated), but sql.js returns all of them.
    const last = res[res.length - 1];
    return { ok: true, result: { columns: last.columns, rows: last.values }, ms };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export type GradeResult = {
  passed: boolean;
  /** Human-readable reason when not passed. */
  reason?: string;
};

export function gradeSql(exercise: SqlExercise, result: QueryResult): GradeResult {
  if (!columnsEqual(result.columns, exercise.expectedColumns)) {
    return {
      passed: false,
      reason: `Expected columns [${exercise.expectedColumns.join(", ")}] but got [${result.columns.join(", ")}]. Check your aliases (AS ...) and column order.`,
    };
  }
  if (result.rows.length !== exercise.expectedRows.length) {
    return {
      passed: false,
      reason: `Expected ${exercise.expectedRows.length} row(s) but got ${result.rows.length}. Check your WHERE / GROUP BY.`,
    };
  }
  const ok = deepEqual(result.rows, exercise.expectedRows, exercise.orderMatters ?? false);
  if (!ok) {
    return {
      passed: false,
      reason: exercise.orderMatters
        ? "Right shape, but the values or their order don't match. Check your ORDER BY and any rounding."
        : "Right shape, but some values don't match. Compare your numbers against what the prompt asks for.",
    };
  }
  return { passed: true };
}
