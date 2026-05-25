# Engine guides — next batch

The walkthrough pattern at `/engines/:engineId` is now wired up for **flat**,
**material**, **neubrutalism**, and **glassmorphism**. There are nine engines
left to build:

| Engine                | Status      | Suggested batch |
|-----------------------|-------------|-----------------|
| neumorphism           | not started | batch 2         |
| claymorphism          | not started | batch 2         |
| skeuomorphism         | not started | batch 2         |
| crt-phosphor          | not started | batch 3         |
| pixel-art             | not started | batch 3         |
| terminal-tui          | not started | batch 3         |
| sketch                | not started | batch 4         |
| cardstock             | not started | batch 4         |
| cel-shaded            | not started | batch 4         |
| aurora                | not started | batch 4         |

Hand this prompt to the next agent to continue. Each batch should add 3
engines, run `pnpm run check`, and update the table above.

---

## Copy-paste prompt for the next agent

> Hi — please continue the work on engine walkthrough pages. The pattern is
> established and stable: `flat.tsx`, `material.tsx`, `neubrutalism.tsx`, and
> `glassmorphism.tsx` under `src/guides/engines/` are the reference
> implementations. Each one builds a 6-step walkthrough (philosophy, surfaces,
> borders, elevation, motion, intent) with engine-specific demos that
> genuinely express that engine's distinct design philosophy versus flat.
>
> **Your task: add the next 3 engines from `docs/engine-guides-next-batch.md`.**
>
> Concretely:
>
> 1. Read `src/guides/engines/flat.tsx` and one of the existing follow-ups
>    (e.g. `material.tsx` or `glassmorphism.tsx`) end to end. Note how each
>    file defines six demo components, an `EngineGuideMeta` export, and uses
>    the shared utility classes from `guides.css`
>    (`iux-engine-demo__row`, `__col`, `__cluster`, `__swatch-grid`,
>    `__bordered`, `__elevation-card`, `__nested`). Engine-specific helpers
>    that already exist: `__material-stack` / `__material-sheet` (paper
>    stacks) and `__glass-host` (saturated radial-gradient wrapper that
>    lets `backdrop-filter` show something).
>
> 2. For each engine you add, read its palette file (`palettes/<id>.ts`) and
>    README (`palettes/<id>.README.md`) first. The palette's token values are
>    the engine's defining choices — your demos should make those choices
>    legible. Pull the engine-specific signature out of the README and
>    structure your six steps to expose it. For example: claymorphism's
>    signature is inset highlights on rounded clay surfaces; skeuomorphism's
>    is bevelled inset/outset shadows imitating physical objects;
>    neumorphism's is the dual soft-shadow recipe on a same-tone surface.
>
> 3. Demo construction rules:
>    - Use real components from `src/components/` where possible
>      (`Button`, `Card`, `Toggle`, `Slider`).
>    - Each step's demo lives inside a `PaletteRoot` bound to the guide's
>      `demoPalette` — that's already done by `EngineGuide.tsx`. You write
>      the contents.
>    - Use only CSS custom properties from the palette (e.g.
>      `var(--color-surface-raised)`, `var(--elevation-low)`). Raw hex
>      colours and bare `ms` durations are flagged by
>      `pnpm run lint:tokens` — keep prose free of them. Reference tokens by
>      name (`<code>border.strong</code>`), not by value.
>    - For the motion step, copy the pattern from `flat.tsx` /
>      `material.tsx`: a `motionScale` toggle wired into a nested
>      `PaletteRoot`, with a caption that names the engine's specific
>      easing curve and duration band.
>    - For the elevation step, use a `Slider` with `variant="ticks"` to
>      walk the five rungs. If the engine uses a non-standard recipe
>      (paired shadows, inset highlights, hard-offset blocks), the caption
>      should call out which CSS properties combine to produce it.
>    - If an engine's demos need a special host or backdrop (glassmorphism's
>      saturated indigo, CRT's phosphor glow), add a small helper class to
>      `guides.css` — keep new CSS minimal and scoped under
>      `iux-engine-demo__<engine>-…`.
>
> 4. Wire each new guide in:
>    - Import and register in `src/guides/engines/registry.ts`.
>    - Flip the engine's `available` flag to `true` in
>      `src/guides/engines/index.tsx` (`ALL_ENGINES` array).
>
> 5. Validate before committing:
>    - `pnpm run check` (typecheck + palette validation + description
>      validation + raw-value lint + gates) must pass.
>    - `pnpm run build` should succeed.
>
> 6. Update the status table in `docs/engine-guides-next-batch.md`:
>    flip the three engines you finished to "done" and leave the rest
>    untouched. Then **regenerate the copy-paste prompt block in that file
>    so the next agent picks up where you left off**. The file is the
>    recursion vehicle — when the table shows all engines done, delete the
>    file in the same commit.
>
> 7. Commit your changes to the branch `claude/engine-pages-all-types-OU8zr`
>    with a concise message
>    (e.g. `engines: walkthroughs for neumorphism, claymorphism, skeuomorphism`)
>    and push.
>
> ## Style notes
>
> - **Match flat's fidelity.** Each demo should reveal something only that
>   engine does. A demo that looks the same on every engine is wasted.
> - **Prose is short and tight.** Two short paragraphs per step body, each
>   one sentence longer than a tweet. Read flat's prose for the cadence.
> - **No bare hex or ms values in source.** The lint enforces this. Reference
>   tokens by name; if you need to mention a specific duration in prose, say
>   "around 60 milliseconds" or use a `&nbsp;ms` join inside JSX (the lint
>   regex requires a digit immediately adjacent to `ms`, so `&nbsp;ms` is
>   safe).
> - **No emojis in source, comments, prose, or commit messages.**
>
> Start by reading this file (`docs/engine-guides-next-batch.md`) to see
> what's done and what's next. Pick the top batch of 3 from the status
> table.

---

## Engineering reference (for the next agent)

### File map

```
src/guides/engines/
├── EngineGuide.tsx        # container — don't touch
├── index.tsx              # ALL_ENGINES array — flip available flag here
├── registry.ts            # ENGINE_GUIDES map — register new guides here
├── types.ts               # EngineGuideMeta / EngineStep shapes
├── guides.css             # shared chrome + demo utility classes
├── flat.tsx               # reference
├── material.tsx           # done
├── neubrutalism.tsx       # done
└── glassmorphism.tsx      # done
```

### EngineGuideMeta shape

```ts
export const xxxGuide: EngineGuideMeta = {
  engine: 'xxx',              // must match Engine union in tokens/semantic.contract.ts
  name: 'Xxx',                // display name
  summary: '…',               // one paragraph, plain text (no JSX)
  demoPalette: xxxPalette,    // imported from ../../../palettes/<file>
  steps: [
    { id, title, description?, body: ReactNode, demo: ReactNode },
    // …six steps
  ],
}
```

### Components to lean on

- `Button` — `intent` props: primary, neutral, success, warning, danger, info
- `Card` — `variant`: static, expandable, bento, spatial; supports `title`,
  `subtitle`, `footer`
- `Toggle` — `variant`: switch, saving, segmented, tristate
- `Slider` — `variant`: single, ticks, range, curve; pass `snap` for tick
  snapping

### Token CSS vars (most-used)

- `--color-surface-{base,raised,sunken,overlay}`
- `--color-content-{primary,secondary,muted,inverse,link}`
- `--color-border-{subtle,default,strong,focus}`
- `--elevation-{flat,low,medium,high,overlay}`
- `--border-width-{hairline,thin,thick,heavy}`
- `--radius-{none,sm,md,lg,pill,full}`
- `--space-{0..8}`
- `--motion-duration-{instant,fast,base,slow}`
- `--motion-easing-{standard,in,out,inOut,spring}`
- `--effect-backdrop-blur-{none,sm,md,lg}`
- `--effect-focus-ring-{width,offset,style}`, `--color-focus-ring`
- `--effect-glow-{radius,color,intensity}`
- `--paper-edge-{color,width}`
- `--outline-{color,width}`
- `--pixel-grid`, `--stroke-variance`, `--shadow-style`
- `--effect-atmosphere-gradient`, `--luminance-center`, `--surface-by`
- `--grid-unit-x`, `--grid-unit-y`, `--border-style`

Engines exercise different subsets of these. Read the palette to see which
slots the engine actually uses; that's where the demos should focus.
