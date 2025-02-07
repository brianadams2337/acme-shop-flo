---
'@scayle/storefront-boilerplate-nuxt': patch
---

**\[OSP\]** Fixed an edge case within the `SFOspProductCard` component where the OSP would throw an error if a product variant was missing a size attribute. This scenario is rare but could occur under specific circumstances. The issue stemmed from a missing optional chaining operator when accessing the size attribute. This has been corrected by adding the necessary optional chaining operator (`?.`) to the size attribute accessor.
