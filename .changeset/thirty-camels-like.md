---
'@scayle/storefront-application-nuxt': patch
---

**\[E2E\]** Optimized test execution speed for non-Vercel environments. Vercel-specific extra HTTP headers are now applied conditionally based on the `isTargetingVercel` environment variable check in `/nuxt/playwright/playwright.config.ts`, avoiding unnecessary overhead in other scenarios.
