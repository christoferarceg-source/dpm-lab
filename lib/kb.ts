import { kbEntries } from "@/content/kb";
import type { KbCategory, KbEntry } from "./types";
import { withBasePath } from "./base-path";

const bySlug = new Map(kbEntries.map((e) => [e.slug, e]));

export function getKbEntry(slug: string): KbEntry | undefined {
  return bySlug.get(slug);
}

export function allKbSlugs(): string[] {
  return kbEntries.map((e) => e.slug);
}

export const CATEGORY_LABELS: Record<KbCategory, string> = {
  framework: "Framework",
  definition: "Definition",
  "case-study": "Case study",
  "industry-context": "Industry context",
};

/** Turn `[[slug]]` references into markdown links with the entry's title. */
export function resolveWikiLinks(md: string): string {
  return md.replace(/\[\[([a-z0-9-]+)\]\]/g, (_, slug: string) => {
    const e = bySlug.get(slug);
    return e ? `[${e.title}](${withBasePath(`/kb/${slug}`)})` : `\`${slug}\``;
  });
}
