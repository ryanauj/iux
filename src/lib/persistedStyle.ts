// ABOUTME: persistedStyle — part of the lib area.

import { palettes, type PaletteId } from '../../palettes'
import type { Field } from '../components/DraggableControls/DraggableControls'
import { usePersistedPref } from './usePersistedPref'
import { isCustomPatternId, type StyleId } from './customPatterns'

// ABOUTME: SELECTED_STYLE_KEY — an exported value.
export const SELECTED_STYLE_KEY = 'iux-selected-style'
// ABOUTME: DEFAULT_SELECTED_STYLE — an exported value.
export const DEFAULT_SELECTED_STYLE: PaletteId = 'flat-classic'

const PALETTE_ID_SET = new Set<string>(Object.keys(palettes))

// ABOUTME: isPaletteId — a helper function.
export function isPaletteId(value: string): value is PaletteId {
  return PALETTE_ID_SET.has(value)
}

// ABOUTME: isStyleId — a helper function.
/**
 * Either a built-in palette id or a `custom:<slug>` pattern id. The selected
 * style and the palette picker accept both; `resolveStyle` (in
 * `customPatterns.ts`) turns either into a concrete `Palette`.
 */
export function isStyleId(value: string): value is StyleId {
  return isPaletteId(value) || isCustomPatternId(value)
}

// ABOUTME: useSelectedStyle — a React hook.
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
  return usePersistedPref<StyleId>(
    SELECTED_STYLE_KEY,
    DEFAULT_SELECTED_STYLE,
    isStyleId,
  )
}

// ABOUTME: readSelectedStyle — a helper function.
/**
 * Synchronous accessor for the persisted selected style. Used by surfaces
 * that resolve their initial chrome from the URL but want to fall back
 * to the user's last choice when the URL is bare. Returns the default
 * in non-browser contexts or when nothing valid is stored.
 */
export function readSelectedStyle(): StyleId {
  if (typeof window === 'undefined') return DEFAULT_SELECTED_STYLE
  try {
    const raw = localStorage.getItem(SELECTED_STYLE_KEY)
    if (raw !== null && isStyleId(raw)) return raw
  } catch {
    /* ignore */
  }
  return DEFAULT_SELECTED_STYLE
}

// ABOUTME: buildPaletteField — a helper function.
/**
 * Build the canonical "chrome" Field for `DraggableControls`. Tagged
 * with `kind: 'palette'` so both DraggableControls variants substitute
 * the dedicated `PalettePicker` (with tag search, pinned/active groups,
 * inline arrows) instead of the generic `Select` / `StripPopover`. The
 * `options` array is intentionally empty — PalettePicker reads the full
 * registry itself — so call sites no longer need to map `PALETTE_IDS`.
 */
export function buildPaletteField(
  value: StyleId,
  onChange: (next: StyleId) => void,
): Field {
  return {
    kind: 'palette',
    key: 'chrome',
    label: 'Palette',
    short: 'P',
    value,
    options: [],
    onChange: next => {
      if (isStyleId(next)) onChange(next)
    },
  }
}
