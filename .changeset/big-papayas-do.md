---
'@scayle/storefront-application-nuxt': minor
---

**\[UI\]** Prevented the filter panel (`SFFilterSlideIn.vue`) from automatically closing when the page route changes.
This allows the panel to stay open when filters are applied, as filter application modifies the route via URL parameters.
