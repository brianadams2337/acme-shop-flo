import type {
  NavigationItemCategory,
  NavigationItemExternal,
  NavigationItemPage,
} from '@scayle/storefront-nuxt'
import type { RouteLocationNormalizedLoadedGeneric } from '#vue-router'

export const isNavigationItemCategoryActive = (
  navigationItem:
    | NavigationItemExternal
    | NavigationItemCategory
    | NavigationItemPage,
  pageType: string,
  route: RouteLocationNormalizedLoadedGeneric,
) => {
  if (navigationItem.type !== 'category' || pageType !== 'category_page') {
    return false
  }

  const hasCategoryId = (
    item: NavigationItemExternal | NavigationItemCategory | NavigationItemPage,
    targetId: number,
  ): boolean => {
    if (item.type === 'category' && item.categoryId === targetId) {
      return true
    }
    return (
      item.children?.some((child) => hasCategoryId(child, targetId)) || false
    )
  }
  return hasCategoryId(
    navigationItem,
    Number.parseInt(route.params.id as string),
  )
}
