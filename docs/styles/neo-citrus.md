# Neo Citrus

> Light neobrutalist register tuned electric-lime + cobalt — warm-white field, zero radius, ink outlines, hard-offset block shadows, one loud lime accent on an otherwise paper page.

**Engine:** `neubrutalism` · **A11y:** `pass`

## Summary

Neo Citrus is the lime-pop tuning of the light neubrutalism engine. Structure matches the rest of the neo-* set — `radius.*` collapses to `0`, `elevation.*` paints the hard-offset ink-black `2/4/6/8 px` ladder, `border.*` is `#0a0a0a` across the board, motion is `linear` at `60/90/120ms`, and display is Archivo Black weight 900 uppercased over Space Grotesk UI. The distinguishing move is the color story: a single electric-lime `#aef03a` primary against a cobalt `#1463ff` link/focus, on a yellow-tinted paper `#fffdf5` field. Compared to the canonical elevation-stripped `neubrutalism`, this is the hard-shadow + one-accent variant.

## Origin

The post-2020 light neobrutalism wave on Gumroad, Linktree, bento.me, and the bento-grid SaaS landing pages that swept design Twitter — heavy borders, block shadows, zero radius, but on paper-light fields rather than the canonical clashing-neon variant. Neo Citrus is the lime-juice / dev-tool tuning of that wave: one electric accent over yellow-warm white, cobalt-blue for the link and focus.

## Signatures

- **Electric-lime primary `#aef03a` as the single load-bearing pop** — `intent.primary.bg = #aef03a` is the only neon in the palette — every other intent runs cooler (`success` `#2fbf71` mid-green, `warning` `#ffd400` yellow, `danger` `#ff5a4d` red, `info` `#5cd6ff` sky). The lime primary carries the entire visual budget; replacing it with another color breaks the citrus identity.
- **Cobalt `#1463ff` link AND focus ring against the lime/warm-yellow field** — `content.link = #1463ff` and `effect.focusRing.color = #1463ff` — both pointers go to a single cobalt blue. The cool-blue + warm-lime + paper-white triangle is the load-bearing brand cue. Compare Neo Tangerine, which pairs an orange primary with the same cobalt blue — same blue, different warm primary.
- **Yellow-tinted paper `surface.base` (`#fffdf5`) and warm-cream sunken (`#fbf7e6`)** — `surface.base` is `#fffdf5` — a 2% warm-yellow paper tint, brighter than Neo Tangerine `#fffaf4` and warmer than Neo Grape `#faf7ff`. The warm undertone is what makes the lime primary read as citrus rather than as reactor-glow neon.
- **Hard-offset ink block shadows on the `2/4/6/8 px` ladder, zero radius** — `elevation.low/medium/high/overlay` are `2px 2px 0 #0a0a0a` / `4px 4px 0 #0a0a0a` / `6px 6px 0 #0a0a0a` / `8px 8px 0 #0a0a0a`. Every `radius.*` slot from `sm` through `full` is `0`. Depth is the offset; corners are stamped.
- **Archivo Black display weight 900 uppercased over Space Grotesk UI; linear motion at 60–120ms** — `typography.family.display` is `"Archivo Black"` at weight 900 with `textTransform: uppercase` on display/title/label. `family.ui` is `"Space Grotesk"`. `motion.duration.fast/base/slow` is `60/90/120ms` with `linear` easing across every slot. Identical chrome to the rest of the neo-* sibling set and to canonical `neubrutalism`.

## Anti-signatures

- Any non-zero `radius.*` value — defeats the stamped-shape look
- Soft gaussian or blurred shadows — neobrutalism is hard-offset ink only
- A pink, violet, or orange primary (those are the other neo-* siblings)
- Eased or spring motion curves — the engine commits to `linear` across every easing slot
- A near-white `surface.base` with zero yellow tint — the warm paper undertone is the citrus undercoat

## Token evidence

| Path | Value | Note |
|---|---|---|
| `radius.lg` | `0` | `0` — every radius slot collapses; the stamped-rectangle look is engine-load-bearing. |
| `elevation.low.boxShadow` | `2px 2px 0 #0a0a0a` | `2px 2px 0 #0a0a0a` — single offset ink shape, zero blur, zero spread. Shared recipe across the neo-* set. |
| `elevation.overlay.boxShadow` | `8px 8px 0 #0a0a0a` | `8px 8px 0 #0a0a0a` — the offset scales to 8px at overlay. No secondary diffuse drop. |
| `color.intent.primary.bg` | `#aef03a` | `#aef03a` electric-lime — the single load-bearing pop that distinguishes Neo Citrus from the sibling set. |
| `color.surface.base` | `#fffdf5` | `#fffdf5` yellow-tinted paper — the warm undercoat that makes the lime read as citrus rather than reactor-glow. |
| `color.content.link` | `#1463ff` | `#1463ff` cobalt — and the same value carries `effect.focusRing.color`. The link/focus cobalt is the engine's cool counter-pop to the warm lime. |
| `effect.focusRing.color` | `#1463ff` | `#1463ff` cobalt — 4px thick, zero offset; hugs the element edge. |
| `motion.easing.standard` | `linear` | `linear` — every easing slot is `linear`. Snap-to-grid neobrutalism cadence. |

## Often confused with

### vs [Neubrutalism](./neubrutalism.md)

Canonical `neubrutalism` is the elevation-stripped variant — `elevation.*` slots are all `none`, depth comes from 4px ink borders alone, and the palette runs six clashing neon intents on a near-white field. Neo Citrus (this palette) is the hard-shadow + one-accent variant — `elevation.*` paints the `2/4/6/8 px` offset ladder, the palette commits to a single electric-lime primary with cooler intents elsewhere, and the field carries a warm-yellow paper tint instead of being neutral white.

### vs [Neo Tangerine](./neo-tangerine.md)

Both neo-* palettes pair their warm primary with the same cobalt `#1d4ed8`/`#1463ff` link/focus. Neo Tangerine runs orange `#ff7a18` primary on warm-orange paper. Neo Citrus (this palette) runs electric-lime `#aef03a` primary on warm-yellow paper. Same chassis, hue rotated 30°.

### vs [Cel-shaded (Citrus Pop)](./cel-shaded-citrus.md)

Both center on a citrus story but the engines diverge. Cel-shaded Citrus is the anime engine — `radius.sm/md/lg = 6/10/16`, 3px ink halo on every control via `effect.outline`, warm tangerine primary plus lime + teal triad. Neo Citrus (this palette) is neubrutalism — zero radius, no ink outline (only borders), one electric-lime primary against cobalt, paper-yellow field.

### vs [Solarpunk](./solarpunk.md)

Solarpunk shares the green-and-warm-paper instinct but commits to a botanical / hand-drawn register. Neo Citrus (this palette) is hard-edged neobrutalism — stamped rectangles, zero radius, Archivo Black chrome. Same color temperature, opposite ornament level.

## Where it thrives

- Buttons / Badges — heavy border + offset shadow + lime primary is the canonical neobrutalism button
- Landing-page hero blocks — Archivo Black at 3rem on lime fill reads as intended brand chrome
- Bento layouts — lime primary cells beside cobalt info cells beside warm-paper neutral cells
- Dev-tool marketing pages — the one-accent + cobalt-link recipe matches the Vercel/Resend/Linear-adjacent register

## Where it degrades

- Long-form prose / docs — Archivo Black uppercased on lime fills tires the eye at length
- Dense forms / data tables — ink borders + offset shadows eat real estate and linear motion makes inputs feel unresponsive
- Calendars / DatePickers — the per-cell heavy border becomes visual noise

## Recall aliases

`neo citrus`, `neo-citrus`, `lime neobrutalism`, `citrus brutalism`, `bento brutalism`, `gumroad`

---

_Generated from `palettes/neo-citrus.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
