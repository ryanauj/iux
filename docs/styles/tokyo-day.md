# Tokyo / Day

> JIS-signage register on the Flat engine — white field, JR-East green / blue + JIS signal red / yellow as the semantic triad, Barlow Condensed display, 4 px grid.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Tokyo / Day is the daytime city-infrastructure palette. White field, cool-tinted hairline borders, intents drawn directly from the JIS signage colour system (`#c8102e` signal red, `#ffd400` signal yellow) and the JR-East line palette (`#00b04f` green, `#0084c8` blue). `intent.primary.bg` and `intent.success.bg` both share JR-East green — Tokyo's transit signage conflates "go" and "primary". `typography.family.display` is Barlow Condensed, the condensed gothic register Japanese signage favours; body and ui are Inter with Noto Sans JP as the CJK fallback even though the showcase only renders Latin.

## Origin

JIS Z 9101 (Japanese Industrial Standard for safety colours, 1979) and the JR-East line-colour palette (formalised across the 1987 privatisation). Tokyo / Day pulls its semantic triad directly from these public-domain standards: the saturated, signage-grade hues are the daytime city colour vocabulary translated into Flat tokens.

## Signatures

- **JR-East green `#00b04f` carrying BOTH `intent.primary` and `intent.success`** — `intent.primary.bg` and `intent.success.bg` share the exact JR-East signage green. The conflation is the load-bearing semantic move — Tokyo signage uses the same green for "go" and "primary" and the palette commits to it.
- **JIS signal red `#c8102e` carrying `intent.danger`** — `intent.danger.bg` is the canonical JIS Z 9101 signal red. Not a brand red, not a CSS-friendly red — the specific public-domain emergency colour.
- **Barlow Condensed display + Noto Sans JP body fallback** — `typography.family.display` is `"Barlow Condensed", "Oswald", "Roboto Condensed", ...` — the condensed gothic signage register. `family.ui` is `"Inter", "Noto Sans JP", "Hiragino Sans", "Yu Gothic UI", ...` — Latin first, CJK fallback ready for production.
- **4 px integer grid throughout** — `space.*` lands on every integer multiple of 4 from `0` through `64px`. Tighter than Flat / Classic's broader scale at the high end — the signage-density feel.
- **Tightened `radius.*` at the low end (`sm: 2px`, `md: 4px`)** — Hard-rounded rectangles rather than pill-soft buttons. `radius.lg` keeps `10px` for cards.

## Anti-signatures

- A blue or violet `intent.primary` — Tokyo / Day commits to green
- A pastel or muted intent palette — the signage colours must read saturated
- A serif display family (the register is condensed gothic, not serif)
- Magazine-style breathing room (`space.*` is tight here)

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.intent.primary.bg` | `#007c38` | JR-East green `#00b04f` — shared with `intent.success.bg`. The "primary = go" conflation is the register's signature. |
| `color.intent.danger.bg` | `#c8102e` | JIS signal red `#c8102e` — the public-domain Japanese signage standard, not a generic CSS red. |
| `color.intent.warning.bg` | `#ffd400` | JIS signal yellow `#ffd400` with near-black `content` (yellow + white falls below AA). |
| `typography.family.display` | `"Barlow Condensed", "Oswald", "Roboto Condensed", "Helvetica Neue Condensed", "Arial Narrow", sans-serif` | Barlow Condensed — the condensed gothic signage register. |
| `typography.family.ui` | `"Inter", "Noto Sans JP", "Hiragino Sans", "Yu Gothic UI", "Helvetica Neue", system-ui, sans-serif` | Inter + Noto Sans JP fallback chain — CJK-ready even in a Latin-only showcase. |

## Often confused with

### vs [Flat / Classic](./flat-classic.md)

Flat / Classic uses a single saturated blue `#1d4ed8` as `intent.primary` and a system font stack. Tokyo / Day uses a five-colour signage palette (red / yellow / green / blue) with white as the only `surface.base` and condensed gothic display — it commits to signage colour where Flat / Classic stays neutral.

### vs [Swiss / International Style](./swiss-international.md)

Swiss / International uses signal red as the only chromatic accent on white + black and zero radius. Tokyo / Day uses four signage colours (not just red), keeps `radius.lg` at `10px` for cards, and uses condensed gothic instead of Akzidenz / Helvetica.

### vs [Bullet Train / Day](./bullet-train-day.md)

Bullet Train / Day is the same day-transit family but commits to the Shinkansen livery: pale-sky-blue field, deep-navy primary, signal-yellow focus, asymmetric `radius.lg` for forward motion. Tokyo / Day is the broader city-signage register: white field, four-colour signage triad, no directional radius.

## Where it thrives

- Buttons and badges — the saturated signage intents stay legible at small sizes
- Navigation tabs and pills — the JR-line-colour vocabulary suits transit-style category UI
- Dense lists / tables — the 4 px grid + tight `space.*` reads as information-graphic density
- Map and wayfinding UI — the palette IS a signage system

## Where it degrades

- Long-form articles — body text at `0.9375rem` and 4 px grid feels cramped vs Editorial / Wikipedia
- Marketing pages that want a single "brand colour" — Tokyo / Day commits to four signage colours, not one

## Recall aliases

`tokyo day`, `tokyo`, `jr east`, `jis signage`, `tokyo signage`, `shibuya day`

## Long-form notes

<details>
<summary>From <code>palettes/tokyo-day.README.md</code></summary>

# Tokyo / Day

JIS-signage register on the Flat engine. White field, JR-East green +
JR-East blue + JIS signal red + JIS signal yellow carrying the
semantic triad, Barlow Condensed display, tight 4 px grid. The
"Shibuya-crossing at noon" intensity: saturated, signage-grade colour
reserved for state, condensed gothic display for headings, dense
spacing throughout.

`surface.base` is pure `#ffffff`; `surface.raised` is `#fafafa` —
cooler than Flat / Classic's `#f4f5f7`. Borders are hairline `#e0e0e0`
rules, the colour of a printed signage backplate. `surface.sunken`
drops to `#f0f0f0` for input wells.

Intents draw directly from public-domain Japanese signage standards.
`intent.primary.bg` and `intent.success.bg` both share JR-East green
(`#00b04f`) — Tokyo's transit signage conflates "go" and "primary" and
the palette commits to the same conflation rather than carrying a
separate brand colour. `intent.info.bg` is JR-East blue (`#0084c8`),
the colour the JR-East signage system uses for information and direction.
`intent.danger.bg` is JIS Z 9101 signal red (`#c8102e`) — the canonical
Japanese emergency colour, not a generic CSS red. `intent.warning.bg`
is JIS signal yellow (`#ffd400`) with near-black `content` because
yellow + white falls below AA.

`space.*` snaps to a 4 px grid throughout: every step from `0` to `64px`
lands on an integer multiple of 4 with no intermediate values. The
tighter feel reads as signage density. `radius.*` collapses at the low
end (`sm: 2px`, `md: 4px`) — JIS signage favours hard-rounded
rectangles rather than pill-soft buttons. `radius.lg` keeps `10px` for
cards so the register doesn't tip into Swiss-International territory.

`typography.family.display` is `"Barlow Condensed", "Oswald",
"Roboto Condensed", "Helvetica Neue Condensed", "Arial Narrow",
sans-serif` — the condensed gothic register Japanese signage favours.
`family.ui` is `"Inter", "Noto Sans JP", "Hiragino Sans", "Yu Gothic UI",
"Helvetica Neue", system-ui, sans-serif` — Latin first with CJK
fallback ready for production even though the showcase renders Latin
only. Display roles set `textTransform: uppercase` with weight `700`
for the signage-shout register; subheading drops back to a regular Inter
weight for legibility.

`elevation.*` uses Flat / Classic's gaussian recipe with a slightly
cooler shadow tint (`rgba(15, 30, 40, 0.08)` at `low`) so cards lift
visibly against the cool-white field. `motion.duration.base` is `180ms`
(vs Flat / Classic's `200ms`) — slightly snappier, matching the
information-graphic register's preference for crispness over settling.

**A11y:** `pass`. `content.primary` `#1a1a1a` on `surface.base`
`#ffffff` ≈ 16:1 — AAA at every size. `intent.primary` / `success` JR
green + white inverse ≈ 4.6:1 (AA body) — this is the threshold the
JR-East signage colour ships at. `intent.danger` JIS signal red + white
inverse ≈ 6:1 (AA body, AAA large). `intent.warning` JIS signal yellow
(`#ffd400`) + near-black content `#1a1a1a` ≈ 13.2:1 (AAA). `intent.info`
JR blue + white inverse ≈ 5.4:1 (AA body). `border.focus` JR blue on
white ≈ 5.4:1, well past the 3:1 focus threshold.

The JR-East green at the AA threshold is the palette's tightest
contrast. A more saturated synthetic green would clear AAA, but the
authentic JR signage value is `#00b04f` and the palette commits to it —
the showcase ships the period-correct colour, not the AAA-friendlier
modernisation.

</details>

---

_Generated from `palettes/tokyo-day.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
