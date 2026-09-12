// Shared types across the story, knowledge base, quizzes, SQL/Python
// practice, and spaced review. Framework-agnostic so the same file works in
// the browser, in Node scripts, and later in a Supabase migration.

export type KbCategory = "framework" | "definition" | "case-study" | "industry-context";

export type KbEntry = {
  slug: string;
  title: string;
  category: KbCategory;
  tags: string[];
  summary: string;
  body: string; // markdown
  source: string;
};

export type Difficulty = "warmup" | "core" | "advanced";

export type DpmConnection = {
  text: string;
  kbSlug: string;
};

/** 1–6, the Playbook week the exercise belongs to. */
export type ChapterNumber = 1 | 2 | 3 | 4 | 5 | 6;

export type SqlExercise = {
  slug: string;
  chapter: ChapterNumber;
  title: string;
  difficulty: Difficulty;
  prompt: string; // markdown
  starterQuery: string;
  /** Reference solution. scripts/compute-expected.mts runs it to produce content/expected-sql.json. */
  solution: string;
  /** If false (default), row order is ignored when grading. */
  orderMatters?: boolean;
  dpmConnection: DpmConnection;
  hint: string;
};

export type SqlExpected = {
  columns: string[];
  rows: (string | number | null)[][];
};

export type PythonExercise = {
  slug: string;
  chapter: ChapterNumber;
  title: string;
  difficulty: Difficulty;
  prompt: string;
  starterCode: string;
  /** Reference solution (Python). scripts/compute-expected.mts runs it in Pyodide to produce content/expected-python.json. */
  solution: string;
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

// ---------- quizzes ----------
export type QuizKind = "judgment" | "concept" | "sql-prediction";

export type QuizOption = {
  text: string;
  /** Why this option is right or wrong. Shown after answering. */
  explanation: string;
};

export type QuizQuestion = {
  id: string;
  chapter: ChapterNumber;
  kind: QuizKind;
  prompt: string; // markdown; sql-prediction questions include a ```sql block
  options: QuizOption[];
  correctIndex: number;
  kbSlug: string;
};

// ---------- story ----------
export type Character = {
  name: string;
  role: string;
  /** One line on what they want from you. */
  agenda: string;
};

export type Chapter = {
  number: ChapterNumber;
  slug: string;
  title: string;
  week: string; // e.g. "Week 1 · The Bullseye"
  tagline: string;
  /** Markdown. The situation you walk into. */
  brief: string;
  readings: string[]; // KB slugs
  /** Markdown. What a good Data PM would have taken away. Shown when the chapter is complete. */
  debrief: string;
};
