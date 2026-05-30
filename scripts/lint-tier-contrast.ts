/**
 * Tier-badge contrast lint — the integration check between the showcase's
 * tier-badge CSS and every palette's tokens.
 *
 * The tier badges ("Tier 1/2/3" in each component card's header) are styled in
 * `src/showcase/showcase.css`. They used to set the tier *text* color to an
 * intent **fill** token (`--color-intent-*-bg`) over `surface.sunken` — a fill
 * color used as text. On light palettes that fill is a pale tint designed to
 * carry dark text on top of it, so as text-on-sunken it vanished (ratios as
 * low as ~1.2:1). This lint catches that failure mode for the badge
 * specifically, across all 80+ palettes.
 *
 * Rather than hard-code which token each tier uses, this reads the actual
 * `.showcase__tier` rules out of the CSS and resolves them against each
 * palette's emitted CSS variables. So it measures exactly what ships: change
 * the CSS back to a low-contrast pairing and this fails again.
 *
 * Rule:
 *   - `tier-badge-text`: for each tier, the resolved text color on the resolved
 *     badge background must clear 3:1 (WCAG UI / non-body-text minimum — the
 *     badge is a small label on a colored chip, same class as a button label).
 *     Palettes marked `a11y: 'experimental'` are skipped. Pairings that don't
 *     resolve to static colors are reported as `skip:` lines.
 */
import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { palettes } from '../palettes'
import { paletteToCssVars } from '../src/theme/paletteToCssVars'
import { contrastRatio, flatten, parseColor, type RGB } from './lib/contrast'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CSS_PATH = path.join(__dirname, '..', 'src', 'showcase', 'showcase.css')

const TIERS = [1, 2, 3] as const
const THRESHOLD = 3

/** Extract the `{ ... }` body of the rule whose selector is exactly `selector`. */
function ruleBody(css: string, selector: string): string | null {
  // Escape regex metachars in the selector, then require `{` (allowing only
  // whitespace between) so `.showcase__tier` doesn't match `.showcase__tier--1`.
  const esc = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const m = css.match(new RegExp(`${esc}\\s*\\{([^}]*)\\}`))
  return m ? m[1] : null
}

/** Read a single property's value out of a rule body (last write wins). */
function declValue(body: string, prop: string): string | null {
  // `(?<![-\w])` keeps `color` from matching inside `border-color`.
  const re = new RegExp(`(?<![-\\w])${prop}\\s*:\\s*([^;]+)`, 'g')
  let value: string | null = null
  for (const m of body.matchAll(re)) value = m[1].trim()
  return value
}

/** Pull the inner text of a leading `var( ... )`, honoring nested parens. */
function varInner(expr: string): string | null {
  if (!expr.startsWith('var(')) return null
  let depth = 0
  for (let i = 3; i < expr.length; i++) {
    if (expr[i] === '(') depth++
    else if (expr[i] === ')') {
      depth--
      if (depth === 0) return expr.slice(4, i)
    }
  }
  return null
}

/** Split a `var()` inner string into its custom-property name and fallback. */
function splitVar(inner: string): { name: string; fallback: string | null } {
  let depth = 0
  for (let i = 0; i < inner.length; i++) {
    if (inner[i] === '(') depth++
    else if (inner[i] === ')') depth--
    else if (inner[i] === ',' && depth === 0) {
      return { name: inner.slice(0, i).trim(), fallback: inner.slice(i + 1).trim() }
    }
  }
  return { name: inner.trim(), fallback: null }
}

/** Resolve a CSS value expression to a concrete color via a palette var map. */
function resolve(expr: string, vars: Record<string, string>): string | null {
  expr = expr.trim()
  if (expr.startsWith('var(')) {
    const inner = varInner(expr)
    if (inner === null) return null
    const { name, fallback } = splitVar(inner)
    const resolved = vars[name]
    if (resolved !== undefined && resolved !== '') return resolve(resolved, vars)
    if (fallback) return resolve(fallback, vars)
    return null
  }
  return expr || null
}

interface Violation {
  palette: string
  tier: number
  fg: string
  bg: string
  ratio: number
}

function main() {
  const css = fs.readFileSync(CSS_PATH, 'utf8')
  const base = ruleBody(css, '.showcase__tier')
  if (!base) {
    console.error('lint-tier-contrast: could not find `.showcase__tier` rule in showcase.css')
    process.exit(1)
  }

  // Effective text / background expression for each tier: the per-tier rule
  // wins, else the base rule supplies it.
  const mapping = TIERS.map(tier => {
    const tierBody = ruleBody(css, `.showcase__tier--${tier}`) ?? ''
    return {
      tier,
      colorExpr: declValue(tierBody, 'color') ?? declValue(base, 'color'),
      bgExpr: declValue(tierBody, 'background') ?? declValue(base, 'background'),
    }
  })

  const violations: Violation[] = []
  const skipped: string[] = []

  for (const [pid, p] of Object.entries(palettes)) {
    if (p.a11y === 'experimental') continue
    const vars = paletteToCssVars(p.tokens)
    // Badges sit on a card, which paints `surface.raised`; composite any
    // translucent fills over that canvas before measuring.
    const canvas = parseColor(p.tokens.color.surface.raised)

    for (const { tier, colorExpr, bgExpr } of mapping) {
      if (!colorExpr || !bgExpr) {
        skipped.push(`${pid} tier ${tier} (no color/background declaration found)`)
        continue
      }
      const fgRaw = resolve(colorExpr, vars)
      const bgRaw = resolve(bgExpr, vars)
      const fg = fgRaw ? parseColor(fgRaw) : null
      const bgc = bgRaw ? parseColor(bgRaw) : null
      if (!fg || !bgc) {
        skipped.push(`${pid} tier ${tier} (non-static: fg=${fgRaw}, bg=${bgRaw})`)
        continue
      }
      const flatBg: RGB = bgc.a < 1 && canvas ? flatten(bgc, canvas) : bgc
      const ratio = contrastRatio(fg, flatBg)
      if (ratio < THRESHOLD) {
        violations.push({
          palette: pid,
          tier,
          fg: fgRaw!,
          bg: bgRaw!,
          ratio: Math.round(ratio * 100) / 100,
        })
      }
    }
  }

  const total = Object.keys(palettes).length
  console.log(`lint-tier-contrast: ${total} palette(s) scanned; ${violations.length} violation(s)`)
  for (const s of skipped) console.log(`  skip: ${s}`)
  for (const v of violations) {
    console.log(
      `  ${v.palette} :: tier-badge-text :: tier ${v.tier} :: fg=${v.fg} bg=${v.bg} ratio=${v.ratio} < ${THRESHOLD}`,
    )
  }
  if (violations.length) process.exit(1)
}

main()
