import pkg from '/opt/node22/lib/node_modules/playwright/index.js'
const { chromium } = pkg
import { mkdirSync } from 'node:fs'

const BASE = 'http://localhost:5173/iux/#/apps/contracts'
const OUT = '/tmp/tech-shots'
mkdirSync(OUT, { recursive: true })

const ids = [
  // dark gradient registers
  'aurora-nebula', 'aurora-spectrum', 'aurora-ember', 'aurora-verdant',
  // light gradient registers
  'aurora-daybreak', 'aurora-bloom',
  // glass + cel-shaded variations
  'cel-glass-flux', 'cel-shaded-circuit',
]

const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: 430, height: 1200 },
  deviceScaleFactor: 2,
})
const page = await ctx.newPage()

for (const id of ids) {
  await page.goto('about:blank')
  await page.goto(`${BASE}?palette=${id}`, { waitUntil: 'load' })
  await page.waitForTimeout(1500) // let components mount and the aurora drift settle
  await page.screenshot({ path: `${OUT}/${id}.png`, clip: { x: 0, y: 0, width: 430, height: 1180 } })
  console.log('shot', id)
}
await browser.close()
