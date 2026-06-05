import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'crt-phosphor-rosebar',
  tagline:
    'A daylight CRT register — dark plum ink on warm rose continuous-form paper, with a saturated rose phosphor highlight and faint horizontal bands.',
  summary:
    'CRT / Rosebar is a light-ground member of the crt-phosphor engine, sibling to Greenbar and Bluebar with the phosphor ' +
    'moved to a rose-magenta highlight. `surface.base = #f6edf1` is warm rose paper, `content.primary = #4a1d3a` is dark plum ' +
    'ink, and `effect.overlay.image` paints faint horizontal rose bands every ~28px at `blend: multiply`. A saturated rose ' +
    '(`#be185d`) carries the focus halo, links, and the primary border; intents stay monochrome rose tints with state ' +
    'encoded through border weight — the engine\'s documented a11y caveat.',
  origin:
    'The same continuous-form line-printer stock as Greenbar, reimagined in a warm rose band. A monochrome CRT terminal logic ' +
    'printed on paper rather than glowing on a tube, tuned to a soft, warm highlight rather than a cool one.',
  signatures: [
    {
      label: 'Warm rose paper ground with dark plum ink',
      detail:
        '`surface.base = #f6edf1` and `content.primary = #4a1d3a` — a light printout ground; the saturation lives in the rose highlight, not the surface.',
    },
    {
      label: 'Faint horizontal rose bands via `effect.overlay.image` (`blend: multiply`)',
      detail:
        'A repeating-linear-gradient paints a rose band every ~28px and `multiply` darkens the paper underneath, so the bands read as printed stripes — the paper analogue of scanlines.',
    },
    {
      label: 'Saturated rose phosphor highlight (`#be185d`)',
      detail:
        'Carries `border.focus`, `content.link`, and `intent.primary.border`; `effect.glow.color = rgba(190,24,93,0.45)` makes the focus-pulse read as a soft rose ink pulse.',
    },
    {
      label: 'Monochrome rose intents, state by border weight',
      detail:
        'Every intent fill is a rose tint with dark plum `content`; warning / danger / info differ only in border alpha, not hue — the documented-caveat monochrome intent model.',
    },
  ],
  antiSignatures: [
    'A near-black tube ground (that is crt-phosphor-green/amber; Rosebar is light paper)',
    'Green or blue phosphor (those are the Greenbar / Bluebar siblings)',
    'Multi-hue semantic intents (CRT keeps a single phosphor hue and signals state by border weight)',
    'Backdrop blur or soft drop shadows (the engine uses inset hairlines and paper bands)',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.base',
      note: '`#f6edf1` — warm rose paper, the light ground.',
    },
    {
      path: 'effect.overlay.image',
      note: 'The repeating rose band gradient at `blend: multiply` — the paper analogue of scanlines.',
    },
    {
      path: 'color.content.link',
      note: '`#be185d` — the saturated rose phosphor highlight carrying links, focus, and the primary border.',
    },
    {
      path: 'effect.glow.color',
      note: '`rgba(190,24,93,0.45)` — the soft rose focus halo the CRT focus-pulse keyframe animates.',
    },
    {
      path: 'motion.decay',
      note: '`0ms` — paper does not glow, so the phosphor-decay regime is off.',
    },
  ],
  lookalikes: [
    {
      against: 'crt-phosphor-greenbar',
      differentiator:
        'Same paper-printout CRT register; Greenbar is green ink on green-banded cream, Rosebar is plum ink on rose-banded warm paper. Identical band / glow / decay mechanics, different phosphor hue.',
    },
    {
      against: 'crt-phosphor-goldbar',
      differentiator:
        'Both are warm daylight CRT bars; Rosebar\'s highlight is magenta-rose `#be185d` on rose paper, Goldbar\'s is amber `#b45309` on cream paper. Same engine, different warm hue.',
    },
    {
      against: 'crt-phosphor-amber',
      differentiator:
        'CRT/Amber is the near-black glowing amber tube with scanlines and a decay trail. Rosebar inverts to light rose paper: dark ink, printed bands instead of scanlines, and `motion.decay = 0ms`.',
    },
  ],
  thrivesWith: [
    'Dashboards and log views that want a warm, soft daylight register',
    'Tables and data grids — monochrome fills keep dense rows calm while border weight signals state',
    'Editorial / journaling UIs leaning on the warm rose paper feel',
  ],
  degradesWith: [
    'Imagery-heavy layouts — the monochrome band treatment fights photographs',
    'UIs that need hue-coded status at a glance (state is signalled by border weight, not colour)',
  ],
  recallAliases: ['crt rosebar', 'rosebar', 'rose greenbar', 'crt phosphor rosebar', 'light crt rose', 'printout rose'],
}
