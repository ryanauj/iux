import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'cel-shaded-botanical-glass',
  tagline:
    'Pressed-herbarium / vintage-field-guide register on a Cel+Glass hybrid — warm paper field, 3px ink-outline halo with a hard offset shadow, translucent leaf-green-frosted panels behind a backdrop blur, botanical green for link, primary, and focus ring, and a humanist book serif on every role. No CRT, no text glow.',
  summary:
    'Botanical (Cel·Glass) is the pressed-herbarium / vintage-field-guide register of a Cel+Glass hybrid. The cel-shaded ' +
    'engine still owns the chrome — every surface carries a 3px ink outline (`effect.outline.color = #2f2a1d`) and ' +
    '`elevation.*` paints a hard offset block shadow (`effect.shadowStyle = hard`) — but the glassmorphism layer is now ' +
    'live: `surface.raised` is a translucent leaf-green wash (`rgba(74, 107, 58, 0.07)`) and `effect.backdropBlur.lg = ' +
    'blur(20px)` frosts whatever sits behind a panel. The paper field stays light and warm (`surface.base = #f0ead7`), a ' +
    'botanical-leaf green `#4a6b3a` carries `content.link`, `intent.primary`, and the focus ring, and a humanist book ' +
    'serif (Spectral / EB Garamond) sets every role. There is no CRT layer (no scanlines, no colored glow) and ' +
    '`effect.glow` is fully transparent — no text halo. `a11y` is experimental.',
  origin:
    'Victorian botanical illustration and the vintage field guide — pressed-herbarium plates, hand-engraved leaf and ' +
    'stem keylines, and warm rag-paper backgrounds annotated in a humanist book serif. This palette ports that grammar ' +
    'onto a Cel+Glass hybrid: the engraved keyline becomes the cel outline, the flat plate becomes a frosted ' +
    'translucent panel, and the paper stays warm under the serif.',
  signatures: [
    {
      label: 'Engraved keyline outline (`#2f2a1d`, 3px) plus a hard offset block shadow',
      detail:
        'Every surface carries the cel affordance: `effect.outline = { color: #2f2a1d, width: 3px }` and ' +
        '`effect.shadowStyle = hard`. `elevation.medium.boxShadow` is `5px 5px 0 #2f2a1d, 0 8px 20px rgba(47, 42, 29, 0.12)` — ' +
        'the engraved plate keyline halo plus a soft drop, the hybrid signature.',
    },
    {
      label: 'Translucent leaf-green-frosted panels behind a backdrop blur',
      detail:
        '`surface.raised` is `rgba(74, 107, 58, 0.07)` — a faint botanical-green wash that reads as material, not fog — and ' +
        '`effect.backdropBlur.lg = blur(20px)` frosts the paper behind raised panels. This is the glassmorphism half of ' +
        'the hybrid, the part the pure cel-shaded siblings never carry.',
    },
    {
      label: 'Botanical-leaf green (`#4a6b3a`) on primary, link, and focus ring',
      detail:
        '`intent.primary.bg = #4a6b3a`, `content.link = #4a6b3a`, and `effect.focusRing.color = #4a6b3a` all carry the ' +
        'single field-guide green. The leaf-green-on-warm-paper discipline is the load-bearing herbarium cue.',
    },
    {
      label: 'Humanist book serif on every role over a warm rag-paper field',
      detail:
        '`typography.family.ui` and `typography.family.display` are both `"Spectral", "EB Garamond", "PT Serif", ...` — a ' +
        'humanist book serif, never uppercased — set against `surface.base = #f0ead7`. The serif-on-warm-paper reads as a ' +
        'field-guide page, not a HUD callout.',
    },
  ],
  antiSignatures: [
    'Scanlines, phosphor bleed, or a colored text glow — there is no CRT layer and `effect.glow` is transparent',
    'A cool steel-white or pure-white field (this palette keeps warm rag paper `#f0ead7`)',
    'Opaque solid panels with no backdrop blur (the raised surfaces are translucent and `backdropBlur.lg` is live)',
    'A squared technical or condensed-grotesque display face (botanical is a humanist book serif)',
    'A transparent or zero-width outline — the engraved keyline is the shared cel affordance',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.base',
      note: '`#f0ead7` warm rag paper — the light field the hybrid keeps.',
    },
    {
      path: 'color.surface.raised',
      note: '`rgba(74, 107, 58, 0.07)` translucent leaf-green wash — the glassmorphism panel material.',
    },
    {
      path: 'effect.outline.color',
      note: '`#2f2a1d` engraved keyline — the cel-shaded outline halo, 3px.',
    },
    {
      path: 'effect.backdropBlur.lg',
      note: '`blur(20px)` — frosts the paper behind raised panels; the glass half of the hybrid.',
    },
    {
      path: 'elevation.medium.boxShadow',
      note: '`5px 5px 0 #2f2a1d, 0 8px 20px rgba(47, 42, 29, 0.12)` — hard offset keyline plus a soft drop, no colored glow.',
    },
    {
      path: 'color.intent.primary.bg',
      note: '`#4a6b3a` botanical-leaf green — the single field-guide accent, also carried on link and focus ring.',
    },
    {
      path: 'typography.family.display',
      note: 'Spectral / EB Garamond / PT Serif stack — the humanist book serif of the field-guide page.',
    },
  ],
  lookalikes: [
    {
      against: 'cel-shaded-mecha',
      differentiator:
        'Same cel-shaded engine and ink-outline halo. Mecha is opaque cockpit chrome — cool steel-white field, dark steel-blue inverted primary, squared Chakra Petch, no backdrop blur. Botanical (this palette) adds the glass half — warm rag paper, translucent leaf-green-frosted panels with `backdropBlur.lg` live, humanist book serif. Mecha is hardware; this is a herbarium plate under frosted glass.',
    },
    {
      against: 'liquid-glass-light',
      differentiator:
        'Liquid Glass is pure glassmorphism — soft inset shadows, transparent outline, no ink halo, and a cool palette. Botanical (this palette) is the hybrid — it keeps the 3px engraved keyline (`effect.outline.color = #2f2a1d`) and the hard offset block shadow on top of the translucent panels, with a warm green field-guide register. Glass is frosted-only; this is frosted-plus-inked.',
    },
    {
      against: 'glassmorphism',
      differentiator:
        'Glassmorphism is the canonical frosted-panel engine with no outline and soft shadows only. Botanical (this palette) is cel-shaded at the engine level — the engraved keyline and hard offset shadow are always on, with the frosted green panels layered underneath. Same blur grammar, opposite outline grammar.',
    },
  ],
  thrivesWith: [
    'Cards, Modals, Drawers — translucent green panels with an engraved keyline read as a herbarium plate over frosted paper',
    'Hero / marketing surfaces — the warm rag field plus humanist serif reads as a field-guide page',
    'Buttons / Tabs — the leaf-green primary with a matching focus ring is a calm field-guide pairing',
    'Badges / Status — the green / amber / terracotta intents map naturally to a botanical colour story',
  ],
  degradesWith: [
    'Tables with dense rows — the per-row engraved keyline density is the shared cel-shaded cost',
    'Stacked translucent overlays — multiple frosted panels over each other muddy the green wash',
    'Tiny dense controls — the 3px keyline plus offset shadow crowds compact widgets',
  ],
  recallAliases: ['botanical', 'herbarium', 'field guide', 'pressed flowers', 'victorian botanical', 'cel-shaded botanical', 'cel glass botanical', 'botanical illustration'],
}
