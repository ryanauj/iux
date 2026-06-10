import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'aurora-daybreak',
  tagline:
    'The LIGHT cool register of the aurora-engine family — a soft azure → cyan → emerald → violet pastel mesh on a near-white sky, the daylight counterpart of Spectrum.',
  summary:
    'Aurora (Daybreak) takes the aurora engine onto a light ground. Same model — a four-radial `effect.atmosphereGradient` the engine ' +
    'paints at the root and drifts over a 48s loop, with translucent cards frosted by `backdrop-filter` — but the host is a near-white ' +
    'sky `#f5f8fe` and the azure / cyan / emerald / violet mesh is held at pastel alpha, so the whole thing reads as the soft ' +
    'mesh-gradient-on-white look modern marketing sites use. Type is dark navy ink, cards keep a faint real border for definition, and ' +
    'elevation is a soft cool drop shadow rather than a luminance glow. The engine\'s hover and selection cues are token-driven, so on ' +
    'this light ground the selection tint darkens (a `color-mix` of the dark `content.primary`) instead of brightening.',
  origin:
    'Original to the iux design system — the first LIGHT register of the aurora-engine family. It exists to answer "do the gradient ' +
    'thing, but light": the pastel mesh-on-white hero backgrounds common to current SaaS and dev-tool marketing.',
  signatures: [
    {
      label: 'Pastel mesh on a near-white sky',
      detail:
        'The same drifting four-radial gradient as the dark registers, but azure / cyan / emerald / violet held at pastel alpha (`0.18–0.22`) over `#f5f8fe`, so it reads as a soft gradient wash rather than saturated chroma.',
    },
    {
      label: 'Frosted near-white cards with a faint real border',
      detail:
        '`surface.raised` is `rgba(255,255,255,0.62)` — the engine\'s `backdrop-filter` frosts the pastel mesh behind it into a clean glass panel. A quiet `border.default` (`rgba(16,36,62,0.16)`) gives the card definition on the light ground.',
    },
    {
      label: 'Dark navy ink and soft cool drop shadows',
      detail:
        '`content.primary` is `#10243e`. `elevation.*` is a soft cool drop shadow (`0 1px 3px rgba(16,36,70,0.08) …`), NOT a luminance glow — on a light ground the glow would vanish, so the surface reads by shadow + border + frosted fill.',
    },
    {
      label: 'Token-driven selection that darkens on light',
      detail:
        'The aurora engine\'s selection fill is `color-mix(in srgb, var(--color-content-primary) 12%, transparent)`. Because `content.primary` is dark here, the selected surface darkens (the inverse of the dark registers\' brighten), so selection reads on white.',
    },
  ],
  antiSignatures: [
    'A near-black ground (that is the dark registers — Daybreak is light)',
    'Saturated full-strength mesh centers (Daybreak holds them at pastel alpha so dark text stays readable)',
    'White-glow elevation (defeats the light ground; Daybreak uses soft cool drop shadows)',
    '`atmosphereGradient: \'none\'` (the drifting pastel mesh is the identity)',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Near-white sky `#f5f8fe` — the light ground the pastel mesh drifts over.' },
    { path: 'effect.atmosphereGradient', note: 'Azure / cyan / emerald / violet at pastel alpha so the gradient stays soft on white.' },
    { path: 'color.surface.raised', note: 'Frosted `rgba(255,255,255,0.62)` — the engine\'s backdrop blur turns it into a clean glass panel.' },
    { path: 'elevation.medium.boxShadow', note: 'Soft cool drop shadow, not a luminance glow — the light-ground elevation model.' },
    { path: 'color.content.primary', note: 'Dark navy `#10243e` — also drives the engine selection tint, which darkens on this ground.' },
  ],
  lookalikes: [
    {
      against: 'aurora-spectrum',
      differentiator:
        'Daybreak is Spectrum inverted to daylight: same engine, same azure / cyan / emerald / violet run, but on a near-white sky with pastel-alpha centers, dark navy ink, frosted-white cards, and soft drop shadows instead of a near-black floor with luminance glows.',
    },
    {
      against: 'aurora-bloom',
      differentiator:
        'Its warm light sibling. Bloom runs a pink / peach / lavender / amber mesh with a magenta primary on warm white; Daybreak runs azure / cyan / emerald / violet with a blue primary on cool white.',
    },
    {
      against: 'glassmorphism',
      differentiator:
        'Glassmorphism is a `glassmorphism`-engine palette on a static saturated indigo host with `surfaceBy: \'border\'`. Daybreak is on the `aurora` engine: a drifting pastel mesh at the root on near-white, with the frosted cards reading as luminance lifts over a living gradient rather than over a fixed host.',
    },
  ],
  thrivesWith: [
    'Light SaaS / dev-tool marketing pages — the pastel mesh hero behind frosted white cards is exactly the current idiom',
    'Card, Modal, Drawer, Toast — frosted near-white panels over a soft gradient at every tier',
  ],
  degradesWith: [
    'Dense Tables — frosted translucent rows separate less crisply than opaque zebra striping',
    'Browsers without `backdrop-filter` — the frosted-glass cards fall back to a flatter translucent white',
  ],
  recallAliases: ['aurora daybreak', 'daybreak', 'light gradient', 'pastel mesh', 'new tech gradient'],
}
