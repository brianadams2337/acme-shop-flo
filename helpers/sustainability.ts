import { getFirstAttributeValue, Product } from '@scayle/storefront-nuxt'

export const sustainabilityAttributes = [
  'sustainability',
  'sustainabilityCertificates',
  'sustainabilityIcons',
  'sustainabilityMaterials',
]

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
