import { expect, test } from '../fixtures/fixtures'
import {
  getUserForBrowser,
  isMobile,
  verifySeoMetaTags,
} from '../support/utils'
import { BASKET_TEST_DATA, ROUTES } from '../support/constants'

/** @file Contains end-to-end tests for the basket page. */

/**
 * Verifies that when a guest user navigates to the basket page,
 * the empty basket state with appropriate title and subtitle is displayed.
 * Verifies that when a logged-in user with an empty basket navigates
 * to the basket page, the empty basket state is displayed, and the user has
 * the option to continue shopping.
 *
 * Prerequisites for this test:
 * To avoid conflicts between browsers in empty and non-empty states, every browser should use its own dedicated test user.
 * Five test users should be registered in the system and their e-mail addresses and password should match the values of
 * environment variables, as follows:
 * - `TEST_USER_EMAIL1` - test user for desktop Chromium.
 * - `TEST_USER_EMAIL2` - test user for desktop Firefox.
 * - `TEST_USER_EMAIL3` - test user for desktop Webkit (Safari).
 * - `TEST_USER_EMAIL4` - test user for mobile Chrome.
 * - `TEST_USER_EMAIL5` - test user for mobile Webkit (Safari).
 * - The password for all test users is the same, and must be defined via `TEST_USER_PASSWORD` environment variable.
 */
test('C2132186 C2132187 Verify Basket empty state as a guest and logged in user', async ({
  homePage,
  header,
  basketPage,
  signinPage,
  page,
  countryDetector,
}, testInfo) => {
  test.setTimeout(60000)
  await test.step('Verify guest user', async () => {
    await homePage.visitPage()
    await countryDetector.closeModal()
    await header.headerBasketButton.click()
    await page.waitForLoadState('domcontentloaded')
    await expect(async () => {
      expect(page.url()).toContain(ROUTES.basket)
      await expect(basketPage.basketEmptyStateTitle).toBeVisible()
      await expect(basketPage.basketEmptyStateSubTitle).toBeVisible()
    }).toPass()
  })
  await test.step('Verify logged-in user', async () => {
    await basketPage.assertContinueButton()
    await header.headerBasketButton.waitFor()
    await header.headerBasketButton.click()
    await page.waitForTimeout(1000)
    await basketPage.assertLoginButton()
    const projectName = testInfo.project.name
    const { email, password } = getUserForBrowser(projectName)
    await signinPage.fillLoginData(email, password)
    await signinPage.clickLoginButton()
    expect(page.url()).toContain(ROUTES.basket)
    await basketPage.h1.waitFor()
    await page.waitForLoadState('domcontentloaded')
    try {
      await basketPage.removeItemButton
        .first()
        .waitFor({ state: 'visible', timeout: 5000 })
      await basketPage.removeItemFromBasket()
    } catch (error) {
      console.error(
        `Basket is already empty. Continuing test execution. ${error}`,
      )
    }
    await expect(basketPage.loginButton).not.toBeVisible()
    await expect(basketPage.continueButton).toBeVisible()
    await header.headerBasketButton.click()
    await basketPage.assertContinueButton()
  })
})

/**
 * Verifies that a guest user can add a product to the basket,
 * then logs in, and the added product persists in their basket after login, and the ability
 * to remove a product from the basket.
 *
 * Prerequisites for this test are the same as for the test "C2132186 C2132187 Verify Basket empty state as a guest and logged in user".
 * This test is using the same dedicated test users per browser, defined via environment variables.
 */
test('C2132198 C2162476 Verify add to Basket', async ({
  homePage,
  header,
  basketPage,
  countryDetector,
  signinPage,
  page,
  mobileNavigation,
  mainNavigation,
  productListingPage,
  productDetailPage,
  breadcrumb,
}, testInfo) => {
  await test.step('Add product to Basket, log in and assert the product is still in Basket', async () => {
    await homePage.visitPage()
    await countryDetector.closeModal()
    if (isMobile(page)) {
      await mobileNavigation.openPlpMobile()
    } else {
      await mainNavigation.navigateToPlpMainCategory()
    }
    await breadcrumb.breadcrumbCategoryActive.waitFor()
    await productListingPage.productImage.first().click()
    await productDetailPage.variantPicker.waitFor()
    const productBrand =
      (await productDetailPage.productBrand.textContent()) as string
    const productName =
      (await productDetailPage.productName.textContent()) as string
    await productDetailPage.chooseProductVariant()
    await productDetailPage.addProductToBasket()
    await header.visitBasketPage()
    await page.waitForLoadState('domcontentloaded')
    await expect(header.basketNumItems).toHaveText('1')
    await basketPage.assertProductIsInBasket(productBrand, productName)
    await header.headerLoginButton.click()
    const projectName = testInfo.project.name
    const { email, password } = getUserForBrowser(projectName)
    await signinPage.fillLoginData(email, password)
    await header.visitBasketPage()
    await basketPage.assertProductIsInBasket(productBrand, productName)
  })
  await test.step('Check Basket SEO data', async () => {
    await expect(async () => {
      await basketPage.h1.waitFor()
      const pageTitle = (await basketPage.pageTitle
        .nth(0)
        .textContent()) as string
      await verifySeoMetaTags(page, {
        robots: BASKET_TEST_DATA.seoRobots,
        canonical: page.url(),
      })
      await expect(basketPage.h1).toBeAttached()
      await expect(basketPage.h1).toContainText(pageTitle)
    }).toPass()
  })
  await test.step('Remove product from Basket', async () => {
    await expect(async () => {
      await basketPage.removeItemFromBasket()
      await expect(header.basketNumItems).not.toBeVisible()
    }).toPass()
  })
})

test('C2167319 Verify Basket Price summary - regular product', async ({
  homePage,
  header,
  basketPage,
  countryDetector,
  page,
}) => {
  await test.step('Add regular product to Basket', async () => {
    await expect(async () => {
      await homePage.visitPage()
      await countryDetector.closeModal()
      await basketPage.addProductToBasket(
        BASKET_TEST_DATA.regularPriceVariantId,
        1,
      )
      await header.visitBasketPage()
      await page.waitForLoadState('domcontentloaded')
      await expect(header.basketNumItems).toHaveText('1')
    }).toPass()
  })
  await test.step('Check regular product price summary', async () => {
    if (isMobile(page)) {
      await basketPage.priceFinal.nth(1).waitFor()
      await basketPage.assertBasketPriceSummary(
        basketPage.priceSubtotalMobile,
        basketPage.priceFinal,
        true,
      )
    } else {
      await basketPage.priceFinal.nth(0).waitFor()
      await basketPage.assertBasketPriceSummary(
        basketPage.priceSubtotal,
        basketPage.priceFinal,
        false,
      )
    }
  })
})

test('C2167320 Verify Basket Price summary - sale product', async ({
  homePage,
  header,
  basketPage,
  countryDetector,
  page,
}) => {
  await test.step('Add sale product to Basket', async () => {
    await expect(async () => {
      await homePage.visitPage()
      await countryDetector.closeModal()
      await basketPage.addProductToBasket(
        BASKET_TEST_DATA.salePriceVariantId,
        1,
      )
      await header.visitBasketPage()
      await page.waitForLoadState('domcontentloaded')
      await expect(header.basketNumItems).toHaveText('1')
    }).toPass()
  })
  await test.step('Check sale product price summary', async () => {
    if (isMobile(page)) {
      await basketPage.priceFinal.nth(1).waitFor()
      await basketPage.assertBasketPriceSummary(
        basketPage.priceSubtotalMobile,
        basketPage.priceFinal,
        true,
        basketPage.discountSale,
      )
    } else {
      await basketPage.priceFinal.nth(0).waitFor()
      await basketPage.assertBasketPriceSummary(
        basketPage.priceSubtotal,
        basketPage.priceFinal,
        false,
        basketPage.discountSale,
      )
    }
  })
})

test('C2167321 Verify Basket Price summary - promotion product', async ({
  homePage,
  header,
  basketPage,
  countryDetector,
  search,
  page,
  mobileNavigation,
  productDetailPage,
}) => {
  await test.step('Add promotion product to Basket', async () => {
    await homePage.visitPage()
    await countryDetector.closeModal()
    if (isMobile(page)) {
      await mobileNavigation.startTypingMobileSearch(
        BASKET_TEST_DATA.promotionPriceProductId,
        true,
      )
      await mobileNavigation.searchSuggestionsItem.click()
      await page.waitForLoadState('networkidle')
    } else {
      await search.startTypingSearch(BASKET_TEST_DATA.promotionPriceProductId)
      await search.clickExactProductItem()
    }

    await productDetailPage.variantPicker.waitFor()
    await productDetailPage.chooseProductVariant()
    await productDetailPage.addProductToBasket()
    await header.visitBasketPage()
    await page.waitForLoadState('domcontentloaded')
    await expect(header.basketNumItems).toHaveText('1')
  })
  await test.step('Check promotion product price summary', async () => {
    if (isMobile(page)) {
      await basketPage.promotionSummaryToggleButton.nth(1).waitFor()
      await basketPage.assertBasketPriceSummary(
        basketPage.priceSubtotalMobile,
        basketPage.priceFinal,
        true,
        basketPage.totalPromotionDiscount,
      )
    } else {
      await basketPage.promotionSummaryToggleButton.nth(0).waitFor()
      await basketPage.assertBasketPriceSummary(
        basketPage.priceSubtotal,
        basketPage.priceFinal,
        false,
        basketPage.totalPromotionDiscount,
      )
    }
  })
})

test('C2162474 Verify Basket Sold-out product card', async ({
  homePage,
  header,
  basketPage,
  countryDetector,
  accountPage,
  page,
}) => {
  await test.step('Log in with user that has sold-out product and open Basket page', async () => {
    await expect(async () => {
      await homePage.visitPage()
      await countryDetector.closeModal()
      await accountPage.userAuthentication(
        BASKET_TEST_DATA.soldOutProductUser,
        BASKET_TEST_DATA.soldOutProductPassword,
      )
      await header.visitBasketPage()
      await page.waitForTimeout(500)
    }).toPass()
  })
  await test.step('Check Basket sold-out product card', async () => {
    await page.reload()
    await page.waitForLoadState('domcontentloaded')
    await basketPage.unavailableProductList.waitFor()

    await expect(basketPage.unavailableProductList).toBeVisible()
    await expect(basketPage.soldOutTitle).toBeVisible()
    await expect(basketPage.headlineUnavailableProducts).toBeVisible()
    await expect(basketPage.soldOutQuantitySelector.first()).not.toBeVisible()
    await expect(basketPage.soldOutDeleteButton).toBeVisible()
    await basketPage.assertSoldOutImageOpacity('0.6')
  })
})

test('C2162487 Verify Basket Quantity Selector available quantity less than 10', async ({
  homePage,
  header,
  basketPage,
  countryDetector,
  page,
}) => {
  await test.step('Add one item of product with available quantity 2 to basket', async () => {
    await homePage.visitPage()
    await countryDetector.closeModal()
    await basketPage.addProductToBasket(
      BASKET_TEST_DATA.productAvailableLessThanTen,
      1,
    )
    await header.visitBasketPage()
    await page.waitForTimeout(500)
    await page.reload()
    await countryDetector.closeModal()
    await page.waitForLoadState('domcontentloaded')
    await basketPage.basketProductCard.first().waitFor()
    await expect(header.basketNumItems).toHaveText('1')
    await basketPage.assertQuantityValue('1')
    await basketPage.assertQuantityButtonState('minus', false)
  })
  await test.step('Increase the quantity to reach the maximum', async () => {
    await basketPage.updateProductQuantity('plus')
    await basketPage.assertQuantityValue('2')
    await basketPage.assertQuantityButtonState('plus', false)
    await basketPage.assertQuantityButtonState('minus', true)
    await expect(header.basketNumItems).toHaveText('2')
  })
  await test.step('Decrease the quantity to reach the minimum', async () => {
    await basketPage.updateProductQuantity('minus')
    await basketPage.assertQuantityValue('1')
    await basketPage.assertQuantityButtonState('plus', true)
    await basketPage.assertQuantityButtonState('minus', false)
    await expect(header.basketNumItems).toHaveText('1')
  })
})

test('C2170821 Verify Basket Quantity Selector available quantity more than 10', async ({
  homePage,
  header,
  basketPage,
  countryDetector,
  page,
}) => {
  await test.step('Add 9 pieces of product with available quantity more than 10 to basket', async () => {
    await homePage.visitPage()
    await countryDetector.closeModal()
    await basketPage.addProductToBasket(
      BASKET_TEST_DATA.productAvailableMoreThanTen,
      9,
    )
    await header.visitBasketPage()
    await page.waitForTimeout(500)
    await page.reload()
    await countryDetector.closeModal()
    await page.waitForLoadState('domcontentloaded')
    await basketPage.basketProductCard.first().waitFor()
    await expect(header.basketNumItems).toHaveText('9')
    await basketPage.assertQuantityValue('9')
    await basketPage.assertQuantityButtonState('minus', true)
    await basketPage.assertQuantityButtonState('plus', true)
  })
  await test.step('Increase the quantity to reach the maximum of 10', async () => {
    await basketPage.updateProductQuantity('plus')
    await basketPage.assertQuantityValue('10')
    await basketPage.assertQuantityButtonState('plus', false)
    await basketPage.assertQuantityButtonState('minus', true)
    await expect(header.basketNumItems).toHaveText('10')
  })
  await test.step('Decrease the quantity to reach 9', async () => {
    await basketPage.updateProductQuantity('minus')
    await basketPage.assertQuantityValue('9')
    await basketPage.assertQuantityButtonState('plus', true)
    await basketPage.assertQuantityButtonState('minus', true)
    await expect(header.basketNumItems).toHaveText('9')
  })
})

test('C2167368 Verify Basket increasing free product quantity', async ({
  homePage,
  header,
  basketPage,
  countryDetector,
  page,
  freeProductList,
  freeProductModal,
  productDetailPage,
}) => {
  test.setTimeout(45000)
  await test.step('Add promotional paid product to Basket', async () => {
    await homePage.visitPage()
    await countryDetector.closeModal()
    await basketPage.addProductToBasket(BASKET_TEST_DATA.promoPaidProduct, 1)
    await header.visitBasketPage()
    await basketPage.h1.waitFor()
    await page.reload()
    await countryDetector.closeModal()
    await basketPage.basketProductCard.waitFor()
    await page.waitForLoadState('domcontentloaded')
    await expect(header.basketNumItems).toHaveText('1')
  })
  await test.step('Add promotional free product to Basket and assert free product price', async () => {
    await freeProductList.addFreeProductButton.first().click()
    await freeProductModal.freeProductModalWindow.first().waitFor()
    await expect(
      freeProductModal.freeProductModalWindow.first(),
    ).toHaveAttribute('open')
    await page.waitForTimeout(500)
    await freeProductModal.variantPicker.first().click({ force: true })
    await productDetailPage.getVariant().click()
    await freeProductModal.addItemToBasketButton.first().click()
    await basketPage.assertInitialPriceVisibility(true)
    await basketPage.assertFinalProductPrice(
      BASKET_TEST_DATA.freeProductPriceLabel,
      true,
    )
  })
  await test.step('Increase the quantity of free product to 2', async () => {
    await page.waitForTimeout(500)
    await basketPage.updateProductQuantity('plus')
    await basketPage.assertInitialPriceVisibility(true)
    await basketPage.assertFinalProductPrice(
      BASKET_TEST_DATA.freeProductPriceLabel,
      false,
    )
  })
  await test.step('Decrease the quantity of free product back to 1', async () => {
    await basketPage.updateProductQuantity('minus')
    await basketPage.assertInitialPriceVisibility(true)
    await expect(header.basketNumItems).toHaveText('2')
  })
})
