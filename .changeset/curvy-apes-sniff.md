---
'@scayle/storefront-application-nuxt': patch
---

**\[E2E\]** Store Locator E2E tests are now skipped by default in automated/scheduled test runs to save resources.
To execute them manually, remove the `.skip` suffix from the tests in `playwright/tests/e2e-StoreFinder.spec.ts` and relevant steps in `playwright/tests/e2e-Pdp.spec.ts`.
