import type { Locator, Page } from '@playwright/test'
import { expect } from '../../fixtures/fixtures'

export class ToastMessage {
  readonly page: Page
  readonly toastInfo: Locator

  constructor(page: Page) {
    this.page = page
    this.toastInfo = page.getByTestId('toast-info')
  }

  async assertToastInfoIsVisible() {
    await expect(this.toastInfo).toBeVisible()
  }

  async clickToastMessageButton() {
    await this.toastInfo.getByText('OK').click()
  }

  async assertToastInfoNotVisible() {
    await this.toastInfo.isHidden()
  }
}
