import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'zen-sumie',
  tagline:
    'East-Asian brush-and-ink register on the Sketch engine — rice-paper field, brush-black `intent.primary`, single seal-vermilion `intent.danger` + focus ring, brush-script display, `effect.strokeVariance` tuned to `1.0px`.',
  summary:
    'Zen / Sumi-e is the second register on the Sketch engine (after Hand-drawn / Marker), proving the engine ' +
    'carries non-Western brushwork. Unbleached rice paper (`#f4ecd8`) fills `surface.base`; brush ink-black ' +
    '(`#1a1612`) carries `intent.primary`; seal vermilion (`#a8231c`) carries `intent.danger`, `border.focus`, ' +
    'and `content.link` — the only saturated chromatic in a traditional sumi-e composition. `effect.strokeVariance` ' +
    'is `\'1.0px\'` (down from marker\'s `\'1.4px\'`) — brush strokes are wobbly but less so than felt-tip marker. ' +
    'Display / title / heading all route through `family.hand` (brush-script).',
  origin:
    'The East-Asian sumi-e (墨絵, "ink picture") tradition — Tang Dynasty Chinese origins, c.618–907, brought to ' +
    'Japan via Zen Buddhist temples in the 13th century. The visual vocabulary is rice-paper field (unbleached ' +
    'washi), brush-black ground sumi-e ink, and a single seal stamp (hanko / yinzhang) in vermilion as the only ' +
    'saturated chromatic. Negative space (`ma`, 間) is the primary compositional element — the empty paper is part ' +
    'of the painting, not absence.',
  signatures: [
    {
      label: '`effect.strokeVariance: \'1.0px\'` (vs Hand-drawn / Marker\'s `1.4px`)',
      detail:
        'The Sketch engine\'s SVG turbulence + displacement filter reads `strokeVariance` to scale edge wobble. Brush strokes wobble but less than felt-tip; tuning the value down is what makes Zen / Sumi-e read as brush rather than as a quieter marker. Same filter, same slot, different amplitude — the pair proves the engine generalises across non-Western brushwork.',
    },
    {
      label: 'Single seal-vermilion accent on a monochrome field',
      detail:
        '`intent.danger.bg`, `border.focus`, and `content.link` are all `#a8231c` — the colour of a personal hanko stamp. Every other intent (`success`, `info`) stays near-monochromatic dark teal / dark blue so the seal red reads as unique. Traditional sumi-e treats the seal as the only saturated chromatic in the composition; the palette enforces that rule.',
    },
    {
      label: 'Brush-script `family.hand` routed through display / title / heading',
      detail:
        '`typography.family.display` and `family.hand` are both brush-script (Ma Shan Zheng / Yuji Mai). Hand-drawn / Marker routes most roles through `family.hand`; Zen / Sumi-e tunes the routing harder — `display`, `title`, and `heading` ALL route through `hand` so the brush register reads on every section title. `family.body` stays Inter for legibility.',
    },
    {
      label: 'Widened `space.*` for `ma` (negative-space composition)',
      detail:
        '`space.6: \'36px\'`, `space.7: \'56px\'`, `space.8: \'80px\'` — more aggressive than Scandinavian Royal Modern\'s 25% widening. The empty cream is part of the composition, not just margin.',
    },
  ],
  antiSignatures: [
    'A pure-white `surface.base` (unbleached rice paper is the field colour)',
    'Multiple saturated chromatic intents — the seal red is meant to be unique',
    '`effect.strokeVariance: \'0\'` (the brush wobble is the engine cue)',
    'A sans-serif `display` family — the brush script is the load-bearing register',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Unbleached rice paper `#f4ecd8` — warmer than Hand-drawn / Marker\'s notebook cream.' },
    { path: 'color.intent.primary.bg', note: 'Brush ink-black `#1a1612` — freshly-ground sumi-e stick.' },
    { path: 'color.intent.danger.bg', note: 'Seal vermilion `#a8231c` — the hanko-stamp colour, the only saturated chromatic.' },
    { path: 'effect.strokeVariance', note: '`\'1.0px\'` — tuned down from marker\'s `\'1.4px\'` for brush amplitude.' },
    { path: 'typography.family.hand', note: 'Ma Shan Zheng / Yuji Mai — brush-script.' },
    { path: 'space.8', note: '`\'80px\'` — aggressive whitespace for `ma` (negative-space composition).' },
  ],
  lookalikes: [
    {
      against: 'sketch-marker',
      differentiator:
        'Same Sketch engine, opposite cultural register. Hand-drawn / Marker: notebook-paper cream, ink-blue body, five-marker palette (navy / red / green / mustard / teal), `strokeVariance` `1.4px`, Caveat brush-marker display (Western felt-tip register). Zen / Sumi-e: rice-paper cream, monochrome brush-ink, single seal-vermilion accent, `strokeVariance` `1.0px`, brush-script display (East-Asian brush register). The pair proves the engine generalises across cultural brush traditions.',
    },
    {
      against: 'letterpress',
      differentiator:
        'Both use cream / off-white fields with restrained ink accents. Letterpress: Flat engine, `intent.*.bg` debossed via paired inset shadows, Caslon serif throughout, five-ink intent vocabulary. Zen / Sumi-e: Sketch engine, every edge displaced by the SVG turbulence filter, brush-script display, monochrome-plus-seal-red intent vocabulary. Engine difference is the load-bearing one (wobble vs deboss).',
    },
    {
      against: 'cardstock-layered',
      differentiator:
        'Both use cream-paper fields with restrained type. Cardstock: Cardstock engine, every raised surface a piece of cut cardstock with 1 px slate-ink rule along bottom/right and a tight close shadow. Zen / Sumi-e: Sketch engine, every edge displaced by the wobble filter, large `radius.lg: 14px` so corners survive the displacement. Cardstock is crisp paper craft; Zen / Sumi-e is brush-ink composition.',
    },
  ],
  thrivesWith: [
    'Editorial / meditation / wellness interfaces',
    'East-Asian cultural-content surfaces (galleries, museum collections, calligraphy schools)',
    'Hero panels with brush-script headings on `surface.raised`',
  ],
  degradesWith: [
    'Form-heavy interfaces (the displacement filter softens small-glyph legibility)',
    'Dense data tables (the widened `space.*` and the wobble eat density on every row)',
  ],
  recallAliases: ['zen', 'sumi-e', 'sumie', 'brush', 'ink wash', 'east asian'],
}
