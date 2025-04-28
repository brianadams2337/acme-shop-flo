import { expect, test } from '../fixtures/fixtures'
import { HOMEPAGE_PATH_DE } from '../support/constants'

test.beforeEach(async ({ homePage, footer, countryDetector }) => {
  await homePage.visitPage()
  await countryDetector.closeModal()
  await footer.footerWrapper.scrollIntoViewIfNeeded()
})

test('C2143605 Verify footer logo', async ({
  footer,
  page,
  baseURL,
  header,
  countryDetector,
}) => {
  await test.step('Verify logo click from Homepage', async () => {
    await expect(async () => {
      await expect(footer.footerLogo).toBeVisible()
      const pageUrl = page.url()
      await footer.footerLogo.click()
      expect(page.url()).toEqual(pageUrl)
      await page.waitForTimeout(1000)
      await expect(header.mainHeader).toBeInViewport()
      const scrollPosition = await page.evaluate(() => window.scrollY)
      expect(scrollPosition).toBe(0)
    }).toPass()
  })
  await test.step('Verify logo click from non-Homepage', async () => {
    await expect(async () => {
      await page.goto('/basket', { waitUntil: 'commit' })
      await countryDetector.closeModal()
      await expect(footer.footerLogo).toBeVisible()
      await footer.footerLogo.click()
      await page.waitForLoadState('domcontentloaded')
      await expect(header.mainHeader).toBeInViewport()
      expect(page.url()).toEqual(baseURL + HOMEPAGE_PATH_DE)
    }).toPass()
  })
})
