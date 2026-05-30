import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'vercel-geist',
  tagline:
    'Vercel Geist / shadcn modern dev-tool register on the Flat engine — pure-white field, pure-black `intent.primary`, signature `#0070f3` blue on `info` and focus, hairline-ring elevations, Geist Sans throughout.',
  summary:
    'Vercel Geist is the "ship a developer dashboard" register on the modern-light Flat-engine grid. ' +
    '`surface.base` and `surface.raised` are both pure white (`#ffffff`) — depth is delivered through 1-px ' +
    'hairline `#eaeaea` borders, not by differentiated surface luminance. `intent.primary.bg` is pure black ' +
    '(`#000000`) — the Vercel convention where the primary button is a solid black slab. `intent.info` is the ' +
    'signature `#0070f3` blue, which also carries `content.link` and `border.focus`. `family.*` routes to Geist ' +
    'Sans with Inter / Söhne fallback; display weights climb to 600 (semibold, not bold).',
  origin:
    'The Vercel / shadcn / modern-dev-tool generation, 2020 onward — Vercel\'s own dashboard, shadcn/ui as the ' +
    'reference component library, Next.js documentation, every "ship a developer SaaS in 2024" project. The ' +
    'colour vocabulary is pure-white / pure-black with one saturated blue accent (`#0070f3`, the Vercel link ' +
    'colour). The typography is the Vercel-commissioned Geist (Sans + Mono).',
  signatures: [
    {
      label: 'Pure-white `surface.base` and `surface.raised` (`#ffffff` flat-on-flat)',
      detail:
        '`surface.base` and `surface.raised` are both `#ffffff` — depth is delivered through 1-px hairline borders, not by differentiated surface luminance. The flat-on-flat surface stack is the load-bearing move: every card, modal, and popover sits on the same near-white field and is bounded by a hairline `#eaeaea` ring.',
    },
    {
      label: 'Pure-black `intent.primary` (`#000000`) — solid obsidian button',
      detail:
        '`intent.primary.bg` is `#000000` — the Vercel convention where the primary button is a solid black slab. Second palette in the showcase to use pure black as primary (alongside Swiss / International), but Swiss reads the black as typographic ink and Vercel Geist reads it as a polished obsidian component.',
    },
    {
      label: 'Signature `#0070f3` blue on `intent.info`, `content.link`, and `border.focus`',
      detail:
        '`intent.info.bg`, `content.link`, and `border.focus` all share `#0070f3` — Vercel\'s canonical link blue and the brand-defining accent. Links carry the Vercel blue, distinguishing them from `intent.primary` (black) the way the brand site does.',
    },
    {
      label: 'Geist Sans throughout, display weight 600 (not 700)',
      detail:
        '`typography.family.*` aliases to `"Geist", "Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif`. Display, title, and heading all sit at weight 600 (semibold). Pushing display to 700 would read as too aggressive — the Geist register favours medium weights at large sizes.',
    },
    {
      label: 'Hairline-ring `elevation.low` (`0 0 0 1px #eaeaea`) with neutral shadow tint',
      detail:
        '`elevation.low` is a 1 px hairline ring; `medium` adds a very low-alpha drop shadow over the same hairline. Shadow tint is neutral grey (`rgba(0, 0, 0, 0.04 → 0.16)`) — no chromatic cast, the way Vercel\'s own components paint depth.',
    },
    {
      label: 'Tight `radius.*` (`sm = 4px / md = 6px / lg = 8px`)',
      detail:
        'Modern shadcn / Vercel components round just enough to read as friendly without committing to claymorphism softness. The tight scale is shared with Linear Workspace.',
    },
  ],
  antiSignatures: [
    'Tinted or coloured `surface.base` — pure-white flat-on-flat is structural',
    'A second saturated chromatic accent competing with the `#0070f3` blue',
    'Coloured shadow alpha — Vercel\'s depth is always neutral grey',
    'Serif `display` family — single-family Geist is structural',
    'Display weights at 700+ — the Geist register caps at 600 (semibold)',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Pure white `#ffffff` — flat-on-flat with `surface.raised`.' },
    { path: 'color.surface.raised', note: 'Pure white `#ffffff` — identical to base; depth comes from hairlines only.' },
    { path: 'color.intent.primary.bg', note: 'Pure black `#000000` — the Vercel obsidian-button convention.' },
    { path: 'color.intent.info.bg', note: 'Signature Vercel blue `#0070f3` — also carries link and focus.' },
    { path: 'color.content.link', note: '`#0070f3` — links share the brand blue, distinguishing them from black primary.' },
    { path: 'typography.family.ui', note: 'Geist-first stack with Inter / Söhne fallback.' },
    { path: 'typography.role.display.weight', note: '600 (semibold), not 700 — the Geist register caps here.' },
    { path: 'elevation.low.boxShadow', note: '`0 0 0 1px #eaeaea` — hairline ring, neutral grey, no chromatic tint.' },
  ],
  lookalikes: [
    {
      against: 'linear-workspace',
      differentiator:
        'Both palettes are modern-dev-tool registers on the Flat engine with single-family sans, tight `radius`, and hairline-ring elevations. Linear Workspace tints the field cool (`#fbfbfc`) and uses Linear-iris `#5e6ad2` as primary with Inter body at 14 px. Vercel Geist commits to pure-white flat-on-flat surfaces with pure-black `#000000` primary, the `#0070f3` blue on info/link/focus, and Geist Sans at display weight 600.',
    },
    {
      against: 'flat-classic',
      differentiator:
        'Flat / Classic is the unornamented baseline: white raised on grey-white base, a saturated blue `#1d4ed8` as primary + link + focus, system stack typography, soft gaussian drop shadows. Vercel Geist sharpens every move: flat-on-flat pure-white surfaces, pure-black `#000000` primary slab, the Vercel `#0070f3` reserved for link/info/focus, Geist Sans, hairline-ring elevations.',
    },
    {
      against: 'swiss-international',
      differentiator:
        'Both palettes use pure black on pure white. Swiss / International reads black as typographic ink: zero radius, generous grid, Helvetica throughout, no chromatic accent vocabulary beyond signal red. Vercel Geist reads black as obsidian component: tight `radius`, hairline-ring elevations, Geist Sans, full intent vocabulary anchored by `#0070f3` blue.',
    },
  ],
  thrivesWith: [
    'Developer dashboards, documentation surfaces, deploy logs',
    'Form-heavy SaaS settings panels — the hairline-ring elevation keeps cards quiet',
    'Code-block-heavy long-form — Geist Mono pairs naturally with Geist Sans',
  ],
  degradesWith: [
    'Brand-marketing pages that want warmth or chromatic richness — the pure-white / pure-black register reads as utilitarian',
    'Consumer-app registers that want soft colour — there is no warmth in the palette',
  ],
  recallAliases: ['vercel', 'geist', 'vercel geist', 'shadcn', 'next.js', '#0070f3'],
}
