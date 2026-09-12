(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,35105,e=>{"use strict";var t=e.i(18050),a=e.i(22016),s=e.i(71645),o=e.i(44336),r=e.i(74581),n=e.i(82364);let i=[{q:1,label:"Again",hint:"Didn't know it",cls:"bg-danger-soft text-danger border-danger/20"},{q:3,label:"Hard",hint:"Got there, slowly",cls:"bg-warn-soft text-warn border-warn/20"},{q:4,label:"Good",hint:"Recalled it",cls:"bg-accent-soft text-accent border-accent/20"},{q:5,label:"Easy",hint:"Instant",cls:"bg-success-soft text-success border-success/20"}];e.s(["default",0,function(){let{data:e,hydrated:l,recordReview:d}=(0,r.useProgress)(),[c,u]=(0,s.useState)(null),[h,m]=(0,s.useState)(0),[g,f]=(0,s.useState)(!1),[p,y]=(0,s.useState)(0),b=(0,s.useMemo)(()=>l?(0,r.dueCards)(e,o.flashcards):[],[l,e]),w=e=>{u(e),m(0),f(!1),y(0)},v=(0,s.useMemo)(()=>c?o.flashcards.find(e=>e.id===c[h])??null:null,[c,h]);if(!l)return(0,t.jsx)("p",{className:"text-sm text-muted",children:"Loading your deck…"});if(!v){let s=null!==c,r=Object.values(e.srs).map(e=>e.due).sort()[0];return(0,t.jsxs)("div",{className:"max-w-xl space-y-4",children:[(0,t.jsx)("h1",{className:"text-2xl font-semibold tracking-tight",children:"Review"}),(0,t.jsxs)("div",{className:"bg-surface border border-border rounded-xl p-6",children:[s?(0,t.jsxs)("p",{className:"font-semibold",children:["Done — ",p," card",1===p?"":"s"," reviewed."]}):b.length>0?(0,t.jsxs)("p",{className:"font-semibold",children:[b.length," card",1===b.length?"":"s"," due today."]}):(0,t.jsx)("p",{className:"font-semibold",children:"Nothing due right now."}),(0,t.jsxs)("p",{className:"text-sm text-muted mt-1",children:[o.flashcards.length," cards in the deck.",r?` Next review due ${r}.`:" Rate honestly — SM-2 spaces the intervals from your ratings."]}),(0,t.jsxs)("div",{className:"mt-4 flex flex-wrap gap-3 text-sm",children:[b.length>0&&!s&&(0,t.jsx)("button",{onClick:()=>w(b.map(e=>e.id)),className:"px-4 py-2 rounded-md font-medium bg-accent text-accent-fg hover:opacity-90",children:"Start review"}),(0,t.jsx)("button",{onClick:()=>w(o.flashcards.map(e=>e.id)),className:"px-3 py-2 rounded-md border border-border hover:bg-surface-2",children:"Review everything"}),(0,t.jsx)(a.default,{href:"/kb",className:"px-3 py-2 rounded-md text-muted hover:text-fg",children:"Browse the KB"})]})]})]})}let k=c.length,S=(0,n.getKbEntry)(v.kbSlug);return(0,t.jsxs)("div",{className:"max-w-xl space-y-4",children:[(0,t.jsxs)("div",{className:"flex items-baseline justify-between",children:[(0,t.jsx)("h1",{className:"text-2xl font-semibold tracking-tight",children:"Review"}),(0,t.jsxs)("p",{className:"text-sm text-muted tabular-nums",children:[h+1," / ",k]})]}),(0,t.jsxs)("div",{className:"bg-surface border border-border rounded-xl p-6 min-h-[220px] flex flex-col",children:[(0,t.jsx)("p",{className:"text-xs uppercase tracking-wide text-muted mb-3",children:g?"Answer":"Question"}),(0,t.jsx)("p",{className:"text-lg leading-relaxed flex-1",children:g?v.back:v.front}),g&&S&&(0,t.jsxs)("p",{className:"text-xs text-muted mt-4",children:["From:"," ",(0,t.jsx)(a.default,{href:`/kb/${S.slug}`,className:"text-accent underline underline-offset-2",children:S.title})]})]}),g?(0,t.jsx)("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-2",children:i.map(e=>(0,t.jsxs)("button",{onClick:()=>{d(v.id,e.q),y(e=>e+1),f(!1),m(e=>e+1)},className:`px-3 py-2.5 rounded-md text-sm border ${e.cls} hover:opacity-90`,children:[(0,t.jsx)("span",{className:"font-semibold block",children:e.label}),(0,t.jsx)("span",{className:"text-xs opacity-80",children:e.hint})]},e.q))}):(0,t.jsx)("button",{onClick:()=>f(!0),className:"w-full px-4 py-3 rounded-md text-sm font-medium bg-accent text-accent-fg hover:opacity-90",children:"Show answer"})]})}])},44336,e=>{"use strict";e.s(["flashcards",0,[{id:"fc-dpm-definition",kbSlug:"what-is-a-data-product-manager",front:"What does a Data Product Manager manage, and at the intersection of which three things does the role sit?",back:"Data products — warehouses, platforms, analytics tools, pipelines, ML models — at the intersection of data, technology, and business."},{id:"fc-risk-profile",kbSlug:"four-key-shifts",front:"Four Key Shifts — how does the RISK PROFILE differ between a general PM and a data PM?",back:"General PM: ship (potentially) buggy code, push a fix. Data PM: ship bad data, lose trust — often permanently."},{id:"fc-success-metrics",kbSlug:"four-key-shifts",front:"Four Key Shifts — what SUCCESS METRICS replace usage/engagement/retention for a data PM?",back:"Data quality, decision velocity, and trust signals."},{id:"fc-team-question",kbSlug:"four-key-shifts",front:"Four Key Shifts — the team's default question changes from 'When can we ship?' to what?",back:"'How do we validate?'"},{id:"fc-medallion",kbSlug:"medallion-architecture",front:"Name the three medallion layers and what each holds.",back:"Bronze = raw ingestion. Silver = filtered, cleaned, augmented. Gold = business-level aggregates that feed analytics, AI, and reporting."},{id:"fc-north-star",kbSlug:"metric-types",front:"Define a North Star metric and give the Playbook's Sales example.",back:"The domain's leading metric, tied directly to business outcomes. Example: revenue_generated."},{id:"fc-functional",kbSlug:"metric-types",front:"Define a Functional metric and give the Playbook's Sales example.",back:"The leading metric for a specific function within the domain. Example: #deals_closed_value."},{id:"fc-granular",kbSlug:"metric-types",front:"Define a Granular metric and give the Playbook's Sales example.",back:"An indicator of effectiveness that explains WHY a functional metric moved. Example: conversion_rate."},{id:"fc-mdt",kbSlug:"canvas-data-product-design",front:"What is a Metric Dependency Tree (MDT) and why does it make root-cause analysis tractable?",back:"A tree where granular metrics roll up into functional metrics, which roll up into the North Star. RCA = walking down the tree from the number that moved to the leaf that explains it."},{id:"fc-logical-model",kbSlug:"canvas-data-product-design",front:"The logical data model (Week 2) has five parts. Name them.",back:"Entities, Dimensions, Measures, Relationships, SLOs (+ Semantics as context around all of them)."},{id:"fc-activation",kbSlug:"data-product-activation",front:"A data product activates once which FOUR pieces exist?",back:"Input ports, transformation steps, output ports, SLOs."},{id:"fc-week1",kbSlug:"bullseye-data-product-market-fit",front:"Week 1 (The Bullseye) — what are the four steps, in order?",back:"1) Retrieve requirements from end users. 2) Map the existing user journey. 3) Align on data's new purpose (value prop). 4) Identify North Star / functional / granular metrics."},{id:"fc-week1-duration",kbSlug:"bullseye-data-product-market-fit",front:"How long should you spend on Week 1 discovery at minimum, and what kind of metrics should you pick for a proof of value?",back:"At least one full week. Pick hard-hitting metrics directly useful to leadership."},{id:"fc-maturity",kbSlug:"data-product-maturity-stages",front:"Name the four data-product maturity stages, from least to most mature.",back:"Ad-hoc → Reactive → Strategy-driven → Purpose-driven."},{id:"fc-ssi",kbSlug:"self-service-infrastructure",front:"What does a self-service infrastructure (SSI) let an analytics engineer do instead of building plumbing?",back:"Declare input/output locations and transform steps; the SSI supplies workflows, services, secrets, connectors, monitors, policies, and contracts as ready-to-use resources."},{id:"fc-gtm",kbSlug:"go-to-market-launch",front:"Week 4 (Launch) — what does 'native accessibility' mean for data product adoption?",back:"Exist where the user already is: work with the tools they already use rather than asking them to adopt a new interface."},{id:"fc-proof",kbSlug:"proof-of-value-performance",front:"Which stage of the 6-week playbook should get the HIGHEST share of effort, and why?",back:"Post-launch/adoption (Weeks 5–6) — it's where you learn how real users interact with the product and generate the feedback loop that drives the MVP."},{id:"fc-ontology",kbSlug:"ontology-as-infrastructure",front:"Why did enterprises function without formal ontologies for years, and what changed with AI agents?",back:"Meaning was localized in silos and humans silently resolved ambiguity. Autonomous agents can't — they pick whichever definition they hit first, and the guess compounds at scale."},{id:"fc-observability",kbSlug:"agent-observability-gap",front:"What's the difference between agent observability and agent evaluation?",back:"Observability tells you the agent RAN (latency, tokens, errors). Evaluation tells you whether it was RIGHT. Most teams have the first, about half have the second."},{id:"fc-lean-ai",kbSlug:"lean-ai-cost-economics",front:"Lean AI — what's the mature alternative to choosing between small and large models?",back:"Route by difficulty: narrow/small models for the high-volume well-defined slice, frontier models only for the hard fraction that needs them. Cost-per-outcome is the metric."},{id:"fc-oee",kbSlug:"oee-manufacturing-case-study",front:"Write the OEE formula and the threshold considered world-leading.",back:"OEE = Machine Availability × Process Efficiency × Product Quality. 85%+ is world-leading; most sit at 40–60%."},{id:"fc-dq-dimensions",kbSlug:"data-quality-dimensions",front:"Name the six data-quality dimensions.",back:"Completeness, uniqueness, timeliness (freshness), consistency, validity, accuracy."},{id:"fc-slo-parts",kbSlug:"data-quality-dimensions",front:"What three parts make a data SLO checkable, as opposed to a wish?",back:"A measurement (a query), a threshold, and when it is evaluated. 'The job runs at 02:00' is a schedule, not an SLO."},{id:"fc-success-not-enough",kbSlug:"data-quality-dimensions",front:"Give two ways a pipeline run can report 'success' and still deliver wrong data.",back:"Re-ingesting yesterday's file (duplicates) and processing a partial file (row count collapses). Neither is visible to a status column."},{id:"fc-funnel-three",kbSlug:"funnel-conversion-analysis",front:"'Conversion rate' hides three questions. What are they, and which needs the history log?",back:"Overall conversion (did it close?), stage-to-stage conversion (where do they drop?), velocity (where do they stall?). The last two need the append-only stage history."},{id:"fc-rca-first-step",kbSlug:"funnel-conversion-analysis",front:"Before slicing a conversion drop by any dimension, what artifact do you rule out first?",back:"Open deals in recent cohorts: restrict to resolved deals (won + lost) on cohorts old enough to have closed."},{id:"fc-fanout",kbSlug:"sql-toolkit-for-data-pms",front:"What is join fan-out and how do you avoid it?",back:"Joining a 1:N table before an aggregate multiplies the measure once per child row. Aggregate the N side first (in a CTE), then join."},{id:"fc-left-join-where",kbSlug:"sql-toolkit-for-data-pms",front:"Why does a WHERE condition on the right-hand table break a LEFT JOIN completeness check?",back:"Unmatched rows have NULL in those columns, and NULL = 'x' is never true, so the WHERE drops exactly the missing rows. Put the condition in ON."},{id:"fc-grain-window",kbSlug:"sql-toolkit-for-data-pms",front:"Rule of thumb for running totals and moving averages?",back:"Grain first, window second: aggregate to the reporting grain in a CTE, then apply SUM/AVG OVER."}]])},87110,e=>{"use strict";let t=[{slug:"what-is-a-data-product-manager",title:"What is a Data Product Manager?",category:"definition",tags:["role","fundamentals"],summary:"A DPM sits at the intersection of data, technology, and business, managing data warehouses, platforms, pipelines, and ML models the way a PM manages a product.",body:`A **Data Product Manager (DPM)** is a specialized role at the intersection of
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
   negotiation usually mean lead quality; early losses mean targeting.`,source:"Synthesized for DPM Lab; builds on the Playbook's Metric Dependency Tree."},{slug:"sql-toolkit-for-data-pms",title:"The SQL a Data PM Actually Uses",category:"definition",tags:["sql","skills"],summary:"CTEs for readable steps, window functions for per-row context, date bucketing for trends, and the four bugs that silently corrupt metrics.",body:"You are not writing production pipelines. You are verifying numbers,\nsizing problems, and reading other people's queries. That needs a small,\nsharp toolkit.\n\n## Shapes you'll write every week\n- **CTEs** (`WITH x AS (...)`) — one step per CTE, named after what it\n  produces (`resolved_deals`, `latest_stage`). Readable beats clever.\n- **Window functions** — `ROW_NUMBER() OVER (PARTITION BY deal_id ORDER BY\n  entered_at DESC)` for \"latest per entity\"; `LAG`/`LEAD` for change\n  between rows; `SUM(...) OVER (ORDER BY month)` for running totals;\n  `AVG(...) OVER (... ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)` for moving\n  averages.\n- **Date bucketing** — `substr(date, 1, 7)` for month, `strftime('%Y-%W',\n  ts)` for ISO-ish week, `julianday(b) - julianday(a)` for day differences\n  (SQLite).\n- **Conditional aggregation** — `SUM(CASE WHEN ... THEN 1 ELSE 0 END)` (or\n  `SUM(condition)` in SQLite) to compute several rates in one pass.\n- **HAVING** — filter *after* aggregation; the idiom for duplicates:\n  `GROUP BY key HAVING COUNT(*) > 1`.\n\n## The four silent metric bugs\n1. **Join fan-out** — joining a 1:N table before an aggregate multiplies\n   the measure. Aggregate the N side first.\n2. **LEFT JOIN + WHERE on the right table** — turns it into an inner join\n   and hides exactly the missing rows you were looking for. Put the\n   condition in `ON`.\n3. **COUNT(*) vs COUNT(DISTINCT x)** — views vs viewers, rows vs people.\n4. **Integer division** — `7 / 10 = 0` in many engines. Multiply by\n   `1.0` first.\n\n## Grain first, window second\nDecide what one row means (a deal? a month?), aggregate to that grain in a\nCTE, *then* apply windows. Running totals and moving averages on the wrong\ngrain look plausible and are wrong.",source:"Synthesized for DPM Lab."}];e.s(["kbEntries",0,t])},82364,76091,e=>{"use strict";var t=e.i(87110);function a(e){return e.startsWith("/")?`/dpm-lab${e}`:e}e.s(["withBasePath",0,a],76091);let s=new Map(t.kbEntries.map(e=>[e.slug,e]));e.s(["CATEGORY_LABELS",0,{framework:"Framework",definition:"Definition","case-study":"Case study","industry-context":"Industry context"},"getKbEntry",0,function(e){return s.get(e)},"resolveWikiLinks",0,function(e){return e.replace(/\[\[([a-z0-9-]+)\]\]/g,(e,t)=>{let o=s.get(t);return o?`[${o.title}](${a(`/kb/${t}`)})`:`\`${t}\``})}],82364)},74581,e=>{"use strict";var t=e.i(71645);function a(e=new Date){let t=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${t}-${s}-${o}`}let s="dpm-lab:progress:v1";function o(){return{version:1,user_id:"local",exercises:{},attempts:[],srs:{},quiz:{},streak:{current:0,lastActiveDate:null}}}function r(){try{let e=window.localStorage.getItem(s);if(!e)return o();let t=JSON.parse(e);if(t?.version!==1)return o();return{...o(),...t}}catch{return o()}}function n(e){let t,s=a(),{current:o,lastActiveDate:r}=e.streak;if(r===s)return e;let n=r===((t=new Date).setDate(t.getDate()-1),a(t))?o+1:1;return{...e,streak:{current:n,lastActiveDate:s}}}let i=o(),l=null,d=new Set;function c(){return null===l&&(l=r()),l}function u(){return i}function h(){for(let e of d)e()}function m(e){d.add(e);let t=e=>{e.key===s&&(l=r(),h())};return window.addEventListener("storage",t),()=>{d.delete(e),window.removeEventListener("storage",t)}}e.s(["dueCards",0,function(e,t){return t.filter(t=>(function(e,t=new Date){return!e||e.due<=a(t)})(e.srs[t.id]))},"useProgress",0,function(){let e=(0,t.useSyncExternalStore)(m,c,u),r=(0,t.useCallback)(e=>{var t=e(c());l=t;try{window.localStorage.setItem(s,JSON.stringify(t))}catch{}h()},[]),d=(0,t.useCallback)((e,t,a,s)=>r(o=>{let r,i,l,d,c;return r=new Date().toISOString(),i=o.exercises[e]??{kind:t,status:"not_started",attempts:0},l=s||"solved"===i.status?"solved":"attempted",d={...o.exercises,[e]:{...i,kind:t,status:l,attempts:i.attempts+1,lastAttemptAt:r,solvedAt:s&&!i.solvedAt?r:i.solvedAt}},c=[{id:`${e}:${r}`,slug:e,kind:t,code:a,passed:s,at:r},...o.attempts].slice(0,200),n({...o,exercises:d,attempts:c})}),[r]),g=(0,t.useCallback)((e,t)=>r(s=>{let o;return o=s.srs[e]??function(e=new Date){return{ease:2.5,interval:0,repetitions:0,due:a(e)}}(),n({...s,srs:{...s.srs,[e]:function(e,t,s=new Date){let{ease:o,interval:r,repetitions:n}=e;return t<3?(n=0,r=1):(r=0===n?1:1===n?6:Math.round(r*o),n+=1),(o+=.1-(5-t)*(.08+(5-t)*.02))<1.3&&(o=1.3),{ease:Math.round(100*o)/100,interval:r,repetitions:n,due:function(e,t){let[s,o,r]=e.split("-").map(Number),n=new Date(s,o-1,r);return n.setDate(n.getDate()+t),a(n)}(a(s),r)}}(o,t)}})}),[r]),f=(0,t.useCallback)((e,t,a)=>r(s=>n({...s,quiz:{...s.quiz,[e]:{chosen:t,correct:a,at:new Date().toISOString()}}})),[r]);return{data:e,hydrated:e!==i,recordAttempt:d,recordReview:g,recordQuizAnswer:f,resetQuiz:(0,t.useCallback)(e=>r(t=>(function(e,t){let a={...e.quiz};for(let e of t)delete a[e];return{...e,quiz:a}})(t,e)),[r]),reset:(0,t.useCallback)(()=>r(()=>o()),[r])}}],74581)}]);