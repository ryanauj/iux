# Neumorphism — the cautionary palette

A single near-monochrome surface (`#e0e5ec`) doing duty as `base`,
`raised`, `sunken`, and `overlay`. Depth is carried entirely by
`elevation.*`, each slot packing the canonical Soft UI shadow pair —
a bright top-left highlight (`rgba(255,255,255,0.85)`) and a darker
bottom-right shade (`rgba(163,177,198,0.60)`) — into one
`box-shadow` value. `elevation.flat` is itself an *inset* pair, which is
how depressed/active states read as recessed without a real color change.

`color.border.*` is deliberately set to the surface value: borders are
invisible by design, because the engine refuses to use them.

## Contrast failure (mandatory call-out)

**This palette CANNOT meet WCAG AA for body text or icon glyphs against
the tonal field.**

- `content.primary` `#445063` on `surface.raised` `#e0e5ec` measures
  ≈ 5.6:1 — just over AA for body text, but the perceived contrast is
  worse than the number suggests because the eye is also being asked to
  parse the surrounding shadow gradient as depth at the same time.
- `content.secondary` `#5d6b81` on the surface ≈ 4.2:1 — borderline AA;
  pairs poorly with the shadow noise.
- `content.muted` `#8c97a8` on the surface ≈ 2.4:1 — **fails AA outright**.
  Placeholders, disabled controls, and most icon glyphs land here.
- `border.subtle` `=` `border.default` `=` the surface color — invisible
  by construction. Form fields lose their boundaries; check states have
  no edge to anchor to.

This palette is shipped so the showcase can demonstrate the failure
mode concretely. The `experimental` tag is mandatory; downstream consumers
must not promote it to a production default.

**A11y:** `experimental` (documented failure mode — see above).
