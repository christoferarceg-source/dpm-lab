import type { PythonExercise } from "@/lib/types";

// pandas twins of the chapter 1–2 SQL warm-ups. All seven tables are
// pre-loaded as DataFrames before your code runs: accounts, customers,
// deals, deal_stage_history, transactions, pipeline_runs, dashboard_views.
// Set `result` to your answer.
//
// Each exercise carries a reference `solution`; `npm run verify:answers`
// runs it in Pyodide and writes the expected value to
// content/expected-python.json. Never hand-edit that JSON.

export const pythonExercises: PythonExercise[] = [
  {
    slug: "py-count-closed-won",
    chapter: 1,
    title: "Count the deals we won",
    difficulty: "warmup",
    prompt: `\`deals\` is a pandas DataFrame with a \`stage\` column.

Set \`result\` to the **number** of rows where \`stage == "closed_won"\`.`,
    starterCode: `# deals is already loaded as a pandas DataFrame.
won = deals[deals["stage"] == "closed_won"]
result = None  # TODO: how many rows are in won?`,
    solution: `won = deals[deals["stage"] == "closed_won"]\nresult = len(won)`,
    dpmConnection: {
      text: "Boolean filtering is the pandas equivalent of a WHERE clause. Being able to reproduce a number a dashboard shows is how a Data PM verifies it instead of trusting it.",
      kbSlug: "four-key-shifts",
    },
    hint: "len(won) or won.shape[0].",
  },
  {
    slug: "py-deals-closed-value",
    chapter: 1,
    title: "Functional metric: deals_closed_value",
    difficulty: "warmup",
    prompt: `Set \`result\` to **deals_closed_value**: the sum of \`amount\` for all \`closed_won\` deals.`,
    starterCode: `won = deals[deals["stage"] == "closed_won"]
result = None  # TODO: sum of won["amount"]`,
    solution: `won = deals[deals["stage"] == "closed_won"]\nresult = won["amount"].sum()`,
    dpmConnection: {
      text: "Same functional metric you computed in SQL. A Data PM who can compute a metric two independent ways can catch a pipeline bug that only shows up in one path.",
      kbSlug: "metric-types",
    },
    hint: "won['amount'].sum() — a numpy type is fine; the grader converts it.",
  },
  {
    slug: "py-revenue-generated",
    chapter: 1,
    title: "North Star metric: revenue_generated",
    difficulty: "warmup",
    prompt: `Set \`result\` to **revenue_generated**: the sum of \`amount\` across the \`transactions\` DataFrame.`,
    starterCode: `result = None  # TODO: total of transactions["amount"]`,
    solution: `result = transactions["amount"].sum()`,
    dpmConnection: {
      text: "A different table than deals. The gap between revenue and won-deal value is renewals plus upsells (and, until chapter 3, some duplicates). Explaining that gap to the CFO is chapter 6.",
      kbSlug: "metric-types",
    },
    hint: "transactions['amount'].sum()",
  },
  {
    slug: "py-conversion-rate",
    chapter: 1,
    title: "Granular metric: conversion_rate",
    difficulty: "warmup",
    prompt: `Set \`result\` to **conversion_rate** = won ÷ (won + lost), where won = \`closed_won\` deals and lost = \`closed_lost\` deals. Open deals are excluded. Round to 4 decimals.`,
    starterCode: `won  = (deals["stage"] == "closed_won").sum()
lost = (deals["stage"] == "closed_lost").sum()
result = None  # TODO: round(won / (won + lost), 4)`,
    solution: `won = (deals["stage"] == "closed_won").sum()\nlost = (deals["stage"] == "closed_lost").sum()\nresult = round(float(won / (won + lost)), 4)`,
    dpmConnection: {
      text: "Summing a boolean Series is the pandas idiom for a conditional COUNT, the same trick as CASE WHEN in SQL. The definition decision (exclude open deals) must be written down or every consumer computes it differently.",
      kbSlug: "ontology-as-infrastructure",
    },
    hint: "round(won / (won + lost), 4). Wrap in float() if you get a numpy type.",
  },
  {
    slug: "py-groupby-account",
    chapter: 2,
    title: "Won value by account (merge + groupby)",
    difficulty: "core",
    prompt: `Merge \`deals\` with \`accounts\` on \`account_id\`, keep only \`closed_won\` deals, then compute total won amount per **account_name**.

Set \`result\` to a **list of dicts** with keys \`account_name\` and \`total_won\`, sorted by \`total_won\` descending, then \`account_name\` ascending.`,
    starterCode: `won = deals[deals["stage"] == "closed_won"]
merged = won.merge(accounts, on="account_id")
grouped = (
    merged.groupby("account_name", as_index=False)["amount"]
    .sum()
    .rename(columns={"amount": "total_won"})
    .sort_values(["total_won", "account_name"], ascending=[False, True])
)
result = None  # TODO: grouped.to_dict("records")`,
    solution: `won = deals[deals["stage"] == "closed_won"]
merged = won.merge(accounts, on="account_id")
grouped = (merged.groupby("account_name", as_index=False)["amount"].sum()
    .rename(columns={"amount": "total_won"})
    .sort_values(["total_won", "account_name"], ascending=[False, True]))
result = grouped.to_dict("records")`,
    orderMatters: true,
    dpmConnection: {
      text: "merge = JOIN, groupby = GROUP BY. This is the logical model's 'Relationships' (accounts 1:N deals) turned into a measure, the exact structure of a Metric Dependency Tree node.",
      kbSlug: "canvas-data-product-design",
    },
    hint: "The starter does the work; finish with .to_dict('records').",
  },
  {
    slug: "py-rep-performance",
    chapter: 2,
    title: "Top-performing rep",
    difficulty: "core",
    prompt: `Group \`closed_won\` deals by \`owner\` and sum \`amount\`. Set \`result\` to a **dict** with keys \`owner\` and \`total_won\` for the single top rep.`,
    starterCode: `won = deals[deals["stage"] == "closed_won"]
by_owner = won.groupby("owner")["amount"].sum().sort_values(ascending=False)
result = None  # TODO: {"owner": ..., "total_won": ...} for the first row`,
    solution: `won = deals[deals["stage"] == "closed_won"]
by_owner = won.groupby("owner")["amount"].sum().sort_values(ascending=False)
result = {"owner": by_owner.index[0], "total_won": int(by_owner.iloc[0])}`,
    dpmConnection: {
      text: "Reading one row out of a grouped Series: by_owner.index[0] and by_owner.iloc[0]. Look at the concentration: if one rep is a big share of won value, one bad record on their deals swings the North Star.",
      kbSlug: "bullseye-data-product-market-fit",
    },
    hint: "result = {'owner': by_owner.index[0], 'total_won': int(by_owner.iloc[0])}",
  },
  {
    slug: "py-region-conversion",
    chapter: 2,
    title: "conversion_rate by region",
    difficulty: "core",
    prompt: `Compute **conversion_rate** per **region** (region is on \`accounts\`; stage on \`deals\`): won ÷ (won + lost), open deals excluded, rounded to 4 decimals.

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
    solution: `closed = deals[deals["stage"].isin(["closed_won", "closed_lost"])]
merged = closed.merge(accounts, on="account_id")
merged = merged.assign(is_won=(merged["stage"] == "closed_won").astype(int))
grouped = (merged.groupby("region", as_index=False)["is_won"].mean()
    .rename(columns={"is_won": "conversion_rate"}).sort_values("region"))
grouped["conversion_rate"] = grouped["conversion_rate"].round(4)
result = grouped.to_dict("records")`,
    orderMatters: true,
    dpmConnection: {
      text: "The mean of a 0/1 indicator column IS the rate: a compact pandas idiom worth memorizing. Cross-entity slicing (measure on deals, dimension on accounts) is where join mistakes silently corrupt a metric.",
      kbSlug: "canvas-data-product-design",
    },
    hint: "The starter is complete except the last line.",
  },
  {
    slug: "py-rca-source-lost",
    chapter: 2,
    title: "Where are we losing deals?",
    difficulty: "core",
    prompt: `For each deal \`source\`, compute **lost_value** (sum of \`amount\` for \`closed_lost\` deals) and **lost_count**. Set \`result\` to a **list of dicts** with keys \`source\`, \`lost_value\`, \`lost_count\`, sorted by \`lost_value\` descending.`,
    starterCode: `lost = deals[deals["stage"] == "closed_lost"]
grouped = (
    lost.groupby("source")
    .agg(lost_value=("amount", "sum"), lost_count=("deal_id", "count"))
    .reset_index()
    .sort_values("lost_value", ascending=False)
)
result = None  # TODO: grouped.to_dict("records")`,
    solution: `lost = deals[deals["stage"] == "closed_lost"]
grouped = (lost.groupby("source").agg(lost_value=("amount", "sum"), lost_count=("deal_id", "count"))
    .reset_index().sort_values("lost_value", ascending=False))
result = grouped.to_dict("records")`,
    orderMatters: true,
    dpmConnection: {
      text: "Named aggregation (.agg(name=(col, fn))) computes several measures at once. The output is the raw material for an RCA conversation; the Data PM's job starts after this query.",
      kbSlug: "proof-of-value-performance",
    },
    hint: "grouped.to_dict('records').",
  },
];

export function pythonExercisesForChapter(chapter: number): PythonExercise[] {
  return pythonExercises.filter((e) => e.chapter === chapter);
}
