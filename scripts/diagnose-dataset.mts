// Sanity-check the generated dataset: row counts, planted signals, SQLite features.
import initSqlJs from "sql.js";
import { generateDataset, SCHEMA_SQL, buildSeedSql } from "../content/dataset";

const ds = generateDataset();
for (const [k, v] of Object.entries(ds)) console.log(`${k}: ${(v as unknown[]).length} rows`);

const SQL = await initSqlJs();
const db = new SQL.Database();
db.run(SCHEMA_SQL);
const t0 = Date.now();
db.run(buildSeedSql(ds));
console.log(`seed load: ${Date.now() - t0} ms`);

function show(label: string, q: string) {
  const r = db.exec(q);
  console.log(`\n-- ${label}`);
  if (!r.length) return console.log("(none)");
  console.log(r[0].columns.join(" | "));
  for (const row of r[0].values) console.log(row.join(" | "));
}
show("sqlite version", "select sqlite_version()");
show("window fn works", "select deal_id, row_number() over (order by deal_id) rn from deals limit 2");
show("stage distribution", "select stage, count(*) n, sum(amount) amt from deals group by stage order by n desc");
show("conversion by created month (all)", `
select substr(created_date,1,7) m,
  round(1.0*sum(stage='closed_won')/sum(stage in ('closed_won','closed_lost')),3) conv,
  sum(stage in ('closed_won','closed_lost')) closed, count(*) total
from deals group by m order by m`);
show("conversion by month, AMER Outbound vs rest", `
select substr(d.created_date,1,7) m,
  round(1.0*sum(case when a.region='AMER' and d.source='Outbound' and d.stage='closed_won' then 1 else 0 end)/nullif(sum(case when a.region='AMER' and d.source='Outbound' and d.stage in ('closed_won','closed_lost') then 1 else 0 end),0),2) amer_outbound,
  round(1.0*sum(case when not (a.region='AMER' and d.source='Outbound') and d.stage='closed_won' then 1 else 0 end)/nullif(sum(case when not (a.region='AMER' and d.source='Outbound') and d.stage in ('closed_won','closed_lost') then 1 else 0 end),0),2) rest,
  sum(case when a.region='AMER' and d.source='Outbound' then 1 else 0 end) n_seg
from deals d join accounts a using(account_id) group by m order by m`);
show("dup transactions", "select deal_id, amount, transaction_date, count(*) c from transactions group by 1,2,3 having c>1");
show("dup history", "select deal_id, stage, entered_at, count(*) c from deal_stage_history group by 1,2,3 having c>1");
show("stale stage", `with latest as (select deal_id, stage, row_number() over (partition by deal_id order by entered_at desc, history_id desc) rn from deal_stage_history)
select d.deal_id, d.stage crm_stage, l.stage latest_hist from deals d join latest l on l.deal_id=d.deal_id and rn=1 where d.stage<>l.stage`);
show("closed without closed_date", "select deal_id, stage from deals where stage in ('closed_won','closed_lost') and closed_date is null");
show("failed runs", "select pipeline, run_date, status from pipeline_runs where status='failed' order by run_date");
show("anomaly day", "select run_date, rows_in, rows_out from pipeline_runs where pipeline='crm_deals_ingest' and run_date between '2026-07-03' and '2026-07-07'");
show("dashboard views by month", "select dashboard, substr(viewed_at,1,7) m, count(*) views, count(distinct viewer_id) viewers from dashboard_views group by 1,2 order by 2,1");
show("txn total vs won", "select (select sum(amount) from transactions) revenue, (select sum(amount) from deals where stage='closed_won') won_value");
