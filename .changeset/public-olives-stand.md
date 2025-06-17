---
'@scayle/storefront-application-nuxt': patch
---

**\[SEO\]** Resolves an issue where `hreflang` links were not being generated correctly on the server side for Product Listing Pages and Product Detail Pages.

The root cause was that `useAllShopCategoriesForId` and `useAllShopProductsForId` were resolving too late during server-side rendering, resulting in empty arrays.
These are now awaited to ensure the necessary data is available when generating hreflang links, improving SEO reliability.
