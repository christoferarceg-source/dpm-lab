(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,26033,e=>{"use strict";let t=[{slug:"py-count-closed-won",chapter:1,title:"Count the deals we won",difficulty:"warmup",prompt:'`deals` is a pandas DataFrame with a `stage` column.\n\nSet `result` to the **number** of rows where `stage == "closed_won"`.',starterCode:`# deals is already loaded as a pandas DataFrame.
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
result = grouped.to_dict("records")`,orderMatters:!0,dpmConnection:{text:"Named aggregation (.agg(name=(col, fn))) computes several measures at once. The output is the raw material for an RCA conversation; the Data PM's job starts after this query.",kbSlug:"proof-of-value-performance"},hint:"grouped.to_dict('records')."}];e.s(["pythonExercises",0,t,"pythonExercisesForChapter",0,function(e){return t.filter(t=>t.chapter===e)}])},87110,e=>{"use strict";let t=[{slug:"what-is-a-data-product-manager",title:"What is a Data Product Manager?",category:"definition",tags:["role","fundamentals"],summary:"A DPM sits at the intersection of data, technology, and business, managing data warehouses, platforms, pipelines, and ML models the way a PM manages a product.",body:`A **Data Product Manager (DPM)** is a specialized role at the intersection of
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
   negotiation usually mean lead quality; early losses mean targeting.`,source:"Synthesized for DPM Lab; builds on the Playbook's Metric Dependency Tree."},{slug:"sql-toolkit-for-data-pms",title:"The SQL a Data PM Actually Uses",category:"definition",tags:["sql","skills"],summary:"CTEs for readable steps, window functions for per-row context, date bucketing for trends, and the four bugs that silently corrupt metrics.",body:"You are not writing production pipelines. You are verifying numbers,\nsizing problems, and reading other people's queries. That needs a small,\nsharp toolkit.\n\n## Shapes you'll write every week\n- **CTEs** (`WITH x AS (...)`) — one step per CTE, named after what it\n  produces (`resolved_deals`, `latest_stage`). Readable beats clever.\n- **Window functions** — `ROW_NUMBER() OVER (PARTITION BY deal_id ORDER BY\n  entered_at DESC)` for \"latest per entity\"; `LAG`/`LEAD` for change\n  between rows; `SUM(...) OVER (ORDER BY month)` for running totals;\n  `AVG(...) OVER (... ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)` for moving\n  averages.\n- **Date bucketing** — `substr(date, 1, 7)` for month, `strftime('%Y-%W',\n  ts)` for ISO-ish week, `julianday(b) - julianday(a)` for day differences\n  (SQLite).\n- **Conditional aggregation** — `SUM(CASE WHEN ... THEN 1 ELSE 0 END)` (or\n  `SUM(condition)` in SQLite) to compute several rates in one pass.\n- **HAVING** — filter *after* aggregation; the idiom for duplicates:\n  `GROUP BY key HAVING COUNT(*) > 1`.\n\n## The four silent metric bugs\n1. **Join fan-out** — joining a 1:N table before an aggregate multiplies\n   the measure. Aggregate the N side first.\n2. **LEFT JOIN + WHERE on the right table** — turns it into an inner join\n   and hides exactly the missing rows you were looking for. Put the\n   condition in `ON`.\n3. **COUNT(*) vs COUNT(DISTINCT x)** — views vs viewers, rows vs people.\n4. **Integer division** — `7 / 10 = 0` in many engines. Multiply by\n   `1.0` first.\n\n## Grain first, window second\nDecide what one row means (a deal? a month?), aggregate to that grain in a\nCTE, *then* apply windows. Running totals and moving averages on the wrong\ngrain look plausible and are wrong.",source:"Synthesized for DPM Lab."}];e.s(["kbEntries",0,t])},47371,e=>{"use strict";let t=[{number:1,slug:"bullseye",title:"Nobody trusts the number",week:"Week 1 · The Bullseye",tagline:"Find the real problem before you touch a query.",brief:`**Monday, 9:05.** Your laptop is still provisioning when Dana Whitfield walks into the room without knocking.

> "The dashboard says our conversion rate is **61%**. It is not 61%. My reps would be swimming in commission. Can you make it right by Friday?"

Ten minutes later Raj Patel messages you: *"Heads up, Dana thinks the numbers are wrong. All three pipelines have been green for months. Happy to walk you through them."* Lena Fischer from RevOps adds you to a channel called **#crm-hygiene** with no explanation.

This is the moment the Four Key Shifts become real. A general PM would ship a fix. A Data PM asks: *which* number, defined *how*, trusted by *whom*, used for *what decision*?

**Your job this week is discovery, not SQL.** Meet the people, map how they use data today, and pin down the North Star, functional, and granular metrics for a Sales domain. The warm-up exercises let you touch the data so you know what exists, but the real deliverable is a problem statement Dana and Sofia both sign.`,readings:["what-is-a-data-product-manager","four-key-shifts","bullseye-data-product-market-fit","metric-types","data-product-maturity-stages"],debrief:`**What a good Week 1 looked like.**

- You did *not* fix the dashboard. You found out that "61%" was won \xf7 closed, that Dana's mental model was won \xf7 created, and that the two definitions differ by 15 points on the same data. Neither was "wrong."
- You wrote a problem statement in Dana's words: *"I can't see where deals stall or which segment is dragging conversion."* Sofia agreed that is the proof-of-value target.
- You picked the metric tree: North Star **revenue_generated**, functional **deals_closed_value**, granular **conversion_rate** and **days_in_stage**.
- You noticed Meridian is in the *Reactive* stage: Raj builds what he's asked; nobody owns definitions.

Next week you turn those definitions into a model everyone can point at.`},{number:2,slug:"canvas",title:"Define it before you compute it",week:"Week 2 · The Canvas",tagline:"Build the metric tree and the logical model behind it.",brief:`**Tuesday, 14:30, a whiteboard.** Three people, three conversion rates.

- **Dana:** won \xf7 (won + lost). "Open deals haven't converted or failed yet."
- **Lena:** won \xf7 created. "That's what the CRM report has always shown."
- **Tom\xe1s:** won *amount* \xf7 closed *amount*. "I don't care how many deals. I care how many dollars."

All three are legitimate. All three will produce a different chart. The Data PM's job is not to pick the winner in the meeting; it is to put every definition on the **Metric Dependency Tree** with a name, a formula, and an owner, so the fight happens once instead of every month.

Raj shows you something else: deal stages are *overwritten* in the CRM, but there is an append-only **deal_stage_history** log. That changes what you can measure. Stage-to-stage conversion, time in stage, funnel drop-off: none of it exists on the \`deals\` table alone.

**This week:** draft the logical model (entities, dimensions, measures, relationships, SLOs) and compute the funnel from the history log. The SQL gets real: CTEs, self-joins on the history, and your first window function.`,readings:["canvas-data-product-design","metric-types","funnel-conversion-analysis","sql-toolkit-for-data-pms"],debrief:"**What a good Week 2 looked like.**\n\n- The MDT now has *three* conversion definitions, each named: `conversion_rate_closed` (Dana), `conversion_rate_created` (Lena), `conversion_rate_value` (Tomás). The dashboard will show Dana's by default and label it.\n- You modeled the funnel from **deal_stage_history**, not from the current stage. Overwritten fields destroy history; append-only logs preserve it. This is the single most important modeling lesson in the chapter.\n- You learned that a stage-to-stage rate (proposal → negotiation) and an overall rate (created → won) answer different questions, and that time-in-stage is where deals actually stall.\n- SLOs made it onto the model for the first time: freshness of `deals` (< 24h), uniqueness of `transaction_id`, and completeness of `closed_date` for closed deals.\n\nNext week you find out whether the data actually meets those SLOs. Spoiler: it does not."},{number:3,slug:"activation",title:"The pipeline says success",week:"Week 3 · Activation",tagline:"Green runs, wrong numbers. Audit the data, not the dashboard.",brief:`**Wednesday, 07:50.** Sofia forwards you a screenshot. The revenue tile on the new prototype jumped **+189,500** overnight, then dropped back the next morning.

Raj is defensive and has a point: every run of \`gold_sales_metrics\` succeeded. Then you look at the run log and find three straight days in June where it didn't, and one morning in July where \`crm_deals_ingest\` processed **30%** of the usual rows and still reported success.

Lena, quietly: *"Reps close deals in the CRM days after the contract is signed. Sometimes they never move the stage at all."*

This is Activation week: input ports, transforms, output ports, and **SLOs**. The first three exist. The fourth is where trust lives. Nobody is going to audit this data for you.

**This week:** write the data-quality checks a Data PM would insist on before launch. Duplicates, stale stages, missing dates, freshness, failed-run streaks, and row-count anomalies. Window functions do the heavy lifting.`,readings:["data-product-activation","data-quality-dimensions","medallion-architecture","self-service-infrastructure"],debrief:'**What a good Week 3 looked like.**\n\n- You found **five duplicate transactions** (a re-ingested file) which explains the +189,500 jump. Uniqueness check added to the pipeline; Raj now owns it.\n- You found **four deals** whose CRM stage still said `negotiation` while the history log said `closed_won`. The source of truth for stage is now the history log, and `deals.stage` is derived from it.\n- You found closed deals with no `closed_date`, a three-day failed streak with no alert, and a partial-file day that passed as "success." Each became an SLO with a monitor.\n- Raj went from "the numbers are right" to "here is what the numbers can\'t guarantee." That is the team dynamic shift: *how do we validate?*\n\nNext week you ship, and adoption becomes the metric.'},{number:4,slug:"launch",title:"Ship it where they already are",week:"Week 4 · Launch",tagline:"A data product with no adoption plan is a report.",brief:`**Monday, 1 June.** The Sales Funnel Accelerator goes live. It has three metrics, labeled definitions, and a "why did this change" panel. Dana presents it at the sales all-hands.

By Thursday, half of the reps are still opening the legacy Pipeline Report because it is bookmarked in their browser. Finance never opens either. Sofia asks the question you knew was coming: *"Is anyone using it?"*

Adoption is not a vanity metric for a data product; it is the *only* evidence that the definitions you fought for are now the definitions people decide with. If usage stays flat, you built a report.

**This week:** measure adoption properly (weekly active viewers, by role, versus the legacy dashboard), then use those numbers to decide where to spend your week: training, embedding the numbers in the CRM, or retiring the old report.`,readings:["go-to-market-launch","proof-of-value-performance"],debrief:`**What a good Week 4 looked like.**

- Weekly active viewers roughly doubled every two weeks after launch while the legacy report faded. You retired the legacy report on 1 July with a redirect, not a memo.
- Sales Managers adopted first, Sales Reps followed once a manager started asking about *their* stalled deals in 1:1s. Finance still had zero views: that became next week's stakeholder conversation with Tom\xe1s.
- You reported adoption as **distinct viewers per role**, not raw views. Raw views were inflated by two RevOps analysts refreshing all day.

Next week the number moves in the wrong direction and everyone has a theory.`},{number:5,slug:"proof",title:"Conversion fell and everyone has a theory",week:"Week 5 · Proof",tagline:"Walk down the metric tree. Don't argue at the top of it.",brief:`**Tuesday, 08:15, exec staff.** Sofia puts the chart up. Conversion rate for deals created in **May and June** is well below the first four months of the year.

- **Dana:** "It's the price increase in May. I said so."
- **Lena:** "It's the new outbound lead-scoring vendor. The leads are garbage."
- **Raj:** "Are we sure it isn't the stale-stage problem from week 3?"
- **Tom\xe1s:** "Is this deal count or deal value?"

Four hypotheses, one number. This is what the Metric Dependency Tree is for. A drop at the top has to show up somewhere at the bottom: a segment, a stage, a rep, a source. Root-cause analysis is walking *down* the tree with a query at each level until one branch explains most of the move.

**This week:** confirm the drop is real (and not an artifact of open deals), then slice it by region \xd7 source, by stage velocity, and by rep. Bring the exec team a cause, a size, and a fix, not a theory.`,readings:["proof-of-value-performance","funnel-conversion-analysis","oee-manufacturing-case-study"],debrief:`**What a good Week 5 looked like.**

- The drop was real for *resolved* deals; once you excluded open deals created in July and August, the story was clean.
- It was concentrated in **AMER \xd7 Outbound**. Every other segment was flat. That killed the price-increase theory in one query (a price increase hits every region and source).
- Time in *negotiation* for that segment roughly doubled: the leads were reaching negotiation but not closing. Lena's vendor theory held; Raj's stale-stage theory explained only a handful of deals.
- You sized it (a specific number of deals and dollars) and proposed the fix (revert the vendor's scoring model for AMER, re-qualify the open May–June outbound deals). Sofia approved it in the meeting.

One week left, and the CFO wants a revenue number for the board.`},{number:6,slug:"beyond",title:"One number, three meanings",week:"Week 6 · Beyond",tagline:"Reconcile revenue, then make the definitions machine-readable.",brief:`**Thursday, 16:00.** Tom\xe1s sends a one-line email: *"Board deck says revenue 7.77M. Sales deck says 6.84M. Which one do I put on the slide?"*

Neither is wrong. One is the sum of **transactions** (cash movements, including renewals and upsells). The other is the sum of **closed_won deal amounts** (bookings). They diverge exactly where a business is healthy: existing customers paying more. But if nobody writes that down, an AI agent someone is piloting for "revenue questions" will pick whichever definition it finds first.

That is the ontology gap, and it is your last deliverable: a reconciliation that explains every dollar of the difference, a running revenue total by month, and one capstone query that computes the whole metric tree from a single set of definitions.

**This week:** reconcile, then write it down in a form both people and agents can consume. You are no longer fixing a dashboard. You are defining what Meridian means when it says a word.`,readings:["ontology-as-infrastructure","agent-observability-gap","lean-ai-cost-economics"],debrief:`**What a good Week 6 looked like.**

- Revenue got two names with owners: \`bookings_value\` (Sales, from deals) and \`revenue_generated\` (Finance, from transactions). The board slide shows both and the bridge between them: renewals, upsells, and the duplicate rows you removed in week 3.
- The running-total query became the first "gold" metric with a written definition, a test, and an SLO. Every future metric follows the same template.
- You handed the definitions to the agent pilot as a semantic contract, and asked for an evaluation set before it answers a single executive. Observability tells you it ran; evaluation tells you it was right.

**Six weeks in.** Meridian moved from *Reactive* to *Purpose-driven* on one domain. That is what a proof of value is: not every metric, one metric tree that people decide with.`}];e.s(["CAST",0,[{name:"Sofia Marin",role:"CEO, your sponsor",agenda:"Wants proof within six weeks that a Data PM is worth the headcount. Cares about one thing: decisions getting made faster, on numbers people trust."},{name:"Dana Whitfield",role:"VP Sales",agenda:"Has stopped opening the legacy Pipeline Report. Wants a 'Sales Funnel Accelerator' that tells her where deals are stuck and why. Distrusts any conversion rate above 50%."},{name:"Raj Patel",role:"Analytics Engineer",agenda:"Owns the three pipelines (crm_deals_ingest, transactions_ingest, gold_sales_metrics). Every run is green. Tired of being told the numbers are wrong without anyone saying which number."},{name:"Lena Fischer",role:"RevOps Lead",agenda:"Owns CRM hygiene. Knows reps update deal stages late and sometimes not at all. Brought in a new outbound lead-scoring vendor in May."},{name:"Tomás Reyes",role:"CFO",agenda:"Needs a revenue number for the board that matches what finance recognizes, not what sales booked. Asks what 'revenue' means every time someone says it."}],"COMPANY",0,{name:"Meridian",blurb:"A 300-person B2B software company selling field-operations software to mid-size and enterprise customers. Sales runs on a CRM, finance runs on invoices, and until now nobody has owned the data in between.",asOf:"31 Aug 2026"},"chapters",0,t,"getChapter",0,function(e){return t.find(t=>t.number===e)}])},74581,e=>{"use strict";var t=e.i(71645);function a(e=new Date){let t=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${t}-${o}-${n}`}let o="dpm-lab:progress:v1";function n(){return{version:1,user_id:"local",exercises:{},attempts:[],srs:{},quiz:{},streak:{current:0,lastActiveDate:null}}}function s(){try{let e=window.localStorage.getItem(o);if(!e)return n();let t=JSON.parse(e);if(t?.version!==1)return n();return{...n(),...t}}catch{return n()}}function r(e){let t,o=a(),{current:n,lastActiveDate:s}=e.streak;if(s===o)return e;let r=s===((t=new Date).setDate(t.getDate()-1),a(t))?n+1:1;return{...e,streak:{current:r,lastActiveDate:o}}}let i=n(),l=null,d=new Set;function u(){return null===l&&(l=s()),l}function c(){return i}function h(){for(let e of d)e()}function m(e){d.add(e);let t=e=>{e.key===o&&(l=s(),h())};return window.addEventListener("storage",t),()=>{d.delete(e),window.removeEventListener("storage",t)}}e.s(["dueCards",0,function(e,t){return t.filter(t=>(function(e,t=new Date){return!e||e.due<=a(t)})(e.srs[t.id]))},"useProgress",0,function(){let e=(0,t.useSyncExternalStore)(m,u,c),s=(0,t.useCallback)(e=>{var t=e(u());l=t;try{window.localStorage.setItem(o,JSON.stringify(t))}catch{}h()},[]),d=(0,t.useCallback)((e,t,a,o)=>s(n=>{let s,i,l,d,u;return s=new Date().toISOString(),i=n.exercises[e]??{kind:t,status:"not_started",attempts:0},l=o||"solved"===i.status?"solved":"attempted",d={...n.exercises,[e]:{...i,kind:t,status:l,attempts:i.attempts+1,lastAttemptAt:s,solvedAt:o&&!i.solvedAt?s:i.solvedAt}},u=[{id:`${e}:${s}`,slug:e,kind:t,code:a,passed:o,at:s},...n.attempts].slice(0,200),r({...n,exercises:d,attempts:u})}),[s]),g=(0,t.useCallback)((e,t)=>s(o=>{let n;return n=o.srs[e]??function(e=new Date){return{ease:2.5,interval:0,repetitions:0,due:a(e)}}(),r({...o,srs:{...o.srs,[e]:function(e,t,o=new Date){let{ease:n,interval:s,repetitions:r}=e;return t<3?(r=0,s=1):(s=0===r?1:1===r?6:Math.round(s*n),r+=1),(n+=.1-(5-t)*(.08+(5-t)*.02))<1.3&&(n=1.3),{ease:Math.round(100*n)/100,interval:s,repetitions:r,due:function(e,t){let[o,n,s]=e.split("-").map(Number),r=new Date(o,n-1,s);return r.setDate(r.getDate()+t),a(r)}(a(o),s)}}(n,t)}})}),[s]),p=(0,t.useCallback)((e,t,a)=>s(o=>r({...o,quiz:{...o.quiz,[e]:{chosen:t,correct:a,at:new Date().toISOString()}}})),[s]);return{data:e,hydrated:e!==i,recordAttempt:d,recordReview:g,recordQuizAnswer:p,resetQuiz:(0,t.useCallback)(e=>s(t=>(function(e,t){let a={...e.quiz};for(let e of t)delete a[e];return{...e,quiz:a}})(t,e)),[s]),reset:(0,t.useCallback)(()=>s(()=>n()),[s])}}],74581)}]);