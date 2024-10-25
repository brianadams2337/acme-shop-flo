---
'@scayle/storefront-boilerplate-nuxt': patch
---

Homepage End-to-End tests, link checks changed from user facing `getByRole('link')`to `page.locator('a')` to catch all the links within the page. A small improvement has also been made by adding `page.waitForLoadState('domcontentloaded')` after every page visit, to prevent test execution being faster than the page load.
