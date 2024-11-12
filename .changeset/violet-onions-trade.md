---
'@scayle/storefront-boilerplate-nuxt': minor
---

Architecture: Improved page load speed by enabling Brotli compression by default for cached data. This optimization can be customized via the `NUXT_STOREFRONT_STORAGE_CACHE_COMPRESSION` environment variable or the `storefront.storage.cache` option in `nuxt.config.ts`.
