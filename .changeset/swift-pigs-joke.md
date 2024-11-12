---
'@scayle/storefront-boilerplate-nuxt': minor
---

E2E: Improved the stability of our Checkout end-to-end tests when running in parallel by assigning a dedicated test user to each browser. This prevents conflicts that can occur when multiple tests interact with shared user data (like order information) simultaneously, leading to more reliable and consistent test results.
