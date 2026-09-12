# DPM Lab

A personal learning tool for **Data Product Management**: a knowledge base
that feeds hands-on practice, so the frameworks you know and the hard skills
you use (SQL, Python) stay connected to each other.

- **Knowledge Base** — study notes seeded from your PRD, the 6-Week Data
  Products Playbook, State of Data Products Q2 2026, and the Big Book of
  Data Science. Entries link to each other with `[[slug]]`.
- **SQL Practice** — real SQLite in the browser (sql.js) against the
  Playbook's *Sales Funnel Accelerator* dataset. Every exercise computes a
  node of the metric tree (`revenue_generated` → `deals_closed_value` →
  `conversion_rate`) and says why that node matters.
- **Python Practice** — the same dataset and metrics in pandas, run in the
  browser via Pyodide.
- **Review** — SM-2 spaced-repetition flashcards drawn from the KB.
- **Progress** — stored in this browser's localStorage (no account yet).

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

The first Python run downloads the Pyodide runtime + pandas (~10 MB) from
jsdelivr; later runs use the browser cache. SQL is fully self-hosted.

## Verify

```bash
npm test             # graders end-to-end in Node (sql.js + Pyodide), compare, SM-2
npm run verify:answers   # recompute every exercise's expected answer from the dataset
npm run lint
npm run build
```

## Layout

```
app/                 routes: / (dashboard), /kb, /kb/[slug], /practice/{sql,python}, /review
content/
  kb.ts              knowledge-base entries
  flashcards.ts      review deck (each card → a KB slug)
  dataset.ts         seed data + schema for the Sales Funnel Accelerator
  exercises-sql.ts   SQL exercises with verified expected rows
  exercises-python.ts pandas exercises with verified expected results
lib/
  sql-engine.ts      sql.js loader, query runner, grader
  py-engine.ts       Pyodide loader, runner (setup → user code → JSON serialize), grader
  compare.ts         tolerant deep-equality used by both graders
  srs.ts             SM-2
  progress-store.ts  localStorage store exposed via useSyncExternalStore
  kb.ts              KB lookups + [[wiki-link]] resolution
components/          NavBar, Markdown, CodeEditor (CodeMirror), PracticeWorkspace, ResultTable
scripts/
  compute-expected.mjs  prints the correct answer for every exercise (source of truth)
  test-graders.mts      headless test of both graders
public/              sql-wasm.js + sql-wasm.wasm (self-hosted sql.js)
```

## Adding content

- **KB entry**: append to `content/kb.ts`. Use `[[other-slug]]` to
  cross-link. Add a flashcard or two in `content/flashcards.ts`.
- **SQL exercise**: add the reference query to `scripts/compute-expected.mjs`,
  run `npm run verify:answers`, paste the printed columns/rows into
  `content/exercises-sql.ts`, and add the reference solution to
  `scripts/test-graders.mts`. Set `orderMatters: true` only if the prompt
  specifies an ORDER BY.
- **Python exercise**: same flow with `content/exercises-python.ts`. Users
  assign their answer to `result`; the runner serializes it to JSON inside
  Python, so numpy scalars and DataFrames (`.to_dict("records")`) both work.

## Roadmap (not built yet)

- Stakeholder simulation, incident RCA cases, teach-back — need an LLM
  backend (Claude API route + `ANTHROPIC_API_KEY`).
- Guided-interview capture of your own experience into the KB.
- Supabase auth + Postgres for cross-device progress (the progress store is
  already shaped as user-keyed tables for this).
- Native app client reusing the same backend.
