import { getFirstAttributeValue } from '@scayle/storefront-nuxt'
import { navigateTo, defineNuxtRouteMiddleware } from '#app/composables/router'
import { useRouteHelpers } from '~/composables'
import { useRpcCall } from '#storefront/composables'
import { getProductId } from '~/utils/route'

export default defineNuxtRouteMiddleware(async ({ params, query, path }) => {
  if (import.meta.client) {
    return
  }

  const { getProductDetailRoute } = useRouteHelpers()
  const getProductById = useRpcCall('getProductById')

  const product = await getProductById({
    id: getProductId(params),
  }).catch(() => null)

  if (!product) {
    return
  }

  const expectedPath = getProductDetailRoute(
    product.id,
    getFirstAttributeValue(product?.attributes, 'name')?.label,
  )

  if (expectedPath === path) {
    return
  }

  return navigateTo({ path: expectedPath, query }, { redirectCode: 301 })
})
