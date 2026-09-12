# DPM Lab

**Live:** https://christoferarceg-source.github.io/dpm-lab/

Learn Data Product Management the way Duolingo teaches languages: one
concept, five quick interactions, about a minute. The story is your first six
weeks as the first Data PM at *Meridian*, a fictional B2B software company.
Each week is a unit on the path; each unit ends in a Lab with real SQL and
Python on Meridian's data, which has problems planted in it.

## What's in it

- **Learn** (`/`): a path of 7 units: Level 0 (SQL & Python 101, 8 lessons)
  then the six story weeks (5–6 lessons each). Each lesson =
  a concept card + five interactions (multiple choice, true/false, fill the
  blank, match pairs, put in order, spot the SQL bug) with instant feedback
  and an explanation. Three hearts per lesson; run out and you review and
  retry. Missed items come back once at the end of the lesson.
- **Labs**: a node at the end of every unit opens the real editor. 33 SQL
  exercises (sql.js in the browser) from Level 0 basics to window functions,
  data-quality audits, root cause, and reconciliation; 11 pandas exercises
  (Pyodide) covering Level 0 and the first two story units.
- **XP and levels**: 10 XP per lesson, +5 for a perfect run, 20 XP per Lab
  exercise, 100 XP per level. The Profile tab shows level, streak, and
  progress per unit.
- **Review**: 34 SM-2 spaced-repetition flashcards.
- **Story** (`/chapters/n`) and **Library** (`/kb`, 20 entries): the briefs,
  debriefs, and reference notes behind the lessons.
- Mobile-first: bottom tab bar on phones, top nav on desktop. Progress lives
  in the browser's localStorage (no account yet).

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
npm test                 # graders end-to-end in Node (sql.js + Pyodide), lesson/content integrity, XP, SM-2, progress
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
app/                  / (path), /lesson/[id], /chapters/[n], /practice, /practice/{sql,python}, /profile, /kb, /review
content/
  lessons.ts          39 micro-lessons (concept + 5 items each), units and colours
  story.ts            company, cast, six chapters (brief, readings, debrief)
  kb.ts               knowledge-base entries; flashcards.ts the review deck
  dataset.ts          seeded generator + schema + table docs
  exercises-sql.ts    SQL ladder with reference solutions
  exercises-python.ts pandas exercises with reference solutions
  expected-*.json     generated expected answers (do not hand-edit)
lib/
  sql-engine.ts       sql.js loader, runner, grader
  py-engine.ts        Pyodide loader, runner (setup → user code → JSON serialize), grader
  chapter-progress.ts unit progress, next lesson, totals
  xp.ts               XP and level rules (derived from progress, never stored)
  progress-store.ts   localStorage store (lessons, exercises, attempts, SRS) via useSyncExternalStore
  compare.ts, srs.ts, kb.ts, use-hash.ts, base-path.ts, shuffle.ts
components/           LearnPath, LessonPlayer, lesson-items, Shell, NavBar, ChapterView, PracticeWorkspace, CodeEditor, TableReference, ResultTable, Markdown
scripts/
  compute-expected.mts  source of truth for expected answers
  test-graders.mts      headless test suite
  diagnose-dataset.mts  dataset sanity report
```

## Adding content

- **Lesson**: append to the unit's array in `content/lessons.ts` using the
  helpers (`concept`, `mcq`, `tf`, `fill`, `match`, `order`). Keep one
  concept card first and five interactions after it; `npm test` enforces
  the shape, unique ids, valid answers, and real `kbSlug`s.
- **Chapter text**: edit `content/story.ts`.
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
