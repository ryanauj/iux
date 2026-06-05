import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'cel-glass-frost',
  tagline:
    'The cool, light register of the cel-glass engine — frosted translucent white panels over an aqua host, each cut with a hard near-black cel ink line.',
  summary:
    'Cel-Glass (Frost) is the canonical register of the `cel-glass` engine, a deliberate mix of glassmorphism and ' +
    'cel-shading. `surface.raised` is white at 0.42 alpha and the engine frosts it with `backdrop-filter: blur(14px)` ' +
    '(`effect.backdropBlur.md`), so the cool aqua host (`surface.base = #5ea9cf`) shows through — but every panel and ' +
    'control is wrapped in a 2px near-black ink line (`effect.outline.color = #0b1622`). `elevation.*` blends both: an ' +
    'inset white top-highlight (glass) over a hard-offset ink block with no blur (cel, `effect.shadowStyle = hard`).',
  origin:
    'A synthesis of two named UI registers: glassmorphism (frosted translucent panels, Apple/Microsoft circa 2013–2020) ' +
    'and cel-shaded anime, which resolves a subject against its background with a hard ink line. Frost is the cool, icy ' +
    'reading of the cross — the look of a glass HUD overlay drawn in a cel-animation style.',
  signatures: [
    {
      label: 'Frosted translucent panels (alpha surfaces + `backdrop-filter`)',
      detail:
        '`surface.raised = rgba(255,255,255,0.42)`, `surface.overlay = rgba(255,255,255,0.58)`; the engine applies `effect.backdropBlur.md = blur(14px)` to every raised / overlay-class surface so the aqua host blurs through. This is the glass half of the mix.',
    },
    {
      label: 'Hard 2px near-black cel ink line on every panel and control',
      detail:
        '`effect.outline.color = #0b1622`, `effect.outline.width = 2px` — the engine paints a literal `outline:` halo on interactive controls and every `color.border.*` resolves to the same ink, so each frosted pane has a crisp graphic boundary. This is the cel half of the mix.',
    },
    {
      label: 'Hybrid `elevation.*` — inset glass highlight over a hard cel block',
      detail:
        '`elevation.low = inset 0 1px 0 rgba(255,255,255,0.55), 2px 2px 0 rgba(11,22,34,0.16)` — a white refraction catch stacked on an unblurred ink offset. `effect.shadowStyle = hard` records that the offset reads as a cel shadow, not a soft glass one.',
    },
    {
      label: 'Cool aqua host with a cyan/mint/sky intent triad at high alpha',
      detail:
        '`surface.base = #5ea9cf`; intents are cyan primary, mint success, sky info held near 0.92 alpha so the fills stay legible cels over the frost. Every `intent.*.border` is the cel ink so intent changes never change the outline.',
    },
  ],
  antiSignatures: [
    'Opaque flat fills (that would be plain cel-shaded — Frost\'s surfaces all carry alpha and frost)',
    'A transparent or zero-width outline (defeats the cel half — glass-only registers set `effect.outline.width = 0`)',
    'Soft hairline-white glass borders with no ink (that is the glassmorphism family; Frost outlines in near-black)',
    'A warm or dark host (that would be the Sunset or Noir register of the same engine)',
  ],
  tokenEvidence: [
    {
      path: 'effect.outline.color',
      note: '`#0b1622` — the near-black cel line the engine paints on every control. The glassmorphism family returns `transparent` here.',
    },
    {
      path: 'effect.backdropBlur.md',
      note: '`blur(14px)` — the frost the engine applies to raised surfaces. Plain cel-shaded returns `none`.',
    },
    {
      path: 'color.surface.raised',
      note: '`rgba(255,255,255,0.42)` — translucent white; the alpha is what lets the blur show the host through.',
    },
    {
      path: 'effect.shadowStyle',
      note: '`hard` — documents the unblurred cel offset baked into `elevation.*`, alongside the glass top-highlight.',
    },
    {
      path: 'color.surface.base',
      note: '`#5ea9cf` — the cool aqua host that reads through the frosted panels.',
    },
  ],
  lookalikes: [
    {
      against: 'glassmorphism',
      differentiator:
        'Glassmorphism is the pure-glass parent: same translucent panels and backdrop blur, but its borders are soft hairline whites (`effect.outline.width = 0`). Frost adds the cel half — a hard 2px near-black ink line on every panel and control — so the frosted panes have a graphic boundary glassmorphism never draws.',
    },
    {
      against: 'cel-shaded-shonen',
      differentiator:
        'Shonen is the pure-cel parent: same hard ink outline and `shadowStyle: hard`, but its surfaces are opaque flat fills with no blur (`effect.backdropBlur` is all `none`). Frost makes every surface translucent and frosts it, so the ink line wraps a see-through pane rather than a solid cel.',
    },
    {
      against: 'cel-glass-noir',
      differentiator:
        'Noir is the dark sibling on the identical engine. Frost is light and cool — aqua host, near-black ink line. Noir inverts onto a midnight host and flips the cel line to a bright near-white edge so it shows on smoked glass.',
    },
  ],
  thrivesWith: [
    'Cards, Modals, Drawers, Toasts — frosted panes with a crisp ink boundary read as floating glass cels',
    'Buttons, Toggles, Tabs — the outline halo gives translucent controls an unambiguous edge',
    'Dashboards over a photo or gradient backdrop — the blur has something worth frosting',
  ],
  degradesWith: [
    'Dense Tables — an ink line on every translucent row reads busy',
    'Pure-white or flat backdrops — the backdrop-filter has nothing to frost and the glass read collapses',
  ],
  recallAliases: ['cel-glass frost', 'cel glass frost', 'cel-glass', 'cel glass', 'frosted cel', 'glass anime', 'ink glass'],
}
