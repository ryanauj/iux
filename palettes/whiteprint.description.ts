import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'whiteprint',
  tagline:
    'Daylight inversion of Blueprint — drafting-vellum field, Prussian-blue line-work content, red revision-pencil link/focus, IBM Plex Mono on `family.ui`, faint 24-px engineering grid overlay.',
  summary:
    'Whiteprint is the diazo "whiteprint" register on the Flat engine — the dry-process print that succeeded ' +
    'the wet cyanotype in drafting rooms. The Prussian-blue field of Blueprint flips to warm drafting vellum: ' +
    '`surface.base` is `#f4f1e8`; `content.primary` is Prussian-blue ink (`#15336b`) — the colour the line-work ' +
    'prints in. `content.link` and `border.focus` are the drafter\'s red revision pencil (`#c8221e`). The same ' +
    'mono-letterer typography commitment as Blueprint — `family.ui` is IBM Plex Mono — and the same faint blue ' +
    '24-px engineering grid via `effect.overlay.image`. Same engine, same drafting register, opposite tonal lighting.',
  origin:
    'The mid-20th-century diazo / ammonia print process — the dry-process "whiteprint" or "bluelines" that ' +
    'succeeded the wet ferric-ammonium cyanotype in architectural and engineering drafting rooms. The visual ' +
    'vocabulary is the reverse of a cyanotype: blue line-work printed on warm cream stock instead of white ' +
    'line-work on Prussian-blue stock. The red revision pencil is the drafter\'s colour for callouts and ' +
    'corrections — the light-room analogue of the dark blueprint\'s annotation yellow.',
  signatures: [
    {
      label: 'Warm drafting-vellum field (`#f4f1e8`) with Prussian-blue line-work content',
      detail:
        '`surface.base` is `#f4f1e8` (warm vellum); `content.primary` is `#15336b` (Prussian-blue ink). The inversion of Blueprint\'s Prussian-blue-field-with-cyan-white-lines is the load-bearing move — same two colours, flipped substrate.',
    },
    {
      label: 'Red revision-pencil on `content.link` and `border.focus` (`#c8221e`)',
      detail:
        '`content.link` and `border.focus` are both `#c8221e` — the drafter\'s red revision pencil. The two-pencil vocabulary (blue line + red callout) keeps the drawing legible without adding decorative chromatic noise. `border.focus` is a thicker 3-px ring to read against the cream field.',
    },
    {
      label: 'Faint blue 24-px engineering grid via `effect.overlay.image`',
      detail:
        '`effect.overlay.image` is a `repeating-linear-gradient` painting a 24-px engineering grid at 6% blue alpha across the entire field. The surface reads as gridded graph paper, not as blank vellum. This is the second load-bearing engine move (after the substrate inversion).',
    },
    {
      label: 'IBM Plex Mono on `family.ui` (mono-letterer register)',
      detail:
        '`typography.family.ui` is `"IBM Plex Mono", "JetBrains Mono", "Berkeley Mono", ui-monospace, monospace` — the drafter\'s mono-letterer face. Every form label, table cell, and small caption renders in mono. `family.hand` is Architects Daughter for hand-lettered annotations on display.',
    },
    {
      label: 'Near-zero `radius.*` (`sm = 0 / md = 0 / lg = 2px`)',
      detail:
        'Drafting precision argues against rounded corners. `radius.sm` and `radius.md` are both `\'0\'`; `lg` lifts to `\'2px\'`. Identical scale to Blueprint.',
    },
    {
      label: 'Warm-grey paper shadows on `elevation.*`',
      detail:
        '`elevation.low` is `0 1px 2px rgba(40, 36, 28, 0.12)` — warm-grey paper alpha rather than Blueprint\'s cyan-tinted shadows. Cards lift as a fresh sheet laid on the roll, not as a cyanotype on a workbench.',
    },
  ],
  antiSignatures: [
    'Dark Prussian-blue field — that\'s Blueprint, the inverse register',
    'Sans-serif on `family.ui` (mono is the drafter\'s letterer register)',
    'Rounded card corners (drafting precision argues against them)',
    'No grid overlay — the `effect.overlay.image` engineering grid is structural',
    'Yellow annotation accent — Whiteprint uses red revision pencil; yellow is the dark-room Blueprint accent',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Warm drafting vellum `#f4f1e8` — the diazo cream stock.' },
    { path: 'color.content.primary', note: 'Prussian-blue ink `#15336b` — the line-work colour, inverted substrate of Blueprint.' },
    { path: 'color.content.link', note: 'Red revision pencil `#c8221e` — the drafter\'s callout colour.' },
    { path: 'color.border.focus', note: 'Red revision pencil `#c8221e` — focus ring reuses the callout colour.' },
    { path: 'color.intent.primary.bg', note: 'Prussian blue `#15336b` — primary slab matches the line-work ink.' },
    { path: 'typography.family.ui', note: 'IBM Plex Mono — drafter\'s mono-letterer face on `ui`.' },
    { path: 'typography.family.hand', note: 'Architects Daughter — hand-lettered annotation face on display.' },
    { path: 'effect.overlay.image', note: 'Faint blue 24-px engineering grid via `repeating-linear-gradient`.' },
    { path: 'effect.focusRing.width', note: '3 px — thicker than the 2-px default so the red ring reads against cream.' },
  ],
  lookalikes: [
    {
      against: 'blueprint',
      differentiator:
        'Whiteprint is the daylight inversion of Blueprint — same engine, same drafting register, same mono-letterer typography commitment, same engineering-grid overlay, same near-zero `radius`. Blueprint commits to deep Prussian-blue field with cyan-white line-work and annotation-yellow callouts. Whiteprint commits to warm drafting-vellum field with Prussian-blue line-work and red revision-pencil callouts. The diazo "whiteprint" succeeded the cyanotype in drafting rooms; this palette is the dry-process print to Blueprint\'s wet one.',
    },
    {
      against: 'industrial-light',
      differentiator:
        'Both palettes promote IBM Plex Mono to `family.ui` (the drafter / engineer mono-letterer register) on a warm-paper light field. Industrial / Light is the workshop register: safety-orange `intent.primary` and a heavier industrial typography hierarchy. Whiteprint is the drafting-room register: Prussian-blue ink content, red revision-pencil link/focus, faint blue engineering grid overlay, near-zero `radius`.',
    },
    {
      against: 'editorial',
      differentiator:
        'Both palettes use a warm-paper field. Editorial is the magazine register: serif body, Inter UI, no grid overlay, no mono. Whiteprint is the drafting register: mono `family.ui`, hand-lettered display, faint engineering-grid overlay across the entire field, two-pencil colour vocabulary.',
    },
  ],
  thrivesWith: [
    'Engineering / architectural dashboards, CAD viewers, BOM tables',
    'Form-heavy interfaces where red revision-pencil reads as "needs revision"',
    'Documentation surfaces where the mono `family.ui` aligns with code blocks',
  ],
  degradesWith: [
    'Long-form prose (the mono `family.ui` slows reading vs editorial paper)',
    'Photographic content (the engineering-grid overlay competes with image rectangles)',
  ],
  recallAliases: ['whiteprint', 'diazo', 'bluelines', 'drafting vellum', 'whiteprint drafting'],
}
