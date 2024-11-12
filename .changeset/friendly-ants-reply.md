---
'@scayle/storefront-boilerplate-nuxt': patch
---

E2E: Addressed an issue affecting PDP end-to-end tests specifically within Chrome Mobile, where clicking the Variant Picker was frequently unsuccessful. While Playwright implements automatic retries for such actions, this often resulted in test timeouts. As the issue appears isolated to Chrome Mobile, we've introduced `{ force: true }` to the `variantPicker.click() `action to bypass the problematic default click behavior and ensure consistent test execution across all browser environments.
