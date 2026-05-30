import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'soft-pastel',
  tagline:
    'Friendly modern-app register on the Flat engine — cream-pink field, deep-plum body ink, rose / peach / mint / lavender intents, widened radii so corners never read as sharp.',
  summary:
    'Soft Pastel is the Cron-calendar / Notion-pastel / post-2020 friendly-SaaS-launch-site configuration of the Flat ' +
    'engine. `surface.base` is cream-pink (`#fcf7f6`) with a 1–2% warm tint; `surface.raised` lifts to pure `#ffffff`; ' +
    '`content.primary` is deep plum `#2b1e29`. The intent set carries the pastel vocabulary: rose primary (`#c25e8e`), ' +
    'peach warning (`#f3c074`), mint success (`#3d8c5e`), lavender info (`#7a8ed4`), rose-red danger (`#d44d63`). ' +
    'Display routes through Fraunces (the soft modern transitional serif this register favours); radii are generous ' +
    '(`sm 6px / md 12px / lg 20px`) because the pastel register reads correctly only when corners are soft.',
  origin:
    'The post-2020 friendly-SaaS launch-site aesthetic — Cron calendar, Notion\'s pastel marketing, Linear\'s pink launch ' +
    'sites, the cohort of products that paired warm pastel chrome with quirky transitional serifs (Fraunces, Recoleta, ' +
    'DM Serif) to read as "approachable software" rather than as enterprise tooling.',
  signatures: [
    {
      label: 'Cream-pink `surface.base` (`#fcf7f6`) with deep-plum `content.primary` (`#2b1e29`)',
      detail:
        '`surface.base` is `#fcf7f6` — a 1–2% pink-warm tint over near-white. `surface.raised` lifts to pure `#ffffff`; ' +
        '`surface.sunken` drops to `#f4ecea`. `content.primary` is deep plum `#2b1e29`, not pure black — the warmer ink ' +
        'matches the warm ground. The whole field has a pink undertone the rest of the palette sits against.',
    },
    {
      label: 'Rose primary (`#c25e8e`) with peach / mint / lavender intent set',
      detail:
        '`intent.primary.bg` is deep rose `#c25e8e`; `intent.warning` is peach `#f3c074` with deep-plum inverse content ' +
        '(not white — the lighter peach needs dark content to clear AA); `intent.success` is mid-mint `#3d8c5e`; ' +
        '`intent.info` is sky lavender `#7a8ed4`; `intent.danger` is rose-red `#d44d63`. The pastel-but-saturated vocabulary ' +
        'is load-bearing — desaturating further would lose the "pastel" reading, saturating further would lose the friendliness.',
    },
    {
      label: 'Fraunces display serif (soft modern transitional)',
      detail:
        '`typography.family.display` is `"Fraunces", "Recoleta", "DM Serif Text", "Georgia", serif`. Fraunces is the ' +
        'quirky modern transitional serif this register favours — rounded enough to read as friendly without breaking the ' +
        'pastel ground. `family.ui` stays Inter for control legibility.',
    },
    {
      label: 'Generous radii (`sm 6px / md 12px / lg 20px`)',
      detail:
        'The pastel register reads correctly only when corners are soft. Sharp pastel reads as muddy; round pastel reads as ' +
        'deliberate. `radius.lg = 20px` is generous enough that cards read as pillows. Paper Pop and Studio Confetti stop ' +
        'short of `lg = 20px`; Soft Pastel commits.',
    },
    {
      label: 'Plum-tinted elevation shadows (`rgba(43, 30, 41, 0.06 → 0.18)`)',
      detail:
        '`elevation.low` is `0 1px 2px rgba(43, 30, 41, 0.06)` — shadows tint toward the body-ink plum, not toward neutral ' +
        'black. Cards lift as pressed cardstock above pink-cream linen rather than as panels above neutral paper.',
    },
    {
      label: '`experimental` a11y — pastel intents on the AA UI threshold',
      detail:
        'The palette ships `a11y: experimental` because rose primary + white inverse content lands at ≈ 3.4:1 (AA UI minimum, ' +
        'not AA body); peach warning compensates by routing inverse to deep plum (~9:1). The teaching example: pushing primary ' +
        'darker would break the pastel reading; keeping it bright enough to read as pastel sits the contrast on the AA edge.',
    },
  ],
  antiSignatures: [
    'A pure-white `surface.base` — that\'s Paper Pop; Soft Pastel\'s warmth is load-bearing',
    'Sharp corners (`radius.lg ≤ 8px`) — pastel reads as muddy without soft corners',
    'A geometric or grotesque sans on `display` — Fraunces transitional serif is the register-defining face',
    'Saturated, full-strength intents (full red / full blue) — the pastel-but-saturated vocabulary is the move',
    'Neutral black `content.primary` — deep plum (`#2b1e29`) matches the warm ground',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.base',
      note: '`#fcf7f6` — cream-pink with a 1–2% warm tint. Paper Pop runs pure `#ffffff`; Soft Pastel commits to warmth.',
    },
    {
      path: 'color.content.primary',
      note: '`#2b1e29` — deep plum, not neutral black. Matches the warm ground.',
    },
    {
      path: 'color.intent.primary.bg',
      note: '`#c25e8e` — deep rose; the load-bearing pastel-but-saturated primary that sits at the AA UI threshold with white inverse.',
    },
    {
      path: 'color.intent.warning.bg',
      note: '`#f3c074` — peach with deep-plum inverse content (not white). Lighter pastel surfaces need dark content to clear AA.',
    },
    {
      path: 'color.intent.info.bg',
      note: '`#7a8ed4` — sky lavender, the pastel info accent.',
    },
    {
      path: 'typography.family.display',
      note: '`"Fraunces", "Recoleta", "DM Serif Text", "Georgia", serif` — the soft modern transitional serif this register favours.',
    },
    {
      path: 'radius.lg',
      note: '`20px` — generous corner curve. Paper Pop stops at `12px`; Soft Pastel commits to the pillow reading.',
    },
    {
      path: 'elevation.low.boxShadow',
      note: '`0 1px 2px rgba(43, 30, 41, 0.06)` — plum-tinted shadow, not neutral black.',
    },
  ],
  lookalikes: [
    {
      against: 'paper-pop',
      differentiator:
        'Paper Pop and Soft Pastel are both light-register Flat palettes. Paper Pop runs pure-white surfaces, a single ' +
        'cobalt accent, desaturated secondary intents, restrained radii (`md 8px`), and Inter at every role. Soft Pastel ' +
        'runs cream-pink surfaces, a pastel intent set (rose/peach/mint/lavender), generous radii (`lg 20px`), and Fraunces ' +
        'on display. Cold one-accent restraint vs warm pastel-set friendliness.',
    },
    {
      against: 'studio-confetti',
      differentiator:
        'Studio Confetti runs the full-saturation playful palette (rose `#e11d48`, grass `#16a34a`, amber `#d97706`) on a ' +
        'warm `#fdfcf9` ground with Poppins display. Soft Pastel runs the desaturated pastel cohort (rose `#c25e8e`, mint ' +
        '`#3d8c5e`, peach `#f3c074`) on a cream-pink ground with Fraunces serif display. Full-saturation playful vs ' +
        'pastel-saturated friendly.',
    },
    {
      against: 'lavender-dawn',
      differentiator:
        'Lavender Dawn shares the pastel vocabulary but runs lavender/violet as the load-bearing accent. Soft Pastel ' +
        'commits to rose primary as the brand voice with lavender only at `intent.info`. Different brand colour, same ' +
        'soft-corner pastel register.',
    },
    {
      against: 'cel-shaded-sakura',
      differentiator:
        'Cel-shaded Sakura uses pink as a cel-animation register — flat ink-bordered fills, anime cel typography, no soft ' +
        'pastel chrome. Soft Pastel runs the friendly-SaaS register: Fraunces serif, soft elevations, generous radii, ' +
        'desaturated pastel intents.',
    },
  ],
  thrivesWith: [
    'Marketing launch pages for friendly-SaaS products — the pastel-and-serif vocabulary lands as approachable',
    'Calendars, scheduling, and personal-productivity surfaces — Cron-style soft-corner cards in pastel intents',
    'Long-form Fraunces display headers paired with Inter body — the soft-modern-transitional pairing',
  ],
  degradesWith: [
    'Forms relying on strict AA body text on pastel intents — rose primary + white inverse sits at AA UI, not AA body',
    'Dense data tables — generous radius (`lg 20px`) and warm shadows fight density legibility',
    'Brands whose voice is precision or enterprise — pastel softness reads as casual',
  ],
  recallAliases: ['soft pastel', 'pastel', 'cron pastel', 'notion pastel', 'pastel saas', 'friendly saas', 'rose pastel'],
}
