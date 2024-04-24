<template>
  <PromotionMobileList v-if="isPromotionListShown" :items="promotions" />
  <div
    v-else
    class="fixed bottom-0 z-[80] flex max-h-32 w-full cursor-pointer flex-col items-center justify-start overflow-hidden rounded-t-xl bg-blue p-4 text-sm text-white lg:hidden"
    :style="backgroundColorStyle"
    @click="togglePromotionList()"
  >
    <div
      class="flex w-full items-center justify-between gap-1"
      :class="minOrderValue && 'mb-2.5'"
    >
      <div class="text-balance">
        <PromotionFullProgressLabel v-if="isFullProgress" is-small />
        <AutomaticDiscountMobileHeadline
          v-else-if="minOrderValue"
          class="mr-2"
        />
        <PromotionHeadline
          v-else-if="headlineParts"
          :headline-parts="headlineParts"
          size="xs"
          class="mr-4 flex-1"
        />
      </div>
      <div class="flex w-min flex-col items-start justify-stretch gap-y-2">
        <PromotionCountdown
          v-if="expirationDate"
          :until="expirationDate"
          class="self-stretch"
        />
        <ShowDealsButton
          v-if="showDealsButtonVisible"
          :category="category"
          class="self-stretch text-balance"
        />
      </div>
    </div>
    <PromotionProgress
      v-if="minOrderValue"
      v-bind="{ minOrderValue, currentPromotion }"
      is-full-width
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  promotions: Promotion[]
  showDealsButtonVisible?: boolean
  category?: {
    ctaLabel: string
    to: string
  }
}>()

const { isFullProgress } = await usePromotionProgress()

const {
  headlineParts,
  minOrderValue,
  currentPromotion,
  backgroundColorStyle,
  expirationDate,
} = useCurrentPromotion()

const { togglePromotionList, isPromotionListShown } = usePromotionActions()
</script>
