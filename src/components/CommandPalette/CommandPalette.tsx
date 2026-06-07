// ABOUTME: Keyboard-driven command palette overlay supporting flat list, grouped-with-recents, multi-step wizard, and natural-language agentic modes.

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { getPortalTarget } from '../../theme/portalTarget'
import './CommandPalette.css'

// ABOUTME: Layout/behaviour mode: 'flat' is a plain fuzzy-filtered list, 'grouped' adds Recent + group headers, 'wizard' prompts through multi-step CommandStep sequences, 'agentic' parses free text into a preview action list.
export type CommandPaletteVariant = 'flat' | 'grouped' | 'wizard' | 'agentic'

// ABOUTME: A single disambiguation step in a wizard-mode command sequence; type determines whether to render a select list, a free-text input, or a confirm prompt.
export interface CommandStep {
  id: string
  prompt: string
  type: 'select' | 'input' | 'confirm'
  options?: Array<{ value: string; label: string }>
}

// ABOUTME: A single command entry with an optional group, keyboard shortcut, icon, async run handler, and optional wizard steps for multi-step collection of arguments.
export interface Command {
  id: string
  label: string
  description?: string
  group?: string
  shortcut?: string
  icon?: ReactNode
  /** Run this command. `args` is populated when wizard steps are used. */
  run?: (args: Record<string, unknown>) => void | Promise<void>
  /** wizard variant: multi-step disambiguation before run. */
  steps?: CommandStep[]
}

// ABOUTME: Props for CommandPalette — controls the variant, open state (controlled or uncontrolled), command list, recent ids, NL parser, hotkey, and placeholder text.
/**
 * Accepts the `variant` to select behaviour mode, `commands` as the full set of entries,
 * optional `recents` (command ids shown first in 'grouped'), a `parseNl` function for
 * 'agentic' that converts free text to a preview command list, and `hotkey` (default Cmd/Ctrl+K)
 * to toggle open. Open state is controlled via `open`/`onOpenChange` or left uncontrolled.
 */
export interface CommandPaletteProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: CommandPaletteVariant
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  commands: Command[]
  recents?: string[]
  /** agentic: parse free text into a preview list of commands. */
  parseNl?: (text: string) => Command[]
  /** Default Cmd/Ctrl+K. Set to null to disable the hotkey. */
  hotkey?: string | null
  placeholder?: string
  /** Story-only: render inline without portaling to body. */
  inlineRender?: boolean
}

function fuzzyScore(query: string, label: string): number {
  if (!query) return 1
  const q = query.toLowerCase()
  const l = label.toLowerCase()
  if (l === q) return 1000
  if (l.startsWith(q)) return 500
  if (l.includes(q)) return 100
  // Char-by-char subsequence.
  let qi = 0
  for (let i = 0; i < l.length && qi < q.length; i++) if (l[i] === q[qi]) qi++
  return qi === q.length ? 10 : 0
}

// ABOUTME: Modal command palette rendered via a portal; fuzzy-scores commands on every keystroke, supports arrow-key navigation, wizard step-through, and an agentic NL-parse-then-run flow.
/**
 * Renders a full-screen scrim with a centred dialog containing a search input and a listbox.
 * On each keystroke the input is scored against command labels via a char-subsequence
 * algorithm; 'grouped' mode rebuilds sections with Recent at the top; 'wizard' mode
 * replaces the list with a per-step widget (select / input / confirm) that collects
 * `args` before calling `command.run(args)`; 'agentic' mode calls `parseNl` on Enter
 * to produce a preview list that can be bulk-run. The Escape key walks back through
 * wizard steps or agentic preview before closing. Portals to `getPortalTarget()` unless
 * `inlineRender` is set (story use-case).
 */
export function CommandPalette({
  variant = 'flat',
  open,
  defaultOpen = false,
  onOpenChange,
  commands,
  recents = [],
  parseNl,
  hotkey = 'cmd+k',
  placeholder,
  inlineRender = false,
}: CommandPaletteProps) {
  const isControlled = open !== undefined
  const [innerOpen, setInnerOpen] = useState<boolean>(defaultOpen)
  const isOpen = isControlled ? open! : innerOpen

  const setOpenState = useCallback((next: boolean) => {
    if (!isControlled) setInnerOpen(next)
    onOpenChange?.(next)
  }, [isControlled, onOpenChange])

  // ---------- Hotkey ----------
  useEffect(() => {
    if (!hotkey || inlineRender) return
    const onKey = (e: globalThis.KeyboardEvent) => {
      const needMeta = hotkey.includes('cmd') || hotkey.includes('ctrl')
      const key = hotkey.split('+').pop() ?? 'k'
      if (needMeta && !(e.metaKey || e.ctrlKey)) return
      if (e.key.toLowerCase() !== key.toLowerCase()) return
      e.preventDefault()
      setOpenState(!isOpen)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [hotkey, inlineRender, isOpen, setOpenState])

  // ---------- Query + selection ----------
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isOpen) return
    requestAnimationFrame(() => inputRef.current?.focus())
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      setQuery('')
      setActiveIndex(0)
      setWizard(null)
      setAgentic(null)
    }
  }, [isOpen])

  // ---------- Filter ----------
  const filtered = useMemo<Command[]>(() => {
    if (!query) return commands
    return commands
      .map(c => ({ c, s: fuzzyScore(query, c.label) }))
      .filter(x => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .map(x => x.c)
  }, [query, commands])

  // ---------- Grouped / recents ----------
  type Section = { label: string | null; items: Command[] }
  const sections = useMemo<Section[]>(() => {
    if (variant === 'grouped' && !query) {
      const out: Section[] = []
      const recentCmds = recents
        .map(id => commands.find(c => c.id === id))
        .filter(Boolean) as Command[]
      if (recentCmds.length > 0) out.push({ label: 'Recent', items: recentCmds })
      const order: string[] = []
      const buckets = new Map<string, Command[]>()
      for (const c of commands) {
        const g = c.group ?? 'Other'
        if (!buckets.has(g)) { order.push(g); buckets.set(g, []) }
        buckets.get(g)!.push(c)
      }
      for (const g of order) out.push({ label: g, items: buckets.get(g)! })
      return out
    }
    return [{ label: null, items: filtered }]
  }, [variant, query, commands, recents, filtered])

  const flatList = sections.flatMap(s => s.items)

  // ---------- Wizard mode ----------
  interface WizardState {
    commandId: string
    stepIndex: number
    args: Record<string, unknown>
    inputDraft: string
  }
  const [wizard, setWizard] = useState<WizardState | null>(null)
  const wizardCommand = wizard ? commands.find(c => c.id === wizard.commandId) : undefined
  const wizardStep = wizardCommand?.steps?.[wizard?.stepIndex ?? 0]

  // ---------- Agentic mode ----------
  interface AgenticState { preview: Command[] }
  const [agentic, setAgentic] = useState<AgenticState | null>(null)

  // ---------- Run ----------
  const runCommand = useCallback(async (c: Command, args: Record<string, unknown> = {}) => {
    if (variant === 'wizard' && c.steps && c.steps.length > 0) {
      setWizard({ commandId: c.id, stepIndex: 0, args: {}, inputDraft: '' })
      return
    }
    try {
      await c.run?.(args)
    } finally {
      setOpenState(false)
    }
  }, [variant, setOpenState])

  const advanceWizard = useCallback(async (value: unknown) => {
    if (!wizard || !wizardCommand) return
    const args = { ...wizard.args, [wizardStep?.id ?? 'arg']: value }
    const nextIdx = wizard.stepIndex + 1
    if (nextIdx >= (wizardCommand.steps?.length ?? 0)) {
      await wizardCommand.run?.(args)
      setWizard(null)
      setOpenState(false)
    } else {
      setWizard({ commandId: wizard.commandId, stepIndex: nextIdx, args, inputDraft: '' })
    }
  }, [wizard, wizardCommand, wizardStep, setOpenState])

  // ---------- Keyboard ----------
  const handleKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      if (wizard) { setWizard(null); return }
      if (agentic) { setAgentic(null); return }
      setOpenState(false); return
    }
    if (wizard) return // wizard handles its own keys via the focused widget
    if (agentic) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex(i => Math.min(flatList.length - 1, i + 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex(i => Math.max(0, i - 1))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      if (variant === 'agentic' && parseNl) {
        const preview = parseNl(query)
        setAgentic({ preview })
        return
      }
      const c = flatList[activeIndex]
      if (c) runCommand(c)
    }
  }

  // ---------- Render ----------
  if (!isOpen) return null

  const node = (
    <div className="iux-cmdk__scrim" onMouseDown={e => { if (e.target === e.currentTarget) setOpenState(false) }}>
      <div role="dialog" aria-label="Command palette" className={`iux-cmdk iux-cmdk--${variant}`} onKeyDown={handleKey}>
        {!wizard && !agentic && (
          <input
            ref={inputRef}
            type="text"
            className="iux-cmdk__input"
            value={query}
            placeholder={placeholder ?? (variant === 'agentic' ? 'Type intent, e.g. "share with team"' : 'Type a command…')}
            onChange={e => { setQuery(e.target.value); setActiveIndex(0) }}
            aria-autocomplete="list"
            aria-controls="iux-cmdk-listbox"
            aria-activedescendant={flatList[activeIndex] ? `cmdk-${flatList[activeIndex].id}` : undefined}
          />
        )}

        {!wizard && !agentic && (
          <ul id="iux-cmdk-listbox" role="listbox" className="iux-cmdk__list">
            {sections.map((sec, si) => (
              <li key={`sec-${si}`}>
                {sec.label && <div className="iux-cmdk__group-heading">{sec.label}</div>}
                <ul className="iux-cmdk__group">
                  {sec.items.map(c => {
                    const idx = flatList.indexOf(c)
                    const active = idx === activeIndex
                    return (
                      <li
                        key={c.id}
                        id={`cmdk-${c.id}`}
                        role="option"
                        aria-selected={active}
                        className={['iux-cmdk__item', active && 'is-active'].filter(Boolean).join(' ')}
                        onMouseEnter={() => setActiveIndex(idx)}
                        onMouseDown={e => { e.preventDefault(); runCommand(c) }}
                      >
                        {c.icon && <span className="iux-cmdk__item-icon" aria-hidden="true">{c.icon}</span>}
                        <div className="iux-cmdk__item-text">
                          <div className="iux-cmdk__item-label">{c.label}</div>
                          {c.description && <div className="iux-cmdk__item-description">{c.description}</div>}
                        </div>
                        {c.shortcut && <kbd className="iux-cmdk__kbd">{c.shortcut}</kbd>}
                      </li>
                    )
                  })}
                </ul>
              </li>
            ))}
            {flatList.length === 0 && (
              <li className="iux-cmdk__empty">No commands match "{query}"</li>
            )}
          </ul>
        )}

        {wizard && wizardCommand && wizardStep && (
          <WizardStep
            command={wizardCommand}
            step={wizardStep}
            value={wizard.inputDraft}
            onChange={v => setWizard(w => w ? { ...w, inputDraft: v } : w)}
            onCommit={advanceWizard}
            onBack={() => {
              if (wizard.stepIndex === 0) { setWizard(null) }
              else setWizard({ ...wizard, stepIndex: wizard.stepIndex - 1 })
            }}
          />
        )}

        {agentic && (
          <div className="iux-cmdk__agentic">
            <div className="iux-cmdk__agentic-header">Preview ({agentic.preview.length} action{agentic.preview.length === 1 ? '' : 's'})</div>
            <ol className="iux-cmdk__agentic-list">
              {agentic.preview.map((c, i) => (
                <li key={`${c.id}-${i}`}>
                  <span className="iux-cmdk__agentic-step">{i + 1}.</span> {c.label}
                </li>
              ))}
              {agentic.preview.length === 0 && <li className="iux-cmdk__empty">No actions inferred.</li>}
            </ol>
            <div className="iux-cmdk__agentic-actions">
              <button type="button" className="iux-cmdk__btn iux-cmdk__btn--ghost" onClick={() => setAgentic(null)}>Edit</button>
              <button
                type="button"
                className="iux-cmdk__btn iux-cmdk__btn--primary"
                disabled={agentic.preview.length === 0}
                onClick={async () => {
                  for (const c of agentic.preview) await c.run?.({})
                  setOpenState(false)
                }}
              >Run all</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  if (inlineRender) return node
  if (typeof document === 'undefined') return null
  return createPortal(node, getPortalTarget())
}

interface WizardStepViewProps {
  command: Command
  step: CommandStep
  value: string
  onChange: (v: string) => void
  onCommit: (value: unknown) => void
  onBack: () => void
}

function WizardStep({ command, step, value, onChange, onCommit, onBack }: WizardStepViewProps) {
  return (
    <div className="iux-cmdk__wizard">
      <div className="iux-cmdk__wizard-header">
        <span className="iux-cmdk__wizard-trail">{command.label}</span> · <span>{step.prompt}</span>
      </div>
      {step.type === 'input' && (
        <input
          autoFocus
          className="iux-cmdk__input"
          placeholder="Type a value…"
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') { e.preventDefault(); onCommit(value) }
            if (e.key === 'Escape') { e.preventDefault(); onBack() }
          }}
        />
      )}
      {step.type === 'select' && step.options && (
        <ul role="listbox" className="iux-cmdk__list">
          {step.options.map(o => (
            <li
              key={o.value}
              role="option"
              className="iux-cmdk__item"
              tabIndex={0}
              onClick={() => onCommit(o.value)}
              onKeyDown={e => { if (e.key === 'Enter') onCommit(o.value) }}
            >
              <div className="iux-cmdk__item-text">
                <div className="iux-cmdk__item-label">{o.label}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {step.type === 'confirm' && (
        <div className="iux-cmdk__wizard-confirm">
          <p>{step.prompt}</p>
          <div className="iux-cmdk__agentic-actions">
            <button type="button" className="iux-cmdk__btn iux-cmdk__btn--ghost" onClick={onBack}>Back</button>
            <button type="button" className="iux-cmdk__btn iux-cmdk__btn--primary" onClick={() => onCommit(true)}>Confirm</button>
          </div>
        </div>
      )}
    </div>
  )
}
