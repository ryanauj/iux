import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'desert-modernism',
  tagline:
    'Palm Springs mid-century register — sun-baked cream field, desert-terracotta `intent.primary`, pool-turquoise `intent.info`, palm-shade-green `intent.success`, Futura PT display.',
  summary:
    'Desert Modernism is the Palm-Springs-resort register on the Flat engine — the same chassis as Mid-century ' +
    'modern, tuned to the Coachella-Valley outdoor palette instead of the Eames indoor-textile palette. Sun-baked ' +
    'cream (`#f5e9d4`) fills `surface.base`; desert terracotta (`#9c3d1f`) carries `intent.primary`; pool turquoise ' +
    '(`#1f7d8a`) carries `intent.info`; palm-shade green (`#356a3a`) carries `intent.success`. Futura PT on display ' +
    'and Inter on body keep the typography geometric + humanist.',
  origin:
    'The Palm Springs mid-century-modern architecture scene, c.1946–1965 — Albert Frey, John Lautner, Donald ' +
    'Wexler, William Krisel residential and resort buildings. The colour vocabulary is pulled directly from the ' +
    'landscape: baked-clay roof tiles, unheated swimming-pool turquoise, palm-shadow shade, mustard dry-grass, ' +
    'rust-red rock. Futura PT is the typeface era-correct for the period\'s real-estate brochures and resort signage.',
  signatures: [
    {
      label: 'Sun-baked cream field with desert-terracotta `intent.primary`',
      detail:
        '`surface.base` `#f5e9d4` (a stucco wall in the shade at 3 p.m.); `intent.primary.bg` `#9c3d1f` (the baked-clay roof tile of a Frey residence). The cream is warmer than Editorial / Mid-century-modern; the terracotta is the saturated outdoor primary that distinguishes Desert from indoor mid-century.',
    },
    {
      label: 'Pool turquoise as `intent.info`',
      detail:
        '`intent.info.bg` `#1f7d8a` — the saturated cyan of an unheated Coachella pool at midday. Distinct from Riso blue (`#1755bf`) and Bullet Train sky blue — this is specifically the chlorinated-pool turquoise.',
    },
    {
      label: 'Palm-shade green `intent.success` + desert-mustard `intent.warning`',
      detail:
        'The four desert intents tie together via climate: `success` `#356a3a` (palm-shade green), `warning` `#9c6a14` (desert mustard), the warmth register is consistent across the palette so the four-colour set reads as "Palm Springs at noon" rather than as a brand colour vocabulary.',
    },
    {
      label: 'Futura PT display + Inter body',
      detail:
        '`typography.family.display` is Futura PT (Avenir Next fallback) — the humanist-geometric sans tied to the era. `family.body` is Inter for long-form reading. The geometric counters cue mid-century without committing the body to a costume typeface.',
    },
  ],
  antiSignatures: [
    'Walnut or teal accents (those are indoor Mid-century-modern\'s textile register)',
    'A cool-grey `surface.base` — the cream needs the desert warmth',
    'A serif display family — the geometric sans is the era cue',
    'A red `danger` saturated enough to compete with the terracotta `primary`',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Sun-baked cream `#f5e9d4` — stucco-wall colour in shade.' },
    { path: 'color.intent.primary.bg', note: 'Desert terracotta `#9c3d1f` — baked-clay roof tile colour.' },
    { path: 'color.intent.info.bg', note: 'Pool turquoise `#1f7d8a` — unheated Coachella pool at midday.' },
    { path: 'color.intent.warning.bg', note: 'Desert mustard `#9c6a14` — dry-grass colour tying the warmth register together.' },
    { path: 'typography.family.display', note: 'Futura PT — humanist-geometric sans tied to the era.' },
  ],
  lookalikes: [
    {
      against: 'mid-century-modern',
      differentiator:
        'Same Flat engine, same era. Mid-century modern is the Eames indoor-textile register: cream + walnut + mustard + teal, with an atomic-dot field overlay via `effect.overlay.image`. Desert Modernism is the Palm-Springs outdoor register: cream + terracotta + pool turquoise + palm green, no overlay. Indoor textile palette vs outdoor landscape palette — siblings, not duplicates.',
    },
    {
      against: 'heritage-maritime',
      differentiator:
        'Both palettes use a cream field with multiple period-correct accents. Heritage Maritime: navy `primary` + brass `warning` + signal-red `danger` (nautical / chandlery register). Desert Modernism: terracotta `primary` + pool turquoise `info` + palm green `success` (Palm Springs register). Different `surface.base` warmth (Heritage cooler, Desert warmer) and entirely different intent vocabularies.',
    },
    {
      against: 'industrial-light',
      differentiator:
        'Industrial / Light is the warm-paper workshop register: steel-grey neutrals + safety-orange primary + IBM Plex Mono on `family.ui`. Desert Modernism is the warm-paper resort register: terracotta + pool turquoise + Futura PT display. Same warm-paper field family; opposite typography vocabulary and opposite intent register.',
    },
  ],
  thrivesWith: [
    'Hospitality / travel landing pages, resort booking flows',
    'Architecture and real-estate portfolios, photography-heavy editorial',
    'Long-form Inter body on `surface.raised` paired with Futura PT display headings',
  ],
  degradesWith: [
    'Dense data tables (the warm cream + saturated terracotta read as decoration on dense surfaces)',
    'Corporate finance / enterprise contexts where the resort register reads as off-brand',
  ],
  recallAliases: ['desert modernism', 'palm springs', 'mid-century desert', 'desert', 'coachella'],
}
