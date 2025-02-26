---
'@scayle/storefront-boilerplate-nuxt': minor
---

**\[CMS\]** The `CMSCategoryData` fetching component has been removed and
replaced by the newly introduced `CMSProductListingPageTeaser` component.
This new component is designed to handle the rendering of teaser images and manage
the associated data fetching for each CMS provided.

Usage example:

```vue
<template>
  <div class="flex flex-col">
    <CMSProductListingPageTeaser :category-id="currentCategoryId" />
  </div>
</template>
```
