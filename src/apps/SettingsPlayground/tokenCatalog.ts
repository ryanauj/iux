import type { SemanticTokens } from '../../../tokens/semantic.contract'

export type TokenGroupId = 'color' | 'surface' | 'typography' | 'motion' | 'effect'

export interface TokenSlot {
  /** Stable id used in URLs, e.g. `color.surface.base`. */
  id: string
  group: TokenGroupId
  label: string
  description: string
  /** Stringified token value as it would render in CSS. */
  value: string
  /** CSS custom property the value resolves to (for preview swatches etc.). */
  cssVar: string
  /** Optional sub-group label inside the tab (used for headings in the grid). */
  section?: string
}

/**
 * Token slot catalog — flattens the typed `SemanticTokens` into a flat,
 * searchable list keyed by stable path ids. The Settings playground
 * renders slots from this list (grouped by tab) and ships each id in
 * URLs so a single token slot is shareable.
 *
 * Adding a token to the contract means adding a row here. This is the
 * one source of truth for "what slot exists?" in the playground.
 */
export const SLOT_DESCRIPTIONS: Record<string, string> = {
  // surface · color
  'color.surface.base': 'Page background — the bottom-most surface.',
  'color.surface.raised': 'Cards, panels — the default "above the page" surface.',
  'color.surface.sunken': 'Inputs, inset wells — reads as recessed.',
  'color.surface.overlay': 'Modals, popovers, drawers — paired with scrim.',
  'color.surface.scrim': 'Full-screen tint behind an overlay.',

  // content · color
  'color.content.primary': 'Body text on the resting surfaces.',
  'color.content.secondary': 'Supporting text, captions, meta.',
  'color.content.muted': 'Placeholder, disabled, decorative.',
  'color.content.inverse': 'Text that sits on saturated intent fills.',
  'color.content.link': 'Hyperlink color.',

  // border · color
  'color.border.subtle': 'Barely-there separators (table rows).',
  'color.border.default': 'Input borders, card outlines.',
  'color.border.strong': 'Emphasis borders (neubrutalism’s defining line).',
  'color.border.focus': 'Keyboard focus ring color.',

  // surface tab — space / radius / borderWidth / elevation / blur
  'space.0': 'Zero-spacing slot.',
  'space.1': 'Tight gap (1 step).',
  'space.2': 'Default inline gap.',
  'space.3': 'Default block gap.',
  'space.4': 'Section gap.',
  'space.5': 'Block padding.',
  'space.6': 'Wide section gap.',
  'space.7': 'Page-section padding.',
  'space.8': 'Page-level padding.',

  'radius.none': 'Square corner.',
  'radius.sm': 'Small radius — chips, inputs.',
  'radius.md': 'Default radius — cards, dropdowns.',
  'radius.lg': 'Large radius — modals, claymorphism gumdrops.',
  'radius.pill': 'Pill shape on rectangular elements.',
  'radius.full': 'Circles and circular crops.',

  'borderWidth.0': 'No border.',
  'borderWidth.hairline': 'Sub-pixel separator.',
  'borderWidth.thin': 'Default input border.',
  'borderWidth.thick': 'Emphasis border.',
  'borderWidth.heavy': 'Neubrutalism-defining heavy outline.',

  'elevation.flat': 'No shadow.',
  'elevation.low': 'Resting card lift; Neubrutalism puts its offset shadow here.',
  'elevation.medium': 'Hovered or active card.',
  'elevation.high': 'Dragged card; tooltip lift.',
  'elevation.overlay': 'Modal / drawer panel shadow.',

  // typography
  'typography.family.ui': 'UI font stack — body, controls, labels.',
  'typography.family.display': 'Display / headline stack.',
  'typography.family.mono': 'Monospace stack — code, tabular data.',
  'typography.role.display': 'Page-title display style.',
  'typography.role.title': 'Section title style.',
  'typography.role.heading': 'Heading style — h2/h3 surface.',
  'typography.role.subheading': 'Sub-heading / lede style.',
  'typography.role.body': 'Body text — the default.',
  'typography.role.label': 'Form labels and small caps.',
  'typography.role.caption': 'Captions, meta lines.',
  'typography.role.code': 'Inline code, HUD readouts.',

  // motion
  'motion.duration.instant': 'Zero ms. AAA and reduced-motion collapse every duration here.',
  'motion.duration.fast': 'Short transitions — micro-feedback.',
  'motion.duration.base': 'Default motion duration.',
  'motion.duration.slow': 'Deliberate, attention-grabbing motion.',
  'motion.easing.standard': 'Default easing curve.',
  'motion.easing.in': 'Accelerating — for entering elements.',
  'motion.easing.out': 'Decelerating — for exiting elements.',
  'motion.easing.inOut': 'Symmetric — for self-contained transitions.',
  'motion.easing.spring': 'Spring-style easing.',

  // effect
  'effect.backdropBlur.none': 'No backdrop blur — Flat / Material / Editorial / AAA.',
  'effect.backdropBlur.sm': 'Small blur radius for translucent surfaces.',
  'effect.backdropBlur.md': 'Default Glassmorphism blur.',
  'effect.backdropBlur.lg': 'Deep blur for heavy frosted glass.',
  'effect.focusRing.style': 'Focus-ring style: solid / glow / double. Glow makes width derived.',
  'effect.focusRing.width': 'Focus-ring width. Disabled when style = glow (computed from glow radius).',
  'effect.focusRing.offset': 'Distance from the focused element’s edge.',
  'effect.focusRing.color': 'Focus-ring color — paired with the border focus token.',
}

interface CatalogSection {
  label: string
  slots: TokenSlot[]
}

export interface CatalogTab {
  id: TokenGroupId
  label: string
  sections: CatalogSection[]
}

function makeSlot(
  group: TokenGroupId,
  id: string,
  label: string,
  value: string,
  cssVar: string,
  section?: string,
): TokenSlot {
  return {
    id,
    group,
    label,
    description: SLOT_DESCRIPTIONS[id] ?? id,
    value,
    cssVar,
    section,
  }
}

export function buildCatalog(tokens: SemanticTokens): CatalogTab[] {
  return [
    {
      id: 'color',
      label: 'Color',
      sections: [
        {
          label: 'Surface',
          slots: [
            makeSlot('color', 'color.surface.base', 'surface.base', tokens.color.surface.base, '--color-surface-base'),
            makeSlot('color', 'color.surface.raised', 'surface.raised', tokens.color.surface.raised, '--color-surface-raised'),
            makeSlot('color', 'color.surface.sunken', 'surface.sunken', tokens.color.surface.sunken, '--color-surface-sunken'),
            makeSlot('color', 'color.surface.overlay', 'surface.overlay', tokens.color.surface.overlay, '--color-surface-overlay'),
            makeSlot('color', 'color.surface.scrim', 'surface.scrim', tokens.color.surface.scrim, '--color-surface-scrim'),
          ],
        },
        {
          label: 'Content',
          slots: [
            makeSlot('color', 'color.content.primary', 'content.primary', tokens.color.content.primary, '--color-content-primary'),
            makeSlot('color', 'color.content.secondary', 'content.secondary', tokens.color.content.secondary, '--color-content-secondary'),
            makeSlot('color', 'color.content.muted', 'content.muted', tokens.color.content.muted, '--color-content-muted'),
            makeSlot('color', 'color.content.inverse', 'content.inverse', tokens.color.content.inverse, '--color-content-inverse'),
            makeSlot('color', 'color.content.link', 'content.link', tokens.color.content.link, '--color-content-link'),
          ],
        },
        {
          label: 'Border',
          slots: [
            makeSlot('color', 'color.border.subtle', 'border.subtle', tokens.color.border.subtle, '--color-border-subtle'),
            makeSlot('color', 'color.border.default', 'border.default', tokens.color.border.default, '--color-border-default'),
            makeSlot('color', 'color.border.strong', 'border.strong', tokens.color.border.strong, '--color-border-strong'),
            makeSlot('color', 'color.border.focus', 'border.focus', tokens.color.border.focus, '--color-border-focus'),
          ],
        },
      ],
    },
    {
      id: 'surface',
      label: 'Surface',
      sections: [
        {
          label: 'Space scale',
          slots: (['0', '1', '2', '3', '4', '5', '6', '7', '8'] as const).map(k =>
            makeSlot('surface', `space.${k}`, `space.${k}`, tokens.space[k], `--space-${k}`),
          ),
        },
        {
          label: 'Radius',
          slots: (['none', 'sm', 'md', 'lg', 'pill', 'full'] as const).map(k =>
            makeSlot('surface', `radius.${k}`, `radius.${k}`, tokens.radius[k], `--radius-${k}`),
          ),
        },
        {
          label: 'Border width',
          slots: (['0', 'hairline', 'thin', 'thick', 'heavy'] as const).map(k =>
            makeSlot('surface', `borderWidth.${k}`, `borderWidth.${k}`, tokens.borderWidth[k], `--border-width-${k}`),
          ),
        },
        {
          label: 'Elevation',
          slots: (['flat', 'low', 'medium', 'high', 'overlay'] as const).map(k =>
            makeSlot('surface', `elevation.${k}`, `elevation.${k}`, tokens.elevation[k].boxShadow, `--elevation-${k}`),
          ),
        },
      ],
    },
    {
      id: 'typography',
      label: 'Typography',
      sections: [
        {
          label: 'Family',
          slots: (['ui', 'display', 'mono'] as const).map(k =>
            makeSlot('typography', `typography.family.${k}`, `family.${k}`, tokens.typography.family[k], `--font-family-${k}`),
          ),
        },
        {
          label: 'Role',
          slots: (['display', 'title', 'heading', 'subheading', 'body', 'label', 'caption', 'code'] as const).map(r => {
            const t = tokens.typography.role[r]
            const sample = `${t.size} / ${t.weight}`
            return makeSlot('typography', `typography.role.${r}`, `role.${r}`, sample, `--type-${r}-size`)
          }),
        },
      ],
    },
    {
      id: 'motion',
      label: 'Motion',
      sections: [
        {
          label: 'Duration',
          slots: (['instant', 'fast', 'base', 'slow'] as const).map(k =>
            makeSlot('motion', `motion.duration.${k}`, `duration.${k}`, tokens.motion.duration[k], `--motion-duration-${k}`),
          ),
        },
        {
          label: 'Easing',
          slots: (['standard', 'in', 'out', 'inOut', 'spring'] as const).map(k =>
            makeSlot('motion', `motion.easing.${k}`, `easing.${k}`, tokens.motion.easing[k], `--motion-easing-${k}`),
          ),
        },
      ],
    },
    {
      id: 'effect',
      label: 'Effect',
      sections: [
        {
          label: 'Backdrop blur',
          slots: (['none', 'sm', 'md', 'lg'] as const).map(k =>
            makeSlot('effect', `effect.backdropBlur.${k}`, `backdropBlur.${k}`, tokens.effect.backdropBlur[k], `--effect-backdrop-blur-${k}`),
          ),
        },
        {
          label: 'Focus ring',
          slots: [
            makeSlot('effect', 'effect.focusRing.style', 'focusRing.style', tokens.effect.focusRing.style, '--effect-focus-ring-style'),
            makeSlot('effect', 'effect.focusRing.width', 'focusRing.width', tokens.effect.focusRing.width, '--effect-focus-ring-width'),
            makeSlot('effect', 'effect.focusRing.offset', 'focusRing.offset', tokens.effect.focusRing.offset, '--effect-focus-ring-offset'),
            makeSlot('effect', 'effect.focusRing.color', 'focusRing.color', tokens.effect.focusRing.color, '--color-focus-ring'),
          ],
        },
      ],
    },
  ]
}

/**
 * Easing curve sampler — returns a list of y values across [0, 1] driven by
 * a CSS easing string. The motion-scale Slider's curve variant renders this
 * as the track backdrop, so a user can see the easing they're picking before
 * any motion happens.
 *
 * Only resolves `cubic-bezier(...)`; named keywords return a linear sample.
 */
export function sampleEasing(easing: string, samples: number = 30): number[] {
  const cb = easing.match(/cubic-bezier\(([-\d.\s,]+)\)/)
  if (!cb) {
    const out: number[] = []
    for (let i = 0; i < samples; i++) out.push(i / (samples - 1))
    return out
  }
  const [x1, y1, x2, y2] = cb[1].split(',').map(s => Number(s.trim()))
  const out: number[] = []
  for (let i = 0; i < samples; i++) {
    const t = i / (samples - 1)
    // De-Casteljau on the y axis with cubic Bezier control points (0,0)→(x1,y1)→(x2,y2)→(1,1).
    // For visualization we sample y at parameter t directly — close enough at this resolution.
    const mt = 1 - t
    const y = 3 * mt * mt * t * y1 + 3 * mt * t * t * y2 + t * t * t
    out.push(y)
    // x1, x2 currently unused in the simple sampler but kept for future easing-aware mapping.
    void x1; void x2
  }
  return out
}
