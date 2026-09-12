import { kbEntries } from "@/content/kb";
import { allLessons, units } from "@/content/lessons";
import { sqlExercises } from "@/content/exercises-sql";
import { pythonExercises } from "@/content/exercises-python";
import { flashcards } from "@/content/flashcards";
import type { KbEntry, Lesson } from "./types";

// The Library as a reading path: four parts, each with a narrative intro and
// entries in the order they're worth reading. Entries not listed here still
// render; they just appear in a final "More" part.

export type LibraryPart = {
  slug: string;
  number: number;
  title: string;
  kicker: string;
  intro: string;
  entries: string[]; // KB slugs in reading order
};

export const libraryParts: LibraryPart[] = [
  {
    slug: "the-role",
    number: 1,
    title: "The role and the product",
    kicker: "Start here",
    intro:
      "Before the frameworks, two definitions that everything else hangs on: what a Data Product Manager actually owns, and what makes a data asset a product rather than a dataset, a dashboard, or a pipeline. Then the four ways this job inverts ordinary product management, and a ladder for judging how mature a data organisation is.",
    entries: ["what-is-a-data-product-manager", "what-is-a-data-product", "four-key-shifts", "data-product-maturity-stages"],
  },
  {
    slug: "six-weeks",
    number: 2,
    title: "Six weeks, one framework a week",
    kicker: "The Playbook",
    intro:
      "The 6-Week Data Products Playbook in reading order. Week 1 finds the problem and the metric tree. Week 2 turns definitions into a model. Week 3 activates it with ports and SLOs (and the self-service layer that makes that affordable). Week 4 launches where users already are. Weeks 5 and 6 prove it with usage, feedback loops, and root cause. Meridian's story follows the same arc.",
    entries: [
      "bullseye-data-product-market-fit",
      "metric-types",
      "canvas-data-product-design",
      "data-product-activation",
      "self-service-infrastructure",
      "go-to-market-launch",
      "proof-of-value-performance",
    ],
  },
  {
    slug: "working-with-data",
    number: 3,
    title: "Working with the data",
    kicker: "Hands on",
    intro:
      "The formulas and the habits. Two cheat sheets for SQL and pandas, the short list of SQL a Data PM actually writes, how to think about data quality as promises you can check, how to read a funnel three different ways, and where a metric physically lives in a medallion architecture. Every Lab exercise links back to one of these.",
    entries: ["sql-101", "python-pandas-101", "sql-toolkit-for-data-pms", "data-quality-dimensions", "funnel-conversion-analysis", "medallion-architecture"],
  },
  {
    slug: "the-world-in-2026",
    number: 4,
    title: "The world in 2026",
    kicker: "Context",
    intro:
      "Why this role matters more now. Agents act on business terms without a human to reconcile meaning, so ontologies became infrastructure. Monitoring tells you an agent ran, not that it was right. Cost per correct answer replaced raw capability as the number a board reads. And one manufacturing case study that shows the whole pattern in a different industry.",
    entries: ["ontology-as-infrastructure", "agent-observability-gap", "lean-ai-cost-economics", "oee-manufacturing-case-study"],
  },
];

const bySlug = new Map(kbEntries.map((e) => [e.slug, e]));

export type LibraryIndexEntry = {
  entry: KbEntry;
  part: LibraryPart;
  position: number; // 1-based within the part
  readMinutes: number;
};

const listed = new Set(libraryParts.flatMap((p) => p.entries));
const extras: LibraryPart | null = kbEntries.some((e) => !listed.has(e.slug))
  ? {
      slug: "more",
      number: libraryParts.length + 1,
      title: "More",
      kicker: "Reference",
      intro: "Entries outside the reading path.",
      entries: kbEntries.filter((e) => !listed.has(e.slug)).map((e) => e.slug),
    }
  : null;

export const allParts: LibraryPart[] = extras ? [...libraryParts, extras] : libraryParts;

export function readMinutes(entry: KbEntry): number {
  const words = entry.body.split(/\s+/).length;
  return Math.max(1, Math.round(words / 180));
}

const index = new Map<string, LibraryIndexEntry>();
for (const part of allParts) {
  part.entries.forEach((slug, i) => {
    const entry = bySlug.get(slug);
    if (entry) index.set(slug, { entry, part, position: i + 1, readMinutes: readMinutes(entry) });
  });
}

export function libraryEntry(slug: string): LibraryIndexEntry | undefined {
  return index.get(slug);
}

/** Previous and next entries along the whole reading path. */
export function neighbours(slug: string): { prev?: LibraryIndexEntry; next?: LibraryIndexEntry } {
  const order = allParts.flatMap((p) => p.entries);
  const i = order.indexOf(slug);
  if (i === -1) return {};
  return { prev: i > 0 ? index.get(order[i - 1]) : undefined, next: i < order.length - 1 ? index.get(order[i + 1]) : undefined };
}

/** Everything in the app that points at a KB entry. */
export function usages(slug: string): {
  lessons: { lesson: Lesson; unitTitle: string; color: string }[];
  sql: typeof sqlExercises;
  python: typeof pythonExercises;
  cards: number;
  backlinks: KbEntry[];
} {
  const lessons = allLessons
    .filter((l) => l.items.some((it) => it.kbSlug === slug))
    .map((lesson) => {
      const u = units.find((x) => x.number === lesson.unit)!;
      return { lesson, unitTitle: u.week, color: u.color };
    });
  return {
    lessons,
    sql: sqlExercises.filter((e) => e.dpmConnection.kbSlug === slug),
    python: pythonExercises.filter((e) => e.dpmConnection.kbSlug === slug),
    cards: flashcards.filter((c) => c.kbSlug === slug).length,
    backlinks: kbEntries.filter((e) => e.slug !== slug && e.body.includes(`[[${slug}]]`)),
  };
}
