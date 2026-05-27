import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'financial-terminal',
  tagline:
    'Trading-workstation register — amber phosphor on near-black, mono-typed uppercase labels, P&L green/red as data, zero radius and zero decoration.',
  summary:
    'Financial Terminal is the flat engine in a generic trading-workstation register: amber `content.primary` (`#ffa028`) on a pure-black `surface.base`, with `raised`/`overlay` warmed one and two notches toward amber so cards and modals separate from the field without breaking the dark-terminal aesthetic. ' +
    'Every `radius.*` slot — including `pill` and `full` — is `0`; a terminal does not round anything. `elevation.*` is amber inset hairlines at graduated alpha, not drop shadows. The intent set is deliberately split so the four severities stop collapsing into one hue: amber for `primary`/`neutral`, yellow for `warning`, cyan for `info`, with `success`/`danger` anchoring the P&L axis at green and red.',
  origin:
    'The generic trading-workstation aesthetic descended from 1980s Quotron and Bloomberg terminals — amber phosphor on a dark field, dense mono-typed labels, uppercase numerals, hairline rules — refined through the 1990s/2000s into the dense-data register every financial workstation still defaults to. This palette is the vendor-neutral revival of that register.',
  signatures: [
    {
      label: 'Amber phosphor `content.primary` on pure-black `surface.base`',
      detail:
        '`content.primary` is `#ffa028` on `surface.base` `#000000` — ≈ 10.8:1, AAA at every size. `raised` warms one notch toward amber (`#0a0805`), `overlay` warms two notches (`#18120a`) so menus and modals pop without breaking the dark-terminal aesthetic. The amber is the load-bearing host signal.',
    },
    {
      label: 'Every `radius.*` slot is `0` — including `pill` and `full`',
      detail:
        '`radius.none`, `sm`, `md`, `lg`, `pill`, and `full` are all `0`. A terminal does not round anything: pills become squared chips, circular avatars become squares. This is one of the load-bearing differentiators against any other dark-amber palette.',
    },
    {
      label: 'Amber inset hairline elevation (no drop shadows)',
      detail:
        '`elevation.low` through `overlay` are `inset 0 0 0 1px rgba(255, 160, 40, α)` at 0.30 / 0.50 / 0.70 / 0.85 alpha — graduated amber border weight, not blurred drop shadow. Cards and panels separate from the field by ring weight rather than by cast shadow.',
    },
    {
      label: 'Split-hue intent set: amber/yellow/cyan + P&L green/red',
      detail:
        '`intent.primary` and `intent.neutral` stay on amber; `intent.warning` splits to yellow `#ffd84a` and `intent.info` to cyan `#5ec8ff` so the four intents stop collapsing into one hue. `intent.success` `#00c850` and `intent.danger` `#ff5454` anchor the P&L axis — the right-most column of a ledger.',
    },
    {
      label: 'Sans body + IBM Plex Mono display/labels/code, uppercase',
      detail:
        '`family.ui` is Inter so long-form body and form fields stay readable; `family.display`, `mono`, and `code` all resolve to `"IBM Plex Mono", "JetBrains Mono", "Fira Code", "SF Mono"`. `role.display`, `title`, `heading`, `subheading`, and `label` all carry `textTransform: uppercase`. The mono face is what carries the terminal register; uppercase is what carries the workstation cadence.',
    },
    {
      label: 'Linear motion at 60/120/200ms — registers without animating',
      detail:
        '`motion.duration.fast`/`base`/`slow` are 60/120/200ms with `linear` easing across every slot. Transitions register without feeling animated — the workstation cadence where data refreshes, it doesn\'t bloom.',
    },
  ],
  antiSignatures: [
    'Any non-zero `radius` slot — `pill: 999px` or `full: 9999px` would defeat the terminal register',
    'Drop-shadow `elevation.*` instead of inset hairlines (that\'s Flat/Material)',
    'A single-hue intent set — collapsing warning/info back into amber is the regression this palette explicitly fixes',
    'Eased motion or spring overshoot — the terminal does not animate, it refreshes',
    'Scanlines, glow, or chrome decoration on the root (that\'s CRT-phosphor / Tron, not this register)',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.base',
      note: 'Pure black `#000000` — the dark-terminal host. `raised` `#0a0805` and `overlay` `#18120a` warm toward amber but stay near-black.',
    },
    {
      path: 'color.content.primary',
      note: 'Amber phosphor `#ffa028` — the signature trading-workstation hue, ≈ 10.8:1 on black.',
    },
    {
      path: 'radius.pill',
      note: '`0` — a terminal does not round anything, not even pills or full circles.',
    },
    {
      path: 'elevation.low.boxShadow',
      note: '`inset 0 0 0 1px rgba(255, 160, 40, 0.30)` — amber inset hairline, not drop shadow. Elevation is ring weight, not light.',
    },
    {
      path: 'color.intent.info.bg',
      note: 'Cyan `rgba(94, 200, 255, 0.14)` with `#5ec8ff` content — the split that keeps info from collapsing into amber.',
    },
    {
      path: 'typography.family.display',
      note: 'IBM Plex Mono stack on `display`, `mono`, `code`, and `label`. Only `body`/`caption` use the Inter sans for readability.',
    },
    {
      path: 'motion.duration.base',
      note: '120ms with `linear` easing — refresh cadence, not animation.',
    },
  ],
  lookalikes: [
    {
      against: 'crt-phosphor-amber',
      differentiator:
        'CRT-phosphor amber is a CRT-engine register with scanline overlay, phosphor glow, and curved-screen treatment. Financial Terminal (this palette) is flat-engine: zero decoration on the root, inset hairline elevation, no glow, no scanlines. Same amber hue, completely different engine.',
    },
    {
      against: 'terminal-tui',
      differentiator:
        'Terminal-TUI is a text-UI register that targets ncurses-style box-drawing characters and a monospaced grid. Financial Terminal still expects normal HTML components — Cards, Modals, Tables — just rendered with amber/mono/no-radius. The split-hue intent set (yellow warning, cyan info) is the financial-workstation move, not the TUI move.',
    },
    {
      against: 'data-dense-light',
      differentiator:
        'Data-dense light is the Tufte register on a near-white field with desaturated intent ink. Financial Terminal is the same density stance inverted: amber on black, mono-uppercase labels, P&L green/red. They share zero/hairline radius and the dense-table thrives-with but commit to opposite ends of the brightness axis.',
    },
  ],
  thrivesWith: [
    'Long dense Tables — amber mono numerals on black with green/red deltas in the right-most column is the palette\'s native shape',
    'Heat-map and habit-tracker views — README documents graduating `rgba(255, 160, 40, …)` across six alpha steps for "shades of the accent" without re-saturating',
    'Form fields and CLI-shaped inputs — the inset hairline elevation keeps inputs as wells rather than as lifted chips',
  ],
  degradesWith: [
    'Loading skeleton shimmers — README flags this; the spread between `surface.raised` and `content.muted` is too narrow for a sweep to read, so shimmer becomes a slow pulse',
    'Hover-lift Card decoration, media overlays, illustrated EmptyStates — anything depending on tonal variance across surfaces. "This palette eats decoration, on purpose."',
    'All-day editorial reading — `a11y: experimental`; amber phosphor on black is still vulnerable to afterimage and eye fatigue during long sessions',
  ],
  recallAliases: ['financial terminal', 'terminal', 'trading terminal', 'bloomberg', 'amber terminal'],
}
