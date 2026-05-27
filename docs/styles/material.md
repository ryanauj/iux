# Material

> Google Material — paper-and-ink metaphor with the canonical paired-shadow elevation ladder, Roboto throughout, and a single indigo accent on opaque white cards.

**Engine:** `material` · **A11y:** `pass`

## Summary

Material is the post-2014 Google design-system register: stacked opaque surfaces with a real five-step elevation ladder, every `elevation.*` slot from `low` through `overlay` holding the textbook ambient + key shadow pair. `intent.primary` is a saturated `#1976d2` indigo, `content.*` is black-with-alpha (`rgba(0,0,0,0.87/0.60/0.38)`) per the spec, and Roboto is wired through `family.ui`, `family.display`, and `family.mono` (as Roboto Mono). Display weight is 300, label is uppercased with 0.02em tracking — the Material caption convention.

## Origin

Google introduced Material Design at I/O 2014 as the paper-and-ink visual language for Android Lollipop, codifying elevation as a literal z-axis with paired shadows. The system became the dominant design-system reference of the mid-to-late 2010s; this palette is the period-correct 2014–2017 register before MD2/MD3 flattened the shadow ladder.

## Signatures

- **Paired ambient + key shadow at every elevation step** — `elevation.low` is `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)` — the canonical Material recipe, two shadows where the first is wider/softer (ambient) and the second is tighter/darker (key). The pair scales through `medium` (`0 3px 6px / 0 3px 6px`), `high` (`0 10px 20px / 0 6px 6px`), and `overlay` (`0 14px 28px / 0 10px 10px`). The doubled stack is the load-bearing Material cue.
- **Indigo `#1976d2` as the single accent** — `intent.primary.bg`, `border.focus`, and `effect.focusRing.color` all resolve to `#1976d2`; `content.link` is the near-cousin `#1565c0` (the `primary.bgHover`). One saturated blue carries primary action, link, and focus — no two-tone fills, no gradients.
- **Roboto across UI, display, and mono** — `typography.family.ui` and `family.display` both resolve to `Roboto, system-ui, -apple-system, "Segoe UI", sans-serif`, and `family.mono` is `"Roboto Mono"`. Material ships a font — no system-stack fallback like flat-classic — and that font is Roboto on every role.
- **Black-with-alpha content tokens (`rgba(0,0,0,0.87 / 0.60 / 0.38)`)** — Material's spec encoded text emphasis as alpha on black rather than separate greys: 0.87 for primary, 0.60 for secondary, 0.38 for muted (disabled/placeholder only). Flat-classic uses opaque slates; Material commits to the alpha convention.
- **Uppercased label with 0.02em tracking, display weight 300** — `typography.role.label` is `{ weight: 500, tracking: 0.02em, textTransform: uppercase }` — the Material caption/button-label convention. `display` is weight 300 (light) at 3rem, the MD1 hero treatment.
- **Material standard easing (`cubic-bezier(0.4, 0, 0.2, 1)`) with a wider 250/400 base/slow band** — `motion.easing.standard` is the textbook Material curve; `motion.duration.base/slow` are `250ms/400ms` rather than the 150/250 flat-classic uses, so ripple-style press affordances and FAB transitions feel correct.

## Anti-signatures

- A single shadow per elevation step (that's flat-classic — Material doubles every step)
- System-UI or Inter typography (Material ships Roboto on every role)
- Opaque slate-grey `content.primary` (Material encodes emphasis as alpha on black)
- Translucent or alpha-blended `surface.raised` (Material is opaque paper-and-ink, not glass)
- Inset highlights on elevation (the Material shadow recipe is purely outer/below)

## Token evidence

| Path | Value | Note |
|---|---|---|
| `elevation.low.boxShadow` | `0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)` | Paired ambient + key — `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)`. The doubled stack is the canonical Material elevation recipe and the differentiator from flat-classic's single shadow. |
| `elevation.overlay.boxShadow` | `0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)` | Scales to `0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)` — the top of the Material 24-step depth model. |
| `color.intent.primary.bg` | `#1976d2` | Indigo `#1976d2` — the single Material accent, reused at `border.focus` and `effect.focusRing.color`. |
| `color.content.primary` | `rgba(0, 0, 0, 0.87)` | `rgba(0,0,0,0.87)` — alpha-on-black emphasis, the Material spec convention. |
| `typography.family.ui` | `Roboto, system-ui, -apple-system, "Segoe UI", sans-serif` | Roboto stack — Material ships its own font on every role, not the system stack. |
| `typography.role.label.textTransform` | `uppercase` | `uppercase` with 0.02em tracking — the Material label/button caption convention. |
| `motion.easing.standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | `cubic-bezier(0.4, 0, 0.2, 1)` — the canonical Material standard easing curve. |

## Often confused with

### vs [Flat / Classic](./flat-classic.md)

Flat-classic uses a single soft shadow per elevation step and the host system font stack. Material doubles every shadow (ambient + key) and ships Roboto on every role. The intent blue is also distinct: flat-classic's `#1d4ed8` vs Material's `#1976d2`.

### vs [Aero Glass](./aero-glass.md)

Aero-glass pairs an inset white-top with an inset dark-bottom rim for curved gloss on translucent panels. Material has no inset highlights at all — its elevation is purely outer drop shadows on opaque paper.

### vs [Editorial](./editorial.md)

Editorial leans on serif display type and tight tracking with quiet elevation. Material commits to sans (Roboto) on display, uppercased labels, and a deliberate paired-shadow depth ladder.

### vs [Dieter Rams / Braun](./dieter-rams.md)

Dieter Rams is "less but better" — minimal accent, restrained typography, near-zero elevation. Material spends its budget on the elevation ladder and a single saturated accent — louder by design.

## Where it thrives

- Cards and FABs — the paired-shadow ladder was designed for them
- App bars and bottom navigation — `intent.primary` saturation reads correctly at chrome scale
- Snackbars and dialogs — `elevation.overlay` is the textbook MD recipe for floating surfaces
- Uppercased button labels — `typography.role.label` already applies the tracking and case

## Where it degrades

- Dense data tables — the paired shadow on every row reads as noise
- Long-form reading — the Roboto + alpha-black combination is tuned for chrome, not body prose
- Dark-mode-only contexts — this palette is the MD1 light register; pair with a dark Material variant for dark needs

## Recall aliases

`material`, `material design`, `google material`, `md1`, `md`, `android material`

## Long-form notes

<details>
<summary>From <code>palettes/material.README.md</code></summary>

# Material

Paper-and-ink metaphor. Opaque stacked surfaces with a real elevation
ladder — `elevation.low` through `elevation.overlay` each hold a paired
ambient + key shadow in the classic Material recipe. Indigo (`#1976d2`)
is the single accent; intent backgrounds are saturated and carry white
`inverse` content. Roboto family across UI and display, light display
weight (300) per the spec; `label` is uppercased with extra tracking the
way Material captions used to be.

Motion uses Material's standard easing (`cubic-bezier(0.4, 0, 0.2, 1)`)
and a wider base/slow band (250ms / 400ms) so press affordances and
ripple-style transitions feel correct.

**A11y:** `pass`. Body text on `surface.base` is `rgba(0,0,0,0.87)` on
`#fafafa`, ≈ 14:1 — comfortably AAA. The lowest-contrast intent is
`warning` `#ef6c00` with white content, ≈ 4.8:1 (AA at large text and
graphical controls). `content.muted` at `rgba(0,0,0,0.38)` is for
disabled / placeholder only — the contract reserves that slot for
decorative use, which Material's spec also dictates.

</details>

---

_Generated from `palettes/material.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
