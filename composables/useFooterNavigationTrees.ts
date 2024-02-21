import type { NavigationTree } from '@scayle/storefront-nuxt'

export async function useFooterNavigationTrees() {
  const { data } = await useNavigationTrees({
    params: { params: { with: { category: true } } },
    key: 'footer-navigaton-trees',
  })

  const footerNavigationTrees = computed<NavigationTree[]>(() => {
    return filterNavigationTree(data.value, 'footer')
  })

  return { footerNavigationTrees }
}
