import { forwardRef, type InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement>

const TextInput = forwardRef<HTMLInputElement, Props>(function TextInput(
  { className, type, ...rest },
  ref,
) {
  const classes = ['iux-input', className].filter(Boolean).join(' ')
  return <input ref={ref} type={type ?? 'text'} className={classes} {...rest} />
})

export default TextInput
