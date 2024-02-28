<template>
  <div
    v-if="!areGiftConditionsMet"
    class="flex items-center justify-between rounded-md px-4 py-2 text-white"
    :style="giftBackgroundColorStyle"
  >
    <Headline size="xs" is-bold>{{ label }}</Headline>
    <PromotionCountdown
      v-if="giftPromotion"
      :until="giftPromotion.schedule.to"
      borderless
    />
  </div>
</template>

<script setup lang="ts">
import type { BasketItem } from '@scayle/storefront-nuxt'

const props = defineProps<{ basketItem: BasketItem }>()

const basketItem = computed(() => props.basketItem)

const {
  giftPromotion,
  giftBackgroundColorStyle,
  movLeft,
  quantityLeftForGiftConditions: quantityLeft,
  areGiftConditionsMet,
} = await useBasketItemPromotion(basketItem)

const { label } = usePromotionConditionBanner(movLeft, quantityLeft)
</script>
