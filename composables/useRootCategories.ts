export async function useRootCategories() {
  const categoryData = await useCategories({
    params: { path: '/' },
    key: 'category-navigation',
  })

  const { data: rootCategoriesData, fetching: fetchingCategories } =
    categoryData

  const rootCategories = computed(() => {
    return Array.isArray(rootCategoriesData.value.categories)
      ? rootCategoriesData.value.categories
      : [rootCategoriesData.value.categories]
  })

  return { fetchingCategories, rootCategories }
}
