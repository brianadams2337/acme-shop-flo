import type { NavigationTree } from '@scayle/storefront-nuxt'

export const filterNavigationTree = (
  items: NavigationTree[],
  prefixToMatch = '',
) => {
  const filterRegex = new RegExp(`^${prefixToMatch?.toLowerCase()}`)
  return items.filter((tree) => filterRegex.test(tree.name?.toLowerCase()))
}
