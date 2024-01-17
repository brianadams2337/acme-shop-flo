import { type BasketItem } from '@scayle/storefront-nuxt'

const listingMetaData = {
  id: BasketListingMetadata.ID,
  name: BasketListingMetadata.NAME,
}

type OrderedItems<T> = {
  standAlone: T[]
  groupedItems: BundledBasketItems<T>
}

export async function useBasketActions() {
  const basket = await useBasket()
  const { bundleByGroup } = await useBasketGroup()

  const { trackRemoveFromBasket, trackBasket, collectBasketItems } =
    useTrackingEvents()

  const removeItem = async (item: BasketItem) => {
    await basket.removeItem({ variantId: item.variant.id })

    trackRemoveFromBasket(item.product, item.quantity, item.variant)
    trackBasket(
      collectBasketItems(basket.items.value || [], {
        listId: listingMetaData.id,
        listName: listingMetaData.name,
      }),
    )
  }

  const orderedItems = ref<OrderedItems<BasketItem>>({
    standAlone: [],
    groupedItems: {},
  })

  const updateBasketItems = (items: BasketItem[]) => {
    const data = items.reduce<
      Record<'standAlone' | 'groupedItems', BasketItem[]>
    >(
      (acc, item: BasketItem) => {
        item.itemGroup?.id
          ? acc.groupedItems.push(item)
          : acc.standAlone.push(item)
        return acc
      },
      { standAlone: [], groupedItems: [] },
    )
    return {
      standAlone: sortBasketItems(data.standAlone),
      groupedItems: bundleByGroup(sortBasketItems(data.groupedItems)),
    }
  }

  watchPostEffect(() => {
    orderedItems.value = updateBasketItems(basket.items.value)
  })

  const fetching = basket.fetching
  const isBasketEmpty = basket.isEmpty
  const basketData = basket.data
  const basketCount = basket.count
  const basketItems = basket.items

  return {
    removeItem,
    orderedItems,
    fetching,
    basketData,
    basketCount,
    listingMetaData,
    basketItems,
    isBasketEmpty,
  }
}
