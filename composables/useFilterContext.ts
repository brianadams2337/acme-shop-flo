import type {
  FetchProductsCountResponse,
  FilterParams,
} from '@scayle/storefront-nuxt'
import {
  inject,
  provide,
  type InjectionKey,
  type ComputedRef,
  type Ref,
} from 'vue'
import type { useFacet, useRpc } from '#storefront/composables'

// Use any here since we do not get the type during compilation
export interface FilterContext {
  refreshProductCount: (filterParams: FilterParams) => Promise<void>
  filterableValues: Awaited<ReturnType<typeof useFacet>>['filters']
  filterStatus: Awaited<ReturnType<typeof useRpc>>['status']
  filtersFetching: Ref<boolean>
  unfilteredCount: ComputedRef<number | undefined>
  productCountData: Ref<FetchProductsCountResponse | undefined>
}

const FilterContextKey: InjectionKey<FilterContext> = Symbol('FilterContext')

export function createFilterContext(props: FilterContext) {
  return provide(FilterContextKey, props)
}

export function useFilterContext() {
  return inject(FilterContextKey)
}
