# Bauhaus

Flat engine restricted to the school's three-primary palette: Bauhaus
red (`#e2241a`), yellow (`#f7c100`), blue (`#1c4eba`), against cream
`surface.base` (`#f5f1e8`) with ink-black borders. The intent
assignments fold the contract's six slots onto those three primaries —
`primary` / `info` / `success` all map to blue, `warning` to yellow,
`danger` to red. Like the Swiss palette, the collapse is intentional;
unlike Swiss, the survivors *are* a color set, not a single accent.

`radius.*` is forced to either `0` (every named radius, including
`pill`) or `9999px` (`full`) — no curve in between, which is the
form-language rule the movement enforced ("primary geometric shapes
only"). `pill` rounds to `full` is the one exception: a rounded
rectangle that's actually a stadium-shape is still considered a
"primary" shape, but a corner-radius of `8px` is not. `elevation.*` is
`none` at every slot except `overlay` (a 2px black ring); depth comes
from shape and color block, never from a fake light source. Easings
are all `linear` — Bauhaus's machine-aesthetic doesn't ease.

Typography is a geometric sans (Futura / Avenir Next) with uppercase
headings — the geometric letterforms that match the geometric shapes.

**A11y:** `pass`. Body text (`#0a0a0a` on `#f5f1e8`) ≈ 17:1, AAA.
`intent.primary` blue (`#1c4eba`) with white content ≈ 7.5:1 — AAA.
`intent.warning` yellow (`#f7c100`) with dark content ≈ 12:1 — AAA.
`intent.danger` red (`#e2241a`) with white content ≈ 5.5:1 — AA at
body, AAA at large. `content.muted` `#5a5a5a` on `base` ≈ 6.5:1 — AA.

**Most likely to fail: `Toggle`.** A toggle is a radius-pill shape by
convention (the thumb traverses a stadium track), but Bauhaus forbids
all curve except `radius.full`. Setting the track radius to `pill`
gets `9999px` — a full stadium — which works visually, but the *thumb*
inside that track also rounds to `9999px`, so the on/off states differ
only in the thumb's position, not in any chamfered geometry. Worse,
intent fills collapse: a "success" toggle and a "primary" toggle both
render blue. Components that need rounded geometry under Bauhaus
should commit to `radius.full` (circles / stadiums only) or fall back
to a square checkbox affordance; the in-between rounded-rectangle
toggle is the one shape this palette refuses to produce.
