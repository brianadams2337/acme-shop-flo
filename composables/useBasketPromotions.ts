import { PromotionEffectType } from '@scayle/storefront-nuxt'

export default async () => {
  const basket = await useBasket()

  const appliedPromotions = computed(() => {
    return basket.items.value
      .filter((it) => it.promotion?.isValid)
      .map((it) => it.promotion) as Promotion[]
  })

  const buyXGetYPromotions = computed(() => {
    return appliedPromotions.value.filter((it) => {
      return it.effect.type === PromotionEffectType.BUY_X_GET_Y
    })
  })

  const automaticDiscountPromotions = computed(() => {
    return appliedPromotions.value.filter((it) => {
      return it.effect.type === PromotionEffectType.AUTOMATIC_DISCOUNT
    })
  })

  return {
    appliedPromotions,
    buyXGetYPromotions,
    automaticDiscountPromotions,
  }
}
