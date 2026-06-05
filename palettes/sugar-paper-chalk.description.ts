import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'sugar-paper-chalk',
  tagline:
    'The soft-pastel-chalk register on the Sketch engine — dusty blue-grey "sugar paper" field, powdery chalk-pastel intents, hand-drawn wobble, and a marker font.',
  summary:
    'Sugar Paper Chalk is the primary-school art room. "Sugar paper" is the dusty blue-grey craft stock pinned to ' +
    'classroom walls; `surface.base` is exactly that `#dfe5ea`. On top sit powdery chalk-pastel colours — a ' +
    'chalk-blue primary, soft green success, dusty rose danger, classroom-gold warning — over a slate-dark ' +
    '`#2a3540` so the marks stay readable. Riding the Sketch engine, every edge gets the hand-drawn displacement ' +
    'wobble and the type is set in a Patrick-Hand / Gloria-Hallelujah marker face, so the whole thing reads as ' +
    'drawn in soft pastel by hand. Ships `experimental` like the Sketch family.',
  origin:
    'The classroom art room and the "sugar paper" (UK) / construction-paper (US) craft register — chalk and oil ' +
    'pastel on dusty blue-grey stock, the wobbly hand of a child\'s drawing. It is the powdery, soft-coloured ' +
    'cousin of the ink-blue notebook Sketch (Marker): same engine wobble and hand font, a completely different ' +
    'surface and palette.',
  signatures: [
    {
      label: 'Dusty blue-grey "sugar paper" field',
      detail:
        '`surface.base` is `#dfe5ea` — the specific dusty blue-grey of classroom craft stock, not a cream notebook or a white page. The cool paper is what reads as "sugar paper."',
    },
    {
      label: 'Powdery chalk-pastel intents',
      detail:
        'chalk-blue primary, soft green success, dusty rose danger, classroom-gold warning — muted, slightly-chalky colours that read as pastel rubbed into paper, not marker or print.',
    },
    {
      label: 'Hand-drawn wobble on every edge',
      detail:
        '`effect.strokeVariance` is `1.6px` — the Sketch engine\'s SVG displacement recasts every border, ring, and glyph as a hand-drawn line, the wobble of a child\'s pastel stroke.',
    },
    {
      label: 'Marker / handwriting font throughout',
      detail:
        '`typography.family.*` route to a Patrick-Hand / Gloria-Hallelujah hand stack, so even body text is handwritten — the classroom-wall feel.',
    },
  ],
  antiSignatures: [
    'A cream or white paper field — sugar paper is dusty blue-grey',
    'Crisp, un-wobbled edges — the Sketch displacement is structural',
    'A clean sans or serif body — the register is set in a marker hand font',
    'Saturated, hard marker or print colour — the intents are powdery chalk pastel',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Dusty blue-grey `#dfe5ea` — classroom sugar-paper stock.' },
    { path: 'color.intent.primary.bg', note: 'Chalk-blue `#3f6f8f` — powdery pastel, not marker.' },
    { path: 'effect.strokeVariance', note: '`1.6px` — the hand-drawn wobble amplitude.' },
    { path: 'typography.family.hand', note: 'Patrick-Hand marker stack — handwritten body text.' },
  ],
  lookalikes: [
    {
      against: 'sketch-marker',
      differentiator:
        'Same Sketch engine — identical wobble and hand font. Sketch (Marker) is ink-blue ballpoint on a cream notebook page with a red-marker accent. Sugar Paper Chalk swaps both surface and medium: dusty blue-grey craft stock and powdery chalk-pastel colours instead of cream paper and saturated marker ink.',
    },
    {
      against: 'soft-pastel',
      differentiator:
        'Both are soft and pastel. Soft Pastel is a crisp flat app — clean edges, a clean sans, pastel fills on near-white. Sugar Paper Chalk is hand-made: the Sketch wobble and marker font turn the same pastel instinct into a child\'s classroom drawing on dusty craft paper.',
    },
  ],
  recallAliases: ['sugar paper', 'chalk', 'sugar paper chalk', 'pastel chalk', 'classroom', 'craft paper'],
}
