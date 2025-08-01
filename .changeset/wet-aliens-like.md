---
'@scayle/storefront-application-nuxt': patch
---

**\[ShopSwitcher\]** Fixed an issue where `useShopSwitcher` previously resolved an incorrect base path when switching to the default shop in `path_or_default` shop selector mode. It now correctly uses the `useLocalePath()` composable from `@nuxtjs/i18n` to determine the appropriate base path.
