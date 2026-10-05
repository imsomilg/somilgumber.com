import { Pane } from "@/components/Pane";
import { Portrait } from "@/components/Portrait";
import { Shell } from "@/components/Shell";
import { StatusBar } from "@/components/StatusBar";
import { TitleBar } from "@/components/TitleBar";
import { portraitCols, portraitRows } from "@/lib/portrait";
import { site, skills } from "@/lib/site";

export default function Home() {
  return (
    <div className="flex min-h-svh p-2 sm:p-4 lg:p-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col border border-line bg-bg">
        <TitleBar />

        <main className="grid flex-1 gap-6 p-3 pt-6 sm:p-5 sm:pt-7 lg:grid-cols-[1.2fr_1fr]">
          <section aria-labelledby="hero-title" className="contents">
            <h1 id="hero-title" className="sr-only">
              {site.name}, {site.role}
            </h1>
            <p className="sr-only">{site.tagline}</p>

            <Pane title="zsh" meta="~/" className="flex flex-col justify-center px-4 py-6 sm:px-6 sm:py-8">
              <Shell />
            </Pane>

            <Pane
              title="cat portrait.txt"
              meta={`${portraitCols}×${portraitRows}`}
              className="flex flex-col justify-between gap-6 px-4 pb-4 pt-6 sm:px-6"
            >
              <div className="grid flex-1 place-items-center">
                <Portrait />
              </div>
              <p className="text-[11px] text-muted sm:text-xs">
                <span className="text-accent">stack:</span>{" "}
                {skills.map((s) => (
                  <span key={s} className="mr-2 inline-block">
                    [<span className="text-fg">{s}</span>]
                  </span>
                ))}
              </p>
            </Pane>
          </section>
        </main>

        <StatusBar />
      </div>
    </div>
  );
}
