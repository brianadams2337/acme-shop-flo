---
'@scayle/storefront-boilerplate-nuxt': minor
---

**\[Search\]** Rename the search query parameter `term` to `filters[term]` to adhere to the established filter naming convention. This alignment ensures that search results only display filters matching the available products.

To maintain existing functionality, all instances of accessing `route.query.term` need to be updated to `route.query.['filters[term]']`.

Example:

```ts
  //Before
  const route = useRoute()
  console.log(route.query.term)

  //After
  const route = useRoute()
  console.log(route.query.['filters[term]'])
```

This was done in:

- `composables/useFilter.ts`
- `composables/useProductsSearch.ts`
- `composables/useRouteHelpers.ts`
- `pages/search.vue`
