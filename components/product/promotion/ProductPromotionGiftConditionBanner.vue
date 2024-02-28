<template>
  <div
    class="flex items-center justify-between rounded-md px-4 py-2 text-white"
    :style="getBackgroundColorStyle(promotion?.customData.colorHex)"
  >
    <Headline size="xs" is-bold>{{ label }}</Headline>
    <PromotionCountdown
      v-if="promotion"
      :until="promotion.schedule.to"
      borderless
    />
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@scayle/storefront-nuxt'

const props = defineProps<{ product: Product }>()

const {
  buyXGetYPromotion: promotion,
  quantityLeftForGiftConditions: quantityLeft,
  movLeft,
} = await useProductPromotions(props.product)

const { label } = usePromotionConditionBanner(movLeft, quantityLeft)
</script>
