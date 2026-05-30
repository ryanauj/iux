import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'lavender-dawn',
  tagline:
    'Calm modern purple register on the Flat engine — pale lavender-tinted field, deep plum-violet primary, warm-amber warning, single-family Manrope throughout.',
  summary:
    'Lavender Dawn is the cool-violet sibling of Sage Studio on the modern-light Flat-engine grid. `surface.base` ' +
    'is pale lavender (`#f3eff7`) — a 3-4% violet tint over near-white; `surface.raised` lifts to barely-tinted ' +
    'near-white (`#fbf9fd`). A single deep plum-violet `#5c3d8a` carries `intent.primary`, `content.link`, and ' +
    '`border.focus`. `intent.warning` shifts to warm amber (`#c97d2a`) so the warm/cool pairing reads as ' +
    'intentional rather than as a colour clash. The whole composition is the meditation-app / journaling-tool / ' +
    'post-2020 "calm SaaS" lane.',
  origin:
    'The post-2020 calm-SaaS / meditation-app / journaling-tool lane — Calm, Headspace, Notion-with-a-purple-skin, ' +
    'Linear-but-softer. The aesthetic answers the productivity-SaaS register (Linear / Vercel) by trading the ' +
    'cool indigo for a deeper plum and the geometric Inter for a softer humanist Manrope.',
  signatures: [
    {
      label: 'Pale lavender-tinted field (`#f3eff7`)',
      detail:
        '`surface.base` carries a 3-4% violet tint over near-white. Without the tint the palette collapses onto Flat / Classic; with it the rest of the chromatic set reads as "calm app" rather than as "blank screen."',
    },
    {
      label: 'Deep plum-violet `intent.primary` (`#5c3d8a`)',
      detail:
        '`intent.primary.bg` is `#5c3d8a` — a Princely purple that clears ≈ 9:1 against `#fbf9fd` inverse. The depth of the plum is load-bearing: at lighter saturations the palette collapses into Soft Pastel; at deeper saturations it reads as Mall-goth.',
    },
    {
      label: 'Warm-amber warning paired with cool-violet primary',
      detail:
        '`intent.warning` is warm amber (`#c97d2a`) — the warm/cool pairing (amber vs plum) is the second load-bearing colour move and the reason the palette feels "intentional" rather than monochromatic.',
    },
    {
      label: 'Single-family Manrope on every typography slot',
      detail:
        '`typography.family.ui` and `family.display` both resolve to `"Manrope", "Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif`. Manrope\'s softer humanist terminals are what differentiate this from Linear Workspace\'s Inter and Stone Modern\'s Söhne.',
    },
    {
      label: 'Plum-tinted soft drop shadows on `elevation.*`',
      detail:
        '`elevation.low` is `0 1px 2px rgba(44, 31, 58, 0.08)` — the shadow alpha tints toward plum rather than toward neutral black, so cards lift as pressed-paper above lavender mist. Scales through `medium` / `high` / `overlay` with the same plum cast.',
    },
    {
      label: 'Generous `radius.*` (`sm = 6px / md = 12px / lg = 18px`)',
      detail:
        'Modern calm apps favour soft, never sharp corners. The widened scale separates this register from Linear / Vercel\'s `sm = 4px / md = 6px / lg = 8px` productivity-tool tightness.',
    },
  ],
  antiSignatures: [
    'A second saturated cool chromatic intent competing with the plum primary',
    'Geometric Inter or Geist on `family.display` — the Manrope-humanist softness is structural',
    'Tight `radius.*` (`sm = 2-4px`) — the calm-app register depends on the widened scale',
    'Neutral or black-tinted shadow alpha — the plum tint is what reads as "lavender mist"',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Pale lavender `#f3eff7` — the 3-4% violet tint that grounds the register.' },
    { path: 'color.intent.primary.bg', note: 'Deep plum-violet `#5c3d8a` — Princely purple, ≈ 9:1 against cream inverse.' },
    { path: 'color.intent.warning.bg', note: 'Warm amber `#c97d2a` — the warm/cool pairing against the cool primary.' },
    { path: 'typography.family.ui', note: 'Manrope-first stack — softer humanist than Inter or Geist.' },
    { path: 'typography.family.display', note: 'Identical Manrope stack — the palette commits to one family throughout.' },
    { path: 'elevation.low.boxShadow', note: '`0 1px 2px rgba(44, 31, 58, 0.08)` — plum-tinted shadow alpha, not neutral.' },
    { path: 'effect.focusRing.color', note: 'Plum `#5c3d8a` — focus ring reuses the brand colour, no second saturated accent.' },
  ],
  lookalikes: [
    {
      against: 'sage-studio',
      differentiator:
        'Same modern-light Flat-engine recipe (pale tinted field, single deep tonal primary, warm-paired warning, generous radii) — the difference is the entire colour story. Sage Studio lands on botanical-warm (bone field, sage primary, terracotta warning, Fraunces serif display); Lavender Dawn lands on meditation-cool (lavender field, plum primary, amber warning, Manrope sans throughout).',
    },
    {
      against: 'linear-workspace',
      differentiator:
        'Linear Workspace and Lavender Dawn both lean cool-purple on near-white. Linear is the productivity-tool register: cool grey-white field, Linear-iris `#5e6ad2` primary, 14 px Inter at high density, hairline-ring elevations, tight `radius` scale. Lavender Dawn is the calm-app register: violet-tinted field, deeper plum `#5c3d8a` primary, 16 px Manrope, soft plum-tinted drop shadows, widened `radius` scale.',
    },
    {
      against: 'soft-pastel',
      differentiator:
        'Soft Pastel saturates the field higher and uses pastel intents across the board — the chromatic strength sits in the surfaces. Lavender Dawn keeps the field whisper-tinted and stacks all the chromatic strength into the deep plum primary, the way modern calm-SaaS apps do.',
    },
  ],
  thrivesWith: [
    'Journaling, meditation, and habit-tracker surfaces where the violet tint reads as "calm"',
    'Marketing pages for wellness / mindfulness SaaS — the humanist Manrope softens technical copy',
    'Long-form prose on `surface.raised` — the lavender tint stays out of the reader\'s way',
  ],
  degradesWith: [
    'Dense data dashboards (the single-primary vocabulary fights chart category colour)',
    'Sharp brand registers that want a saturated field — the lavender tint reads as too soft',
  ],
  recallAliases: ['lavender', 'lavender dawn', 'plum', 'calm saas', 'meditation', 'journaling'],
}
