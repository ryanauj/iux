import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

type Direction = 'row' | 'column'
type Gap = 'xs' | 'sm' | 'md' | 'lg'
type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline'

interface Props extends HTMLAttributes<HTMLDivElement> {
  direction?: Direction
  gap?: Gap
  align?: Align
  wrap?: boolean
  children?: ReactNode
}

const GAP_VAR: Record<Gap, string> = {
  xs: 'var(--space-1)',
  sm: 'var(--space-2)',
  md: 'var(--space-3)',
  lg: 'var(--space-4)',
}

const ALIGN_VAL: Record<Align, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
}

export default function Stack({
  direction = 'column',
  gap = 'md',
  align,
  wrap,
  className,
  style,
  children,
  ...rest
}: Props) {
  const merged: CSSProperties = {
    display: 'flex',
    flexDirection: direction,
    gap: GAP_VAR[gap],
    alignItems: align ? ALIGN_VAL[align] : undefined,
    flexWrap: wrap ? 'wrap' : undefined,
    ...style,
  }
  return (
    <div
      className={['iux-stack', className].filter(Boolean).join(' ')}
      style={merged}
      {...rest}
    >
      {children}
    </div>
  )
}
