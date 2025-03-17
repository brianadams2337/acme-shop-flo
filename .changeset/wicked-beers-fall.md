---
'@scayle/storefront-boilerplate-nuxt': patch
---

**\[Authentication\]** Refactored `/middleware/authGuard.global.ts` to conditionally fetch user data, skipping the process when an unprotected route is accessed.
This optimization reduces the number of network requests and improves page load times.
