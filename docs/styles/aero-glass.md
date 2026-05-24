# Aero Glass

> Windows Vista/7 register on the Glassmorphism engine — wetter, bluer, with a paired inset white-top and inset dark-bottom rim that reads as curved gloss rather than flat frost.

**Engine:** `glassmorphism` · **A11y:** `experimental`

## Summary

Aero Glass is the period-correct Vista/7 register of the glassmorphism engine. The "wet" feel comes entirely from `elevation.*`: every slot above `flat` pairs an inset white highlight along the top with an inset dark line along the bottom (`inset 0 -1px 0 rgba(8,23,51, 0.18 → 0.30)`), the rim cue Vista's panels used to read as a curved gloss. `surface.base` is a saturated Vista blue (`#1e4d8b`), `surface.raised` is blue-tinted white rather than neutral, and typography is Segoe UI with `display` weight at 300 to nod to Aero's chrome titlebars.

## Origin

Windows Vista (2007) and Windows 7 (2009) shipped Aero — a desktop chrome built around translucent panels with paired highlight/shadow rims that read as curved glass. The aesthetic peaked in the late 2000s and was retired in Windows 8's flat reset. This palette is the period-correct revival on the glass engine.

## Signatures

- **Paired inset white-top + inset dark-bottom rim on elevation** — `elevation.low` is `inset 0 1px 0 rgba(255,255,255,0.50), inset 0 -1px 0 rgba(8,23,51,0.18), 0 2px 4px rgba(8,23,51,0.30)`. The *paired* rim is the load-bearing Aero cue — top highlight + bottom darkening — and it scales: `inset 0 2px 0 / 0 -2px 0` at `high`/`overlay`. Glassmorphism (this engine's neutral register) has only the top inset.
- **Saturated Vista blue `surface.base` (`#1e4d8b`)** — Not neutral indigo, not a photo — a specific Vista-chrome blue that pulls overlapping pixels toward cyan. Half the "Aero feel" is this exact host colour.
- **Blue-tinted `surface.raised` (`rgba(195,222,255, 0.22)`)** — Translucent *white-with-blue-bias*, not neutral white. Compare to Glassmorphism's `rgba(255,255,255,0.16)` — same alpha range, biased palette.
- **Segoe UI throughout with `display` weight at 300** — `typography.family.ui` is `"Segoe UI", "Segoe UI Variable", Tahoma, Verdana, sans-serif` — the shipping Vista/7 system font. `display` weight is `300` (light) to nod to Aero's thin chrome titlebar lettering. Glassmorphism uses Inter at weight 600.
- **Heavier elevation alpha (`rgba(8,23,51, 0.30 → 0.60)`)** — Aero panels cast harder. The outer shadow alpha rides from 0.30 at `low` to 0.60 at `overlay` — roughly 1.5× Glassmorphism's shadow weight at every step — to keep the wet gloss visible against the saturated host.

## Anti-signatures

- A neutral indigo or photo `surface.base` (defeats the Vista-blue cue)
- Top-only inset highlight without the matching inset dark line
- Inter, system-ui, or non-Segoe typography
- Flat sans-serif `display` weights at 500–700 (Aero's chrome was light)
- Hard offset shadows (that's Pixel-art / Neubrutalism — the Aero shadow is a blurred outer plus inset rim)

## Token evidence

| Path | Value | Note |
|---|---|---|
| `elevation.low.boxShadow` | `inset 0 1px 0 rgba(255, 255, 255, 0.50), inset 0 -1px 0 rgba(8, 23, 51, 0.18), 0 2px 4px rgba(8, 23, 51, 0.30)` | The paired inset rim — `inset 0 1px 0 white-50, inset 0 -1px 0 ink-18, 0 2px 4px ink-30`. The bottom inset is the differentiator from neutral Glassmorphism. |
| `color.surface.base` | `#1e4d8b` | Vista blue `#1e4d8b` — period-correct chrome colour. |
| `color.surface.raised` | `rgba(195, 222, 255, 0.22)` | Blue-tinted translucent white `rgba(195,222,255,0.22)`, not neutral. |
| `typography.family.ui` | `"Segoe UI", "Segoe UI Variable", Tahoma, Verdana, sans-serif` | Segoe UI stack — the Vista/7 system font. |
| `typography.role.display.weight` | `300` | Weight 300 — the thin Aero titlebar weight. |

## Often confused with

### vs [Glassmorphism](./glassmorphism.md)

Glassmorphism is the neutral post-2020 register of the same engine: neutral-white `raised`, top-only inset highlight, Inter typography, indigo (not Vista-blue) host. Aero (this palette) commits to Vista-blue everywhere and pairs the top inset with a bottom inset dark line for "curved gloss" rather than "frosted flat."

### vs [Frutiger Aero](./frutiger-aero.md)

Frutiger Aero is the broader consumer-tech aesthetic of the same era — saturated greens, glossy gradients on intents, photo-backed compositions. Aero Glass (this palette) is the specific *Windows chrome* register: Vista-blue, paired-rim glass panels, Segoe UI.

### vs [Liquid Glass (Light)](./liquid-glass-light.md)

Liquid Glass is the macOS Big Sur (2020) take on the engine — neutral-white panels on a near-neutral host. Aero is the Vista (2007) take — blue host, blue-tinted glass, paired rim.

## Where it thrives

- Chrome panels (sidebars, titlebars, popovers) — the paired rim is what they were designed for
- Buttons and segmented controls — `intent.*.bg` at 0.88 alpha keeps them legible on the Vista-blue host
- Modals and drawers — `elevation.overlay` has the strongest paired rim and reads as floating glass

## Where it degrades

- Calendars (DatePicker) — the per-cell gloss reduces effective contrast on `content.muted` cells well below AA, and the rim makes selected-vs-hovered cells hard to distinguish. README flags this as "most likely to fail."
- Dense tables — same per-row gloss problem
- Long muted-text passages — `content.muted` at 60% alpha on blue-tinted glass falls to ~3.5:1 on light hosts

## Recall aliases

`aero`, `aero glass`, `vista`, `windows vista`, `windows 7`

## Long-form notes

<details>
<summary>From <code>palettes/aero-glass.README.md</code></summary>

# Aero Glass

Windows Vista/7 register on the Glassmorphism engine. The "wet" feel
comes entirely from `elevation.*`: every slot above `flat` pairs an
inset *white* highlight along the top edge with an inset dark line
along the bottom (`inset 0 -1px 0 rgba(8,23,51,0.18 → 0.30)`), which is
the rim cue Vista panels used to read as a curved gloss rather than a
flat translucent square. `surface.base` is a saturated Vista blue
(`#1e4d8b`), `surface.raised` is blue-tinted white
(`rgba(195,222,255,0.22)`) rather than neutral white, and `borderWidth`
plus `radius` (`sm 6 / md 10 / lg 16`) carry the period-correct
beveled-edge look. Typography is Segoe UI, with `display` weight at
`300` to nod to Aero's chrome titlebars.

**A11y:** `experimental`. The Glass-engine caveat applies — translucent
`raised` is whatever shows through — but Aero compounds it. The
saturated blue `surface.base` pulls every overlapping pixel toward
cyan, and `content.muted` at 60% alpha on a blue-tinted `raised`
clears AA only when the host is dark; on a busy or light host it falls
to ≈ 3.5:1. The wet inset rim also visually consumes border space, so
`color.border.subtle` reads weaker than its alpha suggests.

**Most likely to fail: `DatePicker`.** A calendar is a grid of small
numbers (`caption`-sized), many of which are `content.muted` for
non-current-month dates. The blue tint plus the bright top-edge gloss
on each calendar cell reduce effective contrast on those muted cells
well below AA, and the cell-by-cell gloss makes the *selected* day
hard to distinguish from a hover state. Components in this palette
that need cell-level state distinction should drive the difference
through `intent.primary.bg` rather than relying on `elevation` deltas
that the gloss already saturates.

</details>

---

_Generated from `palettes/aero-glass.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
