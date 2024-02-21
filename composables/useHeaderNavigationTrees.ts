import type { NavigationTree } from '@scayle/storefront-nuxt'

export async function useHeaderNavigationTrees() {
  const { data } = await useNavigationTrees({
    params: { params: { with: { category: true } } },
    key: 'header-navigaton-trees',
  })

  const headerNavigationTrees = computed<NavigationTree[]>(() => {
    return filterNavigationTree(data.value, 'header')
  })

  return { headerNavigationTrees }
}
