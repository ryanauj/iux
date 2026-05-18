import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'ghost' | 'danger'
type Size = 'sm' | 'md'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  type,
  ...rest
}: Props) {
  const classes = [
    'iux-button',
    `iux-button--${variant}`,
    `iux-button--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')
  return <button type={type ?? 'button'} className={classes} {...rest} />
}
