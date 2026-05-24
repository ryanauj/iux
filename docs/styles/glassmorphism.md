# Glassmorphism

> Translucent low-alpha panels with a backdrop blur, sitting over a saturated host background, edged with hairline-white frosted borders.

**Engine:** `glassmorphism` · **A11y:** `experimental`

## Summary

Glassmorphism is defined by *alpha plus blur*. Surfaces are `rgba(255,255,255, 0.08–0.22)` rather than opaque, `effect.backdropBlur` is non-zero so what's behind the panel is visibly frosted, and borders are hairline whites that read as the rim of frosted glass. Elevation packs an inset white highlight inside an outer soft shadow: the inset reads as light catching the top of the glass, the outer reads as the glass casting on what's below.

## Origin

Popularised by macOS Big Sur (2020) and a wave of "glass UI" Dribbble explorations in 2020–2021. Inherits its DNA from earlier transparency systems (Vista Aero, iOS 7's control center) but distinct in committing fully to *frost* — heavy blur, low alpha, neutral white tints — rather than gloss.

## Signatures

- **Low-alpha white `surface.raised` (≈ 0.08–0.22)** — `surface.raised` is `rgba(255,255,255,0.16)` here, with `sunken`/`overlay` stepping the alpha. The translucency is the engine's defining choice — no opaque white panels.
- **Non-zero `effect.backdropBlur` at every step** — `backdropBlur.sm` is `blur(6px)`, scaling to `blur(24px)` at `lg`. CSS `backdrop-filter` is mandatory; without it the engine degrades to flat translucent rectangles and loses its identity.
- **Saturated tone for `surface.base`** — The page is a saturated indigo (`#3b3a8e`) so the alpha math has something to bite into. Palettes don't normally own page chrome, but glass without a coloured host is invisible.
- **Hairline-white borders for the frosted rim** — `color.border.*` is `rgba(255,255,255, 0.12 / 0.24 / 0.40)`. The rim is what tells the eye where the glass ends — without it, alpha surfaces vanish into the background.
- **Elevation packs an inset white highlight inside an outer soft shadow** — `elevation.low` is `inset 0 1px 0 rgba(255,255,255,0.16), 0 2px 8px rgba(15,23,42,0.18)`. The inset is the "wet top edge" cue; the outer is the cast shadow. Both are required.
- **Mandatory `surface.scrim` under any overlay** — `scrim` is `rgba(15,23,42,0.40)` — overlays *must* paint it, because the engine cannot guarantee what shows through `surface.overlay` otherwise.

## Anti-signatures

- Opaque white or grey raised surfaces
- `backdropBlur` set to `none` (defeats the engine)
- Neutral grey page background (no host saturation = invisible glass)
- Hard offset block shadows or no shadow at all
- Bitmap, hand-drawn, or serif display typography

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.surface.raised` | `rgba(255, 255, 255, 0.16)` | Low-alpha white. Compare to Flat/Classic's opaque `#ffffff`. |
| `effect.backdropBlur.md` | `blur(14px)` | Non-zero blur — without `backdrop-filter`, glass becomes flat translucent. |
| `color.surface.base` | `#3b3a8e` | Saturated indigo host — the alpha needs colour to be visible. |
| `elevation.low.boxShadow` | `inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 2px 8px rgba(15, 23, 42, 0.18)` | Paired inset highlight + outer soft shadow. The recipe is the engine. |
| `color.surface.scrim` | `rgba(15, 23, 42, 0.40)` | Mandatory under overlays — `surface.overlay` can't guarantee contrast on its own. |

## Often confused with

### vs [Aero Glass](./aero-glass.md)

Aero Glass is the Windows Vista/7 register of the same engine — wetter and bluer. Elevation pairs an inset white highlight with an *inset dark line along the bottom*, the rim cue that read as curved gloss in Vista. Glassmorphism (this palette) has only the top inset and stays neutral-white. `surface.base` here is indigo; Aero's is a saturated Vista blue (`#1e4d8b`).

### vs [Liquid Glass (Light)](./liquid-glass-light.md)

Liquid Glass tunes alpha and blur for a near-neutral light host (the macOS Big Sur target). Glassmorphism (this palette) commits to a saturated indigo host — same engine, more dramatic glass.

### vs [Frutiger Aero](./frutiger-aero.md)

Frutiger Aero is the mid-2000s consumer-tech register — more saturated greens/cyans, glossy gradients on intents, often paired with photo backdrops. Glassmorphism is the post-2020 minimalist version: neutral whites, even blur, no gradients on intents.

## Where it thrives

- Modals, drawers, popovers — overlay surfaces that benefit from showing context through them
- Sidebars over content (the blur becomes a depth signal)
- Cards over photo or saturated backgrounds
- Hero sections where the host can be controlled

## Where it degrades

- Dense tables — alpha on every row defeats readability
- Long-form prose — `content.muted` at 0.56 alpha on a translucent panel falls below AA against arbitrary hosts
- Pages with no host control (third-party embeds) — without a saturated background, glass disappears

## Recall aliases

`glass`, `glassmorphism`, `glassmorphic`, `frosted glass`

## Long-form notes

<details>
<summary>From <code>palettes/glassmorphism.README.md</code></summary>

# Glassmorphism

Translucent panels over a saturated host background. `color.surface.raised`
and friends are `rgba(255,255,255, …)` with low alpha; `effect.backdropBlur.*`
is non-zero (`blur(6px) → blur(24px)`); borders are hairline whites for the
frosted edge. `color.surface.base` is a saturated indigo
(`#3b3a8e`) — palettes don't normally own page chrome, but giving `base` a
specific value documents the host the alpha math assumes.

`elevation.*` packs an inset white highlight plus a soft outer shadow,
which is the engine's depth recipe: the inset reads as light catching the
top of the glass, the outer reads as the glass casting on what's below.

**A11y:** `experimental`. Body content (`#f8fafc` on the saturated `base`)
clears AA at ≈ 12:1, but the moment a translucent `raised` surface is
placed in front of arbitrary content the contrast becomes whatever shows
through. `color.surface.scrim` is `rgba(15,23,42,0.40)` and is mandatory
under overlays. Intent backgrounds compensate by going to near-opaque
(`0.92` alpha) so they remain reliably legible regardless of host.

</details>

---

_Generated from `palettes/glassmorphism.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
