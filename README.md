# somilgumber.com

My personal site, styled as a terminal session.

- A shell types out my name, tagline and contact links.
- An ASCII portrait draws in line by line.
- The status bar shows a live IST clock.
- Shortcuts: `w` work, `c` contact, `t` theme.

## Running it locally

It's a regular Next.js 16 app using React 19, Tailwind v4 and pnpm.

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000.

## Making changes

Nearly all the text on the page (name, role, tagline, links, status and the skills list) is in `src/lib/site.ts`, so that's usually the only file you need to change.

Two files are generated, so don't edit them by hand:

- **`src/lib/banner.ts`** is the name banner. If the name changes, run `figlet -f "ANSI Shadow" <name>` and paste the output in.
- **`src/lib/portrait.ts`** is the ASCII portrait. It comes from `scripts/ascii-portrait.py`, which removes the background from a photo, crops it and turns it into characters. It writes one version for each theme. The photo (`somil.jpeg`) isn't in the repo, so put it in the project root before running:

  ```bash
  pip install "rembg[cpu]" opencv-python-headless pillow
  python scripts/ascii-portrait.py
  ```

  If you switch to a different photo, you'll probably need to change `CROP` in the script.

The components in `src/components/` each match one part of the screen (`TitleBar`, `Shell`, `Portrait`, `StatusBar` and so on). The theme colors are in `src/app/globals.css`.
