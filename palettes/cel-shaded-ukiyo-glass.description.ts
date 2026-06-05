import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'cel-shaded-ukiyo-glass',
  tagline:
    'Japanese woodblock register on a Cel+Glass hybrid — warm paper field, 3px ink-outline halo with a hard offset shadow, translucent indigo-frosted panels behind a backdrop blur, Hokusai indigo for link and primary, a vermilion seal focus ring, and a Mincho serif display. No CRT, no text glow.',
  summary:
    'Ukiyo-e (Cel·Glass) is the woodblock-print register of a Cel+Glass hybrid. The cel-shaded engine still owns the ' +
    'chrome — every surface carries a 3px ink outline (`effect.outline.color = #1f2329`) and `elevation.*` paints a hard ' +
    'offset block shadow (`effect.shadowStyle = hard`) — but the glassmorphism layer is now live: `surface.raised` is a ' +
    'translucent indigo wash (`rgba(31, 78, 121, 0.07)`) and `effect.backdropBlur.lg = blur(20px)` frosts whatever sits ' +
    'behind a panel. The paper field stays light and warm (`surface.base = #f2ebd9`), Hokusai indigo `#1f4e79` carries ' +
    'both `content.link` and `intent.primary`, and a vermilion seal `#c8443a` lights the focus ring. There is no CRT ' +
    'layer (no scanlines, no colored glow) and `effect.glow` is fully transparent — no text halo. `a11y` is experimental.',
  origin:
    'Edo-period Japanese ukiyo-e woodblock prints — Hokusai, Hiroshige, Utamaro — where flat ink-keyblock outlines hold ' +
    'fields of registered colour against warm washi paper, indigo (aizuri-e) sky and water, and a vermilion artist seal. ' +
    'This palette ports that grammar onto a Cel+Glass hybrid: the ink keyline becomes the cel outline, the registered ' +
    'flats become frosted translucent panels, and the paper stays light.',
  signatures: [
    {
      label: 'Ink keyline outline (`#1f2329`, 3px) plus a hard offset block shadow',
      detail:
        'Every surface carries the cel affordance: `effect.outline = { color: #1f2329, width: 3px }` and ' +
        '`effect.shadowStyle = hard`. `elevation.medium.boxShadow` is `5px 5px 0 #1f2329, 0 8px 20px rgba(31, 35, 41, 0.12)` — ' +
        'the woodblock keyline halo plus a soft drop, the hybrid signature.',
    },
    {
      label: 'Translucent indigo-frosted panels behind a backdrop blur',
      detail:
        '`surface.raised` is `rgba(31, 78, 121, 0.07)` — a faint Hokusai-indigo wash that reads as material, not fog — and ' +
        '`effect.backdropBlur.lg = blur(20px)` frosts the paper behind raised panels. This is the glassmorphism half of the ' +
        'hybrid, the part the pure cel-shaded siblings never carry.',
    },
    {
      label: 'Hokusai indigo primary (`#1f4e79`) with vermilion seal focus ring (`#c8443a`)',
      detail:
        '`intent.primary.bg = #1f4e79` and `content.link = #1f4e79` carry the aizuri-e indigo; `effect.focusRing.color = ' +
        '#c8443a` and `intent.danger.bg = #c8443a` carry the vermilion artist seal. The indigo/vermilion pairing is the ' +
        'load-bearing ukiyo-e cue.',
    },
    {
      label: 'Mincho serif display on a warm washi-paper field',
      detail:
        '`typography.family.display` is `"Shippori Mincho", "Yu Mincho", "Hiragino Mincho ProN", ...` — a brushed Japanese ' +
        'serif, never uppercased — set against `surface.base = #f2ebd9`. The serif-on-warm-paper reads as a print block, ' +
        'not a HUD callout.',
    },
  ],
  antiSignatures: [
    'Scanlines, phosphor bleed, or a colored text glow — there is no CRT layer and `effect.glow` is transparent',
    'A cool steel-white or pure-white field (this palette keeps warm washi paper `#f2ebd9`)',
    'Opaque solid panels with no backdrop blur (the raised surfaces are translucent and `backdropBlur.lg` is live)',
    'A squared technical or condensed-grotesque display face (ukiyo-e is a brushed Mincho serif)',
    'A transparent or zero-width outline — the ink keyline is the shared cel affordance',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.base',
      note: '`#f2ebd9` warm washi paper — the light field the hybrid keeps.',
    },
    {
      path: 'color.surface.raised',
      note: '`rgba(31, 78, 121, 0.07)` translucent indigo wash — the glassmorphism panel material.',
    },
    {
      path: 'effect.outline.color',
      note: '`#1f2329` ink keyline — the cel-shaded outline halo, 3px.',
    },
    {
      path: 'effect.backdropBlur.lg',
      note: '`blur(20px)` — frosts the paper behind raised panels; the glass half of the hybrid.',
    },
    {
      path: 'elevation.medium.boxShadow',
      note: '`5px 5px 0 #1f2329, 0 8px 20px rgba(31, 35, 41, 0.12)` — hard offset keyline plus a soft drop, no colored glow.',
    },
    {
      path: 'effect.glow.radius',
      note: '`0` with `color: transparent` — there is no text glow; the CRT register is absent.',
    },
    {
      path: 'typography.family.display',
      note: 'Shippori / Yu / Hiragino Mincho stack — the brushed woodblock serif.',
    },
  ],
  lookalikes: [
    {
      against: 'cel-shaded-mecha',
      differentiator:
        'Same cel-shaded engine and ink-outline halo. Mecha is opaque cockpit chrome — cool steel-white field, dark steel-blue inverted primary, squared Chakra Petch, no backdrop blur. Ukiyo-e (this palette) adds the glass half — warm washi paper, translucent indigo-frosted panels with `backdropBlur.lg` live, Mincho serif. Mecha is hardware; this is a print block under frosted glass.',
    },
    {
      against: 'liquid-glass-light',
      differentiator:
        'Liquid Glass is pure glassmorphism — soft inset shadows, transparent outline, no ink halo. Ukiyo-e (this palette) is the hybrid — it keeps the 3px ink keyline (`effect.outline.color = #1f2329`) and the hard offset block shadow on top of the translucent panels. Glass is frosted-only; this is frosted-plus-inked.',
    },
    {
      against: 'glassmorphism',
      differentiator:
        'Glassmorphism is the canonical frosted-panel engine with no outline and soft shadows only. Ukiyo-e (this palette) is cel-shaded at the engine level — the woodblock ink keyline and hard offset shadow are always on, with the frosted panels layered underneath. Same blur grammar, opposite outline grammar.',
    },
  ],
  thrivesWith: [
    'Cards, Modals, Drawers — translucent indigo panels with an ink keyline read as a registered print plate over frosted paper',
    'Buttons / Tabs — the indigo primary with a vermilion focus ring is a clean print-and-seal pairing',
    'Hero / marketing surfaces — the warm washi field plus Mincho serif reads as a gallery print',
    'Badges / Status — the indigo / vermilion / leaf-green intents map naturally to a woodblock colour story',
  ],
  degradesWith: [
    'Tables with dense rows — the per-row ink keyline density is the shared cel-shaded cost',
    'Stacked translucent overlays — multiple frosted panels over each other muddy the indigo wash',
    'Tiny dense controls — the 3px keyline plus offset shadow crowds compact widgets',
  ],
  recallAliases: ['ukiyo-e', 'ukiyo e', 'ukiyoe', 'woodblock', 'hokusai', 'hiroshige', 'cel-shaded ukiyo-e', 'cel glass ukiyo', 'japanese print', 'aizuri-e'],
}
