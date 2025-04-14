---
'@scayle/storefront-application-nuxt': patch
---

**\[Order Success Page\]** Implemented error handling for failed attempts to fetch order data.
In case of failure (e.g., network or server error during fetch), the user is now directed to the standard Nuxt error page.
