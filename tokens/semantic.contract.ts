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

/**
 * A CSS `background-image` value applied as an engine-level overlay on the
 * palette root. `'none'` for engines that don't paint one — only CRT-class
 * palettes set a non-`'none'` value (scanline gradient).
 */
export type CssBackgroundImage = string

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
  /**
   * Pixel-art bitmap-style stack. Only the Pixel-art engine routes any
   * `role.*` through this slot — every other palette aliases this to the
   * `ui` stack so the slot isn't load-bearing for them and the lint stays
   * happy. The Pixel-art palettes ship `'Press Start 2P', monospace` here
   * and document the OFL license in the palette README.
   */
  pixel: string
  /**
   * Hand-drawn / marker-feel stack. Only the Sketch engine routes any
   * `role.*` through this slot — every other palette aliases this to the
   * `ui` (sans) stack so the slot isn't load-bearing for them. The Sketch
   * palette ships `'Caveat'` / `'Patrick Hand'` here and documents the
   * OFL license in the palette README.
   */
  hand: string
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

/**
 * Trailing duration added to a state transition *after* its main duration
 * elapses — the CRT phosphor "decay" regime. Most palettes leave this at
 * `'0ms'`; the CRT engine sets it to ~80ms so that hovers, focus moves,
 * and toggles fade out instead of snapping. Engines collapse this to `'0ms'`
 * under `prefers-reduced-motion`.
 */
export type DecayDuration = CssDuration

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
  /**
   * Trailing duration the engine appends to state transitions (CRT decay).
   * `'0ms'` on every palette except the CRT phosphor variants. Engines must
   * collapse this to `'0ms'` under `prefers-reduced-motion`.
   */
  decay: DecayDuration
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

/**
 * Engine-level overlay painted on the palette root.
 *
 * Only CRT-class palettes set this to a non-`'none'` value (a scanline
 * gradient stack). Every other palette returns `'none'`, which is the
 * natural no-op when the root applies it as a `background-image`.
 *
 * The overlay is treated as decoration: it persists under
 * `prefers-reduced-motion` (it is not motion) but the engine must not
 * animate it. CRT palettes that want pulsing scanlines do that via
 * `effect.glow.*` instead.
 */
export interface OverlayEffect {
  /** `background-image` value applied at the palette root. `'none'` for most palettes. */
  image: CssBackgroundImage
  /** `background-size` paired with `image`. `'auto'` is the safe no-op. */
  size: CssLength
  /** Composite blend mode against the surface. `'normal'` is the safe no-op. */
  blend:
    | 'normal'
    | 'multiply'
    | 'screen'
    | 'overlay'
    | 'darken'
    | 'lighten'
    | 'soft-light'
    | 'hard-light'
}

/**
 * The phosphor-glow recipe. Used by the CRT engine to put a `text-shadow`
 * halo on body text and a `box-shadow` halo on focus / cursor / accents.
 *
 * Every non-CRT palette sets `radius = '0'` and `color = 'transparent'` —
 * components multiply by zero and the glow vanishes without per-engine
 * branching.
 */
export interface GlowEffect {
  /** Blur radius for the halo (`text-shadow` / `box-shadow` second value). */
  radius: CssLength
  /** Color of the halo. Use `'transparent'` to disable. */
  color: CssColor
  /**
   * Opacity multiplier the engine may use to tune the halo. `0` is the
   * safe no-op; `1` is full strength. CRT palettes set this to ~0.7.
   */
  intensity: number
}

/**
 * The **hard ink outline** recipe for the Cel-shaded engine — a solid
 * dark line drawn around every interactive element and every card edge.
 * The outline is what makes the engine read as cel-shaded (vs. just
 * flat): saturated fills are bounded by an always-visible ink stroke,
 * the same way a cel-animated frame is.
 *
 * Only Cel-shaded palettes set non-no-op values (`'#0a0a0a'` / `'3px'`);
 * every other palette returns `'transparent'` / `'0'`, so any engine
 * CSS that references the vars paints nothing.
 *
 * Components don't read these directly. The engine block in
 * `src/styles.css` reads them at `.palette-root[data-palette^='cel-shaded']`
 * to paint a literal `outline:` halo on raised surfaces and interactive
 * controls — guaranteeing the ink line is present regardless of which
 * `color.border.*` / `borderWidth.*` value a component happens to read.
 * The slot pattern matches `paperEdgeColor` / `paperEdgeWidth`: the
 * engine delivers its visual via a CSS rule on the root, and the slots
 * record the intent for future components that paint custom SVG paths
 * (e.g. an annotation layer, a `Divider` drawing an ink rule between
 * sections) and want to scale to the engine's outline weight.
 */
export interface OutlineEffect {
  color: CssColor
  width: CssLength
}

export interface EffectTokens {
  backdropBlur: BackdropBlurScale
  focusRing: FocusRing
  /** Engine-level decoration overlay (CRT scanlines). `'none'` elsewhere. */
  overlay: OverlayEffect
  /** Phosphor-glow halo recipe. Radius `'0'`, color `'transparent'` elsewhere. */
  glow: GlowEffect
  /**
   * Hard ink outline recipe. `transparent` / `'0'` on every non-cel-shaded
   * palette — any engine CSS that references these paints nothing.
   */
  outline: OutlineEffect
  /**
   * **Shadow style** signal — `'soft'` means the engine paints
   * gradient / blurred shadows (Material, Cardstock, Sketch, etc.);
   * `'hard'` means the engine paints two-tone cel-shading where a
   * single darker shape is offset from the surface with no blur (the
   * Cel-shaded engine's load-bearing visual). Only Cel-shaded palettes
   * set `'hard'`; every other palette sets `'soft'`. The slot is an
   * engine-only signal: components don't branch on it, but the engine
   * block in `src/styles.css` can read it to decide whether to paint
   * extra two-tone shading on top of `elevation.*`. The shadow recipe
   * itself still lives in `elevation.*` — this slot records intent,
   * the same way `effect.paperEdgeColor` records the cardstock cut-edge
   * intent that's actually delivered through `elevation.*`.
   */
  shadowStyle: 'soft' | 'hard'
  /**
   * Coarse layout step the engine snaps to (Pixel-art's `'4px'` or `'8px'`).
   * `'0'` on every other palette — a 0-px grid is the same as no snap, and
   * any rule that multiplies / divides this value collapses to a no-op.
   *
   * The Pixel-art engine reads this at the palette root to set
   * `image-rendering: pixelated` and to anchor space/radius scales to
   * integer multiples of the step. Components do not read this directly;
   * they consume `space.*` and `radius.*`, which the Pixel-art palettes
   * have already snapped to the grid.
   */
  pixelGrid: CssLength
  /**
   * How wobbly the engine's edges feel — a CSS length expressing the
   * **maximum displacement** an edge may take from its true position.
   * The Sketch engine sets this to a non-zero value (`'1.4px'`); every
   * other palette returns `'0'`.
   *
   * Components don't read this directly. The Sketch engine references a
   * fixed-strength SVG turbulence + displacement filter (defined in
   * `index.html`) at the palette root, tuned to ≈ this value. The slot
   * exists so future components (a hand-drawn `Chart` axis renderer,
   * an annotation layer) can scale custom SVG paths to the engine's
   * variance. Any rule that multiplies / divides this collapses to a
   * no-op on non-sketch palettes.
   */
  strokeVariance: CssLength
  /**
   * The **cut-edge color** for the Cardstock engine — a slightly darker
   * tint painted along the bottom/right of every raised surface to read
   * as the thickness of a piece of cut cardstock. The Cardstock palette
   * sets this to a low-alpha ink tint (`rgba(45, 53, 67, 0.18)` or so);
   * every other palette returns `'transparent'`, so any engine CSS that
   * references the var paints nothing.
   *
   * Components don't read this directly. The Cardstock engine bakes
   * the same value into its `elevation.*` shadow strings (because the
   * inset cut-edge is geometrically inseparable from the rest of the
   * shadow stack), and exposes the slot here so future paper-aware
   * components (a custom `Divider` that wants to draw a cut-edge between
   * sections, a `PageBreak` that fakes torn paper) can read the engine's
   * intended edge color directly. Any rule that references the var
   * collapses to a no-op on non-cardstock palettes — `transparent` makes
   * the rule paint nothing.
   */
  paperEdgeColor: CssColor
  /**
   * The **cut-edge thickness** for the Cardstock engine — a CSS length
   * matching the inset darker rule width baked into `elevation.*`. The
   * Cardstock palette sets this to `'1px'` or `'2px'`; every other
   * palette returns `'0'`, so any engine CSS that multiplies / divides
   * this collapses to a no-op.
   *
   * Components don't read this directly; the slot exists so future
   * paper-aware components can scale their own cut-edge effect to the
   * engine's edge width.
   */
  paperEdgeWidth: CssLength
  /**
   * **Atmospheric gradient** for the Aurora engine — a CSS
   * `background-image` value (stacked radial-gradients or a conic
   * gradient) painted at the palette root and very slowly animated. The
   * Aurora palette ships a multi-radial-gradient stack of green / purple /
   * teal luminance centers on a deep midnight base; every other palette
   * returns `'none'`, which is the natural no-op when the engine root
   * applies it as a `background-image`.
   *
   * The gradient itself is decoration; the animation is motion. The
   * Aurora engine block honors `prefers-reduced-motion` by freezing the
   * drift animation and anchoring the gradient at an intentionally-
   * composed static position — the static fallback is designed, not
   * "the moment the animation stopped." Components don't read this
   * directly; the engine paints it at the palette root.
   *
   * CSS var emits as `--effect-atmosphere-gradient`.
   */
  atmosphereGradient: CssBackgroundImage
  /**
   * **Per-surface luminance center** for the Aurora engine — a
   * translucent tint that the engine paints as a soft radial glow on
   * raised surfaces (cards, modal panels, drawer panels) so they read
   * as brighter regions of the same atmosphere rather than as bounded
   * rectangles. Default = inherit from parent, so nested surfaces pick
   * up the same luminance unless they override the var locally.
   *
   * Only Aurora sets a non-no-op value (a translucent near-white that
   * brightens the dark atmosphere underneath). Every other palette
   * returns `'transparent'`, so any engine CSS that references
   * `--luminance-center` paints nothing.
   *
   * Components don't consume this directly; the engine block in
   * `src/styles.css` reads it at `.palette-root[data-palette^='aurora']`
   * to paint a radial glow around raised surfaces and to intensify the
   * luminance toward interactive elements on hover/focus.
   *
   * CSS var emits as `--luminance-center`.
   */
  luminanceCenter: CssColor
  /**
   * **How surfaces are demarcated.** `'border'` everywhere except Aurora,
   * which sets `'luminance'`. The slot is an engine-only signal —
   * components don't branch on it — but it records intent: under
   * `'border'` surfaces are bounded rectangles with a visible stroke,
   * under `'luminance'` surfaces read by light density (brighter regions
   * of the same atmosphere) and borders are effectively transparent.
   *
   * The visual delivery happens through `color.border.*` (set to very
   * low-alpha values under `'luminance'`) and the Aurora engine's own
   * radial luminance glow on raised surfaces. The slot exists so future
   * surface-aware components (a custom `Separator` that wants to switch
   * from a hairline rule to a luminance gradient, an annotation layer
   * that needs to know whether to draw a hard edge) can read the
   * engine's intended surface model directly.
   *
   * This is the most load-bearing contract addition in the palette
   * surface group — every palette must declare it, and Aurora is the
   * only palette using `'luminance'` today. A second atmospheric engine
   * could plug into the same slot later.
   *
   * CSS var emits as `--surface-by`.
   */
  surfaceBy: 'border' | 'luminance'
  /**
   * **Horizontal grid unit** the Terminal-TUI engine snaps to. `'1ch'` on
   * TUI; `'0'` on every other palette. The slot exists so the engine can
   * pin component layout to integer character cells — padding, gaps, and
   * border widths all round to the nearest `--grid-unit-x`. On non-TUI
   * palettes the value is the zero-length no-op: any rule that
   * multiplies / divides this value collapses to a no-op and the
   * standard space-token scale carries the layout.
   *
   * Defining the slot on every palette is the discipline check — the
   * contract says every palette must declare every slot, and forcing
   * even Flat / Material / Aurora to opt out (`'0'`) makes the absence
   * audit-able. A second character-grid engine (vt100 register, terminal
   * banking) could plug into the same slot later.
   *
   * CSS var emits as `--grid-unit-x`.
   */
  gridUnitX: CssLength
  /**
   * **Vertical grid unit** the Terminal-TUI engine snaps to. `'1lh'` on
   * TUI; `'0'` on every other palette. Same shape as `gridUnitX`: the
   * engine uses it to pin row heights and vertical padding to integer
   * line cells; non-TUI palettes treat it as the zero-length no-op.
   *
   * CSS var emits as `--grid-unit-y`.
   */
  gridUnitY: CssLength
  /**
   * **Border-rendering mode** — `'css'` everywhere except Terminal-TUI,
   * which sets `'character'`. Under `'css'` borders render as standard
   * CSS strokes (the implicit behavior of every palette before this
   * slot existed). Under `'character'` raised surfaces (Card, Modal,
   * Table panels) hide their CSS border and paint the box outline using
   * actual box-drawing characters (`┌─┐│└─┘`), consuming a real
   * character cell. The token is the load-bearing seam: components read
   * it via container style queries (`@container palette style(...)`) to
   * switch their rendering, and the engine block in `src/styles.css`
   * pins the monospace font that makes the characters render at
   * cell-perfect width.
   *
   * The token forces every palette to declare its rendering mode
   * (`'css'`) even when it would otherwise have no opinion — exactly
   * the discipline the brief calls out as "the most load-bearing"
   * addition. A second character-grid engine (an explicit vt100 / DOS
   * register) could plug into the same slot later.
   *
   * CSS var emits as `--border-style`.
   */
  borderStyle: 'css' | 'character'
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
  | 'crt-phosphor'
  | 'pixel-art'
  | 'sketch'
  | 'cardstock'
  | 'cel-shaded'
  | 'cel-glass'
  | 'aurora'
  | 'terminal-tui'

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

// -----------------------------------------------------------------------------
// Runtime shape — for the palette validator
// -----------------------------------------------------------------------------

/**
 * Runtime mirror of `SemanticTokens` used by `scripts/validate-palettes.ts`.
 *
 * The TypeScript types above are the compile-time gate; this constant is the
 * runtime gate that fails CI when a palette omits a slot (or smuggles one
 * past `as any`). Keep this in sync with the interfaces — adding a token
 * means updating both. Leaf arrays list the expected child keys at that path.
 */
export const TOKEN_SHAPE = {
  color: {
    surface: ['base', 'raised', 'sunken', 'overlay', 'scrim'],
    content: ['primary', 'secondary', 'muted', 'inverse', 'link'],
    border: ['subtle', 'default', 'strong', 'focus'],
    intent: {
      primary: ['bg', 'content', 'border', 'bgHover', 'bgActive'],
      neutral: ['bg', 'content', 'border', 'bgHover', 'bgActive'],
      success: ['bg', 'content', 'border', 'bgHover', 'bgActive'],
      warning: ['bg', 'content', 'border', 'bgHover', 'bgActive'],
      danger: ['bg', 'content', 'border', 'bgHover', 'bgActive'],
      info: ['bg', 'content', 'border', 'bgHover', 'bgActive'],
    },
  },
  space: ['0', '1', '2', '3', '4', '5', '6', '7', '8'],
  radius: ['none', 'sm', 'md', 'lg', 'pill', 'full'],
  borderWidth: ['0', 'hairline', 'thin', 'thick', 'heavy'],
  elevation: {
    flat: ['boxShadow'],
    low: ['boxShadow'],
    medium: ['boxShadow'],
    high: ['boxShadow'],
    overlay: ['boxShadow'],
  },
  typography: {
    family: ['ui', 'display', 'mono', 'pixel', 'hand'],
    role: {
      display: ['family', 'size', 'weight', 'lineHeight', 'tracking'],
      title: ['family', 'size', 'weight', 'lineHeight', 'tracking'],
      heading: ['family', 'size', 'weight', 'lineHeight', 'tracking'],
      subheading: ['family', 'size', 'weight', 'lineHeight', 'tracking'],
      body: ['family', 'size', 'weight', 'lineHeight', 'tracking'],
      label: ['family', 'size', 'weight', 'lineHeight', 'tracking'],
      caption: ['family', 'size', 'weight', 'lineHeight', 'tracking'],
      code: ['family', 'size', 'weight', 'lineHeight', 'tracking'],
    },
  },
  motion: {
    duration: ['instant', 'fast', 'base', 'slow'],
    easing: ['standard', 'in', 'out', 'inOut', 'spring'],
    /**
     * Primitive-string leaf marker — `motion.decay` is a single CSS time
     * string, not an object. The validator treats `null` as "expect a
     * non-empty string at this path."
     */
    decay: null,
  },
  effect: {
    backdropBlur: ['none', 'sm', 'md', 'lg'],
    focusRing: ['width', 'offset', 'color', 'style'],
    overlay: ['image', 'size', 'blend'],
    glow: ['radius', 'color', 'intensity'],
    /**
     * Cel-shaded hard ink outline recipe. `'transparent'` / `'0'` on
     * every non-cel-shaded palette — any engine CSS that references
     * the vars paints nothing.
     */
    outline: ['color', 'width'],
    /**
     * Primitive-string leaf: `'soft' | 'hard'`. `'soft'` on every
     * non-cel-shaded palette — the slot is an engine-only signal
     * documenting whether the engine paints gradient shadows (`soft`)
     * or two-tone cel-shading (`hard`).
     */
    shadowStyle: null,
    /**
     * Primitive-string leaf: a CSS length (`'0'`, `'4px'`, `'8px'`).
     * `'0'` on every non-pixel palette.
     */
    pixelGrid: null,
    /**
     * Primitive-string leaf: a CSS length (`'0'`, `'1.4px'`). `'0'` on
     * every non-sketch palette — the engine CSS that references the
     * variance does nothing when the value is a zero length.
     */
    strokeVariance: null,
    /**
     * Primitive-string leaf: a CSS color string (`'transparent'`,
     * `'rgba(45,53,67,0.18)'`). `'transparent'` on every non-cardstock
     * palette — any engine CSS that references the cut-edge color paints
     * nothing.
     */
    paperEdgeColor: null,
    /**
     * Primitive-string leaf: a CSS length (`'0'`, `'1px'`, `'2px'`).
     * `'0'` on every non-cardstock palette — any engine CSS that
     * multiplies / divides this collapses to a no-op.
     */
    paperEdgeWidth: null,
    /**
     * Primitive-string leaf: a CSS `background-image` value (`'none'`,
     * a `radial-gradient(...)` stack, a `conic-gradient(...)`). `'none'`
     * on every non-aurora palette — any engine CSS that references the
     * gradient paints nothing.
     */
    atmosphereGradient: null,
    /**
     * Primitive-string leaf: a CSS color string (`'transparent'`,
     * `'rgba(255, 255, 255, 0.06)'`). `'transparent'` on every non-aurora
     * palette — any engine CSS that references the luminance center
     * paints nothing.
     */
    luminanceCenter: null,
    /**
     * Primitive-string leaf: `'border' | 'luminance'`. `'border'` on
     * every palette except Aurora, which sets `'luminance'`. The slot
     * is an engine-only signal documenting whether surfaces are bounded
     * by a hard stroke (`border`) or by light density (`luminance`).
     */
    surfaceBy: null,
    /**
     * Primitive-string leaf: a CSS length (`'0'`, `'1ch'`). `'0'` on
     * every non-TUI palette — the engine CSS that multiplies / divides
     * this value collapses to a no-op there. The Terminal-TUI palette
     * sets `'1ch'` so component layout snaps to integer character cells.
     */
    gridUnitX: null,
    /**
     * Primitive-string leaf: a CSS length (`'0'`, `'1lh'`). Same shape
     * as `gridUnitX` for the vertical axis. `'0'` on every non-TUI
     * palette; `'1lh'` on TUI.
     */
    gridUnitY: null,
    /**
     * Primitive-string leaf: `'css' | 'character'`. `'css'` on every
     * palette except Terminal-TUI, which sets `'character'`. Under
     * `'character'` raised surfaces (Card / Modal / Table) hide their
     * CSS border and paint a box-drawing-character outline instead.
     */
    borderStyle: null,
  },
} as const

/**
 * `null` is a primitive-string leaf — the value at this path must be a
 * non-empty string (e.g. `motion.decay = '80ms'`). Used when a slot
 * doesn't decompose into named child keys.
 */
export type TokenShapeNode =
  | readonly string[]
  | null
  | { readonly [key: string]: TokenShapeNode }
