import type { PythonExercise } from "@/lib/types";

// In every exercise, these pandas DataFrames are pre-loaded before your
// code runs: `accounts`, `customers`, `deals`, `transactions` (same data as
// the SQL practice). Set the variable `result` to your answer.
//
// Expected values were computed by scripts/compute-expected.mjs — do not
// hand-edit numbers; re-run the script.

export const pythonExercises: PythonExercise[] = [
  {
    slug: "py-count-closed-won",
    title: "Count the deals we won",
    difficulty: "intro",
    prompt: `\`deals\` is a pandas DataFrame with a \`stage\` column.

Set \`result\` to the **number** of rows where \`stage == "closed_won"\`.`,
    starterCode: `# deals is already loaded as a pandas DataFrame.
won = deals[deals["stage"] == "closed_won"]
result = None  # TODO: how many rows are in won?`,
    expectedResult: 11,
    dpmConnection: {
      text: "Boolean filtering is the pandas equivalent of a WHERE clause. Being able to reproduce a number a dashboard shows is how a DPM verifies it instead of trusting it.",
      kbSlug: "four-key-shifts",
    },
    hint: "len(won) or won.shape[0].",
  },
  {
    slug: "py-deals-closed-value",
    title: "Functional metric: deals_closed_value",
    difficulty: "core",
    prompt: `Set \`result\` to **deals_closed_value**: the sum of \`amount\` for all \`closed_won\` deals.`,
    starterCode: `won = deals[deals["stage"] == "closed_won"]
result = None  # TODO: sum of won["amount"]`,
    expectedResult: 606000,
    dpmConnection: {
      text: "Same Functional metric you computed in SQL. A DPM who can compute a metric two independent ways (SQL and pandas) can catch a pipeline bug that only shows up in one path.",
      kbSlug: "metric-types",
    },
    hint: "won['amount'].sum() — it may come back as a numpy type; that's fine.",
  },
  {
    slug: "py-revenue-generated",
    title: "North Star metric: revenue_generated",
    difficulty: "core",
    prompt: `Set \`result\` to **revenue_generated**: the sum of \`amount\` across the \`transactions\` DataFrame.`,
    starterCode: `result = None  # TODO: total of transactions["amount"]`,
    expectedResult: 661000,
    dpmConnection: {
      text: "Notice this is a different table than deals. The gap between 661,000 (revenue) and 606,000 (won deal value) is renewals + upsells — a real business signal, not an error. Explaining that gap is a DPM's job.",
      kbSlug: "metric-types",
    },
    hint: "transactions['amount'].sum()",
  },
  {
    slug: "py-conversion-rate",
    title: "Granular metric: conversion_rate",
    difficulty: "core",
    prompt: `Set \`result\` to **conversion_rate** = won ÷ (won + lost), where won = \`closed_won\` deals and lost = \`closed_lost\` deals. Open deals are excluded. Round to 4 decimals.`,
    starterCode: `won  = (deals["stage"] == "closed_won").sum()
lost = (deals["stage"] == "closed_lost").sum()
result = None  # TODO: round(won / (won + lost), 4)`,
    expectedResult: 0.6875,
    dpmConnection: {
      text: "Summing a boolean Series is the pandas idiom for a conditional COUNT — the same CASE WHEN trick from SQL. The definition decision (exclude open deals) must be documented in the semantic layer or every consumer will compute it differently.",
      kbSlug: "ontology-as-infrastructure",
    },
    hint: "round(won / (won + lost), 4) — cast to float if you get a numpy type.",
  },
  {
    slug: "py-groupby-account",
    title: "Won value by account (merge + groupby)",
    difficulty: "core",
    prompt: `Merge \`deals\` with \`accounts\` on \`account_id\`, keep only \`closed_won\` deals, then compute total won amount per **account_name**.

Set \`result\` to a **list of dicts** with keys \`account_name\` and \`total_won\`, sorted by \`total_won\` descending.`,
    starterCode: `won = deals[deals["stage"] == "closed_won"]
merged = won.merge(accounts, on="account_id")
grouped = (
    merged.groupby("account_name", as_index=False)["amount"]
    .sum()
    .rename(columns={"amount": "total_won"})
    .sort_values("total_won", ascending=False)
)
result = None  # TODO: grouped.to_dict("records")`,
    expectedResult: [
      { account_name: "Umbrella Health", total_won: 195500 },
      { account_name: "Wayne Manufacturing", total_won: 118000 },
      { account_name: "Globex Logistics", total_won: 107500 },
      { account_name: "Northwind Traders", total_won: 106000 },
      { account_name: "Hooli Media", total_won: 33500 },
      { account_name: "Stark Analytics", total_won: 27500 },
      { account_name: "Initech Software", total_won: 9800 },
      { account_name: "Wonka Foods", total_won: 8200 },
    ],
    orderMatters: true,
    dpmConnection: {
      text: "merge = JOIN, groupby = GROUP BY. This is the logical data model's 'Relationships' (accounts 1:N deals) turned into a Measure — the exact structure of a Metric Dependency Tree node.",
      kbSlug: "canvas-data-product-design",
    },
    hint: "The starter does the work — finish with .to_dict('records').",
  },
  {
    slug: "py-rep-performance",
    title: "Top-performing rep",
    difficulty: "core",
    prompt: `Group \`closed_won\` deals by \`owner\` and sum \`amount\`. Set \`result\` to a **dict** with keys \`owner\` and \`total_won\` for the single top rep.`,
    starterCode: `won = deals[deals["stage"] == "closed_won"]
by_owner = won.groupby("owner")["amount"].sum().sort_values(ascending=False)
result = None  # TODO: {"owner": ..., "total_won": ...} for the first row`,
    expectedResult: { owner: "Jordan Blake", total_won: 419500 },
    dpmConnection: {
      text: "Reading a single row out of a grouped Series: by_owner.index[0] and by_owner.iloc[0]. As a DPM, notice the concentration — one rep is ~70% of won value, so one bad record on their deals swings the North Star.",
      kbSlug: "bullseye-data-product-market-fit",
    },
    hint: "result = {'owner': by_owner.index[0], 'total_won': int(by_owner.iloc[0])}",
  },
  {
    slug: "py-region-conversion",
    title: "conversion_rate by region",
    difficulty: "stretch",
    prompt: `Compute **conversion_rate** per **region** (region is on \`accounts\`; stage is on \`deals\`). Same definition as before: won ÷ (won + lost), open deals excluded, rounded to 4 decimals.

Set \`result\` to a **list of dicts** with keys \`region\` and \`conversion_rate\`, sorted by region ascending.`,
    starterCode: `closed = deals[deals["stage"].isin(["closed_won", "closed_lost"])]
merged = closed.merge(accounts, on="account_id")
merged = merged.assign(is_won=(merged["stage"] == "closed_won").astype(int))
grouped = (
    merged.groupby("region", as_index=False)["is_won"]
    .mean()
    .rename(columns={"is_won": "conversion_rate"})
    .sort_values("region")
)
grouped["conversion_rate"] = grouped["conversion_rate"].round(4)
result = None  # TODO: grouped.to_dict("records")`,
    expectedResult: [
      { region: "AMER", conversion_rate: 0.7143 },
      { region: "APAC", conversion_rate: 0.6667 },
      { region: "EMEA", conversion_rate: 0.6667 },
    ],
    orderMatters: true,
    dpmConnection: {
      text: "The mean of a 0/1 indicator column IS the rate — a compact pandas idiom worth memorizing. Cross-entity slicing (measure on deals, dimension on accounts) is where join mistakes silently corrupt a metric.",
      kbSlug: "canvas-data-product-design",
    },
    hint: "The starter is complete except the last line.",
  },
  {
    slug: "py-rca-source-lost",
    title: "RCA: where are we losing deals?",
    difficulty: "stretch",
    prompt: `**Scenario:** conversion_rate looks low. For each deal \`source\`, compute **lost_value** (sum of \`amount\` for \`closed_lost\` deals) and **lost_count** (number of such deals).

Set \`result\` to a **list of dicts** with keys \`source\`, \`lost_value\`, \`lost_count\`, sorted by \`lost_value\` descending.`,
    starterCode: `lost = deals[deals["stage"] == "closed_lost"]
grouped = (
    lost.groupby("source")
    .agg(lost_value=("amount", "sum"), lost_count=("deal_id", "count"))
    .reset_index()
    .sort_values("lost_value", ascending=False)
)
result = None  # TODO: grouped.to_dict("records")`,
    expectedResult: [
      { source: "Outbound", lost_value: 81500, lost_count: 3 },
      { source: "Inbound", lost_value: 34000, lost_count: 2 },
    ],
    orderMatters: true,
    dpmConnection: {
      text: "Named aggregation (.agg(name=(col, fn))) is the pandas way to compute several measures at once. The output is the raw material for an RCA conversation — the DPM's real job starts *after* this: is Outbound losing on lead quality, pricing, or a stage-recording data issue?",
      kbSlug: "proof-of-value-performance",
    },
    hint: "grouped.to_dict('records') — you may need int() casts if you build it by hand.",
  },
];
