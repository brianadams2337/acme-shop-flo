import type { CategorySearchSuggestion } from '@scayle/storefront-nuxt'
import type { LocationQueryRaw } from '#vue-router'

export type CategoryFilter =
  CategorySearchSuggestion['categorySuggestion']['filters'][0]

export const buildFiltersQuery = (
  filters: CategoryFilter[],
): LocationQueryRaw => {
  return filters.reduce<Record<string, string>>((query, filter) => {
    switch (filter.type) {
      case 'attribute':
        return {
          ...query,
          [`filters[${filter.attributeFilter.group.key}]`]:
            filter.attributeFilter.values.map((val) => val.id).join(','),
        }

      case 'boolean':
        return {
          ...query,
          [`filters[${filter.booleanFilter.slug}]`]: 'true',
        }
    }

    return query
  }, {})
}

export const getSearchFilterLabels = (
  filters: CategoryFilter[] = [],
): string[] => {
  return filters.reduce<string[]>((labels, filter) => {
    switch (filter.type) {
      case 'attribute':
        return [
          ...labels,
          ...filter.attributeFilter.values.map(({ label }) => label),
        ]

      case 'boolean':
        return [...labels, filter.booleanFilter.label]
    }

    return labels
  }, [])
}
