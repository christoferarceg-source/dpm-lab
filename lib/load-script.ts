// Injects a <script> tag once and resolves when it has loaded. Used for the
// two WASM runtimes (sql.js and Pyodide) so they stay out of the Next.js
// bundler entirely — both ship their own loaders that expect to run as
// classic scripts.

const pending = new Map<string, Promise<void>>();

export function loadScript(src: string): Promise<void> {
  if (typeof document === "undefined") {
    return Promise.reject(new Error("loadScript can only run in the browser"));
  }
  const existing = pending.get(src);
  if (existing) return existing;

  const p = new Promise<void>((resolve, reject) => {
    const already = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (already && already.dataset.loaded === "true") {
      resolve();
      return;
    }
    const el = already ?? document.createElement("script");
    el.src = src;
    el.async = true;
    el.addEventListener("load", () => {
      el.dataset.loaded = "true";
      resolve();
    });
    el.addEventListener("error", () => {
      pending.delete(src);
      reject(new Error(`Failed to load script: ${src}`));
    });
    if (!already) document.head.appendChild(el);
  });
  pending.set(src, p);
  return p;
}
