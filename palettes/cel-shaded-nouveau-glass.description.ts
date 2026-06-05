import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'cel-shaded-nouveau-glass',
  tagline:
    'Art-nouveau identity on a Cel+Glass hybrid — a light parchment field, a 3px mauve-plum ink outline halo with a hard offset block shadow, translucent frosted panels with backdrop blur, sage-green primary and gilt-gold accent, and a serif Cormorant Garamond display. No CRT, no text glow.',
  summary:
    'Art Nouveau (Cel·Glass) ports the Mucha / stained-glass register onto a Cel+Glass hybrid engine. `surface.base` is a ' +
    'light parchment `#efe9d9` and content / outline are mauve-plum `#3a2e3a`. The cel half is on: every surface carries ' +
    'a 3px ink outline (`effect.outline.color = #3a2e3a`, `effect.shadowStyle = hard`) and `elevation.*` paints a hard ' +
    'offset block shadow. The glass half layers in translucent surfaces — `surface.raised = rgba(111, 125, 78, 0.07)` ' +
    '(a sage tint), `surface.sunken = rgba(58, 46, 58, 0.05)`, and a frosted `surface.overlay = rgba(247, 242, 230, 0.80)` ' +
    'read through `effect.backdropBlur` (sm/md/lg = 4/10/20px). Intents run sage-green primary `#6f7d4e` and gilt warning ' +
    '`#b08828`, the link is plum-rose `#7d3c5a`, the focus ring is gilt-gold `#9c7b3a`, and display is serif Cormorant ' +
    'Garamond with rounder radii than the academia cut. `effect.glow` stays inert — no text glow. Marked `a11y: ' +
    'experimental`.',
  origin:
    'Art Nouveau — Mucha posters, Tiffany stained glass, whiplash botanical curves, and the gilt-and-sage palette of ' +
    'turn-of-the-century decorative art. This palette ports that grammar onto a Cel+Glass hybrid: the ink-outline halo ' +
    'of cel-shading plus the frosted translucent panels of glassmorphism, over a light parchment field, with no CRT ' +
    'scanlines and no text glow.',
  signatures: [
    {
      label: 'Light parchment field (`#efe9d9`) with mauve-plum ink (`#3a2e3a`)',
      detail:
        '`surface.base` is a warm light parchment `#efe9d9` and `content.primary` / `effect.outline.color` are mauve-plum ' +
        '`#3a2e3a`. The plum ink instead of pure black is the art-nouveau signature — it carries through scrim, secondary ' +
        'content, and the offset shadow color.',
    },
    {
      label: 'Cel ink-outline halo: 3px plum outline + hard offset block shadow',
      detail:
        '`effect.outline = { color: #3a2e3a, width: 3px }` and `effect.shadowStyle = hard`. `elevation.medium` is ' +
        '`5px 5px 0 #3a2e3a, 0 8px 20px rgba(58, 46, 58, 0.12)` — a hard cel block shadow with a soft drop shadow layered ' +
        'under it. The plum ink halo is the cel-shaded engine cue.',
    },
    {
      label: 'Sage-green primary (`#6f7d4e`) with gilt-gold accent (`#9c7b3a`)',
      detail:
        '`intent.primary.bg` is sage `#6f7d4e`, `intent.warning.bg` is gilt `#b08828`, and `effect.focusRing.color` is ' +
        'gilt-gold `#9c7b3a`. The sage-and-gilt pairing is the decorative-art color story; the link shifts to plum-rose ' +
        '`#7d3c5a` for the stained-glass jewel accent.',
    },
    {
      label: 'Translucent frosted panels read through backdrop blur',
      detail:
        '`surface.raised = rgba(111, 125, 78, 0.07)` (sage tint), `surface.sunken = rgba(58, 46, 58, 0.05)`, and ' +
        '`surface.overlay = rgba(247, 242, 230, 0.80)` are translucent, composited over parchment through ' +
        '`effect.backdropBlur` (blur(4px) / blur(10px) / blur(20px)). This is the Glass half of the hybrid.',
    },
    {
      label: 'Serif Cormorant Garamond display with rounder radii than the academia cut',
      detail:
        '`typography.family.display` is `"Cormorant Garamond", "EB Garamond", "Garamond", "Hoefler Text", Georgia, serif` ' +
        'at natural case (no uppercasing), and `radius` runs `sm/md/lg = 10/16/26` — softer and rounder than the ' +
        'academia·glass `6/12/18`, echoing the whiplash botanical curve.',
    },
  ],
  antiSignatures: [
    'Any text glow — `effect.glow` is `{ radius: 0, color: transparent, intensity: 0 }`',
    'CRT scanlines or phosphor grid — `pixelGrid` is `0`, no scanline overlay',
    'A dark / gloomy field — `surface.base` is a light parchment `#efe9d9`',
    'Squared-technical or sans display (this is serif Cormorant Garamond)',
    'Opaque, non-blurred panels — the raised / sunken / overlay surfaces are translucent and read through backdrop blur',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.base',
      note: '`#efe9d9` light parchment — the art-nouveau field.',
    },
    {
      path: 'color.surface.raised',
      note: '`rgba(111, 125, 78, 0.07)` translucent sage tint — the Glass-half raised panel over the parchment.',
    },
    {
      path: 'effect.outline.color',
      note: '`#3a2e3a` mauve-plum ink — the 3px cel outline halo, plum instead of black.',
    },
    {
      path: 'effect.backdropBlur.lg',
      note: '`blur(20px)` — the frosted-glass read for overlays, the Glass half of the hybrid.',
    },
    {
      path: 'elevation.medium.boxShadow',
      note: '`5px 5px 0 #3a2e3a, 0 8px 20px rgba(58, 46, 58, 0.12)` — hard cel block shadow plus a soft drop shadow.',
    },
    {
      path: 'typography.family.display',
      note: 'Cormorant Garamond serif stack — the decorative-art register, no uppercasing.',
    },
    {
      path: 'effect.glow.color',
      note: '`transparent` — no text glow; the glow token is held inert at `{ radius: 0, color: transparent, intensity: 0 }`.',
    },
  ],
  lookalikes: [
    {
      against: 'cel-shaded-mecha',
      differentiator:
        'Same cel-shaded engine and ink-outline halo. Mecha is the cool cockpit register — steel-white field, steel-blue ' +
        'primary, squared Chakra Petch uppercased, opaque surfaces, `backdropBlur` all `none`. Nouveau·Glass (this palette) ' +
        'is a warm parchment field with plum ink, sage/gilt intents, serif Cormorant Garamond at natural case, and live ' +
        'translucent frosted panels with real backdrop blur. The Glass half is present here and absent in mecha.',
    },
    {
      against: 'liquid-glass-light',
      differentiator:
        'Both use translucent rgba surfaces and `backdropBlur` 4/10/20. But Liquid Glass is pure glassmorphism — no ink ' +
        'outline (`outline.color = transparent`), soft-only shadows, cool grey field, Apple sans type. Nouveau·Glass (this ' +
        'palette) is a hybrid: it adds the 3px plum ink outline and a hard offset cel block shadow on top of the glass, ' +
        'over a warm parchment field with serif display and a sage/gilt decorative palette.',
    },
    {
      against: 'glassmorphism',
      differentiator:
        'Glassmorphism is the canonical frosted-panel engine with no outline halo and soft elevation only. Nouveau·Glass ' +
        '(this palette) borrows its translucent surfaces and backdrop blur but bolts on the cel-shaded plum ink outline ' +
        'and hard block shadow — it reads as ink-lined stained-glass panels, not pure frost.',
    },
  ],
  thrivesWith: [
    'Cards, Modals, Drawers — the frosted parchment overlay plus plum ink outline reads as a stained-glass panel',
    'Hero / marketing pages — the sage/gilt decorative palette and serif display flatter ornamental layouts',
    'Buttons / Tabs — the sage primary with plum outline reads as a botanical-poster control',
    'Headings / display type — Cormorant Garamond at large sizes carries the Mucha lettering register',
  ],
  degradesWith: [
    'Dense data tables — per-row ink outlines plus translucent fills create density and contrast noise',
    'High-contrast accessibility contexts — translucent surfaces over parchment make this `a11y: experimental`',
    'Utilitarian dashboards / instrument panels — the decorative ornamental register fights dense functional UI',
  ],
  recallAliases: ['art nouveau cel glass', 'art nouveau', 'nouveau glass', 'cel glass nouveau', 'mucha', 'stained glass', 'cel-shaded', 'glassmorphism', 'serif'],
}
