// Source of truth for every exercise's expected answer.
//
//   npm run verify:answers
//
// Runs each SQL exercise's reference `solution` against the generated
// dataset in sql.js and each Python exercise's `solution` in Pyodide
// (pandas from the CDN, cached in node_modules after first run), then
// writes content/expected-sql.json and content/expected-python.json.
// Re-run after changing the dataset generator or any solution.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import initSqlJs from "sql.js";
import { loadPyodide } from "pyodide";
import { generateDataset, SCHEMA_SQL, buildSeedSql } from "../content/dataset";
import { sqlExercises } from "../content/exercises-sql";
import { pythonExercises } from "../content/exercises-python";
import { SETUP_CODE, SERIALIZE_CODE } from "../lib/py-engine";
import type { SqlExpected } from "../lib/types";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const ds = generateDataset();

// ---------- SQL ----------
const SQL = await initSqlJs();
const db = new SQL.Database();
db.run(SCHEMA_SQL);
db.run(buildSeedSql(ds));

const sqlExpected: Record<string, SqlExpected> = {};
for (const ex of sqlExercises) {
  const res = db.exec(ex.solution);
  if (res.length === 0) throw new Error(`${ex.slug}: solution returned no result set`);
  const last = res[res.length - 1];
  sqlExpected[ex.slug] = { columns: last.columns, rows: last.values as SqlExpected["rows"] };
  console.log(`sql  ${ex.slug.padEnd(34)} ${last.columns.length} col × ${last.values.length} row${last.values.length === 1 ? "" : "s"}`);
  if (last.values.length === 0) console.warn(`  !! ${ex.slug} returns zero rows — is that intended?`);
}
fs.writeFileSync(path.join(root, "content/expected-sql.json"), JSON.stringify(sqlExpected, null, 2) + "\n");

// ---------- Python ----------
const py = await loadPyodide();
await py.loadPackage("pandas");
const pyExpected: Record<string, unknown> = {};
for (const ex of pythonExercises) {
  const ns = py.globals.get("dict")();
  for (const [name, rows] of Object.entries(ds)) ns.set(`__${name}_json`, JSON.stringify(rows));
  py.runPython(SETUP_CODE, { globals: ns });
  py.runPython(ex.solution, { globals: ns });
  py.runPython(SERIALIZE_CODE, { globals: ns });
  const value = JSON.parse(ns.get("__serialized"));
  ns.destroy();
  pyExpected[ex.slug] = value;
  const preview = JSON.stringify(value);
  console.log(`py   ${ex.slug.padEnd(34)} ${preview.length > 70 ? preview.slice(0, 67) + "..." : preview}`);
}
fs.writeFileSync(path.join(root, "content/expected-python.json"), JSON.stringify(pyExpected, null, 2) + "\n");

console.log(`\nWrote ${Object.keys(sqlExpected).length} SQL and ${Object.keys(pyExpected).length} Python expected results.`);
