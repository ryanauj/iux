import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'pixel-art-meadow',
  tagline:
    'A light-ground pixel-art register — pale mint field, bitmap glyphs, square corners, with a single dominant green accent carrying primary, focus, and links.',
  summary:
    'Pixel Art (Meadow) is a cozy-indie, light-ground member of the pixel-art engine: a pale mint field (`surface.base = #eaf6ea`) ' +
    'with dark forest ink (`content.primary = #18301f`) and a dominant green accent (`#2f9e44`) carrying primary, focus, and ' +
    'links. Square corners, Press Start 2P bitmap glyphs, hard offsets in the meadow-frame green, and `steps(1, end)` motion — ' +
    'same engine as NES / Game Boy / Cottagecore; only `color.*` and `space.*` change. The other intents keep conventional ' +
    'hues; the pixel font at small role sizes is the engine-level caveat behind `a11y: experimental`.',
  origin:
    'The cozy-indie pixel idiom of farm and life sims, taken to a fresh green light register. Not hardware-locked — an ' +
    'art-direction register where the saturation is concentrated in a single meadow-green accent.',
  signatures: [
    {
      label: 'Pale mint light ground with a single dominant green accent',
      detail:
        '`surface.base = #eaf6ea` stays near-white while the accent `#2f9e44` carries `intent.primary.bg`, `border.focus`, and `content.link` — the colour reads as a highlight, not a wash.',
    },
    {
      label: 'Square corners and bitmap glyphs',
      detail:
        '`radius` is `0` at every step and `typography.family.pixel` is Press Start 2P — the non-negotiable pixel-art signals shared across the engine.',
    },
    {
      label: 'Hard offsets in the meadow-frame green (`#2f6b3f`)',
      detail:
        '`elevation.low = 2px 2px 0 #2f6b3f` scaling to a two-tone `4px 4px 0 #2f6b3f, 8px 8px 0 #6fae7f` — no blur, a carved-frame bevel tinted to the register\'s green.',
    },
    {
      label: '8px pixel grid and `steps(1, end)` motion',
      detail:
        '`effect.pixelGrid = 8px` anchors layout to integer cells and every `motion.easing` is `steps(1, end)`, so transitions jump frame-to-frame.',
    },
  ],
  antiSignatures: [
    'Rounded corners or anti-aliased proportional type (the engine is square corners + bitmap glyphs)',
    'A warm parchment ground (that is Cottagecore; Meadow is a cool mint field)',
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
      note: '`#eaf6ea` — the pale mint light ground.',
    },
    {
      path: 'color.intent.primary.bg',
      note: '`#2f9e44` — the dominant green accent that is the register\'s single colour highlight.',
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
        'Cottagecore is the warm-earth pixel register — parchment field, wood-brown frame, harvest-gold accent. Meadow is a cooler, fresher green light register: a pale mint field with a green-frame bevel and a single meadow-green accent. Same engine, different colour story.',
    },
    {
      against: 'pixel-art-sky',
      differentiator:
        'Both are cool/light pixel registers in the same set; Meadow\'s dominant accent is green `#2f9e44` on a pale mint field, Sky\'s is blue `#2563eb` on a pale-sky field. Same engine and layout, different highlight hue.',
    },
    {
      against: 'pixel-art-nes',
      differentiator:
        'NES is a hardware-locked, dark-ground console palette with saturated primaries. Meadow is an unlocked art-direction register on a near-white ground with one dominant green accent and conventional semantic intents.',
    },
  ],
  thrivesWith: [
    'Cozy indie game UIs and wellness / nature-themed app shells',
    'Onboarding / empty states — the single green accent points calmly',
    'Cards and menus on the 8px grid — the carved green bevel reads as a tidy frame',
  ],
  degradesWith: [
    'Dense data tables — the bitmap font at small sizes hurts legibility',
    'Long-form reading — Press Start 2P is a display face, not a body face',
  ],
  recallAliases: ['pixel meadow', 'pixel art meadow', 'light pixel green', 'meadow pixel', 'pastel pixel green', 'cozy pixel meadow'],
}
