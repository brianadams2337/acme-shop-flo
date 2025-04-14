---
'@scayle/storefront-application-nuxt': minor
---

**\[UI\]** Refactored the handling of the gift selection modal (`SFProductPromotionSelectionModal`).
Firstly, its visibility state is now managed locally within this component instead of using global `useState`, resolving an issue where the modal incorrectly remained open after page navigation.
Secondly, the implementation now utilizes a single, reusable modal instance for all gift options, optimizing component usage.
