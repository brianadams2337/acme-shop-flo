---
'@scayle/storefront-application-nuxt': patch
---

**\[E2E\]** Improved stability of Basket end-to-end tests by adding a dedicated step to verify the empty state for logged-in users (file `/playwright/tests/e2e-Basket.spec.ts`, test "Verify Basket empty state as a guest and logged in user"). This update now ensures any existing products in the basket are removed prior to verification, making the test independent of manual basket additions for the test user.
