import type { ComponentType } from 'react'
import TodoDemo from './demos/todo'
import ComponentsDemo from './demos/components'
import StylesDemo from './demos/styles'
import { todoApi } from './demos/todo/api'

export interface DemoControls {
  getPersisted(): Promise<boolean>
  setPersisted(enabled: boolean): Promise<void>
  reset(): Promise<void>
}

export interface DemoMeta {
  id: string
  name: string
  blurb: string
  features: string[]
  Component: ComponentType
  controls?: DemoControls
}

export const DEMOS: DemoMeta[] = [
  {
    id: 'components',
    name: 'Component library',
    blurb: 'Every primitive in the shared lib, rendered with its variants and states.',
    features: ['buttons', 'inputs', 'tabs', 'combobox', 'cards'],
    Component: ComponentsDemo,
  },
  {
    id: 'styles',
    name: 'Styles & tokens',
    blurb:
      'Browse design tokens — colors, spacing, type — live for the active theme.',
    features: ['tokens', 'themes', 'live preview'],
    Component: StylesDemo,
  },
  {
    id: 'todo',
    name: 'TODO with suggestions',
    blurb:
      'Type-ahead suggestions, optimistic add, and filter tabs against an in-browser fake server.',
    features: ['type-ahead', 'optimistic add', 'filter tabs', 'fake server'],
    Component: TodoDemo,
    controls: {
      async getPersisted() {
        const { persisted } = await todoApi.list()
        return persisted
      },
      async setPersisted(enabled) {
        await todoApi.setPersisted(enabled)
      },
      async reset() {
        await todoApi.reset()
      },
    },
  },
]

export function findDemo(id: string): DemoMeta | undefined {
  return DEMOS.find((d) => d.id === id)
}
