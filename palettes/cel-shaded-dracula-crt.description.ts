import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'cel-shaded-dracula-crt',
  tagline:
    'The Dracula identity on a Cel + Glass + CRT hybrid — white field, ink-outline halo, translucent frosted purple panels, scanline overlay, accent glow on elements (never text).',
  summary:
    'Dracula (Glass·CRT) ports the famous Dracula palette onto a three-way hybrid engine. From cel-shading it takes ' +
    'the ink-outline halo (`effect.outline.color = #282a36` at `3px`) and hard offset block shadows ' +
    '(`effect.shadowStyle = hard`, the leading `Npx Npx 0 #282a36` layer of every `elevation.*`). From glassmorphism ' +
    'it takes translucent panels — `surface.raised` is `rgba(189, 147, 249, 0.08)` purple-tinted glass and ' +
    '`surface.overlay` is `rgba(255, 255, 255, 0.72)` frosted, lifted by `effect.backdropBlur.lg = blur(20px)`. From ' +
    'CRT it takes the scanline `effect.overlay.image` (a repeating-linear-gradient at `multiply` blend) and an accent ' +
    'glow that rides ONLY inside `elevation.*` box-shadows as a purple `rgba(189, 147, 249, 0.55)` halo around boxes. ' +
    'Crucially `effect.glow` is inert (`radius: 0`, `color: transparent`, `intensity: 0`) so no glow ever touches text. ' +
    'It is a LIGHT theme on a `#ffffff` field; a11y is `experimental`.',
  origin:
    'Dracula is the dark-mode classic by Zeno Rocha — purple `#bd93f9`, the `#282a36` slate, the pink / cyan / green ' +
    'syntax accents. Here that identity is re-keyed onto a white field and run through a cel + glass + CRT hybrid: the ' +
    'Dracula hues survive as outline ink, accent glow, and intent fills, but the surface inverts to light and gains ' +
    'frosted panels plus a scanline overlay for the retro-terminal register.',
  signatures: [
    {
      label: 'Ink-outline halo plus hard offset block shadow in Dracula slate `#282a36`',
      detail:
        'Every surface carries a `3px` `#282a36` outline (`effect.outline.color`) and `elevation.*` leads with a hard ' +
        '`Npx Npx 0 #282a36` offset block (`effect.shadowStyle = hard`). This is the cel-shaded affordance — the slate ' +
        'ink line is the Dracula foreground color doing double duty as the outline.',
    },
    {
      label: 'Translucent frosted purple panels lifted by backdrop blur',
      detail:
        '`surface.raised = rgba(189, 147, 249, 0.08)` and `surface.overlay = rgba(255, 255, 255, 0.72)` are translucent, ' +
        'and `effect.backdropBlur` runs `sm/md/lg = blur(4px)/blur(10px)/blur(20px)`. Panels read as frosted glass over ' +
        'the white field rather than opaque cards — the glassmorphism layer of the hybrid.',
    },
    {
      label: 'CRT scanline overlay at multiply blend',
      detail:
        '`effect.overlay.image` is a `repeating-linear-gradient(to bottom, ...)` painting a 1px dark line every 3px at ' +
        '`blend: multiply`. This is the scanline grid laid over the whole field — the CRT register of the hybrid.',
    },
    {
      label: 'Accent glow on elements only — purple halo inside the box-shadow, never on text',
      detail:
        'Each `elevation.*` carries a `0 0 Npx rgba(189, 147, 249, 0.55)` purple glow ring as its middle shadow layer, so ' +
        'boxes get a CRT phosphor halo. But `effect.glow` is `{ radius: 0, color: transparent, intensity: 0 }` — the ' +
        'text-glow channel is deliberately off. Glow is a box affordance here, not a type affordance.',
    },
  ],
  antiSignatures: [
    'A dark Dracula field — this is the inverted LIGHT re-key on `surface.base = #ffffff`, not the canonical dark `#282a36` background',
    'Text glow / neon lettering — `effect.glow` is inert at `radius: 0` / `transparent`, glow lives only in `elevation.*` box-shadows',
    'Soft gaussian-only elevation — `shadowStyle` is `hard`; the offset block leads every shadow',
    'A transparent or zero-width outline — the `3px` ink outline is always on (cel affordance)',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.base',
      note: '`#ffffff` — the LIGHT white field the Dracula identity is re-keyed onto.',
    },
    {
      path: 'color.surface.raised',
      note: '`rgba(189, 147, 249, 0.08)` — translucent purple-tinted glass panel, the glassmorphism layer.',
    },
    {
      path: 'effect.outline.color',
      note: '`#282a36` Dracula slate at `3px` — the cel ink-outline halo.',
    },
    {
      path: 'effect.overlay.image',
      note: 'repeating-linear-gradient scanline at `multiply` blend — the CRT overlay.',
    },
    {
      path: 'elevation.medium.boxShadow',
      note: '`5px 5px 0 #282a36, 0 0 16px rgba(189, 147, 249, 0.55), 0 8px 20px rgba(40, 42, 54, 0.12)` — ink block + purple element glow + soft lift, all in one box-shadow.',
    },
    {
      path: 'effect.glow.radius',
      note: '`0` with `color: transparent` / `intensity: 0` — proves glow never touches text; it lives only on boxes.',
    },
    {
      path: 'typography.family.display',
      note: 'JetBrains Mono / Fira Code / IBM Plex Mono — the monospace terminal display face for the CRT register.',
    },
  ],
  lookalikes: [
    {
      against: 'cel-shaded-mecha',
      differentiator:
        'Same cel-shaded engine and ink-outline + hard-offset machinery. Mecha is opaque steel-white with no glass and no CRT — `backdropBlur` is all `none`, `overlay.image` is `none`, and `elevation.*` is a single flat ink block. Dracula (this palette) adds translucent purple glass panels, a scanline overlay, and a purple element-glow ring layered into every `elevation.*`. Mecha is the dry cockpit panel; this is the frosted retro-terminal.',
    },
    {
      against: 'liquid-glass-light',
      differentiator:
        'Both use translucent surfaces and `backdropBlur`. Liquid Glass is `engine: glassmorphism` with `shadowStyle: soft`, a transparent outline, and no scanline — pure frosted material. Dracula (this palette) is `engine: cel-shaded`: it adds a `3px` ink outline, hard offset block shadows, and the CRT scanline overlay on top of the glass. Liquid Glass is Apple frost; this is frost wrapped in ink lines and scanlines.',
    },
    {
      against: 'crt-phosphor-green',
      differentiator:
        'Both wear the CRT scanline register. Phosphor Green is a dark glowing-terminal palette built around radiant green text glow. Dracula (this palette) is a LIGHT white field where glow is restricted to `elevation.*` box-shadows — `effect.glow` is inert at `radius: 0`, so text never glows. One is a glowing green tube; this is a frosted white panel with a scanline veneer.',
    },
  ],
  thrivesWith: [
    'Cards, Modals, Drawers — frosted purple glass plus offset ink block plus element glow reads as a retro-terminal panel',
    'Buttons / Toggles / Tabs — the purple primary with ink outline is a precise, glowing click target',
    'Code blocks / data callouts — the JetBrains Mono display and scanline overlay sell the terminal register',
  ],
  degradesWith: [
    'Tables with dense rows — per-row ink outlines plus scanline overlay compound into visual noise',
    'Long-form prose — the scanline overlay and mono display fatigue at reading length',
    'Low-vision contexts — a11y is `experimental`; translucent panels over scanlines can drop contrast unpredictably',
  ],
  recallAliases: ['dracula', 'cel-shaded dracula crt', 'dracula glass crt', 'dracula crt', 'dracula glassmorphism', 'cel-shaded', 'crt', 'scanline', 'glassmorphism'],
}
