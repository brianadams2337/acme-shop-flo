<template>
  <div class="flex w-80 items-center justify-center">
    <ProgressBar
      :progress="progress"
      rounded
      type="neutral"
      background-color="bg-white/20" />
    <span class="ml-3 w-24 font-semibold">
      {{ $t('promotion.progress_left', { amount: '120$' }) }}
    </span>
  </div>
</template>

<script setup lang="ts">
// const props = defineProps({
//   progress: {
//     type: Number,
//     required: true,
//   },
// })
const progress = computed(() => 20)
</script>
