import type { Locator, Page } from '@playwright/test'
import { expect } from '../../fixtures/fixtures'

export class Pagination {
  readonly page: Page
  readonly paginationButtonPrevPage: Locator
  readonly paginationButtonNextPage: Locator

  constructor(page: Page) {
    this.page = page
    this.paginationButtonPrevPage = page.getByTestId(
      'paginationButton-previousPage',
    )
    this.paginationButtonNextPage = page.getByTestId(
      'paginationButton-nextPage',
    )
  }

  paginationPageNumber(pageNumber: string): Locator {
    return this.page.getByTestId(`paginationButton-${pageNumber}`)
  }

  async assertPaginationInitialState() {
    await this.paginationButtonPrevPage.waitFor()
    await this.paginationButtonPrevPage.scrollIntoViewIfNeeded()
    await expect(this.paginationButtonPrevPage).toBeVisible()
    await expect(this.paginationButtonNextPage).toBeVisible()
  }

  async assertNextPageClick(pageNumber: string) {
    await this.paginationButtonNextPage.click()
    await this.page.waitForTimeout(500)
    const pageUrl = this.page.url()
    expect(pageUrl).toContain(`?page=${pageNumber}`)
  }

  async assertPreviousPageClick(pageNumber: string, firstPage: boolean) {
    await this.paginationButtonPrevPage.click()
    await this.page.waitForTimeout(500)
    const pageUrl = this.page.url()
    if (firstPage) {
      expect(pageUrl).not.toContain(`?page=${pageNumber}`)
    } else {
      expect(pageUrl).toContain(`?page=${pageNumber}`)
    }
  }

  async assertExactPageClick(pageNumber: string) {
    await this.paginationPageNumber(pageNumber).click()
    await this.page.waitForTimeout(500)
    const pageUrl = this.page.url()
    expect(pageUrl).toContain(`?page=${pageNumber}`)
  }
}
