<template>
  <div
    class="h-fit w-fit rounded-md bg-blue p-1 px-2 text-xs font-semibold text-white"
    :style="backgroundColorStyle"
  >
    {{ label }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ productPromotionId: number; label: string }>()

const promotionData = await useCurrentPromotions()

const backgroundColorStyle = computed(() => {
  const promotions = promotionData.data.value.entities
  const promotion = promotions.find((it) => {
    return it.customData.productPromotionId === props.productPromotionId
  })
  return getBackgroundColorStyle(promotion.customData.colorHex)
})
</script>
