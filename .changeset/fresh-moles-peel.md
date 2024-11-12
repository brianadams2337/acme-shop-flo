---
'@scayle/storefront-boilerplate-nuxt': patch
---

E2E: Optimized mobile search tests by streamlining the `exactProductItem` locator to be more robust and less prone to errors and removing a redundant check for search category list visibility within `mobileNavigation.ts`. The test now directly verifies if the desired list item is visible and proceeds to click it, resulting in a more efficient and stable interaction flow.
