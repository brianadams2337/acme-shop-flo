---
'@scayle/storefront-application-nuxt': patch
---

**\[E2E\]** Improved end-to-end tests versatility by simplifying tests for Basket empty state and SEO, Login, PDP, and Wishlist pages SEO, making them more adaptable and maintainable.
Basket empty state check are now checking the DOM elements without exact labels check, making test generic.
SEO data verifications are checking canonical URLs without specifying the exact product URL in PDP. Wishlist, Login and Basket SEO checks are also simplified by not checking the exact description, but focusing on general verifications such as meta robots, h1 tag and canonical page URL.
