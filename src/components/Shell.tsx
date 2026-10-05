"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/hooks";
import { site } from "@/lib/site";
import { Banner } from "./Banner";

type Step = { cmd: string; out: ReactNode };

const steps: Step[] = [
  {
    cmd: "whoami",
    out: (
      <div>
        <Banner className="my-4 block h-auto w-full max-w-[600px]" />
        <p aria-hidden className="text-muted">
          <span className="text-accent">→</span> {site.role.toLowerCase()}
        </p>
        <p className="text-muted">
          <span aria-hidden className="text-accent">→</span> {site.affiliation.role} @{" "}
          <a
            href={site.affiliation.url}
            className="text-fg underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            {site.affiliation.org}
          </a>
        </p>
      </div>
    ),
  },
  {
    cmd: "cat tagline.txt",
    out: <p aria-hidden className="max-w-[46ch] text-fg">{site.tagline}</p>,
  },
  {
    cmd: "ls ./actions",
    out: (
      <div className="flex flex-wrap gap-3 pt-1">
        <a
          href={`mailto:${site.email}`}
          className="bg-accent px-3 py-1.5 text-accent-ink transition-opacity hover:opacity-85"
        >
          ↵ start-a-project
        </a>
        <a
          href={site.workUrl}
          className="border border-line px-3 py-1.5 text-fg transition-colors hover:border-accent hover:text-accent"
        >
          view-work →
        </a>
      </div>
    ),
  },
];

function Prompt() {
  return (
    <span className="text-muted">
      <span className="text-accent">{site.user}</span>@{site.host} <span className="text-fg">~</span>{" "}
      <span className="text-accent">$</span>{" "}
    </span>
  );
}

function Cursor() {
  return <span aria-hidden className="cursor inline-block h-[1.1em] w-[0.6em] translate-y-[0.15em] bg-accent" />;
}

/**
 * A scripted shell session. Every line is rendered up front (hidden until reached)
 * so the layout never shifts while the commands type themselves out.
 */
export function Shell() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (reduced || step >= steps.length) return;
    const cmd = steps[step].cmd;
    const delay = typed === 0 ? 550 : typed < cmd.length ? 40 + Math.random() * 60 : 380;
    const t = setTimeout(() => {
      if (typed < cmd.length) setTyped(typed + 1);
      else {
        setStep(step + 1);
        setTyped(0);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [reduced, step, typed]);

  const current = reduced ? steps.length : step;

  return (
    <div className="space-y-2 text-[13px] leading-relaxed sm:text-sm">
      <p aria-hidden className="text-muted">
        # uplink established · session 0x7cf3 · {site.status}
      </p>

      {steps.map((s, i) => {
        const isCurrent = i === current;
        const shown = isCurrent ? typed : s.cmd.length;
        return (
          <div key={s.cmd} className={i > current ? "invisible" : undefined}>
            <p aria-hidden className="whitespace-nowrap">
              <Prompt />
              <span>{s.cmd.slice(0, shown)}</span>
              {isCurrent && <Cursor />}
              <span className="invisible">{s.cmd.slice(shown)}</span>
            </p>
            <div className={i < current ? undefined : "invisible"}>{s.out}</div>
          </div>
        );
      })}

      <p aria-hidden className={current < steps.length ? "invisible" : undefined}>
        <Prompt />
        <Cursor />
      </p>
    </div>
  );
}
