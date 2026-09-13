import type { KbEntry } from "@/lib/types";

// Knowledge base seeded from your four source documents. Bodies are
// synthesized/summarized in plain language (not verbatim reproductions) so
// they read as study notes, with a `source` line for provenance.

export const kbEntries: KbEntry[] = [
  {
    slug: "what-is-a-data-product-manager",
    title: "What is a Data Product Manager?",
    category: "definition",
    tags: ["role", "fundamentals"],
    summary:
      "A DPM sits at the intersection of data, technology, and business, managing data warehouses, platforms, pipelines, and ML models the way a PM manages a product.",
    body: `A **Data Product Manager (DPM)** is a specialized role at the intersection of
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
whom, and how will we know it's trusted?*`,
    source: "PRD - Data Product Management.pdf; role comparison from the user's notes.",
  },
  {
    slug: "four-key-shifts",
    title: "The Four Key Shifts (Data PM vs. General PM)",
    category: "framework",
    tags: ["role", "mindset"],
    summary:
      "Risk profile, success metrics, customer journey, and team dynamic all invert when you move from general PM to data PM.",
    body: `Four dimensions where Data Product Management inverts the general-PM
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
version of these four dimensions, not the general-PM one.`,
    source: "PRD - Data Product Management.pdf",
  },
  {
    slug: "medallion-architecture",
    title: "Medallion Architecture: Bronze, Silver, Gold",
    category: "definition",
    tags: ["data-engineering", "architecture"],
    summary:
      "A three-layer pattern for structuring a data lakehouse: raw ingestion (Bronze), cleaned/augmented (Silver), business-level aggregates (Gold).",
    body: `A layered pattern (popularized by the lakehouse architecture) for organizing
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
transform problem, not a Gold-layer aggregation problem.`,
    source: "PRD - Data Product Management.pdf; Big Book of Data Science",
  },
  {
    slug: "data-product-maturity-stages",
    title: "Data Product Journey: Four Maturity Stages",
    category: "framework",
    tags: ["strategy", "maturity"],
    summary:
      "Most orgs sit in Ad-hoc or Reactive. The goal is Purpose-Driven: initiatives measured by clear North Star, functional, and granular metrics.",
    body: `A simple maturity ladder for where a data org sits:

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
like on one narrow slice, not to boil the ocean.`,
    source: "6-Week Data Products Product Playbook.pdf",
  },
  {
    slug: "metric-types",
    title: "North Star, Functional, and Granular Metrics",
    category: "definition",
    tags: ["metrics", "measurement"],
    summary:
      "North Star = the domain's leading business metric. Functional = the leading metric for a sub-area. Granular = an indicator of effectiveness.",
    body: `Every data product needs a metric hierarchy, not a single number:

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
"revenue dropped" to the specific granular metric that explains it.`,
    source: "6-Week Data Products Product Playbook.pdf",
  },
  {
    slug: "bullseye-data-product-market-fit",
    title: "The Bullseye: Data Product-Market Fit (Week 1)",
    category: "framework",
    tags: ["playbook", "discovery", "week-1"],
    summary:
      "Before building anything: retrieve requirements from real end users, map their existing journey, and identify North Star/functional/granular metrics.",
    body: `**Week 1 of the 6-week playbook.** The first and most critical stage:
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
useful to leadership — this is a proof of value, not a full rollout.`,
    source: "6-Week Data Products Product Playbook.pdf",
  },
  {
    slug: "canvas-data-product-design",
    title: "The Canvas: Data Product Design (Week 2)",
    category: "framework",
    tags: ["playbook", "modeling", "week-2"],
    summary:
      "Build a Metric Dependency Tree and the logical data model (entities, dimensions, measures, relationships, SLOs, semantics) that powers it.",
    body: `**Week 2.** The first real touchpoint between humans and technology.

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
   formula (\`metric = measures × dimensions\`).
4. **Iterate logic** with stakeholders to validate the model.
5. **Validate the prototype** against realistic dummy data before touching
   production data.`,
    source: "6-Week Data Products Product Playbook.pdf",
  },
  {
    slug: "data-product-activation",
    title: "Activation: Input Ports, Transforms, Output Ports, SLOs (Week 3)",
    category: "framework",
    tags: ["playbook", "engineering", "week-3"],
    summary:
      "A data product activates once four pieces exist: input ports, transformation steps, output ports, and SLOs — ideally declared, not hand-built.",
    body: `**Week 3.** Activating the logical model means assembling four pieces:

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
YAML) and get ready-to-use workflows, monitors, and connectors for free.`,
    source: "6-Week Data Products Product Playbook.pdf",
  },
  {
    slug: "self-service-infrastructure",
    title: "Self-Service Infrastructure (SSI)",
    category: "framework",
    tags: ["platform", "data-mesh"],
    summary:
      "Ready-to-use resources (policy, monitor, workflow, contract, service, secret, compute) that let engineers declare intent instead of building plumbing from scratch.",
    body: `**Self-service** means business/data teams get ready-to-use resources
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
every domain."`,
    source: "6-Week Data Products Product Playbook.pdf",
  },
  {
    slug: "go-to-market-launch",
    title: "The Launch: Go-to-Market for a Data Product (Week 4)",
    category: "framework",
    tags: ["playbook", "adoption", "week-4"],
    summary:
      "A data product with no adoption strategy fails like any other product. Position it in the user's language, and make usage effortless.",
    body: `**Week 4.** A data product without a concrete adoption strategy fails, same
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
  assets/pipelines.`,
    source: "6-Week Data Products Product Playbook.pdf",
  },
  {
    slug: "proof-of-value-performance",
    title: "The Proof: Product Performance (Weeks 5–6)",
    category: "framework",
    tags: ["playbook", "measurement", "week-5-6"],
    summary:
      "Post-launch is where you spend the most effort: usage metrics, A/B tests, and feedback loops that evolve the SLO model and expand use cases.",
    body: `**Weeks 5–6.** Assign the *highest* proportion of the exercise to
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
  into the same metric tree).`,
    source: "6-Week Data Products Product Playbook.pdf",
  },
  {
    slug: "ontology-as-infrastructure",
    title: "Ontology as Operational Infrastructure for AI Agents",
    category: "industry-context",
    tags: ["ontology", "ai-agents", "2026"],
    summary:
      "As LLM agents act autonomously, the ambiguity humans used to resolve silently (what is 'revenue'? what is a 'customer'?) becomes a hard failure point.",
    body: `Enterprises ran for years without formal ontologies because meaning was
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
rebuild context from scratch on every query.`,
    source: "State of Data Products, Q2 2026 (Modern Data 101).",
  },
  {
    slug: "agent-observability-gap",
    title: "Agent Observability ≠ Agent Correctness",
    category: "industry-context",
    tags: ["ai-agents", "observability", "2026"],
    summary:
      "Most teams running AI agents have monitoring (did it run?) but not evaluation (was it right?) — and standard software testing assumptions don't hold for agents.",
    body: `Monitoring tells you an agent ran. It does not tell you whether it
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
happened.`,
    source: "State of Data Products, Q2 2026 (Modern Data 101).",
  },
  {
    slug: "lean-ai-cost-economics",
    title: "Lean AI: Matching Model Size to Task Difficulty",
    category: "industry-context",
    tags: ["cost", "llm-economics", "2026"],
    summary:
      "Small language models can be ~100x cheaper than large ones per conversation; mature teams route by difficulty rather than defaulting to the biggest model.",
    body: `Per-token pricing looks fine at demo scale and gets expensive fast at real
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
product-tiering decision, not a one-time technical pick.`,
    source: "State of Data Products, Q2 2026 (Modern Data 101).",
  },
  {
    slug: "oee-manufacturing-case-study",
    title: "Case Study: Multi-Factory OEE & KPI Monitoring",
    category: "case-study",
    tags: ["manufacturing", "real-time", "case-study"],
    summary:
      "OEE = Availability × Efficiency × Quality. Legacy/manual OEE computation breaks at multi-factory scale; a medallion pipeline fixes latency and drill-down.",
    body: `**Overall Equipment Effectiveness (OEE)** is the standard metric for
manufacturing equipment productivity:

\`\`\`
OEE = Machine Availability × Process Efficiency × Product Quality
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
transform.`,
    source: "The Big Book of Data Science Use Cases, 2nd Edition (Databricks).",
  },
  {
    slug: "data-quality-dimensions",
    title: "Data Quality Dimensions (and how to write an SLO)",
    category: "framework",
    tags: ["data-quality", "slo", "week-3"],
    summary:
      "Six dimensions — completeness, uniqueness, timeliness, consistency, validity, accuracy — each becomes an SLO once you name the measurement, threshold, and check time.",
    body: `A data product's SLOs are promises about the data, not about the pipeline.
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
observability* (did it run?) and *data quality* (is it right?).`,
    source: "Synthesized for DPM Lab from common data-quality practice; ties to the Playbook's Activation week.",
  },
  {
    slug: "funnel-conversion-analysis",
    title: "Funnel Analysis: Overall vs. Stage-to-Stage, Cohorts, Velocity",
    category: "framework",
    tags: ["metrics", "funnel", "rca", "week-2", "week-5"],
    summary:
      "Three different funnel questions need three different queries: overall conversion (by cohort), stage-to-stage conversion (from the history log), and time in stage (velocity).",
    body: `"Conversion rate" hides three questions. A Data PM keeps them apart.

## 1. Overall conversion — *did it close?*
\`won ÷ (won + lost)\` on **resolved** deals. Report it by **created-month
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
   negotiation usually mean lead quality; early losses mean targeting.`,
    source: "Synthesized for DPM Lab; builds on the Playbook's Metric Dependency Tree.",
  },
  {
    slug: "sql-toolkit-for-data-pms",
    title: "The SQL a Data PM Actually Uses",
    category: "definition",
    tags: ["sql", "skills"],
    summary:
      "CTEs for readable steps, window functions for per-row context, date bucketing for trends, and the four bugs that silently corrupt metrics.",
    body: `You are not writing production pipelines. You are verifying numbers,
sizing problems, and reading other people's queries. That needs a small,
sharp toolkit.

## Shapes you'll write every week
- **CTEs** (\`WITH x AS (...)\`) — one step per CTE, named after what it
  produces (\`resolved_deals\`, \`latest_stage\`). Readable beats clever.
- **Window functions** — \`ROW_NUMBER() OVER (PARTITION BY deal_id ORDER BY
  entered_at DESC)\` for "latest per entity"; \`LAG\`/\`LEAD\` for change
  between rows; \`SUM(...) OVER (ORDER BY month)\` for running totals;
  \`AVG(...) OVER (... ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)\` for moving
  averages.
- **Date bucketing** — \`substr(date, 1, 7)\` for month, \`strftime('%Y-%W',
  ts)\` for ISO-ish week, \`julianday(b) - julianday(a)\` for day differences
  (SQLite).
- **Conditional aggregation** — \`SUM(CASE WHEN ... THEN 1 ELSE 0 END)\` (or
  \`SUM(condition)\` in SQLite) to compute several rates in one pass.
- **HAVING** — filter *after* aggregation; the idiom for duplicates:
  \`GROUP BY key HAVING COUNT(*) > 1\`.

## The four silent metric bugs
1. **Join fan-out** — joining a 1:N table before an aggregate multiplies
   the measure. Aggregate the N side first.
2. **LEFT JOIN + WHERE on the right table** — turns it into an inner join
   and hides exactly the missing rows you were looking for. Put the
   condition in \`ON\`.
3. **COUNT(*) vs COUNT(DISTINCT x)** — views vs viewers, rows vs people.
4. **Integer division** — \`7 / 10 = 0\` in many engines. Multiply by
   \`1.0\` first.

## Grain first, window second
Decide what one row means (a deal? a month?), aggregate to that grain in a
CTE, *then* apply windows. Running totals and moving averages on the wrong
grain look plausible and are wrong.`,
    source: "Synthesized for DPM Lab.",
  },
  {
    slug: "sql-101",
    title: "SQL 101: the formulas",
    category: "definition",
    tags: ["sql", "basics", "level-0"],
    summary:
      "The clause order, filters, aggregates, GROUP BY/HAVING, and joins that every exercise in this app is built from.",
    body: `## The sentence
\`\`\`sql
SELECT column_a, column_b        -- which columns
FROM table_name                  -- which table
WHERE condition                  -- which rows
GROUP BY column_a                -- one row per value
HAVING COUNT(*) > 1              -- filter groups
ORDER BY column_b DESC           -- sort
LIMIT 10;                        -- keep n rows
\`\`\`
Clauses are optional but their order is fixed. Text goes in single quotes;
numbers don't. \`;\` ends the statement.

## Filters
| Want | Write |
|---|---|
| both | \`a = 1 AND b = 2\` |
| either | \`a = 1 OR b = 2\` (use parentheses with AND) |
| any of a list | \`stage IN ('closed_won', 'closed_lost')\` |
| a range | \`amount BETWEEN 1000 AND 5000\` |
| not equal | \`stage <> 'closed_lost'\` |
| missing | \`closed_date IS NULL\` (never \`= NULL\`) |
| pattern | \`email LIKE '%@northwind%'\` |

## Aggregates
\`COUNT(*)\`, \`COUNT(col)\` (non-NULL only), \`SUM\`, \`AVG\`, \`MIN\`, \`MAX\`.
Name the result: \`SUM(amount) AS total\`. In SQLite, \`SUM(stage = 'closed_won')\`
counts rows where the comparison is true, and \`1.0 * a / b\` forces decimal
division.

## GROUP BY / HAVING
Every SELECT column must be grouped or aggregated. \`WHERE\` filters rows
before grouping; \`HAVING\` filters groups after. The duplicate idiom:
\`GROUP BY key HAVING COUNT(*) > 1\`.

## Joins
\`\`\`sql
FROM deals d
JOIN accounts a ON a.account_id = d.account_id        -- only matches
LEFT JOIN transactions t ON t.deal_id = d.deal_id     -- all deals, NULL if none
\`\`\`
Qualify columns after a join (\`d.amount\`). Conditions on the right-hand table
of a LEFT JOIN belong in \`ON\`, not \`WHERE\`.

## Dates and text (SQLite)
\`substr(created_date, 1, 7)\` → month; \`strftime('%Y-%W', ts)\` → week;
\`julianday(b) - julianday(a)\` → days between.`,
    source: "Synthesized for DPM Lab (Level 0).",
  },
  {
    slug: "python-pandas-101",
    title: "Python & pandas 101: the formulas",
    category: "definition",
    tags: ["python", "pandas", "basics", "level-0"],
    summary:
      "Lists, dicts, and the DataFrame moves that mirror SQL: select, filter, group, sort, merge.",
    body: `## Python in one breath
\`\`\`python
x = 5                                   # variable
stages = ['qualified', 'proposal']      # list; stages[0], len(stages)
deal = {'id': 'D-1', 'amount': 5000}    # dict; deal['amount']
round(2 / 3, 4)                         # 0.6667
[s for s in stages if s != 'proposal']  # list comprehension (a filter)
\`\`\`
\`==\` compares, \`=\` assigns. \`//\` is integer division. Indentation defines
blocks.

## pandas ↔ SQL
| SQL | pandas |
|---|---|
| \`SELECT deal_id, amount FROM deals\` | \`deals[['deal_id', 'amount']]\` |
| \`WHERE stage = 'closed_won'\` | \`deals[deals['stage'] == 'closed_won']\` |
| \`WHERE a AND b\` | \`deals[(cond_a) & (cond_b)]\` — parentheses required |
| \`WHERE stage IN (...)\` | \`deals[deals['stage'].isin([...])]\` |
| \`COUNT(*)\` | \`len(deals)\` |
| \`SUM(amount)\` | \`deals['amount'].sum()\` |
| \`GROUP BY owner, SUM(amount)\` | \`deals.groupby('owner')['amount'].sum()\` |
| \`ORDER BY amount DESC\` | \`.sort_values('amount', ascending=False)\` |
| \`LIMIT 5\` | \`.head(5)\` |
| \`JOIN accounts ON account_id\` | \`deals.merge(accounts, on='account_id')\` |
| \`LEFT JOIN\` | \`.merge(..., how='left')\` |
| several aggregates | \`.agg(total=('amount', 'sum'), n=('deal_id', 'count'))\` |

## Getting an answer out
\`result = df.to_dict('records')\` for rows; \`int(x)\` / \`float(x)\` to turn a
numpy number into a plain one; \`(deals['stage'] == 'closed_won').sum()\`
counts True values, the pandas CASE WHEN.`,
    source: "Synthesized for DPM Lab (Level 0).",
  },
  {
    slug: "what-is-a-data-product",
    title: "What a Data Product Is (and Isn't)",
    category: "definition",
    tags: ["data-product", "fundamentals", "anatomy"],
    summary:
      "A curated, reliable, reusable data asset designed for ongoing use, with an owner, service expectations, and embedded quality. Not a dataset, not a dashboard, not a pipeline.",
    body: `## The definition
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
**source-aligned** product if it had a contract and an owner.`,
    source: "Modern Data 101 (Defining the True Data Product; Anatomy; Canonical Core; product types), from the user's notes.",
  },
  {
    slug: "modern-data-stack-map",
    title: "The Modern Data Stack: a Map",
    category: "definition",
    tags: ["tools", "architecture", "industry"],
    summary:
      "Where each category of tool sits between a source system and a decision, which vendors lead each category, and which pieces of Meridian's stack they correspond to.",
    body: `Vendors change; the layers don't. Read the stack left to right, the way data
flows, and every tool name becomes a position rather than a brand.

| Layer | What it does | Typical tools | At Meridian |
|---|---|---|---|
| **Sources** | Operational systems that create data | CRM (Salesforce, HubSpot), ERP (SAP, NetSuite), product events, files | The CRM, the billing system |
| **Ingestion / integration** | Move data from sources into storage; batch or streaming | Fivetran, Airbyte, Informatica, Talend, Ab Initio, Kafka, Kinesis | \`crm_deals_ingest\`, \`transactions_ingest\` |
| **Storage + compute** | Warehouse or lakehouse where data lands and SQL runs | Snowflake, Databricks, BigQuery, Redshift, Microsoft Fabric | The database behind the labs (SQLite stands in) |
| **Transformation + orchestration** | Turn raw tables into modelled, tested tables on a schedule | dbt, Spark, Airflow, Dagster, Prefect | \`gold_sales_metrics\` and its daily run |
| **Semantic layer + BI** | Define metrics once; explore and visualise | Looker, Tableau, Power BI, Qlik, Metabase, Redash | The Sales Funnel Accelerator dashboard |
| **Quality, observability, catalog, governance** | Know it's fresh, complete, unique; find it; control access | Monte Carlo, Great Expectations, Soda, Collibra, Alation, Atlan, Unity Catalog, DataOS | The week 3 SLOs, the ontology in week 6 |
| **ML / data science** | Train, track, and serve models | MLflow, SageMaker, Vertex AI, Dataiku, Jupyter | The agent pilot in week 6 |

## Three things a Data PM keeps straight
1. **ETL vs. ELT.** Classic tools (Informatica, Ab Initio) transform *before* loading into a warehouse. The modern pattern loads raw data first (Fivetran) and transforms inside the warehouse (dbt): ELT. That's why Bronze/Silver/Gold exists.
2. **Batch vs. streaming.** A nightly load is batch (Airflow-scheduled). Events arriving continuously are streaming (Kafka, Kinesis). Most sales analytics is batch; fraud and operations are streaming.
3. **Where the definition lives.** If "revenue" is computed in five dashboards, you have five definitions. Semantic layers (Looker's LookML, dbt's metrics, DataOS contracts) exist to define it once, in one place, and have every consumer read it.

## How to read Gartner's market categories
Gartner splits this into Cloud Database Management Systems (warehouses and
lakehouses), Data Integration Tools, Analytics and BI Platforms, Data Quality
Solutions, Metadata Management / Data Catalogs, and Data Science and ML
Platforms. The categories map one-to-one onto the rows above. When someone
says "we're evaluating a Magic Quadrant leader," ask which row.`,
    source: "Synthesized for DPM Lab; category structure follows Gartner's data & analytics markets.",
  },
  {
    slug: "tools-warehouses-lakehouses",
    title: "Warehouses and Lakehouses: Snowflake, Databricks, BigQuery, Redshift, Fabric",
    category: "definition",
    tags: ["tools", "warehouse", "lakehouse", "snowflake", "databricks"],
    summary:
      "The platforms where data lands and SQL runs. How each one thinks, what it charges you for, and the questions a Data PM asks before a workload lands on it.",
    body: `All five do the same core job: store large tables and run SQL over them at
scale. They differ in *how they think* and *what you pay for*.

| Platform | How it thinks | Bills you for | Distinctive pieces |
|---|---|---|---|
| **Snowflake** | A cloud data warehouse. Storage and compute are separate; you spin up "virtual warehouses" (compute clusters) per team or workload. | Compute credits per second a warehouse runs, plus storage. | Time Travel (query a table as of yesterday), zero-copy cloning, secure data sharing and a marketplace, Snowpark for Python/Java, Horizon for governance. |
| **Databricks** | A lakehouse: open files (Parquet) in your cloud storage, made table-like by Delta Lake, processed by Apache Spark. Notebooks in Python, SQL, Scala, R. | Compute (DBUs) for clusters and SQL warehouses, plus your own cloud storage. | Delta Lake, Unity Catalog (governance across workspaces), MLflow (experiments and model registry), Databricks SQL. The medallion Bronze/Silver/Gold pattern comes from here. |
| **Google BigQuery** | Serverless warehouse: no clusters to manage; you submit SQL and Google allocates capacity. | Bytes scanned per query (on-demand) or reserved "slots"; plus storage. | Tight fit with Google Analytics/Ads, BigQuery ML in SQL, native streaming inserts. |
| **Amazon Redshift** | AWS's warehouse; provisioned clusters or Serverless. | Node-hours (provisioned) or RPU-seconds (serverless); plus S3 storage via Spectrum. | Deep AWS integration (S3, Glue, Kinesis), Spectrum to query S3 files in place. |
| **Microsoft Fabric** | A unified SaaS analytics platform: OneLake storage, Synapse warehousing, Data Factory pipelines, Power BI, all in one workspace. | Capacity units (a pooled reservation) rather than per-service meters. | One security and billing model across engineering and BI; the natural choice for Power BI-centric organisations. |

## Your first hour on any of them
1. Find the **catalog / database / schema** hierarchy and the table you care about.
2. Run \`SELECT * FROM table LIMIT 20;\` and \`SELECT COUNT(*) ...\`. Everything you practised in the labs works here; the dialect differs slightly (\`LIMIT\` vs \`TOP\`, date functions).
3. Open the **query history**: who runs what, how often, how expensive. This is the fastest way to learn what a company actually uses.
4. Look for a **cost or usage dashboard**. Warehouses are where data budgets go.

## Questions a Data PM asks
- **Which layer is this table?** Raw landing (Bronze), modelled (Silver), or metric-ready (Gold)? Is a dashboard reading from raw?
- **What does a query cost, and who pays?** A single \`SELECT *\` on BigQuery can scan terabytes. Snowflake warehouses left running burn credits.
- **Who can see what?** Row/column-level security, PII masking, and where the access policy lives (Unity Catalog, Horizon, IAM).
- **How fresh is it?** Load time vs. query time; the freshness SLO from week 3 is a query against the warehouse's load metadata.
- **Can we share it without copying it?** Snowflake sharing and Delta Sharing let you publish a data product to another team or company as a live view.`,
    source: "Synthesized for DPM Lab from vendor documentation and public positioning (as of 2026).",
  },
  {
    slug: "tools-integration-pipelines",
    title: "Moving and Shaping Data: Fivetran, Airbyte, dbt, Airflow, Kafka, Informatica, Talend, Ab Initio",
    category: "definition",
    tags: ["tools", "integration", "etl", "elt", "streaming", "ab-initio"],
    summary:
      "The tools that get data from sources into the warehouse and turn it into modelled tables: managed connectors, SQL transformation, orchestration, streaming, and the enterprise ETL suites.",
    body: `Two generations coexist. **Enterprise ETL suites** (Informatica, Talend, Ab
Initio) transform data on their own engines before loading it, with heavy
lineage and governance built in; you'll meet them in banks, telecoms,
insurers, and anywhere with decades of batch jobs. The **modern ELT stack**
(Fivetran or Airbyte to load, dbt to transform in the warehouse, Airflow to
schedule) is what most new data teams assemble.

| Tool | Role | How you use it | Watch out for |
|---|---|---|---|
| **Fivetran** | Managed connectors: SaaS and databases → warehouse, on a schedule, with automatic schema handling. | Pick a source (e.g. Salesforce), authorise, choose tables, set sync frequency. Done. | Priced on rows changed per month (MAR); a wide CRM sync can get expensive. You don't control the transformation. |
| **Airbyte** | Open-source alternative to Fivetran; hundreds of community connectors; self-host or cloud. | Same flow; more connectors, more maintenance. | Connector quality varies. |
| **dbt** | Transformations as versioned SQL \`SELECT\`s ("models") that run inside the warehouse, with built-in tests, documentation, and lineage. | Write \`models/gold/sales_metrics.sql\`, declare tests (\`unique\`, \`not_null\`, \`accepted_values\`), run \`dbt build\`. | It's the "T" only; it needs a loader before it and a scheduler around it. Model sprawl without ownership. |
| **Apache Airflow** | Orchestration: define DAGs (task graphs) in Python, schedule them, retry, alert. | A DAG runs Fivetran → dbt → dashboard refresh at 02:00; the Airflow UI shows every run's status and duration. | Airflow knows a task *ran*, not that its data is right: week 3's whole lesson. Dagster and Prefect are the newer alternatives. |
| **Apache Kafka** | Distributed event streaming: producers write events to topics; consumers read them in order; partitions scale it. Confluent sells the managed version; AWS Kinesis is the equivalent. | Model each business event (\`deal_stage_changed\`) as a message; downstream systems subscribe. | Exactly-once, ordering, late events, schema evolution (schema registry). Streaming is where "events" in your PRD live. |
| **Informatica** | The long-standing enterprise data-integration and management suite (PowerCenter on-prem, IDMC in the cloud): integration, quality, MDM, catalog. | Graphical mappings; strong governance and lineage; typical in large regulated enterprises. | Cost and specialist skills; often the incumbent being migrated *from*. |
| **Talend** | Open-source-rooted ETL/ELT suite with data quality and governance; now part of Qlik. | Graphical job design generating Java; on-prem or cloud. | Mid-market fit; product direction after the Qlik acquisition. |
| **Ab Initio** | High-performance enterprise data processing platform: a graphical development environment (GDE), a parallel execution engine (the Co>Operating System), and a metadata hub with end-to-end lineage. | Build "graphs" of components (read, transform, join, write) that run in parallel across many CPUs; very fast for huge batch volumes. | Proprietary, expensive, rarely seen outside large banks, telecoms, and government; skills are scarce. When you meet it, the question is usually "what would it take to move this?" |

## How this maps to Meridian
\`crm_deals_ingest\` is a Fivetran-style connector; \`gold_sales_metrics\` is a
dbt model run by Airflow; the stage-history log is what a Kafka topic of
\`deal_stage_changed\` events would give you for free.

## Questions a Data PM asks
- **ETL or ELT?** If the transform happens before the warehouse, the raw data isn't available to re-derive metrics when the definition changes.
- **Where are the tests?** dbt tests, Great Expectations, or nowhere?
- **What happens when a run fails at 02:00?** Who's paged, and how long until recovery (week 3's failed-recovery query)?
- **How does a schema change upstream reach us?** A renamed CRM field can silently zero a metric.`,
    source: "Synthesized for DPM Lab from vendor documentation and public positioning (as of 2026).",
  },
  {
    slug: "tools-bi-semantic-layer",
    title: "Seeing the Data: Tableau, Power BI, Looker, Qlik, Metabase, Redash",
    category: "definition",
    tags: ["tools", "bi", "dashboards", "semantic-layer", "tableau"],
    summary:
      "BI tools are the consumption layer. The important difference between them is where the metric definition lives: in each dashboard, or in a governed semantic layer everyone reads.",
    body: `Remember week 2: a dashboard is not the data product; it reads one. The
question to ask of any BI tool is **where does the definition of revenue
live?** Tools split into two camps.

| Tool | Camp | How you use it | Strengths / cautions |
|---|---|---|---|
| **Tableau** (Salesforce) | Visual exploration first. Definitions can live in Tableau data sources but often live in each workbook. | Connect to a table, drag dimensions and measures onto shelves, build sheets, assemble a dashboard, publish to Tableau Cloud/Server. | Best-in-class visual analysis; risk of metric drift across workbooks; licence per user. |
| **Microsoft Power BI** | Visual first, with a modelling layer (DAX measures, Power Query). Now part of Fabric. | Import or DirectQuery a model, write DAX measures, build report pages, publish to a workspace. | Ubiquitous in Microsoft shops; cheap per user; DAX has a learning curve; models can sprawl. |
| **Looker** (Google) | Semantic layer first. LookML defines dimensions and measures in version-controlled code; every explore and dashboard reads them. | Model tables in LookML (views, explores, measures), then users explore without writing SQL. | Governed metrics by design: the tool closest to "one definition, many consumers". Heavier setup; developer skills needed. |
| **Qlik Sense** | Associative engine: in-memory model where every selection filters everything. | Load data into a Qlik app, build sheets, use associative filtering. | Strong ad-hoc exploration; definitions live in the app's load script. |
| **Metabase** | Lightweight open-source BI; questions written by clicking or in SQL; simple dashboards. | Point at the warehouse, ask a question, save it to a dashboard. | Great for small teams; limited governance. |
| **Redash** | Open-source SQL-first query and dashboard tool (the one in your PRD). | Write SQL, save the query, add visualisations, pin to a dashboard, schedule refresh. | Perfect when everyone can write SQL; definitions live in the query text. |

## Semantic layers, in one paragraph
A semantic layer is the place where *revenue* is defined once as a measure
over modelled tables, with its dimensions, and every dashboard, notebook, or
AI agent asks it rather than re-computing. LookML is the classic example;
dbt's metrics layer, Cube, AtScale, and the semantic model in Fabric play the
same role. In the Playbook's terms it's the Metric Dependency Tree made
executable. Without one, week 6's "which revenue number is right?" happens
every quarter.

## Questions a Data PM asks
- **Where is this number defined, and can I read the definition?** If the answer is "in the workbook," you have a consumption layer pretending to be a product.
- **Who owns the dashboard, and who owns the metric under it?** Different people, usually.
- **How is adoption measured?** Distinct viewers per week by role (week 4), not views.
- **What happens when the definition changes?** One edit in a semantic layer, or twenty workbooks?`,
    source: "Synthesized for DPM Lab from vendor documentation and public positioning (as of 2026).",
  },
  {
    slug: "tools-quality-governance-catalog",
    title: "Trusting and Governing: Monte Carlo, Great Expectations, Soda, Collibra, Alation, Atlan, Unity Catalog, DataOS",
    category: "definition",
    tags: ["tools", "data-quality", "observability", "catalog", "governance", "dataos"],
    summary:
      "The tools that turn week 3's SLOs into monitors, make data findable, and encode who may see what. Also where data product platforms like DataOS sit.",
    body: `Week 3 wrote SLOs as queries. These tools run them for you, tell people
about breaches, and keep the definitions and access rules in one place.

## Quality and observability
| Tool | What it does | How you use it |
|---|---|---|
| **Monte Carlo** | Data observability: automatically monitors freshness, volume, schema changes, and distribution anomalies across the warehouse; shows lineage so you know which dashboards a broken table feeds. | Connect the warehouse; it learns normal patterns and alerts on deviations (your partial-file day would trip a volume monitor). Add custom SQL rules for business checks. |
| **Great Expectations** | Open-source framework of "expectations" (\`expect_column_values_to_be_unique\`) run inside pipelines, producing data docs. | Define expectation suites per table; run them as a pipeline step; fail the run on breach. |
| **Soda** | Checks written in a YAML-like language (SodaCL) run against the warehouse on a schedule, with a cloud UI for incidents. | \`checks for transactions: - duplicate_count(deal_id, amount, transaction_date) = 0\`. |
| **dbt tests** | The simplest option if you already use dbt: \`unique\`, \`not_null\`, \`accepted_values\`, \`relationships\`, plus custom SQL tests. | Declare in the model's YAML; \`dbt test\` runs them. |

The difference: Monte Carlo *discovers* problems you didn't write checks for;
Great Expectations, Soda, and dbt tests *enforce* the ones you did. Mature
teams use both.

## Catalog and governance
| Tool | What it does |
|---|---|
| **Collibra** | Enterprise data governance: business glossary, data ownership, policies, workflows for approvals; strong in regulated industries. |
| **Alation** | Data catalog with search, popularity signals from query logs, stewardship, and lineage; the "Google for your data" pitch. |
| **Atlan** | Modern collaborative catalog: active metadata, lineage, Slack-style collaboration, embedded in the tools people already use. |
| **Unity Catalog** (Databricks) / **Snowflake Horizon** | Platform-native governance: one place for permissions, lineage, tags, and discovery inside the warehouse itself. |

## Data product platforms
**DataOS** (The Modern Data Company, the publisher of the Playbook and the
State of Data Products reports) is a platform built around the data product
idea itself: a self-serve layer where an engineer declares input ports,
transforms, output ports, and SLOs in a spec, with contracts, a semantic
model, and governance as first-class resources. Competing ideas appear as
"data product" features in Databricks, Snowflake, and catalogs like Atlan.
Whatever the vendor, the test is the same: can you see the owner, the
contract, the SLOs, and the consumers of a product in one place?

## Questions a Data PM asks
- **Which SLOs are monitored, and who gets the page?** A check nobody receives is documentation.
- **Can a new analyst find the right table in five minutes?** That's what the catalog is for; popularity and ownership matter more than descriptions.
- **Where is the access policy, and is it enforced or advisory?** PII masking in Unity Catalog is enforced; a Collibra policy document is advisory unless wired to the platform.
- **Does the ontology from week 6 live in a tool, or in a slide?**`,
    source: "Synthesized for DPM Lab from vendor documentation and public positioning (as of 2026).",
  },
  {
    slug: "tools-ml-platforms",
    title: "Data Science and ML Platforms: MLflow, SageMaker, Vertex AI, Dataiku, Notebooks",
    category: "definition",
    tags: ["tools", "ml", "notebooks", "mlflow"],
    summary:
      "Where models are built, tracked, and served, and what a Data PM needs from them: reproducibility, a registry, and evaluation before anything reaches a decision.",
    body: `A Data PM rarely trains models, but often owns the data products they
consume and the decisions they feed. Know the parts.

| Tool | What it does | What a DPM asks of it |
|---|---|---|
| **Jupyter / Databricks notebooks / Hex / Deepnote** | Interactive Python (the pandas you practised) with charts and prose; where analysis and prototyping happen. | Is the notebook reading a governed table or a CSV someone exported in March? |
| **MLflow** (open source, built into Databricks) | Experiment tracking (parameters, metrics, artifacts per run), a model registry with stages (staging, production), and packaging for deployment. | Which model version is live, what data was it trained on, and what were its metrics? |
| **Amazon SageMaker** | AWS's end-to-end ML platform: notebooks, training jobs, feature store, model hosting, pipelines, monitoring. | Who owns the feature definitions, and do they match the warehouse's? |
| **Google Vertex AI** | GCP's equivalent: AutoML and custom training, feature store, pipelines, model monitoring, plus the Gemini model APIs. | Same, plus cost per prediction. |
| **Dataiku** | Visual data science platform for mixed teams: drag-and-drop recipes and code side by side, deployment and governance included. | Good for analyst-heavy teams; check that "recipes" don't become an ungoverned second transformation layer. |
| **Feature stores** (Feast, Tecton, platform-native) | Define a feature (e.g. \`days_in_negotiation\`) once and serve the same value to training and to production. | The ML version of the semantic layer: one definition, two consumers. |

## The Data PM's checklist for anything model-shaped
1. **Lineage**: which data product does it read? Is that product's SLO good enough for this decision?
2. **Reproducibility**: can we retrain the live version from tracked code, data, and parameters?
3. **Evaluation**: a held-out set with agreed answers, run before every change (week 6's agent lesson applies to classical models too).
4. **Monitoring**: drift in inputs and outputs, not just uptime.
5. **Cost per correct prediction**, the Lean AI metric.`,
    source: "Synthesized for DPM Lab from vendor documentation and public positioning (as of 2026).",
  },
];

