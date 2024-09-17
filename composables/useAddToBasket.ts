import { useI18n } from 'vue-i18n'
import type { AddOrUpdateItemType } from '@scayle/storefront-nuxt'
import { ExistingItemHandling } from '@scayle/storefront-api'
import { useToast } from '~/composables/useToast'
import { getBasketToastErrorMessageKey } from '~/utils/basket'
import { routeList } from '~/utils/route'
import { useBasket, useLog } from '#storefront/composables'
import { hasSubscriptionCustomData } from '~/modules/subscription/helpers/subscription'

export type AddToBasketItem = AddOrUpdateItemType & {
  productName: string
  interval?: string
}
export function useAddToBasket() {
  const { addItem: addItemToBasket } = useBasket()
  const { show } = useToast()
  const i18n = useI18n()
  const log = useLog()

  const addItem = async (item: AddToBasketItem) => {
    try {
      const hasSubscriptionData = hasSubscriptionCustomData(item.customData)
      const existingItemHandling = hasSubscriptionData
        ? ExistingItemHandling.ReplaceExisting
        : ExistingItemHandling.AddQuantityToExisting
      await addItemToBasket({ ...item, existingItemHandling })
      const message = hasSubscriptionData
        ? i18n.t('basket.notification.add_subscription_to_basket_success', {
            productName: item.productName,
            interval: item.interval,
          })
        : i18n.t('basket.notification.add_to_basket_success', {
            productName: item.productName,
          })

      show(message, { type: 'SUCCESS', action: 'ROUTE', to: routeList.basket })
    } catch (e) {
      log.error('Item could not be added to basket', e)
      show(
        i18n.t(getBasketToastErrorMessageKey(e), {
          productName: item.productName,
        }),
        { type: 'ERROR', action: 'CONFIRM' },
      )
    }
  }

  return {
    addItem,
  }
}
