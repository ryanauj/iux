import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'crt-phosphor-goldbar',
  tagline:
    'A daylight CRT register — dark cocoa ink on warm cream continuous-form paper, with a saturated amber phosphor highlight and faint horizontal bands.',
  summary:
    'CRT / Goldbar is a light-ground member of the crt-phosphor engine, the paper inversion of the classic amber tube. ' +
    '`surface.base = #f6efdf` is warm cream paper, `content.primary = #3a2810` is dark cocoa ink, and `effect.overlay.image` ' +
    'paints faint horizontal amber bands every ~28px at `blend: multiply`. A saturated amber (`#b45309`) carries the focus ' +
    'halo, links, and the primary border; intents stay monochrome amber tints with state encoded through border weight — ' +
    'the engine\'s documented a11y caveat.',
  origin:
    'The amber phosphor tube — the warm sibling of the green screen — reframed onto continuous-form printer paper. The same ' +
    'monochrome terminal logic Greenbar prints in green, printed in amber on cream stock.',
  signatures: [
    {
      label: 'Warm cream paper ground with dark cocoa ink',
      detail:
        '`surface.base = #f6efdf` and `content.primary = #3a2810` — a light printout ground; the saturation lives in the amber highlight, not the surface.',
    },
    {
      label: 'Faint horizontal amber bands via `effect.overlay.image` (`blend: multiply`)',
      detail:
        'A repeating-linear-gradient paints an amber band every ~28px and `multiply` darkens the paper underneath — the paper analogue of the amber-tube scanlines.',
    },
    {
      label: 'Saturated amber phosphor highlight (`#b45309`)',
      detail:
        'Carries `border.focus`, `content.link`, and `intent.primary.border`; `effect.glow.color = rgba(180,83,9,0.45)` makes the focus-pulse read as a soft amber ink pulse.',
    },
    {
      label: 'Monochrome amber intents, state by border weight',
      detail:
        'Every intent fill is an amber tint with dark cocoa `content`; warning / danger / info differ only in border alpha, not hue — the documented-caveat monochrome intent model.',
    },
  ],
  antiSignatures: [
    'A near-black tube ground (that is crt-phosphor-amber; Goldbar is light paper)',
    'Green or rose phosphor (those are the Greenbar / Rosebar siblings)',
    'Multi-hue semantic intents (CRT keeps a single phosphor hue and signals state by border weight)',
    'Backdrop blur or soft drop shadows (the engine uses inset hairlines and paper bands)',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.base',
      note: '`#f6efdf` — warm cream paper, the light ground.',
    },
    {
      path: 'effect.overlay.image',
      note: 'The repeating amber band gradient at `blend: multiply` — the paper analogue of scanlines.',
    },
    {
      path: 'color.content.link',
      note: '`#b45309` — the saturated amber phosphor highlight carrying links, focus, and the primary border.',
    },
    {
      path: 'effect.glow.color',
      note: '`rgba(180,83,9,0.45)` — the soft amber focus halo the CRT focus-pulse keyframe animates.',
    },
    {
      path: 'motion.decay',
      note: '`0ms` — paper does not glow, so the phosphor-decay regime is off.',
    },
  ],
  lookalikes: [
    {
      against: 'crt-phosphor-amber',
      differentiator:
        'CRT/Amber is the near-black glowing amber tube — bright amber phosphor on black with scanlines and a decay trail. Goldbar inverts to warm cream paper: dark cocoa ink, printed bands instead of scanlines, and `motion.decay = 0ms` (paper does not glow).',
    },
    {
      against: 'crt-phosphor-greenbar',
      differentiator:
        'Same paper-printout CRT register; Greenbar prints green ink on green-banded cream, Goldbar prints cocoa ink with an amber highlight on cream. Identical band / glow / decay mechanics, different phosphor hue.',
    },
    {
      against: 'crt-phosphor-rosebar',
      differentiator:
        'Both are warm daylight CRT bars; Goldbar\'s highlight is amber `#b45309` on cream, Rosebar\'s is magenta-rose `#be185d` on rose paper. Same engine, different warm hue.',
    },
  ],
  thrivesWith: [
    'Dashboards and log views that want a warm, vintage daylight register',
    'Tables and data grids — monochrome fills keep dense rows calm while border weight signals state',
    'Terminal / console UIs leaning on the amber-printout feel without a dark tube',
  ],
  degradesWith: [
    'Imagery-heavy layouts — the monochrome band treatment fights photographs',
    'UIs that need hue-coded status at a glance (state is signalled by border weight, not colour)',
  ],
  recallAliases: ['crt goldbar', 'goldbar', 'amber greenbar', 'crt phosphor goldbar', 'light crt amber', 'printout amber'],
}
