import type { ReactNode } from 'react'
import { ComponentLoadFlow } from './diagrams/ComponentLoadFlow'
import { CodeArchitecture } from './diagrams/CodeArchitecture'

/**
 * "How it works" — a section for visual explanations of the system itself,
 * at different levels of specificity.
 *
 * For now the diagrams are hand-authored (see the provisional note each page
 * renders). The intent is to grow this into build-time, deterministically
 * generated visualizations; the registry shape below is the seam new
 * diagrams plug into in the meantime.
 */

export type HowItWorksId = 'component-flow' | 'architecture'

export type HowItWorksPage = {
  id: HowItWorksId
  /** Short label for the picker. */
  label: string
  /** Small kicker above the title. */
  eyebrow: string
  title: string
  /** One- or two-sentence framing shown above the diagram. */
  blurb: string
  render: () => ReactNode
}

const HOWITWORKS_IDS = ['component-flow', 'architecture'] as const

export function isHowItWorksId(value: string): value is HowItWorksId {
  return (HOWITWORKS_IDS as readonly string[]).includes(value)
}

export const HOWITWORKS_PAGES: HowItWorksPage[] = [
  {
    id: 'component-flow',
    label: 'Component flow',
    eyebrow: 'How it works · 00',
    title: 'Loading a component & applying a style',
    blurb:
      'A single component, traced end to end: the render path takes it from the Vite entry down to a DOM node, while the style path turns palette tokens into the CSS variables that node reads. They meet at the final, cascade-resolved element.',
    render: () => <ComponentLoadFlow />,
  },
  {
    id: 'architecture',
    label: 'Architecture',
    eyebrow: 'How it works · 01',
    title: 'How the code is organized',
    blurb:
      'A module map grouped by responsibility. The entry boots routing, surfaces render components, the theme pipeline wraps them, and everything resolves back to the token contract as the single source of truth.',
    render: () => <CodeArchitecture />,
  },
]
