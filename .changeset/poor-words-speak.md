---
'@scayle/storefront-application-nuxt': minor
---

**\[Product List Page\]** Implemented a smart and custom sorting mechanism for the `top_seller` sorting option (commonly referred to as "Recommendations").
If there are no sorting keys defined for a specific category, the `top_seller` sorting option will default to its original behavior.
Here's the main logic for implementing smart and custom sorting keys:

```ts
import {
  defaultSortingOptions,
  DEFAULT_SORTING_KEY,
  useProductListSort,
} from '#storefront-product-listing'

const sortingOptions = computed(() => {
  const smartSortingKey = currentCategory.value?.productSorting?.smartSortingKey
  const customSortingKey =
    currentCategory.value?.productSorting?.customSortingKey

  if (!smartSortingKey && !customSortingKey) {
    return defaultSortingOptions
  }
  return defaultSortingOptions.map((option) => {
    const sortingKey = [smartSortingKey, customSortingKey].filter(
      (item): item is string => !!item,
    )
    return option.key === DEFAULT_SORTING_KEY
      ? { ...option, sortingKey }
      : option
  })
})

const { selectedSort } = useProductListSort(route, {
  sortingOptions: sortingOptions.value,
})
```
