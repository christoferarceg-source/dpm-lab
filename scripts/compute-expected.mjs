// One-off verification script (not shipped to the browser). Loads the seed
// dataset into an in-memory sql.js database and runs each SQL exercise's
// canonical query, then does the equivalent computation in plain JS (as a
// stand-in for the pandas exercises) — so the `expectedRows`/`expectedResult`
// values pasted into content/exercises-*.ts are verified, not hand-typed.
//
// Run with: node scripts/compute-expected.mjs

import initSqlJs from "sql.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// --- load dataset.ts by transpiling on the fly is overkill; re-declare a
// tiny loader that reads the same literals via a lightweight regex-free
// approach: we just re-import via ts-node-less trick — simplest is to
// duplicate nothing and instead import the compiled data through a small
// JS mirror generated at run time using dynamic import of the .ts file is
// not supported by plain node. So: shell out to `npx tsx` if available,
// else fall back to requiring a pre-generated JSON dump.
const tsPath = path.join(__dirname, "../content/dataset.ts");
const src = fs.readFileSync(tsPath, "utf8");

// Minimal TS->JS: strip type annotations we used (only on this file's
// specific patterns) is fragile; instead evaluate the arrays directly by
// extracting the array literals textually. This file's arrays are plain
// JSON-compatible object literals, so we can safely eval them in a VM
// after stripping the leading `export const X: Type[] = ` down to `=`.
function extractArray(name) {
  const re = new RegExp(`export const ${name}[^=]*=\\s*(\\[[\\s\\S]*?\\n\\]);`);
  const m = src.match(re);
  if (!m) throw new Error(`Could not find ${name} in dataset.ts`);
  // eslint-disable-next-line no-eval
  return eval(m[1]);
}

const accounts = extractArray("accounts");
const deals = extractArray("deals");
const transactions = extractArray("transactions");

function sqlLit(v) {
  if (v === null) return "NULL";
  if (typeof v === "number") return String(v);
  return `'${String(v).replace(/'/g, "''")}'`;
}

const SQL = await initSqlJs({
  locateFile: (f) => path.join(__dirname, "../node_modules/sql.js/dist", f),
});
const db = new SQL.Database();

db.run(`
CREATE TABLE accounts (account_id TEXT, account_name TEXT, industry TEXT, region TEXT, tier TEXT);
CREATE TABLE deals (deal_id TEXT, account_id TEXT, owner TEXT, stage TEXT, amount NUMERIC, source TEXT, created_date TEXT, closed_date TEXT);
CREATE TABLE transactions (transaction_id TEXT, deal_id TEXT, amount NUMERIC, transaction_date TEXT, type TEXT);
`);

for (const a of accounts)
  db.run(
    `INSERT INTO accounts VALUES (${[a.account_id, a.account_name, a.industry, a.region, a.tier].map(sqlLit).join(",")})`
  );
for (const d of deals)
  db.run(
    `INSERT INTO deals VALUES (${[d.deal_id, d.account_id, d.owner, d.stage, d.amount, d.source, d.created_date, d.closed_date].map(sqlLit).join(",")})`
  );
for (const t of transactions)
  db.run(
    `INSERT INTO transactions VALUES (${[t.transaction_id, t.deal_id, t.amount, t.transaction_date, t.type].map(sqlLit).join(",")})`
  );

function run(label, query) {
  const res = db.exec(query);
  console.log(`\n--- ${label} ---`);
  console.log(query.trim());
  if (res.length === 0) {
    console.log("(no rows)");
    return;
  }
  console.log("columns:", JSON.stringify(res[0].columns));
  console.log("rows:", JSON.stringify(res[0].values));
}

run(
  "sql-select-closed-won",
  `SELECT deal_id, account_id, amount FROM deals WHERE stage='closed_won' ORDER BY deal_id;`
);

run(
  "sql-deals-closed-value",
  `SELECT SUM(amount) AS deals_closed_value FROM deals WHERE stage='closed_won';`
);

run("sql-revenue-generated", `SELECT SUM(amount) AS revenue_generated FROM transactions;`);

run(
  "sql-conversion-rate",
  `SELECT ROUND(1.0*SUM(CASE WHEN stage='closed_won' THEN 1 ELSE 0 END)/SUM(CASE WHEN stage IN ('closed_won','closed_lost') THEN 1 ELSE 0 END),4) AS conversion_rate FROM deals;`
);

run(
  "sql-join-accounts-deals",
  `SELECT a.account_name, SUM(d.amount) as total_won FROM accounts a JOIN deals d ON a.account_id=d.account_id WHERE d.stage='closed_won' GROUP BY a.account_name ORDER BY total_won DESC;`
);

run(
  "sql-rep-performance",
  `SELECT owner, SUM(amount) as total_won FROM deals WHERE stage='closed_won' GROUP BY owner ORDER BY total_won DESC;`
);

run(
  "sql-region-conversion",
  `SELECT a.region, ROUND(1.0*SUM(CASE WHEN d.stage='closed_won' THEN 1 ELSE 0 END)/SUM(CASE WHEN d.stage IN ('closed_won','closed_lost') THEN 1 ELSE 0 END),4) as conversion_rate FROM deals d JOIN accounts a ON a.account_id=d.account_id GROUP BY a.region ORDER BY a.region;`
);

run(
  "sql-rca-source-lost",
  `SELECT source, SUM(amount) as lost_value, COUNT(*) as lost_count FROM deals WHERE stage='closed_lost' GROUP BY source ORDER BY lost_value DESC;`
);

// --- Python-exercise equivalents, computed here in plain JS for cross-check
function sum(arr, f) {
  return arr.reduce((s, x) => s + f(x), 0);
}

const closedWon = deals.filter((d) => d.stage === "closed_won");
const closedLost = deals.filter((d) => d.stage === "closed_lost");

console.log("\n=== Python-exercise equivalents ===");
console.log("py-load-filter (count closed_won):", closedWon.length);
console.log(
  "py-deals-closed-value:",
  sum(closedWon, (d) => d.amount)
);
console.log(
  "py-revenue-generated:",
  sum(transactions, (t) => t.amount)
);
console.log(
  "py-conversion-rate:",
  Math.round((closedWon.length / (closedWon.length + closedLost.length)) * 10000) / 10000
);

const byAccount = {};
for (const d of closedWon) {
  byAccount[d.account_id] = (byAccount[d.account_id] || 0) + d.amount;
}
const accountRows = Object.entries(byAccount)
  .map(([account_id, total_won]) => ({
    account_name: accounts.find((a) => a.account_id === account_id).account_name,
    total_won,
  }))
  .sort((a, b) => b.total_won - a.total_won);
console.log("py-groupby-account:", JSON.stringify(accountRows));

const byOwner = {};
for (const d of closedWon) {
  byOwner[d.owner] = (byOwner[d.owner] || 0) + d.amount;
}
const ownerRows = Object.entries(byOwner)
  .map(([owner, total_won]) => ({ owner, total_won }))
  .sort((a, b) => b.total_won - a.total_won);
console.log("py-rep-performance (top):", JSON.stringify(ownerRows[0]));
console.log("py-rep-performance (all, for reference):", JSON.stringify(ownerRows));

const regionGroups = {};
for (const d of deals) {
  if (d.stage !== "closed_won" && d.stage !== "closed_lost") continue;
  const region = accounts.find((a) => a.account_id === d.account_id).region;
  regionGroups[region] = regionGroups[region] || { won: 0, total: 0 };
  regionGroups[region].total += 1;
  if (d.stage === "closed_won") regionGroups[region].won += 1;
}
const regionRows = Object.keys(regionGroups)
  .sort()
  .map((region) => ({
    region,
    conversion_rate: Math.round((regionGroups[region].won / regionGroups[region].total) * 10000) / 10000,
  }));
console.log("py-region-conversion:", JSON.stringify(regionRows));

const bySource = {};
for (const d of closedLost) {
  bySource[d.source] = bySource[d.source] || { lost_value: 0, lost_count: 0 };
  bySource[d.source].lost_value += d.amount;
  bySource[d.source].lost_count += 1;
}
const sourceRows = Object.entries(bySource)
  .map(([source, v]) => ({ source, lost_value: v.lost_value, lost_count: v.lost_count }))
  .sort((a, b) => b.lost_value - a.lost_value);
console.log("py-rca-source-lost:", JSON.stringify(sourceRows));
