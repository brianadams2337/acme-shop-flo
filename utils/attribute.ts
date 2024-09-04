import {
  type Product,
  type Attributes,
  getAttributeValue,
  getAttributeValueTuples,
  getFirstAttributeValue,
  getFlattenedAdvancedAttribute,
  type AttributeGroup,
} from '@scayle/storefront-nuxt'

export const getAdvancedAttributes = <T>({
  product,
  property,
}: {
  product: Product
  property: string
}): Array<T> => {
  const valueList = getFlattenedAdvancedAttribute<{ value: T }>(
    product?.advancedAttributes?.[property]?.values || [],
  )

  return valueList.filter((entry) => entry.value).map((item) => item.value)
}

const getFormattedLabel = (attributeGroup: AttributeGroup | undefined) => {
  if (!attributeGroup) {
    return []
  }

  // Normalize
  const attributeGroupValues = Array.isArray(attributeGroup.values)
    ? attributeGroup.values
    : [attributeGroup.values]

  // Map labels
  return attributeGroupValues.map((value) =>
    attributeGroup.type === 'extras'
      ? value.label
      : `${attributeGroup.label}: ${value.label}`,
  )
}

export const getFilteredAttributeGroups = (
  attributes: Attributes,
  filterTypes: string[],
) => {
  return Object.values(attributes)
    .filter(
      (attribute) => attribute?.type && filterTypes.includes(attribute.type),
    )
    .reduce((map, attributeValue) => {
      const key = attributeValue?.type || ''
      const value = getFormattedLabel(attributeValue)

      map.set(key, (map.get(key) || []).concat(value))

      return map
    }, new Map<string, string[]>())
}

export default {
  getAdvancedAttributes,
  getAttributeValue,
  getAttributeValueTuples,
  getFirstAttributeValue,
}
