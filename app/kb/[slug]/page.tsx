import { notFound } from "next/navigation";
import { KbEntryView } from "@/components/KbEntryView";
import { allKbSlugs, getKbEntry } from "@/lib/kb";

export function generateStaticParams() {
  return allKbSlugs().map((slug) => ({ slug }));
}

export default async function KbEntryPage({ params }: PageProps<"/kb/[slug]">) {
  const { slug } = await params;
  if (!getKbEntry(slug)) notFound();
  return <KbEntryView slug={slug} />;
}
