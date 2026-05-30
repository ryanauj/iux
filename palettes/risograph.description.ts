import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'risograph',
  tagline:
    'Duplicator-print register — clean cream paper field, fluorescent-pink + electric-blue duotone intents, hard-offset elevation tinted toward the pink.',
  summary:
    'Risograph is the "two-drum duotone print" register on the Flat engine. ' +
    'Cream paper fills `surface.base`; Riso fluorescent pink (`#e2266e`) and Medium Blue (`#1755bf`) carry the two ' +
    'load-bearing intents (`primary` and `info`). Elevation skips soft drop ' +
    'shadows in favour of hard 2-3 px offsets tinted toward the duotone pink — cards lift the way a misregistered ' +
    'second pass lifts off the first one.',
  origin:
    'The Riso GR / SF series duplicators (Riso Kagaku, 1980s–present) — drum-based screen-print machines used by ' +
    'small print shops, zine makers, and design schools. Each pass lays down one ink colour from a master stencil; ' +
    'multi-colour Riso prints register the drums one at a time, so misregistration is expected. The palette pulls ' +
    'the colour vocabulary directly from the process.',
  signatures: [
    {
      label: 'Clean cream paper field on `surface.base`',
      detail:
        '`surface.base` is Riso cream stock (`#f6efe1`) with no overlay texture — the page reads as flat coloured paper. Cards on lighter `raised` surfaces punch through cleanly, letting the duotone intents and hard-offset elevation carry the print-shop feel on their own.',
    },
    {
      label: 'Fluorescent pink + electric blue duotone intents',
      detail:
        '`intent.primary.bg` is Riso Fluorescent Pink (`#e2266e`); `intent.info.bg` is Riso Medium Blue (`#1755bf`). Together they sit on the page as the two-drum duotone register a real Riso machine produces in one pass.',
    },
    {
      label: 'Hard-offset elevation tinted toward the duotone pink',
      detail:
        '`elevation.low` is `2px 2px 0 rgba(226, 38, 110, 0.45)`; `medium` and `high` deepen the offset and add a small drop. Cards lift the way a misregistered second print pass lifts off the first — the same hard-offset family as Memphis-80s but with the colour pulled into the shadow.',
    },
    {
      label: 'Space Grotesk display + uppercase-tracked label',
      detail:
        '`typography.family.display` is Space Grotesk; `label` runs `uppercase` at `0.10em` tracking. The poster-feel typography matches the Riso aesthetic\'s tendency toward zine / event-poster compositions.',
    },
  ],
  antiSignatures: [
    'Soft gaussian drop shadows in `elevation.*` (the hard offset is the engine cue)',
    'A third saturated chromatic intent competing with the pink + blue duotone',
    'Pure-white `surface.base` (Riso prints on coloured stock, not bright white)',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Riso cream stock `#f6efe1` — the coloured paper the duotone prints on.' },
    { path: 'color.intent.primary.bg', note: 'Fluorescent pink `#e2266e` — Riso\'s drum colour, pulled down two shades so white inverse content clears 3:1.' },
    { path: 'color.intent.info.bg', note: 'Riso Medium Blue `#1755bf` — the second-drum colour completing the duotone.' },
    { path: 'elevation.low.boxShadow', note: '`2px 2px 0 rgba(226, 38, 110, 0.45)` — hard offset tinted toward the duotone pink.' },
  ],
  lookalikes: [
    {
      against: 'memphis-80s',
      differentiator:
        'Memphis-80s also uses hard-offset elevation and saturated intents, but the colour vocabulary is primary-school red / yellow / blue with black ink-line borders. Risograph uses two specific Riso drum colours (fluorescent pink + Medium Blue) on cream stock — the duotone-on-coloured-paper register is the load-bearing differentiator.',
    },
    {
      against: 'mid-century-modern',
      differentiator:
        'Mid-century-modern paints a sparse atomic-age dot field via `effect.overlay.image`, has soft drop shadows, and uses a muted walnut + teal accent set. Risograph runs a clean cream field with no overlay, hard-offset shadows, and saturated Riso drum colours.',
    },
    {
      against: 'graffiti-marble',
      differentiator:
        'Graffiti / Marble overlays a Carrara-marble texture (gallery field) with fluorescent magenta + lime intents that pass AA only against BLACK inverse content. Risograph runs a flat cream field and ships intent fills that pass AA against WHITE inverse content — the contrast traps are opposite.',
    },
  ],
  thrivesWith: [
    'Zine layouts, event posters, and editorial covers — the duotone reads as print-shop register',
    'Bold display headlines in Space Grotesk paired with short body copy on `surface.raised`',
    'Hard-offset button + card compositions that lean into the misregistration aesthetic',
  ],
  degradesWith: [
    'A third saturated chromatic intent (it breaks the two-drum duotone register)',
    'Soft gaussian shadows (they erase the hard-offset misregistration cue)',
  ],
  recallAliases: ['risograph', 'riso', 'duplicator', 'duotone print'],
}
