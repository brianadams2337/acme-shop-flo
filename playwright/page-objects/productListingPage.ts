import type { Locator, Page } from '@playwright/test'

export class ProductListingPage {
  readonly page: Page
  readonly wishlistButton: Locator

  constructor(page: Page) {
    this.page = page
    this.wishlistButton = page.locator(
      '[data-test-id="add-item-to-wishlist-button"]',
    )
  }

  async addProductToWishlist() {
    await this.wishlistButton.first().click()
  }

  async openProductbyID(productLocator: string) {
    const productTile = this.page.locator(productLocator)

    await productTile.click()
  }
}
