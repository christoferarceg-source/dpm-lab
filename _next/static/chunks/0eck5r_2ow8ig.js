(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,8908,e=>{"use strict";let t="CASE stage WHEN 'prospecting' THEN 1 WHEN 'qualified' THEN 2 WHEN 'proposal' THEN 3 WHEN 'negotiation' THEN 4 WHEN 'closed_won' THEN 5 ELSE 6 END",a=[{slug:"sql0-select-where",chapter:0,title:"Pick columns, keep rows",difficulty:"warmup",prompt:"Return the **deal_id**, **owner**, and **amount** of every deal currently in stage `qualified`, ordered by `deal_id`.",starterQuery:`SELECT deal_id, owner, amount
FROM deals
WHERE stage = '...'
ORDER BY deal_id;`,solution:"SELECT deal_id, owner, amount FROM deals WHERE stage = 'qualified' ORDER BY deal_id;",walkthrough:"`SELECT deal_id, owner, amount` names the three columns. `FROM deals` is the table. `WHERE stage = 'qualified'` keeps only rows whose stage is exactly that text (single quotes, exact spelling). `ORDER BY deal_id` fixes the row order so the result is reproducible.",orderMatters:!0,dpmConnection:{text:"SELECT / FROM / WHERE / ORDER BY is the sentence every other query extends. Being able to list the exact rows behind a number is the first habit of a Data PM.",kbSlug:"sql-101"},hint:"Text values need single quotes: 'qualified'."},{slug:"sql0-count-by-stage",chapter:0,title:"How many deals per stage?",difficulty:"warmup",prompt:"Count the deals in each `stage`. Return `stage` and `deals` (the count), ordered by `deals` descending, then `stage`.",starterQuery:`SELECT stage, COUNT(*) AS deals
FROM deals
GROUP BY -- ?
ORDER BY deals DESC, stage;`,solution:"SELECT stage, COUNT(*) AS deals FROM deals GROUP BY stage ORDER BY deals DESC, stage;",walkthrough:"`GROUP BY stage` collapses the table into one row per distinct stage. `COUNT(*)` counts the rows inside each group, and `AS deals` names that column. `ORDER BY deals DESC, stage` puts the biggest group first and breaks ties alphabetically.",orderMatters:!0,dpmConnection:{text:"GROUP BY turns a table into one row per value. This is the shape of almost every chart: a dimension and a count.",kbSlug:"sql-101"},hint:"GROUP BY stage."},{slug:"sql0-avg-by-region",chapter:0,title:"Average deal size by region (JOIN)",difficulty:"warmup",prompt:"Region lives on `accounts`; amount lives on `deals`. Join them and return `region` and `avg_amount` (average `amount`, rounded to 0 decimals), ordered by region.",starterQuery:`SELECT a.region, ROUND(AVG(d.amount), 0) AS avg_amount
FROM deals d
JOIN accounts a ON -- the shared key
GROUP BY a.region
ORDER BY a.region;`,solution:"SELECT a.region, ROUND(AVG(d.amount), 0) AS avg_amount FROM deals d JOIN accounts a ON a.account_id = d.account_id GROUP BY a.region ORDER BY a.region;",walkthrough:"Region isn't on `deals`, so `JOIN accounts a ON a.account_id = d.account_id` pairs each deal with its account through the shared key. After the join, `GROUP BY a.region` makes one row per region and `AVG(d.amount)` averages the deal amounts in it. `ROUND(..., 0)` trims decimals.",orderMatters:!0,dpmConnection:{text:"Your first join: pair each deal with its account through account_id, then aggregate. Every metric that slices by a customer attribute has this shape.",kbSlug:"sql-101"},hint:"ON a.account_id = d.account_id."},{slug:"sql-select-closed-won",chapter:1,title:"See the rows behind the number",difficulty:"warmup",prompt:"Before you argue about a conversion rate, look at the rows that feed it.\n\nReturn the **deal_id**, **account_id**, and **amount** of every deal whose `stage` is `closed_won`, ordered by `deal_id`.",starterQuery:`SELECT deal_id, account_id, amount
FROM deals
WHERE -- your condition here
ORDER BY deal_id;`,solution:"SELECT deal_id, account_id, amount FROM deals WHERE stage = 'closed_won' ORDER BY deal_id;",walkthrough:"The filter `stage = 'closed_won'` is the whole trick: it keeps exactly the rows that feed the bookings metric. Ordering by `deal_id` makes the list stable so you can compare runs.",orderMatters:!0,dpmConnection:{text:"Filtering to closed_won is the first step of the functional metric deals_closed_value. A Data PM who can point at the exact rows behind an aggregate can defend it; one who can't is trusting the dashboard.",kbSlug:"metric-types"},hint:"Compare the stage column to the string 'closed_won' (single quotes) in the WHERE clause."},{slug:"sql-deals-closed-value",chapter:1,title:"Functional metric: deals_closed_value",difficulty:"warmup",prompt:"Compute **deals_closed_value**: the total `amount` across all deals in stage `closed_won`. Return one row, one column named `deals_closed_value`.",starterQuery:`SELECT -- aggregate here
FROM deals
WHERE stage = 'closed_won';`,solution:"SELECT SUM(amount) AS deals_closed_value FROM deals WHERE stage = 'closed_won';",walkthrough:"`SUM(amount)` adds the amount of every row that survives the WHERE. Because only `closed_won` rows survive, the sum is bookings. `AS deals_closed_value` names the metric so the result reads like the tree.",dpmConnection:{text:"This is the Playbook's functional metric for Sales: bookings. It rolls up into the North Star and is explained by granular metrics like conversion_rate in the Metric Dependency Tree.",kbSlug:"metric-types"},hint:"SUM(amount) with an alias: AS deals_closed_value."},{slug:"sql-revenue-generated",chapter:1,title:"North Star metric: revenue_generated",difficulty:"warmup",prompt:"The `transactions` table records actual money movements (initial, renewal, upsell) against won deals.\n\nCompute **revenue_generated**: the total `amount` across all transactions. One row, one column named `revenue_generated`.",starterQuery:`SELECT -- aggregate here
FROM transactions;`,solution:"SELECT SUM(amount) AS revenue_generated FROM transactions;",walkthrough:"No WHERE: every transaction counts, initial, renewal, and upsell alike. `SUM(amount)` over the whole table is the North Star. The number is larger than bookings because renewals and upsells are money that never appears on a deal row.",dpmConnection:{text:"revenue_generated is the North Star for Sales. Notice it is NOT the same number as deals_closed_value: transactions include renewals and upsells that deal amounts don't. Chapter 6 is entirely about explaining that gap to the CFO.",kbSlug:"metric-types"},hint:"SUM over transactions.amount; alias as revenue_generated."},{slug:"sql-conversion-rate",chapter:1,title:"Granular metric: conversion_rate (Dana's definition)",difficulty:"warmup",prompt:"Compute **conversion_rate** = closed_won ÷ (closed_won + closed_lost). Open deals (prospecting, qualified, proposal, negotiation) are excluded: they haven't converted or failed yet.\n\nOne row, one column `conversion_rate`, rounded to 4 decimals.",starterQuery:`SELECT ROUND(
  1.0 * SUM(CASE WHEN stage = 'closed_won' THEN 1 ELSE 0 END)
  / SUM(CASE WHEN stage IN ('closed_won', 'closed_lost') THEN 1 ELSE 0 END),
  4
) AS conversion_rate
FROM deals;`,solution:"SELECT ROUND(1.0 * SUM(CASE WHEN stage = 'closed_won' THEN 1 ELSE 0 END) / SUM(CASE WHEN stage IN ('closed_won', 'closed_lost') THEN 1 ELSE 0 END), 4) AS conversion_rate FROM deals;",walkthrough:"Two conditional counts in one pass: `SUM(CASE WHEN stage = 'closed_won' THEN 1 ELSE 0 END)` counts wins; the second SUM counts resolved deals (won or lost). `1.0 *` forces decimal division, otherwise SQLite would return 0. `ROUND(..., 4)` fixes the precision.",dpmConnection:{text:"Compare this with the 'won ÷ all deals' query Raj showed you in the quiz. Same table, different denominator, a very different number. Which one is 'right' is a definition decision, and it belongs on the Metric Dependency Tree with a name.",kbSlug:"metric-types"},hint:"The starter is complete. Read it: 1.0 * forces decimal division; CASE WHEN inside SUM counts conditionally."},{slug:"sql-join-accounts-deals",chapter:2,title:"Won value by account (JOIN + GROUP BY)",difficulty:"core",prompt:"Join `accounts` to `deals` and report, for each account, the **account_name** and its **total_won** (sum of `amount` for `closed_won` deals). Order by `total_won` descending, then `account_name`.",starterQuery:`SELECT a.account_name, SUM(d.amount) AS total_won
FROM accounts a
JOIN deals d ON -- join condition
WHERE d.stage = 'closed_won'
GROUP BY a.account_name
ORDER BY total_won DESC, a.account_name;`,solution:"SELECT a.account_name, SUM(d.amount) AS total_won FROM accounts a JOIN deals d ON a.account_id = d.account_id WHERE d.stage = 'closed_won' GROUP BY a.account_name ORDER BY total_won DESC, a.account_name;",walkthrough:"`JOIN deals d ON a.account_id = d.account_id` attaches each deal to its account. The WHERE keeps won deals, `GROUP BY a.account_name` makes one row per account, and `SUM(d.amount)` totals within it. The two-key ORDER BY makes ties deterministic.",orderMatters:!0,dpmConnection:{text:"This is the logical model's 'Relationships' (accounts 1:N deals) turned into a measure. Splitting a functional metric by an entity is the first move of any root-cause walk.",kbSlug:"canvas-data-product-design"},hint:"Join on a.account_id = d.account_id."},{slug:"sql-rep-performance",chapter:2,title:"Won value by rep",difficulty:"core",prompt:"For each sales rep (`owner`), sum the `amount` of their `closed_won` deals. Return **owner** and **total_won**, ordered by `total_won` descending.",starterQuery:`SELECT owner, SUM(amount) AS total_won
FROM deals
WHERE stage = 'closed_won'
GROUP BY -- ?
ORDER BY total_won DESC;`,solution:"SELECT owner, SUM(amount) AS total_won FROM deals WHERE stage = 'closed_won' GROUP BY owner ORDER BY total_won DESC;",walkthrough:"Same pattern on a single table: filter to won deals, `GROUP BY owner`, `SUM(amount)`. Ordering descending puts the top rep first, which is how the review meeting reads it.",orderMatters:!0,dpmConnection:{text:"Slicing a metric by a dimension (owner) is what Dana actually asks for in a pipeline review. As a Data PM, look at the concentration: if one rep is a large share of the number, a data problem on their deals moves the North Star.",kbSlug:"bullseye-data-product-market-fit"},hint:"GROUP BY owner."},{slug:"sql-region-conversion",chapter:2,title:"conversion_rate by region",difficulty:"core",prompt:"Compute Dana's **conversion_rate** per **region** (region lives on `accounts`, stage on `deals`). Round to 4 decimals, order by region.",starterQuery:`SELECT a.region,
  ROUND(
    1.0 * SUM(CASE WHEN d.stage = 'closed_won' THEN 1 ELSE 0 END)
    / SUM(CASE WHEN d.stage IN ('closed_won', 'closed_lost') THEN 1 ELSE 0 END),
    4
  ) AS conversion_rate
FROM deals d
JOIN accounts a ON a.account_id = d.account_id
GROUP BY a.region
ORDER BY a.region;`,solution:"SELECT a.region, ROUND(1.0 * SUM(CASE WHEN d.stage = 'closed_won' THEN 1 ELSE 0 END) / SUM(CASE WHEN d.stage IN ('closed_won', 'closed_lost') THEN 1 ELSE 0 END), 4) AS conversion_rate FROM deals d JOIN accounts a ON a.account_id = d.account_id GROUP BY a.region ORDER BY a.region;",walkthrough:"Region lives on `accounts`, stage on `deals`, so you join first. Then the conversion formula from chapter 1 runs inside each `GROUP BY a.region` group: won ÷ resolved, with `1.0 *` for decimals and `ROUND(..., 4)`.",orderMatters:!0,dpmConnection:{text:"A granular metric cut by a dimension from a *different* entity. Most real metric-tree questions have this shape: the measure on one table, the slicing attribute on another. The join is where silent errors creep in.",kbSlug:"canvas-data-product-design"},hint:"The starter is complete. Understand each clause, then run it."},{slug:"sql-rca-source-lost",chapter:2,title:"Where are we losing deals?",difficulty:"core",prompt:"For each deal `source`, return **lost_value** (sum of `amount` for `closed_lost` deals) and **lost_count**. Order by `lost_value` descending.",starterQuery:`SELECT source,
  SUM(amount) AS lost_value,
  COUNT(*)    AS lost_count
FROM deals
WHERE stage = 'closed_lost'
GROUP BY source
ORDER BY lost_value DESC;`,solution:"SELECT source, SUM(amount) AS lost_value, COUNT(*) AS lost_count FROM deals WHERE stage = 'closed_lost' GROUP BY source ORDER BY lost_value DESC;",walkthrough:"Filter to `closed_lost`, then `GROUP BY source`. Two aggregates over the same rows: `SUM(amount)` for dollars lost and `COUNT(*)` for how many deals. Ordering by value puts the biggest leak first.",orderMatters:!0,dpmConnection:{text:"Two aggregates over the same filtered rows. The output is the raw material for a stakeholder conversation; the Data PM's job starts *after* the query: is Outbound losing on lead quality, pricing, or a data problem in how stage is recorded?",kbSlug:"proof-of-value-performance"},hint:"SUM for value, COUNT(*) for count, both over the closed_lost rows."},{slug:"sql-conversion-two-ways",chapter:2,title:"Two conversion rates, one query (CTE)",difficulty:"core",prompt:"Dana counts deals; Tomás counts dollars. Compute both on the same **resolved** deals (closed_won or closed_lost):\n\n- `conversion_rate_closed` = won deals ÷ resolved deals\n- `conversion_rate_value` = won amount ÷ resolved amount\n\nUse a CTE named `resolved` for the filtered rows. One row, both columns, rounded to 4 decimals.",starterQuery:`WITH resolved AS (
  SELECT * FROM deals WHERE stage IN ('closed_won', 'closed_lost')
)
SELECT
  ROUND(1.0 * SUM(stage = 'closed_won') / COUNT(*), 4) AS conversion_rate_closed,
  -- add the value-based rate
FROM resolved;`,solution:"WITH resolved AS (SELECT * FROM deals WHERE stage IN ('closed_won', 'closed_lost')) SELECT ROUND(1.0 * SUM(stage = 'closed_won') / COUNT(*), 4) AS conversion_rate_closed, ROUND(1.0 * SUM(CASE WHEN stage = 'closed_won' THEN amount ELSE 0 END) / SUM(amount), 4) AS conversion_rate_value FROM resolved;",walkthrough:"The CTE `resolved` filters once so both rates share the same denominator population. `SUM(stage = 'closed_won')` counts wins (SQLite treats a true comparison as 1). The value rate replaces the count with `amount` inside the CASE and divides by total amount.",dpmConnection:{text:"Same rows, two legitimate metrics. The Metric Dependency Tree gives each a name and an owner so the whiteboard fight happens once. In SQLite, SUM(stage = 'closed_won') counts rows where the comparison is true.",kbSlug:"canvas-data-product-design"},hint:"SUM(CASE WHEN stage = 'closed_won' THEN amount ELSE 0 END) / SUM(amount)."},{slug:"sql-stage-funnel",chapter:2,title:"The funnel from the history log",difficulty:"core",prompt:"`deals.stage` is overwritten every time a deal moves. `deal_stage_history` keeps every transition.\n\nFor each stage, count the **distinct deals that ever entered it**. Return `stage` and `deals_reached`, ordered in funnel order (prospecting → qualified → proposal → negotiation → closed_won → closed_lost).",starterQuery:`SELECT stage, COUNT(DISTINCT deal_id) AS deals_reached
FROM deal_stage_history
GROUP BY stage
ORDER BY ${t};`,solution:`SELECT stage, COUNT(DISTINCT deal_id) AS deals_reached FROM deal_stage_history GROUP BY stage ORDER BY ${t};`,walkthrough:"Because the history log keeps every transition, `COUNT(DISTINCT deal_id)` per stage counts deals that *ever entered* that stage, and DISTINCT ignores duplicate log rows. The CASE in ORDER BY imposes funnel order instead of alphabetical.",orderMatters:!0,dpmConnection:{text:"A funnel is an 'ever reached' question, which only an append-only log can answer. This is why the logical model treats the history table, not the CRM's current stage, as the source for funnel metrics.",kbSlug:"funnel-conversion-analysis"},hint:"COUNT(DISTINCT deal_id) so duplicate log rows don't inflate the count. The CASE in ORDER BY imposes funnel order."},{slug:"sql-stage-to-stage",chapter:2,title:"Stage-to-stage conversion (self-join on a CTE)",difficulty:"advanced",prompt:"Compute the conversion between consecutive funnel stages: prospecting→qualified, qualified→proposal, proposal→negotiation, negotiation→closed_won.\n\nBuild a CTE `reached` with each stage's distinct deal count and its funnel position (1–5, ignore closed_lost), then join it to itself on position + 1. Return `from_stage`, `to_stage`, `step_rate` (rounded to 4), in funnel order.",starterQuery:`WITH reached AS (
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
ORDER BY a.ord;`,solution:"WITH reached AS (SELECT stage, COUNT(DISTINCT deal_id) AS n, CASE stage WHEN 'prospecting' THEN 1 WHEN 'qualified' THEN 2 WHEN 'proposal' THEN 3 WHEN 'negotiation' THEN 4 WHEN 'closed_won' THEN 5 END AS ord FROM deal_stage_history WHERE stage <> 'closed_lost' GROUP BY stage) SELECT a.stage AS from_stage, b.stage AS to_stage, ROUND(1.0 * b.n / a.n, 4) AS step_rate FROM reached a JOIN reached b ON b.ord = a.ord + 1 ORDER BY a.ord;",walkthrough:"The CTE `reached` computes deals-per-stage plus a numeric position. Joining `reached` to itself `ON b.ord = a.ord + 1` lines each stage up with the next one, so `b.n / a.n` is the step conversion. `1.0 *` avoids integer division.",orderMatters:!0,dpmConnection:{text:"Overall conversion says *whether* deals close; stage-to-stage says *where* they drop. Different question, different query. The Data PM reads the weakest step as the place to look first.",kbSlug:"funnel-conversion-analysis"},hint:"ROUND(1.0 * b.n / a.n, 4) AS step_rate."},{slug:"sql-days-in-stage",chapter:2,title:"Average days in each stage (LEAD window)",difficulty:"advanced",prompt:"Velocity: how long do deals sit in each stage?\n\nFor every history row, the time in that stage is the gap to the deal's *next* row. Use `LEAD(entered_at) OVER (PARTITION BY deal_id ORDER BY entered_at)` and `julianday()` to get days. Start from `SELECT DISTINCT deal_id, stage, entered_at` so duplicate log rows don't create zero-day gaps.\n\nReturn `stage` and `avg_days` (rounded to 1 decimal) for the four pre-close stages, in funnel order.",starterQuery:`WITH h AS (
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
ORDER BY CASE stage WHEN 'prospecting' THEN 1 WHEN 'qualified' THEN 2 WHEN 'proposal' THEN 3 ELSE 4 END;`,solution:"WITH h AS (SELECT DISTINCT deal_id, stage, entered_at FROM deal_stage_history), steps AS (SELECT deal_id, stage, julianday(LEAD(entered_at) OVER (PARTITION BY deal_id ORDER BY entered_at)) - julianday(entered_at) AS days FROM h) SELECT stage, ROUND(AVG(days), 1) AS avg_days FROM steps WHERE days IS NOT NULL GROUP BY stage ORDER BY CASE stage WHEN 'prospecting' THEN 1 WHEN 'qualified' THEN 2 WHEN 'proposal' THEN 3 ELSE 4 END;",walkthrough:"`h` deduplicates the log. In `steps`, `LEAD(entered_at) OVER (PARTITION BY deal_id ORDER BY entered_at)` fetches the next row *for the same deal*; subtracting `julianday` values gives days. The last row of each deal has no next row, so its gap is NULL and `WHERE days IS NOT NULL` drops it. Then average per stage.",orderMatters:!0,dpmConnection:{text:"Your first window function. Terminal stages get NULL from LEAD (no next row), which the WHERE removes. Time-in-stage is the metric Dana actually wants when she says 'where are deals stuck?'",kbSlug:"sql-toolkit-for-data-pms"},hint:"The starter is complete; run it and make sure you can explain why closed stages don't appear."},{slug:"sql-monthly-cohort",chapter:2,title:"Created-month cohorts",difficulty:"core",prompt:"Group deals by the month they were created (`substr(created_date, 1, 7)`). Return `cohort_month`, `created`, `won`, `lost`, `still_open`, ordered by month.",starterQuery:`SELECT substr(created_date, 1, 7) AS cohort_month,
  COUNT(*) AS created,
  SUM(stage = 'closed_won') AS won,
  -- lost, still_open
FROM deals
GROUP BY cohort_month
ORDER BY cohort_month;`,solution:"SELECT substr(created_date, 1, 7) AS cohort_month, COUNT(*) AS created, SUM(stage = 'closed_won') AS won, SUM(stage = 'closed_lost') AS lost, SUM(stage NOT IN ('closed_won', 'closed_lost')) AS still_open FROM deals GROUP BY cohort_month ORDER BY cohort_month;",walkthrough:"`substr(created_date, 1, 7)` turns a date into `YYYY-MM`. Grouping by it gives one row per cohort month. The three `SUM(condition)` columns count won, lost, and still-open deals; `NOT IN` is the complement of the resolved set.",orderMatters:!0,dpmConnection:{text:"Look at the right edge: recent cohorts have many still_open deals. Any 'won ÷ created' chart will sag there for no business reason. Chapter 5 starts by ruling that artifact out.",kbSlug:"funnel-conversion-analysis"},hint:"SUM(stage = 'closed_lost') and SUM(stage NOT IN ('closed_won','closed_lost'))."},{slug:"sql-dup-transactions",chapter:3,title:"Uniqueness: duplicate transactions",difficulty:"core",prompt:"The revenue tile jumped overnight and fell back. Find transactions that appear more than once with the same `deal_id`, `amount`, and `transaction_date`.\n\nReturn `deal_id`, `amount`, `transaction_date`, `copies` (the count), ordered by `deal_id`.",starterQuery:`SELECT deal_id, amount, transaction_date, COUNT(*) AS copies
FROM transactions
GROUP BY deal_id, amount, transaction_date
HAVING -- only groups with more than one row
ORDER BY deal_id;`,solution:"SELECT deal_id, amount, transaction_date, COUNT(*) AS copies FROM transactions GROUP BY deal_id, amount, transaction_date HAVING COUNT(*) > 1 ORDER BY deal_id;",walkthrough:"The key that identifies one real-world payment is `(deal_id, amount, transaction_date)`. `GROUP BY` that key and `HAVING COUNT(*) > 1` keeps only groups with more than one row, which is the definition of a duplicate. `copies` shows how many.",orderMatters:!0,dpmConnection:{text:"GROUP BY key HAVING COUNT(*) > 1 is *the* duplicate idiom. A re-ingested file passes every pipeline status check and still double-counts revenue. This query becomes a uniqueness SLO that runs after every load.",kbSlug:"data-quality-dimensions"},hint:"HAVING COUNT(*) > 1."},{slug:"sql-stale-stage",chapter:3,title:"Consistency: CRM stage vs. latest history",difficulty:"advanced",prompt:"Reps update stages late. Find deals whose `deals.stage` disagrees with the **latest** row in `deal_stage_history`.\n\nUse `ROW_NUMBER() OVER (PARTITION BY deal_id ORDER BY entered_at DESC, history_id DESC)` in a CTE to pick each deal's latest history row. Return `deal_id`, `crm_stage`, `latest_stage`, ordered by `deal_id`.",starterQuery:`WITH latest AS (
  SELECT deal_id, stage,
    ROW_NUMBER() OVER (PARTITION BY deal_id ORDER BY entered_at DESC, history_id DESC) AS rn
  FROM deal_stage_history
)
SELECT d.deal_id, d.stage AS crm_stage, l.stage AS latest_stage
FROM deals d
JOIN latest l ON l.deal_id = d.deal_id AND l.rn = 1
WHERE -- the two stages differ
ORDER BY d.deal_id;`,solution:"WITH latest AS (SELECT deal_id, stage, ROW_NUMBER() OVER (PARTITION BY deal_id ORDER BY entered_at DESC, history_id DESC) AS rn FROM deal_stage_history) SELECT d.deal_id, d.stage AS crm_stage, l.stage AS latest_stage FROM deals d JOIN latest l ON l.deal_id = d.deal_id AND l.rn = 1 WHERE d.stage <> l.stage ORDER BY d.deal_id;",walkthrough:"`ROW_NUMBER() OVER (PARTITION BY deal_id ORDER BY entered_at DESC, history_id DESC)` numbers each deal's history rows newest-first, so `rn = 1` is the latest stage. Joining that to `deals` and keeping `d.stage <> l.stage` surfaces every deal whose CRM value lags the log.",orderMatters:!0,dpmConnection:{text:"'Latest row per entity' via ROW_NUMBER is the most reused window pattern in data work. The fix isn't editing four CRM rows; it's making the history log the source of truth in the transform and turning this query into a consistency SLO.",kbSlug:"data-quality-dimensions"},hint:"WHERE d.stage <> l.stage."},{slug:"sql-missing-closed-date",chapter:3,title:"Completeness: closed deals without a close date",difficulty:"core",prompt:"Every closed deal must have a `closed_date`. Find the ones that don't. Return `deal_id`, `stage`, `owner`, ordered by `deal_id`.",starterQuery:`SELECT deal_id, stage, owner
FROM deals
WHERE stage IN ('closed_won', 'closed_lost')
  AND -- closed_date is missing
ORDER BY deal_id;`,solution:"SELECT deal_id, stage, owner FROM deals WHERE stage IN ('closed_won', 'closed_lost') AND closed_date IS NULL ORDER BY deal_id;",walkthrough:"Restrict to closed deals with `stage IN ('closed_won', 'closed_lost')`, then `closed_date IS NULL`. It must be `IS NULL`: `= NULL` is never true, so the check would return nothing and look clean.",orderMatters:!0,dpmConnection:{text:"NULL never equals anything; you must write IS NULL. These rows silently vanish from any 'closed in month X' report, so bookings by month are understated without anyone noticing. Completeness SLO: 100% of closed deals have a closed_date.",kbSlug:"data-quality-dimensions"},hint:"closed_date IS NULL (not = NULL)."},{slug:"sql-freshness",chapter:3,title:"Timeliness: how stale is each pipeline?",difficulty:"core",prompt:"For each pipeline, find the most recent run that did **not** fail (`status <> 'failed'`) and how many hours old it is as of `2026-08-31 09:00:00`.\n\nReturn `pipeline`, `last_good_run` (max `finished_at`), `hours_stale` (rounded to 1 decimal, using `julianday` × 24), ordered by pipeline.",starterQuery:`SELECT pipeline,
  MAX(finished_at) AS last_good_run,
  ROUND((julianday('2026-08-31 09:00:00') - julianday(MAX(finished_at))) * 24, 1) AS hours_stale
FROM pipeline_runs
WHERE status <> 'failed'
GROUP BY pipeline
ORDER BY pipeline;`,solution:"SELECT pipeline, MAX(finished_at) AS last_good_run, ROUND((julianday('2026-08-31 09:00:00') - julianday(MAX(finished_at))) * 24, 1) AS hours_stale FROM pipeline_runs WHERE status <> 'failed' GROUP BY pipeline ORDER BY pipeline;",walkthrough:"`WHERE status <> 'failed'` keeps runs that delivered data. `MAX(finished_at)` per pipeline is the last good load. `julianday(as_of) - julianday(last)` is the age in days; `* 24` converts to hours. That's a freshness SLO as a query.",orderMatters:!0,dpmConnection:{text:"This is a freshness SLO as a query: measurement, threshold (< 24h), and evaluation time (09:00). 'The job is scheduled at 02:00' is not an SLO; this is.",kbSlug:"data-quality-dimensions"},hint:"The starter is complete. Change the as-of timestamp and watch hours_stale move."},{slug:"sql-failed-recovery",chapter:3,title:"Failed runs and time to recover",difficulty:"advanced",prompt:"For every failed run, find when that pipeline next had a non-failed run and how many days that took.\n\nReturn `pipeline`, `failed_on`, `recovered_on`, `days_to_recover` (integer), ordered by pipeline then `failed_on`. A correlated subquery is the simplest tool here.",starterQuery:`SELECT f.pipeline,
  f.run_date AS failed_on,
  (SELECT MIN(s.run_date) FROM pipeline_runs s
    WHERE s.pipeline = f.pipeline AND s.status <> 'failed' AND s.run_date > f.run_date) AS recovered_on,
  -- days_to_recover: julianday(recovered_on) - julianday(failed_on), cast to INTEGER
FROM pipeline_runs f
WHERE f.status = 'failed'
ORDER BY f.pipeline, f.run_date;`,solution:"SELECT f.pipeline, f.run_date AS failed_on, (SELECT MIN(s.run_date) FROM pipeline_runs s WHERE s.pipeline = f.pipeline AND s.status <> 'failed' AND s.run_date > f.run_date) AS recovered_on, CAST(julianday((SELECT MIN(s.run_date) FROM pipeline_runs s WHERE s.pipeline = f.pipeline AND s.status <> 'failed' AND s.run_date > f.run_date)) - julianday(f.run_date) AS INTEGER) AS days_to_recover FROM pipeline_runs f WHERE f.status = 'failed' ORDER BY f.pipeline, f.run_date;",walkthrough:"For each failed row `f`, the correlated subquery finds the smallest later `run_date` for the same pipeline with a non-failed status: the recovery. Repeating it inside `julianday(...) - julianday(f.run_date)` and casting to INTEGER gives days to recover.",orderMatters:!0,dpmConnection:{text:"A three-day gap with no alert is how the June revenue numbers went stale for a weekend. Time-to-recover is the SLO metric an on-call rotation is measured on; you can't manage it until you can query it.",kbSlug:"data-product-activation"},hint:"Repeat the subquery inside CAST(julianday(...) - julianday(f.run_date) AS INTEGER), or wrap the whole thing in a CTE."},{slug:"sql-rowcount-anomaly",chapter:3,title:"Row-count anomaly vs. trailing average (window frame)",difficulty:"advanced",prompt:"A run can succeed and still process a partial file. Flag non-failed runs whose `rows_out` is below **50% of the average of the previous 7 runs** for the same pipeline.\n\nUse `AVG(rows_out) OVER (PARTITION BY pipeline ORDER BY run_date ROWS BETWEEN 7 PRECEDING AND 1 PRECEDING)`. Return `pipeline`, `run_date`, `rows_out`, `trailing_avg` (rounded to 1), ordered by `run_date`.",starterQuery:`WITH ok AS (
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
ORDER BY run_date;`,solution:"WITH ok AS (SELECT pipeline, run_date, rows_out FROM pipeline_runs WHERE status <> 'failed'), w AS (SELECT pipeline, run_date, rows_out, AVG(rows_out) OVER (PARTITION BY pipeline ORDER BY run_date ROWS BETWEEN 7 PRECEDING AND 1 PRECEDING) AS trailing_avg FROM ok) SELECT pipeline, run_date, rows_out, ROUND(trailing_avg, 1) AS trailing_avg FROM w WHERE trailing_avg IS NOT NULL AND rows_out < 0.5 * trailing_avg ORDER BY run_date;",walkthrough:"`ok` drops failed runs. The window `AVG(rows_out) OVER (PARTITION BY pipeline ORDER BY run_date ROWS BETWEEN 7 PRECEDING AND 1 PRECEDING)` averages the previous seven runs, excluding the current one, so each run has its own baseline. `rows_out < 0.5 * trailing_avg` flags the partial-file day.",orderMatters:!0,dpmConnection:{text:"A window *frame* (ROWS BETWEEN … PRECEDING) turns a per-run number into a per-run baseline. This is the volume check that catches 'success' on a 30% file, which no status column ever will.",kbSlug:"data-quality-dimensions"},hint:"rows_out < 0.5 * trailing_avg."},{slug:"sql-weekly-active",chapter:4,title:"Weekly active viewers",difficulty:"core",prompt:"Count **distinct viewers per week** of the *Sales Funnel Accelerator* dashboard. Bucket weeks with `strftime('%Y-%W', viewed_at)`. Return `week` and `active_viewers`, ordered by week.",starterQuery:`SELECT strftime('%Y-%W', viewed_at) AS week,
  -- distinct people, not rows
FROM dashboard_views
WHERE dashboard = 'Sales Funnel Accelerator'
GROUP BY week
ORDER BY week;`,solution:"SELECT strftime('%Y-%W', viewed_at) AS week, COUNT(DISTINCT viewer_id) AS active_viewers FROM dashboard_views WHERE dashboard = 'Sales Funnel Accelerator' GROUP BY week ORDER BY week;",walkthrough:"`strftime('%Y-%W', viewed_at)` buckets timestamps into ISO-style weeks. `COUNT(DISTINCT viewer_id)` counts people, not rows, so a user refreshing twenty times counts once. Filter to the new dashboard first.",orderMatters:!0,dpmConnection:{text:"COUNT(DISTINCT viewer_id), never COUNT(*): views measure activity, viewers measure adoption. Sofia's question was 'is anyone using it?', which is a question about people.",kbSlug:"go-to-market-launch"},hint:"COUNT(DISTINCT viewer_id) AS active_viewers."},{slug:"sql-adoption-by-role",chapter:4,title:"Adoption by role",difficulty:"core",prompt:"For the *Sales Funnel Accelerator*, report per `viewer_role`: `viewers` (distinct people), `views` (rows), and `views_per_viewer` (rounded to 1 decimal). Order by `viewers` descending, then role.",starterQuery:`SELECT viewer_role,
  COUNT(DISTINCT viewer_id) AS viewers,
  COUNT(*) AS views,
  -- views_per_viewer
FROM dashboard_views
WHERE dashboard = 'Sales Funnel Accelerator'
GROUP BY viewer_role
ORDER BY viewers DESC, viewer_role;`,solution:"SELECT viewer_role, COUNT(DISTINCT viewer_id) AS viewers, COUNT(*) AS views, ROUND(1.0 * COUNT(*) / COUNT(DISTINCT viewer_id), 1) AS views_per_viewer FROM dashboard_views WHERE dashboard = 'Sales Funnel Accelerator' GROUP BY viewer_role ORDER BY viewers DESC, viewer_role;",walkthrough:"Three aggregates per role: distinct people, raw views, and their ratio. `1.0 * COUNT(*) / COUNT(DISTINCT viewer_id)` keeps decimals. Ordering by viewers shows which audience adopted and which is missing.",orderMatters:!0,dpmConnection:{text:"Which audience is missing is more useful than how many views there are. A role with zero viewers (Finance, at Meridian) is next week's stakeholder conversation, not a failure of the dashboard.",kbSlug:"go-to-market-launch"},hint:"ROUND(1.0 * COUNT(*) / COUNT(DISTINCT viewer_id), 1)."},{slug:"sql-dashboard-mom",chapter:4,title:"Legacy vs. new dashboard, month over month (LAG)",difficulty:"advanced",prompt:"For each dashboard and month, report `views` and the change versus the previous month (`change_vs_prev`, NULL for the first month). Aggregate to months in a CTE first, then use `LAG(views) OVER (PARTITION BY dashboard ORDER BY month)`. Order by dashboard, month.",starterQuery:`WITH m AS (
  SELECT dashboard, substr(viewed_at, 1, 7) AS month, COUNT(*) AS views
  FROM dashboard_views
  GROUP BY dashboard, month
)
SELECT dashboard, month, views,
  -- views minus the previous month's views for the same dashboard
FROM m
ORDER BY dashboard, month;`,solution:"WITH m AS (SELECT dashboard, substr(viewed_at, 1, 7) AS month, COUNT(*) AS views FROM dashboard_views GROUP BY dashboard, month) SELECT dashboard, month, views, views - LAG(views) OVER (PARTITION BY dashboard ORDER BY month) AS change_vs_prev FROM m ORDER BY dashboard, month;",walkthrough:"Aggregate first: the CTE `m` makes one row per dashboard-month. Then `LAG(views) OVER (PARTITION BY dashboard ORDER BY month)` reads the previous month *within the same dashboard*; subtracting gives the change. The first month has no previous row, so it's NULL.",orderMatters:!0,dpmConnection:{text:"Grain first (one row per dashboard-month), window second. The story in the output, legacy fading while the new product grows, is the evidence that lets you retire the old report with a redirect instead of a memo.",kbSlug:"sql-toolkit-for-data-pms"},hint:"views - LAG(views) OVER (PARTITION BY dashboard ORDER BY month) AS change_vs_prev."},{slug:"sql-rca-confirm",chapter:5,title:"Step 1: is the drop real?",difficulty:"core",prompt:"Before slicing, remove the open-deal artifact. Compute conversion (won ÷ resolved) by **created-month cohort**, using only **resolved** deals created on or before `2026-06-30`.\n\nReturn `cohort_month`, `resolved`, `conversion_rate` (4 decimals), ordered by month.",starterQuery:`SELECT substr(created_date, 1, 7) AS cohort_month,
  COUNT(*) AS resolved,
  ROUND(1.0 * SUM(stage = 'closed_won') / COUNT(*), 4) AS conversion_rate
FROM deals
WHERE stage IN ('closed_won', 'closed_lost')
  AND created_date <= '2026-06-30'
GROUP BY cohort_month
ORDER BY cohort_month;`,solution:"SELECT substr(created_date, 1, 7) AS cohort_month, COUNT(*) AS resolved, ROUND(1.0 * SUM(stage = 'closed_won') / COUNT(*), 4) AS conversion_rate FROM deals WHERE stage IN ('closed_won', 'closed_lost') AND created_date <= '2026-06-30' GROUP BY cohort_month ORDER BY cohort_month;",walkthrough:"Two filters remove the artifact: resolved deals only, and cohorts created on or before 30 June so they've had time to close. Then the chapter-1 conversion formula per `cohort_month`. If May and June still look low here, the drop is real.",orderMatters:!0,dpmConnection:{text:"The first RCA step is proving the number is real, not an artifact of cohorts that haven't had time to close. May and June should still look low after this filter. If they didn't, the meeting would be over.",kbSlug:"funnel-conversion-analysis"},hint:"The starter is complete. Compare with the unfiltered cohort query from chapter 2."},{slug:"sql-rca-segment",chapter:5,title:"Step 2: which segment moved? (region × source, before vs. during)",difficulty:"advanced",prompt:"Compare conversion for deals created **before May** (`created_date < '2026-05-01'`) with deals created **May–June**, for every `region` × `source` cell. Resolved deals only, created on or before `2026-06-30`.\n\nReturn `region`, `source`, `conv_before`, `conv_during` (both rounded to 2 decimals), `deals_during`. Order by region, source.",starterQuery:`WITH r AS (
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
ORDER BY region, source;`,solution:"WITH r AS (SELECT d.stage, d.source, a.region, CASE WHEN d.created_date < '2026-05-01' THEN 'before' ELSE 'during' END AS period FROM deals d JOIN accounts a ON a.account_id = d.account_id WHERE d.stage IN ('closed_won', 'closed_lost') AND d.created_date <= '2026-06-30') SELECT region, source, ROUND(1.0 * SUM(period = 'before' AND stage = 'closed_won') / SUM(period = 'before'), 2) AS conv_before, ROUND(1.0 * SUM(period = 'during' AND stage = 'closed_won') / SUM(period = 'during'), 2) AS conv_during, SUM(period = 'during') AS deals_during FROM r GROUP BY region, source ORDER BY region, source;",walkthrough:"The CTE `r` joins region onto deals and labels each deal `before` or `during` by created date. Conditional sums do the rest: `SUM(period = 'before' AND stage = 'closed_won') / SUM(period = 'before')` is the before-rate, and likewise for during. `GROUP BY region, source` yields one row per cell.",orderMatters:!0,dpmConnection:{text:"One query, nine cells, and only one of them collapses. A price increase would depress every cell; a vendor change for AMER outbound leads depresses exactly one. This is how the tree kills theories cheaply.",kbSlug:"funnel-conversion-analysis"},hint:"Mirror conv_before with period = 'during'; deals_during is SUM(period = 'during')."},{slug:"sql-rca-velocity",chapter:5,title:"Step 3: where in the funnel? (negotiation time, before vs. during)",difficulty:"advanced",prompt:"In the AMER × Outbound segment, compare average days spent in **negotiation** for deals created before May versus May–June (created on or before `2026-06-30`).\n\nReuse the LEAD-based `steps` CTE from chapter 2. Return `period`, `avg_days_in_negotiation` (1 decimal), `deals`, ordered by period.",starterQuery:`WITH h AS (
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
ORDER BY seg.period;`,solution:"WITH h AS (SELECT DISTINCT deal_id, stage, entered_at FROM deal_stage_history), steps AS (SELECT deal_id, stage, julianday(LEAD(entered_at) OVER (PARTITION BY deal_id ORDER BY entered_at)) - julianday(entered_at) AS days FROM h), seg AS (SELECT d.deal_id, CASE WHEN d.created_date < '2026-05-01' THEN 'before' ELSE 'during' END AS period FROM deals d JOIN accounts a ON a.account_id = d.account_id WHERE a.region = 'AMER' AND d.source = 'Outbound' AND d.created_date <= '2026-06-30') SELECT seg.period, ROUND(AVG(steps.days), 1) AS avg_days_in_negotiation, COUNT(*) AS deals FROM steps JOIN seg ON seg.deal_id = steps.deal_id WHERE steps.stage = 'negotiation' AND steps.days IS NOT NULL GROUP BY seg.period ORDER BY seg.period;",walkthrough:"`steps` is the chapter-2 LEAD-based time-in-stage. `seg` picks AMER × Outbound deals and labels the period. Joining them and keeping `stage = 'negotiation'` isolates that stage; `AVG(days)` per period shows how much longer the affected deals sat there.",orderMatters:!0,dpmConnection:{text:"Deals still reach negotiation, then stall and die. Late-funnel losses with longer negotiation point at lead quality, not at reps' data hygiene. Three CTEs, each named for what it produces, is how a Data PM keeps a query like this readable in a meeting.",kbSlug:"funnel-conversion-analysis"},hint:"The starter is complete. Change the region/source filter to see that other segments did not change."},{slug:"sql-rca-size",chapter:5,title:"Step 4: size it",difficulty:"core",prompt:"Sofia needs a number. For AMER × Outbound deals created May–June 2026 that were **closed_lost**, return `owner`, `lost_deals`, `lost_value`, ordered by `lost_value` descending.",starterQuery:`SELECT d.owner, COUNT(*) AS lost_deals, SUM(d.amount) AS lost_value
FROM deals d
JOIN accounts a ON a.account_id = d.account_id
WHERE a.region = 'AMER' AND d.source = 'Outbound'
  AND d.stage = 'closed_lost'
  AND d.created_date BETWEEN '2026-05-01' AND '2026-06-30'
GROUP BY d.owner
ORDER BY lost_value DESC;`,solution:"SELECT d.owner, COUNT(*) AS lost_deals, SUM(d.amount) AS lost_value FROM deals d JOIN accounts a ON a.account_id = d.account_id WHERE a.region = 'AMER' AND d.source = 'Outbound' AND d.stage = 'closed_lost' AND d.created_date BETWEEN '2026-05-01' AND '2026-06-30' GROUP BY d.owner ORDER BY lost_value DESC;",walkthrough:"A plain filtered aggregate: the segment (region, source), the outcome (`closed_lost`), and the window (`created_date BETWEEN` May 1 and June 30). `GROUP BY d.owner` splits the loss by rep; SUM and COUNT size it in dollars and deals.",orderMatters:!0,dpmConnection:{text:"Root cause work ends with a size and an owner, not a chart. This is the slide: cause, deals and dollars affected, alternatives ruled out, proposed fix.",kbSlug:"proof-of-value-performance"},hint:"The starter is complete. Try removing the region/source filter to see how much of total May–June loss this segment explains."},{slug:"sql-reconcile-bookings-revenue",chapter:6,title:"Bookings vs. revenue by month",difficulty:"advanced",prompt:"Tomás has two numbers. Put them side by side per month:\n\n- `bookings` = sum of `amount` for `closed_won` deals by `closed_date` month (skip NULL dates)\n- `revenue` = sum of `transactions.amount` by `transaction_date` month\n\nSome months exist in only one side, so build a `months` CTE with `UNION` and LEFT JOIN both. Return `month`, `bookings`, `revenue`, `difference` (revenue − bookings; use COALESCE so missing months show 0). Order by month.",starterQuery:`WITH b AS (
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
ORDER BY m.month;`,solution:"WITH b AS (SELECT substr(closed_date, 1, 7) AS month, SUM(amount) AS bookings FROM deals WHERE stage = 'closed_won' AND closed_date IS NOT NULL GROUP BY month), r AS (SELECT substr(transaction_date, 1, 7) AS month, SUM(amount) AS revenue FROM transactions GROUP BY month), months AS (SELECT month FROM b UNION SELECT month FROM r) SELECT m.month, COALESCE(b.bookings, 0) AS bookings, COALESCE(r.revenue, 0) AS revenue, COALESCE(r.revenue, 0) - COALESCE(b.bookings, 0) AS difference FROM months m LEFT JOIN b ON b.month = m.month LEFT JOIN r ON r.month = m.month ORDER BY m.month;",walkthrough:"`b` sums bookings by close month, `r` sums transactions by transaction month. `months` is the UNION of both key sets, so no month is lost. LEFT JOINing both onto `months` and wrapping in `COALESCE(..., 0)` lets you subtract even when one side is missing.",orderMatters:!0,dpmConnection:{text:"Neither number is wrong. Bookings is what Sales books; revenue is what Finance collects. The reconciliation is the bridge on the board slide, and the SQL pattern (UNION of keys, LEFT JOIN both sides) is how you compare any two metrics that should agree.",kbSlug:"ontology-as-infrastructure"},hint:"COALESCE(r.revenue, 0) - COALESCE(b.bookings, 0) AS difference."},{slug:"sql-revenue-bridge",chapter:6,title:"Explain the gap: revenue bridge",difficulty:"advanced",prompt:"Break `transactions` into buckets that explain the bookings-vs-revenue gap: `initial`, `renewal`, `upsell`, and `duplicate` (the extra copies you found in chapter 3).\n\nUse `ROW_NUMBER() OVER (PARTITION BY deal_id, amount, transaction_date, type ORDER BY transaction_id)`; rows with `rn > 1` are duplicates. Return `bucket`, `transactions`, `amount`, ordered by `amount` descending.",starterQuery:`WITH ranked AS (
  SELECT *,
    ROW_NUMBER() OVER (PARTITION BY deal_id, amount, transaction_date, type ORDER BY transaction_id) AS rn
  FROM transactions
)
SELECT CASE WHEN rn > 1 THEN 'duplicate' ELSE type END AS bucket,
  COUNT(*) AS transactions,
  SUM(amount) AS amount
FROM ranked
GROUP BY bucket
ORDER BY amount DESC;`,solution:"WITH ranked AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY deal_id, amount, transaction_date, type ORDER BY transaction_id) AS rn FROM transactions) SELECT CASE WHEN rn > 1 THEN 'duplicate' ELSE type END AS bucket, COUNT(*) AS transactions, SUM(amount) AS amount FROM ranked GROUP BY bucket ORDER BY amount DESC;",walkthrough:"`ROW_NUMBER() OVER (PARTITION BY deal_id, amount, transaction_date, type ORDER BY transaction_id)` gives the first copy of each payment rn = 1 and any extra copies rn > 1. The CASE relabels those extras `duplicate`; the rest keep their type. Grouping by that bucket produces the bridge.",orderMatters:!0,dpmConnection:{text:"Every dollar of the difference now has a name. 'Initial' should reconcile to bookings; renewals and upsells are the healthy part of the gap; duplicates are the part you remove. This is the bridge the CFO puts under the two numbers.",kbSlug:"ontology-as-infrastructure"},hint:"The starter is complete. Compare the initial bucket with total bookings from the previous exercise."},{slug:"sql-running-revenue",chapter:6,title:"Running revenue total",difficulty:"advanced",prompt:"Compute monthly revenue from `transactions` and a **running total** across months. Aggregate to months in a CTE first, then `SUM(revenue) OVER (ORDER BY month)`. Return `month`, `revenue`, `running_total`, ordered by month.",starterQuery:`WITH m AS (
  SELECT substr(transaction_date, 1, 7) AS month, SUM(amount) AS revenue
  FROM transactions
  GROUP BY month
)
SELECT month, revenue,
  -- running_total
FROM m
ORDER BY month;`,solution:"WITH m AS (SELECT substr(transaction_date, 1, 7) AS month, SUM(amount) AS revenue FROM transactions GROUP BY month) SELECT month, revenue, SUM(revenue) OVER (ORDER BY month) AS running_total FROM m ORDER BY month;",walkthrough:"The CTE `m` aggregates to one row per month first. `SUM(revenue) OVER (ORDER BY month)` then accumulates month by month. Without the CTE the window would step up on every transaction row and the intermediate points would be wrong.",orderMatters:!0,dpmConnection:{text:"Grain first, window second. Skip the CTE and the running total steps up on every transaction row instead of every month. This query becomes Meridian's first gold metric with a written definition, a test, and an SLO.",kbSlug:"sql-toolkit-for-data-pms"},hint:"SUM(revenue) OVER (ORDER BY month) AS running_total."},{slug:"sql-capstone-metric-tree",chapter:6,title:"Capstone: the whole metric tree, one query",difficulty:"advanced",prompt:"For the months `2026-06`, `2026-07`, `2026-08`, produce the metric tree in one result:\n\n- `revenue_generated`: transactions by `transaction_date` month\n- `deals_closed_value`: won amount by `closed_date` month\n- `conversion_rate`: won ÷ (won + lost) among deals **closed** in that month (4 decimals)\n\nTwo CTEs (`rev`, `closed`) joined on month. Return `month`, `revenue_generated`, `deals_closed_value`, `conversion_rate`, ordered by month.",starterQuery:`WITH rev AS (
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
ORDER BY c.month;`,solution:"WITH rev AS (SELECT substr(transaction_date, 1, 7) AS month, SUM(amount) AS revenue_generated FROM transactions GROUP BY month), closed AS (SELECT substr(closed_date, 1, 7) AS month, SUM(CASE WHEN stage = 'closed_won' THEN amount ELSE 0 END) AS deals_closed_value, ROUND(1.0 * SUM(stage = 'closed_won') / COUNT(*), 4) AS conversion_rate FROM deals WHERE closed_date IS NOT NULL AND stage IN ('closed_won', 'closed_lost') GROUP BY month) SELECT c.month, COALESCE(r.revenue_generated, 0) AS revenue_generated, c.deals_closed_value, c.conversion_rate FROM closed c LEFT JOIN rev r ON r.month = c.month WHERE c.month IN ('2026-06', '2026-07', '2026-08') ORDER BY c.month;",walkthrough:"`rev` groups transactions by month; `closed` groups closed deals by close month, computing won value and the win rate among deals closed that month. They're joined on `month` (LEFT, with COALESCE) and filtered to the three months requested: North Star, functional, granular in one result.",orderMatters:!0,dpmConnection:{text:"North Star, functional, granular: one definition each, one query, one owner. Six weeks ago these were three arguments. Now they are a semantic contract that a dashboard, a finance analyst, and an AI agent can all read the same way.",kbSlug:"metric-types"},hint:"The starter is complete. Notice conversion here is by *closed* month, not created cohort: a different, equally valid cut. Name it accordingly on the tree."}];e.s(["sqlExercises",0,a,"sqlExercisesForChapter",0,function(e){return a.filter(t=>t.chapter===e)}])},87110,e=>{"use strict";let t=[{slug:"what-is-a-data-product-manager",title:"What is a Data Product Manager?",category:"definition",tags:["role","fundamentals"],summary:"A DPM sits at the intersection of data, technology, and business, managing data warehouses, platforms, pipelines, and ML models the way a PM manages a product.",body:`A **Data Product Manager (DPM)** is a specialized role at the intersection of
**data, technology, and business**. Where a traditional PM manages the
lifecycle of a physical or software product, a DPM manages *data products*:
data warehouses, data platforms, analytics tools, data pipelines, or ML
models.

## Overlap with traditional PM
Both roles own product vision, roadmap, stakeholder expectations, and the
overall product lifecycle.

## Where it diverges
- Traditional PMs lean more on UX/UI and go-to-market/marketing execution.
- DPMs lean more technical and data-specific — though this varies: a DPM
  acting as a data broker needs strong market/launch skills, and a DPM
  building analytics products may need real UX/UI chops.

## Four key shifts nobody talks about
| | General PM | Data PM |
|---|---|---|
| **Risk profile** | Ship (potentially) buggy code, push a fix | Ship bad data, lose trust — often for good |
| **Success metrics** | Usage, engagement, retention | Data quality, decision velocity, trust signals |
| **Customer journey** | "Wow, this is great!" | "I don't trust this yet… but maybe…" |
| **Team dynamic** | "When can we ship?" | "How do we validate?" |

The throughline: a Data PM's core job is **earning and protecting trust** in
the data, not just shipping features.

## DPM vs. the roles it gets confused with
| | Data Product Manager | The other role |
|---|---|---|
| **vs. Data Scientist / Analyst** | The strategic *what* and *why*: defines the vision for the data, creates reliable, well-structured data assets, makes analysis possible in the first place | The analytical *how*: the primary consumer of data products, analyzes data to extract insights, focuses on the specifics of a given analysis |
| **vs. Data Engineer** | Defines the requirements: partners with engineering, decides what infrastructure needs to exist, prioritizes the engineering backlog | Builds the infrastructure: the primary builder of data systems, constructs pipelines and storage, implements the technical requirements |
| **vs. Data Manager** | Strategic value creation: leverages data for new value, solves business problems with data products, drives tangible outcomes | Technical and operational oversight: administers systems, manages storage and maintenance, ensures operational compliance |

A useful test: the analyst asks *what does the data say?*, the engineer asks
*how do we move and store it?*, the data manager asks *is it maintained and
compliant?*, and the Data PM asks *which data product should exist, for
whom, and how will we know it's trusted?*`,source:"PRD - Data Product Management.pdf; role comparison from the user's notes."},{slug:"four-key-shifts",title:"The Four Key Shifts (Data PM vs. General PM)",category:"framework",tags:["role","mindset"],summary:"Risk profile, success metrics, customer journey, and team dynamic all invert when you move from general PM to data PM.",body:`Four dimensions where Data Product Management inverts the general-PM
playbook:

1. **Risk profile** — a buggy feature is recoverable; bad data that reaches
   a dashboard or a decision can burn trust permanently.
2. **Success metrics** — usage/engagement/retention give way to data
   quality, decision velocity, and trust signals (do people actually act on
   the number?).
3. **Customer journey** — delight is not the opening emotion. Skepticism
   is. The arc is "I don't trust this yet… but maybe."
4. **Team dynamic** — the team's default question shifts from "when can we
   ship?" to "how do we validate?"

**Practice angle:** every stakeholder-simulation or RCA exercise in this
tool should implicitly test whether you're optimizing for the data-PM
version of these four dimensions, not the general-PM one.`,source:"PRD - Data Product Management.pdf"},{slug:"medallion-architecture",title:"Medallion Architecture: Bronze, Silver, Gold",category:"definition",tags:["data-engineering","architecture"],summary:"A three-layer pattern for structuring a data lakehouse: raw ingestion (Bronze), cleaned/augmented (Silver), business-level aggregates (Gold).",body:`A layered pattern (popularized by the lakehouse architecture) for organizing
data as it moves from raw capture to business-ready:

- **Bronze** — raw ingestion. Data as it arrived (Kafka, Kinesis, CSV/JSON
  files, a data lake), largely untouched.
- **Silver** — filtered, cleaned, augmented. Deduplicated, typed, joined
  with reference data — usable but not yet aggregated for a specific
  business question.
- **Gold** — business-level aggregates. The layer that actually feeds
  streaming analytics, AI, and reporting; this is typically where a data
  product's **output ports** read from.

**Why a DPM needs this:** it's the shared vocabulary for talking to data
engineers about *where* a metric or feature actually lives, and for
reasoning about root cause — a broken metric is often a Silver-layer
transform problem, not a Gold-layer aggregation problem.`,source:"PRD - Data Product Management.pdf; Big Book of Data Science"},{slug:"data-product-maturity-stages",title:"Data Product Journey: Four Maturity Stages",category:"framework",tags:["strategy","maturity"],summary:"Most orgs sit in Ad-hoc or Reactive. The goal is Purpose-Driven: initiatives measured by clear North Star, functional, and granular metrics.",body:`A simple maturity ladder for where a data org sits:

1. **Ad-hoc** — infrastructure-less data initiatives, no repeatable process.
2. **Reactive** — tools & pipelines built as requests arrive; the default
   state for most orgs.
3. **Strategy-driven** — more than reacting, but often chasing hype cycles
   (a GenAI integration, a big migration) without a concrete bridge to
   actual end users.
4. **Purpose-driven** — true data product initiatives tied to specific
   business purposes, measured by clear North Star / functional / granular
   metrics.

Most organizations are in Reactive, occasionally Strategy-driven. The whole
point of a 6-week proof-of-value is to demonstrate what Purpose-driven looks
like on one narrow slice, not to boil the ocean.`,source:"6-Week Data Products Product Playbook.pdf"},{slug:"metric-types",title:"North Star, Functional, and Granular Metrics",category:"definition",tags:["metrics","measurement"],summary:"North Star = the domain's leading business metric. Functional = the leading metric for a sub-area. Granular = an indicator of effectiveness.",body:`Every data product needs a metric hierarchy, not a single number:

- **North Star metric** — the domain's leading metric, tied directly to
  business outcomes. *Example (Sales): \`revenue_generated\`.*
- **Functional metric** — the leading metric for a specific function/domain
  within that. *Example: \`#deals_closed_value\`.*
- **Granular metric** — an indicator of effectiveness, usually a rate or
  ratio that explains *why* the functional metric moved. *Example:
  \`conversion_rate\`.*

These three sit in a **Metric Dependency Tree (MDT)**: granular metrics
roll up into functional metrics, which roll up into the North Star. This is
what makes root-cause analysis tractable — you can walk down the tree from
"revenue dropped" to the specific granular metric that explains it.`,source:"6-Week Data Products Product Playbook.pdf"},{slug:"bullseye-data-product-market-fit",title:"The Bullseye: Data Product-Market Fit (Week 1)",category:"framework",tags:["playbook","discovery","week-1"],summary:"Before building anything: retrieve requirements from real end users, map their existing journey, and identify North Star/functional/granular metrics.",body:`**Week 1 of the 6-week playbook.** The first and most critical stage:
prove there's a real business purpose before you build anything.

1. **Retrieve requirements** — interview end users directly; capture raw
   pain points as a list or chart of associated questions.
2. **Map the existing user journey** — how, where, and why they currently
   consume data.
3. **Align on data's new purpose (value prop)** — draft an MVP problem
   statement from the user's pain points.
4. **Identify metrics** — North Star, functional, and granular (see
   [[metric-types]]), and how they associate with each other.

Key questions to answer in week 1: What are the user's pain points? What
value can the data bring to close the gaps? Which persona benefits most?
Are there domain-specific data quality/compliance requirements? How engaged
is domain leadership, really?

Spend **at least one full week** here. Pick metrics that are directly
useful to leadership — this is a proof of value, not a full rollout.`,source:"6-Week Data Products Product Playbook.pdf"},{slug:"canvas-data-product-design",title:"The Canvas: Data Product Design (Week 2)",category:"framework",tags:["playbook","modeling","week-2"],summary:"Build a Metric Dependency Tree and the logical data model (entities, dimensions, measures, relationships, SLOs, semantics) that powers it.",body:`**Week 2.** The first real touchpoint between humans and technology.

1. **Create a Metric Dependency Tree (MDT)** — with a domain analyst,
   define each metric's logic (formula), associations, and semantics
   (naming, description, synonyms, tags).
2. **Create a logical data model to power the MDT** — this doubles as your
   Data Product Prototype. It has five parts:
   - **Entities** — core business objects (accounts, transactions,
     customers, deals).
   - **Dimensions** — attributes on those entities (purchase_date,
     last_contacted).
   - **Measures** — quantified/aggregated dimensions (avg, count, sum).
   - **Relationships** — associations between entities (1:N customers →
     transactions).
   - **SLOs** — data quality / access conditions.
3. **Plug into the MDT** — wire measures and dimensions into the metric
   formula (\`metric = measures \xd7 dimensions\`).
4. **Iterate logic** with stakeholders to validate the model.
5. **Validate the prototype** against realistic dummy data before touching
   production data.`,source:"6-Week Data Products Product Playbook.pdf"},{slug:"data-product-activation",title:"Activation: Input Ports, Transforms, Output Ports, SLOs (Week 3)",category:"framework",tags:["playbook","engineering","week-3"],summary:"A data product activates once four pieces exist: input ports, transformation steps, output ports, and SLOs — ideally declared, not hand-built.",body:`**Week 3.** Activating the logical model means assembling four pieces:

1. **Input ports** — where data enters, from source systems.
2. **Transformation steps** — the logic that turns raw input into the
   model's measures/dimensions.
3. **Output ports** — where consumers read the result (often a Gold-layer
   table; see [[medallion-architecture]]).
4. **SLOs** — quality and governance conditions on the pipeline.

Without a self-service layer, these four "simple" pieces become hundreds of
sub-pieces: credential management, workflow/service configuration from
scratch, tool integration, and transformations only a few senior engineers
understand. A good self-serve platform lets an analytics engineer just
declare input/output locations and transform steps in a spec file (e.g.
YAML) and get ready-to-use workflows, monitors, and connectors for free.`,source:"6-Week Data Products Product Playbook.pdf"},{slug:"self-service-infrastructure",title:"Self-Service Infrastructure (SSI)",category:"framework",tags:["platform","data-mesh"],summary:"Ready-to-use resources (policy, monitor, workflow, contract, service, secret, compute) that let engineers declare intent instead of building plumbing from scratch.",body:`**Self-service** means business/data teams get ready-to-use resources
instead of building plumbing themselves. An analytics engineer declares
input/output locations and transform steps; the self-serve infrastructure
(SSI) supplies workflows, services, secrets, connectors, and monitors.

Reported impact of a good self-serve layer (industry-reported ranges, not
guarantees): ~90% reduction in time to implement new use cases, ~50%
reduction in governance/data-quality risk, ~30% reduction in total cost of
ownership.

SSI is one of the four pillars of a data mesh organization (alongside
domain ownership, federated governance, and product thinking) — it's what
makes domain ownership *affordable* instead of "spin up a new team for
every domain."`,source:"6-Week Data Products Product Playbook.pdf"},{slug:"go-to-market-launch",title:"The Launch: Go-to-Market for a Data Product (Week 4)",category:"framework",tags:["playbook","adoption","week-4"],summary:"A data product with no adoption strategy fails like any other product. Position it in the user's language, and make usage effortless.",body:`**Week 4.** A data product without a concrete adoption strategy fails, same
as any other product.

- **Positioning** — speak the language of the domain; use the rich
  semantics from your semantic model as your pitch. Share concrete
  use-case insights: boosting a metric, running RCA on a metric, or
  detecting a low-yielding initiative.
- **Increasing usage** — native accessibility (work with the tools the
  user already uses), custom builders for new tools/APIs they adopt,
  accessible documentation (a git repo of templates/samples/case studies),
  a product FAQ, and support.
- **Downstream updates** — a streamlined, standard way to notify
  downstream consumers when something changes.
- **Adoption boosters** — reviews, and usage metrics on the most-used
  assets/pipelines.`,source:"6-Week Data Products Product Playbook.pdf"},{slug:"proof-of-value-performance",title:"The Proof: Product Performance (Weeks 5–6)",category:"framework",tags:["playbook","measurement","week-5-6"],summary:"Post-launch is where you spend the most effort: usage metrics, A/B tests, and feedback loops that evolve the SLO model and expand use cases.",body:`**Weeks 5–6.** Assign the *highest* proportion of the exercise to
post-launch and adoption — this is where you learn how real users actually
interact with the product.

- **Usage metrics** — impact and usage together. Is high usage justified?
  Should resources be optimized/de-provisioned? Is autoscaling working?
- **A/B tests** — run experiments across user segments to find the
  optimized path or feature.
- **Feedback loops** — without them, data efforts stay disorganized and
  disconnected from business impact. This is what closes the loop back to
  every earlier stage.
- **Evolution** — SLO evolution (better SLOs as you learn the real gaps)
  and use-case expansion (a data product is a hub — new use cases plug
  into the same metric tree).`,source:"6-Week Data Products Product Playbook.pdf"},{slug:"ontology-as-infrastructure",title:"Ontology as Operational Infrastructure for AI Agents",category:"industry-context",tags:["ontology","ai-agents","2026"],summary:"As LLM agents act autonomously, the ambiguity humans used to resolve silently (what is 'revenue'? what is a 'customer'?) becomes a hard failure point.",body:`Enterprises ran for years without formal ontologies because meaning was
**localized** — each system encoded its own definition of "customer,"
"policy," or "contract," often in application logic or people's heads.

Autonomous AI agents remove the human who used to silently resolve that
ambiguity. Is "revenue" GAAP-recognized or bookings? Is "customer" the CRM
record or the billing record? Every agent without a shared semantic
structure just picks whichever definition it encounters first — and at
scale, that guess compounds into a liability, not a rounding error.

**Industry signal (Q2 2026):** 80% of surveyed leaders rank a semantic
layer with standardized definitions as the *most* important enabler of AI
— ahead of the AI tooling itself. The framing that's sticking: a data
product is "built once, and agents consume forever," replacing agents that
rebuild context from scratch on every query.`,source:"State of Data Products, Q2 2026 (Modern Data 101)."},{slug:"agent-observability-gap",title:"Agent Observability ≠ Agent Correctness",category:"industry-context",tags:["ai-agents","observability","2026"],summary:"Most teams running AI agents have monitoring (did it run?) but not evaluation (was it right?) — and standard software testing assumptions don't hold for agents.",body:`Monitoring tells you an agent ran. It does not tell you whether it
**reasoned well**. As of Q2 2026, industry surveys report 89% of teams
running AI agents have observability tooling, but only 52% have evaluation
frameworks.

Why normal software testing breaks down for agents: it assumes
determinism (same input → same output). Agents don't hold that property —
the same task can complete through multiple valid tool-call paths, and an
agent can produce a plausible-looking output through a completely broken
reasoning path that no dashboard flags.

Three observability primitives most production teams are missing: trace
IDs that follow an agent thread end-to-end, per-tool-call token budgets,
and semantic assertion layers that validate outputs *before* they reach a
user (not just log the request/response pair).

**Takeaway for a DPM:** the fix is upstream — in the semantic
infrastructure, data contracts, and governance rules that define "correct"
before the agent runs — not just in a dashboard that reports what already
happened.`,source:"State of Data Products, Q2 2026 (Modern Data 101)."},{slug:"lean-ai-cost-economics",title:"Lean AI: Matching Model Size to Task Difficulty",category:"industry-context",tags:["cost","llm-economics","2026"],summary:"Small language models can be ~100x cheaper than large ones per conversation; mature teams route by difficulty rather than defaulting to the biggest model.",body:`Per-token pricing looks fine at demo scale and gets expensive fast at real
scale. As of Q2 2026, industry figures put processing one million
conversations through a large frontier model at roughly **$15,000–$75,000**,
versus **$150–$800** through a small model — a swing of roughly 100x.

The framing that's replacing the "small vs. large" debate: **narrow AI**
(small, task-specific, embedded in a disciplined data platform) for the
high-volume, well-defined slice of work, reserving **big AI** (general
frontier models) for the harder, open-ended fraction that actually needs
that range. The Toyota Production System parallel being used in the
industry: the goal isn't a smaller model, it's producing more value with
fewer resources without sacrificing quality — the same question Taiichi
Ohno asked of manufacturing waste seventy years earlier.

**Takeaway for a DPM:** cost-per-outcome, not raw capability, is
increasingly the metric a board wants — treat model choice as a
product-tiering decision, not a one-time technical pick.`,source:"State of Data Products, Q2 2026 (Modern Data 101)."},{slug:"oee-manufacturing-case-study",title:"Case Study: Multi-Factory OEE & KPI Monitoring",category:"case-study",tags:["manufacturing","real-time","case-study"],summary:"OEE = Availability × Efficiency × Quality. Legacy/manual OEE computation breaks at multi-factory scale; a medallion pipeline fixes latency and drill-down.",body:`**Overall Equipment Effectiveness (OEE)** is the standard metric for
manufacturing equipment productivity:

\`\`\`
OEE = Machine Availability \xd7 Process Efficiency \xd7 Product Quality
\`\`\`

An OEE of 85%+ is considered world-leading; most manufacturers land at
40–60%; below 40% is low. Different teams use it differently — shop floor
teams use it to find lagging processes, executives use aggregates to judge
overall performance and justify capital investment (ROIC).

**The problem:** OEE computation was traditionally manual. At multi-factory
scale, that breaks two things at once — freshness (information needs to
flow continuously with minimal latency) and consistency (every stakeholder
needs to work off the *same* numbers, with the ability to drill into an OEE
drift).

**The pattern:** incrementally ingest sensor/IoT data → clean and extract
the needed fields → integrate workforce data from ERP systems → merge and
aggregate in real time over a temporal window → surface KPIs. This maps
directly onto [[medallion-architecture]]: Bronze (raw sensor ingestion),
Silver (cleaned, joined with ERP data), Gold (the aggregated OEE/KPI layer
that feeds dashboards).

**RCA angle:** when a reported OEE number looks wrong, the first question
is *which factor* moved — availability, efficiency, or quality — and
whether the drift is a real operational issue or a broken upstream
transform.`,source:"The Big Book of Data Science Use Cases, 2nd Edition (Databricks)."},{slug:"data-quality-dimensions",title:"Data Quality Dimensions (and how to write an SLO)",category:"framework",tags:["data-quality","slo","week-3"],summary:"Six dimensions — completeness, uniqueness, timeliness, consistency, validity, accuracy — each becomes an SLO once you name the measurement, threshold, and check time.",body:`A data product's SLOs are promises about the data, not about the pipeline.
The classic six dimensions give you the vocabulary:

| Dimension | Question | Example SLO at Meridian |
|---|---|---|
| **Completeness** | Are required values present? | 100% of closed deals have a \`closed_date\` |
| **Uniqueness** | Is each real-world event recorded once? | No two transactions share (deal, amount, date) |
| **Timeliness** (freshness) | Is the data recent enough? | Latest successful \`deals\` load < 24h old at 09:00 |
| **Consistency** | Do two representations agree? | \`deals.stage\` equals the latest \`deal_stage_history\` row |
| **Validity** | Do values conform to rules? | \`stage\` ∈ the six allowed values; \`amount\` > 0 |
| **Accuracy** | Does the value match reality? | Bookings reconcile to signed contracts (sampled) |

## Writing an SLO that can actually be checked
An SLO has three parts: the **measurement** (a query), the **threshold**, and
**when** it is evaluated. "The pipeline runs at 02:00" is a schedule. "The
latest successful run is never more than 24 hours old at 09:00, measured
from \`pipeline_runs\`" is an SLO.

## Why "success" is not enough
A run can succeed and still ingest a partial file (row count drops 70%),
re-ingest yesterday's file (duplicates), or land on time with stale
upstream data. Every one of those is invisible to a status column and
visible to a data check. That's the difference between *pipeline
observability* (did it run?) and *data quality* (is it right?).`,source:"Synthesized for DPM Lab from common data-quality practice; ties to the Playbook's Activation week."},{slug:"funnel-conversion-analysis",title:"Funnel Analysis: Overall vs. Stage-to-Stage, Cohorts, Velocity",category:"framework",tags:["metrics","funnel","rca","week-2","week-5"],summary:"Three different funnel questions need three different queries: overall conversion (by cohort), stage-to-stage conversion (from the history log), and time in stage (velocity).",body:`"Conversion rate" hides three questions. A Data PM keeps them apart.

## 1. Overall conversion — *did it close?*
\`won \xf7 (won + lost)\` on **resolved** deals. Report it by **created-month
cohort**, because recent cohorts haven't had time to close and will always
look worse at the right edge of the chart. Excluding open deals is the
first thing to do before believing any drop.

## 2. Stage-to-stage conversion — *where do they drop?*
Needs the **append-only history**, not the current stage. For each stage,
count distinct deals that *ever entered* it; the ratio between consecutive
stages is the drop-off. A deal that skipped a stage simply never appears in
it.

## 3. Velocity — *where do they stall?*
Days between consecutive history rows for the same deal, i.e.
\`LEAD(entered_at) OVER (PARTITION BY deal_id ORDER BY entered_at)\`. A
stage whose duration doubles is a stronger RCA signal than a rate that
wobbles.

## Using the three together (the RCA walk)
1. Confirm the drop is real on resolved, mature cohorts.
2. Slice overall conversion by one dimension at a time (region, source,
   rep, tier). A cause that touches everything (a price increase) can't
   explain a change in one cell.
3. In the affected cell, look at stage-to-stage and velocity to see
   *where* in the funnel the loss happens. Late-funnel losses with longer
   negotiation usually mean lead quality; early losses mean targeting.`,source:"Synthesized for DPM Lab; builds on the Playbook's Metric Dependency Tree."},{slug:"sql-toolkit-for-data-pms",title:"The SQL a Data PM Actually Uses",category:"definition",tags:["sql","skills"],summary:"CTEs for readable steps, window functions for per-row context, date bucketing for trends, and the four bugs that silently corrupt metrics.",body:"You are not writing production pipelines. You are verifying numbers,\nsizing problems, and reading other people's queries. That needs a small,\nsharp toolkit.\n\n## Shapes you'll write every week\n- **CTEs** (`WITH x AS (...)`) — one step per CTE, named after what it\n  produces (`resolved_deals`, `latest_stage`). Readable beats clever.\n- **Window functions** — `ROW_NUMBER() OVER (PARTITION BY deal_id ORDER BY\n  entered_at DESC)` for \"latest per entity\"; `LAG`/`LEAD` for change\n  between rows; `SUM(...) OVER (ORDER BY month)` for running totals;\n  `AVG(...) OVER (... ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)` for moving\n  averages.\n- **Date bucketing** — `substr(date, 1, 7)` for month, `strftime('%Y-%W',\n  ts)` for ISO-ish week, `julianday(b) - julianday(a)` for day differences\n  (SQLite).\n- **Conditional aggregation** — `SUM(CASE WHEN ... THEN 1 ELSE 0 END)` (or\n  `SUM(condition)` in SQLite) to compute several rates in one pass.\n- **HAVING** — filter *after* aggregation; the idiom for duplicates:\n  `GROUP BY key HAVING COUNT(*) > 1`.\n\n## The four silent metric bugs\n1. **Join fan-out** — joining a 1:N table before an aggregate multiplies\n   the measure. Aggregate the N side first.\n2. **LEFT JOIN + WHERE on the right table** — turns it into an inner join\n   and hides exactly the missing rows you were looking for. Put the\n   condition in `ON`.\n3. **COUNT(*) vs COUNT(DISTINCT x)** — views vs viewers, rows vs people.\n4. **Integer division** — `7 / 10 = 0` in many engines. Multiply by\n   `1.0` first.\n\n## Grain first, window second\nDecide what one row means (a deal? a month?), aggregate to that grain in a\nCTE, *then* apply windows. Running totals and moving averages on the wrong\ngrain look plausible and are wrong.",source:"Synthesized for DPM Lab."},{slug:"sql-101",title:"SQL 101: the formulas",category:"definition",tags:["sql","basics","level-0"],summary:"The clause order, filters, aggregates, GROUP BY/HAVING, and joins that every exercise in this app is built from.",body:"## The sentence\n```sql\nSELECT column_a, column_b        -- which columns\nFROM table_name                  -- which table\nWHERE condition                  -- which rows\nGROUP BY column_a                -- one row per value\nHAVING COUNT(*) > 1              -- filter groups\nORDER BY column_b DESC           -- sort\nLIMIT 10;                        -- keep n rows\n```\nClauses are optional but their order is fixed. Text goes in single quotes;\nnumbers don't. `;` ends the statement.\n\n## Filters\n| Want | Write |\n|---|---|\n| both | `a = 1 AND b = 2` |\n| either | `a = 1 OR b = 2` (use parentheses with AND) |\n| any of a list | `stage IN ('closed_won', 'closed_lost')` |\n| a range | `amount BETWEEN 1000 AND 5000` |\n| not equal | `stage <> 'closed_lost'` |\n| missing | `closed_date IS NULL` (never `= NULL`) |\n| pattern | `email LIKE '%@northwind%'` |\n\n## Aggregates\n`COUNT(*)`, `COUNT(col)` (non-NULL only), `SUM`, `AVG`, `MIN`, `MAX`.\nName the result: `SUM(amount) AS total`. In SQLite, `SUM(stage = 'closed_won')`\ncounts rows where the comparison is true, and `1.0 * a / b` forces decimal\ndivision.\n\n## GROUP BY / HAVING\nEvery SELECT column must be grouped or aggregated. `WHERE` filters rows\nbefore grouping; `HAVING` filters groups after. The duplicate idiom:\n`GROUP BY key HAVING COUNT(*) > 1`.\n\n## Joins\n```sql\nFROM deals d\nJOIN accounts a ON a.account_id = d.account_id        -- only matches\nLEFT JOIN transactions t ON t.deal_id = d.deal_id     -- all deals, NULL if none\n```\nQualify columns after a join (`d.amount`). Conditions on the right-hand table\nof a LEFT JOIN belong in `ON`, not `WHERE`.\n\n## Dates and text (SQLite)\n`substr(created_date, 1, 7)` → month; `strftime('%Y-%W', ts)` → week;\n`julianday(b) - julianday(a)` → days between.",source:"Synthesized for DPM Lab (Level 0)."},{slug:"python-pandas-101",title:"Python & pandas 101: the formulas",category:"definition",tags:["python","pandas","basics","level-0"],summary:"Lists, dicts, and the DataFrame moves that mirror SQL: select, filter, group, sort, merge.",body:"## Python in one breath\n```python\nx = 5                                   # variable\nstages = ['qualified', 'proposal']      # list; stages[0], len(stages)\ndeal = {'id': 'D-1', 'amount': 5000}    # dict; deal['amount']\nround(2 / 3, 4)                         # 0.6667\n[s for s in stages if s != 'proposal']  # list comprehension (a filter)\n```\n`==` compares, `=` assigns. `//` is integer division. Indentation defines\nblocks.\n\n## pandas ↔ SQL\n| SQL | pandas |\n|---|---|\n| `SELECT deal_id, amount FROM deals` | `deals[['deal_id', 'amount']]` |\n| `WHERE stage = 'closed_won'` | `deals[deals['stage'] == 'closed_won']` |\n| `WHERE a AND b` | `deals[(cond_a) & (cond_b)]` — parentheses required |\n| `WHERE stage IN (...)` | `deals[deals['stage'].isin([...])]` |\n| `COUNT(*)` | `len(deals)` |\n| `SUM(amount)` | `deals['amount'].sum()` |\n| `GROUP BY owner, SUM(amount)` | `deals.groupby('owner')['amount'].sum()` |\n| `ORDER BY amount DESC` | `.sort_values('amount', ascending=False)` |\n| `LIMIT 5` | `.head(5)` |\n| `JOIN accounts ON account_id` | `deals.merge(accounts, on='account_id')` |\n| `LEFT JOIN` | `.merge(..., how='left')` |\n| several aggregates | `.agg(total=('amount', 'sum'), n=('deal_id', 'count'))` |\n\n## Getting an answer out\n`result = df.to_dict('records')` for rows; `int(x)` / `float(x)` to turn a\nnumpy number into a plain one; `(deals['stage'] == 'closed_won').sum()`\ncounts True values, the pandas CASE WHEN.",source:"Synthesized for DPM Lab (Level 0)."},{slug:"what-is-a-data-product",title:"What a Data Product Is (and Isn't)",category:"definition",tags:["data-product","fundamentals","anatomy"],summary:"A curated, reliable, reusable data asset designed for ongoing use, with an owner, service expectations, and embedded quality. Not a dataset, not a dashboard, not a pipeline.",body:`## The definition
A **data product** is a curated, reliable, and reusable data asset
*intentionally designed for ongoing use*. It operates within a defined
domain boundary, has a stable data model, embedded validation, and clear
access mechanisms. It takes three forces converging: **stable semantics**,
**embedded governance**, and a **clearly defined consumer purpose**. At that
point data stops being a by-product of systems and becomes decision
infrastructure: the focus shifts from delivering outputs to maintaining
something others can rely on repeatedly.

## What it isn't
| Looks like one | Why it isn't | What a product adds |
|---|---|---|
| **A dataset** | Storage alone is not productisation. A dataset can be well-modelled and queryable and still lack stewardship, FAIR attributes (findable, accessible, interoperable, reusable), and consistent governance. | Explicit ownership, defined service expectations, embedded quality controls, long-term accountability. |
| **A dashboard or report** | A consumption layer: it interprets and visualises, it doesn't define or govern the underlying logic. | The governed, foundational logic beneath the interface: stable definitions, governed access, consistent metrics. Prevents duplication and inconsistency. |
| **A pipeline** | Movement is not ownership. A pipeline delivers a table; it can't guarantee semantic consistency or long-term quality. | Durable, reliable consumption with measurable quality standards and accountability. Pipelines introduce motion; products introduce durability. |

## Anatomy
- **Input contracts**: explicit schemas and validation rules that protect against upstream volatility.
- **Transformations & semantics**: encoded business rules and standardised definitions that prevent interpretive drift.
- **Quality signals**: continuous monitoring and measurable guarantees (the SLOs from Activation week).
- **Metadata**: first-class surface area for discoverability: documentation, lineage, catalogue indexing.
- **Embedded governance**: access controls, privacy safeguards, regulatory alignment built in structurally, not bolted on.
- **Output ports**: where consumers read (see [[data-product-activation]]).

## Canonical core and output projections
The **canonical core** is an authoritative, stable model of entities and
metrics: a single source of truth that stops teams reinventing logic.
**Projections** adapt it to consumers without touching the core definition:
a near-real-time API for operations, flexible analytical tables for
analytics, standardised auditable extracts for compliance. The strategy is
to isolate projections from the foundational model: the projection changes
with the consumer; the definition never does.

## Three types
| Type | Purpose | Value comes from |
|---|---|---|
| **Source-aligned** | Expose domain data in a reusable, governed form close to the operational system, without heavy transformation. | Stability and reusability: high-fidelity entities, schema standardisation, structural validation, input contracts. |
| **Aggregate** | Consolidate logic from multiple domain sources into standardised measures, derived entities, cross-domain views. Encodes *how revenue is calculated, how churn is measured, how KPIs roll up*. | Semantic discipline and quality thresholds. Its reliability drives organisational trust in metrics. |
| **Consumer-aligned** | Purpose-built for a specific use case or decision context: regulatory reporting, ML features, embedded analytics, operational decision engines. Defined by latency expectations, access interfaces, service guarantees. | Intentional alignment with consumption patterns, while relying on stable source-aligned and aggregate products upstream. |

At Meridian, the metric tree (revenue → bookings → conversion) is an
**aggregate** product; the Sales Funnel Accelerator dashboard is a
**consumer-aligned** projection of it; the raw CRM extract would be a
**source-aligned** product if it had a contract and an owner.`,source:"Modern Data 101 (Defining the True Data Product; Anatomy; Canonical Core; product types), from the user's notes."}];e.s(["kbEntries",0,t])},82364,76091,e=>{"use strict";var t=e.i(87110);function a(e){return e.startsWith("/")?`/dpm-lab${e}`:e}e.s(["withBasePath",0,a],76091);let o=new Map(t.kbEntries.map(e=>[e.slug,e]));e.s(["getKbEntry",0,function(e){return o.get(e)},"resolveWikiLinks",0,function(e){return e.replace(/\[\[([a-z0-9-]+)\]\]/g,(e,t)=>{let s=o.get(t);return s?`[${s.title}](${a(`/kb/${t}`)})`:`\`${t}\``})}],82364)}]);