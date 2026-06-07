// ABOUTME: Engine guide definition for the Pixel-art rendering engine — the integer-grid engine that zeros radius everywhere, uses whole-pixel border widths, casts hard solid offset shadows with no blur, snaps motion to a 60 Hz per-frame duration ladder with steps(1, end) easing so there is never an interpolated middle frame, and pins image-rendering: pixelated at the palette root.

import { useState } from 'react'
import { palette as pixelArtGameboy } from '../../../palettes/pixel-art-gameboy'
import { PaletteRoot } from '../../theme/PaletteRoot'
import { Button } from '../../components/Button/Button'
import { Card } from '../../components/Card/Card'
import { Toggle } from '../../components/Toggle/Toggle'
import { Slider } from '../../components/Slider/Slider'
import type { EngineGuideMeta } from './types'

type ElevationRung = 'flat' | 'low' | 'medium' | 'high' | 'overlay'
const RUNGS: ElevationRung[] = ['flat', 'low', 'medium', 'high', 'overlay']
type BorderRung = 'hairline' | 'thin' | 'thick' | 'heavy'
const BORDERS: BorderRung[] = ['hairline', 'thin', 'thick', 'heavy']

function PhilosophyDemo() {
  return (
    <div className="iux-engine-demo__pixel-host">
      <Card title="SAVE" subtitle="Four shades. Square corners. One grid." variant="static">
        <p>
          Every length is an integer multiple of an 8-pixel cell. Radius
          is zero everywhere. Borders are a single bitmap line. The
          bitmap font carries every typographic role — display through
          caption, all the same face. The screen is the sprite sheet.
        </p>
        <div className="iux-engine-demo__cluster">
          <Button intent="primary">OK</Button>
          <Button intent="neutral">CANCEL</Button>
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
              borderColor: 'var(--color-border-strong)',
              borderWidth: 'var(--border-width-thin)',
              borderRadius: 'var(--radius-none)',
            }}
          >
            <span className="iux-engine-demo__swatch-label">{s.label}</span>
          </div>
        ))}
      </div>
      <p className="iux-engine-demo__caption">
        The DMG had four shades — field, mid-light, mid-dark, outline.
        Three of the four surface slots collapse onto the lightest shade
        (the LCD off-pixel field); <code>sunken</code> uses the second
        shade for inset wells. Hierarchy lives in borders and hard offsets,
        not in surface colour.
      </p>
    </div>
  )
}

function BordersDemo() {
  const [width, setWidth] = useState<BorderRung>('thin')
  return (
    <div className="iux-engine-demo__col">
      <Toggle
        variant="segmented"
        label="Border width"
        value={width}
        onValueChange={v => setWidth(v as BorderRung)}
        options={BORDERS.map(b => ({ value: b, label: b }))}
      />
      <div className="iux-engine-demo__pixel-host">
        <div
          className="iux-engine-demo__bordered"
          style={{
            borderColor: 'var(--color-border-strong)',
            borderWidth: `var(--border-width-${width})`,
            borderRadius: 'var(--radius-none)',
            background: 'var(--color-surface-raised)',
          }}
        >
          <p>
            <code>border.{width}</code> — a bitmap line in the darkest
            shade. <code>hairline</code> and <code>thin</code> read as
            one and two pixels respectively; <code>heavy</code> at 4 pixels
            is the sprite-frame outline.
          </p>
        </div>
      </div>
      <p className="iux-engine-demo__caption">
        Every width token snaps to a whole-pixel value. There are no
        half-pixel lines; there is no antialiasing. The engine also
        forces <code>image-rendering: pixelated</code> at the palette root,
        so any nested raster keeps its crunch.
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
      <div className="iux-engine-demo__pixel-host">
        <div
          className="iux-engine-demo__elevation-card"
          style={{
            boxShadow: `var(--elevation-${rung})`,
            background: 'var(--color-surface-raised)',
            borderRadius: 'var(--radius-none)',
            borderWidth: 'var(--border-width-thin)',
            borderStyle: 'solid',
            borderColor: 'var(--color-border-strong)',
          }}
        >
          <strong>elevation.{rung}</strong>
          <p>
            Hard offsets in the darkest shade, no blur, no soft shadow.{' '}
            <code>low</code> casts 2 pixels down and right;{' '}
            <code>medium</code> doubles to 4; <code>high</code> stacks
            a second 8-pixel cast in mid-dark for a two-layer drop;{' '}
            <code>overlay</code> wraps the panel in a 2-pixel inset frame.
          </p>
        </div>
      </div>
      <p className="iux-engine-demo__caption">
        <code>elevation.flat</code> is the only rung that paints nothing —
        a flat panel snaps flush to its host. The other rungs are{' '}
        Nintendo-era window dressing: a sprite's shadow is one solid
        rectangle offset by a few pixels, never a soft blur.
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
        palette={pixelArtGameboy}
        as="div"
        className="iux-engine-demo__nested"
        motionScale={motionOn ? 1 : 0}
      >
        <div className="iux-engine-demo__pixel-host">
          <div className="iux-engine-demo__cluster">
            <Button intent="primary">HOVER</Button>
            <Button intent="neutral">HOVER</Button>
            <Button intent="success">HOVER</Button>
          </div>
          <p className="iux-engine-demo__caption">
            Hover the buttons. Durations snap to a per-frame ladder at
            roughly 60&nbsp;Hz — <code>fast</code> is one frame
            (32&nbsp;ms), <code>base</code> is two (64&nbsp;ms),{' '}
            <code>slow</code> is four (128&nbsp;ms) — and every easing slot
            collapses to <code>steps(1, end)</code>, which means there is
            no interpolation: the hover state appears, fully, on the next
            frame. With motion off the durations zero out and the swap is
            immediate. Either way, there is never a halfway colour.
          </p>
        </div>
      </PaletteRoot>
    </div>
  )
}

function IntentDemo() {
  return (
    <div className="iux-engine-demo__pixel-host">
      <div className="iux-engine-demo__cluster">
        <Button intent="primary">PRIMARY</Button>
        <Button intent="neutral">NEUTRAL</Button>
        <Button intent="success">SUCCESS</Button>
        <Button intent="warning">WARNING</Button>
        <Button intent="danger">DANGER</Button>
        <Button intent="info">INFO</Button>
      </div>
      <p className="iux-engine-demo__caption">
        Every intent fill maps to one of the four DMG shades. A{' '}
        <code>primary</code> button and a <code>danger</code> button are
        both the darkest shade with the lightest content; a{' '}
        <code>warning</code> and an <code>info</code> are both the mid-light
        shade. Affordance has to ride iconography or wording, not the
        intent colour — this is the engine's honest a11y trade-off,
        the same one CRT names. Focus is a 4-pixel solid outline in the
        darkest shade at zero offset; the same chunky frame that wrapped
        a selected menu entry on the DMG.
      </p>
    </div>
  )
}

// ABOUTME: pixelArtGuide — the EngineGuideMeta for the Pixel-art engine: six steps (philosophy, surfaces, borders, elevation, motion, intent) demonstrated against the pixel-art-gameboy palette, covering the four-shade DMG register, whole-pixel hairlines, hard-offset elevation, stepped per-frame motion, and the four-shade intent palette that forces affordance to ride iconography rather than colour.
export const pixelArtGuide: EngineGuideMeta = {
  engine: 'pixel-art',
  name: 'Pixel-art',
  summary:
    "Integer-step everything. Radius is zero on every slot, border widths are 1 / 2 / 4 pixel hairlines, elevation casts hard solid offsets with no blur, the typography family is a single bitmap face across every role, and motion durations snap to a per-frame ladder at roughly 60 hertz with `steps(1, end)` easing so there is never an interpolated middle frame. The engine also pins `image-rendering: pixelated` at the palette root, so any raster inside the field keeps its crunch. Intents collapse onto four luminance shades by construction — affordance has to ride iconography, not the intent hue.",
  demoPalette: pixelArtGameboy,
  steps: [
    {
      id: 'philosophy',
      title: 'Philosophy',
      description: 'Every length snaps to a pixel cell.',
      body: (
        <>
          <p>
            Pixel-art is the engine that refuses the sub-pixel. Radius is{' '}
            <code>0</code> on every slot, border widths are hairlines in
            whole pixels, elevation casts hard solid offsets with no blur,
            and the engine's <code>effect.pixelGrid</code> sets the
            integer step that every length composes against. The
            palette root also pins <code>image-rendering: pixelated</code>{' '}
            and forces font-smoothing off, so the bitmap font and any
            raster inside the field stay crunchy at every scale.
          </p>
          <p>
            The demo here is the Game Boy DMG register — four shades on a
            green LCD field. The same engine ships against NES, PICO-8,
            Cottagecore, Hyperlight, and SNES registers; only{' '}
            <code>color.*</code> changes between them. That same-engine /
            different-token relationship is what proves the engine
            generalises.
          </p>
        </>
      ),
      demo: <PhilosophyDemo />,
    },
    {
      id: 'surfaces',
      title: 'Surfaces',
      description: 'Four shades, sometimes fewer.',
      body: (
        <>
          <p>
            The DMG had four shades total. Three of the four surface slots
            collapse onto the lightest of them (the LCD off-pixel field);{' '}
            <code>sunken</code> uses the second shade for inset wells.
            There is no fifth tone for hover, no tint for raised — the
            register doesn't have one to give.
          </p>
          <p>
            Hierarchy lives in <em>borders</em> and <em>hard offsets</em>:
            a raised panel is the same field colour with a 2-pixel solid
            shadow cast down and right, the way every Game Boy menu drew a
            tile. Other pixel-art registers expand the palette (NES tops
            out at a 64-colour master, PICO-8 has 16) but the engine's
            shape is identical.
          </p>
        </>
      ),
      demo: <SurfacesDemo />,
    },
    {
      id: 'borders',
      title: 'Borders',
      description: 'Whole-pixel lines.',
      body: (
        <>
          <p>
            <code>borderWidth.hairline</code> is 1 pixel,{' '}
            <code>thin</code> and <code>thick</code> are 2 pixels,{' '}
            <code>heavy</code> is 4. There is no half-pixel rule, no
            antialiasing — every line is the full step or none of it. The
            border colour is the darkest shade in the register, the same
            ink the bitmap font is drawn in.
          </p>
          <p>
            Borders carry more semantic work here than in flat or material,
            because intent fills collapse onto a tiny palette. A{' '}
            <code>danger</code> chip differs from a <code>primary</code>{' '}
            chip mostly in border weight; the engine treats the stroke
            width as a first-class affordance.
          </p>
        </>
      ),
      demo: <BordersDemo />,
    },
    {
      id: 'elevation',
      title: 'Elevation',
      description: 'Hard offsets, no blur.',
      body: (
        <>
          <p>
            Every rung above <code>flat</code> casts a single hard
            rectangle offset in the darkest shade. <code>low</code> is
            <code> 2px 2px 0</code>, <code>medium</code> is{' '}
            <code>4px 4px 0</code>, <code>high</code> stacks a second
            8-pixel cast in mid-dark for a two-layer drop, and{' '}
            <code>overlay</code> wraps the panel in a 2-pixel inset frame
            instead of a cast (the way an OS modal would have been
            outlined on a Game Boy).
          </p>
          <p>
            There is no blur, no soft alpha, no second hue. The contract
            allows arbitrary box-shadow strings; the engine simply refuses
            anything other than whole pixels of one solid colour. Drag the
            slider to walk the rungs — the cast snaps from cell to cell.
          </p>
        </>
      ),
      demo: <ElevationDemo />,
    },
    {
      id: 'motion',
      title: 'Motion',
      description: 'Per-frame durations, stepped easing.',
      body: (
        <>
          <p>
            The duration band lives on a 60-hertz frame ladder:{' '}
            <code>fast</code> is one frame at 32&nbsp;ms,{' '}
            <code>base</code> is two at 64&nbsp;ms, <code>slow</code> is
            four at 128&nbsp;ms. Every easing slot collapses to{' '}
            <code>steps(1, end)</code>, which means there is no
            interpolation between start and end states — the new colour
            simply replaces the old on the next frame.
          </p>
          <p>
            The result feels closer to a Game Boy sprite swap than a
            smooth web transition. Toggle motion off and durations zero
            out; the swap becomes truly instant. Either way, there is
            never a halfway colour on screen — and that absence is the
            engine's claim about what pixel-art motion actually is.
          </p>
        </>
      ),
      demo: <MotionDemo />,
    },
    {
      id: 'intent',
      title: 'Focus & intent',
      description: 'Four shades for six intents, chunky focus block.',
      body: (
        <>
          <p>
            The six intents collapse onto the four DMG shades.{' '}
            <code>primary</code> and <code>danger</code> share the darkest
            shade with the lightest content; <code>warning</code> and{' '}
            <code>info</code> share the mid-light; <code>success</code>{' '}
            sits on mid-dark; <code>neutral</code> is the field itself.
            Distinguishing them at a glance requires iconography or
            wording, not colour — the engine names this as its a11y
            trade-off, the same one CRT names.
          </p>
          <p>
            Focus is a 4-pixel solid outline in the darkest shade at zero
            offset — the chunky frame that wrapped a selected menu entry
            on the DMG. The engine's focus halo (<code>effect.glow</code>)
            is zeroed out across every pixel-art register, so the focus
            block is genuinely a 4-pixel line, not a halo dressed up to
            look like one.
          </p>
        </>
      ),
      demo: <IntentDemo />,
    },
  ],
}
