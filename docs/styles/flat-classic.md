# Flat / Classic

> The reference palette — solid fills, one saturated blue accent, system fonts, opaque surfaces, and soft drop shadows for elevation.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Flat / Classic is the control surface the showcase judges every other palette against. It has no engine flourish: opaque surfaces, hairline grey borders, system-stack typography, and a 2px solid focus ring. Elevation is a soft gaussian drop shadow at low alpha — the conservative, post-iOS-7 "flat-with-just-enough-depth" default that became the lingua franca of modern web UI.

## Origin

The post-skeuomorphic flat-design movement that followed iOS 7 (2013) and Windows 8 (2012), codified by mid-2010s design systems like Google Material and IBM Carbon. This palette is the unornamented baseline — the "what if we removed every engine signal" version.

## Signatures

- **Opaque white raised surfaces over a neutral-grey sunken base** — `surface.raised` is `#ffffff` against a `#f4f5f7` page; no alpha, no gradient. The same colour family is reused for `overlay`, so cards, modals and panels all read as the same material.
- **Single saturated blue accent (`#1d4ed8`) for primary intent, links and focus** — `intent.primary.bg`, `content.link`, and `border.focus` all share one indigo-blue. Every other intent is a single solid colour with white inverse content — no gradients, no two-tone fills.
- **Soft gaussian drop shadows at low alpha** — Elevation reads as `0 1px 2px rgba(15,23,42,0.06)` at `low`, scaling smoothly through `medium`/`high`. No inset highlights, no hard offsets — this is the move that distinguishes Flat from Neubrutalism and Pixel-art.
- **System UI font stack** — `typography.family.ui` resolves to `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`. The same stack is aliased into `display`, `pixel`, and `hand` — every role renders in the host platform's native sans-serif.
- **2px solid focus ring offset by 2px** — `effect.focusRing` is `{ width: 2px, offset: 2px, color: #1d4ed8, style: solid }`. No glow, no double ring — the most conservative possible interpretation of the focus contract.

## Anti-signatures

- Translucent or alpha-blended raised surfaces
- Inset highlights or two-tone elevation shadows
- Hard offset block shadows with no blur
- Bitmap or hand-drawn typography
- Engine overlays (scanlines, paper texture, ink outlines)

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.surface.raised` | `#ffffff` | Solid `#ffffff` — the opaque default. Compare to Glassmorphism's `rgba(255,255,255,0.16)`. |
| `color.intent.primary.bg` | `#1d4ed8` | The single saturated blue accent. Also reused at `border.focus` and `content.link`. |
| `elevation.low.boxShadow` | `0 1px 2px rgba(15, 23, 42, 0.06)` | `0 1px 2px rgba(15,23,42,0.06)` — soft penumbra, no inset, no hard offset. The flat-design elevation recipe. |
| `effect.focusRing.style` | `solid` | `solid` — not `glow` (Tron) or `double` (AAA). The conservative interpretation. |
| `typography.family.ui` | `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` | System stack — palette inherits the host OS sans-serif rather than shipping a font. |

## Often confused with

### vs [Material](./material.md)

Material steps elevation more aggressively (`medium` uses dual shadows for the Material 24-step depth model) and ramps the primary blue to a Roboto-friendly value. Flat/Classic keeps elevation gentle and uses the system stack.

### vs [Wikipedia / Institutional](./wikipedia.md)

Wikipedia tightens the palette further to a serif/sans-mix on a near-paper background with no elevation at all — drops shadows entirely. Flat/Classic keeps the soft shadow rung so cards still hover.

## Where it thrives

- Standard form controls (Button, TextInput, Select) where the system font keeps platform parity
- Cards and panels — the soft shadow ramp reads cleanly without competing engine treatments
- Tables and lists where neutral borders separate rows quietly
- Modals — `surface.overlay` is the same white as `raised`, so layering reads as a single material

## Where it degrades

- Anything that wants to feel "premium" or "branded" without additional decoration — Flat/Classic is deliberately unornamented and reads as utilitarian
- Dark-mode-only content (this palette is light-only; pair with `liquid-glass-dark` or a dark register for dark needs)

## Recall aliases

`flat`, `flat classic`, `flat / classic`, `flat design`, `classic`

## Long-form notes

<details>
<summary>From <code>palettes/flat-classic.README.md</code></summary>

# Flat / Classic

The reference palette. Solid fills, one accent (saturated blue), system font
stack, opaque surfaces, soft drop shadows for elevation, and a 2px solid focus
ring. The control surface every other rung in the showcase is judged against —
when an interaction looks weird here, the interaction is wrong; when it looks
weird in another palette, the palette is what's interesting.

**A11y:** `pass`. Body text on `surface.base` reaches AA at default size
(`#0f172a` on `#ffffff` ≈ 16.5:1). All six intent backgrounds reach AA with the
white `inverse` content sitting on them.

</details>

---

_Generated from `palettes/flat-classic.description.ts` — do not edit by hand. Run `npm run gen:style-docs` to regenerate._
