import {
  type Product,
  getFirstAttributeValue,
  getProductAndSiblingsColors,
  getProductSiblings,
  ProductImageType,
  getImageFromList,
} from '@scayle/storefront-nuxt'
import { type MaybeRefOrGetter, toRef, computed } from 'vue'
import { useRouteHelpers } from './useRouteHelpers'
import {
  getLowestPriceBetweenVariants,
  getVariantWithLowestPrice,
} from '~/utils'

export function useProductBaseInfo(
  productItem: MaybeRefOrGetter<Product | undefined>,
) {
  const product = toRef(productItem)
  const { getProductDetailRoute } = useRouteHelpers()

  const brand = computed(() => {
    return getFirstAttributeValue(product.value?.attributes, 'brand')?.label
  })

  const name = computed(() => {
    return (
      getFirstAttributeValue(product.value?.attributes, 'name')?.label ?? ''
    )
  })

  const price = computed(() => {
    if (!product.value) {
      return
    }
    return getLowestPriceBetweenVariants(product.value)
  })

  const variantWithLowestPrice = computed(() =>
    getVariantWithLowestPrice(product.value?.variants || []),
  )

  const lowestPriorPrice = computed(() => {
    return variantWithLowestPrice.value?.lowestPriorPrice
  })

  const colors = computed(() => {
    if (!product.value) {
      return
    }
    return getProductAndSiblingsColors(product.value, 'color')
  })

  const image = computed(() => {
    if (!product.value) {
      return
    }
    return getImageFromList(
      product.value.images,
      ProductImageType.BUST,
      'front',
    )
  })

  const siblings = computed(() => {
    return getProductSiblings(product.value, 'color') || []
  })

  const link = computed(() => {
    if (!product.value) {
      return
    }
    return getProductDetailRoute(product.value)
  })

  return {
    brand,
    name,
    price,
    lowestPriorPrice,
    colors,
    image,
    siblings,
    link,
    variantWithLowestPrice,
  }
}
