# CRT / Phosphor (Amber)

The DEC VT220 / Wyse-style amber-screen variant. Same `crt-phosphor`
engine as the green palette — same scanline overlay, same phosphor
bloom, same `motion.decay = '80ms'` regime — only the single phosphor
color changes (`#ffb347` on `#0a0500`).

Shipped alongside the green palette to prove the engine generalizes
without engine code changes. The relationship is the same as the
Glassmorphism family in `FINALIZED-PALETTES.md`: one engine, multiple
palettes that vary only in their token values.

If you can swap green ↔ amber by editing only `color.*` and
`effect.glow.color`, the engine has no per-palette branching. That's
the test.

## A11y

`experimental`. Amber on near-black measures ≈ 11:1 for body text,
slightly lower than the green variant but still comfortable AA.
Caption / muted text on the same scanline-overlaid field can drop into
the 4–5:1 range; usable but not AAA.

All of the monochrome-intent caveats from the green variant apply:
`intent=danger` and `intent=primary` differ only by border alpha; rely
on iconography for state when this palette is active.

Reduced motion: same as the green variant. Decay collapses to zero,
focus-halo pulse stops, scanline overlay remains.
