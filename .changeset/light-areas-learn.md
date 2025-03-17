---
'@scayle/storefront-boilerplate-nuxt': patch
---

**\[UI\]** Removed arrow key handling from the focus change logic in the following components to align with [WCAG accessibility guidelines for keyboard navigation](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#fundamentalkeyboardnavigationconventions).

- Removed all arrow key navigation in `/modules/ui/runtime/components/core/SFSlideIn.vue`
- Removed left and right arrow key navigation in `/components/layout/headers/SFHeaderNavigationItem.vue`
- Removed left and right arrow key navigation in `/modules/ui/runtime/composables/useDropdownKeyboardBehavior.ts`
