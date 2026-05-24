import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'bullet-train-day',
  tagline:
    'Shinkansen livery on the Flat engine — pale-sky-blue field, deep-navy primary, signal-yellow focus ring, asymmetric `radius.lg` for forward motion, long ease-out timing.',
  summary:
    'Bullet Train / Day is the second palette in the day-transit family. Pale sky-blue ' +
    '(`#eaf3fb`) surfaces against a white-carriage `raised`, deep navy (`#0a2540`) as the primary ' +
    'intent, signal yellow (`#ffd400`) as the focus ring — the N700 series livery in two tokens. ' +
    'The differentiators against Flat / Classic are two: `radius.lg` is asymmetric ' +
    '(`16px 16px 4px 4px` — rounded leading edge, square trailing edge) so every card / button / ' +
    'modal carries a directional pill that reads as forward motion, and `motion.easing.standard` ' +
    'is a long ease-out paired with `duration.base = 260ms`, mirroring a train decelerating into ' +
    'a platform. Reduced-motion collapses to `0ms` like every palette.',
  origin:
    'The N700 / N700S Shinkansen series (JR Central / JR West, 2007–present) and its design ' +
    'language: aerodynamic curves, navy-blue nose cone, signal-yellow JR ticket-gate accents, ' +
    'German-industrial DIN typography (HG Sans, the JR display font, descends from DIN 1451). ' +
    'The palette translates the livery into Flat tokens — Bahnschrift / D-DIN as the showcase\'s ' +
    'closest available cousin to HG Sans.',
  signatures: [
    {
      label: 'Asymmetric `radius.lg = "16px 16px 4px 4px"`',
      detail:
        'The load-bearing visual. `radius.lg` is the slot Card and Modal default to; setting it asymmetric means every raised surface in the showcase picks up a directional pill (rounded leading edge, square trailing edge) without per-component code. No other palette in the set uses an asymmetric radius.',
    },
    {
      label: 'Pale sky-blue `surface.base` + white `surface.raised`',
      detail:
        '`surface.base` is `#eaf3fb` (pale Shinkansen-sky); `surface.raised` is `#ffffff`. The brighter raised reads as a train carriage against the sky — the inversion of the dark-cabin / bright-window relationship most transit interiors have.',
    },
    {
      label: 'Deep navy `intent.primary.bg` (`#0a2540`) + signal-yellow focus ring',
      detail:
        '`intent.primary.bg` is the N700 nose-cone navy. `border.focus` and the focus-ring colour are `#ffd400` (signal yellow — the JR-East ticket-gate colour). The two-colour livery: navy as the action, yellow as the attention.',
    },
    {
      label: 'Long ease-out timing (`cubic-bezier(0.05, 0.7, 0.1, 1)` @ `260ms`)',
      detail:
        '`motion.easing.standard` and `easing.out` both use the long ease-out curve. `duration.base` is `260ms` — 30% longer than Flat / Classic\'s `200ms` to give the curve room to read. Reduced-motion collapses durations to `0ms`, same as every palette.',
    },
    {
      label: 'Bahnschrift / D-DIN display family',
      detail:
        '`typography.family.display` is `"Bahnschrift", "D-DIN", "DIN Next", "DIN 1451", ...` — the German-industrial sans that HG Sans (the actual JR display font) descends from.',
    },
  ],
  antiSignatures: [
    'A uniform `radius.lg` — the asymmetric leading-edge pill is the palette\'s defining shape',
    'A short, snappy ease (`120–180ms`) — the long ease-out is the motion signature',
    'A serif display family',
    'A second saturated chromatic intent competing with the navy + yellow pair',
  ],
  tokenEvidence: [
    {
      path: 'radius.lg',
      note: '`"16px 16px 4px 4px"` — asymmetric directional pill. The single most-load-bearing token in the palette.',
    },
    {
      path: 'motion.easing.standard',
      note: '`cubic-bezier(0.05, 0.7, 0.1, 1)` — the long ease-out that mirrors deceleration.',
    },
    {
      path: 'motion.duration.base',
      note: '`260ms` — 30% slower than Flat / Classic, to give the easing room to read.',
    },
    {
      path: 'color.intent.primary.bg',
      note: 'Deep navy `#0a2540` — the N700 nose-cone livery.',
    },
    {
      path: 'color.border.focus',
      note: 'Signal yellow `#ffd400` — the JR ticket-gate accent.',
    },
    {
      path: 'typography.family.display',
      note: 'Bahnschrift / D-DIN — the German-industrial sans HG Sans descends from.',
    },
  ],
  lookalikes: [
    {
      against: 'material',
      differentiator:
        'Material uses default symmetric radius, a standard `cubic-bezier(0.4, 0, 0.2, 1)` ease, and a Roboto display. Bullet Train / Day uses asymmetric `radius.lg`, a much longer ease-out (decelerating-train feel), and Bahnschrift display — the asymmetric corner is the unmistakable signal.',
    },
    {
      against: 'tokyo-day',
      differentiator:
        'Tokyo / Day is the broader city-signage register: white field, JR-East green as `intent.primary`, four-colour signage triad, condensed gothic display. Bullet Train / Day commits specifically to the Shinkansen livery: pale-sky field, deep-navy primary, signal-yellow focus, asymmetric radius, long ease-out.',
    },
    {
      against: 'aero-glass',
      differentiator:
        'Aero Glass also uses a saturated-blue host but is a Glassmorphism palette: translucent panels, paired-rim inset highlights, Segoe UI. Bullet Train / Day is Flat: opaque surfaces, soft drop shadows, DIN display, asymmetric corners.',
    },
  ],
  thrivesWith: [
    'Buttons — the asymmetric `radius.lg` reads as a directional pill, perfect for "next" / "submit" affordances',
    'Cards in a horizontal feed — the leading-edge curve points the reader along the scroll axis',
    'Modal panels — the directional shape signals "this opened from somewhere"',
    'Motion-aware UI (drawer slides, page transitions) — the long ease-out shines',
  ],
  degradesWith: [
    'Symmetric layouts that need uniform corners (centred dialogs that feel weighted to one side because of the radius)',
    'Reduced-motion users — the long ease-out is the palette\'s signature, and they collapse to instant',
    'Right-to-left layouts — the leading-edge curve points the wrong way unless components flip the radius',
  ],
  recallAliases: ['bullet train day', 'bullet train', 'shinkansen', 'shinkansen day', 'n700', 'jr shinkansen'],
}
