import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'cel-shaded-monokai-crt',
  tagline:
    'A Cel+Glass+CRT hybrid in the Monokai register — white field, ink-outline halo over translucent frosted panels, a scanline overlay, and hot-magenta accent glow that lives on the boxes (elevation shadows) but never on text.',
  summary:
    'Monokai (Glass·CRT) runs three engines at once on the `cel-shaded` chassis. The cel layer paints every surface a 3px ink ' +
    'outline (`effect.outline.color = #272822`) with a hard offset block shadow (`effect.shadowStyle = hard`, the `Npx Npx 0 #272822` ' +
    'lead in every `elevation.*`). The glass layer makes panels translucent — `surface.raised` is `rgba(249, 38, 114, 0.06)` and ' +
    '`surface.overlay` is `rgba(255, 255, 255, 0.72)`, frosted by `effect.backdropBlur` (`blur(4/10/20)`). The CRT layer adds a ' +
    'scanline via `effect.overlay.image` (a 2px/3px repeating-linear-gradient at `blend: multiply`) and bakes a hot-magenta accent ' +
    'glow (`rgba(249, 38, 114, 0.50)`) into the middle stop of each `elevation.*` box-shadow. Critically the glow is element-only: ' +
    '`effect.glow` stays `{ radius: 0, color: transparent, intensity: 0 }`, so no text ever glows. Monokai colors carry it — ink ' +
    '`#272822`, hot-magenta `#f92672` accent/focus, JetBrains Mono display. a11y is `experimental`: the translucent surfaces and ' +
    'the scanline overlay trade contrast certainty for atmosphere.',
  origin:
    'The Monokai code-editor theme (Wimer Hazenberg, 2006) cross-bred with two screen idioms: glassmorphism’s frosted translucent ' +
    'panels and the CRT terminal’s scanline-and-phosphor-glow. The cel-shaded engine supplies the ink-line cartoon halo and hard ' +
    'block shadow underneath. The result is a white-field hybrid: a syntax-highlight palette rendered as outlined glass cards on a ' +
    'glowing CRT, distinct from the warm anime-register cel siblings and from the pure-glass and pure-CRT palettes it borrows from.',
  signatures: [
    {
      label: 'Three-stop CRT elevation: ink block shadow + magenta glow + soft drop, glow on boxes only',
      detail:
        'Each `elevation.*` is a three-part box-shadow: a hard cel offset (`5px 5px 0 #272822`), a magenta CRT glow ' +
        '(`0 0 16px rgba(249, 38, 114, 0.50)`), and a soft ambient drop (`0 8px 20px rgba(39, 40, 34, 0.12)`). The glow lives ' +
        'entirely in this box recipe — `effect.glow` is zeroed (`radius: 0, color: transparent, intensity: 0`) so text never glows.',
    },
    {
      label: 'Translucent frosted panels over a white field',
      detail:
        '`surface.base` is `#ffffff` but `surface.raised` is `rgba(249, 38, 114, 0.06)` and `surface.overlay` is ' +
        '`rgba(255, 255, 255, 0.72)`, meant to be frosted by `effect.backdropBlur` (`blur(4px)` / `blur(10px)` / `blur(20px)`). ' +
        'Panels read as glass material, not opaque cards — the glassmorphism contribution to the hybrid.',
    },
    {
      label: 'CRT scanline overlay at multiply blend',
      detail:
        '`effect.overlay.image` is a `repeating-linear-gradient(to bottom, …, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 3px)` ' +
        'with `blend: multiply` — a fine horizontal scanline raster laid across the whole field. This is the CRT signature; ' +
        'the warm anime cel siblings keep `overlay.image: none`.',
    },
    {
      label: 'Monokai hot-magenta accent on a deep-olive ink',
      detail:
        '`#f92672` magenta drives `border.focus`, `effect.focusRing.color`, and the glow color, against the Monokai ink ' +
        '`#272822` outline and `content.primary`. `intent.primary.bg` is the deeper `#e11d6a` with white content for AA on the fill.',
    },
    {
      label: 'JetBrains Mono display with no uppercasing',
      detail:
        '`typography.family.display` is the JetBrains Mono / Fira Code monospace stack — the editor-theme cue — and the role ' +
        'block carries no `textTransform: uppercase` (unlike the cel-shaded-mecha HUD register it borrows its role shapes from).',
    },
  ],
  antiSignatures: [
    'Any glow on text — `effect.glow` is `{ radius: 0, color: transparent, intensity: 0 }`; glow is box-only via `elevation.*`',
    'Opaque card surfaces — `raised`/`overlay` are translucent rgba, meant to be frosted by `backdropBlur`',
    'A soft-only or gaussian shadow with no hard offset — `shadowStyle` is `hard` and every elevation leads with `Npx Npx 0`',
    'A clean field with no scanline — `effect.overlay.image` paints a multiply-blended scanline raster',
    'Uppercased display lettering (that is the mecha HUD register; this palette removes the transform)',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.base',
      note: '`#ffffff` — the white field the hybrid sits on.',
    },
    {
      path: 'color.surface.raised',
      note: '`rgba(249, 38, 114, 0.06)` — translucent magenta-tinted glass panel, the glassmorphism contribution.',
    },
    {
      path: 'effect.outline.color',
      note: '`#272822` Monokai ink — the 3px cel-shaded outline halo on every surface.',
    },
    {
      path: 'effect.overlay.image',
      note: 'A 2px/3px `repeating-linear-gradient` scanline at `blend: multiply` — the CRT raster.',
    },
    {
      path: 'elevation.medium.boxShadow',
      note: '`5px 5px 0 #272822, 0 0 16px rgba(249, 38, 114, 0.50), 0 8px 20px rgba(39, 40, 34, 0.12)` — cel offset + CRT glow + soft drop, glow on the box.',
    },
    {
      path: 'effect.glow.radius',
      note: '`0` with `color: transparent`, `intensity: 0` — glow is element-only; text never glows.',
    },
    {
      path: 'typography.family.display',
      note: 'JetBrains Mono / Fira Code stack — the Monokai editor-theme display cue, no uppercase.',
    },
  ],
  lookalikes: [
    {
      against: 'cel-shaded-mecha',
      differentiator:
        'Same `cel-shaded` engine and shared role/space/motion shapes. Mecha is opaque steel-white with no overlay, no backdrop blur, single-color hard block shadows, and an uppercased squared HUD display. Monokai (Glass·CRT) layers translucent frosted panels, a multiply scanline overlay, and magenta glow into the elevation shadows, and drops the uppercase. Mecha is the dry cockpit panel; this is the same panel behind glass on a glowing CRT.',
    },
    {
      against: 'liquid-glass-light',
      differentiator:
        'Both use translucent rgba surfaces and `backdropBlur.*`. Liquid Glass is `glassmorphism` engine: transparent outline, soft inset-highlight shadows, no ink line, no scanline. Monokai (Glass·CRT) is `cel-shaded`: a hard 3px ink outline, hard offset block shadows, and a CRT scanline overlay on top of the glass. Glass supplies the panels; the cel and CRT layers are what make this palette its own thing.',
    },
    {
      against: 'crt-phosphor-green',
      differentiator:
        'Both render a CRT scanline and accent glow. Phosphor Green is a dark-field terminal where the green phosphor glow is the whole identity. Monokai (Glass·CRT) is a LIGHT/white-field hybrid where the magenta glow is constrained to `elevation.*` box-shadows (never text), sitting under an ink-outline cel halo and frosted glass panels. One is a glowing dark tube; this is glowing glass on white.',
    },
  ],
  thrivesWith: [
    'Cards / Modals / Popovers — translucent frosted panels with a magenta-glow offset shadow read as glass HUD callouts',
    'Buttons / Toggles — the ink outline is a precise click target and the magenta primary pops on white',
    'Code blocks / editor surfaces — JetBrains Mono display plus the Monokai accent reads as a syntax-highlight panel',
    'Status / Badges — the six-intent set on outlined glass chips with the CRT scanline as backdrop',
  ],
  degradesWith: [
    'Dense tables — per-row ink outlines plus the scanline overlay compound into visual noise',
    'Long-form prose — the scanline multiply overlay and translucent surfaces reduce sustained-reading contrast (a11y experimental)',
    'Tiny low-contrast UI on the translucent `raised` panels — frosted magenta-tint surfaces erode text contrast',
  ],
  recallAliases: ['Monokai (Glass·CRT)', 'monokai glass crt', 'monokai', 'cel glass crt', 'glass crt', 'crt scanline', 'glassmorphism cel', 'cel-shaded', 'scanline glow'],
}
