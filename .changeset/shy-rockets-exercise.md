---
'@scayle/storefront-boilerplate-nuxt': patch
---

**\[PLP\]** This change addresses an issue where the price filter would incorrectly persist when the `SFPriceRangeSlider` was returned to its original minimum and maximum values. Now, an event is emitted based on whether the provided event values match these filter limits (`resetPriceFilter` or `applyPriceFilter`). This ensures that the filter is properly reset in all cases, even when the slider is moved back to its initial position. Previously, this scenario would result in the filter remaining active (applied), as potentially indicated by the filter counter on the `FilterToggleButton`.
