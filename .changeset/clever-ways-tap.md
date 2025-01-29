---
'@scayle/storefront-boilerplate-nuxt': minor
---

[Performance] Fix hydration issue inside `/pages/wishlist.vue` by delaying the count badge until hydration has finished and warping the content inside `<SFAsyncDataWrapper>`.
