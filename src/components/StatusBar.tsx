"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: site.timeZone,
  hour: "2-digit",
  minute: "2-digit",
});

function Clock() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(formatter.format(new Date()));
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 15_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  return (
    <span>
      {site.timeZoneLabel} <span className="text-fg">{now ?? "--:--"}</span>
    </span>
  );
}

/** tmux-style status line. */
export function StatusBar() {
  return (
    <footer className="flex h-8 items-center justify-between gap-4 border-t border-line text-[11px] text-muted">
      <div className="flex h-full items-center gap-3">
        <span className="grid h-full place-items-center bg-accent px-2.5 font-bold text-accent-ink">
          [{site.host}]
        </span>
        <span className="text-fg">0:zsh*</span>
        <span className="hidden sm:inline">1:portrait</span>
      </div>
      <div className="flex items-center gap-4 pr-3">
        <span className="hidden sm:inline">
          <span className="text-accent">●</span> {site.status}
        </span>
        <span className="hidden md:inline">utf-8</span>
        <Clock />
      </div>
    </footer>
  );
}
