import Link from "next/link";

const live = [
  {
    href: "/practice/sql",
    title: "SQL",
    blurb: "Compute the Sales Funnel metric tree in SQLite: deals_closed_value, revenue_generated, conversion_rate, and an RCA slice.",
  },
  {
    href: "/practice/python",
    title: "Python (pandas)",
    blurb: "Same dataset, same metrics — in pandas. Filters, merges, groupby, named aggregation.",
  },
  {
    href: "/review",
    title: "Spaced Review",
    blurb: "Flashcards over the knowledge base, scheduled with SM-2 so you revisit what you're about to forget.",
  },
];

const soon = [
  {
    title: "Stakeholder Simulation",
    blurb: "A simulated CFO / data engineer / sales lead with a hidden problem. You ask questions; you're scored on what you uncovered and what you missed.",
  },
  {
    title: "Incident RCA Case",
    blurb: "A broken data product (metric mismatch, stale pipeline, lost trust). Work the root cause step by step against a reference analysis.",
  },
  {
    title: "Teach-back",
    blurb: "Explain a concept in your own words; get it checked against your KB and the source docs for gaps.",
  },
];

export default function PracticeIndex() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Practice</h1>
        <p className="text-muted mt-1">Hard skills first. Judgment modes next.</p>
      </div>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-3">Available now</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {live.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="block bg-surface border border-border rounded-xl p-5 hover:border-accent transition-colors"
            >
              <h3 className="font-semibold">{m.title}</h3>
              <p className="text-sm text-muted mt-1.5">{m.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-3">Coming next</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {soon.map((m) => (
            <div key={m.title} className="bg-surface-2/60 border border-dashed border-border rounded-xl p-5">
              <h3 className="font-semibold text-muted">{m.title}</h3>
              <p className="text-sm text-muted mt-1.5">{m.blurb}</p>
              <p className="text-xs text-muted mt-3">Needs an LLM backend — wired up once an API key is added.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
