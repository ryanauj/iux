/**
 * Semantic token contract — the single seam between components and palettes.
 *
 * Components import types and read values from this shape only.
 * Palettes export a single `SemanticTokens` object that fills every slot.
 *
 * See `tokens/00-token-contract.md` for the rules, value-type conventions,
 * and engine ↔ token mapping.
 */

// -----------------------------------------------------------------------------
// Atom types
// -----------------------------------------------------------------------------

/** CSS color string. Any color space the palette wants. */
export type CssColor = string

/** CSS length string with units (`'8px'`, `'1rem'`). Use `'0'` for zero. */
export type CssLength = string

/** CSS time string (`'200ms'`, `'0.4s'`). Use `'0ms'` for instant. */
export type CssDuration = string

/** CSS timing-function string (`'linear'`, `'cubic-bezier(...)'`). */
export type CssEasing = string

/** CSS filter string for backdrop-filter blur (`'blur(8px)'` or `'none'`). */
export type CssBackdropFilter = string

/** Value for the CSS `box-shadow` property. May stack multiple, may use `inset`. */
export interface Shadow {
  boxShadow: string
}

/** A composed text style consumed by components via `typography.role.*`. */
export interface TextStyle {
  /** References a typography family stack. */
  family: string
  size: CssLength
  /** Numeric (100–900) or a keyword (`'bold'`). */
  weight: number | string
  /** CSS `line-height` value (unit-less number as a string, or length). */
  lineHeight: string
  /** CSS `letter-spacing` value. */
  tracking: CssLength
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
}

// -----------------------------------------------------------------------------
// Color
// -----------------------------------------------------------------------------

export interface SurfaceColors {
  /** Page background. */
  base: CssColor
  /** Cards, panels — the default "above the page" surface. */
  raised: CssColor
  /** Inputs, inset wells — reads as recessed. */
  sunken: CssColor
  /** Modals, popovers, drawers — paired with `scrim`. */
  overlay: CssColor
  /** Full-screen tint behind an overlay. */
  scrim: CssColor
}

export interface ContentColors {
  /** Body text on `surface.base` / `surface.raised`. */
  primary: CssColor
  /** Supporting text, captions, meta. */
  secondary: CssColor
  /** Placeholder, disabled, decorative. */
  muted: CssColor
  /** Text on `intent.*.bg` (often white on colored). */
  inverse: CssColor
  /** Hyperlink color. */
  link: CssColor
}

export interface BorderColors {
  /** Barely-there separators (table rows). */
  subtle: CssColor
  /** Input borders, card outlines. */
  default: CssColor
  /** Emphasis borders (neubrutalism's defining line). */
  strong: CssColor
  /** Keyboard focus ring color. Paired with `effect.focusRing`. */
  focus: CssColor
}

/** A single intent (primary, success, etc.) as consumed by buttons/badges/alerts. */
export interface IntentColors {
  bg: CssColor
  /** Foreground that sits on `bg`. */
  content: CssColor
  border: CssColor
  bgHover: CssColor
  bgActive: CssColor
}

/** The six fixed intents. No others. */
export interface IntentSet {
  primary: IntentColors
  neutral: IntentColors
  success: IntentColors
  warning: IntentColors
  danger: IntentColors
  info: IntentColors
}

export interface ColorTokens {
  surface: SurfaceColors
  content: ContentColors
  border: BorderColors
  intent: IntentSet
}

// -----------------------------------------------------------------------------
// Spacing
// -----------------------------------------------------------------------------

/**
 * Linear spacing scale, names are the contract. The pixel values are not
 * — palettes may rescale (Editorial widens, AAA tightens).
 */
export interface SpaceScale {
  '0': CssLength
  '1': CssLength
  '2': CssLength
  '3': CssLength
  '4': CssLength
  '5': CssLength
  '6': CssLength
  '7': CssLength
  '8': CssLength
}

// -----------------------------------------------------------------------------
// Radius
// -----------------------------------------------------------------------------

export interface RadiusScale {
  none: CssLength
  sm: CssLength
  md: CssLength
  lg: CssLength
  /** Pill shape on rectangular elements. */
  pill: CssLength
  /** Circles and circular crops (`'9999px'`). */
  full: CssLength
}

// -----------------------------------------------------------------------------
// Border width
// -----------------------------------------------------------------------------

export interface BorderWidthScale {
  '0': CssLength
  hairline: CssLength
  thin: CssLength
  thick: CssLength
  heavy: CssLength
}

// -----------------------------------------------------------------------------
// Elevation
// -----------------------------------------------------------------------------

/**
 * Each slot holds a single shadow recipe. The shadow string may stack multiple
 * shadows and may include `inset` — that's how Neumorphism packs paired
 * inner+outer shadows into one slot, and how Neubrutalism puts hard offsets
 * into `low`.
 */
export interface ElevationScale {
  flat: Shadow
  low: Shadow
  medium: Shadow
  high: Shadow
  /** Modal / popover / drawer panel shadow. */
  overlay: Shadow
}

// -----------------------------------------------------------------------------
// Typography
// -----------------------------------------------------------------------------

export interface TypographyFamilies {
  /** Default UI font stack — body text, controls, labels. */
  ui: string
  /** Display / headline stack. */
  display: string
  /** Monospace stack — code, tabular data, HUD readouts. */
  mono: string
}

export interface TypographyRoles {
  display: TextStyle
  title: TextStyle
  heading: TextStyle
  subheading: TextStyle
  body: TextStyle
  label: TextStyle
  caption: TextStyle
  code: TextStyle
}

export interface TypographyTokens {
  family: TypographyFamilies
  role: TypographyRoles
}

// -----------------------------------------------------------------------------
// Motion
// -----------------------------------------------------------------------------

export interface DurationScale {
  /** `'0ms'`. Also the value AAA collapses every easing to when reduced-motion is requested. */
  instant: CssDuration
  fast: CssDuration
  base: CssDuration
  slow: CssDuration
}

export interface EasingScale {
  standard: CssEasing
  in: CssEasing
  out: CssEasing
  inOut: CssEasing
  spring: CssEasing
}

export interface MotionTokens {
  duration: DurationScale
  easing: EasingScale
}

// -----------------------------------------------------------------------------
// Effects (cross-cutting visual treatments some engines need)
// -----------------------------------------------------------------------------

export interface BackdropBlurScale {
  /** `'none'` — Flat / Material / Editorial / AAA set every slot to this. */
  none: CssBackdropFilter
  sm: CssBackdropFilter
  md: CssBackdropFilter
  lg: CssBackdropFilter
}

export interface FocusRing {
  width: CssLength
  /** Offset from the focused element's edge. */
  offset: CssLength
  color: CssColor
  /** `'solid'` = standard ring; `'glow'` = Tron-style blur halo; `'double'` = AAA. */
  style: 'solid' | 'glow' | 'double'
}

export interface EffectTokens {
  backdropBlur: BackdropBlurScale
  focusRing: FocusRing
}

// -----------------------------------------------------------------------------
// The contract
// -----------------------------------------------------------------------------

/**
 * The complete semantic token set. Every palette in `FINALIZED-PALETTES.md`
 * implements this shape exactly. Adding a slot is a breaking change for
 * every palette — see `tokens/00-token-contract.md`.
 */
export interface SemanticTokens {
  color: ColorTokens
  space: SpaceScale
  radius: RadiusScale
  borderWidth: BorderWidthScale
  elevation: ElevationScale
  typography: TypographyTokens
  motion: MotionTokens
  effect: EffectTokens
}

/**
 * Convenience: the engines that palettes plug into. Listed here so the
 * compiler can catch typos in palette metadata once palettes land.
 */
export type Engine =
  | 'flat'
  | 'material'
  | 'neubrutalism'
  | 'glassmorphism'
  | 'neumorphism'
  | 'claymorphism'
  | 'skeuomorphism'

/**
 * Palette metadata wrapper. The values themselves live in `tokens` and must
 * fill `SemanticTokens` exactly — no extras, no omissions.
 */
export interface Palette {
  id: string
  name: string
  engine: Engine
  /** `'pass'` = WCAG AA at default sizes; `'experimental'` = documented caveats. */
  a11y: 'pass' | 'experimental'
  tokens: SemanticTokens
}
