---
'@scayle/storefront-application-nuxt': minor
---

**\[Product List Page\]** Implemented a smart sorting mechanism for the `top_seller` sorting option (commonly referred to as "Recommendations").
If no sorting key is defined for a specific category, the `top_seller` sorting option will default to its original behavior.
Here's the main logic for implementing smart sorting keys:

```ts
import {
  defaultSortingOptions,
  DEFAULT_SORTING_KEY,
  useProductListSort,
} from '#storefront-product-listing'

const sortingOptions = computed(() => {
  const smartSortingKey = currentCategory.value?.productSorting?.smartSortingKey

  if (!smartSortingKey) {
    return defaultSortingOptions
  }
  return defaultSortingOptions.map((option) => {
    return option.key === DEFAULT_SORTING_KEY
      ? { ...option, sortingKey: smartSortingKey }
      : option
  })
})

const { selectedSort } = useProductListSort(route, {
  sortingOptions: sortingOptions.value,
})
```
