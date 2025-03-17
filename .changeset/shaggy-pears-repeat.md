---
'@scayle/storefront-boilerplate-nuxt': minor
---

**\[Accessibility\]** Refactored the keyboard interaction logic for the `SFSlideIn` component within the local `storefront-ui` module.
The core keyboard behavior, including focus trapping, tab order management, and 'Esc' key functionality, is now centralized within the `SFSlideIn` component.
This change eliminates redundant code in individual slide-in instances (e.g., `SFFilterSlideIn.vue`) and ensures consistent accessibility features across all slide-in components.
