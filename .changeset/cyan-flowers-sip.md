---
'@scayle/storefront-boilerplate-nuxt': minor
---

**\[CMS\]** The `CMSAppFooterData` component has been removed from all CMS providers.
This component was previously used to fetch and render footer links, but this approach has been replaced by a more efficient and centralized method.
Footer content is now managed through dedicated composables from the `@scayle/storefront-nuxt` package and configured using [SCAYLE Navigation](https://scayle.dev/en/user-guide/shops/storefront/navigation) in the Panel.
This change reduces code duplication and simplifies maintenance while providing a more consistent and flexible approach to managing footer links.
