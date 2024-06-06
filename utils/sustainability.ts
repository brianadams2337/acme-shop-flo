import { type Product, getFirstAttributeValue } from '@scayle/storefront-nuxt'
import { SUSTAINABILITY_ATTRIBUTES } from '~/constants/attributes'

export const isProductSustainable = (product: Product): boolean => {
  return SUSTAINABILITY_ATTRIBUTES.some((attr) => {
    return getFirstAttributeValue(product.attributes, attr)?.label
  })
}
