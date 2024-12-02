import type { Locator, Page } from '@playwright/test'
import { isMobile } from '../../support/utils'
import { expect } from '../../fixtures/fixtures'

export class StoreLocator {
  readonly page: Page
  readonly storeLocatorLink: Locator
  readonly storeLocatorLinkMobile: Locator
  readonly locationTextInput: Locator
  readonly locationSearchButton: Locator
  readonly locationStoreList: Locator
  readonly locationStoreListItem: Locator

  constructor(page: Page) {
    this.page = page
    this.storeLocatorLink = page.getByTestId('store-location-link')
    this.storeLocatorLinkMobile = page.getByTestId('store-location-link-mobile')
    this.locationTextInput = page.getByTestId('location-text-input')
    this.locationSearchButton = page.getByTestId('location-search-button')
    this.locationStoreList = page.getByTestId('location-store-list')
    this.locationStoreListItem = page.getByTestId('location-store-list-item')
  }

  async openLocationPage() {
    if (isMobile(this.page)) {
      await this.storeLocatorLinkMobile.waitFor()
      await this.storeLocatorLinkMobile.scrollIntoViewIfNeeded()
      await this.storeLocatorLinkMobile.click()
    } else {
      await this.storeLocatorLink.click()
    }
    await this.page.waitForLoadState('networkidle')
  }

  async typeLocationSearch(searchTerm: string) {
    await this.locationTextInput.clear()
    await this.locationTextInput.fill(searchTerm)
  }

  async triggerSearch() {
    await expect(async () => {
      await this.locationSearchButton.waitFor()
      await this.locationSearchButton.click()
    }).toPass()
  }

  async assertStoreListIsLoaded() {
    await this.page.waitForLoadState('networkidle')
    await expect(this.locationStoreList).toBeVisible()
    await expect(this.locationStoreListItem.first()).toBeVisible()
  }

  async navigateToLocationPage(searchTerm: string) {
    await expect(async () => {
      await this.openLocationPage()
      await this.locationTextInput.waitFor()
      const pageUrl = this.page.url()
      expect(pageUrl).toContain('/location')
      await this.typeLocationSearch(searchTerm)
    }).toPass()
  }
}
