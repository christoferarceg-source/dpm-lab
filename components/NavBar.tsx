"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Learn", icon: PathIcon, match: (p: string) => p === "/" || p.startsWith("/chapters") || p.startsWith("/lesson") },
  { href: "/practice", label: "Practice", icon: LabIcon, match: (p: string) => p.startsWith("/practice") },
  { href: "/review", label: "Review", icon: CardsIcon, match: (p: string) => p.startsWith("/review") },
  { href: "/profile", label: "Profile", icon: UserIcon, match: (p: string) => p.startsWith("/profile") },
];

function PathIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.4 : 1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="6" cy="5" r="2.5" />
      <circle cx="18" cy="12" r="2.5" />
      <circle cx="8" cy="19" r="2.5" />
      <path d="M8 6.5c4 1 7 2 8 4M16 14c-3 1.5-6 2-6 3.5" />
    </svg>
  );
}
function LabIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.4 : 1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 3h6M10 3v6l-5.5 9a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 9V3" />
      <path d="M7.5 15h9" />
    </svg>
  );
}
function CardsIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.4 : 1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="6" width="14" height="14" rx="2" />
      <path d="M8 4h12v12" />
    </svg>
  );
}
function UserIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.4 : 1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

/** Top bar on desktop, bottom tab bar on phones. Hidden inside a lesson. */
export function NavBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/lesson")) return null;
  return (
    <>
      <header className="hidden sm:block border-b border-border bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-6">
          <Link href="/" className="font-semibold tracking-tight whitespace-nowrap">
            DPM <span className="text-accent">Lab</span>
          </Link>
          <nav className="flex items-center gap-1">
            {tabs.map((t) => {
              const active = t.match(pathname);
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                    active ? "bg-accent-soft text-accent font-medium" : "text-muted hover:text-fg hover:bg-surface-2"
                  }`}
                >
                  {t.label}
                </Link>
              );
            })}
            <Link
              href="/kb"
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                pathname.startsWith("/kb") ? "bg-accent-soft text-accent font-medium" : "text-muted hover:text-fg hover:bg-surface-2"
              }`}
            >
              Library
            </Link>
          </nav>
        </div>
      </header>
      <nav className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-surface border-t border-border safe-bottom pt-1.5">
        <ul className="grid grid-cols-4">
          {tabs.map((t) => {
            const active = t.match(pathname) || (t.href === "/profile" && pathname.startsWith("/kb"));
            const Icon = t.icon;
            return (
              <li key={t.href}>
                <Link
                  href={t.href}
                  className={`flex flex-col items-center gap-0.5 py-1 text-[0.68rem] ${active ? "text-accent font-semibold" : "text-muted"}`}
                >
                  <Icon active={active} />
                  {t.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
