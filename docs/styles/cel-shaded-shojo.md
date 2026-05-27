# Cel-shaded (Shojo)

> Shojo-anime register on the cel-shaded engine — blush-cream field, pink/lavender/cream pastel intents, the same 3px ink outline and hard-offset two-tone shading as the shonen sister, plus round-humanist Poppins display.

**Engine:** `cel-shaded` · **A11y:** `pass`

## Summary

Cel-shaded (Shojo) is the pastel-register sister of Cel-shaded (Shonen). The engine is identical — every surface carries a 3px ink outline (`effect.outline.color = #0a0a0a`), `elevation.*` paints hard-offset block shadows (`effect.shadowStyle = hard`), and `color.border.*` is ink across the board. What changes is the palette: `surface.base` is a warm `#fff5f9` blush wash, `intent.primary.bg` is `#ec4899` shojo-pink, `info` is lavender `#a78bfa`, and display routes to Poppins / Quicksand / Comfortaa (round humanist) with the uppercase transform dropped — shojo logo type is sentence-case rounded.

## Origin

Cel-animated shojo anime — the girls-romance register codified by Studio Pierrot, Madhouse, and Toei from the 1990s onward (Sailor Moon, Cardcaptor Sakura, Fruits Basket). The aesthetic uses the same ink-outline + two-tone-shading grammar as shonen but warms the field, swaps the primary triad for pinks/lavenders/sky, and softens the display lettering. This palette mirrors that swap on top of the shared engine.

## Signatures

- **Pink/lavender/cream pastel palette in place of the shonen orange/blue triad** — `intent.primary.bg = #ec4899` (the heroine's blush), `intent.info.bg = #a78bfa` (the dream-sequence aura), `content.link = #db2777` shojo-pink. The cel field is `#fff5f9` blush rather than `#fef6e4` cream. Same engine, different color story.
- **Same 3px ink outline as the shonen sister (`effect.outline.color = #0a0a0a`)** — The cel-shaded engine's load-bearing affordance carries identically: `effect.outline.width = 3px`, ink at every `color.border.*` slot. The pastel palette never softens the outline — the warm field plus ink line is the shojo register, the way cream plus ink is the shonen register.
- **Hard-offset block shadows on `elevation.*` (`effect.shadowStyle = hard`)** — `elevation.low = 3px 3px 0 #0a0a0a`, scaling to `8px 8px 0 #0a0a0a, 0 24px 48px rgba(76,29,95,0.30)` at `overlay`. The secondary diffuse drop at `overlay` is plum-tinted to match the shojo scrim rather than the shonen ink wash.
- **Round-humanist Poppins display, sentence-case (no uppercase transform)** — `typography.family.display` is `"Poppins", "Quicksand", "Comfortaa", "Helvetica Neue", Arial, sans-serif` at weight 800. Compared to shonen: the condensed grotesque heavy face is replaced by round humanist heavy display, AND the `textTransform: uppercase` is dropped from display roles. Shojo logo type is sentence-case rounded.
- **Lavender focus ring (`#7c3aed`) against the pink intent palette** — `effect.focusRing` is `{ width: 3px, offset: 2px, color: #7c3aed, style: solid }`. Lavender reads cleanly against pink/cream fills the way shonen-blue reads against orange — the focus indicator is one chroma step away from every intent it has to escalate over.
- **Slightly softer radius scale than shonen (`sm: 6px`, `md: 10px`, `lg: 16px`)** — Shonen sets `sm/md/lg` at `4/8/12`; shojo bumps to `6/10/16`. Cels can have gentler curves and the shojo register favors them — but the outline is still on, the shadow is still hard. The radius nudge is the only engine-non-load-bearing difference.

## Anti-signatures

- Saturated orange `#f97316` primary or sky-blue `#3b82f6` info (that is the Shonen sister)
- Soft gaussian shadows — `effect.shadowStyle` is still `hard` in shojo
- Uppercased display roles — shojo drops the transform
- Condensed grotesque display fonts like Archivo Black or Bebas Neue — shojo uses round humanist Poppins
- A transparent or zero-width outline — same cel affordance as shonen

## Token evidence

| Path | Value | Note |
|---|---|---|
| `effect.outline.color` | `#0a0a0a` | `#0a0a0a` — identical to shonen; the cel-shaded engine's load-bearing ink line. |
| `effect.outline.width` | `3px` | `3px` — identical to shonen. |
| `effect.shadowStyle` | `hard` | `hard` — `elevation.*` paints two-tone block shadows. |
| `color.intent.primary.bg` | `#ec4899` | `#ec4899` shojo-pink — replaces shonen's `#f97316` orange. |
| `color.intent.info.bg` | `#a78bfa` | `#a78bfa` lavender — the dream-sequence aura, replaces shonen sky-blue. |
| `color.surface.base` | `#fff5f9` | `#fff5f9` blush wash — replaces shonen cream `#fef6e4`. |
| `typography.family.display` | `"Poppins", "Quicksand", "Comfortaa", "Helvetica Neue", Arial, sans-serif` | Poppins / Quicksand / Comfortaa stack — round humanist, weight 800, sentence-case. |

## Often confused with

### vs [Cel-shaded (Shonen)](./cel-shaded-shonen.md)

Same engine, different register. Shonen runs orange `#f97316` / blue `#3b82f6` / cream `#fef6e4` with Archivo Black uppercased; Shojo (this palette) runs pink `#ec4899` / lavender `#a78bfa` / blush `#fff5f9` with Poppins sentence-case. Engine tokens (`effect.outline.*`, `effect.shadowStyle = hard`, hard-offset elevations) are identical — the brief is to prove the engine generalizes the same way the CRT pair (green ↔ amber) does.

### vs [80s Memphis](./memphis-80s.md)

Memphis-80s also uses hard-offset block shadows and ink-black borders, but every intent is a different SATURATED primary (hot pink, cyan, yellow, tomato, neon green) and decoration is squiggle/confetti motifs from the engine. Cel-shaded-shojo stays pastel and uses `effect.outline.*` to paint a literal cel halo on every control.

### vs [Risograph](./risograph.md)

Risograph shares the pastel + cream feel, but it paints misregistration offsets, paper-grain texture, and limited-ink overlays via its own engine signals. Cel-shaded-shojo paints a single crisp ink outline and a single hard offset shadow per surface — no grain, no misregistration, no overprint.

## Where it thrives

- Cards, Modals, Drawers, Toasts — same canonical surfaces as the shonen sister
- Buttons, Toggles, Checkboxes — outline reads as a precise click target
- Tabs / Segmented / Pagination — series-of-options controls read as a cel-strip
- EmptyState / Tooltip — Poppins at display size reads as a friendly shojo title card

## Where it degrades

- Tables with dense rows — same row-density problem as the shonen sister
- DiffView with character-level highlight — outlines overlap with chunk highlights
- BezierEditor / SpatialCanvas — sub-pixel positioning fights the hard ink edge

## Recall aliases

`cel-shaded shojo`, `cel shaded shojo`, `shojo`, `shoujo`, `cel-shaded`, `cel shaded`, `anime`, `manga`

## Long-form notes

<details>
<summary>From <code>palettes/cel-shaded-shojo.README.md</code></summary>

# Cel-shaded (Shojo)

Pink / lavender / cream register, the classic shojo anime color
palette. Same engine as the shonen variant: flat fills bounded by hard
ink outlines, two-tone block shadows where shading exists, weight-
contrasted typography. Only the palette differs — `color.*` swaps the
shonen orange / blue triad for a pink / lavender / cream / pastel-green
set, and the display family softens from condensed grotesque to round
humanist.

Anchored on the new `cel-shaded` engine. See
`palettes/cel-shaded-shonen.README.md` for the full engine teaching
note (ink-outline-as-affordance, two-tone shading via `elevation.*`,
counter-intuitive a11y argument, thrives/degrades list). This README
focuses on the differences between the two variants.

## Differences from the Shonen variant

- **Surface field.** `surface.base = #fff5f9` (cream-pink wash) instead
  of `#fef6e4` (cream paper). The shojo register favors a warm
  blush-tinted field over the orange triad's plain cream.
- **Primary intent.** `intent.primary.bg = #ec4899` (pink-500) instead
  of `#f97316` (orange-500). The protagonist's blush replaces the
  protagonist's chakra accent.
- **Focus / link accents.** Lavender (`#7c3aed`) replaces shonen blue
  (`#1d4ed8`) as the focus ring. Pink (`#db2777`) replaces orange
  (`#ea580c`) as the link color.
- **Info intent.** Lavender (`#a78bfa`) replaces sky blue. The
  dream-sequence aura of shojo register.
- **Display family.** Poppins / Quicksand / Comfortaa (round humanist)
  replaces Archivo Black (condensed grotesque). The shojo logo type
  is rounded and friendly; the shonen logo type is sharp and heavy.
- **Display roles drop the uppercase transform.** Shojo logos are
  sentence-case; the cel-shaded engine doesn't depend on uppercased
  display to feel right.
- **Radius scale is slightly softer.** `radius.sm = 6px`, `md = 10px`,
  `lg = 16px` vs the shonen `4 / 8 / 12`. Cels can have gentler
  curves; the shojo register favors them.

Everything else is shared: ink outline (`#0a0a0a` at `3px`), hard-
offset block shadow on `elevation.*`, the same `motion.*` snap-fast
shape, the same `borderWidth.*` ladder, the same `space.*` step.

## A11y

`pass`. Body text contrast on the cream-pink base clears AAA at
default sizes. Intent fills are constrained by the pastel-saturation
palette:

- `intent.primary.bg` pink (`#ec4899`) + cream content ≈ 4.6:1 — AA.
- `intent.success.bg` green (`#4ade80`) + black content ≈ 9.5:1 — AAA.
- `intent.warning.bg` butter (`#fcd34d`) + black content ≈ 12:1 — AAA.
- `intent.danger.bg` rose (`#f43f5e`) + cream content ≈ 4.5:1 — AA.
- `intent.info.bg` lavender (`#a78bfa`) + black content ≈ 7:1 — AAA.
- `intent.neutral.bg` blush + black content ≈ 14:1 — AAA.

Focus ring is lavender at 3px against the pink / cream intent palette
so focus is always visible regardless of which fill the component
carries.

## What thrives vs degrades

Identical to the shonen variant — the engine is what determines the
thrive/degrade list, not the palette. See
`palettes/cel-shaded-shonen.README.md` for the full list.

## `prefers-reduced-motion`

Handled identically to shonen — same engine-level reduced-motion
block, same speed-line motif behavior, same instant state transitions
for users with reduced-motion preferences.

</details>

---

_Generated from `palettes/cel-shaded-shojo.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
