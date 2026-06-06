import { ArrowDefs, DiaArrow, DiaNode, DiaSvg } from './kit'

/**
 * How a component is loaded and a style is applied.
 *
 * Two converging lanes: the render path (left) traces a component from the
 * Vite entry down to its DOM node; the style path (right) traces palette
 * tokens through `paletteToCssVars` into the CSS that the node reads. They
 * meet at the final, cascade-resolved styled element.
 *
 * Hand-authored for now — a base for a later build-time generated version.
 */

const MARKER = 'hiw-flow-arrow'

const COL_W = 360
const TOK_X = 480
const TOK_W = 320

// Render-path spine (left column), top-to-bottom.
const main = [
  { title: 'main.tsx', sub: 'createRoot · BrowserRouter' },
  { title: 'App.tsx', sub: 'HomeRoute → <Stories/>' },
  { title: 'ShowcasePage.tsx', sub: 'read URL → pick component' },
  { title: 'components.tsx', sub: 'COMPONENTS.find(id) → entry' },
  { title: 'entry.render(variant)', sub: '→ Button.stories.tsx' },
  { title: 'Button.tsx', sub: 'build .iux-button--* classes' },
  { title: 'PaletteRoot', sub: 'theme/PaletteRoot.tsx', accent: true },
]

const MAIN_X = 60
const MAIN_TOP = 40
const NODE_H = 64
const STEP = 90

function mainY(i: number) {
  return MAIN_TOP + i * STEP
}

const N7_Y = mainY(6)
const FINAL_Y = 780
const FINAL_X = 60
const FINAL_W = 740
const FINAL_H = 70

// Style path (right column).
const TOK_TOP = 490
const tokens = [
  { y: TOK_TOP, title: 'palette tokens', sub: 'palettes/*.ts · semantic.contract' },
  { y: TOK_TOP + STEP, title: 'paletteToCssVars()', sub: '→ --color-* / --space-* vars' },
  { y: TOK_TOP + STEP * 2, title: 'Button.css', sub: 'reads var(--color-intent-…)' },
]
const T2_Y = tokens[1].y
const T3_Y = tokens[2].y

export function ComponentLoadFlow() {
  return (
    <DiaSvg
      width={860}
      height={880}
      title="Component load and style-apply flow"
      desc="The render path from main.tsx down to a styled DOM node, joined by the style path that turns palette tokens into the CSS variables the component reads."
    >
      <ArrowDefs id={MARKER} />

      {/* Lane headers */}
      <text
        x={MAIN_X + COL_W / 2}
        y={26}
        textAnchor="middle"
        fontFamily="var(--type-label-family)"
        fontSize={12}
        fontWeight={700}
        letterSpacing="0.08em"
        fill="var(--color-content-secondary)"
      >
        RENDER PATH
      </text>
      <text
        x={TOK_X + TOK_W / 2}
        y={TOK_TOP - 14}
        textAnchor="middle"
        fontFamily="var(--type-label-family)"
        fontSize={12}
        fontWeight={700}
        letterSpacing="0.08em"
        fill="var(--color-content-secondary)"
      >
        STYLE PATH
      </text>

      {/* Render-path nodes + connecting arrows */}
      {main.map((n, i) => (
        <DiaNode
          key={n.title}
          x={MAIN_X}
          y={mainY(i)}
          w={COL_W}
          h={NODE_H}
          title={n.title}
          sub={n.sub}
          accent={n.accent}
        />
      ))}
      {main.slice(0, -1).map((_, i) => (
        <DiaArrow
          key={`m-${i}`}
          markerId={MARKER}
          x1={MAIN_X + COL_W / 2}
          y1={mainY(i) + NODE_H}
          x2={MAIN_X + COL_W / 2}
          y2={mainY(i + 1)}
        />
      ))}

      {/* Style-path nodes + connecting arrows */}
      {tokens.map(t => (
        <DiaNode key={t.title} x={TOK_X} y={t.y} w={TOK_W} h={NODE_H} title={t.title} sub={t.sub} />
      ))}
      <DiaArrow
        markerId={MARKER}
        x1={TOK_X + TOK_W / 2}
        y1={tokens[0].y + NODE_H}
        x2={TOK_X + TOK_W / 2}
        y2={tokens[1].y}
      />
      <DiaArrow
        markerId={MARKER}
        x1={TOK_X + TOK_W / 2}
        y1={tokens[1].y + NODE_H}
        x2={TOK_X + TOK_W / 2}
        y2={tokens[2].y}
      />

      {/* PaletteRoot bridges into the style path */}
      <DiaArrow
        markerId={MARKER}
        x1={MAIN_X + COL_W}
        y1={N7_Y + NODE_H / 2}
        x2={TOK_X}
        y2={T2_Y + NODE_H / 2}
        label="injects vars"
        labelX={(MAIN_X + COL_W + TOK_X) / 2}
        labelY={N7_Y + NODE_H / 2 - 8}
      />

      {/* Both lanes converge on the styled DOM node */}
      <DiaArrow
        markerId={MARKER}
        x1={MAIN_X + COL_W / 2}
        y1={N7_Y + NODE_H}
        x2={MAIN_X + COL_W / 2}
        y2={FINAL_Y}
      />
      <DiaArrow
        markerId={MARKER}
        x1={TOK_X + TOK_W / 2}
        y1={T3_Y + NODE_H}
        x2={TOK_X + TOK_W / 2}
        y2={FINAL_Y}
      />
      <DiaNode
        x={FINAL_X}
        y={FINAL_Y}
        w={FINAL_W}
        h={FINAL_H}
        title="Styled DOM node"
        sub="<button class=… style=…> — CSS cascade resolved"
        accent
      />
    </DiaSvg>
  )
}
