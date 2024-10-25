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

test('C2141228 Verify Homepage links', async ({ page }) => {
  const linkUrls = await getAllLinksFromPage(page)

  for (const url of linkUrls) {
    await test.step(`Checking link: ${url}`, async () => {
      try {
        const response = await page.request.get(url)
        expect.soft(response.ok(), `${url} has error status code`).toBeTruthy()
      } catch {
        expect.soft(null, `request for ${url} failed`).toBeTruthy()
      }
    })
  }
})
