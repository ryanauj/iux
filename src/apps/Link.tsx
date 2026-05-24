import { useCallback, type AnchorHTMLAttributes, type MouseEvent } from 'react'
import { getStickyParams, navigate } from './router'

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'> {
  /** Path to navigate to (`/apps/sports/teams/lakers`). Becomes `#<path>` in the URL. */
  to: string
  /** Optional query params to attach to the new hash. */
  params?: Record<string, string | undefined>
  /** Optional click handler; called before navigation. */
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
}

/**
 * Anchor element that drives the in-app hash router. Renders a real
 * `<a>` (so middle-click / cmd-click still open in new tabs through the
 * browser) but intercepts plain left-clicks to use the router.
 */
export function Link({ to, params, onClick, children, ...rest }: LinkProps) {
  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event)
      if (event.defaultPrevented) return
      if (event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      event.preventDefault()
      navigate(to, params)
    },
    [to, params, onClick],
  )

  // Mirror navigate()'s sticky-param merging so the rendered href (used
  // by middle-click and the browser's hover preview) matches the URL the
  // router will actually produce.
  const merged: Record<string, string | undefined> = { ...getStickyParams(), ...(params ?? {}) }
  const qs = Object.entries(merged)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&')

  const href = `#${to}${qs ? `?${qs}` : ''}`

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
