---
'@scayle/storefront-boilerplate-nuxt': patch
---

E2E: Enhanced end-to-end tests for homepage links to ensure more robust validation. The tests now perform a more accurate check of response codes and status. Additionally, if the initial header request (`page.request.head()`) fails, a full page visit is attempted to provide more comprehensive error detection.
