import type { ChapterNumber, FillItem, Lesson, LessonItem, MatchItem, McqItem, OrderItem, TrueFalseItem, Unit } from "@/lib/types";
import { chapters } from "./story";

// Micro-lessons: one concept card + five quick interactions, about a
// minute each. Six units follow the six Playbook weeks. Item ids are
// derived from the lesson id so they stay stable for progress tracking.

// ---------- tiny authoring DSL ----------
type Draft = Omit<LessonItem, "id"> extends infer T ? (T extends { kind: string } ? Omit<T, "id"> : never) : never;
const concept = (title: string, body: string, kbSlug?: string) => ({ kind: "concept" as const, title, body, kbSlug });
const mcq = (prompt: string, options: string[], correct: number, explanation: string, optionNotes?: (string | undefined)[], kbSlug?: string): Omit<McqItem, "id"> => ({
  kind: "mcq",
  prompt,
  options,
  correct,
  explanation,
  optionNotes,
  kbSlug,
});
const tf = (statement: string, answer: boolean, explanation: string, kbSlug?: string): Omit<TrueFalseItem, "id"> => ({ kind: "truefalse", statement, answer, explanation, kbSlug });
const fill = (prompt: string, bank: string[], answer: string, explanation: string, kbSlug?: string): Omit<FillItem, "id"> => ({ kind: "fill", prompt, bank, answer, explanation, kbSlug });
const match = (prompt: string, pairs: [string, string][], explanation: string, kbSlug?: string): Omit<MatchItem, "id"> => ({ kind: "match", prompt, pairs, explanation, kbSlug });
const order = (prompt: string, steps: string[], explanation: string, kbSlug?: string): Omit<OrderItem, "id"> => ({ kind: "order", prompt, steps, explanation, kbSlug });

function lesson(id: string, unit: ChapterNumber, title: string, items: Draft[]): Lesson {
  return { id, unit, title, items: items.map((it, i) => ({ ...it, id: `${id}-${i + 1}` }) as LessonItem) };
}

// ======================= UNIT 1 · The Bullseye =======================
const u1: Lesson[] = [
  lesson("u1-l1", 1, "What a Data PM actually owns", [
    concept(
      "The role",
      "A **Data Product Manager** sits where data, technology, and business meet. Instead of a feature, the product is a warehouse, a pipeline, a metric, or a model. The core job is **earning and protecting trust** in the numbers people decide with.",
      "what-is-a-data-product-manager"
    ),
    mcq("Which of these is a *data product*?", ["A pricing page redesign", "A sales-funnel metric with a written definition and an owner", "A quarterly sales kickoff", "A new CRM login flow"], 1, "A metric with a definition, a pipeline behind it, and someone accountable for it is a data product. The others are software or events.", undefined, "what-is-a-data-product-manager"),
    tf("A Data PM's main deliverable is a dashboard.", false, "Dashboards are one output port. The deliverable is a trusted, defined, maintained data product; the dashboard is where people read it.", "what-is-a-data-product-manager"),
    fill("A Data PM sits at the intersection of data, technology, and ___.", ["business", "design", "marketing", "finance"], "business", "Data + technology + business. The business side is what makes it product management rather than data engineering.", "what-is-a-data-product-manager"),
    match("Match each thing to who usually owns it.", [["Roadmap and priorities", "Data PM"], ["Pipeline code", "Analytics engineer"], ["Metric definition sign-off", "Data PM with the domain owner"], ["CRM data entry", "Sales reps"]], "The Data PM owns priorities and definitions; engineers own the code; the domain owns the raw data it creates.", "what-is-a-data-product-manager"),
    mcq("A traditional PM leans on UX and go-to-market. A Data PM leans more on…", ["Technical and data-specific judgment", "Visual design", "Paid advertising", "Legal review"], 0, "Data PMs are more technical: they reason about schemas, definitions, quality, and lineage. UX still matters for analytics products, but it's not the centre of gravity.", undefined, "what-is-a-data-product-manager"),
  ]),
  lesson("u1-l2", 1, "The four key shifts", [
    concept(
      "Four things invert",
      "Moving from general PM to Data PM flips four dials: **risk** (bad data burns trust for good), **success metrics** (quality and decision velocity, not engagement), the **customer journey** (starts with skepticism), and the **team question** (from *when can we ship?* to *how do we validate?*).",
      "four-key-shifts"
    ),
    mcq("A buggy feature vs. a bad number: what's the difference in risk?", ["None, both get fixed", "Bad data can lose trust permanently; a bug is usually recoverable with a fix", "Bugs are worse because users see them", "Bad data is cheaper to fix"], 1, "The asymmetry is trust. A stakeholder burned once discounts every future number.", ["Both get fixed, but only one leaves a lasting mark.", undefined, "Users see wrong numbers too, in the board deck.", "Fixing the row is cheap; regaining trust is not."], "four-key-shifts"),
    match("Match the dimension to the Data PM version.", [["Success metrics", "Data quality, decision velocity, trust"], ["Customer journey", "\"I don't trust this yet… but maybe\""], ["Team question", "\"How do we validate?\""], ["Risk profile", "Ship bad data, lose trust"]], "Those are the four shifts. Notice none of them is about tooling.", "four-key-shifts"),
    tf("For a Data PM, usage and engagement are the primary success metrics.", false, "Those are general-PM metrics. A data product succeeds when its numbers are trusted and decisions get made faster on them.", "four-key-shifts"),
    fill("The Data PM team's default question changes from \"when can we ship?\" to \"how do we ___?\"", ["validate", "scale", "market", "monetize"], "validate", "Validation before shipping: a data product that ships wrong is worse than one that ships late.", "four-key-shifts"),
    mcq("Dana opens the new dashboard and says \"I don't trust this yet.\" That reaction is…", ["A sign the product failed", "The normal starting point of the data-product journey", "Something to escalate", "Proof the numbers are wrong"], 1, "Skepticism is the opening emotion for data products. Your job is to move it to \"…but maybe\" with definitions, checks, and transparency.", undefined, "four-key-shifts"),
  ]),
  lesson("u1-l3", 1, "North Star, functional, granular", [
    concept(
      "The metric tree",
      "Every domain needs three layers: a **North Star** tied to the business (revenue_generated), a **functional** metric for the team (deals_closed_value), and **granular** metrics that explain movement (conversion_rate, days_in_stage). They form a **Metric Dependency Tree**: granular → functional → North Star.",
      "metric-types"
    ),
    match("Match each Sales metric to its layer.", [["revenue_generated", "North Star"], ["deals_closed_value", "Functional"], ["conversion_rate", "Granular"]], "Several granular metrics (rates, times in stage) can sit under one functional metric; they all explain why bookings moved.", "metric-types"),
    mcq("What makes a metric *granular*?", ["It is computed daily", "It is a rate or ratio that explains *why* a higher-level metric moved", "It is the smallest number on the dashboard", "It comes from a single table"], 1, "Granular metrics are indicators of effectiveness. When revenue drops, you walk down to them to find the cause.", undefined, "metric-types"),
    tf("The North Star metric should be the one the CEO can act on directly.", false, "The North Star ties the domain to business outcomes; it moves because functional and granular metrics move. Actions happen lower in the tree.", "metric-types"),
    fill("Granular metrics roll up into functional metrics, which roll up into the ___.", ["North Star", "dashboard", "OKR", "data warehouse"], "North Star", "That roll-up is the Metric Dependency Tree, and it's what makes root-cause analysis a walk instead of a guess.", "metric-types"),
    order("Put the tree in order, top to bottom.", ["North Star: revenue_generated", "Functional: deals_closed_value", "Granular: conversion_rate"], "Top-down is how a stakeholder reads it; bottom-up is how the numbers are built.", "metric-types"),
  ]),
  lesson("u1-l4", 1, "Discovery before SQL", [
    concept(
      "Week 1: the Bullseye",
      "Before building anything: **interview end users**, **map how they use data today**, **agree the problem statement** in their words, and **identify the metric tree**. Spend a full week here. The output is a problem statement two stakeholders sign, not a query.",
      "bullseye-data-product-market-fit"
    ),
    order("Put the Week 1 steps in order.", ["Interview end users and capture pain points", "Map the existing user journey", "Agree the problem statement (value prop)", "Identify North Star, functional, granular metrics"], "Requirements → journey → purpose → metrics. Metrics come last because they must serve the problem, not the other way round.", "bullseye-data-product-market-fit"),
    mcq("Dana says the 61% conversion rate is wrong and wants it fixed by Friday. Raj says pipelines are green. Best first move?", ["Debug the dashboard SQL", "Ask Dana what number she expects, how she'd compute it by hand, and what decision it drives", "Tell Dana the pipelines are green", "Escalate to Sofia"], 1, "Most \"wrong numbers\" are two definitions colliding. Pin the definition, the expected value, and the decision before touching code.", ["You don't yet know which number or which definition.", undefined, "Green means the code ran, not that the metric means what she thinks.", "Nothing is diagnosed yet."], "bullseye-data-product-market-fit"),
    tf("If you already see the problem on Wednesday of week 1, it's fine to start building.", false, "Two stakeholders you haven't met hold different definitions. Building now bakes in a fight you haven't had. Finish discovery.", "bullseye-data-product-market-fit"),
    fill("For a proof of value, pick metrics that are directly useful to ___.", ["leadership", "engineers", "the vendor", "auditors"], "leadership", "A six-week proof of value has to move something a leader cares about, or it won't get a second six weeks.", "bullseye-data-product-market-fit"),
    mcq("Which question belongs in Week 1 discovery?", ["Which cloud warehouse should we buy?", "Which persona would get the most value from this data, and what decision would they make with it?", "Should the dashboard be dark mode?", "Which chart library is fastest?"], 1, "Discovery is about persona, pain, decision, and value. Tooling questions come after the problem statement.", undefined, "bullseye-data-product-market-fit"),
  ]),
  lesson("u1-l5", 1, "Where your company sits", [
    concept(
      "Four maturity stages",
      "**Ad-hoc** (no process) → **Reactive** (build what's requested) → **Strategy-driven** (chasing hype without users) → **Purpose-driven** (initiatives measured by a clear metric tree). Most companies are Reactive. A proof of value shows Purpose-driven on one narrow slice.",
      "data-product-maturity-stages"
    ),
    order("Order the maturity stages from least to most mature.", ["Ad-hoc", "Reactive", "Strategy-driven", "Purpose-driven"], "Reactive is the common default. Strategy-driven sounds better but often means a migration or a GenAI project with no user attached.", "data-product-maturity-stages"),
    mcq("Raj builds whatever the last request was; nobody owns definitions. Which stage is Meridian in?", ["Ad-hoc", "Reactive", "Strategy-driven", "Purpose-driven"], 1, "Requests in, pipelines out, no purpose or metric tree: textbook Reactive.", undefined, "data-product-maturity-stages"),
    tf("A large data-platform migration automatically moves a company to Purpose-driven.", false, "That's Strategy-driven at best: a big initiative without a concrete bridge to end users and a measured purpose.", "data-product-maturity-stages"),
    mcq("What does \"Purpose-driven\" mean in practice?", ["Every dataset is documented", "Data initiatives are tied to a business purpose and measured by North Star, functional, and granular metrics", "The data team reports to the CEO", "All pipelines are real-time"], 1, "Purpose plus measurement. Documentation and org charts are inputs, not the definition.", undefined, "data-product-maturity-stages"),
    fill("The point of a 6-week proof of value is to demonstrate Purpose-driven on ___ slice, not to boil the ocean.", ["one narrow", "every", "the largest", "a random"], "one narrow", "One domain, one metric tree, one set of users. Scale comes after proof.", "data-product-maturity-stages"),
  ]),
];

// ======================= UNIT 2 · The Canvas =======================
const u2: Lesson[] = [
  lesson("u2-l1", 2, "Three conversion rates", [
    concept(
      "Same word, three formulas",
      "Dana: won ÷ (won + lost). Lena: won ÷ created. Tomás: won *amount* ÷ closed *amount*. All legitimate, all different charts. The Data PM's move is not to pick a winner in the meeting but to put each on the **Metric Dependency Tree** with a name, a formula, and an owner.",
      "canvas-data-product-design"
    ),
    mcq("Three stakeholders, three conversion formulas. What do you do?", ["Pick the VP's", "Average them", "Name all three on the tree with formulas and owners; show one by default and label it", "Ask which is easiest to compute"], 2, "The definition fight should happen once and be written down. Different questions deserve different metrics; the sin is calling them the same thing.", ["You'd win the meeting and lose Finance and RevOps.", "A blended number nobody can reproduce destroys trust.", undefined, "Implementation cost isn't a reason to choose a business definition."], "canvas-data-product-design"),
    match("Match the formula to the person who wants it.", [["won ÷ (won + lost)", "Dana (VP Sales)"], ["won ÷ created", "Lena (RevOps)"], ["won amount ÷ closed amount", "Tomás (CFO)"]], "Deal counts for sales management, created-based for the CRM report, dollars for finance. Each answers a real question.", "canvas-data-product-design"),
    tf("Including open deals in the denominator makes conversion drift down over time for no business reason.", true, "Recent deals haven't had time to close, so \"won ÷ created\" sags at the right edge of any chart.", "funnel-conversion-analysis"),
    mcq("Raj's query: `SUM(stage = 'closed_won') / COUNT(*)` over all deals. Which definition is that?", ["Dana's (won ÷ resolved)", "Lena's (won ÷ created, open deals included)", "Tomás's (value-based)", "None; it errors"], 1, "COUNT(*) counts every deal regardless of stage, so open deals sit in the denominator.", undefined, "metric-types"),
    fill("Put every definition on the tree with a name, a formula, and an ___.", ["owner", "alert", "colour", "index"], "owner", "An owner is who signs off when the formula changes. Without one, the definition drifts back into people's heads.", "canvas-data-product-design"),
  ]),
  lesson("u2-l2", 2, "The logical data model", [
    concept(
      "Five parts",
      "A logical model has **entities** (accounts, deals), **dimensions** (attributes to slice by: region, source), **measures** (aggregates: sum, count), **relationships** (accounts 1:N deals), and **SLOs** (quality conditions). Metrics are measures cut by dimensions.",
      "canvas-data-product-design"
    ),
    match("Match each example to its model part.", [["accounts, deals", "Entities"], ["region, source", "Dimensions"], ["SUM(amount)", "Measure"], ["accounts 1:N deals", "Relationship"]], "Entities are the nouns, dimensions describe them, measures count or sum them, relationships connect them.", "canvas-data-product-design"),
    mcq("\"Conversion rate by region\" is…", ["A dimension", "A measure sliced by a dimension", "An entity", "An SLO"], 1, "The rate is a measure; region is the dimension you cut it by. That's what every metric-tree node looks like.", undefined, "canvas-data-product-design"),
    tf("Dimensions are numeric and measures are text.", false, "Backwards, and not the real distinction: dimensions are what you slice by, measures are what you aggregate.", "canvas-data-product-design"),
    fill("SLOs on the logical model are conditions about data ___ and access.", ["quality", "volume", "colour", "storage"], "quality", "Freshness, uniqueness, completeness: they live on the model so every consumer inherits the same promises.", "canvas-data-product-design"),
    mcq("Which belongs in Week 2 (the Canvas)?", ["Retiring the legacy dashboard", "Building the Metric Dependency Tree and the logical model behind it", "Interviewing end users for the first time", "Choosing an on-call rotation"], 1, "Week 2 turns week 1's definitions into a model everyone can point at, validated with dummy data before production.", undefined, "canvas-data-product-design"),
  ]),
  lesson("u2-l3", 2, "History log vs. current stage", [
    concept(
      "Overwritten fields lose history",
      "The CRM overwrites `deals.stage` on every move. The append-only **deal_stage_history** keeps every transition. Funnel questions are about *ever reached*, so they need the log. Stage-to-stage conversion and time-in-stage don't exist on the current-stage column at all.",
      "funnel-conversion-analysis"
    ),
    mcq("How many deals reached *proposal* this year? Which source do you use?", ["deals.stage = 'proposal'", "deal_stage_history: distinct deals that ever entered 'proposal'", "Either; same answer", "The CRM's built-in report"], 1, "The current-stage column only shows deals sitting in proposal *now*. Deals that moved on are invisible to it.", ["Undercounts badly: deals that moved on don't appear.", undefined, "A snapshot and a path are not the same thing.", "You can't inspect its definition."], "funnel-conversion-analysis"),
    match("Match the question to the query shape.", [["Did it close?", "won ÷ resolved, by created cohort"], ["Where do they drop?", "distinct deals per stage from the history log"], ["Where do they stall?", "LEAD(entered_at) gaps per deal"]], "Three funnel questions, three queries. Keeping them apart is the whole skill.", "funnel-conversion-analysis"),
    tf("A deal that skipped the proposal stage will still appear in the proposal count when counting from the history log.", false, "It never entered proposal, so it has no proposal row. That's correct behaviour, and it's why history-based funnels are honest.", "funnel-conversion-analysis"),
    fill("Time in stage = gap to the deal's ___ history row.", ["next", "first", "last", "largest"], "next", "LEAD(entered_at) OVER (PARTITION BY deal_id ORDER BY entered_at) minus entered_at. Terminal stages get NULL, which is right.", "funnel-conversion-analysis"),
    mcq("Reps sometimes never move the stage at all. Which source should be authoritative?", ["deals.stage, it's what the CRM shows", "The history log, with deals.stage derived from its latest row and a consistency check", "Whichever is more recent", "A weekly manual reconciliation"], 1, "Make the log the source of truth in the transform and add an SLO that flags disagreement. Manual fixes guarantee next month's four.", undefined, "data-quality-dimensions"),
  ]),
  lesson("u2-l4", 2, "Join fan-out", [
    concept(
      "The silent multiplier",
      "Joining a 1:N table *before* an aggregate multiplies the measure once per child row. A deal with five history rows counts its amount five times. Aggregate the N side first, in a CTE, then join. This is the most common way a total gets silently inflated.",
      "sql-toolkit-for-data-pms"
    ),
    mcq("```sql\nSELECT a.account_name, SUM(d.amount)\nFROM accounts a\nJOIN deals d ON d.account_id = a.account_id\nJOIN deal_stage_history h ON h.deal_id = d.deal_id\nWHERE d.stage = 'closed_won'\nGROUP BY a.account_name;\n```\nWhat's wrong?", ["Nothing", "Each deal's amount is counted once per history row: totals are inflated", "GROUP BY must include d.amount", "It needs a LEFT JOIN"], 1, "The WHERE filters deals but the join still repeats each deal per history row. Drop the join or aggregate history separately first.", undefined, "sql-toolkit-for-data-pms"),
    tf("A WHERE clause protects you from join fan-out.", false, "WHERE filters rows; it doesn't un-multiply them. The fix is where you aggregate, not what you filter.", "sql-toolkit-for-data-pms"),
    fill("To avoid fan-out, aggregate the ___ side first.", ["N (many)", "1 (one)", "left", "smaller"], "N (many)", "Collapse the many side to one row per key in a CTE, then join it to the one side.", "sql-toolkit-for-data-pms"),
    order("Order the safe pattern.", ["CTE: aggregate history to one row per deal", "Join the CTE to deals", "Aggregate deals to one row per account"], "Grain by grain: many → one → one. Each step has a known row count.", "sql-toolkit-for-data-pms"),
    mcq("Total won value roughly quintupled after someone added a join. Most likely cause?", ["A new customer", "Fan-out from a 1:N join before the SUM", "Currency conversion", "The WHERE clause was removed"], 1, "A multiple that matches the average child-row count is the fingerprint of fan-out.", undefined, "sql-toolkit-for-data-pms"),
  ]),
  lesson("u2-l5", 2, "Windows vs. GROUP BY", [
    concept(
      "Keep the rows, add the context",
      "**GROUP BY** collapses rows into groups. A **window function** computes over a partition but keeps every row: `ROW_NUMBER()` for latest-per-entity, `LAG`/`LEAD` for change between rows, `SUM() OVER (ORDER BY …)` for running totals. Reach for a window when you need an aggregate *alongside* each row.",
      "sql-toolkit-for-data-pms"
    ),
    mcq("When do you use a window function instead of GROUP BY?", ["When you want fewer rows out than in", "When you need an aggregate or rank alongside each row without collapsing rows", "Only for performance", "Never in SQLite"], 1, "Latest stage per deal, running total by month, change vs previous month: all per-row context.", undefined, "sql-toolkit-for-data-pms"),
    match("Match the need to the window function.", [["Latest history row per deal", "ROW_NUMBER() OVER (PARTITION BY deal_id ORDER BY entered_at DESC)"], ["Change vs previous month", "LAG(views) OVER (ORDER BY month)"], ["Running revenue total", "SUM(revenue) OVER (ORDER BY month)"], ["Days until next stage", "LEAD(entered_at) OVER (PARTITION BY deal_id ORDER BY entered_at)"]], "Four patterns cover most of what a Data PM writes with windows.", "sql-toolkit-for-data-pms"),
    tf("SQLite does not support window functions.", false, "It has since version 3.25 (2018). The in-browser SQLite here is far newer than that.", "sql-toolkit-for-data-pms"),
    fill("`ROW_NUMBER() OVER (PARTITION BY deal_id ORDER BY entered_at DESC)` = 1 gives the ___ row per deal.", ["latest", "earliest", "largest", "duplicate"], "latest", "DESC puts the newest first; rn = 1 picks it. Add a tiebreaker (history_id DESC) when timestamps can tie.", "sql-toolkit-for-data-pms"),
    mcq("```sql\nSELECT deal_id, stage,\n  julianday(LEAD(entered_at) OVER (PARTITION BY deal_id ORDER BY entered_at))\n  - julianday(entered_at) AS days\nFROM deal_stage_history;\n```\nWhat is `days` for each deal's most recent stage?", ["0", "NULL, there is no next row", "Days since the deal was created", "An error"], 1, "LEAD has nothing to look at, so NULL. Right for closed stages; for open deals you may COALESCE with the as-of date.", undefined, "sql-toolkit-for-data-pms"),
  ]),
];

// ======================= UNIT 3 · Activation =======================
const u3: Lesson[] = [
  lesson("u3-l1", 3, "Four pieces of activation", [
    concept(
      "What makes a data product live",
      "A data product activates when four pieces exist: **input ports** (where data enters), **transformation steps**, **output ports** (where consumers read, usually a Gold table), and **SLOs** (quality promises). The first three ship the number. The fourth is where trust lives.",
      "data-product-activation"
    ),
    match("Match the piece to its role.", [["Input port", "Where data enters from source systems"], ["Transformation", "Turns raw input into measures and dimensions"], ["Output port", "Where consumers read the result"], ["SLO", "Quality and governance conditions"]], "Ports in, transforms, ports out, promises. Miss the promises and you've shipped a report.", "data-product-activation"),
    fill("Without a self-service layer, four pieces become ___ of pieces.", ["hundreds", "two", "a handful", "dozens"], "hundreds", "Credentials, workflows, connectors, monitors, all from scratch. Self-service lets an engineer declare inputs, outputs, and steps in one spec.", "self-service-infrastructure"),
    tf("A green pipeline run guarantees the output data is correct.", false, "Success means the job ran. Duplicates, partial files, and stale upstream data all pass a status check.", "data-quality-dimensions"),
    mcq("Which piece is most often missing when a data product loses trust?", ["Input ports", "Transformations", "Output ports", "SLOs"], 3, "Teams build the pipeline and skip the promises. Then nobody can say what the data guarantees, so nobody trusts it.", undefined, "data-product-activation"),
    mcq("Where does a data product's output port usually read from?", ["Bronze: raw ingestion", "Silver: cleaned and joined", "Gold: business-level aggregates", "The source CRM directly"], 2, "Gold is the business-ready layer that feeds dashboards, AI, and reporting. Silver is where most transform bugs live.", undefined, "medallion-architecture"),
  ]),
  lesson("u3-l2", 3, "Six data-quality dimensions", [
    concept(
      "The vocabulary of trust",
      "**Completeness** (required values present), **uniqueness** (each event once), **timeliness** (fresh enough), **consistency** (two representations agree), **validity** (values conform to rules), **accuracy** (matches reality). Each becomes an SLO once you name a measurement, a threshold, and a check time.",
      "data-quality-dimensions"
    ),
    match("Match the problem to the dimension.", [["Closed deal with NULL closed_date", "Completeness"], ["Same transaction ingested twice", "Uniqueness"], ["CRM stage ≠ latest history row", "Consistency"], ["Latest load is 3 days old", "Timeliness"]], "Name the dimension and the SLO writes itself.", "data-quality-dimensions"),
    mcq("`stage = 'closed-won'` (with a hyphen) appears in 12 rows. Which dimension?", ["Accuracy", "Validity", "Timeliness", "Uniqueness"], 1, "Validity: the value doesn't conform to the allowed set. Accuracy would be a valid value that's wrong about the world.", undefined, "data-quality-dimensions"),
    tf("A NULL closed_date is an accuracy problem.", false, "NULL isn't inaccurate, it's absent. That's completeness.", "data-quality-dimensions"),
    fill("Uniqueness SLO: no two transactions share (deal, amount, ___).", ["date", "owner", "region", "type"], "date", "The duplicate key is the set of columns that identifies one real-world event.", "data-quality-dimensions"),
    order("Order the steps of turning a dimension into an SLO.", ["Pick the dimension (e.g. timeliness)", "Write the measurement as a query", "Set the threshold", "Decide when it's evaluated"], "Dimension → query → threshold → schedule. Skip the query and it's a wish.", "data-quality-dimensions"),
  ]),
  lesson("u3-l3", 3, "Writing an SLO that can be checked", [
    concept(
      "Measurement, threshold, time",
      "\"The pipeline runs at 02:00\" is a schedule. \"The latest successful load of deals is never more than 24 hours old at 09:00, measured from pipeline_runs\" is an SLO. The difference is a query you can run and a number you can breach.",
      "data-quality-dimensions"
    ),
    mcq("Which is a real freshness SLO?", ["\"Data is always up to date\"", "\"The job runs every day at 02:00\"", "\"Latest non-failed deals load < 24h old at 09:00, from pipeline_runs\"", "\"Raj is responsible for freshness\""], 2, "Measurement, threshold, and evaluation time. The others are a slogan, a schedule, and an org chart.", undefined, "data-quality-dimensions"),
    fill("An SLO has three parts: a measurement, a ___, and when it is evaluated.", ["threshold", "dashboard", "budget", "vendor"], "threshold", "Without a threshold there's nothing to breach, so nothing to alert on.", "data-quality-dimensions"),
    tf("\"100% of closed deals have a closed_date\" is a completeness SLO.", true, "Required field, required population, explicit threshold. It's checkable with one query.", "data-quality-dimensions"),
    mcq("A freshness check found the gold table 3 days stale over a weekend. What should have existed?", ["A bigger warehouse", "An SLO with a monitor that alerts on breach, and a time-to-recover metric for on-call", "A Monday morning meeting", "A retry button"], 1, "Three days with no alert is the failure. Time to recover is what an on-call rotation is measured on.", undefined, "data-product-activation"),
    match("Match the SLO to what it protects against.", [["Uniqueness on transactions", "Re-ingested file double-counting revenue"], ["Row-count vs trailing average", "Partial file reported as success"], ["Consistency stage vs history", "Won deals missing from bookings"], ["Freshness < 24h", "Stale numbers in the Monday deck"]], "Every planted problem in Meridian's data maps to one SLO.", "data-quality-dimensions"),
  ]),
  lesson("u3-l4", 3, "Success is not correct", [
    concept(
      "What a status column can't see",
      "Revenue jumped +189,500 overnight and fell back; every run was green. A re-ingested file (**duplicates**) passes every status check. A **partial file** (30% of rows) passes too. Volume and uniqueness checks catch what monitoring never will.",
      "data-quality-dimensions"
    ),
    mcq("Revenue tile jumps by exactly one deal's amount, then reverts next morning. First check?", ["Dashboard cache", "Duplicate transactions (same deal, amount, date)", "Dana edited the definition", "A new deal"], 1, "A jump matching a deal amount that reverts is the signature of a re-ingested file.", ["A cache doesn't invent a deal-sized number.", undefined, "Definitions don't change overnight and revert.", "A new deal wouldn't disappear."], "data-quality-dimensions"),
    fill("The duplicate idiom: `GROUP BY key HAVING COUNT(*) > ___`.", ["1", "0", "2", "n"], "1", "Any group with more than one row is a duplicate of the key. It's a one-liner that becomes a nightly SLO.", "sql-toolkit-for-data-pms"),
    tf("A run that processed 30% of the usual rows will show status = 'failed'.", false, "It succeeded on the rows it got. Only a row-count check against a trailing average flags it.", "data-quality-dimensions"),
    mcq("Which window frame gives a per-run baseline for a volume check?", ["ROWS BETWEEN 7 PRECEDING AND 1 PRECEDING", "ROWS BETWEEN CURRENT ROW AND 7 FOLLOWING", "GROUP BY run_date", "ORDER BY rows_out DESC"], 0, "The previous seven runs, excluding the current one, is the trailing average to compare against.", undefined, "sql-toolkit-for-data-pms"),
    mcq("Raj says \"the numbers are right, every run succeeded.\" The Data PM's reframe?", ["\"Then the dashboard is wrong\"", "\"Here is what the runs can't guarantee, and here are the checks that would\"", "\"Let's rebuild the pipeline\"", "\"Let's ask Dana to trust it\""], 1, "Pipeline observability (did it run?) and data quality (is it right?) are different questions. Naming the gap turns a defensive engineer into an owner of the checks.", undefined, "four-key-shifts"),
  ]),
  lesson("u3-l5", 3, "NULL and the LEFT JOIN trap", [
    concept(
      "How completeness checks return nothing",
      "`NULL = 'x'` is never true. A LEFT JOIN with a WHERE condition on the right-hand table turns into an inner join, dropping exactly the missing rows you were looking for. Put the condition in `ON`, and always write `IS NULL`, never `= NULL`.",
      "sql-toolkit-for-data-pms"
    ),
    mcq("```sql\nSELECT d.deal_id, t.transaction_id\nFROM deals d\nLEFT JOIN transactions t ON t.deal_id = d.deal_id\nWHERE d.stage = 'closed_won' AND t.type = 'initial';\n```\nWhy won't this find won deals with no transaction?", ["LEFT should be RIGHT", "The WHERE on t.type drops rows where t is NULL, making it an inner join", "It needs DISTINCT", "It errors on NULL"], 1, "Move `t.type = 'initial'` into the ON clause, or allow `t.type IS NULL`.", undefined, "sql-toolkit-for-data-pms"),
    fill("To find closed deals missing a date: `WHERE closed_date ___`.", ["IS NULL", "= NULL", "== NULL", "IS EMPTY"], "IS NULL", "NULL compares as unknown with everything, including NULL. IS NULL is the only test that works.", "sql-toolkit-for-data-pms"),
    tf("Conditions on the right-hand table of a LEFT JOIN belong in the ON clause.", true, "In ON they filter the match; in WHERE they filter the result and discard the unmatched rows.", "sql-toolkit-for-data-pms"),
    mcq("A completeness check returns zero rows on the first run. Most likely?", ["The data is perfect", "The query silently filtered out the missing rows", "The table is empty", "The SLO threshold is wrong"], 1, "Zero problems on a first audit is a red flag for the query, not a green light for the data.", undefined, "data-quality-dimensions"),
    match("Match the bug to its symptom.", [["LEFT JOIN + WHERE on right table", "Missing rows vanish from the check"], ["= NULL", "Condition is never true"], ["COUNT(*) vs COUNT(DISTINCT)", "People counted as views"], ["Integer division", "A rate of 0"]], "Four silent bugs. None throws an error; all corrupt a metric.", "sql-toolkit-for-data-pms"),
  ]),
];

// ======================= UNIT 4 · Launch =======================
const u4: Lesson[] = [
  lesson("u4-l1", 4, "Adoption is the metric", [
    concept(
      "A product nobody uses is a report",
      "Launch day is when the definitions you fought for become the definitions people decide with, or don't. Adoption isn't vanity for a data product; it's the only evidence the product exists. Measure **distinct people per week, by role**, and compare against whatever they used before.",
      "go-to-market-launch"
    ),
    mcq("Sofia asks \"Is anyone using it?\" Which number do you bring?", ["Total page views", "Weekly distinct viewers by role, next to the same for the legacy report", "Number of dashboards built", "A satisfaction survey"], 1, "Distinct people tell you who adopted; role tells you who's missing; the legacy comparison tells you whether you replaced anything.", ["Two analysts refreshing all day inflate this.", undefined, "Output, not outcome.", "Useful later; doesn't answer the question."], "go-to-market-launch"),
    tf("Raw view counts are a good adoption metric.", false, "Views measure activity. Adoption is people: COUNT(DISTINCT viewer_id).", "go-to-market-launch"),
    fill("Report adoption as distinct viewers per ___, not raw views.", ["role", "hour", "browser", "chart"], "role", "A role with zero viewers (Finance at Meridian) is next week's stakeholder conversation.", "go-to-market-launch"),
    mcq("Which Playbook week gets the *highest* share of effort?", ["Week 1 discovery", "Week 2 modeling", "Week 3 activation", "Weeks 5–6 post-launch and adoption"], 3, "Post-launch is where you learn how real users behave and where the feedback loop that drives the MVP comes from.", undefined, "proof-of-value-performance"),
    order("Order a launch week.", ["Position it in the users' language", "Make usage native (in the tools they already use)", "Measure distinct viewers by role", "Decide: train, embed, or retire the old report"], "Positioning, access, measurement, decision. The decision is the point of measuring.", "go-to-market-launch"),
  ]),
  lesson("u4-l2", 4, "Exist where the user already is", [
    concept(
      "Native accessibility",
      "Reps won't open a new dashboard because it's there. Surface the stalled-deal metric inside the **CRM record** and the manager's **1:1 view**, where the decision already happens. Work with what users work with; adapt when they bring new tools.",
      "go-to-market-launch"
    ),
    mcq("For Meridian's reps, \"exist where the user is\" most likely means…", ["A weekly PDF", "The stalled-deal metric inside the CRM record and the 1:1 view", "A mobile app", "Mandatory dashboard login"], 1, "Show up in the tool and the ritual where the decision is made. New surfaces create new adoption problems.", undefined, "go-to-market-launch"),
    tf("Sales Managers adopted first at Meridian, and reps followed once managers asked about stalled deals in 1:1s.", true, "Adoption spreads through the ritual, not the announcement.", "go-to-market-launch"),
    match("Match the launch tactic to its purpose.", [["Rich semantics in the model", "Speak the users' language"], ["Templates and samples repo", "Accessible documentation"], ["Standard downstream-update notice", "Consumers trust changes"], ["Usage metrics per asset", "Adoption booster and evidence"]], "The Playbook's launch checklist, one line each.", "go-to-market-launch"),
    fill("Use-case-specific insights to share at launch: boosting a metric, running ___ on a metric, spotting low-yield initiatives.", ["RCA", "ads", "surveys", "backups"], "RCA", "Show people how to use the metric tree for the three things they actually do with numbers.", "go-to-market-launch"),
    mcq("Finance has zero viewers three weeks in. What is that?", ["A failed launch", "A stakeholder conversation to have with Tomás next week", "A reason to email everyone", "Proof finance doesn't need data"], 1, "Adoption by role turns a vague \"nobody uses it\" into a named person and a next step.", undefined, "go-to-market-launch"),
  ]),
  lesson("u4-l3", 4, "Views vs. viewers", [
    concept(
      "One word, one bug",
      "`COUNT(*)` counts rows (views). `COUNT(DISTINCT viewer_id)` counts people (viewers). \"Active viewers\" computed with COUNT(*) is inflated by anyone who refreshes. Bucket weeks with `strftime('%Y-%W', viewed_at)`; aggregate to the grain you report.",
      "sql-toolkit-for-data-pms"
    ),
    mcq("```sql\nSELECT strftime('%Y-%W', viewed_at) AS week, COUNT(*) AS active_viewers\nFROM dashboard_views GROUP BY week;\n```\nWhat does `active_viewers` really count?", ["Distinct people per week", "Views per week; you need COUNT(DISTINCT viewer_id)", "Weeks with a view", "It errors"], 1, "Rows, not people. Someone with 20 views counts 20 times.", undefined, "sql-toolkit-for-data-pms"),
    fill("Views per viewer = COUNT(*) ÷ COUNT(DISTINCT ___).", ["viewer_id", "dashboard", "week", "role"], "viewer_id", "Both aggregates in one pass; multiply by 1.0 first if your engine does integer division.", "sql-toolkit-for-data-pms"),
    tf("`strftime('%Y-%W', ts)` gives a week bucket in SQLite.", true, "%W is the week of the year (Monday-based). substr(date,1,7) does the same for months.", "sql-toolkit-for-data-pms"),
    mcq("Two RevOps analysts refresh the dashboard all day. Which metric stays honest?", ["Total views", "Distinct viewers by role", "Views per day", "Average session length"], 1, "They count as two people in one role. Every view-based number is distorted.", undefined, "go-to-market-launch"),
    match("Match the grain to the bucket expression.", [["Month", "substr(viewed_at, 1, 7)"], ["Week", "strftime('%Y-%W', viewed_at)"], ["Day", "substr(viewed_at, 1, 10)"]], "Pick the grain your audience reads at, then aggregate before any window.", "sql-toolkit-for-data-pms"),
  ]),
  lesson("u4-l4", 4, "Retire the old report", [
    concept(
      "Two numbers for one thing is the problem you were hired to fix",
      "Three weeks after launch the legacy report still gets a trickle of views. Don't leave it (two truths), don't delete it (broken bookmarks). **Redirect** the old URL to the new product with a banner about the definition change, and talk to the remaining regulars first.",
      "go-to-market-launch"
    ),
    mcq("Legacy report still has a dozen regular viewers. What do you do?", ["Leave it", "Delete it now", "Redirect with a banner, after talking to the regulars", "Email a reminder"], 2, "The redirect meets people at their bookmark; the conversation catches any real need the new product misses.", ["Two numbers for the same thing erodes trust.", "Breaks bookmarks and goodwill.", undefined, "Emails don't change bookmarks."], "go-to-market-launch"),
    tf("Keeping the legacy report around 'for people who prefer it' is harmless.", false, "It preserves the second definition, so every future disagreement can cite it.", "go-to-market-launch"),
    fill("Retire the legacy report with a ___, not a memo.", ["redirect", "meeting", "survey", "vote"], "redirect", "A redirect changes behaviour at the moment of use; a memo asks people to remember.", "go-to-market-launch"),
    mcq("Which SQL shows whether the new dashboard replaced the old one?", ["Total views since launch", "Monthly views per dashboard with LAG for the change vs previous month", "Distinct dashboards", "Max views in a day"], 1, "Legacy fading while the new one grows, month over month, is the evidence for the redirect decision.", undefined, "sql-toolkit-for-data-pms"),
    order("Order the retirement.", ["Confirm the new product covers the regulars' needs", "Announce the definition change on the new dashboard", "Redirect the legacy URL", "Watch the legacy views go to zero"], "Check, explain, redirect, verify. Deleting first skips the two steps that keep trust.", "go-to-market-launch"),
  ]),
  lesson("u4-l5", 4, "Where a metric lives", [
    concept(
      "Bronze, Silver, Gold",
      "**Bronze** is raw ingestion, **Silver** is cleaned and joined, **Gold** is business-level aggregates that dashboards and AI read. It's the shared vocabulary with engineers for *where* a number is made, and for root cause: a broken metric is usually a Silver transform, not a Gold aggregation.",
      "medallion-architecture"
    ),
    match("Match the layer to what it holds.", [["Bronze", "Raw ingestion, as it arrived"], ["Silver", "Filtered, cleaned, joined with reference data"], ["Gold", "Business-level aggregates for reporting and AI"]], "Three hops from source to decision.", "medallion-architecture"),
    mcq("A metric is wrong because two customer records were joined on the wrong key. Which layer?", ["Bronze", "Silver", "Gold", "The dashboard"], 1, "Joins and cleaning happen in Silver. Gold just aggregates whatever Silver gives it.", undefined, "medallion-architecture"),
    tf("Dashboards should read from Bronze so they always have the latest raw data.", false, "Bronze is untyped, undeduplicated, and unjoined. Output ports read from Gold.", "medallion-architecture"),
    fill("The self-service layer lets an analytics engineer declare inputs, outputs, and transform steps in a single ___ file.", ["spec", "PDF", "Excel", "email"], "spec", "Declarative specs (often YAML) turn hundreds of plumbing pieces into one document the platform expands.", "self-service-infrastructure"),
    mcq("The OEE manufacturing case computed availability × efficiency × quality in near real time. Which layer held the aggregated OEE for dashboards?", ["Bronze", "Silver", "Gold", "Kafka"], 2, "Sensor data landed in Bronze, was cleaned and joined with ERP data in Silver, and aggregated to OEE in Gold.", undefined, "oee-manufacturing-case-study"),
  ]),
];

// ======================= UNIT 5 · Proof =======================
const u5: Lesson[] = [
  lesson("u5-l1", 5, "Is the drop real?", [
    concept(
      "Rule out the artifact first",
      "Conversion for May–June looks low. Before any theory: restrict to **resolved** deals (won + lost) on cohorts old enough to have closed. \"Won ÷ created\" always sags at the right edge because recent deals haven't had time. Only then slice.",
      "funnel-conversion-analysis"
    ),
    mcq("Conversion for recent cohorts looks low. First thing to rule out?", ["The price increase", "The open-deal artifact: recent cohorts haven't had time to close", "Dana reading the chart wrong", "Reps lying in the CRM"], 1, "Confirm the number is real before assigning a cause. Filter to resolved deals and mature cohorts.", ["A hypothesis to test, not an artifact to exclude.", undefined, "Check the data before the reader.", "A specific hypothesis, not the first artifact."], "funnel-conversion-analysis"),
    fill("Compute conversion on ___ deals only: won ÷ (won + lost).", ["resolved", "all", "open", "enterprise"], "resolved", "Open deals have neither converted nor failed. Including them turns a rate into a countdown.", "funnel-conversion-analysis"),
    tf("If the drop survives the resolved-deals filter, it's real enough to investigate.", true, "That's step one of root cause: prove the number, then walk down the tree.", "funnel-conversion-analysis"),
    mcq("Which cohort filter is right for a drop in May–June, as of end of August?", ["created_date <= '2026-06-30'", "created_date >= '2026-08-01'", "closed_date IS NULL", "No filter"], 0, "Cohorts through June have had two months to resolve. July and August haven't, so they'd contaminate the picture.", undefined, "funnel-conversion-analysis"),
    order("Order the root-cause walk.", ["Confirm the drop on resolved, mature cohorts", "Slice by one dimension at a time", "Zoom into the affected cell: stage and velocity", "Size it and propose a fix with an owner"], "Confirm → slice → zoom → size. Arguing at the top of the tree skips all four.", "funnel-conversion-analysis"),
  ]),
  lesson("u5-l2", 5, "Walk down the tree", [
    concept(
      "A cause that touches everything can't explain one cell",
      "Slice the drop by region × source. If AMER × Outbound collapses and every other cell is flat, a **price increase** (which hits every region and source) is refuted in one query. Lena's **vendor change for AMER outbound leads** predicts exactly that cell.",
      "funnel-conversion-analysis"
    ),
    mcq("The drop is almost entirely AMER × Outbound; other cells are flat. Dana's price-increase theory is…", ["Supported, AMER is biggest", "Mostly refuted: a price increase would depress every segment", "Untestable without pricing data", "Confirmed, outbound is price-sensitive"], 1, "A universal cause can't produce a local effect. The tree kills theories cheaply.", ["Size doesn't matter; pattern does.", undefined, "The shape of the change is already strong evidence.", "That's inventing a mechanism to save a theory."], "funnel-conversion-analysis"),
    fill("Slice by ___ dimension at a time, then zoom into the cell that moved.", ["one", "every", "the largest", "a random"], "one", "One dimension per cut keeps the comparison readable and the cause attributable.", "funnel-conversion-analysis"),
    tf("Raj's stale-stage theory could explain a whole-segment collapse.", false, "It explained a handful of deals. A dozen missing stage updates can't move a segment's rate from 0.58 to 0.07.", "funnel-conversion-analysis"),
    match("Match the theory to the evidence that tests it.", [["Price increase", "Every segment should drop"], ["Vendor lead quality", "Only AMER × Outbound drops"], ["Stale CRM stages", "Only a few deals disagree with history"], ["Count vs value definition", "Both definitions show the same shape"]], "Each theory makes a prediction. Write the prediction down, then run the query.", "funnel-conversion-analysis"),
    mcq("Which SQL shape produces the before/during comparison for every region × source cell?", ["Two separate queries per region", "Conditional aggregation: SUM(period='before' AND won) / SUM(period='before'), same for during, GROUP BY region, source", "A cross join", "A window over deal_id"], 1, "One query, nine cells, two periods. Conditional aggregation is the tool for side-by-side rates.", undefined, "sql-toolkit-for-data-pms"),
  ]),
  lesson("u5-l3", 5, "Where in the funnel", [
    concept(
      "Late losses point at lead quality",
      "In the affected segment, deals still reach negotiation at the normal rate but spend twice as long there and then close lost. Losses **late** in the funnel with longer negotiation usually mean the leads looked qualified but weren't. Losses **early** mean targeting.",
      "funnel-conversion-analysis"
    ),
    mcq("Deals reach negotiation normally, stall twice as long, then close lost. Best explanation?", ["Reps not updating stages", "Lead quality dropped: qualified on paper, fail at the table", "A pipeline failure dropping won deals", "The CFO's definition"], 1, "A top-of-funnel quality problem shows up late as long negotiation and losses. It matches the vendor-change hypothesis.", ["Staleness looks like stuck deals with no later row, not eventual losses.", undefined, "That would cut won counts without lengthening negotiation.", "Definitions don't change stage velocity."], "funnel-conversion-analysis"),
    tf("A stage whose duration doubles is a stronger RCA signal than a rate that wobbles.", true, "Velocity changes are hard to produce by noise; rates on small cells wobble constantly.", "funnel-conversion-analysis"),
    fill("Late-funnel losses with longer negotiation usually mean ___ quality.", ["lead", "data", "code", "pricing"], "lead", "They got to the table and couldn't close: the qualification was wrong, not the sales motion.", "funnel-conversion-analysis"),
    mcq("Which query compares negotiation time before vs during for one segment?", ["GROUP BY owner", "LEAD-based days-in-stage CTE, joined to a segment CTE with a period label, AVG(days) GROUP BY period", "COUNT(*) per stage", "A running total"], 1, "Three CTEs, each named for what it produces: history steps, the segment with periods, then the average per period.", undefined, "sql-toolkit-for-data-pms"),
    match("Match the funnel position of the loss to the likely cause.", [["Early (prospecting → qualified)", "Targeting / wrong ICP"], ["Middle (proposal)", "Offer or pricing fit"], ["Late (negotiation, long)", "Lead quality or decision-maker access"]], "Where deals die tells you what to fix.", "funnel-conversion-analysis"),
  ]),
  lesson("u5-l4", 5, "LAG and LEAD", [
    concept(
      "Looking at the neighbouring row",
      "`LAG(x) OVER (ORDER BY …)` reads the previous row, `LEAD(x)` the next. Partition by the entity (deal, dashboard) so you never look across entities. First and last rows get NULL: expected, and sometimes the thing you're looking for.",
      "sql-toolkit-for-data-pms"
    ),
    fill("Change vs previous month = views − ___(views) OVER (PARTITION BY dashboard ORDER BY month).", ["LAG", "LEAD", "SUM", "MAX"], "LAG", "LAG looks back one row within the dashboard's ordered months.", "sql-toolkit-for-data-pms"),
    mcq("Why partition by deal_id when computing time between stages?", ["For performance", "So LEAD never reads another deal's row", "SQLite requires it", "To sort the output"], 1, "Without the partition, the last row of one deal would look at the first row of the next deal and produce a nonsense gap.", undefined, "sql-toolkit-for-data-pms"),
    tf("LEAD returns 0 for the last row in a partition.", false, "It returns NULL (or the default you pass). Filter it out for terminal stages, or COALESCE with the as-of date for open deals.", "sql-toolkit-for-data-pms"),
    match("Match the function to its direction.", [["LAG", "Previous row"], ["LEAD", "Next row"], ["ROW_NUMBER", "Position within the partition"], ["SUM OVER ORDER BY", "Cumulative so far"]], "Four window verbs. Everything else is a variation.", "sql-toolkit-for-data-pms"),
    mcq("The first month of each dashboard shows NULL for change_vs_prev. Is that a bug?", ["Yes, use 0", "No, there is no previous month; NULL is honest", "Yes, drop the row", "Yes, use the average"], 1, "NULL says \"no comparison exists.\" Replacing it with 0 would claim the dashboard had zero growth in its first month.", undefined, "sql-toolkit-for-data-pms"),
  ]),
  lesson("u5-l5", 5, "Bring a cause, a size, and a fix", [
    concept(
      "RCA ends with a claim",
      "Root-cause work is done when someone can act: a **cause**, its **size** (deals and dollars), the **evidence that rules out alternatives**, and a **fix with an owner**. A chart and four theories is where you started.",
      "proof-of-value-performance"
    ),
    mcq("You've localized the drop. What goes to exec staff?", ["The chart, let them debate", "Cause, size in deals and dollars, evidence ruling out alternatives, proposed fix with an owner", "Fire the vendor", "Ask for more data"], 1, "Sizing lets Sofia weigh the fix; ruling out alternatives is what earns trust; an owner makes it happen.", ["Back to four theories.", undefined, "Too far, too fast. Propose reverting the scoring model; let Lena decide on the vendor.", "Evidence is concentrated and alternatives refuted. Delay costs money."], "proof-of-value-performance"),
    order("Order the RCA deliverable.", ["The cause, in one sentence", "How big it is (deals, dollars)", "What it is not (alternatives ruled out)", "The fix, its owner, and when"], "Claim, size, evidence, action. Executives read in that order.", "proof-of-value-performance"),
    fill("Size the problem in deals and ___.", ["dollars", "rows", "queries", "meetings"], "dollars", "Lost value by rep for the segment and period is the slide's one number.", "proof-of-value-performance"),
    tf("Recommending \"fire the vendor\" is the right conclusion of the AMER × Outbound analysis.", false, "The evidence supports reverting the scoring model and re-qualifying open deals. The vendor decision belongs to Lena, with more data.", "proof-of-value-performance"),
    mcq("What turns a proof of value into a lasting product after week 5?", ["A bigger dashboard", "Feedback loops that connect outcomes to activity, plus evolving SLOs and use cases", "More pipelines", "A press release"], 1, "The Playbook's post-launch stage: continuous feedback, usage metrics, SLO evolution, use-case expansion.", undefined, "proof-of-value-performance"),
  ]),
];

// ======================= UNIT 6 · Beyond =======================
const u6: Lesson[] = [
  lesson("u6-l1", 6, "Bookings vs. revenue", [
    concept(
      "Neither number is wrong",
      "Board deck: 7.77M (sum of **transactions**: cash, incl. renewals and upsells). Sales deck: 6.84M (sum of **closed_won amounts**: bookings). They diverge where the business is healthy. Give both a name and an owner, and show the **bridge** between them.",
      "ontology-as-infrastructure"
    ),
    mcq("Tomás asks which revenue number is right. Your answer?", ["Transactions, cash is truth", "Neither is wrong: two metrics (bookings vs revenue); name both, show the bridge, put both on the slide", "Average them", "The higher one"], 1, "The same word meant two things. The deliverable is names, owners, and a reconciliation, not a winner.", ["Cash is one truth; bookings is the truth Sales is managed on.", undefined, "Nobody can reproduce an average of two definitions.", "That's how trust is lost with a CFO."], "ontology-as-infrastructure"),
    match("Match the bucket to its role in the bridge.", [["initial transactions", "Should reconcile to bookings"], ["renewals + upsells", "The healthy part of the gap"], ["duplicates", "The part you remove"]], "Every dollar of the difference gets a name.", "ontology-as-infrastructure"),
    fill("Bookings come from deals; revenue comes from ___.", ["transactions", "accounts", "dashboards", "pipeline_runs"], "transactions", "Different tables, different owners (Sales vs Finance), different meanings.", "metric-types"),
    tf("A UNION of months from both sides, then LEFT JOIN each side, compares two metrics that should agree without losing months present in only one.", true, "That's the reconciliation pattern: build the key set first, then attach both sides with COALESCE.", "sql-toolkit-for-data-pms"),
    mcq("Which name pair would you put on the board slide?", ["revenue and revenue", "bookings_value (Sales, from deals) and revenue_generated (Finance, from transactions)", "sales and money", "gross and net"], 1, "Two names, two owners, two tables. The bridge explains the difference line by line.", undefined, "ontology-as-infrastructure"),
  ]),
  lesson("u6-l2", 6, "Ontology as infrastructure", [
    concept(
      "Humans resolved ambiguity silently; agents can't",
      "For years, every system kept its own definition of *customer* or *revenue* and people reconciled in conversation. An AI agent takes the first definition it finds and acts on it. A written **ontology** (what a word means, how concepts relate, who owns them) is now operational infrastructure, not documentation.",
      "ontology-as-infrastructure"
    ),
    mcq("Why did enterprises manage without formal ontologies for so long?", ["Data was small", "Humans silently resolved the ambiguity in every conversation", "Regulators didn't require them", "They had them, just unwritten"], 1, "Meaning lived in silos and in people's heads. Autonomous agents remove the human who used to reconcile.", undefined, "ontology-as-infrastructure"),
    tf("In the Q2 2026 survey, leaders ranked a semantic layer with standard definitions above AI tooling itself as the top enabler of AI.", true, "80% put the semantic layer first. Definitions before models.", "ontology-as-infrastructure"),
    fill("A data product is built once and ___ consume it forever.", ["agents", "auditors", "vendors", "interns"], "agents", "Instead of rebuilding context from scratch on every query, an agent reads the data product's contract.", "ontology-as-infrastructure"),
    match("Match the ambiguity to the question an ontology answers.", [["\"revenue\"", "GAAP-recognized or bookings?"], ["\"customer\"", "CRM record or billing record?"], ["\"approved\"", "By whom, in which system?"]], "Every one of these is a decision a human used to make without noticing.", "ontology-as-infrastructure"),
    mcq("What's the sharpest question for a data leader in 2026?", ["Are we using AI?", "What does our AI think our business means, and is that what we actually mean?", "How many agents do we have?", "Which model is cheapest?"], 1, "Usage is easy. Meaning is the gap between agents that run and agents that are right.", undefined, "ontology-as-infrastructure"),
  ]),
  lesson("u6-l3", 6, "Observability is not evaluation", [
    concept(
      "It ran vs. it was right",
      "Most teams running agents have **monitoring** (latency, tokens, error rate). About half have **evaluation** (known questions, agreed answers, run before and after every change). Monitoring tells you the agent ran. Only evaluation tells you it reasoned correctly.",
      "agent-observability-gap"
    ),
    mcq("The agent team has full observability and wants to answer executives' revenue questions. What do you ask for first?", ["A faster model", "An evaluation set from the semantic contract, run on every change", "More dashboards", "Block the agent"], 1, "Without evals you're watching failure at machine speed. With them, the ontology becomes testable.", ["Speed isn't the risk.", undefined, "Dashboards report what happened; they don't judge correctness.", "Unnecessary once it's gated by definitions and evals."], "agent-observability-gap"),
    tf("Normal software tests (same input → same output) work fine for agents.", false, "Agents are non-deterministic: many valid paths to a task, and a plausible output can come from broken reasoning.", "agent-observability-gap"),
    match("Match the primitive to what it catches.", [["Trace IDs end to end", "Where a multi-step thread went wrong"], ["Per-tool-call token budgets", "Runaway cost in one step"], ["Semantic assertion layer", "Wrong answers before they reach a user"]], "The three observability primitives most production teams are missing.", "agent-observability-gap"),
    fill("Monitoring says it ran; ___ says it was right.", ["evaluation", "logging", "caching", "scaling"], "evaluation", "Build the eval set from the same definitions people use, so agent and human are graded on one standard.", "agent-observability-gap"),
    mcq("Where does the effort belong, according to the 2026 reckoning?", ["More dashboards after the fact", "Upstream: semantic infrastructure, data contracts, and governance that define correct reasoning before the agent runs", "Bigger models", "Fewer agents"], 1, "Define correct before you run, not after. Dashboards can only report what already happened.", undefined, "agent-observability-gap"),
  ]),
  lesson("u6-l4", 6, "Lean AI", [
    concept(
      "Match effort to difficulty",
      "Per-token pricing is fine at demo scale and terrible at real scale. Small task-specific models can be ~100× cheaper per conversation. Mature teams **route by difficulty**: narrow models for the high-volume well-defined slice, frontier models only for the hard fraction. Report **cost per correct answer**.",
      "lean-ai-cost-economics"
    ),
    mcq("Finance asks why the agent pilot's bill is so high. The Lean AI move?", ["Smallest model for everything", "Route by difficulty; report cost per correct answer", "Cap questions per user", "Cache answers"], 1, "Cost-per-outcome is what a board reads. Model choice becomes a product-tiering decision.", ["Quality collapses on hard questions.", undefined, "Rationing doesn't fix cost per answer.", "Helps repeats, not new questions."], "lean-ai-cost-economics"),
    tf("\"Small model\" still means a quality compromise in 2026.", false, "Capability decoupled from size. For well-defined tasks, small models match quality at a fraction of the cost.", "lean-ai-cost-economics"),
    fill("The Toyota parallel: produce more value with fewer ___, without sacrificing quality.", ["resources", "people", "models", "meetings"], "resources", "Lean AI is the Toyota Production System applied to models: remove waste, keep quality.", "lean-ai-cost-economics"),
    match("Match the workload to the model tier.", [["Classify 1M support tickets", "Narrow / small model"], ["Draft a board memo from messy notes", "Frontier model"], ["Answer 'what is our revenue?' from the contract", "Narrow model + semantic layer"]], "Big AI isn't wrong; defaulting to it for tasks that don't need it is the waste.", "lean-ai-cost-economics"),
    mcq("Which metric should the pilot report monthly?", ["Tokens used", "Cost per correct answer, by tier", "Number of prompts", "Model version"], 1, "Ties spend to outcomes and makes routing decisions visible.", undefined, "lean-ai-cost-economics"),
  ]),
  lesson("u6-l5", 6, "Grain first, window second", [
    concept(
      "Running totals done right",
      "Decide what one row means (a month), aggregate to that grain in a CTE, *then* apply the window: `SUM(revenue) OVER (ORDER BY month)`. Skip the CTE and the running total steps up on every transaction row. The capstone: North Star, functional, and granular in one query, one definition each.",
      "sql-toolkit-for-data-pms"
    ),
    mcq("```sql\nSELECT month, SUM(revenue) OVER (ORDER BY month) AS running_total\nFROM (SELECT substr(transaction_date,1,7) AS month, SUM(amount) AS revenue\n      FROM transactions GROUP BY month);\n```\nWhy aggregate in the subquery first?", ["Windows can't run on raw tables", "So there is one row per month; otherwise the total steps up per transaction", "SUM OVER requires GROUP BY", "Performance only"], 1, "Grain first, window second. The result would be different, not just slower.", undefined, "sql-toolkit-for-data-pms"),
    fill("Aggregate to the reporting ___ before applying a window.", ["grain", "index", "colour", "region"], "grain", "One row per month, then cumulate. One row per transaction, then cumulate, is a different (wrong) chart.", "sql-toolkit-for-data-pms"),
    tf("A running total over raw transaction rows and one over monthly totals end at the same final number.", true, "The last value matches; every intermediate point differs. That's why the chart lies while the total looks fine.", "sql-toolkit-for-data-pms"),
    order("Order the capstone query.", ["CTE rev: revenue by transaction month", "CTE closed: won value and conversion by closed month", "Join on month, COALESCE missing revenue", "Filter to the last three months, order by month"], "Two grains, one join key, one result: the whole metric tree.", "metric-types"),
    mcq("Six weeks in, what did Meridian actually get?", ["Every metric in the company defined", "One domain moved from Reactive to Purpose-driven: one metric tree people decide with", "A new warehouse", "A hiring plan"], 1, "That's what a proof of value is. Scale comes from repeating the template, not from boiling the ocean.", undefined, "data-product-maturity-stages"),
  ]),
];

const UNIT_COLORS: Record<ChapterNumber, string> = {
  1: "#4f46e5",
  2: "#0891b2",
  3: "#d97706",
  4: "#16a34a",
  5: "#dc2626",
  6: "#7c3aed",
};

const lessonsByUnit: Record<ChapterNumber, Lesson[]> = { 1: u1, 2: u2, 3: u3, 4: u4, 5: u5, 6: u6 };

export const units: Unit[] = chapters.map((c) => ({
  number: c.number,
  title: c.title,
  week: c.week,
  tagline: c.tagline,
  color: UNIT_COLORS[c.number],
  lessons: lessonsByUnit[c.number],
}));

export const allLessons: Lesson[] = units.flatMap((u) => u.lessons);

const byId = new Map(allLessons.map((l) => [l.id, l]));
export function getLesson(id: string): Lesson | undefined {
  return byId.get(id);
}
export function lessonsForUnit(n: ChapterNumber): Lesson[] {
  return lessonsByUnit[n];
}
