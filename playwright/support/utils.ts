import type { Page } from 'playwright-core'
import { expect } from '../fixtures/fixtures'
import { TEST_USERS } from './constants'

interface SeoOptions {
  title?: string
  description?: string
  robots?: string
  canonical?: string
}

export const isMobile = (page: Page) => {
  const viewportSize = page.viewportSize()
  return viewportSize && viewportSize.width < 768
}

export async function getAllLinksFromPage(page: Page) {
  const links = page.locator('a')

  const allLinks = await links.all()
  const allLinkHrefs = await Promise.all(
    allLinks.map((link) => link.getAttribute('href')),
  )
  return allLinkHrefs.reduce((links, link) => {
    expect.soft(link, 'link is missing href attribute').not.toBeFalsy()

    if (link && !link?.startsWith('mailto:') && !link?.startsWith('#')) {
      links.add(new URL(link, page.url()).href)
    }
    return links
  }, new Set<string>())
}

/**
 * Returns test user e-mail address and password.
 * To avoid conflicts in parallel test execution, each browser has dedicated test user.
 * Test user email and password keys are stored in constant object `USER_ACCOUNT` within `/playwright/support/constants.ts`.
 * Their values should be defined via environment variables.
 */
export const getUserForBrowser = (
  browserName: string,
): { email: string; password: string } => {
  const browserUserMap: Record<string, string> = {
    /** Should be defined via environment variable `TEST_USER_EMAIL1` */
    chromium: 'testUserEmail1',
    /** Should be defined via environment variable `TEST_USER_EMAIL2` */
    firefox: 'testUserEmail2',
    /** Should be defined via environment variable `TEST_USER_EMAIL3` */
    webkit: 'testUserEmail3',
    /** Should be defined via environment variable `TEST_USER_EMAIL4` */
    'mobile-chrome': 'testUserEmail4',
    /** Should be defined via environment variable `TEST_USER_EMAIL5` */
    'mobile-safari': 'testUserEmail5',
    /** Default fallback is testUserEmail1, but it is strongly recommended to define dedicated test user for every browser. */
    default: 'testUserEmail1',
  }

  const userEmailKey = browserUserMap[browserName] || browserUserMap.default
  return {
    email: TEST_USERS[userEmailKey as keyof typeof TEST_USERS],
    /** Password should be defined via environment variable TEST_USER_PASSWORD */
    password: TEST_USERS.testUserPassword,
  }
}

export async function verifySeoMetaTags(page: Page, options: SeoOptions) {
  if (options.title) {
    await expect(page).toHaveTitle(options.title)
  }
  if (options.description) {
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      options.description,
    )
  }
  if (options.robots) {
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      options.robots,
    )
  }
  if (options.canonical) {
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      options.canonical,
    )
  }
}
