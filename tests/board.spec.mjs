import { test, expect } from '@playwright/test'
import deck from '../src/assets/data/deck.json' with { type: 'json' }

const selected = '.board-grid__cell--selected'

test.beforeEach(async ({ page }) => {
  // Keep test gameplay out of production analytics and remove external font timing.
  await page.route('https://www.googletagmanager.com/**', route => route.fulfill({ body: '' }))
  await page.route('https://fonts.googleapis.com/**', route => route.fulfill({ body: '', contentType: 'text/css' }))
  page.on('pageerror', error => { throw error })
})

test('board renders, toggles, persists, wins, dismisses and resets', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.board-grid__cell')).toHaveCount(25)
  await expect(page.locator(selected)).toHaveCount(1)
  await expect(page.locator('#square-13')).toHaveText('Lights Out! (Free)')
  await page.locator('#square-13').click()
  await expect(page.locator(selected)).toHaveCount(1)
  await expect(page.getByRole('button', { name: 'Share Card' })).toHaveCSS('cursor', 'pointer')
  await expect(page.locator('.winner-modal')).toHaveCount(0)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.locator('#square-1').click()
  await expect(page.locator(selected)).toHaveCount(2)
  await page.locator('#square-1').click()
  await expect(page.locator(selected)).toHaveCount(1)
  await page.locator('#square-1').click()
  const board = await page.locator('.celltext').allTextContents()
  await page.reload()
  await expect(page.locator(selected)).toHaveCount(2)
  expect(await page.locator('.celltext').allTextContents()).toEqual(board)
  for (const id of [2, 3, 4, 5]) await page.locator(`#square-${id}`).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.getByRole('button', { name: 'Close winner modal' }).click()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await page.reload()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(page.locator(selected)).toHaveCount(6)
  await page.getByRole('button', { name: 'Reset Grid' }).click()
  await expect(page.locator(selected)).toHaveCount(1)
  expect(await page.locator('.celltext').allTextContents()).not.toEqual(board)
  const analytics = await page.evaluate(() => window.dataLayer.map(args => Array.from(args)))
  expect(analytics).toContainEqual(['config', 'G-9DH48XP22E', expect.objectContaining({ send_page_view: true })])
  expect(analytics).toContainEqual(['event', 'Click', expect.objectContaining({ event_label: 'Reset' })])
})

test('existing persisted boards survive the Pinia upgrade', async ({ page }) => {
  const saved = {
    name: 'game', event: deck.event, version: deck.version, winnerCardDismissed: false,
    board: Array.from({ length: 25 }, (_, i) => ({ id: i + 1, text: i === 12 ? 'Lights Out! (Free)' : `Saved event ${i + 1}`, selected: [0, 12].includes(i) }))
  }
  await page.addInitScript(state => localStorage.setItem('game', JSON.stringify(state)), saved)
  await page.goto('/')
  await expect(page.locator('#square-1')).toHaveText('Saved event 1')
  await expect(page.locator(selected)).toHaveCount(2)
})

test('sharing produces a real PNG and success toast', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', { value: {
      write: async items => {
        const blob = await items[0].getType('image/png')
        const bitmap = await createImageBitmap(blob)
        window.copiedImage = { type: blob.type, size: blob.size, width: bitmap.width, height: bitmap.height }
        bitmap.close()
      }
    } })
  })
  await page.goto('/')
  await page.getByRole('button', { name: 'Share Card' }).click()
  await expect(page.getByText('Board copied to your clipboard!')).toBeVisible({ timeout: 20000 })
  const image = await page.evaluate(() => window.copiedImage)
  expect(image.type).toBe('image/png')
  expect(image.size).toBeGreaterThan(10000)
  expect(image.width).toBeGreaterThanOrEqual(760)
  expect(image.height).toBeGreaterThan(300)
  await expect(page.locator('#app-share-capture')).toHaveCount(0)
})

test('unsupported clipboard shows an error without disrupting gameplay', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { value: undefined }))
  await page.goto('/')
  await page.getByRole('button', { name: 'Share Card' }).click()
  await expect(page.getByText(/Clipboard image sharing is not supported/)).toBeVisible({ timeout: 20000 })
  await expect(page.locator('#app-share-capture')).toHaveCount(0)
  await page.locator('#square-1').click()
  await expect(page.locator(selected)).toHaveCount(2)
})
