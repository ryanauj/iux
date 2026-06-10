// Sidebar ladder rungs: links (flat list), groups (collapsible sections),
// rail (collapse-to-rail + pinned), search (filter input). The resize handle
// in rail variant is pointer-driven and not asserted here.
import { useState } from 'react'
import { Sidebar, type SidebarGroup, type SidebarItem } from '../../components/Sidebar/Sidebar'
import type { IntegrationTest } from '../types'

const ITEMS: SidebarItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'inbox', label: 'Inbox', badge: 3 },
  { id: 'projects', label: 'Projects' },
]

function LinksComposition() {
  const [active, setActive] = useState<string>('home')
  return (
    <div>
      <Sidebar variant="links" items={ITEMS} activeId={active} onActiveChange={setActive} />
      <span data-testid="state">{active}</span>
    </div>
  )
}

function GroupsComposition() {
  const groups: SidebarGroup[] = [
    {
      id: 'main',
      label: 'Main',
      collapsible: true,
      items: [
        { id: 'home', label: 'Home' },
        { id: 'inbox', label: 'Inbox', badge: 7 },
      ],
    },
    {
      id: 'team',
      label: 'Team',
      collapsible: true,
      defaultCollapsed: true,
      items: [
        { id: 'people', label: 'People' },
      ],
    },
  ]
  return <Sidebar variant="groups" groups={groups} defaultActiveId="home" />
}

function RailComposition() {
  const items: SidebarItem[] = [
    { id: 'home', label: 'Home', icon: <span>H</span>, pinned: true },
    { id: 'inbox', label: 'Inbox', icon: <span>I</span> },
  ]
  return <Sidebar variant="rail" items={items} defaultActiveId="home" defaultCollapsed={false} />
}

function SearchComposition() {
  const searchItems: SidebarItem[] = [
    { id: 'apples', label: 'Apples', keywords: ['fruit'] },
    { id: 'bananas', label: 'Bananas', keywords: ['fruit'] },
    { id: 'carrots', label: 'Carrots', keywords: ['veg'] },
  ]
  return <Sidebar variant="search" items={searchItems} />
}

export const sidebarTests: IntegrationTest[] = [
  {
    id: 'sidebar-rung-1-links',
    name: 'Sidebar — links activates clicked item (rung 1)',
    description: 'Links variant renders a flat list; clicking an item marks it active and fires onActiveChange.',
    components: ['sidebar'],
    tags: ['sidebar', 'rung-1'],
    render: () => <LinksComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-sidebar--links', label: 'Links variant class' },
      { kind: 'assertCount', selector: '.iux-sidebar__item', count: 3, label: 'Three items' },
      { kind: 'assertVisible', selector: '.iux-sidebar__item.is-active', label: 'Home active initially' },
      { kind: 'assertText', selector: '.iux-sidebar__badge', text: '3', label: 'Badge renders' },
      { kind: 'click', selector: '.iux-sidebar__list li:nth-child(3) .iux-sidebar__link', label: 'Activate Projects' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: 'projects', label: 'onActiveChange fired' },
    ],
  },
  {
    id: 'sidebar-rung-2-groups',
    name: 'Sidebar — groups toggle collapsed state (rung 2)',
    description: 'Groups variant exposes per-section collapse toggles wired through aria-expanded.',
    components: ['sidebar'],
    tags: ['sidebar', 'rung-2'],
    render: () => <GroupsComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-sidebar--groups', label: 'Groups variant class' },
      { kind: 'assertCount', selector: '.iux-sidebar__section', count: 2, label: 'Two sections' },
      { kind: 'assertVisible', selector: '.iux-sidebar__section:nth-child(1) .iux-sidebar__section-toggle[aria-expanded="true"]', label: 'Main expanded by default' },
      { kind: 'assertVisible', selector: '.iux-sidebar__section:nth-child(2) .iux-sidebar__section-toggle[aria-expanded="false"]', label: 'Team collapsed by default' },
      { kind: 'click', selector: '.iux-sidebar__section:nth-child(2) .iux-sidebar__section-toggle', label: 'Expand Team' },
      { kind: 'assertVisible', selector: '.iux-sidebar__section:nth-child(2) .iux-sidebar__section-toggle[aria-expanded="true"]', label: 'Team expanded after click' },
    ],
  },
  {
    id: 'sidebar-rung-3-rail',
    name: 'Sidebar — rail collapses to icon-only (rung 3)',
    description: 'Rail variant toggles between full and icon-only via the collapse button.',
    components: ['sidebar'],
    tags: ['sidebar', 'rung-3'],
    render: () => <RailComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-sidebar--rail', label: 'Rail variant class' },
      { kind: 'assertVisible', selector: '.iux-sidebar__section-title', label: 'Pinned section title shown' },
      { kind: 'assertVisible', selector: '.iux-sidebar__collapse-btn[aria-expanded="true"]', label: 'Expanded by default' },
      { kind: 'click', selector: '.iux-sidebar__collapse-btn', label: 'Collapse to rail' },
      { kind: 'assertVisible', selector: '.iux-sidebar.is-collapsed', label: 'Collapsed class applied' },
      { kind: 'assertVisible', selector: '.iux-sidebar__item.is-icon-only', label: 'Items are icon-only' },
    ],
  },
  {
    id: 'sidebar-rung-4-search',
    name: 'Sidebar — search filters the item list (rung 4)',
    description: 'Search variant filters items by typed query against label + keywords.',
    components: ['sidebar'],
    tags: ['sidebar', 'rung-4'],
    render: () => <SearchComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-sidebar--search', label: 'Search variant class' },
      { kind: 'assertCount', selector: '.iux-sidebar__item', count: 3, label: 'All items initially' },
      { kind: 'type', selector: '.iux-sidebar__search-input', text: 'ban', label: 'Filter by query' },
      { kind: 'assertCount', selector: '.iux-sidebar__item', count: 1, label: 'Only Bananas matches' },
      { kind: 'type', selector: '.iux-sidebar__search-input', text: 'zzz', label: 'No-match query' },
      { kind: 'assertVisible', selector: '.iux-sidebar__empty', label: 'Empty-state row shown' },
    ],
  },
]
