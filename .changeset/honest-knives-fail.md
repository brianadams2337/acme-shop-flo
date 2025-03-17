---
'@scayle/storefront-boilerplate-nuxt': patch
---

**\[UI\]** After refactoring to use prop destructuring in the `SFProductCardBadgesFooter` component, the default value of the `isPromotionBadgeFullWidth` prop was not being applied correctly.
This has been fixed, restoring the intended default behavior.
