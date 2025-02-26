---
'@scayle/storefront-boilerplate-nuxt': minor
---

**\[CMS\]** Remove the current `CMSPage` component (used for the homepage) from Storefront Boilerplate.
The goal is to align the overall page structure with the newly refactored and streamlined `CMSContentPage` component,
which is equivalent to the respective CMS (Storyblok / Contentful) content type. This new component renders the `CMSStory` component, eliminating the need for custom dynamic component loading.
Moreover, it removes the `awaited` fetching and handles status by providing the slots for each fetching status.

Usage Example:

```vue
<template>
  <!-- `pages/index.vue` -->
  <CMSContentPage slug="homepage" data-testid="home-page-content">
    <template #loading>
      <!-- Skeleton loader -->
    </template>
  </CMSContentPage>
</template>
```
