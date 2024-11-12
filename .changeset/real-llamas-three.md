---
'@scayle/storefront-boilerplate-nuxt': patch
---

E2E: Addressed an issue affecting sticky elements on scrolled pages in Mobile Safari. The solution replaces `mouse.wheel()` with `window.scrollTo()` for improved accuracy and reliability.
