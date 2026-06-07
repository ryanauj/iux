// ABOUTME: terminal-tui — part of the guides area.

import { useState } from 'react'
import { palette as terminalTui } from '../../../palettes/terminal-tui'
import { PaletteRoot } from '../../theme/PaletteRoot'
import { Button } from '../../components/Button/Button'
import { Card } from '../../components/Card/Card'
import { Toggle } from '../../components/Toggle/Toggle'
import { Slider } from '../../components/Slider/Slider'
import type { EngineGuideMeta } from './types'

type ElevationRung = 'flat' | 'low' | 'medium' | 'high' | 'overlay'
const RUNGS: ElevationRung[] = ['flat', 'low', 'medium', 'high', 'overlay']

function PhilosophyDemo() {
  return (
    <div className="iux-engine-demo__tui-host">
      <Card title="$ apt-get install" subtitle="A character cell is the layout unit." variant="static">
        <p>
          Mono everywhere. Square corners. One blue accent for
          interactive textual affordances, semantic red / amber / green
          reserved for status. The Card's outline isn't a CSS
          stroke — under this engine the corners are real box-drawing
          glyphs and the edges between them are 1px lines aligned to the
          character grid.
        </p>
        <div className="iux-engine-demo__cluster">
          <Button intent="primary">[ OK ]</Button>
          <Button intent="neutral">[ Cancel ]</Button>
        </div>
      </Card>
    </div>
  )
}

function SurfacesDemo() {
  const swatches: { label: string; cssVar: string }[] = [
    { label: 'surface.base',    cssVar: '--color-surface-base' },
    { label: 'surface.raised',  cssVar: '--color-surface-raised' },
    { label: 'surface.sunken',  cssVar: '--color-surface-sunken' },
    { label: 'surface.overlay', cssVar: '--color-surface-overlay' },
  ]
  return (
    <div className="iux-engine-demo__col">
      <div className="iux-engine-demo__swatch-grid">
        {swatches.map(s => (
          <div
            key={s.label}
            className="iux-engine-demo__swatch"
            style={{
              background: `var(${s.cssVar})`,
              borderColor: 'var(--color-border-default)',
              borderRadius: 'var(--radius-none)',
            }}
          >
            <span className="iux-engine-demo__swatch-label">{s.label}</span>
          </div>
        ))}
      </div>
      <p className="iux-engine-demo__caption">
        Four near-blacks within a handful of luminance steps. The engine
        deliberately keeps fills neutral — surfaces don't differentiate
        by colour, they differentiate by their box-drawing outline and by
        the cell-grid position. <code>effect.surfaceBy</code> is{' '}
        <code>border</code>, not <code>luminance</code>: light density is
        not how you know where a panel begins.
      </p>
    </div>
  )
}

function BordersDemo() {
  const [strength, setStrength] = useState<'subtle' | 'default' | 'strong'>('default')
  return (
    <div className="iux-engine-demo__col">
      <Toggle
        variant="segmented"
        label="Border strength"
        value={strength}
        onValueChange={v => setStrength(v as typeof strength)}
        options={[
          { value: 'subtle',  label: 'subtle' },
          { value: 'default', label: 'default' },
          { value: 'strong',  label: 'strong' },
        ]}
      />
      <div className="iux-engine-demo__tui-host">
        <Card title="── panel ──" subtitle="character corners on" variant="static">
          <p>
            The Card's outline under this engine is a hybrid: four corner
            glyphs (<code>┌ ┐ └ ┘</code>) painted by the component and
            four 1px CSS edge lines between them, sharing the same
            colour. <code>borderWidth.hairline</code>, <code>thin</code>,
            and <code>thick</code> are all 1 pixel — the width of{' '}
            <code>─</code> and <code>│</code> in any monospace face, so
            the corners and the edges align exactly.
          </p>
        </Card>
        <div
          className="iux-engine-demo__bordered"
          style={{
            borderColor: `var(--color-border-${strength})`,
            background: 'var(--color-surface-raised)',
            borderRadius: 'var(--radius-none)',
          }}
        >
          <p>
            <code>border.{strength}</code> on a plain bordered div —{' '}
            no character corners here. Strength rungs shift alpha
            (<code>0.22</code> / <code>0.46</code> / <code>0.72</code>),
            not width.
          </p>
        </div>
      </div>
      <p className="iux-engine-demo__caption">
        The character-corner trick lives behind a contract token —{' '}
        <code>effect.borderStyle = 'character'</code>. Card, Modal, and
        Table read it via <code>@container palette style()</code> queries;
        every other engine declares <code>'css'</code> and gets standard
        CSS borders. This is the single most load-bearing addition the
        engine makes.
      </p>
    </div>
  )
}

function ElevationDemo() {
  const [idx, setIdx] = useState(2)
  const rung = RUNGS[idx]
  return (
    <div className="iux-engine-demo__col">
      <Slider
        variant="ticks"
        label={`Elevation rung: ${rung}`}
        value={idx}
        min={0}
        max={RUNGS.length - 1}
        step={1}
        snap
        onChange={n => setIdx(Math.round(n))}
        formatValue={n => RUNGS[Math.round(n)]}
      />
      <div className="iux-engine-demo__tui-host">
        <div
          className="iux-engine-demo__elevation-card"
          style={{
            boxShadow: `var(--elevation-${rung})`,
            background: 'var(--color-surface-raised)',
            borderRadius: 'var(--radius-none)',
            borderWidth: 'var(--border-width-hairline)',
            borderStyle: 'solid',
            borderColor: 'var(--color-border-default)',
          }}
        >
          <strong>elevation.{rung}</strong>
          <p>
            Drag the slider through every rung and watch the card not
            move. Every <code>elevation.*</code> slot in this engine
            resolves to <code>boxShadow: 'none'</code> — there is no
            lift, no halo, no glow. Terminals don't cast shadows.
          </p>
        </div>
      </div>
      <p className="iux-engine-demo__caption">
        Vertical hierarchy is carried by border strength (the strong rung
        marks the focused or active panel) and by cell-grid position (a
        modal sits in the center of the viewport with a scrim behind it,
        a tooltip anchors below its trigger). The contract still ships
        five rungs because every component reads them; the engine just
        sets them all to the same value.
      </p>
    </div>
  )
}

function MotionDemo() {
  const [motionOn, setMotionOn] = useState(true)
  return (
    <div className="iux-engine-demo__col">
      <Toggle
        variant="switch"
        label="Motion"
        checked={motionOn}
        onCheckedChange={setMotionOn}
        onLabel="On"
        offLabel="Off"
      />
      <PaletteRoot
        palette={terminalTui}
        as="div"
        className="iux-engine-demo__nested"
        motionScale={motionOn ? 1 : 0}
      >
        <div className="iux-engine-demo__tui-host">
          <div className="iux-engine-demo__cluster">
            <Button intent="primary">[ Hover ]</Button>
            <Button intent="neutral">[ Hover ]</Button>
            <Button intent="info">[ Hover ]</Button>
          </div>
          <p className="iux-engine-demo__caption">
            Hover the buttons. Durations are the tightest in the
            showcase — <code>fast</code> 40&nbsp;ms, <code>base</code>{' '}
            80&nbsp;ms, <code>slow</code> 140&nbsp;ms — and every easing
            slot collapses to <code>linear</code>. Terminals snap; they
            don't ease. <code>motion.decay</code> stays at zero
            (that's the CRT regime, not this one). With motion off
            the durations zero out entirely and hovers re-colour the same
            frame the cursor enters.
          </p>
        </div>
      </PaletteRoot>
    </div>
  )
}

function IntentDemo() {
  return (
    <div className="iux-engine-demo__tui-host">
      <div className="iux-engine-demo__cluster">
        <Button intent="primary">[ Primary ]</Button>
        <Button intent="neutral">[ Neutral ]</Button>
        <Button intent="success">[ Success ]</Button>
        <Button intent="warning">[ Warning ]</Button>
        <Button intent="danger">[ Danger ]</Button>
        <Button intent="info">[ Info ]</Button>
      </div>
      <p className="iux-engine-demo__caption">
        Fills stay neutral on every intent — a low-alpha wash over the
        near-black field. Colour lives in the <em>border</em> and the{' '}
        <em>content</em>: red for <code>danger</code>, amber for{' '}
        <code>warning</code>, green for <code>success</code>, blue for{' '}
        <code>primary</code> / <code>info</code> (the same blue that marks
        textual affordances via <code>content.link</code>). This is the
        TUI rule: colour encodes state; the fill stays out of the way.
        Focus is a 1px outline in the same link-blue at zero offset — the
        box edge changes colour rather than gaining a halo, because a
        halo would have to bloom past the character cell.
      </p>
    </div>
  )
}

// ABOUTME: terminalTuiGuide — an exported value.
export const terminalTuiGuide: EngineGuideMeta = {
  engine: 'terminal-tui',
  name: 'Terminal / TUI',
  summary:
    "The character grid is the layout unit. Spacing is anchored to `ch` and `lh` so padding lands on whole character cells; every typography role is monospace; radius is zero on every slot; borders are 1-pixel hairlines that align with the box-drawing glyphs the engine puts at every Card / Modal / Table corner. Elevation collapses to no-shadow on every rung — terminals don't cast shadows — so hierarchy rides border strength and cell-grid position instead. Motion is linear and fast (under 150 milliseconds at the slow end), with no decay regime. Colour encodes state; fills stay neutral.",
  demoPalette: terminalTui,
  steps: [
    {
      id: 'philosophy',
      title: 'Philosophy',
      description: 'The character cell is a design token.',
      body: (
        <>
          <p>
            Terminal-TUI redefines the unit of layout itself. Where every
            other engine composes against pixels,{' '}
            <code>effect.gridUnitX = '1ch'</code> and{' '}
            <code>gridUnitY = '1lh'</code> pin spacing to integer character
            cells. Mono is the only typeface, radius is zero on every slot,
            and components read <code>effect.borderStyle = 'character'</code>{' '}
            via container style queries to swap CSS borders for real
            box-drawing glyphs at the corners.
          </p>
          <p>
            The engine shares DNA with CRT — same mono-on-dark aesthetic
            roots — but solves a different problem. CRT is nostalgic: the
            scanlines and the bloom exist to make the page look like a
            vacuum tube. TUI is functional: terminals are dense,
            keyboard-driven, and don't want anything decorative
            competing with the data. No glow, no scanline, no decay.
          </p>
        </>
      ),
      demo: <PhilosophyDemo />,
    },
    {
      id: 'surfaces',
      title: 'Surfaces',
      description: 'Near-black, neutral, differentiated by edge.',
      body: (
        <>
          <p>
            All four surface tokens sit within a handful of luminance steps
            of each other in the near-black range. The engine deliberately
            keeps fills neutral —{' '}
            <code>surface.raised</code> is the same colour as{' '}
            <code>surface.base</code>; <code>sunken</code> is a touch
            darker; <code>overlay</code> is a touch lighter. Tonal
            hierarchy isn't how you know where a panel begins.
          </p>
          <p>
            <code>effect.surfaceBy</code> is set to <code>border</code>{' '}
            (the same default the other engines declare), making the
            engine's position explicit: surfaces are bounded
            rectangles, demarcated by their outline. Aurora is the only
            engine that flips this slot to <code>luminance</code>.
          </p>
        </>
      ),
      demo: <SurfacesDemo />,
    },
    {
      id: 'borders',
      title: 'Borders',
      description: 'Box-drawing corners + 1px CSS edges, aligned to the cell.',
      body: (
        <>
          <p>
            Borders are the load-bearing affordance here. Every width
            token — <code>hairline</code>, <code>thin</code>,{' '}
            <code>thick</code> — resolves to 1 pixel, because that's
            the width of <code>─</code> and <code>│</code> in any modern
            monospace face. <code>heavy</code> bumps to 2 pixels for the
            equivalent of <code>═</code> / <code>║</code>. Strength rungs
            shift alpha rather than width.
          </p>
          <p>
            Under <code>effect.borderStyle = 'character'</code>, Card,
            Modal, and Table replace their CSS border-radius corners with
            real glyph spans (<code>┌ ┐ └ ┘</code>) and let 1px CSS
            edges carry the four sides between them. Visually seamless;
            structurally a hybrid that keeps complexity inside the engine
            seam.
          </p>
        </>
      ),
      demo: <BordersDemo />,
    },
    {
      id: 'elevation',
      title: 'Elevation',
      description: 'No shadow, on any rung.',
      body: (
        <>
          <p>
            Every <code>elevation.*</code> slot — <code>flat</code>,{' '}
            <code>low</code>, <code>medium</code>, <code>high</code>,{' '}
            <code>overlay</code> — resolves to{' '}
            <code>boxShadow: 'none'</code>. The slider in the demo walks
            five rungs and the card never moves. Terminals don't cast
            shadows; this engine doesn't fake one to fit the
            contract.
          </p>
          <p>
            Vertical hierarchy lives in <em>border strength</em> (the
            strong rung marks focused or active panels) and in{' '}
            <em>cell-grid position</em> (modals center themselves in the
            viewport with a scrim behind; tooltips anchor below their
            trigger). The contract still ships five rungs because every
            component reads them — the engine just declares them equal.
          </p>
        </>
      ),
      demo: <ElevationDemo />,
    },
    {
      id: 'motion',
      title: 'Motion',
      description: 'Tight band, linear easing, no decay.',
      body: (
        <>
          <p>
            Durations are the tightest in the showcase —{' '}
            <code>fast</code> 40&nbsp;ms, <code>base</code> 80&nbsp;ms,{' '}
            <code>slow</code> 140&nbsp;ms — and every easing slot
            collapses to <code>linear</code>. There are no curves;
            terminals snap. <code>motion.decay</code> stays at zero
            (that's the CRT regime, not this one).
          </p>
          <p>
            The pragmatic result: hover, focus, press all re-colour within
            a frame or two of the cursor entering. Toggle motion off and
            the durations zero out entirely; the swap becomes truly
            instant. The engine paints no decorative motion at all — no
            scanline drift, no atmosphere wash, no card lift — so
            reduced-motion users see the same character-grid aesthetic
            with the only difference being how fast a state changes.
          </p>
        </>
      ),
      demo: <MotionDemo />,
    },
    {
      id: 'intent',
      title: 'Focus & intent',
      description: 'Colour on the border, not the fill.',
      body: (
        <>
          <p>
            Intents share a single rule: the fill stays a low-alpha wash
            over the near-black field, and colour lives in the{' '}
            <em>border</em> and the <em>content</em>. Red for{' '}
            <code>danger</code>, amber for <code>warning</code>, green for{' '}
            <code>success</code>, blue for <code>primary</code> /{' '}
            <code>info</code> — the same blue that marks textual
            affordances via <code>content.link</code>.
          </p>
          <p>
            Focus is a 1px outline in that same link-blue at zero offset —
            the box edge changes colour rather than gaining a halo,
            because a halo would have to bloom past the character cell
            and break the grid. This is the TUI rule named:{' '}
            <em>colour encodes state, fills stay neutral, edges carry
            structure</em>.
          </p>
        </>
      ),
      demo: <IntentDemo />,
    },
  ],
}
