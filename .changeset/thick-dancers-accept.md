---
'@scayle/storefront-application-nuxt': minor
---

**\[PLP\]** Enhanced mobile sort selection UX with a more intuitive slider interface.

Created new `SFMobileSortSelection.vue` component and replaced dropdown-based sort selection in `SFFilterSlideInContent.vue` with a slider interface.
The previous dropdown implementation for sort selection on mobile devices was not optimal for touch interactions and required multiple taps to change sort options. The new slider interface with chips:

- Provides better touch targets for mobile users
- Offers immediate visual feedback
- Reduces the number of interactions needed to change sort order
