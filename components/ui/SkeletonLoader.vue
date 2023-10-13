<template>
  <div class="animate-pulse bg-gray-200" :class="classes" />
</template>

<script setup lang="ts">
import { SkeletonType } from '#imports'

const props = defineProps({
  type: {
    type: String as PropType<SkeletonType>,
    default: SkeletonType.BUTTON,
    validator: (val: SkeletonType) => Object.values(SkeletonType).includes(val),
  },
  fullWidth: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
})

const isButton = computed(() => props.type === SkeletonType.BUTTON)
const isHeadline = computed(() => props.type === SkeletonType.HEADLINE)

const classes = computed(() => ({
  'h-12 rounded-md': isButton.value,
  'h-8': isHeadline.value,
  'w-32 md:w-64': !props.fullWidth && (isHeadline.value || isButton.value),
  'md:w-64': !props.fullWidth && isHeadline.value,
  'w-full': props.fullWidth,
}))
</script>
