"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { site } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { key: "w", label: "work", href: site.workUrl },
  { key: "c", label: "contact", href: `mailto:${site.email}` },
];

export function TitleBar() {
  const { resolvedTheme, setTheme } = useTheme();

  // Single-key shortcuts, like a TUI. Ignored while typing or with modifiers held.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
      const target = e.target as HTMLElement;
      if (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      const key = e.key.toLowerCase();
      if (key === "t") setTheme(resolvedTheme === "dark" ? "light" : "dark");
      const link = links.find((l) => l.key === key);
      if (link) window.location.href = link.href;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [resolvedTheme, setTheme]);

  return (
    <header className="flex h-11 items-center justify-between gap-4 border-b border-line px-3 text-xs sm:px-4">
      <div className="flex min-w-0 items-center gap-3">
        <span
          aria-hidden
          className="grid h-6 place-items-center bg-accent px-1.5 text-[11px] font-bold tracking-wider text-accent-ink"
        >
          {site.monogram}
        </span>
        <span className="truncate text-muted">
          <span className="text-fg">{site.user}</span>@{site.host}: ~
        </span>
      </div>

      <nav aria-label="Primary" className="flex items-center gap-4 sm:gap-6">
        {links.map((l) => (
          <a
            key={l.key}
            href={l.href}
            aria-keyshortcuts={l.key}
            className="hidden whitespace-nowrap text-muted transition-colors hover:text-fg sm:inline"
          >
            <span className="text-accent">[{l.key}]</span> {l.label}
          </a>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  );
}
