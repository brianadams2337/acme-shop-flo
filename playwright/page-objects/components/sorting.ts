import type { Locator, Page } from '@playwright/test'

export class Sorting {
  readonly page: Page
  readonly sortDropdown: Locator
  readonly mobileSortWrapper: Locator

  constructor(page: Page) {
    this.page = page
    this.sortDropdown = page.getByTestId('sort-dropdown')
    this.mobileSortWrapper = page.getByTestId('mobile-sort-wrapper')
  }

  sortOptionItem(sortingOption: string): Locator {
    return this.page.getByTestId(`sort-item-${sortingOption}`)
  }

  async applySorting(sortingOption: string, index: number) {
    await this.sortDropdown.nth(index).click()
    await this.sortOptionItem(sortingOption).nth(index).click()
    await this.page.waitForLoadState('domcontentloaded')
  }

  async applySortingMobile(sortingOption: string) {
    const specificSortingLinkLocator = this.mobileSortWrapper.locator(
      `[href*="?sort=${sortingOption}"]`,
    )
    await specificSortingLinkLocator.waitFor({ state: 'visible' })
    await specificSortingLinkLocator.click()
    await this.page.waitForLoadState('domcontentloaded')
  }
}
