(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,2153,e=>{"use strict";var t=e.i(18050),a=e.i(22016),s=e.i(44336),n=e.i(87110),o=e.i(6e4),r=e.i(79922),i=e.i(74581),l=e.i(7664);function d({label:e,value:a,sub:s}){return(0,t.jsxs)("div",{className:"bg-surface border border-border rounded-xl p-4",children:[(0,t.jsx)("p",{className:"text-xs uppercase tracking-wide text-muted",children:e}),(0,t.jsx)("p",{className:"text-2xl font-semibold mt-1 tabular-nums",children:a}),s&&(0,t.jsx)("p",{className:"text-xs text-muted mt-0.5",children:s})]})}e.s(["default",0,function(){let{data:e,hydrated:c,reset:u}=(0,i.useProgress)(),h=(0,l.computeXp)(e),m=(0,l.levelFor)(h.total),g=(0,r.totals)(e),f=(0,r.allUnitProgress)(e),p=c?(0,i.dueCards)(e,s.flashcards).length:0,y=Object.values(e.lessons).filter(e=>e.perfect).length;return(0,t.jsxs)("div",{className:"space-y-6 max-w-2xl",children:[(0,t.jsxs)("div",{className:"bg-surface border border-border rounded-2xl p-5 flex items-center gap-4",children:[(0,t.jsx)("div",{className:"w-16 h-16 rounded-full bg-accent text-accent-fg flex items-center justify-center text-2xl font-semibold shrink-0 tabular-nums",children:c?m.level:"–"}),(0,t.jsxs)("div",{className:"min-w-0 flex-1",children:[(0,t.jsxs)("p",{className:"text-xs uppercase tracking-wide text-muted",children:["Level ",c?m.level:""]}),(0,t.jsx)("p",{className:"text-lg font-semibold",children:c?(0,l.levelTitle)(m.level):"…"}),(0,t.jsx)("div",{className:"mt-2 h-2 rounded-full bg-border overflow-hidden",children:(0,t.jsx)("div",{className:"h-full bg-accent transition-all",style:{width:`${c?Math.round(100*m.fraction):0}%`}})}),(0,t.jsx)("p",{className:"text-xs text-muted mt-1 tabular-nums",children:c?`${h.total} XP \xb7 ${m.toNext} to level ${m.level+1}`:""})]})]}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-3",children:[(0,t.jsx)(d,{label:"Lessons",value:c?`${g.lessonsDone}/${g.lessonsTotal}`:"–",sub:c?`${y} perfect`:void 0}),(0,t.jsx)(d,{label:"Labs solved",value:c?`${g.labsDone}/${g.labsTotal}`:"–",sub:"SQL and Python exercises"}),(0,t.jsx)(d,{label:"Streak",value:c?`${e.streak.current}d`:"–",sub:"consecutive active days"}),(0,t.jsx)(d,{label:"Review",value:c?`${p}`:"–",sub:`cards due of ${s.flashcards.length}`})]}),(0,t.jsxs)("section",{className:"bg-surface border border-border rounded-xl p-4",children:[(0,t.jsx)("p",{className:"text-xs uppercase tracking-wide text-muted mb-3",children:"Units"}),(0,t.jsx)("ul",{className:"space-y-2",children:o.units.map((e,a)=>(0,t.jsxs)("li",{className:"flex items-center gap-3 text-sm",children:[(0,t.jsx)("span",{className:"w-2.5 h-2.5 rounded-full shrink-0",style:{background:e.color}}),(0,t.jsxs)("span",{className:"flex-1 min-w-0 truncate",children:[e.week," · ",e.title]}),(0,t.jsx)("span",{className:"text-muted tabular-nums",children:c?`${f[a].lessonsDone}/${f[a].lessonsTotal}`:""})]},e.number))})]}),(0,t.jsxs)("section",{className:"text-sm text-muted space-y-1",children:[(0,t.jsx)("p",{className:"font-semibold text-fg",children:"How XP works"}),(0,t.jsxs)("p",{children:[l.XP_LESSON," XP per lesson, +",l.XP_PERFECT_BONUS," for a perfect run, ",l.XP_LAB_EXERCISE," XP per Lab exercise solved. 100 XP per level."]})]}),(0,t.jsxs)("section",{className:"grid gap-3 sm:grid-cols-2",children:[(0,t.jsxs)(a.default,{href:"/kb",className:"bg-surface border border-border rounded-xl p-4 hover:border-accent",children:[(0,t.jsx)("p",{className:"font-semibold",children:"Library"}),(0,t.jsxs)("p",{className:"text-sm text-muted mt-1",children:[n.kbEntries.length," reference entries behind the lessons."]})]}),(0,t.jsxs)(a.default,{href:"/chapters/1",className:"bg-surface border border-border rounded-xl p-4 hover:border-accent",children:[(0,t.jsx)("p",{className:"font-semibold",children:"The story"}),(0,t.jsx)("p",{className:"text-sm text-muted mt-1",children:"Meridian, week by week: briefs and debriefs."})]})]}),c&&(0,t.jsx)("button",{onClick:()=>{window.confirm("Reset all local progress? This cannot be undone.")&&u()},className:"text-xs text-muted underline underline-offset-2 hover:text-fg",children:"Reset progress"})]})}])},44336,e=>{"use strict";e.s(["flashcards",0,[{id:"fc-dpm-definition",kbSlug:"what-is-a-data-product-manager",front:"What does a Data Product Manager manage, and at the intersection of which three things does the role sit?",back:"Data products — warehouses, platforms, analytics tools, pipelines, ML models — at the intersection of data, technology, and business."},{id:"fc-risk-profile",kbSlug:"four-key-shifts",front:"Four Key Shifts — how does the RISK PROFILE differ between a general PM and a data PM?",back:"General PM: ship (potentially) buggy code, push a fix. Data PM: ship bad data, lose trust — often permanently."},{id:"fc-success-metrics",kbSlug:"four-key-shifts",front:"Four Key Shifts — what SUCCESS METRICS replace usage/engagement/retention for a data PM?",back:"Data quality, decision velocity, and trust signals."},{id:"fc-team-question",kbSlug:"four-key-shifts",front:"Four Key Shifts — the team's default question changes from 'When can we ship?' to what?",back:"'How do we validate?'"},{id:"fc-medallion",kbSlug:"medallion-architecture",front:"Name the three medallion layers and what each holds.",back:"Bronze = raw ingestion. Silver = filtered, cleaned, augmented. Gold = business-level aggregates that feed analytics, AI, and reporting."},{id:"fc-north-star",kbSlug:"metric-types",front:"Define a North Star metric and give the Playbook's Sales example.",back:"The domain's leading metric, tied directly to business outcomes. Example: revenue_generated."},{id:"fc-functional",kbSlug:"metric-types",front:"Define a Functional metric and give the Playbook's Sales example.",back:"The leading metric for a specific function within the domain. Example: #deals_closed_value."},{id:"fc-granular",kbSlug:"metric-types",front:"Define a Granular metric and give the Playbook's Sales example.",back:"An indicator of effectiveness that explains WHY a functional metric moved. Example: conversion_rate."},{id:"fc-mdt",kbSlug:"canvas-data-product-design",front:"What is a Metric Dependency Tree (MDT) and why does it make root-cause analysis tractable?",back:"A tree where granular metrics roll up into functional metrics, which roll up into the North Star. RCA = walking down the tree from the number that moved to the leaf that explains it."},{id:"fc-logical-model",kbSlug:"canvas-data-product-design",front:"The logical data model (Week 2) has five parts. Name them.",back:"Entities, Dimensions, Measures, Relationships, SLOs (+ Semantics as context around all of them)."},{id:"fc-activation",kbSlug:"data-product-activation",front:"A data product activates once which FOUR pieces exist?",back:"Input ports, transformation steps, output ports, SLOs."},{id:"fc-week1",kbSlug:"bullseye-data-product-market-fit",front:"Week 1 (The Bullseye) — what are the four steps, in order?",back:"1) Retrieve requirements from end users. 2) Map the existing user journey. 3) Align on data's new purpose (value prop). 4) Identify North Star / functional / granular metrics."},{id:"fc-week1-duration",kbSlug:"bullseye-data-product-market-fit",front:"How long should you spend on Week 1 discovery at minimum, and what kind of metrics should you pick for a proof of value?",back:"At least one full week. Pick hard-hitting metrics directly useful to leadership."},{id:"fc-maturity",kbSlug:"data-product-maturity-stages",front:"Name the four data-product maturity stages, from least to most mature.",back:"Ad-hoc → Reactive → Strategy-driven → Purpose-driven."},{id:"fc-ssi",kbSlug:"self-service-infrastructure",front:"What does a self-service infrastructure (SSI) let an analytics engineer do instead of building plumbing?",back:"Declare input/output locations and transform steps; the SSI supplies workflows, services, secrets, connectors, monitors, policies, and contracts as ready-to-use resources."},{id:"fc-gtm",kbSlug:"go-to-market-launch",front:"Week 4 (Launch) — what does 'native accessibility' mean for data product adoption?",back:"Exist where the user already is: work with the tools they already use rather than asking them to adopt a new interface."},{id:"fc-proof",kbSlug:"proof-of-value-performance",front:"Which stage of the 6-week playbook should get the HIGHEST share of effort, and why?",back:"Post-launch/adoption (Weeks 5–6) — it's where you learn how real users interact with the product and generate the feedback loop that drives the MVP."},{id:"fc-ontology",kbSlug:"ontology-as-infrastructure",front:"Why did enterprises function without formal ontologies for years, and what changed with AI agents?",back:"Meaning was localized in silos and humans silently resolved ambiguity. Autonomous agents can't — they pick whichever definition they hit first, and the guess compounds at scale."},{id:"fc-observability",kbSlug:"agent-observability-gap",front:"What's the difference between agent observability and agent evaluation?",back:"Observability tells you the agent RAN (latency, tokens, errors). Evaluation tells you whether it was RIGHT. Most teams have the first, about half have the second."},{id:"fc-lean-ai",kbSlug:"lean-ai-cost-economics",front:"Lean AI — what's the mature alternative to choosing between small and large models?",back:"Route by difficulty: narrow/small models for the high-volume well-defined slice, frontier models only for the hard fraction that needs them. Cost-per-outcome is the metric."},{id:"fc-oee",kbSlug:"oee-manufacturing-case-study",front:"Write the OEE formula and the threshold considered world-leading.",back:"OEE = Machine Availability × Process Efficiency × Product Quality. 85%+ is world-leading; most sit at 40–60%."},{id:"fc-dq-dimensions",kbSlug:"data-quality-dimensions",front:"Name the six data-quality dimensions.",back:"Completeness, uniqueness, timeliness (freshness), consistency, validity, accuracy."},{id:"fc-slo-parts",kbSlug:"data-quality-dimensions",front:"What three parts make a data SLO checkable, as opposed to a wish?",back:"A measurement (a query), a threshold, and when it is evaluated. 'The job runs at 02:00' is a schedule, not an SLO."},{id:"fc-success-not-enough",kbSlug:"data-quality-dimensions",front:"Give two ways a pipeline run can report 'success' and still deliver wrong data.",back:"Re-ingesting yesterday's file (duplicates) and processing a partial file (row count collapses). Neither is visible to a status column."},{id:"fc-funnel-three",kbSlug:"funnel-conversion-analysis",front:"'Conversion rate' hides three questions. What are they, and which needs the history log?",back:"Overall conversion (did it close?), stage-to-stage conversion (where do they drop?), velocity (where do they stall?). The last two need the append-only stage history."},{id:"fc-rca-first-step",kbSlug:"funnel-conversion-analysis",front:"Before slicing a conversion drop by any dimension, what artifact do you rule out first?",back:"Open deals in recent cohorts: restrict to resolved deals (won + lost) on cohorts old enough to have closed."},{id:"fc-fanout",kbSlug:"sql-toolkit-for-data-pms",front:"What is join fan-out and how do you avoid it?",back:"Joining a 1:N table before an aggregate multiplies the measure once per child row. Aggregate the N side first (in a CTE), then join."},{id:"fc-left-join-where",kbSlug:"sql-toolkit-for-data-pms",front:"Why does a WHERE condition on the right-hand table break a LEFT JOIN completeness check?",back:"Unmatched rows have NULL in those columns, and NULL = 'x' is never true, so the WHERE drops exactly the missing rows. Put the condition in ON."},{id:"fc-grain-window",kbSlug:"sql-toolkit-for-data-pms",front:"Rule of thumb for running totals and moving averages?",back:"Grain first, window second: aggregate to the reporting grain in a CTE, then apply SUM/AVG OVER."},{id:"fc-sql-clause-order",kbSlug:"sql-101",front:"SQL clause order?",back:"SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT."},{id:"fc-where-vs-having",kbSlug:"sql-101",front:"WHERE vs HAVING?",back:"WHERE filters rows before grouping; HAVING filters groups after, so only HAVING can use COUNT(*)."},{id:"fc-pandas-filter",kbSlug:"python-pandas-101",front:"pandas equivalent of WHERE stage = 'closed_won'?",back:"deals[deals['stage'] == 'closed_won'] — a boolean Series inside square brackets keeps the True rows."},{id:"fc-pandas-merge",kbSlug:"python-pandas-101",front:"pandas equivalent of JOIN … ON account_id, and of LEFT JOIN?",back:"deals.merge(accounts, on='account_id'); add how='left' for a LEFT JOIN."},{id:"fc-dpm-vs-roles",kbSlug:"what-is-a-data-product-manager",front:"One line each: how does a Data PM differ from an analyst, a data engineer, and a data manager?",back:"Analyst: the analytical how (consumes data products). Engineer: builds the infrastructure. Data manager: operational oversight and compliance. Data PM: the strategic what and why; defines requirements and prioritizes the backlog."}]])},87110,e=>{"use strict";let t=[{slug:"what-is-a-data-product-manager",title:"What is a Data Product Manager?",category:"definition",tags:["role","fundamentals"],summary:"A DPM sits at the intersection of data, technology, and business, managing data warehouses, platforms, pipelines, and ML models the way a PM manages a product.",body:`A **Data Product Manager (DPM)** is a specialized role at the intersection of
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
whom, and how will we know it's trusted?*`,source:"PRD - Data Product Management.pdf; role comparison from the user's notes."},{slug:"four-key-shifts",title:"The Four Key Shifts (Data PM vs. General PM)",category:"framework",tags:["role","mindset"],summary:"Risk profile, success metrics, customer journey, and team dynamic all invert when you move from general PM to data PM.",body:`Four dimensions where Data Product Management inverts the general-PM
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
   negotiation usually mean lead quality; early losses mean targeting.`,source:"Synthesized for DPM Lab; builds on the Playbook's Metric Dependency Tree."},{slug:"sql-toolkit-for-data-pms",title:"The SQL a Data PM Actually Uses",category:"definition",tags:["sql","skills"],summary:"CTEs for readable steps, window functions for per-row context, date bucketing for trends, and the four bugs that silently corrupt metrics.",body:"You are not writing production pipelines. You are verifying numbers,\nsizing problems, and reading other people's queries. That needs a small,\nsharp toolkit.\n\n## Shapes you'll write every week\n- **CTEs** (`WITH x AS (...)`) — one step per CTE, named after what it\n  produces (`resolved_deals`, `latest_stage`). Readable beats clever.\n- **Window functions** — `ROW_NUMBER() OVER (PARTITION BY deal_id ORDER BY\n  entered_at DESC)` for \"latest per entity\"; `LAG`/`LEAD` for change\n  between rows; `SUM(...) OVER (ORDER BY month)` for running totals;\n  `AVG(...) OVER (... ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)` for moving\n  averages.\n- **Date bucketing** — `substr(date, 1, 7)` for month, `strftime('%Y-%W',\n  ts)` for ISO-ish week, `julianday(b) - julianday(a)` for day differences\n  (SQLite).\n- **Conditional aggregation** — `SUM(CASE WHEN ... THEN 1 ELSE 0 END)` (or\n  `SUM(condition)` in SQLite) to compute several rates in one pass.\n- **HAVING** — filter *after* aggregation; the idiom for duplicates:\n  `GROUP BY key HAVING COUNT(*) > 1`.\n\n## The four silent metric bugs\n1. **Join fan-out** — joining a 1:N table before an aggregate multiplies\n   the measure. Aggregate the N side first.\n2. **LEFT JOIN + WHERE on the right table** — turns it into an inner join\n   and hides exactly the missing rows you were looking for. Put the\n   condition in `ON`.\n3. **COUNT(*) vs COUNT(DISTINCT x)** — views vs viewers, rows vs people.\n4. **Integer division** — `7 / 10 = 0` in many engines. Multiply by\n   `1.0` first.\n\n## Grain first, window second\nDecide what one row means (a deal? a month?), aggregate to that grain in a\nCTE, *then* apply windows. Running totals and moving averages on the wrong\ngrain look plausible and are wrong.",source:"Synthesized for DPM Lab."},{slug:"sql-101",title:"SQL 101: the formulas",category:"definition",tags:["sql","basics","level-0"],summary:"The clause order, filters, aggregates, GROUP BY/HAVING, and joins that every exercise in this app is built from.",body:"## The sentence\n```sql\nSELECT column_a, column_b        -- which columns\nFROM table_name                  -- which table\nWHERE condition                  -- which rows\nGROUP BY column_a                -- one row per value\nHAVING COUNT(*) > 1              -- filter groups\nORDER BY column_b DESC           -- sort\nLIMIT 10;                        -- keep n rows\n```\nClauses are optional but their order is fixed. Text goes in single quotes;\nnumbers don't. `;` ends the statement.\n\n## Filters\n| Want | Write |\n|---|---|\n| both | `a = 1 AND b = 2` |\n| either | `a = 1 OR b = 2` (use parentheses with AND) |\n| any of a list | `stage IN ('closed_won', 'closed_lost')` |\n| a range | `amount BETWEEN 1000 AND 5000` |\n| not equal | `stage <> 'closed_lost'` |\n| missing | `closed_date IS NULL` (never `= NULL`) |\n| pattern | `email LIKE '%@northwind%'` |\n\n## Aggregates\n`COUNT(*)`, `COUNT(col)` (non-NULL only), `SUM`, `AVG`, `MIN`, `MAX`.\nName the result: `SUM(amount) AS total`. In SQLite, `SUM(stage = 'closed_won')`\ncounts rows where the comparison is true, and `1.0 * a / b` forces decimal\ndivision.\n\n## GROUP BY / HAVING\nEvery SELECT column must be grouped or aggregated. `WHERE` filters rows\nbefore grouping; `HAVING` filters groups after. The duplicate idiom:\n`GROUP BY key HAVING COUNT(*) > 1`.\n\n## Joins\n```sql\nFROM deals d\nJOIN accounts a ON a.account_id = d.account_id        -- only matches\nLEFT JOIN transactions t ON t.deal_id = d.deal_id     -- all deals, NULL if none\n```\nQualify columns after a join (`d.amount`). Conditions on the right-hand table\nof a LEFT JOIN belong in `ON`, not `WHERE`.\n\n## Dates and text (SQLite)\n`substr(created_date, 1, 7)` → month; `strftime('%Y-%W', ts)` → week;\n`julianday(b) - julianday(a)` → days between.",source:"Synthesized for DPM Lab (Level 0)."},{slug:"python-pandas-101",title:"Python & pandas 101: the formulas",category:"definition",tags:["python","pandas","basics","level-0"],summary:"Lists, dicts, and the DataFrame moves that mirror SQL: select, filter, group, sort, merge.",body:"## Python in one breath\n```python\nx = 5                                   # variable\nstages = ['qualified', 'proposal']      # list; stages[0], len(stages)\ndeal = {'id': 'D-1', 'amount': 5000}    # dict; deal['amount']\nround(2 / 3, 4)                         # 0.6667\n[s for s in stages if s != 'proposal']  # list comprehension (a filter)\n```\n`==` compares, `=` assigns. `//` is integer division. Indentation defines\nblocks.\n\n## pandas ↔ SQL\n| SQL | pandas |\n|---|---|\n| `SELECT deal_id, amount FROM deals` | `deals[['deal_id', 'amount']]` |\n| `WHERE stage = 'closed_won'` | `deals[deals['stage'] == 'closed_won']` |\n| `WHERE a AND b` | `deals[(cond_a) & (cond_b)]` — parentheses required |\n| `WHERE stage IN (...)` | `deals[deals['stage'].isin([...])]` |\n| `COUNT(*)` | `len(deals)` |\n| `SUM(amount)` | `deals['amount'].sum()` |\n| `GROUP BY owner, SUM(amount)` | `deals.groupby('owner')['amount'].sum()` |\n| `ORDER BY amount DESC` | `.sort_values('amount', ascending=False)` |\n| `LIMIT 5` | `.head(5)` |\n| `JOIN accounts ON account_id` | `deals.merge(accounts, on='account_id')` |\n| `LEFT JOIN` | `.merge(..., how='left')` |\n| several aggregates | `.agg(total=('amount', 'sum'), n=('deal_id', 'count'))` |\n\n## Getting an answer out\n`result = df.to_dict('records')` for rows; `int(x)` / `float(x)` to turn a\nnumpy number into a plain one; `(deals['stage'] == 'closed_won').sum()`\ncounts True values, the pandas CASE WHEN.",source:"Synthesized for DPM Lab (Level 0)."}];e.s(["kbEntries",0,t])},79922,e=>{"use strict";var t=e.i(6e4),a=e.i(8908),s=e.i(26033);function n(e,n){let o=t.units.find(e=>e.number===n),r=o.lessons.filter(t=>e.lessons[t.id]),i=[...(0,a.sqlExercisesForChapter)(n),...(0,s.pythonExercisesForChapter)(n)],l=i.filter(t=>e.exercises[t.slug]?.status==="solved").length,d=o.lessons.find(t=>!e.lessons[t.id]);return{number:n,lessonsTotal:o.lessons.length,lessonsDone:r.length,labTotal:i.length,labDone:l,fraction:o.lessons.length?r.length/o.lessons.length:0,complete:o.lessons.length>0&&r.length===o.lessons.length,nextLessonId:d?.id??null}}function o(e){return t.units.map(t=>n(e,t.number))}e.s(["allUnitProgress",0,o,"nextLesson",0,function(e){return t.allLessons.find(t=>!e.lessons[t.id])??null},"totals",0,function(e){let t=o(e);return{lessonsDone:t.reduce((e,t)=>e+t.lessonsDone,0),lessonsTotal:t.reduce((e,t)=>e+t.lessonsTotal,0),labsDone:t.reduce((e,t)=>e+t.labDone,0),labsTotal:t.reduce((e,t)=>e+t.labTotal,0)}},"unitProgress",0,n])},74581,e=>{"use strict";var t=e.i(71645);function a(e=new Date){let t=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${t}-${s}-${n}`}let s="dpm-lab:progress:v1";function n(){return{version:1,user_id:"local",exercises:{},attempts:[],srs:{},lessons:{},streak:{current:0,lastActiveDate:null}}}function o(){try{let e=window.localStorage.getItem(s);if(!e)return n();let t=JSON.parse(e);if(t?.version!==1)return n();return{...n(),...t}}catch{return n()}}function r(e){let t,s=a(),{current:n,lastActiveDate:o}=e.streak;if(o===s)return e;let r=o===((t=new Date).setDate(t.getDate()-1),a(t))?n+1:1;return{...e,streak:{current:r,lastActiveDate:s}}}let i=n(),l=null,d=new Set;function c(){return null===l&&(l=o()),l}function u(){return i}function h(){for(let e of d)e()}function m(e){d.add(e);let t=e=>{e.key===s&&(l=o(),h())};return window.addEventListener("storage",t),()=>{d.delete(e),window.removeEventListener("storage",t)}}e.s(["dueCards",0,function(e,t){return t.filter(t=>(function(e,t=new Date){return!e||e.due<=a(t)})(e.srs[t.id]))},"useProgress",0,function(){let e=(0,t.useSyncExternalStore)(m,c,u),o=(0,t.useCallback)(e=>{var t=e(c());l=t;try{window.localStorage.setItem(s,JSON.stringify(t))}catch{}h()},[]),d=(0,t.useCallback)((e,t,a,s)=>o(n=>{let o,i,l,d,c;return o=new Date().toISOString(),i=n.exercises[e]??{kind:t,status:"not_started",attempts:0},l=s||"solved"===i.status?"solved":"attempted",d={...n.exercises,[e]:{...i,kind:t,status:l,attempts:i.attempts+1,lastAttemptAt:o,solvedAt:s&&!i.solvedAt?o:i.solvedAt}},c=[{id:`${e}:${o}`,slug:e,kind:t,code:a,passed:s,at:o},...n.attempts].slice(0,200),r({...n,exercises:d,attempts:c})}),[o]),g=(0,t.useCallback)((e,t)=>o(s=>{let n;return n=s.srs[e]??function(e=new Date){return{ease:2.5,interval:0,repetitions:0,due:a(e)}}(),r({...s,srs:{...s.srs,[e]:function(e,t,s=new Date){let{ease:n,interval:o,repetitions:r}=e;return t<3?(r=0,o=1):(o=0===r?1:1===r?6:Math.round(o*n),r+=1),(n+=.1-(5-t)*(.08+(5-t)*.02))<1.3&&(n=1.3),{ease:Math.round(100*n)/100,interval:o,repetitions:r,due:function(e,t){let[s,n,o]=e.split("-").map(Number),r=new Date(s,n-1,o);return r.setDate(r.getDate()+t),a(r)}(a(s),o)}}(n,t)}})}),[o]);return{data:e,hydrated:e!==i,recordAttempt:d,recordReview:g,recordLessonComplete:(0,t.useCallback)((e,t)=>o(a=>{let s,n;return s=a.lessons[e],n=Math.max(s?.bestAccuracy??0,t),r({...a,lessons:{...a.lessons,[e]:{completedAt:new Date().toISOString(),completions:(s?.completions??0)+1,bestAccuracy:n,perfect:n>=1}}})}),[o]),reset:(0,t.useCallback)(()=>o(()=>n()),[o])}}],74581)},7664,e=>{"use strict";let t=["Newcomer","Question asker","Metric mapper","Data auditor","Launch lead","Root-cause finder","Definition owner","Data Product Manager"];e.s(["XP_LAB_EXERCISE",0,20,"XP_LESSON",0,10,"XP_PERFECT_BONUS",0,5,"computeXp",0,function(e){let t=0;for(let a of Object.values(e.lessons))t+=10+5*!!a.perfect;let a=0;for(let t of Object.values(e.exercises))"solved"===t.status&&(a+=20);return{total:t+a,fromLessons:t,fromLabs:a}},"levelFor",0,function(e){let t=Math.floor(e/100)+1,a=e%100;return{level:t,intoLevel:a,toNext:100-a,fraction:a/100}},"levelTitle",0,function(e){return t[Math.min(e-1,t.length-1)]}])}]);