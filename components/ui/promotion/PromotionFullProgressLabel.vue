<template>
  <p class="font-medium">
    🎉
    {{ $t('promotion.full_progress_message.first_part') }}
    <span class="font-bold">
      {{
        $t('promotion.full_progress_message.middle_part', {
          amount: formattedAmount,
        })
      }}
    </span>
    {{ $t('promotion.full_progress_message.last_part') }}
  </p>
</template>

<script setup lang="ts">
const props = defineProps({
  currentPromotion: {
    type: Object as PropType<Promotion>,
    required: true,
  },
})

const { formattedAmount } = await usePromotionProgress(props.currentPromotion)
</script>
