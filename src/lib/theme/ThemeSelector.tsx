import { useId } from 'react'
import { THEMES, type ThemeId, isThemeId } from './themes'
import { useDemoTheme, useTheme } from './useTheme'

type Props =
  | { scope: 'global'; demoId?: never }
  | { scope: 'demo'; demoId: string }

export default function ThemeSelector(props: Props) {
  const id = useId()

  if (props.scope === 'global') {
    return <GlobalSelector id={id} />
  }
  return <DemoSelector id={id} demoId={props.demoId} />
}

function GlobalSelector({ id }: { id: string }) {
  const { globalTheme, setGlobalTheme } = useTheme()
  return (
    <label className='iux-theme-selector' htmlFor={id}>
      <span className='iux-theme-selector__label'>theme</span>
      <select
        id={id}
        className='iux-theme-selector__select'
        value={globalTheme}
        onChange={(e) => {
          if (isThemeId(e.target.value)) setGlobalTheme(e.target.value)
        }}
      >
        {THEMES.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
    </label>
  )
}

function DemoSelector({ id, demoId }: { id: string; demoId: string }) {
  const { override, setOverride } = useDemoTheme(demoId)
  const value: 'inherit' | ThemeId = override ?? 'inherit'
  return (
    <label className='iux-theme-selector' htmlFor={id}>
      <span className='iux-theme-selector__label'>theme</span>
      <select
        id={id}
        className='iux-theme-selector__select'
        value={value}
        onChange={(e) => {
          const v = e.target.value
          if (v === 'inherit') setOverride(null)
          else if (isThemeId(v)) setOverride(v)
        }}
      >
        <option value='inherit'>inherit (global)</option>
        {THEMES.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
    </label>
  )
}
