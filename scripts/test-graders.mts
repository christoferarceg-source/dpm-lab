// Headless end-to-end test of both graders, run with: npx tsx scripts/test-graders.mts
//
// SQL: builds the seeded sql.js DB exactly as the browser does (same
// SCHEMA_SQL + buildSeedSql), runs each exercise's reference solution and
// a deliberately wrong query through gradeSql.
//
// Python: boots the Pyodide npm build in Node, loads pandas from the CDN,
// then runs SETUP_CODE + a reference solution + SERIALIZE_CODE — the exact
// sequence lib/py-engine.ts runs in the browser — through gradePython.

import initSqlJs from "sql.js";
import { loadPyodide } from "pyodide";
import { SCHEMA_SQL, buildSeedSql, accounts, customers, deals, transactions } from "../content/dataset";
import { sqlExercises } from "../content/exercises-sql";
import { pythonExercises } from "../content/exercises-python";
import { gradeSql } from "../lib/sql-engine";
import { gradePython, SETUP_CODE, SERIALIZE_CODE } from "../lib/py-engine";
import { review, initialSrs } from "../lib/srs";
import { deepEqual } from "../lib/compare";

let failures = 0;
function check(name: string, ok: boolean, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  — " + detail : ""}`);
  if (!ok) failures++;
}

// ---------- reference solutions ----------
const sqlSolutions: Record<string, string> = {
  "sql-select-closed-won": `SELECT deal_id, account_id, amount FROM deals WHERE stage='closed_won' ORDER BY deal_id;`,
  "sql-deals-closed-value": `SELECT SUM(amount) AS deals_closed_value FROM deals WHERE stage='closed_won';`,
  "sql-revenue-generated": `SELECT SUM(amount) AS revenue_generated FROM transactions;`,
  "sql-conversion-rate": `SELECT ROUND(1.0*SUM(CASE WHEN stage='closed_won' THEN 1 ELSE 0 END)/SUM(CASE WHEN stage IN ('closed_won','closed_lost') THEN 1 ELSE 0 END),4) AS conversion_rate FROM deals;`,
  "sql-join-accounts-deals": `SELECT a.account_name, SUM(d.amount) as total_won FROM accounts a JOIN deals d ON a.account_id=d.account_id WHERE d.stage='closed_won' GROUP BY a.account_name ORDER BY total_won DESC;`,
  "sql-rep-performance": `SELECT owner, SUM(amount) as total_won FROM deals WHERE stage='closed_won' GROUP BY owner ORDER BY total_won DESC;`,
  "sql-region-conversion": `SELECT a.region, ROUND(1.0*SUM(CASE WHEN d.stage='closed_won' THEN 1 ELSE 0 END)/SUM(CASE WHEN d.stage IN ('closed_won','closed_lost') THEN 1 ELSE 0 END),4) as conversion_rate FROM deals d JOIN accounts a ON a.account_id=d.account_id GROUP BY a.region ORDER BY a.region;`,
  "sql-rca-source-lost": `SELECT source, SUM(amount) as lost_value, COUNT(*) as lost_count FROM deals WHERE stage='closed_lost' GROUP BY source ORDER BY lost_value DESC;`,
};

const pySolutions: Record<string, string> = {
  "py-count-closed-won": `won = deals[deals["stage"] == "closed_won"]\nresult = len(won)`,
  "py-deals-closed-value": `won = deals[deals["stage"] == "closed_won"]\nresult = won["amount"].sum()`,
  "py-revenue-generated": `result = transactions["amount"].sum()`,
  "py-conversion-rate": `won = (deals["stage"] == "closed_won").sum()\nlost = (deals["stage"] == "closed_lost").sum()\nresult = round(won / (won + lost), 4)`,
  "py-groupby-account": `won = deals[deals["stage"] == "closed_won"]
merged = won.merge(accounts, on="account_id")
grouped = (merged.groupby("account_name", as_index=False)["amount"].sum()
    .rename(columns={"amount": "total_won"}).sort_values("total_won", ascending=False))
result = grouped.to_dict("records")`,
  "py-rep-performance": `won = deals[deals["stage"] == "closed_won"]
by_owner = won.groupby("owner")["amount"].sum().sort_values(ascending=False)
result = {"owner": by_owner.index[0], "total_won": by_owner.iloc[0]}`,
  "py-region-conversion": `closed = deals[deals["stage"].isin(["closed_won", "closed_lost"])]
merged = closed.merge(accounts, on="account_id")
merged = merged.assign(is_won=(merged["stage"] == "closed_won").astype(int))
grouped = (merged.groupby("region", as_index=False)["is_won"].mean()
    .rename(columns={"is_won": "conversion_rate"}).sort_values("region"))
grouped["conversion_rate"] = grouped["conversion_rate"].round(4)
result = grouped.to_dict("records")`,
  "py-rca-source-lost": `lost = deals[deals["stage"] == "closed_lost"]
grouped = (lost.groupby("source").agg(lost_value=("amount", "sum"), lost_count=("deal_id", "count"))
    .reset_index().sort_values("lost_value", ascending=False))
result = grouped.to_dict("records")`,
};

// ---------- SQL ----------
console.log("\n== SQL grader ==");
const SQL = await initSqlJs();
const db = new SQL.Database();
db.run(SCHEMA_SQL);
db.run(buildSeedSql());

for (const ex of sqlExercises) {
  const sol = sqlSolutions[ex.slug];
  check(`${ex.slug}: has reference solution`, !!sol);
  if (!sol) continue;
  const res = db.exec(sol);
  const last = res[res.length - 1];
  const g = gradeSql(ex, { columns: last.columns, rows: last.values });
  check(`${ex.slug}: reference solution passes`, g.passed, g.reason);

  // A wrong answer must NOT pass: flip the stage filter (or, for the
  // closed_lost exercise, flip it the other way) and swap the revenue table.
  const mutated = sol.includes("closed_won")
    ? sol.replace("closed_won", "closed_lost")
    : sol.replace("closed_lost", "closed_won");
  const wrong = db.exec(mutated.replace("transactions", "deals"));
  const wl = wrong[wrong.length - 1];
  const gw = gradeSql(ex, { columns: wl.columns, rows: wl.values });
  check(`${ex.slug}: wrong answer rejected`, !gw.passed);
}
// Column alias mistake is caught.
{
  const r = db.exec(`SELECT SUM(amount) AS total FROM deals WHERE stage='closed_won';`)[0];
  const g = gradeSql(sqlExercises[1], { columns: r.columns, rows: r.values });
  check("wrong alias rejected with column message", !g.passed && /columns/i.test(g.reason ?? ""), g.reason);
}
// Order-insensitive grading: reversed rows pass when orderMatters is false.
{
  const ex = sqlExercises.find((e) => e.slug === "sql-deals-closed-value")!;
  check("scalar exercise has no orderMatters", !ex.orderMatters);
}

// ---------- compare / srs ----------
console.log("\n== compare & srs ==");
check("deepEqual ignores order when told", deepEqual([{ a: 1 }, { a: 2 }], [{ a: 2 }, { a: 1 }], false));
check("deepEqual respects order when told", !deepEqual([{ a: 1 }, { a: 2 }], [{ a: 2 }, { a: 1 }], true));
check("deepEqual float tolerance", deepEqual(0.6875, 0.68750000001));
check("deepEqual numeric string vs number", deepEqual("84000", 84000));
{
  // Local-time dates (the app uses `new Date()`), not UTC-parsed ISO strings.
  let s = initialSrs(new Date(2026, 8, 12));
  s = review(s, 4, new Date(2026, 8, 12));
  check("SM-2 first pass → 1 day", s.interval === 1 && s.due === "2026-09-13", JSON.stringify(s));
  s = review(s, 4, new Date(2026, 8, 13));
  check("SM-2 second pass → 6 days", s.interval === 6, JSON.stringify(s));
  s = review(s, 1, new Date(2026, 8, 19));
  check("SM-2 fail resets to 1 day", s.interval === 1 && s.repetitions === 0, JSON.stringify(s));
  check("SM-2 ease floor 1.3", review({ ease: 1.3, interval: 1, repetitions: 0, due: "2026-01-01" }, 0).ease === 1.3);
}

// ---------- Python ----------
console.log("\n== Python grader (Pyodide in Node; pandas from CDN) ==");
const py = await loadPyodide();
await py.loadPackage("pandas");

for (const ex of pythonExercises) {
  const sol = pySolutions[ex.slug];
  check(`${ex.slug}: has reference solution`, !!sol);
  if (!sol) continue;
  const ns = py.globals.get("dict")();
  ns.set("__accounts_json", JSON.stringify(accounts));
  ns.set("__customers_json", JSON.stringify(customers));
  ns.set("__deals_json", JSON.stringify(deals));
  ns.set("__transactions_json", JSON.stringify(transactions));
  py.runPython(SETUP_CODE, { globals: ns });
  py.runPython(sol, { globals: ns });
  py.runPython(SERIALIZE_CODE, { globals: ns });
  const result = JSON.parse(ns.get("__serialized"));
  const g = gradePython(ex, result);
  check(`${ex.slug}: reference solution passes`, g.passed, g.reason ?? JSON.stringify(result).slice(0, 80));

  // Starter code (result = None) must be rejected with a helpful message.
  const ns2 = py.globals.get("dict")();
  ns2.set("__accounts_json", JSON.stringify(accounts));
  ns2.set("__customers_json", JSON.stringify(customers));
  ns2.set("__deals_json", JSON.stringify(deals));
  ns2.set("__transactions_json", JSON.stringify(transactions));
  py.runPython(SETUP_CODE, { globals: ns2 });
  py.runPython(ex.starterCode, { globals: ns2 });
  py.runPython(SERIALIZE_CODE, { globals: ns2 });
  const g2 = gradePython(ex, JSON.parse(ns2.get("__serialized")));
  check(`${ex.slug}: starter (None) rejected`, !g2.passed && /None/.test(g2.reason ?? ""));
  ns.destroy();
  ns2.destroy();
}
// A Python error surfaces as an exception (the browser wrapper turns it into a message).
{
  let threw = false;
  try {
    py.runPython(`result = deals["nope"]`, { globals: py.globals.get("dict")() });
  } catch {
    threw = true;
  }
  check("python KeyError propagates", threw);
}

console.log(`\n${failures === 0 ? "ALL PASS" : failures + " FAILURE(S)"}`);
process.exit(failures === 0 ? 0 : 1);
