---
'@scayle/storefront-boilerplate-nuxt': minor
---

**\[Storefront Feature Package\]** Replace the composable `useProductsByCategory` with `useProductsForListing` from `@scayle/storefront-product-listing`.

- Previous implementation:

  ```ts
  const {
    products,
    pagination,
    status: productsStatus,
    totalProductsCount,
    paginationOffset,
  } = useProductsByCategory(currentCategoryId, route, {
    params: {
      with: PRODUCT_TILE_WITH_PARAMS,
    },
    fetchingOptions: { lazy: true },
  })
  ```

- Current implementation:

  ```ts
  const { selectedSort } = useProductListSort(route)
  const { appliedFilter } = useAppliedFilters(route)

  const {
    products,
    pagination,
    status: productsStatus,
    totalProductsCount,
    paginationOffset,
  } = useProductsForListing({
    params: {
      categoryId: currentCategoryId.value,
      with: PRODUCT_TILE_WITH_PARAMS,
      sort: selectedSort.value,
      perPage: PRODUCTS_PER_PAGE,
      where: appliedFilter.value,
    },
    fetchingOptions: { lazy: true },
  })
  ```
