import { SUSTAINABILITY_ATTRIBUTES } from '~/constants/attributes'
import { INCLUDED_QUICK_FILTERS } from '~/composables/useFilter'

export const FACET_PARAMS = {
  with: {
    product: {
      attributes: {
        withKey: [
          'color',
          'brand',
          'name',
          'promotion',
          ...SUSTAINABILITY_ATTRIBUTES,
        ],
      },
      variants: {
        attributes: {
          withKey: ['price'],
        },
        lowestPriorPrice: true,
      },
      siblings: {
        attributes: { withKey: ['color', 'brand', 'name'] },
      },
      images: {
        attributes: {
          withKey: ['imageType', 'imageView', 'imageBackground', 'imageKind'],
        },
      },
      priceRange: true,
      lowestPriorPrice: true,
      categories: {
        properties: {
          withName: ['baseCategories'],
        },
      },
    },
  },
  includedFilters: INCLUDED_QUICK_FILTERS,
}
