import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'linear-workspace',
  tagline:
    'Modern productivity-SaaS register on the Flat engine — cool off-white field, Linear-iris `#5e6ad2` primary, 14-px Inter body density, hairline-ring elevations, tight `radius`.',
  summary:
    'Linear Workspace is the calm-productivity-tool register on the modern-light Flat-engine grid — the lane ' +
    'Linear.app / Height / Notion-app / Vercel-dashboard defined. `surface.base` is `#fbfbfc` (cool off-white); ' +
    '`surface.raised` is pure white. `intent.primary.bg` is Linear\'s signature "Iris" indigo (`#5e6ad2`), ' +
    'which also carries `content.link` and `border.focus`. Body type sits at 14 px (`0.875rem`) so the ' +
    'productivity-tool density reads correctly. `family.*` is single-family Inter; `elevation.low` is a near-' +
    'invisible 1-px hairline ring `0 0 0 1px rgba(17, 20, 27, 0.06)`.',
  origin:
    'The 2018–2024 modern-productivity-SaaS lane the Linear.app / Height / Notion-app / Vercel-dashboard ' +
    'generation defined. Linear in particular codified the visual vocabulary: cool off-white app shell, the ' +
    '"Iris" indigo, 14-px body density, hairline-ring elevations, Inter throughout, snappy 160 ms motion.',
  signatures: [
    {
      label: 'Cool off-white field (`#fbfbfc`) with pure-white raised',
      detail:
        '`surface.base` is `#fbfbfc` — a 1-2% cool tint that differentiates this from Flat / Classic\'s pure white. `surface.raised` lifts to pure white (`#ffffff`); `surface.sunken` drops to `#f4f4f6`. The cool app-shell tint is the load-bearing surface move.',
    },
    {
      label: 'Linear-iris indigo `intent.primary` (`#5e6ad2`)',
      detail:
        '`intent.primary.bg` is Linear\'s signature "Iris" purple-blue. The colour clears 4.6:1 against white inverse — just past AA for body text and well past AA for UI controls. `border.focus` and `content.link` reuse the same iris.',
    },
    {
      label: '14-px body density (`0.875rem`)',
      detail:
        '`typography.role.body.size` is `0.875rem` (14 px) so the productivity-tool density reads correctly. This is the load-bearing typography move: the moment body type goes to 16 px the register collapses into Flat / Classic.',
    },
    {
      label: 'Single-family Inter throughout',
      detail:
        '`typography.family.ui` and `family.display` both resolve to `"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif`. Display climbs to weight 700 for headings; the rest of the hierarchy rides on weight + size alone.',
    },
    {
      label: 'Near-invisible hairline-ring `elevation.low`',
      detail:
        '`elevation.low` is `0 0 0 1px rgba(17, 20, 27, 0.06)` — a near-invisible cool-tinted hairline. `medium` adds a subtle drop shadow over the same hairline. The "popover that sits 4 px above the canvas" register, not the "card that lifts a paper-thickness" register.',
    },
    {
      label: 'Tight `space.*` density (`5: 20px / 6: 28px / 7: 40px`)',
      detail:
        'The `space` scale collapses slightly at the high end vs Flat / Classic — modern productivity tools pack more onto the canvas than Sage Studio or Lavender Dawn.',
    },
  ],
  antiSignatures: [
    'Pure-white `surface.base` — the cool off-white tint is what differentiates this from Flat / Classic',
    '16-px body type — the 14-px density is structural to the productivity-tool register',
    'Soft gaussian drop shadows on `elevation.low` — the hairline ring is the lift signal',
    'Widened `radius.*` (`sm = 6-8px`) — Linear Workspace commits to tight `sm = 4px / md = 6px / lg = 8px`',
    'A second saturated chromatic accent competing with the iris primary',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Cool off-white `#fbfbfc` — 1-2% cool tint vs Flat / Classic\'s pure white.' },
    { path: 'color.intent.primary.bg', note: 'Linear-iris `#5e6ad2` — the signature purple-blue, ≈ 4.6:1 against white.' },
    { path: 'color.content.link', note: 'Iris `#5e6ad2` — links share the primary, no second saturated accent.' },
    { path: 'color.border.focus', note: 'Iris `#5e6ad2` — focus ring reuses the primary.' },
    { path: 'typography.family.ui', note: 'Inter — single-family stack throughout.' },
    { path: 'typography.role.body.size', note: '`0.875rem` (14 px) — the productivity-tool density anchor.' },
    { path: 'elevation.low.boxShadow', note: '`0 0 0 1px rgba(17, 20, 27, 0.06)` — near-invisible cool-tinted hairline.' },
    { path: 'space.5', note: '`\'20px\'` — collapsed from Flat / Classic\'s `\'24px\'` for tighter density.' },
  ],
  lookalikes: [
    {
      against: 'vercel-geist',
      differentiator:
        'Both palettes are modern-dev-tool registers on the Flat engine with single-family sans, tight `radius`, and hairline-ring elevations. Linear Workspace tints the field cool (`#fbfbfc`) and uses Linear-iris `#5e6ad2` as primary with Inter body at 14 px. Vercel Geist commits to pure-white flat-on-flat surfaces with pure-black `#000000` primary, the `#0070f3` blue on info/link/focus, and Geist Sans at display weight 600.',
    },
    {
      against: 'flat-classic',
      differentiator:
        'Flat / Classic is the unornamented baseline: pure-white raised on grey-white base, saturated blue `#1d4ed8` as primary, system stack typography, 16-px body, soft gaussian drop shadows. Linear Workspace sharpens every move for productivity: cool-tinted base, Linear-iris `#5e6ad2` primary, Inter at 14 px body, hairline-ring elevations, tighter `space` scale.',
    },
    {
      against: 'lavender-dawn',
      differentiator:
        'Both palettes lean cool-purple on near-white. Linear Workspace is the productivity-tool register: cool grey-white field, Linear-iris `#5e6ad2` primary, 14 px Inter at high density, hairline-ring elevations, tight `radius`. Lavender Dawn is the calm-app register: violet-tinted field, deeper plum `#5c3d8a` primary, 16 px Manrope, soft plum-tinted drop shadows, widened `radius`.',
    },
  ],
  thrivesWith: [
    'Issue trackers, project-management surfaces, kanban / list views — density wins',
    'Settings panels and command-palette UIs — the hairline-ring elevation keeps modals quiet',
    'Long-form Inter running text on `surface.raised` — the 14-px scale stays comfortable',
  ],
  degradesWith: [
    'Brand-marketing pages that want warmth — the cool off-white reads as utilitarian',
    'Touch-first / mobile-only registers where 14-px body becomes too small',
  ],
  recallAliases: ['linear', 'linear workspace', 'iris', 'productivity saas', 'linear.app', 'height'],
}
