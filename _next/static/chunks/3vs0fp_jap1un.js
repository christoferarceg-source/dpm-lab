(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,86969,e=>{"use strict";var t=e.i(18050),a=e.i(22016),o=e.i(21683),s=e.i(47371),n=e.i(6e4),r=e.i(8908),i=e.i(82364),d=e.i(79922),l=e.i(74581);e.s(["ChapterView",0,function({number:e}){let c=(0,s.getChapter)(e),u=n.units.find(t=>t.number===e),{data:h,hydrated:m}=(0,l.useProgress)(),g=(0,d.unitProgress)(h,e),p=(0,r.sqlExercisesForChapter)(e),f=s.chapters.find(t=>t.number===e-1),E=s.chapters.find(t=>t.number===e+1);return(0,t.jsxs)("article",{className:"max-w-2xl space-y-8",children:[(0,t.jsxs)("header",{className:"rounded-2xl p-5 text-white",style:{background:u.color},children:[(0,t.jsx)(a.default,{href:"/",className:"text-xs opacity-80 hover:opacity-100",children:"← Back to the path"}),(0,t.jsx)("p",{className:"text-[0.7rem] uppercase tracking-wide opacity-80 mt-3",children:c.week}),(0,t.jsx)("h1",{className:"text-2xl font-semibold tracking-tight",children:c.title}),(0,t.jsx)("p",{className:"opacity-90 mt-1",children:c.tagline}),m&&(0,t.jsxs)("p",{className:"text-xs opacity-80 mt-3 tabular-nums",children:[g.lessonsDone,"/",g.lessonsTotal," lessons · ",g.labDone,"/",g.labTotal," lab exercises"]})]}),1===e&&(0,t.jsxs)("aside",{className:"bg-surface border border-border rounded-xl p-4 text-sm",children:[(0,t.jsx)("p",{className:"font-semibold mb-2",children:"Who you'll be dealing with"}),(0,t.jsx)("ul",{className:"grid gap-2 sm:grid-cols-2",children:s.CAST.map(e=>(0,t.jsxs)("li",{children:[(0,t.jsx)("span",{className:"font-medium",children:e.name})," ",(0,t.jsxs)("span",{className:"text-muted",children:["· ",e.role]}),(0,t.jsx)("p",{className:"text-muted text-xs mt-0.5",children:e.agenda})]},e.name))})]}),(0,t.jsxs)("section",{children:[(0,t.jsx)("h2",{className:"text-sm font-semibold uppercase tracking-wide text-muted mb-2",children:"The brief"}),(0,t.jsx)("div",{className:"bg-surface border border-border rounded-xl p-5",children:(0,t.jsx)(o.Markdown,{children:c.brief})})]}),(0,t.jsxs)("section",{children:[(0,t.jsx)("h2",{className:"text-sm font-semibold uppercase tracking-wide text-muted mb-2",children:"Lessons"}),(0,t.jsx)("ol",{className:"grid grid-cols-1 gap-2 sm:grid-cols-2",children:u.lessons.map((e,o)=>{let s=m&&!!h.lessons[e.id];return(0,t.jsx)("li",{children:(0,t.jsxs)(a.default,{href:`/lesson/${e.id}`,className:"flex items-center gap-3 bg-surface border border-border rounded-xl px-3 py-2.5 hover:border-accent text-sm",children:[(0,t.jsx)("span",{className:"w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0",style:{background:s?u.color:"var(--border)"},children:s?"★":o+1}),(0,t.jsx)("span",{className:"flex-1 min-w-0 break-words",children:e.title}),(0,t.jsx)("span",{className:"text-[0.7rem] text-muted",children:"1 min"})]})},e.id)})})]}),(0,t.jsxs)("section",{children:[(0,t.jsx)("h2",{className:"text-sm font-semibold uppercase tracking-wide text-muted mb-2",children:"Read"}),(0,t.jsx)("ul",{className:"grid grid-cols-1 gap-2 sm:grid-cols-2",children:c.readings.map(e=>{let o=(0,i.getKbEntry)(e);return o?(0,t.jsx)("li",{children:(0,t.jsxs)(a.default,{href:`/kb/${e}`,className:"block h-full bg-surface border border-border rounded-xl p-3 hover:border-accent text-sm",children:[(0,t.jsx)("p",{className:"font-medium",children:o.title}),(0,t.jsx)("p",{className:"text-xs text-muted mt-1 line-clamp-2",children:o.summary})]})},e):null})})]}),(0,t.jsxs)("section",{children:[(0,t.jsx)("h2",{className:"text-sm font-semibold uppercase tracking-wide text-muted mb-2",children:"Lab"}),(0,t.jsx)("ul",{className:"bg-surface border border-border rounded-xl p-2",children:p.map(e=>{let o=m?h.exercises[e.slug]?.status??"not_started":"not_started";return(0,t.jsx)("li",{children:(0,t.jsxs)(a.default,{href:`/practice/sql#${e.slug}`,className:"flex items-center gap-3 px-3 py-2 rounded-md hover:bg-surface-2 text-sm",children:[(0,t.jsx)("span",{className:`w-2 h-2 rounded-full shrink-0 ${"solved"===o?"bg-success":"attempted"===o?"bg-warn":"bg-border"}`}),(0,t.jsx)("span",{className:"flex-1 min-w-0 break-words",children:e.title}),(0,t.jsx)("span",{className:"text-[0.7rem] text-muted uppercase",children:e.difficulty})]})},e.slug)})})]}),(0,t.jsxs)("section",{children:[(0,t.jsx)("h2",{className:"text-sm font-semibold uppercase tracking-wide text-muted mb-2",children:"Debrief"}),m&&g.complete?(0,t.jsx)("div",{className:"bg-success-soft/40 border border-success/20 rounded-xl p-5",children:(0,t.jsx)(o.Markdown,{children:c.debrief})}):(0,t.jsxs)("div",{className:"bg-surface-2/60 border border-dashed border-border rounded-xl p-4 text-sm text-muted",children:["Finish this unit's ",u.lessons.length," lessons to unlock the debrief: what a good week looked like, and what carries into the next one."]})]}),(0,t.jsxs)("nav",{className:"flex justify-between text-sm border-t border-border pt-4",children:[f?(0,t.jsxs)(a.default,{href:`/chapters/${f.number}`,className:"text-muted hover:text-fg",children:["← ",f.week]}):(0,t.jsx)("span",{}),E?(0,t.jsxs)(a.default,{href:`/chapters/${E.number}`,className:"text-accent hover:underline underline-offset-2",children:[E.week," →"]}):(0,t.jsx)(a.default,{href:"/",className:"text-accent hover:underline underline-offset-2",children:"Back to the path →"})]})]})}])},26033,e=>{"use strict";let t=[{slug:"py0-count-rows",chapter:0,title:"How many deals are there?",difficulty:"warmup",prompt:"`deals` is a DataFrame. Set `result` to the number of rows in it.",starterCode:"result = None  # TODO: len(...)",solution:"result = len(deals)",dpmConnection:{text:"len() on a DataFrame is COUNT(*). Knowing the row count is the sanity check before any other number.",kbSlug:"python-pandas-101"},hint:"len(deals)"},{slug:"py0-filter-sum",chapter:0,title:"Total amount of qualified deals",difficulty:"warmup",prompt:'Keep the rows where `stage == "qualified"`, then set `result` to the sum of their `amount`.',starterCode:`qualified = deals[deals["stage"] == "qualified"]
result = None  # TODO: sum of qualified["amount"]`,solution:`qualified = deals[deals["stage"] == "qualified"]
result = int(qualified["amount"].sum())`,dpmConnection:{text:"Filter, pick a column, aggregate: WHERE + SUM in pandas.",kbSlug:"python-pandas-101"},hint:"qualified['amount'].sum()"},{slug:"py0-count-by-stage",chapter:0,title:"Deals per stage (groupby)",difficulty:"warmup",prompt:"Count deals per `stage`. Set `result` to a **dict** mapping each stage to its count.",starterCode:`counts = deals.groupby("stage")["deal_id"].count()
result = None  # TODO: counts.to_dict()`,solution:`counts = deals.groupby("stage")["deal_id"].count()
result = {k: int(v) for k, v in counts.to_dict().items()}`,dpmConnection:{text:"groupby + count is GROUP BY + COUNT(*). to_dict() hands the result back as plain keys and values.",kbSlug:"python-pandas-101"},hint:"counts.to_dict() — wrap values in int() if you build it by hand."},{slug:"py-count-closed-won",chapter:1,title:"Count the deals we won",difficulty:"warmup",prompt:'`deals` is a pandas DataFrame with a `stage` column.\n\nSet `result` to the **number** of rows where `stage == "closed_won"`.',starterCode:`# deals is already loaded as a pandas DataFrame.
won = deals[deals["stage"] == "closed_won"]
result = None  # TODO: how many rows are in won?`,solution:`won = deals[deals["stage"] == "closed_won"]
result = len(won)`,dpmConnection:{text:"Boolean filtering is the pandas equivalent of a WHERE clause. Being able to reproduce a number a dashboard shows is how a Data PM verifies it instead of trusting it.",kbSlug:"four-key-shifts"},hint:"len(won) or won.shape[0]."},{slug:"py-deals-closed-value",chapter:1,title:"Functional metric: deals_closed_value",difficulty:"warmup",prompt:"Set `result` to **deals_closed_value**: the sum of `amount` for all `closed_won` deals.",starterCode:`won = deals[deals["stage"] == "closed_won"]
result = None  # TODO: sum of won["amount"]`,solution:`won = deals[deals["stage"] == "closed_won"]
result = won["amount"].sum()`,dpmConnection:{text:"Same functional metric you computed in SQL. A Data PM who can compute a metric two independent ways can catch a pipeline bug that only shows up in one path.",kbSlug:"metric-types"},hint:"won['amount'].sum() — a numpy type is fine; the grader converts it."},{slug:"py-revenue-generated",chapter:1,title:"North Star metric: revenue_generated",difficulty:"warmup",prompt:"Set `result` to **revenue_generated**: the sum of `amount` across the `transactions` DataFrame.",starterCode:'result = None  # TODO: total of transactions["amount"]',solution:'result = transactions["amount"].sum()',dpmConnection:{text:"A different table than deals. The gap between revenue and won-deal value is renewals plus upsells (and, until chapter 3, some duplicates). Explaining that gap to the CFO is chapter 6.",kbSlug:"metric-types"},hint:"transactions['amount'].sum()"},{slug:"py-conversion-rate",chapter:1,title:"Granular metric: conversion_rate",difficulty:"warmup",prompt:"Set `result` to **conversion_rate** = won ÷ (won + lost), where won = `closed_won` deals and lost = `closed_lost` deals. Open deals are excluded. Round to 4 decimals.",starterCode:`won  = (deals["stage"] == "closed_won").sum()
lost = (deals["stage"] == "closed_lost").sum()
result = None  # TODO: round(won / (won + lost), 4)`,solution:`won = (deals["stage"] == "closed_won").sum()
lost = (deals["stage"] == "closed_lost").sum()
result = round(float(won / (won + lost)), 4)`,dpmConnection:{text:"Summing a boolean Series is the pandas idiom for a conditional COUNT, the same trick as CASE WHEN in SQL. The definition decision (exclude open deals) must be written down or every consumer computes it differently.",kbSlug:"ontology-as-infrastructure"},hint:"round(won / (won + lost), 4). Wrap in float() if you get a numpy type."},{slug:"py-groupby-account",chapter:2,title:"Won value by account (merge + groupby)",difficulty:"core",prompt:"Merge `deals` with `accounts` on `account_id`, keep only `closed_won` deals, then compute total won amount per **account_name**.\n\nSet `result` to a **list of dicts** with keys `account_name` and `total_won`, sorted by `total_won` descending, then `account_name` ascending.",starterCode:`won = deals[deals["stage"] == "closed_won"]
merged = won.merge(accounts, on="account_id")
grouped = (
    merged.groupby("account_name", as_index=False)["amount"]
    .sum()
    .rename(columns={"amount": "total_won"})
    .sort_values(["total_won", "account_name"], ascending=[False, True])
)
result = None  # TODO: grouped.to_dict("records")`,solution:`won = deals[deals["stage"] == "closed_won"]
merged = won.merge(accounts, on="account_id")
grouped = (merged.groupby("account_name", as_index=False)["amount"].sum()
    .rename(columns={"amount": "total_won"})
    .sort_values(["total_won", "account_name"], ascending=[False, True]))
result = grouped.to_dict("records")`,orderMatters:!0,dpmConnection:{text:"merge = JOIN, groupby = GROUP BY. This is the logical model's 'Relationships' (accounts 1:N deals) turned into a measure, the exact structure of a Metric Dependency Tree node.",kbSlug:"canvas-data-product-design"},hint:"The starter does the work; finish with .to_dict('records')."},{slug:"py-rep-performance",chapter:2,title:"Top-performing rep",difficulty:"core",prompt:"Group `closed_won` deals by `owner` and sum `amount`. Set `result` to a **dict** with keys `owner` and `total_won` for the single top rep.",starterCode:`won = deals[deals["stage"] == "closed_won"]
by_owner = won.groupby("owner")["amount"].sum().sort_values(ascending=False)
result = None  # TODO: {"owner": ..., "total_won": ...} for the first row`,solution:`won = deals[deals["stage"] == "closed_won"]
by_owner = won.groupby("owner")["amount"].sum().sort_values(ascending=False)
result = {"owner": by_owner.index[0], "total_won": int(by_owner.iloc[0])}`,dpmConnection:{text:"Reading one row out of a grouped Series: by_owner.index[0] and by_owner.iloc[0]. Look at the concentration: if one rep is a big share of won value, one bad record on their deals swings the North Star.",kbSlug:"bullseye-data-product-market-fit"},hint:"result = {'owner': by_owner.index[0], 'total_won': int(by_owner.iloc[0])}"},{slug:"py-region-conversion",chapter:2,title:"conversion_rate by region",difficulty:"core",prompt:"Compute **conversion_rate** per **region** (region is on `accounts`; stage on `deals`): won ÷ (won + lost), open deals excluded, rounded to 4 decimals.\n\nSet `result` to a **list of dicts** with keys `region` and `conversion_rate`, sorted by region ascending.",starterCode:`closed = deals[deals["stage"].isin(["closed_won", "closed_lost"])]
merged = closed.merge(accounts, on="account_id")
merged = merged.assign(is_won=(merged["stage"] == "closed_won").astype(int))
grouped = (
    merged.groupby("region", as_index=False)["is_won"]
    .mean()
    .rename(columns={"is_won": "conversion_rate"})
    .sort_values("region")
)
grouped["conversion_rate"] = grouped["conversion_rate"].round(4)
result = None  # TODO: grouped.to_dict("records")`,solution:`closed = deals[deals["stage"].isin(["closed_won", "closed_lost"])]
merged = closed.merge(accounts, on="account_id")
merged = merged.assign(is_won=(merged["stage"] == "closed_won").astype(int))
grouped = (merged.groupby("region", as_index=False)["is_won"].mean()
    .rename(columns={"is_won": "conversion_rate"}).sort_values("region"))
grouped["conversion_rate"] = grouped["conversion_rate"].round(4)
result = grouped.to_dict("records")`,orderMatters:!0,dpmConnection:{text:"The mean of a 0/1 indicator column IS the rate: a compact pandas idiom worth memorizing. Cross-entity slicing (measure on deals, dimension on accounts) is where join mistakes silently corrupt a metric.",kbSlug:"canvas-data-product-design"},hint:"The starter is complete except the last line."},{slug:"py-rca-source-lost",chapter:2,title:"Where are we losing deals?",difficulty:"core",prompt:"For each deal `source`, compute **lost_value** (sum of `amount` for `closed_lost` deals) and **lost_count**. Set `result` to a **list of dicts** with keys `source`, `lost_value`, `lost_count`, sorted by `lost_value` descending.",starterCode:`lost = deals[deals["stage"] == "closed_lost"]
grouped = (
    lost.groupby("source")
    .agg(lost_value=("amount", "sum"), lost_count=("deal_id", "count"))
    .reset_index()
    .sort_values("lost_value", ascending=False)
)
result = None  # TODO: grouped.to_dict("records")`,solution:`lost = deals[deals["stage"] == "closed_lost"]
grouped = (lost.groupby("source").agg(lost_value=("amount", "sum"), lost_count=("deal_id", "count"))
    .reset_index().sort_values("lost_value", ascending=False))
result = grouped.to_dict("records")`,orderMatters:!0,dpmConnection:{text:"Named aggregation (.agg(name=(col, fn))) computes several measures at once. The output is the raw material for an RCA conversation; the Data PM's job starts after this query.",kbSlug:"proof-of-value-performance"},hint:"grouped.to_dict('records')."}];e.s(["pythonExercises",0,t,"pythonExercisesForChapter",0,function(e){return t.filter(t=>t.chapter===e)}])},8908,e=>{"use strict";let t="CASE stage WHEN 'prospecting' THEN 1 WHEN 'qualified' THEN 2 WHEN 'proposal' THEN 3 WHEN 'negotiation' THEN 4 WHEN 'closed_won' THEN 5 ELSE 6 END",a=[{slug:"sql0-select-where",chapter:0,title:"Pick columns, keep rows",difficulty:"warmup",prompt:"Return the **deal_id**, **owner**, and **amount** of every deal currently in stage `qualified`, ordered by `deal_id`.",starterQuery:`SELECT deal_id, owner, amount
FROM deals
WHERE stage = '...'
ORDER BY deal_id;`,solution:"SELECT deal_id, owner, amount FROM deals WHERE stage = 'qualified' ORDER BY deal_id;",orderMatters:!0,dpmConnection:{text:"SELECT / FROM / WHERE / ORDER BY is the sentence every other query extends. Being able to list the exact rows behind a number is the first habit of a Data PM.",kbSlug:"sql-101"},hint:"Text values need single quotes: 'qualified'."},{slug:"sql0-count-by-stage",chapter:0,title:"How many deals per stage?",difficulty:"warmup",prompt:"Count the deals in each `stage`. Return `stage` and `deals` (the count), ordered by `deals` descending, then `stage`.",starterQuery:`SELECT stage, COUNT(*) AS deals
FROM deals
GROUP BY -- ?
ORDER BY deals DESC, stage;`,solution:"SELECT stage, COUNT(*) AS deals FROM deals GROUP BY stage ORDER BY deals DESC, stage;",orderMatters:!0,dpmConnection:{text:"GROUP BY turns a table into one row per value. This is the shape of almost every chart: a dimension and a count.",kbSlug:"sql-101"},hint:"GROUP BY stage."},{slug:"sql0-avg-by-region",chapter:0,title:"Average deal size by region (JOIN)",difficulty:"warmup",prompt:"Region lives on `accounts`; amount lives on `deals`. Join them and return `region` and `avg_amount` (average `amount`, rounded to 0 decimals), ordered by region.",starterQuery:`SELECT a.region, ROUND(AVG(d.amount), 0) AS avg_amount
FROM deals d
JOIN accounts a ON -- the shared key
GROUP BY a.region
ORDER BY a.region;`,solution:"SELECT a.region, ROUND(AVG(d.amount), 0) AS avg_amount FROM deals d JOIN accounts a ON a.account_id = d.account_id GROUP BY a.region ORDER BY a.region;",orderMatters:!0,dpmConnection:{text:"Your first join: pair each deal with its account through account_id, then aggregate. Every metric that slices by a customer attribute has this shape.",kbSlug:"sql-101"},hint:"ON a.account_id = d.account_id."},{slug:"sql-select-closed-won",chapter:1,title:"See the rows behind the number",difficulty:"warmup",prompt:"Before you argue about a conversion rate, look at the rows that feed it.\n\nReturn the **deal_id**, **account_id**, and **amount** of every deal whose `stage` is `closed_won`, ordered by `deal_id`.",starterQuery:`SELECT deal_id, account_id, amount
FROM deals
WHERE -- your condition here
ORDER BY deal_id;`,solution:"SELECT deal_id, account_id, amount FROM deals WHERE stage = 'closed_won' ORDER BY deal_id;",orderMatters:!0,dpmConnection:{text:"Filtering to closed_won is the first step of the functional metric deals_closed_value. A Data PM who can point at the exact rows behind an aggregate can defend it; one who can't is trusting the dashboard.",kbSlug:"metric-types"},hint:"Compare the stage column to the string 'closed_won' (single quotes) in the WHERE clause."},{slug:"sql-deals-closed-value",chapter:1,title:"Functional metric: deals_closed_value",difficulty:"warmup",prompt:"Compute **deals_closed_value**: the total `amount` across all deals in stage `closed_won`. Return one row, one column named `deals_closed_value`.",starterQuery:`SELECT -- aggregate here
FROM deals
WHERE stage = 'closed_won';`,solution:"SELECT SUM(amount) AS deals_closed_value FROM deals WHERE stage = 'closed_won';",dpmConnection:{text:"This is the Playbook's functional metric for Sales: bookings. It rolls up into the North Star and is explained by granular metrics like conversion_rate in the Metric Dependency Tree.",kbSlug:"metric-types"},hint:"SUM(amount) with an alias: AS deals_closed_value."},{slug:"sql-revenue-generated",chapter:1,title:"North Star metric: revenue_generated",difficulty:"warmup",prompt:"The `transactions` table records actual money movements (initial, renewal, upsell) against won deals.\n\nCompute **revenue_generated**: the total `amount` across all transactions. One row, one column named `revenue_generated`.",starterQuery:`SELECT -- aggregate here
FROM transactions;`,solution:"SELECT SUM(amount) AS revenue_generated FROM transactions;",dpmConnection:{text:"revenue_generated is the North Star for Sales. Notice it is NOT the same number as deals_closed_value: transactions include renewals and upsells that deal amounts don't. Chapter 6 is entirely about explaining that gap to the CFO.",kbSlug:"metric-types"},hint:"SUM over transactions.amount; alias as revenue_generated."},{slug:"sql-conversion-rate",chapter:1,title:"Granular metric: conversion_rate (Dana's definition)",difficulty:"warmup",prompt:"Compute **conversion_rate** = closed_won ÷ (closed_won + closed_lost). Open deals (prospecting, qualified, proposal, negotiation) are excluded: they haven't converted or failed yet.\n\nOne row, one column `conversion_rate`, rounded to 4 decimals.",starterQuery:`SELECT ROUND(
  1.0 * SUM(CASE WHEN stage = 'closed_won' THEN 1 ELSE 0 END)
  / SUM(CASE WHEN stage IN ('closed_won', 'closed_lost') THEN 1 ELSE 0 END),
  4
) AS conversion_rate
FROM deals;`,solution:"SELECT ROUND(1.0 * SUM(CASE WHEN stage = 'closed_won' THEN 1 ELSE 0 END) / SUM(CASE WHEN stage IN ('closed_won', 'closed_lost') THEN 1 ELSE 0 END), 4) AS conversion_rate FROM deals;",dpmConnection:{text:"Compare this with the 'won ÷ all deals' query Raj showed you in the quiz. Same table, different denominator, a very different number. Which one is 'right' is a definition decision, and it belongs on the Metric Dependency Tree with a name.",kbSlug:"metric-types"},hint:"The starter is complete. Read it: 1.0 * forces decimal division; CASE WHEN inside SUM counts conditionally."},{slug:"sql-join-accounts-deals",chapter:2,title:"Won value by account (JOIN + GROUP BY)",difficulty:"core",prompt:"Join `accounts` to `deals` and report, for each account, the **account_name** and its **total_won** (sum of `amount` for `closed_won` deals). Order by `total_won` descending, then `account_name`.",starterQuery:`SELECT a.account_name, SUM(d.amount) AS total_won
FROM accounts a
JOIN deals d ON -- join condition
WHERE d.stage = 'closed_won'
GROUP BY a.account_name
ORDER BY total_won DESC, a.account_name;`,solution:"SELECT a.account_name, SUM(d.amount) AS total_won FROM accounts a JOIN deals d ON a.account_id = d.account_id WHERE d.stage = 'closed_won' GROUP BY a.account_name ORDER BY total_won DESC, a.account_name;",orderMatters:!0,dpmConnection:{text:"This is the logical model's 'Relationships' (accounts 1:N deals) turned into a measure. Splitting a functional metric by an entity is the first move of any root-cause walk.",kbSlug:"canvas-data-product-design"},hint:"Join on a.account_id = d.account_id."},{slug:"sql-rep-performance",chapter:2,title:"Won value by rep",difficulty:"core",prompt:"For each sales rep (`owner`), sum the `amount` of their `closed_won` deals. Return **owner** and **total_won**, ordered by `total_won` descending.",starterQuery:`SELECT owner, SUM(amount) AS total_won
FROM deals
WHERE stage = 'closed_won'
GROUP BY -- ?
ORDER BY total_won DESC;`,solution:"SELECT owner, SUM(amount) AS total_won FROM deals WHERE stage = 'closed_won' GROUP BY owner ORDER BY total_won DESC;",orderMatters:!0,dpmConnection:{text:"Slicing a metric by a dimension (owner) is what Dana actually asks for in a pipeline review. As a Data PM, look at the concentration: if one rep is a large share of the number, a data problem on their deals moves the North Star.",kbSlug:"bullseye-data-product-market-fit"},hint:"GROUP BY owner."},{slug:"sql-region-conversion",chapter:2,title:"conversion_rate by region",difficulty:"core",prompt:"Compute Dana's **conversion_rate** per **region** (region lives on `accounts`, stage on `deals`). Round to 4 decimals, order by region.",starterQuery:`SELECT a.region,
  ROUND(
    1.0 * SUM(CASE WHEN d.stage = 'closed_won' THEN 1 ELSE 0 END)
    / SUM(CASE WHEN d.stage IN ('closed_won', 'closed_lost') THEN 1 ELSE 0 END),
    4
  ) AS conversion_rate
FROM deals d
JOIN accounts a ON a.account_id = d.account_id
GROUP BY a.region
ORDER BY a.region;`,solution:"SELECT a.region, ROUND(1.0 * SUM(CASE WHEN d.stage = 'closed_won' THEN 1 ELSE 0 END) / SUM(CASE WHEN d.stage IN ('closed_won', 'closed_lost') THEN 1 ELSE 0 END), 4) AS conversion_rate FROM deals d JOIN accounts a ON a.account_id = d.account_id GROUP BY a.region ORDER BY a.region;",orderMatters:!0,dpmConnection:{text:"A granular metric cut by a dimension from a *different* entity. Most real metric-tree questions have this shape: the measure on one table, the slicing attribute on another. The join is where silent errors creep in.",kbSlug:"canvas-data-product-design"},hint:"The starter is complete. Understand each clause, then run it."},{slug:"sql-rca-source-lost",chapter:2,title:"Where are we losing deals?",difficulty:"core",prompt:"For each deal `source`, return **lost_value** (sum of `amount` for `closed_lost` deals) and **lost_count**. Order by `lost_value` descending.",starterQuery:`SELECT source,
  SUM(amount) AS lost_value,
  COUNT(*)    AS lost_count
FROM deals
WHERE stage = 'closed_lost'
GROUP BY source
ORDER BY lost_value DESC;`,solution:"SELECT source, SUM(amount) AS lost_value, COUNT(*) AS lost_count FROM deals WHERE stage = 'closed_lost' GROUP BY source ORDER BY lost_value DESC;",orderMatters:!0,dpmConnection:{text:"Two aggregates over the same filtered rows. The output is the raw material for a stakeholder conversation; the Data PM's job starts *after* the query: is Outbound losing on lead quality, pricing, or a data problem in how stage is recorded?",kbSlug:"proof-of-value-performance"},hint:"SUM for value, COUNT(*) for count, both over the closed_lost rows."},{slug:"sql-conversion-two-ways",chapter:2,title:"Two conversion rates, one query (CTE)",difficulty:"core",prompt:"Dana counts deals; Tomás counts dollars. Compute both on the same **resolved** deals (closed_won or closed_lost):\n\n- `conversion_rate_closed` = won deals ÷ resolved deals\n- `conversion_rate_value` = won amount ÷ resolved amount\n\nUse a CTE named `resolved` for the filtered rows. One row, both columns, rounded to 4 decimals.",starterQuery:`WITH resolved AS (
  SELECT * FROM deals WHERE stage IN ('closed_won', 'closed_lost')
)
SELECT
  ROUND(1.0 * SUM(stage = 'closed_won') / COUNT(*), 4) AS conversion_rate_closed,
  -- add the value-based rate
FROM resolved;`,solution:"WITH resolved AS (SELECT * FROM deals WHERE stage IN ('closed_won', 'closed_lost')) SELECT ROUND(1.0 * SUM(stage = 'closed_won') / COUNT(*), 4) AS conversion_rate_closed, ROUND(1.0 * SUM(CASE WHEN stage = 'closed_won' THEN amount ELSE 0 END) / SUM(amount), 4) AS conversion_rate_value FROM resolved;",dpmConnection:{text:"Same rows, two legitimate metrics. The Metric Dependency Tree gives each a name and an owner so the whiteboard fight happens once. In SQLite, SUM(stage = 'closed_won') counts rows where the comparison is true.",kbSlug:"canvas-data-product-design"},hint:"SUM(CASE WHEN stage = 'closed_won' THEN amount ELSE 0 END) / SUM(amount)."},{slug:"sql-stage-funnel",chapter:2,title:"The funnel from the history log",difficulty:"core",prompt:"`deals.stage` is overwritten every time a deal moves. `deal_stage_history` keeps every transition.\n\nFor each stage, count the **distinct deals that ever entered it**. Return `stage` and `deals_reached`, ordered in funnel order (prospecting → qualified → proposal → negotiation → closed_won → closed_lost).",starterQuery:`SELECT stage, COUNT(DISTINCT deal_id) AS deals_reached
FROM deal_stage_history
GROUP BY stage
ORDER BY ${t};`,solution:`SELECT stage, COUNT(DISTINCT deal_id) AS deals_reached FROM deal_stage_history GROUP BY stage ORDER BY ${t};`,orderMatters:!0,dpmConnection:{text:"A funnel is an 'ever reached' question, which only an append-only log can answer. This is why the logical model treats the history table, not the CRM's current stage, as the source for funnel metrics.",kbSlug:"funnel-conversion-analysis"},hint:"COUNT(DISTINCT deal_id) so duplicate log rows don't inflate the count. The CASE in ORDER BY imposes funnel order."},{slug:"sql-stage-to-stage",chapter:2,title:"Stage-to-stage conversion (self-join on a CTE)",difficulty:"advanced",prompt:"Compute the conversion between consecutive funnel stages: prospecting→qualified, qualified→proposal, proposal→negotiation, negotiation→closed_won.\n\nBuild a CTE `reached` with each stage's distinct deal count and its funnel position (1–5, ignore closed_lost), then join it to itself on position + 1. Return `from_stage`, `to_stage`, `step_rate` (rounded to 4), in funnel order.",starterQuery:`WITH reached AS (
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
ORDER BY a.ord;`,solution:"WITH reached AS (SELECT stage, COUNT(DISTINCT deal_id) AS n, CASE stage WHEN 'prospecting' THEN 1 WHEN 'qualified' THEN 2 WHEN 'proposal' THEN 3 WHEN 'negotiation' THEN 4 WHEN 'closed_won' THEN 5 END AS ord FROM deal_stage_history WHERE stage <> 'closed_lost' GROUP BY stage) SELECT a.stage AS from_stage, b.stage AS to_stage, ROUND(1.0 * b.n / a.n, 4) AS step_rate FROM reached a JOIN reached b ON b.ord = a.ord + 1 ORDER BY a.ord;",orderMatters:!0,dpmConnection:{text:"Overall conversion says *whether* deals close; stage-to-stage says *where* they drop. Different question, different query. The Data PM reads the weakest step as the place to look first.",kbSlug:"funnel-conversion-analysis"},hint:"ROUND(1.0 * b.n / a.n, 4) AS step_rate."},{slug:"sql-days-in-stage",chapter:2,title:"Average days in each stage (LEAD window)",difficulty:"advanced",prompt:"Velocity: how long do deals sit in each stage?\n\nFor every history row, the time in that stage is the gap to the deal's *next* row. Use `LEAD(entered_at) OVER (PARTITION BY deal_id ORDER BY entered_at)` and `julianday()` to get days. Start from `SELECT DISTINCT deal_id, stage, entered_at` so duplicate log rows don't create zero-day gaps.\n\nReturn `stage` and `avg_days` (rounded to 1 decimal) for the four pre-close stages, in funnel order.",starterQuery:`WITH h AS (
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
ORDER BY CASE stage WHEN 'prospecting' THEN 1 WHEN 'qualified' THEN 2 WHEN 'proposal' THEN 3 ELSE 4 END;`,solution:"WITH h AS (SELECT DISTINCT deal_id, stage, entered_at FROM deal_stage_history), steps AS (SELECT deal_id, stage, julianday(LEAD(entered_at) OVER (PARTITION BY deal_id ORDER BY entered_at)) - julianday(entered_at) AS days FROM h) SELECT stage, ROUND(AVG(days), 1) AS avg_days FROM steps WHERE days IS NOT NULL GROUP BY stage ORDER BY CASE stage WHEN 'prospecting' THEN 1 WHEN 'qualified' THEN 2 WHEN 'proposal' THEN 3 ELSE 4 END;",orderMatters:!0,dpmConnection:{text:"Your first window function. Terminal stages get NULL from LEAD (no next row), which the WHERE removes. Time-in-stage is the metric Dana actually wants when she says 'where are deals stuck?'",kbSlug:"sql-toolkit-for-data-pms"},hint:"The starter is complete; run it and make sure you can explain why closed stages don't appear."},{slug:"sql-monthly-cohort",chapter:2,title:"Created-month cohorts",difficulty:"core",prompt:"Group deals by the month they were created (`substr(created_date, 1, 7)`). Return `cohort_month`, `created`, `won`, `lost`, `still_open`, ordered by month.",starterQuery:`SELECT substr(created_date, 1, 7) AS cohort_month,
  COUNT(*) AS created,
  SUM(stage = 'closed_won') AS won,
  -- lost, still_open
FROM deals
GROUP BY cohort_month
ORDER BY cohort_month;`,solution:"SELECT substr(created_date, 1, 7) AS cohort_month, COUNT(*) AS created, SUM(stage = 'closed_won') AS won, SUM(stage = 'closed_lost') AS lost, SUM(stage NOT IN ('closed_won', 'closed_lost')) AS still_open FROM deals GROUP BY cohort_month ORDER BY cohort_month;",orderMatters:!0,dpmConnection:{text:"Look at the right edge: recent cohorts have many still_open deals. Any 'won ÷ created' chart will sag there for no business reason. Chapter 5 starts by ruling that artifact out.",kbSlug:"funnel-conversion-analysis"},hint:"SUM(stage = 'closed_lost') and SUM(stage NOT IN ('closed_won','closed_lost'))."},{slug:"sql-dup-transactions",chapter:3,title:"Uniqueness: duplicate transactions",difficulty:"core",prompt:"The revenue tile jumped overnight and fell back. Find transactions that appear more than once with the same `deal_id`, `amount`, and `transaction_date`.\n\nReturn `deal_id`, `amount`, `transaction_date`, `copies` (the count), ordered by `deal_id`.",starterQuery:`SELECT deal_id, amount, transaction_date, COUNT(*) AS copies
FROM transactions
GROUP BY deal_id, amount, transaction_date
HAVING -- only groups with more than one row
ORDER BY deal_id;`,solution:"SELECT deal_id, amount, transaction_date, COUNT(*) AS copies FROM transactions GROUP BY deal_id, amount, transaction_date HAVING COUNT(*) > 1 ORDER BY deal_id;",orderMatters:!0,dpmConnection:{text:"GROUP BY key HAVING COUNT(*) > 1 is *the* duplicate idiom. A re-ingested file passes every pipeline status check and still double-counts revenue. This query becomes a uniqueness SLO that runs after every load.",kbSlug:"data-quality-dimensions"},hint:"HAVING COUNT(*) > 1."},{slug:"sql-stale-stage",chapter:3,title:"Consistency: CRM stage vs. latest history",difficulty:"advanced",prompt:"Reps update stages late. Find deals whose `deals.stage` disagrees with the **latest** row in `deal_stage_history`.\n\nUse `ROW_NUMBER() OVER (PARTITION BY deal_id ORDER BY entered_at DESC, history_id DESC)` in a CTE to pick each deal's latest history row. Return `deal_id`, `crm_stage`, `latest_stage`, ordered by `deal_id`.",starterQuery:`WITH latest AS (
  SELECT deal_id, stage,
    ROW_NUMBER() OVER (PARTITION BY deal_id ORDER BY entered_at DESC, history_id DESC) AS rn
  FROM deal_stage_history
)
SELECT d.deal_id, d.stage AS crm_stage, l.stage AS latest_stage
FROM deals d
JOIN latest l ON l.deal_id = d.deal_id AND l.rn = 1
WHERE -- the two stages differ
ORDER BY d.deal_id;`,solution:"WITH latest AS (SELECT deal_id, stage, ROW_NUMBER() OVER (PARTITION BY deal_id ORDER BY entered_at DESC, history_id DESC) AS rn FROM deal_stage_history) SELECT d.deal_id, d.stage AS crm_stage, l.stage AS latest_stage FROM deals d JOIN latest l ON l.deal_id = d.deal_id AND l.rn = 1 WHERE d.stage <> l.stage ORDER BY d.deal_id;",orderMatters:!0,dpmConnection:{text:"'Latest row per entity' via ROW_NUMBER is the most reused window pattern in data work. The fix isn't editing four CRM rows; it's making the history log the source of truth in the transform and turning this query into a consistency SLO.",kbSlug:"data-quality-dimensions"},hint:"WHERE d.stage <> l.stage."},{slug:"sql-missing-closed-date",chapter:3,title:"Completeness: closed deals without a close date",difficulty:"core",prompt:"Every closed deal must have a `closed_date`. Find the ones that don't. Return `deal_id`, `stage`, `owner`, ordered by `deal_id`.",starterQuery:`SELECT deal_id, stage, owner
FROM deals
WHERE stage IN ('closed_won', 'closed_lost')
  AND -- closed_date is missing
ORDER BY deal_id;`,solution:"SELECT deal_id, stage, owner FROM deals WHERE stage IN ('closed_won', 'closed_lost') AND closed_date IS NULL ORDER BY deal_id;",orderMatters:!0,dpmConnection:{text:"NULL never equals anything; you must write IS NULL. These rows silently vanish from any 'closed in month X' report, so bookings by month are understated without anyone noticing. Completeness SLO: 100% of closed deals have a closed_date.",kbSlug:"data-quality-dimensions"},hint:"closed_date IS NULL (not = NULL)."},{slug:"sql-freshness",chapter:3,title:"Timeliness: how stale is each pipeline?",difficulty:"core",prompt:"For each pipeline, find the most recent run that did **not** fail (`status <> 'failed'`) and how many hours old it is as of `2026-08-31 09:00:00`.\n\nReturn `pipeline`, `last_good_run` (max `finished_at`), `hours_stale` (rounded to 1 decimal, using `julianday` × 24), ordered by pipeline.",starterQuery:`SELECT pipeline,
  MAX(finished_at) AS last_good_run,
  ROUND((julianday('2026-08-31 09:00:00') - julianday(MAX(finished_at))) * 24, 1) AS hours_stale
FROM pipeline_runs
WHERE status <> 'failed'
GROUP BY pipeline
ORDER BY pipeline;`,solution:"SELECT pipeline, MAX(finished_at) AS last_good_run, ROUND((julianday('2026-08-31 09:00:00') - julianday(MAX(finished_at))) * 24, 1) AS hours_stale FROM pipeline_runs WHERE status <> 'failed' GROUP BY pipeline ORDER BY pipeline;",orderMatters:!0,dpmConnection:{text:"This is a freshness SLO as a query: measurement, threshold (< 24h), and evaluation time (09:00). 'The job is scheduled at 02:00' is not an SLO; this is.",kbSlug:"data-quality-dimensions"},hint:"The starter is complete. Change the as-of timestamp and watch hours_stale move."},{slug:"sql-failed-recovery",chapter:3,title:"Failed runs and time to recover",difficulty:"advanced",prompt:"For every failed run, find when that pipeline next had a non-failed run and how many days that took.\n\nReturn `pipeline`, `failed_on`, `recovered_on`, `days_to_recover` (integer), ordered by pipeline then `failed_on`. A correlated subquery is the simplest tool here.",starterQuery:`SELECT f.pipeline,
  f.run_date AS failed_on,
  (SELECT MIN(s.run_date) FROM pipeline_runs s
    WHERE s.pipeline = f.pipeline AND s.status <> 'failed' AND s.run_date > f.run_date) AS recovered_on,
  -- days_to_recover: julianday(recovered_on) - julianday(failed_on), cast to INTEGER
FROM pipeline_runs f
WHERE f.status = 'failed'
ORDER BY f.pipeline, f.run_date;`,solution:"SELECT f.pipeline, f.run_date AS failed_on, (SELECT MIN(s.run_date) FROM pipeline_runs s WHERE s.pipeline = f.pipeline AND s.status <> 'failed' AND s.run_date > f.run_date) AS recovered_on, CAST(julianday((SELECT MIN(s.run_date) FROM pipeline_runs s WHERE s.pipeline = f.pipeline AND s.status <> 'failed' AND s.run_date > f.run_date)) - julianday(f.run_date) AS INTEGER) AS days_to_recover FROM pipeline_runs f WHERE f.status = 'failed' ORDER BY f.pipeline, f.run_date;",orderMatters:!0,dpmConnection:{text:"A three-day gap with no alert is how the June revenue numbers went stale for a weekend. Time-to-recover is the SLO metric an on-call rotation is measured on; you can't manage it until you can query it.",kbSlug:"data-product-activation"},hint:"Repeat the subquery inside CAST(julianday(...) - julianday(f.run_date) AS INTEGER), or wrap the whole thing in a CTE."},{slug:"sql-rowcount-anomaly",chapter:3,title:"Row-count anomaly vs. trailing average (window frame)",difficulty:"advanced",prompt:"A run can succeed and still process a partial file. Flag non-failed runs whose `rows_out` is below **50% of the average of the previous 7 runs** for the same pipeline.\n\nUse `AVG(rows_out) OVER (PARTITION BY pipeline ORDER BY run_date ROWS BETWEEN 7 PRECEDING AND 1 PRECEDING)`. Return `pipeline`, `run_date`, `rows_out`, `trailing_avg` (rounded to 1), ordered by `run_date`.",starterQuery:`WITH ok AS (
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
ORDER BY run_date;`,solution:"WITH ok AS (SELECT pipeline, run_date, rows_out FROM pipeline_runs WHERE status <> 'failed'), w AS (SELECT pipeline, run_date, rows_out, AVG(rows_out) OVER (PARTITION BY pipeline ORDER BY run_date ROWS BETWEEN 7 PRECEDING AND 1 PRECEDING) AS trailing_avg FROM ok) SELECT pipeline, run_date, rows_out, ROUND(trailing_avg, 1) AS trailing_avg FROM w WHERE trailing_avg IS NOT NULL AND rows_out < 0.5 * trailing_avg ORDER BY run_date;",orderMatters:!0,dpmConnection:{text:"A window *frame* (ROWS BETWEEN … PRECEDING) turns a per-run number into a per-run baseline. This is the volume check that catches 'success' on a 30% file, which no status column ever will.",kbSlug:"data-quality-dimensions"},hint:"rows_out < 0.5 * trailing_avg."},{slug:"sql-weekly-active",chapter:4,title:"Weekly active viewers",difficulty:"core",prompt:"Count **distinct viewers per week** of the *Sales Funnel Accelerator* dashboard. Bucket weeks with `strftime('%Y-%W', viewed_at)`. Return `week` and `active_viewers`, ordered by week.",starterQuery:`SELECT strftime('%Y-%W', viewed_at) AS week,
  -- distinct people, not rows
FROM dashboard_views
WHERE dashboard = 'Sales Funnel Accelerator'
GROUP BY week
ORDER BY week;`,solution:"SELECT strftime('%Y-%W', viewed_at) AS week, COUNT(DISTINCT viewer_id) AS active_viewers FROM dashboard_views WHERE dashboard = 'Sales Funnel Accelerator' GROUP BY week ORDER BY week;",orderMatters:!0,dpmConnection:{text:"COUNT(DISTINCT viewer_id), never COUNT(*): views measure activity, viewers measure adoption. Sofia's question was 'is anyone using it?', which is a question about people.",kbSlug:"go-to-market-launch"},hint:"COUNT(DISTINCT viewer_id) AS active_viewers."},{slug:"sql-adoption-by-role",chapter:4,title:"Adoption by role",difficulty:"core",prompt:"For the *Sales Funnel Accelerator*, report per `viewer_role`: `viewers` (distinct people), `views` (rows), and `views_per_viewer` (rounded to 1 decimal). Order by `viewers` descending, then role.",starterQuery:`SELECT viewer_role,
  COUNT(DISTINCT viewer_id) AS viewers,
  COUNT(*) AS views,
  -- views_per_viewer
FROM dashboard_views
WHERE dashboard = 'Sales Funnel Accelerator'
GROUP BY viewer_role
ORDER BY viewers DESC, viewer_role;`,solution:"SELECT viewer_role, COUNT(DISTINCT viewer_id) AS viewers, COUNT(*) AS views, ROUND(1.0 * COUNT(*) / COUNT(DISTINCT viewer_id), 1) AS views_per_viewer FROM dashboard_views WHERE dashboard = 'Sales Funnel Accelerator' GROUP BY viewer_role ORDER BY viewers DESC, viewer_role;",orderMatters:!0,dpmConnection:{text:"Which audience is missing is more useful than how many views there are. A role with zero viewers (Finance, at Meridian) is next week's stakeholder conversation, not a failure of the dashboard.",kbSlug:"go-to-market-launch"},hint:"ROUND(1.0 * COUNT(*) / COUNT(DISTINCT viewer_id), 1)."},{slug:"sql-dashboard-mom",chapter:4,title:"Legacy vs. new dashboard, month over month (LAG)",difficulty:"advanced",prompt:"For each dashboard and month, report `views` and the change versus the previous month (`change_vs_prev`, NULL for the first month). Aggregate to months in a CTE first, then use `LAG(views) OVER (PARTITION BY dashboard ORDER BY month)`. Order by dashboard, month.",starterQuery:`WITH m AS (
  SELECT dashboard, substr(viewed_at, 1, 7) AS month, COUNT(*) AS views
  FROM dashboard_views
  GROUP BY dashboard, month
)
SELECT dashboard, month, views,
  -- views minus the previous month's views for the same dashboard
FROM m
ORDER BY dashboard, month;`,solution:"WITH m AS (SELECT dashboard, substr(viewed_at, 1, 7) AS month, COUNT(*) AS views FROM dashboard_views GROUP BY dashboard, month) SELECT dashboard, month, views, views - LAG(views) OVER (PARTITION BY dashboard ORDER BY month) AS change_vs_prev FROM m ORDER BY dashboard, month;",orderMatters:!0,dpmConnection:{text:"Grain first (one row per dashboard-month), window second. The story in the output, legacy fading while the new product grows, is the evidence that lets you retire the old report with a redirect instead of a memo.",kbSlug:"sql-toolkit-for-data-pms"},hint:"views - LAG(views) OVER (PARTITION BY dashboard ORDER BY month) AS change_vs_prev."},{slug:"sql-rca-confirm",chapter:5,title:"Step 1: is the drop real?",difficulty:"core",prompt:"Before slicing, remove the open-deal artifact. Compute conversion (won ÷ resolved) by **created-month cohort**, using only **resolved** deals created on or before `2026-06-30`.\n\nReturn `cohort_month`, `resolved`, `conversion_rate` (4 decimals), ordered by month.",starterQuery:`SELECT substr(created_date, 1, 7) AS cohort_month,
  COUNT(*) AS resolved,
  ROUND(1.0 * SUM(stage = 'closed_won') / COUNT(*), 4) AS conversion_rate
FROM deals
WHERE stage IN ('closed_won', 'closed_lost')
  AND created_date <= '2026-06-30'
GROUP BY cohort_month
ORDER BY cohort_month;`,solution:"SELECT substr(created_date, 1, 7) AS cohort_month, COUNT(*) AS resolved, ROUND(1.0 * SUM(stage = 'closed_won') / COUNT(*), 4) AS conversion_rate FROM deals WHERE stage IN ('closed_won', 'closed_lost') AND created_date <= '2026-06-30' GROUP BY cohort_month ORDER BY cohort_month;",orderMatters:!0,dpmConnection:{text:"The first RCA step is proving the number is real, not an artifact of cohorts that haven't had time to close. May and June should still look low after this filter. If they didn't, the meeting would be over.",kbSlug:"funnel-conversion-analysis"},hint:"The starter is complete. Compare with the unfiltered cohort query from chapter 2."},{slug:"sql-rca-segment",chapter:5,title:"Step 2: which segment moved? (region × source, before vs. during)",difficulty:"advanced",prompt:"Compare conversion for deals created **before May** (`created_date < '2026-05-01'`) with deals created **May–June**, for every `region` × `source` cell. Resolved deals only, created on or before `2026-06-30`.\n\nReturn `region`, `source`, `conv_before`, `conv_during` (both rounded to 2 decimals), `deals_during`. Order by region, source.",starterQuery:`WITH r AS (
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
ORDER BY region, source;`,solution:"WITH r AS (SELECT d.stage, d.source, a.region, CASE WHEN d.created_date < '2026-05-01' THEN 'before' ELSE 'during' END AS period FROM deals d JOIN accounts a ON a.account_id = d.account_id WHERE d.stage IN ('closed_won', 'closed_lost') AND d.created_date <= '2026-06-30') SELECT region, source, ROUND(1.0 * SUM(period = 'before' AND stage = 'closed_won') / SUM(period = 'before'), 2) AS conv_before, ROUND(1.0 * SUM(period = 'during' AND stage = 'closed_won') / SUM(period = 'during'), 2) AS conv_during, SUM(period = 'during') AS deals_during FROM r GROUP BY region, source ORDER BY region, source;",orderMatters:!0,dpmConnection:{text:"One query, nine cells, and only one of them collapses. A price increase would depress every cell; a vendor change for AMER outbound leads depresses exactly one. This is how the tree kills theories cheaply.",kbSlug:"funnel-conversion-analysis"},hint:"Mirror conv_before with period = 'during'; deals_during is SUM(period = 'during')."},{slug:"sql-rca-velocity",chapter:5,title:"Step 3: where in the funnel? (negotiation time, before vs. during)",difficulty:"advanced",prompt:"In the AMER × Outbound segment, compare average days spent in **negotiation** for deals created before May versus May–June (created on or before `2026-06-30`).\n\nReuse the LEAD-based `steps` CTE from chapter 2. Return `period`, `avg_days_in_negotiation` (1 decimal), `deals`, ordered by period.",starterQuery:`WITH h AS (
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
ORDER BY seg.period;`,solution:"WITH h AS (SELECT DISTINCT deal_id, stage, entered_at FROM deal_stage_history), steps AS (SELECT deal_id, stage, julianday(LEAD(entered_at) OVER (PARTITION BY deal_id ORDER BY entered_at)) - julianday(entered_at) AS days FROM h), seg AS (SELECT d.deal_id, CASE WHEN d.created_date < '2026-05-01' THEN 'before' ELSE 'during' END AS period FROM deals d JOIN accounts a ON a.account_id = d.account_id WHERE a.region = 'AMER' AND d.source = 'Outbound' AND d.created_date <= '2026-06-30') SELECT seg.period, ROUND(AVG(steps.days), 1) AS avg_days_in_negotiation, COUNT(*) AS deals FROM steps JOIN seg ON seg.deal_id = steps.deal_id WHERE steps.stage = 'negotiation' AND steps.days IS NOT NULL GROUP BY seg.period ORDER BY seg.period;",orderMatters:!0,dpmConnection:{text:"Deals still reach negotiation, then stall and die. Late-funnel losses with longer negotiation point at lead quality, not at reps' data hygiene. Three CTEs, each named for what it produces, is how a Data PM keeps a query like this readable in a meeting.",kbSlug:"funnel-conversion-analysis"},hint:"The starter is complete. Change the region/source filter to see that other segments did not change."},{slug:"sql-rca-size",chapter:5,title:"Step 4: size it",difficulty:"core",prompt:"Sofia needs a number. For AMER × Outbound deals created May–June 2026 that were **closed_lost**, return `owner`, `lost_deals`, `lost_value`, ordered by `lost_value` descending.",starterQuery:`SELECT d.owner, COUNT(*) AS lost_deals, SUM(d.amount) AS lost_value
FROM deals d
JOIN accounts a ON a.account_id = d.account_id
WHERE a.region = 'AMER' AND d.source = 'Outbound'
  AND d.stage = 'closed_lost'
  AND d.created_date BETWEEN '2026-05-01' AND '2026-06-30'
GROUP BY d.owner
ORDER BY lost_value DESC;`,solution:"SELECT d.owner, COUNT(*) AS lost_deals, SUM(d.amount) AS lost_value FROM deals d JOIN accounts a ON a.account_id = d.account_id WHERE a.region = 'AMER' AND d.source = 'Outbound' AND d.stage = 'closed_lost' AND d.created_date BETWEEN '2026-05-01' AND '2026-06-30' GROUP BY d.owner ORDER BY lost_value DESC;",orderMatters:!0,dpmConnection:{text:"Root cause work ends with a size and an owner, not a chart. This is the slide: cause, deals and dollars affected, alternatives ruled out, proposed fix.",kbSlug:"proof-of-value-performance"},hint:"The starter is complete. Try removing the region/source filter to see how much of total May–June loss this segment explains."},{slug:"sql-reconcile-bookings-revenue",chapter:6,title:"Bookings vs. revenue by month",difficulty:"advanced",prompt:"Tomás has two numbers. Put them side by side per month:\n\n- `bookings` = sum of `amount` for `closed_won` deals by `closed_date` month (skip NULL dates)\n- `revenue` = sum of `transactions.amount` by `transaction_date` month\n\nSome months exist in only one side, so build a `months` CTE with `UNION` and LEFT JOIN both. Return `month`, `bookings`, `revenue`, `difference` (revenue − bookings; use COALESCE so missing months show 0). Order by month.",starterQuery:`WITH b AS (
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
ORDER BY m.month;`,solution:"WITH b AS (SELECT substr(closed_date, 1, 7) AS month, SUM(amount) AS bookings FROM deals WHERE stage = 'closed_won' AND closed_date IS NOT NULL GROUP BY month), r AS (SELECT substr(transaction_date, 1, 7) AS month, SUM(amount) AS revenue FROM transactions GROUP BY month), months AS (SELECT month FROM b UNION SELECT month FROM r) SELECT m.month, COALESCE(b.bookings, 0) AS bookings, COALESCE(r.revenue, 0) AS revenue, COALESCE(r.revenue, 0) - COALESCE(b.bookings, 0) AS difference FROM months m LEFT JOIN b ON b.month = m.month LEFT JOIN r ON r.month = m.month ORDER BY m.month;",orderMatters:!0,dpmConnection:{text:"Neither number is wrong. Bookings is what Sales books; revenue is what Finance collects. The reconciliation is the bridge on the board slide, and the SQL pattern (UNION of keys, LEFT JOIN both sides) is how you compare any two metrics that should agree.",kbSlug:"ontology-as-infrastructure"},hint:"COALESCE(r.revenue, 0) - COALESCE(b.bookings, 0) AS difference."},{slug:"sql-revenue-bridge",chapter:6,title:"Explain the gap: revenue bridge",difficulty:"advanced",prompt:"Break `transactions` into buckets that explain the bookings-vs-revenue gap: `initial`, `renewal`, `upsell`, and `duplicate` (the extra copies you found in chapter 3).\n\nUse `ROW_NUMBER() OVER (PARTITION BY deal_id, amount, transaction_date, type ORDER BY transaction_id)`; rows with `rn > 1` are duplicates. Return `bucket`, `transactions`, `amount`, ordered by `amount` descending.",starterQuery:`WITH ranked AS (
  SELECT *,
    ROW_NUMBER() OVER (PARTITION BY deal_id, amount, transaction_date, type ORDER BY transaction_id) AS rn
  FROM transactions
)
SELECT CASE WHEN rn > 1 THEN 'duplicate' ELSE type END AS bucket,
  COUNT(*) AS transactions,
  SUM(amount) AS amount
FROM ranked
GROUP BY bucket
ORDER BY amount DESC;`,solution:"WITH ranked AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY deal_id, amount, transaction_date, type ORDER BY transaction_id) AS rn FROM transactions) SELECT CASE WHEN rn > 1 THEN 'duplicate' ELSE type END AS bucket, COUNT(*) AS transactions, SUM(amount) AS amount FROM ranked GROUP BY bucket ORDER BY amount DESC;",orderMatters:!0,dpmConnection:{text:"Every dollar of the difference now has a name. 'Initial' should reconcile to bookings; renewals and upsells are the healthy part of the gap; duplicates are the part you remove. This is the bridge the CFO puts under the two numbers.",kbSlug:"ontology-as-infrastructure"},hint:"The starter is complete. Compare the initial bucket with total bookings from the previous exercise."},{slug:"sql-running-revenue",chapter:6,title:"Running revenue total",difficulty:"advanced",prompt:"Compute monthly revenue from `transactions` and a **running total** across months. Aggregate to months in a CTE first, then `SUM(revenue) OVER (ORDER BY month)`. Return `month`, `revenue`, `running_total`, ordered by month.",starterQuery:`WITH m AS (
  SELECT substr(transaction_date, 1, 7) AS month, SUM(amount) AS revenue
  FROM transactions
  GROUP BY month
)
SELECT month, revenue,
  -- running_total
FROM m
ORDER BY month;`,solution:"WITH m AS (SELECT substr(transaction_date, 1, 7) AS month, SUM(amount) AS revenue FROM transactions GROUP BY month) SELECT month, revenue, SUM(revenue) OVER (ORDER BY month) AS running_total FROM m ORDER BY month;",orderMatters:!0,dpmConnection:{text:"Grain first, window second. Skip the CTE and the running total steps up on every transaction row instead of every month. This query becomes Meridian's first gold metric with a written definition, a test, and an SLO.",kbSlug:"sql-toolkit-for-data-pms"},hint:"SUM(revenue) OVER (ORDER BY month) AS running_total."},{slug:"sql-capstone-metric-tree",chapter:6,title:"Capstone: the whole metric tree, one query",difficulty:"advanced",prompt:"For the months `2026-06`, `2026-07`, `2026-08`, produce the metric tree in one result:\n\n- `revenue_generated`: transactions by `transaction_date` month\n- `deals_closed_value`: won amount by `closed_date` month\n- `conversion_rate`: won ÷ (won + lost) among deals **closed** in that month (4 decimals)\n\nTwo CTEs (`rev`, `closed`) joined on month. Return `month`, `revenue_generated`, `deals_closed_value`, `conversion_rate`, ordered by month.",starterQuery:`WITH rev AS (
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
ORDER BY c.month;`,solution:"WITH rev AS (SELECT substr(transaction_date, 1, 7) AS month, SUM(amount) AS revenue_generated FROM transactions GROUP BY month), closed AS (SELECT substr(closed_date, 1, 7) AS month, SUM(CASE WHEN stage = 'closed_won' THEN amount ELSE 0 END) AS deals_closed_value, ROUND(1.0 * SUM(stage = 'closed_won') / COUNT(*), 4) AS conversion_rate FROM deals WHERE closed_date IS NOT NULL AND stage IN ('closed_won', 'closed_lost') GROUP BY month) SELECT c.month, COALESCE(r.revenue_generated, 0) AS revenue_generated, c.deals_closed_value, c.conversion_rate FROM closed c LEFT JOIN rev r ON r.month = c.month WHERE c.month IN ('2026-06', '2026-07', '2026-08') ORDER BY c.month;",orderMatters:!0,dpmConnection:{text:"North Star, functional, granular: one definition each, one query, one owner. Six weeks ago these were three arguments. Now they are a semantic contract that a dashboard, a finance analyst, and an AI agent can all read the same way.",kbSlug:"metric-types"},hint:"The starter is complete. Notice conversion here is by *closed* month, not created cohort: a different, equally valid cut. Name it accordingly on the tree."}];e.s(["sqlExercises",0,a,"sqlExercisesForChapter",0,function(e){return a.filter(t=>t.chapter===e)}])},87110,e=>{"use strict";let t=[{slug:"what-is-a-data-product-manager",title:"What is a Data Product Manager?",category:"definition",tags:["role","fundamentals"],summary:"A DPM sits at the intersection of data, technology, and business, managing data warehouses, platforms, pipelines, and ML models the way a PM manages a product.",body:`A **Data Product Manager (DPM)** is a specialized role at the intersection of
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
the data, not just shipping features.`,source:"PRD - Data Product Management.pdf"},{slug:"four-key-shifts",title:"The Four Key Shifts (Data PM vs. General PM)",category:"framework",tags:["role","mindset"],summary:"Risk profile, success metrics, customer journey, and team dynamic all invert when you move from general PM to data PM.",body:`Four dimensions where Data Product Management inverts the general-PM
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
   negotiation usually mean lead quality; early losses mean targeting.`,source:"Synthesized for DPM Lab; builds on the Playbook's Metric Dependency Tree."},{slug:"sql-toolkit-for-data-pms",title:"The SQL a Data PM Actually Uses",category:"definition",tags:["sql","skills"],summary:"CTEs for readable steps, window functions for per-row context, date bucketing for trends, and the four bugs that silently corrupt metrics.",body:"You are not writing production pipelines. You are verifying numbers,\nsizing problems, and reading other people's queries. That needs a small,\nsharp toolkit.\n\n## Shapes you'll write every week\n- **CTEs** (`WITH x AS (...)`) — one step per CTE, named after what it\n  produces (`resolved_deals`, `latest_stage`). Readable beats clever.\n- **Window functions** — `ROW_NUMBER() OVER (PARTITION BY deal_id ORDER BY\n  entered_at DESC)` for \"latest per entity\"; `LAG`/`LEAD` for change\n  between rows; `SUM(...) OVER (ORDER BY month)` for running totals;\n  `AVG(...) OVER (... ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)` for moving\n  averages.\n- **Date bucketing** — `substr(date, 1, 7)` for month, `strftime('%Y-%W',\n  ts)` for ISO-ish week, `julianday(b) - julianday(a)` for day differences\n  (SQLite).\n- **Conditional aggregation** — `SUM(CASE WHEN ... THEN 1 ELSE 0 END)` (or\n  `SUM(condition)` in SQLite) to compute several rates in one pass.\n- **HAVING** — filter *after* aggregation; the idiom for duplicates:\n  `GROUP BY key HAVING COUNT(*) > 1`.\n\n## The four silent metric bugs\n1. **Join fan-out** — joining a 1:N table before an aggregate multiplies\n   the measure. Aggregate the N side first.\n2. **LEFT JOIN + WHERE on the right table** — turns it into an inner join\n   and hides exactly the missing rows you were looking for. Put the\n   condition in `ON`.\n3. **COUNT(*) vs COUNT(DISTINCT x)** — views vs viewers, rows vs people.\n4. **Integer division** — `7 / 10 = 0` in many engines. Multiply by\n   `1.0` first.\n\n## Grain first, window second\nDecide what one row means (a deal? a month?), aggregate to that grain in a\nCTE, *then* apply windows. Running totals and moving averages on the wrong\ngrain look plausible and are wrong.",source:"Synthesized for DPM Lab."},{slug:"sql-101",title:"SQL 101: the formulas",category:"definition",tags:["sql","basics","level-0"],summary:"The clause order, filters, aggregates, GROUP BY/HAVING, and joins that every exercise in this app is built from.",body:"## The sentence\n```sql\nSELECT column_a, column_b        -- which columns\nFROM table_name                  -- which table\nWHERE condition                  -- which rows\nGROUP BY column_a                -- one row per value\nHAVING COUNT(*) > 1              -- filter groups\nORDER BY column_b DESC           -- sort\nLIMIT 10;                        -- keep n rows\n```\nClauses are optional but their order is fixed. Text goes in single quotes;\nnumbers don't. `;` ends the statement.\n\n## Filters\n| Want | Write |\n|---|---|\n| both | `a = 1 AND b = 2` |\n| either | `a = 1 OR b = 2` (use parentheses with AND) |\n| any of a list | `stage IN ('closed_won', 'closed_lost')` |\n| a range | `amount BETWEEN 1000 AND 5000` |\n| not equal | `stage <> 'closed_lost'` |\n| missing | `closed_date IS NULL` (never `= NULL`) |\n| pattern | `email LIKE '%@northwind%'` |\n\n## Aggregates\n`COUNT(*)`, `COUNT(col)` (non-NULL only), `SUM`, `AVG`, `MIN`, `MAX`.\nName the result: `SUM(amount) AS total`. In SQLite, `SUM(stage = 'closed_won')`\ncounts rows where the comparison is true, and `1.0 * a / b` forces decimal\ndivision.\n\n## GROUP BY / HAVING\nEvery SELECT column must be grouped or aggregated. `WHERE` filters rows\nbefore grouping; `HAVING` filters groups after. The duplicate idiom:\n`GROUP BY key HAVING COUNT(*) > 1`.\n\n## Joins\n```sql\nFROM deals d\nJOIN accounts a ON a.account_id = d.account_id        -- only matches\nLEFT JOIN transactions t ON t.deal_id = d.deal_id     -- all deals, NULL if none\n```\nQualify columns after a join (`d.amount`). Conditions on the right-hand table\nof a LEFT JOIN belong in `ON`, not `WHERE`.\n\n## Dates and text (SQLite)\n`substr(created_date, 1, 7)` → month; `strftime('%Y-%W', ts)` → week;\n`julianday(b) - julianday(a)` → days between.",source:"Synthesized for DPM Lab (Level 0)."},{slug:"python-pandas-101",title:"Python & pandas 101: the formulas",category:"definition",tags:["python","pandas","basics","level-0"],summary:"Lists, dicts, and the DataFrame moves that mirror SQL: select, filter, group, sort, merge.",body:"## Python in one breath\n```python\nx = 5                                   # variable\nstages = ['qualified', 'proposal']      # list; stages[0], len(stages)\ndeal = {'id': 'D-1', 'amount': 5000}    # dict; deal['amount']\nround(2 / 3, 4)                         # 0.6667\n[s for s in stages if s != 'proposal']  # list comprehension (a filter)\n```\n`==` compares, `=` assigns. `//` is integer division. Indentation defines\nblocks.\n\n## pandas ↔ SQL\n| SQL | pandas |\n|---|---|\n| `SELECT deal_id, amount FROM deals` | `deals[['deal_id', 'amount']]` |\n| `WHERE stage = 'closed_won'` | `deals[deals['stage'] == 'closed_won']` |\n| `WHERE a AND b` | `deals[(cond_a) & (cond_b)]` — parentheses required |\n| `WHERE stage IN (...)` | `deals[deals['stage'].isin([...])]` |\n| `COUNT(*)` | `len(deals)` |\n| `SUM(amount)` | `deals['amount'].sum()` |\n| `GROUP BY owner, SUM(amount)` | `deals.groupby('owner')['amount'].sum()` |\n| `ORDER BY amount DESC` | `.sort_values('amount', ascending=False)` |\n| `LIMIT 5` | `.head(5)` |\n| `JOIN accounts ON account_id` | `deals.merge(accounts, on='account_id')` |\n| `LEFT JOIN` | `.merge(..., how='left')` |\n| several aggregates | `.agg(total=('amount', 'sum'), n=('deal_id', 'count'))` |\n\n## Getting an answer out\n`result = df.to_dict('records')` for rows; `int(x)` / `float(x)` to turn a\nnumpy number into a plain one; `(deals['stage'] == 'closed_won').sum()`\ncounts True values, the pandas CASE WHEN.",source:"Synthesized for DPM Lab (Level 0)."}];e.s(["kbEntries",0,t])},79922,e=>{"use strict";var t=e.i(6e4),a=e.i(8908),o=e.i(26033);function s(e,s){let n=t.units.find(e=>e.number===s),r=n.lessons.filter(t=>e.lessons[t.id]),i=[...(0,a.sqlExercisesForChapter)(s),...(0,o.pythonExercisesForChapter)(s)],d=i.filter(t=>e.exercises[t.slug]?.status==="solved").length,l=n.lessons.find(t=>!e.lessons[t.id]);return{number:s,lessonsTotal:n.lessons.length,lessonsDone:r.length,labTotal:i.length,labDone:d,fraction:n.lessons.length?r.length/n.lessons.length:0,complete:n.lessons.length>0&&r.length===n.lessons.length,nextLessonId:l?.id??null}}function n(e){return t.units.map(t=>s(e,t.number))}e.s(["allUnitProgress",0,n,"nextLesson",0,function(e){return t.allLessons.find(t=>!e.lessons[t.id])??null},"totals",0,function(e){let t=n(e);return{lessonsDone:t.reduce((e,t)=>e+t.lessonsDone,0),lessonsTotal:t.reduce((e,t)=>e+t.lessonsTotal,0),labsDone:t.reduce((e,t)=>e+t.labDone,0),labsTotal:t.reduce((e,t)=>e+t.labTotal,0)}},"unitProgress",0,s])},82364,76091,e=>{"use strict";var t=e.i(87110);function a(e){return e.startsWith("/")?`/dpm-lab${e}`:e}e.s(["withBasePath",0,a],76091);let o=new Map(t.kbEntries.map(e=>[e.slug,e]));e.s(["CATEGORY_LABELS",0,{framework:"Framework",definition:"Definition","case-study":"Case study","industry-context":"Industry context"},"getKbEntry",0,function(e){return o.get(e)},"resolveWikiLinks",0,function(e){return e.replace(/\[\[([a-z0-9-]+)\]\]/g,(e,t)=>{let s=o.get(t);return s?`[${s.title}](${a(`/kb/${t}`)})`:`\`${t}\``})}],82364)},74581,e=>{"use strict";var t=e.i(71645);function a(e=new Date){let t=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${o}-${s}`}let o="dpm-lab:progress:v1";function s(){return{version:1,user_id:"local",exercises:{},attempts:[],srs:{},lessons:{},streak:{current:0,lastActiveDate:null}}}function n(){try{let e=window.localStorage.getItem(o);if(!e)return s();let t=JSON.parse(e);if(t?.version!==1)return s();return{...s(),...t}}catch{return s()}}function r(e){let t,o=a(),{current:s,lastActiveDate:n}=e.streak;if(n===o)return e;let r=n===((t=new Date).setDate(t.getDate()-1),a(t))?s+1:1;return{...e,streak:{current:r,lastActiveDate:o}}}let i=s(),d=null,l=new Set;function c(){return null===d&&(d=n()),d}function u(){return i}function h(){for(let e of l)e()}function m(e){l.add(e);let t=e=>{e.key===o&&(d=n(),h())};return window.addEventListener("storage",t),()=>{l.delete(e),window.removeEventListener("storage",t)}}e.s(["dueCards",0,function(e,t){return t.filter(t=>(function(e,t=new Date){return!e||e.due<=a(t)})(e.srs[t.id]))},"useProgress",0,function(){let e=(0,t.useSyncExternalStore)(m,c,u),n=(0,t.useCallback)(e=>{var t=e(c());d=t;try{window.localStorage.setItem(o,JSON.stringify(t))}catch{}h()},[]),l=(0,t.useCallback)((e,t,a,o)=>n(s=>{let n,i,d,l,c;return n=new Date().toISOString(),i=s.exercises[e]??{kind:t,status:"not_started",attempts:0},d=o||"solved"===i.status?"solved":"attempted",l={...s.exercises,[e]:{...i,kind:t,status:d,attempts:i.attempts+1,lastAttemptAt:n,solvedAt:o&&!i.solvedAt?n:i.solvedAt}},c=[{id:`${e}:${n}`,slug:e,kind:t,code:a,passed:o,at:n},...s.attempts].slice(0,200),r({...s,exercises:l,attempts:c})}),[n]),g=(0,t.useCallback)((e,t)=>n(o=>{let s;return s=o.srs[e]??function(e=new Date){return{ease:2.5,interval:0,repetitions:0,due:a(e)}}(),r({...o,srs:{...o.srs,[e]:function(e,t,o=new Date){let{ease:s,interval:n,repetitions:r}=e;return t<3?(r=0,n=1):(n=0===r?1:1===r?6:Math.round(n*s),r+=1),(s+=.1-(5-t)*(.08+(5-t)*.02))<1.3&&(s=1.3),{ease:Math.round(100*s)/100,interval:n,repetitions:r,due:function(e,t){let[o,s,n]=e.split("-").map(Number),r=new Date(o,s-1,n);return r.setDate(r.getDate()+t),a(r)}(a(o),n)}}(s,t)}})}),[n]);return{data:e,hydrated:e!==i,recordAttempt:l,recordReview:g,recordLessonComplete:(0,t.useCallback)((e,t)=>n(a=>{let o,s;return o=a.lessons[e],s=Math.max(o?.bestAccuracy??0,t),r({...a,lessons:{...a.lessons,[e]:{completedAt:new Date().toISOString(),completions:(o?.completions??0)+1,bestAccuracy:s,perfect:s>=1}}})}),[n]),reset:(0,t.useCallback)(()=>n(()=>s()),[n])}}],74581)}]);