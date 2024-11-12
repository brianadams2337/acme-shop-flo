---
'@scayle/storefront-boilerplate-nuxt': patch
---

E2E: Improved the stability of our Basket end-to-end tests when running in parallel by assigning a dedicated test user to each browser. This prevents conflicts that can occur when multiple tests interact with shared user data, leading to more reliable and consistent test results.
