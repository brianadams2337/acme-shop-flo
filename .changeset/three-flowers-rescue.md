---
'@scayle/storefront-boilerplate-nuxt': minor
---

[PDP] Ignore subscription basket items in `/pages/p/[...productName]-[id].vue` when looking for an basket item of the same product on the PDP. The basket item is used to show show the price of regular items. Subscription items can have an extra discount. Considering them when displaying the regular item price, it could lead to misleading prices being displayed.
