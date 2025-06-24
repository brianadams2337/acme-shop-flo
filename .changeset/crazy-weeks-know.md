---
'@scayle/storefront-application-nuxt': minor
---

**\[Architecture\]** Removed the deprecated `$config.public.baseUrl`, which also did not provide the correct base URL for domain-based shops.

We now use the origin property from the `useRequestURL` composable to reliably obtain the correct base URL for the current shop.
