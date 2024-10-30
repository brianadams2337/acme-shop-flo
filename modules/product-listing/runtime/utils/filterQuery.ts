import type { ProductSearchQuery } from '@scayle/storefront-nuxt'
import type { LocationQuery, RouteLocationNormalizedGeneric } from 'vue-router'
import type { RangeTuple } from '#storefront-product-listing'

export const getClearedFilterQueryByKey = (
  route: RouteLocationNormalizedGeneric,
  key: string,
): LocationQuery | undefined => {
  const query = { ...route.query }
  const filterKey = `filters[${key}]`

  if (!query[filterKey]) {
    return
  }

  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  delete query[filterKey]
  return query
}

export const getNewQueryFilters = (
  route: RouteLocationNormalizedGeneric,
  filter: LocationQuery,
): LocationQuery => {
  const newQuery = {
    sort: route.query.sort,
    term: route.query.term,
    ...filter,
  }

  if ('page' in newQuery) {
    delete newQuery.page
  }

  return newQuery
}

export const createNewAttributeQuery = (
  route: RouteLocationNormalizedGeneric,
  appliedFilter: ProductSearchQuery,
  { slug, id }: { slug: string; id: number },
): LocationQuery => {
  const attributeFilterQuery: LocationQuery = {}
  const query = { ...route.query }
  const attribute = appliedFilter.attributes?.find(({ key }) => key === slug)

  const key = `filters[${slug}]`

  if (!attribute) {
    attributeFilterQuery[key] = `${id}`
    return { ...query, ...attributeFilterQuery }
  }

  if (attribute?.type !== 'attributes') {
    return query
  }

  const values = attribute.values

  const index = values.indexOf(id)

  if (index === -1) {
    values.push(id)
  } else {
    values.splice(index, 1)
  }

  if (values.length === 0) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete query[key]
    return query
  }

  attributeFilterQuery[key] = values.join(',')

  return { ...query, ...attributeFilterQuery }
}

export const createNewPriceQuery = (
  route: RouteLocationNormalizedGeneric,
  appliedFilter: ProductSearchQuery,
  prices: RangeTuple,
): LocationQuery => {
  const priceFilterQuery: Record<string, string> = {}
  const query = { ...route.query }

  if (appliedFilter.minPrice !== prices[0]) {
    priceFilterQuery['filters[minPrice]'] = prices[0].toString()
  }

  if (appliedFilter.maxPrice !== prices[1]) {
    priceFilterQuery['filters[maxPrice]'] = prices[1].toString()
  }

  return { ...query, ...priceFilterQuery }
}

export const createNewBoolAttributeQuery = (
  route: RouteLocationNormalizedGeneric,
  appliedFilter: ProductSearchQuery,
  { slug, value }: { slug: string; value: boolean },
): LocationQuery => {
  const booleanFilterQuery: Record<string, string> = {}
  const query = { ...route.query }

  const attribute = appliedFilter.attributes?.find(({ key }) => key === slug)
  const key = `filters[${slug}]`

  if (!attribute) {
    if (!value) {
      return query
    }

    booleanFilterQuery[key] = String(value)
    return { ...query, ...booleanFilterQuery }
  }

  if (attribute.type !== 'boolean') {
    return query
  }

  if (!value) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete query[key]
    return query
  }

  booleanFilterQuery[key] = String(value)
  return { ...query, ...booleanFilterQuery }
}

export const getClearedPriceQuery = (
  route: RouteLocationNormalizedGeneric,
): LocationQuery | undefined => {
  const query = { ...route.query }

  if (!query['filters[minPrice]'] && !query['filters[maxPrice]']) {
    return
  }

  delete query['filters[minPrice]']
  delete query['filters[maxPrice]']
  return query
}
