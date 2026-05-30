# Neo Tangerine

> Light neobrutalist register tuned tangerine-orange + cobalt — warm-orange paper field, zero radius, ink outlines, hard-offset block shadows, the citrus-crate variant of the neo-* family.

**Engine:** `neubrutalism` · **A11y:** `pass`

## Summary

Neo Tangerine is the orange tuning of the light neubrutalism engine. Structure matches the rest of the neo-* set — `radius.*` collapses to `0`, `elevation.*` paints the hard-offset ink-black `2/4/6/8 px` ladder, `border.*` is `#0a0a0a` across the board, motion is `linear` at `60/90/120ms`, and display is Archivo Black weight 900 uppercased over Space Grotesk UI. The distinguishing move is the color story: tangerine `#ff7a18` primary against a cobalt `#1d4ed8` link/focus pair, on a warm-orange `#fffaf4` paper field. Every fill carries ink-black content — the orange is bright enough to clear the UI contrast floor without inverting.

## Origin

The post-2020 light neobrutalism wave — Gumroad, Linktree, bento.me, bento-grid SaaS landing pages — tuned to the orange-on-cobalt brand register that runs through citrus-coded productivity tools and warm-leaning creator pages. Neo Tangerine is the citrus-crate / construction-cone tuning of the family: one warm orange primary, one cool cobalt counter-pop, ink everywhere else.

## Signatures

- **Tangerine-orange primary `#ff7a18` with ink-black content** — `intent.primary.bg = #ff7a18` carrying `#0a0a0a` content. Compared to the cel-shaded Citrus palette's softer `#ff9e3d` tangerine, this is a saturated construction-cone orange — bright enough to keep ink content readable, loud enough to anchor the entire palette. Replacing it with a lighter orange weakens the citrus-crate read.
- **Cobalt `#1d4ed8` link AND focus ring against the warm-orange field** — `content.link = #1d4ed8` and `effect.focusRing.color = #1d4ed8` — both pointers go to the same cobalt blue. The warm-orange + cool-cobalt complementary pair is the load-bearing brand cue. Neo Citrus pairs the same cobalt (`#1463ff`, near-identical) with electric-lime — same blue, different warm primary.
- **Warm-orange paper `surface.base` (`#fffaf4`) with a peach sunken (`#fff0e2`)** — `surface.base` is `#fffaf4` — a 2% peach paper tint, distinguishing this palette from Neo Citrus `#fffdf5` (yellow-tinted), Neo Bubblegum `#fff7fb` (pink-tinted), and Neo Grape `#faf7ff` (violet-tinted). The warm-orange undertone is what locks the citrus-crate read before any intent fills land.
- **Hard-offset ink block shadows on the `2/4/6/8 px` ladder, zero radius** — `elevation.low/medium/high/overlay` are `2px 2px 0 #0a0a0a` / `4px 4px 0 #0a0a0a` / `6px 6px 0 #0a0a0a` / `8px 8px 0 #0a0a0a`. Every `radius.*` slot from `sm` through `full` is `0`. The engine recipe is shared across every neo-* sibling — stamped rectangles, offset ink shadows, depth from offset rather than blur or curve.
- **Archivo Black display weight 900 uppercased over Space Grotesk UI; linear motion at 60–120ms** — `typography.family.display` is `"Archivo Black"` at weight 900 with `textTransform: uppercase` on display/title/label. `family.ui` is `"Space Grotesk"`. `motion.duration.fast/base/slow` is `60/90/120ms` with `linear` easing across every slot. Shared chrome with the rest of the neo-* set and with canonical `neubrutalism`.

## Anti-signatures

- Any non-zero `radius.*` value — defeats the stamped-shape look
- Soft gaussian or blurred shadows — neobrutalism is hard-offset ink only
- A pink, lime, or violet primary (those are the other neo-* siblings)
- A near-white `surface.base` with zero peach tint — the warm-orange undertone is the citrus undercoat
- Eased or spring motion curves — the engine commits to `linear` across every easing slot

## Token evidence

| Path | Value | Note |
|---|---|---|
| `radius.lg` | `0` | `0` — every radius slot collapses; the stamped-rectangle look is engine-load-bearing. |
| `elevation.low.boxShadow` | `2px 2px 0 #0a0a0a` | `2px 2px 0 #0a0a0a` — single offset ink shape, zero blur, zero spread. Identical to every neo-* sibling. |
| `elevation.overlay.boxShadow` | `8px 8px 0 #0a0a0a` | `8px 8px 0 #0a0a0a` — the offset scales to 8px at overlay. No secondary diffuse drop. |
| `color.intent.primary.bg` | `#ff7a18` | `#ff7a18` saturated tangerine — the load-bearing color move that distinguishes Neo Tangerine from the sibling set. |
| `color.surface.base` | `#fffaf4` | `#fffaf4` warm-orange paper — distinguishes this palette from the pink / yellow / violet-tinted siblings. |
| `color.content.link` | `#1d4ed8` | `#1d4ed8` cobalt — and the same value carries `effect.focusRing.color`. Cool counter-pop to the warm tangerine. |
| `effect.focusRing.color` | `#1d4ed8` | `#1d4ed8` cobalt — 4px thick, zero offset; hugs the element edge. |
| `motion.easing.standard` | `linear` | `linear` — every easing slot is `linear`. Snap-to-grid neobrutalism cadence. |

## Often confused with

### vs [Neubrutalism](./neubrutalism.md)

Canonical `neubrutalism` is the elevation-stripped variant — `elevation.*` slots are all `none`, depth comes from 4px ink borders alone, and the palette runs six clashing neon intents on a near-white field. Neo Tangerine (this palette) is the hard-shadow + one-warm-accent variant — `elevation.*` paints the `2/4/6/8 px` offset ladder, the palette commits to one tangerine primary against a cobalt counter-pop, and the field carries a peach paper tint instead of neutral white.

### vs [Neo Citrus](./neo-citrus.md)

Both neo-* palettes pair a warm primary with cobalt link/focus. Neo Citrus runs electric-lime `#aef03a` primary on yellow-tinted paper. Neo Tangerine (this palette) runs tangerine-orange `#ff7a18` on peach-tinted paper. Same chassis, hue rotated 30° around the warm range; same cobalt link/focus.

### vs [Cel-shaded (Citrus Pop)](./cel-shaded-citrus.md)

Both center on a citrus story but engines diverge. Cel-shaded Citrus is the anime engine — softer tangerine `#ff9e3d`, 3px ink outline on every control via `effect.outline`, `radius.sm/md/lg = 6/10/16`, lime + teal triad. Neo Tangerine (this palette) is neubrutalism — saturated `#ff7a18`, zero radius, no ink outline (only borders), single warm primary against cobalt.

### vs [Citrus Spark](./citrus-spark.md)

Citrus Spark is the flat-engine D2C-brand register — yellow primary, soft warm-tinted drop shadows, zero outline, generous radius. Neo Tangerine (this palette) is hard-edged neobrutalism — orange primary, hard-offset ink block shadows, zero radius, Archivo Black chrome. Same warm-citrus instinct, opposite engine.

## Where it thrives

- Buttons / Badges — heavy border + offset shadow + tangerine fill is the canonical neobrutalism button
- Landing-page hero blocks — Archivo Black at 3rem on tangerine fill reads as intended brand chrome
- Bento layouts — tangerine primary cells beside cobalt info cells beside warm-paper neutral cells
- Pricing pages / sign-up flows — the warm/cool pair matches the post-2020 SaaS-merch register

## Where it degrades

- Long-form prose / docs — Archivo Black uppercased on tangerine fills tires the eye at length
- Dense forms / data tables — ink borders + offset shadows eat real estate and linear motion makes inputs feel unresponsive
- Calendars / DatePickers — the per-cell heavy border becomes visual noise

## Recall aliases

`neo tangerine`, `neo-tangerine`, `tangerine neobrutalism`, `orange brutalism`, `bento brutalism`

---

_Generated from `palettes/neo-tangerine.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
