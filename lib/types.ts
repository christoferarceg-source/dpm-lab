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

/** 1–6, the Playbook week a story chapter belongs to. */
export type ChapterNumber = 1 | 2 | 3 | 4 | 5 | 6;
/** Units on the learning path: Level 0 (SQL & Python 101) plus the six story chapters. */
export type UnitNumber = 0 | ChapterNumber;

export type SqlExercise = {
  slug: string;
  /** Unit the exercise belongs to (0 = Level 0 basics). */
  chapter: UnitNumber;
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
  chapter: UnitNumber;
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

// ---------- lessons (Duolingo-style micro lessons) ----------
export type ConceptItem = { kind: "concept"; id: string; title: string; body: string; kbSlug?: string };
export type McqItem = {
  kind: "mcq";
  id: string;
  prompt: string; // markdown; may include a ```sql block
  options: string[];
  correct: number;
  explanation: string;
  /** Optional per-option note shown when that option was picked and is wrong. */
  optionNotes?: (string | undefined)[];
  kbSlug?: string;
};
export type TrueFalseItem = { kind: "truefalse"; id: string; statement: string; answer: boolean; explanation: string; kbSlug?: string };
/** `prompt` contains one `___` blank; the learner taps a word from `bank`. */
export type FillItem = { kind: "fill"; id: string; prompt: string; bank: string[]; answer: string; explanation: string; kbSlug?: string };
export type MatchItem = { kind: "match"; id: string; prompt: string; pairs: [string, string][]; explanation: string; kbSlug?: string };
/** `steps` are in the correct order; the player shuffles them. */
export type OrderItem = { kind: "order"; id: string; prompt: string; steps: string[]; explanation: string; kbSlug?: string };

export type LessonItem = ConceptItem | McqItem | TrueFalseItem | FillItem | MatchItem | OrderItem;

export type Lesson = {
  id: string;
  unit: UnitNumber;
  title: string;
  items: LessonItem[];
};

export type Unit = {
  number: UnitNumber;
  title: string;
  week: string;
  tagline: string;
  /** Tailwind-free hex accent for the unit banner and nodes. */
  color: string;
  lessons: Lesson[];
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
