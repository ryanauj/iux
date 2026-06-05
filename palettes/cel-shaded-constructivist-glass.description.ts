import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'cel-shaded-constructivist-glass',
  tagline:
    'Soviet agitprop-poster register on a Cel+Glass hybrid — warm paper field, 3px ink-outline halo with a hard offset shadow, translucent red-frosted panels behind a backdrop blur, Rodchenko red for link, primary, and focus ring, near-rectilinear corners, and a loud condensed sans uppercased on the poster roles. No CRT, no text glow.',
  summary:
    'Constructivist (Cel·Glass) is the agitprop-poster register of a Cel+Glass hybrid. The cel-shaded engine still owns ' +
    'the chrome — every surface carries a 3px ink outline (`effect.outline.color = #161412`) and `elevation.*` paints a ' +
    'hard offset block shadow (`effect.shadowStyle = hard`) — but the glassmorphism layer is now live: `surface.raised` ' +
    'is a translucent red wash (`rgba(193, 39, 45, 0.06)`) and `effect.backdropBlur.lg = blur(20px)` frosts whatever sits ' +
    'behind a panel. The paper field stays light (`surface.base = #f0e9da`), Rodchenko red `#c1272d` carries ' +
    '`content.link`, `intent.primary`, and the focus ring, radius drops near-rectilinear (`sm/md/lg = 2/4/6`), and the ' +
    'display roles run a loud condensed Anton/Oswald uppercased. There is no CRT layer (no scanlines, no colored glow) ' +
    'and `effect.glow` is fully transparent — no text halo. `a11y` is experimental.',
  origin:
    'Russian Constructivism and the Soviet agitprop poster — Rodchenko, El Lissitzky, the Stenberg brothers — where ' +
    'diagonal photomontage, blunt black ink rules, and a single screaming red carried the message in stamped condensed ' +
    'type. This palette ports that grammar onto a Cel+Glass hybrid: the ink rule becomes the cel outline, the flat ' +
    'red field becomes a frosted translucent panel, and the poster type stays uppercased on warm paper.',
  signatures: [
    {
      label: 'Ink rule outline (`#161412`, 3px) plus a hard offset block shadow',
      detail:
        'Every surface carries the cel affordance: `effect.outline = { color: #161412, width: 3px }` and ' +
        '`effect.shadowStyle = hard`. `elevation.medium.boxShadow` is `5px 5px 0 #161412, 0 8px 20px rgba(22, 20, 18, 0.12)` — ' +
        'the blunt poster rule halo plus a soft drop, the hybrid signature.',
    },
    {
      label: 'Translucent red-frosted panels behind a backdrop blur',
      detail:
        '`surface.raised` is `rgba(193, 39, 45, 0.06)` — a faint Rodchenko-red wash that reads as material, not fog — and ' +
        '`effect.backdropBlur.lg = blur(20px)` frosts the paper behind raised panels. This is the glassmorphism half of ' +
        'the hybrid, the part the pure cel-shaded siblings never carry.',
    },
    {
      label: 'Single screaming red (`#c1272d`) on primary, link, and focus ring',
      detail:
        '`intent.primary.bg = #c1272d`, `content.link = #c1272d`, and `effect.focusRing.color = #c1272d` all carry the one ' +
        'Constructivist red. The monochrome-plus-red discipline — one loud accent against ink-on-paper — is the load-bearing ' +
        'agitprop cue.',
    },
    {
      label: 'Loud condensed sans, uppercased, with near-rectilinear corners',
      detail:
        '`typography.family.display` is `"Anton", "Oswald", "Archivo Black", ...` with `textTransform: uppercase` on the ' +
        '`display` / `title` / `heading` roles, and radius tightens to `sm/md/lg = 2/4/6` — almost square. The stamped ' +
        'condensed uppercase on hard corners reads as a printed poster, not a soft UI.',
    },
  ],
  antiSignatures: [
    'Scanlines, phosphor bleed, or a colored text glow — there is no CRT layer and `effect.glow` is transparent',
    'A multi-hue pastel palette (Constructivist is monochrome ink-on-paper plus a single red)',
    'Round humanist or brushed-serif display (this is a loud condensed Anton/Oswald, uppercased)',
    'Generous pill-soft radius on panels (corners are near-rectilinear at `2/4/6`)',
    'A transparent or zero-width outline — the ink rule is the shared cel affordance',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.base',
      note: '`#f0e9da` warm poster paper — the light field the hybrid keeps.',
    },
    {
      path: 'color.surface.raised',
      note: '`rgba(193, 39, 45, 0.06)` translucent red wash — the glassmorphism panel material.',
    },
    {
      path: 'effect.outline.color',
      note: '`#161412` blunt ink rule — the cel-shaded outline halo, 3px.',
    },
    {
      path: 'effect.backdropBlur.lg',
      note: '`blur(20px)` — frosts the paper behind raised panels; the glass half of the hybrid.',
    },
    {
      path: 'elevation.medium.boxShadow',
      note: '`5px 5px 0 #161412, 0 8px 20px rgba(22, 20, 18, 0.12)` — hard offset rule plus a soft drop, no colored glow.',
    },
    {
      path: 'color.intent.primary.bg',
      note: '`#c1272d` Rodchenko red — the single agitprop accent, also carried on link and focus ring.',
    },
    {
      path: 'typography.family.display',
      note: 'Anton / Oswald / Archivo Black stack, uppercased — the stamped condensed poster type.',
    },
  ],
  lookalikes: [
    {
      against: 'cel-shaded-mecha',
      differentiator:
        'Same cel-shaded engine and ink-outline halo. Mecha is opaque cockpit chrome — cool steel-white field, dark steel-blue inverted primary, squared Chakra Petch, no backdrop blur. Constructivist (this palette) adds the glass half — warm paper, translucent red-frosted panels with `backdropBlur.lg` live, and a single loud red on uppercased Anton. Mecha is hardware; this is an agitprop poster under frosted glass.',
    },
    {
      against: 'liquid-glass-light',
      differentiator:
        'Liquid Glass is pure glassmorphism — soft inset shadows, transparent outline, no ink halo, and a cool multi-tint palette. Constructivist (this palette) is the hybrid — it keeps the 3px ink rule (`effect.outline.color = #161412`) and the hard offset block shadow on top of translucent panels, with near-rectilinear corners and a single red. Glass is frosted-only; this is frosted-plus-inked.',
    },
    {
      against: 'glassmorphism',
      differentiator:
        'Glassmorphism is the canonical frosted-panel engine with no outline and soft shadows only. Constructivist (this palette) is cel-shaded at the engine level — the blunt ink rule and hard offset shadow are always on, with the frosted red panels layered underneath. Same blur grammar, opposite outline grammar.',
    },
  ],
  thrivesWith: [
    'Hero / marketing surfaces — the warm paper field, single red, and uppercased condensed type reads as an agitprop poster',
    'Buttons / Tabs — the one red primary with a matching focus ring is a clean monochrome-plus-accent pairing',
    'Cards, Modals, Drawers — translucent red panels with an ink rule read as a printed plate over frosted paper',
    'Badges / Status — the red / muted-green / steel-blue intents map to a restrained poster colour story',
  ],
  degradesWith: [
    'Tables with dense rows — the per-row ink rule density is the shared cel-shaded cost',
    'Long-form prose — the loud uppercased poster type reads as shouting at paragraph length',
    'Tiny dense controls — the 3px rule plus offset shadow crowds compact widgets',
  ],
  recallAliases: ['constructivist', 'constructivism', 'agitprop', 'rodchenko', 'el lissitzky', 'soviet poster', 'cel-shaded constructivist', 'cel glass constructivist', 'propaganda poster'],
}
