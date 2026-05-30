import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'sage-studio',
  tagline:
    'Modern botanical / wellness-brand register on the Flat engine — bone-paper field, deep-sage primary, terracotta warning, transitional-serif display over geometric body sans.',
  summary:
    'Sage Studio is the "modern wellness brand site" register on the modern-light Flat-engine grid — Aesop-feel ' +
    'typography over a herbarium colour set. `surface.base` is bone (`#f3efe6`) with a 2-3% yellow undertone; ' +
    '`intent.primary.bg` is deep sage (`#3e5d3a`), a desaturated forest-leaf sitting between olive and pine. ' +
    '`intent.success` is matcha (`#5a7c3a`) — visibly lighter than primary so the two greens differentiate by ' +
    'hue rather than by luminance. `family.display` is Fraunces (or DM Serif Text fallback), a contemporary ' +
    'transitional serif; `family.body` and `family.ui` route to Inter for clean prose.',
  origin:
    'The 2010s–2020s modern-wellness brand lane — Aesop, Goop, Glossier, modern apothecaries and herbalist ' +
    'studios. The visual vocabulary maps to herbarium prints and unbleached linen: warm bone paper, dried-herb ' +
    'greens, kiln-fired clay accents, a contemporary transitional serif borrowed from independent magazine design.',
  signatures: [
    {
      label: 'Warm bone-paper field (`#f3efe6`)',
      detail:
        '`surface.base` is bone with a 2-3% yellow undertone — warmer than Heritage Maritime\'s bone, warmer than Stone Modern\'s warm stone. The yellow undertone is what grounds the sage as "dried herbs against unbleached linen" rather than as "leaves on grey paper."',
    },
    {
      label: 'Deep-sage `intent.primary` + matcha `intent.success` (hue-distinct greens)',
      detail:
        '`intent.primary.bg` is `#3e5d3a` (olive-leaning leaf-sage); `intent.success.bg` is `#5a7c3a` (lighter, more matcha-leaning). The challenge with sage palettes is keeping the two greens distinct; this palette solves it by hue (primary is the leaf, success is the harvest) rather than by luminance alone.',
    },
    {
      label: 'Terracotta warning as the warm complement',
      detail:
        '`intent.warning.bg` is `#c25624` — kiln-fired clay orange, the load-bearing second accent. The terracotta + sage pairing is the chromatic signature of the modern-wellness register.',
    },
    {
      label: 'Fraunces transitional serif on `display`',
      detail:
        '`typography.family.display` is `"Fraunces", "DM Serif Text", "Bodoni Moda", "Georgia", serif` — a contemporary transitional serif with a soft-modern feel; `display` weight is 600. The serif display is what distinguishes this from Solarpunk\'s Quicksand (rounded sans) and from Linear Workspace\'s Inter-everywhere register.',
    },
    {
      label: 'Sage-tinted soft drop shadows on `elevation.*`',
      detail:
        '`elevation.low` is `0 1px 2px rgba(45, 60, 35, 0.08)` — shadow alpha tints toward sage so raised cards lift as pressed-paper above linen, not as neutral panels. The shadow tint pulls toward primary the same way Heritage Maritime\'s pulls toward navy.',
    },
    {
      label: 'Generous `space.*` at the high end (`6: 36px / 7: 52px / 8: 72px`)',
      detail:
        'The modern-wellness register depends on breathing room. The widened `space` scale is shared with Dieter Rams and Stone Modern — generous whitespace as a primary organising tool.',
    },
  ],
  antiSignatures: [
    'Geometric grotesque on `family.display` — the Fraunces serif is structural',
    'A primary green and a success green that differ only by luminance — the hue split is the load-bearing move',
    'Cool grey-white or pure-white field — the warm bone undertone grounds the entire chromatic set',
    'Saturated chart-style intents that fight the desaturated sage / terracotta vocabulary',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Bone `#f3efe6` — warm yellow-tinted paper, the herbarium ground.' },
    { path: 'color.intent.primary.bg', note: 'Deep sage `#3e5d3a` — olive-leaning forest-leaf, ≈ 7.4:1 against bone inverse.' },
    { path: 'color.intent.success.bg', note: 'Matcha `#5a7c3a` — lighter, more chartreuse-leaning so it differs from primary by hue.' },
    { path: 'color.intent.warning.bg', note: 'Terracotta `#c25624` — kiln-fired clay, the warm complement to sage.' },
    { path: 'typography.family.display', note: 'Fraunces / DM Serif Text — transitional serif on display roles.' },
    { path: 'typography.family.ui', note: 'Inter — geometric sans for body, labels, and UI.' },
    { path: 'elevation.low.boxShadow', note: '`0 1px 2px rgba(45, 60, 35, 0.08)` — sage-tinted shadow alpha.' },
    { path: 'space.7', note: '`\'52px\'` — generous whitespace at the high end vs Flat / Classic\'s `\'48px\'`.' },
  ],
  lookalikes: [
    {
      against: 'lavender-dawn',
      differentiator:
        'Same modern-light Flat-engine recipe (pale tinted field, single deep tonal primary, warm-paired warning, generous radii) — Sage Studio commits to warm botanical (bone field, sage primary, terracotta warning, Fraunces serif display); Lavender Dawn commits to cool meditation (lavender field, plum primary, amber warning, single-family Manrope throughout).',
    },
    {
      against: 'solarpunk',
      differentiator:
        'Both palettes commit to a botanical green register. Solarpunk saturates the entire chromatic set for eco-utopian optimism and uses Quicksand (rounded geometric sans). Sage Studio desaturates everything for "quiet wellness brand" and uses Fraunces (transitional serif on display). Solarpunk is the protest poster; Sage Studio is the apothecary site.',
    },
    {
      against: 'mocha-latte',
      differentiator:
        'Both palettes use a warm-paper field and a transitional-serif display. Sage Studio commits to bone (`#f3efe6`, 2-3% yellow) with deep-sage primary; Mocha Latte commits to oat-cream (`#f5eddd`, 4-5% yellow-warm) with mocha-brown primary. The two palettes intentionally share the matcha-green `intent.success` (`#5a7c3a`) as a cross-palette anchor in the warm-paper register family.',
    },
  ],
  thrivesWith: [
    'Wellness and apothecary brand sites — the Fraunces + sage pairing reads as Aesop-feel',
    'Long-form editorial on `surface.raised` — the Inter body on warm bone keeps reading comfortable',
    'Marketing pages with generous whitespace — the widened `space` scale carries the layout',
  ],
  degradesWith: [
    'Dense data dashboards (the desaturated chromatic vocabulary fights chart category colour)',
    'Productivity-tool registers that want tight density — the generous `space` scale reads as too airy',
  ],
  recallAliases: ['sage', 'sage studio', 'wellness', 'aesop', 'apothecary', 'herbarium', 'modern wellness'],
}
