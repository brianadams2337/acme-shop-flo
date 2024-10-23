import type { Page } from 'playwright-core'
import { expect } from '../fixtures/fixtures'
import { TEST_USERS } from './constants'

export const isMobile = (page: Page) => {
  const viewportSize = page.viewportSize()
  return viewportSize && viewportSize.width < 768
}

export async function getAllLinksFromPage(page: Page) {
  const link = page.getByRole('link')
  const allLinks = await link.all()
  const allLinkHrefs: (string | null)[] = await Promise.all(
    allLinks.map((link) => link.getAttribute('href')),
  )

  return allLinkHrefs.reduce((links, link) => {
    expect(link, 'link has no a proper href').not.toBeFalsy()

    if (link && !link?.startsWith('mailto:') && !link?.startsWith('#')) {
      links.add(new URL(link, page.url()).href)
    }

    return links
  }, new Set<string>())
}

export const getUserForBrowser = (
  browserName: string,
): { email: string; password: string } => {
  const browserUserMap: Record<string, string> = {
    chromium: 'testUserEmail1',
    firefox: 'testUserEmail2',
    webkit: 'testUserEmail3',
    'mobile-chrome': 'testUserEmail4',
    'mobile-safari': 'testUserEmail5',
    default: 'testUserEmail1',
  }

  const userEmailKey = browserUserMap[browserName] || browserUserMap.default
  return {
    email: TEST_USERS[userEmailKey as keyof typeof TEST_USERS],
    password: TEST_USERS.testUserPassword,
  }
}
