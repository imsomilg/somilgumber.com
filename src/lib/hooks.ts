"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/** False during SSR/hydration, true once mounted on the client. */
export function useMounted() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

const motionQuery = "(prefers-reduced-motion: reduce)";

export function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia(motionQuery);
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    () => window.matchMedia(motionQuery).matches,
    () => false,
  );
}
