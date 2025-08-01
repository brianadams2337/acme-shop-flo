---
'@scayle/storefront-application-nuxt': patch
---

**\[E2E\]** The `priceSubtotalMobile` locator has been removed from `/playwright/page-objects/basketPage.ts`.
Navigation to Checkout page in `/playwright/tests/happy-path.e2e.spec.ts` has been simplified, eliminating the need to distinguish between mobile and desktop Checkout button.
This update aligns our end-to-end test suite with the refactored Basket Summary component, which now utilizes a single, responsive component for both mobile and desktop views. This change streamlines our page objects and removes unnecessary platform-specific locators.
