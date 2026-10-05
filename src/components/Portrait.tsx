import { portraitCols, portraitDark, portraitLight } from "@/lib/portrait";
import { site } from "@/lib/site";

// Glyphs advance 0.6em, so a full row is cols * 0.6em; size the font to fill the container.
const fontSize = `calc(100cqi / ${portraitCols * 0.6})`;

/** ASCII portrait, revealed top-down like a slow scanline render. */
export function Portrait() {
  const pre = "scan-reveal whitespace-pre leading-none text-accent";
  return (
    <div role="img" aria-label={`ASCII portrait of ${site.name}`} className="@container w-full max-w-[560px]">
      {/* Both variants share one grid cell and swap by visibility, so a theme
          change doesn't restart the reveal animation the way display:none would. */}
      <div aria-hidden className="grid" style={{ fontSize }}>
        <pre className={`${pre} invisible [grid-area:1/1] dark:visible`}>{portraitDark}</pre>
        <pre className={`${pre} [grid-area:1/1] dark:invisible`}>{portraitLight}</pre>
      </div>
    </div>
  );
}
