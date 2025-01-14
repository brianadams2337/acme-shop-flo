import { expect, test } from '../fixtures/fixtures'
import { getUserForBrowser } from '../support/utils'
import { BASKET_TEST_DATA, CHECKOUT_URL } from '../support/constants'

test.beforeEach(async ({ accountPage, homePage, page }, testInfo) => {
  const projectName = testInfo.project.name
  const { email, password } = getUserForBrowser(projectName)

  await homePage.visitPage()
  await page.waitForLoadState('networkidle')
  await accountPage.userAuthentication(email, password)
})

test('C2132536 Verify Checkout order overview', async ({
  checkoutPage,
  basketPage,
  page,
}) => {
  await test.step('Adding product to Basket', async () => {
    await basketPage.addProductToBasket(
      BASKET_TEST_DATA.productRegularVariantId,
      1,
    )
    await page.goto(CHECKOUT_URL, { waitUntil: 'commit' })
  })

  await test.step('Visit Checkout page and check Items', async () => {
    const pageUrl = page.url()
    expect(pageUrl).toContain(CHECKOUT_URL)
    await expect(async () => {
      await checkoutPage.basketContainer.waitFor()
      await expect(checkoutPage.basketContainer).toBeAttached()
      await expect(checkoutPage.itemQuantity).toBeVisible()
      await expect(checkoutPage.deliveryEstimate).toBeVisible()
    }).toPass()
  })

  await test.step('Remove item and check empty state', async () => {
    await expect(async () => {
      await checkoutPage.buttonItemRemove.click()
      await expect(checkoutPage.basketContainer).not.toBeAttached()
    }).toPass()
  })
})
