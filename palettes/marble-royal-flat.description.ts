import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'marble-royal-flat',
  tagline:
    'Gallery-plinth register on the Flat engine — Carrara-marble paper field via a procedural overlay, gold-vein accent, Trajan-feel display caps for headings.',
  summary:
    'Marble Royal Flat is the third palette in the royal register set, distinguished by a ' +
    'photographic marble texture painted at the palette root via `effect.overlay.image`. The ' +
    'overlay is procedural (five stacked radial gradients tiled at 720 × 720) rather than a ' +
    'photo asset, so the palette stays self-contained. `intent.primary.bg` is gold-vein ' +
    '(`#9c7a2b`); the display family is Trajan Pro / Cinzel — architectural caps that sit on ' +
    'the marble like inscribed plaques. `elevation.*` uses a warmer shadow tint so cards read ' +
    'as inset plaques rather than floating above neutral ground. Ships `experimental` because ' +
    'body text on `surface.base` (the marble field) loses contrast where the vein layer is ' +
    'darkest — long-form body must sit on `raised`.',
  origin:
    'Greco-Roman and Italian Renaissance gallery aesthetics applied to a contemporary Flat ' +
    'engine. Trajan Pro itself was a digital revival (Adobe, 1989) of the Roman square capitals ' +
    'on the Trajan column (113 CE); Cinzel is the Google Fonts open-source cousin. The marble ' +
    'overlay is the contemporary equivalent of a marble plinth on a museum pedestal — the ' +
    'palette commits to the gallery register the way Mid-century modern commits to the Eames ' +
    'catalogue.',
  signatures: [
    {
      label: 'Procedural marble overlay via `effect.overlay.image`',
      detail:
        '`effect.overlay.image` paints five stacked radial gradients tiled at 720 × 720: three warm vein layers (`rgba(156,122,43, 0.06–0.10)`) plus two bright highlight layers (`rgba(255,255,255, 0.16–0.20)`). `blend: multiply` lets the brighter `surface.raised` punch through. This is the same overlay Graffiti / Marble reuses.',
    },
    {
      label: 'Gold-vein `intent.primary.bg` (`#9c7a2b`) — hover warms to `#b8893a`',
      detail:
        'The hover state shifts gold one step warmer rather than darker, mimicking a marble vein catching light. The palette is the only one in the royal trio that promotes gold to the primary accent.',
    },
    {
      label: 'Trajan / Cinzel display caps on display + title + heading roles',
      detail:
        '`typography.family.display` is Trajan Pro with Cinzel as the open-source fallback. Display, title, heading, subheading all set `textTransform: uppercase` and tracking 0.02–0.04em — the architectural-caps register.',
    },
    {
      label: 'Body text routed through `display` family (Cormorant)',
      detail:
        'Unusually, `role.body` reads `family: display` — but the Trajan family stack falls through to Cormorant Garamond before any sans, so body copy renders as Cormorant. This is the gallery-register convention: caps for headings, italic-friendly serif for paragraphs.',
    },
    {
      label: 'Warmer-tinted soft elevation shadows',
      detail:
        '`elevation.low` is `0 1px 2px rgba(60, 40, 20, 0.10)` — the same penumbra recipe as Flat / Classic but with a warm brown tint rather than slate-blue. Cards sit on the marble like inset plaques.',
    },
  ],
  antiSignatures: [
    'A flat solid-colour `surface.base` without the marble overlay (defeats the entire register)',
    'Sans-serif display type — Trajan / Cinzel caps are load-bearing',
    'Lowercase or sentence-case display headings (must be uppercase)',
    'Cool blue-grey elevation shadows (the tint must read warm against marble)',
    'A second saturated accent competing with the gold-vein primary',
  ],
  tokenEvidence: [
    {
      path: 'effect.overlay.image',
      note: 'The five-radial-gradient marble texture — the load-bearing visual. Shared with Graffiti / Marble.',
    },
    {
      path: 'effect.overlay.blend',
      note: '`multiply` — lets the brighter `surface.raised` punch through the marble pattern.',
    },
    {
      path: 'color.intent.primary.bg',
      note: 'Gold-vein `#9c7a2b`. Hover warms to `#b8893a`, mimicking a vein catching light.',
    },
    {
      path: 'typography.family.display',
      note: 'Trajan Pro / Cinzel — architectural caps. Falls through to Cormorant for body.',
    },
    {
      path: 'typography.role.display.textTransform',
      note: '`uppercase` — the architectural-caps register.',
    },
    {
      path: 'elevation.low.boxShadow',
      note: '`0 1px 2px rgba(60, 40, 20, 0.10)` — warm brown tint, not slate-blue.',
    },
  ],
  lookalikes: [
    {
      against: 'modern-royal',
      differentiator:
        'Modern Royal is the dark-field royal register: deep aubergine surface, gold accent, Cormorant display. Marble Royal Flat is the light-field gallery register: marble overlay, gold-vein accent, Trajan caps.',
    },
    {
      against: 'graffiti-marble',
      differentiator:
        'Graffiti / Marble shares the exact same marble overlay but swaps the gold-vein accent for fluorescent magenta + lime spray-paint colours and the Trajan display for Permanent Marker. The marble is the gallery; one palette respects it, the other vandalises it.',
    },
    {
      against: 'editorial',
      differentiator:
        'Editorial is warm paper + ink + restrained terracotta accent — a magazine register. Marble Royal Flat is cool stone + gold-vein + architectural caps — a gallery register. Same Flat engine, completely different surface model.',
    },
  ],
  thrivesWith: [
    'Hero panels and gallery / museum landing pages — the marble overlay carries the register',
    'Section headings in Trajan caps — what the type family was literally designed for',
    'Cards on `surface.raised` — the polished-marble lift reads as plinths',
  ],
  degradesWith: [
    'Body text directly on `surface.base` — the marble vein layer drops contrast below AA in patches; long-form must sit on `raised`',
    'Photographic content — the marble overlay competes with any image-heavy layout',
    'Dense data tables — the visual texture makes row scanning slower',
  ],
  recallAliases: ['marble royal flat', 'marble royal', 'marble', 'royal marble', 'gallery marble', 'carrara royal'],
}
