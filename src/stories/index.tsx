// ABOUTME: Router entry point for the component stories surface: mounts ShowcasePage with the COMPONENTS registry, defaulting to the button entry and the "components" nav link.

import { COMPONENTS } from '../showcase/components'
import { ShowcasePage } from '../showcase/ShowcasePage'

// ABOUTME: Component stories surface: passes COMPONENTS to ShowcasePage so users can browse UI components per-component or per-palette, with feed/deck/grid layout options.
export function Stories() {
  return (
    <ShowcasePage
      entries={COMPONENTS}
      itemLabel="Component"
      kindLabel="components"
      title="iux — component stories"
      defaultComponent="button"
      activeNavId="components"
      infoText={
        <>
          Components implemented against the semantic token contract. The
          <em> per-component </em> view shows one component across every
          palette; the <em> per-palette </em> view shows every component
          inside one palette, with three responsive layouts to choose
          from. Use the floating controls (drag to reposition) to switch
          view, component, variant, palette, layout, and motion.
        </>
      }
    />
  )
}
