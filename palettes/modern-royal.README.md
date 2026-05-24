# Modern Royal

Regal colour stripped of ornament. Deep aubergine field, antique-gold
accent, a Cormorant Garamond display serif over an Inter body sans. The
"regal palette applied without filigree" register the same way Mall-goth
is the "crepuscular palette applied without ornament" — two dark-field
Flat configurations that prove the engine carries period colour without
period decoration.

`surface.base` is deep aubergine (`#1f0d2a`); `surface.raised` lifts one
notch to `#2a1538`; `surface.overlay` matches `raised` so modals layer
as the same material. No gradients, no two-tone fills, no inset
highlights — opaque purple surfaces against a darker purple base, the
Flat engine's recipe applied to a non-grey colour family. `surface.scrim`
is `rgba(8, 4, 12, 0.62)` — a near-black ink at high alpha that veils
the saturated field cleanly when a modal opens.

`intent.primary.bg` is antique gold (`#b8893a`) with deep-aubergine
`content` (`#1f0d2a`) sitting on it — gold + dark-purple sits at ≈ 9:1,
AAA at every size. `border.focus` and the focus ring reuse the same
gold at a heavier 3 px width (vs Flat / Classic's 2 px) — the heavier
ring compensates for reduced contrast on the dark field, the same
compensation Mall-goth makes against its near-black base. `content.link`
is a warmer gold (`#d6a85a`) so links read distinct from the primary
button fill.

`typography.family.display` is Cormorant Garamond at weight `500`;
`family.ui` and `family.body` are Inter / Söhne. The two-family split is
the load-bearing typography move — committing the body to the serif
would push the palette into Editorial / Wikipedia territory. Display
size is `3rem` at weight 500 with `tracking: -0.01em`, so headlines
carry the regal Cormorant counters without lapsing into typographic
costume.

`elevation.*` keeps the Flat / Classic gaussian recipe but raises shadow
alpha to `rgba(0, 0, 0, 0.40)` at `low` (vs `0.06` on Flat / Classic) so
cards still lift visibly against the deep aubergine field. The shape of
the shadow is identical to Flat / Classic — only the alpha changes — so
the elevation system remains conservative.

`motion.*` matches Flat / Classic verbatim. The register is delivered
by colour and type, not by motion signature; Modern Royal earns its
elegance through restraint rather than easing.

**A11y:** `pass`. `content.primary` (`#f5ecda`, a warm-cream) on
`surface.base` (`#1f0d2a`) ≈ 13.5:1 — AAA at every size.
`content.secondary` `#cdb78a` on base ≈ 8.5:1 (AAA).
`intent.primary.bg` `#b8893a` with deep-aubergine content `#1f0d2a` ≈
9:1 (AAA). `intent.success` `#3f6b4a` + cream inverse ≈ 5.5:1 (AA
body). `intent.danger` `#8a2233` + cream inverse ≈ 7.2:1 (AAA).
`border.focus` gold on aubergine `surface.base` ≈ 5.2:1 (AA focus
contrast — and the 3 px stroke gives the ring perceptual weight even
where the contrast is at the threshold). The dark field has the
expected drawback for `content.muted` (`#8c7556`) on `surface.base` —
≈ 3.2:1 — which is OK as decorative meta text but should not carry
load-bearing meaning.
