import { ArrowDefs, DiaArrow, DiaGroup, DiaNode, DiaSvg } from './kit'

/**
 * How the code is organized right now — a module map grouped by
 * responsibility, with the relationships that matter:
 *  - the entry boots routing, which mounts the showcase surfaces
 *  - surfaces render components
 *  - components are wrapped by the theme pipeline
 *  - the theme pipeline and component CSS both draw from design data,
 *    with the token contract as the single source of truth.
 *
 * Hand-authored for now — a base for a later build-time generated version.
 */

const MARKER = 'hiw-arch-arrow'

const W = 860
const H = 600

// Chip geometry helpers.
const CHIP_H = 48

function chip(x: number, y: number, w: number, title: string, sub?: string, accent?: boolean) {
  return <DiaNode key={`${title}-${x}-${y}`} x={x} y={y} w={w} h={CHIP_H} title={title} sub={sub} accent={accent} />
}

export function CodeArchitecture() {
  return (
    <DiaSvg
      width={W}
      height={H}
      title="Code organization"
      desc="Modules grouped by responsibility: entry and routing, showcase surfaces, components, the theme pipeline, and the design data that feeds them."
    >
      <ArrowDefs id={MARKER} />

      {/* ENTRY */}
      <DiaGroup x={40} y={20} w={780} h={92} label="Entry">
        {chip(70, 48, 340, 'main.tsx', 'createRoot · BrowserRouter')}
        {chip(450, 48, 340, 'App.tsx', 'routes → surfaces')}
      </DiaGroup>

      {/* SURFACES */}
      <DiaGroup x={40} y={142} w={780} h={108} label="Surfaces">
        {chip(64, 182, 138, 'stories/', 'entry points')}
        {chip(212, 182, 138, 'showcase/', 'gallery + registry')}
        {chip(360, 182, 138, 'guides/', 'engine walkthroughs')}
        {chip(508, 182, 138, 'doctrine/', 'design rules')}
        {chip(656, 182, 138, 'apps/', 'demo apps')}
      </DiaGroup>

      {/* COMPONENTS + THEME PIPELINE */}
      <DiaGroup x={40} y={290} w={370} h={108} label="Components">
        {chip(64, 330, 322, 'src/components/*', '.tsx + .css (reads var(--…))')}
      </DiaGroup>
      <DiaGroup x={450} y={290} w={370} h={108} label="Theme pipeline">
        {chip(474, 330, 322, 'PaletteRoot · paletteToCssVars', 'tokens → CSS variables')}
      </DiaGroup>

      {/* DESIGN DATA */}
      <DiaGroup x={40} y={438} w={780} h={112} label="Design data">
        {chip(64, 480, 360, 'tokens/semantic.contract.ts', 'single source of truth', true)}
        {chip(440, 480, 354, 'palettes/*.ts', 'concrete token values per engine')}
      </DiaGroup>

      {/* Relationships */}
      <DiaArrow markerId={MARKER} x1={430} y1={112} x2={430} y2={142} />
      <DiaArrow markerId={MARKER} x1={225} y1={250} x2={225} y2={290} label="renders" labelX={262} labelY={276} />
      <DiaArrow
        markerId={MARKER}
        x1={410}
        y1={344}
        x2={450}
        y2={344}
        label="wraps"
        labelX={430}
        labelY={336}
      />
      <DiaArrow markerId={MARKER} x1={635} y1={438} x2={635} y2={398} label="feeds" labelX={672} labelY={420} />
      <DiaArrow markerId={MARKER} x1={225} y1={438} x2={225} y2={398} label="CSS reads tokens" labelX={225} labelY={424} />
    </DiaSvg>
  )
}
