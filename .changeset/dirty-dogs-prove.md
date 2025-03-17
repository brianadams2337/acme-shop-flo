---
'@scayle/storefront-boilerplate-nuxt': minor
---

The `CMSPage` component has been removed from the Storefront Boilerplate and replaced with the new `CMSContentPage` component.
This change aligns the homepage structure with the refactored CMS content types in Storyblok and Contentful.
The `CMSContentPage` component directly renders the `CMSStory` component, eliminating the overhead of custom dynamic component loading.
Additionally, the introduction of status-specific slots within `CMSContentPage` simplifies data fetching and handling by providing a more structured and predictable approach compared to the previous awaited fetching method in CMSPage.
This change improves the overall maintainability and performance of the homepage.

- Example Usage:

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
