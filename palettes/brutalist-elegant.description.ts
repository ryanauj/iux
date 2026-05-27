import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'brutalist-elegant',
  tagline:
    'Neubrutalism engine in an ivory/ink/oxblood register — Bodoni serif display at 4rem on warm ivory, hard-offset block shadows from 4px to 10px, every radius `0`, a single oxblood accent.',
  summary:
    'Brutalist-elegant is the Neubrutalism engine with its structural vocabulary held exactly as hard as the base palette: `radius.*` is `0` on every slot, `borderWidth.heavy` is `4px`, motion is linear and snappy at 40/60/90ms, and `elevation.low` through `overlay` carry the hard-offset `Npx Npx 0 #0a0a0a` block (4px → 10px). ' +
    'Only the chromatic temperature and the display face change. `surface.base` is warm ivory `#f3eee2`, `content.primary` is ink-black `#0a0a0a`, every clashing vibrant intent collapses to one of four muted tones (oxblood, forest, ochre, navy) with ivory `inverse` content, and `typography.family.display` swaps Archivo Black for Bodoni Moda / Didot at weight 700 — a high-contrast modern-era serif that runs at 4rem with 1.0 line-height for the fashion-masthead feel.',
  origin:
    'Neubrutalism is the post-2020 web revival of architectural brutalism — flat fills, hard offset block shadows, heavy black borders, zero radius. This palette takes that engine and applies a high-end editorial chromatic and typographic dressing: warm ivory paper, a single oxblood accent, Bodoni/Didot serif display. The result is the Vetements/Acne/Apartamento editorial register on the brutalism engine.',
  signatures: [
    {
      label: 'Hard-offset block `elevation.*` (4px → 10px) on heavy black borders',
      detail:
        '`elevation.low` is `4px 4px 0 #0a0a0a`, scaling to `10px 10px 0 #0a0a0a` at `overlay`. The offset is hard, the colour is solid ink-black, the shadow has zero blur and zero spread. Paired with `borderWidth.heavy: 4px`, depth comes from offset block + heavy stroke, not from blurred penumbra.',
    },
    {
      label: 'Bodoni/Didot serif display at 4rem / weight 700 / `-0.02em` tracking',
      detail:
        '`typography.family.display` is `"Bodoni Moda", "Didot", "Bodoni 72", "Playfair Display", Georgia, "Times New Roman", serif`. `role.display` runs at 4rem / lineHeight 1.0 / tracking -0.02em / weight 700 — the fashion-masthead feel. Sentence-case on the long headings, not uppercase.',
    },
    {
      label: 'Warm ivory `surface.base` (`#f3eee2`) with ink-black `content.primary`',
      detail:
        '`surface.base` is `#f3eee2`, `raised` brightens to `#fbf7ec`. Body text is `#0a0a0a` — pure ink-black — sitting at ≈ 18:1. The base palette\'s sun-yellow gives way to ivory; the type stays as hard as the engine.',
    },
    {
      label: 'Single oxblood accent (`#7a1014`) doing four jobs',
      detail:
        '`content.link`, `intent.primary.bg`, `intent.danger` family, `border.focus`, and `effect.focusRing.color` all share oxblood/wine `#7a1014`. No second accent exists in the palette — the elegance comes from restraint to one warm hue against ink/ivory.',
    },
    {
      label: 'Every `radius.*` slot is `0` — including `pill` and `full`',
      detail:
        '`radius.none`/`sm`/`md`/`lg`/`pill`/`full` are all `0`. The structural honesty of the Neubrutalism engine is preserved verbatim — softening the radius would drift the palette into "tasteful sans on cream" flat-engine territory.',
    },
    {
      label: 'Wide-tracked uppercase `subheading`/`label` on Inter',
      detail:
        '`role.subheading` runs at 0.18em tracking and `role.label` at 0.16em — both `textTransform: uppercase` on `family.ui` (Inter / Neue Haas Grotesk). The restrained typographic device a fashion editorial uses to mark section breaks without resorting to display weight.',
    },
  ],
  antiSignatures: [
    'Any non-zero radius — softening to even a 4px `sm` would drift into flat-engine territory',
    'Soft gaussian drop shadows or blurred elevation — this palette commits to hard-offset block shadows',
    'A clashing vibrant intent palette (sun-yellow / pink / cyan) — the elegance is the muted collapse to four tones',
    'A second accent competing with oxblood — the contract is one warm accent only',
    'Sans-serif `display` family or a hairline `borderWidth.heavy` — both would defeat the engine',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.base',
      note: 'Warm ivory `#f3eee2` — replaces the base Neubrutalism sun-yellow with editorial paper.',
    },
    {
      path: 'color.intent.primary.bg',
      note: 'Oxblood `#7a1014` — the single accent. Also `content.link`, `border.focus`, `effect.focusRing.color`.',
    },
    {
      path: 'elevation.low.boxShadow',
      note: '`4px 4px 0 #0a0a0a` — hard-offset block, zero blur, zero spread. Scales to `10px 10px 0 #0a0a0a` at `overlay`.',
    },
    {
      path: 'borderWidth.heavy',
      note: '`4px` — the heavy black border paired with the offset block. Softening this to 1px collapses the palette.',
    },
    {
      path: 'radius.pill',
      note: '`0` — every radius slot stays at zero; even pills are squared.',
    },
    {
      path: 'typography.family.display',
      note: '"Bodoni Moda", "Didot", "Bodoni 72", "Playfair Display", Georgia, serif — the high-contrast modern-era serif at weight 700.',
    },
    {
      path: 'typography.role.display.size',
      note: '4rem at lineHeight 1.0 and -0.02em tracking — the fashion-masthead feel.',
    },
    {
      path: 'motion.duration.base',
      note: '60ms linear — snap-to-grid; structural honesty extends to motion.',
    },
  ],
  lookalikes: [
    {
      against: 'neubrutalism',
      differentiator:
        'Base Neubrutalism ships clashing vibrant fills on sun-yellow paper with Archivo Black display and `elevation = none` (offset-block is opt-in). Brutalist-elegant keeps the engine\'s structural vocabulary verbatim (radius 0, 4px heavy border, hard offset block at 4–10px) but swaps the chromatic temperature to ivory/ink/oxblood and the display face to Bodoni/Didot serif.',
    },
    {
      against: 'editorial',
      differentiator:
        'Editorial is a flat-engine typographic register — serif body, gentle elevation, conventional radius. Brutalist-elegant uses a serif display only and keeps the Neubrutalism block-shadow + heavy-border structure underneath: editorial dressing on a brutalist skeleton.',
    },
    {
      against: 'letterpress',
      differentiator:
        'Letterpress is the inked-impression register — paper texture, deboss effect, serif throughout. Brutalist-elegant has no paper texture and no impression effect; its "weight" comes from the hard offset block and the heavy 4px border, not from simulated impression.',
    },
  ],
  thrivesWith: [
    'Editorial article headers — Bodoni at 4rem with the heavy border + offset block reads as a fashion masthead',
    'Marketing hero compositions — the single oxblood accent on ivory carries decisive brand presence',
    'Cards, Modals, Drawers — the offset-block elevation scales cleanly across the stack',
  ],
  degradesWith: [
    'Dense data tables — every row inheriting the offset block creates visual noise; the engine wants low-density panels',
    'Components depending on tonal hover lifts or soft shadows — this engine has neither',
  ],
  recallAliases: ['brutalist-elegant', 'brutalist elegant', 'elegant brutalism', 'editorial brutalism', 'bodoni brutalism'],
}
