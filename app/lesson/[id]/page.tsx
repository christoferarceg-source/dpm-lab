import { notFound } from "next/navigation";
import { LessonPlayer } from "@/components/LessonPlayer";
import { allLessons, getLesson } from "@/content/lessons";

export function generateStaticParams() {
  return allLessons.map((l) => ({ id: l.id }));
}

export default async function LessonPage({ params }: PageProps<"/lesson/[id]">) {
  const { id } = await params;
  const lesson = getLesson(id);
  if (!lesson) notFound();
  return <LessonPlayer lesson={lesson} />;
}
