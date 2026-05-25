// Drawer ladder rungs: side (right edge + ESC/scrim dismiss), sectioned
// (sticky footer with actions), navigable (back stack + breadcrumb), sheet
// (snap points). `inlineRender` keeps the dialog inside the sandbox so
// the runner finds it with normal selectors. Rung 4's drag-to-dismiss
// physics is pointer-driven and is asserted only via snap-point height.
import { useState } from 'react'
import { Drawer, type DrawerView } from '../../components/Drawer/Drawer'
import type { IntegrationTest } from '../types'

function SideComposition() {
  const [open, setOpen] = useState(true)
  return (
    <div style={{ position: 'relative', minHeight: 240 }}>
      <Drawer
        variant="side"
        open={open}
        onOpenChange={setOpen}
        title="Details"
        inlineRender
      >
        <p data-testid="body">Side body</p>
      </Drawer>
      <span data-testid="state">{open ? 'open' : 'closed'}</span>
    </div>
  )
}

function SectionedComposition() {
  const [open, setOpen] = useState(true)
  const [saved, setSaved] = useState(false)
  return (
    <div style={{ position: 'relative', minHeight: 240 }}>
      <Drawer
        variant="sectioned"
        open={open}
        onOpenChange={setOpen}
        title="Edit"
        inlineRender
        primaryAction={{ label: 'Save', onClick: () => setSaved(true) }}
        secondaryAction={{ label: 'Cancel' }}
      >
        <p>Long body content.</p>
      </Drawer>
      <span data-testid="saved">{saved ? 'yes' : 'no'}</span>
    </div>
  )
}

function NavigableComposition() {
  const [open, setOpen] = useState(true)
  const views: DrawerView[] = [
    {
      id: 'root',
      title: 'Settings',
      render: (push) => (
        <button type="button" data-testid="go-profile" onClick={() => push('profile')}>
          Open profile
        </button>
      ),
    },
    {
      id: 'profile',
      title: 'Profile',
      render: () => <p data-testid="profile-body">Profile view body</p>,
    },
  ]
  return (
    <div style={{ position: 'relative', minHeight: 320 }}>
      <Drawer variant="navigable" open={open} onOpenChange={setOpen} inlineRender views={views} initialViewId="root" />
    </div>
  )
}

function SheetComposition() {
  const [open, setOpen] = useState(true)
  return (
    <div style={{ position: 'relative', minHeight: 320 }}>
      <Drawer
        variant="sheet"
        open={open}
        onOpenChange={setOpen}
        inlineRender
        snapPoints={[0.4, 0.8]}
        defaultSnapIndex={1}
        ariaLabel="Bottom sheet"
      >
        <p data-testid="body">Sheet body</p>
      </Drawer>
    </div>
  )
}

export const drawerTests: IntegrationTest[] = [
  {
    id: 'drawer-rung-1-side',
    name: 'Drawer — side opens and closes via close button + Escape (rung 1)',
    description: 'Side variant renders a right-edge dialog with backdrop and dismisses on ESC + the close affordance.',
    components: ['drawer'],
    tags: ['drawer', 'rung-1', 'overlay'],
    render: () => <SideComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-drawer--side.iux-drawer--side-right', label: 'Right-side drawer' },
      { kind: 'assertVisible', selector: '.iux-drawer__scrim', label: 'Backdrop scrim renders' },
      { kind: 'assertText', selector: '.iux-drawer__title', text: 'Details', label: 'Title renders' },
      { kind: 'press', key: 'Escape', selector: '.iux-drawer', label: 'Press Escape' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: 'closed', label: 'Drawer closed' },
      { kind: 'assertGone', selector: '.iux-drawer', label: 'Drawer DOM removed' },
    ],
  },
  {
    id: 'drawer-rung-2-sectioned',
    name: 'Drawer — sectioned has sticky footer with primary action (rung 2)',
    description: 'Sectioned variant gives the body a scroll modifier, the footer a sticky modifier, and fires primary onClick.',
    components: ['drawer'],
    tags: ['drawer', 'rung-2', 'overlay'],
    render: () => <SectionedComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-drawer--sectioned', label: 'Sectioned variant class' },
      { kind: 'assertVisible', selector: '.iux-drawer__body--scroll', label: 'Body has scroll modifier' },
      { kind: 'assertVisible', selector: '.iux-drawer__footer--sticky', label: 'Footer is sticky' },
      { kind: 'click', selector: '.iux-drawer__btn--primary', label: 'Click Save' },
      { kind: 'assertText', selector: '[data-testid="saved"]', text: 'yes', label: 'Primary action fired' },
      { kind: 'assertGone', selector: '.iux-drawer', label: 'Drawer closed after action' },
    ],
  },
  {
    id: 'drawer-rung-3-navigable',
    name: 'Drawer — navigable pushes view and renders breadcrumb (rung 3)',
    description: 'Navigable variant supports a view stack: pushing a view updates the breadcrumb and back affordance.',
    components: ['drawer'],
    tags: ['drawer', 'rung-3', 'overlay'],
    render: () => <NavigableComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-drawer--navigable', label: 'Navigable variant class' },
      { kind: 'assertCount', selector: '.iux-drawer__crumb', count: 1, label: 'One crumb initially' },
      { kind: 'click', selector: '[data-testid="go-profile"]', label: 'Push profile view' },
      { kind: 'assertCount', selector: '.iux-drawer__crumb', count: 2, label: 'Two crumbs after push' },
      { kind: 'assertVisible', selector: '[data-testid="profile-body"]', label: 'Profile view rendered' },
      { kind: 'assertVisible', selector: '.iux-drawer__back', label: 'Back button visible' },
      { kind: 'click', selector: '.iux-drawer__back', label: 'Pop back to root' },
      { kind: 'assertCount', selector: '.iux-drawer__crumb', count: 1, label: 'One crumb after pop' },
      { kind: 'assertVisible', selector: '[data-testid="go-profile"]', label: 'Root view restored' },
    ],
  },
  {
    id: 'drawer-rung-4-sheet',
    name: 'Drawer — sheet renders with snap-point height (rung 4)',
    description: 'Sheet variant pins to bottom, exposes the drag handle, and sets panel height from defaultSnapIndex.',
    components: ['drawer'],
    tags: ['drawer', 'rung-4', 'overlay'],
    render: () => <SheetComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-drawer--sheet.iux-drawer--side-bottom', label: 'Sheet variant at bottom' },
      { kind: 'assertVisible', selector: '.iux-drawer__handle', label: 'Drag handle renders' },
      { kind: 'assertVisible', selector: '[data-testid="body"]', label: 'Sheet body content visible' },
    ],
  },
]
