---
'@scayle/storefront-boilerplate-nuxt': minor
---

**\[Architecture\]** Improved the reactivity of several key composables (`useSubscription`, `useProductBaseInfo`, `useRowIntersection`, useProductPromotions, `useProductPrice`, `usePagination`, and `useBasketPromotionReductions`) by optimizing how getter values are passed and explicitly using `toRef` where needed.
This ensures consistent and predictable reactivity throughout the application. For more details, see the [Vue documentation on prop passing]((https://vuejs.org/guide/components/props.html#passing-destructured-props-into-functions).
