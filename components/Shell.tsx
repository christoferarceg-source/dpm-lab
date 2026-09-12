"use client";

import { usePathname } from "next/navigation";
import { NavBar } from "./NavBar";

/** Page chrome. Lessons run full-screen without nav or footer. */
export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const inLesson = pathname.startsWith("/lesson");
  if (inLesson) return <main className="flex-1 flex flex-col min-h-dvh">{children}</main>;
  return (
    <>
      <NavBar />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-5 sm:py-8 pb-24 sm:pb-8">{children}</main>
      <footer className="hidden sm:block border-t border-border py-4 text-center text-xs text-muted">
        DPM Lab · progress is stored in this browser only
      </footer>
    </>
  );
}
