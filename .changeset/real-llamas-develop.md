---
'@scayle/storefront-boilerplate-nuxt': patch
---

E2E: Improvements in End-to-End test suite for PLP filters

- Improved the accessibility and testability of Min and Max price input fields by adding the `data-testid` attribute.
- Introduced the `openFilters()` method to the `productListingPage` class, simplifying the distinction between mobile and desktop test flows.
- Updated the `Sale` filter switch element locator in `plpFilters` to reflect recent UI changes.
- Enhanced Filter tests (`e2e-Plp.spec.ts`) to handle deep links with predefined filters more reliably and added `page.waitForLoadState('domcontentloaded')` for increased stability.
