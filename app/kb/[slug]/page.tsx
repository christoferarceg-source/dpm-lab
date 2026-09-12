import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/Markdown";
import { kbEntries } from "@/content/kb";
import { sqlExercises } from "@/content/exercises-sql";
import { pythonExercises } from "@/content/exercises-python";
import { flashcards } from "@/content/flashcards";
import { CATEGORY_LABELS, allKbSlugs, getKbEntry } from "@/lib/kb";

export function generateStaticParams() {
  return allKbSlugs().map((slug) => ({ slug }));
}

export default async function KbEntryPage({ params }: PageProps<"/kb/[slug]">) {
  const { slug } = await params;
  const entry = getKbEntry(slug);
  if (!entry) notFound();

  const relatedSql = sqlExercises.filter((e) => e.dpmConnection.kbSlug === slug);
  const relatedPy = pythonExercises.filter((e) => e.dpmConnection.kbSlug === slug);
  const cards = flashcards.filter((c) => c.kbSlug === slug);
  const backlinks = kbEntries.filter((e) => e.slug !== slug && e.body.includes(`[[${slug}]]`));

  return (
    <article className="max-w-3xl space-y-6">
      <div>
        <Link href="/kb" className="text-sm text-muted hover:text-fg">
          ← Knowledge Base
        </Link>
        <div className="flex items-center gap-2 text-xs text-muted mt-3">
          <span className="px-2 py-0.5 rounded-full bg-surface-2">{CATEGORY_LABELS[entry.category]}</span>
          {entry.tags.map((t) => (
            <span key={t}>#{t}</span>
          ))}
        </div>
        <h1 className="text-2xl font-semibold tracking-tight mt-2">{entry.title}</h1>
        <p className="text-muted mt-1">{entry.summary}</p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-5 sm:p-6">
        <Markdown>{entry.body}</Markdown>
      </div>

      <p className="text-xs text-muted">Source: {entry.source}</p>

      {(relatedSql.length > 0 || relatedPy.length > 0 || cards.length > 0 || backlinks.length > 0) && (
        <aside className="grid gap-4 sm:grid-cols-2">
          {(relatedSql.length > 0 || relatedPy.length > 0) && (
            <div className="bg-surface-2/60 border border-border rounded-xl p-4 text-sm">
              <p className="font-semibold mb-2">Practice this</p>
              <ul className="space-y-1">
                {relatedSql.map((e) => (
                  <li key={e.slug}>
                    <Link href="/practice/sql" className="text-accent underline underline-offset-2">
                      SQL · {e.title}
                    </Link>
                  </li>
                ))}
                {relatedPy.map((e) => (
                  <li key={e.slug}>
                    <Link href="/practice/python" className="text-accent underline underline-offset-2">
                      Python · {e.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {(cards.length > 0 || backlinks.length > 0) && (
            <div className="bg-surface-2/60 border border-border rounded-xl p-4 text-sm space-y-3">
              {cards.length > 0 && (
                <p>
                  <span className="font-semibold">{cards.length}</span> flashcard{cards.length === 1 ? "" : "s"} in{" "}
                  <Link href="/review" className="text-accent underline underline-offset-2">
                    Review
                  </Link>
                </p>
              )}
              {backlinks.length > 0 && (
                <div>
                  <p className="font-semibold mb-1">Referenced by</p>
                  <ul className="space-y-1">
                    {backlinks.map((b) => (
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
        </aside>
      )}
    </article>
  );
}
