import type { Page } from 'playwright-core'

export const isMobile = (page: Page) => {
  const viewportSize = page.viewportSize()
  return viewportSize && viewportSize.width < 768
}
