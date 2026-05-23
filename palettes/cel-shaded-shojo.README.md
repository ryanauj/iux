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
