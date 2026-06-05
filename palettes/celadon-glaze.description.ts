import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'celadon-glaze',
  tagline:
    'The glazed-porcelain register on the Claymorphism engine — pale jade celadon field, inflated puffy surfaces under a wet-glaze sheen, and soft kiln-fired intents.',
  summary:
    'Celadon Glaze is a Song-dynasty kiln rendered as a palette. `surface.base` is a misty jade green-white ' +
    '`#e7f0ea`, `content.primary` a deep glaze green `#1f3a2e`, and the Claymorphism engine\'s inflated radii and ' +
    'doubled inner-highlight / outer-drop shadows make every surface read as thrown clay under a translucent ' +
    'celadon glaze. The intents are pulled from the same firing: a soft celadon primary, mint success, glaze-' +
    'yellow warning, persimmon danger, porcelain blue info — all the muted, slightly-translucent colours of a ' +
    'reduction-fired pot. Ships `experimental`: the pastel glaze fills are tuned for the wet 3D look, not AA body ' +
    'text.',
  origin:
    'Celadon ware — Chinese Longquan and Korean Goryeo porcelain glazed in a pale jade-green that pools darker in ' +
    'the recesses. The register is the ceramic answer to the candy-coloured base Claymorphism: same inflated, ' +
    'puffy 3D, but a single tonal jade family with a glaze sheen instead of bright gumdrop pastels.',
  signatures: [
    {
      label: 'Pale jade celadon field that pools in the recesses',
      detail:
        '`surface.base` `#e7f0ea` over a deep `content.primary` `#1f3a2e`. Celadon glaze is defined by the way the green deepens where it pools — the surface-to-ink gradient mimics that.',
    },
    {
      label: 'Inflated puffy surfaces with a wet-glaze sheen',
      detail:
        '`radius` runs large (`md = 22px`, `lg = 30px`) and `elevation.*` packs a doubled inset-highlight / outer-drop stack — the soft, glossy, thrown-clay look of a glazed pot.',
    },
    {
      label: 'Muted reduction-fired intent set',
      detail:
        'Celadon, mint, glaze-yellow, persimmon, porcelain blue — every intent is a soft, faintly-translucent kiln colour, not a saturated gumdrop.',
    },
    {
      label: 'Soft rounded display sans',
      detail:
        '`typography.family.display` is a Quicksand/Varela-Round geometric with rounded terminals — the smooth, hand-turned feel of ceramic rather than sharp print type.',
    },
  ],
  antiSignatures: [
    'Bright candy-gumdrop pastels — celadon is a single muted jade family',
    'Flat or hard-edged surfaces — the engine\'s puffy inflation is structural',
    'A cool blue-grey or warm cream field — the field is specifically jade green',
    'Sharp, square corners — glazed ware is rounded and inflated',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Misty jade `#e7f0ea` — the celadon field.' },
    { path: 'color.intent.primary.bg', note: 'Soft celadon `#8cc3a6` — a muted glaze, not a bright pastel.' },
    { path: 'radius.lg', note: '`30px` — inflated, hand-turned rounding.' },
    { path: 'elevation.medium.boxShadow', note: 'Doubled inset-highlight / outer-drop — the wet-glaze sheen.' },
  ],
  lookalikes: [
    {
      against: 'claymorphism',
      differentiator:
        'Same Claymorphism engine — inflated radii, doubled puffy shadows. Base Claymorphism is a violet field with bright candy-gumdrop intents across every hue. Celadon Glaze narrows that to one ceramic story: a jade-green field and muted reduction-fired glaze colours, so it reads as porcelain rather than plastic.',
    },
    {
      against: 'sage-studio',
      differentiator:
        'Both lean green and calm. Sage Studio is a flat, botanical wellness light — bone field, sage primary, no dimensional depth. Celadon Glaze is dimensional ceramic: the Claymorphism engine inflates every surface into a glazed pot, where Sage Studio stays paper-flat.',
    },
  ],
  recallAliases: ['celadon', 'celadon glaze', 'porcelain', 'ceramic', 'jade glaze', 'glaze'],
}
