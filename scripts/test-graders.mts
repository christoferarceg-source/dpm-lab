// Headless end-to-end test of both graders and the pure logic. Run with:
//   npm test
//
// SQL: builds the seeded sql.js DB exactly as the browser does, runs every
// exercise's reference `solution` through gradeSql against the generated
// expected JSON, and checks that a mutated (wrong) query is rejected.
//
// Python: boots Pyodide in Node (pandas from the CDN, cached after the first
// run), runs SETUP_CODE + solution + SERIALIZE_CODE — the exact sequence the
// browser runs — through gradePython, and checks the starter code (result
// = None) is rejected.
//
// Also covers compare.ts, srs.ts, chapter-progress.ts, and content
// integrity (every quiz/exercise points at a real KB slug, quiz answers are
// in range, expected JSON is in sync with content).

import initSqlJs from "sql.js";
import { loadPyodide } from "pyodide";
import { generateDataset, SCHEMA_SQL, buildSeedSql } from "../content/dataset";
import { sqlExercises } from "../content/exercises-sql";
import { pythonExercises } from "../content/exercises-python";
import { quizQuestions } from "../content/quiz";
import { chapters } from "../content/story";
import { flashcards } from "../content/flashcards";
import { kbEntries } from "../content/kb";
import expectedSql from "../content/expected-sql.json" with { type: "json" };
import expectedPython from "../content/expected-python.json" with { type: "json" };
import { gradeSql } from "../lib/sql-engine";
import { gradePython, SETUP_CODE, SERIALIZE_CODE } from "../lib/py-engine";
import { review, initialSrs } from "../lib/srs";
import { deepEqual } from "../lib/compare";
import { emptyProgress, applyQuizAnswer, applyAttempt } from "../lib/progress-store";
import { chapterProgress, currentChapter } from "../lib/chapter-progress";
import type { SqlExpected } from "../lib/types";

let failures = 0;
function check(name: string, ok: boolean, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  — " + detail : ""}`);
  if (!ok) failures++;
}

const sqlExp = expectedSql as Record<string, SqlExpected>;
const pyExp = expectedPython as Record<string, unknown>;
const kbSlugs = new Set(kbEntries.map((e) => e.slug));

// ---------- content integrity ----------
console.log("\n== content integrity ==");
for (const ex of sqlExercises) {
  check(`${ex.slug}: expected result on file`, ex.slug in sqlExp);
  check(`${ex.slug}: kbSlug exists`, kbSlugs.has(ex.dpmConnection.kbSlug), ex.dpmConnection.kbSlug);
}
for (const ex of pythonExercises) {
  check(`${ex.slug}: expected result on file`, ex.slug in pyExp);
  check(`${ex.slug}: kbSlug exists`, kbSlugs.has(ex.dpmConnection.kbSlug), ex.dpmConnection.kbSlug);
}
check("no stale SQL expected entries", Object.keys(sqlExp).every((k) => sqlExercises.some((e) => e.slug === k)));
check("no stale Python expected entries", Object.keys(pyExp).every((k) => pythonExercises.some((e) => e.slug === k)));
for (const q of quizQuestions) {
  check(`${q.id}: 4 options, valid correctIndex, kbSlug exists`, q.options.length === 4 && q.correctIndex >= 0 && q.correctIndex < 4 && kbSlugs.has(q.kbSlug));
}
for (const c of chapters) {
  check(`chapter ${c.number}: readings exist`, c.readings.every((r) => kbSlugs.has(r)), c.readings.filter((r) => !kbSlugs.has(r)).join(","));
  check(`chapter ${c.number}: has quiz and SQL`, quizQuestions.some((q) => q.chapter === c.number) && sqlExercises.some((e) => e.chapter === c.number));
}
check("flashcards point at real KB entries", flashcards.every((f) => kbSlugs.has(f.kbSlug)));
check("unique slugs/ids", new Set([...sqlExercises.map((e) => e.slug), ...pythonExercises.map((e) => e.slug), ...quizQuestions.map((q) => q.id), ...flashcards.map((f) => f.id)]).size === sqlExercises.length + pythonExercises.length + quizQuestions.length + flashcards.length);

// ---------- SQL ----------
console.log("\n== SQL grader ==");
const ds = generateDataset();
const SQL = await initSqlJs();
const db = new SQL.Database();
db.run(SCHEMA_SQL);
db.run(buildSeedSql(ds));
check("dataset is deterministic", JSON.stringify(generateDataset()) === JSON.stringify(ds));

for (const ex of sqlExercises) {
  const expected = sqlExp[ex.slug];
  if (!expected) continue;
  const res = db.exec(ex.solution);
  const last = res[res.length - 1];
  const g = gradeSql(ex, expected, { columns: last.columns, rows: last.values });
  check(`${ex.slug}: solution passes`, g.passed, g.reason);

  // Grader sensitivity: a result with a row missing, and one with a single
  // cell changed, must both be rejected.
  const rows = last.values as SqlExpected["rows"];
  const missingRow = { columns: last.columns, rows: rows.slice(1) };
  const firstRow = rows[0] ?? [];
  const cellIdx = firstRow.findIndex((v) => typeof v === "number") >= 0 ? firstRow.findIndex((v) => typeof v === "number") : 0;
  const changedCell = rows.map((r, i) =>
    i === 0 ? r.map((v, j) => (j === cellIdx ? (typeof v === "number" ? v + 1 : String(v) + "x") : v)) : r
  );
  check(`${ex.slug}: missing row rejected`, !gradeSql(ex, expected, missingRow).passed);
  check(`${ex.slug}: changed cell rejected`, !gradeSql(ex, expected, { columns: last.columns, rows: changedCell }).passed);
}
{
  const r = db.exec(`SELECT SUM(amount) AS total FROM deals WHERE stage='closed_won';`)[0];
  const ex = sqlExercises.find((e) => e.slug === "sql-deals-closed-value")!;
  const g = gradeSql(ex, sqlExp[ex.slug], { columns: r.columns, rows: r.values });
  check("wrong alias rejected with column message", !g.passed && /columns/i.test(g.reason ?? ""), g.reason);
}

// ---------- compare / srs / progress ----------
console.log("\n== compare, srs, chapter progress ==");
check("deepEqual ignores order when told", deepEqual([{ a: 1 }, { a: 2 }], [{ a: 2 }, { a: 1 }], false));
check("deepEqual respects order when told", !deepEqual([{ a: 1 }, { a: 2 }], [{ a: 2 }, { a: 1 }], true));
check("deepEqual float tolerance", deepEqual(0.6875, 0.68750000001));
check("deepEqual numeric string vs number", deepEqual("84000", 84000));
{
  let s = initialSrs(new Date(2026, 8, 12));
  s = review(s, 4, new Date(2026, 8, 12));
  check("SM-2 first pass → 1 day", s.interval === 1 && s.due === "2026-09-13", JSON.stringify(s));
  s = review(s, 4, new Date(2026, 8, 13));
  check("SM-2 second pass → 6 days", s.interval === 6, JSON.stringify(s));
  s = review(s, 1, new Date(2026, 8, 19));
  check("SM-2 fail resets to 1 day", s.interval === 1 && s.repetitions === 0, JSON.stringify(s));
}
{
  let d = emptyProgress();
  check("fresh progress: current chapter is 1, next step brief", currentChapter(d) === 1 && chapterProgress(d, 1).nextStep === "brief");
  for (const q of quizQuestions.filter((q) => q.chapter === 1)) d = applyQuizAnswer(d, q.id, q.correctIndex, true);
  check("after quiz: next step is build", chapterProgress(d, 1).nextStep === "build");
  for (const e of sqlExercises.filter((e) => e.chapter === 1)) d = applyAttempt(d, e.slug, "sql", "x", true);
  const p1 = chapterProgress(d, 1);
  check("after SQL: chapter 1 complete, current chapter is 2", p1.complete && currentChapter(d) === 2, JSON.stringify(p1));
}

// ---------- Python ----------
console.log("\n== Python grader (Pyodide in Node) ==");
const py = await loadPyodide();
await py.loadPackage("pandas");
function runPy(code: string): unknown {
  const ns = py.globals.get("dict")();
  for (const [name, rows] of Object.entries(ds)) ns.set(`__${name}_json`, JSON.stringify(rows));
  py.runPython(SETUP_CODE, { globals: ns });
  py.runPython(code, { globals: ns });
  py.runPython(SERIALIZE_CODE, { globals: ns });
  const out = JSON.parse(ns.get("__serialized"));
  ns.destroy();
  return out;
}
for (const ex of pythonExercises) {
  if (!(ex.slug in pyExp)) continue;
  const g = gradePython(ex, pyExp[ex.slug], runPy(ex.solution));
  check(`${ex.slug}: solution passes`, g.passed, g.reason);
  const g2 = gradePython(ex, pyExp[ex.slug], runPy(ex.starterCode));
  check(`${ex.slug}: starter (None) rejected`, !g2.passed && /None/.test(g2.reason ?? ""));
}
{
  let threw = false;
  try {
    runPy(`result = deals["nope"]`);
  } catch {
    threw = true;
  }
  check("python KeyError propagates", threw);
}

console.log(`\n${failures === 0 ? "ALL PASS" : failures + " FAILURE(S)"}`);
process.exit(failures === 0 ? 0 : 1);
