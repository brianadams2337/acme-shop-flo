import { stripShopLocaleFromPath } from '@scayle/storefront-nuxt'

export async function useCategory() {
  const currentShop = useCurrentShop()
  const route = useRoute()

  const categoryPath = computed(() => {
    const pathWithoutLocale = currentShop.value?.path
      ? stripShopLocaleFromPath(currentShop.value?.path, route.path)
      : route.path

    return normalizePathRoute(pathWithoutLocale)
  })

  const { data: category } = await useCategoryByPath({
    params: { path: categoryPath.value, children: 0 },
    key: 'category',
  })

  return { category, categoryPath }
}
