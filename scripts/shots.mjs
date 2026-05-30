import pkg from '/opt/node22/lib/node_modules/playwright/index.js'
const { chromium } = pkg
import { mkdirSync } from 'node:fs'

const BASE = 'http://localhost:5173/iux/#/apps/contracts'
const OUT = '/tmp/shots'
mkdirSync(OUT, { recursive: true })

const pages = [
  ['overview', ''],
  ['ladder', '/ladder'],
  ['anatomy', '/anatomy'],
  ['max', '/max'],
  ['exceptions', '/exceptions'],
  ['tax', '/tax'],
  ['aprons', '/aprons'],
  ['trades', '/trades'],
  ['team', '/team'],
]

const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
})
const page = await ctx.newPage()
const errors = []
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })
page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message))

for (const [name, suffix] of pages) {
  await page.goto(BASE + suffix, { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true })
  console.log('shot', name)
}

console.log('CONSOLE ERRORS:', errors.length ? JSON.stringify(errors, null, 2) : 'none')
await browser.close()
