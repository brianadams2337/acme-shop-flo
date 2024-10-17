import type { Locator, Page } from '@playwright/test'

export class PlpFilters {
  readonly page: Page
  readonly closeFiltersButton: Locator
  readonly filterColorChip: Locator
  readonly filterSectionHeadline: Locator
  readonly filterApplyButton: Locator
  readonly filterResetButton: Locator
  readonly filterPriceInput: Locator
  readonly filterSizeCheckbox: Locator
  readonly filterFormCheckbox: Locator
  readonly filterGroupCounter: Locator
  readonly filterSaleSwitch: Locator

  constructor(page: Page) {
    this.page = page
    this.closeFiltersButton = page.getByTestId('close-filters')
    this.filterColorChip = page.getByTestId('filter-color-chip')
    this.filterSectionHeadline = page.getByTestId('headline')
    this.filterApplyButton = page.getByTestId('apply-filter-button')
    this.filterResetButton = page.getByTestId('reset-filter-button')
    this.filterPriceInput = page.getByTestId('price-input')
    this.filterSizeCheckbox = page.getByTestId('checkbox-chip')
    this.filterFormCheckbox = page.getByTestId('form-checkbox')
    this.filterGroupCounter = page.getByTestId('filter-group-counter')
    this.filterSaleSwitch = page.getByRole('switch')
  }
}
