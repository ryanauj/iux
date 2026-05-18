import type { InputHTMLAttributes, ReactNode } from 'react'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'children'> {
  label?: ReactNode
}

export default function Toggle({ label, className, ...rest }: Props) {
  return (
    <label className={['iux-toggle', className].filter(Boolean).join(' ')}>
      <span className='iux-toggle__control'>
        <input type='checkbox' className='iux-toggle__input' {...rest} />
        <span className='iux-toggle__track' aria-hidden='true'>
          <span className='iux-toggle__thumb' />
        </span>
      </span>
      {label !== undefined && <span className='iux-toggle__label'>{label}</span>}
    </label>
  )
}
