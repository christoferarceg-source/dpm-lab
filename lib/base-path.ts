// The app may be served under a sub-path (GitHub Pages project sites live
// at /<repo>/). next/link and next/image handle `basePath` automatically;
// anything we build by hand — script/wasm URLs, markdown links — must use
// this helper. The value is inlined at build time from NEXT_PUBLIC_BASE_PATH.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function withBasePath(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${BASE_PATH}${path}`;
}
