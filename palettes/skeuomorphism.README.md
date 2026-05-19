# Skeuomorphism

Material mimicry — surfaces lit like real paper / leather / brushed
metal. `surface.base` is a warm parchment (`#e8dfcf`); `raised` reads
lighter, `sunken` reads darker; ink-on-paper content colors carry the
metaphor.

`elevation.*` packs the engine's tactile recipe per slot: an inset top
highlight (white at low alpha) + an inset bottom shade (warm-black at
low alpha) + a soft outer drop shadow. The result is a bevel-and-shadow
look without needing a single CSS gradient — the contract doesn't expose
gradients, so depth is carried entirely by the stacked shadow strings
the contract *does* allow in each elevation slot.

Display family is `"Optima"` / `"Lucida Bright"` / Georgia serif — the
real-material engine reads better with humanist letter shapes; UI text
stays sans for body density. Tight motion (120-320ms) keeps tactile
elements feeling like physical objects (snappy press, no bounce).

**A11y:** `experimental`. The intent backgrounds pass AA cleanly with
the warm `inverse` `#fdf6e3` content (`primary` `#2f6e4a` + `inverse`
≈ 5.4:1; `danger` `#a83232` + `inverse` ≈ 5.6:1). Body text
(`#3a2713` on `#f3ead8`) is ≈ 12:1. The caveat lives at the *cursor*
and *icon* level: warm paper plus tactile shadows can make small icons
hard to scan, especially when an icon's silhouette overlaps an inset
shadow edge.
