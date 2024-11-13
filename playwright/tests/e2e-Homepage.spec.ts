import { expect, test } from '../fixtures/fixtures'
import { getAllLinksFromPage } from '../support/utils'

test.beforeEach(async ({ homePage, countryDetector, page }) => {
  await homePage.visitPage()
  await page.waitForLoadState('domcontentloaded')
  await countryDetector.closeModal()
})

test('C2141227 Verify Homepage sections', async ({
  homePage,
  header,
  footer,
}) => {
  await expect(async () => {
    await homePage.homepageContent.waitFor()
    await expect(header.mainHeader).toBeVisible()
    await expect(footer.footerWrapper).toBeVisible()
  }).toPass()
})

test('C2141228 Verify Homepage links', async ({ page, context }) => {
  test.setTimeout(60000)
  const linkUrls = await getAllLinksFromPage(page)

  for (const url of linkUrls) {
    await test.step(`Checking link: ${url}`, async () => {
      try {
        const response = await page.request.head(url)
        expect(response.status()).toBeLessThan(400)
        expect(response.statusText()).toBe('OK')
      } catch (error) {
        console.warn(
          `HEAD request failed for ${url}, attempting full page navigation.`,
        )
        console.error('Error details:', error)
        try {
          const newPage = await context.newPage()
          await newPage.goto(url)
          await newPage.waitForLoadState('networkidle')
          await newPage.close()
        } catch (navError) {
          console.error(`[Error] Navigation failed for ${url}:`, navError)
          throw new Error(`Both HEAD request and navigation failed for ${url}`)
        }
      }
    })
  }
})
