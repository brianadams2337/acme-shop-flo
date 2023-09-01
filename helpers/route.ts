import {
  Category,
  getFirstAttributeValue,
  isExactActiveRoute,
  Product,
  slugify,
  ProductSuggestion,
  BrandOrCategorySuggestion,
} from '@scayle/storefront-nuxt'
import { OrderProduct } from '~/types/osp'

// TODO fix import from vue-router
type Location = {
  name: string
  params?: { [key: string]: any }
  query?: { [key: string]: any }
}

const getProductDetailRoute = (product: Product, id?: number): Location => {
  const name = getFirstAttributeValue(product.attributes, 'name')?.label
  return {
    name: 'p-slug',
    params: {
      slug: `${slugify(name)}-${id || product.id}`,
    },
  }
}

const getOrderProductDetailRoute = (
  product: OrderProduct,
  id?: number,
): Location => {
  const name = product.attributes.name.label
  return {
    name: 'p-slug',
    params: {
      slug: `${slugify(name)}-${id || product.id}`,
    },
  }
}

const getProductDetailPath = (product: Product, id?: number) => {
  const name = getFirstAttributeValue(product.attributes, 'name')?.label
  return `/p/${slugify(name)}-${id || product.id}`
}

const getStoreDetailRoute = (cityName: string): Location => {
  return {
    name: routes.stores.name,
    params: {
      slug: cityName,
    },
  }
}

const getSearchRoute = (term: string): Location => {
  return {
    name: 'search',
    query: { term },
  }
}

const getCategoryPath = (category: Category) => {
  if (!category) {
    return
  }
  return `${category.path}`
}

const getSearchSuggestionPath = (
  suggestion: ProductSuggestion | BrandOrCategorySuggestion,
) => {
  if (!suggestion) {
    return
  }

  const product = (suggestion as ProductSuggestion).product
  if (product) {
    return getProductDetailPath(product)
  }

  const category = (suggestion as BrandOrCategorySuggestion).category
  const brand = (suggestion as BrandOrCategorySuggestion).brand
  if (category && brand) {
    return `${getCategoryPath(category)}?brand=${brand?.id}`
  }

  return getCategoryPath(category)
}

const getLookbookRoute = (slug: string): Location => ({
  name: routes.lookbooks.name,
  params: {
    slug,
  },
})

const getOrderDetailsRoute = (id: number): Location => ({
  name: routes.orderDetail.name,
  params: {
    id: id.toString(),
  },
})

type Link =
  | 'search'
  | 'wishlist'
  | 'basket'
  | 'product'
  | 'stores'
  | 'lookbooks'
  | 'trends'
  | 'home'
  | 'checkout'
  | 'signin'
  | 'account'
  | 'order'
  | 'orderDetail'
  | 'user'
export type LinkList = Record<
  Link,
  { name: string; path: string; parameter?: string }
>

const routes: LinkList = {
  home: { name: 'index', path: '/' },
  search: { name: 'search', path: '/search' },
  wishlist: { name: 'wishlist', path: '/wishlist' },
  basket: { name: 'basket', path: '/basket' },
  product: { name: 'product-slug', path: '/product' },
  stores: { name: 'stores-slug', path: '/stores' },
  trends: { name: 'women-trends-slug', path: '/women/trends' },
  lookbooks: {
    name: 'lookbooks-slug',
    path: '/lookbooks',
    parameter: 'slug',
  },
  signin: { name: 'signin', path: '/signin' },
  account: { name: 'account', path: '/account' },
  checkout: { name: 'checkout', path: '/checkout' },
  order: { name: 'account-order', path: '/account/order' },
  user: { name: 'account-user', path: '/account/user' },
  orderDetail: {
    name: 'account-order-id',
    path: '/account/order',
    parameter: 'id',
  },
}

export default {
  slugify,
  getProductDetailRoute,
  getOrderProductDetailRoute,
  getLookbookRoute,
  getOrderDetailsRoute,
  getCategoryPath,
  getSearchRoute,
  getSearchSuggestionPath,
  isExactActiveRoute,
  getStoreDetailRoute,
  routes,
}
