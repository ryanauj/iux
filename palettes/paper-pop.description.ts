import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'paper-pop',
  tagline:
    'Minimal light register on the Flat engine — pure white surfaces, near-monochrome neutrals, and a single electric-cobalt accent (`#2563eb`) doing all the talking.',
  summary:
    'Paper Pop is the one-accent-restraint configuration of the Flat engine. `surface.base` and `surface.raised` are both ' +
    'pure `#ffffff`; `sunken` drops to a near-imperceptible `#f5f6f8`; every neutral stays grayscale so the single electric ' +
    'cobalt (`#2563eb`, reused at `intent.primary.bg` / `content.link` / `border.focus`) reads as a deliberate pop rather ' +
    'than one voice among many. Secondary intents stay present but desaturated (green-700, amber-700, red-700, cyan-700) ' +
    'so they communicate state without competing with the cobalt. Inter at every role with soft elevation shadows ' +
    '(`rgba(17, 17, 19, 0.06 → 0.14)`) keeps the chrome quiet.',
  origin:
    'The post-2020 product-landing register popularised by Stripe, Linear, and Vercel marketing sites — pure-white ' +
    'paper-stock surfaces, near-monochrome neutrals, and a single saturated accent treated as the brand voice. The ' +
    'lineage runs through Swiss minimalism but commits to one bright hue rather than to pure black-on-white.',
  signatures: [
    {
      label: 'Single electric-cobalt accent (`#2563eb`) for primary, link, and focus',
      detail:
        '`intent.primary.bg`, `content.link`, and `border.focus` all share `#2563eb` — the one bright hue in the palette. ' +
        'Every other neutral stays grayscale (`#111113 / #3f4147 / #73767e / #9da2ab`), so the cobalt reads as deliberate ' +
        'rather than as one accent among many. The single-accent restraint is the load-bearing move.',
    },
    {
      label: 'Pure-white `surface.base` and `surface.raised` (no off-white, no warmth)',
      detail:
        '`surface.base`, `surface.raised`, and `surface.overlay` are all `#ffffff`; `surface.sunken` drops to `#f5f6f8` — ' +
        'a barely-visible neutral grey, not warm cream. The field is cold paper stock; Studio Confetti and Soft Pastel both ' +
        'warm the ground, Paper Pop does not.',
    },
    {
      label: 'Desaturated secondary intents (deep green/amber/red/cyan, not bright)',
      detail:
        '`intent.success.bg` is `#15803d`; `warning` is `#b45309`; `danger` is `#b91c1c`; `info` is `#0e7490`. Every secondary ' +
        'sits at the 700-level (deep, not bright) so it communicates state without competing with the cobalt primary. Studio ' +
        'Confetti runs the same set at full saturation; Paper Pop ratchets them down.',
    },
    {
      label: 'Soft elevation at low alpha (`rgba(17, 17, 19, 0.06 → 0.14)`)',
      detail:
        '`elevation.low` is `0 1px 2px rgba(17, 17, 19, 0.06)`, scaling to `0 20px 36px rgba(17, 17, 19, 0.14)` at `overlay`. ' +
        'The shadow alpha is roughly half of Studio Confetti\'s — Paper Pop\'s restraint extends to depth, not just colour. ' +
        'Cards lift quietly.',
    },
    {
      label: 'Restrained radius (`sm 5px / md 8px / lg 12px`)',
      detail:
        '`radius.*` keeps a measured corner curve — small enough to read as crisp paper-stock, not so generous that the ' +
        'palette reads as pastel. Studio Confetti goes `8/14/22`; Soft Pastel goes `6/12/20`; Paper Pop stops short of both.',
    },
  ],
  antiSignatures: [
    'A second saturated accent competing with the cobalt — Paper Pop runs one bright hue, not a confetti set',
    'Warm or off-white `surface.base` — that\'s Studio Confetti or Soft Pastel territory',
    'Heavy elevation shadows — Paper Pop\'s depth is deliberately quiet',
    'A serif `display` family — Inter at every role is the load-bearing typography move',
    'Generous round-the-clock radius (≥ 16px) — sharp paper-stock reads, not pastel',
  ],
  tokenEvidence: [
    {
      path: 'color.intent.primary.bg',
      note: '`#2563eb` — the single electric cobalt. Reused at `content.link` and `border.focus`; load-bearing single-accent.',
    },
    {
      path: 'color.surface.base',
      note: '`#ffffff` — pure white, not warm cream. Cold paper-stock field.',
    },
    {
      path: 'color.surface.sunken',
      note: '`#f5f6f8` — a near-imperceptible neutral grey, not warm.',
    },
    {
      path: 'color.intent.success.bg',
      note: '`#15803d` — deep green-700, not bright. Desaturated so it doesn\'t compete with the cobalt.',
    },
    {
      path: 'elevation.low.boxShadow',
      note: '`0 1px 2px rgba(17, 17, 19, 0.06)` — low-alpha shadow; Studio Confetti runs the same recipe at higher alpha.',
    },
    {
      path: 'radius.md',
      note: '`8px` — restrained corner curve; Studio Confetti goes `14px`, Soft Pastel goes `12px`.',
    },
    {
      path: 'typography.family.display',
      note: 'Inter — same as `family.ui`. No serif anywhere; the one-typeface restraint matches the one-accent restraint.',
    },
    {
      path: 'effect.focusRing.color',
      note: '`#2563eb` — the cobalt reused at focus.',
    },
  ],
  lookalikes: [
    {
      against: 'studio-confetti',
      differentiator:
        'Studio Confetti and Paper Pop share the Flat-engine playful-light-register vocabulary, but Confetti runs the full ' +
        'intent set at full saturation (rose `#e11d48`, grass `#16a34a`, amber `#d97706`, sky `#2563eb`) as a confetti ' +
        'accent palette, on a warm `#fdfcf9` ground. Paper Pop commits to one cobalt accent and routes secondaries through ' +
        'desaturated 700-level variants on pure-white. One-accent vs many-accent is the load-bearing distinction.',
    },
    {
      against: 'flat-classic',
      differentiator:
        'Flat / Classic is the unornamented baseline — system fonts, neutral cards, gentle shadows. Paper Pop is the ' +
        '"branded baseline" — the same engine plus an opinionated single-accent restraint and Inter (not system stack) ' +
        'as the typography commitment. Both ship cobalt as the primary; Paper Pop tightens the secondary intents to ' +
        'desaturated 700s so the cobalt keeps the spotlight.',
    },
    {
      against: 'linear-workspace',
      differentiator:
        'Linear Workspace is the dense-app register for the same lineage — tighter density, dedicated indigo accent, ' +
        'monochrome chrome. Paper Pop is the marketing-page register: pure-white surfaces, larger radii, gentler ' +
        'elevations, the cobalt accent reading as a hero pop rather than as in-product chrome.',
    },
    {
      against: 'vercel-geist',
      differentiator:
        'Vercel Geist is the near-monochrome black-and-white register with Geist Sans typography. Paper Pop shares the ' +
        'pure-white field and Inter-only typography rule but commits to a saturated cobalt accent rather than to the ' +
        'pure-mono restraint.',
    },
  ],
  thrivesWith: [
    'Product landing pages and marketing sites — one cobalt on pure white reads as a deliberate brand voice',
    'Buttons and CTAs — the cobalt primary lands as the obvious action on every screen',
    'Long-form Inter body paired with Inter display headers — single-family typography matches the single-accent restraint',
  ],
  degradesWith: [
    'Forms and dashboards that need many co-equal intent colours — the cobalt dominates the secondaries by design',
    'Dark-mode needs — Paper Pop is light-only by construction',
    'Brands whose voice is warmth or playfulness — the cold pure-white ground reads as utility',
  ],
  recallAliases: ['paper pop', 'paper-pop', 'pop', 'cobalt pop', 'one-accent', 'one accent', 'minimal cobalt'],
}
