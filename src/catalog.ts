export interface ThemeEntry {
  id: string
  name: string
  usage_notes: string
  variables: Record<string, string>
}

export interface ComponentEntry {
  id: string
  name: string
  kind: 'button' | 'card' | 'input' | 'chip' | 'row'
  usage_notes: string
  config: Record<string, unknown>
  snippet: string
}

export interface LayoutEntry {
  id: string
  name: string
  usage_notes: string
  config: {
    container: 'flex' | 'grid'
    direction?: 'row' | 'column'
    gap?: number
    wrap?: boolean
    justify?: 'start' | 'center' | 'end' | 'between' | 'around'
    align?: 'start' | 'center' | 'end' | 'stretch'
    columns?: string
    children: { kind: ComponentEntry['kind']; label?: string }[]
  }
  snippet: string
}

const THEMES: ThemeEntry[] = [
  {
    id: 'default',
    name: 'Default',
    usage_notes:
      "The baseline. Use this when nothing about the page calls for a distinct mood — most pages should stay here so distinct themes stay meaningful.",
    variables: {
      '--sp-bg': '#242424',
      '--sp-bg-light': '#ffffff',
      '--sp-text': 'rgba(255, 255, 255, 0.87)',
      '--sp-text-light': '#213547',
      '--sp-link': '#646cff',
      '--sp-link-hover': '#535bf2',
      '--sp-btn-bg': '#1a1a1a',
      '--sp-btn-bg-light': '#f9f9f9',
      '--sp-chip-bg': '#e9ecef',
      '--sp-chip-active': '#0d6efd',
    },
  },
  {
    id: 'warm-ember',
    name: 'Warm Ember',
    usage_notes:
      'Amber/orange accents on a near-black ground. Use for reflective or low-key contexts (writing, journaling, late-evening reading). Avoid for dense data UIs — the warm cast washes out the muted greys we rely on to separate chrome from content.',
    variables: {
      '--sp-bg': '#1f1a15',
      '--sp-bg-light': '#fffbf5',
      '--sp-text': 'rgba(255, 235, 205, 0.9)',
      '--sp-text-light': '#3d2b1f',
      '--sp-link': '#e8943a',
      '--sp-link-hover': '#d47b20',
      '--sp-btn-bg': '#2a2018',
      '--sp-btn-bg-light': '#fef6ee',
      '--sp-chip-bg': '#fde8cd',
      '--sp-chip-active': '#e8943a',
    },
  },
  {
    id: 'forest',
    name: 'Forest',
    usage_notes:
      'Cool greens, grounded and quiet. Use for outdoor/nature-adjacent or calming contexts. Reads as more neutral than Warm Ember, so safe-ish for charts, but still prefer Default when accuracy of small color differences matters (the green chip background can collide with success states).',
    variables: {
      '--sp-bg': '#1a2520',
      '--sp-bg-light': '#f6faf7',
      '--sp-text': 'rgba(220, 240, 225, 0.9)',
      '--sp-text-light': '#1f3a2a',
      '--sp-link': '#3aa66a',
      '--sp-link-hover': '#2a8a52',
      '--sp-btn-bg': '#1f3028',
      '--sp-btn-bg-light': '#eef6f0',
      '--sp-chip-bg': '#d0e8d8',
      '--sp-chip-active': '#2a9a55',
    },
  },
]

const COMPONENTS: ComponentEntry[] = [
  {
    id: 'btn-primary',
    name: 'Primary action',
    kind: 'button',
    usage_notes:
      'The main commit on a page — Save, Submit, Create. Exactly one per page; if you find yourself wanting two, demote one to Subtle action.',
    config: { size: 'md', theme: 'primary', label: 'Save' },
    snippet: `<button type='button' className='btn btn-primary'>Save</button>`,
  },
  {
    id: 'btn-subtle',
    name: 'Subtle action',
    kind: 'button',
    usage_notes:
      "Secondary controls that don't commit user data — Cancel, Edit, Filter, Refresh. Pair with Primary action when both are present.",
    config: { size: 'sm', theme: 'light', label: 'Cancel' },
    snippet: `<button type='button' className='btn btn-sm btn-light'>Cancel</button>`,
  },
  {
    id: 'btn-destructive',
    name: 'Destructive',
    kind: 'button',
    usage_notes:
      "For deletes and other irreversibles. Always require a confirmation step before the action runs — the button being red isn't enough.",
    config: { size: 'sm', theme: 'danger', label: 'Delete' },
    snippet: `<button type='button' className='btn btn-sm btn-danger'>Delete</button>`,
  },
  {
    id: 'btn-floating-link',
    name: 'Floating link',
    kind: 'button',
    usage_notes:
      'Minimal text-only "see all", "view details", "skip" affordances inside a card or row. Don\'t use as the only action on a page — agents will miss it.',
    config: { size: 'sm', theme: 'light', label: 'See all →' },
    snippet: `<a href='/all' className='link-subtle'>See all →</a>`,
  },
  {
    id: 'card-surface',
    name: 'Surface card',
    kind: 'card',
    usage_notes:
      'The canonical container for a single coherent unit (one entry, one record, one configuration block). Use one card per concept; nesting cards more than one deep usually means the data model needs flattening, not more chrome.',
    config: {
      label: 'Card title',
      text: 'Body copy explaining the contents.',
      background: '#ffffff',
      color: '#213547',
      padding: '1rem',
      borderRadius: '6px',
    },
    snippet: `<div className='card'>\n  <h5>Card title</h5>\n  <p>Body copy.</p>\n</div>`,
  },
  {
    id: 'chip-tag',
    name: 'Tag chip',
    kind: 'chip',
    usage_notes:
      'Read-only label for a category, tag, or status. For interactive filters use a Subtle action button, not a chip — chips don\'t signal "clickable" strongly enough.',
    config: { label: 'tagname', background: '#e9ecef', color: '#213547' },
    snippet: `<span className='badge bg-secondary'>tagname</span>`,
  },
]

const LAYOUTS: LayoutEntry[] = [
  {
    id: 'toolbar-row',
    name: 'Toolbar row',
    usage_notes:
      'Horizontal action bar above a table or list. Subtle actions cluster at the start; the Primary action (if any) sits at the end. Wraps on narrow viewports.',
    config: {
      container: 'flex',
      direction: 'row',
      gap: 8,
      wrap: true,
      justify: 'between',
      align: 'center',
      children: [
        { kind: 'button', label: 'Filter' },
        { kind: 'button', label: 'Sort' },
        { kind: 'button', label: 'New' },
      ],
    },
    snippet: `<div className='d-flex justify-content-between gap-2 flex-wrap'>\n  <div className='d-flex gap-2'>\n    <button className='btn btn-sm btn-light'>Filter</button>\n    <button className='btn btn-sm btn-light'>Sort</button>\n  </div>\n  <button className='btn btn-sm btn-primary'>New</button>\n</div>`,
  },
  {
    id: 'card-grid',
    name: 'Card grid',
    usage_notes:
      'Responsive grid of equal-weight items (recipes, projects, options). Columns auto-fill to minimum card width — set the min in CSS, not by hardcoding a column count, so the grid reflows cleanly between phone and desktop.',
    config: {
      container: 'grid',
      gap: 16,
      columns: 'repeat(auto-fill, minmax(220px, 1fr))',
      children: [
        { kind: 'card', label: 'Item 1' },
        { kind: 'card', label: 'Item 2' },
        { kind: 'card', label: 'Item 3' },
        { kind: 'card', label: 'Item 4' },
      ],
    },
    snippet: `<div style={{\n  display: 'grid',\n  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',\n  gap: '1rem',\n}}>\n  {items.map((item) => <Card key={<item.id>} {...item} />)}\n</div>`,
  },
]

export const CATALOG: {
  themes: ThemeEntry[]
  components: ComponentEntry[]
  layouts: LayoutEntry[]
} = { themes: THEMES, components: COMPONENTS, layouts: LAYOUTS }
