import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'origami-fold',
  tagline:
    'The folded-paper register on the Cardstock engine — crisp bright-white stock, charcoal ink, the cut-edge re-read as a crease, and saturated paper-crane facet colours.',
  summary:
    'Origami Fold takes the Cardstock engine\'s cut-edge and reinterprets it as a fold. `surface.base` is a crisp ' +
    'paper-white `#f3f1ec` lifting to pure white, `content.primary` is charcoal `#2b2a28`, and the intents are the ' +
    'saturated facet colours of a folded paper crane: vermilion primary `#c2452e`, leaf success, marigold warning, ' +
    'sky info, crimson danger. Corners are near-square (`radius.sm = 0`, `lg = 4px`) and `elevation.*` is a paired ' +
    'inset rule plus a hard zero-blur drop — the crease line of a sheet folded once and pressed flat.',
  origin:
    'Origami and kami paper-craft — the bright kraft squares of a folding kit, the hard creases and crisp facets ' +
    'of a finished crane. On the Cardstock engine the metaphor shifts from "stacked cardstock" to "one sheet ' +
    'folded": the same cut-edge shadow becomes the fold, and the colour comes from the printed side of the paper.',
  signatures: [
    {
      label: 'Hard crease elevation (inset rule + zero-blur drop)',
      detail:
        '`elevation.*` pairs an `inset -1px -1px 0` rule with a hard `Npx Npx 0` drop — no blur. A folded sheet casts a crisp close shadow along the crease, which is exactly this stack.',
    },
    {
      label: 'Saturated paper-crane facet colours',
      detail:
        'The intents are a folding-kit palette: vermilion primary, leaf success, marigold warning, sky info, crimson danger. Each is a printed paper facet, not a pastel.',
    },
    {
      label: 'Near-square corners',
      detail:
        '`radius.sm = 0`, `md = 2px`, `lg = 4px`. Folded paper has sharp corners; rounding them would soften the crease away.',
    },
    {
      label: 'Cardstock cut-edge re-read as a fold',
      detail:
        '`effect.paperEdgeColor` / `paperEdgeWidth` are set (the engine signal), but here the edge is the fold line of a single sheet rather than the boundary between two stacked cards.',
    },
  ],
  antiSignatures: [
    'Soft, blurred drop shadows — folds cast hard, crisp shadows (zero-blur)',
    'Large rounded corners — folded paper is sharp-cornered',
    'Pastel or muted intents — the crane facets are saturated printed colour',
    'A textured or aged paper field — origami stock is crisp and bright',
  ],
  tokenEvidence: [
    { path: 'elevation.high.boxShadow', note: 'Inset rule + `4px 4px 0` zero-blur drop — the crease shadow.' },
    { path: 'color.intent.primary.bg', note: 'Vermilion `#c2452e` — the paper-crane red facet.' },
    { path: 'radius.sm', note: '`0` — sharp folded corners.' },
    { path: 'effect.paperEdgeColor', note: 'Cut-edge signal, here the fold line of a single sheet.' },
  ],
  lookalikes: [
    {
      against: 'cardstock-layered',
      differentiator:
        'Same Cardstock engine and cut-edge mechanism. Cardstock Layered is muted-pastel paper stacked in layers — sage, butter, dusty rose on cream. Origami Fold is one bright sheet folded: crisp white stock, near-square corners, and saturated paper-crane facet colours instead of soft pastels.',
    },
    {
      against: 'paper-pop',
      differentiator:
        'Paper-Pop is a flat monochrome-plus-one-accent app on pure white. Origami Fold is multi-colour and dimensional: the Cardstock crease shadow gives every surface a folded edge, and the intents are a full crane-facet palette rather than a single pop accent.',
    },
  ],
  recallAliases: ['origami', 'origami fold', 'folded paper', 'paper crane', 'kami', 'fold'],
}
