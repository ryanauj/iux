import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'liquid-glass-dark',
  tagline:
    'Apple WWDC25 Liquid Glass inverted to a near-black host — soft blur, refraction-tinted hairlines, and white-tint alphas dropped to 0.06–0.14 so dark glass reads as glass and not as opaque grey.',
  summary:
    'Liquid Glass (Dark) is the dark-mode register of the Apple 2025 system. The blur curve (`blur(4px) → blur(20px)`), Apple\'s ' +
    'pillier radii (`sm 10 / md 14 / lg 22`), and the refraction-tinted borders are inherited from the light sibling — what changes is luminance. ' +
    '`surface.base` inverts to a near-black `#0f1218`, and `raised` drops to `rgba(255,255,255, 0.06)` because adding more white to a dark host ' +
    'stops reading as glass and starts reading as solid grey. `color.border.default` uses a sky-cyan tint (`rgba(125,211,252, 0.20)`) so panel edges ' +
    'still show the refractive cue that the lower alpha would otherwise hide.',
  origin:
    'Same 2025 Apple Liquid Glass platform refresh as the light sibling — iOS / iPadOS / macOS WWDC25 dark mode. ' +
    'The dark-mode register of the system inherits its blur curve, radii, and refraction-tinted borders from light but ' +
    'rebases on a near-black host. This palette is the period-correct dark-mode counterpart to `liquid-glass-light`.',
  signatures: [
    {
      label: 'Near-black `surface.base` (`#0f1218`) with very low `raised` alpha',
      detail:
        '`surface.base` is `#0f1218` and `surface.raised` is `rgba(255, 255, 255, 0.06)` — `sunken` at `0.03`, `overlay` at `0.10`. The alpha floor is *much* lower than the light sibling\'s `0.28–0.68` because beyond ~15% white on a near-black host, the panel stops reading as translucent glass and starts reading as opaque grey.',
    },
    {
      label: 'Sky-cyan refraction-tinted `border.default` (`rgba(125, 211, 252, 0.20)`)',
      detail:
        'The cyan tint stays, just deeper (`rgba(125,211,252, 0.20)` here vs the light sibling\'s `rgba(186,230,253, 0.60)`). Because the `raised` alpha had to drop so far, the border carries more of the panel\'s identity — without the cyan rim the surface would dissolve into the host entirely.',
    },
    {
      label: 'Soft top-only inset highlight, ink-black outer shadow',
      detail:
        '`elevation.low` is `inset 0 1px 0 rgba(255,255,255,0.10), 0 2px 6px rgba(0,0,0,0.20)`, scaling to `inset 0 1px 0 rgba(255,255,255,0.26)` and `0 20px 44px rgba(0,0,0,0.50)` at `overlay`. Top-only inset (not paired with a bottom dark line — that\'s Aero), and the outer cast is pure-black rather than the light variant\'s `rgba(15,23,42, …)` ink-grey.',
    },
    {
      label: 'Cyan focus ring and link colour (`#7dd3fc`)',
      detail:
        '`border.focus` and `color.content.link` are `#7dd3fc` — a brighter sky-cyan that reads against the dark host where the light variant\'s deeper `#0ea5e9` would lose contrast. `focusRing.color` matches. The cyan picks up the refraction story while supplying the only chromatic accent the palette commits to.',
    },
    {
      label: 'Same softened blur curve and Apple radii as the light sibling',
      detail:
        '`effect.backdropBlur.sm/md/lg` is `blur(4px) / blur(10px) / blur(20px)` — identical to the light variant and lighter than classic Glassmorphism. `radius.sm/md/lg` is `10 / 14 / 22 px`. San Francisco font stack throughout. The dark variant is a *recolour* of the light, not a separate engine register.',
    },
  ],
  antiSignatures: [
    'A `raised` alpha above ~0.15 on the dark host (the panel stops reading as glass and starts reading as opaque grey)',
    'Saturated indigo or Vista-blue `surface.base` (the dark register is near-neutral black)',
    'A paired top-inset highlight + bottom-inset dark line (that\'s Aero, not Liquid Glass)',
    'Pure-white hairline borders without the sky-cyan refraction tint',
    'Heavy outer shadows at `low` (the dark register stays quiet at small elevations)',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.base',
      note: 'Near-black `#0f1218` — the dark register\'s host.',
    },
    {
      path: 'color.surface.raised',
      note: 'Very low-alpha white `rgba(255, 255, 255, 0.06)` — the alpha floor that keeps dark glass reading as glass, not opaque grey.',
    },
    {
      path: 'color.border.default',
      note: 'Sky-cyan refraction tint `rgba(125, 211, 252, 0.20)` — deeper than the light sibling because the raised alpha had to drop so far.',
    },
    {
      path: 'effect.backdropBlur.lg',
      note: '`blur(20px)` — same softened curve as the light variant; lighter than classic Glassmorphism.',
    },
    {
      path: 'elevation.overlay.boxShadow',
      note: 'Top-only `inset 0 1px 0 rgba(255,255,255,0.26)` + ink-black `0 20px 44px rgba(0,0,0,0.50)`. No paired bottom inset.',
    },
    {
      path: 'color.border.focus',
      note: 'Bright sky-cyan `#7dd3fc` — chromatic accent and refraction story in one.',
    },
  ],
  lookalikes: [
    {
      against: 'liquid-glass-light',
      differentiator:
        'The light sibling sits on a cool neutral-grey host (`#e6e9f2`) with `raised` at `0.28–0.68` alpha and ink-grey outer shadows. This palette inverts: near-black host (`#0f1218`), `raised` at `0.06–0.14`, pure-black outer shadows. Same engine, same blur curve, same radii — opposite luminance.',
    },
    {
      against: 'glassmorphism',
      differentiator:
        'Classic Glassmorphism is the saturated-indigo Big Sur 2020 register with heavy `blur(24px)` and pure-white hairlines. Liquid Glass (Dark) is the 2025 Apple dark register: near-neutral black host, lighter `blur(20px)`, sky-cyan refraction borders. Same engine, four years and a luminance flip apart.',
    },
    {
      against: 'aero-glass',
      differentiator:
        'Aero Glass is also dark-blue-tinted but it\'s Vista chrome: paired top-highlight + bottom-dark inset rims for curved gloss, Segoe UI, saturated Vista-blue `#1e4d8b` host. Liquid Glass (Dark) is near-neutral black with top-only inset and San Francisco — the Apple 2025 register, not Vista 2007.',
    },
    {
      against: 'tron-dark-neon',
      differentiator:
        'Tron uses a flat-engine dark host with hard chromatic glow accents — surfaces are opaque and the chrome comes from neon outlines. Liquid Glass (Dark) is on the glass engine: translucent panels, backdrop blur, refraction-tinted borders. No glow, no neon — soft refractive dark glass.',
    },
  ],
  thrivesWith: [
    'Modals, drawers, popovers in dark-mode contexts where the host is high-contrast content',
    'Inspector panels and sidebars over media — the low `raised` alpha lets the content breathe through',
    'Toolbars and segmented controls where the cyan-tinted border carries the affordance',
  ],
  degradesWith: [
    'VirtualList — `border.subtle` at `rgba(255,255,255,0.08)` renders ~1% effective contrast against its own panel; row separators disappear. README flags this as "most likely to fail"',
    'Dense tables — same near-invisible-border problem at row scale',
    'Long muted-text passages — `content.muted` at 48% alpha over a 6%-white panel on `#0f1218` lands around 4.4:1, below AA for non-large text',
  ],
  recallAliases: ['liquid glass dark', 'liquid glass (dark)', 'apple liquid glass dark', 'wwdc25 dark', 'liquid glass night'],
}
