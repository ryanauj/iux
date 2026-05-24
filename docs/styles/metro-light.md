# Metro / Light

> Transit-map information-graphic on the Flat engine — near-white field, hairline "track-rule" borders carrying every raised surface, MTA / NYC-subway line-colour palette as the `intent.*` vocabulary, Helvetica throughout.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Metro / Light translates the NYC MTA Standards Manual (Unimark / Vignelli, 1970) and related transit-map information-graphics into Flat tokens. `surface.base` is `#fcfcfc`; raised surfaces lift via a 1 px hairline track-rule (`#e6e6e6`) rather than a drop shadow. Intents take their colours from the NYC subway line palette: `#ee352e` red (1/2/3 line) as `intent.primary`, `#00933c` green (4/5/6) as `success`, `#ff6319` orange (B/D/F/M) as `warning`, `#0039a6` blue (A/C/E) as `info`. Helvetica carries every type role.

## Origin

The NYC MTA Graphics Standards Manual (Unimark International, 1970, designed by Massimo Vignelli and Bob Noorda) plus the London Underground roundel system (Frank Pick / Edward Johnston, 1916–) and Tokyo Metro's line-colour palette (1970s). Metro / Light is the generic transit-map register: hairline-bordered map regions, single-family Helvetica, category colour as the load-bearing semantic vocabulary.

## Signatures

- **Hairline "track-rule" border carrying every raised surface** — `elevation.low` is `0 0 0 1px #e6e6e6` — a 1 px box-shadow stroke, no soft penumbra. Cards / panels / inputs all lift via the rule alone. `elevation.overlay` (modals) is the only slot that adds a soft drop shadow on top of the rule, so floating panels lift above the map plane.
- **NYC-subway line-colour palette in `intent.*`** — `intent.primary.bg` is `#ee352e` (1/2/3 line red); `intent.info.bg` is `#0039a6` (A/C/E line blue); `intent.success.bg` is `#00933c` (4/5/6 line green); `intent.warning.bg` is `#ff6319` (B/D/F/M line orange). The vocabulary is the load-bearing semantic move — Metro / Light is a transit-map colour system applied as UI intents.
- **Helvetica on every typography role** — `typography.family.ui` and `family.display` both resolve to `"Helvetica Neue", "Helvetica", "Arial", system-ui, sans-serif`. No serif, no condensed, no second face — Helvetica does every job at different sizes and weights. The two-family split most palettes use collapses to one family here.
- **Bold-weight display (`700`) and bold-weight subheading / label** — `role.display.weight` is `700`; `role.subheading.weight` is `700`; `role.label.weight` is `700`. Transit-map type is sized AND weighted — Vignelli's manual specifies bold sans throughout, never regular-weight headings.
- **Near-white `surface.base` (`#fcfcfc`) — not pure white** — A half-step off pure white so the hairline rules read against the field. Pure white would make the 1 px stroke visually disappear at small zoom levels.

## Anti-signatures

- Soft drop shadows on `elevation.low` — the track-rule must carry the lift
- A serif display family — the register is single-family Helvetica
- A single saturated "brand" intent colour — the line-colour palette is multi-hue by design
- Regular-weight display headings — the register is bold throughout

## Token evidence

| Path | Value | Note |
|---|---|---|
| `elevation.low.boxShadow` | `0 0 0 1px #e6e6e6` | `0 0 0 1px #e6e6e6` — the track-rule. No soft penumbra. The single most-load-bearing token in the palette. |
| `color.intent.primary.bg` | `#ee352e` | NYC subway 1/2/3 line red `#ee352e` — public-domain MTA standard. |
| `color.intent.info.bg` | `#0039a6` | NYC subway A/C/E line blue `#0039a6`. |
| `typography.family.ui` | `"Helvetica Neue", "Helvetica", "Arial", system-ui, sans-serif` | Helvetica stack — the canonical transit-map type, Vignelli's 1970 manual specification. |
| `typography.role.display.weight` | `700` | `700` — bold, not regular. Transit signage is sized AND weighted. |

## Often confused with

### vs [Wikipedia / Institutional](./wikipedia.md)

Wikipedia also uses hairline borders on raised surfaces and a pale near-white field, but commits to serif display (Linux Libertine) + sans body and a single MediaWiki link blue `#3366cc` as `intent.primary`. Metro / Light uses Helvetica everywhere, the NYC-subway multi-colour line palette as `intent.*`, and bolder weight throughout.

### vs [Tokyo / Day](./tokyo-day.md)

Tokyo / Day uses a four-colour signage palette and Barlow Condensed display; Metro / Light uses a multi-colour line palette and Helvetica throughout. Tokyo / Day still lifts cards with a soft drop shadow; Metro / Light uses a hairline rule alone.

### vs [Swiss / International Style](./swiss-international.md)

Swiss / International uses signal red as the ONLY chromatic accent and zero radius across the board. Metro / Light uses the multi-colour line palette and keeps `radius.lg` at `10px` — the difference between "Swiss poster" and "transit map".

## Where it thrives

- Map and wayfinding UI — the palette IS a transit-map colour system
- Category-tagged lists (status badges in NYC-line colours) — the multi-hue intents map directly
- Pill-shaped station tags using `radius.full` — what the type and colour vocabulary are designed for
- Cards and panels — the track-rule lift reads as clean information-graphic surfaces

## Where it degrades

- Marketing pages that want a single "brand colour" — the multi-hue palette resists single-accent designs
- Dark-mode contexts — this palette is light-only
- Heavy use of soft shadows (`elevation.high` / `elevation.medium` still have soft shadows for emphasis, but the register is hairline-first)

## Recall aliases

`metro light`, `metro`, `transit map`, `subway map`, `mta`, `nyc subway`, `vignelli`

## Long-form notes

<details>
<summary>From <code>palettes/metro-light.README.md</code></summary>

# Metro / Light

Transit-map information-graphic on the Flat engine. Near-white field,
hairline "track-rule" borders carrying every raised surface, NYC subway
line-colour palette as the `intent.*` vocabulary, Helvetica throughout.
The MTA Standards Manual (Unimark / Vignelli, 1970) translated into
Flat tokens — the load-bearing visual is the 1 px hairline rule that
lifts cards via box-shadow stroke rather than a soft drop shadow.

`surface.base` is `#fcfcfc` — a half-step off pure white so the
hairline rules read against the field. Pure white would make the 1 px
stroke visually disappear at small zoom levels. `surface.raised` is
`#ffffff`; `surface.sunken` is `#f4f4f4` for input wells. The "track-
rule" border colour is `#e6e6e6` (1 px), the same neutral grey transit
maps use to separate map regions.

Intents take their colours from the NYC subway line palette:
`intent.primary.bg` is `#ee352e` (1/2/3 line red, the canonical
"primary" line in the MTA's signage hierarchy); `intent.info.bg` is
`#0039a6` (A/C/E line blue, also carrying `content.link` and
`border.focus`); `intent.success.bg` is `#00933c` (4/5/6 line green);
`intent.warning.bg` is `#ff6319` (B/D/F/M line orange);
`intent.danger.bg` reuses the 1/2/3 red one step darker (`#c8201a`) so
danger and primary don't read identical when stacked.

The line-colour palette is the load-bearing semantic move. Metro / Light
is the only palette in the set that ships a public-domain transit-map
colour system as `intent.*` — the alternative would be a `color.category.*`
namespace (as the concept doc flagged), but the current Flat-register set
doesn't yet have a second palette that would also need it, so the
contract addition is deferred.

`typography.family.ui` and `family.display` both resolve to
`"Helvetica Neue", "Helvetica", "Arial", system-ui, sans-serif`. The
single-family stack is the canonical transit-map type — Vignelli's
1970 manual specifies Helvetica throughout. No serif, no condensed,
no second face: Helvetica does every job at different sizes and
weights. Display roles run at `700` (bold); transit-map type is sized
AND weighted, not regular at large sizes.

`elevation.low` is `0 0 0 1px #e6e6e6` — a 1 px box-shadow stroke,
no soft penumbra. Cards / panels / inputs lift via the rule alone.
`elevation.medium` and `elevation.high` add soft drop shadows on top
of the rule for emphasis. `elevation.overlay` (modals) drops the rule
and uses a strong soft shadow alone so floating panels lift clearly
above the map plane — the only slot where the register breaks its
hairline-first convention.

`radius.*` matches Flat / Classic verbatim: `radius.lg` is `10px` for
cards, `radius.full` is `9999px` for circles, `radius.pill` is `999px`
for station-tag chips. The pill chip is the transit-map vocabulary's
canonical UI element and the standard `radius.full` slot exercises it.

**A11y:** `pass`. `content.primary` `#0a0a0a` on `surface.base`
`#fcfcfc` ≈ 19:1 — AAA. `intent.primary` 1/2/3 red + white inverse ≈
5:1 (AA body, AAA large) — the threshold the MTA's signage ships at.
`intent.info` A/C/E blue + white inverse ≈ 10:1 (AAA). `intent.success`
4/5/6 green + white inverse ≈ 4.7:1 (AA body). `intent.warning`
B/D/F/M orange + white inverse ≈ 3.6:1 (AA large only) — the
public-domain orange sits at this contrast; the palette commits to
the period-correct value rather than darkening it. `border.focus` A/C/E
blue on near-white ≈ 10:1, well past the 3:1 focus threshold.

The B/D/F/M orange at the AA-large threshold is the palette's
tightest contrast. Components that route through `intent.warning`
should use the colour for backgrounds with large white inverse text
(badges, status pills, alert headlines), not for small body text
overlaid on the orange fill.

</details>

---

_Generated from `palettes/metro-light.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
