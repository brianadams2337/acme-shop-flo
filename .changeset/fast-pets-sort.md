---
'@scayle/storefront-boilerplate-nuxt': patch
---

E2E: Enhanced Homepage end-to-end tests by refining how links are identified. We've transitioned from user-facing selectors (`getByRole('link')`) to a more comprehensive approach using (`page.locator('a')`). This ensures that we catch all links within the page, improving the thoroughness of our tests. We've also introduced a short delay using `page.waitForLoadState('domcontentloaded')` after each page visit within our Homepage end-to-end tests. This prevents issues that can arise when tests run faster than the page can load, leading to more stable and reliable test results.
