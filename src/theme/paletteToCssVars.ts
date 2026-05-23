import type { SemanticTokens } from '../../tokens/semantic.contract'

/**
 * The single seam from the typed token contract to runtime CSS.
 *
 * Every concrete value the contract holds — colors, lengths, durations,
 * easings, shadow strings, type metrics — is emitted as a CSS custom
 * property. Component CSS reads only these variables; this is the file
 * that keeps the no-raw-values lint passing downstream.
 *
 * `motionScale` multiplies every `motion.duration.*` value; zero-duration
 * slots (e.g. AAA) remain at zero. Used by the stories harness to slow
 * demo animations to a legible speed without touching palette source.
 */
function scaleDuration(value: string, scale: number): string {
  if (scale === 1) return value
  const match = value.match(/^(-?\d*\.?\d+)(ms|s)$/)
  if (!match) return value
  const n = Number(match[1])
  if (n === 0) return value
  return `${n * scale}${match[2]}`
}

export function paletteToCssVars(
  tokens: SemanticTokens,
  motionScale = 1,
): Record<string, string> {
  const vars: Record<string, string> = {}

  const surfaces = ['base', 'raised', 'sunken', 'overlay', 'scrim'] as const
  for (const k of surfaces) {
    vars[`--color-surface-${k}`] = tokens.color.surface[k]
  }

  const contents = ['primary', 'secondary', 'muted', 'inverse', 'link'] as const
  for (const k of contents) {
    vars[`--color-content-${k}`] = tokens.color.content[k]
  }

  const borders = ['subtle', 'default', 'strong', 'focus'] as const
  for (const k of borders) {
    vars[`--color-border-${k}`] = tokens.color.border[k]
  }
  // Brief explicitly names --color-focus-ring; keep the alias to that token.
  vars['--color-focus-ring'] = tokens.color.border.focus

  const intents = ['primary', 'neutral', 'success', 'warning', 'danger', 'info'] as const
  for (const i of intents) {
    const c = tokens.color.intent[i]
    vars[`--color-intent-${i}-bg`] = c.bg
    vars[`--color-intent-${i}-content`] = c.content
    vars[`--color-intent-${i}-border`] = c.border
    vars[`--color-intent-${i}-bg-hover`] = c.bgHover
    vars[`--color-intent-${i}-bg-active`] = c.bgActive
  }

  const spaceKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8'] as const
  for (const k of spaceKeys) {
    vars[`--space-${k}`] = tokens.space[k]
  }

  const radiusKeys = ['none', 'sm', 'md', 'lg', 'pill', 'full'] as const
  for (const k of radiusKeys) {
    vars[`--radius-${k}`] = tokens.radius[k]
  }

  const bwKeys = ['0', 'hairline', 'thin', 'thick', 'heavy'] as const
  for (const k of bwKeys) {
    vars[`--border-width-${k}`] = tokens.borderWidth[k]
  }

  const elevKeys = ['flat', 'low', 'medium', 'high', 'overlay'] as const
  for (const k of elevKeys) {
    vars[`--elevation-${k}`] = tokens.elevation[k].boxShadow
  }

  const fams = ['ui', 'display', 'mono', 'pixel', 'hand'] as const
  for (const k of fams) {
    vars[`--font-family-${k}`] = tokens.typography.family[k]
  }
  // Brief explicitly names --font-pixel as the family slot the Pixel-art
  // engine routes through; keep it as a stable alias for the family token.
  vars['--font-pixel'] = tokens.typography.family.pixel
  // Brief explicitly names --font-hand as the family slot the Sketch
  // engine routes through; same alias pattern.
  vars['--font-hand'] = tokens.typography.family.hand

  const roles = ['display', 'title', 'heading', 'subheading', 'body', 'label', 'caption', 'code'] as const
  for (const r of roles) {
    const ts = tokens.typography.role[r]
    vars[`--type-${r}-family`] = `var(--font-family-${ts.family})`
    vars[`--type-${r}-size`] = ts.size
    vars[`--type-${r}-weight`] = String(ts.weight)
    vars[`--type-${r}-line-height`] = ts.lineHeight
    vars[`--type-${r}-tracking`] = ts.tracking
    vars[`--type-${r}-text-transform`] = ts.textTransform ?? 'none'
  }

  const durKeys = ['instant', 'fast', 'base', 'slow'] as const
  for (const k of durKeys) {
    vars[`--motion-duration-${k}`] = scaleDuration(tokens.motion.duration[k], motionScale)
  }
  // Decay scales with the same motionScale knob so the stories slow-mo
  // demo lets reviewers see the CRT phosphor trail at human speed.
  vars['--motion-decay'] = scaleDuration(tokens.motion.decay, motionScale)

  const easeKeys = ['standard', 'in', 'out', 'inOut', 'spring'] as const
  for (const k of easeKeys) {
    vars[`--motion-easing-${k}`] = tokens.motion.easing[k]
  }

  const blurKeys = ['none', 'sm', 'md', 'lg'] as const
  for (const k of blurKeys) {
    vars[`--effect-backdrop-blur-${k}`] = tokens.effect.backdropBlur[k]
  }
  vars['--effect-focus-ring-width'] = tokens.effect.focusRing.width
  vars['--effect-focus-ring-offset'] = tokens.effect.focusRing.offset
  vars['--effect-focus-ring-style'] = tokens.effect.focusRing.style

  vars['--effect-overlay-image'] = tokens.effect.overlay.image
  vars['--effect-overlay-size'] = tokens.effect.overlay.size
  vars['--effect-overlay-blend'] = tokens.effect.overlay.blend

  vars['--effect-glow-radius'] = tokens.effect.glow.radius
  vars['--effect-glow-color'] = tokens.effect.glow.color
  vars['--effect-glow-intensity'] = String(tokens.effect.glow.intensity)

  // Pixel-art grid step. `'0'` on every other palette — the engine CSS that
  // reads `--pixel-grid` does nothing when the value is a zero length, so
  // there's no per-palette branching needed for the snap behavior.
  vars['--pixel-grid'] = tokens.effect.pixelGrid

  // Sketch engine stroke variance. `'0'` on every other palette — the engine
  // CSS that references `--stroke-variance` (via the fixed-strength SVG
  // filter at the palette root) does nothing when the value is a zero length,
  // so there's no per-palette branching needed for the wobble behavior.
  vars['--stroke-variance'] = tokens.effect.strokeVariance

  // Cardstock engine cut-edge. `'transparent'` / `'0'` on every other
  // palette — any engine CSS that references these vars paints nothing
  // (transparent colour at zero width), so there's no per-palette branching
  // needed elsewhere. The Cardstock palette also bakes the same values into
  // its `elevation.*` shadow strings; these vars exist so future paper-aware
  // components can read the engine's intended cut-edge directly.
  vars['--paper-edge-color'] = tokens.effect.paperEdgeColor
  vars['--paper-edge-width'] = tokens.effect.paperEdgeWidth

  // Cel-shaded engine outline. `'transparent'` / `'0'` on every other
  // palette — any engine CSS that references these paints nothing. The
  // Cel-shaded palettes set the values to a near-black ink and a 2-3px
  // width; the engine block in `src/styles.css` reads them at
  // `.palette-root[data-palette^='cel-shaded']` to paint a literal
  // `outline:` halo on raised surfaces and interactive controls so the
  // ink line is always present.
  vars['--outline-color'] = tokens.effect.outline.color
  vars['--outline-width'] = tokens.effect.outline.width

  // Cel-shaded engine shadow style. `'soft'` on every other palette;
  // Cel-shaded palettes set `'hard'`. The slot is an engine-only signal
  // — components don't branch on it — but the engine block in
  // `src/styles.css` reads it to decide whether to layer extra two-tone
  // shading on top of `elevation.*`.
  vars['--shadow-style'] = tokens.effect.shadowStyle

  // Aurora engine atmospheric gradient. `'none'` on every other palette
  // — the engine CSS that paints the background image at the palette
  // root resolves to `background-image: none`, so non-aurora palettes
  // pay nothing. The Aurora palette ships a multi-radial-gradient stack
  // of green / purple / teal luminance centers on a deep midnight base;
  // the engine block at `.palette-root[data-palette^='aurora']` slowly
  // drifts the gradient via `background-position` keyframes.
  vars['--effect-atmosphere-gradient'] = tokens.effect.atmosphereGradient

  // Aurora engine luminance center. `'transparent'` on every other
  // palette — any engine CSS that references the var paints nothing.
  // The Aurora palette sets a translucent near-white that the engine
  // block paints as a soft radial glow around raised surfaces and
  // intensifies on hover / focus so the luminance bends toward the
  // interactive element. Because it's emitted as a regular custom
  // property it inherits down the tree, so nested raised surfaces pick
  // up the same luminance unless they override it locally — which is
  // exactly the "per-surface; default = inherit from parent" contract.
  vars['--luminance-center'] = tokens.effect.luminanceCenter

  // Aurora engine surface-by signal. `'border'` on every palette except
  // Aurora, which sets `'luminance'`. The slot is an engine-only signal
  // — components don't branch on it — but it records intent: under
  // `'border'` surfaces are bounded rectangles, under `'luminance'` they
  // read by light density. The Aurora engine doesn't actually read this
  // var in CSS today (the engine block is scoped via `data-palette`),
  // but it's exposed so future surface-aware components (a Separator
  // that switches from a hairline to a luminance gradient, an
  // annotation layer that needs to know whether to draw a hard edge)
  // can read the engine's intended surface model directly.
  vars['--surface-by'] = tokens.effect.surfaceBy

  return vars
}
