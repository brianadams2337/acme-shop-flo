---
'@scayle/storefront-application-nuxt': patch
---

**\[Architecture\]** Resolved an issue where category navigation on the Product Listing Page (PLP) was unresponsive. Since the PLP was made a fixed page, navigating to a new category no longer triggered a page reload, causing a reactivity issue with category data. Category data is now exclusively fetched within the PLP, eliminating the need for the category middleware. The middleware's logic has been integrated into the PLP page itself.
