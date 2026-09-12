// Seed dataset for SQL & Python practice: the "Sales Funnel Accelerator"
// worked example from the 6-Week Data Products Playbook.
//
// North Star metric   : revenue_generated      (sum of transaction amounts)
// Functional metric    : deals_closed_value     (sum of amount for closed_won deals)
// Granular metric       : conversion_rate        (closed_won deals / total non-open deals)
//
// This exact schema/data is used by both the SQL (sql.js) and Python
// (Pyodide/pandas) practice modules so the two skills map onto the same
// business questions.

export type Account = {
  account_id: string;
  account_name: string;
  industry: string;
  region: "AMER" | "EMEA" | "APAC";
  tier: "Enterprise" | "Mid-Market" | "SMB";
};

export type Customer = {
  customer_id: string;
  account_id: string;
  full_name: string;
  role: string;
  email: string;
};

export type Deal = {
  deal_id: string;
  account_id: string;
  owner: string;
  stage:
    | "prospecting"
    | "qualified"
    | "proposal"
    | "negotiation"
    | "closed_won"
    | "closed_lost";
  amount: number;
  source: "Inbound" | "Outbound" | "Referral";
  created_date: string; // YYYY-MM-DD
  closed_date: string | null;
};

export type Transaction = {
  transaction_id: string;
  deal_id: string;
  amount: number;
  transaction_date: string; // YYYY-MM-DD
  type: "initial" | "renewal" | "upsell";
};

export const accounts: Account[] = [
  { account_id: "ACC-001", account_name: "Northwind Traders", industry: "Retail", region: "AMER", tier: "Enterprise" },
  { account_id: "ACC-002", account_name: "Globex Logistics", industry: "Logistics", region: "AMER", tier: "Mid-Market" },
  { account_id: "ACC-003", account_name: "Initech Software", industry: "Technology", region: "AMER", tier: "SMB" },
  { account_id: "ACC-004", account_name: "Umbrella Health", industry: "Healthcare", region: "EMEA", tier: "Enterprise" },
  { account_id: "ACC-005", account_name: "Hooli Media", industry: "Media", region: "EMEA", tier: "Mid-Market" },
  { account_id: "ACC-006", account_name: "Wayne Manufacturing", industry: "Manufacturing", region: "EMEA", tier: "Enterprise" },
  { account_id: "ACC-007", account_name: "Stark Analytics", industry: "Technology", region: "APAC", tier: "Mid-Market" },
  { account_id: "ACC-008", account_name: "Wonka Foods", industry: "Consumer Goods", region: "APAC", tier: "SMB" },
];

export const customers: Customer[] = [
  { customer_id: "CUS-001", account_id: "ACC-001", full_name: "Priya Shah", role: "VP Operations", email: "priya.shah@northwind.example" },
  { customer_id: "CUS-002", account_id: "ACC-001", full_name: "Marcus Lee", role: "Data Lead", email: "marcus.lee@northwind.example" },
  { customer_id: "CUS-003", account_id: "ACC-002", full_name: "Elena Petrova", role: "COO", email: "elena.petrova@globex.example" },
  { customer_id: "CUS-004", account_id: "ACC-003", full_name: "Sam Okafor", role: "Founder", email: "sam.okafor@initech.example" },
  { customer_id: "CUS-005", account_id: "ACC-004", full_name: "Grace Muller", role: "Director of Analytics", email: "grace.muller@umbrella.example" },
  { customer_id: "CUS-006", account_id: "ACC-004", full_name: "Tom Hidayat", role: "Procurement Lead", email: "tom.hidayat@umbrella.example" },
  { customer_id: "CUS-007", account_id: "ACC-005", full_name: "Nadia Farouk", role: "VP Marketing", email: "nadia.farouk@hooli.example" },
  { customer_id: "CUS-008", account_id: "ACC-006", full_name: "Liam O'Connor", role: "Plant Manager", email: "liam.oconnor@wayne.example" },
  { customer_id: "CUS-009", account_id: "ACC-007", full_name: "Yuki Tanaka", role: "Head of Data", email: "yuki.tanaka@stark.example" },
  { customer_id: "CUS-010", account_id: "ACC-008", full_name: "Carlos Mendes", role: "Ops Manager", email: "carlos.mendes@wonka.example" },
];

export const deals: Deal[] = [
  { deal_id: "DEAL-001", account_id: "ACC-001", owner: "Jordan Blake", stage: "closed_won", amount: 84000, source: "Outbound", created_date: "2026-01-08", closed_date: "2026-02-14" },
  { deal_id: "DEAL-002", account_id: "ACC-001", owner: "Jordan Blake", stage: "closed_won", amount: 22000, source: "Referral", created_date: "2026-03-02", closed_date: "2026-03-28" },
  { deal_id: "DEAL-003", account_id: "ACC-002", owner: "Priya Nair", stage: "closed_won", amount: 46500, source: "Inbound", created_date: "2026-01-20", closed_date: "2026-02-25" },
  { deal_id: "DEAL-004", account_id: "ACC-002", owner: "Priya Nair", stage: "closed_lost", amount: 31000, source: "Outbound", created_date: "2026-02-10", closed_date: "2026-03-05" },
  { deal_id: "DEAL-005", account_id: "ACC-003", owner: "Priya Nair", stage: "closed_won", amount: 9800, source: "Inbound", created_date: "2026-02-01", closed_date: "2026-02-18" },
  { deal_id: "DEAL-006", account_id: "ACC-003", owner: "Priya Nair", stage: "qualified", amount: 14500, source: "Inbound", created_date: "2026-04-11", closed_date: null },
  { deal_id: "DEAL-007", account_id: "ACC-004", owner: "Jordan Blake", stage: "closed_won", amount: 156000, source: "Outbound", created_date: "2026-01-15", closed_date: "2026-03-10" },
  { deal_id: "DEAL-008", account_id: "ACC-004", owner: "Jordan Blake", stage: "negotiation", amount: 62000, source: "Referral", created_date: "2026-04-02", closed_date: null },
  { deal_id: "DEAL-009", account_id: "ACC-005", owner: "Meiling Zhao", stage: "closed_lost", amount: 28000, source: "Outbound", created_date: "2026-02-18", closed_date: "2026-03-22" },
  { deal_id: "DEAL-010", account_id: "ACC-005", owner: "Meiling Zhao", stage: "closed_won", amount: 33500, source: "Inbound", created_date: "2026-03-01", closed_date: "2026-03-29" },
  { deal_id: "DEAL-011", account_id: "ACC-006", owner: "Jordan Blake", stage: "closed_won", amount: 118000, source: "Referral", created_date: "2026-01-05", closed_date: "2026-02-20" },
  { deal_id: "DEAL-012", account_id: "ACC-006", owner: "Meiling Zhao", stage: "proposal", amount: 45000, source: "Outbound", created_date: "2026-04-18", closed_date: null },
  { deal_id: "DEAL-013", account_id: "ACC-007", owner: "Priya Nair", stage: "closed_won", amount: 27500, source: "Inbound", created_date: "2026-02-08", closed_date: "2026-03-01" },
  { deal_id: "DEAL-014", account_id: "ACC-007", owner: "Priya Nair", stage: "closed_lost", amount: 19000, source: "Inbound", created_date: "2026-03-15", closed_date: "2026-04-02" },
  { deal_id: "DEAL-015", account_id: "ACC-008", owner: "Meiling Zhao", stage: "closed_won", amount: 8200, source: "Referral", created_date: "2026-02-25", closed_date: "2026-03-12" },
  { deal_id: "DEAL-016", account_id: "ACC-008", owner: "Meiling Zhao", stage: "prospecting", amount: 11000, source: "Outbound", created_date: "2026-04-20", closed_date: null },
  { deal_id: "DEAL-017", account_id: "ACC-001", owner: "Jordan Blake", stage: "closed_lost", amount: 15000, source: "Inbound", created_date: "2026-03-18", closed_date: "2026-04-08" },
  { deal_id: "DEAL-018", account_id: "ACC-002", owner: "Priya Nair", stage: "closed_won", amount: 61000, source: "Referral", created_date: "2026-03-22", closed_date: "2026-04-25" },
  { deal_id: "DEAL-019", account_id: "ACC-004", owner: "Jordan Blake", stage: "closed_won", amount: 39500, source: "Inbound", created_date: "2026-03-30", closed_date: "2026-04-29" },
  { deal_id: "DEAL-020", account_id: "ACC-006", owner: "Meiling Zhao", stage: "closed_lost", amount: 22500, source: "Outbound", created_date: "2026-04-05", closed_date: "2026-04-30" },
];

// Transactions are recorded only against closed_won deals: an "initial"
// transaction when the deal closes, plus occasional "upsell"/"renewal".
export const transactions: Transaction[] = [
  { transaction_id: "TXN-001", deal_id: "DEAL-001", amount: 84000, transaction_date: "2026-02-14", type: "initial" },
  { transaction_id: "TXN-002", deal_id: "DEAL-001", amount: 12000, transaction_date: "2026-04-15", type: "upsell" },
  { transaction_id: "TXN-003", deal_id: "DEAL-002", amount: 22000, transaction_date: "2026-03-28", type: "initial" },
  { transaction_id: "TXN-004", deal_id: "DEAL-003", amount: 46500, transaction_date: "2026-02-25", type: "initial" },
  { transaction_id: "TXN-005", deal_id: "DEAL-005", amount: 9800, transaction_date: "2026-02-18", type: "initial" },
  { transaction_id: "TXN-006", deal_id: "DEAL-007", amount: 156000, transaction_date: "2026-03-10", type: "initial" },
  { transaction_id: "TXN-007", deal_id: "DEAL-007", amount: 34000, transaction_date: "2026-04-20", type: "renewal" },
  { transaction_id: "TXN-008", deal_id: "DEAL-010", amount: 33500, transaction_date: "2026-03-29", type: "initial" },
  { transaction_id: "TXN-009", deal_id: "DEAL-011", amount: 118000, transaction_date: "2026-02-20", type: "initial" },
  { transaction_id: "TXN-010", deal_id: "DEAL-013", amount: 27500, transaction_date: "2026-03-01", type: "initial" },
  { transaction_id: "TXN-011", deal_id: "DEAL-015", amount: 8200, transaction_date: "2026-03-12", type: "initial" },
  { transaction_id: "TXN-012", deal_id: "DEAL-018", amount: 61000, transaction_date: "2026-04-25", type: "initial" },
  { transaction_id: "TXN-013", deal_id: "DEAL-018", amount: 9000, transaction_date: "2026-04-30", type: "upsell" },
  { transaction_id: "TXN-014", deal_id: "DEAL-019", amount: 39500, transaction_date: "2026-04-29", type: "initial" },
];

export const SCHEMA_SQL = `
CREATE TABLE accounts (
  account_id TEXT PRIMARY KEY,
  account_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  region TEXT NOT NULL,
  tier TEXT NOT NULL
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

CREATE TABLE transactions (
  transaction_id TEXT PRIMARY KEY,
  deal_id TEXT NOT NULL REFERENCES deals(deal_id),
  amount NUMERIC NOT NULL,
  transaction_date TEXT NOT NULL,
  type TEXT NOT NULL
);
`;

function sqlLit(v: string | number | null): string {
  if (v === null) return "NULL";
  if (typeof v === "number") return String(v);
  return `'${v.replace(/'/g, "''")}'`;
}

export function buildSeedSql(): string {
  const parts: string[] = [];
  for (const a of accounts) {
    parts.push(
      `INSERT INTO accounts VALUES (${[a.account_id, a.account_name, a.industry, a.region, a.tier]
        .map(sqlLit)
        .join(", ")});`
    );
  }
  for (const c of customers) {
    parts.push(
      `INSERT INTO customers VALUES (${[c.customer_id, c.account_id, c.full_name, c.role, c.email]
        .map(sqlLit)
        .join(", ")});`
    );
  }
  for (const d of deals) {
    parts.push(
      `INSERT INTO deals VALUES (${[
        d.deal_id,
        d.account_id,
        d.owner,
        d.stage,
        d.amount,
        d.source,
        d.created_date,
        d.closed_date,
      ]
        .map(sqlLit)
        .join(", ")});`
    );
  }
  for (const t of transactions) {
    parts.push(
      `INSERT INTO transactions VALUES (${[t.transaction_id, t.deal_id, t.amount, t.transaction_date, t.type]
        .map(sqlLit)
        .join(", ")});`
    );
  }
  return parts.join("\n");
}
