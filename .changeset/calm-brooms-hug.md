---
'@scayle/storefront-boilerplate-nuxt': patch
---

**\[Utilities\]** `getBackgroundColorStyle()` and `getTextColorStyle()` now set alpha values when using the default color. Previously no alpha value was set, resulting in the same color for text and background of promotion prices.
