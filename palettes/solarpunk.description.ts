import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'solarpunk',
  tagline:
    'Eco-utopian register — sun-bleached cream field, leaf-green `intent.primary`, solar-amber `intent.warning`, sky-cyan `intent.info`, Quicksand humanist-rounded display, widened `radius.*`.',
  summary:
    'Solarpunk is the eco-utopian register on the Flat engine. Sun-bleached cream (`#f6f1de`) fills `surface.base`; ' +
    'leaf green (`#2f7a32`) carries `intent.primary` (and `intent.success` reuses it — "go ahead" and "growing thing" ' +
    'are the same affordance); solar amber (`#a07210`) carries warning; sky cyan (`#1f7a9c`) carries info. Quicksand ' +
    'humanist-rounded display contrasts the saturated organic palette. `radius.*` widens to `sm: 6px / md: 10px / ' +
    'lg: 16px` so the organic-shapes cue rides the corners too.',
  origin:
    'The "solarpunk" speculative-fiction / design movement, c.2014–present — a deliberate counter-aesthetic to ' +
    'cyberpunk\'s dystopian dark register, drawing on eco-optimist science fiction (Kim Stanley Robinson, Becky ' +
    'Chambers) and on cottagecore visual vocabularies. The colour vocabulary is pulled from the natural world: ' +
    'chlorophyll greens, late-afternoon solar amber, clear-sky cyan, pomegranate-red as the only "alert" colour.',
  signatures: [
    {
      label: 'Leaf-green `intent.primary` reused as `intent.success`',
      detail:
        '`intent.primary.bg` and `intent.success.bg` are both `#2f7a32` — the palette treats "go ahead" and "growing thing" as the same affordance, the same way Tokyo / Day treats "go" and "primary" as the same JR-East green. The duplication is intentional and load-bearing.',
    },
    {
      label: 'Widened `radius.*` for organic shapes',
      detail:
        '`radius.sm: \'6px\'`, `md: \'10px\'`, `lg: \'16px\'` — wider than Flat / Classic by ~50%. Rounded corners are part of the "organic shapes, not engineering grids" cue. The widened radii are the second load-bearing move after the leaf-green primary.',
    },
    {
      label: 'Quicksand humanist-rounded display + Inter body',
      detail:
        '`typography.family.display` is Quicksand (Comfortaa fallback) — chunky rounded counters cue organic rather than industrial. `family.body` is Inter for long-form reading. The two-family rule pairs rounded display + clean sans body.',
    },
    {
      label: 'Solar-amber `warning` darkened past `#c48a14` for contrast',
      detail:
        '`intent.warning.bg` is `#a07210` — pulled two shades down from the un-printable `#c48a14` so cream inverse content clears 3:1. The original brighter amber was the brief; the contrast gate caught it. Documented as the canonical example of "brief vs gate" in the showcase.',
    },
  ],
  antiSignatures: [
    'Saturated-bright "candy" greens or yellows — solarpunk pulls from natural pigments, not screen primaries',
    'Tight zero-radius cards — the organic-shapes cue lives in the corners',
    'A geometric mono `display` family — that\'s industrial vocabulary, not organic',
    'A separate `intent.success` distinct from `intent.primary` — they\'re intentionally the same',
  ],
  tokenEvidence: [
    { path: 'color.intent.primary.bg', note: 'Leaf green `#2f7a32` — mid-canopy hardwood green.' },
    { path: 'color.intent.success.bg', note: 'Leaf green `#2f7a32` — intentionally reused from `intent.primary`.' },
    { path: 'color.intent.warning.bg', note: 'Solar amber `#a07210` — pulled darker to clear the 3:1 contrast floor.' },
    { path: 'radius.lg', note: '`\'16px\'` — widened corners for the organic-shapes cue.' },
    { path: 'typography.family.display', note: 'Quicksand — humanist-rounded display with chunky counters.' },
  ],
  lookalikes: [
    {
      against: 'desert-modernism',
      differentiator:
        'Both are warm-paper Flat palettes with multiple climate-correct intents. Desert Modernism pulls terracotta + pool turquoise + palm green (Palm Springs register). Solarpunk pulls leaf green + solar amber + sky cyan (forest / canopy register). Different climate zone, different intent vocabulary; both reuse `intent.primary` as `success` in Solarpunk\'s case.',
    },
    {
      against: 'cyberpunk-neon-noir',
      differentiator:
        'Solarpunk is the deliberate counter-aesthetic. Cyberpunk: near-black rainy-window field, magenta + cyan dual-accent borders, glow elevation, Glassmorphism engine (dystopian register). Solarpunk: sun-bleached cream field, leaf-green primary, soft drop shadows, Flat engine (eco-utopian register). The pair is meant to be read together — opposite tonal poles of speculative-fiction visual culture.',
    },
    {
      against: 'mid-century-modern',
      differentiator:
        'Mid-century-modern is the cream-paper Eames-textile register: walnut + teal + mustard accents with an atomic-dot field overlay. Solarpunk is the cream-paper eco-utopian register: leaf-green + solar-amber + sky-cyan, no overlay. Both lean rounded; Solarpunk pushes corners further (`lg: 16px` vs Mid-century\'s `8px`) and the organic vocabulary is contemporary, not retrofuturist.',
    },
  ],
  thrivesWith: [
    'Sustainability dashboards, urban-agriculture / community-garden interfaces',
    'Editorial sites covering climate, ecology, regenerative-design topics',
    'Long-form Inter body on `surface.raised` paired with rounded Quicksand headings',
  ],
  degradesWith: [
    'Enterprise / corporate finance contexts where the eco vocabulary reads as off-brand',
    'Dense data tables (widened radii eat horizontal space on tight rows)',
  ],
  recallAliases: ['solarpunk', 'eco', 'utopian', 'green', 'sustainable'],
}
