"use client";

import Link from "next/link";
import { flashcards } from "@/content/flashcards";
import { kbEntries } from "@/content/kb";
import { units } from "@/content/lessons";
import { allUnitProgress, totals } from "@/lib/chapter-progress";
import { dueCards, useProgress } from "@/lib/progress-store";
import { computeXp, levelFor, levelTitle, XP_LAB_EXERCISE, XP_LESSON, XP_PERFECT_BONUS } from "@/lib/xp";

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-4">
      <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
      <p className="text-2xl font-semibold mt-1 tabular-nums">{value}</p>
      {sub && <p className="text-xs text-muted mt-0.5">{sub}</p>}
    </div>
  );
}

export default function ProfilePage() {
  const { data, hydrated, reset } = useProgress();
  const xp = computeXp(data);
  const lvl = levelFor(xp.total);
  const t = totals(data);
  const up = allUnitProgress(data);
  const due = hydrated ? dueCards(data, flashcards).length : 0;
  const perfect = Object.values(data.lessons).filter((l) => l.perfect).length;

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="bg-surface border border-border rounded-2xl p-5 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-accent text-accent-fg flex items-center justify-center text-2xl font-semibold shrink-0 tabular-nums">
          {hydrated ? lvl.level : "–"}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-wide text-muted">Level {hydrated ? lvl.level : ""}</p>
          <p className="text-lg font-semibold">{hydrated ? levelTitle(lvl.level) : "…"}</p>
          <div className="mt-2 h-2 rounded-full bg-border overflow-hidden">
            <div className="h-full bg-accent transition-all" style={{ width: `${hydrated ? Math.round(lvl.fraction * 100) : 0}%` }} />
          </div>
          <p className="text-xs text-muted mt-1 tabular-nums">
            {hydrated ? `${xp.total} XP · ${lvl.toNext} to level ${lvl.level + 1}` : ""}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Stat label="Lessons" value={hydrated ? `${t.lessonsDone}/${t.lessonsTotal}` : "–"} sub={hydrated ? `${perfect} perfect` : undefined} />
        <Stat label="Labs solved" value={hydrated ? `${t.labsDone}/${t.labsTotal}` : "–"} sub="SQL and Python exercises" />
        <Stat label="Streak" value={hydrated ? `${data.streak.current}d` : "–"} sub="consecutive active days" />
        <Stat label="Review" value={hydrated ? `${due}` : "–"} sub={`cards due of ${flashcards.length}`} />
      </div>

      <section className="bg-surface border border-border rounded-xl p-4">
        <p className="text-xs uppercase tracking-wide text-muted mb-3">Units</p>
        <ul className="space-y-2">
          {units.map((u, i) => (
            <li key={u.number} className="flex items-center gap-3 text-sm">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: u.color }} />
              <span className="flex-1 min-w-0 truncate">
                {u.week} · {u.title}
              </span>
              <span className="text-muted tabular-nums">{hydrated ? `${up[i].lessonsDone}/${up[i].lessonsTotal}` : ""}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="text-sm text-muted space-y-1">
        <p className="font-semibold text-fg">How XP works</p>
        <p>
          {XP_LESSON} XP per lesson, +{XP_PERFECT_BONUS} for a perfect run, {XP_LAB_EXERCISE} XP per Lab exercise solved. 100 XP per level.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        <Link href="/kb" className="bg-surface border border-border rounded-xl p-4 hover:border-accent">
          <p className="font-semibold">Library</p>
          <p className="text-sm text-muted mt-1">{kbEntries.length} reference entries behind the lessons.</p>
        </Link>
        <Link href="/chapters/1" className="bg-surface border border-border rounded-xl p-4 hover:border-accent">
          <p className="font-semibold">The story</p>
          <p className="text-sm text-muted mt-1">Meridian, week by week: briefs and debriefs.</p>
        </Link>
      </section>

      {hydrated && (
        <button
          onClick={() => {
            if (window.confirm("Reset all local progress? This cannot be undone.")) reset();
          }}
          className="text-xs text-muted underline underline-offset-2 hover:text-fg"
        >
          Reset progress
        </button>
      )}
    </div>
  );
}
