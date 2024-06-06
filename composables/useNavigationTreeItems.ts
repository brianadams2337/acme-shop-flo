import { type NavigationTree, extendPromise } from '@scayle/storefront-nuxt'
import { computed } from 'vue'
import { useNavigationTrees } from '#storefront/composables'

export function useNavigationTreeItems(prefix = 'base') {
  const navigationTrees = useNavigationTrees({
    params: { params: { with: { category: true } } },
    key: `${prefix}-navigation-trees`,
  })

  const { data } = navigationTrees

  const navigationTreeItems = computed<NavigationTree[]>(() => {
    const normalizedPrefix = prefix.toLowerCase()
    return (data.value ?? []).filter(({ name = '' }) => {
      return name.toLowerCase().startsWith(normalizedPrefix)
    })
  })

  return extendPromise(
    navigationTrees.then(() => ({})),
    { navigationTreeItems },
  )
}
