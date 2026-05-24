# Graffiti / Marble

The deliberately confrontational palette. Carrara-marble surfaces under
fluorescent spray-paint accents (`#ff2dad` magenta as `intent.primary`,
`#c6ff00` lime as `intent.warning`) and a Permanent Marker display
face. The two references — museum plinth and street tag — never blend;
they collide. The marble overlay is shared verbatim with Marble Royal
Flat: same procedural texture, opposite register. Marble Royal Flat
respects the marble (Trajan caps, gold-vein accent); Graffiti / Marble
vandalises it.

`surface.base` is the cool grey marble fallback (`#e8e6e3`); the marble
pattern is delivered at the palette root via `effect.overlay.image` —
the same five-radial-gradient procedural texture Marble Royal Flat
ships, tiled at 720 × 720 with `blend: multiply`. `surface.raised`
brightens to `#f2f0ec` so cards punch through the marble.
`surface.overlay` is `#f5f3ef` — a touch brighter than `raised` — so
modals lift clearly above the textured field.

`intent.primary.bg` is fluorescent magenta (`#ff2dad`) with
**`intent.primary.content: #0a0a0a`** (BLACK, not white). This is the
load-bearing a11y move: magenta + white falls to ≈ 3.2:1 (failing AA
body); magenta + black sits at ≈ 7.5:1 (AAA). The palette pins black
inverse content on every saturated intent — `primary`, `success`,
`warning`, `danger`, `info` — to survive contrast. `color.content.inverse`
is also pinned to `#0a0a0a` so any component that reads the global
inverse picks up the same black.

`intent.warning.bg` is fluorescent lime (`#c6ff00`) — the second
spray-paint accent. The two fluorescents (magenta + lime) carry the
palette's confrontational message; the remaining intents
(`success` saturated forest green, `danger` graffiti red,
`info` saturated cyan) keep the same fluorescent saturation level
with black content throughout.

`typography.family.display` is `"Permanent Marker", "Bungee",
"Bungee Spice", "Impact", "Anton", "Oswald", sans-serif` — a
spray-paint webfont with native edge variation. The concept doc flagged
a possible new `effect.spray.*` engine slot (analogous to Sketch's
`effect.strokeVariance`) for SVG-displacement spray on any display text;
not needed here because the display font carries its own edge. If a
future palette wants spray-paint on a sober font, the slot can be added
then.

`family.body` falls through to Inter for legibility — the contrast
between the vandal-display and the legible-body is the palette's
thesis. `family.hand` also routes through the Permanent Marker chain so
sketch / annotation roles pick up the tagged register. Display, title,
and heading all use `textTransform: uppercase` with `tracking: 0.01em`
— looser than Marble Royal Flat's `0.02–0.04em` Trajan caps; the looser
tracking is the spray-tag register against the gallery register.

`elevation.*` keeps the Flat / Classic soft drop shadow recipe with a
warmer tint matching Marble Royal Flat (`rgba(60, 40, 20, 0.12)` at
`low`), so cards sit on the marble like vandalised plaques. The shape
is identical to Flat / Classic — only the colour-temperature changes —
so elevation stays predictable across the showcase.

**A11y:** `experimental`. The fluorescent accents only pass AA against
BLACK inverse content (not white). The palette pins black content on
every saturated intent to survive contrast, and pins
`color.content.inverse` globally so any component reading
`--color-content-inverse` picks up the black. If a component hard-codes
white inverse anywhere, it will fail AA on the magenta / lime fills —
the mismatch is the teaching example that gives the palette its
documented contrast-trap status.

Specific ratios: `content.primary` `#0a0a0a` on `surface.raised`
`#f2f0ec` ≈ 17:1 — AAA. `intent.primary` magenta `#ff2dad` + black
inverse ≈ 7.5:1 (AAA). `intent.warning` lime `#c6ff00` + black ≈
17:1 (AAA — lime + black is the highest-contrast pairing in the
palette). `intent.success` `#1fa84a` + black ≈ 6.8:1 (AAA).
`intent.danger` `#ff1f3a` + black ≈ 5.4:1 (AAA large, AA body).
`intent.info` `#2dafff` + black ≈ 7.1:1 (AAA). `border.focus` magenta
on marble base ≈ 3.4:1 (AA focus contrast, just — the 3 px ring at
2 px offset gives perceptual weight where the colour contrast is at
the threshold).

The palette is `experimental` because the contrast model only holds
under the documented pinning. Anyone using this palette in real
production needs to verify that consuming components honour
`intent.*.content` rather than hard-coding white inverse — Card, Button,
Badge, Toast all read `intent.*.content` correctly today; custom
components that wire `color: white` directly will break.

Photosensitivity: the fluorescent accents on a textured field are
visually aggressive. The palette is not appropriate for accessibility
contexts that flag high-saturation or pattern-on-pattern displays.
Document the constraint in any UI that ships it as a default; consider
offering Marble Royal Flat as the same-engine alternative.
