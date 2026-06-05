import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'pixel-art-sky',
  tagline:
    'A light-ground pixel-art register — pale-sky field, bitmap glyphs, square corners, with a single dominant blue accent carrying primary, focus, and links.',
  summary:
    'Pixel Art (Sky) is a cozy-indie, light-ground member of the pixel-art engine: a pale-sky field (`surface.base = #eaf2fb`) ' +
    'with dark navy ink (`content.primary = #182b40`) and a dominant blue accent (`#2563eb`) carrying primary, focus, and ' +
    'links. Square corners (`radius` all `0`), Press Start 2P bitmap glyphs, hard offsets in the sky-frame blue, and ' +
    '`steps(1, end)` motion — the same engine as NES / Game Boy / Cottagecore; only `color.*` and `space.*` change. The ' +
    'other intents keep conventional hues so the UI stays readable; the pixel font at small role sizes is the engine-level ' +
    'caveat behind `a11y: experimental`.',
  origin:
    'The cozy-indie pixel idiom of farm/life sims and illustrated storybooks, taken to a cool, airy light register rather ' +
    'than the warm-earth Cottagecore one. Not a hardware-locked palette — an art-direction register where the saturation is ' +
    'concentrated in a single sky-blue accent.',
  signatures: [
    {
      label: 'Pale-sky light ground with a single dominant blue accent',
      detail:
        '`surface.base = #eaf2fb` stays near-white while the accent `#2563eb` carries `intent.primary.bg`, `border.focus`, and `content.link` — so the colour reads as a highlight, not a wash across the surface.',
    },
    {
      label: 'Square corners and bitmap glyphs',
      detail:
        '`radius` is `0` at every step and `typography.family.pixel` is Press Start 2P — the non-negotiable pixel-art signals shared with every register on the engine.',
    },
    {
      label: 'Hard offsets in the sky-frame blue (`#2f5f96`)',
      detail:
        '`elevation.low = 2px 2px 0 #2f5f96` scaling to a two-tone `4px 4px 0 #2f5f96, 8px 8px 0 #6f9bc8` — no blur, the carved-frame bevel the pixel idiom uses, tinted to the register\'s blue.',
    },
    {
      label: '8px pixel grid and `steps(1, end)` motion',
      detail:
        '`effect.pixelGrid = 8px` anchors the layout to integer cells and every `motion.easing` is `steps(1, end)`, so transitions jump frame-to-frame rather than interpolating.',
    },
  ],
  antiSignatures: [
    'Rounded corners or anti-aliased proportional type (the engine is square corners + bitmap glyphs)',
    'A warm parchment ground (that is Cottagecore; Sky is a cool pale-blue field)',
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
      note: '`#eaf2fb` — the pale-sky light ground.',
    },
    {
      path: 'color.intent.primary.bg',
      note: '`#2563eb` — the dominant blue accent that is the register\'s single colour highlight.',
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
        'Cottagecore is the warm-earth light pixel register — parchment field, wood-brown frame, harvest-gold accent. Sky is the cool sibling: a pale-blue field with a blue-frame bevel and a single sky-blue accent. Same engine and structure, opposite temperature.',
    },
    {
      against: 'pixel-art-nes',
      differentiator:
        'NES is a hardware-locked, dark-ground console palette with saturated primaries. Sky is an unlocked art-direction register on a near-white ground, with one dominant blue accent and conventional semantic intents.',
    },
    {
      against: 'pixel-art-blossom',
      differentiator:
        'Both are cool/light pixel registers in the same set; Sky\'s dominant accent is blue `#2563eb` on a pale-sky field, Blossom\'s is pink `#db2777` on a pale-rose field. Same engine and layout, different highlight hue.',
    },
  ],
  thrivesWith: [
    'Cozy indie game UIs and playful app shells that want a clean light pixel look',
    'Onboarding / empty states — the single blue accent points without shouting',
    'Cards and menus on the 8px grid — the carved blue bevel reads as a tidy frame',
  ],
  degradesWith: [
    'Dense data tables — the bitmap font at small sizes hurts legibility',
    'Long-form reading — Press Start 2P is a display face, not a body face',
  ],
  recallAliases: ['pixel sky', 'pixel art sky', 'light pixel blue', 'sky pixel', 'pastel pixel blue', 'cozy pixel sky'],
}
