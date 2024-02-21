import type { NavigationTree } from '@scayle/storefront-nuxt'

export async function useFooterNavigationTrees() {
  const { data } = await useNavigationTrees()

  const footerNavigationTrees = computed<NavigationTree[]>(() => {
    return filterNavigationTree(data.value, 'footer')
  })

  return { footerNavigationTrees }
}
