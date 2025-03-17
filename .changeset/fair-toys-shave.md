---
'@scayle/storefront-boilerplate-nuxt': patch
---

**\[CMS\]** Fixed missing product data in `CmsProduct` click event.
The `clickProduct` event in the `CmsProduct` component was not correctly emitting product data.
This issue has been resolved, and the event now includes the necessary product information when triggered.

- Related Components:
  - Storyblok: `/modules/cms/providers/storyblok/components/Product.vue`
  - Contentful: `/modules/cms/providers/contentful/components/Product.vue`
