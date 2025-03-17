---
'@scayle/storefront-boilerplate-nuxt': patch
---

**\[PDP\]** Product data is now loaded lazily by setting the `lazy` option of to `true`.
This change allows for variant preselection during Server-Side Rendering (SSR) and ensures that an appropriate HTTP error status code is returned if product data fetching fails.
