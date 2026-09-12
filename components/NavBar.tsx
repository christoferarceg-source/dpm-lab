"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/kb", label: "Knowledge Base" },
  { href: "/practice", label: "Practice" },
  { href: "/review", label: "Review" },
];

export function NavBar() {
  const pathname = usePathname();
  return (
    <header className="border-b border-border bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-6">
        <Link href="/" className="font-semibold tracking-tight whitespace-nowrap">
          DPM <span className="text-accent">Lab</span>
        </Link>
        <nav className="flex items-center gap-1 overflow-x-auto">
          {links.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-1.5 rounded-md text-sm whitespace-nowrap transition-colors ${
                  active ? "bg-accent-soft text-accent font-medium" : "text-muted hover:text-fg hover:bg-surface-2"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
