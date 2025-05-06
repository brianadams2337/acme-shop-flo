---
'@scayle/storefront-application-nuxt': patch
---

**\[Architecture\]** Resolved an issue where category navigation on the Product Listing Page (PLP) was unresponsive. Category data is now fetched directly within the PLP, eliminating the need for the category middleware. The middleware's logic has been integrated into the PLP page itself.
