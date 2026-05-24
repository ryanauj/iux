# FINALIZED-PALETTES

Forty-nine named aesthetics. Each is a concrete value-set bound to the
single semantic token contract in `tokens/semantic.contract.ts`. A
**palette** defines values; an **engine** defines the rendering style
(which token slots matter, what shape the shadow stack takes, whether
`backdropBlur` is non-zero, etc.). Two palettes can share an engine and
still look nothing alike — that is the point.

Legend:

- **A11y**: `pass` = passes WCAG AA for body text & focusable controls at
  default sizes; `experimental` = ships with documented contrast or
  motion caveats and is opt-in for production.
- **Engine**: the rendering family the palette plugs into. Palettes
  8–10, 11–15, 16–20, 21–22, and 23–24 reuse / introduce engines
  alongside 1–7 to prove the contract holds.

---

## Group A — named aesthetic families

| # | Palette         | Engine         | A11y         | One-line philosophy                                                                            |
|---|-----------------|----------------|--------------|------------------------------------------------------------------------------------------------|
| 1 | Flat / Classic  | Flat           | pass         | Solid fills, one accent, system font, high contrast — the control surface every other rung is judged against. |
| 2 | Material        | Material       | pass         | Paper-and-ink metaphor: stacked surfaces, soft elevation shadows, bold accent, ripple on press. |
| 3 | Neubrutalism    | Neubrutalism   | pass         | Thick black borders, hard offset shadows, vibrant clashing fills, heavy type, zero radius — confidently ugly. |
| 4 | Glassmorphism   | Glassmorphism  | experimental | Translucent panels over a saturated background, backdrop blur, hairline borders, layered depth. |
| 5 | Neumorphism     | Neumorphism    | experimental | Single tonal surface with paired inner + outer shadow — the cautionary palette; contrast fails on purpose so we can document it. |
| 6 | Claymorphism    | Claymorphism   | experimental | Inflated 3D "gumdrops" — vibrant pastels, large radius, doubled inner and outer shadow for softness. |
| 7 | Skeuomorphism   | Skeuomorphism  | experimental | Mimics real materials — felt, leather, brushed metal — with texture maps and tactile shadow depth. |

## Group B — palette configurations (same engines, different tokens)

| #  | Palette          | Engine        | A11y         | One-line philosophy                                                                            |
|----|------------------|---------------|--------------|------------------------------------------------------------------------------------------------|
| 8  | Tron / Dark-Neon | Glassmorphism | experimental | Near-black field, one neon accent, glow-as-focus-ring — glass engine, all the translucency dialed to a single color. |
| 9  | Editorial        | Flat          | pass         | Warm paper background, serif display, ink-black body, restrained accent — flat engine reading like a magazine. |
| 10 | High-Contrast AAA| Flat          | pass         | Pure black on pure white (or inverse), 3px focus rings, no decorative color — constraint as aesthetic, WCAG AAA throughout. |

## Group C — glass registers (same engine, period/brand tuning)

Five additional palettes prove the Glassmorphism engine carries
distinct visual registers without engine changes — all five differ
only in `surface.*` alpha, `border.*` tint, `elevation.*` shadow
recipe, `radius.*`, and `effect.backdropBlur.*` magnitude.

| #  | Palette                 | Engine        | A11y         | One-line philosophy                                                                            |
|----|-------------------------|---------------|--------------|------------------------------------------------------------------------------------------------|
| 11 | Liquid Glass (Light)    | Glassmorphism | experimental | Apple WWDC25 register — softer blur, refraction-tinted hairlines, lighter shadows on a cool light base. |
| 12 | Liquid Glass (Dark)     | Glassmorphism | experimental | Same Apple register inverted to near-black; raised alphas drop to 6–14% so panels still read as glass, not grey. |
| 13 | Aero Glass              | Glassmorphism | experimental | Windows Vista/7 — saturated blue base, paired top-highlight + bottom-rim insets for the wet gloss, Segoe UI. |
| 14 | Frutiger Aero           | Glassmorphism | experimental | Y2K aqua-mint base, cloud-white raised, bouncier spring easing, teal shadow — late-2000s optimism. |
| 15 | Cyberpunk Neon-Noir     | Glassmorphism | experimental | Near-black rainy-window field, magenta + cyan dual-accent borders and glow elevations, glow focus ring. |

## Group D — flat registers (same engine, period/style tuning)

Five additional palettes prove the Flat engine carries distinct
period and style registers without engine changes — palettes differ
only in `color.*`, `radius.*`, `borderWidth.*`, `elevation.*` shadow
recipe, `space.*` scaling, and `typography.*` family/role choices.
Palettes 16 and 17 stress decoration and color saturation; palettes
18 and 19 collapse the color/curve space deliberately; palette 20
collapses the lightness/intent space deliberately.

| #  | Palette                      | Engine | A11y         | One-line philosophy                                                                            |
|----|------------------------------|--------|--------------|------------------------------------------------------------------------------------------------|
| 16 | Vaporwave                    | Flat   | experimental | Magenta/cyan dusk register on a deep night-purple base, glow-paired elevation, serif display + uppercase mono labels. |
| 17 | 80s Memphis                  | Flat   | experimental | Cream base, primary-color intents, ink-black borders on every slot, hard-offset elevation — Memphis Group confetti vocabulary. |
| 18 | Swiss / International Style  | Flat   | pass         | White / black / signal red only; zero radius outside `full`; intents collapse to two colors — typographic hierarchy carries the rest. |
| 19 | Bauhaus                      | Flat   | pass         | Red / yellow / blue primaries on cream, radius forced to `0` or `9999px`, geometric sans, linear easings — primary shapes only. |
| 20 | Mall-goth                    | Flat   | experimental | Near-black field, blood-red accent, deep-violet `info`, condensed serif display, tightened `space.*` — crepuscular intent across the board. |

## Group E — editorial registers (same Flat engine, type-density tuning)

Two additional palettes prove the Flat engine carries distinct
typographic registers under a shared warm-paper / ink-black color
identity — both differ from Editorial primarily in
`typography.family.*`, `typography.role.*`, `space.*`, and `radius.*`.
Elevation stays effectively flat. Where Group D varies the Flat engine
across period and color, Group E varies it across type density and
margin within a single editorial color register.

| #  | Palette                 | Engine        | A11y         | One-line philosophy                                                                            |
|----|-------------------------|---------------|--------------|------------------------------------------------------------------------------------------------|
| 21 | Newspaper / Broadsheet  | Flat          | pass         | Newsprint cream, serif body in a narrow-column rhythm, stop-the-presses red accent, zero radius, classified-ad density. |
| 22 | Academic                | Flat          | pass         | LaTeX journal-article aesthetic — Computer Modern serif throughout (ui = display), generous outer margins, footnote-style affordances signaled through `label` (small-caps surrogate) and `caption`. |

## Group F — CRT phosphor pair (new engine)

Two palettes share the new CRT / Phosphor engine, which exercises
three contract slots — `effect.overlay`, `effect.glow`, `motion.decay`
— that every other palette returns as no-ops. The pair proves the
engine generalizes: swap green ↔ amber by editing only `color.*` and
`effect.glow.color`.

| #  | Palette                 | Engine         | A11y         | One-line philosophy                                                                            |
|----|-------------------------|----------------|--------------|------------------------------------------------------------------------------------------------|
| 23 | CRT / Phosphor (Green)  | CRT / Phosphor | experimental | Green-screen tube — single phosphor color on near-black, scanline overlay, bloom on text, motion that decays past its main duration. |
| 24 | CRT / Phosphor (Amber)  | CRT / Phosphor | experimental | DEC VT220 amber variant — same engine, single-color swap; intents collapse onto the one phosphor color. |

## Group G — pixel-art set (new engine)

Six palettes share the new Pixel-art engine, which exercises two
contract slots — `effect.pixelGrid` and `typography.family.pixel` —
that every other palette returns as no-ops. The set proves the engine
generalises across both **hardware-locked** registers (NES, Game Boy,
SNES — bit-depth dictates the colour ROM) and **art-direction**
registers (PICO-8's fixed fantasy-console palette, a generic
cottagecore parchment register, Hyper Light Drifter's synth-noir).
Unlike the CRT engine, Pixel-art changes more than decoration: every
`space.*`
and `radius.*` value is forced onto an integer-pixel grid, every
`motion.easing.*` collapses to `steps(1, end)`, and every `radius.*`
slot is `'0'` (no anti-aliased corners).

| #  | Palette                       | Engine     | A11y         | One-line philosophy                                                                            |
|----|-------------------------------|------------|--------------|------------------------------------------------------------------------------------------------|
| 25 | Pixel Art (NES)               | Pixel-art  | experimental | 8-bit console register — NTSC 2C02 swatches on black, bitmap glyphs (Press Start 2P), hard offsets, square corners, steps(1) easings. |
| 26 | Pixel Art (Game Boy)          | Pixel-art  | experimental | DMG 4-tone green LCD — same engine, single-platform colour swap; intents collapse onto four shades. |
| 27 | Pixel Art (Cottagecore)       | Pixel-art  | experimental | Generic warm-pastoral indie — parchment fields, wood frames, harvest gold, crop green; earthy intents in place of saturated console primaries. |
| 28 | Pixel Art (PICO-8)            | Pixel-art  | experimental | Lexaloffle fantasy-console ROM — fixed 16-colour palette, hover/active states swap hue instead of dimming luminance. |
| 29 | Pixel Art (SNES)              | Pixel-art  | experimental | 16-bit JRPG dialog register — deep-blue window, white inner bevel, gold accent; `overlay` elevation paints the SNES dialog frame. |
| 30 | Pixel Art (Hyper Light)       | Pixel-art  | experimental | Modern synth-noir indie — indigo field, magenta accent, teal highlight; `high` elevation casts a magenta block to fake the missing glow. |

## Group H — sketch / hand-drawn (new engine)

One palette anchors the new Sketch engine, which exercises two contract
slots — `effect.strokeVariance` and `typography.family.hand` — that
every other palette returns as no-ops. The engine ships with a single
palette today; the contract is built so a second register (e.g.
"Hand-drawn / Ink-and-watercolour", "Hand-drawn / Whiteboard") could
land later by editing only `color.*` and `typography.family.hand`. The
engine applies an SVG turbulence + displacement filter at the palette
root, so every edge — borders, glyph outlines, focus rings, shadow
strokes — picks up the same micro-jitter without per-component code.

| #  | Palette                 | Engine     | A11y         | One-line philosophy                                                                            |
|----|-------------------------|------------|--------------|------------------------------------------------------------------------------------------------|
| 31 | Hand-drawn (Marker)     | Sketch     | experimental | Notebook-paper field, ink-blue body, red-marker accent, every edge displaced by a root-level SVG filter — marker-feel typography (Caveat / Patrick Hand). |

## Group I — restraint registers (engine configurations, marketing polish removed)

Two palettes pin restraint to two different engines. Each is a tight
configuration of an existing Group A / Group B palette — they
deliberately do not invent new engines or new groups of registers. The
Wikipedia palette is the institutional-reference configuration of
Editorial: serif `display` + sans `body`, the canonical `#3366cc`
MediaWiki link blue, white paper, hairline-only `overlay` elevation.
The Brutalist-elegant palette is the ivory / oxblood configuration of
Neubrutalism: structure (radius `'0'`, `borderWidth.heavy = 4px`,
hard-offset `elevation.*` block, linear snap motion) stays exactly as
the base palette ships; only `color.*`, `typography.family.display`,
and the `elevation.*` offsets vary. If the brutalist register softens —
rounds corners, blurs shadows, drops the heavy border — it has drifted
out of the engine.

| #  | Palette                 | Engine        | A11y         | One-line philosophy                                                                            |
|----|-------------------------|---------------|--------------|------------------------------------------------------------------------------------------------|
| 32 | Wikipedia / Institutional | Flat        | pass         | MediaWiki Vector skin in two-token form — serif display, sans body, `#3366cc` link blue, white paper, hairline `overlay` rule, zero marketing polish. |
| 33 | Brutalist-elegant       | Neubrutalism  | pass         | Ivory / black / oxblood configuration of Neubrutalism — radius `0`, 4px borders, hard-offset block elevation kept verbatim; Bodoni / Didot on `display` does the elegance work. |

## Group J — data-density / mid-century registers (same Flat engine)

Three additional palettes prove the Flat engine carries distinct
data-density and mid-century registers without engine changes. Palettes
34 and 36 anchor the density extremes — trading-terminal amber on a
dark field and Tufte-style ink-on-near-white — and palette 35 sits
between them as the quiet warm-paper register the Eames era taught
how to draw. All three differ from Flat / Classic only in `color.*`,
`space.*` (the financial-terminal tightens, the other two stay default),
`radius.*`, `elevation.*` (all three replace soft drop shadows with
inset hairline frames), `typography.*` (financial-terminal mixes a sans
body with mono display / labels / code; mid-century picks a humanist
sans; data-dense scales the type *down* to sparkline-ready sizes), and
`effect.overlay.image` (mid-century paints a sparse atomic-age dot field
at low alpha; the other two stay `'none'`).

| #  | Palette                 | Engine | A11y         | One-line philosophy                                                                            |
|----|-------------------------|--------|--------------|------------------------------------------------------------------------------------------------|
| 34 | Financial Terminal      | Flat   | experimental | Dark field, trading-amber phosphor, mono display / labels with a sans body for prose, green/red/yellow/cyan intents read as DATA not decoration — generic financial-workstation density. |
| 35 | Mid-century modern      | Flat   | pass         | Cream paper, walnut ink, mustard + teal accents, atomic-age dot pattern painted sparingly via the decoration token — Eames-feel restraint. |
| 36 | Data-dense light        | Flat   | pass         | Near-white field, ink-slate body, desaturated semantic intents, sparkline-ready type scale — Tufte-influenced density without the financial-terminal's mono / dark register. |

## Group K — cardstock layered (new engine)

One palette anchors the new Cardstock engine, which exercises two
contract slots — `effect.paperEdgeColor` and `effect.paperEdgeWidth` —
that every other palette returns as no-ops (`'transparent'` / `'0'`).
The engine delivers the "cut paper stack" register through `elevation.*`
directly: each slot bakes a paired `inset -Npx -Npx 0` (the bottom/
right cut-edge thickness) and a tight zero-blur drop shadow (the gap
to the layer below). No glow, no diffuse shadows, no rim lighting —
cards float above cards quietly. Type is a clean modern sans treated
as ink on the paper.

| #  | Palette                 | Engine     | A11y         | One-line philosophy                                                                            |
|----|-------------------------|------------|--------------|------------------------------------------------------------------------------------------------|
| 37 | Cardstock (Layered)     | Cardstock  | experimental | Cream paper field, sage / butter / dusty-rose / slate / cream pastel set, clean modern sans as ink, every raised surface a piece of cut cardstock with a 1px slate-ink rule along bottom/right and a tight close shadow to the layer below. |

## Group L — cel-shaded / anime (new engine)

Two palettes share the new Cel-shaded engine, which exercises three
contract slots no previous engine touched — `effect.outline.color`,
`effect.outline.width`, and `effect.shadowStyle`. The pair proves the
engine generalises the same way the CRT pair (green ↔ amber) and the
Pixel-art set do: swap `color.*` and the engine still works. The
engine's load-bearing visual is the always-present ink line on every
card edge and every interactive control — the affordance cue a cel-
animated frame uses to separate elements from the background. Shading,
where it exists, is a single darker shape with a hard edge, painted
through `elevation.*` as a zero-blur block shadow.

| #  | Palette                 | Engine      | A11y         | One-line philosophy                                                                            |
|----|-------------------------|-------------|--------------|------------------------------------------------------------------------------------------------|
| 38 | Cel-shaded (Shonen)     | Cel-shaded  | pass         | Cream paper, vibrant orange / blue / black triad, Archivo Black display, ink outline on every card edge and control, hard-offset block shadows. |
| 39 | Cel-shaded (Shojo)      | Cel-shaded  | pass         | Cream-pink wash, pink / lavender / pastel-green set, Poppins round-humanist display, same ink outline + block-shadow engine, sentence-case display. |

## Group M — atmospheric / luminance-surface (new engine)

One palette anchors the new Aurora engine, which exercises three
contract slots no previous engine touched — `effect.atmosphereGradient`,
`effect.luminanceCenter`, and `effect.surfaceBy`. The engine paints a
multi-radial-gradient stack of green / purple / teal luminance centers
on a deep midnight base, very slowly drifting (`background-position`
keyframes over a 48-second loop), and demarcates raised surfaces by
LIGHT DENSITY rather than by borders — cards appear as brighter regions
of the same atmosphere, type is high-luminance near-white with a slight
chromatic tint that picks up the atmosphere, and interactive elements
bend the luminance toward themselves on hover / focus. Under
`prefers-reduced-motion` the drift freezes at an intentionally-composed
static position — the still composition is designed, not "the moment
the animation stopped." The contract is built so a second register
(e.g. "Aurora / Sunrise" with warmer luminance centers, "Aurora / Deep
Sea" with all-blue centers) could land later by editing only
`color.*`, `effect.atmosphereGradient`, `effect.luminanceCenter`, and
`effect.focusRing.color`.

`surfaceBy` is the most load-bearing surface-model signal in the
contract — every other palette declares `'border'` and Aurora is the
only palette using `'luminance'` today.

| #  | Palette                 | Engine     | A11y         | One-line philosophy                                                                            |
|----|-------------------------|------------|--------------|------------------------------------------------------------------------------------------------|
| 40 | Aurora                  | Aurora     | experimental | Deep midnight base, slowly drifting green / purple / teal atmospheric gradient, raised surfaces as luminance lifts rather than bordered rectangles, near-white type with cool chromatic tint, hover/focus intensifies the luminance halo. |

## Group N — terminal / character-grid (new engine)

One palette anchors the new Terminal-TUI engine, which exercises three
contract slots no previous engine touched — `effect.gridUnitX`,
`effect.gridUnitY`, and `effect.borderStyle`. The engine treats the
character cell (`1ch` wide, `1lh` tall) as the unit of layout:
component padding, gaps, and corner-glyph positions all snap to
integer character cells. The load-bearing addition is `borderStyle`:
under `'character'` (set only by Terminal-TUI; every other palette
declares `'css'`), raised surfaces (Card, Modal, Table) hide their
CSS border and paint a box-drawing-character outline (`┌─┐│└─┘`).
Components consume the token via container style queries
(`@container palette style(--border-style: character)`), so the engine
seam is the token itself — not a `data-palette` attribute. Monochrome
warm-white base with semantic-color text only (red errors, amber
warnings, green success, blue links); the entire engine refuses
decorative color. The contract is built so a second register
(e.g. "Terminal / DOS-blue" with `#0000aa` panels, "Terminal /
VT100-green" with phosphor body type) could land later by editing
only `color.*` and `typography.family.*`.

`borderStyle` is the most invasive contract addition since
`surfaceBy = 'luminance'` shipped with Aurora — every other palette
must declare `'css'` to opt out, and three components (Card, Modal,
Table) gained a `@container` block to switch their rendering. That's
the cost of an engine that redefines the unit of layout itself;
absorbing it in the same session that ships the engine is the honest
path.

The teaching note for this engine is the headline of the whole
project: **design tokens can redefine the unit of layout itself.**
Other engines decorate; Terminal-TUI redefines.

| #  | Palette                 | Engine        | A11y         | One-line philosophy                                                                            |
|----|-------------------------|---------------|--------------|------------------------------------------------------------------------------------------------|
| 41 | Terminal / TUI          | Terminal-TUI  | experimental | Warm-white-on-near-black, monospace throughout, layout snapped to integer character cells, box-drawing-character borders on raised surfaces, semantic color (red / amber / green / blue) reserved strictly for state. |

## Group P — royal register set (Flat engine, regalia palette)

Three palettes pin three different angles on regalia to the Flat
engine, sharing one regal accent vocabulary (deep aubergine field,
antique gold, deep navy) and a Cormorant Garamond display serif. They
differ only in `color.surface.*` lightness, which slot carries the
gold (`intent.primary` in Modern Royal, `border.subtle` in Scandinavian
Royal Modern, `intent.primary` again in Marble Royal Flat), and
`effect.overlay.image` (none on the first two, a procedural marble
texture on the third). The set is the first proof that the Flat engine
carries a "regalia" register the way Group D proves it carries
Memphis / Swiss / Bauhaus, and Marble Royal Flat is the first palette
to use `effect.overlay.image` for a photographic surface texture
(previously only Mid-century modern's atomic-dot field exercised the
slot, and that was a pattern, not a stone).

| #  | Palette                       | Engine | A11y         | One-line philosophy                                                                                                                |
|----|-------------------------------|--------|--------------|------------------------------------------------------------------------------------------------------------------------------------|
| 42 | Modern Royal                  | Flat   | pass         | Deep aubergine field, antique-gold accent, modern geometric sans body over a Cormorant display — regal colour stripped of ornament, opaque surfaces, soft drop shadows. |
| 43 | Scandinavian Royal Modern     | Flat   | pass         | Chalk-white / bleached-oak field, single deep-navy regal accent, generous whitespace, humanist sans body — Nordic restraint applied to royal colour; gold demoted to a hairline rule. |
| 44 | Marble Royal Flat             | Flat   | experimental | Cool Carrara-marble paper field via a procedural `effect.overlay.image` (five stacked radial gradients), gold-vein accent, Trajan-feel display caps — gallery-plinth register. |

## Group Q — day-transit set (Flat engine, signage colour systems)

Three palettes share a daytime city-infrastructure brief — JIS signage
colour (Tokyo / Day), JR-East Shinkansen livery (Bullet Train / Day),
and the NYC MTA / Tokyo Metro / London Underground line-colour palette
(Metro / Light) — but solve different problems. All three keep
`surface.base` near white and reserve colour for state. The set
exercises the first asymmetric `radius.lg` in the showcase
(`"16px 16px 4px 4px"` on Bullet Train / Day for directional pill
shape), the first long-ease-out `motion.easing.standard` (`cubic-bezier(0.05, 0.7, 0.1, 1)` on the same palette), and the first Flat palette to
commit to a single-family Helvetica stack everywhere (Metro / Light).

| #  | Palette          | Engine | A11y | One-line philosophy                                                                                                                |
|----|------------------|--------|------|------------------------------------------------------------------------------------------------------------------------------------|
| 45 | Tokyo / Day      | Flat   | pass | White field, JR-East green + JIS signal red / yellow + JR blue as the semantic triad, condensed gothic display, tight 4 px grid — Shibuya-crossing intensity at noon. |
| 46 | Bullet Train / Day | Flat | pass | Pale-sky-blue field, deep-navy primary, signal-yellow focus, asymmetric `radius.lg` (`16px 16px 4px 4px`) for forward motion, long ease-out motion — Shinkansen N700 livery in UI form. |
| 47 | Metro / Light    | Flat   | pass | Near-white field, hairline track-rule borders, NYC-subway line-colour palette as `intent.*`, Helvetica throughout, pill-shaped station tags — Vignelli 1970 transit-map register. |

## Group R — workshop / street pair (Flat engine, opposing registers)

Two palettes pin two opposing workshop / street registers to the Flat
engine. Industrial / Light is the inversion exercise — take the
dark-workshop aesthetic of CRT / Phosphor and Bloomberg Terminal and
prove the language survives on a warm-paper light field (warm-paper
surfaces, steel-grey neutrals, safety-orange accent, IBM Plex Mono on
`family.ui`). Graffiti / Marble is the deliberately confrontational
pairing — the marble overlay from Group P (Marble Royal Flat) reused
verbatim under fluorescent magenta + lime spray-paint intents and a
Permanent Marker display. It ships `experimental` because the
fluorescent accents only pass AA against BLACK inverse content (not
white) — the palette pins `intent.*.content` to black throughout, and
the README documents the contrast trap as the teaching example.

| #  | Palette            | Engine | A11y         | One-line philosophy                                                                                                                |
|----|--------------------|--------|--------------|------------------------------------------------------------------------------------------------------------------------------------|
| 48 | Industrial / Light | Flat   | pass         | Warm-paper field, steel-grey + concrete-grey neutrals, safety-orange `intent.primary`, IBM Plex Mono on `family.ui` so labels carry measurement-drawing density — workshop register inverted to a light field. |
| 49 | Graffiti / Marble  | Flat   | experimental | Carrara-marble field via the shared procedural `effect.overlay.image`, fluorescent magenta + lime intents with BLACK inverse content (not white), Permanent Marker display — gallery register intentionally vandalised. |

---

## Notes on a11y tags

- **Neumorphism** is included intentionally as the cautionary palette. Its
  defining feature — a single near-monochrome surface lit only by paired
  shadows — guarantees text and icon contrast below 3:1 against most
  backgrounds. We ship it so the showcase can demonstrate the failure
  mode concretely; the `experimental` tag is mandatory.
- **Glassmorphism** and **Tron / Dark-Neon** depend on what sits behind
  the translucent surface. Both palettes set `surface.scrim` aggressively
  to mitigate, but cannot guarantee AA without controlling the page.
- **Claymorphism** and **Skeuomorphism** can pass AA on a per-token basis
  but their textured / pastel surfaces routinely defeat icon contrast and
  cursor visibility; flagged experimental.

## Engine inventory

Fourteen engines, forty-nine palettes:

1. Flat
2. Material
3. Neubrutalism
4. Glassmorphism
5. Neumorphism
6. Claymorphism
7. Skeuomorphism
8. CRT / Phosphor
9. Pixel-art
10. Sketch
11. Cardstock
12. Cel-shaded
13. Aurora
14. Terminal-TUI

Engine `Flat` is reused by palettes 1, 9, 10, 16–20, 21–22, 32,
34–36, and 42–49. Engine `Neubrutalism` is reused by palettes 3 and 33. Engine
`Glassmorphism` is reused by palettes 4, 8, and 11–15. Engine
`CRT / Phosphor` is reused by palettes 23, 24. Engine `Pixel-art` is
reused by palettes 25–30. Engine `Sketch` is anchored by palette 31.
Engine `Cardstock` is anchored by palette 37. Engine `Cel-shaded` is
reused by palettes 38 and 39. Engine `Aurora` is anchored by palette
40. Engine `Terminal-TUI` is anchored by palette 41. The token
contract is the only seam between engine and palette — see
`tokens/00-token-contract.md`.
