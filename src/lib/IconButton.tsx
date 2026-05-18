import type { ButtonHTMLAttributes } from 'react'

type Variant = 'ghost' | 'danger'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  'aria-label': string
}

export default function IconButton({
  variant = 'ghost',
  className,
  type,
  ...rest
}: Props) {
  const classes = [
    'iux-iconbutton',
    `iux-iconbutton--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')
  return <button type={type ?? 'button'} className={classes} {...rest} />
}
