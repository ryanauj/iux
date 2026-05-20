# Frutiger Aero

Y2K / late-2000s OS optimism on the Glassmorphism engine.
`surface.base` is bright aqua-mint (`#7ee2ce`) — the closest single
color to the lime-aqua-cloud gradient wallpapers the period traded in
— and high-alpha white `raised` surfaces (`rgba(255,255,255,0.55)`)
read as cloud on water. `elevation.*` keeps Aero's wet inset rim but
recolors the bottom-edge line and outer shadow to teal
(`rgba(11,74,64,…)`) so the gloss feels lit through tropical water.
Radii are pillowed (`sm 10 / md 14 / lg 22`), `motion.easing.spring`
is bouncier than the standard glass spring
(`cubic-bezier(0.34, 1.7, 0.55, 1)`), and the typography family
reaches for actual Frutiger before degrading to system fallbacks.

**A11y:** `experimental`. Body content (`#08312a` ≈ 14:1 on the
neutral midpoint of `raised` over `base`) clears AA comfortably, and
the intent fills sit at 88–92% alpha so colored controls are
guaranteed legible. The hazard is monochromatic and small: the bright
aqua base plus high-alpha white surfaces give a uniformly *bright*
field, and any element that depends on a 1–2px stroke (icons,
spinners, focus rings) is fighting a much brighter local average than
the contract math assumes.

**Most likely to fail: `Loading`.** A spinner is a 2px ring rendered
at `content.muted` or `border.default` — `border.default` here is
`rgba(255,255,255,0.78)`, which is essentially invisible against
white `raised`. The element with the *smallest stroke area* against
the *brightest local surface* fails first, and a spinner is exactly
that. Components in this palette that draw their own indicators
should use `border.strong` (the `rgba(186,255,234,0.92)` aqua-tinted
line) or `content.secondary` for any 1–2px geometry, not the default
hairline.
