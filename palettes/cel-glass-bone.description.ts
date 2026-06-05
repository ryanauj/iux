import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'cel-glass-bone',
  tagline:
    'The warm, beige-ground register of the cel-glass engine — frosted white panels on a bone/ivory paper, cut with a burnt-clay terracotta cel line.',
  summary:
    'Cel-Glass (Bone) is the warm member of the cel-glass light-ground set. It keeps the ground neutral — a bone / ivory ' +
    'paper (`surface.base = #f3ecdf`) — and moves the colour into the highlight: the cel line is a burnt-clay terracotta ' +
    '(`effect.outline.color = #b45309`) drawn around every pane and control. `surface.raised` is translucent white at 0.6 ' +
    'alpha frosted by `backdrop-filter`, and `elevation.*` tints the hard cel offset clay (`effect.shadowStyle = hard`). ' +
    'Dark warm-ink content on the bone ground clears AA, so it ships `a11y: pass`.',
  origin:
    'The warm, paper-stock reading of the glassmorphism × cel-shaded cross — a frosted glass panel laid on an ivory sheet ' +
    'with a single earthy outline colour. Where Mist is a cool app surface, Bone reads like a craft / editorial register: ' +
    'warm paper with terracotta line-art.',
  signatures: [
    {
      label: 'Warm bone / ivory ground with the colour in the cel line',
      detail:
        '`surface.base = #f3ecdf` and translucent white panels; the saturation lives in `effect.outline.color = #b45309`, the clay line wrapping every pane and control — the same light-ground inversion as Mist, tuned warm.',
    },
    {
      label: 'Burnt-clay terracotta cel line (`effect.outline.color = #b45309`, 2px)',
      detail:
        'Painted as a literal `outline:` halo on controls, with every `color.border.*` and `intent.*.border` resolving to it, so the cel edge is a uniform clay while the fill carries intent.',
    },
    {
      label: 'Frosted glass over warm paper',
      detail:
        '`surface.raised = rgba(255,255,255,0.6)` plus `effect.backdropBlur.md = blur(14px)`; over a textured host the panes frost, over the bone ground it is a soft lift.',
    },
    {
      label: 'Clay-tinted hard cel offset in `elevation.*`',
      detail:
        '`elevation.low = inset 0 1px 0 rgba(255,255,255,0.7), 2px 2px 0 rgba(180,83,9,0.16)` — a glass highlight over an unblurred clay offset. `effect.shadowStyle = hard`.',
    },
  ],
  antiSignatures: [
    'A saturated or dark page ground (that would be Frost / Noir / Sunset)',
    'A cool white ground or a teal/violet line (those are the Mist / Orchid siblings)',
    'A near-black ink cel line (Bone\'s line is burnt clay)',
    'Soft borderless glass panels (that is the glassmorphism family; Bone always draws the clay cel edge)',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.base',
      note: '`#f3ecdf` — the warm bone / ivory ground that distinguishes Bone from the cool Mist and Orchid.',
    },
    {
      path: 'effect.outline.color',
      note: '`#b45309` — the burnt-clay cel line carrying the palette\'s colour. The glass family uses `transparent` here.',
    },
    {
      path: 'color.content.primary',
      note: '`#2a1f10` — dark warm ink on the bone ground; the reason this register clears AA and ships `a11y: pass`.',
    },
    {
      path: 'effect.backdropBlur.md',
      note: '`blur(14px)` — the frost the engine applies to raised surfaces over a textured host.',
    },
    {
      path: 'effect.shadowStyle',
      note: '`hard` — the unblurred clay-tinted offset baked into `elevation.*`.',
    },
  ],
  lookalikes: [
    {
      against: 'cel-glass-mist',
      differentiator:
        'Mist and Bone are the cool and warm members of the same light-ground set — both near-white grounds with a coloured cel line and `a11y: pass`. Mist is cool (white ground, teal line); Bone is warm (bone/ivory ground, terracotta line). Same engine and formula, opposite temperature.',
    },
    {
      against: 'cardstock-layered',
      differentiator:
        'Cardstock-Layered is also a warm-paper register, but it is opaque craft cardstock with layered soft shadows and no backdrop blur. Bone is translucent frosted glass with a hard clay cel outline — the paper is the ground, not the material of the panel.',
    },
    {
      against: 'cel-glass-sunset',
      differentiator:
        'Both are warm cel-glass registers, but opposite in figure/ground. Sunset saturates the GROUND (hot magenta host) and inks the line near-black, shipping `a11y: experimental`. Bone keeps the ground neutral ivory and saturates the LINE (clay), shipping `a11y: pass`.',
    },
  ],
  thrivesWith: [
    'Editorial and reading layouts — warm paper ground with a single earthy line-art colour',
    'Cards, Modals, Toasts — the clay cel line gives translucent panes a warm, legible edge',
    'Marketing pages over a warm photo — the blur frosts the host while the paper ground stays calm',
  ],
  degradesWith: [
    'Cool-toned product UIs — the warm clay line can fight a cool brand',
    'Dense Tables — a clay line on every row reads busy',
  ],
  recallAliases: ['cel-glass bone', 'cel glass bone', 'beige cel glass', 'ivory cel glass', 'clay glass anime', 'warm cel glass light'],
}
