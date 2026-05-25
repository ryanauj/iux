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

type RGB = { r: number; g: number; b: number; a: number }

function parseColor(c: string): RGB | null {
  c = c.trim().toLowerCase()
  if (c.startsWith('#')) {
    const h = c.slice(1)
    if (h.length === 3) {
      return { r: parseInt(h[0] + h[0], 16), g: parseInt(h[1] + h[1], 16), b: parseInt(h[2] + h[2], 16), a: 1 }
    }
    if (h.length === 6) {
      return {
        r: parseInt(h.slice(0, 2), 16),
        g: parseInt(h.slice(2, 4), 16),
        b: parseInt(h.slice(4, 6), 16),
        a: 1,
      }
    }
    if (h.length === 8) {
      return {
        r: parseInt(h.slice(0, 2), 16),
        g: parseInt(h.slice(2, 4), 16),
        b: parseInt(h.slice(4, 6), 16),
        a: parseInt(h.slice(6, 8), 16) / 255,
      }
    }
    return null
  }
  const m = c.match(/^rgba?\(\s*(-?\d+(?:\.\d+)?)[\s,]+(-?\d+(?:\.\d+)?)[\s,]+(-?\d+(?:\.\d+)?)(?:[\s,/]+([\d.]+%?))?\s*\)$/)
  if (m) {
    let a = 1
    if (m[4]) a = m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4])
    return { r: +m[1], g: +m[2], b: +m[3], a }
  }
  return null
}

function flatten(fg: RGB, bg: RGB): RGB {
  const a = fg.a
  return { r: fg.r * a + bg.r * (1 - a), g: fg.g * a + bg.g * (1 - a), b: fg.b * a + bg.b * (1 - a), a: 1 }
}

function relLum({ r, g, b }: RGB): number {
  const toLin = (v: number) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b)
}

function contrastRatio(fg: RGB, bg: RGB): number {
  const f = flatten(fg, bg)
  const L1 = relLum(f)
  const L2 = relLum(bg)
  const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1]
  return (hi + 0.05) / (lo + 0.05)
}

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
