---
'@scayle/storefront-application-nuxt': patch
---

**\[E2E\]** Improved the reliability and accuracy of product counter and product card assertions after applying filters and sorting in Product Listing Page (PLP) end-to-end tests. This was achieved by implementing the `parseLocatorTextToNumber` helper in `playwright/support/utils.ts` for more robust numerical text extraction from Playwright Locators.
