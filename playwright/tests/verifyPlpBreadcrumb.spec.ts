import { expect, test } from '../fixtures/fixtures'

test('C2130725: Verify PLP breadcrumb', async ({
  homePage,
  mainNavigation,
  productListingPage,
  breadcrumb,
  page,
}) => {
  await homePage.visitPage()
  await mainNavigation.menuItemSecond.click()
  await productListingPage.menuRootCategory.first().click()
  await productListingPage.menuSubCategoryLvl1.first().click()
  await productListingPage.menuSubCategoryLvl2.first().click()

  await expect(breadcrumb.breadcrumbCategoryLvl1).toBeVisible()

  const subCategoryLvl2Text = await productListingPage.menuSubCategoryLvl2
    .first()
    .textContent()

  const activeBreadcrumbText =
    await breadcrumb.breadcrumbCategoryActive.textContent()

  expect(activeBreadcrumbText?.toLowerCase()).toContain(
    subCategoryLvl2Text?.toLowerCase(),
  )

  await productListingPage.menuSubCategoryLvl2.click()

  if (subCategoryLvl2Text) {
    const currentUrl = page.url()

    expect(currentUrl).toContain(
      subCategoryLvl2Text.toLowerCase().replace(/ /g, '-'),
    )
  } else {
    throw new Error(
      'subCategoryLvl2Text is not available. Check the selector or webpage content.',
    )
  }
})
