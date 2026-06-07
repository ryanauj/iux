// ABOUTME: cardstock — part of the guides area.

import { useState } from 'react'
import { palette as cardstockLayered } from '../../../palettes/cardstock-layered'
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
    <div className="iux-engine-demo__cardstock-host">
      <Card title="Settings" subtitle="A piece of paper, laid over another." variant="static">
        <p>
          Cream paper field, slate ink, dusty-rose focus. Every raised
          surface bakes a paired stack into <code>elevation.*</code>:
          an inset slate rule along bottom-right (the cut-edge thickness)
          and a zero-blur drop offset down (the gap to the layer below).
          No diffuse halo, no glow.
        </p>
        <div className="iux-engine-demo__cluster">
          <Button intent="primary">Save</Button>
          <Button intent="neutral">Cancel</Button>
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
              boxShadow: 'var(--elevation-low)',
            }}
          >
            <span className="iux-engine-demo__swatch-label">{s.label}</span>
          </div>
        ))}
      </div>
      <p className="iux-engine-demo__caption">
        Four warm paper tones. <code>base</code> is the desk page;{' '}
        <code>raised</code> is a brighter sheet laid over it;{' '}
        <code>sunken</code> is a sage-tinted cream for inset wells (text
        inputs, sub-panels printed into the cardstock);{' '}
        <code>overlay</code> is the brightest sheet of all, reserved for
        dialog panels. Every swatch carries the engine's signature
        cut-edge via <code>elevation.low</code>.
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
      <div className="iux-engine-demo__cardstock-host">
        <div
          className="iux-engine-demo__bordered"
          style={{
            borderColor: `var(--color-border-${strength})`,
            borderWidth: 'var(--border-width-thick)',
            background: 'var(--color-surface-raised)',
            boxShadow: 'var(--elevation-low)',
          }}
        >
          <p>
            <code>border.{strength}</code> — a quiet slate-cream stroke
            paired with the engine's 2-pixel <code>thick</code> width.
            The visible cut is the border; the visible{' '}
            <em>thickness</em> is the inset rule baked into{' '}
            <code>elevation.low</code> along bottom-right.
          </p>
        </div>
      </div>
      <p className="iux-engine-demo__caption">
        The engine documents the cut-edge in two engine-only slots —{' '}
        <code>effect.paperEdgeColor</code> and{' '}
        <code>effect.paperEdgeWidth</code>, emitted as{' '}
        <code>--paper-edge-color</code> and{' '}
        <code>--paper-edge-width</code>. They aren't consumed by any
        component today; the same value is already baked into the
        elevation stack. They exist so future paper-aware components
        (a custom Divider, a torn-page PageBreak) can read the engine's
        intended edge directly without parsing the shadow string.
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
      <div className="iux-engine-demo__cardstock-host">
        <div
          className="iux-engine-demo__elevation-card"
          style={{
            boxShadow: `var(--elevation-${rung})`,
            background: 'var(--color-surface-raised)',
          }}
        >
          <strong>elevation.{rung}</strong>
          <p>
            The recipe is two shadows packed into one slot. An{' '}
            <em>inset slate rule</em> along bottom-right gives the
            cardstock its visible thickness; alpha grows with elevation,
            so higher rungs read as slightly thicker stock. A{' '}
            <em>zero-blur drop shadow</em> offset down creates the gap
            to the layer below. No blur, no spread.
          </p>
        </div>
      </div>
      <p className="iux-engine-demo__caption">
        Shadows are tinted toward slate ink rather than pure black —
        the warm paper field would crush a neutral cast. The whole
        engine lives in this stack: no engine block re-paints
        component <code>box-shadow</code>, the cardstock metaphor is
        delivered through the palette's own <code>elevation.*</code>{' '}
        tokens. Under <code>prefers-reduced-motion</code>,{' '}
        <code>--elevation-medium</code> and <code>--elevation-high</code>{' '}
        collapse back to <code>--elevation-low</code> so hover-lifts
        become no-ops.
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
        palette={cardstockLayered}
        as="div"
        className="iux-engine-demo__nested"
        motionScale={motionOn ? 1 : 0}
      >
        <div className="iux-engine-demo__cardstock-host">
          <div className="iux-engine-demo__cluster">
            <Button intent="primary">Hover me</Button>
            <Button intent="neutral">Hover me</Button>
            <Button intent="info">Hover me</Button>
          </div>
          <p className="iux-engine-demo__caption">
            Hover the buttons. Durations sit slightly above flat —{' '}
            <code>fast</code> 150&nbsp;ms, <code>base</code> 220&nbsp;ms,{' '}
            <code>slow</code> 340&nbsp;ms — because paper takes a beat
            to settle when it lands. <code>motion.decay</code> stays at
            zero; the engine paints no decorative motion at all. Toggle
            motion off and hovers snap, but the cardstock stack — every
            cut-edge, every drop — stays exactly as it was.
          </p>
        </div>
      </PaletteRoot>
    </div>
  )
}

function IntentDemo() {
  return (
    <div className="iux-engine-demo__cardstock-host">
      <div className="iux-engine-demo__cluster">
        <Button intent="primary">Primary</Button>
        <Button intent="neutral">Neutral</Button>
        <Button intent="success">Success</Button>
        <Button intent="warning">Warning</Button>
        <Button intent="danger">Danger</Button>
        <Button intent="info">Info</Button>
      </div>
      <p className="iux-engine-demo__caption">
        Muted-pastel intent set — sage primary, cream neutral, deeper
        sage success, butter warning, dusty-rose danger, slate-blue info.
        Every <code>intent.*.border</code> sits one luminance step darker
        than its fill, so the chip's cut-edge reads as the same paper
        convention as everything else on the page. Focus is the
        dusty-rose accent at 2px width and 2px offset — high enough
        chroma to read against the muted field without breaking the
        pastel register.
      </p>
    </div>
  )
}

// ABOUTME: cardstockGuide — an exported value.
export const cardstockGuide: EngineGuideMeta = {
  engine: 'cardstock',
  name: 'Cardstock',
  summary:
    "Every raised surface reads as a piece of cut paper laid over another. The engine block in styles.css is intentionally thin — the cardstock metaphor is delivered through the palette's own `elevation.*` stack, where every rung bakes a paired `inset -Npx -Npx 0` (the cut-edge thickness) plus `0 Mpx 0` (the gap to the layer below). No diffuse halo, no glow. `effect.paperEdgeColor` / `effect.paperEdgeWidth` document the same intent as engine-only signals so future paper-aware components can read the cut edge directly.",
  demoPalette: cardstockLayered,
  steps: [
    {
      id: 'philosophy',
      title: 'Philosophy',
      description: 'Paper, cut clean, stacked.',
      body: (
        <>
          <p>
            Cardstock is the engine that refuses lift drama. Every raised
            surface reads as a piece of cut paper laid over another piece
            of cut paper — a clean edge (not torn), a slightly darker
            rule along bottom-right suggesting the stock thickness, and
            a tight close shadow filling the gap to the layer below. No
            diffuse halo, no glow, no rim lighting.
          </p>
          <p>
            The engine block in <code>src/styles.css</code> is
            intentionally thin — the metaphor is delivered through the
            palette's own <code>elevation.*</code> stack. Two contract
            slots (<code>effect.paperEdgeColor</code> and{' '}
            <code>effect.paperEdgeWidth</code>) document the same value
            the elevation stack bakes, so future paper-aware components
            can read the engine's intended cut edge directly.
          </p>
        </>
      ),
      demo: <PhilosophyDemo />,
    },
    {
      id: 'surfaces',
      title: 'Surfaces',
      description: 'Four paper tones, with the cut visible.',
      body: (
        <>
          <p>
            Four warm paper tones — <code>base</code> is the desk page,{' '}
            <code>raised</code> is a brighter sheet on top,{' '}
            <code>sunken</code> is a sage-tinted cream for inputs and
            sub-panels (recessed regions feel printed onto the
            cardstock), <code>overlay</code> is the brightest sheet for
            dialog panels. Type sits on the paper as ink at a clean
            12-to-1 contrast — clears AAA at every body size.
          </p>
          <p>
            None of the tonal differences are dramatic. The cardstock
            cue isn't surface colour; it's the cut-edge baked into{' '}
            <code>elevation.low</code> on every raised swatch in the
            grid below. Without elevation, the swatches would dissolve
            into the host.
          </p>
        </>
      ),
      demo: <SurfacesDemo />,
    },
    {
      id: 'borders',
      title: 'Borders',
      description: 'Quiet stroke + engine-only edge signal.',
      body: (
        <>
          <p>
            Borders skew quiet — three rungs in the slate-cream family,
            never bright. The cardstock metaphor's "thickness" doesn't
            come from a fat border line; it comes from the inset rule
            in <code>elevation.*</code>. <code>borderWidth.thick</code>{' '}
            (consumed by cards) is 2 pixels — enough to read as a cut
            edge without fighting the inset rule painted below it.
          </p>
          <p>
            Two engine-only slots —{' '}
            <code>effect.paperEdgeColor</code> and{' '}
            <code>effect.paperEdgeWidth</code> — record the cut-edge's
            colour and thickness as first-class semantic tokens. They're
            currently undelivered (the same value already lives inside
            the elevation stack), but they're available for a future
            Divider that wants to draw a literal cut between sections
            without re-deriving the value from a shadow string.
          </p>
        </>
      ),
      demo: <BordersDemo />,
    },
    {
      id: 'elevation',
      title: 'Elevation',
      description: 'Paired cut-edge + zero-blur drop.',
      body: (
        <>
          <p>
            This is where the engine lives. Every rung above{' '}
            <code>flat</code> packs two shadows: an{' '}
            <em>inset slate rule</em> along bottom-right (the cut-edge
            thickness, alpha growing with elevation so higher layers
            read as slightly thicker stock) and a{' '}
            <em>zero-blur drop shadow</em> offset straight down (the
            gap to the layer below). A real piece of cardstock casts a
            hard close shadow, not a diffuse halo.
          </p>
          <p>
            Drag the slider to walk the rungs. The cardstock effect is
            bounded by which components consume{' '}
            <code>--elevation-*</code>; controls that paint their own
            surface without an elevation token render flat. Under{' '}
            <code>prefers-reduced-motion</code>,{' '}
            <code>--elevation-medium</code> and{' '}
            <code>--elevation-high</code> collapse back to{' '}
            <code>--elevation-low</code> so the hover lift on
            interactive cards becomes a no-op without changing the
            surface fill.
          </p>
        </>
      ),
      demo: <ElevationDemo />,
    },
    {
      id: 'motion',
      title: 'Motion',
      description: 'Quiet band, no decorative motion at all.',
      body: (
        <>
          <p>
            Durations sit slightly above flat —{' '}
            <code>fast</code> 150&nbsp;ms, <code>base</code> 220&nbsp;ms,{' '}
            <code>slow</code> 340&nbsp;ms — because paper takes a beat
            to settle when it lands. The spring slot keeps a small
            bounce-back for components that opt into it;{' '}
            <code>motion.decay</code> stays at zero. No ringing, no
            wobble after the press.
          </p>
          <p>
            The engine paints no decorative motion at all — no
            atmosphere drift, no glow pulse, no wobble. Toggle motion
            off in the demo and hovers snap, but every cardstock cue
            stays exactly the same: cut-edge, drop, ink colour. Users
            on <code>prefers-reduced-motion</code> see the identical
            layered-paper aesthetic, just without the hover-lift cue.
          </p>
        </>
      ),
      demo: <MotionDemo />,
    },
    {
      id: 'intent',
      title: 'Focus & intent',
      description: 'Muted pastels, dusty-rose focus.',
      body: (
        <>
          <p>
            Muted-pastel intent set — sage primary, cream neutral,
            deeper-sage success, butter warning, dusty-rose danger,
            slate-blue info. Every <code>intent.*.border</code> sits
            one luminance step darker than its fill, so each chip's
            cut-edge reads as the same paper convention as the rest of
            the page. The muted palette is also why the README marks
            a11y as <em>experimental</em>: primary sage on cream
            content clears AA at around 4.6 to 1, passing for body
            text but not for AAA.
          </p>
          <p>
            Focus is the dusty-rose accent at <code>2px</code> width
            and <code>2px</code> offset — high enough chroma to read
            against the muted field without breaking the pastel
            register. The engine doesn't repaint focus — it relies on
            the palette's own ring tokens, the same way flat does.
          </p>
        </>
      ),
      demo: <IntentDemo />,
    },
  ],
}
