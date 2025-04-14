---
'@scayle/storefront-application-nuxt': minor
---

**\[Performance\]** Modified the `useBreadcrumbs()` composable to generate relative URLs instead of absolute URLs.
This prevents Nuxt from treating breadcrumb links as external, which previously caused unnecessary full page reloads.
Navigation via breadcrumbs now uses client-side routing.
