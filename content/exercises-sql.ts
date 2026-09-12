import type { SqlExercise } from "@/lib/types";

// SQL ladder, organized by chapter of the Meridian story. Each exercise
// carries a reference `solution`; `npm run verify:answers` runs every
// solution against the generated dataset and writes the expected result to
// content/expected-sql.json, which the grader reads. Never hand-edit that
// JSON.
//
// Difficulty: warmup (single table / simple aggregate) → core (joins, CTEs,
// conditional aggregation) → advanced (window functions, multi-step CTEs,
// reconciliation).

const STAGE_ORDER_SQL = `CASE stage WHEN 'prospecting' THEN 1 WHEN 'qualified' THEN 2 WHEN 'proposal' THEN 3 WHEN 'negotiation' THEN 4 WHEN 'closed_won' THEN 5 ELSE 6 END`;

export const sqlExercises: SqlExercise[] = [
  // =================== Chapter 1 · The Bullseye (warm-ups) ===================
  {
    slug: "sql-select-closed-won",
    chapter: 1,
    title: "See the rows behind the number",
    difficulty: "warmup",
    prompt: `Before you argue about a conversion rate, look at the rows that feed it.

Return the **deal_id**, **account_id**, and **amount** of every deal whose \`stage\` is \`closed_won\`, ordered by \`deal_id\`.`,
    starterQuery: `SELECT deal_id, account_id, amount
FROM deals
WHERE -- your condition here
ORDER BY deal_id;`,
    solution: `SELECT deal_id, account_id, amount FROM deals WHERE stage = 'closed_won' ORDER BY deal_id;`,
    orderMatters: true,
    dpmConnection: {
      text: "Filtering to closed_won is the first step of the functional metric deals_closed_value. A Data PM who can point at the exact rows behind an aggregate can defend it; one who can't is trusting the dashboard.",
      kbSlug: "metric-types",
    },
    hint: "Compare the stage column to the string 'closed_won' (single quotes) in the WHERE clause.",
  },
  {
    slug: "sql-deals-closed-value",
    chapter: 1,
    title: "Functional metric: deals_closed_value",
    difficulty: "warmup",
    prompt: `Compute **deals_closed_value**: the total \`amount\` across all deals in stage \`closed_won\`. Return one row, one column named \`deals_closed_value\`.`,
    starterQuery: `SELECT -- aggregate here
FROM deals
WHERE stage = 'closed_won';`,
    solution: `SELECT SUM(amount) AS deals_closed_value FROM deals WHERE stage = 'closed_won';`,
    dpmConnection: {
      text: "This is the Playbook's functional metric for Sales: bookings. It rolls up into the North Star and is explained by granular metrics like conversion_rate in the Metric Dependency Tree.",
      kbSlug: "metric-types",
    },
    hint: "SUM(amount) with an alias: AS deals_closed_value.",
  },
  {
    slug: "sql-revenue-generated",
    chapter: 1,
    title: "North Star metric: revenue_generated",
    difficulty: "warmup",
    prompt: `The \`transactions\` table records actual money movements (initial, renewal, upsell) against won deals.

Compute **revenue_generated**: the total \`amount\` across all transactions. One row, one column named \`revenue_generated\`.`,
    starterQuery: `SELECT -- aggregate here
FROM transactions;`,
    solution: `SELECT SUM(amount) AS revenue_generated FROM transactions;`,
    dpmConnection: {
      text: "revenue_generated is the North Star for Sales. Notice it is NOT the same number as deals_closed_value: transactions include renewals and upsells that deal amounts don't. Chapter 6 is entirely about explaining that gap to the CFO.",
      kbSlug: "metric-types",
    },
    hint: "SUM over transactions.amount; alias as revenue_generated.",
  },
  {
    slug: "sql-conversion-rate",
    chapter: 1,
    title: "Granular metric: conversion_rate (Dana's definition)",
    difficulty: "warmup",
    prompt: `Compute **conversion_rate** = closed_won ÷ (closed_won + closed_lost). Open deals (prospecting, qualified, proposal, negotiation) are excluded: they haven't converted or failed yet.

One row, one column \`conversion_rate\`, rounded to 4 decimals.`,
    starterQuery: `SELECT ROUND(
  1.0 * SUM(CASE WHEN stage = 'closed_won' THEN 1 ELSE 0 END)
  / SUM(CASE WHEN stage IN ('closed_won', 'closed_lost') THEN 1 ELSE 0 END),
  4
) AS conversion_rate
FROM deals;`,
    solution: `SELECT ROUND(1.0 * SUM(CASE WHEN stage = 'closed_won' THEN 1 ELSE 0 END) / SUM(CASE WHEN stage IN ('closed_won', 'closed_lost') THEN 1 ELSE 0 END), 4) AS conversion_rate FROM deals;`,
    dpmConnection: {
      text: "Compare this with the 'won ÷ all deals' query Raj showed you in the quiz. Same table, different denominator, a very different number. Which one is 'right' is a definition decision, and it belongs on the Metric Dependency Tree with a name.",
      kbSlug: "metric-types",
    },
    hint: "The starter is complete. Read it: 1.0 * forces decimal division; CASE WHEN inside SUM counts conditionally.",
  },

  // =================== Chapter 2 · The Canvas ===================
  {
    slug: "sql-join-accounts-deals",
    chapter: 2,
    title: "Won value by account (JOIN + GROUP BY)",
    difficulty: "core",
    prompt: `Join \`accounts\` to \`deals\` and report, for each account, the **account_name** and its **total_won** (sum of \`amount\` for \`closed_won\` deals). Order by \`total_won\` descending, then \`account_name\`.`,
    starterQuery: `SELECT a.account_name, SUM(d.amount) AS total_won
FROM accounts a
JOIN deals d ON -- join condition
WHERE d.stage = 'closed_won'
GROUP BY a.account_name
ORDER BY total_won DESC, a.account_name;`,
    solution: `SELECT a.account_name, SUM(d.amount) AS total_won FROM accounts a JOIN deals d ON a.account_id = d.account_id WHERE d.stage = 'closed_won' GROUP BY a.account_name ORDER BY total_won DESC, a.account_name;`,
    orderMatters: true,
    dpmConnection: {
      text: "This is the logical model's 'Relationships' (accounts 1:N deals) turned into a measure. Splitting a functional metric by an entity is the first move of any root-cause walk.",
      kbSlug: "canvas-data-product-design",
    },
    hint: "Join on a.account_id = d.account_id.",
  },
  {
    slug: "sql-rep-performance",
    chapter: 2,
    title: "Won value by rep",
    difficulty: "core",
    prompt: `For each sales rep (\`owner\`), sum the \`amount\` of their \`closed_won\` deals. Return **owner** and **total_won**, ordered by \`total_won\` descending.`,
    starterQuery: `SELECT owner, SUM(amount) AS total_won
FROM deals
WHERE stage = 'closed_won'
GROUP BY -- ?
ORDER BY total_won DESC;`,
    solution: `SELECT owner, SUM(amount) AS total_won FROM deals WHERE stage = 'closed_won' GROUP BY owner ORDER BY total_won DESC;`,
    orderMatters: true,
    dpmConnection: {
      text: "Slicing a metric by a dimension (owner) is what Dana actually asks for in a pipeline review. As a Data PM, look at the concentration: if one rep is a large share of the number, a data problem on their deals moves the North Star.",
      kbSlug: "bullseye-data-product-market-fit",
    },
    hint: "GROUP BY owner.",
  },
  {
    slug: "sql-region-conversion",
    chapter: 2,
    title: "conversion_rate by region",
    difficulty: "core",
    prompt: `Compute Dana's **conversion_rate** per **region** (region lives on \`accounts\`, stage on \`deals\`). Round to 4 decimals, order by region.`,
    starterQuery: `SELECT a.region,
  ROUND(
    1.0 * SUM(CASE WHEN d.stage = 'closed_won' THEN 1 ELSE 0 END)
    / SUM(CASE WHEN d.stage IN ('closed_won', 'closed_lost') THEN 1 ELSE 0 END),
    4
  ) AS conversion_rate
FROM deals d
JOIN accounts a ON a.account_id = d.account_id
GROUP BY a.region
ORDER BY a.region;`,
    solution: `SELECT a.region, ROUND(1.0 * SUM(CASE WHEN d.stage = 'closed_won' THEN 1 ELSE 0 END) / SUM(CASE WHEN d.stage IN ('closed_won', 'closed_lost') THEN 1 ELSE 0 END), 4) AS conversion_rate FROM deals d JOIN accounts a ON a.account_id = d.account_id GROUP BY a.region ORDER BY a.region;`,
    orderMatters: true,
    dpmConnection: {
      text: "A granular metric cut by a dimension from a *different* entity. Most real metric-tree questions have this shape: the measure on one table, the slicing attribute on another. The join is where silent errors creep in.",
      kbSlug: "canvas-data-product-design",
    },
    hint: "The starter is complete. Understand each clause, then run it.",
  },
  {
    slug: "sql-rca-source-lost",
    chapter: 2,
    title: "Where are we losing deals?",
    difficulty: "core",
    prompt: `For each deal \`source\`, return **lost_value** (sum of \`amount\` for \`closed_lost\` deals) and **lost_count**. Order by \`lost_value\` descending.`,
    starterQuery: `SELECT source,
  SUM(amount) AS lost_value,
  COUNT(*)    AS lost_count
FROM deals
WHERE stage = 'closed_lost'
GROUP BY source
ORDER BY lost_value DESC;`,
    solution: `SELECT source, SUM(amount) AS lost_value, COUNT(*) AS lost_count FROM deals WHERE stage = 'closed_lost' GROUP BY source ORDER BY lost_value DESC;`,
    orderMatters: true,
    dpmConnection: {
      text: "Two aggregates over the same filtered rows. The output is the raw material for a stakeholder conversation; the Data PM's job starts *after* the query: is Outbound losing on lead quality, pricing, or a data problem in how stage is recorded?",
      kbSlug: "proof-of-value-performance",
    },
    hint: "SUM for value, COUNT(*) for count, both over the closed_lost rows.",
  },
  {
    slug: "sql-conversion-two-ways",
    chapter: 2,
    title: "Two conversion rates, one query (CTE)",
    difficulty: "core",
    prompt: `Dana counts deals; Tomás counts dollars. Compute both on the same **resolved** deals (closed_won or closed_lost):

- \`conversion_rate_closed\` = won deals ÷ resolved deals
- \`conversion_rate_value\` = won amount ÷ resolved amount

Use a CTE named \`resolved\` for the filtered rows. One row, both columns, rounded to 4 decimals.`,
    starterQuery: `WITH resolved AS (
  SELECT * FROM deals WHERE stage IN ('closed_won', 'closed_lost')
)
SELECT
  ROUND(1.0 * SUM(stage = 'closed_won') / COUNT(*), 4) AS conversion_rate_closed,
  -- add the value-based rate
FROM resolved;`,
    solution: `WITH resolved AS (SELECT * FROM deals WHERE stage IN ('closed_won', 'closed_lost')) SELECT ROUND(1.0 * SUM(stage = 'closed_won') / COUNT(*), 4) AS conversion_rate_closed, ROUND(1.0 * SUM(CASE WHEN stage = 'closed_won' THEN amount ELSE 0 END) / SUM(amount), 4) AS conversion_rate_value FROM resolved;`,
    dpmConnection: {
      text: "Same rows, two legitimate metrics. The Metric Dependency Tree gives each a name and an owner so the whiteboard fight happens once. In SQLite, SUM(stage = 'closed_won') counts rows where the comparison is true.",
      kbSlug: "canvas-data-product-design",
    },
    hint: "SUM(CASE WHEN stage = 'closed_won' THEN amount ELSE 0 END) / SUM(amount).",
  },
  {
    slug: "sql-stage-funnel",
    chapter: 2,
    title: "The funnel from the history log",
    difficulty: "core",
    prompt: `\`deals.stage\` is overwritten every time a deal moves. \`deal_stage_history\` keeps every transition.

For each stage, count the **distinct deals that ever entered it**. Return \`stage\` and \`deals_reached\`, ordered in funnel order (prospecting → qualified → proposal → negotiation → closed_won → closed_lost).`,
    starterQuery: `SELECT stage, COUNT(DISTINCT deal_id) AS deals_reached
FROM deal_stage_history
GROUP BY stage
ORDER BY ${STAGE_ORDER_SQL};`,
    solution: `SELECT stage, COUNT(DISTINCT deal_id) AS deals_reached FROM deal_stage_history GROUP BY stage ORDER BY ${STAGE_ORDER_SQL};`,
    orderMatters: true,
    dpmConnection: {
      text: "A funnel is an 'ever reached' question, which only an append-only log can answer. This is why the logical model treats the history table, not the CRM's current stage, as the source for funnel metrics.",
      kbSlug: "funnel-conversion-analysis",
    },
    hint: "COUNT(DISTINCT deal_id) so duplicate log rows don't inflate the count. The CASE in ORDER BY imposes funnel order.",
  },
  {
    slug: "sql-stage-to-stage",
    chapter: 2,
    title: "Stage-to-stage conversion (self-join on a CTE)",
    difficulty: "advanced",
    prompt: `Compute the conversion between consecutive funnel stages: prospecting→qualified, qualified→proposal, proposal→negotiation, negotiation→closed_won.

Build a CTE \`reached\` with each stage's distinct deal count and its funnel position (1–5, ignore closed_lost), then join it to itself on position + 1. Return \`from_stage\`, \`to_stage\`, \`step_rate\` (rounded to 4), in funnel order.`,
    starterQuery: `WITH reached AS (
  SELECT stage,
    COUNT(DISTINCT deal_id) AS n,
    CASE stage WHEN 'prospecting' THEN 1 WHEN 'qualified' THEN 2
               WHEN 'proposal' THEN 3 WHEN 'negotiation' THEN 4
               WHEN 'closed_won' THEN 5 END AS ord
  FROM deal_stage_history
  WHERE stage <> 'closed_lost'
  GROUP BY stage
)
SELECT a.stage AS from_stage, b.stage AS to_stage,
  -- step_rate = b.n / a.n
FROM reached a
JOIN reached b ON b.ord = a.ord + 1
ORDER BY a.ord;`,
    solution: `WITH reached AS (SELECT stage, COUNT(DISTINCT deal_id) AS n, CASE stage WHEN 'prospecting' THEN 1 WHEN 'qualified' THEN 2 WHEN 'proposal' THEN 3 WHEN 'negotiation' THEN 4 WHEN 'closed_won' THEN 5 END AS ord FROM deal_stage_history WHERE stage <> 'closed_lost' GROUP BY stage) SELECT a.stage AS from_stage, b.stage AS to_stage, ROUND(1.0 * b.n / a.n, 4) AS step_rate FROM reached a JOIN reached b ON b.ord = a.ord + 1 ORDER BY a.ord;`,
    orderMatters: true,
    dpmConnection: {
      text: "Overall conversion says *whether* deals close; stage-to-stage says *where* they drop. Different question, different query. The Data PM reads the weakest step as the place to look first.",
      kbSlug: "funnel-conversion-analysis",
    },
    hint: "ROUND(1.0 * b.n / a.n, 4) AS step_rate.",
  },
  {
    slug: "sql-days-in-stage",
    chapter: 2,
    title: "Average days in each stage (LEAD window)",
    difficulty: "advanced",
    prompt: `Velocity: how long do deals sit in each stage?

For every history row, the time in that stage is the gap to the deal's *next* row. Use \`LEAD(entered_at) OVER (PARTITION BY deal_id ORDER BY entered_at)\` and \`julianday()\` to get days. Start from \`SELECT DISTINCT deal_id, stage, entered_at\` so duplicate log rows don't create zero-day gaps.

Return \`stage\` and \`avg_days\` (rounded to 1 decimal) for the four pre-close stages, in funnel order.`,
    starterQuery: `WITH h AS (
  SELECT DISTINCT deal_id, stage, entered_at FROM deal_stage_history
),
steps AS (
  SELECT deal_id, stage,
    julianday(LEAD(entered_at) OVER (PARTITION BY deal_id ORDER BY entered_at))
      - julianday(entered_at) AS days
  FROM h
)
SELECT stage, ROUND(AVG(days), 1) AS avg_days
FROM steps
WHERE days IS NOT NULL
GROUP BY stage
ORDER BY CASE stage WHEN 'prospecting' THEN 1 WHEN 'qualified' THEN 2 WHEN 'proposal' THEN 3 ELSE 4 END;`,
    solution: `WITH h AS (SELECT DISTINCT deal_id, stage, entered_at FROM deal_stage_history), steps AS (SELECT deal_id, stage, julianday(LEAD(entered_at) OVER (PARTITION BY deal_id ORDER BY entered_at)) - julianday(entered_at) AS days FROM h) SELECT stage, ROUND(AVG(days), 1) AS avg_days FROM steps WHERE days IS NOT NULL GROUP BY stage ORDER BY CASE stage WHEN 'prospecting' THEN 1 WHEN 'qualified' THEN 2 WHEN 'proposal' THEN 3 ELSE 4 END;`,
    orderMatters: true,
    dpmConnection: {
      text: "Your first window function. Terminal stages get NULL from LEAD (no next row), which the WHERE removes. Time-in-stage is the metric Dana actually wants when she says 'where are deals stuck?'",
      kbSlug: "sql-toolkit-for-data-pms",
    },
    hint: "The starter is complete; run it and make sure you can explain why closed stages don't appear.",
  },
  {
    slug: "sql-monthly-cohort",
    chapter: 2,
    title: "Created-month cohorts",
    difficulty: "core",
    prompt: `Group deals by the month they were created (\`substr(created_date, 1, 7)\`). Return \`cohort_month\`, \`created\`, \`won\`, \`lost\`, \`still_open\`, ordered by month.`,
    starterQuery: `SELECT substr(created_date, 1, 7) AS cohort_month,
  COUNT(*) AS created,
  SUM(stage = 'closed_won') AS won,
  -- lost, still_open
FROM deals
GROUP BY cohort_month
ORDER BY cohort_month;`,
    solution: `SELECT substr(created_date, 1, 7) AS cohort_month, COUNT(*) AS created, SUM(stage = 'closed_won') AS won, SUM(stage = 'closed_lost') AS lost, SUM(stage NOT IN ('closed_won', 'closed_lost')) AS still_open FROM deals GROUP BY cohort_month ORDER BY cohort_month;`,
    orderMatters: true,
    dpmConnection: {
      text: "Look at the right edge: recent cohorts have many still_open deals. Any 'won ÷ created' chart will sag there for no business reason. Chapter 5 starts by ruling that artifact out.",
      kbSlug: "funnel-conversion-analysis",
    },
    hint: "SUM(stage = 'closed_lost') and SUM(stage NOT IN ('closed_won','closed_lost')).",
  },

  // =================== Chapter 3 · Activation (data quality) ===================
  {
    slug: "sql-dup-transactions",
    chapter: 3,
    title: "Uniqueness: duplicate transactions",
    difficulty: "core",
    prompt: `The revenue tile jumped overnight and fell back. Find transactions that appear more than once with the same \`deal_id\`, \`amount\`, and \`transaction_date\`.

Return \`deal_id\`, \`amount\`, \`transaction_date\`, \`copies\` (the count), ordered by \`deal_id\`.`,
    starterQuery: `SELECT deal_id, amount, transaction_date, COUNT(*) AS copies
FROM transactions
GROUP BY deal_id, amount, transaction_date
HAVING -- only groups with more than one row
ORDER BY deal_id;`,
    solution: `SELECT deal_id, amount, transaction_date, COUNT(*) AS copies FROM transactions GROUP BY deal_id, amount, transaction_date HAVING COUNT(*) > 1 ORDER BY deal_id;`,
    orderMatters: true,
    dpmConnection: {
      text: "GROUP BY key HAVING COUNT(*) > 1 is *the* duplicate idiom. A re-ingested file passes every pipeline status check and still double-counts revenue. This query becomes a uniqueness SLO that runs after every load.",
      kbSlug: "data-quality-dimensions",
    },
    hint: "HAVING COUNT(*) > 1.",
  },
  {
    slug: "sql-stale-stage",
    chapter: 3,
    title: "Consistency: CRM stage vs. latest history",
    difficulty: "advanced",
    prompt: `Reps update stages late. Find deals whose \`deals.stage\` disagrees with the **latest** row in \`deal_stage_history\`.

Use \`ROW_NUMBER() OVER (PARTITION BY deal_id ORDER BY entered_at DESC, history_id DESC)\` in a CTE to pick each deal's latest history row. Return \`deal_id\`, \`crm_stage\`, \`latest_stage\`, ordered by \`deal_id\`.`,
    starterQuery: `WITH latest AS (
  SELECT deal_id, stage,
    ROW_NUMBER() OVER (PARTITION BY deal_id ORDER BY entered_at DESC, history_id DESC) AS rn
  FROM deal_stage_history
)
SELECT d.deal_id, d.stage AS crm_stage, l.stage AS latest_stage
FROM deals d
JOIN latest l ON l.deal_id = d.deal_id AND l.rn = 1
WHERE -- the two stages differ
ORDER BY d.deal_id;`,
    solution: `WITH latest AS (SELECT deal_id, stage, ROW_NUMBER() OVER (PARTITION BY deal_id ORDER BY entered_at DESC, history_id DESC) AS rn FROM deal_stage_history) SELECT d.deal_id, d.stage AS crm_stage, l.stage AS latest_stage FROM deals d JOIN latest l ON l.deal_id = d.deal_id AND l.rn = 1 WHERE d.stage <> l.stage ORDER BY d.deal_id;`,
    orderMatters: true,
    dpmConnection: {
      text: "'Latest row per entity' via ROW_NUMBER is the most reused window pattern in data work. The fix isn't editing four CRM rows; it's making the history log the source of truth in the transform and turning this query into a consistency SLO.",
      kbSlug: "data-quality-dimensions",
    },
    hint: "WHERE d.stage <> l.stage.",
  },
  {
    slug: "sql-missing-closed-date",
    chapter: 3,
    title: "Completeness: closed deals without a close date",
    difficulty: "core",
    prompt: `Every closed deal must have a \`closed_date\`. Find the ones that don't. Return \`deal_id\`, \`stage\`, \`owner\`, ordered by \`deal_id\`.`,
    starterQuery: `SELECT deal_id, stage, owner
FROM deals
WHERE stage IN ('closed_won', 'closed_lost')
  AND -- closed_date is missing
ORDER BY deal_id;`,
    solution: `SELECT deal_id, stage, owner FROM deals WHERE stage IN ('closed_won', 'closed_lost') AND closed_date IS NULL ORDER BY deal_id;`,
    orderMatters: true,
    dpmConnection: {
      text: "NULL never equals anything; you must write IS NULL. These rows silently vanish from any 'closed in month X' report, so bookings by month are understated without anyone noticing. Completeness SLO: 100% of closed deals have a closed_date.",
      kbSlug: "data-quality-dimensions",
    },
    hint: "closed_date IS NULL (not = NULL).",
  },
  {
    slug: "sql-freshness",
    chapter: 3,
    title: "Timeliness: how stale is each pipeline?",
    difficulty: "core",
    prompt: `For each pipeline, find the most recent run that did **not** fail (\`status <> 'failed'\`) and how many hours old it is as of \`2026-08-31 09:00:00\`.

Return \`pipeline\`, \`last_good_run\` (max \`finished_at\`), \`hours_stale\` (rounded to 1 decimal, using \`julianday\` × 24), ordered by pipeline.`,
    starterQuery: `SELECT pipeline,
  MAX(finished_at) AS last_good_run,
  ROUND((julianday('2026-08-31 09:00:00') - julianday(MAX(finished_at))) * 24, 1) AS hours_stale
FROM pipeline_runs
WHERE status <> 'failed'
GROUP BY pipeline
ORDER BY pipeline;`,
    solution: `SELECT pipeline, MAX(finished_at) AS last_good_run, ROUND((julianday('2026-08-31 09:00:00') - julianday(MAX(finished_at))) * 24, 1) AS hours_stale FROM pipeline_runs WHERE status <> 'failed' GROUP BY pipeline ORDER BY pipeline;`,
    orderMatters: true,
    dpmConnection: {
      text: "This is a freshness SLO as a query: measurement, threshold (< 24h), and evaluation time (09:00). 'The job is scheduled at 02:00' is not an SLO; this is.",
      kbSlug: "data-quality-dimensions",
    },
    hint: "The starter is complete. Change the as-of timestamp and watch hours_stale move.",
  },
  {
    slug: "sql-failed-recovery",
    chapter: 3,
    title: "Failed runs and time to recover",
    difficulty: "advanced",
    prompt: `For every failed run, find when that pipeline next had a non-failed run and how many days that took.

Return \`pipeline\`, \`failed_on\`, \`recovered_on\`, \`days_to_recover\` (integer), ordered by pipeline then \`failed_on\`. A correlated subquery is the simplest tool here.`,
    starterQuery: `SELECT f.pipeline,
  f.run_date AS failed_on,
  (SELECT MIN(s.run_date) FROM pipeline_runs s
    WHERE s.pipeline = f.pipeline AND s.status <> 'failed' AND s.run_date > f.run_date) AS recovered_on,
  -- days_to_recover: julianday(recovered_on) - julianday(failed_on), cast to INTEGER
FROM pipeline_runs f
WHERE f.status = 'failed'
ORDER BY f.pipeline, f.run_date;`,
    solution: `SELECT f.pipeline, f.run_date AS failed_on, (SELECT MIN(s.run_date) FROM pipeline_runs s WHERE s.pipeline = f.pipeline AND s.status <> 'failed' AND s.run_date > f.run_date) AS recovered_on, CAST(julianday((SELECT MIN(s.run_date) FROM pipeline_runs s WHERE s.pipeline = f.pipeline AND s.status <> 'failed' AND s.run_date > f.run_date)) - julianday(f.run_date) AS INTEGER) AS days_to_recover FROM pipeline_runs f WHERE f.status = 'failed' ORDER BY f.pipeline, f.run_date;`,
    orderMatters: true,
    dpmConnection: {
      text: "A three-day gap with no alert is how the June revenue numbers went stale for a weekend. Time-to-recover is the SLO metric an on-call rotation is measured on; you can't manage it until you can query it.",
      kbSlug: "data-product-activation",
    },
    hint: "Repeat the subquery inside CAST(julianday(...) - julianday(f.run_date) AS INTEGER), or wrap the whole thing in a CTE.",
  },
  {
    slug: "sql-rowcount-anomaly",
    chapter: 3,
    title: "Row-count anomaly vs. trailing average (window frame)",
    difficulty: "advanced",
    prompt: `A run can succeed and still process a partial file. Flag non-failed runs whose \`rows_out\` is below **50% of the average of the previous 7 runs** for the same pipeline.

Use \`AVG(rows_out) OVER (PARTITION BY pipeline ORDER BY run_date ROWS BETWEEN 7 PRECEDING AND 1 PRECEDING)\`. Return \`pipeline\`, \`run_date\`, \`rows_out\`, \`trailing_avg\` (rounded to 1), ordered by \`run_date\`.`,
    starterQuery: `WITH ok AS (
  SELECT pipeline, run_date, rows_out FROM pipeline_runs WHERE status <> 'failed'
),
w AS (
  SELECT pipeline, run_date, rows_out,
    AVG(rows_out) OVER (
      PARTITION BY pipeline ORDER BY run_date
      ROWS BETWEEN 7 PRECEDING AND 1 PRECEDING
    ) AS trailing_avg
  FROM ok
)
SELECT pipeline, run_date, rows_out, ROUND(trailing_avg, 1) AS trailing_avg
FROM w
WHERE trailing_avg IS NOT NULL AND -- rows_out is less than half the trailing average
ORDER BY run_date;`,
    solution: `WITH ok AS (SELECT pipeline, run_date, rows_out FROM pipeline_runs WHERE status <> 'failed'), w AS (SELECT pipeline, run_date, rows_out, AVG(rows_out) OVER (PARTITION BY pipeline ORDER BY run_date ROWS BETWEEN 7 PRECEDING AND 1 PRECEDING) AS trailing_avg FROM ok) SELECT pipeline, run_date, rows_out, ROUND(trailing_avg, 1) AS trailing_avg FROM w WHERE trailing_avg IS NOT NULL AND rows_out < 0.5 * trailing_avg ORDER BY run_date;`,
    orderMatters: true,
    dpmConnection: {
      text: "A window *frame* (ROWS BETWEEN … PRECEDING) turns a per-run number into a per-run baseline. This is the volume check that catches 'success' on a 30% file, which no status column ever will.",
      kbSlug: "data-quality-dimensions",
    },
    hint: "rows_out < 0.5 * trailing_avg.",
  },

  // =================== Chapter 4 · Launch (adoption) ===================
  {
    slug: "sql-weekly-active",
    chapter: 4,
    title: "Weekly active viewers",
    difficulty: "core",
    prompt: `Count **distinct viewers per week** of the *Sales Funnel Accelerator* dashboard. Bucket weeks with \`strftime('%Y-%W', viewed_at)\`. Return \`week\` and \`active_viewers\`, ordered by week.`,
    starterQuery: `SELECT strftime('%Y-%W', viewed_at) AS week,
  -- distinct people, not rows
FROM dashboard_views
WHERE dashboard = 'Sales Funnel Accelerator'
GROUP BY week
ORDER BY week;`,
    solution: `SELECT strftime('%Y-%W', viewed_at) AS week, COUNT(DISTINCT viewer_id) AS active_viewers FROM dashboard_views WHERE dashboard = 'Sales Funnel Accelerator' GROUP BY week ORDER BY week;`,
    orderMatters: true,
    dpmConnection: {
      text: "COUNT(DISTINCT viewer_id), never COUNT(*): views measure activity, viewers measure adoption. Sofia's question was 'is anyone using it?', which is a question about people.",
      kbSlug: "go-to-market-launch",
    },
    hint: "COUNT(DISTINCT viewer_id) AS active_viewers.",
  },
  {
    slug: "sql-adoption-by-role",
    chapter: 4,
    title: "Adoption by role",
    difficulty: "core",
    prompt: `For the *Sales Funnel Accelerator*, report per \`viewer_role\`: \`viewers\` (distinct people), \`views\` (rows), and \`views_per_viewer\` (rounded to 1 decimal). Order by \`viewers\` descending, then role.`,
    starterQuery: `SELECT viewer_role,
  COUNT(DISTINCT viewer_id) AS viewers,
  COUNT(*) AS views,
  -- views_per_viewer
FROM dashboard_views
WHERE dashboard = 'Sales Funnel Accelerator'
GROUP BY viewer_role
ORDER BY viewers DESC, viewer_role;`,
    solution: `SELECT viewer_role, COUNT(DISTINCT viewer_id) AS viewers, COUNT(*) AS views, ROUND(1.0 * COUNT(*) / COUNT(DISTINCT viewer_id), 1) AS views_per_viewer FROM dashboard_views WHERE dashboard = 'Sales Funnel Accelerator' GROUP BY viewer_role ORDER BY viewers DESC, viewer_role;`,
    orderMatters: true,
    dpmConnection: {
      text: "Which audience is missing is more useful than how many views there are. A role with zero viewers (Finance, at Meridian) is next week's stakeholder conversation, not a failure of the dashboard.",
      kbSlug: "go-to-market-launch",
    },
    hint: "ROUND(1.0 * COUNT(*) / COUNT(DISTINCT viewer_id), 1).",
  },
  {
    slug: "sql-dashboard-mom",
    chapter: 4,
    title: "Legacy vs. new dashboard, month over month (LAG)",
    difficulty: "advanced",
    prompt: `For each dashboard and month, report \`views\` and the change versus the previous month (\`change_vs_prev\`, NULL for the first month). Aggregate to months in a CTE first, then use \`LAG(views) OVER (PARTITION BY dashboard ORDER BY month)\`. Order by dashboard, month.`,
    starterQuery: `WITH m AS (
  SELECT dashboard, substr(viewed_at, 1, 7) AS month, COUNT(*) AS views
  FROM dashboard_views
  GROUP BY dashboard, month
)
SELECT dashboard, month, views,
  -- views minus the previous month's views for the same dashboard
FROM m
ORDER BY dashboard, month;`,
    solution: `WITH m AS (SELECT dashboard, substr(viewed_at, 1, 7) AS month, COUNT(*) AS views FROM dashboard_views GROUP BY dashboard, month) SELECT dashboard, month, views, views - LAG(views) OVER (PARTITION BY dashboard ORDER BY month) AS change_vs_prev FROM m ORDER BY dashboard, month;`,
    orderMatters: true,
    dpmConnection: {
      text: "Grain first (one row per dashboard-month), window second. The story in the output, legacy fading while the new product grows, is the evidence that lets you retire the old report with a redirect instead of a memo.",
      kbSlug: "sql-toolkit-for-data-pms",
    },
    hint: "views - LAG(views) OVER (PARTITION BY dashboard ORDER BY month) AS change_vs_prev.",
  },

  // =================== Chapter 5 · Proof (root cause) ===================
  {
    slug: "sql-rca-confirm",
    chapter: 5,
    title: "Step 1: is the drop real?",
    difficulty: "core",
    prompt: `Before slicing, remove the open-deal artifact. Compute conversion (won ÷ resolved) by **created-month cohort**, using only **resolved** deals created on or before \`2026-06-30\`.

Return \`cohort_month\`, \`resolved\`, \`conversion_rate\` (4 decimals), ordered by month.`,
    starterQuery: `SELECT substr(created_date, 1, 7) AS cohort_month,
  COUNT(*) AS resolved,
  ROUND(1.0 * SUM(stage = 'closed_won') / COUNT(*), 4) AS conversion_rate
FROM deals
WHERE stage IN ('closed_won', 'closed_lost')
  AND created_date <= '2026-06-30'
GROUP BY cohort_month
ORDER BY cohort_month;`,
    solution: `SELECT substr(created_date, 1, 7) AS cohort_month, COUNT(*) AS resolved, ROUND(1.0 * SUM(stage = 'closed_won') / COUNT(*), 4) AS conversion_rate FROM deals WHERE stage IN ('closed_won', 'closed_lost') AND created_date <= '2026-06-30' GROUP BY cohort_month ORDER BY cohort_month;`,
    orderMatters: true,
    dpmConnection: {
      text: "The first RCA step is proving the number is real, not an artifact of cohorts that haven't had time to close. May and June should still look low after this filter. If they didn't, the meeting would be over.",
      kbSlug: "funnel-conversion-analysis",
    },
    hint: "The starter is complete. Compare with the unfiltered cohort query from chapter 2.",
  },
  {
    slug: "sql-rca-segment",
    chapter: 5,
    title: "Step 2: which segment moved? (region × source, before vs. during)",
    difficulty: "advanced",
    prompt: `Compare conversion for deals created **before May** (\`created_date < '2026-05-01'\`) with deals created **May–June**, for every \`region\` × \`source\` cell. Resolved deals only, created on or before \`2026-06-30\`.

Return \`region\`, \`source\`, \`conv_before\`, \`conv_during\` (both rounded to 2 decimals), \`deals_during\`. Order by region, source.`,
    starterQuery: `WITH r AS (
  SELECT d.stage, d.source, a.region,
    CASE WHEN d.created_date < '2026-05-01' THEN 'before' ELSE 'during' END AS period
  FROM deals d
  JOIN accounts a ON a.account_id = d.account_id
  WHERE d.stage IN ('closed_won', 'closed_lost')
    AND d.created_date <= '2026-06-30'
)
SELECT region, source,
  ROUND(1.0 * SUM(period = 'before' AND stage = 'closed_won') / SUM(period = 'before'), 2) AS conv_before,
  -- conv_during, deals_during
FROM r
GROUP BY region, source
ORDER BY region, source;`,
    solution: `WITH r AS (SELECT d.stage, d.source, a.region, CASE WHEN d.created_date < '2026-05-01' THEN 'before' ELSE 'during' END AS period FROM deals d JOIN accounts a ON a.account_id = d.account_id WHERE d.stage IN ('closed_won', 'closed_lost') AND d.created_date <= '2026-06-30') SELECT region, source, ROUND(1.0 * SUM(period = 'before' AND stage = 'closed_won') / SUM(period = 'before'), 2) AS conv_before, ROUND(1.0 * SUM(period = 'during' AND stage = 'closed_won') / SUM(period = 'during'), 2) AS conv_during, SUM(period = 'during') AS deals_during FROM r GROUP BY region, source ORDER BY region, source;`,
    orderMatters: true,
    dpmConnection: {
      text: "One query, nine cells, and only one of them collapses. A price increase would depress every cell; a vendor change for AMER outbound leads depresses exactly one. This is how the tree kills theories cheaply.",
      kbSlug: "funnel-conversion-analysis",
    },
    hint: "Mirror conv_before with period = 'during'; deals_during is SUM(period = 'during').",
  },
  {
    slug: "sql-rca-velocity",
    chapter: 5,
    title: "Step 3: where in the funnel? (negotiation time, before vs. during)",
    difficulty: "advanced",
    prompt: `In the AMER × Outbound segment, compare average days spent in **negotiation** for deals created before May versus May–June (created on or before \`2026-06-30\`).

Reuse the LEAD-based \`steps\` CTE from chapter 2. Return \`period\`, \`avg_days_in_negotiation\` (1 decimal), \`deals\`, ordered by period.`,
    starterQuery: `WITH h AS (
  SELECT DISTINCT deal_id, stage, entered_at FROM deal_stage_history
),
steps AS (
  SELECT deal_id, stage,
    julianday(LEAD(entered_at) OVER (PARTITION BY deal_id ORDER BY entered_at))
      - julianday(entered_at) AS days
  FROM h
),
seg AS (
  SELECT d.deal_id,
    CASE WHEN d.created_date < '2026-05-01' THEN 'before' ELSE 'during' END AS period
  FROM deals d
  JOIN accounts a ON a.account_id = d.account_id
  WHERE a.region = 'AMER' AND d.source = 'Outbound' AND d.created_date <= '2026-06-30'
)
SELECT seg.period,
  ROUND(AVG(steps.days), 1) AS avg_days_in_negotiation,
  COUNT(*) AS deals
FROM steps
JOIN seg ON seg.deal_id = steps.deal_id
WHERE steps.stage = 'negotiation' AND steps.days IS NOT NULL
GROUP BY seg.period
ORDER BY seg.period;`,
    solution: `WITH h AS (SELECT DISTINCT deal_id, stage, entered_at FROM deal_stage_history), steps AS (SELECT deal_id, stage, julianday(LEAD(entered_at) OVER (PARTITION BY deal_id ORDER BY entered_at)) - julianday(entered_at) AS days FROM h), seg AS (SELECT d.deal_id, CASE WHEN d.created_date < '2026-05-01' THEN 'before' ELSE 'during' END AS period FROM deals d JOIN accounts a ON a.account_id = d.account_id WHERE a.region = 'AMER' AND d.source = 'Outbound' AND d.created_date <= '2026-06-30') SELECT seg.period, ROUND(AVG(steps.days), 1) AS avg_days_in_negotiation, COUNT(*) AS deals FROM steps JOIN seg ON seg.deal_id = steps.deal_id WHERE steps.stage = 'negotiation' AND steps.days IS NOT NULL GROUP BY seg.period ORDER BY seg.period;`,
    orderMatters: true,
    dpmConnection: {
      text: "Deals still reach negotiation, then stall and die. Late-funnel losses with longer negotiation point at lead quality, not at reps' data hygiene. Three CTEs, each named for what it produces, is how a Data PM keeps a query like this readable in a meeting.",
      kbSlug: "funnel-conversion-analysis",
    },
    hint: "The starter is complete. Change the region/source filter to see that other segments did not change.",
  },
  {
    slug: "sql-rca-size",
    chapter: 5,
    title: "Step 4: size it",
    difficulty: "core",
    prompt: `Sofia needs a number. For AMER × Outbound deals created May–June 2026 that were **closed_lost**, return \`owner\`, \`lost_deals\`, \`lost_value\`, ordered by \`lost_value\` descending.`,
    starterQuery: `SELECT d.owner, COUNT(*) AS lost_deals, SUM(d.amount) AS lost_value
FROM deals d
JOIN accounts a ON a.account_id = d.account_id
WHERE a.region = 'AMER' AND d.source = 'Outbound'
  AND d.stage = 'closed_lost'
  AND d.created_date BETWEEN '2026-05-01' AND '2026-06-30'
GROUP BY d.owner
ORDER BY lost_value DESC;`,
    solution: `SELECT d.owner, COUNT(*) AS lost_deals, SUM(d.amount) AS lost_value FROM deals d JOIN accounts a ON a.account_id = d.account_id WHERE a.region = 'AMER' AND d.source = 'Outbound' AND d.stage = 'closed_lost' AND d.created_date BETWEEN '2026-05-01' AND '2026-06-30' GROUP BY d.owner ORDER BY lost_value DESC;`,
    orderMatters: true,
    dpmConnection: {
      text: "Root cause work ends with a size and an owner, not a chart. This is the slide: cause, deals and dollars affected, alternatives ruled out, proposed fix.",
      kbSlug: "proof-of-value-performance",
    },
    hint: "The starter is complete. Try removing the region/source filter to see how much of total May–June loss this segment explains.",
  },

  // =================== Chapter 6 · Beyond (reconciliation) ===================
  {
    slug: "sql-reconcile-bookings-revenue",
    chapter: 6,
    title: "Bookings vs. revenue by month",
    difficulty: "advanced",
    prompt: `Tomás has two numbers. Put them side by side per month:

- \`bookings\` = sum of \`amount\` for \`closed_won\` deals by \`closed_date\` month (skip NULL dates)
- \`revenue\` = sum of \`transactions.amount\` by \`transaction_date\` month

Some months exist in only one side, so build a \`months\` CTE with \`UNION\` and LEFT JOIN both. Return \`month\`, \`bookings\`, \`revenue\`, \`difference\` (revenue − bookings; use COALESCE so missing months show 0). Order by month.`,
    starterQuery: `WITH b AS (
  SELECT substr(closed_date, 1, 7) AS month, SUM(amount) AS bookings
  FROM deals WHERE stage = 'closed_won' AND closed_date IS NOT NULL
  GROUP BY month
),
r AS (
  SELECT substr(transaction_date, 1, 7) AS month, SUM(amount) AS revenue
  FROM transactions GROUP BY month
),
months AS (
  SELECT month FROM b UNION SELECT month FROM r
)
SELECT m.month,
  COALESCE(b.bookings, 0) AS bookings,
  COALESCE(r.revenue, 0) AS revenue,
  -- difference
FROM months m
LEFT JOIN b ON b.month = m.month
LEFT JOIN r ON r.month = m.month
ORDER BY m.month;`,
    solution: `WITH b AS (SELECT substr(closed_date, 1, 7) AS month, SUM(amount) AS bookings FROM deals WHERE stage = 'closed_won' AND closed_date IS NOT NULL GROUP BY month), r AS (SELECT substr(transaction_date, 1, 7) AS month, SUM(amount) AS revenue FROM transactions GROUP BY month), months AS (SELECT month FROM b UNION SELECT month FROM r) SELECT m.month, COALESCE(b.bookings, 0) AS bookings, COALESCE(r.revenue, 0) AS revenue, COALESCE(r.revenue, 0) - COALESCE(b.bookings, 0) AS difference FROM months m LEFT JOIN b ON b.month = m.month LEFT JOIN r ON r.month = m.month ORDER BY m.month;`,
    orderMatters: true,
    dpmConnection: {
      text: "Neither number is wrong. Bookings is what Sales books; revenue is what Finance collects. The reconciliation is the bridge on the board slide, and the SQL pattern (UNION of keys, LEFT JOIN both sides) is how you compare any two metrics that should agree.",
      kbSlug: "ontology-as-infrastructure",
    },
    hint: "COALESCE(r.revenue, 0) - COALESCE(b.bookings, 0) AS difference.",
  },
  {
    slug: "sql-revenue-bridge",
    chapter: 6,
    title: "Explain the gap: revenue bridge",
    difficulty: "advanced",
    prompt: `Break \`transactions\` into buckets that explain the bookings-vs-revenue gap: \`initial\`, \`renewal\`, \`upsell\`, and \`duplicate\` (the extra copies you found in chapter 3).

Use \`ROW_NUMBER() OVER (PARTITION BY deal_id, amount, transaction_date, type ORDER BY transaction_id)\`; rows with \`rn > 1\` are duplicates. Return \`bucket\`, \`transactions\`, \`amount\`, ordered by \`amount\` descending.`,
    starterQuery: `WITH ranked AS (
  SELECT *,
    ROW_NUMBER() OVER (PARTITION BY deal_id, amount, transaction_date, type ORDER BY transaction_id) AS rn
  FROM transactions
)
SELECT CASE WHEN rn > 1 THEN 'duplicate' ELSE type END AS bucket,
  COUNT(*) AS transactions,
  SUM(amount) AS amount
FROM ranked
GROUP BY bucket
ORDER BY amount DESC;`,
    solution: `WITH ranked AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY deal_id, amount, transaction_date, type ORDER BY transaction_id) AS rn FROM transactions) SELECT CASE WHEN rn > 1 THEN 'duplicate' ELSE type END AS bucket, COUNT(*) AS transactions, SUM(amount) AS amount FROM ranked GROUP BY bucket ORDER BY amount DESC;`,
    orderMatters: true,
    dpmConnection: {
      text: "Every dollar of the difference now has a name. 'Initial' should reconcile to bookings; renewals and upsells are the healthy part of the gap; duplicates are the part you remove. This is the bridge the CFO puts under the two numbers.",
      kbSlug: "ontology-as-infrastructure",
    },
    hint: "The starter is complete. Compare the initial bucket with total bookings from the previous exercise.",
  },
  {
    slug: "sql-running-revenue",
    chapter: 6,
    title: "Running revenue total",
    difficulty: "advanced",
    prompt: `Compute monthly revenue from \`transactions\` and a **running total** across months. Aggregate to months in a CTE first, then \`SUM(revenue) OVER (ORDER BY month)\`. Return \`month\`, \`revenue\`, \`running_total\`, ordered by month.`,
    starterQuery: `WITH m AS (
  SELECT substr(transaction_date, 1, 7) AS month, SUM(amount) AS revenue
  FROM transactions
  GROUP BY month
)
SELECT month, revenue,
  -- running_total
FROM m
ORDER BY month;`,
    solution: `WITH m AS (SELECT substr(transaction_date, 1, 7) AS month, SUM(amount) AS revenue FROM transactions GROUP BY month) SELECT month, revenue, SUM(revenue) OVER (ORDER BY month) AS running_total FROM m ORDER BY month;`,
    orderMatters: true,
    dpmConnection: {
      text: "Grain first, window second. Skip the CTE and the running total steps up on every transaction row instead of every month. This query becomes Meridian's first gold metric with a written definition, a test, and an SLO.",
      kbSlug: "sql-toolkit-for-data-pms",
    },
    hint: "SUM(revenue) OVER (ORDER BY month) AS running_total.",
  },
  {
    slug: "sql-capstone-metric-tree",
    chapter: 6,
    title: "Capstone: the whole metric tree, one query",
    difficulty: "advanced",
    prompt: `For the months \`2026-06\`, \`2026-07\`, \`2026-08\`, produce the metric tree in one result:

- \`revenue_generated\`: transactions by \`transaction_date\` month
- \`deals_closed_value\`: won amount by \`closed_date\` month
- \`conversion_rate\`: won ÷ (won + lost) among deals **closed** in that month (4 decimals)

Two CTEs (\`rev\`, \`closed\`) joined on month. Return \`month\`, \`revenue_generated\`, \`deals_closed_value\`, \`conversion_rate\`, ordered by month.`,
    starterQuery: `WITH rev AS (
  SELECT substr(transaction_date, 1, 7) AS month, SUM(amount) AS revenue_generated
  FROM transactions GROUP BY month
),
closed AS (
  SELECT substr(closed_date, 1, 7) AS month,
    SUM(CASE WHEN stage = 'closed_won' THEN amount ELSE 0 END) AS deals_closed_value,
    ROUND(1.0 * SUM(stage = 'closed_won') / COUNT(*), 4) AS conversion_rate
  FROM deals
  WHERE closed_date IS NOT NULL AND stage IN ('closed_won', 'closed_lost')
  GROUP BY month
)
SELECT c.month,
  COALESCE(r.revenue_generated, 0) AS revenue_generated,
  c.deals_closed_value,
  c.conversion_rate
FROM closed c
LEFT JOIN rev r ON r.month = c.month
WHERE c.month IN ('2026-06', '2026-07', '2026-08')
ORDER BY c.month;`,
    solution: `WITH rev AS (SELECT substr(transaction_date, 1, 7) AS month, SUM(amount) AS revenue_generated FROM transactions GROUP BY month), closed AS (SELECT substr(closed_date, 1, 7) AS month, SUM(CASE WHEN stage = 'closed_won' THEN amount ELSE 0 END) AS deals_closed_value, ROUND(1.0 * SUM(stage = 'closed_won') / COUNT(*), 4) AS conversion_rate FROM deals WHERE closed_date IS NOT NULL AND stage IN ('closed_won', 'closed_lost') GROUP BY month) SELECT c.month, COALESCE(r.revenue_generated, 0) AS revenue_generated, c.deals_closed_value, c.conversion_rate FROM closed c LEFT JOIN rev r ON r.month = c.month WHERE c.month IN ('2026-06', '2026-07', '2026-08') ORDER BY c.month;`,
    orderMatters: true,
    dpmConnection: {
      text: "North Star, functional, granular: one definition each, one query, one owner. Six weeks ago these were three arguments. Now they are a semantic contract that a dashboard, a finance analyst, and an AI agent can all read the same way.",
      kbSlug: "metric-types",
    },
    hint: "The starter is complete. Notice conversion here is by *closed* month, not created cohort: a different, equally valid cut. Name it accordingly on the tree.",
  },
];

export function sqlExercisesForChapter(chapter: number): SqlExercise[] {
  return sqlExercises.filter((e) => e.chapter === chapter);
}
