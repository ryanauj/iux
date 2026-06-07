// ABOUTME: PaletteRoot — a React component (theme).

import type { CSSProperties, ReactNode } from 'react'
import type { Palette } from '../../tokens/semantic.contract'
import { paletteToCssVars } from './paletteToCssVars'

interface PaletteRootProps {
  palette: Palette
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'article'
  /** Multiplier applied to every motion duration token. Defaults to 1×. */
  motionScale?: number
}

// ABOUTME: PaletteRoot — a React component.
/**
 * Applies a palette's tokens as CSS custom properties on a wrapping element.
 * Components inside read only `var(--...)` references; the palette is the
 * only thing that ever sees raw values.
 */
export function PaletteRoot({ palette, children, className, as: Tag = 'div', motionScale = 1 }: PaletteRootProps) {
  const vars = paletteToCssVars(palette.tokens, motionScale) as CSSProperties
  const cls = ['palette-root', className].filter(Boolean).join(' ')
  return (
    <Tag className={cls} style={vars} data-palette={palette.id}>
      {children}
    </Tag>
  )
}
