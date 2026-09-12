// Tolerant deep comparison used by both graders. Numbers are compared with
// a small tolerance (so 0.6875 from SQLite and 0.6875 from numpy agree),
// strings are trimmed, and row order can be ignored.

const NUM_TOLERANCE = 1e-6;

function isNumberLike(v: unknown): v is number | bigint {
  return typeof v === "number" || typeof v === "bigint";
}

function scalarsEqual(a: unknown, b: unknown): boolean {
  if (a === null || a === undefined) return b === null || b === undefined;
  if (b === null || b === undefined) return false;
  if (isNumberLike(a) && isNumberLike(b)) {
    return Math.abs(Number(a) - Number(b)) <= NUM_TOLERANCE;
  }
  // Allow a numeric string to match a number ("84000" vs 84000).
  if (isNumberLike(a) && typeof b === "string" && b.trim() !== "" && !isNaN(Number(b))) {
    return Math.abs(Number(a) - Number(b)) <= NUM_TOLERANCE;
  }
  if (isNumberLike(b) && typeof a === "string" && a.trim() !== "" && !isNaN(Number(a))) {
    return Math.abs(Number(a) - Number(b)) <= NUM_TOLERANCE;
  }
  if (typeof a === "string" && typeof b === "string") return a.trim() === b.trim();
  if (typeof a === "boolean" && typeof b === "boolean") return a === b;
  return false;
}

function canonicalKey(v: unknown): string {
  // Stable string for sorting rows when order is ignored. Round numbers so
  // float noise doesn't break the sort-then-compare.
  if (isNumberLike(v)) return "n:" + Number(v).toFixed(6);
  if (v === null || v === undefined) return "null";
  if (typeof v === "object") {
    const obj = v as Record<string, unknown>;
    if (Array.isArray(obj)) return "[" + obj.map(canonicalKey).join(",") + "]";
    return (
      "{" +
      Object.keys(obj)
        .sort()
        .map((k) => JSON.stringify(k) + ":" + canonicalKey(obj[k]))
        .join(",") +
      "}"
    );
  }
  return typeof v + ":" + String(v).trim();
}

export function deepEqual(a: unknown, b: unknown, orderMatters = false): boolean {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    if (orderMatters) {
      return a.every((x, i) => deepEqual(x, b[i], orderMatters));
    }
    const sa = [...a].sort((x, y) => canonicalKey(x).localeCompare(canonicalKey(y)));
    const sb = [...b].sort((x, y) => canonicalKey(x).localeCompare(canonicalKey(y)));
    return sa.every((x, i) => deepEqual(x, sb[i], true));
  }
  if (Array.isArray(a) || Array.isArray(b)) return false;

  if (a !== null && b !== null && typeof a === "object" && typeof b === "object") {
    const ka = Object.keys(a as object).sort();
    const kb = Object.keys(b as object).sort();
    if (ka.length !== kb.length) return false;
    if (!ka.every((k, i) => k === kb[i])) return false;
    return ka.every((k) =>
      deepEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k], orderMatters)
    );
  }
  return scalarsEqual(a, b);
}

/** Case-insensitive, order-sensitive column-name comparison. */
export function columnsEqual(actual: string[], expected: string[]): boolean {
  if (actual.length !== expected.length) return false;
  return actual.every((c, i) => c.trim().toLowerCase() === expected[i].trim().toLowerCase());
}
