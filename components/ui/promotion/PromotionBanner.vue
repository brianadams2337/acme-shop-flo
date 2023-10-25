<template>
  <div
    class="sticky top-0 z-[80] flex h-[3.25rem] cursor-pointer items-center justify-between gap-1 overflow-hidden bg-blue py-2 pl-4 text-sm text-white"
    @click="togglePromotionList()">
    <PromotionCountdown :until="firstPromotion.schedule.to" />
    <PromotionHeadline
      v-if="firstPromotion.customData.headlineChunks"
      :headline-chunks="firstPromotion.customData.headlineChunks"
      is-all-uppercased
      show-info-icon />
    <div class="mr-32 flex h-full">
      <PromotionProgressBar
        v-if="firstPromotion.customData.minOrderValue"
        :min-order-value="+firstPromotion.customData.minOrderValue" />
      <ShowDealsButton v-else />
    </div>
    <MyDealsButton class="absolute right-0 top-0 ml-2" />
  </div>
  <PromotionList :items="promotions" />
</template>

<script setup lang="ts">
import { Promotion } from '@scayle/storefront-nuxt'

const props = defineProps({
  promotions: {
    type: Object as PropType<Promotion[]>,
    required: true,
  },
})

const { togglePromotionList } = usePromotionActions()

const firstPromotion = computed(() => props.promotions[2])
</script>
