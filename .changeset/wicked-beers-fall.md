---
'@scayle/storefront-boilerplate-nuxt': patch
---

Skip fetching user data in `/middleware/authGuard.global.ts` when targeting an unprotected route to avoid unnecessary network requests.
