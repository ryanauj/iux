import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'cel-shaded-academia-glass',
  tagline:
    'Dark-academia identity RE-LIT onto a Cel+Glass hybrid — a light cream paper field (not the usual gloom), a 3px oxblood-ink outline halo with hard offset block shadow, translucent frosted panels with backdrop blur, and EB Garamond serif display.',
  summary:
    'Dark Academia (Cel·Glass) takes the dark-academia register — oxblood, ink, library wood, candle-warm cream — and ' +
    'RE-LITS it: where dark academia is conventionally a dark room, this palette lifts `surface.base` to a light cream ' +
    '`#ece3d0` daylight. It then runs that identity through a Cel+Glass hybrid: the cel-shaded engine paints a 3px ' +
    'ink-outline halo (`effect.outline.color = #2b1e18`, `effect.shadowStyle = hard`) while glassmorphism supplies ' +
    'translucent rgba panels (`surface.raised = rgba(74,31,31,0.06)`, `surface.overlay = rgba(245,239,225,0.80)`) and ' +
    'live `effect.backdropBlur` (4/10/20). `elevation.*` layers a hard ink offset block UNDER a soft drop shadow — the ' +
    'hybrid signature. Serif display (EB Garamond / Cormorant) carries the library voice; no uppercase, no CRT, and ' +
    'critically no text glow (`effect.glow` stays radius 0 / transparent). `a11y` is `experimental`.',
  origin:
    'Dark academia — the oxblood-and-ink aesthetic of old libraries, Latin primers, and candlelit reading rooms — ' +
    'pulled out of its conventional gloom and RE-LIT to a warm cream daylight, then ported onto the Cel+Glass hybrid: ' +
    'ink-outline cel grammar borrowed from the anime engine fused with the translucent frosted panels of the ' +
    'glassmorphism / liquid-glass family.',
  signatures: [
    {
      label: 'RE-LIT light cream paper field (`#ece3d0`) — dark academia turned to daylight',
      detail:
        '`surface.base` is a warm light cream `#ece3d0`, not a dark room. This is the deliberate inversion: the dark-' +
        'academia palette is re-lit into a bright reading-room daylight while keeping the oxblood/ink content register. ' +
        'Content stays dark ink (`content.primary = #2b1e18`) on the light field, so the cream reads as paper, not gloom.',
    },
    {
      label: 'Cel ink-outline halo (3px `#2b1e18`) with hard offset block shadow',
      detail:
        'Every surface carries a 3px oxblood-ink outline (`effect.outline = { color: #2b1e18, width: 3px }`) and ' +
        '`effect.shadowStyle = hard`. `elevation.*` paints a two-tone hard offset block (`3px 3px 0 #2b1e18` up to ' +
        '`8px 8px 0 #2b1e18`) — the cel-shaded engine machinery, inherited verbatim from the mecha sibling.',
    },
    {
      label: 'Glass panels: translucent rgba surfaces + live backdrop blur',
      detail:
        '`surface.raised` and `surface.sunken` are translucent (`rgba(74,31,31,0.06)`, `rgba(43,30,24,0.05)`) and ' +
        '`surface.overlay = rgba(245,239,225,0.80)`, with `effect.backdropBlur = { sm: blur(4px), md: blur(10px), ' +
        'lg: blur(20px) }`. This is the glassmorphism half of the hybrid — frosted panels that the pure cel-shaded ' +
        'family never has (mecha runs `backdropBlur` all `none`).',
    },
    {
      label: 'Hybrid elevation: hard ink block UNDER a soft drop shadow',
      detail:
        '`elevation.medium.boxShadow = "5px 5px 0 #2b1e18, 0 8px 20px rgba(43,30,24,0.12)"` — a hard cel offset block ' +
        'layered with a soft gaussian drop. Pure cel-shaded has only the hard block; pure glass has only the soft drop. ' +
        'Carrying both at every level is the load-bearing Cel+Glass cue.',
    },
    {
      label: 'EB Garamond serif display, no uppercase, no text glow',
      detail:
        '`typography.family.display` is `"EB Garamond", "Cormorant Garamond", ... serif` — the library voice. Unlike the ' +
        'mecha sibling, the serif roles drop `textTransform: uppercase`. `effect.glow` stays `{ radius: 0, color: ' +
        'transparent, intensity: 0 }` — no text glow, no CRT.',
    },
  ],
  antiSignatures: [
    'A dark / gloomy `surface.base` — this dark-academia palette is RE-LIT to a light cream `#ece3d0`, not a dark room',
    'Uppercased technical display — the serif roles are sentence-case EB Garamond, not the mecha Chakra Petch uppercase',
    'Any text glow or CRT scanline — `effect.glow` is radius 0 / transparent and there is no CRT grammar',
    'Opaque flat panels with only a hard block shadow — the raised/overlay surfaces are translucent rgba with backdrop blur',
    'A transparent or zero-width outline — the 3px ink halo is the cel affordance and stays on',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.base',
      note: '`#ece3d0` light cream — the RE-LIT daylight field; dark academia lifted out of gloom.',
    },
    {
      path: 'color.surface.raised',
      note: '`rgba(74, 31, 31, 0.06)` translucent oxblood-tinted panel — the glass half of the hybrid.',
    },
    {
      path: 'effect.outline.color',
      note: '`#2b1e18` oxblood-ink — the 3px cel outline halo on every surface.',
    },
    {
      path: 'effect.backdropBlur.lg',
      note: '`blur(20px)` — live frosted-glass blur the pure cel-shaded family never carries (mecha is all `none`).',
    },
    {
      path: 'elevation.medium.boxShadow',
      note: '`5px 5px 0 #2b1e18, 0 8px 20px rgba(43,30,24,0.12)` — hard ink block UNDER a soft drop; the Cel+Glass signature.',
    },
    {
      path: 'typography.family.display',
      note: '`EB Garamond` serif stack — the dark-academia library voice, no uppercase.',
    },
    {
      path: 'effect.glow.radius',
      note: '`0` (color transparent, intensity 0) — no text glow, no CRT.',
    },
  ],
  lookalikes: [
    {
      against: 'cel-shaded-mecha',
      differentiator:
        'Same cel-shaded engine and shared space/borderWidth/motion. Mecha is opaque flat fills with hard block shadows only, ' +
        'cool steel field, uppercased Chakra Petch, and `backdropBlur` all `none`. This palette (academia-glass) is the Cel+Glass ' +
        'hybrid — translucent frosted panels with live backdrop blur, a soft drop under the hard block, a re-lit warm cream field, ' +
        'and serif EB Garamond. Mecha is the cockpit; this is the re-lit reading room.',
    },
    {
      against: 'liquid-glass-light',
      differentiator:
        'Liquid Glass (Light) is pure glassmorphism — no outline (`effect.outline.color = transparent`), `shadowStyle = soft`, ' +
        'inset-light shadows, Apple SF type. This palette adds the cel half: a 3px ink outline halo, `shadowStyle = hard`, and a ' +
        'hard offset block under every elevation. It is glass WITH an ink-line cel cage, not glass alone.',
    },
    {
      against: 'glassmorphism',
      differentiator:
        'Classic Glassmorphism is the translucent-panel engine with no ink grammar and soft-only shadows. This palette borrows the ' +
        'frosted panels and backdrop blur but cages them in the cel-shaded ink outline and hard offset block — a hybrid the pure ' +
        'glass engine never produces. The warm re-lit cream field and serif display further set it apart from the cool glass neutrals.',
    },
  ],
  thrivesWith: [
    'Cards, Modals, Drawers — translucent frosted panel plus hard ink offset block reads as a glass plate pinned to cream paper',
    'Buttons / Toggles / Tabs — the oxblood primary inside a 3px ink outline is a precise, bookish click target',
    'Reading layouts / article shells — re-lit cream field and EB Garamond serif carry long-form library register comfortably',
    'Dialogs / Popovers over content — backdrop blur on the overlay surface frosts what is behind without losing the ink cage',
  ],
  degradesWith: [
    'Tables with dense rows — the per-row 3px ink outline density is the shared cel-shaded weakness',
    'Tiny chrome / dense toolbars — the hard offset block plus soft drop needs room; it crowds at small sizes',
    'Backgrounds with no depth behind glass — backdrop blur has nothing to frost on a flat solid, wasting the glass half',
  ],
  recallAliases: [
    'dark academia',
    'dark academia cel glass',
    'academia glass',
    'cel-shaded academia',
    'oxblood',
    'library',
    'serif',
    'cel glass',
    're-lit academia',
  ],
}
