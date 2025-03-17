---
'@scayle/storefront-boilerplate-nuxt': patch
---

**\[E2E\]** Improved the hydration error tests by differentiating between guest and logged-in user contexts. Guest user tests now validate empty states for pages like Wishlist and Basket, while logged-in user tests verify pre-populated states. The scope of hydration testing has been expanded to include additional URLs defined in `/playwright/support/pages-hydration-check.json`. Error reporting has also been enhanced to provide more specific arguments and context for improved debugging.
