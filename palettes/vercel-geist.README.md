# Vercel Geist

Vercel Geist / shadcn modern dev-tool register on the Flat engine. Pure-
white field, pure-black primary, the canonical Vercel blue (`#0070f3`)
as `intent.info`, hairline-only elevations, Geist-feel sans-serif
throughout. The "ship a developer dashboard" aesthetic — closer to AAA
than Flat / Classic, but with one saturated brand-accent and softer
corners.

`surface.base` and `surface.raised` are both pure white (`#ffffff`) —
depth is delivered through 1-px hairline borders, not by differentiated
surface luminance. The flat-on-flat surface stack is the load-bearing
move: every card, modal, and popover sits on the same near-white field
and is bounded by a hairline `#eaeaea` ring. `surface.sunken` drops only
to `#fafafa` for input wells.

`intent.primary.bg` is pure black (`#000000`) — the Vercel convention
where the primary button is a solid black slab. This is the second
palette in the showcase to use pure black as primary (alongside
Swiss / International's `#000000`), but Swiss reads the black as
typographic ink and Vercel Geist reads it as a polished obsidian
component.

- `intent.info` is the signature `#0070f3` blue (Vercel link colour
  and the brand-defining accent)
- `intent.success` is `#0a874a` (a near-emerald)
- `intent.warning` is amber (`#d97706`)
- `intent.danger` is `#e00000` (Vercel's error red)

`content.link` is `#0070f3` — links carry the Vercel blue, distinguishing
them from `intent.primary` (black) the way the brand site does.

`typography.family.*` aliases to Geist Sans with Inter / Söhne as
fallbacks. Display weights climb to 600 (semibold, not bold) — the
Geist register favours medium weights at large sizes; pushing display
to 700 would read as too aggressive.

`radius.*` is tight (`sm = 4px / md = 6px / lg = 8px`) — modern
shadcn / Vercel components round just enough to read as friendly
without committing to claymorphism softness.

`elevation.low` is a 1 px hairline ring (`0 0 0 1px #eaeaea`); `medium`
adds a very low alpha drop shadow over the same hairline. Shadow tint
is neutral grey (`rgba(0, 0, 0, 0.04 → 0.16)`) — no chromatic cast,
the way Vercel's own components paint depth.

`borderStyle` stays `'css'` (every Flat palette declares it so) — but
the visual register is closer to AAA's "every element bounded by a
visible stroke" than to Material's "every elevation reads through soft
shadow."

**A11y:** `pass`. `content.primary` (`#000000`) on `surface.base`
(`#ffffff`) = 21:1 (AAA, maximum possible). `intent.primary` black with
white inverse = 21:1 (AAA). `intent.info` Vercel blue with white inverse
≈ 5.2:1 (AA body). `intent.success` near-emerald with white ≈ 4.5:1
(AA body). `intent.warning` amber with white ≈ 3.0:1 (AA UI minimum;
the Vercel `d97706` itself just clears the button threshold).
`intent.danger` Vercel red with white ≈ 5.4:1 (AA body).

## Engine cost

Zero new tokens. Pure Flat-engine configuration: `color.*`, `radius.*`,
hairline-ring elevations, and the Geist Sans / Geist Mono typography
stack with web-safe fallbacks.
