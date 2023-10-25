<template>
  <div class="flex items-center text-white">
    <h1 class="mr-1" :class="{ 'flex flex-col': isColumn }">
      <span
        class="mr-2 font-bold uppercase"
        :class="size !== 'sm' ? 'text-lg' : 'text-sm'">
        {{ headline.offerText }}
      </span>
      <span
        class="text-base font-semibold"
        :class="size !== 'sm' ? 'text-md' : 'text-xs'">
        {{ headline.conditionText }}
      </span>
    </h1>
    <IconInfoOutline v-if="showInfoIcon" class="h-5 w-5" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  headlineChunks: {
    type: Array as PropType<unknown>,
    required: true,
  },
  showInfoIcon: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<'base' | 'sm'>,
    default: 'base',
  },
  isColumn: {
    type: Boolean,
    default: false,
  },
})

const headline = computed(() => {
  const [offerText, conditionText] = props.headlineChunks as string[]
  return { offerText, conditionText }
})
</script>
