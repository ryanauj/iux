/**
 * Color helpers for the style editor's color picker.
 *
 * The native `<input type="color">` only understands 6-digit hex (`#rrggbb`)
 * and has no alpha channel. These helpers let the picker drive any common CSS
 * color value — hex (with or without alpha), `rgb()`, and `rgba()` — by
 * converting to hex for the picker and writing the new color back in the
 * value's original format, preserving its alpha channel.
 */

/** Parsed RGB(A) color with channels 0-255 and alpha 0-1. */
interface Rgba {
  r: number
  g: number
  b: number
  /** Alpha 0-1, or null when the source value carries no alpha channel. */
  a: number | null
}

function clampChannel(n: number): number {
  return Math.max(0, Math.min(255, Math.round(n)))
}

function toHexPair(n: number): string {
  return clampChannel(n).toString(16).padStart(2, '0')
}

/** Parse a hex color (`#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`) into RGBA. */
function parseHex(value: string): Rgba | null {
  const m = /^#([0-9a-f]{3,8})$/i.exec(value.trim())
  if (!m) return null
  const hex = m[1]
  const expand = (s: string) => s.split('').map(c => c + c).join('')
  switch (hex.length) {
    case 3:
      return rgbaFromHex6(expand(hex), null)
    case 4:
      return rgbaFromHex6(expand(hex.slice(0, 3)), parseInt(expand(hex[3]), 16) / 255)
    case 6:
      return rgbaFromHex6(hex, null)
    case 8:
      return rgbaFromHex6(hex.slice(0, 6), parseInt(hex.slice(6, 8), 16) / 255)
    default:
      return null
  }
}

function rgbaFromHex6(hex6: string, a: number | null): Rgba {
  return {
    r: parseInt(hex6.slice(0, 2), 16),
    g: parseInt(hex6.slice(2, 4), 16),
    b: parseInt(hex6.slice(4, 6), 16),
    a,
  }
}

/** Parse an `rgb()` / `rgba()` color (comma- or space-separated) into RGBA. */
function parseRgbFunc(value: string): Rgba | null {
  const m = /^rgba?\(\s*([^)]+?)\s*\)$/i.exec(value.trim())
  if (!m) return null
  // Support both "r, g, b" / "r, g, b, a" and "r g b" / "r g b / a".
  const parts = m[1].split(/\s*[,/]\s*|\s+/).filter(Boolean)
  if (parts.length < 3 || parts.length > 4) return null
  const channel = (s: string): number | null => {
    const pct = /^(-?\d*\.?\d+)%$/.exec(s)
    if (pct) return clampChannel((Number(pct[1]) / 100) * 255)
    if (!/^-?\d*\.?\d+$/.test(s)) return null
    const n = Number(s)
    return Number.isFinite(n) ? clampChannel(n) : null
  }
  const r = channel(parts[0])
  const g = channel(parts[1])
  const b = channel(parts[2])
  if (r === null || g === null || b === null) return null
  let a: number | null = null
  if (parts.length === 4) {
    const alphaStr = parts[3]
    const pct = /^(-?\d*\.?\d+)%$/.exec(alphaStr)
    const raw = pct ? Number(pct[1]) / 100 : Number(alphaStr)
    if (!Number.isFinite(raw)) return null
    a = Math.max(0, Math.min(1, raw))
  }
  return { r, g, b, a }
}

/** Parse any supported color value into RGBA, or null if unsupported. */
function parseColor(value: string): Rgba | null {
  return parseHex(value) ?? parseRgbFunc(value)
}

/**
 * Whether the value is a color the native picker can edit (hex, rgb, or rgba).
 */
export function isPickableColor(value: string): boolean {
  return parseColor(value) !== null
}

/** Convert a supported color value to `#rrggbb` for `<input type="color">`. */
export function toPickerHex(value: string): string | null {
  const rgba = parseColor(value)
  if (!rgba) return null
  return `#${toHexPair(rgba.r)}${toHexPair(rgba.g)}${toHexPair(rgba.b)}`
}

/**
 * Apply a new `#rrggbb` from the picker, preserving the original value's
 * format (hex / rgb / rgba) and alpha channel.
 */
export function applyPickedHex(originalValue: string, pickedHex: string): string {
  const picked = parseHex(pickedHex)
  if (!picked) return pickedHex
  const original = parseColor(originalValue)
  const trimmed = originalValue.trim()

  // rgba(...) — keep its alpha; rgb(...) — keep it alpha-less.
  if (/^rgba\(/i.test(trimmed)) {
    const a = original?.a ?? 1
    return `rgba(${picked.r}, ${picked.g}, ${picked.b}, ${formatAlpha(a)})`
  }
  if (/^rgb\(/i.test(trimmed)) {
    return `rgb(${picked.r}, ${picked.g}, ${picked.b})`
  }

  // Hex with an alpha channel — keep the alpha as a hex pair.
  if (original && original.a !== null) {
    return `#${toHexPair(picked.r)}${toHexPair(picked.g)}${toHexPair(picked.b)}${toHexPair(original.a * 255)}`
  }

  // Plain hex (or anything else parseable) — emit `#rrggbb`.
  return `#${toHexPair(picked.r)}${toHexPair(picked.g)}${toHexPair(picked.b)}`
}

/** Format an alpha 0-1 value compactly (no trailing zeros). */
function formatAlpha(a: number): string {
  return String(Math.round(Math.max(0, Math.min(1, a)) * 1000) / 1000)
}
