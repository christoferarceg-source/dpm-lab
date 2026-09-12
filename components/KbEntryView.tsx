"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Markdown } from "./Markdown";
import { getKbEntry } from "@/lib/kb";
import { libraryEntry, neighbours, usages } from "@/lib/library";
import { useProgress } from "@/lib/progress-store";

export function KbEntryView({ slug }: { slug: string }) {
  const entry = getKbEntry(slug)!;
  const ix = libraryEntry(slug);
  const { prev, next } = neighbours(slug);
  const use = usages(slug);
  const { data, hydrated, recordRead } = useProgress();

  // Mark as read once the page is open (an external-store write, not React state).
  useEffect(() => {
    recordRead(slug);
  }, [slug, recordRead]);

  return (
    <article className="max-w-3xl space-y-8">
      <header>
        <Link href="/kb" className="text-sm text-muted hover:text-fg">
          ← Library
        </Link>
        {ix && (
          <p className="text-[0.7rem] uppercase tracking-wide text-accent font-semibold mt-4">
            Part {ix.part.number} · {ix.part.title} · {ix.position} of {ix.part.entries.length}
          </p>
        )}
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mt-1">{entry.title}</h1>
        <p className="text-muted mt-2">{entry.summary}</p>
        <p className="text-xs text-muted mt-2">
          {ix ? `${ix.readMinutes} min read` : ""}
          {hydrated && data.reads[slug] ? " · read" : ""}
        </p>
      </header>

      <div className="bg-surface border border-border rounded-2xl p-5 sm:p-7">
        <Markdown className="text-[1.02rem]">{entry.body}</Markdown>
      </div>

      <p className="text-xs text-muted">Source: {entry.source}</p>

      {(use.lessons.length > 0 || use.sql.length > 0 || use.python.length > 0 || use.cards > 0 || use.backlinks.length > 0) && (
        <section className="bg-surface-2/60 border border-border rounded-2xl p-5">
          <p className="text-[0.7rem] uppercase tracking-wide text-muted font-semibold mb-3">Where this shows up</p>
          <div className="grid gap-5 sm:grid-cols-2 text-sm">
            {use.lessons.length > 0 && (
              <div>
                <p className="font-semibold mb-1.5">Lessons</p>
                <ul className="space-y-1">
                  {use.lessons.map(({ lesson, unitTitle, color }) => (
                    <li key={lesson.id}>
                      <Link href={`/lesson/${lesson.id}`} className="flex items-center gap-2 hover:underline underline-offset-2">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                        <span className="truncate">{lesson.title}</span>
                        <span className="text-xs text-muted shrink-0">· {unitTitle}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {(use.sql.length > 0 || use.python.length > 0) && (
              <div>
                <p className="font-semibold mb-1.5">Labs</p>
                <ul className="space-y-1">
                  {use.sql.map((e) => (
                    <li key={e.slug}>
                      <Link href={`/practice/sql#${e.slug}`} className="text-accent underline underline-offset-2">
                        SQL · {e.title}
                      </Link>
                    </li>
                  ))}
                  {use.python.map((e) => (
                    <li key={e.slug}>
                      <Link href={`/practice/python#${e.slug}`} className="text-accent underline underline-offset-2">
                        Python · {e.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {(use.cards > 0 || use.backlinks.length > 0) && (
              <div className="space-y-3">
                {use.cards > 0 && (
                  <p>
                    <span className="font-semibold">{use.cards}</span> flashcard{use.cards === 1 ? "" : "s"} in{" "}
                    <Link href="/review" className="text-accent underline underline-offset-2">
                      Review
                    </Link>
                  </p>
                )}
                {use.backlinks.length > 0 && (
                  <div>
                    <p className="font-semibold mb-1">Referenced by</p>
                    <ul className="space-y-1">
                      {use.backlinks.map((b) => (
                        <li key={b.slug}>
                          <Link href={`/kb/${b.slug}`} className="text-accent underline underline-offset-2">
                            {b.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      <nav className="grid gap-3 sm:grid-cols-2 border-t border-border pt-5">
        {prev ? (
          <Link href={`/kb/${prev.entry.slug}`} className="bg-surface border border-border rounded-2xl p-4 hover:border-accent">
            <span className="block text-[0.7rem] uppercase tracking-wide text-muted">Previous</span>
            <span className="block font-semibold mt-0.5">{prev.entry.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/kb/${next.entry.slug}`} className="bg-accent text-accent-fg rounded-2xl p-4 hover:opacity-90 sm:text-right node-shadow">
            <span className="block text-[0.7rem] uppercase tracking-wide opacity-80">Read next</span>
            <span className="block font-semibold mt-0.5">{next.entry.title}</span>
          </Link>
        ) : (
          <Link href="/kb" className="bg-surface border border-border rounded-2xl p-4 hover:border-accent sm:text-right">
            <span className="block text-[0.7rem] uppercase tracking-wide text-muted">End of the path</span>
            <span className="block font-semibold mt-0.5">Back to the Library</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
