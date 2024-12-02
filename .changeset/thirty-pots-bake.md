---
'@scayle/storefront-boilerplate-nuxt': minor
---

Cleanup and simplify product include handling.

All includes are now defined in `constants/withParams.ts` and there are only two product includes defined now:

- `PRODUCT_DETAIL_WITH_PARAMS` which includes all attributes and advanced attributes to be used on the PDP and Basket
- `PRODUCT_TILE_WITH_PARAMS` a smaller subset of data to be used for the `ProductCard` component (e.g. on the Product Listing Page, in the Search or for the Wishlist)
