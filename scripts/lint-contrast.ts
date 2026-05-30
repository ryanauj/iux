/**
 * Contrast lint — verifies every palette's intent fills carry text at WCAG
 * minimum contrast. Catches the failure mode that bullet-train hit at runtime
 * (white-on-too-bright fills where icon shows but label disappears).
 *
 * Rules:
 *   - `intent-text-on-fill`: each of intent.{primary,neutral,success,warning,
 *     danger,info} must clear 3:1 ratio (WCAG UI minimum) between `bg` and
 *     `content`. Buttons are interactive UI components; the contract treats
 *     them as such. Palettes marked `a11y: 'experimental'` are skipped — they
 *     are knowingly out of spec.
 *   - `surface-text`: `content.primary` on `surface.base` and on `surface.raised`
 *     must clear 4.5:1 (body-text AA). Same a11y skip.
 *
 * Non-static intent values (`color-mix(...)`, `var(...)`, transparent-only
 * fills) are skipped with a `skip:` line so the contract authors know the
 * lint didn't measure them.
 */
import { palettes } from '../palettes'
import { contrastRatio, flatten, parseColor } from './lib/contrast'

interface Violation {
  palette: string
  rule: 'intent-text-on-fill' | 'surface-text'
  pair: string
  fg: string
  bg: string
  ratio: number
  threshold: number
}

const violations: Violation[] = []
const skipped: string[] = []
const intents = ['primary', 'neutral', 'success', 'warning', 'danger', 'info'] as const

for (const [pid, p] of Object.entries(palettes)) {
  if (p.a11y === 'experimental') continue

  const surfaceBase = parseColor(p.tokens.color.surface.base)
  if (!surfaceBase) {
    skipped.push(`${pid}.surface.base (non-static: ${p.tokens.color.surface.base})`)
    continue
  }

  for (const i of intents) {
    const c = p.tokens.color.intent[i]
    const bg = parseColor(c.bg)
    const fg = parseColor(c.content)
    if (!bg || !fg) {
      skipped.push(`${pid}.intent.${i} (non-static: bg=${c.bg}, content=${c.content})`)
      continue
    }
    const flatBg = bg.a < 1 ? flatten(bg, surfaceBase) : bg
    const ratio = contrastRatio(fg, flatBg)
    if (ratio < 3) {
      violations.push({
        palette: pid,
        rule: 'intent-text-on-fill',
        pair: `intent.${i}`,
        fg: c.content,
        bg: c.bg,
        ratio: Math.round(ratio * 100) / 100,
        threshold: 3,
      })
    }
  }

  for (const surface of ['base', 'raised'] as const) {
    const sg = parseColor(p.tokens.color.surface[surface])
    const fg = parseColor(p.tokens.color.content.primary)
    if (!sg || !fg) continue
    const flatBg = sg.a < 1 ? flatten(sg, surfaceBase) : sg
    const ratio = contrastRatio(fg, flatBg)
    if (ratio < 4.5) {
      violations.push({
        palette: pid,
        rule: 'surface-text',
        pair: `content.primary on surface.${surface}`,
        fg: p.tokens.color.content.primary,
        bg: p.tokens.color.surface[surface],
        ratio: Math.round(ratio * 100) / 100,
        threshold: 4.5,
      })
    }
  }
}

const totalPalettes = Object.keys(palettes).length
console.log(`lint-contrast: ${totalPalettes} palette(s) scanned; ${violations.length} violation(s)`)
if (skipped.length) {
  for (const s of skipped) console.log(`  skip: ${s}`)
}
for (const v of violations) {
  console.log(
    `  ${v.palette} :: ${v.rule} :: ${v.pair} :: fg=${v.fg} bg=${v.bg} ratio=${v.ratio} < ${v.threshold}`,
  )
}
if (violations.length) process.exit(1)
