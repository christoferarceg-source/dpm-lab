"use client";

import { useSyncExternalStore } from "react";

function subscribe(cb: () => void) {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
}

/** The current URL hash without the leading '#'. Empty on the server. */
export function useHash(): string {
  return useSyncExternalStore(
    subscribe,
    () => window.location.hash.replace(/^#/, ""),
    () => ""
  );
}

export function setHash(value: string) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  url.hash = value;
  window.history.replaceState(null, "", url.toString());
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}
