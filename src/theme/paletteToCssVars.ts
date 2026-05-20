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

  const fams = ['ui', 'display', 'mono'] as const
  for (const k of fams) {
    vars[`--font-family-${k}`] = tokens.typography.family[k]
  }

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

  return vars
}
