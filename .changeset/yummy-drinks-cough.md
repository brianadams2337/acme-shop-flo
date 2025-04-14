---
'@scayle/storefront-application-nuxt': minor
---

**\[Architecture\]** Standardized date presentation by updating the `formatLocaleDate` utility.
It now consistently outputs dates in a short numeric format and is being reused across various parts of the application.
The function's signature has changed: it now requires a `Date` object as input, with date string parsing delegated to the calling code.
