import { palettes, type PaletteId } from '../../palettes'
import type { Field } from '../components/DraggableControls/DraggableControls'
import { usePersistedPref } from './usePersistedPref'

export const SELECTED_STYLE_KEY = 'iux-selected-style'
export const DEFAULT_SELECTED_STYLE: PaletteId = 'flat-classic'

const PALETTE_ID_SET = new Set<string>(Object.keys(palettes))

export function isPaletteId(value: string): value is PaletteId {
  return PALETTE_ID_SET.has(value)
}

/**
 * Site-wide "selected style" — the palette the user has most recently
 * picked anywhere on the site. Backed by localStorage so the choice
 * survives reload, and synced through `usePersistedPref`'s in-tab
 * pub/sub plus the browser's `storage` event so every surface (Stories,
 * Viz, Quiz, Apps, Engine guides) stays in lockstep without each one
 * round-tripping through its own URL contract.
 *
 * Surfaces that already encode their chrome in their URL keep doing so
 * — the URL is still the source of truth for a fresh navigation — but
 * picker changes should fan out to both the URL and this hook so the
 * next surface visited picks up the same style without needing the URL.
 */
export function useSelectedStyle() {
  return usePersistedPref<PaletteId>(
    SELECTED_STYLE_KEY,
    DEFAULT_SELECTED_STYLE,
    isPaletteId,
  )
}

/**
 * Synchronous accessor for the persisted selected style. Used by surfaces
 * that resolve their initial chrome from the URL but want to fall back
 * to the user's last choice when the URL is bare. Returns the default
 * in non-browser contexts or when nothing valid is stored.
 */
export function readSelectedStyle(): PaletteId {
  if (typeof window === 'undefined') return DEFAULT_SELECTED_STYLE
  try {
    const raw = localStorage.getItem(SELECTED_STYLE_KEY)
    if (raw !== null && isPaletteId(raw)) return raw
  } catch {
    /* ignore */
  }
  return DEFAULT_SELECTED_STYLE
}

/**
 * Build the canonical "chrome" Field for `DraggableControls`. Tagged
 * with `kind: 'palette'` so both DraggableControls variants substitute
 * the dedicated `PalettePicker` (with tag search, pinned/active groups,
 * inline arrows) instead of the generic `Select` / `StripPopover`. The
 * `options` array is intentionally empty — PalettePicker reads the full
 * registry itself — so call sites no longer need to map `PALETTE_IDS`.
 */
export function buildPaletteField(
  value: PaletteId,
  onChange: (next: PaletteId) => void,
): Field {
  return {
    kind: 'palette',
    key: 'chrome',
    label: 'Chrome',
    short: 'C',
    value,
    options: [],
    onChange: next => {
      if (isPaletteId(next)) onChange(next)
    },
  }
}
