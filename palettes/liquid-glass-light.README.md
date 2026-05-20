# Liquid Glass (Light)

Apple WWDC25 register on the Glassmorphism engine. The differentiator
isn't a palette shift — it's restraint. `effect.backdropBlur.*` is dialed
back (`blur(4px) → blur(20px)` vs classic's `6 → 24`), `elevation.*`
drops the deep saturated outer shadows in favor of `rgba(15,23,42,0.08
→ 0.20)` lifts, and `color.border.default` carries a faint sky-cyan tint
(`rgba(186,230,253,0.60)`) so panel edges read as refractive rather than
chalked. `surface.base` is a cool neutral grey (`#e6e9f2`) — the
white-tinted `raised` panels need a non-white host to look like
material. Radii bump up to Apple's pillier scale (`sm 10 → lg 22`).

**A11y:** `experimental`. Body content over `surface.raised`
(`rgba(255,255,255,0.50)` over `#e6e9f2` → roughly `#f3f4f8`) clears AA
for `content.primary` (`#0f172a` ≈ 17:1), but `content.muted` at 48%
alpha lands near the 4.5:1 threshold and degrades fast over any
non-light host that shows through. The aggressive Glass `scrim` is
loosened to `0.24` because Liquid Glass overlays are meant to *show*
context; that loosening is the new contrast hazard.

**Most likely to fail: `Tooltip`.** It pairs the palette's smallest
text role (`caption`, `0.75rem`) with its lightest surface and
deliberately renders over arbitrary host content. Classic Glass papered
over this with high blur and a near-opaque intent fill; Liquid Glass
softens both, so a `caption` over `overlay` over a busy host can fall
below AA in ways the static token math doesn't predict. Components that
need guaranteed legibility (alerts, errors) should use `intent.*` fills,
not `surface.overlay`.
