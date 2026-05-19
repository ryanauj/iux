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
