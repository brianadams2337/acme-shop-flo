import { expect, test } from '../fixtures/fixtures'
import {
  BASKET_TEST_DATA,
  CHECKOUT_URL,
  LOGGED_IN_USER_DATA,
} from '../support/constants'

test.describe.configure({ mode: 'serial' })

test.beforeEach(async ({ accountPage }) => {
  await accountPage.userAuthentication(
    LOGGED_IN_USER_DATA.email,
    LOGGED_IN_USER_DATA.password,
  )
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
