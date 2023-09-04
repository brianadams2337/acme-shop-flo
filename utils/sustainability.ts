import { getFirstAttributeValue, Product } from '@scayle/storefront-nuxt'
import { sustainabilityAttributes } from '~/constants/attributes'

export const isProductSustainable = (product: Product): boolean => {
  let isSustainable = false
  for (let i = 0; i < sustainabilityAttributes.length; i++) {
    if (
      getFirstAttributeValue(product.attributes, sustainabilityAttributes[i])
        ?.label
    ) {
      isSustainable = true
      break
    }
  }
  return isSustainable
}
