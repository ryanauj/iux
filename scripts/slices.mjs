import pkg from '/opt/node22/lib/node_modules/playwright/index.js'
const { chromium } = pkg
import { mkdirSync } from 'node:fs'

const BASE = 'http://localhost:5173/iux/#/apps/contracts'
const OUT = '/tmp/slices'
mkdirSync(OUT, { recursive: true })

const pages = process.argv[2]
  ? [[process.argv[2], process.argv[3] || '']]
  : [
      ['overview', ''], ['ladder', '/ladder'], ['anatomy', '/anatomy'],
      ['max', '/max'], ['exceptions', '/exceptions'], ['tax', '/tax'],
      ['aprons', '/aprons'], ['team', '/team'],
    ]

const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true,
})
const page = await ctx.newPage()

const SLICE = 760 // css px per slice -> readable when read at 2x
for (const [name, suffix] of pages) {
  await page.goto(BASE + suffix, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  const h = await page.evaluate(() => document.body.scrollHeight)
  const n = Math.ceil(h / SLICE)
  for (let i = 0; i < n; i++) {
    const y = i * SLICE
    const clipH = Math.min(SLICE, h - y)
    await page.screenshot({
      path: `${OUT}/${name}-${i}.png`,
      fullPage: true,
      clip: { x: 0, y, width: 390, height: clipH },
    })
  }
  console.log(name, 'height', h, 'slices', n)
}
await browser.close()
