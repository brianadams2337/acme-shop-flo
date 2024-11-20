---
'@scayle/storefront-boilerplate-nuxt': patch
---

Basket: Removed the redundant flag `isLowestPreviousPriceActive`. Price display logic now relies on the SCAYLE Core System, ensuring consistency and accuracy across all supported countries. This change simplifies our codebase and removes the need for country-specific configurations related to lowest price display.
