import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'cardstock-layered',
  tagline:
    'Cut-paper-stack register — every raised surface reads as a piece of cardstock laid over the page, with a darker rule along bottom/right for the stock\'s visible thickness and a tight zero-blur drop for the gap below.',
  summary:
    'Cardstock (Layered) is the only palette on the `cardstock` engine, and the only palette in the system that exercises `effect.paperEdgeColor` and `effect.paperEdgeWidth` as non-no-op values (`rgba(45, 53, 67, 0.18)` and `1px`). ' +
    'The metaphor is delivered through `elevation.*` directly: every slot is a paired stack of (1) an `inset -Npx -Npx 0 rgba(slate, α)` cut-edge rule along the bottom/right inside the surface, plus (2) a tight zero-blur `0 Mpx 0 rgba(slate, β)` drop shadow for the gap to the layer below. No blur, no spread, no glow — a real piece of cardstock casts a hard close shadow. The field is warm cream (`#f5f0e2`) with slate ink (`#2d3543`) body type and a muted-pastel intent palette (sage / cream / butter / dusty rose / slate-blue).',
  origin:
    'A handmade / craft-paper aesthetic from print, scrapbooking, and physical card-stack interfaces — every surface read as a cut piece of cardstock laid over another piece. The engine is a 2024+ original to this design system: rather than fake the look with a CSS engine block that overrides every raised component, the cut-edge is baked into the palette\'s own `elevation.*` shadow strings as a paired inset + outset stack.',
  signatures: [
    {
      label: 'Paired `elevation.*` stack — inset cut-edge + zero-blur drop',
      detail:
        '`elevation.low` is `inset -1px -1px 0 rgba(45, 53, 67, 0.18), 0 1px 0 rgba(45, 53, 67, 0.08)`. The inset paints the cut-edge thickness along the bottom/right; the outset is a zero-blur drop for the gap to the layer below. Scales to `inset -2px -2px 0 rgba(45, 53, 67, 0.24), 0 8px 0 rgba(45, 53, 67, 0.14)` at `overlay` — thicker stock, larger gap.',
    },
    {
      label: 'Load-bearing `effect.paperEdgeColor` and `effect.paperEdgeWidth`',
      detail:
        '`effect.paperEdgeColor` is `rgba(45, 53, 67, 0.18)` and `effect.paperEdgeWidth` is `1px`. Every other palette in the system returns `transparent` and `0` for these slots. This is the only palette that paints anything when a paper-aware component reads `var(--paper-edge-color)`.',
    },
    {
      label: 'Warm cream paper field (`#f5f0e2`) with slate-ink body (`#2d3543`)',
      detail:
        '`surface.base` is `#f5f0e2`, `raised` lifts to `#fbf7ec`, `overlay` brightens further to `#fdfbf3` — three pieces of stock in the same warm-cream family. `content.primary` is slate `#2d3543`, sitting at ≈ 12:1 on raised cream — AAA at every size. Ink sits on paper, not in paper.',
    },
    {
      label: 'Muted-pastel intent set (sage / butter / dusty rose / slate-blue)',
      detail:
        '`intent.primary` is sage `#6b8a6b`, `intent.success` is deeper sage `#588558`, `intent.warning` is butter `#c69a4e`, `intent.danger` is dusty rose `#a85a59`, `intent.info` is slate-blue `#6b7b8c`. Each `border` is one luminance step darker than its `bg` so the cut-edge convention applies to intent buttons too. `intent.neutral` is cream `#e8e0c9` with slate-ink content.',
    },
    {
      label: 'Slate-tinted shadows, never pure black',
      detail:
        'All `elevation.*` rgba values use `rgba(45, 53, 67, …)` — the same slate as `content.primary` — rather than `rgba(0, 0, 0, …)`. The paper-warm field crushes pure-black shadows visually, so the stack is tinted toward slate ink for a credible cardstock look.',
    },
    {
      label: 'Clean modern sans treated as ink (system-ui throughout)',
      detail:
        '`typography.family.ui` and `family.display` both resolve to `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`. There is no hand-drawn font, no deboss / emboss, no paper-textured type. The brief is explicit: type is ink on the paper, not styled like paper itself.',
    },
  ],
  antiSignatures: [
    'Diffuse blurred drop shadows or rim glow — cardstock casts a hard close shadow, not a halo',
    'Pure-black `rgba(0, 0, 0, …)` elevation — must be slate-tinted against the cream field',
    'Pure white `surface.raised` — every paper layer stays in the warm-cream family',
    'Hand-drawn, debossed, or paper-textured type — type is ink on paper, not paper itself',
    'Torn-edge or deckled-edge treatments — the edge is `cut`, clean rule along bottom/right',
  ],
  tokenEvidence: [
    {
      path: 'effect.paperEdgeColor',
      note: '`rgba(45, 53, 67, 0.18)` — the ONLY palette where this is non-transparent. The engine\'s load-bearing signal.',
    },
    {
      path: 'effect.paperEdgeWidth',
      note: '`1px` — the ONLY palette where this is non-zero. Documents the engine\'s intended cut-edge thickness.',
    },
    {
      path: 'elevation.low.boxShadow',
      note: '`inset -1px -1px 0 rgba(45, 53, 67, 0.18), 0 1px 0 rgba(45, 53, 67, 0.08)` — the paired stack: cut-edge inset + zero-blur drop.',
    },
    {
      path: 'elevation.overlay.boxShadow',
      note: '`inset -2px -2px 0 rgba(45, 53, 67, 0.24), 0 8px 0 rgba(45, 53, 67, 0.14)` — heavier cut-edge (2px) and longer drop (8px); a thick piece of cardstock falling onto the page.',
    },
    {
      path: 'color.surface.base',
      note: 'Warm cream `#f5f0e2` — the paper field. `raised` `#fbf7ec` and `overlay` `#fdfbf3` are brighter pieces of stock in the same family.',
    },
    {
      path: 'color.content.primary',
      note: 'Slate `#2d3543` — ink on paper at ≈ 12:1 on raised cream. The same slate tints every shadow in the elevation stack.',
    },
    {
      path: 'color.intent.primary.bg',
      note: 'Sage `#6b8a6b` — the muted-pastel intent register; cream `inverse` content clears AA at ≈ 4.6:1.',
    },
    {
      path: 'typography.family.ui',
      note: '`system-ui` stack — clean modern sans treated as ink. No hand-drawn or paper-textured face.',
    },
  ],
  lookalikes: [
    {
      against: 'letterpress',
      differentiator:
        'Letterpress is the inked-impression register on a paper field — type debossed INTO the paper with simulated ink-spread halos. Cardstock-layered is the cut-paper-stack register: type sits ON top of the paper as plain ink, and the engine signal is the cut-edge along bottom/right of every raised surface, not an impression effect.',
    },
    {
      against: 'mid-century-modern',
      differentiator:
        'Mid-century modern is a flat-engine cream-paper register with period swatch intents and a starburst-dot overlay tiled at the root. Cardstock-layered is on the `cardstock` engine: same warm-cream feel, but the load-bearing signal is `effect.paperEdgeColor` / `paperEdgeWidth` and the paired-shadow elevation stack — every raised surface reads as physical stock, not as flat decoration.',
    },
    {
      against: 'flat-classic',
      differentiator:
        'Flat/Classic uses soft gaussian drop shadows for elevation and a white `raised` over neutral-grey `base`. Cardstock-layered swaps the soft shadows for a paired inset cut-edge + zero-blur drop, keeps every surface in the warm-cream family, and is the only palette in the system where `effect.paperEdgeColor` is non-transparent.',
    },
    {
      against: 'editorial',
      differentiator:
        'Editorial is a flat-engine typographic register — serif/sans body mix on near-paper, gentle conventional elevation. Cardstock-layered keeps a sans-only ink-on-paper treatment and commits its load-bearing signal to the elevation stack\'s cut-edge cue rather than to type.',
    },
  ],
  thrivesWith: [
    'Card, Modal, Drawer, Toast — the engine\'s native surfaces; a modal opens as a thick piece of cardstock falling onto the page',
    'Bento, Sidebar, Tabs, Segmented, Pagination, Stepper — block fills with cut edges turn section/sub-section composition into a literal stack of papers',
    'Tooltip, EmptyState — small papers popping up; the metaphor is illustration-adjacent and reads naturally',
    'Button, Toggle, Checkbox — the inset cut-edge reads as button thickness pressed into cardstock',
  ],
  degradesWith: [
    'Table with dense rows — README flags this; 20 stacked cardstock layers in a column read as striped noise from the repeated cut edges, not as paper',
    'DiffView with character-level highlight — the inset edge on every chunk overlaps the colored highlight as "two darker rules along bottom/right of every span"',
    'VirtualList / long scrolling columns — same row-density problem as Table',
    'SpatialCanvas, BezierEditor — the spatial depth model fights the flat paper metaphor; cut-edges read as wrong even though they apply correctly',
  ],
  recallAliases: ['cardstock', 'cardstock layered', 'cardstock (layered)', 'cut paper', 'paper stack', 'layered paper'],
}
