(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,31713,e=>{"use strict";var t=e.i(18050),a=e.i(22016),o=e.i(87110),s=e.i(8908),n=e.i(26033),r=e.i(44336),i=e.i(74581);function l({label:e,value:a,sub:o}){return(0,t.jsxs)("div",{className:"bg-surface border border-border rounded-xl p-4",children:[(0,t.jsx)("p",{className:"text-xs uppercase tracking-wide text-muted",children:e}),(0,t.jsx)("p",{className:"text-2xl font-semibold mt-1 tabular-nums",children:a}),o&&(0,t.jsx)("p",{className:"text-xs text-muted mt-0.5",children:o})]})}e.s(["default",0,function(){let{data:e,hydrated:c,reset:d}=(0,i.useProgress)(),u=t=>t.filter(t=>e.exercises[t]?.status==="solved").length,h=u(s.sqlExercises.map(e=>e.slug)),m=u(n.pythonExercises.map(e=>e.slug)),g=c?(0,i.dueCards)(e,r.flashcards).length:0,p=s.sqlExercises.find(t=>e.exercises[t.slug]?.status!=="solved"),f=n.pythonExercises.find(t=>e.exercises[t.slug]?.status!=="solved");return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:"text-2xl font-semibold tracking-tight",children:"Dashboard"}),(0,t.jsx)("p",{className:"text-muted mt-1",children:"Knowledge base → practice → review. Hard skills tied to the data product metric tree."})]}),(0,t.jsxs)("div",{className:"grid gap-3 grid-cols-2 lg:grid-cols-4",children:[(0,t.jsx)(l,{label:"Streak",value:c?`${e.streak.current}d`:"–",sub:"consecutive active days"}),(0,t.jsx)(l,{label:"SQL",value:c?`${h}/${s.sqlExercises.length}`:"–",sub:"exercises solved"}),(0,t.jsx)(l,{label:"Python",value:c?`${m}/${n.pythonExercises.length}`:"–",sub:"exercises solved"}),(0,t.jsx)(l,{label:"Review",value:c?`${g}`:"–",sub:`cards due of ${r.flashcards.length}`})]}),(0,t.jsxs)("section",{className:"grid gap-4 sm:grid-cols-2 lg:grid-cols-3",children:[(0,t.jsxs)(a.default,{href:"/practice/sql",className:"bg-surface border border-border rounded-xl p-5 hover:border-accent transition-colors",children:[(0,t.jsx)("p",{className:"text-xs uppercase tracking-wide text-muted",children:"Next up · SQL"}),(0,t.jsx)("p",{className:"font-semibold mt-1",children:p?p.title:"All solved"}),(0,t.jsx)("p",{className:"text-sm text-muted mt-1",children:p?p.dpmConnection.text.split(".")[0]+".":"Re-run any exercise to keep it sharp."})]}),(0,t.jsxs)(a.default,{href:"/practice/python",className:"bg-surface border border-border rounded-xl p-5 hover:border-accent transition-colors",children:[(0,t.jsx)("p",{className:"text-xs uppercase tracking-wide text-muted",children:"Next up · Python"}),(0,t.jsx)("p",{className:"font-semibold mt-1",children:f?f.title:"All solved"}),(0,t.jsx)("p",{className:"text-sm text-muted mt-1",children:f?f.dpmConnection.text.split(".")[0]+".":"Re-run any exercise to keep it sharp."})]}),(0,t.jsxs)(a.default,{href:"/review",className:"bg-surface border border-border rounded-xl p-5 hover:border-accent transition-colors",children:[(0,t.jsx)("p",{className:"text-xs uppercase tracking-wide text-muted",children:"Review"}),(0,t.jsx)("p",{className:"font-semibold mt-1",children:g>0?`${g} card${1===g?"":"s"} due`:"Deck is clear"}),(0,t.jsx)("p",{className:"text-sm text-muted mt-1",children:"SM-2 scheduling. Rate honestly — the intervals depend on it."})]})]}),(0,t.jsxs)("section",{className:"bg-surface-2/60 border border-border rounded-xl p-5 text-sm",children:[(0,t.jsx)("p",{className:"font-semibold",children:"How the pieces connect"}),(0,t.jsxs)("ol",{className:"list-decimal pl-5 mt-2 space-y-1 text-muted",children:[(0,t.jsxs)("li",{children:["The ",(0,t.jsx)(a.default,{href:"/kb",className:"text-accent underline underline-offset-2",children:"Knowledge Base"})," holds the frameworks (",o.kbEntries.length," entries): metric types, the Metric Dependency Tree, medallion layers, the 6-week playbook."]}),(0,t.jsx)("li",{children:"Every SQL and Python exercise computes a node of the Playbook's Sales Funnel metric tree and links back to the KB entry that explains why that metric exists."}),(0,t.jsx)("li",{children:"Flashcards in Review are drawn from the same entries, so what you practice and what you recall stay in sync."})]})]}),c&&(e.attempts.length>0||Object.keys(e.srs).length>0)&&(0,t.jsxs)("section",{className:"text-xs text-muted flex items-center gap-3",children:[(0,t.jsxs)("span",{children:[e.attempts.length," attempt",1===e.attempts.length?"":"s"," logged in this browser."]}),(0,t.jsx)("button",{onClick:()=>{window.confirm("Reset all local progress? This cannot be undone.")&&d()},className:"underline underline-offset-2 hover:text-fg",children:"Reset progress"})]})]})}])},26033,e=>{"use strict";let t=[{slug:"py-count-closed-won",title:"Count the deals we won",difficulty:"intro",prompt:'`deals` is a pandas DataFrame with a `stage` column.\n\nSet `result` to the **number** of rows where `stage == "closed_won"`.',starterCode:`# deals is already loaded as a pandas DataFrame.
won = deals[deals["stage"] == "closed_won"]
result = None  # TODO: how many rows are in won?`,expectedResult:11,dpmConnection:{text:"Boolean filtering is the pandas equivalent of a WHERE clause. Being able to reproduce a number a dashboard shows is how a DPM verifies it instead of trusting it.",kbSlug:"four-key-shifts"},hint:"len(won) or won.shape[0]."},{slug:"py-deals-closed-value",title:"Functional metric: deals_closed_value",difficulty:"core",prompt:"Set `result` to **deals_closed_value**: the sum of `amount` for all `closed_won` deals.",starterCode:`won = deals[deals["stage"] == "closed_won"]
result = None  # TODO: sum of won["amount"]`,expectedResult:606e3,dpmConnection:{text:"Same Functional metric you computed in SQL. A DPM who can compute a metric two independent ways (SQL and pandas) can catch a pipeline bug that only shows up in one path.",kbSlug:"metric-types"},hint:"won['amount'].sum() — it may come back as a numpy type; that's fine."},{slug:"py-revenue-generated",title:"North Star metric: revenue_generated",difficulty:"core",prompt:"Set `result` to **revenue_generated**: the sum of `amount` across the `transactions` DataFrame.",starterCode:'result = None  # TODO: total of transactions["amount"]',expectedResult:661e3,dpmConnection:{text:"Notice this is a different table than deals. The gap between 661,000 (revenue) and 606,000 (won deal value) is renewals + upsells — a real business signal, not an error. Explaining that gap is a DPM's job.",kbSlug:"metric-types"},hint:"transactions['amount'].sum()"},{slug:"py-conversion-rate",title:"Granular metric: conversion_rate",difficulty:"core",prompt:"Set `result` to **conversion_rate** = won ÷ (won + lost), where won = `closed_won` deals and lost = `closed_lost` deals. Open deals are excluded. Round to 4 decimals.",starterCode:`won  = (deals["stage"] == "closed_won").sum()
lost = (deals["stage"] == "closed_lost").sum()
result = None  # TODO: round(won / (won + lost), 4)`,expectedResult:.6875,dpmConnection:{text:"Summing a boolean Series is the pandas idiom for a conditional COUNT — the same CASE WHEN trick from SQL. The definition decision (exclude open deals) must be documented in the semantic layer or every consumer will compute it differently.",kbSlug:"ontology-as-infrastructure"},hint:"round(won / (won + lost), 4) — cast to float if you get a numpy type."},{slug:"py-groupby-account",title:"Won value by account (merge + groupby)",difficulty:"core",prompt:"Merge `deals` with `accounts` on `account_id`, keep only `closed_won` deals, then compute total won amount per **account_name**.\n\nSet `result` to a **list of dicts** with keys `account_name` and `total_won`, sorted by `total_won` descending.",starterCode:`won = deals[deals["stage"] == "closed_won"]
merged = won.merge(accounts, on="account_id")
grouped = (
    merged.groupby("account_name", as_index=False)["amount"]
    .sum()
    .rename(columns={"amount": "total_won"})
    .sort_values("total_won", ascending=False)
)
result = None  # TODO: grouped.to_dict("records")`,expectedResult:[{account_name:"Umbrella Health",total_won:195500},{account_name:"Wayne Manufacturing",total_won:118e3},{account_name:"Globex Logistics",total_won:107500},{account_name:"Northwind Traders",total_won:106e3},{account_name:"Hooli Media",total_won:33500},{account_name:"Stark Analytics",total_won:27500},{account_name:"Initech Software",total_won:9800},{account_name:"Wonka Foods",total_won:8200}],orderMatters:!0,dpmConnection:{text:"merge = JOIN, groupby = GROUP BY. This is the logical data model's 'Relationships' (accounts 1:N deals) turned into a Measure — the exact structure of a Metric Dependency Tree node.",kbSlug:"canvas-data-product-design"},hint:"The starter does the work — finish with .to_dict('records')."},{slug:"py-rep-performance",title:"Top-performing rep",difficulty:"core",prompt:"Group `closed_won` deals by `owner` and sum `amount`. Set `result` to a **dict** with keys `owner` and `total_won` for the single top rep.",starterCode:`won = deals[deals["stage"] == "closed_won"]
by_owner = won.groupby("owner")["amount"].sum().sort_values(ascending=False)
result = None  # TODO: {"owner": ..., "total_won": ...} for the first row`,expectedResult:{owner:"Jordan Blake",total_won:419500},dpmConnection:{text:"Reading a single row out of a grouped Series: by_owner.index[0] and by_owner.iloc[0]. As a DPM, notice the concentration — one rep is ~70% of won value, so one bad record on their deals swings the North Star.",kbSlug:"bullseye-data-product-market-fit"},hint:"result = {'owner': by_owner.index[0], 'total_won': int(by_owner.iloc[0])}"},{slug:"py-region-conversion",title:"conversion_rate by region",difficulty:"stretch",prompt:"Compute **conversion_rate** per **region** (region is on `accounts`; stage is on `deals`). Same definition as before: won ÷ (won + lost), open deals excluded, rounded to 4 decimals.\n\nSet `result` to a **list of dicts** with keys `region` and `conversion_rate`, sorted by region ascending.",starterCode:`closed = deals[deals["stage"].isin(["closed_won", "closed_lost"])]
merged = closed.merge(accounts, on="account_id")
merged = merged.assign(is_won=(merged["stage"] == "closed_won").astype(int))
grouped = (
    merged.groupby("region", as_index=False)["is_won"]
    .mean()
    .rename(columns={"is_won": "conversion_rate"})
    .sort_values("region")
)
grouped["conversion_rate"] = grouped["conversion_rate"].round(4)
result = None  # TODO: grouped.to_dict("records")`,expectedResult:[{region:"AMER",conversion_rate:.7143},{region:"APAC",conversion_rate:.6667},{region:"EMEA",conversion_rate:.6667}],orderMatters:!0,dpmConnection:{text:"The mean of a 0/1 indicator column IS the rate — a compact pandas idiom worth memorizing. Cross-entity slicing (measure on deals, dimension on accounts) is where join mistakes silently corrupt a metric.",kbSlug:"canvas-data-product-design"},hint:"The starter is complete except the last line."},{slug:"py-rca-source-lost",title:"RCA: where are we losing deals?",difficulty:"stretch",prompt:"**Scenario:** conversion_rate looks low. For each deal `source`, compute **lost_value** (sum of `amount` for `closed_lost` deals) and **lost_count** (number of such deals).\n\nSet `result` to a **list of dicts** with keys `source`, `lost_value`, `lost_count`, sorted by `lost_value` descending.",starterCode:`lost = deals[deals["stage"] == "closed_lost"]
grouped = (
    lost.groupby("source")
    .agg(lost_value=("amount", "sum"), lost_count=("deal_id", "count"))
    .reset_index()
    .sort_values("lost_value", ascending=False)
)
result = None  # TODO: grouped.to_dict("records")`,expectedResult:[{source:"Outbound",lost_value:81500,lost_count:3},{source:"Inbound",lost_value:34e3,lost_count:2}],orderMatters:!0,dpmConnection:{text:"Named aggregation (.agg(name=(col, fn))) is the pandas way to compute several measures at once. The output is the raw material for an RCA conversation — the DPM's real job starts *after* this: is Outbound losing on lead quality, pricing, or a stage-recording data issue?",kbSlug:"proof-of-value-performance"},hint:"grouped.to_dict('records') — you may need int() casts if you build it by hand."}];e.s(["pythonExercises",0,t])},8908,e=>{"use strict";let t=[{slug:"sql-select-closed-won",title:"List the deals we actually won",difficulty:"intro",prompt:"The `deals` table has one row per sales opportunity, with a `stage` column.\n\nReturn the **deal_id**, **account_id**, and **amount** of every deal whose stage is `closed_won`, ordered by `deal_id`.",starterQuery:`SELECT deal_id, account_id, amount
FROM deals
WHERE -- your condition here
ORDER BY deal_id;`,expectedColumns:["deal_id","account_id","amount"],expectedRows:[["DEAL-001","ACC-001",84e3],["DEAL-002","ACC-001",22e3],["DEAL-003","ACC-002",46500],["DEAL-005","ACC-003",9800],["DEAL-007","ACC-004",156e3],["DEAL-010","ACC-005",33500],["DEAL-011","ACC-006",118e3],["DEAL-013","ACC-007",27500],["DEAL-015","ACC-008",8200],["DEAL-018","ACC-002",61e3],["DEAL-019","ACC-004",39500]],orderMatters:!0,dpmConnection:{text:"Filtering to closed_won is the first step of the Functional metric #deals_closed_value. Before you can trust an aggregate, you should be able to see the exact rows feeding it.",kbSlug:"metric-types"},hint:"Compare the stage column to the string 'closed_won' (single quotes) in the WHERE clause."},{slug:"sql-deals-closed-value",title:"Compute the Functional metric: deals_closed_value",difficulty:"core",prompt:"Compute **deals_closed_value** — the total `amount` across all deals in stage `closed_won`.\n\nReturn a single row with one column named `deals_closed_value`.",starterQuery:`SELECT -- aggregate here
FROM deals
WHERE stage = 'closed_won';`,expectedColumns:["deals_closed_value"],expectedRows:[[606e3]],dpmConnection:{text:"This is the Playbook's example Functional metric for a Sales domain. It rolls up into the North Star (revenue) and is explained by granular metrics like conversion_rate in the Metric Dependency Tree.",kbSlug:"metric-types"},hint:"Use SUM(amount) and alias it with AS deals_closed_value."},{slug:"sql-revenue-generated",title:"Compute the North Star metric: revenue_generated",difficulty:"core",prompt:"The `transactions` table records actual money movements (initial, renewal, upsell) against won deals.\n\nCompute **revenue_generated** — the total `amount` across all transactions. Return one row with one column named `revenue_generated`.",starterQuery:`SELECT -- aggregate here
FROM transactions;`,expectedColumns:["revenue_generated"],expectedRows:[[661e3]],dpmConnection:{text:"revenue_generated is the Playbook's example North Star metric for Sales. Notice it is NOT the same number as deals_closed_value — transactions include renewals and upsells that deal amounts don't. Knowing which table a metric lives in is a core DPM skill.",kbSlug:"metric-types"},hint:"SUM over transactions.amount; alias as revenue_generated."},{slug:"sql-conversion-rate",title:"Compute the Granular metric: conversion_rate",difficulty:"core",prompt:"Compute **conversion_rate** = (deals that were `closed_won`) ÷ (deals that were either `closed_won` or `closed_lost`).\n\nIgnore deals still open (prospecting, qualified, proposal, negotiation) — they haven't converted or failed yet.\n\nReturn one row with one column `conversion_rate`, rounded to 4 decimal places.",starterQuery:`SELECT ROUND(
  1.0 * SUM(CASE WHEN stage = 'closed_won' THEN 1 ELSE 0 END)
  / SUM(CASE WHEN stage IN ('closed_won', 'closed_lost') THEN 1 ELSE 0 END),
  4
) AS conversion_rate
FROM deals;`,expectedColumns:["conversion_rate"],expectedRows:[[.6875]],dpmConnection:{text:"conversion_rate is a Granular metric: an indicator of effectiveness that explains WHY deals_closed_value moved. The definition choice (exclude open deals) is exactly the kind of semantic decision an ontology has to pin down before an AI agent reports it.",kbSlug:"ontology-as-infrastructure"},hint:"The starter already has the shape — the trick is 1.0 * to force decimal division, and CASE WHEN inside SUM to count conditionally."},{slug:"sql-join-accounts-deals",title:"Won value by account (JOIN + GROUP BY)",difficulty:"core",prompt:"Join `accounts` to `deals` and report, for each account, the **account_name** and its **total_won** (sum of `amount` for `closed_won` deals). Order by `total_won` descending.",starterQuery:`SELECT a.account_name, SUM(d.amount) AS total_won
FROM accounts a
JOIN deals d ON -- join condition
WHERE d.stage = 'closed_won'
GROUP BY a.account_name
ORDER BY total_won DESC;`,expectedColumns:["account_name","total_won"],expectedRows:[["Umbrella Health",195500],["Wayne Manufacturing",118e3],["Globex Logistics",107500],["Northwind Traders",106e3],["Hooli Media",33500],["Stark Analytics",27500],["Initech Software",9800],["Wonka Foods",8200]],orderMatters:!0,dpmConnection:{text:"This is the 'Relationships' part of the logical data model (accounts 1:N deals) turned into a measure. Splitting a Functional metric by an entity is the first move in root cause analysis: which account drove the change?",kbSlug:"canvas-data-product-design"},hint:"Join on a.account_id = d.account_id."},{slug:"sql-rep-performance",title:"Which rep closed the most?",difficulty:"core",prompt:"For each sales rep (`owner`), sum the `amount` of their `closed_won` deals. Return **owner** and **total_won**, ordered by `total_won` descending.",starterQuery:`SELECT owner, SUM(amount) AS total_won
FROM deals
WHERE stage = 'closed_won'
GROUP BY -- ?
ORDER BY total_won DESC;`,expectedColumns:["owner","total_won"],expectedRows:[["Jordan Blake",419500],["Priya Nair",144800],["Meiling Zhao",41700]],orderMatters:!0,dpmConnection:{text:"Slicing a metric by a dimension (owner) is what a stakeholder actually asks for in a review. As a DPM, notice the concentration risk: one rep is most of the number — a data quality issue on their deals would move the North Star.",kbSlug:"bullseye-data-product-market-fit"},hint:"GROUP BY owner."},{slug:"sql-region-conversion",title:"conversion_rate by region",difficulty:"stretch",prompt:"Compute **conversion_rate** per **region** (region lives on `accounts`, stage lives on `deals`). Use the same definition as before: won ÷ (won + lost), open deals excluded. Round to 4 decimals, order by region ascending.",starterQuery:`SELECT a.region,
  ROUND(
    1.0 * SUM(CASE WHEN d.stage = 'closed_won' THEN 1 ELSE 0 END)
    / SUM(CASE WHEN d.stage IN ('closed_won', 'closed_lost') THEN 1 ELSE 0 END),
    4
  ) AS conversion_rate
FROM deals d
JOIN accounts a ON a.account_id = d.account_id
GROUP BY a.region
ORDER BY a.region;`,expectedColumns:["region","conversion_rate"],expectedRows:[["AMER",.7143],["APAC",.6667],["EMEA",.6667]],orderMatters:!0,dpmConnection:{text:"A Granular metric cut by a dimension from a *different* entity. This is the shape of most real metric-tree questions: the measure is on one table, the slicing attribute is on another. Getting the join right is where silent errors creep in.",kbSlug:"canvas-data-product-design"},hint:"The starter is close to complete — read it, understand each clause, then run it."},{slug:"sql-rca-source-lost",title:"RCA: where are we losing deals?",difficulty:"stretch",prompt:"**Scenario:** the VP Sales says conversion_rate looks low and wants to know where the losses are concentrated.\n\nReturn, for each deal `source`, the **lost_value** (sum of `amount` for `closed_lost` deals) and **lost_count** (number of such deals). Order by `lost_value` descending.",starterQuery:`SELECT source,
  SUM(amount) AS lost_value,
  COUNT(*)    AS lost_count
FROM deals
WHERE stage = 'closed_lost'
GROUP BY source
ORDER BY lost_value DESC;`,expectedColumns:["source","lost_value","lost_count"],expectedRows:[["Outbound",81500,3],["Inbound",34e3,2]],orderMatters:!0,dpmConnection:{text:"This is walking DOWN the Metric Dependency Tree: conversion_rate (granular) → broken down by source. The DPM's job isn't just running the query; it's asking the *next* question — is Outbound losing because of lead quality, pricing, or a data problem in how stage is recorded?",kbSlug:"proof-of-value-performance"},hint:"Two aggregates over the same filtered rows: SUM for value, COUNT(*) for count."}];e.s(["sqlExercises",0,t])},44336,e=>{"use strict";e.s(["flashcards",0,[{id:"fc-dpm-definition",kbSlug:"what-is-a-data-product-manager",front:"What does a Data Product Manager manage, and at the intersection of which three things does the role sit?",back:"Data products — warehouses, platforms, analytics tools, pipelines, ML models — at the intersection of data, technology, and business."},{id:"fc-risk-profile",kbSlug:"four-key-shifts",front:"Four Key Shifts — how does the RISK PROFILE differ between a general PM and a data PM?",back:"General PM: ship (potentially) buggy code, push a fix. Data PM: ship bad data, lose trust — often permanently."},{id:"fc-success-metrics",kbSlug:"four-key-shifts",front:"Four Key Shifts — what SUCCESS METRICS replace usage/engagement/retention for a data PM?",back:"Data quality, decision velocity, and trust signals."},{id:"fc-team-question",kbSlug:"four-key-shifts",front:"Four Key Shifts — the team's default question changes from 'When can we ship?' to what?",back:"'How do we validate?'"},{id:"fc-medallion",kbSlug:"medallion-architecture",front:"Name the three medallion layers and what each holds.",back:"Bronze = raw ingestion. Silver = filtered, cleaned, augmented. Gold = business-level aggregates that feed analytics, AI, and reporting."},{id:"fc-north-star",kbSlug:"metric-types",front:"Define a North Star metric and give the Playbook's Sales example.",back:"The domain's leading metric, tied directly to business outcomes. Example: revenue_generated."},{id:"fc-functional",kbSlug:"metric-types",front:"Define a Functional metric and give the Playbook's Sales example.",back:"The leading metric for a specific function within the domain. Example: #deals_closed_value."},{id:"fc-granular",kbSlug:"metric-types",front:"Define a Granular metric and give the Playbook's Sales example.",back:"An indicator of effectiveness that explains WHY a functional metric moved. Example: conversion_rate."},{id:"fc-mdt",kbSlug:"canvas-data-product-design",front:"What is a Metric Dependency Tree (MDT) and why does it make root-cause analysis tractable?",back:"A tree where granular metrics roll up into functional metrics, which roll up into the North Star. RCA = walking down the tree from the number that moved to the leaf that explains it."},{id:"fc-logical-model",kbSlug:"canvas-data-product-design",front:"The logical data model (Week 2) has five parts. Name them.",back:"Entities, Dimensions, Measures, Relationships, SLOs (+ Semantics as context around all of them)."},{id:"fc-activation",kbSlug:"data-product-activation",front:"A data product activates once which FOUR pieces exist?",back:"Input ports, transformation steps, output ports, SLOs."},{id:"fc-week1",kbSlug:"bullseye-data-product-market-fit",front:"Week 1 (The Bullseye) — what are the four steps, in order?",back:"1) Retrieve requirements from end users. 2) Map the existing user journey. 3) Align on data's new purpose (value prop). 4) Identify North Star / functional / granular metrics."},{id:"fc-week1-duration",kbSlug:"bullseye-data-product-market-fit",front:"How long should you spend on Week 1 discovery at minimum, and what kind of metrics should you pick for a proof of value?",back:"At least one full week. Pick hard-hitting metrics directly useful to leadership."},{id:"fc-maturity",kbSlug:"data-product-maturity-stages",front:"Name the four data-product maturity stages, from least to most mature.",back:"Ad-hoc → Reactive → Strategy-driven → Purpose-driven."},{id:"fc-ssi",kbSlug:"self-service-infrastructure",front:"What does a self-service infrastructure (SSI) let an analytics engineer do instead of building plumbing?",back:"Declare input/output locations and transform steps; the SSI supplies workflows, services, secrets, connectors, monitors, policies, and contracts as ready-to-use resources."},{id:"fc-gtm",kbSlug:"go-to-market-launch",front:"Week 4 (Launch) — what does 'native accessibility' mean for data product adoption?",back:"Exist where the user already is: work with the tools they already use rather than asking them to adopt a new interface."},{id:"fc-proof",kbSlug:"proof-of-value-performance",front:"Which stage of the 6-week playbook should get the HIGHEST share of effort, and why?",back:"Post-launch/adoption (Weeks 5–6) — it's where you learn how real users interact with the product and generate the feedback loop that drives the MVP."},{id:"fc-ontology",kbSlug:"ontology-as-infrastructure",front:"Why did enterprises function without formal ontologies for years, and what changed with AI agents?",back:"Meaning was localized in silos and humans silently resolved ambiguity. Autonomous agents can't — they pick whichever definition they hit first, and the guess compounds at scale."},{id:"fc-observability",kbSlug:"agent-observability-gap",front:"What's the difference between agent observability and agent evaluation?",back:"Observability tells you the agent RAN (latency, tokens, errors). Evaluation tells you whether it was RIGHT. Most teams have the first, about half have the second."},{id:"fc-lean-ai",kbSlug:"lean-ai-cost-economics",front:"Lean AI — what's the mature alternative to choosing between small and large models?",back:"Route by difficulty: narrow/small models for the high-volume well-defined slice, frontier models only for the hard fraction that needs them. Cost-per-outcome is the metric."},{id:"fc-oee",kbSlug:"oee-manufacturing-case-study",front:"Write the OEE formula and the threshold considered world-leading.",back:"OEE = Machine Availability × Process Efficiency × Product Quality. 85%+ is world-leading; most sit at 40–60%."}]])},87110,e=>{"use strict";let t=[{slug:"what-is-a-data-product-manager",title:"What is a Data Product Manager?",category:"definition",tags:["role","fundamentals"],summary:"A DPM sits at the intersection of data, technology, and business, managing data warehouses, platforms, pipelines, and ML models the way a PM manages a product.",body:`A **Data Product Manager (DPM)** is a specialized role at the intersection of
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
transform.`,source:"The Big Book of Data Science Use Cases, 2nd Edition (Databricks)."}];e.s(["kbEntries",0,t])},74581,e=>{"use strict";var t=e.i(71645);function a(e=new Date){let t=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${o}-${s}`}let o="dpm-lab:progress:v1";function s(){return{version:1,user_id:"local",exercises:{},attempts:[],srs:{},streak:{current:0,lastActiveDate:null}}}function n(){try{let e=window.localStorage.getItem(o);if(!e)return s();let t=JSON.parse(e);if(t?.version!==1)return s();return{...s(),...t}}catch{return s()}}function r(e){let t,o=a(),{current:s,lastActiveDate:n}=e.streak;if(n===o)return e;let r=n===((t=new Date).setDate(t.getDate()-1),a(t))?s+1:1;return{...e,streak:{current:r,lastActiveDate:o}}}let i=s(),l=null,c=new Set;function d(){return null===l&&(l=n()),l}function u(){return i}function h(){for(let e of c)e()}function m(e){c.add(e);let t=e=>{e.key===o&&(l=n(),h())};return window.addEventListener("storage",t),()=>{c.delete(e),window.removeEventListener("storage",t)}}e.s(["dueCards",0,function(e,t){return t.filter(t=>(function(e,t=new Date){return!e||e.due<=a(t)})(e.srs[t.id]))},"useProgress",0,function(){let e=(0,t.useSyncExternalStore)(m,d,u),n=(0,t.useCallback)(e=>{var t=e(d());l=t;try{window.localStorage.setItem(o,JSON.stringify(t))}catch{}h()},[]),c=(0,t.useCallback)((e,t,a,o)=>n(s=>{let n,i,l,c,d;return n=new Date().toISOString(),i=s.exercises[e]??{kind:t,status:"not_started",attempts:0},l=o||"solved"===i.status?"solved":"attempted",c={...s.exercises,[e]:{...i,kind:t,status:l,attempts:i.attempts+1,lastAttemptAt:n,solvedAt:o&&!i.solvedAt?n:i.solvedAt}},d=[{id:`${e}:${n}`,slug:e,kind:t,code:a,passed:o,at:n},...s.attempts].slice(0,200),r({...s,exercises:c,attempts:d})}),[n]);return{data:e,hydrated:e!==i,recordAttempt:c,recordReview:(0,t.useCallback)((e,t)=>n(o=>{let s;return s=o.srs[e]??function(e=new Date){return{ease:2.5,interval:0,repetitions:0,due:a(e)}}(),r({...o,srs:{...o.srs,[e]:function(e,t,o=new Date){let{ease:s,interval:n,repetitions:r}=e;return t<3?(r=0,n=1):(n=0===r?1:1===r?6:Math.round(n*s),r+=1),(s+=.1-(5-t)*(.08+(5-t)*.02))<1.3&&(s=1.3),{ease:Math.round(100*s)/100,interval:n,repetitions:r,due:function(e,t){let[o,s,n]=e.split("-").map(Number),r=new Date(o,s-1,n);return r.setDate(r.getDate()+t),a(r)}(a(o),n)}}(s,t)}})}),[n]),reset:(0,t.useCallback)(()=>n(()=>s()),[n])}}],74581)}]);