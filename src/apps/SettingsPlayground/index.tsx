import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { palettes, type PaletteId } from '../../../palettes'
import { createStore, type StoreMode } from '../../../storage/store.contract'
import { STORE_MODE_KEY, useStore, useSwitchableStore } from '../../app/StoreContext'
import { useTheme } from '../../app/ThemeProvider'
import { useStoreValue } from '../../app/useStoreValue'
import { EmptyState } from '../../components/EmptyState/EmptyState'
import { Modal } from '../../components/Modal/Modal'
import { PropertyInspector, type ComputedConstraint, type PropertyField } from '../../components/PropertyInspector/PropertyInspector'
import { Segmented } from '../../components/Segmented/Segmented'
import { Select, type SelectOption } from '../../components/Select/Select'
import { Sidebar, type SidebarGroup } from '../../components/Sidebar/Sidebar'
import { Slider } from '../../components/Slider/Slider'
import { Tabs } from '../../components/Tabs/Tabs'
import { Toggle } from '../../components/Toggle/Toggle'
import { Tooltip } from '../../components/Tooltip/Tooltip'
import {
  buildCatalog,
  sampleEasing,
  type CatalogTab,
  type TokenGroupId,
  type TokenSlot,
} from './tokenCatalog'
import './SettingsPlayground.css'

const LAYOUT_KEY = 'settings:layout'
type LayoutPrefs = {
  sidebarWidth?: number
  activeTab?: TokenGroupId
  collapsedSections?: string[]
  motionScalePreview?: number
}

type A11yFilter = 'pass' | 'experimental' | 'all'

const GROUP_A_IDS: PaletteId[] = [
  'flat-classic',
  'material',
  'neubrutalism',
  'glassmorphism',
  'neumorphism',
  'claymorphism',
  'skeuomorphism',
]
const GROUP_B_IDS: PaletteId[] = ['tron-dark-neon', 'editorial', 'aaa']

const TOKEN_QUERY_KEY = 'token'
const PALETTE_QUERY_KEY = 'palette'

function readQuery(key: string): string | null {
  if (typeof window === 'undefined') return null
  return new URL(window.location.href).searchParams.get(key)
}

function writeQuery(key: string, value: string | null): void {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  if (value == null) url.searchParams.delete(key)
  else url.searchParams.set(key, value)
  window.history.replaceState({}, '', url.toString())
}

function buildPaletteOptions(filter: A11yFilter): SelectOption[] {
  const matches = (id: PaletteId): boolean => {
    if (filter === 'all') return true
    const p = palettes[id]
    return filter === 'pass' ? p.a11y === 'pass' : p.a11y === 'experimental'
  }
  const out: SelectOption[] = []
  for (const id of GROUP_A_IDS) {
    if (!matches(id)) continue
    out.push({
      value: id,
      label: palettes[id].name,
      group: 'Group A — engine families',
      description: `${palettes[id].engine} · ${palettes[id].a11y}`,
    })
  }
  for (const id of GROUP_B_IDS) {
    if (!matches(id)) continue
    out.push({
      value: id,
      label: palettes[id].name,
      group: 'Group B — engine re-skins',
      description: `${palettes[id].engine} · ${palettes[id].a11y}`,
    })
  }
  return out
}

export function SettingsPlayground() {
  const store = useStore()
  const switchable = useSwitchableStore()
  const { paletteId, setPaletteId } = useTheme()

  const { value: storedMode } = useStoreValue<StoreMode>(STORE_MODE_KEY, 'memory')
  const persistOn = storedMode === 'local'
  const [persistSaving, setPersistSaving] = useState<boolean>(false)

  const { value: layout, setValue: writeLayout } = useStoreValue<LayoutPrefs>(LAYOUT_KEY, {})
  const layoutVal: LayoutPrefs = layout ?? {}

  const [a11yFilter, setA11yFilter] = useState<A11yFilter>('all')
  const [activeTab, setActiveTab] = useState<TokenGroupId>(layoutVal.activeTab ?? 'color')
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(() => readQuery(TOKEN_QUERY_KEY))
  const [modalOpen, setModalOpen] = useState<boolean>(!!readQuery(TOKEN_QUERY_KEY))
  const [motionScalePreview, setMotionScalePreview] = useState<number>(layoutVal.motionScalePreview ?? 1)

  // Track which slot the inspector is editing; mirrored to URL for sharing.
  useEffect(() => {
    writeQuery(TOKEN_QUERY_KEY, selectedSlotId)
  }, [selectedSlotId])

  // Reflect palette in URL too — copy a settings URL and the palette comes with it.
  useEffect(() => {
    writeQuery(PALETTE_QUERY_KEY, paletteId)
  }, [paletteId])

  // Bootstrapping from URL: if a ?palette= param is present and a known palette, prefer it.
  const bootstrappedRef = useRef<boolean>(false)
  useEffect(() => {
    if (bootstrappedRef.current) return
    bootstrappedRef.current = true
    const fromUrl = readQuery(PALETTE_QUERY_KEY)
    if (fromUrl && fromUrl in palettes && fromUrl !== paletteId) {
      void setPaletteId(fromUrl as PaletteId)
    }
  }, [paletteId, setPaletteId])

  // Persist sticky layout prefs as they change. Debounced via the store contract:
  // every write is awaited, and the store dedups identical writes downstream.
  useEffect(() => {
    const next: LayoutPrefs = { ...layoutVal, activeTab, motionScalePreview }
    if (next.activeTab === layoutVal.activeTab && next.motionScalePreview === layoutVal.motionScalePreview) return
    void writeLayout(next)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, motionScalePreview])

  const catalog: CatalogTab[] = useMemo(() => buildCatalog(palettes[paletteId].tokens), [paletteId])

  // ---------- Persist-locally swap ----------
  const handlePersistToggle = useCallback(
    async (next: boolean) => {
      const mode: StoreMode = next ? 'local' : 'memory'
      setPersistSaving(true)
      try {
        // Swap first — migrating in-flight memory data into LocalStorage (or back).
        await switchable.swap(createStore(mode))
        // Then record the mode under the contract's privileged key.
        await switchable.set<StoreMode>(STORE_MODE_KEY, mode)
      } finally {
        setPersistSaving(false)
      }
    },
    [switchable],
  )

  // ---------- Selection / Tab tracking from sidebar / URL ----------
  const allSlots = useMemo(() => catalog.flatMap(c => c.sections.flatMap(s => s.slots)), [catalog])
  const selectedSlot: TokenSlot | null = selectedSlotId
    ? allSlots.find(s => s.id === selectedSlotId) ?? null
    : null

  const paletteOptions = useMemo(() => buildPaletteOptions(a11yFilter), [a11yFilter])
  const noPalettesMatch = paletteOptions.length === 0


  // ---------- Inspector fields ----------
  const tokens = palettes[paletteId].tokens

  const inspectorFields: PropertyField[] = useMemo(() => {
    if (!selectedSlot) return []
    if (selectedSlot.id === 'effect.focusRing.style') {
      return [
        {
          key: 'style',
          label: 'style',
          type: 'select',
          options: ['solid', 'glow', 'double'],
          defaultValue: tokens.effect.focusRing.style,
        },
        {
          key: 'width',
          label: 'width',
          type: 'text',
          unit: 'px',
          defaultValue: tokens.effect.focusRing.width,
        },
        {
          key: 'offset',
          label: 'offset',
          type: 'text',
          unit: 'px',
          defaultValue: tokens.effect.focusRing.offset,
        },
        {
          key: 'color',
          label: 'color',
          type: 'text',
          defaultValue: tokens.effect.focusRing.color,
        },
      ]
    }
    return [
      { key: 'value', label: 'value', type: 'text', defaultValue: selectedSlot.value },
      { key: 'cssVar', label: 'css var', type: 'text', defaultValue: selectedSlot.cssVar },
      { key: 'group', label: 'group', type: 'text', defaultValue: selectedSlot.group },
    ]
  }, [selectedSlot, tokens])

  // Constrained-inspector demo: pick focus-ring style=glow and width becomes derived/disabled.
  const computeConstraints = useCallback(
    (values: Record<string, unknown>): Record<string, ComputedConstraint> => {
      if (!selectedSlot || selectedSlot.id !== 'effect.focusRing.style') return {}
      const style = values.style as string
      if (style === 'glow') {
        return { width: { disabled: true, valueOverride: '(derived — glow halo radius)' } }
      }
      return {}
    },
    [selectedSlot],
  )

  // Local "demo" overrides so the user can interact with the inspector without
  // mutating the palette source. Resets when the selected slot changes.
  const [inspectorOverrides, setInspectorOverrides] = useState<Record<string, unknown>>({})
  useEffect(() => {
    setInspectorOverrides({})
  }, [selectedSlotId])

  const inspectorSelection: Array<Record<string, unknown>> = selectedSlot
    ? [
        {
          ...(selectedSlot.id === 'effect.focusRing.style'
            ? {
                style: tokens.effect.focusRing.style,
                width: tokens.effect.focusRing.width,
                offset: tokens.effect.focusRing.offset,
                color: tokens.effect.focusRing.color,
              }
            : {
                value: selectedSlot.value,
                cssVar: selectedSlot.cssVar,
                group: selectedSlot.group,
              }),
          ...inspectorOverrides,
        },
      ]
    : []

  const handleInspectorChange = useCallback((key: string, value: unknown) => {
    setInspectorOverrides(prev => ({ ...prev, [key]: value }))
  }, [])

  // ---------- Sidebar (search variant) ----------
  // The Sidebar owns its own query input; we pass the full slot list and
  // let the component filter against label + keywords.
  const sidebarGroups: SidebarGroup[] = useMemo(() => {
    const byGroup = new Map<TokenGroupId, TokenSlot[]>()
    for (const s of allSlots) {
      const list = byGroup.get(s.group) ?? []
      list.push(s)
      byGroup.set(s.group, list)
    }
    return Array.from(byGroup.entries()).map(([gid, slots]) => ({
      id: gid,
      label: gid,
      items: slots.map(s => ({
        id: s.id,
        label: s.label,
        keywords: [s.description, s.id],
        onSelect: () => {
          setActiveTab(s.group)
          setSelectedSlotId(s.id)
        },
      })),
    }))
  }, [allSlots])

  // ---------- Token tabs ----------
  const tabItems = catalog.map(c => ({ id: c.id, label: c.label }))

  const handleSelectSlot = useCallback(
    (slot: TokenSlot, openModal: boolean) => {
      setSelectedSlotId(slot.id)
      setActiveTab(slot.group)
      if (openModal) setModalOpen(true)
    },
    [],
  )

  const closeModal = useCallback(() => {
    setModalOpen(false)
    setSelectedSlotId(null)
  }, [])

  // ---------- Motion-scale preview Slider (curve variant) ----------
  const baseEasing = tokens.motion.easing.standard
  const easingSamples = useMemo(() => sampleEasing(baseEasing, 40), [baseEasing])

  return (
    <div className="settings-app">
      <header className="settings-app__header">
        <div className="settings-app__title-block">
          <h2 className="settings-app__title">Settings playground</h2>
          <p className="settings-app__caption">
            Browse every palette, see every component in it, flip every contract
            token. This is the only surface that owns the persistence and theme
            chrome — every other app sees a stable Store.
          </p>
        </div>
        <div className="settings-app__controls">
          <div className="settings-app__control" style={{ minWidth: '14rem' }}>
            <Select
              variant="dropdown"
              label="Palette"
              value={paletteId}
              onChange={v => { void setPaletteId(v as PaletteId) }}
              options={paletteOptions}
            />
          </div>
          <div className="settings-app__control">
            <Toggle
              variant="saving"
              label="Persist locally"
              checked={persistOn}
              saving={persistSaving}
              onLabel="On"
              offLabel="Off"
              onCheckedChange={handlePersistToggle}
            />
          </div>
          <div className="settings-app__control">
            <span className="settings-app__control-label">A11y filter</span>
            <Segmented
              variant="animated"
              ariaLabel="A11y filter"
              value={a11yFilter}
              onValueChange={v => setA11yFilter(v as A11yFilter)}
              items={[
                { value: 'pass', label: 'Pass' },
                { value: 'experimental', label: 'Exp' },
                { value: 'all', label: 'All' },
              ]}
            />
          </div>
        </div>
      </header>

      {noPalettesMatch ? (
        <EmptyState
          variant="illustrated"
          title="No palette matches that filter"
          description={`No palette satisfies "${a11yFilter}". Switch to "All" to see every aesthetic.`}
          primaryAction={{ label: 'Show all', onClick: () => setA11yFilter('all') }}
        />
      ) : (
        <div className="settings-app__grid">
          <aside className="settings-app__sidebar">
            <Sidebar
              variant="search"
              ariaLabel="Token catalog"
              searchPlaceholder="Filter tokens…"
              groups={sidebarGroups}
              activeId={selectedSlotId ?? undefined}
              onActiveChange={() => { /* item.onSelect handles route */ }}
            />
          </aside>

          <section className="settings-app__stage">
            <Tabs
              variant="overflow"
              ariaLabel="Token groups"
              tabs={tabItems}
              value={activeTab}
              onValueChange={v => setActiveTab(v as TokenGroupId)}
              renderPanel={tabId => {
                const c = catalog.find(t => t.id === tabId)
                if (!c) return null
                return (
                  <div className="settings-app__tab">
                    {c.sections.map(section => (
                      <section key={section.label} className="settings-app__section">
                        <h3 className="settings-app__section-label">{section.label}</h3>
                        <div className="settings-app__slot-grid">
                          {section.slots.map(slot => (
                            <Tooltip
                              key={slot.id}
                              variant="rich"
                              side="top"
                              title={slot.id}
                              content={slot.description}
                              pinnable
                            >
                              <button
                                type="button"
                                className={[
                                  'settings-app__slot',
                                  selectedSlotId === slot.id && 'is-selected',
                                ].filter(Boolean).join(' ')}
                                onClick={() => handleSelectSlot(slot, false)}
                                onDoubleClick={() => handleSelectSlot(slot, true)}
                              >
                                <SlotPreview slot={slot} />
                                <span className="settings-app__slot-label">{slot.label}</span>
                                <span className="settings-app__slot-value" title={slot.value}>{slot.value}</span>
                              </button>
                            </Tooltip>
                          ))}
                        </div>
                      </section>
                    ))}

                    {tabId === 'motion' && (
                      <section className="settings-app__section">
                        <h3 className="settings-app__section-label">Preview curve & scale</h3>
                        <div className="settings-app__motion-preview">
                          <Slider
                            variant="curve"
                            label={`Easing: standard (${baseEasing})`}
                            value={motionScalePreview}
                            min={0.25}
                            max={3}
                            step={0.25}
                            curve={easingSamples}
                            onChange={setMotionScalePreview}
                            formatValue={n => `${n}× duration`}
                          />
                          <p className="settings-app__hint">
                            Scrub the slider to preview how this palette's motion
                            feels at different speeds. The track itself is a tiny
                            chart of the current easing curve.
                          </p>
                        </div>
                      </section>
                    )}

                    {tabId === 'surface' && (
                      <section className="settings-app__section">
                        <h3 className="settings-app__section-label">Space scale preview</h3>
                        <Slider
                          variant="ticks"
                          label="Spacing step (token index)"
                          defaultValue={3}
                          min={0}
                          max={8}
                          step={1}
                          snap
                          formatValue={n => `space.${n}`}
                        />
                      </section>
                    )}
                  </div>
                )
              }}
            />
          </section>

          <aside className="settings-app__inspector">
            <PropertyInspector
              variant={selectedSlot?.id === 'effect.focusRing.style' ? 'constrained' : 'grouped'}
              groupKey={selectedSlot?.id ?? 'none'}
              fields={inspectorFields}
              selection={inspectorSelection}
              computeConstraints={computeConstraints}
              onChange={handleInspectorChange}
            />
            {selectedSlot && (
              <div className="settings-app__inspector-actions">
                <button
                  type="button"
                  className="settings-app__btn"
                  onClick={() => setModalOpen(true)}
                >
                  Open shareable view
                </button>
                <button
                  type="button"
                  className="settings-app__btn settings-app__btn--ghost"
                  onClick={() => { setSelectedSlotId(null) }}
                >
                  Clear selection
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* Route-bound modal — "show me Material's elevation.medium" is a shareable URL. */}
      <Modal
        variant="routed"
        routeKey={TOKEN_QUERY_KEY}
        routeValue={selectedSlotId ?? undefined}
        open={modalOpen && !!selectedSlot}
        onOpenChange={open => {
          if (!open) closeModal()
          else setModalOpen(true)
        }}
        title={selectedSlot ? `${palettes[paletteId].name} · ${selectedSlot.id}` : ''}
        description={selectedSlot?.description}
        primaryAction={{ label: 'Close', onClick: closeModal }}
      >
        {selectedSlot && (
          <div className="settings-app__modal-body">
            <div className="settings-app__modal-preview">
              <SlotPreview slot={selectedSlot} large />
            </div>
            <dl className="settings-app__modal-dl">
              <dt>Value</dt>
              <dd>{selectedSlot.value}</dd>
              <dt>CSS variable</dt>
              <dd><code>{selectedSlot.cssVar}</code></dd>
              <dt>Group</dt>
              <dd>{selectedSlot.group}</dd>
              <dt>Share URL</dt>
              <dd>
                <code>?{TOKEN_QUERY_KEY}={selectedSlot.id}&{PALETTE_QUERY_KEY}={paletteId}</code>
              </dd>
            </dl>
          </div>
        )}
      </Modal>

      <p className="settings-app__footer-note">
        State key prefix: <code>{store === switchable ? 'iux:' : 'memory:'}</code>.{' '}
        Toggling "Persist locally" calls <code>SwitchableStore.swap(createStore(next))</code>{' '}
        — every app subscribed to its keys re-fires automatically.
      </p>
    </div>
  )
}

function SlotPreview({ slot, large = false }: { slot: TokenSlot; large?: boolean }) {
  const cls = `settings-app__preview${large ? ' settings-app__preview--lg' : ''}`
  if (slot.group === 'color') {
    return <span className={cls} style={{ background: `var(${slot.cssVar})` }} aria-hidden="true" />
  }
  if (slot.id.startsWith('radius.')) {
    return (
      <span
        className={cls}
        style={{
          borderRadius: `var(${slot.cssVar})`,
          background: 'var(--color-surface-raised)',
          border: '1px solid var(--color-border-default)',
        }}
        aria-hidden="true"
      />
    )
  }
  if (slot.id.startsWith('elevation.')) {
    return (
      <span
        className={cls}
        style={{
          boxShadow: `var(${slot.cssVar})`,
          background: 'var(--color-surface-raised)',
          borderRadius: 'var(--radius-sm)',
        }}
        aria-hidden="true"
      />
    )
  }
  if (slot.id.startsWith('space.')) {
    return (
      <span className={cls} aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        <span
          style={{
            width: `var(${slot.cssVar})`,
            height: 'var(--space-3)',
            background: 'var(--color-intent-primary-bg)',
            display: 'inline-block',
          }}
        />
      </span>
    )
  }
  if (slot.id.startsWith('borderWidth.')) {
    return (
      <span
        className={cls}
        style={{
          borderStyle: 'solid',
          borderColor: 'var(--color-border-strong)',
          borderWidth: `var(${slot.cssVar})`,
          background: 'var(--color-surface-raised)',
        }}
        aria-hidden="true"
      />
    )
  }
  if (slot.group === 'motion' && slot.id.startsWith('motion.duration.')) {
    return (
      <span className={cls} aria-hidden="true" style={{ position: 'relative', overflow: 'hidden' }}>
        <span
          style={{
            position: 'absolute',
            top: 0, bottom: 0, left: 0,
            width: '30%',
            background: 'var(--color-intent-primary-bg)',
            animation: `settingsPulse var(${slot.cssVar}) var(--motion-easing-standard) infinite alternate`,
          }}
        />
      </span>
    )
  }
  if (slot.group === 'typography' && slot.id.startsWith('typography.role.')) {
    const role = slot.id.replace('typography.role.', '')
    return (
      <span className={cls} aria-hidden="true" style={{
        font: `var(--type-${role}-weight) var(--type-${role}-size) / var(--type-${role}-line-height) var(--type-${role}-family)`,
        letterSpacing: `var(--type-${role}-tracking)`,
        textTransform: `var(--type-${role}-text-transform)` as React.CSSProperties['textTransform'],
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        Aa
      </span>
    )
  }
  return <span className={cls} aria-hidden="true">·</span>
}
