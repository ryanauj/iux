import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'blueprint',
  tagline:
    'Cyanotype-print register — deep Prussian-blue field, cyan-white line work, IBM Plex Mono on `family.ui`, annotation yellow as `intent.primary`.',
  summary:
    'Blueprint is the "architectural cyanotype" register on the Flat engine. Deep Prussian blue (`#0d2c5e`) ' +
    'fills `surface.base`; cyan-white (`#e4ecff`) carries `content.primary` — the colour of an unexposed line ' +
    'on a cyanotype. `intent.primary.bg` is annotation yellow (`#ffd400`) with deep-blue inverse content; ' +
    '`family.ui` is IBM Plex Mono so labels and forms carry the drafter\'s mono-letterer register. The two-colour ' +
    'vocabulary (blueprint line + annotation pencil) keeps the drawing legible without adding decorative chromatic ' +
    'noise.',
  origin:
    'The architectural / engineering blueprint, c.1842 (John Herschel\'s cyanotype process) through the mid-20th ' +
    'century, when ammonia-print machines and digital plotters replaced the wet-process print. The colour vocabulary ' +
    'is exactly what a ferric-ammonium cyanotype exposes to: deep Prussian blue field with white lines where the ' +
    'ammonia masked the paper. Annotation yellow is the drafter\'s coloured pencil for revision callouts.',
  signatures: [
    {
      label: 'Deep Prussian-blue field with cyan-white line work',
      detail:
        '`surface.base` is `#0d2c5e`; `content.primary` is `#e4ecff` (cyan-white, not pure white — matches the actual unexposed-line colour on a cyanotype). The contrast lands at ≈ 11.8:1 (AAA).',
    },
    {
      label: 'Annotation yellow as `intent.primary` + focus ring',
      detail:
        '`intent.primary.bg` is `#ffd400` with deep-blue inverse content (≈ 13.5:1, AAA). `border.focus` reuses the same yellow at 3 px. The two-colour rule keeps every UI affordance reading as either "blueprint line" or "annotation callout."',
    },
    {
      label: 'IBM Plex Mono on `family.ui`',
      detail:
        'The drafter\'s mono-letterer register — every form label, table cell, and small caption renders in mono. `family.body` stays Inter for long-form text where the mono would slow reading. `family.hand` is Architects Daughter for hand-lettered annotations.',
    },
    {
      label: 'Zero-radius cards with cyan-tinted high-alpha shadows',
      detail:
        '`radius.sm` and `radius.md` are `\'0\'`; `lg` is `\'2px\'`. Drafting precision argues against rounded corners. `elevation.*` uses cyan-tinted shadows (`rgba(5, 16, 36, ...)`) at high alpha so cards lift as fresh paper above the blueprint, not as black voids cut into it.',
    },
  ],
  antiSignatures: [
    'Pure-white body text (cyan-white is the load-bearing line colour)',
    'A second saturated chromatic intent competing with the annotation yellow',
    'Rounded card corners (drafting precision argues against them)',
    'Sans-serif on `family.ui` (mono is the drafter\'s letterer register)',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Deep Prussian blue `#0d2c5e` — the field colour a ferric-ammonium cyanotype exposes to.' },
    { path: 'color.content.primary', note: 'Cyan-white `#e4ecff` — the unexposed-line colour, not pure white.' },
    { path: 'color.intent.primary.bg', note: 'Annotation yellow `#ffd400` — the drafter\'s revision-callout colour.' },
    { path: 'typography.family.ui', note: 'IBM Plex Mono — the drafter\'s mono-letterer face.' },
    { path: 'typography.family.hand', note: 'Architects Daughter — the hand-lettered annotation face.' },
  ],
  lookalikes: [
    {
      against: 'industrial-light',
      differentiator:
        'Both palettes promote IBM Plex Mono to `family.ui` (the drafter / engineer\'s mono-letterer register). Industrial / Light inverts the workshop aesthetic to a warm-paper light field with safety-orange `intent.primary`; Blueprint stays on the dark Prussian-blue field with annotation yellow `intent.primary`. Same typography move, opposite tonal register — the pair proves the mono-on-` ui` register carries both ways.',
    },
    {
      against: 'aero-glass',
      differentiator:
        'Aero Glass also uses a saturated-blue base, but it\'s the Glassmorphism engine: translucent surfaces, paired top/bottom-rim insets for wet gloss, Segoe UI. Blueprint is the Flat engine: opaque deep-blue surfaces, hairline rules, IBM Plex Mono. No glass, no gloss — drafting paper, not wet UI.',
    },
    {
      against: 'modern-royal',
      differentiator:
        'Modern Royal is also a dark-field Flat palette but the field is aubergine `#1f0d2a` and the accent is antique gold `#b8893a` (regalia register). Blueprint\'s field is Prussian blue `#0d2c5e` and the accent is annotation yellow `#ffd400` (technical-drawing register). Both keep `family.body` Inter for legibility; Blueprint promotes mono to `family.ui` where Modern Royal keeps sans.',
    },
  ],
  thrivesWith: [
    'Engineering / architectural dashboards, CAD viewers, BOM tables',
    'Code editors and documentation surfaces (mono on `family.ui` aligns)',
    'Form-heavy interfaces where annotation yellow reads as "needs revision"',
  ],
  degradesWith: [
    'Long-form prose (the mono `family.ui` and the deep-blue field slow reading vs editorial paper)',
    'Photographic content (the saturated blue clashes with most colour photography)',
  ],
  recallAliases: ['blueprint', 'cyanotype', 'drafting', 'architectural drawing', 'technical drawing'],
}
