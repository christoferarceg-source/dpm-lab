import type { Chapter, Character } from "@/lib/types";

// The storyline: your first six weeks as Meridian's first Data Product
// Manager. Each chapter is one week of the 6-Week Data Products Playbook,
// told through the people who need something from you.

export const COMPANY = {
  name: "Meridian",
  blurb:
    "A 300-person B2B software company selling field-operations software to mid-size and enterprise customers. Sales runs on a CRM, finance runs on invoices, and until now nobody has owned the data in between.",
  asOf: "31 Aug 2026",
};

export const CAST: Character[] = [
  {
    name: "Sofia Marin",
    role: "CEO, your sponsor",
    agenda: "Wants proof within six weeks that a Data PM is worth the headcount. Cares about one thing: decisions getting made faster, on numbers people trust.",
  },
  {
    name: "Dana Whitfield",
    role: "VP Sales",
    agenda: "Has stopped opening the legacy Pipeline Report. Wants a 'Sales Funnel Accelerator' that tells her where deals are stuck and why. Distrusts any conversion rate above 50%.",
  },
  {
    name: "Raj Patel",
    role: "Analytics Engineer",
    agenda: "Owns the three pipelines (crm_deals_ingest, transactions_ingest, gold_sales_metrics). Every run is green. Tired of being told the numbers are wrong without anyone saying which number.",
  },
  {
    name: "Lena Fischer",
    role: "RevOps Lead",
    agenda: "Owns CRM hygiene. Knows reps update deal stages late and sometimes not at all. Brought in a new outbound lead-scoring vendor in May.",
  },
  {
    name: "Tomás Reyes",
    role: "CFO",
    agenda: "Needs a revenue number for the board that matches what finance recognizes, not what sales booked. Asks what 'revenue' means every time someone says it.",
  },
];

export const chapters: Chapter[] = [
  {
    number: 1,
    slug: "bullseye",
    title: "Nobody trusts the number",
    week: "Week 1 · The Bullseye",
    tagline: "Find the real problem before you touch a query.",
    brief: `**Monday, 9:05.** Your laptop is still provisioning when Dana Whitfield walks into the room without knocking.

> "The dashboard says our conversion rate is **61%**. It is not 61%. My reps would be swimming in commission. Can you make it right by Friday?"

Ten minutes later Raj Patel messages you: *"Heads up, Dana thinks the numbers are wrong. All three pipelines have been green for months. Happy to walk you through them."* Lena Fischer from RevOps adds you to a channel called **#crm-hygiene** with no explanation.

This is the moment the Four Key Shifts become real. A general PM would ship a fix. A Data PM asks: *which* number, defined *how*, trusted by *whom*, used for *what decision*?

**Your job this week is discovery, not SQL.** Meet the people, map how they use data today, and pin down the North Star, functional, and granular metrics for a Sales domain. The warm-up exercises let you touch the data so you know what exists, but the real deliverable is a problem statement Dana and Sofia both sign.`,
    readings: [
      "what-is-a-data-product-manager",
      "four-key-shifts",
      "bullseye-data-product-market-fit",
      "metric-types",
      "data-product-maturity-stages",
    ],
    debrief: `**What a good Week 1 looked like.**

- You did *not* fix the dashboard. You found out that "61%" was won ÷ closed, that Dana's mental model was won ÷ created, and that the two definitions differ by 15 points on the same data. Neither was "wrong."
- You wrote a problem statement in Dana's words: *"I can't see where deals stall or which segment is dragging conversion."* Sofia agreed that is the proof-of-value target.
- You picked the metric tree: North Star **revenue_generated**, functional **deals_closed_value**, granular **conversion_rate** and **days_in_stage**.
- You noticed Meridian is in the *Reactive* stage: Raj builds what he's asked; nobody owns definitions.

Next week you turn those definitions into a model everyone can point at.`,
  },
  {
    number: 2,
    slug: "canvas",
    title: "Define it before you compute it",
    week: "Week 2 · The Canvas",
    tagline: "Build the metric tree and the logical model behind it.",
    brief: `**Tuesday, 14:30, a whiteboard.** Three people, three conversion rates.

- **Dana:** won ÷ (won + lost). "Open deals haven't converted or failed yet."
- **Lena:** won ÷ created. "That's what the CRM report has always shown."
- **Tomás:** won *amount* ÷ closed *amount*. "I don't care how many deals. I care how many dollars."

All three are legitimate. All three will produce a different chart. The Data PM's job is not to pick the winner in the meeting; it is to put every definition on the **Metric Dependency Tree** with a name, a formula, and an owner, so the fight happens once instead of every month.

Raj shows you something else: deal stages are *overwritten* in the CRM, but there is an append-only **deal_stage_history** log. That changes what you can measure. Stage-to-stage conversion, time in stage, funnel drop-off: none of it exists on the \`deals\` table alone.

**This week:** draft the logical model (entities, dimensions, measures, relationships, SLOs) and compute the funnel from the history log. The SQL gets real: CTEs, self-joins on the history, and your first window function.`,
    readings: ["canvas-data-product-design", "metric-types", "funnel-conversion-analysis", "sql-toolkit-for-data-pms"],
    debrief: `**What a good Week 2 looked like.**

- The MDT now has *three* conversion definitions, each named: \`conversion_rate_closed\` (Dana), \`conversion_rate_created\` (Lena), \`conversion_rate_value\` (Tomás). The dashboard will show Dana's by default and label it.
- You modeled the funnel from **deal_stage_history**, not from the current stage. Overwritten fields destroy history; append-only logs preserve it. This is the single most important modeling lesson in the chapter.
- You learned that a stage-to-stage rate (proposal → negotiation) and an overall rate (created → won) answer different questions, and that time-in-stage is where deals actually stall.
- SLOs made it onto the model for the first time: freshness of \`deals\` (< 24h), uniqueness of \`transaction_id\`, and completeness of \`closed_date\` for closed deals.

Next week you find out whether the data actually meets those SLOs. Spoiler: it does not.`,
  },
  {
    number: 3,
    slug: "activation",
    title: "The pipeline says success",
    week: "Week 3 · Activation",
    tagline: "Green runs, wrong numbers. Audit the data, not the dashboard.",
    brief: `**Wednesday, 07:50.** Sofia forwards you a screenshot. The revenue tile on the new prototype jumped **+189,500** overnight, then dropped back the next morning.

Raj is defensive and has a point: every run of \`gold_sales_metrics\` succeeded. Then you look at the run log and find three straight days in June where it didn't, and one morning in July where \`crm_deals_ingest\` processed **30%** of the usual rows and still reported success.

Lena, quietly: *"Reps close deals in the CRM days after the contract is signed. Sometimes they never move the stage at all."*

This is Activation week: input ports, transforms, output ports, and **SLOs**. The first three exist. The fourth is where trust lives. Nobody is going to audit this data for you.

**This week:** write the data-quality checks a Data PM would insist on before launch. Duplicates, stale stages, missing dates, freshness, failed-run streaks, and row-count anomalies. Window functions do the heavy lifting.`,
    readings: ["data-product-activation", "data-quality-dimensions", "medallion-architecture", "self-service-infrastructure"],
    debrief: `**What a good Week 3 looked like.**

- You found **five duplicate transactions** (a re-ingested file) which explains the +189,500 jump. Uniqueness check added to the pipeline; Raj now owns it.
- You found **four deals** whose CRM stage still said \`negotiation\` while the history log said \`closed_won\`. The source of truth for stage is now the history log, and \`deals.stage\` is derived from it.
- You found closed deals with no \`closed_date\`, a three-day failed streak with no alert, and a partial-file day that passed as "success." Each became an SLO with a monitor.
- Raj went from "the numbers are right" to "here is what the numbers can't guarantee." That is the team dynamic shift: *how do we validate?*

Next week you ship, and adoption becomes the metric.`,
  },
  {
    number: 4,
    slug: "launch",
    title: "Ship it where they already are",
    week: "Week 4 · Launch",
    tagline: "A data product with no adoption plan is a report.",
    brief: `**Monday, 1 June.** The Sales Funnel Accelerator goes live. It has three metrics, labeled definitions, and a "why did this change" panel. Dana presents it at the sales all-hands.

By Thursday, half of the reps are still opening the legacy Pipeline Report because it is bookmarked in their browser. Finance never opens either. Sofia asks the question you knew was coming: *"Is anyone using it?"*

Adoption is not a vanity metric for a data product; it is the *only* evidence that the definitions you fought for are now the definitions people decide with. If usage stays flat, you built a report.

**This week:** measure adoption properly (weekly active viewers, by role, versus the legacy dashboard), then use those numbers to decide where to spend your week: training, embedding the numbers in the CRM, or retiring the old report.`,
    readings: ["go-to-market-launch", "proof-of-value-performance"],
    debrief: `**What a good Week 4 looked like.**

- Weekly active viewers roughly doubled every two weeks after launch while the legacy report faded. You retired the legacy report on 1 July with a redirect, not a memo.
- Sales Managers adopted first, Sales Reps followed once a manager started asking about *their* stalled deals in 1:1s. Finance still had zero views: that became next week's stakeholder conversation with Tomás.
- You reported adoption as **distinct viewers per role**, not raw views. Raw views were inflated by two RevOps analysts refreshing all day.

Next week the number moves in the wrong direction and everyone has a theory.`,
  },
  {
    number: 5,
    slug: "proof",
    title: "Conversion fell and everyone has a theory",
    week: "Week 5 · Proof",
    tagline: "Walk down the metric tree. Don't argue at the top of it.",
    brief: `**Tuesday, 08:15, exec staff.** Sofia puts the chart up. Conversion rate for deals created in **May and June** is well below the first four months of the year.

- **Dana:** "It's the price increase in May. I said so."
- **Lena:** "It's the new outbound lead-scoring vendor. The leads are garbage."
- **Raj:** "Are we sure it isn't the stale-stage problem from week 3?"
- **Tomás:** "Is this deal count or deal value?"

Four hypotheses, one number. This is what the Metric Dependency Tree is for. A drop at the top has to show up somewhere at the bottom: a segment, a stage, a rep, a source. Root-cause analysis is walking *down* the tree with a query at each level until one branch explains most of the move.

**This week:** confirm the drop is real (and not an artifact of open deals), then slice it by region × source, by stage velocity, and by rep. Bring the exec team a cause, a size, and a fix, not a theory.`,
    readings: ["proof-of-value-performance", "funnel-conversion-analysis", "oee-manufacturing-case-study"],
    debrief: `**What a good Week 5 looked like.**

- The drop was real for *resolved* deals; once you excluded open deals created in July and August, the story was clean.
- It was concentrated in **AMER × Outbound**. Every other segment was flat. That killed the price-increase theory in one query (a price increase hits every region and source).
- Time in *negotiation* for that segment roughly doubled: the leads were reaching negotiation but not closing. Lena's vendor theory held; Raj's stale-stage theory explained only a handful of deals.
- You sized it (a specific number of deals and dollars) and proposed the fix (revert the vendor's scoring model for AMER, re-qualify the open May–June outbound deals). Sofia approved it in the meeting.

One week left, and the CFO wants a revenue number for the board.`,
  },
  {
    number: 6,
    slug: "beyond",
    title: "One number, three meanings",
    week: "Week 6 · Beyond",
    tagline: "Reconcile revenue, then make the definitions machine-readable.",
    brief: `**Thursday, 16:00.** Tomás sends a one-line email: *"Board deck says revenue 7.77M. Sales deck says 6.84M. Which one do I put on the slide?"*

Neither is wrong. One is the sum of **transactions** (cash movements, including renewals and upsells). The other is the sum of **closed_won deal amounts** (bookings). They diverge exactly where a business is healthy: existing customers paying more. But if nobody writes that down, an AI agent someone is piloting for "revenue questions" will pick whichever definition it finds first.

That is the ontology gap, and it is your last deliverable: a reconciliation that explains every dollar of the difference, a running revenue total by month, and one capstone query that computes the whole metric tree from a single set of definitions.

**This week:** reconcile, then write it down in a form both people and agents can consume. You are no longer fixing a dashboard. You are defining what Meridian means when it says a word.`,
    readings: ["ontology-as-infrastructure", "agent-observability-gap", "lean-ai-cost-economics"],
    debrief: `**What a good Week 6 looked like.**

- Revenue got two names with owners: \`bookings_value\` (Sales, from deals) and \`revenue_generated\` (Finance, from transactions). The board slide shows both and the bridge between them: renewals, upsells, and the duplicate rows you removed in week 3.
- The running-total query became the first "gold" metric with a written definition, a test, and an SLO. Every future metric follows the same template.
- You handed the definitions to the agent pilot as a semantic contract, and asked for an evaluation set before it answers a single executive. Observability tells you it ran; evaluation tells you it was right.

**Six weeks in.** Meridian moved from *Reactive* to *Purpose-driven* on one domain. That is what a proof of value is: not every metric, one metric tree that people decide with.`,
  },
];

export function getChapter(n: number): Chapter | undefined {
  return chapters.find((c) => c.number === n);
}
