// ABOUTME: Router entry point that mounts the Doctrine page, wiring the /doctrine route to DoctrinePage.

import { DoctrinePage } from '../doctrine/DoctrinePage'

// ABOUTME: Thin wrapper that renders DoctrinePage at the /doctrine route; the router references this component rather than DoctrinePage directly.
export function Doctrine() {
  return <DoctrinePage />
}
