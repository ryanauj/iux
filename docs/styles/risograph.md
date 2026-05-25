# Risograph

> Duplicator-print register — cream paper field, fluorescent-pink + electric-blue duotone intents, a 4 px halftone-dot screen tiled across the palette root.

**Engine:** `flat` · **A11y:** `experimental`

## Summary

Risograph is the "two-drum duotone print" register on the Flat engine. Cream paper fills `surface.base`; Riso fluorescent pink (`#e2266e`) and Medium Blue (`#1755bf`) carry the two load-bearing intents (`primary` and `info`); `effect.overlay.image` paints a 4 px halftone-dot grid across the whole field, multiplied against surfaces so cards punch through cleanly. Elevation skips soft drop shadows in favour of hard 2-3 px offsets tinted toward the duotone pink — cards lift the way a misregistered second pass lifts off the first one.

## Origin

The Riso GR / SF series duplicators (Riso Kagaku, 1980s–present) — drum-based screen-print machines used by small print shops, zine makers, and design schools. Each pass lays down one ink colour from a master stencil; multi-colour Riso prints register the drums one at a time, so misregistration is expected and the halftone dot screen is visible. The palette pulls the colour vocabulary and the dot screen directly from the process.

## Signatures

- **4 px halftone-dot screen tiled across the palette root** — `effect.overlay.image` paints a radial-gradient dot per 4 px cell at `rgba(26, 24, 20, 0.18)` with `blend: multiply`. The third palette to use `effect.overlay.*` (after Mid-century-modern's atomic-dot field and Marble Royal Flat's gallery texture), but the first to use it as a print-process screen rather than a pattern.
- **Fluorescent pink + electric blue duotone intents** — `intent.primary.bg` is Riso Fluorescent Pink (`#e2266e`); `intent.info.bg` is Riso Medium Blue (`#1755bf`). Together they sit on the page as the two-drum duotone register a real Riso machine produces in one pass.
- **Hard-offset elevation tinted toward the duotone pink** — `elevation.low` is `2px 2px 0 rgba(226, 38, 110, 0.45)`; `medium` and `high` deepen the offset and add a small drop. Cards lift the way a misregistered second print pass lifts off the first — the same hard-offset family as Memphis-80s but with the colour pulled into the shadow.
- **Space Grotesk display + uppercase-tracked label** — `typography.family.display` is Space Grotesk; `label` runs `uppercase` at `0.10em` tracking. The poster-feel typography matches the Riso aesthetic's tendency toward zine / event-poster compositions.

## Anti-signatures

- Soft gaussian drop shadows in `elevation.*` (the hard offset is the engine cue)
- No halftone overlay (the dot screen is the load-bearing print-process cue)
- A third saturated chromatic intent competing with the pink + blue duotone
- Pure-white `surface.base` (Riso prints on coloured stock, not bright white)

## Token evidence

| Path | Value | Note |
|---|---|---|
| `effect.overlay.image` | `radial-gradient(circle at 50% 50%, rgba(26, 24, 20, 0.18) 0.6px, transparent 1.1px)` | The 4 px halftone-dot grid tiled across the palette root. |
| `effect.overlay.size` | `4px 4px` | `4px 4px` — the dot pitch matching a real Riso screen at print resolution. |
| `color.intent.primary.bg` | `#e2266e` | Fluorescent pink `#e2266e` — Riso's drum colour, pulled down two shades so white inverse content clears 3:1. |
| `color.intent.info.bg` | `#1755bf` | Riso Medium Blue `#1755bf` — the second-drum colour completing the duotone. |
| `elevation.low.boxShadow` | `2px 2px 0 rgba(226, 38, 110, 0.45)` | `2px 2px 0 rgba(226, 38, 110, 0.45)` — hard offset tinted toward the duotone pink. |

## Often confused with

### vs [80s Memphis](./memphis-80s.md)

Memphis-80s also uses hard-offset elevation and saturated intents, but the colour vocabulary is primary-school red / yellow / blue with black ink-line borders. Risograph uses two specific Riso drum colours (fluorescent pink + Medium Blue) and adds the halftone-dot overlay that Memphis never had — the print-process cue is the load-bearing differentiator.

### vs [Mid-century modern](./mid-century-modern.md)

Both palettes use `effect.overlay.image` for a tiled pattern, but Mid-century-modern paints a sparse atomic-age dot field as decoration; Risograph paints a continuous 4 px halftone-dot screen as a print-process cue. Mid-century also has soft drop shadows and a muted walnut + teal accent set; Risograph has hard-offset shadows and saturated Riso drum colours.

### vs [Graffiti / Marble](./graffiti-marble.md)

Both palettes are `experimental` because of contrast caveats on the overlay, but Graffiti / Marble overlays a Carrara-marble texture (gallery field) with fluorescent magenta + lime intents that pass AA only against BLACK inverse content. Risograph overlays a halftone-dot screen on cream paper and ships intent fills that pass AA against WHITE inverse content — the contrast traps are opposite.

## Where it thrives

- Zine layouts, event posters, and editorial covers — the duotone + halftone reads as print-shop register
- Bold display headlines in Space Grotesk paired with short body copy on `surface.raised`
- Hard-offset button + card compositions that lean into the misregistration aesthetic

## Where it degrades

- Long-form body copy on `surface.base` (the halftone overlay reduces contrast measurably — copy must sit on `raised`)
- Photographic content (the halftone screen multiplies against image pixels and visibly degrades photos)

## Recall aliases

`risograph`, `riso`, `duplicator`, `duotone print`, `halftone`

## Long-form notes

<details>
<summary>From <code>palettes/risograph.README.md</code></summary>

# Risograph

Duplicator-print register on the Flat engine. Cream paper field, fluorescent
pink + electric blue duotone intents, a 4 px halftone-dot screen tiled across
the palette root via `effect.overlay.image`. The first Flat palette to use the
engine-level overlay for a *production* texture (vs Marble Royal's gallery
texture and CRT's scanlines).

`surface.base` is cream paper (`#f6efe1`); `surface.raised` is `#ffffff` (a
fresh duplicator sheet); `surface.sunken` drops to `#ece2cf`. The halftone
overlay reads as a continuous screen across the whole field; the brighter
raised surfaces darken the dots over them where they sit, so cards read as
"a fresh sheet laid over the screen" instead of "the screen stops at this
rectangle."

`intent.primary.bg` is fluorescent pink (`#e2266e`) — Riso's "Fluorescent
Pink" drum colour, pulled down two shades from the un-printable `#ff48b0`
so white inverse content clears WCAG UI contrast (≈ 4.1:1). `intent.info.bg`
is Riso "Medium Blue" (`#1755bf`); together they sit on the page as the
two-drum duotone register a real Riso GR/SF machine produces in one pass.
`intent.warning.bg` is "Yellow" pulled down to `#a36c00` so white inverse
content still clears 3:1.

The halftone overlay is the load-bearing engine move. A 4 px tiled
radial-gradient paints one ink dot per cell at `rgba(26, 24, 20, 0.18)`,
multiplied against the surface so cards punch through cleanly. The
overlay persists under `prefers-reduced-motion` (it's decoration, not
motion) and is not animated.

`elevation.*` skips soft drop shadows in favour of a hard 2-3 px offset
tinted toward the duotone pink (`rgba(226, 38, 110, 0.45)` at `low`).
Cards lift the way a misregistered second pass lifts off the first one —
diagnostic, not blurred. The hard-offset family aligns Risograph with
Memphis-80s structurally, but the colour vocabulary is entirely different.

`typography.family.display` is Space Grotesk (a contemporary geometric
grotesque); `family.ui` / `family.body` are Inter. `label` runs uppercase
at `0.10em` tracking — the Riso aesthetic puts every subhead in
widely-tracked capitals.

**A11y:** `experimental`. The halftone overlay reduces contrast on
`surface.base` measurably — body text on the base field reads ≈ 0.5:1
worse than the same text on `raised`. Long-form copy must sit on
`raised`, where contrast holds at the AA floor. Form labels and short
captions can sit on `base` because their on-screen mass is small enough
that the halftone reads as decoration, not as a contrast hit. Intent
fills clear the 3:1 UI floor — Riso fluo-pink at `#e2266e` against white
inverse content lands at ≈ 4.1:1.

## Engine cost

Zero new tokens. Uses only `effect.overlay.*` (already in the contract,
used by Mid-century modern's atomic-dot field and Marble Royal Flat's
gallery texture). Risograph is the third palette to exercise that slot.

</details>

---

_Generated from `palettes/risograph.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
