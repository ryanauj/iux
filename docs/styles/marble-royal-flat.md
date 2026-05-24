# Marble Royal Flat

> Gallery-plinth register on the Flat engine — Carrara-marble paper field via a procedural overlay, gold-vein accent, Trajan-feel display caps for headings.

**Engine:** `flat` · **A11y:** `experimental`

## Summary

Marble Royal Flat is the third palette in the royal register set, distinguished by a photographic marble texture painted at the palette root via `effect.overlay.image`. The overlay is procedural (five stacked radial gradients tiled at 720 × 720) rather than a photo asset, so the palette stays self-contained. `intent.primary.bg` is gold-vein (`#9c7a2b`); the display family is Trajan Pro / Cinzel — architectural caps that sit on the marble like inscribed plaques. `elevation.*` uses a warmer shadow tint so cards read as inset plaques rather than floating above neutral ground. Ships `experimental` because body text on `surface.base` (the marble field) loses contrast where the vein layer is darkest — long-form body must sit on `raised`.

## Origin

Greco-Roman and Italian Renaissance gallery aesthetics applied to a contemporary Flat engine. Trajan Pro itself was a digital revival (Adobe, 1989) of the Roman square capitals on the Trajan column (113 CE); Cinzel is the Google Fonts open-source cousin. The marble overlay is the contemporary equivalent of a marble plinth on a museum pedestal — the palette commits to the gallery register the way Mid-century modern commits to the Eames catalogue.

## Signatures

- **Procedural marble overlay via `effect.overlay.image`** — `effect.overlay.image` paints five stacked radial gradients tiled at 720 × 720: three warm vein layers (`rgba(156,122,43, 0.06–0.10)`) plus two bright highlight layers (`rgba(255,255,255, 0.16–0.20)`). `blend: multiply` lets the brighter `surface.raised` punch through. This is the same overlay Graffiti / Marble reuses.
- **Gold-vein `intent.primary.bg` (`#9c7a2b`) — hover warms to `#b8893a`** — The hover state shifts gold one step warmer rather than darker, mimicking a marble vein catching light. The palette is the only one in the royal trio that promotes gold to the primary accent.
- **Trajan / Cinzel display caps on display + title + heading roles** — `typography.family.display` is Trajan Pro with Cinzel as the open-source fallback. Display, title, heading, subheading all set `textTransform: uppercase` and tracking 0.02–0.04em — the architectural-caps register.
- **Body text routed through `display` family (Cormorant)** — Unusually, `role.body` reads `family: display` — but the Trajan family stack falls through to Cormorant Garamond before any sans, so body copy renders as Cormorant. This is the gallery-register convention: caps for headings, italic-friendly serif for paragraphs.
- **Warmer-tinted soft elevation shadows** — `elevation.low` is `0 1px 2px rgba(60, 40, 20, 0.10)` — the same penumbra recipe as Flat / Classic but with a warm brown tint rather than slate-blue. Cards sit on the marble like inset plaques.

## Anti-signatures

- A flat solid-colour `surface.base` without the marble overlay (defeats the entire register)
- Sans-serif display type — Trajan / Cinzel caps are load-bearing
- Lowercase or sentence-case display headings (must be uppercase)
- Cool blue-grey elevation shadows (the tint must read warm against marble)
- A second saturated accent competing with the gold-vein primary

## Token evidence

| Path | Value | Note |
|---|---|---|
| `effect.overlay.image` | `radial-gradient(ellipse 80% 30% at 22% 18%, rgba(156, 122, 43, 0.10) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 78% 64%, rgba(156, 122, 43, 0.08) 0%, transparent 55%), radial-gradient(ellipse 40% 50% at 50% 100%, rgba(60, 40, 20, 0.06) 0%, transparent 70%), radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.20) 0%, transparent 40%), radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.16) 0%, transparent 45%)` | The five-radial-gradient marble texture — the load-bearing visual. Shared with Graffiti / Marble. |
| `effect.overlay.blend` | `multiply` | `multiply` — lets the brighter `surface.raised` punch through the marble pattern. |
| `color.intent.primary.bg` | `#9c7a2b` | Gold-vein `#9c7a2b`. Hover warms to `#b8893a`, mimicking a vein catching light. |
| `typography.family.display` | `"Trajan Pro", "Cinzel", "Optima", "Cormorant Garamond", "Georgia", serif` | Trajan Pro / Cinzel — architectural caps. Falls through to Cormorant for body. |
| `typography.role.display.textTransform` | `uppercase` | `uppercase` — the architectural-caps register. |
| `elevation.low.boxShadow` | `0 1px 2px rgba(60, 40, 20, 0.10)` | `0 1px 2px rgba(60, 40, 20, 0.10)` — warm brown tint, not slate-blue. |

## Often confused with

### vs [Modern Royal](./modern-royal.md)

Modern Royal is the dark-field royal register: deep aubergine surface, gold accent, Cormorant display. Marble Royal Flat is the light-field gallery register: marble overlay, gold-vein accent, Trajan caps.

### vs [Graffiti / Marble](./graffiti-marble.md)

Graffiti / Marble shares the exact same marble overlay but swaps the gold-vein accent for fluorescent magenta + lime spray-paint colours and the Trajan display for Permanent Marker. The marble is the gallery; one palette respects it, the other vandalises it.

### vs [Editorial](./editorial.md)

Editorial is warm paper + ink + restrained terracotta accent — a magazine register. Marble Royal Flat is cool stone + gold-vein + architectural caps — a gallery register. Same Flat engine, completely different surface model.

## Where it thrives

- Hero panels and gallery / museum landing pages — the marble overlay carries the register
- Section headings in Trajan caps — what the type family was literally designed for
- Cards on `surface.raised` — the polished-marble lift reads as plinths

## Where it degrades

- Body text directly on `surface.base` — the marble vein layer drops contrast below AA in patches; long-form must sit on `raised`
- Photographic content — the marble overlay competes with any image-heavy layout
- Dense data tables — the visual texture makes row scanning slower

## Recall aliases

`marble royal flat`, `marble royal`, `marble`, `royal marble`, `gallery marble`, `carrara royal`

## Long-form notes

<details>
<summary>From <code>palettes/marble-royal-flat.README.md</code></summary>

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

</details>

---

_Generated from `palettes/marble-royal-flat.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
