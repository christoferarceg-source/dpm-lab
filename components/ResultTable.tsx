export function ResultTable({
  columns,
  rows,
  maxRows = 50,
}: {
  columns: string[];
  rows: unknown[][];
  maxRows?: number;
}) {
  if (columns.length === 0) {
    return <p className="text-sm text-muted">Query ran, but returned no result set.</p>;
  }
  const shown = rows.slice(0, maxRows);
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="min-w-full text-sm font-mono">
        <thead className="bg-surface-2">
          <tr>
            {columns.map((c) => (
              <th key={c} className="text-left px-3 py-2 font-semibold border-b border-border">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {shown.map((r, i) => (
            <tr key={i} className="odd:bg-surface even:bg-surface-2/40">
              {r.map((v, j) => (
                <td key={j} className="px-3 py-1.5 border-b border-border whitespace-nowrap">
                  {v === null || v === undefined ? (
                    <span className="text-muted italic">NULL</span>
                  ) : (
                    String(v)
                  )}
                </td>
              ))}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-3 py-3 text-muted italic">
                0 rows
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {rows.length > maxRows && (
        <p className="text-xs text-muted px-3 py-1.5 border-t border-border">
          Showing {maxRows} of {rows.length} rows
        </p>
      )}
    </div>
  );
}

/** Renders a Python `result` value: scalars inline, list-of-dicts as a table. */
export function PyResultView({ value }: { value: unknown }) {
  if (Array.isArray(value) && value.length > 0 && value.every((v) => v && typeof v === "object" && !Array.isArray(v))) {
    const cols = Array.from(new Set(value.flatMap((v) => Object.keys(v as object))));
    const rows = value.map((v) => cols.map((c) => (v as Record<string, unknown>)[c]));
    return <ResultTable columns={cols} rows={rows} />;
  }
  return (
    <pre className="text-sm font-mono bg-code-bg border border-border rounded-lg px-3 py-2 overflow-x-auto">
      {JSON.stringify(value, null, 2)}
    </pre>
  );
}
