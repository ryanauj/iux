import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'aero-glass',
  tagline:
    'Windows Vista/7 register on the Glassmorphism engine — wetter, bluer, with a paired inset white-top and inset dark-bottom rim that reads as curved gloss rather than flat frost.',
  summary:
    'Aero Glass is the period-correct Vista/7 register of the glassmorphism engine. The "wet" feel comes ' +
    'entirely from `elevation.*`: every slot above `flat` pairs an inset white highlight along the top with an ' +
    'inset dark line along the bottom (`inset 0 -1px 0 rgba(8,23,51, 0.18 → 0.30)`), the rim cue Vista\'s panels ' +
    'used to read as a curved gloss. `surface.base` is a saturated Vista blue (`#1e4d8b`), `surface.raised` is ' +
    'blue-tinted white rather than neutral, and typography is Segoe UI with `display` weight at 300 to nod to Aero\'s chrome titlebars.',
  origin:
    'Windows Vista (2007) and Windows 7 (2009) shipped Aero — a desktop chrome built around translucent panels ' +
    'with paired highlight/shadow rims that read as curved glass. The aesthetic peaked in the late 2000s and ' +
    'was retired in Windows 8\'s flat reset. This palette is the period-correct revival on the glass engine.',
  signatures: [
    {
      label: 'Paired inset white-top + inset dark-bottom rim on elevation',
      detail:
        '`elevation.low` is `inset 0 1px 0 rgba(255,255,255,0.50), inset 0 -1px 0 rgba(8,23,51,0.18), 0 2px 4px rgba(8,23,51,0.30)`. The *paired* rim is the load-bearing Aero cue — top highlight + bottom darkening — and it scales: `inset 0 2px 0 / 0 -2px 0` at `high`/`overlay`. Glassmorphism (this engine\'s neutral register) has only the top inset.',
    },
    {
      label: 'Saturated Vista blue `surface.base` (`#1e4d8b`)',
      detail:
        'Not neutral indigo, not a photo — a specific Vista-chrome blue that pulls overlapping pixels toward cyan. Half the "Aero feel" is this exact host colour.',
    },
    {
      label: 'Blue-tinted `surface.raised` (`rgba(195,222,255, 0.22)`)',
      detail:
        'Translucent *white-with-blue-bias*, not neutral white. Compare to Glassmorphism\'s `rgba(255,255,255,0.16)` — same alpha range, biased palette.',
    },
    {
      label: 'Segoe UI throughout with `display` weight at 300',
      detail:
        '`typography.family.ui` is `"Segoe UI", "Segoe UI Variable", Tahoma, Verdana, sans-serif` — the shipping Vista/7 system font. `display` weight is `300` (light) to nod to Aero\'s thin chrome titlebar lettering. Glassmorphism uses Inter at weight 600.',
    },
    {
      label: 'Heavier elevation alpha (`rgba(8,23,51, 0.30 → 0.60)`)',
      detail:
        'Aero panels cast harder. The outer shadow alpha rides from 0.30 at `low` to 0.60 at `overlay` — roughly 1.5× Glassmorphism\'s shadow weight at every step — to keep the wet gloss visible against the saturated host.',
    },
  ],
  antiSignatures: [
    'A neutral indigo or photo `surface.base` (defeats the Vista-blue cue)',
    'Top-only inset highlight without the matching inset dark line',
    'Inter, system-ui, or non-Segoe typography',
    'Flat sans-serif `display` weights at 500–700 (Aero\'s chrome was light)',
    'Hard offset shadows (that\'s Pixel-art / Neubrutalism — the Aero shadow is a blurred outer plus inset rim)',
  ],
  tokenEvidence: [
    {
      path: 'elevation.low.boxShadow',
      note: 'The paired inset rim — `inset 0 1px 0 white-50, inset 0 -1px 0 ink-18, 0 2px 4px ink-30`. The bottom inset is the differentiator from neutral Glassmorphism.',
    },
    {
      path: 'color.surface.base',
      note: 'Vista blue `#1e4d8b` — period-correct chrome colour.',
    },
    {
      path: 'color.surface.raised',
      note: 'Blue-tinted translucent white `rgba(195,222,255,0.22)`, not neutral.',
    },
    {
      path: 'typography.family.ui',
      note: 'Segoe UI stack — the Vista/7 system font.',
    },
    {
      path: 'typography.role.display.weight',
      note: 'Weight 300 — the thin Aero titlebar weight.',
    },
  ],
  lookalikes: [
    {
      against: 'glassmorphism',
      differentiator:
        'Glassmorphism is the neutral post-2020 register of the same engine: neutral-white `raised`, top-only inset highlight, Inter typography, indigo (not Vista-blue) host. Aero (this palette) commits to Vista-blue everywhere and pairs the top inset with a bottom inset dark line for "curved gloss" rather than "frosted flat."',
    },
    {
      against: 'frutiger-aero',
      differentiator:
        'Frutiger Aero is the broader consumer-tech aesthetic of the same era — saturated greens, glossy gradients on intents, photo-backed compositions. Aero Glass (this palette) is the specific *Windows chrome* register: Vista-blue, paired-rim glass panels, Segoe UI.',
    },
    {
      against: 'liquid-glass-light',
      differentiator:
        'Liquid Glass is the macOS Big Sur (2020) take on the engine — neutral-white panels on a near-neutral host. Aero is the Vista (2007) take — blue host, blue-tinted glass, paired rim.',
    },
  ],
  thrivesWith: [
    'Chrome panels (sidebars, titlebars, popovers) — the paired rim is what they were designed for',
    'Buttons and segmented controls — `intent.*.bg` at 0.88 alpha keeps them legible on the Vista-blue host',
    'Modals and drawers — `elevation.overlay` has the strongest paired rim and reads as floating glass',
  ],
  degradesWith: [
    'Calendars (DatePicker) — the per-cell gloss reduces effective contrast on `content.muted` cells well below AA, and the rim makes selected-vs-hovered cells hard to distinguish. README flags this as "most likely to fail."',
    'Dense tables — same per-row gloss problem',
    'Long muted-text passages — `content.muted` at 60% alpha on blue-tinted glass falls to ~3.5:1 on light hosts',
  ],
  recallAliases: ['aero', 'aero glass', 'vista', 'windows vista', 'windows 7'],
}
