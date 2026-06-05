import pkg from '/opt/node22/lib/node_modules/playwright/index.js'
const { chromium } = pkg
import { mkdirSync } from 'node:fs'

const BASE = 'http://localhost:5173/iux/#/apps/contracts'
const OUT = '/tmp/new-shots'
mkdirSync(OUT, { recursive: true })

const ids = [
  'cel-shaded-dracula-crt', 'cel-shaded-gruvbox-crt', 'cel-shaded-nord-crt', 'cel-shaded-solarized-crt', 'cel-shaded-monokai-crt',
  'cel-shaded-academia-glass', 'cel-shaded-ukiyo-glass', 'cel-shaded-constructivist-glass', 'cel-shaded-nouveau-glass', 'cel-shaded-botanical-glass',
]

const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: 430, height: 1200 },
  deviceScaleFactor: 2,
})
const page = await ctx.newPage()
const errors = []
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })
page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message))

for (const id of ids) {
  await page.goto(`${BASE}?palette=${id}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)
  // clip the top of the overview so each shot is a comparable, readable hero crop
  await page.screenshot({ path: `${OUT}/${id}.png`, clip: { x: 0, y: 0, width: 430, height: 1180 } })
  console.log('shot', id)
}

console.log('CONSOLE ERRORS:', errors.length ? JSON.stringify(errors.slice(0, 10), null, 2) : 'none')
await browser.close()
