import { ref, computed } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { getFirstAttributeValue } from '@scayle/storefront-nuxt'
import { useRouteHelpers } from '~/composables/useRouteHelpers'
import { useTrackingEvents } from '~/composables/useTrackingEvents'
import { useStorefrontSearch } from '#storefront/composables'
import {
  isCategorySuggestion,
  isNavigationItemSuggestion,
  isProductSuggestion,
} from '~/utils'
import { DEBOUNCED_SEARCH_DURATION } from '~/constants'

export function useSearchData() {
  const key = 'storefront-search'
  const searchQuery = ref<string>('')

  const {
    getSearchRoute,
    localizedNavigateTo,
    getProductDetailRoute,
    buildCategorySuggestionRoute,
  } = useRouteHelpers()

  const { trackSearchSuggestionClick } = useTrackingEvents()

  const { data, resolveSearch, getSearchSuggestions, status, ...searchData } =
    useStorefrontSearch(searchQuery, {}, key)

  const allSuggestions = computed(() => data?.value?.suggestions ?? [])

  const products = computed(() => {
    return allSuggestions.value.filter(isProductSuggestion)
  })

  const categories = computed(() => {
    return allSuggestions.value.filter(isCategorySuggestion)
  })

  const navigationItems = computed(() =>
    allSuggestions.value.filter(isNavigationItemSuggestion),
  )

  const totalCount = computed(() => {
    return (
      products.value.length +
      categories.value.length +
      navigationItems.value.length
    )
  })

  const noSuggestions = computed(() => totalCount.value === 0)

  const resolveSearchAndRedirect = async () => {
    const resolved = await resolveSearch()

    if (!resolved?.type) {
      return await localizedNavigateTo(getSearchRoute(searchQuery.value))
    }

    trackSearchSuggestionClick(searchQuery.value, resolved)

    if (isProductSuggestion(resolved)) {
      const { product } = resolved.productSuggestion
      return await localizedNavigateTo(
        getProductDetailRoute(
          product.id,
          getFirstAttributeValue(product.attributes, 'name')?.label,
        ),
      )
    }

    if (isCategorySuggestion(resolved)) {
      const route = buildCategorySuggestionRoute(resolved)
      return await localizedNavigateTo(route)
    }

    return await localizedNavigateTo(getSearchRoute(searchQuery.value))
  }

  const hasSearchQuery = computed(() => searchQuery.value?.length)

  const debouncedSearch = useDebounceFn(async () => {
    if (!hasSearchQuery.value) {
      status.value = 'idle'
      return
    }
    await getSearchSuggestions()
  }, DEBOUNCED_SEARCH_DURATION)

  const showSuggestionsLoader = computed(() => {
    return (
      status.value === 'pending' && (!searchQuery.value || noSuggestions.value)
    )
  })

  return {
    ...searchData,
    searchQuery,
    data,
    status,
    products,
    categories,
    navigationItems,
    noSuggestions,
    totalCount,
    resolveSearchAndRedirect,
    hasSearchQuery,
    debouncedSearch,
    showSuggestionsLoader,
  }
}
