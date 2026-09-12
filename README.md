# DPM Lab

**Live:** https://christoferarceg-source.github.io/dpm-lab/

A personal learning tool for **Data Product Management**, told as a story:
your first six weeks as the first Data PM at *Meridian*, a fictional B2B
software company. Each week follows one stage of the 6-Week Data Products
Playbook and gives you a situation, the frameworks it needs, decisions to
make, and the SQL to prove your answer. The data has real problems planted
in it.

## What's in it

- **Six chapters** (`/chapters/1`–`6`): brief → readings → decision quiz →
  build (SQL, optional Python) → debrief. The home page tracks where you are
  and what to do next.
- **Decision quizzes** (33 questions): judgment scenarios, concept checks,
  and read-the-SQL questions. Every option has a rationale.
- **SQL ladder** (30 exercises, real SQLite in the browser via sql.js):
  warm-ups, CTEs, window functions (ROW_NUMBER, LAG/LEAD, frames), funnel
  and cohort analysis, data-quality audits, adoption metrics, root cause,
  and revenue reconciliation.
- **Python** (8 exercises, pandas in the browser via Pyodide): twins of the
  chapter 1–2 warm-ups. The rest of the ladder is the next pass.
- **Knowledge base** (18 entries) seeded from the PRD, the Playbook, State of
  Data Products Q2 2026, the Big Book of Data Science, plus three
  synthesized entries on data quality, funnel analysis, and the SQL toolkit.
- **Review**: 29 SM-2 spaced-repetition flashcards.
- **Progress** lives in the browser's localStorage (no account yet).

## The dataset

Generated deterministically from a seed (`content/dataset.ts`), as of
31 Aug 2026: 40 accounts, 80 contacts, 420 deals, an append-only
deal-stage history, transactions, daily pipeline-run logs for three
pipelines, and dashboard usage for a legacy and a new dashboard.

Planted for you to find:

- duplicate transactions and duplicate stage-history rows
- four deals whose CRM stage lags the history log
- closed deals with no close date
- a three-day failed streak on `gold_sales_metrics`, one partial-file day
  that reported success
- an AMER × Outbound conversion collapse for deals created May–June 2026
  (chapter 5's root-cause case)

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

The first Python run downloads the Pyodide runtime + pandas (~10 MB) from
jsdelivr and caches it. SQL is fully self-hosted.

## Verify

```bash
npm test                 # graders end-to-end in Node (sql.js + Pyodide), content integrity, SM-2, chapter progress
npm run verify:answers   # regenerate content/expected-*.json from each exercise's reference solution
npm run diagnose         # print dataset row counts and the planted signals
npm run lint
npm run build
```

## Deploy (GitHub Pages)

```bash
npm run deploy       # static export with basePath /dpm-lab, pushed to the gh-pages branch
```

## Layout

```
app/                  / (six weeks), /chapters/[n], /practice/{sql,python}, /kb, /kb/[slug], /review
content/
  story.ts            company, cast, six chapters (brief, readings, debrief)
  quiz.ts             decision-quiz bank
  kb.ts               knowledge-base entries; flashcards.ts the review deck
  dataset.ts          seeded generator + schema + table docs
  exercises-sql.ts    SQL ladder with reference solutions
  exercises-python.ts pandas exercises with reference solutions
  expected-*.json     generated expected answers (do not hand-edit)
lib/
  sql-engine.ts       sql.js loader, runner, grader
  py-engine.ts        Pyodide loader, runner (setup → user code → JSON serialize), grader
  chapter-progress.ts chapter completion / next-step logic
  progress-store.ts   localStorage store (exercises, attempts, quiz answers, SRS) via useSyncExternalStore
  compare.ts, srs.ts, kb.ts, use-hash.ts, base-path.ts
components/           ChapterView, Quiz, PracticeWorkspace, CodeEditor, TableReference, ResultTable, Markdown, NavBar
scripts/
  compute-expected.mts  source of truth for expected answers
  test-graders.mts      headless test suite
  diagnose-dataset.mts  dataset sanity report
```

## Adding content

- **Chapter text**: edit `content/story.ts`.
- **Quiz question**: append to `content/quiz.ts` with a `chapter`, four
  options, `correctIndex`, and a `kbSlug`. `npm test` checks all of that.
- **SQL exercise**: append to `content/exercises-sql.ts` with a `chapter`,
  `starterQuery`, and reference `solution`; run `npm run verify:answers`.
  Set `orderMatters: true` when the prompt specifies an ORDER BY.
- **Python exercise**: same, in `content/exercises-python.ts`; the solution
  must assign `result`.
- **KB entry**: append to `content/kb.ts`; use `[[other-slug]]` to
  cross-link; add a flashcard in `content/flashcards.ts`.

## Roadmap

- Python twins for chapters 3–6.
- Stakeholder simulation and teach-back with an LLM backend (Claude API
  route + `ANTHROPIC_API_KEY`).
- Guided-interview capture of your own experience into the KB.
- Supabase auth + Postgres for cross-device progress (the store is already
  user-keyed for this); a native client on the same backend.
