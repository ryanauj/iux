import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'cel-glass-mist',
  tagline:
    'The cool, light-ground register of the cel-glass engine — frosted white panels on a near-white ground, cut with a saturated teal cel line instead of the usual ink.',
  summary:
    'Cel-Glass (Mist) inverts the cel-glass formula: where Frost / Noir / Sunset frost panes over a saturated or dark host, ' +
    'Mist uses a cool near-white ground (`surface.base = #f6f9fc`) and moves the colour into the highlight — the cel line ' +
    'itself is a saturated teal (`effect.outline.color = #0e7490`) drawn around every pane and control. `surface.raised` ' +
    'stays translucent white at 0.62 alpha so the engine\'s `backdrop-filter` frost still reads over a textured backdrop, ' +
    'and `elevation.*` tints the hard cel offset teal (`effect.shadowStyle = hard`). Dark ink content on the pale ground ' +
    'clears AA, so it ships `a11y: pass`.',
  origin:
    'The airy, daylight reading of the glassmorphism × cel-shaded cross. Where the saturated-host registers feel like a HUD ' +
    'over a scene, the light-ground set reads like a clean app surface — a white sheet with a single bright outline colour, ' +
    'the look of a colour-coded notebook tab or a line-art UI.',
  signatures: [
    {
      label: 'Near-white ground with the colour in the cel line, not the surface',
      detail:
        '`surface.base = #f6f9fc` and translucent white panels; the saturation lives entirely in `effect.outline.color = #0e7490`, the teal line wrapping every pane and control. This is the inversion that separates the light-ground set from Frost/Noir/Sunset.',
    },
    {
      label: 'Saturated teal cel line (`effect.outline.color = #0e7490`, 2px)',
      detail:
        'The engine paints the teal as a literal `outline:` halo on controls, and every `color.border.*` plus `intent.*.border` resolves to it, so the cel edge is uniform teal while the fill still communicates intent.',
    },
    {
      label: 'Frosted glass that survives a textured backdrop',
      detail:
        '`surface.raised = rgba(255,255,255,0.62)` plus `effect.backdropBlur.md = blur(14px)` — over the palette\'s own pale ground the blur is a soft lift, but over a photo or gradient host the panes genuinely frost.',
    },
    {
      label: 'Teal-tinted hard cel offset in `elevation.*`',
      detail:
        '`elevation.low = inset 0 1px 0 rgba(255,255,255,0.7), 2px 2px 0 rgba(14,116,144,0.16)` — a white glass highlight over an unblurred teal offset, so the "shadow" reads as a colour echo rather than grey weight. `effect.shadowStyle = hard`.',
    },
  ],
  antiSignatures: [
    'A saturated or dark page ground (that would be Frost / Noir / Sunset — Mist keeps the ground near-white)',
    'A near-black ink cel line (Mist\'s line is saturated teal; the ink-line registers are the saturated-host ones)',
    'Soft borderless glass panels (that is the glassmorphism family; Mist always draws the teal cel edge)',
    'Opaque flat fills with no blur (that would be plain cel-shaded)',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.base',
      note: '`#f6f9fc` — the cool near-white ground. The saturated-host registers use a coloured or dark base here.',
    },
    {
      path: 'effect.outline.color',
      note: '`#0e7490` — the teal cel line that carries the palette\'s colour. Frost uses near-black ink; the glass family uses `transparent`.',
    },
    {
      path: 'color.content.primary',
      note: '`#0f1b2a` — dark ink on the pale ground, the reason this register clears AA and ships `a11y: pass`.',
    },
    {
      path: 'effect.backdropBlur.md',
      note: '`blur(14px)` — the frost the engine still applies to raised surfaces, subtle over the pale ground.',
    },
    {
      path: 'effect.shadowStyle',
      note: '`hard` — the unblurred teal-tinted offset baked into `elevation.*`, alongside the glass top-highlight.',
    },
  ],
  lookalikes: [
    {
      against: 'cel-glass-frost',
      differentiator:
        'Frost and Mist are both cool cel-glass registers, but opposite in figure/ground. Frost saturates the GROUND (aqua host) and inks the line near-black; Mist keeps the ground near-white and saturates the LINE (teal). Frost is `a11y: experimental` (backdrop-dependent), Mist is `a11y: pass` (dark ink on a light ground).',
    },
    {
      against: 'glassmorphism',
      differentiator:
        'Glassmorphism is the pure-glass parent — translucent panels and blur, but soft hairline-white borders (`effect.outline.width = 0`). Mist adds the cel half as a hard 2px teal line on every pane and control, and grounds it on near-white rather than a saturated host.',
    },
    {
      against: 'cel-glass-orchid',
      differentiator:
        'Orchid is the violet sibling in the identical light-ground set — same near-white ground and `a11y: pass`, but the highlight line is `#7c3aed` violet rather than `#0e7490` teal, on a faintly cooler-greige base. Same engine and formula, different highlight hue.',
    },
  ],
  thrivesWith: [
    'Dashboards and app shells — a clean white sheet with a single colour-coded outline reads calm and legible',
    'Cards, Modals, Tabs — the teal cel line gives translucent panes a crisp, accessible boundary',
    'Forms — dark ink on light panes keeps inputs readable while the teal focus/line guides the eye',
  ],
  degradesWith: [
    'Pure-white flat backdrops with no texture — the backdrop-filter has nothing to frost',
    'Dense Tables — a teal line on every row can read busy at high density',
  ],
  recallAliases: ['cel-glass mist', 'cel glass mist', 'light cel glass', 'white cel glass', 'teal glass anime', 'cel glass light'],
}
