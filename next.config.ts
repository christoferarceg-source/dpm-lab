import type { NextConfig } from "next";

// Static export for GitHub Pages when STATIC_EXPORT=1 (see `npm run deploy`).
// Everything in the app runs client-side, so no server is needed. When an
// LLM-backed practice mode adds API routes later, deploy that build to a
// server host instead and leave STATIC_EXPORT unset.
const isStatic = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  ...(isStatic ? { output: "export", trailingSlash: true } : {}),
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
