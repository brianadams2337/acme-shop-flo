import { useCategoryById } from '#storefront/composables'

export function useCurrentCategory(id: number) {
  return useCategoryById(
    {
      params: {
        id,
        children: 0,
        properties: { withName: ['sale'] },
      },
    },
    `current-category-${id}`,
  )
}
