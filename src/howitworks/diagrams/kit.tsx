import type { ReactNode } from 'react'

/**
 * Minimal SVG primitives shared by the "How it works" diagrams.
 *
 * Everything paints with semantic token variables (`var(--color-...)`,
 * the type-role families) so the diagrams re-theme with the active palette
 * exactly like the rest of the site. These are intentionally tiny and
 * unopinionated — a base to grow styling/interactivity on later.
 *
 * SVG `<text>` does not wrap, so keep `title`/`sub` short.
 */

export interface DiaNodeProps {
  x: number
  y: number
  w: number
  h: number
  title: string
  sub?: string
  /** Paint with the primary intent (used for the highlighted result node). */
  accent?: boolean
}

export function DiaNode({ x, y, w, h, title, sub, accent }: DiaNodeProps) {
  const fill = accent ? 'var(--color-intent-primary-bg)' : 'var(--color-surface-raised)'
  const stroke = accent
    ? 'var(--color-intent-primary-border)'
    : 'var(--color-border-default)'
  const titleColor = accent
    ? 'var(--color-intent-primary-content)'
    : 'var(--color-content-primary)'
  const subColor = accent
    ? 'var(--color-intent-primary-content)'
    : 'var(--color-content-muted)'
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill={fill}
        stroke={stroke}
        strokeWidth={1.5}
      />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 5 : y + h / 2 + 5}
        textAnchor="middle"
        fontFamily="var(--type-label-family)"
        fontSize={15}
        fontWeight={600}
        fill={titleColor}
      >
        {title}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 14}
          textAnchor="middle"
          fontFamily="var(--type-code-family, var(--type-caption-family))"
          fontSize={11.5}
          fill={subColor}
        >
          {sub}
        </text>
      )}
    </g>
  )
}

export interface DiaGroupProps {
  x: number
  y: number
  w: number
  h: number
  label: string
  children?: ReactNode
}

export function DiaGroup({ x, y, w, h, label, children }: DiaGroupProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={12}
        fill="var(--color-surface-sunken)"
        stroke="var(--color-border-subtle)"
        strokeWidth={1}
        strokeDasharray="4 4"
      />
      <text
        x={x + 14}
        y={y + 20}
        fontFamily="var(--type-label-family)"
        fontSize={12}
        fontWeight={700}
        letterSpacing="0.08em"
        fill="var(--color-content-secondary)"
      >
        {label.toUpperCase()}
      </text>
      {children}
    </g>
  )
}

/** Per-svg arrowhead marker. Pass a unique `id` and reuse it on arrows. */
export function ArrowDefs({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={id}
        markerWidth={9}
        markerHeight={9}
        refX={7}
        refY={3}
        orient="auto"
        markerUnits="strokeWidth"
      >
        <path d="M0,0 L7,3 L0,6 Z" fill="var(--color-border-strong, var(--color-border-default))" />
      </marker>
    </defs>
  )
}

export interface DiaArrowProps {
  x1: number
  y1: number
  x2: number
  y2: number
  markerId: string
  label?: string
  /** Anchor for the label text; defaults to the line midpoint. */
  labelX?: number
  labelY?: number
}

export function DiaArrow({ x1, y1, x2, y2, markerId, label, labelX, labelY }: DiaArrowProps) {
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="var(--color-border-strong, var(--color-border-default))"
        strokeWidth={1.6}
        markerEnd={`url(#${markerId})`}
      />
      {label && (
        <text
          x={labelX ?? (x1 + x2) / 2}
          y={labelY ?? (y1 + y2) / 2 - 4}
          textAnchor="middle"
          fontFamily="var(--type-caption-family)"
          fontSize={11}
          fill="var(--color-content-secondary)"
        >
          {label}
        </text>
      )}
    </g>
  )
}

export interface DiaSvgProps {
  /** viewBox width. */
  width: number
  /** viewBox height. */
  height: number
  title: string
  desc: string
  children: ReactNode
}

/** Responsive, accessible SVG frame shared by every diagram. */
export function DiaSvg({ width, height, title, desc, children }: DiaSvgProps) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={title}
      preserveAspectRatio="xMidYMin meet"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <title>{title}</title>
      <desc>{desc}</desc>
      {children}
    </svg>
  )
}
