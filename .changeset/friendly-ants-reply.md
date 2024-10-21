---
'@scayle/storefront-boilerplate-nuxt': patch
---

Added `{ force: true }` on `variantPicker.click()` in PDP End-to-End tests due to issues with Chrome Mobile. Clicking the Variant picker in most cases is unsuccessful. Playwright retries the action automatically, but at the end it results in timeout and failed test. Since the test is executed without any issues in Mobile Safari, desktop Chrome, Firefox and Safari, `{ force: true }` is added to avoid test failure.
