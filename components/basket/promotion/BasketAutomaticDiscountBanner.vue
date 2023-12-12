<template>
  <div
    v-if="hasFailedConditions"
    class="flex justify-between rounded-md px-4 py-2 text-white"
    :style="backgroundColorStyle"
  >
    <PromotionHeadline
      v-if="headlineParts"
      :headline-parts="headlineParts"
      size="sm"
    />
    <PromotionCountdown
      v-if="promotion"
      :until="promotion.schedule.to"
      borderless
    />
  </div>
</template>

<script setup lang="ts">
import { type BasketItem } from '@scayle/storefront-nuxt'

const props = defineProps<{ basketItem: BasketItem }>()

const basketItem = computed(() => props.basketItem)

const { promotion, backgroundColorStyle, hasFailedConditions, headlineParts } =
  await useBasketItemPromotion(basketItem)
</script>
