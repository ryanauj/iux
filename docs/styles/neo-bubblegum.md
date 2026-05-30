# Neo Bubblegum

> Light neobrutalist register tuned bubblegum-pink + cyan — paper-pink field, zero radius, ink outlines, hard-offset block shadows, and a candy-shop sign read on every fill.

**Engine:** `neubrutalism` · **A11y:** `pass`

## Summary

Neo Bubblegum is the candy-shop tuning of the light neubrutalism engine. Structure matches the rest of the neo-* set — `radius.*` collapses to `0`, `elevation.*` paints hard-offset ink-black block shadows (`2/4/6/8 px` ladder), `border.*` is `#0a0a0a` across the board, motion is `linear` at `60/90/120ms`, and display is Archivo Black weight 900 uppercased over Space Grotesk UI. The distinguishing move is the color story: bubblegum-pink `#ff5fa2` primary with a cyan `#5ce1ff` info / `#00c2d6` focus pair, on a paper-pink `#fff7fb` field. Every fill carries ink-black text — the pinks and cyan are light enough to clear the UI contrast floor without inverting.

## Origin

The post-2020 light neobrutalism wave on Gumroad, Linktree, bento.me, and the bento-grid trend that swept design Twitter — heavy borders, block shadows, zero radius, but in a paper-light register rather than the canonical clashing-neon-on-near-white variant. Bubblegum is the cotton-candy / vaporware-merch tuning of that wave: pink + cyan, the chromatic pair the trend keeps coming back to.

## Signatures

- **Bubblegum-pink primary `#ff5fa2` paired with cyan info `#5ce1ff` and cyan focus `#00c2d6`** — `intent.primary.bg = #ff5fa2`, `intent.info.bg = #5ce1ff`, `effect.focusRing.color = #00c2d6`. The pink/cyan pair is the load-bearing brand cue — every other neo-* palette swaps the primary (Neo Citrus = lime, Neo Grape = violet, Neo Tangerine = orange) and the secondary moves accordingly. Bubblegum is the candy/vaporware tuning.
- **Paper-pink `surface.base` (`#fff7fb`) with a pink-tinted sunken (`#ffeef6`)** — `surface.base` is `#fff7fb` — barely-pink-tinted paper, warmer than Neo Citrus `#fffdf5` (yellow-tinted) and cooler than Neo Tangerine `#fffaf4` (orange-tinted). The pink undertone is what locks the candy-shop read before any intent fills land.
- **Hard-offset ink block shadows on the `2/4/6/8 px` ladder, zero radius** — `elevation.low/medium/high/overlay` are `2px 2px 0 #0a0a0a` / `4px 4px 0 #0a0a0a` / `6px 6px 0 #0a0a0a` / `8px 8px 0 #0a0a0a`. Every `radius.*` slot from `sm` through `full` is `0`. The engine recipe is identical across every neo-* sibling — stamped rectangles with offset ink shadows. Depth comes from the offset, not from blur or curve.
- **Ink-black borders and content on every bright fill (no light-on-pink inversion)** — `color.border.subtle/default/strong` all collapse to `#0a0a0a`. Every `intent.*.content` is `#0a0a0a` — the bubblegum-pink primary stays bright enough that dark text clears AA, the inverse pattern used by Neo Grape's deep violet does not apply here.
- **Archivo Black display weight 900 uppercased over Space Grotesk UI; linear motion at 60–120ms** — `typography.family.display` is `"Archivo Black"` at weight 900 with `textTransform: uppercase` on display/title/label. `family.ui` is `"Space Grotesk"`. `motion.duration.fast/base/slow` is `60/90/120ms` and every easing entry is `linear` — the snap-to-grid neobrutalism cadence. The engine chrome is shared with every neo-* sibling and with `neubrutalism` itself.

## Anti-signatures

- Any non-zero `radius.*` value — defeats the stamped-shape look
- Soft gaussian or blurred shadows — neobrutalism is hard-offset ink only
- A single conservative accent (the point is the candy-pair pink/cyan, not flat-classic restraint)
- Eased or spring motion curves — the engine commits to `linear` across every easing slot
- Light-on-dark `intent.primary.content` — bubblegum pink is bright enough for ink content

## Token evidence

| Path | Value | Note |
|---|---|---|
| `radius.lg` | `0` | `0` — every radius slot from `sm` to `full` collapses; the stamped-rectangle look is engine-load-bearing. |
| `elevation.low.boxShadow` | `2px 2px 0 #0a0a0a` | `2px 2px 0 #0a0a0a` — single offset ink shape, zero blur, zero spread. Identical recipe to every neo-* sibling. |
| `elevation.overlay.boxShadow` | `8px 8px 0 #0a0a0a` | `8px 8px 0 #0a0a0a` — the offset scales to 8px at overlay. No secondary diffuse drop (compare to the cel-shaded family where overlay adds one). |
| `color.intent.primary.bg` | `#ff5fa2` | `#ff5fa2` bubblegum-pink — the load-bearing color move that distinguishes this palette from the other neo-* siblings. |
| `color.intent.info.bg` | `#5ce1ff` | `#5ce1ff` cyan — the complementary pop that pairs with bubblegum-pink to make the candy-shop sign read. |
| `color.surface.base` | `#fff7fb` | `#fff7fb` paper-pink — barely-tinted, warmer than Neo Citrus / Neo Grape. |
| `effect.focusRing.color` | `#00c2d6` | `#00c2d6` deeper cyan — one chroma step from the info fill, four pixels thick, zero offset. |
| `motion.easing.standard` | `linear` | `linear` — every easing slot is `linear`. Snap-to-grid neobrutalism cadence. |

## Often confused with

### vs [Neubrutalism](./neubrutalism.md)

Canonical `neubrutalism` is the elevation-stripped variant — `elevation.*` slots are all `none`, depth comes from 4px ink borders alone, and the palette runs six clashing neon intents on a near-white field. Neo Bubblegum (this palette) is the light hard-shadow variant — `elevation.*` paints the `2/4/6/8 px` offset ladder, borders are still `#0a0a0a` but standard width, and the palette commits to one pink/cyan candy pair instead of clashing.

### vs [Neo Citrus](./neo-citrus.md)

Same neubrutalism engine; the primary swaps. Neo Citrus runs electric-lime `#aef03a` primary with a cobalt-blue link/focus on a yellow-tinted paper field. Neo Bubblegum (this palette) runs bubblegum-pink `#ff5fa2` with a cyan info/focus on a pink-tinted paper field. Engine tokens (radius `0`, ink borders, `2/4/6/8 px` offset ladder, linear motion, Archivo Black) are identical across the sibling set.

### vs [80s Memphis](./memphis-80s.md)

Memphis-80s also uses hard-offset block shadows and ink borders, but every intent is a different saturated primary AND decoration comes from squiggle/confetti motifs in the engine. Neo Bubblegum (this palette) commits to one pink/cyan pair, has zero decorative motifs, and reads as 2020s SaaS-merch rather than 80s Memphis-pattern.

### vs [Vaporwave](./vaporwave.md)

Vaporwave shares the pink/cyan chromatic palette but ships gradient atmospheres, halftone overlays, and serif chrome. Neo Bubblegum (this palette) is flat-fill neobrutalism — no gradient, no atmosphere, no overlay, Archivo Black instead of serif. Same color story, opposite engine.

## Where it thrives

- Buttons / Badges — heavy border + offset shadow + bubblegum fill is the canonical neobrutalism button
- Landing-page hero blocks — Archivo Black at 3rem on bubblegum-pink fill reads as intended brand chrome
- Bento layouts — every cell as a stamped rectangle with its own intent fill, cyan info cells beside pink primary cells
- Pricing pages / sign-up flows — the candy palette is the post-2020 SaaS-merch register

## Where it degrades

- Long-form prose / docs — Archivo Black uppercased on bubblegum fills tires the eye at length
- Dense forms / data tables — ink borders + offset shadows eat real estate and linear motion makes inputs feel unresponsive
- Anything that needs to feel premium / institutional / trustworthy — the candy register reads as playful by construction

## Recall aliases

`neo bubblegum`, `neo-bubblegum`, `bubblegum`, `pink neobrutalism`, `candy brutalism`, `bento brutalism`

---

_Generated from `palettes/neo-bubblegum.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
