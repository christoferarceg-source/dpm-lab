import type { SqlExercise } from "@/lib/types";

// Expected values below were computed by scripts/compute-expected.mjs
// against content/dataset.ts — do not hand-edit numbers; re-run the script.

export const sqlExercises: SqlExercise[] = [
  {
    slug: "sql-select-closed-won",
    title: "List the deals we actually won",
    difficulty: "intro",
    prompt: `The \`deals\` table has one row per sales opportunity, with a \`stage\` column.

Return the **deal_id**, **account_id**, and **amount** of every deal whose stage is \`closed_won\`, ordered by \`deal_id\`.`,
    starterQuery: `SELECT deal_id, account_id, amount
FROM deals
WHERE -- your condition here
ORDER BY deal_id;`,
    expectedColumns: ["deal_id", "account_id", "amount"],
    expectedRows: [
      ["DEAL-001", "ACC-001", 84000],
      ["DEAL-002", "ACC-001", 22000],
      ["DEAL-003", "ACC-002", 46500],
      ["DEAL-005", "ACC-003", 9800],
      ["DEAL-007", "ACC-004", 156000],
      ["DEAL-010", "ACC-005", 33500],
      ["DEAL-011", "ACC-006", 118000],
      ["DEAL-013", "ACC-007", 27500],
      ["DEAL-015", "ACC-008", 8200],
      ["DEAL-018", "ACC-002", 61000],
      ["DEAL-019", "ACC-004", 39500],
    ],
    orderMatters: true,
    dpmConnection: {
      text: "Filtering to closed_won is the first step of the Functional metric #deals_closed_value. Before you can trust an aggregate, you should be able to see the exact rows feeding it.",
      kbSlug: "metric-types",
    },
    hint: "Compare the stage column to the string 'closed_won' (single quotes) in the WHERE clause.",
  },
  {
    slug: "sql-deals-closed-value",
    title: "Compute the Functional metric: deals_closed_value",
    difficulty: "core",
    prompt: `Compute **deals_closed_value** — the total \`amount\` across all deals in stage \`closed_won\`.

Return a single row with one column named \`deals_closed_value\`.`,
    starterQuery: `SELECT -- aggregate here
FROM deals
WHERE stage = 'closed_won';`,
    expectedColumns: ["deals_closed_value"],
    expectedRows: [[606000]],
    dpmConnection: {
      text: "This is the Playbook's example Functional metric for a Sales domain. It rolls up into the North Star (revenue) and is explained by granular metrics like conversion_rate in the Metric Dependency Tree.",
      kbSlug: "metric-types",
    },
    hint: "Use SUM(amount) and alias it with AS deals_closed_value.",
  },
  {
    slug: "sql-revenue-generated",
    title: "Compute the North Star metric: revenue_generated",
    difficulty: "core",
    prompt: `The \`transactions\` table records actual money movements (initial, renewal, upsell) against won deals.

Compute **revenue_generated** — the total \`amount\` across all transactions. Return one row with one column named \`revenue_generated\`.`,
    starterQuery: `SELECT -- aggregate here
FROM transactions;`,
    expectedColumns: ["revenue_generated"],
    expectedRows: [[661000]],
    dpmConnection: {
      text: "revenue_generated is the Playbook's example North Star metric for Sales. Notice it is NOT the same number as deals_closed_value — transactions include renewals and upsells that deal amounts don't. Knowing which table a metric lives in is a core DPM skill.",
      kbSlug: "metric-types",
    },
    hint: "SUM over transactions.amount; alias as revenue_generated.",
  },
  {
    slug: "sql-conversion-rate",
    title: "Compute the Granular metric: conversion_rate",
    difficulty: "core",
    prompt: `Compute **conversion_rate** = (deals that were \`closed_won\`) ÷ (deals that were either \`closed_won\` or \`closed_lost\`).

Ignore deals still open (prospecting, qualified, proposal, negotiation) — they haven't converted or failed yet.

Return one row with one column \`conversion_rate\`, rounded to 4 decimal places.`,
    starterQuery: `SELECT ROUND(
  1.0 * SUM(CASE WHEN stage = 'closed_won' THEN 1 ELSE 0 END)
  / SUM(CASE WHEN stage IN ('closed_won', 'closed_lost') THEN 1 ELSE 0 END),
  4
) AS conversion_rate
FROM deals;`,
    expectedColumns: ["conversion_rate"],
    expectedRows: [[0.6875]],
    dpmConnection: {
      text: "conversion_rate is a Granular metric: an indicator of effectiveness that explains WHY deals_closed_value moved. The definition choice (exclude open deals) is exactly the kind of semantic decision an ontology has to pin down before an AI agent reports it.",
      kbSlug: "ontology-as-infrastructure",
    },
    hint: "The starter already has the shape — the trick is 1.0 * to force decimal division, and CASE WHEN inside SUM to count conditionally.",
  },
  {
    slug: "sql-join-accounts-deals",
    title: "Won value by account (JOIN + GROUP BY)",
    difficulty: "core",
    prompt: `Join \`accounts\` to \`deals\` and report, for each account, the **account_name** and its **total_won** (sum of \`amount\` for \`closed_won\` deals). Order by \`total_won\` descending.`,
    starterQuery: `SELECT a.account_name, SUM(d.amount) AS total_won
FROM accounts a
JOIN deals d ON -- join condition
WHERE d.stage = 'closed_won'
GROUP BY a.account_name
ORDER BY total_won DESC;`,
    expectedColumns: ["account_name", "total_won"],
    expectedRows: [
      ["Umbrella Health", 195500],
      ["Wayne Manufacturing", 118000],
      ["Globex Logistics", 107500],
      ["Northwind Traders", 106000],
      ["Hooli Media", 33500],
      ["Stark Analytics", 27500],
      ["Initech Software", 9800],
      ["Wonka Foods", 8200],
    ],
    orderMatters: true,
    dpmConnection: {
      text: "This is the 'Relationships' part of the logical data model (accounts 1:N deals) turned into a measure. Splitting a Functional metric by an entity is the first move in root cause analysis: which account drove the change?",
      kbSlug: "canvas-data-product-design",
    },
    hint: "Join on a.account_id = d.account_id.",
  },
  {
    slug: "sql-rep-performance",
    title: "Which rep closed the most?",
    difficulty: "core",
    prompt: `For each sales rep (\`owner\`), sum the \`amount\` of their \`closed_won\` deals. Return **owner** and **total_won**, ordered by \`total_won\` descending.`,
    starterQuery: `SELECT owner, SUM(amount) AS total_won
FROM deals
WHERE stage = 'closed_won'
GROUP BY -- ?
ORDER BY total_won DESC;`,
    expectedColumns: ["owner", "total_won"],
    expectedRows: [
      ["Jordan Blake", 419500],
      ["Priya Nair", 144800],
      ["Meiling Zhao", 41700],
    ],
    orderMatters: true,
    dpmConnection: {
      text: "Slicing a metric by a dimension (owner) is what a stakeholder actually asks for in a review. As a DPM, notice the concentration risk: one rep is most of the number — a data quality issue on their deals would move the North Star.",
      kbSlug: "bullseye-data-product-market-fit",
    },
    hint: "GROUP BY owner.",
  },
  {
    slug: "sql-region-conversion",
    title: "conversion_rate by region",
    difficulty: "stretch",
    prompt: `Compute **conversion_rate** per **region** (region lives on \`accounts\`, stage lives on \`deals\`). Use the same definition as before: won ÷ (won + lost), open deals excluded. Round to 4 decimals, order by region ascending.`,
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
    expectedColumns: ["region", "conversion_rate"],
    expectedRows: [
      ["AMER", 0.7143],
      ["APAC", 0.6667],
      ["EMEA", 0.6667],
    ],
    orderMatters: true,
    dpmConnection: {
      text: "A Granular metric cut by a dimension from a *different* entity. This is the shape of most real metric-tree questions: the measure is on one table, the slicing attribute is on another. Getting the join right is where silent errors creep in.",
      kbSlug: "canvas-data-product-design",
    },
    hint: "The starter is close to complete — read it, understand each clause, then run it.",
  },
  {
    slug: "sql-rca-source-lost",
    title: "RCA: where are we losing deals?",
    difficulty: "stretch",
    prompt: `**Scenario:** the VP Sales says conversion_rate looks low and wants to know where the losses are concentrated.

Return, for each deal \`source\`, the **lost_value** (sum of \`amount\` for \`closed_lost\` deals) and **lost_count** (number of such deals). Order by \`lost_value\` descending.`,
    starterQuery: `SELECT source,
  SUM(amount) AS lost_value,
  COUNT(*)    AS lost_count
FROM deals
WHERE stage = 'closed_lost'
GROUP BY source
ORDER BY lost_value DESC;`,
    expectedColumns: ["source", "lost_value", "lost_count"],
    expectedRows: [
      ["Outbound", 81500, 3],
      ["Inbound", 34000, 2],
    ],
    orderMatters: true,
    dpmConnection: {
      text: "This is walking DOWN the Metric Dependency Tree: conversion_rate (granular) → broken down by source. The DPM's job isn't just running the query; it's asking the *next* question — is Outbound losing because of lead quality, pricing, or a data problem in how stage is recorded?",
      kbSlug: "proof-of-value-performance",
    },
    hint: "Two aggregates over the same filtered rows: SUM for value, COUNT(*) for count.",
  },
];
