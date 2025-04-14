---
'@scayle/storefront-application-nuxt': patch
---

**\[Product Detail Page\]** Resolved a hydration mismatch error related to product subscriptions.
The fix ensures that product subscription data is fetched and included during server-side rendering (SSR),
preventing inconsistencies between the server-generated HTML and the client-side render.
