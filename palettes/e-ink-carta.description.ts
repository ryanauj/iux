import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'e-ink-carta',
  tagline:
    'The electrophoretic e-reader register on the Flat engine — warm paper-grey field, near-black ink, a single brick-red highlight, and intents that stay almost monochrome.',
  summary:
    'E-Ink Carta models a Kindle Paperwhite / Kobo Carta panel rather than a screen. `surface.base` is a warm ' +
    'paper-grey `#e8e6df` — never pure white, because an e-ink panel never is — and `content.primary` is a soft ' +
    'near-black `#1a1a17` set in a reading serif. The chromatic budget is deliberately tiny: only `intent.danger` ' +
    'and `content.link` carry the one brick-red `#9a2f28` that e-ink hardware can flash, while success / warning / ' +
    'info are faint duotone tints separated by lightness, not hue — exactly how a 16-greyscale display encodes ' +
    'state. Tight radii and a flat, almost shadowless elevation finish the "printed page" read.',
  origin:
    'The e-paper reading device — Amazon Kindle, Kobo, reMarkable, Boox. The aesthetic is defined by the hardware: ' +
    'a bistable electrophoretic layer that holds a warm-grey static image with no backlight glare, refreshes ' +
    'slowly, and (on the colour-highlight models) can drive exactly one accent ink. The palette treats those ' +
    'constraints as the design.',
  signatures: [
    {
      label: 'Warm paper-grey field, never pure white',
      detail:
        '`surface.base` is `#e8e6df` and `raised` only lifts to `#f2f1ea`. The whole point is that an e-ink panel is a warm light-grey at rest; a pure-`#fff` field would read as a backlit LCD and break the metaphor.',
    },
    {
      label: 'A single brick-red is the entire chromatic budget',
      detail:
        '`#9a2f28` carries `content.link`, `border.focus`, and `intent.danger`. Nothing else in the palette is saturated — it is the one ink an e-reader can flash for a highlight.',
    },
    {
      label: 'Near-monochrome intents separated by lightness',
      detail:
        'success / warning / info are faint grey-green / grey-amber / grey-blue duotone tints with dark text, not vivid fills. State reads by value, the way a greyscale panel encodes it.',
    },
    {
      label: 'Reading serif on a near-shadowless, tight-radius flat',
      detail:
        '`typography.family.ui` is a Bitter/Charter reading serif at a generous 1.7 line-height; `elevation.*` is almost flat and `radius` tops out at 6px. The page is ink on paper, not a card stack.',
    },
  ],
  antiSignatures: [
    'A pure-white `#ffffff` page background — that is a backlit screen, not an e-ink panel',
    'More than one saturated accent colour — e-ink Carta spends its whole chromatic budget on one red',
    'Vivid, hue-separated intent fills (a bright green success, a bright blue info)',
    'Glossy elevation, deep shadows, or large rounded cards',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Warm paper-grey `#e8e6df` — the resting state of an electrophoretic panel.' },
    { path: 'color.intent.danger.bg', note: 'Brick-red `#9a2f28` — the one accent ink, reused for links and focus.' },
    { path: 'color.intent.info.bg', note: 'Grey-blue `#d3d9df` duotone tint — state by lightness, not hue.' },
    { path: 'typography.role.body.lineHeight', note: '1.7 — a long-form reading measure, not an app body.' },
    { path: 'elevation.low.boxShadow', note: '`0 1px 0` — almost no lift; the page reads as printed, not floating.' },
  ],
  lookalikes: [
    {
      against: 'paper-pop',
      differentiator:
        'Both are monochrome-plus-one-accent on a light field. Paper-Pop is a crisp modern app — pure-white surfaces, a clean sans, a bright pop accent. E-Ink Carta is a warm-grey reading device: paper-grey surfaces, a reading serif, and a muted brick-red, with the rest of the intents flattened to greyscale duotones.',
    },
    {
      against: 'academic',
      differentiator:
        'Academic is printed scholarship on bright paper with full editorial colour. E-Ink Carta is the same serif-reading instinct but constrained to e-paper: warmer, greyer, and chromatically near-silent.',
    },
  ],
  recallAliases: ['e-ink', 'eink', 'e ink', 'carta', 'kindle', 'e-reader', 'e-paper', 'epaper'],
}
