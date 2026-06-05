import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'cel-glass-noir',
  tagline:
    'The dark, neon register of the cel-glass engine — smoked translucent panels over a midnight host, cut with a bright near-white cel line that inverts the usual ink.',
  summary:
    'Cel-Glass (Noir) is the dark register of the `cel-glass` engine, the same glassmorphism-meets-cel mix inverted onto ' +
    'a near-black host (`surface.base = #0c1018`). Surfaces are low-alpha whites (`surface.raised = rgba(255,255,255,0.07)`) ' +
    'frosted with `backdrop-filter` (`effect.backdropBlur.md = blur(12px)`). The defining move is the outline: a near-black ' +
    'ink line would vanish on a dark panel, so the cel "ink" flips to a bright near-white edge (`effect.outline.color = #e8f6ff`). ' +
    'Intents are neon cyan / mint / amber at high alpha so they glow against the smoked glass.',
  origin:
    'The night-mode reading of the glassmorphism × cel-shaded cross — a smoked-glass HUD drawn in a cel-animation style, the ' +
    'register cyberpunk and mecha anime use for cockpit overlays. Where Frost is an icy daylight panel, Noir is the lit edge ' +
    'of glass against a dark scene.',
  signatures: [
    {
      label: 'Inverted cel line — a bright near-white edge instead of ink',
      detail:
        '`effect.outline.color = #e8f6ff` at 2px, with `color.border.strong` pointing at the same value. On the midnight host a dark line would disappear, so the cel "ink" inverts to a light line — the engine paints whatever `--outline-color` resolves to.',
    },
    {
      label: 'Smoked translucent panels (low-alpha whites + `backdrop-filter`)',
      detail:
        '`surface.raised = rgba(255,255,255,0.07)` over `surface.base = #0c1018`, frosted by `effect.backdropBlur.md = blur(12px)`. The low alpha keeps the dark glass reading as glass rather than muddy grey.',
    },
    {
      label: 'Neon intent triad glowing over dark glass',
      detail:
        'Cyan primary `rgba(34,211,238,0.92)`, mint success, amber warning — all at high alpha so they read as lit cels against the smoked field. Every `intent.*.border` is the bright line so the outline stays uniform.',
    },
    {
      label: 'Hybrid `elevation.*` — inset glass highlight over a hard light block',
      detail:
        '`elevation.low = inset 0 1px 0 rgba(255,255,255,0.12), 2px 2px 0 rgba(232,246,255,0.14)` — a refraction catch over an unblurred light offset (the inverted cel shadow). `effect.shadowStyle = hard`.',
    },
  ],
  antiSignatures: [
    'A near-black ink outline (it would vanish on the dark host — Noir inverts the line to near-white)',
    'Opaque flat fills (that would be plain cel-shaded; Noir frosts every surface)',
    'A light or warm host (that would be the Frost or Sunset register of the same engine)',
    'Soft borderless glass panels (that is the glassmorphism family; Noir always draws the bright cel edge)',
  ],
  tokenEvidence: [
    {
      path: 'effect.outline.color',
      note: '`#e8f6ff` — the inverted, bright cel line. Frost and Sunset use near-black ink here; the glass family uses `transparent`.',
    },
    {
      path: 'color.surface.base',
      note: '`#0c1018` — the midnight host that forces the cel line to invert to light.',
    },
    {
      path: 'color.surface.raised',
      note: '`rgba(255,255,255,0.07)` — very low-alpha white; the smoked-glass fill over the dark base.',
    },
    {
      path: 'effect.backdropBlur.md',
      note: '`blur(12px)` — a softer frost than the light registers, since dark glass muddies at a higher radius.',
    },
    {
      path: 'effect.shadowStyle',
      note: '`hard` — the unblurred light offset baked into `elevation.*` reads as a cel shadow, not a soft glass one.',
    },
  ],
  lookalikes: [
    {
      against: 'liquid-glass-dark',
      differentiator:
        'Liquid Glass (Dark) is the pure dark-glass parent — same low-alpha whites over a near-black base and soft backdrop blur, but its edges are faint refraction-tinted hairlines (`effect.outline.width = 0`). Noir draws a hard, bright 2px cel line on every panel and control, giving the smoked glass a graphic outline liquid glass deliberately avoids.',
    },
    {
      against: 'cel-glass-frost',
      differentiator:
        'Frost is the light sibling on the identical engine — aqua host, near-black ink line. Noir inverts: a midnight host and a bright near-white cel edge so the line still shows on smoked glass. Same engine, opposite value polarity.',
    },
    {
      against: 'cyberpunk-neon-noir',
      differentiator:
        'Cyberpunk-Neon-Noir is a dark glass-engine palette too, but it leans on neon glow and deep saturation without a hard graphic outline on every element. Noir\'s identity is the always-present bright cel line wrapping each frosted panel, not the glow.',
    },
  ],
  thrivesWith: [
    'Modals, Drawers, Popovers over a dark scene — smoked panes with a lit cel edge read as a cockpit HUD',
    'Buttons, Toggles, Tabs — the bright outline halo gives dark translucent controls an unambiguous edge',
    'Dashboards over a dark photo or video backdrop — the blur has real depth to frost',
  ],
  degradesWith: [
    'Dense Tables — a bright line on every smoked row reads busy',
    'Light or flat backdrops — the dark glass has nothing to frost and the read collapses',
  ],
  recallAliases: ['cel-glass noir', 'cel glass noir', 'cel-glass dark', 'dark cel glass', 'neon glass anime', 'smoked cel glass'],
}
