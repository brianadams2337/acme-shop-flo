---
'@scayle/storefront-application-nuxt': minor
---

**\[Config\]** Baskets and Wishlist will be shared across configured shops.
If baskets and wishlists should be scoped by shop, the respective `basketKey` or `wishlistKey` need to be extended with `{shopId}` within `nuxt.config.ts`.
