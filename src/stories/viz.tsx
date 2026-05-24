import { VISUALIZATIONS } from '../showcase/components'
import { ShowcasePage } from '../showcase/ShowcasePage'

export function Viz() {
  return (
    <ShowcasePage
      entries={VISUALIZATIONS}
      itemLabel="Visualization"
      kindLabel="visualizations"
      title="iux — visualization stories"
      defaultComponent="sparkline"
      activeNavId="visualizations"
      infoText={
        <>
          Visualizations rendered against the same semantic token contract
          as the components. The <em> per-visualization </em> view shows
          one viz across every palette; the <em> per-palette </em> view
          shows every viz inside one palette. See
          <code> FINALIZED-VISUALIZATIONS.md </code> for the visualization
          spec and tiering.
        </>
      }
    />
  )
}
