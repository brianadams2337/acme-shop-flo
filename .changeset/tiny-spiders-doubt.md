---
'@scayle/storefront-application-nuxt': patch
---

**\[E2E\]** Modified the end-to-end test to validate country selection in a language-agnostic way.
The test no longer checks the visible country label (which varies with language settings) and instead confirms the selection using a stable, non-display mechanism.
