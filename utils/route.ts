import {
  type Category,
  getFirstAttributeValue,
  type Product,
  slugify,
  type ProductSuggestion,
  type BrandOrCategorySuggestion,
} from '@scayle/storefront-nuxt'
import type { NavigateToOptions } from 'nuxt/dist/app/composables/router'
import type { RouteLocationRaw } from '#vue-router'

const getCategoryPath = (category: Category) => {
  if (!category) {
    return
  }
  return `${category.path}`
}

export const useRouteHelpers = () => {
  const localePath = useLocalePath()

  const localizedNavigateTo = (
    route: RouteLocationRaw,
    options?: NavigateToOptions,
  ) => {
    const routePath = localePath(route)
    return navigateTo(routePath, options)
  }

  const getProductDetailRoute = (
    product: Product,
    id?: number,
  ): RouteLocationRaw => {
    const name = getFirstAttributeValue(product.attributes, 'name')?.label
    return localePath({
      name: 'p-slug',
      params: {
        slug: `${slugify(name)}-${id || product.id}`,
      },
    })
  }

  const getOrderProductDetailRoute = (
    product: OrderProduct,
    id?: number,
  ): RouteLocationRaw => {
    const name = product.attributes.name.label
    return localePath({
      name: 'p-slug',
      params: {
        slug: `${slugify(name)}-${id || product.id}`,
      },
    })
  }

  const getProductDetailPath = (product: Product, id?: number) => {
    const name = getFirstAttributeValue(product.attributes, 'name')?.label
    return localePath(`/p/${slugify(name)}-${id || product.id}`)
  }

  const getSearchRoute = (term: string): RouteLocationRaw => {
    return localePath({
      name: 'search',
      query: { term },
    })
  }

  const getSearchSuggestionPath = (
    suggestion: ProductSuggestion | BrandOrCategorySuggestion,
  ) => {
    if (!suggestion) {
      return
    }

    if ('product' in suggestion) {
      return getProductDetailPath(suggestion.product)
    }

    const { category, brand } = suggestion
    const route =
      category && brand
        ? `${getCategoryPath(category)}?brand=${brand?.id}`
        : getCategoryPath(category)

    return route && localePath(route)
  }

  const getOrderDetailsRoute = (id: number): RouteLocationRaw => {
    return localePath({
      name: routeList.orderDetail.name,
      params: { id },
    })
  }

  return {
    localizedNavigateTo,
    getProductDetailRoute,
    getOrderProductDetailRoute,
    getSearchRoute,
    getSearchSuggestionPath,
    getOrderDetailsRoute,
  }
}

type Link =
  | 'home'
  | 'checkout'
  | 'wishlist'
  | 'basket'
  | 'signin'
  | 'user'
  | 'orders'
  | 'account'
  | 'pdp'
  | 'orderDetail'
  | 'search'
  | 'lookbooks'

export type LinkList = Record<
  Link,
  { name: string; path: string; parameter?: string }
>

export const routeList: LinkList = {
  home: { name: 'index', path: '/' },
  checkout: { name: 'checkout', path: '/checkout' },
  search: { name: 'search', path: '/search' },
  wishlist: { name: 'wishlist', path: '/wishlist' },
  basket: { name: 'basket', path: '/basket' },
  signin: { name: 'signin', path: '/signin' },
  orders: { name: 'account-orders', path: '/account/orders' },
  user: { name: 'account-user', path: '/account/user' },
  account: { name: 'account', path: '/account' },
  pdp: { name: 'p-name-id', path: '/p/' },
  orderDetail: { name: 'account-orders-id', path: '/account/orders/' },
  lookbooks: {
    name: 'lookbooks-slug',
    path: '/lookbooks',
    parameter: 'slug',
  },
} as const

export { getCategoryPath }
