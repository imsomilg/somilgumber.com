"use client";

import { useTheme } from "next-themes";
import { useMounted } from "@/lib/hooks";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = !mounted || resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-keyshortcuts="t"
      className="group whitespace-nowrap text-muted transition-colors hover:text-fg"
    >
      <span className="text-accent">[t]</span> theme:<span className="text-fg">{isDark ? "dark" : "light"}</span>
    </button>
  );
}
