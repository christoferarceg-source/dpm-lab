(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,6159,18994,77475,29187,136,36420,e=>{"use strict";var t=e.i(18050),a=e.i(22016),s=e.i(70703),n=e.i(71645),r=e.i(21683),o=e.i(74581),i=e.i(82364);function l(e){return window.addEventListener("hashchange",e),()=>window.removeEventListener("hashchange",e)}var d=e.i(6e4);let c=(0,s.default)(()=>e.A(91987).then(e=>e.CodeEditor),{loadableGenerated:{modules:[95931]},ssr:!1,loading:()=>(0,t.jsx)("div",{className:"h-[180px] rounded-lg border border-border bg-code-bg animate-pulse"})}),u={warmup:"Warm-up",core:"Core",advanced:"Advanced"},h={warmup:"bg-success-soft text-success",core:"bg-accent-soft text-accent",advanced:"bg-warn-soft text-warn"};function m(e,t){return"sql"!==t||e.includes("\n")?e:e.replace(/\s+(FROM|WHERE|GROUP BY|HAVING|ORDER BY|LIMIT|LEFT JOIN|JOIN|UNION)\s+/g,"\n$1 ").replace(/\)\s+SELECT\s+/g,")\nSELECT ").replace(/,\s+(\w+) AS \(/g,",\n$1 AS (").replace(/^WITH\s+/,"WITH ").trim()}function g({status:e}){let a="solved"===e?"Solved":"attempted"===e?"Attempted":"Not started";return(0,t.jsx)("span",{className:`inline-block w-2 h-2 rounded-full shrink-0 ${"solved"===e?"bg-success":"attempted"===e?"bg-warn":"bg-border"}`,title:a,"aria-label":a})}function p({exercise:e,kind:s,ensurePrepared:l,prepStatus:g,run:f,grade:y,renderResult:b}){let{recordAttempt:w}=(0,o.useProgress)(),[v,x]=(0,n.useState)(e.starter),[T,E]=(0,n.useState)(!1),[k,N]=(0,n.useState)(!1),[_,S]=(0,n.useState)(!1),[A,L]=(0,n.useState)(null),[P,M]=(0,n.useState)(null),O=d.units.find(t=>t.number===e.chapter),j=(0,n.useCallback)(async t=>{S(!0),M(null);try{await l();let a=await f(v);if(L(a),t)if(a.ok){let t=y(e.slug,a.payload);M(t),w(e.slug,s,v,t.passed)}else M({passed:!1,reason:"Fix the error above, then check again."}),w(e.slug,s,v,!1)}catch(e){L({ok:!1,error:e instanceof Error?e.message:String(e)})}finally{S(!1)}},[v,l,e.slug,y,s,w,f]),R=(0,i.getKbEntry)(e.dpmConnection.kbSlug);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"bg-surface border border-border rounded-xl p-5 space-y-4",children:[O&&(0,t.jsxs)(a.default,{href:`/chapters/${O.number}`,className:"text-xs text-muted hover:text-fg",children:[O.week," · ",O.title]}),(0,t.jsxs)("div",{className:"flex flex-wrap items-center gap-2",children:[(0,t.jsx)("h2",{className:"text-lg font-semibold",children:e.title}),(0,t.jsx)("span",{className:`text-xs px-2 py-0.5 rounded-full font-medium ${h[e.difficulty]}`,children:u[e.difficulty]})]}),(0,t.jsx)(r.Markdown,{className:"text-[0.95rem]",children:e.prompt})]}),(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsx)(c,{value:v,onChange:x,language:s}),(0,t.jsxs)("div",{className:"flex flex-wrap items-center gap-2",children:[(0,t.jsx)("button",{onClick:()=>j(!1),disabled:_,className:"px-4 py-2.5 rounded-xl text-sm font-semibold border-2 border-border bg-surface hover:border-accent disabled:opacity-50",children:"Run"}),(0,t.jsx)("button",{onClick:()=>j(!0),disabled:_,className:"px-5 py-2.5 rounded-xl text-sm font-semibold bg-accent text-accent-fg hover:opacity-90 disabled:opacity-50 node-shadow",children:_?"Running…":"Run & Check"}),(0,t.jsx)("button",{onClick:()=>x(e.starter),disabled:_,className:"px-3 py-2 rounded-md text-sm text-muted hover:text-fg disabled:opacity-50",children:"Reset"}),(0,t.jsx)("button",{onClick:()=>E(e=>!e),className:"px-3 py-2 rounded-md text-sm text-muted hover:text-fg ml-auto",children:T?"Hide hint":"Hint"}),(0,t.jsx)("button",{onClick:()=>N(e=>!e),className:"px-3 py-2 rounded-md text-sm text-muted hover:text-fg",children:k?"Hide solution":"Show solution"})]}),g&&(0,t.jsx)("p",{className:"text-sm text-muted",children:g}),T&&(0,t.jsx)("p",{className:"text-sm bg-warn-soft text-warn border border-warn/20 rounded-md px-3 py-2",children:e.hint}),k&&(0,t.jsxs)("div",{className:"bg-surface border border-border rounded-xl p-4 space-y-3 animate-pop",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between gap-3",children:[(0,t.jsx)("p",{className:"text-xs uppercase tracking-wide text-muted",children:"Reference solution"}),(0,t.jsx)("button",{onClick:()=>x(m(e.solution,s)),disabled:_,className:"text-xs px-2.5 py-1.5 rounded-md border border-border hover:bg-surface-2",children:"Use this solution"})]}),(0,t.jsx)("pre",{className:"text-sm font-mono bg-code-bg border border-border rounded-lg px-3 py-2 overflow-x-auto whitespace-pre",children:m(e.solution,s)}),(0,t.jsx)("p",{className:"text-xs uppercase tracking-wide text-muted",children:"Why it works"}),(0,t.jsx)(r.Markdown,{className:"text-sm",children:e.walkthrough})]})]}),P&&(0,t.jsxs)("div",{role:"status",className:`rounded-lg px-4 py-3 text-sm border ${P.passed?"bg-success-soft text-success border-success/20":"bg-danger-soft text-danger border-danger/20"}`,children:[(0,t.jsx)("span",{className:"font-semibold",children:P.passed?"Correct.":"Not yet."})," ",P.reason??(P.passed?"Marked solved.":"")]}),A&&(0,t.jsxs)("div",{className:"space-y-2",children:[A.ok?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("p",{className:"text-xs text-muted",children:["Ran in ",A.ms," ms"]}),b(A.payload)]}):(0,t.jsx)("pre",{className:"text-sm font-mono bg-danger-soft text-danger border border-danger/20 rounded-lg px-3 py-2 overflow-x-auto whitespace-pre-wrap",children:A.error}),A.stdout&&""!==A.stdout.trim()&&(0,t.jsxs)("details",{className:"text-sm",children:[(0,t.jsx)("summary",{className:"cursor-pointer text-muted",children:"stdout"}),(0,t.jsx)("pre",{className:"mt-1 font-mono bg-code-bg border border-border rounded-lg px-3 py-2 overflow-x-auto whitespace-pre-wrap",children:A.stdout})]})]}),(0,t.jsxs)("div",{className:"bg-accent-soft/40 border border-accent/20 rounded-xl p-4 text-sm space-y-1.5",children:[(0,t.jsx)("p",{className:"font-semibold text-accent",children:"Why this matters for a data product"}),(0,t.jsx)("p",{children:e.dpmConnection.text}),R&&(0,t.jsxs)("p",{className:"text-muted",children:["Related:"," ",(0,t.jsx)(a.default,{href:`/kb/${R.slug}`,className:"text-accent underline underline-offset-2",children:R.title})]})]})]})}function f({columns:e,rows:a,maxRows:s=50}){if(0===e.length)return(0,t.jsx)("p",{className:"text-sm text-muted",children:"Query ran, but returned no result set."});let n=a.slice(0,s);return(0,t.jsxs)("div",{className:"overflow-x-auto rounded-lg border border-border",children:[(0,t.jsxs)("table",{className:"min-w-full text-sm font-mono",children:[(0,t.jsx)("thead",{className:"bg-surface-2",children:(0,t.jsx)("tr",{children:e.map(e=>(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold border-b border-border",children:e},e))})}),(0,t.jsxs)("tbody",{children:[n.map((e,a)=>(0,t.jsx)("tr",{className:"odd:bg-surface even:bg-surface-2/40",children:e.map((e,a)=>(0,t.jsx)("td",{className:"px-3 py-1.5 border-b border-border whitespace-nowrap",children:null==e?(0,t.jsx)("span",{className:"text-muted italic",children:"NULL"}):String(e)},a))},a)),0===a.length&&(0,t.jsx)("tr",{children:(0,t.jsx)("td",{colSpan:e.length,className:"px-3 py-3 text-muted italic",children:"0 rows"})})]})]}),a.length>s&&(0,t.jsxs)("p",{className:"text-xs text-muted px-3 py-1.5 border-t border-border",children:["Showing ",s," of ",a.length," rows"]})]})}e.s(["PracticeWorkspace",0,function(e){let{exercises:s,title:r,intro:i,reference:c}=e,{data:u,hydrated:h}=(0,o.useProgress)(),m=(0,n.useSyncExternalStore)(l,()=>window.location.hash.replace(/^#/,""),()=>""),f=(0,n.useMemo)(()=>s.find(e=>e.slug===m)??s[0],[s,m]),y=(0,n.useRef)(!e.prepare),[b,w]=(0,n.useState)(null),v=(0,n.useCallback)(async()=>{!y.current&&e.prepare&&(await e.prepare(e=>w(e)),y.current=!0,w(null))},[e]),x=e=>u.exercises[e]?.status??"not_started",T=s.filter(e=>"solved"===x(e.slug)).length,E=d.units.map(e=>({chapter:e,items:s.filter(t=>t.chapter===e.number)})).filter(e=>e.items.length>0),k=new Map(s.map((e,t)=>[e.slug,t+1]));return(0,t.jsxs)("div",{className:"grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]",children:[(0,t.jsxs)("aside",{className:"lg:sticky lg:top-6 self-start min-w-0 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto",children:[(0,t.jsx)("h1",{className:"text-xl font-semibold tracking-tight",children:r}),(0,t.jsx)("p",{className:"text-sm text-muted mt-1",children:h?`${T} / ${s.length} solved`:`${s.length} exercises`}),(0,t.jsx)("div",{className:"mt-4 space-y-4",children:E.map(({chapter:e,items:s})=>(0,t.jsxs)("div",{children:[(0,t.jsx)(a.default,{href:`/chapters/${e.number}`,className:"block text-[0.7rem] uppercase tracking-wide text-muted hover:text-fg px-3 mb-1",children:e.week}),(0,t.jsx)("ol",{className:"space-y-0.5",children:s.map(e=>{let a=e.slug===f.slug,s=k.get(e.slug);return(0,t.jsx)("li",{children:(0,t.jsxs)("button",{onClick:()=>{var t;let a;return t=e.slug,void((a=new URL(window.location.href)).hash=t,window.history.replaceState(null,"",a.toString()),window.dispatchEvent(new HashChangeEvent("hashchange")))},className:`w-full text-left px-3 py-1.5 rounded-md text-sm flex items-center gap-2.5 transition-colors ${a?"bg-accent-soft text-accent":"hover:bg-surface-2"}`,children:[(0,t.jsx)(g,{status:h?x(e.slug):"not_started"}),(0,t.jsxs)("span",{className:"text-muted tabular-nums w-5 shrink-0",children:[s,"."]}),(0,t.jsx)("span",{className:"truncate min-w-0",children:e.title})]})},e.slug)})})]},e.number))})]}),(0,t.jsxs)("section",{className:"min-w-0 space-y-5",children:[(0,t.jsxs)("div",{className:"text-sm text-muted space-y-3",children:[i,c]}),(0,t.jsx)(p,{exercise:f,kind:e.kind,ensurePrepared:v,prepStatus:b,run:e.run,grade:e.grade,renderResult:e.renderResult},f.slug)]})]})}],6159),e.s(["PyResultView",0,function({value:e}){if(Array.isArray(e)&&e.length>0&&e.every(e=>e&&"object"==typeof e&&!Array.isArray(e))){let a=Array.from(new Set(e.flatMap(e=>Object.keys(e)))),s=e.map(e=>a.map(t=>e[t]));return(0,t.jsx)(f,{columns:a,rows:s})}return(0,t.jsx)("pre",{className:"text-sm font-mono bg-code-bg border border-border rounded-lg px-3 py-2 overflow-x-auto",children:JSON.stringify(e,null,2)})},"ResultTable",0,f],18994);let y=Date.UTC(2026,0,1);function b(e){return new Date(y+864e5*e).toISOString().slice(0,10)}function w(e){let[t,a,s]=e.split("-").map(Number);return Math.round((Date.UTC(t,a-1,s)-y)/864e5)}function v(e){return String(e).padStart(2,"0")}function x(e,t,a){return`${b(e)} ${v(t)}:${v(a)}:00`}let T=w("2026-08-31"),E=["Northwind Traders","Globex Logistics","Initech Software","Umbrella Health","Hooli Media","Wayne Manufacturing","Stark Analytics","Wonka Foods","Acme Robotics","Vandelay Imports","Pied Piper Cloud","Dunder Paper Co","Sterling Cooper","Cyberdyne Systems","Tyrell Bio","Oscorp Materials","Gringotts Fintech","Massive Dynamic","Aperture Labs","Soylent Nutrition","Bluth Homes","Prestige Worldwide","Wernham Hogg","Los Pollos Foods","Buy n Large Retail","Monarch Solutions","Ollivander Supply","Rekall Travel","Zorg Industries","Nakatomi Trading","Brawndo Beverages","Virtucon","Kwik-E-Mart Group","InGen Life Sciences","Weyland Energy","Cheers Hospitality","Mooby Entertainment","Oceanic Airlines","Paper Street Soap","Sirius Cybernetics"],k=["Retail","Logistics","Technology","Healthcare","Media","Manufacturing","Financial Services","Consumer Goods","Energy","Hospitality"],N=["Priya","Marcus","Elena","Sam","Grace","Tom","Nadia","Liam","Yuki","Carlos","Aisha","Ben","Chloe","Dev","Fatima","Hugo","Ines","Jonas","Keiko","Luis","Maya","Noah","Olivia","Pablo","Rania","Sofia","Tariq","Uma","Victor","Wen"],_=["Shah","Lee","Petrova","Okafor","Muller","Hidayat","Farouk","O'Connor","Tanaka","Mendes","Khan","Novak","Dubois","Rao","Haddad","Silva","Costa","Berg","Sato","Ortiz","Iyer","Fischer","Martin","Rossi","Nasser","Moreno","Ali","Nair","Chen","Larsen"],S=["VP Operations","Data Lead","COO","Founder","Director of Analytics","Procurement Lead","VP Marketing","Plant Manager","Head of Data","Ops Manager","CFO","IT Director"],A=["Jordan Blake","Priya Nair","Meiling Zhao","Diego Alvarez","Amara Osei"],L=null;function P(){return L||(L=function(e=2){let t,a=(t=e>>>0,()=>{let e=t=t+0x6d2b79f5>>>0;return e=Math.imul(e^e>>>15,1|e),(((e^=e+Math.imul(e^e>>>7,61|e))^e>>>14)>>>0)/0x100000000}),s=(e,t)=>e+Math.floor(a()*(t-e+1)),n=e=>e[Math.floor(a()*e.length)],r=e=>a()<e,o=E.map((e,t)=>{let r=a(),o=a();return{account_id:`ACC-${v(t+1).padStart(3,"0")}`,account_name:e,industry:n(k),region:r<.5?"AMER":r<.8?"EMEA":"APAC",tier:o<.25?"Enterprise":o<.65?"Mid-Market":"SMB",created_date:b(-s(30,700))}}),i=[];for(let e of o)for(let t=0;t<2;t++){let t=n(N),a=n(_),s=e.account_name.toLowerCase().replace(/[^a-z]/g,"").slice(0,10);i.push({customer_id:`CUS-${String(i.length+1).padStart(3,"0")}`,account_id:e.account_id,full_name:`${t} ${a}`,role:n(S),email:`${t.toLowerCase()}.${a.toLowerCase().replace(/[^a-z]/g,"")}@${s}.example`})}let l=[],d=[],c={Enterprise:[6e4,22e4],"Mid-Market":[18e3,7e4],SMB:[4e3,2e4]};for(let e=0;e<420;e++){let t=n(o),i=s(0,w("2026-08-20")),u=Number(b(i).slice(5,7)),h=a(),m=h<.35?"Inbound":h<.75?"Outbound":"Referral",g=n(A),[p,f]=c[t.tier],y=500*Math.round(s(p,f)/500),v=.55;"Referral"===m&&(v+=.15),"Inbound"===m&&(v+=.05),"Outbound"===m&&(v-=.1),"AMER"===t.region&&(v+=.05),"Jordan Blake"===g&&(v+=.08),"Meiling Zhao"===g&&(v-=.05);let E="AMER"===t.region&&"Outbound"===m&&(5===u||6===u);E&&(v-=.45);let k={prospecting:[2,12],qualified:[4,18],proposal:[6,24],negotiation:[4,18]},N=i,_="prospecting",S=null,L=(t,a)=>d.push({history_id:`H-${String(d.length+1).padStart(5,"0")}`,deal_id:`DEAL-${String(e+1).padStart(3,"0")}`,stage:t,entered_at:x(a,s(8,18),s(0,59))});L("prospecting",N);let P=["qualified","proposal","negotiation"],M=r(v),O=M?3:s(0,3),j=!1;for(let e=0;e<P.length;e++){let t=_,[a,n]=k[t];if(E&&"negotiation"===t&&([a,n]=[12,30]),N+=s(a,n),!M&&e>=O){N<=T&&(_="closed_lost",S=N,L("closed_lost",N)),j=!0;break}if(N>T){j=!0;break}L(_=P[e],N)}if(!j){let[e,t]=k.negotiation;E&&([e,t]=[12,30]),(N+=s(e,t))<=T&&(_=M?"closed_won":"closed_lost",S=N,L(_,N))}l.push({deal_id:`DEAL-${String(e+1).padStart(3,"0")}`,account_id:t.account_id,owner:g,stage:_,amount:y,source:m,created_date:b(i),closed_date:null===S?null:b(S)})}let u=[],h=(e,t,a,s)=>u.push({transaction_id:`TXN-${String(u.length+1).padStart(4,"0")}`,deal_id:e,amount:t,transaction_date:b(a),type:s});for(let e of l){if("closed_won"!==e.stage||!e.closed_date)continue;let t=w(e.closed_date);if(h(e.deal_id,e.amount,t,"initial"),r(.3)){let a=t+s(20,70);a<=T&&h(e.deal_id,100*Math.round(e.amount*s(8,25)/100/100),a,"upsell")}if(r(.15)){let a=t+s(60,120);a<=T&&h(e.deal_id,100*Math.round(e.amount*s(30,60)/100/100),a,"renewal")}}let m=u.filter(e=>"initial"===e.type);for(let e=0;e<5;e++){let t=m[Math.floor((e+1)*37%m.length)];h(t.deal_id,t.amount,w(t.transaction_date),t.type)}for(let e=0;e<6;e++){let t=d[Math.floor((e+1)*151%d.length)];d.push({...t,history_id:`H-${String(d.length+1).padStart(5,"0")}`})}let g=l.filter(e=>"closed_won"===e.stage);for(let e=0;e<4;e++){let t=g[Math.floor((e+1)*23%g.length)];"closed_won"===t.stage&&(t.stage="negotiation",t.closed_date=null)}let p=l.filter(e=>"closed_lost"===e.stage&&e.closed_date);for(let e=0;e<3;e++)p[Math.floor((e+1)*17%p.length)].closed_date=null;let f=[],L=["crm_deals_ingest","transactions_ingest","gold_sales_metrics"],P=w("2026-04-01");for(let e=P;e<=T;e++){let t=b(e),a=l.filter(t=>w(t.created_date)<=e).length,n=u.filter(t=>w(t.transaction_date)<=e).length;for(let o of L){let i=s(0,40),l="crm_deals_ingest"===o?2:"transactions_ingest"===o?3:4,d="success",c="gold_sales_metrics"===o?s(18,35):s(6,15);"gold_sales_metrics"===o&&("2026-06-14"===t||"2026-06-15"===t||"2026-06-16"===t)&&(d="failed"),"crm_deals_ingest"===o&&"2026-07-22"===t&&(d="failed"),"transactions_ingest"===o&&"2026-05-09"===t&&(d="failed"),"success"===d&&r(.04)&&(d="late",c+=s(40,90));let u="crm_deals_ingest"===o?a:"transactions_ingest"===o?n:a+n;u+=s(-3,3);let h="failed"===d?0:u-s(0,4);"crm_deals_ingest"===o&&"2026-07-05"===t&&(h=Math.round(.3*h)),f.push({run_id:`RUN-${String(f.length+1).padStart(4,"0")}`,pipeline:o,run_date:t,started_at:x(e,l,i),finished_at:"failed"===d?null:x(e,l+Math.floor((i+c)/60),(i+c)%60),status:d,rows_in:Math.max(0,u),rows_out:Math.max(0,h)})}}let M=[],O=[],j=["Sales Rep","Sales Rep","Sales Rep","Sales Rep","Sales Manager","Sales Manager","RevOps","Finance","Executive"];for(let e=0;e<32;e++)O.push({id:`U-${v(e+1)}`,role:j[e%j.length]});let R=w("2026-06-01");for(let e=P;e<=T;e++){let t=new Date(y+864e5*e).getUTCDay();if(0===t||6===t)continue;let a=e<R?s(4,8):s(0,2);for(let t=0;t<a;t++){let t=O[s(0,11)];M.push({view_id:`V-${String(M.length+1).padStart(4,"0")}`,dashboard:"Pipeline Report (legacy)",viewer_id:t.id,viewer_role:t.role,viewed_at:x(e,s(8,18),s(0,59))})}if(e>=R){let t=Math.floor((e-R)/7),a=s(3,6)+Math.min(2*t,18),n=Math.min(32,10+2*t);for(let t=0;t<a;t++){let t=O[s(0,n-1)];M.push({view_id:`V-${String(M.length+1).padStart(4,"0")}`,dashboard:"Sales Funnel Accelerator",viewer_id:t.id,viewer_role:t.role,viewed_at:x(e,s(8,18),s(0,59))})}}}return{accounts:o,customers:i,deals:l,deal_stage_history:d,transactions:u,pipeline_runs:f,dashboard_views:M}}()),L}let M=`
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
`,O=[{table:"accounts",description:"Customer companies",columns:["account_id","account_name","industry","region","tier","created_date"]},{table:"customers",description:"Contacts at accounts",columns:["customer_id","account_id","full_name","role","email"]},{table:"deals",description:"One row per opportunity; stage is the current CRM value",columns:["deal_id","account_id","owner","stage","amount","source","created_date","closed_date"]},{table:"deal_stage_history",description:"Append-only log of stage transitions",columns:["history_id","deal_id","stage","entered_at"]},{table:"transactions",description:"Money movements against closed_won deals",columns:["transaction_id","deal_id","amount","transaction_date","type"]},{table:"pipeline_runs",description:"Daily run log for 3 pipelines (Apr–Aug 2026)",columns:["run_id","pipeline","run_date","started_at","finished_at","status","rows_in","rows_out"]},{table:"dashboard_views",description:"Usage events for the legacy and new dashboards",columns:["view_id","dashboard","viewer_id","viewer_role","viewed_at"]}];function j(e){return null==e?"NULL":"number"==typeof e?String(e):`'${e.replace(/'/g,"''")}'`}function R(e,t){let a=[];for(let s=0;s<t.length;s+=200){let n=t.slice(s,s+200).map(e=>`(${Object.values(e).map(j).join(",")})`).join(",\n");a.push(`INSERT INTO ${e} VALUES
${n};`)}return a}e.s(["SCHEMA_SQL",0,M,"TABLE_DOCS",0,O,"buildSeedSql",0,function(e=P()){return[...R("accounts",e.accounts),...R("customers",e.customers),...R("deals",e.deals),...R("deal_stage_history",e.deal_stage_history),...R("transactions",e.transactions),...R("pipeline_runs",e.pipeline_runs),...R("dashboard_views",e.dashboard_views)].join("\n")},"getDataset",0,P],77475),e.s(["TableReference",0,function(){return(0,t.jsxs)("details",{className:"bg-surface border border-border rounded-lg px-4 py-2 text-sm",children:[(0,t.jsx)("summary",{className:"cursor-pointer text-muted hover:text-fg",children:"Tables and columns (as of 31 Aug 2026)"}),(0,t.jsx)("ul",{className:"mt-3 space-y-2",children:O.map(e=>(0,t.jsxs)("li",{children:[(0,t.jsx)("span",{className:"font-mono font-semibold",children:e.table}),(0,t.jsxs)("span",{className:"text-muted",children:[" · ",e.description]}),(0,t.jsx)("p",{className:"font-mono text-xs text-muted mt-0.5 break-words",children:e.columns.join(", ")})]},e.table))})]})}],29187);let D=new Map;function C(e){return"number"==typeof e||"bigint"==typeof e}function I(e){return C(e)?"n:"+Number(e).toFixed(6):null==e?"null":"object"==typeof e?Array.isArray(e)?"["+e.map(I).join(",")+"]":"{"+Object.keys(e).sort().map(t=>JSON.stringify(t)+":"+I(e[t])).join(",")+"}":typeof e+":"+String(e).trim()}e.s(["loadScript",0,function(e){if("u"<typeof document)return Promise.reject(Error("loadScript can only run in the browser"));let t=D.get(e);if(t)return t;let a=new Promise((t,a)=>{let s=document.querySelector(`script[src="${e}"]`);if(s&&"true"===s.dataset.loaded)return void t();let n=s??document.createElement("script");n.src=e,n.async=!0,n.addEventListener("load",()=>{n.dataset.loaded="true",t()}),n.addEventListener("error",()=>{D.delete(e),a(Error(`Failed to load script: ${e}`))}),s||document.head.appendChild(n)});return D.set(e,a),a}],136),e.s(["columnsEqual",0,function(e,t){return e.length===t.length&&e.every((e,a)=>e.trim().toLowerCase()===t[a].trim().toLowerCase())},"deepEqual",0,function e(t,a,s=!1){if(Array.isArray(t)&&Array.isArray(a)){if(t.length!==a.length)return!1;if(s)return t.every((t,n)=>e(t,a[n],s));let n=[...t].sort((e,t)=>I(e).localeCompare(I(t))),r=[...a].sort((e,t)=>I(e).localeCompare(I(t)));return n.every((t,a)=>e(t,r[a],!0))}if(Array.isArray(t)||Array.isArray(a))return!1;if(null!==t&&null!==a&&"object"==typeof t&&"object"==typeof a){let n=Object.keys(t).sort(),r=Object.keys(a).sort();return n.length===r.length&&!!n.every((e,t)=>e===r[t])&&n.every(n=>e(t[n],a[n],s))}return null==t?null==a:null!=a&&(C(t)&&C(a)||C(t)&&"string"==typeof a&&""!==a.trim()&&!isNaN(Number(a))||C(a)&&"string"==typeof t&&""!==t.trim()&&!isNaN(Number(t))?1e-6>=Math.abs(Number(t)-Number(a)):"string"==typeof t&&"string"==typeof a?t.trim()===a.trim():"boolean"==typeof t&&"boolean"==typeof a&&t===a)}],36420)},87110,e=>{"use strict";let t=[{slug:"what-is-a-data-product-manager",title:"What is a Data Product Manager?",category:"definition",tags:["role","fundamentals"],summary:"A DPM sits at the intersection of data, technology, and business, managing data warehouses, platforms, pipelines, and ML models the way a PM manages a product.",body:`A **Data Product Manager (DPM)** is a specialized role at the intersection of
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
   negotiation usually mean lead quality; early losses mean targeting.`,source:"Synthesized for DPM Lab; builds on the Playbook's Metric Dependency Tree."},{slug:"sql-toolkit-for-data-pms",title:"The SQL a Data PM Actually Uses",category:"definition",tags:["sql","skills"],summary:"CTEs for readable steps, window functions for per-row context, date bucketing for trends, and the four bugs that silently corrupt metrics.",body:"You are not writing production pipelines. You are verifying numbers,\nsizing problems, and reading other people's queries. That needs a small,\nsharp toolkit.\n\n## Shapes you'll write every week\n- **CTEs** (`WITH x AS (...)`) — one step per CTE, named after what it\n  produces (`resolved_deals`, `latest_stage`). Readable beats clever.\n- **Window functions** — `ROW_NUMBER() OVER (PARTITION BY deal_id ORDER BY\n  entered_at DESC)` for \"latest per entity\"; `LAG`/`LEAD` for change\n  between rows; `SUM(...) OVER (ORDER BY month)` for running totals;\n  `AVG(...) OVER (... ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)` for moving\n  averages.\n- **Date bucketing** — `substr(date, 1, 7)` for month, `strftime('%Y-%W',\n  ts)` for ISO-ish week, `julianday(b) - julianday(a)` for day differences\n  (SQLite).\n- **Conditional aggregation** — `SUM(CASE WHEN ... THEN 1 ELSE 0 END)` (or\n  `SUM(condition)` in SQLite) to compute several rates in one pass.\n- **HAVING** — filter *after* aggregation; the idiom for duplicates:\n  `GROUP BY key HAVING COUNT(*) > 1`.\n\n## The four silent metric bugs\n1. **Join fan-out** — joining a 1:N table before an aggregate multiplies\n   the measure. Aggregate the N side first.\n2. **LEFT JOIN + WHERE on the right table** — turns it into an inner join\n   and hides exactly the missing rows you were looking for. Put the\n   condition in `ON`.\n3. **COUNT(*) vs COUNT(DISTINCT x)** — views vs viewers, rows vs people.\n4. **Integer division** — `7 / 10 = 0` in many engines. Multiply by\n   `1.0` first.\n\n## Grain first, window second\nDecide what one row means (a deal? a month?), aggregate to that grain in a\nCTE, *then* apply windows. Running totals and moving averages on the wrong\ngrain look plausible and are wrong.",source:"Synthesized for DPM Lab."},{slug:"sql-101",title:"SQL 101: the formulas",category:"definition",tags:["sql","basics","level-0"],summary:"The clause order, filters, aggregates, GROUP BY/HAVING, and joins that every exercise in this app is built from.",body:"## The sentence\n```sql\nSELECT column_a, column_b        -- which columns\nFROM table_name                  -- which table\nWHERE condition                  -- which rows\nGROUP BY column_a                -- one row per value\nHAVING COUNT(*) > 1              -- filter groups\nORDER BY column_b DESC           -- sort\nLIMIT 10;                        -- keep n rows\n```\nClauses are optional but their order is fixed. Text goes in single quotes;\nnumbers don't. `;` ends the statement.\n\n## Filters\n| Want | Write |\n|---|---|\n| both | `a = 1 AND b = 2` |\n| either | `a = 1 OR b = 2` (use parentheses with AND) |\n| any of a list | `stage IN ('closed_won', 'closed_lost')` |\n| a range | `amount BETWEEN 1000 AND 5000` |\n| not equal | `stage <> 'closed_lost'` |\n| missing | `closed_date IS NULL` (never `= NULL`) |\n| pattern | `email LIKE '%@northwind%'` |\n\n## Aggregates\n`COUNT(*)`, `COUNT(col)` (non-NULL only), `SUM`, `AVG`, `MIN`, `MAX`.\nName the result: `SUM(amount) AS total`. In SQLite, `SUM(stage = 'closed_won')`\ncounts rows where the comparison is true, and `1.0 * a / b` forces decimal\ndivision.\n\n## GROUP BY / HAVING\nEvery SELECT column must be grouped or aggregated. `WHERE` filters rows\nbefore grouping; `HAVING` filters groups after. The duplicate idiom:\n`GROUP BY key HAVING COUNT(*) > 1`.\n\n## Joins\n```sql\nFROM deals d\nJOIN accounts a ON a.account_id = d.account_id        -- only matches\nLEFT JOIN transactions t ON t.deal_id = d.deal_id     -- all deals, NULL if none\n```\nQualify columns after a join (`d.amount`). Conditions on the right-hand table\nof a LEFT JOIN belong in `ON`, not `WHERE`.\n\n## Dates and text (SQLite)\n`substr(created_date, 1, 7)` → month; `strftime('%Y-%W', ts)` → week;\n`julianday(b) - julianday(a)` → days between.",source:"Synthesized for DPM Lab (Level 0)."},{slug:"python-pandas-101",title:"Python & pandas 101: the formulas",category:"definition",tags:["python","pandas","basics","level-0"],summary:"Lists, dicts, and the DataFrame moves that mirror SQL: select, filter, group, sort, merge.",body:"## Python in one breath\n```python\nx = 5                                   # variable\nstages = ['qualified', 'proposal']      # list; stages[0], len(stages)\ndeal = {'id': 'D-1', 'amount': 5000}    # dict; deal['amount']\nround(2 / 3, 4)                         # 0.6667\n[s for s in stages if s != 'proposal']  # list comprehension (a filter)\n```\n`==` compares, `=` assigns. `//` is integer division. Indentation defines\nblocks.\n\n## pandas ↔ SQL\n| SQL | pandas |\n|---|---|\n| `SELECT deal_id, amount FROM deals` | `deals[['deal_id', 'amount']]` |\n| `WHERE stage = 'closed_won'` | `deals[deals['stage'] == 'closed_won']` |\n| `WHERE a AND b` | `deals[(cond_a) & (cond_b)]` — parentheses required |\n| `WHERE stage IN (...)` | `deals[deals['stage'].isin([...])]` |\n| `COUNT(*)` | `len(deals)` |\n| `SUM(amount)` | `deals['amount'].sum()` |\n| `GROUP BY owner, SUM(amount)` | `deals.groupby('owner')['amount'].sum()` |\n| `ORDER BY amount DESC` | `.sort_values('amount', ascending=False)` |\n| `LIMIT 5` | `.head(5)` |\n| `JOIN accounts ON account_id` | `deals.merge(accounts, on='account_id')` |\n| `LEFT JOIN` | `.merge(..., how='left')` |\n| several aggregates | `.agg(total=('amount', 'sum'), n=('deal_id', 'count'))` |\n\n## Getting an answer out\n`result = df.to_dict('records')` for rows; `int(x)` / `float(x)` to turn a\nnumpy number into a plain one; `(deals['stage'] == 'closed_won').sum()`\ncounts True values, the pandas CASE WHEN.",source:"Synthesized for DPM Lab (Level 0)."},{slug:"what-is-a-data-product",title:"What a Data Product Is (and Isn't)",category:"definition",tags:["data-product","fundamentals","anatomy"],summary:"A curated, reliable, reusable data asset designed for ongoing use, with an owner, service expectations, and embedded quality. Not a dataset, not a dashboard, not a pipeline.",body:`## The definition
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
**source-aligned** product if it had a contract and an owner.`,source:"Modern Data 101 (Defining the True Data Product; Anatomy; Canonical Core; product types), from the user's notes."}];e.s(["kbEntries",0,t])},82364,76091,e=>{"use strict";var t=e.i(87110);function a(e){return e.startsWith("/")?`/dpm-lab${e}`:e}e.s(["withBasePath",0,a],76091);let s=new Map(t.kbEntries.map(e=>[e.slug,e]));e.s(["CATEGORY_LABELS",0,{framework:"Framework",definition:"Definition","case-study":"Case study","industry-context":"Industry context"},"getKbEntry",0,function(e){return s.get(e)},"resolveWikiLinks",0,function(e){return e.replace(/\[\[([a-z0-9-]+)\]\]/g,(e,t)=>{let n=s.get(t);return n?`[${n.title}](${a(`/kb/${t}`)})`:`\`${t}\``})}],82364)},90317,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s={bindSnapshot:function(){return d},createAsyncLocalStorage:function(){return l},createSnapshot:function(){return c}};for(var n in s)Object.defineProperty(a,n,{enumerable:!0,get:s[n]});let r=Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"),"__NEXT_ERROR_CODE",{value:"E504",enumerable:!1,configurable:!0});class o{disable(){throw r}getStore(){}run(){throw r}exit(){throw r}enterWith(){throw r}static bind(e){return e}}let i="u">typeof globalThis&&globalThis.AsyncLocalStorage;function l(){return i?new i:new o}function d(e){return i?i.bind(e):o.bind(e)}function c(){return i?i.snapshot():function(e,...t){return e(...t)}}},42344,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"workAsyncStorageInstance",{enumerable:!0,get:function(){return s}});let s=(0,e.r(90317).createAsyncLocalStorage)()},63599,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"workAsyncStorage",{enumerable:!0,get:function(){return s.workAsyncStorageInstance}});let s=e.r(42344)},9885,(e,t,a)=>{"use strict";function s(e){return e.split("/").map(e=>encodeURIComponent(e)).join("/")}Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"encodeURIPath",{enumerable:!0,get:function(){return s}})},67585,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"BailoutToCSR",{enumerable:!0,get:function(){return n}});let s=e.r(32061);function n({reason:e,children:t}){if("u"<typeof window)throw Object.defineProperty(new s.BailoutToCSRError(e),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return t}},52157,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"PreloadChunks",{enumerable:!0,get:function(){return l}});let s=e.r(18050),n=e.r(74080),r=e.r(63599),o=e.r(9885),i=e.r(43369);function l({moduleIds:e}){if("u">typeof window)return null;let t=r.workAsyncStorage.getStore();if(void 0===t)return null;let a=[];if(t.reactLoadableManifest&&e){let s=t.reactLoadableManifest;for(let t of e){if(!s[t])continue;let e=s[t].files;a.push(...e)}}if(0===a.length)return null;let d=(0,i.getAssetTokenQuery)();return(0,s.jsx)(s.Fragment,{children:a.map(e=>{let a=`${t.assetPrefix}/_next/${(0,o.encodeURIPath)(e)}${d}`;return e.endsWith(".css")?(0,s.jsx)("link",{precedence:"dynamic",href:a,rel:"stylesheet",as:"style",nonce:t.nonce},e):((0,n.preload)(a,{as:"script",fetchPriority:"low",nonce:t.nonce}),null)})})}},69093,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"default",{enumerable:!0,get:function(){return d}});let s=e.r(18050),n=e.r(71645),r=e.r(67585),o=e.r(52157);function i(e){return{default:e&&"default"in e?e.default:e}}let l={loader:()=>Promise.resolve(i(()=>null)),loading:null,ssr:!0},d=function(e){let t={...l,...e},a=(0,n.lazy)(()=>t.loader().then(i)),d=t.loading;function c(e){let i=d?(0,s.jsx)(d,{isLoading:!0,pastDelay:!0,error:null}):null,l=!t.ssr||!!t.loading,c=l?n.Suspense:n.Fragment,u=t.ssr?(0,s.jsxs)(s.Fragment,{children:["u"<typeof window?(0,s.jsx)(o.PreloadChunks,{moduleIds:t.modules}):null,(0,s.jsx)(a,{...e})]}):(0,s.jsx)(r.BailoutToCSR,{reason:"next/dynamic",children:(0,s.jsx)(a,{...e})});return(0,s.jsx)(c,{...l?{fallback:i}:{},children:u})}return c.displayName="LoadableComponent",c}},70703,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"default",{enumerable:!0,get:function(){return n}});let s=e.r(55682)._(e.r(69093));function n(e,t){let a={};"function"==typeof e&&(a.loader=e);let n={...a,...t};return(0,s.default)({...n,modules:n.loadableGenerated?.modules})}("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),t.exports=a.default)}]);