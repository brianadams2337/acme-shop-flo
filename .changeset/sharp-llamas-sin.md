---
'@scayle/storefront-application-nuxt': patch
---

**\[PLP\]** Fetching of categories without products has been disabled. This eliminates the need to manually disable empty categories in the panel and automatically removes unnecessary categories from the PLP side navigation, resulting in a clearer and more streamlined interface.

```ts
// /pages/c.vue

const { data: rootCategories, status } = useCategoryTree(
  {
    params: {
      children: 5,
      properties: { withName: ['sale'] },
    },
  },
  'category-navigation-tree',
)

// was changed to

const { data: rootCategories, status } = useCategoryTree(
  {
    params: {
      children: 5,
      properties: { withName: ['sale'] },
      hideEmptyCategories: true,
    },
  },
  'category-navigation-tree',
)
```
