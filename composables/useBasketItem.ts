import type { BasketItem } from '@scayle/storefront-nuxt'
import { type MaybeRefOrGetter, computed } from 'vue'
import { toRef } from '@vueuse/core'
import { isFreeGiftBasketItem } from '#storefront-promotions/utils'

/**
 * Composable for extracting relevant data from a basket item.
 *
 * @param item The basket item to extract data from
 * @returns An object containing the extracted data: isFreeGift, price, and isSoldOut
 */
export function useBasketItem(item: MaybeRefOrGetter<BasketItem>) {
  const basketItem = toRef(item)

  const isSoldOut = computed(() => basketItem.value.status !== 'available')

  const isFreeGift = computed(() => !!isFreeGiftBasketItem(basketItem.value))

  const price = computed(() => {
    return basketItem.value.price.total
  })

  return { isFreeGift, price, isSoldOut }
}
