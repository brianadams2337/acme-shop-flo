---
'@scayle/storefront-boilerplate-nuxt': patch
---

Improvements in End-to-End test suite

- PLP Filters

  - Attribute `data-testid` added to Min and Max Price input fields.
  - Added `openFilters()` method to `productListingPage` class to easily distinguish mobile from desktop test flow.
  - Added `Sale` filter switch element locator in `plpFilters` to follow the latest updates.
  - Improvements in Filter tests in `e2e-Plp.spec.ts` for better handling of deeplink (predefined filters) and added more stability by adding `page.waitForLoadState('domcontentloaded')` where needed.

- PLP page

  - Removed unnecessary navigation steps to navigate the category page to make test execution faster.
  - Small improvements in add and remove to/from Wishlist tests by adding additional DOM element waits for better stability.

- PDP page

  - Added wait for `networkidle` load state when adding the product to Basket, to improve test stability.

- Promotions

  - Change in sticky behavior scrolled page state, `mouse.wheel()` changed to `window.scrollTo()` due to the Mobile Safari issues.

- Wishlist

  - Simplified `productBrand` locator.
  - Skipped tests for adding the product to Basket from Wishlist, since they are not applicable at the moment.

- Country detector modal
  - Added a method accross tests to close the modal on page load, so the other test actions are not blocked.
