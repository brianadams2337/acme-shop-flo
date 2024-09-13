import { useCategoryById } from '#storefront/composables'

export function useCurrentCategory(id: number) {
  return useCategoryById({
    key: `current-category-${id}`,
    params: {
      id,
      children: 0,
      properties: { withName: ['sale'] },
    },
  })
}
