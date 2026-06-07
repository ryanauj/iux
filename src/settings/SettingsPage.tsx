// ABOUTME: SettingsPage — a React component (settings).

import { useState } from 'react'
import { PaletteRoot } from '../theme/PaletteRoot'
import { AppShell } from '../components/AppShell/AppShell'
import { APP_SHELL_NAV } from '../components/AppShell/navLinks'
import { useNavLayout } from '../components/AppShell/navLayouts'
import {
  DraggableControls,
  useControlsStyle,
  type Field,
} from '../components/DraggableControls/DraggableControls'
import { buildPaletteField, isStyleId, useSelectedStyle } from '../lib/persistedStyle'
import { resolveStyle, type StyleId } from '../lib/customPatterns'
import { useGroups } from '../lib/paletteTags'
import './settings.css'

// ABOUTME: SettingsPage — a React component.
/**
 * Home for rarely-used settings that don't belong in the everyday floating
 * controls. Today that's just "Reset default groups" — pulled out of the
 * palette picker's old Preferences disclosure so the picker stays focused
 * on choosing and grouping palettes. The page reuses the standard chrome
 * (palette + nav) so it looks like the rest of the showcase.
 */
export function SettingsPage() {
  const [controlsStyle, setControlsStyle] = useControlsStyle()
  const [selectedStyle, setSelectedStyle] = useSelectedStyle()
  const [navLayout] = useNavLayout()
  const [, groupsApi] = useGroups()
  const [resetNote, setResetNote] = useState<string | null>(null)

  const palette = resolveStyle(selectedStyle)

  const handlePaletteChange = (next: string) => {
    if (isStyleId(next)) setSelectedStyle(next as StyleId)
  }

  const fields: Field[] = [buildPaletteField(selectedStyle, handlePaletteChange)]

  const onResetDefaults = () => {
    if (!window.confirm('Reset all default palette groups to their starting members? Groups you created are kept.')) return
    groupsApi.resetDefaults()
    setResetNote('Default groups restored to their starting members.')
  }

  const brand = <h1 className="iux-settings__title">iux — settings</h1>

  return (
    <PaletteRoot palette={palette} as="section" motionScale={1}>
      <AppShell
        layoutId={navLayout}
        brand={brand}
        nav={APP_SHELL_NAV}
        activeId="settings"
      >
        <div className="iux-settings">
          <p className="iux-settings__intro">
            Rarely-used settings, kept out of the everyday floating controls.
          </p>

          <section className="iux-settings__section">
            <h2 className="iux-settings__section-title">Palette groups</h2>
            <p className="iux-settings__section-desc">
              Restore the built-in palette groups to their original members.
              Groups you created yourself are left untouched.
            </p>
            <button
              type="button"
              className="iux-settings__action"
              onClick={onResetDefaults}
            >
              Reset default groups
            </button>
            {resetNote && (
              <p className="iux-settings__note" role="status">
                {resetNote}
              </p>
            )}
          </section>
        </div>
      </AppShell>
      <DraggableControls
        style={controlsStyle}
        onStyleChange={setControlsStyle}
        fields={fields}
      />
    </PaletteRoot>
  )
}
