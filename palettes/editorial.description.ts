import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'editorial',
  tagline:
    'Magazine register on the flat engine — warm paper field, ink-black body, serif `display`, a single restrained terracotta accent, and a one-notch-wider space scale that gives long-form serif type the breathing room it expects.',
  summary:
    'Editorial is the flat engine tuned to a print-magazine voice. `surface.base` is warm paper (`#f7f1e3`), ' +
    '`content.primary` is ink-black (`#1e170d`), and a restrained terracotta (`#a13b1a`) carries `intent.primary`, ' +
    '`content.link`, and `border.focus` — the only saturated colour on the page. `typography.family.display` is ' +
    'Playfair / Times / Georgia serif at large sizes, while `family.ui` stays sans for column density. The space ' +
    'scale widens one notch from Flat / Classic (`space.4: \'22px\'`, `space.8: \'88px\'`) so the serif type has ' +
    'magazine breathing room, and elevation collapses to `none` everywhere except `high`/`overlay` — magazine ' +
    'layouts lift with headlines and whitespace, not with cards.',
  origin:
    'Mid-century and contemporary print-magazine art direction (The New Yorker, Harper\'s, the long-form essay ' +
    'spread) where serif display, generous leading, and a single restrained accent organise a page that wants to ' +
    'be read for minutes rather than scanned for seconds.',
  signatures: [
    {
      label: 'Warm paper `surface.base` (`#f7f1e3`) with ink-black body',
      detail:
        '`surface.base` is `#f7f1e3` — cream-paper, not white. `content.primary` is `#1e170d` (ink-black, not pure `#000`). The pairing measures ~16:1, AAA at default body size, and reads as offset-printed magazine stock rather than screen UI.',
    },
    {
      label: 'Single terracotta accent (`#a13b1a`) doing triple duty',
      detail:
        '`intent.primary.bg`, `color.content.link`, and `border.focus` all share `#a13b1a`. Every other intent stays earth-toned (`success` `#3f5b2a`, `warning` `#a36b00`, `info` `#1f4b6e`) so the terracotta remains the only attention colour on the page.',
    },
    {
      label: 'Serif `display` family with sans body',
      detail:
        '`typography.family.display` is `"Playfair Display", "Times New Roman", Georgia, serif`. `family.ui` (used by `body`, `label`, `caption`) stays Inter / Helvetica Neue. Headlines wear serif; running text and chrome wear sans — the magazine convention.',
    },
    {
      label: 'Wide `space.*` scale + generous body leading',
      detail:
        '`space.4: \'22px\'`, `space.7: \'64px\'`, `space.8: \'88px\'` — one notch wider than Flat / Classic at every step. `role.body` runs at `1.0625rem` with `lineHeight 1.65` for the airy magazine setting (vs Newspaper\'s denser `0.9375rem / 1.4`).',
    },
    {
      label: 'Collapsed elevation with warm-tinted drop shadows only at `high`/`overlay`',
      detail:
        '`elevation.flat` / `low` / `medium` are all `boxShadow: \'none\'`. `high` carries `0 4px 12px rgba(30, 23, 13, 0.10)` and `overlay` `0 12px 32px rgba(30, 23, 13, 0.18)` — warm-tinted (note the `rgba(30, 23, 13, …)` ink rather than a neutral grey), used sparingly and only for genuine floating surfaces.',
    },
  ],
  antiSignatures: [
    'Pure white `surface.base` (defeats the warm-paper cue)',
    'A sans-serif `display` family — the serif headline is structural',
    'A second saturated accent competing with the terracotta',
    'Tight `space.*` or short body leading — Editorial cannot survive without the breathing room',
    'Soft drop shadows on `low`/`medium` — magazine layouts do not lift card-on-page',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.base',
      note: 'Warm paper `#f7f1e3` — the cream offset-stock cue. Compare Wikipedia\'s clinical `#ffffff`.',
    },
    {
      path: 'color.intent.primary.bg',
      note: 'Terracotta `#a13b1a` — the only saturated colour, reused at `border.focus` and `content.link`.',
    },
    {
      path: 'typography.family.display',
      note: '`"Playfair Display", "Times New Roman", Georgia, serif` — serif headlines on sans body.',
    },
    {
      path: 'typography.role.body.lineHeight',
      note: '`1.65` — magazine leading. Newspaper sits at `1.4` for column density; Wikipedia at `1.6`.',
    },
    {
      path: 'space.8',
      note: '`88px` — one notch wider than Flat / Classic\'s `64px`. The wider scale is the breathing-room move.',
    },
    {
      path: 'elevation.low.boxShadow',
      note: '`none` — magazine pages do not lift cards; only `high`/`overlay` carry warm-tinted shadows.',
    },
  ],
  lookalikes: [
    {
      against: 'newspaper',
      differentiator:
        'Newspaper is the dense, classifieds-and-front-page sibling: serif body (Georgia) at `0.9375rem / 1.4`, tighter `space.*` (`1: 3px`, `2: 6px`), heavier display weights (`900 / -0.03em`), cream-grey newsprint (`#e8e3d6`) with a stop-the-presses red. Editorial keeps a sans body, generous leading, wider `space.*`, lighter display weights, and a warmer cream paper with a terracotta accent — magazine spread, not broadsheet.',
    },
    {
      against: 'academic',
      differentiator:
        'Academic collapses `family.ui` and `family.display` onto the same Computer Modern serif stack — there is no sans face anywhere. Editorial keeps the magazine split: serif for `display`, sans (Inter) for body and chrome.',
    },
    {
      against: 'wikipedia',
      differentiator:
        'Wikipedia is the institutional sibling: clinical white surfaces, MediaWiki link-blue `#3366cc`, denser `0.875rem` body, hairline overlay rule. Editorial keeps warm paper, a terracotta accent, generous body leading, and the magazine `space.*` scale — designed to be read for minutes, not skimmed for facts.',
    },
    {
      against: 'letterpress',
      differentiator:
        'Letterpress commits to a paper-texture overlay and ink-on-fibre effects from the print engine. Editorial is a pure flat-engine palette — the warm paper is a colour swatch, not a texture; no `paperEdge*`, no ink-bleed, no overlay image.',
    },
  ],
  thrivesWith: [
    'Long-form articles, essays, and feature spreads with serif headlines',
    'Drop-cap initial letters and pull-quotes — the terracotta accent reads naturally on body-quoted callouts',
    'Image-and-text editorial layouts where whitespace organises the page',
  ],
  degradesWith: [
    'Dense data tables — the wide `space.*` scale wastes vertical room',
    'Multi-intent dashboards — every chromatic intent is muted earth-tone, hard to distinguish at a glance',
    'Marketing CTAs that want visual punch beyond a single terracotta — the palette refuses a second saturated colour',
  ],
  recallAliases: ['editorial', 'magazine', 'magazine layout', 'long form', 'long-form', 'print editorial'],
}
