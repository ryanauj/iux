// ABOUTME: Make a shared `?palette=<encoded>` link "stick".

import { useEffect } from 'react'
import { readHash, replaceParams } from '../apps/router'
import { decodePattern } from './patternCodec'
import {
  isCustomPatternId,
  uniqueCustomId,
  useCustomPatterns,
} from './customPatterns'

// ABOUTME: Make a shared `?palette=<encoded>` link "stick".
/**
 * Make a shared `?palette=<encoded>` link "stick".
 *
 * When the `palette` URL param carries an encoded custom pattern (not a bare
 * built-in id and not an already-known `custom:<slug>`), decode it, insert it
 * into the local pattern store, and rewrite the URL to the short
 * `custom:<slug>` form. After this runs, every surface resolves the pattern
 * by id exactly as if the recipient had saved it themselves — which is how
 * "localStorage stores the share links" works in practice.
 *
 * Mounted once near the app root; re-checks on every hash change.
 */
export function useSharedPatternHydration() {
  const [patterns, setPatterns] = useCustomPatterns()

  useEffect(() => {
    function hydrate() {
      const token = readHash().params.get('palette')
      if (!token) return
      // A bare built-in id or an already-stored custom id needs nothing.
      if (isCustomPatternId(token) || token in patterns) return
      const decoded = decodePattern(token)
      if (decoded?.kind !== 'custom') return
      const { base, name, overrides } = decoded.share
      const id = uniqueCustomId(name, patterns)
      setPatterns({ ...patterns, [id]: { id, name, base, overrides } })
      replaceParams({ palette: id })
    }
    hydrate()
    window.addEventListener('hashchange', hydrate)
    return () => window.removeEventListener('hashchange', hydrate)
  }, [patterns, setPatterns])
}
