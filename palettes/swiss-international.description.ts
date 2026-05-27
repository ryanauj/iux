import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'swiss-international',
  tagline:
    'Three colours, one grotesque, zero curves — pure white surfaces, pure black ink, signal red (`#e30613`) as the only attention colour, Helvetica Neue throughout, and every `radius.*` slot collapsed to `0`.',
  summary:
    'Swiss / International Style is the flat engine collapsed to a three-colour field. `surface.*` is uniformly ' +
    '`#ffffff`, `content.primary` and every border are `#000000`, and signal red `#e30613` carries `intent.primary`, ' +
    '`intent.danger`, `intent.warning`, `color.content.link`, and `border.focus` — the only saturated colour the ' +
    'palette permits. `intent.success`, `intent.info`, and `intent.neutral` collapse to black or white. `radius.*` ' +
    'is `0` at every named slot (`sm`, `md`, `lg`, `pill`) and only `full` is rounded — the modular grid does the ' +
    'visual organising, not curves. `typography.family.display` is Helvetica Neue / Helvetica / Arial, the ' +
    'period-correct grotesque the style is named for.',
  origin:
    'Mid-century Swiss graphic design (Zurich and Basel, 1950s–1960s) — Müller-Brockmann, Hofmann, Ruder, the ' +
    'modular-grid posters and timetables that became the International Typographic Style. Akzidenz-Grotesk and ' +
    'Helvetica (Haas\'sche Schriftgiesserei, 1957) carried the typographic voice; signal red on white-black ' +
    'organised the page without semantic colour pretence.',
  signatures: [
    {
      label: 'Signal red `#e30613` as the only saturated colour',
      detail:
        '`intent.primary.bg`, `intent.danger.bg`, `intent.warning.bg`, `color.content.link`, `border.focus`, and `effect.focusRing.color` all share `#e30613`. `intent.success` and `intent.info` collapse to `#000000`. The palette deliberately surrenders multi-intent chromatic distinction in service of typographic hierarchy.',
    },
    {
      label: 'Helvetica Neue / Helvetica / Arial on every typography slot',
      detail:
        '`typography.family.ui` and `family.display` are both `"Helvetica Neue", "Helvetica", "Arial", "Liberation Sans", sans-serif`. The grotesque is structural — there is no serif, no humanist, no display contrast face. Hierarchy comes from size and weight, not from family.',
    },
    {
      label: 'Every `radius.*` collapsed to `0` except `full`',
      detail:
        '`radius.none`, `sm`, `md`, `lg`, and `pill` are all `0`. Only `full` (`9999px`) is rounded — and that\'s reserved for circles. The modular grid demands hard rectangles; rounded corners would soften the geometry the style is built on.',
    },
    {
      label: 'Pure white surfaces with no tonal layering',
      detail:
        '`surface.base`, `raised`, `sunken`, and `overlay` are all `#ffffff`. Depth comes from layout position and whitespace, never from a tonal step or a fake light source. `elevation.*` is `none` at every slot except `overlay`, which carries a 1px black hairline (`0 0 0 1px #000000`) — a printed-frame stroke, not a drop shadow.',
    },
    {
      label: 'Linear easings, short durations',
      detail:
        'Every easing in `motion.easing.*` is `linear`. Durations are short (`fast: 100ms`, `base: 160ms`, `slow: 240ms`). The style is anti-rhetorical — transitions should not editorialise. No springs, no overshoot, no decorative motion curves.',
    },
  ],
  antiSignatures: [
    'A second saturated chromatic intent (a blue or green next to the red breaks the three-colour rule)',
    'Any non-zero `radius.sm` / `radius.md` / `radius.lg` (rounded rectangles are the form the style refuses)',
    'A serif `display` family — the grotesque rule is structural',
    'Tonally-layered surfaces (a grey `surface.sunken` against a white `base`)',
    'Easing curves other than `linear` — Swiss does not editorialise motion',
  ],
  tokenEvidence: [
    {
      path: 'color.intent.primary.bg',
      note: 'Signal red `#e30613` — the only saturated colour in the palette. Reused at `intent.danger`, `intent.warning`, `border.focus`, `content.link`.',
    },
    {
      path: 'color.intent.success.bg',
      note: '`#000000` — `success` collapses to black; the palette refuses a green channel.',
    },
    {
      path: 'typography.family.display',
      note: '`"Helvetica Neue", "Helvetica", "Arial", "Liberation Sans", sans-serif` — the period-correct grotesque.',
    },
    {
      path: 'radius.md',
      note: '`0` — every named radius collapses except `full`. The modular grid forbids curves.',
    },
    {
      path: 'elevation.overlay.boxShadow',
      note: '`0 0 0 1px #000000` — a hard hairline stroke, not a soft drop shadow.',
    },
    {
      path: 'motion.easing.standard',
      note: '`linear` — every easing is linear; motion does not editorialise.',
    },
  ],
  lookalikes: [
    {
      against: 'dieter-rams',
      differentiator:
        'Dieter Rams is the warm-grey, Braun-orange sibling of the same doctrine — Helvetica throughout, single saturated accent, near-zero radius. The difference is exactly the temperature: Swiss commits to pure white / pure black / signal red (Zurich-cold); Dieter Rams commits to warm-grey / off-white / Braun-orange (Frankfurt-warm).',
    },
    {
      against: 'bauhaus',
      differentiator:
        'Bauhaus uses the three primaries (red + yellow + blue) on cream with geometric sans (Futura) display and uppercase headings — a chromatic teaching set. Swiss collapses to a single accent (red), uses Helvetica (a grotesque, not a geometric), and rejects uppercase as a typographic device. Both refuse curves; only Bauhaus refuses lowercase headings.',
    },
    {
      against: 'aaa',
      differentiator:
        'AAA also pins pure black on pure white with a single accent and zero radius, but its accent is CSS link-blue `#0000ee`, its focus ring is `double` 3px, and every `motion.duration.*` is `\'0ms\'`. Swiss uses signal red, a `solid` 2px focus ring, and short linear-eased durations — the brief is typographic modernism, not contrast-tier compliance.',
    },
    {
      against: 'flat-classic',
      differentiator:
        'Flat / Classic is the unornamented baseline with system fonts, indigo-blue accent, and soft drop shadows. Swiss replaces the system font with Helvetica, the indigo with signal red, the soft shadow with a hairline stroke, and every non-`full` radius with `0` — Flat / Classic with the dial turned all the way toward modular-grid discipline.',
    },
  ],
  thrivesWith: [
    'Editorial typography, posters, masthead-style headers — the modular grid is the brief',
    'Wayfinding, schedule and timetable layouts — the style was invented for them',
    'Single-column reading interfaces with a clear hierarchy of size and weight',
  ],
  degradesWith: [
    'Multi-intent toasts and alerts — success / warning / danger / info collapse to two visual states (red or black) and components must encode intent through icon and label instead of fill (README flags Toast as most-likely-to-fail)',
    'Dashboards with category-coloured charts — the three-colour rule fights category palettes',
    'Decorative marketing pages — the palette refuses curves, gradients, and a second saturated accent',
  ],
  recallAliases: ['swiss', 'swiss international', 'international style', 'swiss style', 'international typographic style', 'helvetica', 'müller-brockmann'],
}
