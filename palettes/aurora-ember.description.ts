import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'aurora-ember',
  tagline:
    'The warm sunset register of the aurora-engine family — an amber → orange → rose → magenta mesh drifting over a warm near-black host.',
  summary:
    'Aurora (Ember) is the dusk / golden-hour cousin of Nebula (violet) and Spectrum (azure). Same `aurora` engine and ' +
    '`surfaceBy: \'luminance\'` surface model — a four-radial `effect.atmosphereGradient` the engine paints at the root and drifts ' +
    'over a 48s loop, translucent luminance-lift cards frosted by `backdrop-filter` — tuned to a fiery palette. `surface.base` is a ' +
    'warm near-neutral `#120a0c` so the drifting mesh of amber, orange, rose, and magenta supplies all the chroma. The primary is a ' +
    'burnt orange, danger a rose pulled from the mesh, and the focus/accent an amber-orange.',
  origin:
    'Original to the iux design system — a warm-dark register in the aurora-engine family. Ember borrows from sunset / golden-hour ' +
    'gradients and the warm side of the current product-marketing mesh-gradient wave.',
  signatures: [
    {
      label: 'Warm four-radial drifting `effect.atmosphereGradient`',
      detail:
        'A stack of amber `rgba(251,191,36,…)`, orange `rgba(251,146,60,…)`, rose `rgba(244,63,94,…)`, and magenta `rgba(217,70,239,…)` radials the engine drifts over a 48s loop. The sunset run is the whole identity.',
    },
    {
      label: '`surfaceBy: \'luminance\'` over a warm near-black floor',
      detail:
        'Shared with the rest of the aurora family: raised cards are translucent luminance lifts, not opaque fills. `surface.base` `#120a0c` is a warm-biased near-black so the mesh carries the colour.',
    },
    {
      label: 'Burnt-orange primary, amber focus, rose danger',
      detail:
        '`intent.primary.bg` is `#c2410c`, `border.focus` is `#fb923c`, and `intent.danger.bg` is a rose `#be2350` — all pulled from the warm mesh so accents read as part of the atmosphere.',
    },
    {
      label: 'Paired warm-glow elevation (no hard offsets)',
      detail:
        '`elevation.*` is an orange outer glow + inner white lift (`0 0 24px 2px rgba(251,146,60,0.12) …` scaling to an 80px glow at overlay). The orange glow is the warm-register tell.',
    },
  ],
  antiSignatures: [
    'A cool azure/cyan center run (that is Spectrum) or a violet/fuchsia run (that is Nebula)',
    'Any opaque `surface.raised` fill (defeats the luminance surface model)',
    'A light ground (Ember is the warm DARK register — Bloom is its light counterpart)',
    '`atmosphereGradient: \'none\'` (the drifting mesh is the identity)',
  ],
  tokenEvidence: [
    { path: 'effect.atmosphereGradient', note: 'Four-radial amber / orange / rose / magenta sunset mesh.' },
    { path: 'color.surface.base', note: 'Warm near-black `#120a0c` — a warm-biased floor so the mesh supplies the chroma.' },
    { path: 'color.intent.primary.bg', note: 'Burnt orange `#c2410c` — the warm-register primary.' },
    { path: 'color.border.focus', note: 'Amber-orange `#fb923c` — also the hover/focus glow hue the engine paints.' },
    { path: 'elevation.overlay.boxShadow', note: 'Orange outer glow + white inner lift — the warm tell, no hard offsets.' },
  ],
  lookalikes: [
    {
      against: 'aurora-spectrum',
      differentiator:
        'Same engine and surface model, opposite temperature. Spectrum is the cool dark register (azure / cyan / emerald, blue primary); Ember is the warm dark register (amber / orange / rose, burnt-orange primary).',
    },
    {
      against: 'aurora-nebula',
      differentiator:
        'Both warm-ish dark registers, but Nebula centers on violet / fuchsia / cyan with a violet primary, while Ember centers on amber / orange / rose with a burnt-orange primary — sunset rather than nebula.',
    },
    {
      against: 'vaporwave',
      differentiator:
        'Vaporwave is a loud static synthwave composition (magenta / cyan, often with scanlines). Ember is a slow 48s drift on a warm near-neutral floor with luminance surfaces and no scanlines.',
    },
  ],
  thrivesWith: [
    'Hero sections and dashboards wanting a warm, energetic brand atmosphere',
    'Card, Modal, Drawer, Toast — translucent fill + backdrop blur + warm luminance halo at every tier',
  ],
  degradesWith: [
    'Dense Tables and VirtualList — luminance lifts don\'t separate rows the way hard borders do',
    'Browsers without `backdrop-filter` — the edge-dissolution into the mesh is lost',
  ],
  recallAliases: ['aurora ember', 'ember', 'sunset gradient', 'new tech gradient', 'tech gradient'],
}
