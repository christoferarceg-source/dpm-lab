(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,3657,e=>{"use strict";var t=e.i(18050),a=e.i(71645),o=e.i(6159),s=e.i(18994),r=e.i(26033),n=e.i(77475),i=e.i(136),l=e.i(36420);let d="https://cdn.jsdelivr.net/pyodide/v314.0.6/full/",c=null;async function u(e){return c||(c=(async()=>{if(e?.("script"),await (0,i.loadScript)(`${d}pyodide.js`),!window.loadPyodide)throw Error("Pyodide loader did not expose loadPyodide");e?.("runtime");let t=await window.loadPyodide({indexURL:d});return e?.("pandas"),await t.loadPackage("pandas"),e?.("ready"),t})().catch(e=>{throw c=null,e})),c}let m=`
import json as _json
import pandas as pd
accounts     = pd.DataFrame(_json.loads(__accounts_json))
customers    = pd.DataFrame(_json.loads(__customers_json))
deals        = pd.DataFrame(_json.loads(__deals_json))
transactions = pd.DataFrame(_json.loads(__transactions_json))
result = None
`,g=`
import json as _json
def _native(o):
    try:
        import numpy as _np
        if isinstance(o, _np.generic):
            return o.item()
    except ImportError:
        pass
    if hasattr(o, "to_dict"):
        try:
            return o.to_dict("records")
        except TypeError:
            return o.to_dict()
    if hasattr(o, "tolist"):
        return o.tolist()
    if hasattr(o, "isoformat"):
        return o.isoformat()
    return str(o)
__serialized = _json.dumps(result, default=_native)
`;async function h(e){let t=await u(),a=[];t.setStdout({batched:e=>a.push(e)}),t.setStderr({batched:e=>a.push(e)});let o=t.globals.get("dict")();try{o.set("__accounts_json",JSON.stringify(n.accounts)),o.set("__customers_json",JSON.stringify(n.customers)),o.set("__deals_json",JSON.stringify(n.deals)),o.set("__transactions_json",JSON.stringify(n.transactions));let s=performance.now();t.runPython(m,{globals:o}),t.runPython(e,{globals:o}),t.runPython(g,{globals:o});let r=Math.round(performance.now()-s),i=o.get("__serialized");return{ok:!0,result:JSON.parse(i),stdout:a.join(""),ms:r}}catch(o){let e,t;return{ok:!1,error:((t=(e=(o instanceof Error?o.message:String(o)).split("\n")).findIndex(e=>e.includes('File "<exec>"')))>=0?e.slice(t):e.slice(-4)).join("\n").trim(),stdout:a.join("")}}finally{o.destroy()}}let p=new Map(r.pythonExercises.map(e=>[e.slug,e])),f={script:"Fetching Python runtime (first time only, ~10 MB)…",runtime:"Starting Python…",pandas:"Loading pandas…",ready:"Ready."};e.s(["default",0,function(){let e=(0,a.useCallback)(async e=>{await u(t=>e(f[t]))},[]),n=(0,a.useCallback)(async e=>{let t=await h(e);return t.ok?{ok:!0,payload:t.result,ms:t.ms,stdout:t.stdout}:{ok:!1,error:t.error,stdout:t.stdout}},[]),i=(0,a.useCallback)((e,t)=>{var a=p.get(e);if(null==t)return{passed:!1,reason:"`result` is still None — assign your answer to it."};let o=a.expectedResult;return Array.isArray(o)&&!Array.isArray(t)?{passed:!1,reason:"Expected a list (e.g. from .to_dict('records')) but got a different type."}:Array.isArray(o)&&Array.isArray(t)&&t.length!==o.length?{passed:!1,reason:`Expected ${o.length} item(s) but got ${t.length}.`}:(0,l.deepEqual)(t,o,a.orderMatters??!1)?{passed:!0}:{passed:!1,reason:Array.isArray(o)?"Right length, but the values"+(a.orderMatters?" or their order":"")+" don't match. Check keys, rounding, and sort order.":"Value doesn't match. Check your filter and rounding."}},[]);return(0,t.jsx)(o.PracticeWorkspace,{kind:"python",title:"Python Practice",intro:(0,t.jsxs)("p",{children:["Real Python + pandas, running in your browser. DataFrames ",(0,t.jsx)("code",{className:"font-mono",children:"accounts"}),","," ",(0,t.jsx)("code",{className:"font-mono",children:"customers"}),", ",(0,t.jsx)("code",{className:"font-mono",children:"deals"}),","," ",(0,t.jsx)("code",{className:"font-mono",children:"transactions"})," are pre-loaded (same data as SQL practice). Assign your answer to ",(0,t.jsx)("code",{className:"font-mono",children:"result"}),". You can ",(0,t.jsx)("code",{className:"font-mono",children:"print()"})," ","to explore — output shows under “stdout”. The first run downloads the runtime; later runs are instant."]}),exercises:r.pythonExercises.map(e=>({slug:e.slug,title:e.title,difficulty:e.difficulty,prompt:e.prompt,starter:e.starterCode,hint:e.hint,dpmConnection:e.dpmConnection})),prepare:e,run:n,grade:i,renderResult:e=>(0,t.jsx)(s.PyResultView,{value:e})})}],3657)},91987,e=>{e.v(t=>Promise.all(["static/chunks/09f98t6gkiyh-.js"].map(t=>e.l(t))).then(()=>t(95931)))},26033,e=>{"use strict";let t=[{slug:"py-count-closed-won",title:"Count the deals we won",difficulty:"intro",prompt:'`deals` is a pandas DataFrame with a `stage` column.\n\nSet `result` to the **number** of rows where `stage == "closed_won"`.',starterCode:`# deals is already loaded as a pandas DataFrame.
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
result = None  # TODO: grouped.to_dict("records")`,expectedResult:[{source:"Outbound",lost_value:81500,lost_count:3},{source:"Inbound",lost_value:34e3,lost_count:2}],orderMatters:!0,dpmConnection:{text:"Named aggregation (.agg(name=(col, fn))) is the pandas way to compute several measures at once. The output is the raw material for an RCA conversation — the DPM's real job starts *after* this: is Outbound losing on lead quality, pricing, or a stage-recording data issue?",kbSlug:"proof-of-value-performance"},hint:"grouped.to_dict('records') — you may need int() casts if you build it by hand."}];e.s(["pythonExercises",0,t])},87110,e=>{"use strict";let t=[{slug:"what-is-a-data-product-manager",title:"What is a Data Product Manager?",category:"definition",tags:["role","fundamentals"],summary:"A DPM sits at the intersection of data, technology, and business, managing data warehouses, platforms, pipelines, and ML models the way a PM manages a product.",body:`A **Data Product Manager (DPM)** is a specialized role at the intersection of
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
transform.`,source:"The Big Book of Data Science Use Cases, 2nd Edition (Databricks)."}];e.s(["kbEntries",0,t])},82364,76091,e=>{"use strict";var t=e.i(87110);function a(e){return e.startsWith("/")?`/dpm-lab${e}`:e}e.s(["withBasePath",0,a],76091);let o=new Map(t.kbEntries.map(e=>[e.slug,e]));e.s(["CATEGORY_LABELS",0,{framework:"Framework",definition:"Definition","case-study":"Case study","industry-context":"Industry context"},"getKbEntry",0,function(e){return o.get(e)},"resolveWikiLinks",0,function(e){return e.replace(/\[\[([a-z0-9-]+)\]\]/g,(e,t)=>{let s=o.get(t);return s?`[${s.title}](${a(`/kb/${t}`)})`:`\`${t}\``})}],82364)},74581,e=>{"use strict";var t=e.i(71645);function a(e=new Date){let t=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${o}-${s}`}let o="dpm-lab:progress:v1";function s(){return{version:1,user_id:"local",exercises:{},attempts:[],srs:{},streak:{current:0,lastActiveDate:null}}}function r(){try{let e=window.localStorage.getItem(o);if(!e)return s();let t=JSON.parse(e);if(t?.version!==1)return s();return{...s(),...t}}catch{return s()}}function n(e){let t,o=a(),{current:s,lastActiveDate:r}=e.streak;if(r===o)return e;let n=r===((t=new Date).setDate(t.getDate()-1),a(t))?s+1:1;return{...e,streak:{current:n,lastActiveDate:o}}}let i=s(),l=null,d=new Set;function c(){return null===l&&(l=r()),l}function u(){return i}function m(){for(let e of d)e()}function g(e){d.add(e);let t=e=>{e.key===o&&(l=r(),m())};return window.addEventListener("storage",t),()=>{d.delete(e),window.removeEventListener("storage",t)}}e.s(["dueCards",0,function(e,t){return t.filter(t=>(function(e,t=new Date){return!e||e.due<=a(t)})(e.srs[t.id]))},"useProgress",0,function(){let e=(0,t.useSyncExternalStore)(g,c,u),r=(0,t.useCallback)(e=>{var t=e(c());l=t;try{window.localStorage.setItem(o,JSON.stringify(t))}catch{}m()},[]),d=(0,t.useCallback)((e,t,a,o)=>r(s=>{let r,i,l,d,c;return r=new Date().toISOString(),i=s.exercises[e]??{kind:t,status:"not_started",attempts:0},l=o||"solved"===i.status?"solved":"attempted",d={...s.exercises,[e]:{...i,kind:t,status:l,attempts:i.attempts+1,lastAttemptAt:r,solvedAt:o&&!i.solvedAt?r:i.solvedAt}},c=[{id:`${e}:${r}`,slug:e,kind:t,code:a,passed:o,at:r},...s.attempts].slice(0,200),n({...s,exercises:d,attempts:c})}),[r]);return{data:e,hydrated:e!==i,recordAttempt:d,recordReview:(0,t.useCallback)((e,t)=>r(o=>{let s;return s=o.srs[e]??function(e=new Date){return{ease:2.5,interval:0,repetitions:0,due:a(e)}}(),n({...o,srs:{...o.srs,[e]:function(e,t,o=new Date){let{ease:s,interval:r,repetitions:n}=e;return t<3?(n=0,r=1):(r=0===n?1:1===n?6:Math.round(r*s),n+=1),(s+=.1-(5-t)*(.08+(5-t)*.02))<1.3&&(s=1.3),{ease:Math.round(100*s)/100,interval:r,repetitions:n,due:function(e,t){let[o,s,r]=e.split("-").map(Number),n=new Date(o,s-1,r);return n.setDate(n.getDate()+t),a(n)}(a(o),r)}}(s,t)}})}),[r]),reset:(0,t.useCallback)(()=>r(()=>s()),[r])}}],74581)}]);