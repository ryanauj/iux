import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'glassmorphism',
  tagline:
    'Translucent low-alpha panels with a backdrop blur, sitting over a saturated host background, edged with hairline-white frosted borders.',
  summary:
    'Glassmorphism is defined by *alpha plus blur*. Surfaces are `rgba(255,255,255, 0.08–0.22)` rather than opaque, ' +
    "`effect.backdropBlur` is non-zero so what's behind the panel is visibly frosted, and borders are hairline " +
    'whites that read as the rim of frosted glass. Elevation packs an inset white highlight inside an outer soft ' +
    'shadow: the inset reads as light catching the top of the glass, the outer reads as the glass casting on what\'s below.',
  origin:
    'Popularised by macOS Big Sur (2020) and a wave of "glass UI" Dribbble explorations in 2020–2021. ' +
    'Inherits its DNA from earlier transparency systems (Vista Aero, iOS 7\'s control center) but ' +
    'distinct in committing fully to *frost* — heavy blur, low alpha, neutral white tints — rather than gloss.',
  signatures: [
    {
      label: 'Low-alpha white `surface.raised` (≈ 0.08–0.22)',
      detail:
        '`surface.raised` is `rgba(255,255,255,0.16)` here, with `sunken`/`overlay` stepping the alpha. The translucency is the engine\'s defining choice — no opaque white panels.',
    },
    {
      label: 'Non-zero `effect.backdropBlur` at every step',
      detail:
        '`backdropBlur.sm` is `blur(6px)`, scaling to `blur(24px)` at `lg`. CSS `backdrop-filter` is mandatory; without it the engine degrades to flat translucent rectangles and loses its identity.',
    },
    {
      label: 'Saturated tone for `surface.base`',
      detail:
        'The page is a saturated indigo (`#3b3a8e`) so the alpha math has something to bite into. Palettes don\'t normally own page chrome, but glass without a coloured host is invisible.',
    },
    {
      label: 'Hairline-white borders for the frosted rim',
      detail:
        '`color.border.*` is `rgba(255,255,255, 0.12 / 0.24 / 0.40)`. The rim is what tells the eye where the glass ends — without it, alpha surfaces vanish into the background.',
    },
    {
      label: 'Elevation packs an inset white highlight inside an outer soft shadow',
      detail:
        '`elevation.low` is `inset 0 1px 0 rgba(255,255,255,0.16), 0 2px 8px rgba(15,23,42,0.18)`. The inset is the "wet top edge" cue; the outer is the cast shadow. Both are required.',
    },
    {
      label: 'Mandatory `surface.scrim` under any overlay',
      detail:
        '`scrim` is `rgba(15,23,42,0.40)` — overlays *must* paint it, because the engine cannot guarantee what shows through `surface.overlay` otherwise.',
    },
  ],
  antiSignatures: [
    'Opaque white or grey raised surfaces',
    '`backdropBlur` set to `none` (defeats the engine)',
    'Neutral grey page background (no host saturation = invisible glass)',
    'Hard offset block shadows or no shadow at all',
    'Bitmap, hand-drawn, or serif display typography',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.raised',
      note: 'Low-alpha white. Compare to Flat/Classic\'s opaque `#ffffff`.',
    },
    {
      path: 'effect.backdropBlur.md',
      note: 'Non-zero blur — without `backdrop-filter`, glass becomes flat translucent.',
    },
    {
      path: 'color.surface.base',
      note: 'Saturated indigo host — the alpha needs colour to be visible.',
    },
    {
      path: 'elevation.low.boxShadow',
      note: 'Paired inset highlight + outer soft shadow. The recipe is the engine.',
    },
    {
      path: 'color.surface.scrim',
      note: 'Mandatory under overlays — `surface.overlay` can\'t guarantee contrast on its own.',
    },
  ],
  lookalikes: [
    {
      against: 'aero-glass',
      differentiator:
        'Aero Glass is the Windows Vista/7 register of the same engine — wetter and bluer. Elevation pairs an inset white highlight with an *inset dark line along the bottom*, the rim cue that read as curved gloss in Vista. Glassmorphism (this palette) has only the top inset and stays neutral-white. `surface.base` here is indigo; Aero\'s is a saturated Vista blue (`#1e4d8b`).',
    },
    {
      against: 'liquid-glass-light',
      differentiator:
        'Liquid Glass tunes alpha and blur for a near-neutral light host (the macOS Big Sur target). Glassmorphism (this palette) commits to a saturated indigo host — same engine, more dramatic glass.',
    },
    {
      against: 'frutiger-aero',
      differentiator:
        'Frutiger Aero is the mid-2000s consumer-tech register — more saturated greens/cyans, glossy gradients on intents, often paired with photo backdrops. Glassmorphism is the post-2020 minimalist version: neutral whites, even blur, no gradients on intents.',
    },
  ],
  thrivesWith: [
    'Modals, drawers, popovers — overlay surfaces that benefit from showing context through them',
    'Sidebars over content (the blur becomes a depth signal)',
    'Cards over photo or saturated backgrounds',
    'Hero sections where the host can be controlled',
  ],
  degradesWith: [
    'Dense tables — alpha on every row defeats readability',
    'Long-form prose — `content.muted` at 0.56 alpha on a translucent panel falls below AA against arbitrary hosts',
    'Pages with no host control (third-party embeds) — without a saturated background, glass disappears',
  ],
  recallAliases: ['glass', 'glassmorphism', 'glassmorphic', 'frosted glass'],
  plain: {
    tagline:
      'Frosted glass panels floating over a colourful indigo background — see-through, blurred, with a faint bright rim on each edge.',
    summary:
      "Glassmorphism makes cards and menus look like sheets of frosted glass. They're slightly see-through, so the colourful page underneath bleeds up through them, and whatever sits behind a panel is blurred so the panel itself stays readable. A faint white rim runs along each panel's edge — that's the catch of light along the rim of the glass. The whole effect only works because the page is a strong indigo; on a plain grey page the glass would disappear.",
    lookingLike: [
      'A deep indigo or purple background showing through every panel',
      'Cards and menus that are slightly see-through with the page blurred behind them',
      'A faint, almost-white line along the edge of each panel — the glass rim',
      "Pop-up dialogs that paint a darker veil under themselves so you can still read",
      'Soft shadows under panels that feel like glass casting onto the page',
    ],
  },
}
