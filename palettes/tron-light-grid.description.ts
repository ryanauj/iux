import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'tron-light-grid',
  tagline:
    'Daylight inversion of `tron-dark-neon` — same single-cyan tuning of the Glassmorphism engine, but the near-black HUD ground flips to a cool near-white blueprint field and the neon becomes deep cyan ink.',
  summary:
    'Tron / Light-Grid is the Daybreak twin of `tron-dark-neon` on the same Glassmorphism engine. The single-cyan identity ' +
    'survives the inversion: `border.focus` (`#0891b2`), `content.link` (`#0e7490`), and every elevation halo continue to ' +
    'commit to one neon. What changes is the ground — `surface.base` flips from near-black `#04060c` to cool near-white ' +
    '`#f2f7fb`; `content.primary` flips from bright `#67e8f9` to deep cyan ink `#083344`; raised surfaces stay translucent ' +
    'cyan glass but with a much lower alpha tint. Elevation keeps the inset-cyan-stroke + outer-cyan-glow recipe, dialed ' +
    'down so the bloom reads on a bright field. `effect.focusRing.style = \'glow\'` keeps the focus-as-halo behaviour; ' +
    'Orbitron / Eurostile typography and the uppercase mono `code` carry over.',
  origin:
    'The same Tron lineage as the dark twin (*Tron* 1982, *Tron: Legacy* 2010), but in its blueprint register — the schematic ' +
    'and lightcycle-grid-on-paper version of the canonical cyan HUD. Sci-fi UI work often pairs the dark-neon HUD with a ' +
    'light blueprint companion view (Iron Man\'s overlays, *Mass Effect* schematics); this palette is that paired blueprint, ' +
    'engine-for-engine.',
  signatures: [
    {
      label: 'Single cyan accent on every border, focus, link, and elevation halo (carried from dark twin)',
      detail:
        '`border.focus` is `#0891b2`; `content.link` is `#0e7490`; every `elevation.*` slot adds an outer cyan halo ' +
        '(`rgba(8, 145, 178, 0.10 → 0.16)`). The single-neon commitment survives the inversion — the cyan just darkens slightly ' +
        'from the dark twin\'s `#22d3ee` to a deeper `#0891b2` so it reads against the bright field.',
    },
    {
      label: 'Cool near-white `surface.base` (`#f2f7fb`) with deep cyan content (`#083344`)',
      detail:
        'The Daybreak inversion. The field is cool near-white biased toward cyan (not neutral white); `content.primary` is ' +
        'deep cyan ink `#083344` — the dark twin\'s ground colour register inverted to the foreground. The blueprint ' +
        'register: cyan ink on cyan-tinted paper.',
    },
    {
      label: 'Cyan-tinted translucent `surface.raised` (`rgba(8, 145, 178, 0.06)`)',
      detail:
        'Raised surfaces stay cyan-cast translucent glass, but at a much lower alpha than the dark twin\'s `rgba(8, 145, 178, 0.10)` ' +
        '— the cyan tint reads on bright paper at lower opacity. `surface.overlay` lifts to `rgba(255, 255, 255, 0.74)` — ' +
        'near-white glass for modals.',
    },
    {
      label: 'Inset cyan stroke + outer cyan glow on `elevation.*`, dialed down for daylight',
      detail:
        '`elevation.medium` is `inset 0 0 0 1px rgba(14, 116, 144, 0.26), 0 4px 12px rgba(15, 23, 42, 0.10), 0 0 16px ' +
        'rgba(8, 145, 178, 0.12)`. The HUD-chrome recipe survives — inset rim line plus outer bloom — but every layer is ' +
        'lower-alpha than the dark twin so the glow registers on a bright field without washing out.',
    },
    {
      label: 'Glow-style focus ring (`width: 2px, offset: 2px, color: #0891b2, style: glow`)',
      detail:
        '`effect.focusRing.style = \'glow\'` carries over verbatim — focus renders as a `box-shadow` halo, not a CSS outline. ' +
        'A solid 2px outline would feel un-Tron on either register.',
    },
    {
      label: 'Orbitron / Eurostile geometric uppercase HUD typography (carried from dark twin)',
      detail:
        '`typography.family.ui` and `display` resolve to `"Orbitron", "Eurostile", "Helvetica Neue", Helvetica, Arial, sans-serif`. ' +
        'Display/title at weight 700 uppercase with `0.04em` tracking; `code` is `"Share Tech Mono"` with `textTransform: uppercase`. ' +
        'Identical typography vocabulary to the dark twin.',
    },
  ],
  antiSignatures: [
    'A near-black `surface.base` — that\'s the dark `tron-dark-neon` twin',
    'A second accent colour sharing the elevation glow — that\'s Cyberpunk Neon-Noir, which pairs magenta + cyan',
    'Solid-stroke focus ring — `effect.focusRing.style` is `glow` regardless of register',
    'A scanline overlay (`effect.overlay.image: none` here) — that demotes this to a CRT engine',
    'A proportional humanist sans like Inter — Orbitron/Eurostile is the load-bearing HUD face',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.base',
      note: '`#f2f7fb` — cool near-white blueprint field. Inverts the dark twin\'s `#04060c` near-black.',
    },
    {
      path: 'color.content.primary',
      note: '`#083344` — deep cyan ink. The dark twin\'s ground colour promoted to the foreground.',
    },
    {
      path: 'color.surface.raised',
      note: '`rgba(8, 145, 178, 0.06)` — cyan-tinted translucent glass at low alpha (dark twin runs `rgba(8, 145, 178, 0.10)` at higher contrast).',
    },
    {
      path: 'color.border.focus',
      note: '`#0891b2` — the cyan focus halo colour, slightly deeper than the dark twin\'s `#22d3ee` so it reads on bright paper.',
    },
    {
      path: 'elevation.medium.boxShadow',
      note: '`inset 0 0 0 1px rgba(14, 116, 144, 0.26), 0 4px 12px rgba(15, 23, 42, 0.10), 0 0 16px rgba(8, 145, 178, 0.12)` — the inset-stroke + outer-cyan-glow recipe dialed down for daylight.',
    },
    {
      path: 'effect.focusRing.style',
      note: '`\'glow\'` — focus renders as a `box-shadow` halo, identical to the dark twin.',
    },
    {
      path: 'typography.family.display',
      note: 'Orbitron / Eurostile geometric stack — identical to the dark twin.',
    },
    {
      path: 'motion.duration.base',
      note: '`160ms` — the tight HUD tempo carries over from the dark twin.',
    },
  ],
  lookalikes: [
    {
      against: 'tron-dark-neon',
      differentiator:
        'The dark twin. Same Glassmorphism engine, same single-cyan identity, same Orbitron HUD typography, same glow-style focus, ' +
        'same tight motion. Inverts only the colour story: near-black field → cool near-white field; bright `#67e8f9` content → ' +
        'deep cyan `#083344` content; cyan-cast glass at 0.10 alpha → cyan-cast glass at 0.06 alpha; bright cyan halos → dialed-down halos.',
    },
    {
      against: 'cyberpunk-neon-noir',
      differentiator:
        'Cyberpunk runs the same Glassmorphism engine but pairs magenta + cyan accents and lives on a dark field. Tron / Light-Grid ' +
        'commits to a single cyan everywhere and inverts to a bright blueprint field. Single-neon vs paired-neon is the load-bearing ' +
        'distinction even after the daylight inversion.',
    },
    {
      against: 'glassmorphism',
      differentiator:
        'Glassmorphism is the neutral light register of the same engine — neutral-white translucent surfaces, indigo accents, ' +
        'system-ui typography, solid-stroke focus. Tron / Light-Grid is the single-cyan tuning of that same engine on the bright ' +
        'side: cyan-cast glass (not neutral), Orbitron HUD type, glow-style focus, single-neon commitment.',
    },
    {
      against: 'blueprint',
      differentiator:
        'Blueprint is a Flat-engine architecture-drawing palette — a saturated cyan-blue field with white lines, grid overlay, and ' +
        'Eurostile-adjacent display. Tron / Light-Grid is the Glassmorphism-engine HUD register inverted: cyan ink on near-white ' +
        'paper, cyan-glass surfaces, glow-style focus, inset+outer-glow elevation. Different engines, different chrome stories.',
    },
  ],
  thrivesWith: [
    'Light-mode dashboards and schematic views — single cyan plus geometric uppercase reads as instrumentation on paper',
    'Buttons and toggles — the cyan focus halo + inset-stroke elevation make `:focus-visible` unambiguous on bright fields',
    'Modals — `elevation.overlay` plus the cyan scrim reads as a floating HUD blueprint',
  ],
  degradesWith: [
    'Long prose — Orbitron is a display face; body running text gets fatiguing past a paragraph (same caveat as the dark twin)',
    'Forms relying on intent color alone — primary, info, and link all sit in the cyan family; pair with iconography',
    'Photographic content — the cyan ground biases all photo colour toward cool',
  ],
  recallAliases: ['tron light grid', 'tron light-grid', 'light grid', 'tron blueprint', 'tron daybreak', 'cyan blueprint', 'tron light'],
}
