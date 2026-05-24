# Marble Royal Flat

Gallery-plinth register on the Flat engine. Carrara-marble paper field
delivered via a procedural overlay (five stacked radial gradients tiled
at 720 × 720), gold-vein accent, Trajan-feel display caps for headings,
body type kept on Cormorant for long-form reading. The third palette in
the royal register set, distinguished from Modern Royal and Scandinavian
Royal Modern by committing to a photographic surface texture where the
other two stay flat.

`surface.base` is a cool grey marble fallback (`#e8e6e3`); the marble
pattern itself is delivered at the palette root via
`effect.overlay.image` — five stacked radial gradients, three warm vein
layers (`rgba(156, 122, 43, 0.06–0.10)`) plus two bright highlight
layers (`rgba(255, 255, 255, 0.16–0.20)`), tiled at 720 × 720 with
`blend: multiply` so the brighter `surface.raised` (`#f2f0ec`) punches
through. The overlay is procedural rather than a photo asset so the
palette stays self-contained — no `public/textures/` dependency, no
licensing question.

`intent.primary.bg` is gold-vein (`#9c7a2b`) — the same gold
Scandinavian Royal Modern keeps demoted to a hairline, here promoted to
the primary accent because the marble field has the restraint baked
into the surface texture. The hover state shifts the gold one step
warmer (`#b8893a`) rather than darker, mimicking a marble vein catching
light.

`typography.family.display` is Trajan Pro with Cinzel as the open-source
fallback — architectural caps that sit on the marble like inscribed
plaques. `family.body` falls through the same display stack so body
copy renders as Cormorant Garamond (the next family in the fallback
chain after Trajan / Cinzel / Optima). `family.ui` is Inter for controls
that need to read at small sizes where caps would slow the reader.
Display, title, heading, subheading all set `textTransform: uppercase`
with tracking `0.02–0.04em` — the architectural-caps register.

`elevation.*` uses a warmer shadow tint (`rgba(60, 40, 20, 0.10)` at
`low`) so cards sit on the marble like inset plaques rather than
floating above neutral ground. The recipe shape is identical to
Flat / Classic — only the colour-temperature changes — so the elevation
system stays predictable.

The marble overlay is shared verbatim with Graffiti / Marble. The two
palettes prove the same engine carries opposite registers on the same
surface texture: one respects the marble (Trajan caps + gold-vein
accent), the other vandalises it (Permanent Marker + fluorescent
magenta + lime). If the overlay graduates from procedural to a photo
asset later, both palettes pick up the change in one place.

**A11y:** `experimental`. The marble overlay reduces contrast on
`surface.base` where the warm vein gradients are darkest — long-form
body text must sit on `surface.raised` (where the bright highlight
gradients punch through the multiply blend, restoring contrast).
`content.primary` (`#2a2520`) on `surface.raised` (`#f2f0ec`) ≈
13.8:1 — AAA. On `surface.base` it can drop to ≈ 9.5:1 in the
brightest patches and ≈ 7:1 where the vein layer is darkest — still
AAA but visibly variable, which is the documented constraint. The
README's recommendation is to wrap long-form body copy in a Card / Surface
component that sits on `raised`. `intent.primary` gold + cream inverse
≈ 4.6:1 (AA body); `intent.danger` `#8a2233` + cream inverse ≈ 8.5:1
(AAA). `border.focus` gold on cream ≈ 3.4:1 (AA focus contrast, just
— a 2 px ring at 2 px offset gives the indication perceptual weight).

The contrast caveat is what makes the palette `experimental`. The
palette ships so the showcase can demonstrate a documented constraint
honestly — body text on a textured surface is a real problem in
real-world UI, and Marble Royal Flat is the teaching case.
