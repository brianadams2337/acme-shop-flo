---
'@scayle/storefront-application-nuxt': patch
---

**\[UI\]** Improved `<SFPopover />` to render the `content` slot exclusively on the client side. This change resolves a hydration mismatch issue caused by using transitions with the `appear` attribute, which are not SSR-safe.
