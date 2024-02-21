import type { NavigationTree } from '@scayle/storefront-nuxt'

export async function useHeaderNavigationTrees() {
  const { data } = await useNavigationTrees()

  const headerNavigationTrees = computed<NavigationTree[]>(() => {
    return filterNavigationTree(data.value, 'header')
  })

  return { headerNavigationTrees }
}
