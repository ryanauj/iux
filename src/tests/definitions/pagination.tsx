// ABOUTME: Integration tests for the Pagination component covering three ladder rungs: numbered (aria-current page, prev/next, ellipsis gaps), rich (first/last jump buttons and page-size select), and load-more (item count display and Load more button extends the list); rung 4 (infinite scroll) requires IntersectionObserver and is omitted.

// Pagination ladder rungs: numbered (prev/next + ellipsis), rich (first/last
// jump + page-size selector), load-more (button + item count), infinite (scroll
// sentinel). Rung 4 (infinite) is driven by IntersectionObserver and
// window-scroll — not assertable in the sandbox runner — so it is skipped.
import { useState } from 'react'
import { Pagination } from '../../components/Pagination/Pagination'
import type { IntegrationTest } from '../types'

function NumberedComposition() {
  const [page, setPage] = useState(1)
  return (
    <div>
      <Pagination page={page} pageCount={10} onPageChange={setPage} />
      <span data-testid="state">{page}</span>
    </div>
  )
}

function RichComposition() {
  const [page, setPage] = useState(5)
  const [size, setSize] = useState(25)
  return (
    <div>
      <Pagination
        variant="rich"
        page={page}
        pageCount={20}
        onPageChange={setPage}
        pageSize={size}
        onPageSizeChange={setSize}
      />
      <span data-testid="state">{page}</span>
      <span data-testid="size">{size}</span>
    </div>
  )
}

function LoadMoreComposition() {
  const [loaded, setLoaded] = useState(20)
  const total = 60
  return (
    <div>
      <Pagination
        variant="load-more"
        itemCount={loaded}
        totalCount={total}
        hasMore={loaded < total}
        onLoadMore={() => setLoaded(n => Math.min(total, n + 20))}
      />
      <span data-testid="state">{loaded}</span>
    </div>
  )
}

// ABOUTME: Array of three IntegrationTest definitions for Pagination: numbered prev/next with ellipsis, rich first/last jump with page-size select, and load-more button with item count.
export const paginationTests: IntegrationTest[] = [
  {
    id: 'pagination-rung-1-numbered',
    name: 'Pagination — numbered prev/next and ellipsis (rung 1)',
    description: 'Numbered variant shows current page with aria-current, supports prev/next, and renders ellipsis gaps.',
    components: ['pagination'],
    tags: ['pagination', 'rung-1'],
    render: () => <NumberedComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-pagination--numbered', label: 'Numbered variant class' },
      { kind: 'assertVisible', selector: '.iux-pagination__btn--num[aria-current="page"]', label: 'Current page aria' },
      { kind: 'assertVisible', selector: '.iux-pagination__gap', label: 'Ellipsis gap' },
      { kind: 'click', selector: '[aria-label="Page 2"]', label: 'Click page 2' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: '2', label: 'Page is 2' },
      { kind: 'click', selector: '[aria-label="Next page"]', label: 'Click next' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: '3', label: 'Page is 3' },
    ],
  },
  {
    id: 'pagination-rung-2-rich',
    name: 'Pagination — rich first/last jump and page size (rung 2)',
    description: 'Rich variant adds First/Last jump buttons and a page-size select that updates state.',
    components: ['pagination'],
    tags: ['pagination', 'rung-2'],
    render: () => <RichComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-pagination--rich', label: 'Rich variant class' },
      { kind: 'assertVisible', selector: '[aria-label="First page"]', label: 'First page button' },
      { kind: 'assertVisible', selector: '[aria-label="Last page"]', label: 'Last page button' },
      { kind: 'click', selector: '[aria-label="First page"]', label: 'Jump to first' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: '1', label: 'Page is 1' },
      { kind: 'click', selector: '[aria-label="Last page"]', label: 'Jump to last' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: '20', label: 'Page is 20' },
      { kind: 'assertVisible', selector: '.iux-pagination__size-select', label: 'Page-size select' },
    ],
  },
  {
    id: 'pagination-rung-3-load-more',
    name: 'Pagination — load-more button extends the list (rung 3)',
    description: 'Load-more variant shows an item count and a Load more button that fires onLoadMore.',
    components: ['pagination'],
    tags: ['pagination', 'rung-3'],
    render: () => <LoadMoreComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-pagination--load-more', label: 'Load-more variant class' },
      { kind: 'assertText', selector: '.iux-pagination__count', text: '20 of 60', label: 'Initial count' },
      { kind: 'click', selector: '.iux-pagination__btn--primary', label: 'Click Load more' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: '40', label: 'Loaded 40' },
      { kind: 'click', selector: '.iux-pagination__btn--primary', label: 'Click Load more again' },
      { kind: 'assertText', selector: '[data-testid="state"]', text: '60', label: 'Loaded all' },
      { kind: 'assertText', selector: '.iux-pagination__btn--primary', text: 'All loaded', label: 'Button shows All loaded' },
    ],
  },
]
