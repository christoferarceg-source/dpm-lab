// Meridian sales-domain dataset for SQL & Python practice.
//
// Generated deterministically from a fixed seed, so the browser and the
// Node verification script (scripts/compute-expected.mts) produce exactly
// the same rows. Change the seed or the generator and re-run
// `npm run verify:answers` to refresh every exercise's expected result.
//
// Tables
//   accounts            customer companies
//   customers           contacts at those accounts
//   deals               one row per opportunity (current stage = CRM value)
//   deal_stage_history  append-only log of stage transitions
//   transactions        money movements against closed_won deals
//   pipeline_runs       daily run log for three data pipelines
//   dashboard_views     usage events for two dashboards
//
// Planted data-quality problems (found by the Chapter 3 exercises):
//   - duplicate rows in transactions and deal_stage_history
//   - deals whose CRM stage lags behind the latest stage_history row
//   - closed deals with a NULL closed_date
//   - a 3-day failed-run streak on gold_sales_metrics, a row-count anomaly
// Planted business signal (Chapter 5): AMER Outbound conversion collapses
// for deals created in May–June 2026 after a lead-scoring vendor change.

export const AS_OF_DATE = "2026-08-31";
export const SEED = 2;

export type Account = {
  account_id: string;
  account_name: string;
  industry: string;
  region: "AMER" | "EMEA" | "APAC";
  tier: "Enterprise" | "Mid-Market" | "SMB";
  created_date: string;
};

export type Customer = {
  customer_id: string;
  account_id: string;
  full_name: string;
  role: string;
  email: string;
};

export type Stage = "prospecting" | "qualified" | "proposal" | "negotiation" | "closed_won" | "closed_lost";
export const STAGE_ORDER: Stage[] = ["prospecting", "qualified", "proposal", "negotiation", "closed_won", "closed_lost"];

export type Deal = {
  deal_id: string;
  account_id: string;
  owner: string;
  stage: Stage;
  amount: number;
  source: "Inbound" | "Outbound" | "Referral";
  created_date: string;
  closed_date: string | null;
};

export type DealStageHistory = {
  history_id: string;
  deal_id: string;
  stage: Stage;
  entered_at: string; // YYYY-MM-DD HH:MM:SS
};

export type Transaction = {
  transaction_id: string;
  deal_id: string;
  amount: number;
  transaction_date: string;
  type: "initial" | "renewal" | "upsell";
};

export type PipelineRun = {
  run_id: string;
  pipeline: "crm_deals_ingest" | "transactions_ingest" | "gold_sales_metrics";
  run_date: string;
  started_at: string;
  finished_at: string | null;
  status: "success" | "failed" | "late";
  rows_in: number;
  rows_out: number;
};

export type DashboardView = {
  view_id: string;
  dashboard: "Pipeline Report (legacy)" | "Sales Funnel Accelerator";
  viewer_id: string;
  viewer_role: "Sales Rep" | "Sales Manager" | "RevOps" | "Finance" | "Executive";
  viewed_at: string;
};

export type Dataset = {
  accounts: Account[];
  customers: Customer[];
  deals: Deal[];
  deal_stage_history: DealStageHistory[];
  transactions: Transaction[];
  pipeline_runs: PipelineRun[];
  dashboard_views: DashboardView[];
};

// ---------- deterministic PRNG (mulberry32) ----------
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------- date helpers (UTC arithmetic, no timezone dependence) ----------
const DAY_MS = 86_400_000;
const EPOCH_2026 = Date.UTC(2026, 0, 1);
function dayToIso(day: number): string {
  return new Date(EPOCH_2026 + day * DAY_MS).toISOString().slice(0, 10);
}
function isoToDay(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Math.round((Date.UTC(y, m - 1, d) - EPOCH_2026) / DAY_MS);
}
function pad(n: number): string {
  return String(n).padStart(2, "0");
}
function ts(day: number, hour: number, minute: number): string {
  return `${dayToIso(day)} ${pad(hour)}:${pad(minute)}:00`;
}
const AS_OF_DAY = isoToDay(AS_OF_DATE);

// ---------- name pools ----------
const COMPANY_NAMES = [
  "Northwind Traders", "Globex Logistics", "Initech Software", "Umbrella Health", "Hooli Media",
  "Wayne Manufacturing", "Stark Analytics", "Wonka Foods", "Acme Robotics", "Vandelay Imports",
  "Pied Piper Cloud", "Dunder Paper Co", "Sterling Cooper", "Cyberdyne Systems", "Tyrell Bio",
  "Oscorp Materials", "Gringotts Fintech", "Massive Dynamic", "Aperture Labs", "Soylent Nutrition",
  "Bluth Homes", "Prestige Worldwide", "Wernham Hogg", "Los Pollos Foods", "Buy n Large Retail",
  "Monarch Solutions", "Ollivander Supply", "Rekall Travel", "Zorg Industries", "Nakatomi Trading",
  "Brawndo Beverages", "Virtucon", "Kwik-E-Mart Group", "InGen Life Sciences", "Weyland Energy",
  "Cheers Hospitality", "Mooby Entertainment", "Oceanic Airlines", "Paper Street Soap", "Sirius Cybernetics",
];
const INDUSTRIES = ["Retail", "Logistics", "Technology", "Healthcare", "Media", "Manufacturing", "Financial Services", "Consumer Goods", "Energy", "Hospitality"];
const FIRST_NAMES = ["Priya", "Marcus", "Elena", "Sam", "Grace", "Tom", "Nadia", "Liam", "Yuki", "Carlos", "Aisha", "Ben", "Chloe", "Dev", "Fatima", "Hugo", "Ines", "Jonas", "Keiko", "Luis", "Maya", "Noah", "Olivia", "Pablo", "Rania", "Sofia", "Tariq", "Uma", "Victor", "Wen"];
const LAST_NAMES = ["Shah", "Lee", "Petrova", "Okafor", "Muller", "Hidayat", "Farouk", "O'Connor", "Tanaka", "Mendes", "Khan", "Novak", "Dubois", "Rao", "Haddad", "Silva", "Costa", "Berg", "Sato", "Ortiz", "Iyer", "Fischer", "Martin", "Rossi", "Nasser", "Moreno", "Ali", "Nair", "Chen", "Larsen"];
const ROLES = ["VP Operations", "Data Lead", "COO", "Founder", "Director of Analytics", "Procurement Lead", "VP Marketing", "Plant Manager", "Head of Data", "Ops Manager", "CFO", "IT Director"];
const REPS = ["Jordan Blake", "Priya Nair", "Meiling Zhao", "Diego Alvarez", "Amara Osei"];

// ---------- generator ----------
export function generateDataset(seed: number = SEED): Dataset {
  const rand = mulberry32(seed);
  const randInt = (lo: number, hi: number) => lo + Math.floor(rand() * (hi - lo + 1));
  const pick = <T,>(arr: readonly T[]): T => arr[Math.floor(rand() * arr.length)];
  const chance = (p: number) => rand() < p;

  // accounts
  const accounts: Account[] = COMPANY_NAMES.map((name, i) => {
    const r = rand();
    const region: Account["region"] = r < 0.5 ? "AMER" : r < 0.8 ? "EMEA" : "APAC";
    const t = rand();
    const tier: Account["tier"] = t < 0.25 ? "Enterprise" : t < 0.65 ? "Mid-Market" : "SMB";
    return {
      account_id: `ACC-${pad(i + 1).padStart(3, "0")}`,
      account_name: name,
      industry: pick(INDUSTRIES),
      region,
      tier,
      created_date: dayToIso(-randInt(30, 700)),
    };
  });

  // customers: 2 per account
  const customers: Customer[] = [];
  for (const a of accounts) {
    for (let k = 0; k < 2; k++) {
      const fn = pick(FIRST_NAMES);
      const ln = pick(LAST_NAMES);
      const domain = a.account_name.toLowerCase().replace(/[^a-z]/g, "").slice(0, 10);
      customers.push({
        customer_id: `CUS-${String(customers.length + 1).padStart(3, "0")}`,
        account_id: a.account_id,
        full_name: `${fn} ${ln}`,
        role: pick(ROLES),
        email: `${fn.toLowerCase()}.${ln.toLowerCase().replace(/[^a-z]/g, "")}@${domain}.example`,
      });
    }
  }

  // deals + stage history
  const deals: Deal[] = [];
  const history: DealStageHistory[] = [];
  const tierBase: Record<Account["tier"], [number, number]> = {
    Enterprise: [60000, 220000],
    "Mid-Market": [18000, 70000],
    SMB: [4000, 20000],
  };
  const N_DEALS = 420;
  for (let i = 0; i < N_DEALS; i++) {
    const account = pick(accounts);
    const createdDay = randInt(0, isoToDay("2026-08-20"));
    const createdMonth = Number(dayToIso(createdDay).slice(5, 7));
    const s = rand();
    const source: Deal["source"] = s < 0.35 ? "Inbound" : s < 0.75 ? "Outbound" : "Referral";
    const owner = pick(REPS);
    const [lo, hi] = tierBase[account.tier];
    const amount = Math.round(randInt(lo, hi) / 500) * 500;

    // win probability
    let pWin = 0.55;
    if (source === "Referral") pWin += 0.15;
    if (source === "Inbound") pWin += 0.05;
    if (source === "Outbound") pWin -= 0.1;
    if (account.region === "AMER") pWin += 0.05;
    if (owner === "Jordan Blake") pWin += 0.08;
    if (owner === "Meiling Zhao") pWin -= 0.05;
    // planted signal: AMER Outbound deals created May–June collapse
    const inDropSegment = account.region === "AMER" && source === "Outbound" && (createdMonth === 5 || createdMonth === 6);
    if (inDropSegment) pWin -= 0.45;

    // walk the stages
    const durations: Record<Exclude<Stage, "closed_won" | "closed_lost">, [number, number]> = {
      prospecting: [2, 12],
      qualified: [4, 18],
      proposal: [6, 24],
      negotiation: [4, 18],
    };
    let day = createdDay;
    let currentStage: Stage = "prospecting";
    let closedDay: number | null = null;
    const pushHist = (stage: Stage, d: number) =>
      history.push({
        history_id: `H-${String(history.length + 1).padStart(5, "0")}`,
        deal_id: `DEAL-${String(i + 1).padStart(3, "0")}`,
        stage,
        entered_at: ts(d, randInt(8, 18), randInt(0, 59)),
      });
    pushHist("prospecting", day);

    const path: Stage[] = ["qualified", "proposal", "negotiation"];
    // where does the deal die if it dies? decide outcome first
    const willWin = chance(pWin);
    // losing deals drop out at a random stage; winning deals go all the way
    const dropAfter = willWin ? 3 : randInt(0, 3); // number of pre-close stages completed before loss
    let finished = false;
    for (let k = 0; k < path.length; k++) {
      const prev = currentStage as Exclude<Stage, "closed_won" | "closed_lost">;
      let [dlo, dhi] = durations[prev];
      if (inDropSegment && prev === "negotiation") [dlo, dhi] = [12, 30];
      day += randInt(dlo, dhi);
      if (!willWin && k >= dropAfter) {
        // lose from the current stage
        if (day <= AS_OF_DAY) {
          currentStage = "closed_lost";
          closedDay = day;
          pushHist("closed_lost", day);
        }
        finished = true;
        break;
      }
      if (day > AS_OF_DAY) {
        finished = true;
        break;
      }
      currentStage = path[k];
      pushHist(currentStage, day);
    }
    if (!finished) {
      // completed negotiation → close
      let [dlo, dhi] = durations.negotiation;
      if (inDropSegment) [dlo, dhi] = [12, 30];
      day += randInt(dlo, dhi);
      if (day <= AS_OF_DAY) {
        currentStage = willWin ? "closed_won" : "closed_lost";
        closedDay = day;
        pushHist(currentStage, day);
      }
    }

    deals.push({
      deal_id: `DEAL-${String(i + 1).padStart(3, "0")}`,
      account_id: account.account_id,
      owner,
      stage: currentStage,
      amount,
      source,
      created_date: dayToIso(createdDay),
      closed_date: closedDay === null ? null : dayToIso(closedDay),
    });
  }

  // transactions for closed_won
  const transactions: Transaction[] = [];
  const addTxn = (deal_id: string, amount: number, day: number, type: Transaction["type"]) =>
    transactions.push({
      transaction_id: `TXN-${String(transactions.length + 1).padStart(4, "0")}`,
      deal_id,
      amount,
      transaction_date: dayToIso(day),
      type,
    });
  for (const d of deals) {
    if (d.stage !== "closed_won" || !d.closed_date) continue;
    const closedDay = isoToDay(d.closed_date);
    addTxn(d.deal_id, d.amount, closedDay, "initial");
    if (chance(0.3)) {
      const upDay = closedDay + randInt(20, 70);
      if (upDay <= AS_OF_DAY) addTxn(d.deal_id, Math.round((d.amount * randInt(8, 25)) / 100 / 100) * 100, upDay, "upsell");
    }
    if (chance(0.15)) {
      const renDay = closedDay + randInt(60, 120);
      if (renDay <= AS_OF_DAY) addTxn(d.deal_id, Math.round((d.amount * randInt(30, 60)) / 100 / 100) * 100, renDay, "renewal");
    }
  }

  // ---- planted data-quality problems ----
  // (a) duplicate transactions: 5 initial rows re-ingested with new ids
  const initials = transactions.filter((t) => t.type === "initial");
  for (let k = 0; k < 5; k++) {
    const src = initials[Math.floor(((k + 1) * 37) % initials.length)];
    addTxn(src.deal_id, src.amount, isoToDay(src.transaction_date), src.type);
  }
  // (b) duplicate stage-history rows: 6 rows appended twice
  for (let k = 0; k < 6; k++) {
    const src = history[Math.floor(((k + 1) * 151) % history.length)];
    history.push({ ...src, history_id: `H-${String(history.length + 1).padStart(5, "0")}` });
  }
  // (c) stale CRM stage: 4 deals where deals.stage wasn't updated after the
  //     latest history row (history says closed_won, CRM still negotiation)
  const wonDeals = deals.filter((d) => d.stage === "closed_won");
  for (let k = 0; k < 4; k++) {
    const d = wonDeals[Math.floor(((k + 1) * 23) % wonDeals.length)];
    if (d.stage === "closed_won") {
      d.stage = "negotiation";
      d.closed_date = null;
    }
  }
  // (d) closed deals missing closed_date: 3 closed_lost deals
  const lostDeals = deals.filter((d) => d.stage === "closed_lost" && d.closed_date);
  for (let k = 0; k < 3; k++) {
    const d = lostDeals[Math.floor(((k + 1) * 17) % lostDeals.length)];
    d.closed_date = null;
  }

  // pipeline runs: 2026-04-01 .. AS_OF, three pipelines daily
  const pipeline_runs: PipelineRun[] = [];
  const pipelines: PipelineRun["pipeline"][] = ["crm_deals_ingest", "transactions_ingest", "gold_sales_metrics"];
  const firstRunDay = isoToDay("2026-04-01");
  for (let day = firstRunDay; day <= AS_OF_DAY; day++) {
    const iso = dayToIso(day);
    const dealsSoFar = deals.filter((d) => isoToDay(d.created_date) <= day).length;
    const txnSoFar = transactions.filter((t) => isoToDay(t.transaction_date) <= day).length;
    for (const p of pipelines) {
      const startMin = randInt(0, 40);
      const baseHour = p === "crm_deals_ingest" ? 2 : p === "transactions_ingest" ? 3 : 4;
      let status: PipelineRun["status"] = "success";
      let durationMin = p === "gold_sales_metrics" ? randInt(18, 35) : randInt(6, 15);
      // planted failures
      if (p === "gold_sales_metrics" && (iso === "2026-06-14" || iso === "2026-06-15" || iso === "2026-06-16")) status = "failed";
      if (p === "crm_deals_ingest" && iso === "2026-07-22") status = "failed";
      if (p === "transactions_ingest" && iso === "2026-05-09") status = "failed";
      if (status === "success" && chance(0.04)) {
        status = "late";
        durationMin += randInt(40, 90);
      }
      let rows_in = p === "crm_deals_ingest" ? dealsSoFar : p === "transactions_ingest" ? txnSoFar : dealsSoFar + txnSoFar;
      rows_in += randInt(-3, 3);
      let rows_out = status === "failed" ? 0 : rows_in - randInt(0, 4);
      // planted anomaly: upstream sent a partial file
      if (p === "crm_deals_ingest" && iso === "2026-07-05") rows_out = Math.round(rows_out * 0.3);
      pipeline_runs.push({
        run_id: `RUN-${String(pipeline_runs.length + 1).padStart(4, "0")}`,
        pipeline: p,
        run_date: iso,
        started_at: ts(day, baseHour, startMin),
        finished_at: status === "failed" ? null : ts(day, baseHour + Math.floor((startMin + durationMin) / 60), (startMin + durationMin) % 60),
        status,
        rows_in: Math.max(0, rows_in),
        rows_out: Math.max(0, rows_out),
      });
    }
  }

  // dashboard views: legacy dashboard declining; new one launched 2026-06-01 and growing
  const dashboard_views: DashboardView[] = [];
  const viewers: { id: string; role: DashboardView["viewer_role"] }[] = [];
  const roleMix: DashboardView["viewer_role"][] = ["Sales Rep", "Sales Rep", "Sales Rep", "Sales Rep", "Sales Manager", "Sales Manager", "RevOps", "Finance", "Executive"];
  for (let i = 0; i < 32; i++) viewers.push({ id: `U-${pad(i + 1)}`, role: roleMix[i % roleMix.length] });
  const launchDay = isoToDay("2026-06-01");
  for (let day = firstRunDay; day <= AS_OF_DAY; day++) {
    const weekday = new Date(EPOCH_2026 + day * DAY_MS).getUTCDay();
    if (weekday === 0 || weekday === 6) continue;
    // legacy: ~6 views/day before launch, fading to ~1 after
    const legacyViews = day < launchDay ? randInt(4, 8) : randInt(0, 2);
    for (let k = 0; k < legacyViews; k++) {
      const v = viewers[randInt(0, 11)]; // only a dozen people ever used it
      dashboard_views.push({
        view_id: `V-${String(dashboard_views.length + 1).padStart(4, "0")}`,
        dashboard: "Pipeline Report (legacy)",
        viewer_id: v.id,
        viewer_role: v.role,
        viewed_at: ts(day, randInt(8, 18), randInt(0, 59)),
      });
    }
    if (day >= launchDay) {
      const weeksSince = Math.floor((day - launchDay) / 7);
      const newViews = randInt(3, 6) + Math.min(weeksSince * 2, 18);
      const audience = Math.min(32, 10 + weeksSince * 2);
      for (let k = 0; k < newViews; k++) {
        const v = viewers[randInt(0, audience - 1)];
        dashboard_views.push({
          view_id: `V-${String(dashboard_views.length + 1).padStart(4, "0")}`,
          dashboard: "Sales Funnel Accelerator",
          viewer_id: v.id,
          viewer_role: v.role,
          viewed_at: ts(day, randInt(8, 18), randInt(0, 59)),
        });
      }
    }
  }

  return { accounts, customers, deals, deal_stage_history: history, transactions, pipeline_runs, dashboard_views };
}

// Singleton for the app (generation takes a few ms).
let cached: Dataset | null = null;
export function getDataset(): Dataset {
  if (!cached) cached = generateDataset();
  return cached;
}

// ---------- SQL ----------
export const SCHEMA_SQL = `
CREATE TABLE accounts (
  account_id TEXT PRIMARY KEY,
  account_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  region TEXT NOT NULL,
  tier TEXT NOT NULL,
  created_date TEXT NOT NULL
);
CREATE TABLE customers (
  customer_id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(account_id),
  full_name TEXT NOT NULL,
  role TEXT NOT NULL,
  email TEXT NOT NULL
);
CREATE TABLE deals (
  deal_id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(account_id),
  owner TEXT NOT NULL,
  stage TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  source TEXT NOT NULL,
  created_date TEXT NOT NULL,
  closed_date TEXT
);
CREATE TABLE deal_stage_history (
  history_id TEXT PRIMARY KEY,
  deal_id TEXT NOT NULL REFERENCES deals(deal_id),
  stage TEXT NOT NULL,
  entered_at TEXT NOT NULL
);
CREATE TABLE transactions (
  transaction_id TEXT PRIMARY KEY,
  deal_id TEXT NOT NULL REFERENCES deals(deal_id),
  amount NUMERIC NOT NULL,
  transaction_date TEXT NOT NULL,
  type TEXT NOT NULL
);
CREATE TABLE pipeline_runs (
  run_id TEXT PRIMARY KEY,
  pipeline TEXT NOT NULL,
  run_date TEXT NOT NULL,
  started_at TEXT NOT NULL,
  finished_at TEXT,
  status TEXT NOT NULL,
  rows_in INTEGER NOT NULL,
  rows_out INTEGER NOT NULL
);
CREATE TABLE dashboard_views (
  view_id TEXT PRIMARY KEY,
  dashboard TEXT NOT NULL,
  viewer_id TEXT NOT NULL,
  viewer_role TEXT NOT NULL,
  viewed_at TEXT NOT NULL
);
`;

export const TABLE_DOCS: { table: keyof Dataset; description: string; columns: string[] }[] = [
  { table: "accounts", description: "Customer companies", columns: ["account_id", "account_name", "industry", "region", "tier", "created_date"] },
  { table: "customers", description: "Contacts at accounts", columns: ["customer_id", "account_id", "full_name", "role", "email"] },
  { table: "deals", description: "One row per opportunity; stage is the current CRM value", columns: ["deal_id", "account_id", "owner", "stage", "amount", "source", "created_date", "closed_date"] },
  { table: "deal_stage_history", description: "Append-only log of stage transitions", columns: ["history_id", "deal_id", "stage", "entered_at"] },
  { table: "transactions", description: "Money movements against closed_won deals", columns: ["transaction_id", "deal_id", "amount", "transaction_date", "type"] },
  { table: "pipeline_runs", description: "Daily run log for 3 pipelines (Apr–Aug 2026)", columns: ["run_id", "pipeline", "run_date", "started_at", "finished_at", "status", "rows_in", "rows_out"] },
  { table: "dashboard_views", description: "Usage events for the legacy and new dashboards", columns: ["view_id", "dashboard", "viewer_id", "viewer_role", "viewed_at"] },
];

function sqlLit(v: string | number | null): string {
  if (v === null || v === undefined) return "NULL";
  if (typeof v === "number") return String(v);
  return `'${v.replace(/'/g, "''")}'`;
}

function insertBatch(table: string, rows: Record<string, string | number | null>[]): string[] {
  const out: string[] = [];
  const BATCH = 200;
  for (let i = 0; i < rows.length; i += BATCH) {
    const chunk = rows.slice(i, i + BATCH);
    const values = chunk.map((r) => `(${Object.values(r).map(sqlLit).join(",")})`).join(",\n");
    out.push(`INSERT INTO ${table} VALUES\n${values};`);
  }
  return out;
}

export function buildSeedSql(ds: Dataset = getDataset()): string {
  return [
    ...insertBatch("accounts", ds.accounts),
    ...insertBatch("customers", ds.customers),
    ...insertBatch("deals", ds.deals),
    ...insertBatch("deal_stage_history", ds.deal_stage_history),
    ...insertBatch("transactions", ds.transactions),
    ...insertBatch("pipeline_runs", ds.pipeline_runs),
    ...insertBatch("dashboard_views", ds.dashboard_views),
  ].join("\n");
}
