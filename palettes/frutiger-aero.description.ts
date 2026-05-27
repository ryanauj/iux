import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'frutiger-aero',
  tagline:
    'Y2K / late-2000s consumer-OS optimism on the Glassmorphism engine — bright aqua-mint host, cloud-white high-alpha panels, and a teal-shadowed paired-rim gloss lit through tropical water.',
  summary:
    'Frutiger Aero is the period-correct late-2000s consumer-tech register of the glass engine. ' +
    '`surface.base` is a bright aqua-mint `#7ee2ce` — the closest single colour to the lime-aqua-cloud ' +
    'wallpaper gradient the era traded in — and `raised` jumps to `rgba(255,255,255, 0.55)` so panels read as ' +
    'cloud over water. `elevation.*` keeps Aero\'s paired top-highlight + bottom-dark inset rim, but recolours the ' +
    'bottom inset and the outer shadow to teal (`rgba(11,74,64, …)`) instead of Vista\'s ink-blue. Radii pillow ' +
    'up to `sm 10 / md 14 / lg 22`, `motion.easing.spring` is bouncier (`cubic-bezier(0.34, 1.7, 0.55, 1)`), and ' +
    'typography reaches for actual Frutiger before degrading to Myriad / Lucida Grande / Helvetica.',
  origin:
    'Frutiger Aero is the umbrella term (retroactively coined ~2017) for the 2004–2013 consumer-tech aesthetic ' +
    'that ran from Windows Vista through iOS 6 and the early Wii / PS3 / mid-period Apple .Mac era: glossy ' +
    'translucent UI chrome, saturated greens and cyans, photographic skies, tropical fish and grass-blade ' +
    'wallpapers. This palette is the period-correct revival on the glass engine.',
  signatures: [
    {
      label: 'Bright aqua-mint `surface.base` (`#7ee2ce`)',
      detail:
        'Not a saturated blue (that\'s Aero / classic Glassmorphism), not a neutral grey (that\'s Liquid Glass) — a tropical aqua-mint that stands in for the entire lime-aqua-cloud wallpaper register of the era. The host is bright enough that the high-alpha white `raised` reads as cloud, not as fog.',
    },
    {
      label: 'High-alpha cloud-white `raised` (`rgba(255,255,255, 0.55)`)',
      detail:
        '`surface.raised` is `rgba(255,255,255,0.55)` with `sunken` at `0.32` and `overlay` at `0.72` — markedly higher alpha than classic Glassmorphism\'s `0.16` or Liquid Glass Light\'s `0.28`. The era leaned on near-opaque glossy panels, and this palette commits to that.',
    },
    {
      label: 'Paired top-highlight + teal bottom-inset rim on elevation',
      detail:
        '`elevation.medium` is `inset 0 1px 0 rgba(255,255,255,0.78), inset 0 -1px 0 rgba(11,74,64,0.12), 0 6px 16px rgba(11,74,64,0.22)`. The *paired* inset rim is the Aero-family cue (top highlight + bottom darkening reads as curved gloss), but the bottom inset and outer cast are teal (`rgba(11,74,64, …)`) instead of Vista\'s blue (`rgba(8,23,51, …)`) — gloss lit through tropical water, not winter chrome.',
    },
    {
      label: 'Frutiger / Myriad / Lucida Grande typography stack',
      detail:
        '`typography.family.ui` and `display` lead with `"Frutiger", "Frutiger LT Std", "Myriad Pro", "Lucida Grande", "Helvetica Neue"` — the period-correct humanist sans that shipped in Apple and consumer-OS chrome through the era. `display` weight is `600`, heavier than Aero\'s thin `300`, because Frutiger Aero set type as a confident product brand mark, not as wispy Vista titlebar lettering.',
    },
    {
      label: 'Bouncier spring easing (`cubic-bezier(0.34, 1.7, 0.55, 1)`)',
      detail:
        '`motion.easing.spring` overshoots harder than the standard glass spring — the optimistic, slightly cartoonish motion register of the era. Combined with the pillowed `radius.lg 22px`, controls feel inflatable rather than mineral.',
    },
    {
      label: 'Heavy lg backdrop blur (`blur(26px)`)',
      detail:
        '`effect.backdropBlur.lg` is `blur(26px)` — fractionally heavier than classic Glassmorphism\'s `24px` and well above Liquid Glass\'s softened `20px`. The era leaned into showing context *through* glass with confidence.',
    },
  ],
  antiSignatures: [
    'A neutral grey or saturated indigo `surface.base` (defeats the aqua-mint cue)',
    'Top-only inset highlight without the paired teal bottom-inset (that\'s Liquid Glass / classic Glassmorphism)',
    'Ink-blue outer shadows (`rgba(8,23,51, …)`) — that\'s Aero Glass, not Frutiger Aero',
    'Segoe UI, San Francisco, or Inter typography (this register reaches for Frutiger / Myriad first)',
    'Low-alpha `raised` below ~0.3 — the era used near-opaque glossy panels, not heavy frost',
    'Flat critical-damping easing — the spring here overshoots on purpose',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.base',
      note: 'Bright aqua-mint `#7ee2ce` — the single-colour stand-in for the era\'s lime-aqua-cloud wallpaper gradient.',
    },
    {
      path: 'color.surface.raised',
      note: 'High-alpha cloud-white `rgba(255,255,255,0.55)` — much higher than classic Glassmorphism\'s `0.16` or Liquid Glass Light\'s `0.28`.',
    },
    {
      path: 'elevation.medium.boxShadow',
      note: 'Paired top-highlight + teal bottom-inset rim — `inset 0 1px 0 rgba(255,255,255,0.78), inset 0 -1px 0 rgba(11,74,64,0.12), 0 6px 16px rgba(11,74,64,0.22)`. Teal cast distinguishes it from Aero Glass\'s ink-blue.',
    },
    {
      path: 'effect.backdropBlur.lg',
      note: '`blur(26px)` — heavier than every other glass-engine palette in the codebase.',
    },
    {
      path: 'typography.family.ui',
      note: 'Frutiger / Myriad Pro / Lucida Grande / Helvetica Neue stack — the period-correct humanist sans of the era.',
    },
    {
      path: 'motion.easing.spring',
      note: '`cubic-bezier(0.34, 1.7, 0.55, 1)` — overshoots harder than the standard glass spring; the optimistic late-2000s motion register.',
    },
  ],
  lookalikes: [
    {
      against: 'aero-glass',
      differentiator:
        'Aero Glass is the *specific Windows Vista chrome* register — Vista-blue host (`#1e4d8b`), ink-blue elevation shadows (`rgba(8,23,51, …)`), Segoe UI at weight 300. Frutiger Aero (this palette) is the broader consumer-tech aesthetic of the same decade — aqua-mint host, teal elevation shadows, Frutiger / Myriad at weight 600, bouncier spring. Same paired-rim recipe, completely different hue family and font story.',
    },
    {
      against: 'glassmorphism',
      differentiator:
        'Classic Glassmorphism is the neutral post-2020 register on a saturated indigo host with low-alpha (`0.16`) `raised` and a top-only inset highlight. Frutiger Aero predates it by a decade: aqua-mint host, high-alpha (`0.55`) cloud `raised`, paired top-and-bottom rim. The engine matches; the period and saturation register do not.',
    },
    {
      against: 'liquid-glass-light',
      differentiator:
        'Liquid Glass Light is the Apple 2025 restraint — neutral-grey host, softened `blur(20px)`, top-only inset, sky-cyan refraction borders, San Francisco. Frutiger Aero is the 2007 maximalism: aqua-mint host, heavier `blur(26px)`, paired teal rim, hairline-white borders, Frutiger / Myriad. Eighteen years and an inversion of tone apart.',
    },
    {
      against: 'vaporwave',
      differentiator:
        'Vaporwave shares a Y2K nostalgia register but commits to magenta / cyan synth gradients and CRT scanline overlays — a *retrofuture* re-reading of the era. Frutiger Aero is the era itself, played straight: glossy productivity-OS chrome, not ironic synthwave.',
    },
  ],
  thrivesWith: [
    'Hero panels and product mastheads — the high-alpha cloud `raised` reads as confident, brand-forward gloss',
    'Modals and drawers — `elevation.overlay` (`inset 0 2px 0 rgba(255,255,255,0.88), inset 0 -2px 0 rgba(11,74,64,0.20), 0 20px 44px rgba(11,74,64,0.36)`) carries the strongest paired rim and reads as a floating cloud',
    'Buttons and segmented controls — `intent.*.bg` at 0.88–0.92 alpha keeps them legible on the bright aqua host',
  ],
  degradesWith: [
    'Loading spinners and thin-stroke indicators — `border.default` at `rgba(255,255,255,0.78)` is essentially invisible against the white `raised`, so 1–2px rings disappear. README flags Loading as "most likely to fail"; components should reach for `border.strong` (`rgba(186,255,234,0.92)`) or `content.secondary` for any thin geometry',
    'Long muted-text passages — `content.muted` at 55% alpha over cloud-white panels gets close to the AA floor',
    'Pages with no host control — without the aqua-mint base, the high-alpha white panels become opaque cards and the era cue collapses',
  ],
  recallAliases: ['frutiger aero', 'frutiger', 'y2k aero', 'aqua aero', 'tropical aero'],
}
