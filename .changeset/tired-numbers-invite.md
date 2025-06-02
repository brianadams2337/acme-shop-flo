---
'@scayle/storefront-application-nuxt': patch
---

**\[CMS\]** Updated `useCMSBySlug` to accept `MaybeRefOrGetter` for the slug. This allows for the provided slug to be reactive. When the reactive slug changes, the data will be refreshed.
