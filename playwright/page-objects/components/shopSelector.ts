import type { Locator, Page } from '@playwright/test'
import { expect } from '../../fixtures/fixtures'

export class ShopSelector {
  readonly page: Page
  readonly shopSelectorListbox: Locator
  readonly globeIcon: Locator
  readonly iconChevron: Locator
  readonly currentShop: Locator
  readonly shopLanguageItem: Locator
  readonly shopLanguageItemCurrent: Locator
  readonly shopSelectorList: Locator
  readonly currentShopMobile: Locator

  constructor(page: Page) {
    this.page = page
    this.shopSelectorListbox = page.getByTestId('language-listbox')
    this.globeIcon = page.getByTestId('shop-switcher-globe-icon')
    this.iconChevron = page.getByTestId('shop-icon-chevron')
    this.currentShop = page.getByTestId('shop-switcher-current-shop')
    this.shopLanguageItem = page.getByTestId('shop-language-item')
    this.shopLanguageItemCurrent = page.getByTestId(
      'shop-language-item-current',
    )
    this.shopSelectorList = page.getByTestId('shop-selector-list')
    this.currentShopMobile = page.getByTestId(
      'shop-switcher-current-shop-mobile',
    )
  }

  async assertShopSelectorIsVisible(index: number) {
    await this.shopSelectorListbox.nth(index).waitFor()
    await expect(this.globeIcon.nth(index)).toBeVisible()
    await expect(this.shopSelectorListbox.nth(index)).toBeVisible()
    await expect(this.shopSelectorListbox.nth(index)).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  }

  async openShopSelector(index: number) {
    await this.shopSelectorListbox.nth(index).click()
    await this.page.waitForLoadState('domcontentloaded')
    await this.shopSelectorList.waitFor()
  }

  async switchShop(index: number) {
    const pageUrlInitial = this.page.url()
    const switchedShopLabel = await this.shopLanguageItem.first().textContent()
    await this.shopLanguageItem.first().click()
    await this.page.waitForTimeout(500)
    const pageUrlSwitched = this.page.url()
    expect(await this.shopSelectorListbox.nth(index).textContent()).toEqual(
      switchedShopLabel,
    )
    await this.page.waitForTimeout(500)
    expect(pageUrlInitial).not.toEqual(pageUrlSwitched)
  }

  async switchShopToCurrent(index: number) {
    const pageUrlInitial = this.page.url()
    const switchedShopLabel = await this.shopLanguageItemCurrent
      .first()
      .textContent()
    await this.shopLanguageItemCurrent.first().click()
    const pageUrlSwitched = this.page.url()
    expect(await this.shopSelectorListbox.nth(index).textContent()).toEqual(
      switchedShopLabel,
    )
    expect(pageUrlInitial).toEqual(pageUrlSwitched)
  }
}
