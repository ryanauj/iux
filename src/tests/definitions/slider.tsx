// ABOUTME: slider — part of the tests area.

import { useState } from 'react'
import { Slider } from '../../components/Slider/Slider'
import type { IntegrationTest } from '../types'

function SingleComposition() {
  const [value, setValue] = useState(40)
  return (
    <div>
      <Slider data-testid="slider" value={value} onChange={setValue} />
      <span data-testid="state">{value}</span>
    </div>
  )
}

function TicksComposition() {
  const [value, setValue] = useState(20)
  return (
    <div>
      <Slider
        variant="ticks"
        label="Volume"
        min={0}
        max={100}
        step={20}
        value={value}
        onChange={setValue}
      />
      <span data-testid="state">{value}</span>
    </div>
  )
}

function RangeComposition() {
  const [range, setRange] = useState<[number, number]>([20, 80])
  return (
    <div>
      <Slider
        variant="range"
        range={range}
        onRangeChange={setRange}
      />
      <span data-testid="state">{range[0]}-{range[1]}</span>
    </div>
  )
}

function CurveComposition() {
  const [value, setValue] = useState(50)
  const curve = Array.from({ length: 16 }, (_, i) => Math.sin((i / 15) * Math.PI) * 100)
  return (
    <div>
      <Slider variant="curve" curve={curve} value={value} onChange={setValue} />
    </div>
  )
}

// ABOUTME: sliderTests — an exported value.
export const sliderTests: IntegrationTest[] = [
  {
    id: 'slider-rung-1-arrow',
    name: 'Slider — arrow keys step the value (rung 1)',
    description: 'Pressing ArrowRight on a single-thumb slider increments by step.',
    components: ['slider'],
    tags: ['slider', 'rung-1', 'keyboard'],
    render: () => <SingleComposition />,
    steps: [
      { kind: 'assertText', selector: '[data-testid="state"]', text: '40', label: 'Starts at 40' },
      { kind: 'press', key: 'ArrowRight', selector: '.iux-slider__thumb', label: 'ArrowRight' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: '41', label: '41' },
      { kind: 'press', key: 'ArrowLeft', selector: '.iux-slider__thumb', label: 'ArrowLeft' },
      { kind: 'press', key: 'ArrowLeft', selector: '.iux-slider__thumb', label: 'ArrowLeft' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: '39', label: '39' },
    ],
  },
  {
    id: 'slider-rung-2-ticks',
    name: 'Slider — ticks render and step jumps respect step (rung 2)',
    description: 'Ticks variant renders tick marks; keyboard step uses the supplied step.',
    components: ['slider'],
    tags: ['slider', 'rung-2', 'ticks'],
    render: () => <TicksComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-slider__tick', label: 'Ticks visible' },
      { kind: 'press', key: 'ArrowRight', selector: '.iux-slider__thumb', label: 'ArrowRight' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: '40', label: 'Stepped by 20' },
    ],
  },
  {
    id: 'slider-rung-3-range',
    name: 'Slider — range has two thumbs and connecting fill (rung 3)',
    description: 'Range variant renders two thumbs; the max thumb responds to keyboard.',
    components: ['slider'],
    tags: ['slider', 'rung-3', 'range'],
    render: () => <RangeComposition />,
    steps: [
      { kind: 'assertCount', selector: '.iux-slider__thumb', count: 2, label: 'Two thumbs' },
      { kind: 'press', key: 'ArrowRight', selector: '.iux-slider__thumb:last-child', label: 'ArrowRight on max thumb' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: '20-81', label: 'Max increased' },
    ],
  },
  {
    id: 'slider-rung-4-curve',
    name: 'Slider — curve renders an SVG backdrop (rung 4)',
    description: 'Curve variant draws the curve as a polyline behind the track.',
    components: ['slider'],
    tags: ['slider', 'rung-4', 'curve'],
    render: () => <CurveComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-slider__curve polyline', label: 'Curve polyline rendered' },
    ],
  },
]
