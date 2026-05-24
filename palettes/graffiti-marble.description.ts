import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'graffiti-marble',
  tagline:
    'Gallery marble vandalised — Carrara-marble overlay surfaces, fluorescent magenta + lime spray-paint intents with BLACK inverse content (not white), Permanent Marker display face.',
  summary:
    'Graffiti / Marble is the deliberately confrontational palette. It reuses the procedural ' +
    'marble overlay Marble Royal Flat ships and pairs it with fluorescent spray-paint intents ' +
    '(`#ff2dad` magenta as `intent.primary`, `#c6ff00` lime as `intent.warning`) and a Permanent ' +
    'Marker display face. The two references — museum plinth and street tag — never blend; they ' +
    'collide. Ships `experimental` because the fluorescent accents only pass AA against BLACK ' +
    'inverse content (not white) — the palette pins `intent.primary.content` to `#0a0a0a` to ' +
    'survive contrast checks, which is the documented contrast-trap the palette teaches.',
  origin:
    'Gallery marble (Greco-Roman plinths via Trajan Pro / Cinzel) collided with street graffiti ' +
    '(spray-paint magenta + lime, Permanent Marker / Bungee display fonts). Conceptually similar ' +
    'to Banksy\'s gallery installations or Jenny Holzer\'s marble truisms — the institutional ' +
    'register intentionally vandalised. The palette is the showcase\'s contrast-trap teaching ' +
    'example: it documents itself by being one.',
  signatures: [
    {
      label: 'Procedural marble overlay (shared with Marble Royal Flat)',
      detail:
        '`effect.overlay.image` is the exact same five-radial-gradient marble texture Marble Royal Flat ships, tiled at 720 × 720 with `blend: multiply`. The marble is what makes the spray-paint collision read as graffiti rather than as a single saturated palette.',
    },
    {
      label: 'Fluorescent magenta `intent.primary.bg` (`#ff2dad`) with BLACK content (not white)',
      detail:
        '`intent.primary.content` is `#0a0a0a` — black. The combination of fluorescent magenta + white falls to ~3.2:1 (failing AA body); magenta + black sits at ~7.5:1 (passing AAA). The palette pins black on every saturated intent (`primary`, `success`, `warning`, `danger`, `info`) to survive contrast.',
    },
    {
      label: 'Fluorescent lime `intent.warning.bg` (`#c6ff00`)',
      detail:
        'The second spray-paint accent. `intent.warning` is the slot where the lime lives without competing with the magenta primary. Black content keeps it AA.',
    },
    {
      label: 'Permanent Marker / Bungee display family',
      detail:
        '`typography.family.display` is `"Permanent Marker", "Bungee", "Bungee Spice", "Impact", ...` — a spray-paint webfont that carries its tagged edge variation natively. The concept doc flagged a possible new `effect.spray.*` engine slot for SVG-displacement spray; not needed here because the display font does the work.',
    },
    {
      label: 'Uppercase display, title, heading with tracked-out caps',
      detail:
        '`role.display.textTransform: uppercase`, `tracking: 0.01em` — the spray-tag register. The contrast with Marble Royal Flat\'s tighter `0.02–0.04em` Trajan caps is intentional: graffiti looser, gallery tighter.',
    },
    {
      label: 'Body fallback to Inter for legibility',
      detail:
        'The display is intentionally hard to read; `family.body` falls through to Inter so paragraphs stay legible. The split is the palette\'s thesis: vandal-display, legible-body.',
    },
  ],
  antiSignatures: [
    'White inverse content on the fluorescent intents (the saturated colours fail AA against white)',
    'A solid colour `surface.base` without the marble overlay (defeats the entire gallery-vs-street collision)',
    'A sober serif or sans display family — must be spray-paint / marker',
    'A second muted accent — the palette commits to fluorescent saturation',
    'A serif body family — must be a humanist sans for legibility contrast',
  ],
  tokenEvidence: [
    {
      path: 'effect.overlay.image',
      note: 'The five-radial-gradient marble texture — shared with Marble Royal Flat.',
    },
    {
      path: 'color.intent.primary.bg',
      note: 'Fluorescent magenta `#ff2dad`.',
    },
    {
      path: 'color.intent.primary.content',
      note: 'BLACK `#0a0a0a` (not white). The contrast pin that lets the saturated accent survive AA.',
    },
    {
      path: 'color.intent.warning.bg',
      note: 'Fluorescent lime `#c6ff00` — the second spray-paint accent.',
    },
    {
      path: 'typography.family.display',
      note: 'Permanent Marker / Bungee — spray-paint webfont with native edge variation.',
    },
    {
      path: 'color.content.inverse',
      note: 'BLACK `#0a0a0a` — the global inverse, not white. Pinned at the content level so every intent inherits it correctly.',
    },
  ],
  lookalikes: [
    {
      against: 'marble-royal-flat',
      differentiator:
        'Marble Royal Flat shares the EXACT same marble overlay but commits to gold-vein accent and Trajan-caps display — the gallery register respected. Graffiti / Marble swaps the gold for fluorescent magenta + lime and the Trajan for Permanent Marker — the gallery register vandalised. The marble is the gallery; one palette respects it, the other tags it.',
    },
    {
      against: 'memphis-80s',
      differentiator:
        'Memphis-80s also pairs vibrant clashing colours and confetti-vocabulary borders. Memphis is on a CREAM `surface.base` with ink-black borders on every slot, and its accents are primary colours (red/yellow/blue) not fluorescents. Graffiti / Marble is on a MARBLE field with fluorescent magenta + lime and a Permanent Marker display — the confrontation is gallery-vs-street, not 80s pattern-vs-pattern.',
    },
    {
      against: 'vaporwave',
      differentiator:
        'Vaporwave is magenta/cyan on a deep night-purple field with serif display + uppercase mono labels — dusk register. Graffiti / Marble is daytime: marble field, fluorescent magenta + lime, spray-marker display — the saturation is louder, the register confrontational rather than nostalgic.',
    },
  ],
  thrivesWith: [
    'Hero panels and brand-statement headers — the marble + spray collision is the message',
    'Buttons and call-to-action badges — the fluorescent intents read loud',
    'Cards on `surface.raised` — the polished marble + bold tagging contrast reads as gallery installation',
  ],
  degradesWith: [
    'Long-form articles — the spray-marker display fights legibility even with sans body',
    'Components that wire `onPrimary` to white (must override to use `intent.primary.content`)',
    'Forms — the fluorescent focus / accent colours overwhelm input states',
    'Photographic content — the marble field competes with images, the spray accents compete with everything else',
    'Anyone with photosensitivity — fluorescent accents on a textured field are visually aggressive',
  ],
  recallAliases: ['graffiti marble', 'graffiti', 'marble graffiti', 'spray marble', 'tagged marble', 'gallery graffiti'],
}
