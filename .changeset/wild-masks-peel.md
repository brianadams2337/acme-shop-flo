---
'@scayle/storefront-boilerplate-nuxt': patch
---

E2E: Improved the resilience of our PLP end-to-end tests by modifying the sibling product selection logic. Tests now dynamically target the first available product within a PLP category page instead of relying on a fixed product ID. This change ensures that tests remain valid even if the order or availability of products fluctuates.
