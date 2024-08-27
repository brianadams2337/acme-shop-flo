import type { Locator, Page } from '@playwright/test'
import { PLP_SUBCATEGORY_NAME_DE } from '../../support/constants'

export class MobileNavigation {
  readonly page: Page
  readonly sideNavigationButton: Locator
  readonly mainCategoryMenuItem: Locator
  readonly subCategoryMenuItem: Locator

  constructor(page: Page) {
    this.page = page
    this.sideNavigationButton = page.getByTestId('side-navigation-button')
    this.mainCategoryMenuItem = page.getByTestId(
      'side-navigation-list-item-50337',
    )
    this.subCategoryMenuItem = page.getByRole('link', {
      name: PLP_SUBCATEGORY_NAME_DE,
    })
  }
}
