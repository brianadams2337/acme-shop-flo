<template>
  <div class="flex flex-col">
    <span class="mr-2 text-xs font-bold uppercase">
      {{ headline.offerText }}</span
    >
    <p
      class="font-medium"
      :class="{ 'text-xs leading-4': isSmall || !isMOVPromotionApplied }"
    >
      <template v-if="isMOVPromotionApplied">
        🎉
        {{
          $t('promotion.full_progress_message', { amount: formattedDiscount })
        }}
      </template>
      <template v-else>
        {{ $t('promotion.cart_reached', { discount: automaticDiscount }) }}
      </template>
    </p>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ isSmall?: boolean }>(), { isSmall: false })

const { formattedDiscount, isMOVPromotionApplied } =
  await usePromotionProgress()

const { automaticDiscount, headlineParts } = useCurrentPromotion()

const headline = computed(() => {
  const [offerText, conditionText] = headlineParts.value ?? []
  return { offerText, conditionText }
})
</script>
