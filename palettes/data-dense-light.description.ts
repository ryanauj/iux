import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'data-dense-light',
  tagline:
    'The Tufte register — cool near-white field, ink-slate body, hairline inset elevation, sparkline-ready type scale at 11/12/14 px, desaturated intents that read as data not decoration.',
  summary:
    'Data-dense light is Financial Terminal\'s friendlier cousin: same density stance, inverted to a cool near-white field. `surface.base` is `#fcfcfd`, `surface.raised` is full white, so a Card reads as "the field, framed" rather than "a chip lifted off the field" — Tufte\'s instruction that the data is the figure and the chrome is the ground. ' +
    '`content.primary` is ink slate `#0e131a`, tilted slightly cool to match the surface, sitting at ≈ 18.6:1 even at the 11-px caption. Every intent fill is one or two steps off vivid — restrained indigo, teal-blue info, forest success, umber warning, brick danger — so categorical color in a chart reads as data, not as decoration. Elevation is inset hairline rules at every slot except `overlay`, which adds a single soft drop shadow so modals still separate from the field.',
  origin:
    'The data-visualisation register codified by Edward Tufte\'s "The Visual Display of Quantitative Information" (1983) and its successors — small multiples, sparklines, hairline rules, no chartjunk, non-data ink as wasted ink. This palette is the Tufte instruction applied to a flat-engine UI: chrome stays out of the data\'s way.',
  signatures: [
    {
      label: 'Cool near-white `surface.base` (`#fcfcfd`) with white `raised`',
      detail:
        '`surface.base` is `#fcfcfd` (a near-white cool grey) and `surface.raised` is `#ffffff`. The two are close enough that a Card reads as "the field, framed" rather than as "a chip lifted off the field." This is Tufte\'s figure-ground instruction in tokens.',
    },
    {
      label: 'Sparkline-ready type scale: 14/12/11 px',
      detail:
        '`role.body` is 0.875rem (14 px), `role.label` is 0.75rem (12 px), `role.caption` is 0.6875rem (11 px). Tight enough that a row of small-multiples each carries a legible tick label without palette-specific chart overrides. The type scale densifies, not the space scale — `space.*` stays at the Flat default.',
    },
    {
      label: 'Inset hairline `elevation.*`, no faked light',
      detail:
        '`elevation.low`/`medium` are pure `inset 0 0 0 1px` rules at `#eef0f3` / `#d8dce2`. `high` adds a 1px / 0.04 alpha drop, `overlay` adds an 8px / 0.10 drop so modals separate from the field. The Tufte register doesn\'t fake light sources; surfaces are distinguished by ruled borders, the way a printed table is.',
    },
    {
      label: 'Desaturated categorical intent set',
      detail:
        '`intent.primary` is restrained indigo `#2549a8`; `info` is teal-blue `#1d6b87`; `success` is forest `#1f6b3a`; `warning` is umber `#8a5a0d`; `danger` is brick `#a32424`. Every fill is one or two steps off vivid so the same swatches can be reused as categorical color in a chart without reading as decoration.',
    },
    {
      label: 'Indigo identity unified across `link`, `primary`, and `focus`',
      detail:
        '`content.link`, `intent.primary.bg`, and `border.focus` all share `#2549a8`. The link colour and the primary action share one identity, and the focus ring is the same hue — the Tufte register prefers one accent doing all three jobs rather than three competing accents.',
    },
    {
      label: 'Hairline radius (`0`/`0`/`2px`/`4px`)',
      detail:
        '`radius.none` is `0`, `sm` is `0`, `md` is `2px`, `lg` is `4px`. The data wants rectangular cells, not rounded chips. `pill`/`full` still resolve to 999px/9999px for components that explicitly opt into a pill chip.',
    },
  ],
  antiSignatures: [
    'Decorative overlay on the root — `effect.overlay.image` is `none`; non-data ink is wasted ink',
    'Drop-shadow elevation on `low`/`medium` (this palette uses inset hairlines)',
    'Saturated, vivid intent fills — categorical color in a chart should read as data, not as decoration',
    'Three competing accent hues for `link` / `primary` / `focus` — this palette unifies them on one indigo',
    'Large body type (>= 1rem) — the sparkline-ready 14 px body is part of the contract',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.base',
      note: 'Cool near-white `#fcfcfd` — the Tufte field, close to `raised` so cards do not "lift."',
    },
    {
      path: 'color.surface.raised',
      note: 'Full white `#ffffff` — the field framed, not a chip floated.',
    },
    {
      path: 'color.content.primary',
      note: 'Ink slate `#0e131a` — almost black, tilted cool to match the surface. ≈ 18.6:1 even at 11-px caption.',
    },
    {
      path: 'color.intent.primary.bg',
      note: 'Restrained indigo `#2549a8` — one or two steps off vivid, reused as `content.link` and `border.focus`.',
    },
    {
      path: 'elevation.low.boxShadow',
      note: '`inset 0 0 0 1px #eef0f3` — hairline rule, no drop shadow. Tufte\'s ruled-table elevation.',
    },
    {
      path: 'typography.role.body.size',
      note: '0.875rem (14 px) — the sparkline-ready body size. `label` 12 px, `caption` 11 px round out the dense scale.',
    },
    {
      path: 'typography.family.mono',
      note: 'IBM Plex Mono — ships tabular figures by default; currency and percent columns align without per-column hacks.',
    },
    {
      path: 'effect.overlay.image',
      note: '`none` — Tufte\'s instruction that non-data ink is wasted ink.',
    },
  ],
  lookalikes: [
    {
      against: 'financial-terminal',
      differentiator:
        'Financial Terminal is the same density stance inverted: amber phosphor on black, mono-uppercase labels, P&L green/red, every radius `0`. Data-dense light keeps the density but commits to the opposite end of the brightness axis — cool near-white field, ink slate body, desaturated polychrome intents, hairline `md`/`lg` radius. Both thrive on long Tables; only this one survives long-form reading.',
    },
    {
      against: 'wikipedia',
      differentiator:
        'Wikipedia is a near-paper editorial register with a serif/sans body mix and no elevation at all. Data-dense light keeps elevation (as inset hairlines and a single shadow at `overlay`) and runs an all-sans Inter stack at the sparkline-ready 14/12/11 px scale — purpose-built for charts and tables, not for article prose.',
    },
    {
      against: 'academic',
      differentiator:
        'Academic is the journal-paper register — serif body, generous leading, footnote-tight margins, no chartjunk by default. Data-dense light is the Tufte register specifically for screens: sans throughout, hairline rules, small-multiples-ready type sizes, indigo `link`/`primary` unified.',
    },
    {
      against: 'flat-classic',
      differentiator:
        'Flat/Classic uses soft gaussian drop shadows for elevation and runs body at 1rem on a `system-ui` stack. Data-dense light replaces those drop shadows with inset hairlines, drops body to 14 px, and tightens the intent set toward chart-grade desaturation.',
    },
  ],
  thrivesWith: [
    'Tables with dense numeric columns — IBM Plex Mono\'s tabular figures align without per-column width hacks',
    'Small-multiples chart grids — the 11-px caption is the sparkline tick-label size',
    'Long-form data dashboards — desaturated polychrome intents reuse as categorical color',
  ],
  degradesWith: [
    'Modal / Dialog containment — README flags this; near-white `base` with full-white `overlay` plus a 0.42 scrim drops the field to roughly the same lightness as the panel, so the panel does not "lift" — components must rely on edge, not on darken',
    'Marketing or branded compositions — the deliberate restraint reads as utilitarian rather than expressive',
  ],
  recallAliases: ['data-dense', 'data dense', 'data dense light', 'tufte', 'dense light'],
}
