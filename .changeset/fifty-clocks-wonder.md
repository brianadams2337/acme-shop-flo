---
'@scayle/storefront-boilerplate-nuxt': minor
---

**\[CMS\]** Eliminate the `CMSServicePageData` component from all CMS providers
and service pages (`./pages/s/[slug].vue`). This component was previously tasked
with fetching content data for service pages. Consequently, all links throughout
the application that directed to these service pages must be updated.
