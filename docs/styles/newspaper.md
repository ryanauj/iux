# Newspaper / Broadsheet

> Broadsheet register on the flat engine — serif body in a dense `0.9375rem / 1.4` column rhythm, heavy `900`-weight Playfair / Bodoni headlines, newsprint cream-grey paper, a single stop-the-presses red accent.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Newspaper / Broadsheet is the Editorial register tuned for classifieds-and-front-page density. `typography.family.ui` is `Georgia, "Charter", "Times New Roman", "Liberation Serif", serif` — body and chrome share the same family as the headlines, so a single column reads as one continuous voice. `display` keeps Playfair Display / Bodoni Moda at `weight 900 / tracking -0.03em` for stacked-deck front-page headlines, while `body` drops to `0.9375rem / lineHeight 1.4` — narrow-column rhythm, not magazine setting. `space.*` tightens one notch below Flat / Classic at the small end (`1: 3px`, `2: 6px`, `3: 10px`) so dense lists, classifieds, and stock tables pack the way print does. The single saturated accent is a stop-the-presses red `#a01818`, with a cool link blue `#1c3e7a` as the only second saturated colour.

## Origin

The American and British broadsheet tradition (NYT, WSJ, FT, The Times, The Telegraph) — the stacked-deck front-page headline, the narrow body column with hard column rules, and the small-caps section labels of mid-century daily newspapers. Bodoni and Didone display faces paired with transitional serif body (Charter, Times) define the typographic voice the palette quotes.

## Signatures

- **Serif body — `family.ui` is Georgia / Charter, not sans** — `typography.family.ui` resolves to `Georgia, "Charter", "Times New Roman", "Liberation Serif", serif`. Body, label, caption — every UI role wears serif. The choice puts running copy in the same family as the headlines so a column reads as a single voice, the way a broadsheet does.
- **Heavy `900`-weight display with negative tracking** — `role.display` is `4rem / weight 900 / tracking -0.03em / lineHeight 1.0`. `role.title` is `weight 800 / tracking -0.02em`. Playfair Display / Bodoni Moda at black weight with tight tracking is the front-page stacked-deck headline cue — heavier than Editorial's `700` display weight.
- **Dense `body` setting (`0.9375rem / lineHeight 1.4`)** — Body sits at `0.9375rem` with `lineHeight 1.4` — narrow-column rhythm. Editorial sits at `1.0625rem / 1.65` (magazine breathing room) and Academic at `1.0625rem / 1.7` (journal long-form). Newspaper packs tighter than both.
- **Cream-grey newsprint surface (`#e8e3d6`) with stop-the-presses red** — `surface.base` is `#e8e3d6` — newsprint cream-grey, dirtier than Editorial's `#f7f1e3` paper cream. The single saturated accent is `#a01818` (a deep, slightly-brick red, not pillarbox) carrying `intent.primary` and `border.focus`. Link blue `#1c3e7a` stays cool so the red remains unique on the page.
- **Tight low-end `space.*` for classifieds density** — `space.1: '3px'`, `space.2: '6px'`, `space.3: '10px'` — one notch tighter than Flat / Classic at every step. Dense lists, financial tables, and small-print classifieds pack the way print does. The high end (`8: '64px'`) stays normal so masthead and section breaks still have room.
- **Hard `0 0 0 1px` `overlay` stroke, zero shadow elsewhere** — `elevation.flat` / `low` / `medium` / `high` are all `boxShadow: 'none'`. Only `overlay` carries `0 0 0 1px rgba(14, 13, 9, 0.45)` — a printed-frame stroke, the way a boxed callout in a newspaper is framed. No soft drop shadows anywhere.

## Anti-signatures

- A sans-serif `family.ui` — broadsheet body is structurally serif
- A `display` weight lighter than `800` — the heavy stacked-deck headline is the front-page cue
- A loose `body.lineHeight` above ~1.5 — defeats the narrow-column rhythm
- A second saturated red or warm-hue accent competing with the stop-the-presses red
- Soft drop shadows on any elevation slot

## Token evidence

| Path | Value | Note |
|---|---|---|
| `typography.family.ui` | `Georgia, "Charter", "Times New Roman", "Liberation Serif", serif` | `Georgia, "Charter", "Times New Roman", ...` — serif on the UI family slot. The structural move. |
| `typography.role.display.weight` | `900` | `900` — heavier than Editorial's `700` and Wikipedia's `400`. The stacked-deck headline. |
| `typography.role.body.size` | `0.9375rem` | `0.9375rem` — denser than Editorial's `1.0625rem`. |
| `typography.role.body.lineHeight` | `1.4` | `1.4` — narrow-column rhythm. Editorial sits at `1.65`, Academic at `1.7`. |
| `color.surface.base` | `#e8e3d6` | `#e8e3d6` — newsprint cream-grey, dirtier than Editorial's paper-cream `#f7f1e3`. |
| `color.intent.primary.bg` | `#a01818` | Stop-the-presses red `#a01818` — the only fully-saturated colour. Reused at `border.focus`. |
| `space.1` | `3px` | `3px` — one notch tighter than Flat / Classic's `4px` for classifieds density. |
| `elevation.overlay.boxShadow` | `0 0 0 1px rgba(14, 13, 9, 0.45)` | `0 0 0 1px rgba(14, 13, 9, 0.45)` — a printed-frame stroke, not a soft drop shadow. |

## Often confused with

### vs [Editorial](./editorial.md)

Editorial is the magazine-spread sibling — sans body in `Inter`, wider `space.*`, lighter `700`-weight display, warm paper-cream `#f7f1e3` with a terracotta accent. Newspaper is the broadsheet sibling — serif body in `Georgia`, tighter low-end `space.*`, heavier `900`-weight display, dirtier newsprint cream-grey with a stop-the-presses red.

### vs [Academic](./academic.md)

Academic is the LaTeX-journal sibling — Computer Modern serif on every role, body at `1.0625rem / 1.7` for long-form reading, wide `space.*` at the high end for figure gutters, restrained academic-blue accent on warm off-white. Newspaper packs body to `0.9375rem / 1.4` and shouts with a `900`-weight headline and a saturated red.

### vs [Letterpress](./letterpress.md)

Letterpress engages the print engine for ink-bleed and paper-texture effects. Newspaper stays on the pure flat engine — the cream-grey is a colour value, not a texture, and there is no `paperEdge*` or overlay imagery. The print-feel comes from typography and density, not from simulated print artefacts.

### vs [Wikipedia / Institutional](./wikipedia.md)

Wikipedia is the institutional-reference sibling — sans body, white surfaces, MediaWiki link-blue `#3366cc`, `400`-weight serif display. Newspaper is the chromatic-and-typographic-shout sibling — serif body, newsprint cream-grey, stop-the-presses red, `900`-weight Bodoni display.

## Where it thrives

- News article pages with stacked-deck headlines, byline / dateline cards, and pull-quotes
- Classifieds, financial tables, and listings where the tight `space.*` packs density
- Long opinion essays — the serif body and narrow-column rhythm are the form

## Where it degrades

- Marketing CTAs needing a soft, premium hover — the palette refuses drop shadows and rounded radii
- Modern brand systems wanting more than one saturated accent
- Mobile reading at small widths — body at `0.9375rem / 1.4` wants a narrow column, not a phone-screen full width

## Recall aliases

`newspaper`, `broadsheet`, `newsprint`, `front page`, `classifieds`, `nyt`

## Long-form notes

<details>
<summary>From <code>palettes/newspaper.README.md</code></summary>

# Newspaper / Broadsheet

Editorial register on the flat engine, tuned for classified-ad density.
Serif body (`family.ui` = Georgia / Charter / Times) puts long-form
reading copy into the same family that headlines use, so a single column
reads as one continuous voice. `display` keeps Playfair / Bodoni Moda at
`900 / -0.03em` for stacked-deck front-page headlines; `body` drops to
`0.9375rem` with `lineHeight 1.4` — the narrow-column rhythm of a
broadsheet, not the airy magazine setting Editorial uses (`1.0625rem / 1.65`).

`space.*` tightens one notch below Flat / Classic at the small end
(`1 → 3px`, `2 → 6px`, `3 → 10px`) so dense lists, classifieds, and
stock tables pack the way print does. `radius.*` collapses to `0`
through `lg` — newspaper columns are rules, not pills. `elevation.*` is
`'none'` at every slot except `overlay`, which carries a hard
`0 0 0 1px` printed-frame stroke rather than a soft drop shadow.

Color is newsprint cream-grey (`#e8e3d6`) with ink-black body
(`#0e0d09`) and a single "stop-the-presses" red accent (`#a01818`)
that drives `intent.primary` and the focus ring. Link blue
(`#1c3e7a`) is the only second saturated color and stays cool to keep
the red unique on the page.

**A11y:** `pass`. `content.primary` on `surface.base` ≈ 15:1 (AAA).
`intent.primary` (`#a01818` + inverse `#f4eee0`) ≈ 7.4:1 — AAA at body
text. `info` `#1c3e7a` + inverse ≈ 9.5:1, `success` `#2c4a1f` + inverse
≈ 10.3:1, `danger` `#7a1414` + inverse ≈ 8.6:1, `warning` `#8a5500` +
inverse ≈ 6.0:1 (AA body, AAA large). `content.muted` (`#6e6451`) on
`base` ≈ 4.7:1, OK as decorative meta text.

</details>

---

_Generated from `palettes/newspaper.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
