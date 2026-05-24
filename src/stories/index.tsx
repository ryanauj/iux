import { COMPONENTS } from '../showcase/components'
import { ShowcasePage } from '../showcase/ShowcasePage'

export function Stories() {
  return (
    <ShowcasePage
      entries={COMPONENTS}
      itemLabel="Component"
      kindLabel="components"
      title="iux — component stories"
      defaultComponent="button"
      navLinks={[
        { href: '#/viz', label: 'Visualizations →' },
        { href: '#/apps', label: 'Apps →' },
      ]}
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
