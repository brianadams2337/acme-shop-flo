---
'@scayle/storefront-boilerplate-nuxt': minor
---

**\[Storefront Feature Packages\]** Replace the composable `useCategorySeoData` with `useProductListingSeoData` from `@scayle/storefront-product-listing`.

- Previous implementation:

  ```ts
  const {
    title,
    metaDescription,
    robots,
    canonicalLink,
    categoryBreadcrumbSchema,
  } = useCategorySeoData(currentCategory)
  ```

- Current implementation:

  ```ts
  const route = useRoute()
  const { getBreadcrumbsFromCategory } = useBreadcrumbs()

  const breadcrumbs = computed(() =>
    currentCategory.value
      ? getBreadcrumbsFromCategory(currentCategory.value, true)
      : [],
  )

  const { title, robots, canonicalLink, categoryBreadcrumbSchema } =
    useProductListingSeoData(breadcrumbs.value, route, {
      baseUrl: $config.public.baseUrl,
      fullPath: route.fullPath,
    })
  ```
