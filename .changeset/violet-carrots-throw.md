---
'@scayle/storefront-application-nuxt': patch
---

**\[Performance\]** Optimized the price range filter by removing the `@update:model-value` event listener from the `SFPriceRangeSlider` component.
This eliminates redundant API calls that were previously triggered during the slider adjustment process.
