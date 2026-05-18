import type { InputHTMLAttributes, ReactNode } from 'react'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'children'> {
  label?: ReactNode
  labelClassName?: string
}

export default function Checkbox({ label, className, labelClassName, ...rest }: Props) {
  const inputClasses = ['iux-checkbox__input', className].filter(Boolean).join(' ')
  const labelClasses = ['iux-checkbox', labelClassName].filter(Boolean).join(' ')
  return (
    <label className={labelClasses}>
      <input type='checkbox' className={inputClasses} {...rest} />
      {label !== undefined && <span className='iux-checkbox__label'>{label}</span>}
    </label>
  )
}
