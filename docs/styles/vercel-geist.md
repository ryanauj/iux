# Vercel Geist

> Vercel Geist / shadcn modern dev-tool register on the Flat engine — pure-white field, pure-black `intent.primary`, signature `#0070f3` blue on `info` and focus, hairline-ring elevations, Geist Sans throughout.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Vercel Geist is the "ship a developer dashboard" register on the modern-light Flat-engine grid. `surface.base` and `surface.raised` are both pure white (`#ffffff`) — depth is delivered through 1-px hairline `#eaeaea` borders, not by differentiated surface luminance. `intent.primary.bg` is pure black (`#000000`) — the Vercel convention where the primary button is a solid black slab. `intent.info` is the signature `#0070f3` blue, which also carries `content.link` and `border.focus`. `family.*` routes to Geist Sans with Inter / Söhne fallback; display weights climb to 600 (semibold, not bold).

## Origin

The Vercel / shadcn / modern-dev-tool generation, 2020 onward — Vercel's own dashboard, shadcn/ui as the reference component library, Next.js documentation, every "ship a developer SaaS in 2024" project. The colour vocabulary is pure-white / pure-black with one saturated blue accent (`#0070f3`, the Vercel link colour). The typography is the Vercel-commissioned Geist (Sans + Mono).

## Signatures

- **Pure-white `surface.base` and `surface.raised` (`#ffffff` flat-on-flat)** — `surface.base` and `surface.raised` are both `#ffffff` — depth is delivered through 1-px hairline borders, not by differentiated surface luminance. The flat-on-flat surface stack is the load-bearing move: every card, modal, and popover sits on the same near-white field and is bounded by a hairline `#eaeaea` ring.
- **Pure-black `intent.primary` (`#000000`) — solid obsidian button** — `intent.primary.bg` is `#000000` — the Vercel convention where the primary button is a solid black slab. Second palette in the showcase to use pure black as primary (alongside Swiss / International), but Swiss reads the black as typographic ink and Vercel Geist reads it as a polished obsidian component.
- **Signature `#0070f3` blue on `intent.info`, `content.link`, and `border.focus`** — `intent.info.bg`, `content.link`, and `border.focus` all share `#0070f3` — Vercel's canonical link blue and the brand-defining accent. Links carry the Vercel blue, distinguishing them from `intent.primary` (black) the way the brand site does.
- **Geist Sans throughout, display weight 600 (not 700)** — `typography.family.*` aliases to `"Geist", "Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif`. Display, title, and heading all sit at weight 600 (semibold). Pushing display to 700 would read as too aggressive — the Geist register favours medium weights at large sizes.
- **Hairline-ring `elevation.low` (`0 0 0 1px #eaeaea`) with neutral shadow tint** — `elevation.low` is a 1 px hairline ring; `medium` adds a very low-alpha drop shadow over the same hairline. Shadow tint is neutral grey (`rgba(0, 0, 0, 0.04 → 0.16)`) — no chromatic cast, the way Vercel's own components paint depth.
- **Tight `radius.*` (`sm = 4px / md = 6px / lg = 8px`)** — Modern shadcn / Vercel components round just enough to read as friendly without committing to claymorphism softness. The tight scale is shared with Linear Workspace.

## Anti-signatures

- Tinted or coloured `surface.base` — pure-white flat-on-flat is structural
- A second saturated chromatic accent competing with the `#0070f3` blue
- Coloured shadow alpha — Vercel's depth is always neutral grey
- Serif `display` family — single-family Geist is structural
- Display weights at 700+ — the Geist register caps at 600 (semibold)

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.surface.base` | `#ffffff` | Pure white `#ffffff` — flat-on-flat with `surface.raised`. |
| `color.surface.raised` | `#ffffff` | Pure white `#ffffff` — identical to base; depth comes from hairlines only. |
| `color.intent.primary.bg` | `#000000` | Pure black `#000000` — the Vercel obsidian-button convention. |
| `color.intent.info.bg` | `#0070f3` | Signature Vercel blue `#0070f3` — also carries link and focus. |
| `color.content.link` | `#0070f3` | `#0070f3` — links share the brand blue, distinguishing them from black primary. |
| `typography.family.ui` | `"Geist", "Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif` | Geist-first stack with Inter / Söhne fallback. |
| `typography.role.display.weight` | `600` | 600 (semibold), not 700 — the Geist register caps here. |
| `elevation.low.boxShadow` | `0 0 0 1px #eaeaea` | `0 0 0 1px #eaeaea` — hairline ring, neutral grey, no chromatic tint. |

## Often confused with

### vs [Linear Workspace](./linear-workspace.md)

Both palettes are modern-dev-tool registers on the Flat engine with single-family sans, tight `radius`, and hairline-ring elevations. Linear Workspace tints the field cool (`#fbfbfc`) and uses Linear-iris `#5e6ad2` as primary with Inter body at 14 px. Vercel Geist commits to pure-white flat-on-flat surfaces with pure-black `#000000` primary, the `#0070f3` blue on info/link/focus, and Geist Sans at display weight 600.

### vs [Flat / Classic](./flat-classic.md)

Flat / Classic is the unornamented baseline: white raised on grey-white base, a saturated blue `#1d4ed8` as primary + link + focus, system stack typography, soft gaussian drop shadows. Vercel Geist sharpens every move: flat-on-flat pure-white surfaces, pure-black `#000000` primary slab, the Vercel `#0070f3` reserved for link/info/focus, Geist Sans, hairline-ring elevations.

### vs [Swiss / International Style](./swiss-international.md)

Both palettes use pure black on pure white. Swiss / International reads black as typographic ink: zero radius, generous grid, Helvetica throughout, no chromatic accent vocabulary beyond signal red. Vercel Geist reads black as obsidian component: tight `radius`, hairline-ring elevations, Geist Sans, full intent vocabulary anchored by `#0070f3` blue.

## Where it thrives

- Developer dashboards, documentation surfaces, deploy logs
- Form-heavy SaaS settings panels — the hairline-ring elevation keeps cards quiet
- Code-block-heavy long-form — Geist Mono pairs naturally with Geist Sans

## Where it degrades

- Brand-marketing pages that want warmth or chromatic richness — the pure-white / pure-black register reads as utilitarian
- Consumer-app registers that want soft colour — there is no warmth in the palette

## Recall aliases

`vercel`, `geist`, `vercel geist`, `shadcn`, `next.js`, `#0070f3`

## Long-form notes

<details>
<summary>From <code>palettes/vercel-geist.README.md</code></summary>

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

</details>

---

_Generated from `palettes/vercel-geist.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
