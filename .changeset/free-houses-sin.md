---
'@scayle/storefront-application-nuxt': patch
---

**\[E2E\]** Enhanced end-to-end tests versatility. Refactoring have been made to reduce the dependency of end-to-end tests on specific product identifiers and static page URLs, leading to a more robust and adaptable test suite.

`e2e-Account.spec.ts`: Tests now navigate to the User Profile via the Homepage, eliminating the use of hardcoded profile URLs.
`e2e-Footer.spec.ts`: Footer link verification has been consolidated into `e2e-Homepage.spec.ts`, and the dedicated Footer links test has been streamlined.
`e2e-Orders.spec.ts`: Introduced an environment variable to provision test users with no prior orders.
`e2e-OrderSuccessPage.spec.ts`: Exact page title and description are no longer the part of SEO checks.
`e2e-Pdp.spec.ts`: Product information (name, brand, price) and Wishlist interactions are now generalized, removing the need for specific Product ID.
`e2e-Wishlist.spec.ts`: Verification of Wishlist contents and SEO elements is now independent of specific Product ID.
