---
'@scayle/storefront-application-nuxt': patch
---

**\[Product Detail Page\]** Fixed a hydration mismatch by awaiting subscription fetch. The mismatch was caused by missing subscription data during server-side rendering, which resulted in differing HTML between server and client.
