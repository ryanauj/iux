# STYLE-CONCEPTS

Concept-level proposals for eight new named palettes. Each entry follows
the same shape as `FINALIZED-PALETTES.md`: one-line philosophy, target
engine, a11y read, and the load-bearing token-level moves that make it
look like itself. Nothing here is committed to the contract until the
concept graduates into a real `palettes/<id>.ts` + description.

The eight cluster into three loose families:

- **Royal trio** — three different angles on regalia (modernist,
  Scandinavian-restraint, marble-paper) sharing one accent palette and
  a single display serif so the family reads as a register set, not
  three unrelated palettes.
- **Day-transit trio** — Tokyo-day, Bullet-train-day, Metro-light.
  Daytime city-infrastructure palettes built around signage colour
  systems (JIS, JR East line palette, transit-map line palette).
- **Mixed pair** — Industrial / Light and Graffiti / Marble. The first
  inverts the workshop / safety register to a light field; the second
  is the deliberately confrontational one, pairing gallery marble with
  street-spraypaint type.

All eight target the existing **Flat** engine on first pass; Graffiti /
Marble is the only candidate that may justify a new engine slot
(`effect.overlay.spray` + a paper / marble overlay image) and is flagged
below.

---

## Group P — royal register set (Flat engine, regalia palette)

Three palettes share a single regal accent set — imperial purple
(`#4b1f6b`), antique gold (`#b8893a`), and burgundy (`#6b1f2e`) — and a
shared display serif (Cormorant Garamond or Trajan-feel). They differ
only in `color.surface.*`, `effect.overlay.image`, `radius.*`, and
`elevation.*`. The set is the first proof that the Flat engine carries
a "regalia" register the way Group D proves it carries Memphis / Swiss
/ Bauhaus.

| #  | Palette                       | Engine | A11y | One-line philosophy                                                                                                                          |
|----|-------------------------------|--------|------|----------------------------------------------------------------------------------------------------------------------------------------------|
| 42 | Modern Royal                  | Flat   | pass | Deep aubergine field, antique-gold accent, modern geometric sans body over a Cormorant display — regal colour stripped of ornament, opaque surfaces, soft drop shadows.                |
| 43 | Scandinavian Royal Modern     | Flat   | pass | Bleached-oak / chalk-white field, single deep-navy regal accent, generous whitespace, humanist sans body — Nordic restraint applied to royal colour; gold reduced to a hairline rule. |
| 44 | Marble Royal Flat             | Flat   | experimental | Cool Carrara-marble paper field via `effect.overlay.image`, gold-vein accent, Trajan-feel display caps for headings — gallery-plinth register on the Flat engine.            |

### 42 — Modern Royal

- **Field / surfaces.** `surface.base` deep aubergine (`#1f0d2a`),
  `surface.raised` one notch lighter (`#2a1538`) — flat, opaque, no
  gradients. `overlay` matches `raised` so modals layer as the same
  material.
- **Accent.** `intent.primary.bg` antique gold (`#b8893a`) with
  `content.onPrimary` near-black; `border.focus` reuses the same gold
  at 3px (heavier than Flat / Classic's 2px to read against the dark
  field).
- **Typography.** `typography.family.display` = Cormorant Garamond;
  `family.ui` / `family.body` = Inter or system geometric sans. The
  display–body contrast does the regal work; body type stays modern.
- **Elevation.** Same soft-gaussian drop shadow recipe as Flat /
  Classic, raised to `rgba(0,0,0,0.4)` to stay visible on the dark
  field.
- **Lookalike risk.** Mall-goth (also dark-field). Differentiator:
  Mall-goth's accent is blood-red and its display is condensed serif;
  Modern Royal's accent is warm-gold and the display has generous
  Cormorant counters.

### 43 — Scandinavian Royal Modern

- **Field / surfaces.** `surface.base` chalk-white (`#f6f3ee`),
  `surface.raised` bleached-oak warm-cream (`#fbf9f4`). Borders
  drop to a hairline rule in `#d8d2c4`.
- **Accent.** `intent.primary.bg` deep regal navy (`#1a2c4e`) — the
  single chromatic intent; success / warning / error remain solid but
  desaturate. Gold is demoted to a 1px `overlay` divider on raised
  surfaces — present but never dominant.
- **Typography.** `family.display` Cormorant in regular weight (not
  bold); `family.body` Inter / Söhne. Generous `space.*` scale
  (1.25× Flat / Classic).
- **Elevation.** Almost none — `low` is a 1px hairline border instead
  of a shadow; `medium` / `high` are very soft (`0 2px 4px
  rgba(26,44,78,0.04)`).
- **Lookalike risk.** Wikipedia (also pale-paper, restrained). Diff:
  Wikipedia uses MediaWiki link blue and a serif display + sans body
  in default weight; Scandinavian Royal Modern uses navy as the only
  intent and pushes whitespace 25% higher.

### 44 — Marble Royal Flat

- **Field / surfaces.** `surface.base` is **not** a flat colour —
  `effect.overlay.image` paints a tiled Carrara-marble texture
  (`url('marble-carrara-tile.webp')`) at 100% over a cool grey
  `#e8e6e3` fallback. `surface.raised` paints a brighter, smaller-tile
  marble (`#f2f0ec` fallback) so cards read as polished plinths.
- **Accent.** `intent.primary.bg` gold-vein (`#9c7a2b`) with a 2px
  gold inset on hover (mimicking a vein catching the light).
- **Typography.** `family.display` Trajan Pro / Cinzel (architectural
  caps) at slightly tracked-out letter-spacing; `family.body` Cormorant
  for long-form, Inter for UI.
- **Elevation.** Same drop-shadow recipe as Flat / Classic but warmer
  (`rgba(60,40,20,0.08)`) so cards sit on the marble like inset
  plaques.
- **Why experimental.** The marble overlay reduces text contrast on
  large `surface.base` areas — body type must sit on `raised` to pass
  AA. Documented as a constraint, not a bug.
- **Engine cost.** Uses only `effect.overlay.image` (already in the
  contract, used by Mid-century modern's atomic-dot field). No new
  slots needed.

---

## Group Q — day-transit set (Flat engine, signage colour systems)

Three palettes share a daytime city-infrastructure brief — JIS signage
colour, JR East line palette, generic transit-map line palette — but
solve different problems. Tokyo / Day is a saturated city register;
Bullet train / Day is an aerodynamic motion register; Metro / Light is
an information-graphic register. All three keep `surface.base` near
white and reserve colour for state or category.

| #  | Palette          | Engine | A11y | One-line philosophy                                                                                                                |
|----|------------------|--------|------|------------------------------------------------------------------------------------------------------------------------------------|
| 45 | Tokyo / Day      | Flat   | pass | White field, JIS-signage red + JR-green + JR-blue as the semantic triad, condensed sans display (Gothic), tight 4px grid — Shibuya-crossing intensity at noon. |
| 46 | Bullet Train / Day | Flat | pass | Pale-sky-blue field, single deep-navy + signal-yellow accent pair, asymmetric pill radius (large on horizontal, small on vertical), longer ease-out motion — Shinkansen livery in UI form. |
| 47 | Metro / Light    | Flat   | pass | Near-white field, vivid map-line palette as category colour, Helvetica display with pill-shaped station tags, hairline track-rule borders — transit-map information graphic as UI surface. |

### 45 — Tokyo / Day

- **Field.** `surface.base` `#ffffff`; `surface.raised` `#fafafa` —
  cooler than Flat / Classic's `#f4f5f7`.
- **Intents.** `primary.bg` JR-East green (`#00b04f`), `info`
  JR-East blue (`#0084c8`), `error` JIS signal red (`#c8102e`),
  `warning` JIS signal yellow (`#ffd700`), `success` JR-East green
  (same as primary — Tokyo conflates "go" and "primary"). Every intent
  is a saturated, signage-grade hue with white inverse content.
- **Typography.** `family.display` condensed gothic (e.g. Barlow
  Condensed) for headings; `family.body` Inter / Noto Sans JP.
- **Spacing.** `space.*` snapped to a 4px grid (vs Flat / Classic's 8px)
  — tighter, denser, signage-like.
- **Elevation.** Flat / Classic recipe but with a slightly cooler
  shadow (`rgba(15,30,40,0.08)`).
- **Lookalike risk.** Swiss / International. Diff: Swiss uses red as
  the *only* chromatic accent and zero radius across the board; Tokyo
  / Day carries a four-colour signage triad and keeps the default 8px
  radius for cards.

### 46 — Bullet Train / Day

- **Field.** `surface.base` pale-sky `#eaf3fb`; `surface.raised`
  `#ffffff`. The brighter raised surface reads like a train carriage
  against the sky.
- **Accent.** `intent.primary.bg` deep navy (`#0a2540`) with a
  signal-yellow (`#ffd400`) `border.focus` — the N700 Shinkansen
  livery in two tokens.
- **Radius.** Asymmetric — `radius.lg` set to `999px 999px 16px 16px`
  (rounded leading edge, square trailing edge). Cards, buttons, and
  modals all pick this up; the result is a directional pill that
  reads as "forward motion." Components consume `radius.lg` already,
  so no per-component work needed.
- **Motion.** `motion.easing.standard` set to `cubic-bezier(0.05, 0.7,
  0.1, 1)` — a long ease-out that mirrors a train decelerating into a
  platform. `motion.duration.medium` raised 1.3× to give the easing
  room to read.
- **Typography.** `family.display` DIN-style geometric (Bahnschrift /
  D-DIN); `family.body` Inter.
- **Lookalike risk.** Material (also blue + soft elevation). Diff:
  Material uses default radius across the board and a standard
  cubic-bezier ease; Bullet Train / Day uses asymmetric radius and
  the long ease-out, both signed-in via tokens.

### 47 — Metro / Light

- **Field.** `surface.base` `#fcfcfc`; `surface.raised` `#ffffff`.
  Hairline borders (`#e6e6e6`, 1px) on every raised surface — the
  "track-rule" line that separates map regions.
- **Category colour.** Eight named line colours (London Underground
  / NYC MTA / Tokyo Metro hybrid): `red`, `blue`, `green`, `orange`,
  `yellow`, `purple`, `brown`, `cyan`. Exposed via `color.category.*`
  rather than `intent.*` so they read as labels, not state. The
  existing semantic intents (primary, success, etc.) sit on top of
  this and stay single-colour.
- **Typography.** `family.display` Helvetica (the canonical transit-map
  type — NYC MTA Standards Manual register); `family.body` Helvetica
  / Inter. Station-name tags get pill-shaped backgrounds via the
  existing `radius.full` slot.
- **Elevation.** None on raised surfaces (the hairline border carries
  the lift); `overlay` still uses a soft drop shadow so modals lift
  above the map plane.
- **Lookalike risk.** Wikipedia (also pale, hairline-bordered). Diff:
  Wikipedia uses serif display + single blue link colour; Metro /
  Light uses Helvetica everywhere and exposes a category-colour
  palette no other Flat register declares.

---

## Group R — workshop / street pair (Flat engine, opposing registers)

Two palettes pin two opposing workshop / street registers to the Flat
engine. Industrial / Light is the inversion exercise — take the dark
workshop aesthetic of CRT / Phosphor or Bloomberg Terminal and prove the
language survives on a warm-paper field. Graffiti / Marble is the
deliberately confrontational pairing — gallery-marble surfaces under
spray-paint display type, the only palette in the set that pairs two
visually-incompatible references intentionally.

| #  | Palette            | Engine | A11y         | One-line philosophy                                                                                                                |
|----|--------------------|--------|--------------|------------------------------------------------------------------------------------------------------------------------------------|
| 48 | Industrial / Light | Flat   | pass         | Warm-white field, steel-grey + concrete-grey neutrals, safety-orange accent, mono labels with measurement tick marks, hairline rules — workshop-drawing register inverted to a light field. |
| 49 | Graffiti / Marble  | Flat\* | experimental | Carrara-marble field via `effect.overlay.image`, spray-paint display type via a free-text token, tagged accents in fluorescent magenta / lime, gallery-plinth raised surfaces — street type on a museum plinth. |

\* Graffiti / Marble may justify a new `Sketch`-adjacent engine if the
spray-paint edge displacement on display text needs an SVG filter; if
the type can ship as a webfont with the spray edge baked in, the
palette stays on Flat.

### 48 — Industrial / Light

- **Field.** `surface.base` warm-paper white (`#fbf8f1`); `surface.raised`
  `#ffffff`. Borders `#d6d2c8` (1px) — the colour of a printed
  engineering drawing's hairline.
- **Accent.** `intent.primary.bg` safety orange (`#ff6a00`) with white
  inverse content; `border.focus` reuses the same orange.
- **Typography.** `family.display` ISO-letterer mono / Inconsolata-Italic
  for measurement labels; `family.body` Inter; `family.ui` mono
  (Berkeley Mono / IBM Plex Mono). Labels render with leading and
  trailing tick marks (`├─ value ─┤`) via the existing `caption` type
  role.
- **Elevation.** Hairline-rule on `low` (matching Cardstock's "cut
  paper edge" approach but ruled, not insetted), soft drop shadow on
  `medium` / `high`.
- **Lookalike risk.** Data-dense light. Diff: Data-dense desaturates
  every intent for sparkline-readability; Industrial / Light keeps
  the safety-orange intent saturated and adds the measurement-tick
  caption treatment.

### 49 — Graffiti / Marble

- **Field.** `surface.base` Carrara-marble texture (same overlay asset
  as palette 44, Marble Royal Flat); `surface.raised` polished-marble
  brighter tile.
- **Accent.** `intent.primary.bg` fluorescent magenta (`#ff2dad`);
  `intent.warning.bg` fluorescent lime (`#c6ff00`); both with black
  inverse content. The two accents always read as "tagged on top of"
  the marble — not blended in.
- **Typography.** `family.display` ships as a spray-paint webfont (e.g.
  Permanent Marker, Bungee Spice, or a custom tagged-letterform);
  `family.body` Inter for legibility — the contrast is the point.
- **Elevation.** Same Flat / Classic soft drop shadow on raised
  surfaces; `overlay` modals get a heavier drop shadow to read as
  "lifted clearly off the marble."
- **Why experimental.** The fluorescent accent colours pass 4.5:1 only
  against black inverse content; if a component wires `onPrimary` to
  white anywhere it will fail AA. The mismatch is deliberate — the
  palette teaches a contrast trap by being one.
- **Engine cost.** If the spray-paint font carries its edge variation
  natively, this rides Flat with no new slots. If we want the spray
  edge to apply to *any* display text (including names rendered through
  the existing `display` role), we need a new `effect.spray*` filter
  slot — but that decision can wait until the palette graduates from
  concept to implementation.
- **Lookalike risk.** Marble Royal Flat (shares the marble overlay).
  Diff: Marble Royal Flat uses a Trajan caps display and a single
  gold-vein accent — gallery register; Graffiti / Marble uses spray
  type and fluorescent magenta + lime — the gallery register
  intentionally vandalised.

---

## Decisions deferred

These are the concept-level open questions that should be resolved
before any of the eight ships a real `palettes/<id>.ts`:

1. **Marble overlay asset.** Palettes 44 and 49 both want a tiled
   Carrara-marble image. Ship one shared `public/textures/marble-carrara-*.webp`
   asset (two zoom levels) and reference it via `effect.overlay.image`
   on both, or generate procedurally via an SVG `feTurbulence` +
   gradient filter? The asset route is faster; the procedural route
   keeps the palette self-contained.
2. **Graffiti spray engine slot.** Whether Graffiti / Marble needs a
   new `effect.spray.*` token (analogous to Sketch's
   `effect.strokeVariance`) or can ship as Flat-with-a-webfont. Defer
   until we know the display font; if the font carries the spray edge,
   no engine work is needed.
3. **Royal accent sharing.** Whether the three royal palettes share a
   single `color.regalia.*` namespace (cleaner for the register-set
   story) or each declares its own `intent.*` values (looser, matches
   how the glass and pixel-art sets are organised today). Recommend
   the latter for consistency with how Group D, Group G, and Group L
   are structured.
4. **JR / JIS colour licensing.** Tokyo / Day and Bullet Train / Day
   reference real signage colour systems. The hex values themselves
   are not licensable, but the JR-East line colours are documented in
   public-domain JIS-style guidelines — confirm before shipping the
   palette README that we cite the source correctly.

---

## Sequencing recommendation

If only one palette ships per session, suggested order:

1. **Modern Royal** (palette 42) — lowest-risk royal entry; pure
   `color.*` + `typography.*` configuration of Flat.
2. **Metro / Light** (palette 47) — exercises a new `color.category.*`
   namespace that doesn't exist yet, but is additive (no existing
   palette breaks).
3. **Tokyo / Day** (palette 45) — proves the JIS signage register.
4. **Industrial / Light** (palette 48) — proves the workshop inversion;
   reuses the measurement-tick caption treatment that we may want for
   Data-dense light too.
5. **Scandinavian Royal Modern** (palette 43) — second royal register,
   validates the set.
6. **Bullet Train / Day** (palette 46) — first palette to wire
   asymmetric `radius.lg`; needs a visual review for whether
   components survive the directional pill.
7. **Marble Royal Flat** (palette 44) — first palette to use
   `effect.overlay.image` for a photographic texture; surfaces the
   contrast caveat documented above.
8. **Graffiti / Marble** (palette 49) — ship last; depends on the
   marble asset from palette 44 and the spray-font / engine-slot
   decision from item 2 above.
