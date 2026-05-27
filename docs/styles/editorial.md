# Editorial

> Magazine register on the flat engine — warm paper field, ink-black body, serif `display`, a single restrained terracotta accent, and a one-notch-wider space scale that gives long-form serif type the breathing room it expects.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Editorial is the flat engine tuned to a print-magazine voice. `surface.base` is warm paper (`#f7f1e3`), `content.primary` is ink-black (`#1e170d`), and a restrained terracotta (`#a13b1a`) carries `intent.primary`, `content.link`, and `border.focus` — the only saturated colour on the page. `typography.family.display` is Playfair / Times / Georgia serif at large sizes, while `family.ui` stays sans for column density. The space scale widens one notch from Flat / Classic (`space.4: '22px'`, `space.8: '88px'`) so the serif type has magazine breathing room, and elevation collapses to `none` everywhere except `high`/`overlay` — magazine layouts lift with headlines and whitespace, not with cards.

## Origin

Mid-century and contemporary print-magazine art direction (The New Yorker, Harper's, the long-form essay spread) where serif display, generous leading, and a single restrained accent organise a page that wants to be read for minutes rather than scanned for seconds.

## Signatures

- **Warm paper `surface.base` (`#f7f1e3`) with ink-black body** — `surface.base` is `#f7f1e3` — cream-paper, not white. `content.primary` is `#1e170d` (ink-black, not pure `#000`). The pairing measures ~16:1, AAA at default body size, and reads as offset-printed magazine stock rather than screen UI.
- **Single terracotta accent (`#a13b1a`) doing triple duty** — `intent.primary.bg`, `color.content.link`, and `border.focus` all share `#a13b1a`. Every other intent stays earth-toned (`success` `#3f5b2a`, `warning` `#a36b00`, `info` `#1f4b6e`) so the terracotta remains the only attention colour on the page.
- **Serif `display` family with sans body** — `typography.family.display` is `"Playfair Display", "Times New Roman", Georgia, serif`. `family.ui` (used by `body`, `label`, `caption`) stays Inter / Helvetica Neue. Headlines wear serif; running text and chrome wear sans — the magazine convention.
- **Wide `space.*` scale + generous body leading** — `space.4: '22px'`, `space.7: '64px'`, `space.8: '88px'` — one notch wider than Flat / Classic at every step. `role.body` runs at `1.0625rem` with `lineHeight 1.65` for the airy magazine setting (vs Newspaper's denser `0.9375rem / 1.4`).
- **Collapsed elevation with warm-tinted drop shadows only at `high`/`overlay`** — `elevation.flat` / `low` / `medium` are all `boxShadow: 'none'`. `high` carries `0 4px 12px rgba(30, 23, 13, 0.10)` and `overlay` `0 12px 32px rgba(30, 23, 13, 0.18)` — warm-tinted (note the `rgba(30, 23, 13, …)` ink rather than a neutral grey), used sparingly and only for genuine floating surfaces.

## Anti-signatures

- Pure white `surface.base` (defeats the warm-paper cue)
- A sans-serif `display` family — the serif headline is structural
- A second saturated accent competing with the terracotta
- Tight `space.*` or short body leading — Editorial cannot survive without the breathing room
- Soft drop shadows on `low`/`medium` — magazine layouts do not lift card-on-page

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.surface.base` | `#f7f1e3` | Warm paper `#f7f1e3` — the cream offset-stock cue. Compare Wikipedia's clinical `#ffffff`. |
| `color.intent.primary.bg` | `#a13b1a` | Terracotta `#a13b1a` — the only saturated colour, reused at `border.focus` and `content.link`. |
| `typography.family.display` | `"Playfair Display", "Times New Roman", Georgia, serif` | `"Playfair Display", "Times New Roman", Georgia, serif` — serif headlines on sans body. |
| `typography.role.body.lineHeight` | `1.65` | `1.65` — magazine leading. Newspaper sits at `1.4` for column density; Wikipedia at `1.6`. |
| `space.8` | `88px` | `88px` — one notch wider than Flat / Classic's `64px`. The wider scale is the breathing-room move. |
| `elevation.low.boxShadow` | `none` | `none` — magazine pages do not lift cards; only `high`/`overlay` carry warm-tinted shadows. |

## Often confused with

### vs [Newspaper / Broadsheet](./newspaper.md)

Newspaper is the dense, classifieds-and-front-page sibling: serif body (Georgia) at `0.9375rem / 1.4`, tighter `space.*` (`1: 3px`, `2: 6px`), heavier display weights (`900 / -0.03em`), cream-grey newsprint (`#e8e3d6`) with a stop-the-presses red. Editorial keeps a sans body, generous leading, wider `space.*`, lighter display weights, and a warmer cream paper with a terracotta accent — magazine spread, not broadsheet.

### vs [Academic](./academic.md)

Academic collapses `family.ui` and `family.display` onto the same Computer Modern serif stack — there is no sans face anywhere. Editorial keeps the magazine split: serif for `display`, sans (Inter) for body and chrome.

### vs [Wikipedia / Institutional](./wikipedia.md)

Wikipedia is the institutional sibling: clinical white surfaces, MediaWiki link-blue `#3366cc`, denser `0.875rem` body, hairline overlay rule. Editorial keeps warm paper, a terracotta accent, generous body leading, and the magazine `space.*` scale — designed to be read for minutes, not skimmed for facts.

### vs [Letterpress](./letterpress.md)

Letterpress commits to a paper-texture overlay and ink-on-fibre effects from the print engine. Editorial is a pure flat-engine palette — the warm paper is a colour swatch, not a texture; no `paperEdge*`, no ink-bleed, no overlay image.

## Where it thrives

- Long-form articles, essays, and feature spreads with serif headlines
- Drop-cap initial letters and pull-quotes — the terracotta accent reads naturally on body-quoted callouts
- Image-and-text editorial layouts where whitespace organises the page

## Where it degrades

- Dense data tables — the wide `space.*` scale wastes vertical room
- Multi-intent dashboards — every chromatic intent is muted earth-tone, hard to distinguish at a glance
- Marketing CTAs that want visual punch beyond a single terracotta — the palette refuses a second saturated colour

## Recall aliases

`editorial`, `magazine`, `magazine layout`, `long form`, `long-form`, `print editorial`

## Long-form notes

<details>
<summary>From <code>palettes/editorial.README.md</code></summary>

# Editorial

Flat engine reading like a magazine. Warm paper background
(`#f7f1e3`), ink-black body (`#1e170d`), restrained terracotta accent
(`#a13b1a`) used as the only saturated color in the palette. Display
family is `"Playfair Display"` / Times / Georgia serif at large sizes;
UI/body stays sans for column density.

`space.*` widens one notch from Flat / Classic (`1 → 6px`, `4 → 22px`,
`8 → 88px`) to give the serif type the breathing room it expects.
Elevation collapses to `none` for every slot except `high` and
`overlay`, which carry a soft warm-tinted drop shadow — magazine layouts
don't lift card-on-page; the bigger headlines and asymmetric whitespace
do that work.

**A11y:** `pass`. Body text (`#1e170d` on `#f7f1e3`) measures ≈ 16:1
— AAA at default. The terracotta `primary` background `#a13b1a` with
warm `inverse` `#fdf8ec` content sits at ≈ 6.3:1 (AA at body text, AAA
at large text). `success` `#3f5b2a` + inverse ≈ 8.2:1; `info` `#1f4b6e`
+ inverse ≈ 8.9:1. `content.muted` `#7a6a4f` on `base` ≈ 4.6:1, OK as
decorative meta text.

</details>

---

_Generated from `palettes/editorial.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
