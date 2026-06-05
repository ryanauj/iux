import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'crt-phosphor-bluebar',
  tagline:
    'A daylight CRT register — dark navy ink on cool "bluebar" continuous-form paper, with a saturated blue phosphor highlight and faint horizontal bands.',
  summary:
    'CRT / Bluebar is a light-ground member of the crt-phosphor engine, in the same paper-printout spirit as Greenbar but ' +
    'with the phosphor moved to a cool blue highlight. `surface.base = #eaeef6` is cool bluebar paper, `content.primary = #1c2e4a` ' +
    'is dark navy ink, and `effect.overlay.image` paints faint horizontal blue bands every ~28px with `blend: multiply`. A ' +
    'saturated blue (`#1d4ed8`) carries the focus halo, links, and the primary border; intents stay monochrome blue tints ' +
    'with state encoded through border weight, the engine\'s documented a11y caveat.',
  origin:
    'Continuous-form line-printer paper — the green/blue/gray banded stock that mainframe and mini workloads printed to when ' +
    'they were not on a tube. Bluebar is the blue-band variant of that stock, reimagined as a CRT register: the same monochrome ' +
    'terminal logic, printed rather than glowing.',
  signatures: [
    {
      label: 'Cool bluebar paper ground with dark navy ink',
      detail:
        '`surface.base = #eaeef6` and `content.primary = #1c2e4a` — a light printout ground, not a glowing tube. The colour is concentrated in the blue highlight, not spread across the surface.',
    },
    {
      label: 'Faint horizontal blue bands via `effect.overlay.image` (`blend: multiply`)',
      detail:
        'A repeating-linear-gradient paints a blue band every ~28px and `multiply` darkens the paper underneath, so the bands read as printed stripes rather than added light — the paper analogue of the green-screen scanlines.',
    },
    {
      label: 'Saturated blue phosphor highlight (`#1d4ed8`)',
      detail:
        'Carries `border.focus`, `content.link`, and `intent.primary.border`; `effect.glow.color = rgba(29,78,216,0.45)` makes the CRT focus-pulse read as a gentle blue ink pulse.',
    },
    {
      label: 'Monochrome blue intents, state by border weight',
      detail:
        'Every intent fill is a blue tint and `content` is dark navy ink; warning / danger / info differ only in border alpha (0.62 / 0.85 / 0.40), not hue — the colourblind-leaning, documented-caveat intent model the engine ships `a11y: experimental` for.',
    },
  ],
  antiSignatures: [
    'A near-black tube ground (that is crt-phosphor-green/amber; Bluebar is light paper)',
    'Green phosphor (that is Greenbar; Bluebar moves the highlight to blue)',
    'Multi-hue semantic intents (CRT keeps a single phosphor hue and encodes state by border weight)',
    'Backdrop blur or soft drop shadows (the engine uses inset hairlines and paper bands)',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.base',
      note: '`#eaeef6` — cool bluebar paper, the light ground that distinguishes this from the near-black tube registers.',
    },
    {
      path: 'effect.overlay.image',
      note: 'The repeating blue band gradient — the paper analogue of scanlines, painted at `blend: multiply`.',
    },
    {
      path: 'color.content.link',
      note: '`#1d4ed8` — the saturated blue phosphor highlight carrying links, focus, and the primary border.',
    },
    {
      path: 'effect.glow.color',
      note: '`rgba(29,78,216,0.45)` — the soft blue focus halo the CRT focus-pulse keyframe animates.',
    },
    {
      path: 'motion.decay',
      note: '`0ms` — printout does not linger the way a phosphor screen does, so the decay regime is off.',
    },
  ],
  lookalikes: [
    {
      against: 'crt-phosphor-greenbar',
      differentiator:
        'Greenbar and Bluebar are the same paper-printout CRT register with the phosphor hue swapped: Greenbar is dark green ink on green-banded cream paper, Bluebar is dark navy ink on blue-banded cool paper. Same overlay/glow/decay mechanics, different highlight colour.',
    },
    {
      against: 'crt-phosphor-green',
      differentiator:
        'CRT/Green is the near-black glowing tube — bright green phosphor on black with scanlines and a decay trail. Bluebar inverts to light paper: dark ink on a near-white ground, printed bands instead of scanlines, and `motion.decay = 0ms` (paper does not glow).',
    },
    {
      against: 'crt-phosphor-rosebar',
      differentiator:
        'Both are daylight CRT bars; the only real difference is the phosphor hue. Bluebar is cool navy/blue on cool paper, Rosebar is plum/rose on warm rose paper. Same engine and band/glow logic.',
    },
  ],
  thrivesWith: [
    'Dashboards and log views — the banded paper reads as a printout, the blue highlight guides the eye',
    'Tables and data grids — monochrome fills keep dense rows calm while border weight signals state',
    'Terminal / console UIs that want a light, daylight register instead of a dark tube',
  ],
  degradesWith: [
    'Imagery-heavy layouts — the monochrome band treatment fights photographs',
    'UIs that need hue-coded status at a glance (the monochrome intent model signals by border weight, not colour)',
  ],
  recallAliases: ['crt bluebar', 'bluebar', 'blue greenbar', 'crt phosphor bluebar', 'light crt blue', 'printout blue'],
}
