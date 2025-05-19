import type { Locator, Page } from '@playwright/test'

export class FreeProductModal {
  readonly page: Page
  readonly freeProductModalWindow: Locator
  readonly variantPicker: Locator
  readonly addItemToBasketButton: Locator

  constructor(page: Page) {
    this.page = page
    this.freeProductModalWindow = page.locator(
      '[data-testid="promo-product-selection-modal"][open]',
    )
    this.variantPicker =
      this.freeProductModalWindow.getByTestId('variant-picker')
    this.addItemToBasketButton = this.freeProductModalWindow.getByTestId(
      'add-item-to-basket-button',
    )
  }
}
