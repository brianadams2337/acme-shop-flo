import type {
  CategorySearchSuggestion,
  NavigationItemSuggestion,
  ProductSearchSuggestion,
} from '@scayle/storefront-core'
import { Factory } from 'fishery'
import { categoryFactory } from './category'
import { navigationItemExternalFactory } from './navigationTreeItem'
import { productFactory } from './product'

export const categorySearchSuggestionFactory =
  Factory.define<CategorySearchSuggestion>(() => ({
    type: 'category',
    categorySuggestion: {
      category: categoryFactory.build(),
      filters: [],
    },
  }))
export const productSearchSuggestionFactory =
  Factory.define<ProductSearchSuggestion>(() => ({
    type: 'product',
    productSuggestion: {
      product: productFactory.build(),
    },
  }))

export const navigationItemSuggestionFactory =
  Factory.define<NavigationItemSuggestion>(() => ({
    type: 'navigationItem',
    navigationItemSuggestion: {
      navigationItem: navigationItemExternalFactory.build(),
    },
  }))
