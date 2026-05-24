# Graffiti / Marble

> Gallery marble vandalised — Carrara-marble overlay surfaces, fluorescent magenta + lime spray-paint intents with BLACK inverse content (not white), Permanent Marker display face.

**Engine:** `flat` · **A11y:** `experimental`

## Summary

Graffiti / Marble is the deliberately confrontational palette. It reuses the procedural marble overlay Marble Royal Flat ships and pairs it with fluorescent spray-paint intents (`#ff2dad` magenta as `intent.primary`, `#c6ff00` lime as `intent.warning`) and a Permanent Marker display face. The two references — museum plinth and street tag — never blend; they collide. Ships `experimental` because the fluorescent accents only pass AA against BLACK inverse content (not white) — the palette pins `intent.primary.content` to `#0a0a0a` to survive contrast checks, which is the documented contrast-trap the palette teaches.

## Origin

Gallery marble (Greco-Roman plinths via Trajan Pro / Cinzel) collided with street graffiti (spray-paint magenta + lime, Permanent Marker / Bungee display fonts). Conceptually similar to Banksy's gallery installations or Jenny Holzer's marble truisms — the institutional register intentionally vandalised. The palette is the showcase's contrast-trap teaching example: it documents itself by being one.

## Signatures

- **Procedural marble overlay (shared with Marble Royal Flat)** — `effect.overlay.image` is the exact same five-radial-gradient marble texture Marble Royal Flat ships, tiled at 720 × 720 with `blend: multiply`. The marble is what makes the spray-paint collision read as graffiti rather than as a single saturated palette.
- **Fluorescent magenta `intent.primary.bg` (`#ff2dad`) with BLACK content (not white)** — `intent.primary.content` is `#0a0a0a` — black. The combination of fluorescent magenta + white falls to ~3.2:1 (failing AA body); magenta + black sits at ~7.5:1 (passing AAA). The palette pins black on every saturated intent (`primary`, `success`, `warning`, `danger`, `info`) to survive contrast.
- **Fluorescent lime `intent.warning.bg` (`#c6ff00`)** — The second spray-paint accent. `intent.warning` is the slot where the lime lives without competing with the magenta primary. Black content keeps it AA.
- **Permanent Marker / Bungee display family** — `typography.family.display` is `"Permanent Marker", "Bungee", "Bungee Spice", "Impact", ...` — a spray-paint webfont that carries its tagged edge variation natively. The concept doc flagged a possible new `effect.spray.*` engine slot for SVG-displacement spray; not needed here because the display font does the work.
- **Uppercase display, title, heading with tracked-out caps** — `role.display.textTransform: uppercase`, `tracking: 0.01em` — the spray-tag register. The contrast with Marble Royal Flat's tighter `0.02–0.04em` Trajan caps is intentional: graffiti looser, gallery tighter.
- **Body fallback to Inter for legibility** — The display is intentionally hard to read; `family.body` falls through to Inter so paragraphs stay legible. The split is the palette's thesis: vandal-display, legible-body.

## Anti-signatures

- White inverse content on the fluorescent intents (the saturated colours fail AA against white)
- A solid colour `surface.base` without the marble overlay (defeats the entire gallery-vs-street collision)
- A sober serif or sans display family — must be spray-paint / marker
- A second muted accent — the palette commits to fluorescent saturation
- A serif body family — must be a humanist sans for legibility contrast

## Token evidence

| Path | Value | Note |
|---|---|---|
| `effect.overlay.image` | `radial-gradient(ellipse 80% 30% at 22% 18%, rgba(156, 122, 43, 0.10) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 78% 64%, rgba(156, 122, 43, 0.08) 0%, transparent 55%), radial-gradient(ellipse 40% 50% at 50% 100%, rgba(60, 40, 20, 0.06) 0%, transparent 70%), radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.20) 0%, transparent 40%), radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.16) 0%, transparent 45%)` | The five-radial-gradient marble texture — shared with Marble Royal Flat. |
| `color.intent.primary.bg` | `#ff2dad` | Fluorescent magenta `#ff2dad`. |
| `color.intent.primary.content` | `#0a0a0a` | BLACK `#0a0a0a` (not white). The contrast pin that lets the saturated accent survive AA. |
| `color.intent.warning.bg` | `#c6ff00` | Fluorescent lime `#c6ff00` — the second spray-paint accent. |
| `typography.family.display` | `"Permanent Marker", "Bungee", "Bungee Spice", "Impact", "Anton", "Oswald", sans-serif` | Permanent Marker / Bungee — spray-paint webfont with native edge variation. |
| `color.content.inverse` | `#0a0a0a` | BLACK `#0a0a0a` — the global inverse, not white. Pinned at the content level so every intent inherits it correctly. |

## Often confused with

### vs [Marble Royal Flat](./marble-royal-flat.md)

Marble Royal Flat shares the EXACT same marble overlay but commits to gold-vein accent and Trajan-caps display — the gallery register respected. Graffiti / Marble swaps the gold for fluorescent magenta + lime and the Trajan for Permanent Marker — the gallery register vandalised. The marble is the gallery; one palette respects it, the other tags it.

### vs [80s Memphis](./memphis-80s.md)

Memphis-80s also pairs vibrant clashing colours and confetti-vocabulary borders. Memphis is on a CREAM `surface.base` with ink-black borders on every slot, and its accents are primary colours (red/yellow/blue) not fluorescents. Graffiti / Marble is on a MARBLE field with fluorescent magenta + lime and a Permanent Marker display — the confrontation is gallery-vs-street, not 80s pattern-vs-pattern.

### vs [Vaporwave](./vaporwave.md)

Vaporwave is magenta/cyan on a deep night-purple field with serif display + uppercase mono labels — dusk register. Graffiti / Marble is daytime: marble field, fluorescent magenta + lime, spray-marker display — the saturation is louder, the register confrontational rather than nostalgic.

## Where it thrives

- Hero panels and brand-statement headers — the marble + spray collision is the message
- Buttons and call-to-action badges — the fluorescent intents read loud
- Cards on `surface.raised` — the polished marble + bold tagging contrast reads as gallery installation

## Where it degrades

- Long-form articles — the spray-marker display fights legibility even with sans body
- Components that wire `onPrimary` to white (must override to use `intent.primary.content`)
- Forms — the fluorescent focus / accent colours overwhelm input states
- Photographic content — the marble field competes with images, the spray accents compete with everything else
- Anyone with photosensitivity — fluorescent accents on a textured field are visually aggressive

## Recall aliases

`graffiti marble`, `graffiti`, `marble graffiti`, `spray marble`, `tagged marble`, `gallery graffiti`

## Long-form notes

<details>
<summary>From <code>palettes/graffiti-marble.README.md</code></summary>

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

</details>

---

_Generated from `palettes/graffiti-marble.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
