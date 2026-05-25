# Risograph

Duplicator-print register on the Flat engine. Cream paper field, fluorescent
pink + electric blue duotone intents, a 4 px halftone-dot screen tiled across
the palette root via `effect.overlay.image`. The first Flat palette to use the
engine-level overlay for a *production* texture (vs Marble Royal's gallery
texture and CRT's scanlines).

`surface.base` is cream paper (`#f6efe1`); `surface.raised` is `#ffffff` (a
fresh duplicator sheet); `surface.sunken` drops to `#ece2cf`. The halftone
overlay reads as a continuous screen across the whole field; the brighter
raised surfaces darken the dots over them where they sit, so cards read as
"a fresh sheet laid over the screen" instead of "the screen stops at this
rectangle."

`intent.primary.bg` is fluorescent pink (`#e2266e`) — Riso's "Fluorescent
Pink" drum colour, pulled down two shades from the un-printable `#ff48b0`
so white inverse content clears WCAG UI contrast (≈ 4.1:1). `intent.info.bg`
is Riso "Medium Blue" (`#1755bf`); together they sit on the page as the
two-drum duotone register a real Riso GR/SF machine produces in one pass.
`intent.warning.bg` is "Yellow" pulled down to `#a36c00` so white inverse
content still clears 3:1.

The halftone overlay is the load-bearing engine move. A 4 px tiled
radial-gradient paints one ink dot per cell at `rgba(26, 24, 20, 0.18)`,
multiplied against the surface so cards punch through cleanly. The
overlay persists under `prefers-reduced-motion` (it's decoration, not
motion) and is not animated.

`elevation.*` skips soft drop shadows in favour of a hard 2-3 px offset
tinted toward the duotone pink (`rgba(226, 38, 110, 0.45)` at `low`).
Cards lift the way a misregistered second pass lifts off the first one —
diagnostic, not blurred. The hard-offset family aligns Risograph with
Memphis-80s structurally, but the colour vocabulary is entirely different.

`typography.family.display` is Space Grotesk (a contemporary geometric
grotesque); `family.ui` / `family.body` are Inter. `label` runs uppercase
at `0.10em` tracking — the Riso aesthetic puts every subhead in
widely-tracked capitals.

**A11y:** `experimental`. The halftone overlay reduces contrast on
`surface.base` measurably — body text on the base field reads ≈ 0.5:1
worse than the same text on `raised`. Long-form copy must sit on
`raised`, where contrast holds at the AA floor. Form labels and short
captions can sit on `base` because their on-screen mass is small enough
that the halftone reads as decoration, not as a contrast hit. Intent
fills clear the 3:1 UI floor — Riso fluo-pink at `#e2266e` against white
inverse content lands at ≈ 4.1:1.

## Engine cost

Zero new tokens. Uses only `effect.overlay.*` (already in the contract,
used by Mid-century modern's atomic-dot field and Marble Royal Flat's
gallery texture). Risograph is the third palette to exercise that slot.
