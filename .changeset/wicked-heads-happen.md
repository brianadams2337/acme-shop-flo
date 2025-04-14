---
'@scayle/storefront-application-nuxt': minor
---

**\[Performance\]** Optimized the `SFModal` and `SFSlideIn` components by designating them as client-only.
Since their functionality is entirely based on client-side user interaction, this prevents unnecessary server-side rendering and can improve initial page load performance.
