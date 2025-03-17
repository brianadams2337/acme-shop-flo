---
'@scayle/storefront-boilerplate-nuxt': minor
---

**\[Config\]** Extended the `PublicShopConfig` interface with a new property: `countryCode`.
This addition addresses the need to distinguish shops based on region, especially in cases where the locale (language) is the same but the target country is different.
This allows for proper identification of shops in scenarios like Germany having both `de_DE` (German) and en_US (English) storefronts, where the locale alone is insufficient.
