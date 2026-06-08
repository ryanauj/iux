// ABOUTME: Renders all story entries for one palette in the chosen layout (feed, deck, or grid) inside a PaletteRoot, with an optional header showing palette name/engine and an engine-guide link; used by ShowcasePage in per-palette mode and by QuizView as the components and visualizations stimulus.

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Palette } from '../../tokens/semantic.contract'
import { PaletteRoot } from '../theme/PaletteRoot'
import { ENGINE_GUIDE_IDS } from '../guides/engines/registry'
import type { StoryEntry, Tier } from './components'

// ABOUTME: Discriminant for PaletteShowcase's three layout modes: feed (stacked masonry cards with variant chip tabs), deck (horizontally swipeable variant carousel), or grid (tap-to-expand tiles).
export type ShowcaseLayout = 'feed' | 'deck' | 'grid'

// ABOUTME: Props for PaletteShowcase: the palette to render inside, which layout to use, an optional motion scale multiplier, the story entries to display, a plural kind label for the header meta line, and a flag to suppress the palette name/engine header (used by QuizView to avoid revealing the answer).
interface Props {
  palette: Palette
  layout: ShowcaseLayout
  motionScale?: number
  entries: StoryEntry[]
  /** Plural noun for the meta line, e.g. "components" or "visualizations". */
  kindLabel: string
  /**
   * When false, the palette name/engine header is omitted. The quiz uses this
   * so the stimulus doesn't reveal the answer.
   */
  showHeader?: boolean
}

// ABOUTME: Wraps entries in a PaletteRoot and dispatches to FeedLayout, DeckLayout, or GridLayout; omits the palette header when showHeader=false (used by QuizView to hide the answer).
export function PaletteShowcase({
  palette,
  layout,
  motionScale = 1,
  entries,
  kindLabel,
  showHeader = true,
}: Props) {
  const engineGuideAvailable = (ENGINE_GUIDE_IDS as readonly string[]).includes(palette.engine)
  return (
    <PaletteRoot
      palette={palette}
      as="section"
      className="showcase"
      motionScale={motionScale}
    >
      {showHeader && (
        <header className="showcase__head">
          <h2 className="showcase__head-title">
            {palette.name} <small>({palette.engine})</small>
          </h2>
          <p className="showcase__head-meta">
            {entries.length} {kindLabel} · layout: {layout}
            {engineGuideAvailable && (
              <>
                {' · '}
                <Link to={`/engines/${palette.engine}`} className="showcase__head-link">
                  Learn how the {palette.engine} engine works →
                </Link>
              </>
            )}
          </p>
        </header>
      )}
      {layout === 'feed' && <FeedLayout entries={entries} />}
      {layout === 'deck' && <DeckLayout entries={entries} />}
      {layout === 'grid' && <GridLayout entries={entries} />}
    </PaletteRoot>
  )
}

// ABOUTME: Small inline badge that displays a story entry's tier number (1, 2, or 3) with a tier-specific CSS modifier class; shown in card headers across all three layout modes.
function TierBadge({ tier }: { tier: Tier }) {
  return <span className={`showcase__tier showcase__tier--${tier}`}>Tier {tier}</span>
}

/* ---------- Layout 21: stacked masonry feed ---------- */

// ABOUTME: Stacked masonry feed layout: renders each story entry as a card with variant chip tabs; clicking a chip swaps the rendered variant inside the card without navigation.
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

// ABOUTME: Horizontal swipeable deck layout: renders each entry as a DeckCard with a scrollable slide track; the active slide index drives the dot indicators and prev/next arrow buttons.
function DeckLayout({ entries }: { entries: StoryEntry[] }) {
  return (
    <div className="showcase-deck">
      {entries.map(entry => (
        <DeckCard key={entry.id} entry={entry} />
      ))}
    </div>
  )
}

// ABOUTME: Individual card in the DeckLayout: a scroll-snap track of variant slides with prev/next arrow buttons, a dot-tab row, and a counter; detects the active slide via a scroll listener on the track element.
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

// ABOUTME: Tap-to-expand tile grid: initially shows each entry as a compact button tile with tier badge and variant count; clicking expands it into a full showcase-card panel in place, with Escape and a close button to collapse.
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
