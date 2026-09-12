import type { QuizQuestion } from "@/lib/types";

// Decision quiz bank. Three kinds:
//   judgment       — a situation, four possible moves, one best (rationale for each)
//   concept        — a framework check with explanations
//   sql-prediction — read a query and predict its behaviour / spot the bug
// Questions are logic-based, not tied to specific dataset numbers, so they
// stay correct if the generator changes.

export const quizQuestions: QuizQuestion[] = [
  // ---------------- Chapter 1 ----------------
  {
    id: "q1-first-move",
    chapter: 1,
    kind: "judgment",
    kbSlug: "bullseye-data-product-market-fit",
    prompt: `Dana says the dashboard's 61% conversion rate is "wrong" and asks you to fix it by Friday. Raj says every pipeline is green. What is your best first move?`,
    options: [
      {
        text: "Open the SQL behind the dashboard and look for a bug.",
        explanation: "Tempting, but you don't yet know which number Dana means or how she defines it. You'd be debugging a definition disagreement as if it were a code bug.",
      },
      {
        text: "Ask Dana what number she expects, how she'd compute it by hand, and what decision she makes with it.",
        explanation: "Best move. Week 1 is discovery: pin down the definition, the expected value, and the decision it drives. Most 'wrong numbers' are two definitions colliding.",
      },
      {
        text: "Tell Dana the pipelines are green so the number is correct.",
        explanation: "A green pipeline means the code ran, not that the metric means what she thinks. This is the trust-losing move from the Four Key Shifts.",
      },
      {
        text: "Escalate to Sofia to arbitrate between Dana and Raj.",
        explanation: "Premature. Nothing has been diagnosed yet, and escalation without a problem statement spends your sponsor's attention for nothing.",
      },
    ],
    correctIndex: 1,
  },
  {
    id: "q1-shift-risk",
    chapter: 1,
    kind: "concept",
    kbSlug: "four-key-shifts",
    prompt: `According to the Four Key Shifts, how does the *risk profile* differ for a Data PM compared with a general PM?`,
    options: [
      { text: "Data products are cheaper to fix, so risk is lower.", explanation: "The opposite. Bad data that reaches a decision can't be patched away after the fact." },
      { text: "Shipping bad data can lose trust permanently, whereas a buggy feature is usually recoverable with a fix.", explanation: "Correct. The asymmetry is trust: a stakeholder who was burned once discounts every future number." },
      { text: "Risk is the same; only the tooling differs.", explanation: "The tooling is a detail. The shift is about how failures are perceived and how long they last." },
      { text: "Data PMs face no shipping risk because they don't ship features.", explanation: "They ship metrics, models, and pipelines. Those carry more decision risk, not less." },
    ],
    correctIndex: 1,
  },
  {
    id: "q1-metric-types",
    chapter: 1,
    kind: "concept",
    kbSlug: "metric-types",
    prompt: `In the Playbook's Sales example, which metric is the **North Star**, and why?`,
    options: [
      { text: "conversion_rate, because it explains performance.", explanation: "That's a granular metric: an indicator of effectiveness that explains why the functional metric moved." },
      { text: "#deals_closed_value, because Sales is measured on closed deals.", explanation: "That's the functional metric for the Sales function. It rolls up into the North Star, but it isn't the top of the tree." },
      { text: "revenue_generated, because it ties the domain directly to the business outcome.", explanation: "Correct. The North Star is the domain's leading metric with a direct line to the business. Functional and granular metrics explain its movement." },
      { text: "Number of dashboard views, because adoption proves value.", explanation: "Adoption is a product-health metric for the data product itself, not the domain's North Star." },
    ],
    correctIndex: 2,
  },
  {
    id: "q1-week1-time",
    chapter: 1,
    kind: "judgment",
    kbSlug: "bullseye-data-product-market-fit",
    prompt: `It's Wednesday of week 1. You have interviewed Dana and two reps and already see the definition problem. Raj offers to start building a fixed dashboard today. Do you take him up on it?`,
    options: [
      { text: "Yes. Ship early, iterate later.", explanation: "You'd be building on an unratified definition. The Playbook is explicit: spend at least a full week on discovery before designing." },
      { text: "No. Finish discovery: interview Lena and Tomás, map the existing user journey, and get Sofia to agree the problem statement first.", explanation: "Correct. Two stakeholders you haven't met (RevOps, Finance) hold different definitions. Building now bakes in a fight you haven't had yet." },
      { text: "Yes, but only for the reps' view, since they were interviewed.", explanation: "The reps aren't the ones who decide with the number. Building for the loudest early voice is how you get a report nobody trusts." },
      { text: "No, because engineers shouldn't build without a formal spec.", explanation: "Right answer, wrong reason. The issue isn't process; it's that the problem statement isn't agreed yet." },
    ],
    correctIndex: 1,
  },
  {
    id: "q1-sql-open-deals",
    chapter: 1,
    kind: "sql-prediction",
    kbSlug: "metric-types",
    prompt: `Raj shows you the query behind the 61% figure:

\`\`\`sql
SELECT 1.0 * SUM(stage = 'closed_won') / COUNT(*) AS conversion_rate
FROM deals;
\`\`\`

What does this query actually compute?`,
    options: [
      { text: "Won deals divided by resolved (won + lost) deals: Dana's definition.", explanation: "No. COUNT(*) includes every row, so open deals are in the denominator." },
      { text: "Won deals divided by *all* deals, including ones still open: Lena's 'won ÷ created' definition.", explanation: "Correct. COUNT(*) counts every deal regardless of stage, so this is won ÷ created. As recent open deals pile up, the rate drifts downward for no business reason." },
      { text: "It will error because you can't SUM a boolean expression.", explanation: "In SQLite a comparison yields 0/1, so SUM works. The query runs; the question is what it means." },
      { text: "Won deal value divided by total deal value.", explanation: "There's no amount column in the query. This is a count-based rate." },
    ],
    correctIndex: 1,
  },

  // ---------------- Chapter 2 ----------------
  {
    id: "q2-three-definitions",
    chapter: 2,
    kind: "judgment",
    kbSlug: "canvas-data-product-design",
    prompt: `Dana, Lena and Tomás each have a different formula for conversion rate. What should you do with the three definitions?`,
    options: [
      { text: "Pick Dana's, since she's the VP and the main user.", explanation: "You'd win the meeting and lose Finance and RevOps. Silent losers stop trusting the dashboard." },
      { text: "Average the three so nobody is wrong.", explanation: "A blended number nobody can reproduce by hand is the fastest way to destroy trust." },
      { text: "Put all three on the Metric Dependency Tree with distinct names, formulas and owners; show one by default and label it.", explanation: "Correct. The MDT exists so the definition fight happens once and is written down. Different questions deserve different metrics; the sin is calling them the same thing." },
      { text: "Ask Raj which one is easiest to compute.", explanation: "Implementation cost is not a reason to choose a business definition." },
    ],
    correctIndex: 2,
  },
  {
    id: "q2-logical-model",
    chapter: 2,
    kind: "concept",
    kbSlug: "canvas-data-product-design",
    prompt: `In the logical data model, what is the difference between a **dimension** and a **measure**?`,
    options: [
      { text: "Dimensions are numeric; measures are text.", explanation: "Backwards, and not the real distinction anyway." },
      { text: "A dimension is an attribute you slice by (region, source, stage); a measure is a quantified aggregate (sum, count, average).", explanation: "Correct. Metrics are measures cut by dimensions. That's also why 'conversion by region' is a measure (a rate) sliced by a dimension (region)." },
      { text: "Dimensions live in the Gold layer; measures live in Silver.", explanation: "Medallion layers describe processing stages, not the model's vocabulary." },
      { text: "They're synonyms in most modeling tools.", explanation: "Some tools blur the UI, but the concepts are distinct and the MDT depends on the distinction." },
    ],
    correctIndex: 1,
  },
  {
    id: "q2-history-vs-current",
    chapter: 2,
    kind: "judgment",
    kbSlug: "funnel-conversion-analysis",
    prompt: `You want to know how many deals reached the *proposal* stage this year. The \`deals\` table has a current \`stage\` column. \`deal_stage_history\` logs every transition. Which source do you use?`,
    options: [
      { text: "deals.stage = 'proposal', since that's what the CRM shows.", explanation: "That counts deals *currently* in proposal. A deal that moved on to negotiation or closed is invisible, so you undercount the funnel badly." },
      { text: "deal_stage_history, counting distinct deals that ever entered 'proposal'.", explanation: "Correct. Funnel questions are about *ever reached*, which only an append-only log can answer. Overwritten fields lose history." },
      { text: "Either; they give the same answer.", explanation: "They don't. The current-stage column is a snapshot; the history is the path." },
      { text: "Neither; ask Lena for the CRM's built-in funnel report.", explanation: "You'd be outsourcing the definition to a tool you can't inspect. The history log is right there." },
    ],
    correctIndex: 1,
  },
  {
    id: "q2-sql-fanout",
    chapter: 2,
    kind: "sql-prediction",
    kbSlug: "sql-toolkit-for-data-pms",
    prompt: `Raj wants total won value per account and writes:

\`\`\`sql
SELECT a.account_name, SUM(d.amount) AS total_won
FROM accounts a
JOIN deals d ON d.account_id = a.account_id
JOIN deal_stage_history h ON h.deal_id = d.deal_id
WHERE d.stage = 'closed_won'
GROUP BY a.account_name;
\`\`\`

What's wrong?`,
    options: [
      { text: "Nothing; the join to history is harmless because of the WHERE.", explanation: "The WHERE filters deals, but the join still multiplies each deal by its number of history rows." },
      { text: "Each deal's amount is counted once per history row (join fan-out), so totals are inflated by roughly 4–5×.", explanation: "Correct. A 1:N join before an aggregate multiplies the measure. Either drop the unneeded join or aggregate history separately in a CTE first." },
      { text: "GROUP BY must include d.amount.", explanation: "No: amount is inside an aggregate, so it doesn't belong in GROUP BY." },
      { text: "It should use LEFT JOIN so accounts with no deals appear.", explanation: "That's a different (minor) concern; it doesn't cause wrong totals." },
    ],
    correctIndex: 1,
  },
  {
    id: "q2-window-vs-group",
    chapter: 2,
    kind: "concept",
    kbSlug: "sql-toolkit-for-data-pms",
    prompt: `When do you reach for a **window function** instead of GROUP BY?`,
    options: [
      { text: "When you want fewer rows out than in.", explanation: "That's GROUP BY: it collapses rows into groups." },
      { text: "When you need an aggregate or ranking *alongside* each row without collapsing rows, e.g. 'latest stage per deal' or 'running total by month'.", explanation: "Correct. Windows compute over a partition but keep every row. ROW_NUMBER(), LAG(), SUM() OVER (ORDER BY …) are the Data PM's daily tools." },
      { text: "Only for performance on large tables.", explanation: "Performance isn't the distinction; the output shape is." },
      { text: "Never in SQLite; windows aren't supported.", explanation: "SQLite has supported window functions since 3.25 (2018)." },
    ],
    correctIndex: 1,
  },

  // ---------------- Chapter 3 ----------------
  {
    id: "q3-green-runs",
    chapter: 3,
    kind: "judgment",
    kbSlug: "data-quality-dimensions",
    prompt: `The revenue tile jumped +189,500 overnight and then dropped back. Raj says every run succeeded. What do you check first?`,
    options: [
      { text: "The dashboard's caching settings.", explanation: "A cache doesn't invent 189,500; something in the data changed and then changed back." },
      { text: "Uniqueness: whether the same transactions were ingested twice (duplicate rows for the same deal, amount and date).", explanation: "Correct. A jump that exactly matches a deal amount, then reverts, is the signature of a re-ingested file. 'Success' means the job ran, not that the rows were unique." },
      { text: "Whether Dana edited the metric definition.", explanation: "Definitions don't change overnight and then revert by morning." },
      { text: "Whether the CRM added a new deal.", explanation: "A new deal wouldn't disappear the next day." },
    ],
    correctIndex: 1,
  },
  {
    id: "q3-source-of-truth",
    chapter: 3,
    kind: "judgment",
    kbSlug: "data-product-activation",
    prompt: `You find four deals whose CRM \`stage\` says *negotiation* while the history log's latest row says *closed_won*. What's the right fix?`,
    options: [
      { text: "Manually update the four rows in the CRM.", explanation: "Fixes today's four, guarantees next month's four. Symptom, not cause." },
      { text: "Make the history log the source of truth for stage: derive deals.stage from the latest history row in the transform, and add a consistency check as an SLO.", explanation: "Correct. Activation is where you decide which port is authoritative and encode it in the transform plus an SLO monitor, so the drift is caught automatically." },
      { text: "Ignore it; four out of hundreds is within tolerance.", explanation: "Four closed_won deals missing from bookings is real money, and the count will grow." },
      { text: "Ask reps to update stages faster.", explanation: "Behaviour change without a check is hope, not a control." },
    ],
    correctIndex: 1,
  },
  {
    id: "q3-dq-dimensions",
    chapter: 3,
    kind: "concept",
    kbSlug: "data-quality-dimensions",
    prompt: `A closed deal with a NULL \`closed_date\` violates which data-quality dimension?`,
    options: [
      { text: "Timeliness", explanation: "Timeliness is about freshness: is the data recent enough? The problem here is a missing value." },
      { text: "Uniqueness", explanation: "Uniqueness is about duplicates." },
      { text: "Completeness", explanation: "Correct. A required field is empty for rows where it must exist. The SLO reads: '100% of closed deals have a closed_date.'" },
      { text: "Accuracy", explanation: "Accuracy is whether a present value matches reality; NULL isn't inaccurate, it's absent." },
    ],
    correctIndex: 2,
  },
  {
    id: "q3-sql-left-join",
    chapter: 3,
    kind: "sql-prediction",
    kbSlug: "sql-toolkit-for-data-pms",
    prompt: `You want every closed_won deal and its initial transaction, *including* deals that have no transaction yet (a completeness check):

\`\`\`sql
SELECT d.deal_id, t.transaction_id
FROM deals d
LEFT JOIN transactions t ON t.deal_id = d.deal_id
WHERE d.stage = 'closed_won'
  AND t.type = 'initial';
\`\`\`

Why won't this find the missing ones?`,
    options: [
      { text: "LEFT JOIN should be RIGHT JOIN.", explanation: "Direction isn't the problem." },
      { text: "The filter \`t.type = 'initial'\` in WHERE turns the LEFT JOIN into an inner join: unmatched deals have t.type = NULL, and NULL = 'initial' is not true, so they're dropped.", explanation: "Correct. Conditions on the right-hand table belong in the ON clause (or use \`t.type = 'initial' OR t.type IS NULL\`). This is the most common way a completeness check silently returns nothing." },
      { text: "You need DISTINCT.", explanation: "Duplicates aren't the issue; missing rows are." },
      { text: "It will error because t.type can be NULL.", explanation: "It runs fine; NULL comparisons are just never true." },
    ],
    correctIndex: 1,
  },
  {
    id: "q3-freshness",
    chapter: 3,
    kind: "concept",
    kbSlug: "data-quality-dimensions",
    prompt: `What is the right way to express a *freshness* SLO for the deals table?`,
    options: [
      { text: "'The pipeline runs every day at 02:00.'", explanation: "That's a schedule, not a guarantee. A run can be scheduled and fail." },
      { text: "'The latest successful load of deals is never more than 24 hours old at 09:00 local, measured by the pipeline run log.'", explanation: "Correct. An SLO names the measurement, the threshold, and when it's evaluated. It's checkable by a query, which is what makes it an SLO and not a wish." },
      { text: "'Data is always up to date.'", explanation: "Unmeasurable." },
      { text: "'Raj is responsible for freshness.'", explanation: "Ownership matters, but it's not a threshold." },
    ],
    correctIndex: 1,
  },

  // ---------------- Chapter 4 ----------------
  {
    id: "q4-adoption-metric",
    chapter: 4,
    kind: "judgment",
    kbSlug: "go-to-market-launch",
    prompt: `Sofia asks "Is anyone using it?" Which number do you bring?`,
    options: [
      { text: "Total page views since launch.", explanation: "Two analysts refreshing all day can make this look great. Views measure activity, not adoption." },
      { text: "Weekly distinct viewers, split by role, alongside the same for the legacy report.", explanation: "Correct. Distinct people per week tells you *who* adopted; by role tells you which audience is missing; the legacy comparison tells you if you replaced anything." },
      { text: "Number of dashboards built.", explanation: "Output, not outcome." },
      { text: "A survey of how much people like it.", explanation: "Useful later; it won't answer 'is anyone using it'." },
    ],
    correctIndex: 1,
  },
  {
    id: "q4-native",
    chapter: 4,
    kind: "concept",
    kbSlug: "go-to-market-launch",
    prompt: `The Playbook's launch advice is to "exist where the user already is." For sales reps at Meridian, what does that most likely mean?`,
    options: [
      { text: "Send a weekly PDF export.", explanation: "Static, un-drillable, and one more thing to ignore." },
      { text: "Surface the stalled-deal metric inside the CRM record and the manager's 1:1 view, rather than asking reps to open a separate dashboard.", explanation: "Correct. Native accessibility means the metric shows up in the tool and the ritual (the 1:1) where the decision already happens." },
      { text: "Build a mobile app.", explanation: "New surface, new adoption problem." },
      { text: "Require dashboard login for commission reports.", explanation: "Forced usage produces logins, not decisions." },
    ],
    correctIndex: 1,
  },
  {
    id: "q4-sql-week",
    chapter: 4,
    kind: "sql-prediction",
    kbSlug: "sql-toolkit-for-data-pms",
    prompt: `To count weekly active viewers you write:

\`\`\`sql
SELECT strftime('%Y-%W', viewed_at) AS week, COUNT(*) AS active_viewers
FROM dashboard_views
WHERE dashboard = 'Sales Funnel Accelerator'
GROUP BY week;
\`\`\`

What does \`active_viewers\` actually count?`,
    options: [
      { text: "Distinct people who viewed that week.", explanation: "COUNT(*) counts rows (views), not people. Someone with 20 views counts 20 times." },
      { text: "Views per week, not viewers. You need COUNT(DISTINCT viewer_id).", explanation: "Correct. Active *viewers* is a distinct count of people. This one-word slip is why adoption numbers get inflated." },
      { text: "It errors because strftime can't be used in GROUP BY.", explanation: "SQLite allows grouping by an alias of an expression." },
      { text: "Weeks with at least one view.", explanation: "That's the number of *rows returned*, not what the column holds." },
    ],
    correctIndex: 1,
  },
  {
    id: "q4-retire-legacy",
    chapter: 4,
    kind: "judgment",
    kbSlug: "go-to-market-launch",
    prompt: `Three weeks after launch, the legacy Pipeline Report still gets a trickle of views from a dozen people. What do you do?`,
    options: [
      { text: "Leave it; some people prefer it.", explanation: "Two numbers for the same thing is exactly the trust problem you were hired to fix." },
      { text: "Delete it immediately.", explanation: "You'll break bookmarks and lose goodwill for no reason." },
      { text: "Redirect the legacy URL to the new dashboard with a banner explaining the definition change, and talk to the remaining regular viewers first.", explanation: "Correct. A redirect meets people where their bookmark is; the conversation catches any real need the new product misses." },
      { text: "Email everyone a reminder.", explanation: "Emails don't change bookmarks." },
    ],
    correctIndex: 2,
  },

  // ---------------- Chapter 5 ----------------
  {
    id: "q5-first-cut",
    chapter: 5,
    kind: "judgment",
    kbSlug: "proof-of-value-performance",
    prompt: `Conversion for deals created in May–June looks low. Before slicing by anything, what do you rule out first?`,
    options: [
      { text: "That the price increase happened in May.", explanation: "A hypothesis to test, not an artifact to rule out. Test artifacts first." },
      { text: "That the drop is an artifact of open deals: recent cohorts have had less time to close, so 'won ÷ created' always sags at the right edge of the chart.", explanation: "Correct. The first RCA step is confirming the number is real: restrict to resolved deals (won + lost) and cohorts old enough to have closed. Only then slice." },
      { text: "That Dana is reading the chart wrong.", explanation: "Maybe, but you'd check the data before the reader." },
      { text: "That reps are lying in the CRM.", explanation: "Stage staleness is worth checking (Raj's point), but it's a specific hypothesis, not the first artifact to exclude." },
    ],
    correctIndex: 1,
  },
  {
    id: "q5-price-theory",
    chapter: 5,
    kind: "judgment",
    kbSlug: "funnel-conversion-analysis",
    prompt: `Slicing the drop by region × source shows it is almost entirely AMER × Outbound; every other segment is flat. What does that do to Dana's 'price increase' theory?`,
    options: [
      { text: "Supports it; AMER is the biggest region.", explanation: "Size doesn't matter here; the pattern does." },
      { text: "Mostly refutes it: a price increase applies to every region and source, so it should depress every segment, not one.", explanation: "Correct. A cause that touches everything can't explain a change that appears in one cell. That's the power of walking down the tree: it kills theories cheaply." },
      { text: "Says nothing; you'd need pricing data.", explanation: "You already have a strong signal from the shape of the change." },
      { text: "Confirms it, because outbound deals are more price-sensitive.", explanation: "You'd be inventing a mechanism to save the theory. Check Lena's vendor hypothesis instead: it predicts exactly this cell." },
    ],
    correctIndex: 1,
  },
  {
    id: "q5-velocity",
    chapter: 5,
    kind: "concept",
    kbSlug: "funnel-conversion-analysis",
    prompt: `In the affected segment, deals still reach *negotiation* at the normal rate but spend twice as long there and then mostly close lost. Which explanation fits best?`,
    options: [
      { text: "Reps are not updating stages (staleness).", explanation: "Staleness would show deals stuck in a stage without a later history row, not deals that eventually close lost." },
      { text: "Lead quality dropped: the deals look qualified on paper, get to the table, and then fail to close.", explanation: "Correct. A top-of-funnel quality problem often shows up *late* in the funnel as longer negotiation and more losses. It matches the vendor-change hypothesis." },
      { text: "A pipeline failure is dropping won deals.", explanation: "That would reduce won counts without lengthening negotiation." },
      { text: "The CFO's value-based definition is misleading everyone.", explanation: "The definition question is separate from a real change in stage velocity." },
    ],
    correctIndex: 1,
  },
  {
    id: "q5-sql-lag",
    chapter: 5,
    kind: "sql-prediction",
    kbSlug: "sql-toolkit-for-data-pms",
    prompt: `To compute days spent in each stage from the history log you write:

\`\`\`sql
SELECT deal_id, stage,
  julianday(LEAD(entered_at) OVER (PARTITION BY deal_id ORDER BY entered_at))
  - julianday(entered_at) AS days_in_stage
FROM deal_stage_history;
\`\`\`

What will \`days_in_stage\` be for each deal's most recent stage?`,
    options: [
      { text: "0", explanation: "There's no later row to subtract from, so the result isn't zero." },
      { text: "NULL, because LEAD has no next row within the partition.", explanation: "Correct. The last stage of every deal gets NULL. That's right for closed stages (they're terminal) but for *open* deals you may want COALESCE with the as-of date to measure time-so-far." },
      { text: "The days since the deal was created.", explanation: "That would need the first row, not the next." },
      { text: "An error: LEAD requires a default value.", explanation: "The default is optional; it defaults to NULL." },
    ],
    correctIndex: 1,
  },
  {
    id: "q5-report",
    chapter: 5,
    kind: "judgment",
    kbSlug: "proof-of-value-performance",
    prompt: `You've localized the drop to AMER × Outbound with longer negotiation. What do you bring to exec staff?`,
    options: [
      { text: "The chart, and let them debate.", explanation: "You'd be back to four theories. RCA ends with a claim, not a picture." },
      { text: "A cause, its size (deals and dollars affected), the evidence that rules out the alternatives, and a proposed fix with an owner.", explanation: "Correct. Root-cause work is done when someone can act on it. Sizing lets Sofia weigh the fix; ruling out alternatives is what earns trust." },
      { text: "A recommendation to fire the vendor.", explanation: "Too far, too fast. Propose reverting the scoring model and re-qualifying open deals; let Lena decide on the vendor." },
      { text: "A request for more data before concluding.", explanation: "Sometimes right, but here the evidence is concentrated and the alternatives are refuted. Delay has a cost." },
    ],
    correctIndex: 1,
  },

  // ---------------- Chapter 6 ----------------
  {
    id: "q6-two-revenues",
    chapter: 6,
    kind: "judgment",
    kbSlug: "ontology-as-infrastructure",
    prompt: `Board deck says 7.77M (transactions), sales deck says 6.84M (closed_won amounts). Tomás asks which is right. Your answer?`,
    options: [
      { text: "The transactions number, because cash is truth.", explanation: "Cash is one truth. Bookings is the truth Sales is managed on. Picking one silently makes the other team wrong." },
      { text: "Neither is wrong; they are two metrics (bookings vs revenue). Name both, show the bridge between them (renewals, upsells, removed duplicates), and put both on the slide with definitions.", explanation: "Correct. This is the ontology moment: the same word meant two things. The deliverable is names, owners, and a reconciliation, not a winner." },
      { text: "Average them.", explanation: "Produces a number nobody can reproduce." },
      { text: "Use whichever is higher for the board.", explanation: "That's how trust is lost with a CFO." },
    ],
    correctIndex: 1,
  },
  {
    id: "q6-ontology",
    chapter: 6,
    kind: "concept",
    kbSlug: "ontology-as-infrastructure",
    prompt: `Why did enterprises manage without formal ontologies for so long, and what changed?`,
    options: [
      { text: "Data was small; now it's big.", explanation: "Volume isn't the issue; meaning is." },
      { text: "Humans silently resolved ambiguity ('which revenue?') in every conversation. Autonomous agents can't; they take the first definition they find and act on it.", explanation: "Correct. The ontology gap became the AI gap the moment software started acting on business terms without a human in the loop." },
      { text: "Regulators now require them.", explanation: "Some regulation touches definitions, but the driver in 2026 is agent reliability." },
      { text: "Nothing changed; ontologies are still optional.", explanation: "Optional until an agent reports bookings as revenue to the board." },
    ],
    correctIndex: 1,
  },
  {
    id: "q6-agent-eval",
    chapter: 6,
    kind: "judgment",
    kbSlug: "agent-observability-gap",
    prompt: `The agent pilot team says they have full observability (latency, tokens, error rate) and asks to let the agent answer executives' revenue questions. What do you ask for first?`,
    options: [
      { text: "A faster model.", explanation: "Speed isn't the risk." },
      { text: "An evaluation set: known questions with agreed answers from the semantic contract, run before and after every change, so you know whether the agent is *right*, not just running.", explanation: "Correct. Monitoring says it ran; evaluation says it reasoned correctly. Without it you're watching failure at machine speed." },
      { text: "More dashboards.", explanation: "Dashboards report what happened; they don't judge correctness." },
      { text: "That the agent be blocked entirely.", explanation: "Unnecessary if you gate it behind definitions and an eval set." },
    ],
    correctIndex: 1,
  },
  {
    id: "q6-sql-running",
    chapter: 6,
    kind: "sql-prediction",
    kbSlug: "sql-toolkit-for-data-pms",
    prompt: `To build a running revenue total you write:

\`\`\`sql
SELECT month, SUM(revenue) OVER (ORDER BY month) AS running_total
FROM (
  SELECT substr(transaction_date, 1, 7) AS month, SUM(amount) AS revenue
  FROM transactions GROUP BY month
);
\`\`\`

Why aggregate in the subquery before the window?`,
    options: [
      { text: "Windows can't be used on raw tables.", explanation: "They can; that's not the reason." },
      { text: "So there is one row per month first; the window then accumulates month totals in order. Without it, the running total would step up on every transaction row.", explanation: "Correct. Aggregate to the grain you want to report, then apply the window. Grain first, window second." },
      { text: "Because SUM OVER requires GROUP BY.", explanation: "It doesn't; the subquery is about grain, not a syntax requirement." },
      { text: "For performance only.", explanation: "The result would be different, not just slower." },
    ],
    correctIndex: 1,
  },
  {
    id: "q6-lean-ai",
    chapter: 6,
    kind: "concept",
    kbSlug: "lean-ai-cost-economics",
    prompt: `Finance asks why the agent pilot's bill is so high. What's the 'Lean AI' move?`,
    options: [
      { text: "Switch everything to the smallest model.", explanation: "Quality collapses on the hard questions." },
      { text: "Route by difficulty: small, task-specific models for the high-volume well-defined queries, the frontier model only for the open-ended fraction. Report cost per correct answer.", explanation: "Correct. Cost-per-outcome, not raw capability, is what a board reads. Model choice becomes a product-tiering decision." },
      { text: "Cap the number of questions per user.", explanation: "Rationing use doesn't fix cost per answer." },
      { text: "Keep the frontier model but cache answers.", explanation: "Helps a little for repeated questions; doesn't change the economics of new ones." },
    ],
    correctIndex: 1,
  },
];

export function quizForChapter(chapter: number): QuizQuestion[] {
  return quizQuestions.filter((q) => q.chapter === chapter);
}
