// ABOUTME: Resolve the DOM element overlay components should portal into.

/**
 * Resolve the DOM element overlay components should portal into.
 *
 * Overlays (Modal, Drawer, Toast, etc.) used to portal directly into
 * `document.body`, which sits *outside* every `.palette-root`. The portal
 * escapes the palette's CSS-var scope, so the dialog renders with every
 * `var(--color-*)`, `var(--space-*)`, `var(--type-*)` resolved to its bare
 * fallback (transparent / unset) — no scrim, no surface fill, no theming.
 *
 * Portaling into the first `.palette-root` in the document keeps the
 * overlay outside the originating story cell (so it still covers the
 * viewport via `position: fixed`) while inheriting the active palette's
 * tokens. The "first" root is the chrome palette wrapping the whole app,
 * which is exactly what the user sees painted around the page.
 */
// ABOUTME: getPortalTarget — a helper function.
export function getPortalTarget(): HTMLElement {
  if (typeof document === 'undefined') {
    // SSR fallback. Callers gate on `typeof document !== 'undefined'`
    // before invoking createPortal anyway; this branch keeps the type
    // honest without throwing during module evaluation.
    return null as unknown as HTMLElement
  }
  return (document.querySelector('.palette-root') as HTMLElement | null) ?? document.body
}
