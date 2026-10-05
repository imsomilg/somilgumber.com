import { banner } from "@/lib/banner";

// Each character cell is CW x CH units (roughly a terminal cell's 1:2 ratio).
const CW = 6;
const CH = 12;
const T = 1.2; // shadow stroke thickness

/**
 * Draws the figlet banner as SVG instead of text: block glyphs (█) become solid
 * cells and the box-drawing "shadow" becomes thin strokes. Avoids depending on
 * the web font shipping those glyphs, and scales crisply to any width.
 */
export function Banner({ className = "" }: { className?: string }) {
  const lines = banner.split("\n");
  const cols = Math.max(...lines.map((l) => l.length));
  const blocks: string[] = [];
  const shadow: string[] = [];

  const h = (x: number, y: number, from: number, to: number) =>
    shadow.push(`M${x + from} ${y + CH / 2 - T / 2}h${to - from}v${T}h${from - to}z`);
  const v = (x: number, y: number, from: number, to: number) =>
    shadow.push(`M${x + CW / 2 - T / 2} ${y + from}h${T}v${to - from}h${-T}z`);

  lines.forEach((line, row) => {
    [...line].forEach((ch, col) => {
      const x = col * CW;
      const y = row * CH;
      const mx = CW / 2 + T / 2;
      const my = CH / 2 + T / 2;
      switch (ch) {
        case "█":
          blocks.push(`M${x} ${y}h${CW}v${CH}h${-CW}z`);
          break;
        case "═":
          h(x, y, 0, CW);
          break;
        case "║":
          v(x, y, 0, CH);
          break;
        case "╗":
          h(x, y, 0, mx);
          v(x, y, CH / 2 - T / 2, CH);
          break;
        case "╔":
          h(x, y, CW / 2 - T / 2, CW);
          v(x, y, CH / 2 - T / 2, CH);
          break;
        case "╝":
          h(x, y, 0, mx);
          v(x, y, 0, my);
          break;
        case "╚":
          h(x, y, CW / 2 - T / 2, CW);
          v(x, y, 0, my);
          break;
      }
    });
  });

  return (
    <svg
      viewBox={`0 0 ${cols * CW} ${lines.length * CH}`}
      className={className}
      aria-hidden
      shapeRendering="crispEdges"
    >
      <path d={shadow.join("")} className="fill-accent opacity-35" />
      <path d={blocks.join("")} className="fill-accent" />
    </svg>
  );
}
