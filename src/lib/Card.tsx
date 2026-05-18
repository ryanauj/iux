import type { HTMLAttributes, ElementType, ReactNode } from 'react'

type Variant = 'flat' | 'elevated'

interface Props extends HTMLAttributes<HTMLElement> {
  variant?: Variant
  as?: ElementType
  children?: ReactNode
}

export default function Card({
  variant = 'flat',
  as,
  className,
  children,
  ...rest
}: Props) {
  const Tag = (as ?? 'div') as ElementType
  const classes = [
    'iux-card',
    `iux-card--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  )
}
