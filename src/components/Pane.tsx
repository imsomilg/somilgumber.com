import type { ReactNode } from "react";

/** A TUI pane: hairline box with its title sitting on the top border. */
export function Pane({
  title,
  meta,
  className = "",
  children,
}: {
  title: string;
  meta?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`relative border border-line ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[0.6rem] left-3 right-3 flex justify-between text-[11px] leading-none"
      >
        <span className="bg-bg px-1.5 text-accent">{title}</span>
        {meta && <span className="bg-bg px-1.5 text-muted">{meta}</span>}
      </div>
      {children}
    </div>
  );
}
