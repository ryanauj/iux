// ABOUTME: Router entry point for the visualization stories surface: mounts ShowcasePage with the VISUALIZATIONS registry, defaulting to the sparkline entry and the "visualizations" nav link.

import { VISUALIZATIONS } from '../showcase/components'
import { ShowcasePage } from '../showcase/ShowcasePage'

// ABOUTME: Visualization stories surface: passes VISUALIZATIONS to ShowcasePage so users can browse chart and graph types per-visualization or per-palette.
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
