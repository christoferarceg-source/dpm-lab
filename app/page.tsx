"use client";

import Link from "next/link";
import { kbEntries } from "@/content/kb";
import { sqlExercises } from "@/content/exercises-sql";
import { pythonExercises } from "@/content/exercises-python";
import { flashcards } from "@/content/flashcards";
import { dueCards, useProgress } from "@/lib/progress-store";

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-4">
      <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
      <p className="text-2xl font-semibold mt-1 tabular-nums">{value}</p>
      {sub && <p className="text-xs text-muted mt-0.5">{sub}</p>}
    </div>
  );
}

export default function Dashboard() {
  const { data, hydrated, reset } = useProgress();

  const solved = (slugs: string[]) => slugs.filter((s) => data.exercises[s]?.status === "solved").length;
  const sqlSolved = solved(sqlExercises.map((e) => e.slug));
  const pySolved = solved(pythonExercises.map((e) => e.slug));
  const due = hydrated ? dueCards(data, flashcards).length : 0;

  const nextSql = sqlExercises.find((e) => data.exercises[e.slug]?.status !== "solved");
  const nextPy = pythonExercises.find((e) => data.exercises[e.slug]?.status !== "solved");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted mt-1">
          Knowledge base → practice → review. Hard skills tied to the data product metric tree.
        </p>
      </div>

      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <Stat label="Streak" value={hydrated ? `${data.streak.current}d` : "–"} sub="consecutive active days" />
        <Stat label="SQL" value={hydrated ? `${sqlSolved}/${sqlExercises.length}` : "–"} sub="exercises solved" />
        <Stat label="Python" value={hydrated ? `${pySolved}/${pythonExercises.length}` : "–"} sub="exercises solved" />
        <Stat label="Review" value={hydrated ? `${due}` : "–"} sub={`cards due of ${flashcards.length}`} />
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/practice/sql" className="bg-surface border border-border rounded-xl p-5 hover:border-accent transition-colors">
          <p className="text-xs uppercase tracking-wide text-muted">Next up · SQL</p>
          <p className="font-semibold mt-1">{nextSql ? nextSql.title : "All solved"}</p>
          <p className="text-sm text-muted mt-1">
            {nextSql ? nextSql.dpmConnection.text.split(".")[0] + "." : "Re-run any exercise to keep it sharp."}
          </p>
        </Link>
        <Link href="/practice/python" className="bg-surface border border-border rounded-xl p-5 hover:border-accent transition-colors">
          <p className="text-xs uppercase tracking-wide text-muted">Next up · Python</p>
          <p className="font-semibold mt-1">{nextPy ? nextPy.title : "All solved"}</p>
          <p className="text-sm text-muted mt-1">
            {nextPy ? nextPy.dpmConnection.text.split(".")[0] + "." : "Re-run any exercise to keep it sharp."}
          </p>
        </Link>
        <Link href="/review" className="bg-surface border border-border rounded-xl p-5 hover:border-accent transition-colors">
          <p className="text-xs uppercase tracking-wide text-muted">Review</p>
          <p className="font-semibold mt-1">{due > 0 ? `${due} card${due === 1 ? "" : "s"} due` : "Deck is clear"}</p>
          <p className="text-sm text-muted mt-1">SM-2 scheduling. Rate honestly — the intervals depend on it.</p>
        </Link>
      </section>

      <section className="bg-surface-2/60 border border-border rounded-xl p-5 text-sm">
        <p className="font-semibold">How the pieces connect</p>
        <ol className="list-decimal pl-5 mt-2 space-y-1 text-muted">
          <li>
            The <Link href="/kb" className="text-accent underline underline-offset-2">Knowledge Base</Link> holds
            the frameworks ({kbEntries.length} entries): metric types, the Metric Dependency Tree, medallion layers,
            the 6-week playbook.
          </li>
          <li>
            Every SQL and Python exercise computes a node of the Playbook&apos;s Sales Funnel metric tree and links
            back to the KB entry that explains why that metric exists.
          </li>
          <li>
            Flashcards in Review are drawn from the same entries, so what you practice and what you recall stay in
            sync.
          </li>
        </ol>
      </section>

      {hydrated && (data.attempts.length > 0 || Object.keys(data.srs).length > 0) && (
        <section className="text-xs text-muted flex items-center gap-3">
          <span>
            {data.attempts.length} attempt{data.attempts.length === 1 ? "" : "s"} logged in this browser.
          </span>
          <button
            onClick={() => {
              if (window.confirm("Reset all local progress? This cannot be undone.")) reset();
            }}
            className="underline underline-offset-2 hover:text-fg"
          >
            Reset progress
          </button>
        </section>
      )}
    </div>
  );
}
