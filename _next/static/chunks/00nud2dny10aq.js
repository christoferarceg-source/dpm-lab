(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,43153,e=>{"use strict";var t=e.i(18050),a=e.i(71645),o=e.i(6159),s=e.i(18994),r=e.i(8908),n=e.i(77475),i=e.i(136),l=e.i(76091),c=e.i(36420);let u=null;async function d(){return u||(u=(async()=>{if(await (0,i.loadScript)((0,l.withBasePath)("/sql-wasm.js")),!window.initSqlJs)throw Error("sql.js loader did not expose initSqlJs");return window.initSqlJs({locateFile:e=>(0,l.withBasePath)(`/${e}`)})})()),u}async function m(){let e=new(await d()).Database;return e.run(n.SCHEMA_SQL),e.run((0,n.buildSeedSql)()),e}let h=new Map(r.sqlExercises.map(e=>[e.slug,e]));e.s(["default",0,function(){let e=(0,a.useRef)(null),n=(0,a.useCallback)(async t=>{t("Loading SQLite runtime…"),e.current=await m()},[]),i=(0,a.useCallback)(async t=>{e.current||(e.current=await m());let a=function(e,t){let a=performance.now();try{let o=e.exec(t),s=Math.round(performance.now()-a);if(0===o.length)return{ok:!0,result:{columns:[],rows:[]},ms:s};let r=o[o.length-1];return{ok:!0,result:{columns:r.columns,rows:r.values},ms:s}}catch(e){return{ok:!1,error:e instanceof Error?e.message:String(e)}}}(e.current,t);return a.ok?{ok:!0,payload:a.result,ms:a.ms}:{ok:!1,error:a.error}},[]),l=(0,a.useCallback)((e,t)=>{var a;return a=h.get(e),(0,c.columnsEqual)(t.columns,a.expectedColumns)?t.rows.length!==a.expectedRows.length?{passed:!1,reason:`Expected ${a.expectedRows.length} row(s) but got ${t.rows.length}. Check your WHERE / GROUP BY.`}:(0,c.deepEqual)(t.rows,a.expectedRows,a.orderMatters??!1)?{passed:!0}:{passed:!1,reason:a.orderMatters?"Right shape, but the values or their order don't match. Check your ORDER BY and any rounding.":"Right shape, but some values don't match. Compare your numbers against what the prompt asks for."}:{passed:!1,reason:`Expected columns [${a.expectedColumns.join(", ")}] but got [${t.columns.join(", ")}]. Check your aliases (AS ...) and column order.`}},[]);return(0,t.jsx)(o.PracticeWorkspace,{kind:"sql",title:"SQL Practice",intro:(0,t.jsxs)("p",{children:["Real SQLite, running in your browser. Tables: ",(0,t.jsx)("code",{className:"font-mono",children:"accounts"}),","," ",(0,t.jsx)("code",{className:"font-mono",children:"customers"}),", ",(0,t.jsx)("code",{className:"font-mono",children:"deals"}),","," ",(0,t.jsx)("code",{className:"font-mono",children:"transactions"})," — the Sales Funnel Accelerator example from the Playbook. Try ",(0,t.jsx)("code",{className:"font-mono",children:"SELECT * FROM deals LIMIT 5;"})," to explore."]}),exercises:r.sqlExercises.map(e=>({slug:e.slug,title:e.title,difficulty:e.difficulty,prompt:e.prompt,starter:e.starterQuery,hint:e.hint,dpmConnection:e.dpmConnection})),prepare:n,run:i,grade:l,renderResult:e=>(0,t.jsx)(s.ResultTable,{columns:e.columns,rows:e.rows})})}],43153)},91987,e=>{e.v(t=>Promise.all(["static/chunks/09f98t6gkiyh-.js"].map(t=>e.l(t))).then(()=>t(95931)))},8908,e=>{"use strict";let t=[{slug:"sql-select-closed-won",title:"List the deals we actually won",difficulty:"intro",prompt:"The `deals` table has one row per sales opportunity, with a `stage` column.\n\nReturn the **deal_id**, **account_id**, and **amount** of every deal whose stage is `closed_won`, ordered by `deal_id`.",starterQuery:`SELECT deal_id, account_id, amount
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
ORDER BY lost_value DESC;`,expectedColumns:["source","lost_value","lost_count"],expectedRows:[["Outbound",81500,3],["Inbound",34e3,2]],orderMatters:!0,dpmConnection:{text:"This is walking DOWN the Metric Dependency Tree: conversion_rate (granular) → broken down by source. The DPM's job isn't just running the query; it's asking the *next* question — is Outbound losing because of lead quality, pricing, or a data problem in how stage is recorded?",kbSlug:"proof-of-value-performance"},hint:"Two aggregates over the same filtered rows: SUM for value, COUNT(*) for count."}];e.s(["sqlExercises",0,t])},87110,e=>{"use strict";let t=[{slug:"what-is-a-data-product-manager",title:"What is a Data Product Manager?",category:"definition",tags:["role","fundamentals"],summary:"A DPM sits at the intersection of data, technology, and business, managing data warehouses, platforms, pipelines, and ML models the way a PM manages a product.",body:`A **Data Product Manager (DPM)** is a specialized role at the intersection of
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
transform.`,source:"The Big Book of Data Science Use Cases, 2nd Edition (Databricks)."}];e.s(["kbEntries",0,t])},82364,76091,e=>{"use strict";var t=e.i(87110);function a(e){return e.startsWith("/")?`/dpm-lab${e}`:e}e.s(["withBasePath",0,a],76091);let o=new Map(t.kbEntries.map(e=>[e.slug,e]));e.s(["CATEGORY_LABELS",0,{framework:"Framework",definition:"Definition","case-study":"Case study","industry-context":"Industry context"},"getKbEntry",0,function(e){return o.get(e)},"resolveWikiLinks",0,function(e){return e.replace(/\[\[([a-z0-9-]+)\]\]/g,(e,t)=>{let s=o.get(t);return s?`[${s.title}](${a(`/kb/${t}`)})`:`\`${t}\``})}],82364)},74581,e=>{"use strict";var t=e.i(71645);function a(e=new Date){let t=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${o}-${s}`}let o="dpm-lab:progress:v1";function s(){return{version:1,user_id:"local",exercises:{},attempts:[],srs:{},streak:{current:0,lastActiveDate:null}}}function r(){try{let e=window.localStorage.getItem(o);if(!e)return s();let t=JSON.parse(e);if(t?.version!==1)return s();return{...s(),...t}}catch{return s()}}function n(e){let t,o=a(),{current:s,lastActiveDate:r}=e.streak;if(r===o)return e;let n=r===((t=new Date).setDate(t.getDate()-1),a(t))?s+1:1;return{...e,streak:{current:n,lastActiveDate:o}}}let i=s(),l=null,c=new Set;function u(){return null===l&&(l=r()),l}function d(){return i}function m(){for(let e of c)e()}function h(e){c.add(e);let t=e=>{e.key===o&&(l=r(),m())};return window.addEventListener("storage",t),()=>{c.delete(e),window.removeEventListener("storage",t)}}e.s(["dueCards",0,function(e,t){return t.filter(t=>(function(e,t=new Date){return!e||e.due<=a(t)})(e.srs[t.id]))},"useProgress",0,function(){let e=(0,t.useSyncExternalStore)(h,u,d),r=(0,t.useCallback)(e=>{var t=e(u());l=t;try{window.localStorage.setItem(o,JSON.stringify(t))}catch{}m()},[]),c=(0,t.useCallback)((e,t,a,o)=>r(s=>{let r,i,l,c,u;return r=new Date().toISOString(),i=s.exercises[e]??{kind:t,status:"not_started",attempts:0},l=o||"solved"===i.status?"solved":"attempted",c={...s.exercises,[e]:{...i,kind:t,status:l,attempts:i.attempts+1,lastAttemptAt:r,solvedAt:o&&!i.solvedAt?r:i.solvedAt}},u=[{id:`${e}:${r}`,slug:e,kind:t,code:a,passed:o,at:r},...s.attempts].slice(0,200),n({...s,exercises:c,attempts:u})}),[r]);return{data:e,hydrated:e!==i,recordAttempt:c,recordReview:(0,t.useCallback)((e,t)=>r(o=>{let s;return s=o.srs[e]??function(e=new Date){return{ease:2.5,interval:0,repetitions:0,due:a(e)}}(),n({...o,srs:{...o.srs,[e]:function(e,t,o=new Date){let{ease:s,interval:r,repetitions:n}=e;return t<3?(n=0,r=1):(r=0===n?1:1===n?6:Math.round(r*s),n+=1),(s+=.1-(5-t)*(.08+(5-t)*.02))<1.3&&(s=1.3),{ease:Math.round(100*s)/100,interval:r,repetitions:n,due:function(e,t){let[o,s,r]=e.split("-").map(Number),n=new Date(o,s-1,r);return n.setDate(n.getDate()+t),a(n)}(a(o),r)}}(s,t)}})}),[r]),reset:(0,t.useCallback)(()=>r(()=>s()),[r])}}],74581)}]);