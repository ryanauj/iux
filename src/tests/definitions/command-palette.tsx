// ABOUTME: command-palette — part of the tests area.

import { useMemo, useState } from 'react'
import { Button } from '../../components/Button/Button'
import { CommandPalette, type Command } from '../../components/CommandPalette/CommandPalette'
import type { IntegrationTest } from '../types'

function CommandPaletteComposition() {
  const [open, setOpen] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const commands = useMemo<Command[]>(() => [
    { id: 'say-hello', label: 'Say hello', run: () => setResult('say-hello fired') },
    { id: 'set-theme', label: 'Set theme', run: () => setResult('set-theme fired') },
    { id: 'export-csv', label: 'Export CSV', run: () => setResult('export-csv fired') },
    { id: 'archive-thread', label: 'Archive thread', run: () => setResult('archive-thread fired') },
  ], [])

  return (
    <div style={{ position: 'relative', minHeight: 320, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <Button data-testid="open-cmdk" intent="primary" onClick={() => setOpen(true)}>
        Open command palette
      </Button>
      <CommandPalette
        variant="flat"
        open={open}
        onOpenChange={setOpen}
        commands={commands}
        hotkey={null}
        inlineRender
      />
      {result && <div data-testid="cmdk-result">{result}</div>}
    </div>
  )
}

// ABOUTME: commandPaletteFilter — an exported value.
export const commandPaletteFilter: IntegrationTest = {
  id: 'command-palette-filter',
  name: 'Command palette filters and runs selection',
  description:
    'Opening the palette, typing to narrow the list, then pressing Enter to run the highlighted command, which writes its result to the page.',
  components: ['cmdk', 'button'],
  tags: ['overlay', 'keyboard'],
  render: () => <CommandPaletteComposition />,
  steps: [
    { kind: 'click', selector: '[data-testid="open-cmdk"]', label: 'Open palette' },
    { kind: 'waitFor', selector: '.iux-cmdk', label: 'Wait for palette' },
    { kind: 'type', selector: '.iux-cmdk__input', text: 'say', label: 'Type "say"' },
    { kind: 'waitFor', selector: '.iux-cmdk__item.is-active', label: 'Wait for filtered match' },
    { kind: 'assertCount', selector: '.iux-cmdk__item', count: 1, label: 'One match' },
    { kind: 'press', key: 'Enter', selector: '.iux-cmdk__input', label: 'Press Enter' },
    { kind: 'waitFor', selector: '[data-testid="cmdk-result"]', label: 'Wait for command result' },
    {
      kind: 'assertText',
      selector: '[data-testid="cmdk-result"]',
      text: 'say-hello fired',
      label: 'Command ran',
    },
  ],
}
