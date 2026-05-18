import { useState } from 'react'
import {
  Button,
  Card,
  Checkbox,
  Combobox,
  IconButton,
  Stack,
  Tabs,
  TextInput,
  Toggle,
  type TabSpec,
} from '../../lib'

const TAB_OPTIONS: TabSpec<'overview' | 'details' | 'logs'>[] = [
  { id: 'overview', label: 'overview', count: 3 },
  { id: 'details', label: 'details' },
  { id: 'logs', label: 'logs', count: 12 },
]

const FAKE_SUGGESTIONS = [
  'Take a screenshot',
  'Open the inspector',
  'Reload the page',
  'Toggle the sidebar',
  'Clear the cache',
  'Run the linter',
  'Run the test suite',
]

async function fakeSuggestions(query: string, signal: AbortSignal): Promise<string[]> {
  await new Promise<void>((resolve, reject) => {
    const t = window.setTimeout(resolve, 80)
    signal.addEventListener('abort', () => {
      window.clearTimeout(t)
      reject(new DOMException('aborted', 'AbortError'))
    })
  })
  const q = query.trim().toLowerCase()
  if (!q) return FAKE_SUGGESTIONS.slice(0, 5)
  return FAKE_SUGGESTIONS.filter((s) => s.toLowerCase().includes(q)).slice(0, 5)
}

export default function ComponentsDemo() {
  const [text, setText] = useState('hello world')
  const [checked, setChecked] = useState(true)
  const [toggleOn, setToggleOn] = useState(false)
  const [tab, setTab] = useState<'overview' | 'details' | 'logs'>('overview')
  const [pill, setPill] = useState<'a' | 'b' | 'c'>('a')

  return (
    <div className='components-demo'>
      <Stack direction='column' gap='lg'>
        <Section
          title='Button'
          description='Variants: primary, ghost, danger. Sizes: sm, md.'
        >
          <Stack direction='row' gap='sm' wrap align='center'>
            <Button variant='primary'>primary</Button>
            <Button variant='ghost'>ghost</Button>
            <Button variant='danger'>danger</Button>
            <Button variant='primary' size='sm'>primary sm</Button>
            <Button variant='ghost' size='sm'>ghost sm</Button>
            <Button variant='primary' disabled>disabled</Button>
          </Stack>
        </Section>

        <Section
          title='IconButton'
          description='For dense icon-only controls. Variants: ghost, danger.'
        >
          <Stack direction='row' gap='sm' align='center'>
            <IconButton aria-label='ghost icon'>★</IconButton>
            <IconButton aria-label='danger icon' variant='danger'>×</IconButton>
            <IconButton aria-label='disabled icon' disabled>?</IconButton>
          </Stack>
        </Section>

        <Section title='TextInput' description='Bare text input with focus ring.'>
          <Stack direction='column' gap='sm'>
            <TextInput
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder='type here…'
            />
            <TextInput placeholder='disabled' disabled />
          </Stack>
        </Section>

        <Section title='Checkbox' description='With optional label.'>
          <Stack direction='row' gap='md' wrap align='center'>
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              label='with label'
            />
            <Checkbox checked={false} onChange={() => {}} label='unchecked' />
            <Checkbox checked={true} onChange={() => {}} label='disabled' disabled />
          </Stack>
        </Section>

        <Section title='Toggle' description='Switch-style boolean.'>
          <Stack direction='row' gap='md' wrap align='center'>
            <Toggle
              checked={toggleOn}
              onChange={(e) => setToggleOn(e.target.checked)}
              label='enable feature'
            />
            <Toggle checked={false} onChange={() => {}} label='off' />
            <Toggle checked={true} onChange={() => {}} label='locked' disabled />
          </Stack>
        </Section>

        <Section
          title='Tabs'
          description='Variants: underline (default), pill.'
        >
          <Stack direction='column' gap='md'>
            <Tabs
              tabs={TAB_OPTIONS}
              active={tab}
              onChange={setTab}
              ariaLabel='underline example'
            />
            <Tabs
              variant='pill'
              tabs={[
                { id: 'a', label: 'one' },
                { id: 'b', label: 'two' },
                { id: 'c', label: 'three' },
              ]}
              active={pill}
              onChange={setPill}
              ariaLabel='pill example'
            />
          </Stack>
        </Section>

        <Section title='Card' description='Variants: flat, elevated.'>
          <Stack direction='row' gap='md' wrap>
            <Card variant='flat' style={{ flex: '1 1 220px' }}>
              <strong>Flat card</strong>
              <p style={{ margin: '0.4rem 0 0', color: 'var(--text-dim)' }}>
                Borders only — sits flush with the surface.
              </p>
            </Card>
            <Card variant='elevated' style={{ flex: '1 1 220px' }}>
              <strong>Elevated card</strong>
              <p style={{ margin: '0.4rem 0 0', color: 'var(--text-dim)' }}>
                Drops a shadow to lift off the page.
              </p>
            </Card>
          </Stack>
        </Section>

        <Section
          title='Combobox'
          description='Async type-ahead. ↑↓ navigate, enter to submit, esc to close.'
        >
          <Combobox
            getSuggestions={fakeSuggestions}
            onSubmit={(value) => alert(`submitted: ${value}`)}
            placeholder='try typing…'
            helpText='this combobox uses an in-memory fake source'
          />
        </Section>

        <Section title='Stack' description='Flex layout helper used throughout this page.'>
          <Stack direction='row' gap='sm' wrap>
            <Card variant='flat'><span>row · gap sm</span></Card>
            <Card variant='flat'><span>item 2</span></Card>
            <Card variant='flat'><span>item 3</span></Card>
          </Stack>
        </Section>
      </Stack>
    </div>
  )
}

function Section({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className='components-demo__section'>
      <header className='components-demo__head'>
        <h3>{title}</h3>
        <p>{description}</p>
      </header>
      <div className='components-demo__body'>{children}</div>
    </section>
  )
}
