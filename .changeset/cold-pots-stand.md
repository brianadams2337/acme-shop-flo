---
'@scayle/storefront-boilerplate-nuxt': minor
---

**\[Orders\]** The `Order` type is improved by introducing a new generic `Order<Product, Variant>`
type. The related order helpers are now part of the Storefront Boilerplate and are used within `usePurchaseEvents`, where the `useOrder` generic is now ensuring correct order detail types.
