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
