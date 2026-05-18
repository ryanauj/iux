import { useEffect, useRef, useState } from 'react'
import { Card, Stack, ThemeSelector } from '../../lib'
import { useDemoTheme } from '../../lib'

const COLOR_TOKENS = [
  '--bg',
  '--bg-elev',
  '--bg-card',
  '--bg-input',
  '--border',
  '--border-strong',
  '--text',
  '--text-dim',
  '--text-faint',
  '--accent',
  '--accent-strong',
  '--accent-soft',
  '--success',
  '--danger',
  '--danger-soft',
] as const

const RADIUS_TOKENS = ['--radius-sm', '--radius-md', '--radius-lg'] as const
const SPACE_TOKENS = [
  '--space-1',
  '--space-2',
  '--space-3',
  '--space-4',
  '--space-5',
  '--space-6',
] as const
const FONT_TOKENS = ['--font-body', '--font-ui'] as const

interface ResolvedTokens {
  colors: Record<string, string>
  radii: Record<string, string>
  spaces: Record<string, string>
  fonts: Record<string, string>
}

function readTokens(el: HTMLElement | null): ResolvedTokens {
  const empty: ResolvedTokens = { colors: {}, radii: {}, spaces: {}, fonts: {} }
  if (!el) return empty
  const cs = getComputedStyle(el)
  const get = (k: string) => cs.getPropertyValue(k).trim()
  const colors: Record<string, string> = {}
  for (const k of COLOR_TOKENS) colors[k] = get(k)
  const radii: Record<string, string> = {}
  for (const k of RADIUS_TOKENS) radii[k] = get(k)
  const spaces: Record<string, string> = {}
  for (const k of SPACE_TOKENS) spaces[k] = get(k)
  const fonts: Record<string, string> = {}
  for (const k of FONT_TOKENS) fonts[k] = get(k)
  return { colors, radii, spaces, fonts }
}

export default function StylesDemo() {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const { effective } = useDemoTheme('styles')
  const [tokens, setTokens] = useState<ResolvedTokens>({
    colors: {},
    radii: {},
    spaces: {},
    fonts: {},
  })

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      setTokens(readTokens(rootRef.current))
    })
    return () => window.cancelAnimationFrame(id)
  }, [effective])

  return (
    <div className='styles-demo' ref={rootRef}>
      <Stack direction='column' gap='lg'>
        <header className='styles-demo__intro'>
          <p>
            Live view of design tokens for the active theme. The picker below sets a
            theme override scoped to this demo only — handy for previewing without
            changing the global theme.
          </p>
          <div className='styles-demo__preview'>
            <ThemeSelector scope='demo' demoId='styles' />
          </div>
        </header>

        <Section title='Color tokens'>
          <div className='styles-demo__swatches'>
            {COLOR_TOKENS.map((name) => (
              <Card key={name} variant='flat' className='styles-demo__swatch'>
                <div
                  className='styles-demo__chip'
                  style={{ background: `var(${name})` }}
                />
                <div className='styles-demo__meta'>
                  <code>{name}</code>
                  <span>{tokens.colors[name] || '—'}</span>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section title='Radius tokens'>
          <Stack direction='row' gap='md' wrap>
            {RADIUS_TOKENS.map((name) => (
              <div key={name} className='styles-demo__radius'>
                <div
                  className='styles-demo__radius-box'
                  style={{ borderRadius: `var(${name})` }}
                />
                <code>{name}</code>
                <span>{tokens.radii[name] || '—'}</span>
              </div>
            ))}
          </Stack>
        </Section>

        <Section title='Spacing scale'>
          <div className='styles-demo__spaces'>
            {SPACE_TOKENS.map((name) => (
              <div key={name} className='styles-demo__space-row'>
                <code>{name}</code>
                <div
                  className='styles-demo__space-bar'
                  style={{ width: `var(${name})` }}
                />
                <span>{tokens.spaces[name] || '—'}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title='Typography'>
          <Stack direction='column' gap='sm'>
            <p className='styles-demo__type' style={{ fontFamily: 'var(--font-body)' }}>
              <code>--font-body</code> — The quick brown fox jumps over the lazy dog.
            </p>
            <p className='styles-demo__type' style={{ fontFamily: 'var(--font-ui)' }}>
              <code>--font-ui</code> — The quick brown fox jumps over the lazy dog.
            </p>
            <div className='styles-demo__type-values'>
              {FONT_TOKENS.map((name) => (
                <div key={name}>
                  <code>{name}</code>
                  <span>{tokens.fonts[name] || '—'}</span>
                </div>
              ))}
            </div>
          </Stack>
        </Section>
      </Stack>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className='styles-demo__section'>
      <h3 className='styles-demo__section-title'>{title}</h3>
      {children}
    </section>
  )
}
