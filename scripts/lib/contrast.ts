/**
 * Shared color math for the contrast lints.
 *
 * Both `lint-contrast.ts` (palette token pairs) and `lint-tier-contrast.ts`
 * (the showcase tier-badge mapping) measure WCAG contrast ratios, so the
 * parsing / flattening / luminance helpers live here as the single source of
 * truth. Keep this dependency-free — it's imported by tsx scripts that run in
 * plain Node.
 */

export type RGB = { r: number; g: number; b: number; a: number }

/**
 * Parse a *static* CSS color (`#rgb`, `#rrggbb`, `#rrggbbaa`, `rgb()`,
 * `rgba()`). Returns `null` for anything non-static (`color-mix(...)`,
 * `var(...)`, named colors) so callers can skip rather than guess.
 */
export function parseColor(c: string): RGB | null {
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

/** Composite a (possibly translucent) `fg` over an opaque `bg`. */
export function flatten(fg: RGB, bg: RGB): RGB {
  const a = fg.a
  return { r: fg.r * a + bg.r * (1 - a), g: fg.g * a + bg.g * (1 - a), b: fg.b * a + bg.b * (1 - a), a: 1 }
}

export function relLum({ r, g, b }: RGB): number {
  const toLin = (v: number) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b)
}

/** WCAG contrast ratio. `fg` is flattened over `bg` first (handles alpha). */
export function contrastRatio(fg: RGB, bg: RGB): number {
  const f = flatten(fg, bg)
  const L1 = relLum(f)
  const L2 = relLum(bg)
  const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1]
  return (hi + 0.05) / (lo + 0.05)
}
