import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'cel-glass-orchid',
  tagline:
    'The violet, light-ground register of the cel-glass engine — frosted white panels on a pale greige ground, cut with a saturated violet cel line.',
  summary:
    'Cel-Glass (Orchid) is the violet member of the cel-glass light-ground set. It keeps the ground a soft near-white ' +
    '(`surface.base = #f8f6fc`, a faint cool-greige) and moves the colour into the highlight: the cel line is a saturated ' +
    'violet (`effect.outline.color = #7c3aed`) drawn around every pane and control. `surface.raised` is translucent white ' +
    'at 0.62 alpha frosted by `backdrop-filter`, and `elevation.*` tints the hard cel offset violet ' +
    '(`effect.shadowStyle = hard`). Dark ink content on the pale ground clears AA, so it ships `a11y: pass`.',
  origin:
    'The jewel-toned reading of the glassmorphism × cel-shaded cross on a light ground — a clean pale sheet with a single ' +
    'vivid violet outline, the look of a creative-tool or design-app surface that wants one confident accent.',
  signatures: [
    {
      label: 'Pale greige ground with the colour in the cel line',
      detail:
        '`surface.base = #f8f6fc` and translucent white panels; the saturation lives in `effect.outline.color = #7c3aed`, the violet line wrapping every pane and control — the light-ground inversion shared with Mist and Bone.',
    },
    {
      label: 'Saturated violet cel line (`effect.outline.color = #7c3aed`, 2px)',
      detail:
        'Painted as a literal `outline:` halo on controls, with every `color.border.*` and `intent.*.border` resolving to it, so the cel edge is a uniform violet while the fill carries intent.',
    },
    {
      label: 'Frosted glass on a pale ground',
      detail:
        '`surface.raised = rgba(255,255,255,0.62)` plus `effect.backdropBlur.md = blur(14px)`; over a textured host the panes frost, over the pale ground it is a soft lift.',
    },
    {
      label: 'Violet-tinted hard cel offset in `elevation.*`',
      detail:
        '`elevation.low = inset 0 1px 0 rgba(255,255,255,0.7), 2px 2px 0 rgba(124,58,237,0.16)` — a glass highlight over an unblurred violet offset. `effect.shadowStyle = hard`.',
    },
  ],
  antiSignatures: [
    'A saturated or dark page ground (that would be Frost / Noir / Sunset)',
    'A teal or clay line (those are the Mist / Bone siblings; Orchid\'s line is violet)',
    'A near-black ink cel line (Orchid\'s line is saturated violet)',
    'Soft borderless glass panels (that is the glassmorphism family; Orchid always draws the violet cel edge)',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.base',
      note: '`#f8f6fc` — the pale cool-greige ground. The saturated-host registers use a coloured or dark base here.',
    },
    {
      path: 'effect.outline.color',
      note: '`#7c3aed` — the violet cel line carrying the palette\'s colour. Mist uses teal, Bone uses clay; the glass family uses `transparent`.',
    },
    {
      path: 'color.content.primary',
      note: '`#1f1430` — dark ink on the pale ground; the reason this register clears AA and ships `a11y: pass`.',
    },
    {
      path: 'effect.backdropBlur.md',
      note: '`blur(14px)` — the frost the engine applies to raised surfaces over a textured host.',
    },
    {
      path: 'effect.shadowStyle',
      note: '`hard` — the unblurred violet-tinted offset baked into `elevation.*`.',
    },
  ],
  lookalikes: [
    {
      against: 'cel-glass-mist',
      differentiator:
        'Mist and Orchid are both cool light-ground cel-glass registers with `a11y: pass` — near-white ground, coloured cel line. The only real difference is the highlight hue: Mist is teal `#0e7490`, Orchid is violet `#7c3aed`, on a faintly warmer-violet base. Same engine and formula, different accent.',
    },
    {
      against: 'glassmorphism',
      differentiator:
        'Glassmorphism is the pure-glass parent — translucent panels and blur with soft hairline-white borders (`effect.outline.width = 0`). Orchid adds the cel half as a hard 2px violet line on every pane and control, grounded on a pale neutral rather than a saturated host.',
    },
    {
      against: 'soft-pastel',
      differentiator:
        'Soft-Pastel is a light, playful flat register with soft fills and no hard outline or backdrop blur. Orchid is frosted glass with a single saturated violet cel line — the colour is concentrated in the outline, not spread across pastel surfaces.',
    },
  ],
  thrivesWith: [
    'Creative / design tools — a pale sheet with one confident violet accent line',
    'Cards, Modals, Tabs — the violet cel line gives translucent panes a crisp, accessible edge',
    'Onboarding and marketing surfaces — the violet reads premium against the calm ground',
  ],
  degradesWith: [
    'Pure-white flat backdrops with no texture — the backdrop-filter has nothing to frost',
    'Dense Tables — a violet line on every row reads busy',
  ],
  recallAliases: ['cel-glass orchid', 'cel glass orchid', 'violet cel glass', 'purple cel glass', 'orchid glass anime', 'light cel glass violet'],
}
