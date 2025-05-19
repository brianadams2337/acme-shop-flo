import type { Locator, Page } from '@playwright/test'

export class Breadcrumb {
  readonly page: Page
  readonly breadcrumbCategoryLvl0: Locator
  readonly breadcrumbCategoryActive: Locator
  readonly productCounter: Locator

  constructor(page: Page) {
    this.page = page
    this.breadcrumbCategoryLvl0 = page.getByTestId('category-breadcrumb-0')
    this.breadcrumbCategoryActive = page.getByTestId(
      'active-category-breadcrumb',
    )
    this.productCounter = page.getByTestId('breadcrumb-product-counter')
  }
}
