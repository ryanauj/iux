# Data-dense light

> The Tufte register — cool near-white field, ink-slate body, hairline inset elevation, sparkline-ready type scale at 11/12/14 px, desaturated intents that read as data not decoration.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Data-dense light is Financial Terminal's friendlier cousin: same density stance, inverted to a cool near-white field. `surface.base` is `#fcfcfd`, `surface.raised` is full white, so a Card reads as "the field, framed" rather than "a chip lifted off the field" — Tufte's instruction that the data is the figure and the chrome is the ground. `content.primary` is ink slate `#0e131a`, tilted slightly cool to match the surface, sitting at ≈ 18.6:1 even at the 11-px caption. Every intent fill is one or two steps off vivid — restrained indigo, teal-blue info, forest success, umber warning, brick danger — so categorical color in a chart reads as data, not as decoration. Elevation is inset hairline rules at every slot except `overlay`, which adds a single soft drop shadow so modals still separate from the field.

## Origin

The data-visualisation register codified by Edward Tufte's "The Visual Display of Quantitative Information" (1983) and its successors — small multiples, sparklines, hairline rules, no chartjunk, non-data ink as wasted ink. This palette is the Tufte instruction applied to a flat-engine UI: chrome stays out of the data's way.

## Signatures

- **Cool near-white `surface.base` (`#fcfcfd`) with white `raised`** — `surface.base` is `#fcfcfd` (a near-white cool grey) and `surface.raised` is `#ffffff`. The two are close enough that a Card reads as "the field, framed" rather than as "a chip lifted off the field." This is Tufte's figure-ground instruction in tokens.
- **Sparkline-ready type scale: 14/12/11 px** — `role.body` is 0.875rem (14 px), `role.label` is 0.75rem (12 px), `role.caption` is 0.6875rem (11 px). Tight enough that a row of small-multiples each carries a legible tick label without palette-specific chart overrides. The type scale densifies, not the space scale — `space.*` stays at the Flat default.
- **Inset hairline `elevation.*`, no faked light** — `elevation.low`/`medium` are pure `inset 0 0 0 1px` rules at `#eef0f3` / `#d8dce2`. `high` adds a 1px / 0.04 alpha drop, `overlay` adds an 8px / 0.10 drop so modals separate from the field. The Tufte register doesn't fake light sources; surfaces are distinguished by ruled borders, the way a printed table is.
- **Desaturated categorical intent set** — `intent.primary` is restrained indigo `#2549a8`; `info` is teal-blue `#1d6b87`; `success` is forest `#1f6b3a`; `warning` is umber `#8a5a0d`; `danger` is brick `#a32424`. Every fill is one or two steps off vivid so the same swatches can be reused as categorical color in a chart without reading as decoration.
- **Indigo identity unified across `link`, `primary`, and `focus`** — `content.link`, `intent.primary.bg`, and `border.focus` all share `#2549a8`. The link colour and the primary action share one identity, and the focus ring is the same hue — the Tufte register prefers one accent doing all three jobs rather than three competing accents.
- **Hairline radius (`0`/`0`/`2px`/`4px`)** — `radius.none` is `0`, `sm` is `0`, `md` is `2px`, `lg` is `4px`. The data wants rectangular cells, not rounded chips. `pill`/`full` still resolve to 999px/9999px for components that explicitly opt into a pill chip.

## Anti-signatures

- Decorative overlay on the root — `effect.overlay.image` is `none`; non-data ink is wasted ink
- Drop-shadow elevation on `low`/`medium` (this palette uses inset hairlines)
- Saturated, vivid intent fills — categorical color in a chart should read as data, not as decoration
- Three competing accent hues for `link` / `primary` / `focus` — this palette unifies them on one indigo
- Large body type (>= 1rem) — the sparkline-ready 14 px body is part of the contract

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.surface.base` | `#fcfcfd` | Cool near-white `#fcfcfd` — the Tufte field, close to `raised` so cards do not "lift." |
| `color.surface.raised` | `#ffffff` | Full white `#ffffff` — the field framed, not a chip floated. |
| `color.content.primary` | `#0e131a` | Ink slate `#0e131a` — almost black, tilted cool to match the surface. ≈ 18.6:1 even at 11-px caption. |
| `color.intent.primary.bg` | `#2549a8` | Restrained indigo `#2549a8` — one or two steps off vivid, reused as `content.link` and `border.focus`. |
| `elevation.low.boxShadow` | `inset 0 0 0 1px #eef0f3` | `inset 0 0 0 1px #eef0f3` — hairline rule, no drop shadow. Tufte's ruled-table elevation. |
| `typography.role.body.size` | `0.875rem` | 0.875rem (14 px) — the sparkline-ready body size. `label` 12 px, `caption` 11 px round out the dense scale. |
| `typography.family.mono` | `"IBM Plex Mono", "JetBrains Mono", "SF Mono", "Menlo", "Consolas", ui-monospace, monospace` | IBM Plex Mono — ships tabular figures by default; currency and percent columns align without per-column hacks. |
| `effect.overlay.image` | `none` | `none` — Tufte's instruction that non-data ink is wasted ink. |

## Often confused with

### vs [Financial Terminal](./financial-terminal.md)

Financial Terminal is the same density stance inverted: amber phosphor on black, mono-uppercase labels, P&L green/red, every radius `0`. Data-dense light keeps the density but commits to the opposite end of the brightness axis — cool near-white field, ink slate body, desaturated polychrome intents, hairline `md`/`lg` radius. Both thrive on long Tables; only this one survives long-form reading.

### vs [Wikipedia / Institutional](./wikipedia.md)

Wikipedia is a near-paper editorial register with a serif/sans body mix and no elevation at all. Data-dense light keeps elevation (as inset hairlines and a single shadow at `overlay`) and runs an all-sans Inter stack at the sparkline-ready 14/12/11 px scale — purpose-built for charts and tables, not for article prose.

### vs [Academic](./academic.md)

Academic is the journal-paper register — serif body, generous leading, footnote-tight margins, no chartjunk by default. Data-dense light is the Tufte register specifically for screens: sans throughout, hairline rules, small-multiples-ready type sizes, indigo `link`/`primary` unified.

### vs [Flat / Classic](./flat-classic.md)

Flat/Classic uses soft gaussian drop shadows for elevation and runs body at 1rem on a `system-ui` stack. Data-dense light replaces those drop shadows with inset hairlines, drops body to 14 px, and tightens the intent set toward chart-grade desaturation.

## Where it thrives

- Tables with dense numeric columns — IBM Plex Mono's tabular figures align without per-column width hacks
- Small-multiples chart grids — the 11-px caption is the sparkline tick-label size
- Long-form data dashboards — desaturated polychrome intents reuse as categorical color

## Where it degrades

- Modal / Dialog containment — README flags this; near-white `base` with full-white `overlay` plus a 0.42 scrim drops the field to roughly the same lightness as the panel, so the panel does not "lift" — components must rely on edge, not on darken
- Marketing or branded compositions — the deliberate restraint reads as utilitarian rather than expressive

## Recall aliases

`data-dense`, `data dense`, `data dense light`, `tufte`, `dense light`

## Long-form notes

<details>
<summary>From <code>palettes/data-dense-light.README.md</code></summary>

# Data-dense light

Flat engine in a Tufte-influenced data-viz register. Financial
Terminal's friendlier cousin: the same density stance, but with a cool
near-white field, ink-slate body, and desaturated semantic intents that
survive on a light surface without shouting. The aesthetic instruction
is Tufte's: non-data ink is wasted ink, so the chrome stays out of the
data's way.

`surface.base` is a near-white cool grey (`#fcfcfd`); `raised` is full
white. The two are close enough that a `Card` reads as "the field,
framed" rather than as "a chip lifted off the field". `content.primary`
is ink slate (`#0e131a`), almost black but tilted cool to match the
surface. `content.link` is a restrained indigo (`#2549a8`) — the same
hue used in `intent.primary` so the link colour and the primary action
share one identity. Every intent fill is one or two steps off vivid —
restrained indigo, deeper teal-blue `info`, forest `success`, umber
`warning`, brick `danger` — so categorical color in a chart (small-
multiples, bar grids, scatter dots) reads as data, not as decoration.

`radius.*` is hairline (`0` through `sm`, `2px` at `md`, `4px` at `lg`)
— the data wants rectangular cells, not rounded chips. `elevation.*` is
inset hairline rules at every slot except `overlay`, which adds a
single soft drop shadow so modals still read as separated from the
field. The Tufte register doesn't fake light sources; surfaces are
distinguished by ruled borders, the way a printed table is.

The type scale is the palette's sparkline-ready surface. `body` runs at
`0.875rem` (14 px), `label` at `0.75rem` (12 px), `caption` at
`0.6875rem` (11 px) — small enough that a row of small-multiples each
carries a legible tick label without the chart component needing
palette-specific overrides. The scale is sized so a sparkline 80 px
wide can still print 4–5 caption-sized tick labels under it; that's the
test the contract is meant to pass. `code` uses `IBM Plex Mono` which
ships tabular figures by default — currency columns and percentage
columns line up without per-column width hacks. `space.*` stays at the
Flat default; the *type scale* densifies, not the space scale, because
tight spacing with normal type sizes produces a cramped read while
small type with normal spacing produces the right register.

**A11y:** `pass`. `content.primary` (`#0e131a`) on `surface.base`
(`#fcfcfd`) ≈ 18.6:1 — AAA at every size, including the 11-px caption.
`content.secondary` `#3d4651` on base ≈ 9.5:1 (AAA), `content.muted`
`#6b7280` on base ≈ 4.7:1 (AA body). Every intent fill paired with the
`content: '#ffffff'` inverse hits AA at body or better — restrained
indigo ≈ 8.0:1, info ≈ 5.6:1, success ≈ 6.4:1, warning ≈ 6.0:1, danger
≈ 6.7:1. Focus ring is the same indigo at 2-px solid with a 1-px offset
— meets AA focus contrast against both `base` and `raised`.

**Most likely to fail: `Modal / Dialog` (all variants).** A modal's
visual containment depends on tonal contrast between the dimmed page
behind it and the panel above it; this palette publishes a `surface.base`
near pure white and a `surface.overlay` (the panel fill) at full white,
with a `surface.scrim` of `rgba(14, 19, 26, 0.42)`. On a near-white
page, the scrim drops the field to roughly the same lightness as the
overlay panel itself — the panel doesn't "lift", it merely sits in
front. The fix is not at the palette level — the high-key field is the
aesthetic. The fix is at the **component** level: pair the scrim with
a heavier `elevation.overlay` shadow stack (already in the contract),
and rely on the panel's hairline `border.default` for crisp edge
definition rather than expecting the scrim to do containment work.
Components that need an overlay to dominate the page in a Tufte
register need to do that through *edge*, not through *darken*.

</details>

---

_Generated from `palettes/data-dense-light.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
