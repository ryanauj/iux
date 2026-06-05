import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'cel-glass-sunset',
  tagline:
    'The warm, vivid register of the cel-glass engine — frosted translucent panels over a hot magenta-rose host, cut with a warm near-black cel line and an orange/violet intent story.',
  summary:
    'Cel-Glass (Sunset) is the warm register of the `cel-glass` engine, the glassmorphism-meets-cel mix tuned to the ' +
    'anime-poster end. `surface.raised` is white at 0.4 alpha frosted with `backdrop-filter` (`effect.backdropBlur.md = blur(14px)`) ' +
    'over a hot magenta-rose host (`surface.base = #c65b9c`), and every panel and control is wrapped in a 2px warm near-black ' +
    'cel line (`effect.outline.color = #1a0a14`). Intents run orange primary / violet info / lime success at high alpha. ' +
    '`elevation.*` keeps the hybrid — an inset glass top-highlight over a hard-offset warm-ink block (`effect.shadowStyle = hard`).',
  origin:
    'The sunset/golden-hour reading of the glassmorphism × cel-shaded cross — the warm, saturated end where a frosted glass ' +
    'panel meets an anime key-visual palette. Where Frost is icy and Noir is night-mode, Sunset is the poster-bright reading.',
  signatures: [
    {
      label: 'Hot magenta-rose host under frosted white panels',
      detail:
        '`surface.base = #c65b9c` with `surface.raised = rgba(255,255,255,0.4)` frosted by `effect.backdropBlur.md = blur(14px)`, so the warm host glows through the translucent panes. This is the glass half on a saturated, warm field.',
    },
    {
      label: 'Warm near-black cel ink line on every panel and control',
      detail:
        '`effect.outline.color = #1a0a14`, `effect.outline.width = 2px` — a warm-shifted ink (not the cool `#0b1622` of Frost) painted as the engine outline and at every `color.border.*`, so each frosted pane carries a crisp graphic edge.',
    },
    {
      label: 'Orange / violet / lime intent story at high alpha',
      detail:
        'Orange primary `rgba(249,115,22,0.92)`, violet info `rgba(139,92,246,0.92)`, lime success — the anime-poster triad, held near 0.92 alpha so the fills stay legible cels over the frost. Every `intent.*.border` is the warm ink.',
    },
    {
      label: 'Hybrid `elevation.*` — inset glass highlight over a hard warm-ink block',
      detail:
        '`elevation.low = inset 0 1px 0 rgba(255,255,255,0.55), 2px 2px 0 rgba(26,10,20,0.16)` — a refraction catch over an unblurred warm-ink offset. `effect.shadowStyle = hard`.',
    },
  ],
  antiSignatures: [
    'A cool or aqua host (that would be the Frost register of the same engine)',
    'A dark host with a bright inverted line (that would be the Noir register)',
    'Opaque flat fills (that would be plain cel-shaded; Sunset frosts every surface)',
    'Soft borderless glass panels (that is the glassmorphism family; Sunset always draws the warm cel line)',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.base',
      note: '`#c65b9c` — the hot magenta-rose host that glows through the frosted panels.',
    },
    {
      path: 'effect.outline.color',
      note: '`#1a0a14` — a warm near-black cel line, distinct from Frost\'s cool `#0b1622`. The glass family returns `transparent`.',
    },
    {
      path: 'color.intent.primary.bg',
      note: '`rgba(249,115,22,0.92)` — orange-500 at high alpha, the anime-poster primary held legible over the frost.',
    },
    {
      path: 'effect.backdropBlur.md',
      note: '`blur(14px)` — the frost the engine applies to raised surfaces. Plain cel-shaded returns `none`.',
    },
    {
      path: 'effect.shadowStyle',
      note: '`hard` — the unblurred warm-ink offset baked into `elevation.*`, alongside the glass top-highlight.',
    },
  ],
  lookalikes: [
    {
      against: 'cel-glass-frost',
      differentiator:
        'Frost and Sunset are temperature siblings on the identical engine. Frost is cool — aqua host, cool near-black ink `#0b1622`, cyan/mint intents. Sunset is warm — magenta-rose host, warm ink `#1a0a14`, orange/violet intents. Same glass-plus-cel rules, opposite warmth.',
    },
    {
      against: 'cel-shaded-shojo',
      differentiator:
        'Shojo is the pure-cel warm-anime parent — same hard ink outline and pink/lavender pastel story, but its surfaces are opaque flat fills with no blur (`effect.backdropBlur` is `none`). Sunset frosts every surface, so the ink line wraps a translucent pane rather than a solid cel.',
    },
    {
      against: 'vaporwave',
      differentiator:
        'Vaporwave shares the hot magenta/violet sunset palette but renders on a flat engine with gradient glow and no hard outline. Sunset\'s identity is the always-present warm cel line wrapping each frosted, backdrop-blurred panel.',
    },
  ],
  thrivesWith: [
    'Cards, Modals, Toasts — frosted warm panes with a crisp ink edge read as anime key-visual UI',
    'Buttons, Toggles, Tabs — the outline halo gives translucent controls an unambiguous edge',
    'Marketing / hero layouts over a warm gradient — the blur has something vivid to frost',
  ],
  degradesWith: [
    'Dense Tables — an ink line on every translucent row reads busy',
    'Flat or desaturated backdrops — the backdrop-filter has nothing worth frosting',
  ],
  recallAliases: ['cel-glass sunset', 'cel glass sunset', 'warm cel glass', 'sunset glass anime', 'magenta cel glass', 'anime glass poster'],
}
