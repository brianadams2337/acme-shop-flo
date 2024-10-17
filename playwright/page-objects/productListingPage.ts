import type { Locator, Page } from '@playwright/test'
import { expect } from '@playwright/test'
import { isMobile } from '../support/utils'

export class ProductListingPage {
  readonly page: Page
  readonly wishlistButton: Locator
  readonly productTile: Locator
  readonly sortDropdown: Locator
  readonly filterButton: Locator
  readonly menuRootCategory: Locator
  readonly menuSubCategoryLvl1: Locator
  readonly menuSubCategoryLvl2: Locator
  readonly productItem: Locator
  readonly removeFromWishlistButton: Locator
  readonly productSibling: Locator
  readonly productImage: Locator

  constructor(page: Page) {
    this.page = page
    this.wishlistButton = page.locator(
      '[data-testid="add-item-to-wishlist-button"]',
    )
    this.productTile = page.locator('[id^="product-"]')
    this.sortDropdown = page.getByTestId('sort-dropdown')
    this.filterButton = page.getByTestId('filter-toggle-button')
    this.menuRootCategory = page.getByTestId('root-category-0')
    this.menuSubCategoryLvl1 = page.getByTestId('sub-category-0')
    this.menuSubCategoryLvl2 = page
      .getByTestId('sub-category-0')
      .nth(1)
      .getByRole('link')
    this.productItem = page.getByTestId('product-item')
    this.removeFromWishlistButton = page.getByTestId(
      'remove-item-from-wishlist-button',
    )
    this.productSibling = page.getByTestId('product-sibling')
    this.productImage = page.getByTestId('product-image')
  }

  async addProductToWishlist() {
    await this.wishlistButton.first().click()
  }

  async visitPlpWithFiltersUrl(path: string, filters = {}, baseUrl: string) {
    const formattedFilters = Object.entries(filters).map(
      ([key, value]) => `filters[${key}]=${value}`,
    )
    const url =
      baseUrl +
      path +
      (formattedFilters.length ? `?${formattedFilters.join('&')}` : '')
    await this.page.goto(url, { waitUntil: 'load' })
  }

  async visitPlpNoFilters(path: string, baseUrl: string) {
    const url = baseUrl + path
    await this.page.goto(url, { waitUntil: 'load' })
  }

  async removeProductFromWishlist() {
    await this.removeFromWishlistButton.first().click()
  }

  async openTestCategoryPLP(subCategoryName: string) {
    await this.menuRootCategory
      .getByRole('link', { name: subCategoryName })
      .first()
      .click()
  }

  getProductLink(productPath: string): Locator {
    return this.page.locator(`a[href="${productPath}"]`)
  }

  async openFilters() {
    if (isMobile(this.page)) {
      await expect(this.filterButton.nth(1)).toBeVisible()
      await this.filterButton.nth(1).click()
    } else {
      await expect(this.filterButton.first()).toBeVisible()
      await this.filterButton.first().click()
    }
    await this.page.waitForLoadState('domcontentloaded')
  }
}
