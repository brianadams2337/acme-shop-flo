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

const { t } = useI18n()
const { formatCurrency } = useFormatHelpers()

const {
  buyXGetYPromotion: promotion,
  quantityLeftForGiftConditions: quantityLeft,
  movLeft,
} = await useProductPromotions(props.product)

const label = computed(() => {
  const cost = formatCurrency(movLeft.value)

  const quantityLabel = t('basket.promotion.quantity_left', {
    quantityLeft: quantityLeft.value,
  })
  const movLabel = t('basket.promotion.mov', { cost })
  const quantityAndCostLabels = t('basket.promotion.quantity_and_mov', {
    quantityLeft: quantityLeft.value,
    cost,
  })

  if (movLeft.value && quantityLeft.value) {
    return quantityAndCostLabels
  }

  return movLeft.value ? movLabel : quantityLabel
})
</script>
