import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'aurora-verdant',
  tagline:
    'The green register of the aurora-engine family — an emerald → teal → lime → cyan mesh drifting over a deep green-black host.',
  summary:
    'Aurora (Verdant) is the bio / eco-tech cousin of Nebula, Spectrum, and Ember. Same `aurora` engine and ' +
    '`surfaceBy: \'luminance\'` model — a four-radial `effect.atmosphereGradient` painted at the root and drifted over a 48s loop, ' +
    'translucent luminance-lift cards frosted by `backdrop-filter` — tuned to a verdant, growth palette. `surface.base` is a ' +
    'near-neutral green-black `#06120e` so the drifting mesh of emerald, teal, lime, and cyan supplies the chroma. The primary is ' +
    'emerald, info cyan, and the focus/accent a bright spring-green.',
  origin:
    'Original to the iux design system — a green dark register in the aurora-engine family. Verdant borrows from the green / teal ' +
    'gradients of climate-tech and bio / wellness product chrome.',
  signatures: [
    {
      label: 'Verdant four-radial drifting `effect.atmosphereGradient`',
      detail:
        'A stack of emerald `rgba(16,185,129,…)`, teal `rgba(20,184,166,…)`, lime `rgba(132,204,22,…)`, and cyan `rgba(34,211,238,…)` radials the engine drifts over a 48s loop.',
    },
    {
      label: '`surfaceBy: \'luminance\'` over a green-black floor',
      detail:
        'Shared with the rest of the aurora family: raised cards are translucent luminance lifts. `surface.base` `#06120e` is a green-biased near-black so the mesh carries the colour.',
    },
    {
      label: 'Emerald primary, spring-green focus, cyan info',
      detail:
        '`intent.primary.bg` is `#0d8f5f`, `border.focus` is `#34d399`, `intent.info.bg` is cyan `#1f7fa8`, and `content.link` is teal `#5eead4` — all pulled from the verdant mesh.',
    },
    {
      label: 'Paired green-glow elevation (no hard offsets)',
      detail:
        '`elevation.*` is an emerald outer glow + inner white lift (`0 0 24px 2px rgba(16,185,129,0.12) …` scaling to an 80px glow at overlay).',
    },
  ],
  antiSignatures: [
    'A warm amber/orange run (that is Ember) or a violet/azure run (Nebula / Spectrum)',
    'Any opaque `surface.raised` fill (defeats the luminance surface model)',
    '`atmosphereGradient: \'none\'` (the drifting mesh is the identity)',
    'A saturated chromatic floor — Verdant\'s base is near-neutral green-black so the mesh supplies the chroma',
  ],
  tokenEvidence: [
    { path: 'effect.atmosphereGradient', note: 'Four-radial emerald / teal / lime / cyan mesh.' },
    { path: 'color.surface.base', note: 'Green-black `#06120e` — a green-biased near-neutral floor.' },
    { path: 'color.intent.primary.bg', note: 'Emerald `#0d8f5f` — the verdant-register primary.' },
    { path: 'color.content.link', note: 'Teal `#5eead4` — picked out of the mesh.' },
    { path: 'elevation.overlay.boxShadow', note: 'Emerald outer glow + white inner lift — no hard offsets.' },
  ],
  lookalikes: [
    {
      against: 'aurora-spectrum',
      differentiator:
        'Spectrum runs azure / cyan / emerald with a blue primary — cool blue-forward. Verdant pushes all the way into green: emerald / teal / lime / cyan with an emerald primary and a green-black floor.',
    },
    {
      against: 'solarpunk',
      differentiator:
        'Solarpunk is a light, optimistic eco palette on a flat engine with bordered surfaces. Verdant is a DARK atmospheric register on the `aurora` engine — a drifting green mesh with luminance surfaces, no borders doing the demarcation.',
    },
    {
      against: 'aurora',
      differentiator:
        'The original `aurora` runs purple / atmospheric green / teal with a purple primary. Verdant drops the purple entirely for an emerald-forward green / teal / lime / cyan run.',
    },
  ],
  thrivesWith: [
    'Climate / sustainability dashboards and bio / wellness product chrome',
    'Card, Modal, Drawer, Toast — translucent fill + backdrop blur + green luminance halo at every tier',
  ],
  degradesWith: [
    'Dense Tables and VirtualList — luminance lifts don\'t separate rows the way hard borders do',
    'Browsers without `backdrop-filter` — the edge-dissolution into the mesh is lost',
  ],
  recallAliases: ['aurora verdant', 'verdant', 'green gradient', 'eco gradient', 'new tech gradient'],
}
