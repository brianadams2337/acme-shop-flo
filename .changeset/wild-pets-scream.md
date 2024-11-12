---
'@scayle/storefront-boilerplate-nuxt': patch
---

A11y: Enhanced the `useDropdownKeyboardBehavior` function to prevent potential conflicts by limiting its keydown event listeners to elements within the dropdown itself. This ensures that keyboard interactions are correctly scoped and do not unintentionally affect other page elements.
