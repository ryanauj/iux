import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { Palette } from '../../tokens/semantic.contract'
import { PaletteRoot } from '../theme/PaletteRoot'
import { COMPONENTS, VISUALIZATIONS, type StoryEntry, type Tier } from './components'

export type ShowcaseLayout = 'feed' | 'deck' | 'grid'

interface Props {
  palette: Palette
  layout: ShowcaseLayout
  motionScale?: number
}

export function PaletteShowcase({ palette, layout, motionScale = 1 }: Props) {
  return (
    <PaletteRoot
      palette={palette}
      as="section"
      className="showcase"
      motionScale={motionScale}
    >
      <header className="showcase__head">
        <h2 className="showcase__head-title">
          {palette.name} <small>({palette.engine})</small>
        </h2>
        <p className="showcase__head-meta">
          {COMPONENTS.length} components · {VISUALIZATIONS.length} visualizations · layout: {layout}
        </p>
      </header>
      {layout === 'feed' && (
        <>
          <SectionHeading>Components</SectionHeading>
          <FeedLayout entries={COMPONENTS} />
          <SectionHeading>Visualizations</SectionHeading>
          <FeedLayout entries={VISUALIZATIONS} />
        </>
      )}
      {layout === 'deck' && (
        <>
          <SectionHeading>Components</SectionHeading>
          <DeckLayout entries={COMPONENTS} />
          <SectionHeading>Visualizations</SectionHeading>
          <DeckLayout entries={VISUALIZATIONS} />
        </>
      )}
      {layout === 'grid' && (
        <>
          <SectionHeading>Components</SectionHeading>
          <GridLayout entries={COMPONENTS} />
          <SectionHeading>Visualizations</SectionHeading>
          <GridLayout entries={VISUALIZATIONS} />
        </>
      )}
    </PaletteRoot>
  )
}

function SectionHeading({ children }: { children: ReactNode }) {
  return <h3 className="showcase__section-heading">{children}</h3>
}

function TierBadge({ tier }: { tier: Tier }) {
  return <span className={`showcase__tier showcase__tier--${tier}`}>Tier {tier}</span>
}

/* ---------- Layout 21: stacked masonry feed ---------- */

function FeedLayout({ entries }: { entries: StoryEntry[] }) {
  const [selected, setSelected] = useState<Record<string, string>>({})

  return (
    <div className="showcase-feed">
      {entries.map(entry => {
        const variant = selected[entry.id] ?? entry.variants[0]
        return (
          <article key={entry.id} className="showcase-card showcase-feed__card">
            <header className="showcase-card__head">
              <h3 className="showcase-card__title">{entry.label}</h3>
              <TierBadge tier={entry.tier} />
            </header>
            <div
              className="showcase-card__chips"
              role="tablist"
              aria-label={`${entry.label} variants`}
            >
              {entry.variants.map(v => (
                <button
                  key={v}
                  type="button"
                  role="tab"
                  aria-selected={v === variant}
                  className={
                    'showcase-card__chip' +
                    (v === variant ? ' showcase-card__chip--active' : '')
                  }
                  onClick={() => setSelected(s => ({ ...s, [entry.id]: v }))}
                >
                  {v}
                </button>
              ))}
            </div>
            <div className="showcase-card__demo">{entry.render(variant)}</div>
          </article>
        )
      })}
    </div>
  )
}

/* ---------- Layout 22: swipeable variant deck ---------- */

function DeckLayout({ entries }: { entries: StoryEntry[] }) {
  return (
    <div className="showcase-deck">
      {entries.map(entry => (
        <DeckCard key={entry.id} entry={entry} />
      ))}
    </div>
  )
}

function DeckCard({ entry }: { entry: StoryEntry }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => {
      const w = track.clientWidth
      if (w === 0) return
      const idx = Math.round(track.scrollLeft / w)
      setActive(Math.max(0, Math.min(entry.variants.length - 1, idx)))
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [entry.variants.length])

  const scrollTo = (idx: number) => {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: idx * track.clientWidth, behavior: 'smooth' })
  }

  const last = entry.variants.length - 1
  const variantName = entry.variants[active]

  return (
    <article className="showcase-card showcase-deck__card">
      <header className="showcase-card__head">
        <h3 className="showcase-card__title">{entry.label}</h3>
        <TierBadge tier={entry.tier} />
      </header>
      <div className="showcase-deck__viewport">
        <button
          type="button"
          className="showcase-deck__arrow showcase-deck__arrow--prev"
          aria-label="Previous variant"
          disabled={active === 0}
          onClick={() => scrollTo(active - 1)}
        >
          ‹
        </button>
        <div
          ref={trackRef}
          className="showcase-deck__track"
          aria-live="polite"
          aria-atomic="false"
        >
          {entry.variants.map(v => (
            <div key={v} className="showcase-deck__slide">
              <div className="showcase-deck__slide-label">{v}</div>
              <div className="showcase-card__demo">{entry.render(v)}</div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="showcase-deck__arrow showcase-deck__arrow--next"
          aria-label="Next variant"
          disabled={active === last}
          onClick={() => scrollTo(active + 1)}
        >
          ›
        </button>
      </div>
      <div className="showcase-deck__dots" role="tablist" aria-label={`${entry.label} variants`}>
        {entry.variants.map((v, i) => (
          <button
            key={v}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Show variant: ${v}`}
            className={
              'showcase-deck__dot' +
              (i === active ? ' showcase-deck__dot--active' : '')
            }
            onClick={() => scrollTo(i)}
          />
        ))}
      </div>
      <div className="showcase-deck__counter" aria-hidden="true">
        {active + 1} / {entry.variants.length} · {variantName}
      </div>
    </article>
  )
}

/* ---------- Layout 23: tap-to-expand tile grid ---------- */

function GridLayout({ entries }: { entries: StoryEntry[] }) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const tileRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  useEffect(() => {
    if (!expanded) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setExpanded(null)
        tileRefs.current[expanded]?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [expanded])

  return (
    <div className="showcase-grid">
      {entries.map(entry => {
        const open = expanded === entry.id
        return (
          <div
            key={entry.id}
            className={
              'showcase-grid__cell' +
              (open ? ' showcase-grid__cell--expanded' : '')
            }
          >
            {!open && (
              <button
                ref={el => {
                  tileRefs.current[entry.id] = el
                }}
                type="button"
                className="showcase-grid__tile"
                aria-expanded={false}
                onClick={() => setExpanded(entry.id)}
              >
                <span className="showcase-grid__tile-tier">
                  <TierBadge tier={entry.tier} />
                </span>
                <span className="showcase-grid__tile-name">{entry.label}</span>
                <span className="showcase-grid__tile-meta">
                  {entry.variants.length} variant{entry.variants.length === 1 ? '' : 's'}
                </span>
                <span className="showcase-grid__tile-cue" aria-hidden="true">+</span>
              </button>
            )}
            {open && (
              <article className="showcase-card showcase-grid__panel">
                <header className="showcase-card__head">
                  <h3 className="showcase-card__title">{entry.label}</h3>
                  <TierBadge tier={entry.tier} />
                  <button
                    type="button"
                    className="showcase-grid__close"
                    aria-label={`Collapse ${entry.label}`}
                    onClick={() => {
                      setExpanded(null)
                      requestAnimationFrame(() => tileRefs.current[entry.id]?.focus())
                    }}
                  >
                    ×
                  </button>
                </header>
                <div className="showcase-card__demo">{entry.render()}</div>
              </article>
            )}
          </div>
        )
      })}
    </div>
  )
}
