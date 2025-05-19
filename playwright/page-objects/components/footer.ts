import type { Locator, Page } from '@playwright/test'
import { expect } from '../../fixtures/fixtures'

export class Footer {
  readonly page: Page
  readonly footerWrapper: Locator
  readonly footerLogo: Locator
  readonly footerCopyright: Locator
  readonly simpleFooterLink: Locator

  constructor(page: Page) {
    this.page = page
    this.footerWrapper = page.getByTestId('footer')
    this.footerLogo = page.getByTestId('footer-logo')
    this.footerCopyright = page.getByTestId('footer-copyright')
    this.simpleFooterLink = page.getByTestId('simple-footer-link')
  }

  async verifyFooterLinks(linksGroup: { [key: string]: string }) {
    await expect(async () => {
      for (const linkKey in linksGroup) {
        const typedLinkKey = linkKey as keyof typeof linksGroup
        const linkUrl = linksGroup[typedLinkKey]

        const linkElement = await this.page.$(`a[href="${linkUrl}"]`)
        expect(linkElement).toBeTruthy()
      }
    }).toPass()
  }
}
