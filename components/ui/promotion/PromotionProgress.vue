<template>
  <div
    class="flex items-center justify-center"
    :class="isFullWidth ? 'w-full !justify-start' : 'w-[19.5rem]'">
    <template v-if="!isFullProgress || isLessThan('md')">
      <ProgressBar
        :progress="progress"
        rounded
        slanted
        type="neutral"
        :full-width="isFullWidth"
        :class="!isFullWidth && '!max-w-[12.5rem]'"
        background-color="bg-white/20" />
      <span v-if="isGreaterOrEquals('md')" class="ml-2 w-28 font-semibold">
        {{ $t('promotion.progress_left', { amount: formattedAmount }) }}
      </span>
    </template>
    <PromotionFullProgressLabel
      v-if="isFullProgress && isGreaterOrEquals('md')"
      v-bind="{ minOrderValue, currentPromotion }" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  minOrderValue: {
    type: Number,
    required: true,
  },
  isFullWidth: {
    type: Boolean,
    default: false,
  },
  currentPromotion: {
    type: Object as PropType<Promotion>,
    required: true,
  },
})

const { isGreaterOrEquals, isLessThan } = useViewport()

const { progress, isFullProgress, formattedAmount } =
  await usePromotionProgress(props.currentPromotion)
</script>
