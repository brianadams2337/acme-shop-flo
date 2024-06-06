import {
  type AddOrUpdateItemType,
  type BasketWithOptions,
  rpcCall,
} from '@scayle/storefront-nuxt'
import { nanoid } from 'nanoid'
import { toValue, type MaybeRefOrGetter } from 'vue'
import { useBasket, useCurrentShop } from '#storefront/composables'
import { useNuxtApp } from '#app'

type AggregateGroupParams = {
  mainItem: AddOrUpdateItemType
  items: AddOrUpdateItemType[]
}

export function useBasketGroup(
  withParams?: MaybeRefOrGetter<BasketWithOptions>,
) {
  const nuxtApp = useNuxtApp()
  const currentShop = useCurrentShop()
  const { fetch: refreshBasket } = useBasket()

  const aggregateAsGroup = ({
    mainItem,
    items,
  }: AggregateGroupParams): AddOrUpdateItemType[] => {
    const groupId = nanoid(8)
    return [
      {
        ...mainItem,
        itemGroup: { id: groupId, isMainItem: true, isRequired: true },
      },
      ...items.map((item) => ({
        ...item,
        itemGroup: { id: groupId, isMainItem: false, isRequired: true },
      })),
    ]
  }

  const addGroupToBasket = async ({
    mainItem,
    items,
  }: AggregateGroupParams) => {
    const aggregatedGroup = aggregateAsGroup({ mainItem, items })
    await rpcCall(
      nuxtApp,
      'addGroupToBasket',
      currentShop.value,
    )({ items: aggregatedGroup, with: toValue(withParams) })
    await refreshBasket()
  }

  return { addGroupToBasket }
}
