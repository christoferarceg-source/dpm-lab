"use client";

// In-browser Python via Pyodide (CPython + pandas compiled to WASM). The
// runtime and the pandas wheel are fetched from the official jsdelivr
// distribution for the pinned version — self-hosting the package set is
// hundreds of MB, so we don't. First load takes a few seconds; the browser
// caches it after that.

import type { PyodideInterface } from "pyodide";
import { getDataset } from "@/content/dataset";
import { loadScript } from "./load-script";
import { deepEqual } from "./compare";
import type { PythonExercise } from "./types";

// Keep in sync with the `pyodide` version in package.json.
export const PYODIDE_VERSION = "314.0.6";
const PYODIDE_INDEX_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

declare global {
  interface Window {
    loadPyodide?: (config: { indexURL: string }) => Promise<PyodideInterface>;
  }
}

let pyodidePromise: Promise<PyodideInterface> | null = null;

export type PyLoadStage = "script" | "runtime" | "pandas" | "ready";

export async function getPyodide(onStage?: (s: PyLoadStage) => void): Promise<PyodideInterface> {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      onStage?.("script");
      await loadScript(`${PYODIDE_INDEX_URL}pyodide.js`);
      if (!window.loadPyodide) throw new Error("Pyodide loader did not expose loadPyodide");
      onStage?.("runtime");
      const py = await window.loadPyodide({ indexURL: PYODIDE_INDEX_URL });
      onStage?.("pandas");
      await py.loadPackage("pandas");
      onStage?.("ready");
      return py;
    })().catch((e) => {
      pyodidePromise = null; // allow retry
      throw e;
    });
  }
  return pyodidePromise;
}

export const SETUP_CODE = `
import json as _json
import pandas as pd
accounts           = pd.DataFrame(_json.loads(__accounts_json))
customers          = pd.DataFrame(_json.loads(__customers_json))
deals              = pd.DataFrame(_json.loads(__deals_json))
deal_stage_history = pd.DataFrame(_json.loads(__deal_stage_history_json))
transactions       = pd.DataFrame(_json.loads(__transactions_json))
pipeline_runs      = pd.DataFrame(_json.loads(__pipeline_runs_json))
dashboard_views    = pd.DataFrame(_json.loads(__dashboard_views_json))
result = None
`;

// Serializes `result` to JSON inside Python so we never have to convert
// numpy scalars / DataFrames across the JS boundary by hand.
export const SERIALIZE_CODE = `
import json as _json
def _native(o):
    try:
        import numpy as _np
        if isinstance(o, _np.generic):
            return o.item()
    except ImportError:
        pass
    if hasattr(o, "to_dict"):
        try:
            return o.to_dict("records")
        except TypeError:
            return o.to_dict()
    if hasattr(o, "tolist"):
        return o.tolist()
    if hasattr(o, "isoformat"):
        return o.isoformat()
    return str(o)
__serialized = _json.dumps(result, default=_native)
`;

export type PyRunOutcome =
  | { ok: true; result: unknown; stdout: string; ms: number }
  | { ok: false; error: string; stdout: string };

function cleanTraceback(msg: string): string {
  // Pyodide errors include the full internal traceback; keep the user's
  // frames and the final exception line.
  const lines = msg.split("\n");
  const idx = lines.findIndex((l) => l.includes('File "<exec>"'));
  const kept = idx >= 0 ? lines.slice(idx) : lines.slice(-4);
  return kept.join("\n").trim();
}

export async function runPython(code: string): Promise<PyRunOutcome> {
  const py = await getPyodide();
  const out: string[] = [];
  py.setStdout({ batched: (s: string) => out.push(s) });
  py.setStderr({ batched: (s: string) => out.push(s) });

  const ns = py.globals.get("dict")();
  try {
    const ds = getDataset();
    for (const [name, rows] of Object.entries(ds)) ns.set(`__${name}_json`, JSON.stringify(rows));

    const t0 = performance.now();
    py.runPython(SETUP_CODE, { globals: ns });
    py.runPython(code, { globals: ns });
    py.runPython(SERIALIZE_CODE, { globals: ns });
    const ms = Math.round(performance.now() - t0);

    const serialized = ns.get("__serialized") as string;
    return { ok: true, result: JSON.parse(serialized), stdout: out.join(""), ms };
  } catch (e) {
    const raw = e instanceof Error ? e.message : String(e);
    return { ok: false, error: cleanTraceback(raw), stdout: out.join("") };
  } finally {
    ns.destroy();
  }
}

export type GradeResult = { passed: boolean; reason?: string };

export function gradePython(exercise: PythonExercise, expected: unknown, result: unknown): GradeResult {
  if (result === null || result === undefined) {
    return { passed: false, reason: "`result` is still None — assign your answer to it." };
  }
  if (Array.isArray(expected) && !Array.isArray(result)) {
    return {
      passed: false,
      reason: "Expected a list (e.g. from .to_dict('records')) but got a different type.",
    };
  }
  if (Array.isArray(expected) && Array.isArray(result) && result.length !== expected.length) {
    return {
      passed: false,
      reason: `Expected ${expected.length} item(s) but got ${result.length}.`,
    };
  }
  const ok = deepEqual(result, expected, exercise.orderMatters ?? false);
  if (!ok) {
    return {
      passed: false,
      reason: Array.isArray(expected)
        ? "Right length, but the values" +
          (exercise.orderMatters ? " or their order" : "") +
          " don't match. Check keys, rounding, and sort order."
        : "Value doesn't match. Check your filter and rounding.",
    };
  }
  return { passed: true };
}
