(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,52758,e=>{"use strict";var t=e.i(18050),a=e.i(22016),s=e.i(18566),r=e.i(71645),n=e.i(21683);function o(e,t){let a=[...e],s=function(e){let t=0x811c9dc5;for(let a=0;a<e.length;a++)t^=e.charCodeAt(a),t=Math.imul(t,0x1000193);return t>>>0}(t)||1,r=()=>{let e=s=s+0x6d2b79f5>>>0;return e=Math.imul(e^e>>>15,1|e),(((e^=e+Math.imul(e^e>>>7,61|e))^e>>>14)>>>0)/0x100000000};for(let e=a.length-1;e>0;e--){let t=Math.floor(r()*(e+1));[a[e],a[t]]=[a[t],a[e]]}return a}function i(e){switch(e.kind){case"mcq":return{kind:"mcq",choice:null};case"truefalse":return{kind:"truefalse",choice:null};case"fill":return{kind:"fill",word:null};case"order":return{kind:"order",sequence:[]};case"match":return{kind:"match",matched:new Set,selectedLeft:null,selectedRight:null,mistakes:0};default:return{kind:"concept"}}}function l(e,t){switch(e.kind){case"mcq":return"mcq"===t.kind&&null!==t.choice;case"truefalse":return"truefalse"===t.kind&&null!==t.choice;case"fill":return"fill"===t.kind&&null!==t.word;case"order":return"order"===t.kind&&t.sequence.length===e.steps.length;case"match":return"match"===t.kind&&t.matched.size===e.pairs.length;default:return!0}}function c(e){return o(e.steps.map((e,t)=>t),e.id)}function d(e){switch(e.kind){case"mcq":return e.options[e.correct];case"truefalse":return e.answer?"True":"False";case"fill":return e.answer;case"order":return e.steps.map((e,t)=>`${t+1}. ${e}`).join("  ");default:return null}}let u="w-full text-left rounded-xl border-2 px-4 py-3 text-[0.95rem] transition-colors disabled:cursor-default",m="border-border bg-surface hover:border-accent",h="border-accent bg-accent-soft",p="border-success bg-success-soft",g="border-danger bg-danger-soft";function f({item:e}){return(0,t.jsxs)("div",{className:"animate-pop",children:[(0,t.jsx)("p",{className:"text-xs uppercase tracking-wide text-accent font-semibold mb-2",children:"Concept"}),(0,t.jsx)("h2",{className:"text-2xl font-semibold tracking-tight mb-3",children:e.title}),(0,t.jsx)(n.Markdown,{className:"text-[1.02rem]",children:e.body})]})}function y({item:e,answer:a,setAnswer:s,locked:r}){let o="mcq"===a.kind?a.choice:null;return(0,t.jsxs)("div",{className:"space-y-4 animate-pop",children:[(0,t.jsx)(n.Markdown,{className:"text-[1.02rem]",children:e.prompt}),(0,t.jsx)("ol",{className:"space-y-2",children:e.options.map((a,n)=>{let i=m;return r?i=n===e.correct?p:n===o?g:"border-border opacity-60":o===n&&(i=h),(0,t.jsx)("li",{children:(0,t.jsxs)("button",{disabled:r,onClick:()=>s({kind:"mcq",choice:n}),className:`${u} ${i}`,children:[(0,t.jsx)("span",{className:"font-mono text-muted mr-3",children:String.fromCharCode(65+n)}),a]})},n)})})]})}function b({item:e,answer:a,setAnswer:s,locked:r}){let n="truefalse"===a.kind?a.choice:null;return(0,t.jsxs)("div",{className:"space-y-5 animate-pop",children:[(0,t.jsx)("p",{className:"text-xs uppercase tracking-wide text-muted",children:"True or false?"}),(0,t.jsx)("p",{className:"text-xl font-medium leading-snug",children:e.statement}),(0,t.jsx)("div",{className:"grid grid-cols-2 gap-3",children:[!0,!1].map(a=>{let o=m;return r?o=a===e.answer?p:a===n?g:"border-border opacity-60":n===a&&(o=h),(0,t.jsx)("button",{disabled:r,onClick:()=>s({kind:"truefalse",choice:a}),className:`${u} text-center font-semibold py-4 ${o}`,children:a?"True":"False"},String(a))})})]})}function w({item:e,answer:a,setAnswer:s,locked:n}){let i="fill"===a.kind?a.word:null,l=(0,r.useMemo)(()=>o(e.bank,e.id),[e]),[c,d]=e.prompt.split("___");return(0,t.jsxs)("div",{className:"space-y-5 animate-pop",children:[(0,t.jsx)("p",{className:"text-xs uppercase tracking-wide text-muted",children:"Fill the blank"}),(0,t.jsxs)("p",{className:"text-xl leading-relaxed",children:[c,(0,t.jsx)("span",{className:`inline-block min-w-[6rem] border-b-2 px-2 mx-1 text-center font-semibold ${n?i===e.answer?"border-success text-success":"border-danger text-danger":i?"border-accent text-accent":"border-border"}`,children:i??" "}),d]}),(0,t.jsx)("div",{className:"flex flex-wrap gap-2",children:l.map(a=>{let r=i===a,o="border-border bg-surface hover:border-accent";return n?o=a===e.answer?p:r?g:"border-border opacity-60":r&&(o="border-accent bg-accent-soft"),(0,t.jsx)("button",{disabled:n,onClick:()=>s({kind:"fill",word:r?null:a}),className:`rounded-xl border-2 px-4 py-2.5 text-[0.95rem] font-medium transition-colors ${o}`,children:a},a)})})]})}function x({item:e,answer:a,setAnswer:s,locked:n}){let o=(0,r.useMemo)(()=>c(e),[e]),i="order"===a.kind?a.sequence:[],l=o.map((e,t)=>t).filter(e=>!i.includes(e));return(0,t.jsxs)("div",{className:"space-y-5 animate-pop",children:[(0,t.jsx)("p",{className:"text-xs uppercase tracking-wide text-muted",children:"Put in order"}),(0,t.jsx)("p",{className:"text-lg font-medium leading-snug",children:e.prompt}),(0,t.jsxs)("ol",{className:"space-y-2 min-h-[3rem]",children:[i.map((a,r)=>{let l=o[a];return(0,t.jsx)("li",{children:(0,t.jsxs)("button",{disabled:n,onClick:()=>s({kind:"order",sequence:i.filter(e=>e!==a)}),className:`${u} flex gap-3 ${n?l===r?p:g:h}`,children:[(0,t.jsxs)("span",{className:"font-mono text-muted",children:[r+1,"."]}),(0,t.jsx)("span",{children:e.steps[l]})]})},a)}),0===i.length&&(0,t.jsx)("li",{className:"text-sm text-muted px-1",children:"Tap the steps below in the right order."})]}),(0,t.jsx)("div",{className:"flex flex-wrap gap-2",children:l.map(a=>(0,t.jsx)("button",{disabled:n,onClick:()=>s({kind:"order",sequence:[...i,a]}),className:"rounded-xl border-2 border-border bg-surface hover:border-accent px-4 py-2.5 text-[0.95rem] text-left transition-colors",children:e.steps[o[a]]},a))})]})}function v({item:e,answer:a,setAnswer:s,locked:n}){let i="match"===a.kind?a:{kind:"match",matched:new Set,selectedLeft:null,selectedRight:null,mistakes:0},l=(0,r.useMemo)(()=>o(e.pairs.map((e,t)=>t),e.id),[e]),c=(e,a,r)=>{let o=i.matched.has(e),l="left"===a?i.selectedLeft===e:i.selectedRight===e,c="border-border bg-surface hover:border-accent";return o?c="border-success bg-success-soft opacity-80":l&&(c="border-accent bg-accent-soft"),(0,t.jsx)("button",{disabled:n||o,onClick:()=>((e,t)=>{if(n||i.matched.has(t)&&"left"===e)return;let a={...i,matched:new Set(i.matched)};"left"===e?a.selectedLeft=i.selectedLeft===t?null:t:a.selectedRight=i.selectedRight===t?null:t,null!==a.selectedLeft&&null!==a.selectedRight&&(a.selectedLeft===a.selectedRight?a.matched.add(a.selectedLeft):a.mistakes+=1,a.selectedLeft=null,a.selectedRight=null),s(a)})(a,e),className:`w-full min-h-[3.25rem] rounded-xl border-2 px-3 py-2 text-sm text-left transition-colors ${c}`,children:r},`${a}-${e}`)};return(0,t.jsxs)("div",{className:"space-y-4 animate-pop",children:[(0,t.jsx)("p",{className:"text-xs uppercase tracking-wide text-muted",children:"Match the pairs"}),(0,t.jsx)("p",{className:"text-lg font-medium leading-snug",children:e.prompt}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-2",children:[(0,t.jsx)("div",{className:"space-y-2",children:e.pairs.map((e,t)=>c(t,"left",e[0]))}),(0,t.jsx)("div",{className:"space-y-2",children:l.map(t=>c(t,"right",e.pairs[t][1]))})]}),i.mistakes>0&&!n&&(0,t.jsxs)("p",{className:"text-xs text-danger",children:["Not that pair. ",i.mistakes," miss",1===i.mistakes?"":"es"," so far."]})]})}function k(e){let{item:a}=e;switch(a.kind){case"concept":return(0,t.jsx)(f,{item:a});case"mcq":return(0,t.jsx)(y,{...e,item:a});case"truefalse":return(0,t.jsx)(b,{...e,item:a});case"fill":return(0,t.jsx)(w,{...e,item:a});case"order":return(0,t.jsx)(x,{...e,item:a});case"match":return(0,t.jsx)(v,{...e,item:a})}}var N=e.i(6e4),S=e.i(82364),j=e.i(74581),P=e.i(7664);function E(e){return{queue:e.items.map((e,t)=>t),pos:0,answer:i(e.items[0]),phase:"answer",hearts:3,lastCorrect:!1,firstTry:{},requeued:new Set,missed:[]}}function D({full:e}){return(0,t.jsx)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:e?"currentColor":"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,className:e?"text-danger":"text-border",children:(0,t.jsx)("path",{d:"M12 21s-7-4.6-9.3-8.6C.8 9.1 2.6 5 6.5 5c2.1 0 3.4 1.2 4.1 2.2h2.8C14.1 6.2 15.4 5 17.5 5c3.9 0 5.7 4.1 3.8 7.4C19 16.4 12 21 12 21z"})})}e.s(["LessonPlayer",0,function({lesson:e}){let n=(0,s.useRouter)(),{recordLessonComplete:o}=(0,j.useProgress)(),[u,m]=(0,r.useState)(()=>E(e)),h=N.units.find(t=>t.number===e.unit),p=u.queue[u.pos],g=e.items[p],f=e.items.filter(e=>"concept"!==e.kind).length,y=Object.keys(u.firstTry).length,b=e.items.length?(u.pos+ +("feedback"===u.phase))/u.queue.length:0,w=(0,r.useMemo)(()=>{let e=Object.values(u.firstTry);return e.length?e.filter(Boolean).length/e.length:1},[u.firstTry]),x=t=>{m(a=>{let s=a.queue,r=a.requeued;t||a.requeued.has(p)||(s=[...a.queue,p],(r=new Set(a.requeued)).add(p));let n=a.pos+1;return n>=s.length?{...a,queue:s,requeued:r,phase:"complete"}:{...a,queue:s,requeued:r,pos:n,answer:i(e.items[s[n]]),phase:"answer"}})},v=()=>{if(!g)return;if("concept"===g.kind)return void x(!0);let e=function(e,t){switch(e.kind){case"mcq":return"mcq"===t.kind&&t.choice===e.correct;case"truefalse":return"truefalse"===t.kind&&t.choice===e.answer;case"fill":return"fill"===t.kind&&t.word===e.answer;case"order":{if("order"!==t.kind)return!1;let a=c(e);return t.sequence.every((e,t)=>a[e]===t)}case"match":return"match"===t.kind&&0===t.mistakes;default:return!0}}(g,u.answer);m(t=>{let a=void 0===t.firstTry[p]?{...t.firstTry,[p]:e}:t.firstTry,s=e?t.hearts:t.hearts-1,r=e||t.missed.includes(p)?t.missed:[...t.missed,p];return{...t,phase:s<=0?"failed":"feedback",lastCorrect:e,hearts:s,firstTry:a,missed:r}})};if((0,r.useEffect)(()=>{"complete"===u.phase&&o(e.id,w)},[u.phase,e.id,w,o]),(0,r.useEffect)(()=>{let e=e=>{"Enter"===e.key&&("answer"===u.phase&&g&&l(g,u.answer)?v():"feedback"===u.phase&&x(u.lastCorrect))};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)}),"complete"===u.phase){let a=w>=1,s=P.XP_LESSON+(a?P.XP_PERFECT_BONUS:0);return(0,t.jsxs)("div",{className:"flex-1 flex flex-col items-center justify-center text-center px-6 py-10 gap-4 animate-pop",children:[(0,t.jsx)("div",{className:"w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl",style:{background:h.color},children:a?"★":"✓"}),(0,t.jsx)("h1",{className:"text-2xl font-semibold tracking-tight",children:a?"Perfect lesson":"Lesson complete"}),(0,t.jsx)("p",{className:"text-muted",children:e.title}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-3 w-full max-w-xs mt-2",children:[(0,t.jsxs)("div",{className:"rounded-xl border border-border bg-surface p-3",children:[(0,t.jsx)("p",{className:"text-xs uppercase tracking-wide text-muted",children:"XP earned"}),(0,t.jsxs)("p",{className:"text-2xl font-semibold tabular-nums text-accent",children:["+",s]})]}),(0,t.jsxs)("div",{className:"rounded-xl border border-border bg-surface p-3",children:[(0,t.jsx)("p",{className:"text-xs uppercase tracking-wide text-muted",children:"Accuracy"}),(0,t.jsxs)("p",{className:"text-2xl font-semibold tabular-nums",children:[Math.round(100*w),"%"]})]})]}),(0,t.jsx)("button",{onClick:()=>n.push("/"),className:"mt-4 w-full max-w-xs px-5 py-3.5 rounded-xl font-semibold text-white node-shadow",style:{background:h.color},children:"Continue"})]})}if("failed"===u.phase)return(0,t.jsxs)("div",{className:"flex-1 flex flex-col px-5 py-8 gap-4 max-w-xl mx-auto w-full animate-pop",children:[(0,t.jsxs)("div",{className:"text-center space-y-2",children:[(0,t.jsx)("div",{className:"flex justify-center gap-1",children:Array.from({length:3}).map((e,a)=>(0,t.jsx)(D,{full:!1},a))}),(0,t.jsx)("h1",{className:"text-2xl font-semibold tracking-tight",children:"Out of hearts"}),(0,t.jsx)("p",{className:"text-muted",children:"Review what you missed, then try again. No XP this round."})]}),(0,t.jsx)("ul",{className:"space-y-3",children:u.missed.map(a=>{let s=e.items[a];if("concept"===s.kind)return null;let r=d(s);return(0,t.jsxs)("li",{className:"rounded-xl border border-border bg-surface p-4 text-sm space-y-1",children:[(0,t.jsx)("p",{className:"text-xs uppercase tracking-wide text-muted",children:"truefalse"===s.kind?"True or false":s.kind}),r&&(0,t.jsxs)("p",{children:[(0,t.jsx)("span",{className:"font-semibold",children:"Answer:"})," ",r]}),(0,t.jsx)("p",{className:"text-muted",children:s.explanation})]},a)})}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-3 mt-auto",children:[(0,t.jsx)(a.default,{href:"/",className:"px-4 py-3 rounded-xl border-2 border-border text-center font-semibold",children:"Back"}),(0,t.jsx)("button",{onClick:()=>m(E(e)),className:"px-4 py-3 rounded-xl font-semibold text-white node-shadow",style:{background:h.color},children:"Try again"})]})]});if(!g)return null;let A="feedback"===u.phase,M=g.kbSlug?(0,S.getKbEntry)(g.kbSlug):void 0,T=d(g),O="mcq"!==g.kind||"mcq"!==u.answer.kind||null===u.answer.choice||u.lastCorrect?void 0:g.optionNotes?.[u.answer.choice];return(0,t.jsxs)("div",{className:"flex-1 flex flex-col",children:[(0,t.jsxs)("div",{className:"px-4 pt-4 pb-2 flex items-center gap-3 max-w-2xl w-full mx-auto",children:[(0,t.jsx)(a.default,{href:"/","aria-label":"Quit lesson",className:"text-muted hover:text-fg text-2xl leading-none px-1",children:"×"}),(0,t.jsx)("div",{className:"flex-1 h-3 rounded-full bg-border overflow-hidden",children:(0,t.jsx)("div",{className:"h-full rounded-full transition-all duration-300",style:{width:`${Math.round(100*b)}%`,background:h.color}})}),(0,t.jsx)("div",{className:"flex gap-0.5","aria-label":`${u.hearts} hearts left`,children:Array.from({length:3}).map((e,a)=>(0,t.jsx)(D,{full:a<u.hearts},a))})]}),(0,t.jsxs)("p",{className:"text-center text-[0.7rem] uppercase tracking-wide text-muted",children:[h.week," · ",e.title,u.requeued.has(p)&&u.pos>=e.items.length?" · one more time":""]}),(0,t.jsx)("div",{className:"flex-1 px-5 py-6 max-w-2xl w-full mx-auto",children:(0,t.jsx)(k,{item:g,answer:u.answer,setAnswer:e=>m(t=>({...t,answer:e})),locked:A})}),(0,t.jsx)("div",{className:`border-t safe-bottom pt-4 ${A?u.lastCorrect?"bg-success-soft border-success/30":"bg-danger-soft border-danger/30":"bg-surface border-border"}`,children:(0,t.jsxs)("div",{className:"max-w-2xl w-full mx-auto px-5 space-y-3",children:[A&&(0,t.jsxs)("div",{className:`animate-slide-up ${u.lastCorrect?"text-success":"text-danger"}`,children:[(0,t.jsx)("p",{className:"font-semibold text-lg",children:u.lastCorrect?"Correct!":"Not quite"}),!u.lastCorrect&&T&&(0,t.jsxs)("p",{className:"text-sm",children:[(0,t.jsx)("span",{className:"font-semibold",children:"Answer:"})," ",T]}),O&&(0,t.jsx)("p",{className:"text-sm mt-1",children:O}),(0,t.jsx)("p",{className:"text-sm mt-1 text-fg/80",children:"concept"!==g.kind?g.explanation:""}),M&&(0,t.jsxs)(a.default,{href:`/kb/${M.slug}`,className:"text-xs underline underline-offset-2 mt-1 inline-block",children:["Read: ",M.title]})]}),A?(0,t.jsx)("button",{onClick:()=>x(u.lastCorrect),className:`w-full px-5 py-3.5 rounded-xl font-semibold text-white node-shadow ${u.lastCorrect?"bg-success":"bg-danger"}`,children:"Continue"}):(0,t.jsx)("button",{onClick:v,disabled:!l(g,u.answer),className:"w-full px-5 py-3.5 rounded-xl font-semibold text-white disabled:opacity-40 node-shadow",style:{background:h.color},children:"concept"===g.kind?"Continue":"Check"}),(0,t.jsxs)("p",{className:"text-center text-[0.7rem] text-muted",children:[y,"/",f," answered · Enter to ",A?"continue":"check"]})]})})]})}],52758)},87110,e=>{"use strict";let t=[{slug:"what-is-a-data-product-manager",title:"What is a Data Product Manager?",category:"definition",tags:["role","fundamentals"],summary:"A DPM sits at the intersection of data, technology, and business, managing data warehouses, platforms, pipelines, and ML models the way a PM manages a product.",body:`A **Data Product Manager (DPM)** is a specialized role at the intersection of
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
   negotiation usually mean lead quality; early losses mean targeting.`,source:"Synthesized for DPM Lab; builds on the Playbook's Metric Dependency Tree."},{slug:"sql-toolkit-for-data-pms",title:"The SQL a Data PM Actually Uses",category:"definition",tags:["sql","skills"],summary:"CTEs for readable steps, window functions for per-row context, date bucketing for trends, and the four bugs that silently corrupt metrics.",body:"You are not writing production pipelines. You are verifying numbers,\nsizing problems, and reading other people's queries. That needs a small,\nsharp toolkit.\n\n## Shapes you'll write every week\n- **CTEs** (`WITH x AS (...)`) — one step per CTE, named after what it\n  produces (`resolved_deals`, `latest_stage`). Readable beats clever.\n- **Window functions** — `ROW_NUMBER() OVER (PARTITION BY deal_id ORDER BY\n  entered_at DESC)` for \"latest per entity\"; `LAG`/`LEAD` for change\n  between rows; `SUM(...) OVER (ORDER BY month)` for running totals;\n  `AVG(...) OVER (... ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)` for moving\n  averages.\n- **Date bucketing** — `substr(date, 1, 7)` for month, `strftime('%Y-%W',\n  ts)` for ISO-ish week, `julianday(b) - julianday(a)` for day differences\n  (SQLite).\n- **Conditional aggregation** — `SUM(CASE WHEN ... THEN 1 ELSE 0 END)` (or\n  `SUM(condition)` in SQLite) to compute several rates in one pass.\n- **HAVING** — filter *after* aggregation; the idiom for duplicates:\n  `GROUP BY key HAVING COUNT(*) > 1`.\n\n## The four silent metric bugs\n1. **Join fan-out** — joining a 1:N table before an aggregate multiplies\n   the measure. Aggregate the N side first.\n2. **LEFT JOIN + WHERE on the right table** — turns it into an inner join\n   and hides exactly the missing rows you were looking for. Put the\n   condition in `ON`.\n3. **COUNT(*) vs COUNT(DISTINCT x)** — views vs viewers, rows vs people.\n4. **Integer division** — `7 / 10 = 0` in many engines. Multiply by\n   `1.0` first.\n\n## Grain first, window second\nDecide what one row means (a deal? a month?), aggregate to that grain in a\nCTE, *then* apply windows. Running totals and moving averages on the wrong\ngrain look plausible and are wrong.",source:"Synthesized for DPM Lab."},{slug:"sql-101",title:"SQL 101: the formulas",category:"definition",tags:["sql","basics","level-0"],summary:"The clause order, filters, aggregates, GROUP BY/HAVING, and joins that every exercise in this app is built from.",body:"## The sentence\n```sql\nSELECT column_a, column_b        -- which columns\nFROM table_name                  -- which table\nWHERE condition                  -- which rows\nGROUP BY column_a                -- one row per value\nHAVING COUNT(*) > 1              -- filter groups\nORDER BY column_b DESC           -- sort\nLIMIT 10;                        -- keep n rows\n```\nClauses are optional but their order is fixed. Text goes in single quotes;\nnumbers don't. `;` ends the statement.\n\n## Filters\n| Want | Write |\n|---|---|\n| both | `a = 1 AND b = 2` |\n| either | `a = 1 OR b = 2` (use parentheses with AND) |\n| any of a list | `stage IN ('closed_won', 'closed_lost')` |\n| a range | `amount BETWEEN 1000 AND 5000` |\n| not equal | `stage <> 'closed_lost'` |\n| missing | `closed_date IS NULL` (never `= NULL`) |\n| pattern | `email LIKE '%@northwind%'` |\n\n## Aggregates\n`COUNT(*)`, `COUNT(col)` (non-NULL only), `SUM`, `AVG`, `MIN`, `MAX`.\nName the result: `SUM(amount) AS total`. In SQLite, `SUM(stage = 'closed_won')`\ncounts rows where the comparison is true, and `1.0 * a / b` forces decimal\ndivision.\n\n## GROUP BY / HAVING\nEvery SELECT column must be grouped or aggregated. `WHERE` filters rows\nbefore grouping; `HAVING` filters groups after. The duplicate idiom:\n`GROUP BY key HAVING COUNT(*) > 1`.\n\n## Joins\n```sql\nFROM deals d\nJOIN accounts a ON a.account_id = d.account_id        -- only matches\nLEFT JOIN transactions t ON t.deal_id = d.deal_id     -- all deals, NULL if none\n```\nQualify columns after a join (`d.amount`). Conditions on the right-hand table\nof a LEFT JOIN belong in `ON`, not `WHERE`.\n\n## Dates and text (SQLite)\n`substr(created_date, 1, 7)` → month; `strftime('%Y-%W', ts)` → week;\n`julianday(b) - julianday(a)` → days between.",source:"Synthesized for DPM Lab (Level 0)."},{slug:"python-pandas-101",title:"Python & pandas 101: the formulas",category:"definition",tags:["python","pandas","basics","level-0"],summary:"Lists, dicts, and the DataFrame moves that mirror SQL: select, filter, group, sort, merge.",body:"## Python in one breath\n```python\nx = 5                                   # variable\nstages = ['qualified', 'proposal']      # list; stages[0], len(stages)\ndeal = {'id': 'D-1', 'amount': 5000}    # dict; deal['amount']\nround(2 / 3, 4)                         # 0.6667\n[s for s in stages if s != 'proposal']  # list comprehension (a filter)\n```\n`==` compares, `=` assigns. `//` is integer division. Indentation defines\nblocks.\n\n## pandas ↔ SQL\n| SQL | pandas |\n|---|---|\n| `SELECT deal_id, amount FROM deals` | `deals[['deal_id', 'amount']]` |\n| `WHERE stage = 'closed_won'` | `deals[deals['stage'] == 'closed_won']` |\n| `WHERE a AND b` | `deals[(cond_a) & (cond_b)]` — parentheses required |\n| `WHERE stage IN (...)` | `deals[deals['stage'].isin([...])]` |\n| `COUNT(*)` | `len(deals)` |\n| `SUM(amount)` | `deals['amount'].sum()` |\n| `GROUP BY owner, SUM(amount)` | `deals.groupby('owner')['amount'].sum()` |\n| `ORDER BY amount DESC` | `.sort_values('amount', ascending=False)` |\n| `LIMIT 5` | `.head(5)` |\n| `JOIN accounts ON account_id` | `deals.merge(accounts, on='account_id')` |\n| `LEFT JOIN` | `.merge(..., how='left')` |\n| several aggregates | `.agg(total=('amount', 'sum'), n=('deal_id', 'count'))` |\n\n## Getting an answer out\n`result = df.to_dict('records')` for rows; `int(x)` / `float(x)` to turn a\nnumpy number into a plain one; `(deals['stage'] == 'closed_won').sum()`\ncounts True values, the pandas CASE WHEN.",source:"Synthesized for DPM Lab (Level 0)."}];e.s(["kbEntries",0,t])},82364,76091,e=>{"use strict";var t=e.i(87110);function a(e){return e.startsWith("/")?`/dpm-lab${e}`:e}e.s(["withBasePath",0,a],76091);let s=new Map(t.kbEntries.map(e=>[e.slug,e]));e.s(["CATEGORY_LABELS",0,{framework:"Framework",definition:"Definition","case-study":"Case study","industry-context":"Industry context"},"getKbEntry",0,function(e){return s.get(e)},"resolveWikiLinks",0,function(e){return e.replace(/\[\[([a-z0-9-]+)\]\]/g,(e,t)=>{let r=s.get(t);return r?`[${r.title}](${a(`/kb/${t}`)})`:`\`${t}\``})}],82364)},74581,e=>{"use strict";var t=e.i(71645);function a(e=new Date){let t=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${t}-${s}-${r}`}let s="dpm-lab:progress:v1";function r(){return{version:1,user_id:"local",exercises:{},attempts:[],srs:{},lessons:{},streak:{current:0,lastActiveDate:null}}}function n(){try{let e=window.localStorage.getItem(s);if(!e)return r();let t=JSON.parse(e);if(t?.version!==1)return r();return{...r(),...t}}catch{return r()}}function o(e){let t,s=a(),{current:r,lastActiveDate:n}=e.streak;if(n===s)return e;let o=n===((t=new Date).setDate(t.getDate()-1),a(t))?r+1:1;return{...e,streak:{current:o,lastActiveDate:s}}}let i=r(),l=null,c=new Set;function d(){return null===l&&(l=n()),l}function u(){return i}function m(){for(let e of c)e()}function h(e){c.add(e);let t=e=>{e.key===s&&(l=n(),m())};return window.addEventListener("storage",t),()=>{c.delete(e),window.removeEventListener("storage",t)}}e.s(["dueCards",0,function(e,t){return t.filter(t=>(function(e,t=new Date){return!e||e.due<=a(t)})(e.srs[t.id]))},"useProgress",0,function(){let e=(0,t.useSyncExternalStore)(h,d,u),n=(0,t.useCallback)(e=>{var t=e(d());l=t;try{window.localStorage.setItem(s,JSON.stringify(t))}catch{}m()},[]),c=(0,t.useCallback)((e,t,a,s)=>n(r=>{let n,i,l,c,d;return n=new Date().toISOString(),i=r.exercises[e]??{kind:t,status:"not_started",attempts:0},l=s||"solved"===i.status?"solved":"attempted",c={...r.exercises,[e]:{...i,kind:t,status:l,attempts:i.attempts+1,lastAttemptAt:n,solvedAt:s&&!i.solvedAt?n:i.solvedAt}},d=[{id:`${e}:${n}`,slug:e,kind:t,code:a,passed:s,at:n},...r.attempts].slice(0,200),o({...r,exercises:c,attempts:d})}),[n]),p=(0,t.useCallback)((e,t)=>n(s=>{let r;return r=s.srs[e]??function(e=new Date){return{ease:2.5,interval:0,repetitions:0,due:a(e)}}(),o({...s,srs:{...s.srs,[e]:function(e,t,s=new Date){let{ease:r,interval:n,repetitions:o}=e;return t<3?(o=0,n=1):(n=0===o?1:1===o?6:Math.round(n*r),o+=1),(r+=.1-(5-t)*(.08+(5-t)*.02))<1.3&&(r=1.3),{ease:Math.round(100*r)/100,interval:n,repetitions:o,due:function(e,t){let[s,r,n]=e.split("-").map(Number),o=new Date(s,r-1,n);return o.setDate(o.getDate()+t),a(o)}(a(s),n)}}(r,t)}})}),[n]);return{data:e,hydrated:e!==i,recordAttempt:c,recordReview:p,recordLessonComplete:(0,t.useCallback)((e,t)=>n(a=>{let s,r;return s=a.lessons[e],r=Math.max(s?.bestAccuracy??0,t),o({...a,lessons:{...a.lessons,[e]:{completedAt:new Date().toISOString(),completions:(s?.completions??0)+1,bestAccuracy:r,perfect:r>=1}}})}),[n]),reset:(0,t.useCallback)(()=>n(()=>r()),[n])}}],74581)},7664,e=>{"use strict";let t=["Newcomer","Question asker","Metric mapper","Data auditor","Launch lead","Root-cause finder","Definition owner","Data Product Manager"];e.s(["XP_LAB_EXERCISE",0,20,"XP_LESSON",0,10,"XP_PERFECT_BONUS",0,5,"computeXp",0,function(e){let t=0;for(let a of Object.values(e.lessons))t+=10+5*!!a.perfect;let a=0;for(let t of Object.values(e.exercises))"solved"===t.status&&(a+=20);return{total:t+a,fromLessons:t,fromLabs:a}},"levelFor",0,function(e){let t=Math.floor(e/100)+1,a=e%100;return{level:t,intoLevel:a,toNext:100-a,fraction:a/100}},"levelTitle",0,function(e){return t[Math.min(e-1,t.length-1)]}])}]);