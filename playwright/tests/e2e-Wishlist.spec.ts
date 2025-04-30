import { expect, test } from '../fixtures/fixtures'
import { LOGGED_IN_USER_DATA, WISHLIST_TEST_DATA } from '../support/constants'
import { verifySeoMetaTags, isMobile } from '../support/utils'

test.beforeEach(async ({ wishlistPage, baseURL, countryDetector }) => {
  await wishlistPage.visitWishlistPage('/wishlist', baseURL as string)
  await countryDetector.closeModal()
})

test('C2132174 C2132177 Verify Wishlist empty state', async ({
  wishlistPage,
  header,
  signinPage,
}) => {
  await test.step('Verify guest user', async () => {
    await expect(async () => {
      await wishlistPage.emptyState.waitFor()
      await expect(wishlistPage.buttonContinueShopping).toBeVisible()
      await expect(wishlistPage.buttonSignIn).toBeVisible()
      await expect(wishlistPage.emptyStateIcon).toBeVisible()
      await expect(wishlistPage.emptyStateHeadline).toBeVisible()
      await expect(wishlistPage.emptyStateSubheadline).toBeVisible()
    }).toPass()
  })
  await test.step('Verify logged-in user', async () => {
    await expect(async () => {
      await header.headerLoginButton.click()
      await signinPage.fillLoginData(
        LOGGED_IN_USER_DATA.email,
        LOGGED_IN_USER_DATA.password,
      )
      await signinPage.clickLoginButton()
      await wishlistPage.emptyState.waitFor()
      await expect(wishlistPage.buttonContinueShopping).toBeVisible()
      await expect(wishlistPage.emptyStateIcon).toBeVisible()
      await expect(wishlistPage.emptyStateHeadline).toBeVisible()
      await expect(wishlistPage.emptyStateSubheadline).toBeVisible()
    }).toPass()
  })
})

test('C2141222 C2183076 Verify Wishlist non-empty state', async ({
  wishlistPage,
  header,
  page,
  countryDetector,
  homePage,
  mobileNavigation,
  mainNavigation,
  breadcrumb,
  productListingPage,
}) => {
  await test.step('Add item to wishlist and verify product card', async () => {
    await expect(async () => {
      await homePage.visitPage()
      await page.waitForLoadState('networkidle')
      await countryDetector.closeModal()
      if (isMobile(page)) {
        await mobileNavigation.openPlpMobile()
      } else {
        await mainNavigation.navigateToPlpMainCategory()
      }
      await breadcrumb.breadcrumbCategoryActive.waitFor()
      await productListingPage.addProductToWishlist()
      await header.wishlistLink.waitFor()
      await expect(header.wishlistNumItems).toHaveText('1')
      await header.wishlistLink.click()
      await wishlistPage.wishlistItemsWrapper.waitFor()
      await countryDetector.closeModal()
      await expect(wishlistPage.wishlistCard).toBeVisible()
      await expect(wishlistPage.productBrand).toBeVisible()
    }).toPass()
  })
  await test.step('Verify Wishlist SEO data', async () => {
    const pageTitle = (await wishlistPage.pageTitle
      .nth(0)
      .textContent()) as string
    await verifySeoMetaTags(page, {
      robots: WISHLIST_TEST_DATA.seoRobots,
      canonical: page.url(),
    })
    await expect(wishlistPage.h1).toBeAttached()
    await expect(wishlistPage.h1).toContainText(pageTitle)
  })
  await test.step('Remove item from wishlist', async () => {
    await expect(async () => {
      await wishlistPage.removeItemFromWishlist()
      await wishlistPage.emptyState.waitFor()
      await expect(wishlistPage.buttonContinueShopping).toBeVisible()
    }).toPass()
  })
})
