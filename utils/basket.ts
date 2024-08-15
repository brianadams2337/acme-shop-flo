import { group } from 'radash'
import {
  type BasketItem,
  getFirstAttributeValue,
} from '@scayle/storefront-nuxt'

export type BundledBasketItems<T = unknown> = Partial<Record<string, T[]>>

export const sortBasketItemsByNameAndSize = (
  items: BasketItem[],
): BasketItem[] => {
  const getSortingBasketItemName = (item: BasketItem) =>
    getFirstAttributeValue(item.product.attributes, 'name')?.label ?? ''

  const sortedAlphabetically = items.toSorted((a, b) =>
    getSortingBasketItemName(a).localeCompare(getSortingBasketItemName(b)),
  )

  const getSortingBasketItemSize = (item: BasketItem) =>
    getFirstAttributeValue(item.variant?.attributes, 'size')?.id ?? 0

  return sortedAlphabetically.toSorted(
    (a, b) => getSortingBasketItemSize(a) - getSortingBasketItemSize(b),
  )
}

export const sortBasketItemsByIsSoldOut = (
  items: BasketItem[],
): BasketItem[] => {
  const getSortingBasketItemProductAttribute = ({ product }: BasketItem) =>
    Number(product.isSoldOut)

  return items.toSorted(
    (a, b) =>
      getSortingBasketItemProductAttribute(a) -
      getSortingBasketItemProductAttribute(b),
  )
}

export const getPartitionedBasketItems = (items: BasketItem[] = []) => {
  return items.reduce<Record<'standAlone' | 'groupedItems', BasketItem[]>>(
    (acc, item: BasketItem) => {
      ;(item.itemGroup?.id ? acc.groupedItems : acc.standAlone).push(item)
      return acc
    },
    { standAlone: [], groupedItems: [] },
  )
}

export const bundleBasketItemsByGroup = (
  items: BasketItem[] = [],
): BundledBasketItems<BasketItem> => {
  return group(items, (item: BasketItem) => item.itemGroup?.id ?? '-1')
}
