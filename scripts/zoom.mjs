import pkg from '/opt/node22/lib/node_modules/playwright/index.js'
const { chromium } = pkg
import { mkdirSync } from 'node:fs'
mkdirSync('/tmp/zoom', { recursive: true })

const BASE = 'http://localhost:5173/iux/#/apps/contracts'
const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true,
})
const page = await ctx.newPage()

// arg: name, suffix, selector
const [name, suffix, selector] = process.argv.slice(2)
await page.goto(BASE + (suffix || ''), { waitUntil: 'networkidle' })
await page.waitForTimeout(500)
const el = await page.$(selector)
if (!el) { console.log('NOT FOUND', selector); process.exit(1) }
await el.scrollIntoViewIfNeeded()
await page.waitForTimeout(200)
await el.screenshot({ path: `/tmp/zoom/${name}.png` })
console.log('saved', name)
await browser.close()
