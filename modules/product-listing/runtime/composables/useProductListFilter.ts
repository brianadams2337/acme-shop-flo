import { extendPromise } from '@scayle/storefront-nuxt'
import { computed, type MaybeRefOrGetter, toValue } from 'vue'
import type { LocationQuery } from 'vue-router'
import type { FilterItemWithValues } from '../../types'
import { getClearedPriceQuery } from '../utils'
import { useRoute } from '#app/composables/router'
// TODO: Update import when "useAppliedFilters" gets moved to the storefront-product-listing package
import { useAppliedFilters } from '~/composables'
import { useFilters } from '#storefront/composables'

// Options for configuring Filters
export type ProductListingFilterOptions = Partial<{
  immediate: boolean
  keyPrefix: string
}>

/**
 * Composable to manage filters based on current category ID and route query parameters.
 *
 * @param {number} [currentCategoryId] - current/active category ID
 * @param {ProductListingFilterOptions} options - Configuration options for filters.
 * @param {string} options.immediate - Will enable "immediate" flag via "useFilters" composable in it.
 * @param {string} options.keyPrefix - The prefix used to construct "key" via "useFilters" payload. Default is "base".
 *
 * @returns - An object containing the following properties:
 *
 *   - `filterStatus`: returns "useFilters" status
 *
 *   - `filtersFetching`: returns "useFilters" fetching flag,
 *
 *   - `fetchFilters`: call for fetching the filters,
 *
 *   - `unfilteredCount` {ComputedRef<number>}: returns unfiltered filters count,
 *
 *   - `clearedPriceQuery` {ComputedRef<LocationQuery | undefined>}: constructs an empty query object,
 */
export function useProductListFilter(
  currentCategoryId?: MaybeRefOrGetter<number | undefined>,
  options: ProductListingFilterOptions = {},
) {
  const route = useRoute()
  const { immediate = true, keyPrefix = 'base' } = options

  const { appliedFilter } = useAppliedFilters()

  const filterData = useFilters({
    params: computed(() => ({
      categoryId: toValue(currentCategoryId),
      where: {
        ...appliedFilter.value,
        ...(route.query.term && { term: String(route.query.term) }),
      },
      includeSellableForFree: true,
      includeSoldOut: false,
    })),
    options: { immediate },
    key: `${toValue(currentCategoryId) ?? keyPrefix}-filters`,
  })

  const {
    data,
    fetch: fetchFilters,
    fetching: filtersFetching,
    status: filterStatus,
  } = filterData

  const availableFilters = computed<FilterItemWithValues[]>(() => {
    return data.value?.filters.filter((filter) => {
      if (filter.type !== 'boolean') {
        return true
      }

      const trueValue = filter.values.find(
        (value) =>
          'name' in value && typeof value.name === 'boolean' && value.name,
      )

      if (!trueValue) {
        return false
      }

      return trueValue.productCount !== 0
    }) as FilterItemWithValues[]
  })

  const unfilteredCount = computed<number>(() => {
    return data.value?.unfilteredCount ?? 0
  })

  const clearedPriceQuery = computed<LocationQuery | undefined>(() => {
    return getClearedPriceQuery(route)
  })

  return extendPromise(filterData, {
    availableFilters,
    filterStatus,
    unfilteredCount,
    filtersFetching,
    fetchFilters,
    clearedPriceQuery,
  })
}
