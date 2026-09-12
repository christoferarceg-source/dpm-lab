import { notFound } from "next/navigation";
import { ChapterView } from "@/components/ChapterView";
import { chapters } from "@/content/story";
import type { ChapterNumber } from "@/lib/types";

export function generateStaticParams() {
  return chapters.map((c) => ({ n: String(c.number) }));
}

export default async function ChapterPage({ params }: PageProps<"/chapters/[n]">) {
  const { n } = await params;
  const number = Number(n);
  if (!chapters.some((c) => c.number === number)) notFound();
  return <ChapterView number={number as ChapterNumber} />;
}
