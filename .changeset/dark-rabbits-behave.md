---
'@scayle/storefront-application-nuxt': patch
---

**\[E2E\]** Enhanced variant velector logic. Implemented the `chooseProductVariant()` method in `/nuxt/playwright/page-objects/productDetailPage.ts` to optimize variant selection. This new method checks the disabled state of the variant picker. If disabled, it assumes a pre-selected variant. Otherwise, it opens the dropdown and selects the first available option, providing more robust handling of single and multi-variant products.
