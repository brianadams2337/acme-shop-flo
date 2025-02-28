---
'@scayle/storefront-boilerplate-nuxt': patch
---

**\[UI\]** Remove arrow keys from focus change handler, ensuring [WCAG conform keyboard navigation](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#fundamentalkeyboardnavigationconventions).

1. Remove all arrow keys as forward/backward key for keyboard navigation in `/modules/ui/runtime/components/core/SFSlideIn.vue`
2. Remove left/right key as forward/backward key for keyboard navigation in `/components/layout/headers/SFHeaderNavigationItem.vue`
3. Remove left/right key as forward/backward key for keyboard navigation in `t/modules/ui/runtime/composables/useDropdownKeyboardBehavior.ts`
