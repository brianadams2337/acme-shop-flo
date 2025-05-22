---
'@scayle/storefront-application-nuxt': minor
---

**\[SEO\]** Added `hrefLangLinks` for the Home, Product Listing, and Product Detail pages.

For both the Product Detail Page and Product Listing Page, we now fetch category/product data from other shops to verify availability. For each shop in which the product or category is available, a corresponding `hrefLangLink` will be created.
