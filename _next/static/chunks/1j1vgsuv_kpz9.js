(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,3657,e=>{"use strict";var t=e.i(18050),a=e.i(71645),o=e.i(6159),n=e.i(18994),s=e.i(29187),r=e.i(26033),i=e.i(19846),l=e.i(77475),d=e.i(136),c=e.i(36420);let u="https://cdn.jsdelivr.net/pyodide/v314.0.6/full/",m=null;async function h(e){return m||(m=(async()=>{if(e?.("script"),await (0,d.loadScript)(`${u}pyodide.js`),!window.loadPyodide)throw Error("Pyodide loader did not expose loadPyodide");e?.("runtime");let t=await window.loadPyodide({indexURL:u});return e?.("pandas"),await t.loadPackage("pandas"),e?.("ready"),t})().catch(e=>{throw m=null,e})),m}let p=`
import json as _json
import pandas as pd
accounts           = pd.DataFrame(_json.loads(__accounts_json))
customers          = pd.DataFrame(_json.loads(__customers_json))
deals              = pd.DataFrame(_json.loads(__deals_json))
deal_stage_history = pd.DataFrame(_json.loads(__deal_stage_history_json))
transactions       = pd.DataFrame(_json.loads(__transactions_json))
pipeline_runs      = pd.DataFrame(_json.loads(__pipeline_runs_json))
dashboard_views    = pd.DataFrame(_json.loads(__dashboard_views_json))
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
`;async function f(e){let t=await h(),a=[];t.setStdout({batched:e=>a.push(e)}),t.setStderr({batched:e=>a.push(e)});let o=t.globals.get("dict")();try{let n=(0,l.getDataset)();for(let[e,t]of Object.entries(n))o.set(`__${e}_json`,JSON.stringify(t));let s=performance.now();t.runPython(p,{globals:o}),t.runPython(e,{globals:o}),t.runPython(g,{globals:o});let r=Math.round(performance.now()-s),i=o.get("__serialized");return{ok:!0,result:JSON.parse(i),stdout:a.join(""),ms:r}}catch(o){let e,t;return{ok:!1,error:((t=(e=(o instanceof Error?o.message:String(o)).split("\n")).findIndex(e=>e.includes('File "<exec>"')))>=0?e.slice(t):e.slice(-4)).join("\n").trim(),stdout:a.join("")}}finally{o.destroy()}}let y=i.default,b=new Map(r.pythonExercises.map(e=>[e.slug,e])),w={script:"Fetching Python runtime (first time only, ~10 MB)…",runtime:"Starting Python…",pandas:"Loading pandas…",ready:"Ready."};e.s(["default",0,function(){let e=(0,a.useCallback)(async e=>{await h(t=>e(w[t]))},[]),i=(0,a.useCallback)(async e=>{let t=await f(e);return t.ok?{ok:!0,payload:t.result,ms:t.ms,stdout:t.stdout}:{ok:!1,error:t.error,stdout:t.stdout}},[]),l=(0,a.useCallback)((e,t)=>{var a;let o=b.get(e);return e in y?(a=y[e],null==t?{passed:!1,reason:"`result` is still None — assign your answer to it."}:Array.isArray(a)&&!Array.isArray(t)?{passed:!1,reason:"Expected a list (e.g. from .to_dict('records')) but got a different type."}:Array.isArray(a)&&Array.isArray(t)&&t.length!==a.length?{passed:!1,reason:`Expected ${a.length} item(s) but got ${t.length}.`}:(0,c.deepEqual)(t,a,o.orderMatters??!1)?{passed:!0}:{passed:!1,reason:Array.isArray(a)?"Right length, but the values"+(o.orderMatters?" or their order":"")+" don't match. Check keys, rounding, and sort order.":"Value doesn't match. Check your filter and rounding."}):{passed:!1,reason:"No expected result on file for this exercise. Run npm run verify:answers."}},[]);return(0,t.jsx)(o.PracticeWorkspace,{kind:"python",title:"Python Practice",intro:(0,t.jsxs)("p",{children:["Real Python + pandas in your browser, same Meridian data as the SQL practice. All seven tables are pre-loaded as DataFrames. Assign your answer to ",(0,t.jsx)("code",{className:"font-mono",children:"result"}),"; use"," ",(0,t.jsx)("code",{className:"font-mono",children:"print()"})," to explore (output appears under “stdout”). The first run downloads the runtime; later runs are instant. The Python ladder currently mirrors chapters 1–2; more comes after the SQL ladder settles."]}),reference:(0,t.jsx)(s.TableReference,{}),exercises:r.pythonExercises.map(e=>({slug:e.slug,chapter:e.chapter,title:e.title,difficulty:e.difficulty,prompt:e.prompt,starter:e.starterCode,hint:e.hint,solution:e.solution,walkthrough:e.walkthrough,dpmConnection:e.dpmConnection})),prepare:e,run:i,grade:l,renderResult:e=>(0,t.jsx)(n.PyResultView,{value:e})})}],3657)},6159,18994,77475,29187,136,36420,e=>{"use strict";var t=e.i(18050),a=e.i(22016),o=e.i(70703),n=e.i(71645),s=e.i(21683),r=e.i(74581),i=e.i(82364);function l(e){return window.addEventListener("hashchange",e),()=>window.removeEventListener("hashchange",e)}var d=e.i(6e4);let c=(0,o.default)(()=>e.A(91987).then(e=>e.CodeEditor),{loadableGenerated:{modules:[95931]},ssr:!1,loading:()=>(0,t.jsx)("div",{className:"h-[180px] rounded-lg border border-border bg-code-bg animate-pulse"})}),u={warmup:"Warm-up",core:"Core",advanced:"Advanced"},m={warmup:"bg-success-soft text-success",core:"bg-accent-soft text-accent",advanced:"bg-warn-soft text-warn"};function h(e,t){return"sql"!==t||e.includes("\n")?e:e.replace(/\s+(FROM|WHERE|GROUP BY|HAVING|ORDER BY|LIMIT|LEFT JOIN|JOIN|UNION)\s+/g,"\n$1 ").replace(/\)\s+SELECT\s+/g,")\nSELECT ").replace(/,\s+(\w+) AS \(/g,",\n$1 AS (").replace(/^WITH\s+/,"WITH ").trim()}function p({status:e}){let a="solved"===e?"Solved":"attempted"===e?"Attempted":"Not started";return(0,t.jsx)("span",{className:`inline-block w-2 h-2 rounded-full shrink-0 ${"solved"===e?"bg-success":"attempted"===e?"bg-warn":"bg-border"}`,title:a,"aria-label":a})}function g({exercise:e,kind:o,ensurePrepared:l,prepStatus:p,run:f,grade:y,renderResult:b}){let{recordAttempt:w}=(0,r.useProgress)(),[_,v]=(0,n.useState)(e.starter),[x,k]=(0,n.useState)(!1),[T,N]=(0,n.useState)(!1),[S,E]=(0,n.useState)(!1),[O,A]=(0,n.useState)(null),[P,M]=(0,n.useState)(null),L=d.units.find(t=>t.number===e.chapter),j=(0,n.useCallback)(async t=>{E(!0),M(null);try{await l();let a=await f(_);if(A(a),t)if(a.ok){let t=y(e.slug,a.payload);M(t),w(e.slug,o,_,t.passed)}else M({passed:!1,reason:"Fix the error above, then check again."}),w(e.slug,o,_,!1)}catch(e){A({ok:!1,error:e instanceof Error?e.message:String(e)})}finally{E(!1)}},[_,l,e.slug,y,o,w,f]),C=(0,i.getKbEntry)(e.dpmConnection.kbSlug);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"bg-surface border border-border rounded-xl p-5 space-y-4",children:[L&&(0,t.jsxs)(a.default,{href:`/chapters/${L.number}`,className:"text-xs text-muted hover:text-fg",children:[L.week," · ",L.title]}),(0,t.jsxs)("div",{className:"flex flex-wrap items-center gap-2",children:[(0,t.jsx)("h2",{className:"text-lg font-semibold",children:e.title}),(0,t.jsx)("span",{className:`text-xs px-2 py-0.5 rounded-full font-medium ${m[e.difficulty]}`,children:u[e.difficulty]})]}),(0,t.jsx)(s.Markdown,{className:"text-[0.95rem]",children:e.prompt})]}),(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsx)(c,{value:_,onChange:v,language:o}),(0,t.jsxs)("div",{className:"flex flex-wrap items-center gap-2",children:[(0,t.jsx)("button",{onClick:()=>j(!1),disabled:S,className:"px-4 py-2.5 rounded-xl text-sm font-semibold border-2 border-border bg-surface hover:border-accent disabled:opacity-50",children:"Run"}),(0,t.jsx)("button",{onClick:()=>j(!0),disabled:S,className:"px-5 py-2.5 rounded-xl text-sm font-semibold bg-accent text-accent-fg hover:opacity-90 disabled:opacity-50 node-shadow",children:S?"Running…":"Run & Check"}),(0,t.jsx)("button",{onClick:()=>v(e.starter),disabled:S,className:"px-3 py-2 rounded-md text-sm text-muted hover:text-fg disabled:opacity-50",children:"Reset"}),(0,t.jsx)("button",{onClick:()=>k(e=>!e),className:"px-3 py-2 rounded-md text-sm text-muted hover:text-fg ml-auto",children:x?"Hide hint":"Hint"}),(0,t.jsx)("button",{onClick:()=>N(e=>!e),className:"px-3 py-2 rounded-md text-sm text-muted hover:text-fg",children:T?"Hide solution":"Show solution"})]}),p&&(0,t.jsx)("p",{className:"text-sm text-muted",children:p}),x&&(0,t.jsx)("p",{className:"text-sm bg-warn-soft text-warn border border-warn/20 rounded-md px-3 py-2",children:e.hint}),T&&(0,t.jsxs)("div",{className:"bg-surface border border-border rounded-xl p-4 space-y-3 animate-pop",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between gap-3",children:[(0,t.jsx)("p",{className:"text-xs uppercase tracking-wide text-muted",children:"Reference solution"}),(0,t.jsx)("button",{onClick:()=>v(h(e.solution,o)),disabled:S,className:"text-xs px-2.5 py-1.5 rounded-md border border-border hover:bg-surface-2",children:"Use this solution"})]}),(0,t.jsx)("pre",{className:"text-sm font-mono bg-code-bg border border-border rounded-lg px-3 py-2 overflow-x-auto whitespace-pre",children:h(e.solution,o)}),(0,t.jsx)("p",{className:"text-xs uppercase tracking-wide text-muted",children:"Why it works"}),(0,t.jsx)(s.Markdown,{className:"text-sm",children:e.walkthrough})]})]}),P&&(0,t.jsxs)("div",{role:"status",className:`rounded-lg px-4 py-3 text-sm border ${P.passed?"bg-success-soft text-success border-success/20":"bg-danger-soft text-danger border-danger/20"}`,children:[(0,t.jsx)("span",{className:"font-semibold",children:P.passed?"Correct.":"Not yet."})," ",P.reason??(P.passed?"Marked solved.":"")]}),O&&(0,t.jsxs)("div",{className:"space-y-2",children:[O.ok?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("p",{className:"text-xs text-muted",children:["Ran in ",O.ms," ms"]}),b(O.payload)]}):(0,t.jsx)("pre",{className:"text-sm font-mono bg-danger-soft text-danger border border-danger/20 rounded-lg px-3 py-2 overflow-x-auto whitespace-pre-wrap",children:O.error}),O.stdout&&""!==O.stdout.trim()&&(0,t.jsxs)("details",{className:"text-sm",children:[(0,t.jsx)("summary",{className:"cursor-pointer text-muted",children:"stdout"}),(0,t.jsx)("pre",{className:"mt-1 font-mono bg-code-bg border border-border rounded-lg px-3 py-2 overflow-x-auto whitespace-pre-wrap",children:O.stdout})]})]}),(0,t.jsxs)("div",{className:"bg-accent-soft/40 border border-accent/20 rounded-xl p-4 text-sm space-y-1.5",children:[(0,t.jsx)("p",{className:"font-semibold text-accent",children:"Why this matters for a data product"}),(0,t.jsx)("p",{children:e.dpmConnection.text}),C&&(0,t.jsxs)("p",{className:"text-muted",children:["Related:"," ",(0,t.jsx)(a.default,{href:`/kb/${C.slug}`,className:"text-accent underline underline-offset-2",children:C.title})]})]})]})}function f({columns:e,rows:a,maxRows:o=50}){if(0===e.length)return(0,t.jsx)("p",{className:"text-sm text-muted",children:"Query ran, but returned no result set."});let n=a.slice(0,o);return(0,t.jsxs)("div",{className:"overflow-x-auto rounded-lg border border-border",children:[(0,t.jsxs)("table",{className:"min-w-full text-sm font-mono",children:[(0,t.jsx)("thead",{className:"bg-surface-2",children:(0,t.jsx)("tr",{children:e.map(e=>(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold border-b border-border",children:e},e))})}),(0,t.jsxs)("tbody",{children:[n.map((e,a)=>(0,t.jsx)("tr",{className:"odd:bg-surface even:bg-surface-2/40",children:e.map((e,a)=>(0,t.jsx)("td",{className:"px-3 py-1.5 border-b border-border whitespace-nowrap",children:null==e?(0,t.jsx)("span",{className:"text-muted italic",children:"NULL"}):String(e)},a))},a)),0===a.length&&(0,t.jsx)("tr",{children:(0,t.jsx)("td",{colSpan:e.length,className:"px-3 py-3 text-muted italic",children:"0 rows"})})]})]}),a.length>o&&(0,t.jsxs)("p",{className:"text-xs text-muted px-3 py-1.5 border-t border-border",children:["Showing ",o," of ",a.length," rows"]})]})}e.s(["PracticeWorkspace",0,function(e){let{exercises:o,title:s,intro:i,reference:c}=e,{data:u,hydrated:m}=(0,r.useProgress)(),h=(0,n.useSyncExternalStore)(l,()=>window.location.hash.replace(/^#/,""),()=>""),f=(0,n.useMemo)(()=>o.find(e=>e.slug===h)??o[0],[o,h]),y=(0,n.useRef)(!e.prepare),[b,w]=(0,n.useState)(null),_=(0,n.useCallback)(async()=>{!y.current&&e.prepare&&(await e.prepare(e=>w(e)),y.current=!0,w(null))},[e]),v=e=>u.exercises[e]?.status??"not_started",x=o.filter(e=>"solved"===v(e.slug)).length,k=d.units.map(e=>({chapter:e,items:o.filter(t=>t.chapter===e.number)})).filter(e=>e.items.length>0),T=new Map(o.map((e,t)=>[e.slug,t+1]));return(0,t.jsxs)("div",{className:"grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]",children:[(0,t.jsxs)("aside",{className:"lg:sticky lg:top-6 self-start min-w-0 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto",children:[(0,t.jsx)("h1",{className:"text-xl font-semibold tracking-tight",children:s}),(0,t.jsx)("p",{className:"text-sm text-muted mt-1",children:m?`${x} / ${o.length} solved`:`${o.length} exercises`}),(0,t.jsx)("div",{className:"mt-4 space-y-4",children:k.map(({chapter:e,items:o})=>(0,t.jsxs)("div",{children:[(0,t.jsx)(a.default,{href:`/chapters/${e.number}`,className:"block text-[0.7rem] uppercase tracking-wide text-muted hover:text-fg px-3 mb-1",children:e.week}),(0,t.jsx)("ol",{className:"space-y-0.5",children:o.map(e=>{let a=e.slug===f.slug,o=T.get(e.slug);return(0,t.jsx)("li",{children:(0,t.jsxs)("button",{onClick:()=>{var t;let a;return t=e.slug,void((a=new URL(window.location.href)).hash=t,window.history.replaceState(null,"",a.toString()),window.dispatchEvent(new HashChangeEvent("hashchange")))},className:`w-full text-left px-3 py-1.5 rounded-md text-sm flex items-center gap-2.5 transition-colors ${a?"bg-accent-soft text-accent":"hover:bg-surface-2"}`,children:[(0,t.jsx)(p,{status:m?v(e.slug):"not_started"}),(0,t.jsxs)("span",{className:"text-muted tabular-nums w-5 shrink-0",children:[o,"."]}),(0,t.jsx)("span",{className:"truncate min-w-0",children:e.title})]})},e.slug)})})]},e.number))})]}),(0,t.jsxs)("section",{className:"min-w-0 space-y-5",children:[(0,t.jsxs)("div",{className:"text-sm text-muted space-y-3",children:[i,c]}),(0,t.jsx)(g,{exercise:f,kind:e.kind,ensurePrepared:_,prepStatus:b,run:e.run,grade:e.grade,renderResult:e.renderResult},f.slug)]})]})}],6159),e.s(["PyResultView",0,function({value:e}){if(Array.isArray(e)&&e.length>0&&e.every(e=>e&&"object"==typeof e&&!Array.isArray(e))){let a=Array.from(new Set(e.flatMap(e=>Object.keys(e)))),o=e.map(e=>a.map(t=>e[t]));return(0,t.jsx)(f,{columns:a,rows:o})}return(0,t.jsx)("pre",{className:"text-sm font-mono bg-code-bg border border-border rounded-lg px-3 py-2 overflow-x-auto",children:JSON.stringify(e,null,2)})},"ResultTable",0,f],18994);let y=Date.UTC(2026,0,1);function b(e){return new Date(y+864e5*e).toISOString().slice(0,10)}function w(e){let[t,a,o]=e.split("-").map(Number);return Math.round((Date.UTC(t,a-1,o)-y)/864e5)}function _(e){return String(e).padStart(2,"0")}function v(e,t,a){return`${b(e)} ${_(t)}:${_(a)}:00`}let x=w("2026-08-31"),k=["Northwind Traders","Globex Logistics","Initech Software","Umbrella Health","Hooli Media","Wayne Manufacturing","Stark Analytics","Wonka Foods","Acme Robotics","Vandelay Imports","Pied Piper Cloud","Dunder Paper Co","Sterling Cooper","Cyberdyne Systems","Tyrell Bio","Oscorp Materials","Gringotts Fintech","Massive Dynamic","Aperture Labs","Soylent Nutrition","Bluth Homes","Prestige Worldwide","Wernham Hogg","Los Pollos Foods","Buy n Large Retail","Monarch Solutions","Ollivander Supply","Rekall Travel","Zorg Industries","Nakatomi Trading","Brawndo Beverages","Virtucon","Kwik-E-Mart Group","InGen Life Sciences","Weyland Energy","Cheers Hospitality","Mooby Entertainment","Oceanic Airlines","Paper Street Soap","Sirius Cybernetics"],T=["Retail","Logistics","Technology","Healthcare","Media","Manufacturing","Financial Services","Consumer Goods","Energy","Hospitality"],N=["Priya","Marcus","Elena","Sam","Grace","Tom","Nadia","Liam","Yuki","Carlos","Aisha","Ben","Chloe","Dev","Fatima","Hugo","Ines","Jonas","Keiko","Luis","Maya","Noah","Olivia","Pablo","Rania","Sofia","Tariq","Uma","Victor","Wen"],S=["Shah","Lee","Petrova","Okafor","Muller","Hidayat","Farouk","O'Connor","Tanaka","Mendes","Khan","Novak","Dubois","Rao","Haddad","Silva","Costa","Berg","Sato","Ortiz","Iyer","Fischer","Martin","Rossi","Nasser","Moreno","Ali","Nair","Chen","Larsen"],E=["VP Operations","Data Lead","COO","Founder","Director of Analytics","Procurement Lead","VP Marketing","Plant Manager","Head of Data","Ops Manager","CFO","IT Director"],O=["Jordan Blake","Priya Nair","Meiling Zhao","Diego Alvarez","Amara Osei"],A=null;function P(){return A||(A=function(e=2){let t,a=(t=e>>>0,()=>{let e=t=t+0x6d2b79f5>>>0;return e=Math.imul(e^e>>>15,1|e),(((e^=e+Math.imul(e^e>>>7,61|e))^e>>>14)>>>0)/0x100000000}),o=(e,t)=>e+Math.floor(a()*(t-e+1)),n=e=>e[Math.floor(a()*e.length)],s=e=>a()<e,r=k.map((e,t)=>{let s=a(),r=a();return{account_id:`ACC-${_(t+1).padStart(3,"0")}`,account_name:e,industry:n(T),region:s<.5?"AMER":s<.8?"EMEA":"APAC",tier:r<.25?"Enterprise":r<.65?"Mid-Market":"SMB",created_date:b(-o(30,700))}}),i=[];for(let e of r)for(let t=0;t<2;t++){let t=n(N),a=n(S),o=e.account_name.toLowerCase().replace(/[^a-z]/g,"").slice(0,10);i.push({customer_id:`CUS-${String(i.length+1).padStart(3,"0")}`,account_id:e.account_id,full_name:`${t} ${a}`,role:n(E),email:`${t.toLowerCase()}.${a.toLowerCase().replace(/[^a-z]/g,"")}@${o}.example`})}let l=[],d=[],c={Enterprise:[6e4,22e4],"Mid-Market":[18e3,7e4],SMB:[4e3,2e4]};for(let e=0;e<420;e++){let t=n(r),i=o(0,w("2026-08-20")),u=Number(b(i).slice(5,7)),m=a(),h=m<.35?"Inbound":m<.75?"Outbound":"Referral",p=n(O),[g,f]=c[t.tier],y=500*Math.round(o(g,f)/500),_=.55;"Referral"===h&&(_+=.15),"Inbound"===h&&(_+=.05),"Outbound"===h&&(_-=.1),"AMER"===t.region&&(_+=.05),"Jordan Blake"===p&&(_+=.08),"Meiling Zhao"===p&&(_-=.05);let k="AMER"===t.region&&"Outbound"===h&&(5===u||6===u);k&&(_-=.45);let T={prospecting:[2,12],qualified:[4,18],proposal:[6,24],negotiation:[4,18]},N=i,S="prospecting",E=null,A=(t,a)=>d.push({history_id:`H-${String(d.length+1).padStart(5,"0")}`,deal_id:`DEAL-${String(e+1).padStart(3,"0")}`,stage:t,entered_at:v(a,o(8,18),o(0,59))});A("prospecting",N);let P=["qualified","proposal","negotiation"],M=s(_),L=M?3:o(0,3),j=!1;for(let e=0;e<P.length;e++){let t=S,[a,n]=T[t];if(k&&"negotiation"===t&&([a,n]=[12,30]),N+=o(a,n),!M&&e>=L){N<=x&&(S="closed_lost",E=N,A("closed_lost",N)),j=!0;break}if(N>x){j=!0;break}A(S=P[e],N)}if(!j){let[e,t]=T.negotiation;k&&([e,t]=[12,30]),(N+=o(e,t))<=x&&(S=M?"closed_won":"closed_lost",E=N,A(S,N))}l.push({deal_id:`DEAL-${String(e+1).padStart(3,"0")}`,account_id:t.account_id,owner:p,stage:S,amount:y,source:h,created_date:b(i),closed_date:null===E?null:b(E)})}let u=[],m=(e,t,a,o)=>u.push({transaction_id:`TXN-${String(u.length+1).padStart(4,"0")}`,deal_id:e,amount:t,transaction_date:b(a),type:o});for(let e of l){if("closed_won"!==e.stage||!e.closed_date)continue;let t=w(e.closed_date);if(m(e.deal_id,e.amount,t,"initial"),s(.3)){let a=t+o(20,70);a<=x&&m(e.deal_id,100*Math.round(e.amount*o(8,25)/100/100),a,"upsell")}if(s(.15)){let a=t+o(60,120);a<=x&&m(e.deal_id,100*Math.round(e.amount*o(30,60)/100/100),a,"renewal")}}let h=u.filter(e=>"initial"===e.type);for(let e=0;e<5;e++){let t=h[Math.floor((e+1)*37%h.length)];m(t.deal_id,t.amount,w(t.transaction_date),t.type)}for(let e=0;e<6;e++){let t=d[Math.floor((e+1)*151%d.length)];d.push({...t,history_id:`H-${String(d.length+1).padStart(5,"0")}`})}let p=l.filter(e=>"closed_won"===e.stage);for(let e=0;e<4;e++){let t=p[Math.floor((e+1)*23%p.length)];"closed_won"===t.stage&&(t.stage="negotiation",t.closed_date=null)}let g=l.filter(e=>"closed_lost"===e.stage&&e.closed_date);for(let e=0;e<3;e++)g[Math.floor((e+1)*17%g.length)].closed_date=null;let f=[],A=["crm_deals_ingest","transactions_ingest","gold_sales_metrics"],P=w("2026-04-01");for(let e=P;e<=x;e++){let t=b(e),a=l.filter(t=>w(t.created_date)<=e).length,n=u.filter(t=>w(t.transaction_date)<=e).length;for(let r of A){let i=o(0,40),l="crm_deals_ingest"===r?2:"transactions_ingest"===r?3:4,d="success",c="gold_sales_metrics"===r?o(18,35):o(6,15);"gold_sales_metrics"===r&&("2026-06-14"===t||"2026-06-15"===t||"2026-06-16"===t)&&(d="failed"),"crm_deals_ingest"===r&&"2026-07-22"===t&&(d="failed"),"transactions_ingest"===r&&"2026-05-09"===t&&(d="failed"),"success"===d&&s(.04)&&(d="late",c+=o(40,90));let u="crm_deals_ingest"===r?a:"transactions_ingest"===r?n:a+n;u+=o(-3,3);let m="failed"===d?0:u-o(0,4);"crm_deals_ingest"===r&&"2026-07-05"===t&&(m=Math.round(.3*m)),f.push({run_id:`RUN-${String(f.length+1).padStart(4,"0")}`,pipeline:r,run_date:t,started_at:v(e,l,i),finished_at:"failed"===d?null:v(e,l+Math.floor((i+c)/60),(i+c)%60),status:d,rows_in:Math.max(0,u),rows_out:Math.max(0,m)})}}let M=[],L=[],j=["Sales Rep","Sales Rep","Sales Rep","Sales Rep","Sales Manager","Sales Manager","RevOps","Finance","Executive"];for(let e=0;e<32;e++)L.push({id:`U-${_(e+1)}`,role:j[e%j.length]});let C=w("2026-06-01");for(let e=P;e<=x;e++){let t=new Date(y+864e5*e).getUTCDay();if(0===t||6===t)continue;let a=e<C?o(4,8):o(0,2);for(let t=0;t<a;t++){let t=L[o(0,11)];M.push({view_id:`V-${String(M.length+1).padStart(4,"0")}`,dashboard:"Pipeline Report (legacy)",viewer_id:t.id,viewer_role:t.role,viewed_at:v(e,o(8,18),o(0,59))})}if(e>=C){let t=Math.floor((e-C)/7),a=o(3,6)+Math.min(2*t,18),n=Math.min(32,10+2*t);for(let t=0;t<a;t++){let t=L[o(0,n-1)];M.push({view_id:`V-${String(M.length+1).padStart(4,"0")}`,dashboard:"Sales Funnel Accelerator",viewer_id:t.id,viewer_role:t.role,viewed_at:v(e,o(8,18),o(0,59))})}}}return{accounts:r,customers:i,deals:l,deal_stage_history:d,transactions:u,pipeline_runs:f,dashboard_views:M}}()),A}let M=`
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
`,L=[{table:"accounts",description:"Customer companies",columns:["account_id","account_name","industry","region","tier","created_date"]},{table:"customers",description:"Contacts at accounts",columns:["customer_id","account_id","full_name","role","email"]},{table:"deals",description:"One row per opportunity; stage is the current CRM value",columns:["deal_id","account_id","owner","stage","amount","source","created_date","closed_date"]},{table:"deal_stage_history",description:"Append-only log of stage transitions",columns:["history_id","deal_id","stage","entered_at"]},{table:"transactions",description:"Money movements against closed_won deals",columns:["transaction_id","deal_id","amount","transaction_date","type"]},{table:"pipeline_runs",description:"Daily run log for 3 pipelines (Apr–Aug 2026)",columns:["run_id","pipeline","run_date","started_at","finished_at","status","rows_in","rows_out"]},{table:"dashboard_views",description:"Usage events for the legacy and new dashboards",columns:["view_id","dashboard","viewer_id","viewer_role","viewed_at"]}];function j(e){return null==e?"NULL":"number"==typeof e?String(e):`'${e.replace(/'/g,"''")}'`}function C(e,t){let a=[];for(let o=0;o<t.length;o+=200){let n=t.slice(o,o+200).map(e=>`(${Object.values(e).map(j).join(",")})`).join(",\n");a.push(`INSERT INTO ${e} VALUES
${n};`)}return a}e.s(["SCHEMA_SQL",0,M,"TABLE_DOCS",0,L,"buildSeedSql",0,function(e=P()){return[...C("accounts",e.accounts),...C("customers",e.customers),...C("deals",e.deals),...C("deal_stage_history",e.deal_stage_history),...C("transactions",e.transactions),...C("pipeline_runs",e.pipeline_runs),...C("dashboard_views",e.dashboard_views)].join("\n")},"getDataset",0,P],77475),e.s(["TableReference",0,function(){return(0,t.jsxs)("details",{className:"bg-surface border border-border rounded-lg px-4 py-2 text-sm",children:[(0,t.jsx)("summary",{className:"cursor-pointer text-muted hover:text-fg",children:"Tables and columns (as of 31 Aug 2026)"}),(0,t.jsx)("ul",{className:"mt-3 space-y-2",children:L.map(e=>(0,t.jsxs)("li",{children:[(0,t.jsx)("span",{className:"font-mono font-semibold",children:e.table}),(0,t.jsxs)("span",{className:"text-muted",children:[" · ",e.description]}),(0,t.jsx)("p",{className:"font-mono text-xs text-muted mt-0.5 break-words",children:e.columns.join(", ")})]},e.table))})]})}],29187);let R=new Map;function D(e){return"number"==typeof e||"bigint"==typeof e}function I(e){return D(e)?"n:"+Number(e).toFixed(6):null==e?"null":"object"==typeof e?Array.isArray(e)?"["+e.map(I).join(",")+"]":"{"+Object.keys(e).sort().map(t=>JSON.stringify(t)+":"+I(e[t])).join(",")+"}":typeof e+":"+String(e).trim()}e.s(["loadScript",0,function(e){if("u"<typeof document)return Promise.reject(Error("loadScript can only run in the browser"));let t=R.get(e);if(t)return t;let a=new Promise((t,a)=>{let o=document.querySelector(`script[src="${e}"]`);if(o&&"true"===o.dataset.loaded)return void t();let n=o??document.createElement("script");n.src=e,n.async=!0,n.addEventListener("load",()=>{n.dataset.loaded="true",t()}),n.addEventListener("error",()=>{R.delete(e),a(Error(`Failed to load script: ${e}`))}),o||document.head.appendChild(n)});return R.set(e,a),a}],136),e.s(["columnsEqual",0,function(e,t){return e.length===t.length&&e.every((e,a)=>e.trim().toLowerCase()===t[a].trim().toLowerCase())},"deepEqual",0,function e(t,a,o=!1){if(Array.isArray(t)&&Array.isArray(a)){if(t.length!==a.length)return!1;if(o)return t.every((t,n)=>e(t,a[n],o));let n=[...t].sort((e,t)=>I(e).localeCompare(I(t))),s=[...a].sort((e,t)=>I(e).localeCompare(I(t)));return n.every((t,a)=>e(t,s[a],!0))}if(Array.isArray(t)||Array.isArray(a))return!1;if(null!==t&&null!==a&&"object"==typeof t&&"object"==typeof a){let n=Object.keys(t).sort(),s=Object.keys(a).sort();return n.length===s.length&&!!n.every((e,t)=>e===s[t])&&n.every(n=>e(t[n],a[n],o))}return null==t?null==a:null!=a&&(D(t)&&D(a)||D(t)&&"string"==typeof a&&""!==a.trim()&&!isNaN(Number(a))||D(a)&&"string"==typeof t&&""!==t.trim()&&!isNaN(Number(t))?1e-6>=Math.abs(Number(t)-Number(a)):"string"==typeof t&&"string"==typeof a?t.trim()===a.trim():"boolean"==typeof t&&"boolean"==typeof a&&t===a)}],36420)},26033,e=>{"use strict";let t=[{slug:"py0-count-rows",chapter:0,title:"How many deals are there?",difficulty:"warmup",prompt:"`deals` is a DataFrame. Set `result` to the number of rows in it.",starterCode:"result = None  # TODO: len(...)",solution:"result = len(deals)",walkthrough:"A DataFrame behaves like a table; `len(deals)` returns its number of rows, the same as `COUNT(*)`.",dpmConnection:{text:"len() on a DataFrame is COUNT(*). Knowing the row count is the sanity check before any other number.",kbSlug:"python-pandas-101"},hint:"len(deals)"},{slug:"py0-filter-sum",chapter:0,title:"Total amount of qualified deals",difficulty:"warmup",prompt:'Keep the rows where `stage == "qualified"`, then set `result` to the sum of their `amount`.',starterCode:`qualified = deals[deals["stage"] == "qualified"]
result = None  # TODO: sum of qualified["amount"]`,solution:`qualified = deals[deals["stage"] == "qualified"]
result = int(qualified["amount"].sum())`,walkthrough:'`deals["stage"] == "qualified"` produces True/False per row; wrapping it in `deals[...]` keeps the True rows. `["amount"]` selects one column and `.sum()` adds it up. `int()` turns the numpy number into a plain integer.',dpmConnection:{text:"Filter, pick a column, aggregate: WHERE + SUM in pandas.",kbSlug:"python-pandas-101"},hint:"qualified['amount'].sum()"},{slug:"py0-count-by-stage",chapter:0,title:"Deals per stage (groupby)",difficulty:"warmup",prompt:"Count deals per `stage`. Set `result` to a **dict** mapping each stage to its count.",starterCode:`counts = deals.groupby("stage")["deal_id"].count()
result = None  # TODO: counts.to_dict()`,solution:`counts = deals.groupby("stage")["deal_id"].count()
result = {k: int(v) for k, v in counts.to_dict().items()}`,walkthrough:'`groupby("stage")` splits rows by stage; `["deal_id"].count()` counts rows in each group. `.to_dict()` gives `{stage: count}`; the comprehension casts each count to a plain `int`.',dpmConnection:{text:"groupby + count is GROUP BY + COUNT(*). to_dict() hands the result back as plain keys and values.",kbSlug:"python-pandas-101"},hint:"counts.to_dict() — wrap values in int() if you build it by hand."},{slug:"py-count-closed-won",chapter:1,title:"Count the deals we won",difficulty:"warmup",prompt:'`deals` is a pandas DataFrame with a `stage` column.\n\nSet `result` to the **number** of rows where `stage == "closed_won"`.',starterCode:`# deals is already loaded as a pandas DataFrame.
won = deals[deals["stage"] == "closed_won"]
result = None  # TODO: how many rows are in won?`,solution:`won = deals[deals["stage"] == "closed_won"]
result = len(won)`,walkthrough:'Boolean filter, then `len()`. `deals["stage"] == "closed_won"` is the WHERE; `len(won)` is COUNT(*).',dpmConnection:{text:"Boolean filtering is the pandas equivalent of a WHERE clause. Being able to reproduce a number a dashboard shows is how a Data PM verifies it instead of trusting it.",kbSlug:"four-key-shifts"},hint:"len(won) or won.shape[0]."},{slug:"py-deals-closed-value",chapter:1,title:"Functional metric: deals_closed_value",difficulty:"warmup",prompt:"Set `result` to **deals_closed_value**: the sum of `amount` for all `closed_won` deals.",starterCode:`won = deals[deals["stage"] == "closed_won"]
result = None  # TODO: sum of won["amount"]`,solution:`won = deals[deals["stage"] == "closed_won"]
result = won["amount"].sum()`,walkthrough:"Filter to won rows, select the `amount` column, `.sum()`. The grader accepts a numpy number, but `int()` is a good habit.",dpmConnection:{text:"Same functional metric you computed in SQL. A Data PM who can compute a metric two independent ways can catch a pipeline bug that only shows up in one path.",kbSlug:"metric-types"},hint:"won['amount'].sum() — a numpy type is fine; the grader converts it."},{slug:"py-revenue-generated",chapter:1,title:"North Star metric: revenue_generated",difficulty:"warmup",prompt:"Set `result` to **revenue_generated**: the sum of `amount` across the `transactions` DataFrame.",starterCode:'result = None  # TODO: total of transactions["amount"]',solution:'result = transactions["amount"].sum()',walkthrough:'No filter: the whole `transactions["amount"]` column summed is the North Star.',dpmConnection:{text:"A different table than deals. The gap between revenue and won-deal value is renewals plus upsells (and, until chapter 3, some duplicates). Explaining that gap to the CFO is chapter 6.",kbSlug:"metric-types"},hint:"transactions['amount'].sum()"},{slug:"py-conversion-rate",chapter:1,title:"Granular metric: conversion_rate",difficulty:"warmup",prompt:"Set `result` to **conversion_rate** = won ÷ (won + lost), where won = `closed_won` deals and lost = `closed_lost` deals. Open deals are excluded. Round to 4 decimals.",starterCode:`won  = (deals["stage"] == "closed_won").sum()
lost = (deals["stage"] == "closed_lost").sum()
result = None  # TODO: round(won / (won + lost), 4)`,solution:`won = (deals["stage"] == "closed_won").sum()
lost = (deals["stage"] == "closed_lost").sum()
result = round(float(won / (won + lost)), 4)`,walkthrough:'`(deals["stage"] == "closed_won").sum()` counts True values, the pandas CASE WHEN. Divide wins by wins plus losses, cast to float, round to 4.',dpmConnection:{text:"Summing a boolean Series is the pandas idiom for a conditional COUNT, the same trick as CASE WHEN in SQL. The definition decision (exclude open deals) must be written down or every consumer computes it differently.",kbSlug:"ontology-as-infrastructure"},hint:"round(won / (won + lost), 4). Wrap in float() if you get a numpy type."},{slug:"py-groupby-account",chapter:2,title:"Won value by account (merge + groupby)",difficulty:"core",prompt:"Merge `deals` with `accounts` on `account_id`, keep only `closed_won` deals, then compute total won amount per **account_name**.\n\nSet `result` to a **list of dicts** with keys `account_name` and `total_won`, sorted by `total_won` descending, then `account_name` ascending.",starterCode:`won = deals[deals["stage"] == "closed_won"]
merged = won.merge(accounts, on="account_id")
grouped = (
    merged.groupby("account_name", as_index=False)["amount"]
    .sum()
    .rename(columns={"amount": "total_won"})
    .sort_values(["total_won", "account_name"], ascending=[False, True])
)
result = None  # TODO: grouped.to_dict("records")`,solution:`won = deals[deals["stage"] == "closed_won"]
merged = won.merge(accounts, on="account_id")
grouped = (merged.groupby("account_name", as_index=False)["amount"].sum()
    .rename(columns={"amount": "total_won"})
    .sort_values(["total_won", "account_name"], ascending=[False, True]))
result = grouped.to_dict("records")`,walkthrough:'`merge(accounts, on="account_id")` is the JOIN that brings in `account_name`. `groupby("account_name", as_index=False)["amount"].sum()` is GROUP BY + SUM; `rename` sets the column name the grader expects; `sort_values` with two keys matches the ORDER BY; `to_dict("records")` returns rows as dicts.',orderMatters:!0,dpmConnection:{text:"merge = JOIN, groupby = GROUP BY. This is the logical model's 'Relationships' (accounts 1:N deals) turned into a measure, the exact structure of a Metric Dependency Tree node.",kbSlug:"canvas-data-product-design"},hint:"The starter does the work; finish with .to_dict('records')."},{slug:"py-rep-performance",chapter:2,title:"Top-performing rep",difficulty:"core",prompt:"Group `closed_won` deals by `owner` and sum `amount`. Set `result` to a **dict** with keys `owner` and `total_won` for the single top rep.",starterCode:`won = deals[deals["stage"] == "closed_won"]
by_owner = won.groupby("owner")["amount"].sum().sort_values(ascending=False)
result = None  # TODO: {"owner": ..., "total_won": ...} for the first row`,solution:`won = deals[deals["stage"] == "closed_won"]
by_owner = won.groupby("owner")["amount"].sum().sort_values(ascending=False)
result = {"owner": by_owner.index[0], "total_won": int(by_owner.iloc[0])}`,walkthrough:'`groupby("owner")["amount"].sum()` gives a Series indexed by owner; `sort_values(ascending=False)` puts the top rep first. `.index[0]` is that owner\'s name and `.iloc[0]` the value, cast to int.',dpmConnection:{text:"Reading one row out of a grouped Series: by_owner.index[0] and by_owner.iloc[0]. Look at the concentration: if one rep is a big share of won value, one bad record on their deals swings the North Star.",kbSlug:"bullseye-data-product-market-fit"},hint:"result = {'owner': by_owner.index[0], 'total_won': int(by_owner.iloc[0])}"},{slug:"py-region-conversion",chapter:2,title:"conversion_rate by region",difficulty:"core",prompt:"Compute **conversion_rate** per **region** (region is on `accounts`; stage on `deals`): won ÷ (won + lost), open deals excluded, rounded to 4 decimals.\n\nSet `result` to a **list of dicts** with keys `region` and `conversion_rate`, sorted by region ascending.",starterCode:`closed = deals[deals["stage"].isin(["closed_won", "closed_lost"])]
merged = closed.merge(accounts, on="account_id")
merged = merged.assign(is_won=(merged["stage"] == "closed_won").astype(int))
grouped = (
    merged.groupby("region", as_index=False)["is_won"]
    .mean()
    .rename(columns={"is_won": "conversion_rate"})
    .sort_values("region")
)
grouped["conversion_rate"] = grouped["conversion_rate"].round(4)
result = None  # TODO: grouped.to_dict("records")`,solution:`closed = deals[deals["stage"].isin(["closed_won", "closed_lost"])]
merged = closed.merge(accounts, on="account_id")
merged = merged.assign(is_won=(merged["stage"] == "closed_won").astype(int))
grouped = (merged.groupby("region", as_index=False)["is_won"].mean()
    .rename(columns={"is_won": "conversion_rate"}).sort_values("region"))
grouped["conversion_rate"] = grouped["conversion_rate"].round(4)
result = grouped.to_dict("records")`,walkthrough:'`isin` keeps resolved deals; `merge` adds region; `assign(is_won=...)` creates a 0/1 column. The mean of a 0/1 column is the rate, so `groupby("region")["is_won"].mean()` is conversion by region. Round, sort, `to_dict("records")`.',orderMatters:!0,dpmConnection:{text:"The mean of a 0/1 indicator column IS the rate: a compact pandas idiom worth memorizing. Cross-entity slicing (measure on deals, dimension on accounts) is where join mistakes silently corrupt a metric.",kbSlug:"canvas-data-product-design"},hint:"The starter is complete except the last line."},{slug:"py-rca-source-lost",chapter:2,title:"Where are we losing deals?",difficulty:"core",prompt:"For each deal `source`, compute **lost_value** (sum of `amount` for `closed_lost` deals) and **lost_count**. Set `result` to a **list of dicts** with keys `source`, `lost_value`, `lost_count`, sorted by `lost_value` descending.",starterCode:`lost = deals[deals["stage"] == "closed_lost"]
grouped = (
    lost.groupby("source")
    .agg(lost_value=("amount", "sum"), lost_count=("deal_id", "count"))
    .reset_index()
    .sort_values("lost_value", ascending=False)
)
result = None  # TODO: grouped.to_dict("records")`,solution:`lost = deals[deals["stage"] == "closed_lost"]
grouped = (lost.groupby("source").agg(lost_value=("amount", "sum"), lost_count=("deal_id", "count"))
    .reset_index().sort_values("lost_value", ascending=False))
result = grouped.to_dict("records")`,walkthrough:'Filter to lost deals, then named aggregation: `.agg(lost_value=("amount", "sum"), lost_count=("deal_id", "count"))` computes both measures in one call. `reset_index` turns the group key back into a column before sorting and exporting.',orderMatters:!0,dpmConnection:{text:"Named aggregation (.agg(name=(col, fn))) computes several measures at once. The output is the raw material for an RCA conversation; the Data PM's job starts after this query.",kbSlug:"proof-of-value-performance"},hint:"grouped.to_dict('records')."}];e.s(["pythonExercises",0,t,"pythonExercisesForChapter",0,function(e){return t.filter(t=>t.chapter===e)}])},19846,(e,t,a)=>{t.exports={"py0-count-rows":420,"py0-filter-sum":479e3,"py0-count-by-stage":{closed_lost:169,closed_won:198,negotiation:18,proposal:23,qualified:12},"py-count-closed-won":198,"py-deals-closed-value":0xbb7254,"py-revenue-generated":0xdfb204,"py-conversion-rate":.5395,"py-groupby-account":[{account_name:"Initech Software",total_won:1657e3},{account_name:"InGen Life Sciences",total_won:1108e3},{account_name:"Dunder Paper Co",total_won:986500},{account_name:"Wonka Foods",total_won:808500},{account_name:"Wayne Manufacturing",total_won:686e3},{account_name:"Rekall Travel",total_won:622e3},{account_name:"Tyrell Bio",total_won:614e3},{account_name:"Sirius Cybernetics",total_won:527e3},{account_name:"Buy n Large Retail",total_won:495500},{account_name:"Gringotts Fintech",total_won:45e4},{account_name:"Mooby Entertainment",total_won:317e3},{account_name:"Northwind Traders",total_won:310500},{account_name:"Virtucon",total_won:300500},{account_name:"Zorg Industries",total_won:258e3},{account_name:"Monarch Solutions",total_won:229500},{account_name:"Oceanic Airlines",total_won:224500},{account_name:"Nakatomi Trading",total_won:217500},{account_name:"Brawndo Beverages",total_won:215500},{account_name:"Wernham Hogg",total_won:204e3},{account_name:"Oscorp Materials",total_won:201500},{account_name:"Cheers Hospitality",total_won:189e3},{account_name:"Globex Logistics",total_won:188e3},{account_name:"Hooli Media",total_won:172500},{account_name:"Aperture Labs",total_won:166e3},{account_name:"Sterling Cooper",total_won:157e3},{account_name:"Massive Dynamic",total_won:137500},{account_name:"Acme Robotics",total_won:104500},{account_name:"Weyland Energy",total_won:103e3},{account_name:"Ollivander Supply",total_won:91500},{account_name:"Cyberdyne Systems",total_won:7e4},{account_name:"Vandelay Imports",total_won:68500},{account_name:"Bluth Homes",total_won:66e3},{account_name:"Los Pollos Foods",total_won:65500},{account_name:"Kwik-E-Mart Group",total_won:62e3},{account_name:"Umbrella Health",total_won:58e3},{account_name:"Stark Analytics",total_won:48e3},{account_name:"Pied Piper Cloud",total_won:46e3},{account_name:"Paper Street Soap",total_won:32e3},{account_name:"Soylent Nutrition",total_won:26500}],"py-rep-performance":{owner:"Jordan Blake",total_won:3203e3},"py-region-conversion":[{region:"AMER",conversion_rate:.5393},{region:"APAC",conversion_rate:.5325},{region:"EMEA",conversion_rate:.5446}],"py-rca-source-lost":[{source:"Outbound",lost_value:5655500,lost_count:90},{source:"Inbound",lost_value:3075500,lost_count:51},{source:"Referral",lost_value:1477e3,lost_count:28}]}},87110,e=>{"use strict";let t=[{slug:"what-is-a-data-product-manager",title:"What is a Data Product Manager?",category:"definition",tags:["role","fundamentals"],summary:"A DPM sits at the intersection of data, technology, and business, managing data warehouses, platforms, pipelines, and ML models the way a PM manages a product.",body:`A **Data Product Manager (DPM)** is a specialized role at the intersection of
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
**source-aligned** product if it had a contract and an owner.`,source:"Modern Data 101 (Defining the True Data Product; Anatomy; Canonical Core; product types), from the user's notes."}];e.s(["kbEntries",0,t])},82364,76091,e=>{"use strict";var t=e.i(87110);function a(e){return e.startsWith("/")?`/dpm-lab${e}`:e}e.s(["withBasePath",0,a],76091);let o=new Map(t.kbEntries.map(e=>[e.slug,e]));e.s(["getKbEntry",0,function(e){return o.get(e)},"resolveWikiLinks",0,function(e){return e.replace(/\[\[([a-z0-9-]+)\]\]/g,(e,t)=>{let n=o.get(t);return n?`[${n.title}](${a(`/kb/${t}`)})`:`\`${t}\``})}],82364)},90317,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0});var o={bindSnapshot:function(){return d},createAsyncLocalStorage:function(){return l},createSnapshot:function(){return c}};for(var n in o)Object.defineProperty(a,n,{enumerable:!0,get:o[n]});let s=Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"),"__NEXT_ERROR_CODE",{value:"E504",enumerable:!1,configurable:!0});class r{disable(){throw s}getStore(){}run(){throw s}exit(){throw s}enterWith(){throw s}static bind(e){return e}}let i="u">typeof globalThis&&globalThis.AsyncLocalStorage;function l(){return i?new i:new r}function d(e){return i?i.bind(e):r.bind(e)}function c(){return i?i.snapshot():function(e,...t){return e(...t)}}},42344,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"workAsyncStorageInstance",{enumerable:!0,get:function(){return o}});let o=(0,e.r(90317).createAsyncLocalStorage)()},63599,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"workAsyncStorage",{enumerable:!0,get:function(){return o.workAsyncStorageInstance}});let o=e.r(42344)},9885,(e,t,a)=>{"use strict";function o(e){return e.split("/").map(e=>encodeURIComponent(e)).join("/")}Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"encodeURIPath",{enumerable:!0,get:function(){return o}})},67585,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"BailoutToCSR",{enumerable:!0,get:function(){return n}});let o=e.r(32061);function n({reason:e,children:t}){if("u"<typeof window)throw Object.defineProperty(new o.BailoutToCSRError(e),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return t}},52157,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"PreloadChunks",{enumerable:!0,get:function(){return l}});let o=e.r(18050),n=e.r(74080),s=e.r(63599),r=e.r(9885),i=e.r(43369);function l({moduleIds:e}){if("u">typeof window)return null;let t=s.workAsyncStorage.getStore();if(void 0===t)return null;let a=[];if(t.reactLoadableManifest&&e){let o=t.reactLoadableManifest;for(let t of e){if(!o[t])continue;let e=o[t].files;a.push(...e)}}if(0===a.length)return null;let d=(0,i.getAssetTokenQuery)();return(0,o.jsx)(o.Fragment,{children:a.map(e=>{let a=`${t.assetPrefix}/_next/${(0,r.encodeURIPath)(e)}${d}`;return e.endsWith(".css")?(0,o.jsx)("link",{precedence:"dynamic",href:a,rel:"stylesheet",as:"style",nonce:t.nonce},e):((0,n.preload)(a,{as:"script",fetchPriority:"low",nonce:t.nonce}),null)})})}},69093,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"default",{enumerable:!0,get:function(){return d}});let o=e.r(18050),n=e.r(71645),s=e.r(67585),r=e.r(52157);function i(e){return{default:e&&"default"in e?e.default:e}}let l={loader:()=>Promise.resolve(i(()=>null)),loading:null,ssr:!0},d=function(e){let t={...l,...e},a=(0,n.lazy)(()=>t.loader().then(i)),d=t.loading;function c(e){let i=d?(0,o.jsx)(d,{isLoading:!0,pastDelay:!0,error:null}):null,l=!t.ssr||!!t.loading,c=l?n.Suspense:n.Fragment,u=t.ssr?(0,o.jsxs)(o.Fragment,{children:["u"<typeof window?(0,o.jsx)(r.PreloadChunks,{moduleIds:t.modules}):null,(0,o.jsx)(a,{...e})]}):(0,o.jsx)(s.BailoutToCSR,{reason:"next/dynamic",children:(0,o.jsx)(a,{...e})});return(0,o.jsx)(c,{...l?{fallback:i}:{},children:u})}return c.displayName="LoadableComponent",c}},70703,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"default",{enumerable:!0,get:function(){return n}});let o=e.r(55682)._(e.r(69093));function n(e,t){let a={};"function"==typeof e&&(a.loader=e);let n={...a,...t};return(0,o.default)({...n,modules:n.loadableGenerated?.modules})}("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),t.exports=a.default)}]);