# Neubrutalism

Borders do everything. `radius.*` collapses to `0`, every `elevation.*` slot is
`{ boxShadow: 'none' }`, motion crashes to snap-to-grid (40-90ms linear). Depth
comes from `borderWidth.heavy` (4px) over `color.border.strong` (near-black);
intent backgrounds are vibrant clashing fills with black content. Display type
is condensed black, uppercased.

The canonical "Neubrutalism" engine description in `tokens/00-token-contract.md`
mentions a hard-offset shadow stuffed into `elevation.low` — we deliberately do
not use that here. The session brief pinned this palette to *zero* elevation, so
this is the elevation-free variant. A future second-take could swap
`elevation.low` for `{ boxShadow: '4px 4px 0 #0a0a0a' }` without otherwise
changing the palette.

**A11y:** `pass`. All six intent backgrounds carry the near-black `#0a0a0a`
`content` color, so contrast on chips/buttons is high (≥ 9:1 across the set).
Body text on `surface.base` (`#0a0a0a` on `#fef9e7`) ≈ 18:1.
