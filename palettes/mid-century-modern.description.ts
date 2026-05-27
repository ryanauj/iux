import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'mid-century-modern',
  tagline:
    'Cream-paper Eames-era register: walnut ink on warm cream, mustard and teal accents, a sparse atomic-age dot overlay tiled at 480×480 as quiet wallpaper rhythm.',
  summary:
    'Mid-century modern is the flat engine tuned for the warm-restrained 1950s/60s catalogue look — Herman Miller, Knoll, the early Eames Lounge ads. ' +
    'No stark white sits anywhere in the palette: `surface.base` is warm cream (`#f0e6d2`), `raised` lifts to a paler eggshell (`#f7eed9`), `sunken` drops to a slightly darker cream. ' +
    '`content.primary` is walnut ink (`#2a1d12`) — a warm dark brown, not pure black — so the page reads as printed on cream rather than backlit. The intents are the period\'s exact swatch language: mustard (`#c98a16`), teal (`#2d6f7c`), avocado (`#5a7a3b`), persimmon (`#b14a1d`), each one or two steps off vivid so panels never shout.',
  origin:
    'The American mid-century modern catalogue aesthetic of the 1950s and 1960s — Herman Miller, Knoll, Saarinen, the Eameses, Heller — codified in Eames Lounge and Tulip Chair print advertising. The palette is a restrained, period-correct revival on the flat engine.',
  signatures: [
    {
      label: 'Warm cream `surface.base` (`#f0e6d2`) with no white anywhere',
      detail:
        '`surface.base` is `#f0e6d2`, `raised` is `#f7eed9` eggshell, `sunken` is `#e7dcc4`. There is no `#ffffff` in the palette — the page reads as printed on cream paper, not as a screen. Compare to Flat/Classic where `raised` is solid `#ffffff`.',
    },
    {
      label: 'Walnut-ink `content.primary` (`#2a1d12`), not black',
      detail:
        'Body text is a warm dark brown rather than pure black, sitting at ≈ 13.6:1 on the cream field — AAA but tuned warm to match the host. The combination "warm dark brown ink on cream" is the period-print cue, not "black on white."',
    },
    {
      label: 'Period swatch intents: mustard, teal, avocado, persimmon',
      detail:
        '`intent.primary`/`warning` is Herman Miller mustard `#c98a16`; `intent.info` is the Eames Lounge upholstery teal `#2d6f7c` (also reused as `content.link`); `intent.success` is avocado `#5a7a3b`; `intent.danger` is the Saarinen Tulip-pad persimmon `#b14a1d`. Every one is one or two steps off vivid — the restraint that period catalogues made into a virtue.',
    },
    {
      label: 'Single humanist sans for both UI and display',
      detail:
        '`typography.family.ui` and `family.display` both resolve to `"Karla", "Avenir Next", "Avenir", "Futura", "Century Gothic", "Helvetica Neue", system-ui, sans-serif`. Mid-century print rarely mixed faces; it mixed weights and sizes within one family. `role.display` runs at 2.75rem / weight 600 with `-0.015em` tracking.',
    },
    {
      label: 'Sparse three-point starburst-dot overlay tiled at 480×480',
      detail:
        '`effect.overlay.image` is a three-stop radial-gradient (mustard, teal, persimmon dots at 4–5% alpha) tiled at `480px 480px`. The pattern paints once at the palette root, so the atomic-age decoration reads as quiet wallpaper rhythm under the content — never as foreground pattern.',
    },
    {
      label: 'Settled-drawer motion (`base = 220ms`, gentle ease-out)',
      detail:
        '`motion.duration.base` is 220ms — slower than the Flat default — and the standard easing is `cubic-bezier(0.25, 0.1, 0.25, 1)`. Transitions settle the way a heavy plywood drawer does rather than snap.',
    },
  ],
  antiSignatures: [
    'Pure white `surface.raised` (`#ffffff`) — breaks the "printed on cream" cue',
    'Pure black `content.primary` (`#000000`) instead of walnut brown',
    'Saturated, vivid intent fills — the mid-century register is one or two steps off vivid',
    'Mixing a serif `display` family with a sans `ui` — period print stayed in one family',
    'Hard-offset block shadows or inset rim highlights (those are Neubrutalism / Aero)',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.base',
      note: 'Warm cream `#f0e6d2` — the period paper field, no white anywhere in the palette.',
    },
    {
      path: 'color.content.primary',
      note: 'Walnut ink `#2a1d12` — warm dark brown rather than black, the "printed on cream" cue.',
    },
    {
      path: 'color.intent.primary.bg',
      note: 'Herman Miller mustard `#c98a16` — the period catalogue accent, also `intent.warning` and `border.focus`.',
    },
    {
      path: 'color.intent.info.bg',
      note: 'Eames Lounge upholstery teal `#2d6f7c` — reused as `content.link` for one identity across links and info.',
    },
    {
      path: 'effect.overlay.image',
      note: 'Three-point radial-gradient dot field (mustard / teal / persimmon at 4–5% alpha) — the atomic-age decoration tiled at 480×480.',
    },
    {
      path: 'typography.family.display',
      note: 'Same humanist-sans stack as `family.ui` — mid-century print mixed weights, not families.',
    },
    {
      path: 'motion.duration.base',
      note: '220ms — the "plywood drawer settles" cadence, slower than Flat default.',
    },
  ],
  lookalikes: [
    {
      against: 'editorial',
      differentiator:
        'Editorial is a typographic-newspaper register with a serif/sans split and high-contrast display type. Mid-century modern (this palette) runs a single humanist sans for both UI and display, sits on cream rather than white, and paints a quiet atomic-age dot overlay at the root.',
    },
    {
      against: 'desert-modernism',
      differentiator:
        'Desert modernism is the Palm Springs/Joshua Tree register — sun-bleached terracotta and ochre on a brighter desert field. Mid-century modern (this palette) commits specifically to the Eames/Herman Miller catalogue swatches (mustard, Eames-teal, avocado, persimmon) on warm cream, with the starburst-dot overlay as its load-bearing decoration.',
    },
    {
      against: 'dieter-rams',
      differentiator:
        'Dieter Rams is the Braun-functionalist register — neutral greys, one orange accent, no decoration of any kind. Mid-century modern is the same era but the American-catalogue counterpoint: cream paper, period swatch language, and a sparse decorative overlay tiled at the root.',
    },
    {
      against: 'flat-classic',
      differentiator:
        'Flat/Classic is the unornamented baseline — white `raised`, single blue accent, system fonts, no overlay. Mid-century modern swaps every white for cream, replaces the blue with the period swatch set, ships a humanist sans, and paints the starburst-dot overlay at the root.',
    },
  ],
  thrivesWith: [
    'Editorial article layouts — long body copy reads "printed on cream" at AAA contrast',
    'Marketing and catalogue compositions — the period swatch language and overlay carry the era',
    'Forms with `intent.neutral` wells — `sunken` cream reads recessed without a shadow',
  ],
  degradesWith: [
    'Toast severity stacks — README flags this; four desaturated intents stacked vertically read as four bands of warm earth-tone rather than as distinct severities, because `intent.primary` and `intent.warning` resolve to the same mustard',
    'Pure-color-coded data dashboards — every intent is one or two steps off vivid, so categorical color alone under-communicates',
  ],
  recallAliases: ['mid-century', 'mid-century modern', 'midcentury', 'eames', 'herman miller'],
}
