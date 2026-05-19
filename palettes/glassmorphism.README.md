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
