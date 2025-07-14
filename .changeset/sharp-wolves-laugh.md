---
'@scayle/storefront-application-nuxt': minor
---

**\[Architecture\]** Updated Nuxt to version `3.17.7`.

This release of Nuxt includes router enhancements, new data fetching features, and performance improvements.
There are no breaking changes in this release of Nuxt, so generally changes should not be necessary.
In this application two pre-existing issues were uncovered: a duplicated `definePageMeta` in the Product Listing Page and `inheritAttrs: false` was missing in the `SFModal` component. We had been inadvertently relying a Nuxt bug which caused attributes to not be inherited through `ClientOnly`.
More details can be found on the [Nuxt blog](https://nuxt.com/blog/v3-17).
