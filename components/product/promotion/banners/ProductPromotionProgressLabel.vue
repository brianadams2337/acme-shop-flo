<template>
  <div v-if="minOrderAmount" class="flex flex-col items-start w-full">
    <SFProgressBar
      class="mb-2 mt-3"
      :progress="progress"
      rounded
      slanted
      type="neutral"
      background-color="bg-white/20"
    />
    <p class="text-center font-semibold text-xs w-full">
      <template v-if="!isFullProgress">
        {{ $t('promotion.progress_left', { amount: amountLeft }) }}
      </template>
      <template v-else>
        🎉
        <template
          v-if="
            isMOVPromotionApplied &&
            ((isBuyXGetY && areGiftConditionsMet) || isAutomaticDiscount)
          "
        >
          {{
            $t('pdp.promotion.full_progress_message', {
              amount: formattedDiscount,
            })
          }}
        </template>
        <template v-else-if="isAutomaticDiscount">
          {{
            $t('pdp.promotion.cart_reached', { discount: automaticDiscount })
          }}
        </template>
        <template v-else-if="isBuyXGetY">
          {{
            $t(
              isGiftAddedToBasket
                ? 'pdp.promotion.cart_reached_for_gifts'
                : 'pdp.promotion.add_free_gift_when_cart_reached',
            )
          }}
        </template>
      </template>
    </p>
  </div>
</template>

<script setup lang="ts">
type Props = {
  promotion: Promotion
  isGiftAddedToBasket?: boolean
  areGiftConditionsMet?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isGiftAddedToBasket: false,
  areGiftConditionsMet: false,
})

const promotion = computed(() => props.promotion)

const {
  progress,
  minOrderAmount,
  isMOVPromotionApplied,
  formattedDiscount,
  isFullProgress,
  formattedAmountLeft: amountLeft,
} = await usePromotionProgress(promotion)

const isAutomaticDiscount = computed(() =>
  isAutomaticDiscountType(props.promotion),
)

const isBuyXGetY = computed(() => isBuyXGetYType(props.promotion))

const automaticDiscount = computed(() => {
  return getAdditionalData(props.promotion)?.value
})
</script>
