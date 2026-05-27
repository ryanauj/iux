import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'mall-goth',
  tagline:
    'Late-90s Hot-Topic register on the flat engine — one-shade-off-pure-black field with a magenta-purple cast, blood-red `#a01f2c` accent everywhere, condensed Cinzel serif display, and gig-poster letter-spacing on labels.',
  summary:
    'Mall-goth is the flat-engine palette tuned for the Hot-Topic / Cinzel-serif aesthetic. `surface.base` is ' +
    "`#0a0608` — one shade off pure black; `raised` (`#13090f`) lifts with a magenta-purple cast so panels read " +
    'as "crushed velvet over black" rather than grey. Blood red `#a01f2c` carries `link`, `border.strong`, ' +
    "`border.focus`, and `intent.primary`. `info` collapses to deep violet `#3a1c4a` because the aesthetic " +
    "doesn't admit a bright accent — every intent stays crepuscular. Tracking on `subheading` / `label` / " +
    "`caption` is pushed wide (`0.10`–`0.14em`) to mimic gig-poster credits.",
  origin:
    'Late-1990s / early-2000s mall-goth — Hot Topic, Spencer\'s Gifts, the Vampire: The Masquerade aisle, and the ' +
    'velvet-drape Cinzel-on-poster headline grammar of metal album covers and gig flyers. Sits between gothic ' +
    'subculture and suburban mall consumerism. This palette is the period-correct revival on the flat engine — ' +
    'no glow, no scanline, no glass: just dark velvet and red ink.',
  signatures: [
    {
      label: 'Near-black field with magenta-purple cast on `raised` (`#13090f` over `#0a0608`)',
      detail:
        'The depth between `surface.base` and `surface.raised` is in saturation, not luminance. Both colors are ' +
        'effectively black; `raised` carries a slight magenta-purple bias so panels read as crushed velvet over flat ' +
        'black. `sunken` (`#050204`) is darker still. `overlay` lifts further to `#1a0d14`.',
    },
    {
      label: 'Blood-red accent (`#a01f2c` / `#c41e2f`) at link, focus, primary, and `border.strong`',
      detail:
        '`content.link = #c41e2f`, `border.strong = #a01f2c`, `border.focus = #c41e2f`, `intent.primary.bg = #a01f2c`. One ' +
        'accent does all the work — there is no secondary accent. `border.subtle` and `border.default` are the same red ' +
        'at 20% / 50% alpha.',
    },
    {
      label: 'No bright accents — `info` collapses to deep violet `#3a1c4a`',
      detail:
        'Every other flat-engine palette uses cyan or blue for `info`. Mall-goth refuses — `info` lands on deep violet, ' +
        '`success` on forest green `#3a5a32` (not lime), `warning` on oxblood-brown amber `#7a5500`. The whole intent ' +
        'palette stays crepuscular.',
    },
    {
      label: 'Condensed serif display (Cinzel / UnifrakturCook / Bodoni Moda)',
      detail:
        "`typography.family.display` is `\"Cinzel\", \"UnifrakturCook\", \"Bodoni Moda\", \"Trajan Pro\", \"Times New Roman\", serif`. " +
        'Cinzel is the load-bearing Roman-capitals carved-stone face; UnifrakturCook is the blackletter fallback. ' +
        '`display` weight 700 at 3.75rem with `lineHeight: 0.95` packs the cap-height tight.',
    },
    {
      label: 'Wide-tracked uppercase labels (gig-poster credits)',
      detail:
        '`subheading` ships `tracking: 0.12em + textTransform: uppercase`; `label` ships `tracking: 0.14em + uppercase`; ' +
        '`caption` ships `tracking: 0.10em + uppercase`. The wide tracking on small uppercase mimics how gig-poster ' +
        'credits and album-liner notes are typeset — credits as widely-spaced caps, not body case.',
    },
    {
      label: 'Tightened `space.*` scale crowds panels',
      detail:
        '`space.1 = 2px`, `space.4 = 14px`, `space.8 = 56px` — every step ~25% tighter than Flat / Classic. Panels ' +
        'pack closer the way the aesthetic crowds the page with overlapping flyers and patch-jackets.',
    },
  ],
  antiSignatures: [
    'A bright cyan / sky-blue `info` — defeats the crepuscular palette rule',
    'A geometric sans like Inter or Space Grotesk on display — Cinzel serif is load-bearing',
    'Light-mode surfaces — Mall-goth is dark-only, with magenta-cast near-blacks',
    'Hard offset block shadows or scanline overlays — Mall-goth is on the flat engine, not Cel-shaded / CRT',
    'Tight body tracking on labels — Mall-goth pushes wide caps tracking on every small role',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.base',
      note: '`#0a0608` — one shade off pure black, the mall-goth field.',
    },
    {
      path: 'color.surface.raised',
      note: '`#13090f` — the magenta-purple cast on `raised` reads as crushed velvet.',
    },
    {
      path: 'color.intent.primary.bg',
      note: '`#a01f2c` blood red — the single accent the palette commits to.',
    },
    {
      path: 'color.intent.info.bg',
      note: '`#3a1c4a` deep violet — the refusal of a bright accent on `info`.',
    },
    {
      path: 'color.border.focus',
      note: '`#c41e2f` blood-red focus ring, matches `content.link`.',
    },
    {
      path: 'typography.family.display',
      note: 'Cinzel / UnifrakturCook / Bodoni Moda serif stack — condensed Roman-capitals carved-stone face.',
    },
    {
      path: 'typography.role.label.tracking',
      note: '`0.14em` with `textTransform: uppercase` — gig-poster credits tracking on every label.',
    },
    {
      path: 'space.1',
      note: '`2px` — the tightened space scale (Flat / Classic uses `4px` at the same step).',
    },
  ],
  lookalikes: [
    {
      against: 'cyberpunk-neon-noir',
      differentiator:
        'Both run dark fields, but Cyberpunk Neon Noir paints neon-cyan / magenta accents with glow + bloom recipes — ' +
        "decoration is light. Mall-goth strips every bright color out (no cyan, no lime; `info` collapses to violet, " +
        '`success` to forest green) and commits to a single blood-red accent with serif display. Cyberpunk glows; ' +
        'mall-goth absorbs.',
    },
    {
      against: 'tron-dark-neon',
      differentiator:
        'Tron is the glassmorphism engine in a dark register with a single cyan glow accent + inset-stroke + outer-glow ' +
        'elevation. Mall-goth is the flat engine on near-black with a single red accent and no glow at all — `effect.glow` ' +
        'and `backdropBlur` are zeroed. The two share "single dark + single accent" framing but the engine signals diverge.',
    },
    {
      against: 'crt-phosphor-green',
      differentiator:
        'CRT/Phosphor (Green) is the engine-level tube simulation — scanline overlay, phosphor bloom, decay regime, and ' +
        'every slot resolving to one phosphor color. Mall-goth has none of that — flat engine, no overlay, no glow, no ' +
        'decay. The "near-black field" feel is shared; everything underneath is different.',
    },
  ],
  thrivesWith: [
    'Cards, Modals, Drawers — `raised` magenta cast over near-black `base` reads as crushed velvet',
    'Buttons / Toggles with `intent.primary` — single blood-red accent is what the palette is for',
    'Heading and display roles — Cinzel serif at 3.75rem is the gig-poster headline',
  ],
  degradesWith: [
    'PropertyInspector — `caption` muted on `sunken` drops below AA on dense rows (README flags this as most likely to fail)',
    'Dense tables — tightened `space.*` crowds rows and muted alpha falls on `raised` panels',
    'Components that need to distinguish `primary` and `danger` — both intents are dark reds differing only by luminance',
    'Long muted-text paragraphs — `content.muted` at 44% alpha falls near AA on every non-`base` surface',
  ],
  recallAliases: ['mall-goth', 'mall goth', 'goth', 'hot topic', 'gothic', 'velvet goth'],
}
