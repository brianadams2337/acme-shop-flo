---
'@scayle/storefront-boilerplate-nuxt': minor
---

[Performance] Addressed an issue in `SFQuantityInput` component where the `disabled` attribute might not be present in the JavaScript DOM Node object on Firefox, causing hydration warnings. `data-allow-mismatch="attribute"` was added to prevent such warnings from appearing in `/components/product/SFQuantityInput.vue`.
