// Shared types across the knowledge base, SQL/Python practice, and spaced
// review. Kept framework-agnostic (no DB client types) so this file works
// identically in the browser, in Node scripts, and later in a Supabase
// migration.

export type KbCategory =
  | "framework"
  | "definition"
  | "case-study"
  | "industry-context";

export type KbEntry = {
  slug: string;
  title: string;
  category: KbCategory;
  tags: string[];
  /** One-sentence summary shown on cards / search results. */
  summary: string;
  /** Full body, markdown. */
  body: string;
  /** Where this came from, for provenance. */
  source: string;
};

export type Difficulty = "intro" | "core" | "stretch";

export type DpmConnection = {
  /** Why this exercise matters for a data product, in plain language. */
  text: string;
  /** slug of the KB entry that explains the underlying concept. */
  kbSlug: string;
};

export type SqlExercise = {
  slug: string;
  title: string;
  difficulty: Difficulty;
  /** Markdown prompt. */
  prompt: string;
  starterQuery: string;
  /** Column names the grader compares against, in order. */
  expectedColumns: string[];
  /** Row values, in column order. Compared after coercing numbers. */
  expectedRows: (string | number | null)[][];
  /** If false (default), row order is ignored when grading. */
  orderMatters?: boolean;
  dpmConnection: DpmConnection;
  hint: string;
};

export type PythonExercise = {
  slug: string;
  title: string;
  difficulty: Difficulty;
  prompt: string;
  starterCode: string;
  /**
   * Expected value of the Python variable `result` after running the
   * user's code, expressed as JSON-comparable JS (number, string, or an
   * array of plain objects for row-set results).
   */
  expectedResult: unknown;
  /** If false (default), row order in list-of-dict results is ignored. */
  orderMatters?: boolean;
  dpmConnection: DpmConnection;
  hint: string;
};

export type ExerciseKind = "sql" | "python";

export type Flashcard = {
  id: string;
  kbSlug: string;
  front: string;
  back: string;
};
