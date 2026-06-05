import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'pixel-art-blossom',
  tagline:
    'A light-ground pixel-art register — pale rose field, bitmap glyphs, square corners, with a single dominant pink accent carrying primary, focus, and links.',
  summary:
    'Pixel Art (Blossom) is a cozy-indie, light-ground member of the pixel-art engine: a pale rose field (`surface.base = #fbecf2`) ' +
    'with dark plum ink (`content.primary = #3a1428`) and a dominant pink accent (`#db2777`) carrying primary, focus, and ' +
    'links. Square corners, Press Start 2P bitmap glyphs, hard offsets in the blossom-frame magenta, and `steps(1, end)` ' +
    'motion — same engine as NES / Game Boy / Cottagecore; only `color.*` and `space.*` change. The other intents keep ' +
    'conventional hues; the pixel font at small role sizes is the engine-level caveat behind `a11y: experimental`.',
  origin:
    'The cozy-indie pixel idiom of farm and life sims, taken to a sweet rose light register. Not hardware-locked — an ' +
    'art-direction register where the saturation is concentrated in a single blossom-pink accent.',
  signatures: [
    {
      label: 'Pale rose light ground with a single dominant pink accent',
      detail:
        '`surface.base = #fbecf2` stays near-white while the accent `#db2777` carries `intent.primary.bg`, `border.focus`, and `content.link` — the colour reads as a highlight, not a wash.',
    },
    {
      label: 'Square corners and bitmap glyphs',
      detail:
        '`radius` is `0` at every step and `typography.family.pixel` is Press Start 2P — the non-negotiable pixel-art signals shared across the engine.',
    },
    {
      label: 'Hard offsets in the blossom-frame magenta (`#a83a66`)',
      detail:
        '`elevation.low = 2px 2px 0 #a83a66` scaling to a two-tone `4px 4px 0 #a83a66, 8px 8px 0 #cf7fa0` — no blur, a carved-frame bevel tinted to the register\'s pink.',
    },
    {
      label: '8px pixel grid and `steps(1, end)` motion',
      detail:
        '`effect.pixelGrid = 8px` anchors layout to integer cells and every `motion.easing` is `steps(1, end)`, so transitions jump frame-to-frame.',
    },
  ],
  antiSignatures: [
    'Rounded corners or anti-aliased proportional type (the engine is square corners + bitmap glyphs)',
    'A warm parchment ground (that is Cottagecore; Blossom is a pale rose field)',
    'Soft eased transitions (the engine snaps with `steps(1, end)`)',
    'Backdrop blur or glow (pixel-art uses hard offsets only)',
  ],
  tokenEvidence: [
    {
      path: 'effect.pixelGrid',
      note: '`8px` — the integer grid the engine snaps layout to; `0` on every non-pixel palette.',
    },
    {
      path: 'typography.family.pixel',
      note: 'Press Start 2P bitmap stack — the load-bearing pixel-art face.',
    },
    {
      path: 'color.surface.base',
      note: '`#fbecf2` — the pale rose light ground.',
    },
    {
      path: 'color.intent.primary.bg',
      note: '`#db2777` — the dominant pink accent that is the register\'s single colour highlight.',
    },
    {
      path: 'radius.md',
      note: '`0` — square corners, the non-negotiable pixel-art signal.',
    },
  ],
  lookalikes: [
    {
      against: 'pixel-art-cottagecore',
      differentiator:
        'Cottagecore is the warm-earth pixel register — parchment field, wood-brown frame, harvest-gold accent. Blossom is a sweeter, cooler register: a pale rose field with a magenta-frame bevel and a single blossom-pink accent. Same engine, different colour story.',
    },
    {
      against: 'pixel-art-sky',
      differentiator:
        'Both are light pixel registers in the same set; Blossom\'s dominant accent is pink `#db2777` on a pale-rose field, Sky\'s is blue `#2563eb` on a pale-sky field. Same engine and layout, different highlight hue.',
    },
    {
      against: 'pixel-art-nes',
      differentiator:
        'NES is a hardware-locked, dark-ground console palette with saturated primaries. Blossom is an unlocked art-direction register on a near-white ground with one dominant pink accent and conventional semantic intents.',
    },
  ],
  thrivesWith: [
    'Cozy indie game UIs and playful, sweet app shells',
    'Onboarding / empty states — the single pink accent points warmly',
    'Cards and menus on the 8px grid — the carved magenta bevel reads as a tidy frame',
  ],
  degradesWith: [
    'Dense data tables — the bitmap font at small sizes hurts legibility',
    'Long-form reading — Press Start 2P is a display face, not a body face',
  ],
  recallAliases: ['pixel blossom', 'pixel art blossom', 'light pixel pink', 'blossom pixel', 'pastel pixel pink', 'cozy pixel blossom'],
}
