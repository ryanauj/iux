# Claymorphism

> Inflated 3D gumdrops — pastel violet surfaces, oversized 24-32px radii, and a triple-layer elevation recipe (inset bottom shade + inset top highlight + outer drop) that puffs every control.

**Engine:** `claymorphism` · **A11y:** `experimental`

## Summary

Claymorphism is the puffy-pillow register of the morphism family. Every `radius.*` from `sm` through `lg` is unusually large (16/24/32px) so even compact controls round into gumdrop shapes, and `elevation.*` packs three layers per slot: an inset bottom shade in violet ink, an inset top white highlight, and a soft outer drop shadow. `surface.base` is pastel violet `#f5f0ff`; the six intents are pastel candy colors (`#a78bfa`, `#86efac`, `#fcd34d`, `#fda4af`, `#7dd3fc`) paired with deep near-black contents so the bright fills stay legible. Quicksand carries every typography slot, motion uses an overshooting spring (`cubic-bezier(0.34, 1.7, 0.64, 1)`).

## Origin

A 2021 design-meme aesthetic — Michał Malewicz coined the name as a sibling to Glassmorphism and Neumorphism, riffing on the "claymation" / Pixar-inflated 3D shapes that 3D-render trends were making cheap to produce in Figma. It spread through Dribbble shots and never quite became a shipping design system — its identity lives in the triple-shadow + oversized-radius silhouette.

## Signatures

- **Triple-layer elevation: inset bottom shade + inset top highlight + outer drop** — `elevation.low` is `inset 0 -4px 0 rgba(76,29,149,0.15), inset 0 4px 0 rgba(255,255,255,0.50), 0 8px 16px rgba(76,29,149,0.18)` — three stacked shadows where the inset pair carries the inflation and the outer drop lifts the puff off the base. The recipe scales: `overlay` runs `inset 0 -10px 0 / inset 0 10px 0 / 0 32px 60px`. No other style in the showcase stacks three layers per elevation slot.
- **Oversized radii (16 / 24 / 32px across sm / md / lg)** — `radius.sm` is `16px`, `radius.md` is `24px`, `radius.lg` is `32px`. Material tops out at 8px; Flat/Classic at 8px. Claymorphism rounds even sub-button-sized controls into pillow silhouettes — the inflation only reads if the radius supports it.
- **Pastel violet surface field with violet-ink content** — `surface.base` is `#f5f0ff` (pastel violet), `surface.sunken` is `#ece4ff`, and `content.primary`/`secondary`/`muted` are violet inks (`#2e1065` / `#4c1d95` / `#7c3aed`) rather than neutral greys. The whole field reads as candy-tinted, not neutral.
- **Pastel candy intent fills paired with deep near-black contents** — `intent.success.bg` is `#86efac` (mint) with `content: #052e16` (near-black green); `warning.bg` is `#fcd34d` with `#422006`; `danger.bg` is `#fda4af` with `#4c0519`. The bright pastel fill + deep ink combination is how Claymorphism keeps AA contrast on its gumdrop intents.
- **Quicksand throughout with overshooting spring motion** — `typography.family.ui`/`display` both resolve to `"Quicksand", system-ui, ...` — a rounded-terminal humanist sans that mirrors the puffy silhouettes. `motion.easing.standard` is `cubic-bezier(0.34, 1.56, 0.64, 1)` and `spring` is `cubic-bezier(0.34, 1.7, 0.64, 1)`; the small overshoot on release reads as physical bounce.
- **3px violet focus ring offset by 4px** — `effect.focusRing` is `{ width: 3px, offset: 4px, color: #7c3aed, style: solid }` — thicker than flat-classic's 2px and pulled further from the silhouette so it survives the puffy elevation around inflated controls.

## Anti-signatures

- Tight radii (Material-style 4-8px) — defeats the gumdrop silhouette
- Single-shadow elevation — Claymorphism requires the triple-layer stack to read as inflated
- Neutral grey surface field — the pastel violet tint is load-bearing
- Saturated white-content intents (that is Material) — Claymorphism uses pastel-with-deep-ink
- A near-monochrome surface where `raised` equals `base` (that is Neumorphism)

## Token evidence

| Path | Value | Note |
|---|---|---|
| `elevation.low.boxShadow` | `inset 0 -4px 0 rgba(76, 29, 149, 0.15), inset 0 4px 0 rgba(255, 255, 255, 0.50), 0 8px 16px rgba(76, 29, 149, 0.18)` | Triple-layer recipe — `inset 0 -4px 0 rgba(76,29,149,0.15), inset 0 4px 0 rgba(255,255,255,0.50), 0 8px 16px rgba(76,29,149,0.18)`. The three-shadow stack is the load-bearing Claymorphism cue. |
| `elevation.overlay.boxShadow` | `inset 0 -10px 0 rgba(76, 29, 149, 0.22), inset 0 10px 0 rgba(255, 255, 255, 0.65), 0 32px 60px rgba(76, 29, 149, 0.36)` | Apex of the stack — `inset 0 -10px 0 / inset 0 10px 0 / 0 32px 60px rgba(76,29,149,0.36)`. Modals read as fully inflated puffs floating off the violet base. |
| `radius.lg` | `32px` | `32px` — oversized by design. Material tops at 8px; Claymorphism needs this radius for the inflation silhouette. |
| `color.surface.base` | `#f5f0ff` | Pastel violet `#f5f0ff` — not neutral. The whole field is candy-tinted. |
| `color.intent.success.bg` | `#86efac` | Mint pastel `#86efac` — paired with deep green content `#052e16` rather than white. The pastel-with-deep-ink intent pattern is the chromatic signature. |
| `typography.family.ui` | `"Quicksand", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` | Quicksand stack — a rounded-terminal humanist sans that mirrors the puffy silhouettes. |
| `motion.easing.spring` | `cubic-bezier(0.34, 1.7, 0.64, 1)` | `cubic-bezier(0.34, 1.7, 0.64, 1)` — overshoot on release reads as physical bounce on the puffy controls. |

## Often confused with

### vs [Neumorphism](./neumorphism.md)

Neumorphism uses a single tonal surface (`#e0e5ec` for `base`/`raised`/`sunken`/`overlay`) and paired inset/outer shadow in a top-left/bottom-right diagonal. Claymorphism uses distinct surfaces (pastel violet base, white raised), pastel candy intents, vertical inset highlight + inset shade, and oversized radii. Claymorphism is colourful and rounded; Neumorphism is monochrome and tonal.

### vs [Skeuomorphism](./skeuomorphism.md)

Both stack inset highlight + inset shade + outer drop, but Skeuomorphism uses warm-paper colours (`#e8dfcf` parchment), serif display (Optima), and tighter radii (6-16px) to mimic real materials. Claymorphism uses pastel violet, Quicksand, and 16-32px radii to read as cartoon-inflated rather than real-material.

### vs [Glassmorphism](./glassmorphism.md)

Glassmorphism uses translucent panels with backdrop blur and a top-only inset highlight on a neutral host. Claymorphism is fully opaque pastel surfaces with a triple-stack inset+outer recipe — no transparency, no blur.

### vs [Material](./material.md)

Material uses paired ambient+key outer drop shadows on opaque white at 4-8px radii. Claymorphism stacks three shadows per slot (two inset + one outer), uses 16-32px radii, and tints the whole field pastel violet.

## Where it thrives

- Buttons and badges — the triple-stack recipe was tuned for pill-shaped controls
- Toggle switches and chips — oversized radii read as natural pillow silhouettes
- Marketing pages and landing heroes where the cartoon-inflated quality is on-brand
- Onboarding flows — the overshoot spring on motion feels playful on press affordances

## Where it degrades

- Dense data tables — the triple-shadow on every row eats real estate and reads as noisy
- Long-form prose — Quicksand at body weight 500 on pastel-tinted surface gets fatiguing
- Calendars and date pickers — per-cell inflation makes selection states blur into hover states
- Cursor and icon glyphs — README flags reduced icon visibility on bright pastel under bright pastel

## Recall aliases

`claymorphism`, `clay`, `clay morphism`, `claymation`, `puffy 3d`

## Long-form notes

<details>
<summary>From <code>palettes/claymorphism.README.md</code></summary>

# Claymorphism

Inflated 3D gumdrops. `radius.sm` through `radius.lg` are all unusually
large (16 / 24 / 32px) so that even compact controls round into pillow
shapes. `elevation.*` packs three layers per slot — an inset bottom
shade, an inset top highlight, and an outer drop shadow — to produce
the puffy, slightly-overinflated look the engine is named for.

Pastel violet `base` (`#f5f0ff`) and white `raised` keep the surface
field bright; the six intents are pastel candy colors with deep, almost
black contents (`#1e1b4b`, `#052e16`, …) so the bright fills stay
legible.

Motion bumps to a softer spring (`cubic-bezier(0.34, 1.7, 0.64, 1)`)
because the engine reads as physical and benefits from a small overshoot
on press release.

**A11y:** `experimental`. Per-token contrast is fine — pastel intent
backgrounds with their dark contents all clear AA at body sizes
(`#86efac` + `#052e16` ≈ 15.2:1; `#a78bfa` + `#1e1b4b` ≈ 8.3:1). The
caveat the spec calls out is real, though: with bright pastel surfaces
under bright pastel controls, icon and cursor visibility drops, and the
puffy elevation can make focus rings harder to spot against the inflated
silhouettes. The 3px focus ring is mandatory.

</details>

---

_Generated from `palettes/claymorphism.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
