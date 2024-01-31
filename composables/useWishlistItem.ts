import {
  type WishlistItem,
  type Price,
  type LowestPriorPrice,
  type Product,
  type Value,
  getAttributeValue,
  getLowestPrice,
  getSizeFromVariant,
} from '@scayle/storefront-nuxt'

export function useWishlistItem(
  item: Ref<WishlistItem & { product: Product }>,
) {
  const hasOneSizeVariantOnly = computed(() => {
    const variants = item.value.product?.variants
    return (
      variants?.length === 1 &&
      getAttributeValue(variants[0].attributes, 'size') === ONE_SIZE_KEY
    )
  })

  const price = computed<Price>(() => {
    return item.value.variant
      ? item.value.variant.price
      : getLowestPrice(item.value.product.variants || [])
  })

  const isAvailable = computed<boolean>(() => {
    return item.value.product.isActive || !item.value.product.isSoldOut
  })

  const selectedSize = computed<Value | undefined>(() => {
    return item.value.variant && getSizeFromVariant(item.value.variant, 'size')
  })

  const lowestPriorPrice = computed<LowestPriorPrice | undefined>(() => {
    const variants = item.value.product.variants
    const variant = getVariantWithLowestPrice(variants)
    return variant?.lowestPriorPrice
  })

  const sizes = computed(() => getVariantSizes(item.value.product.variants))

  return {
    hasOneSizeVariantOnly,
    price,
    isAvailable,
    selectedSize,
    lowestPriorPrice,
    sizes,
  }
}
