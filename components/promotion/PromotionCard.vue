<template>
  <component
    :is="componentName"
    v-bind="attributes"
    :style="backgroundColor && { backgroundColor }"
  >
    <slot v-bind="{ headlineParts, scheduledTo, customData, categoryLink }" />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SFLink } from '#components'

const props = defineProps<{ promotion: Promotion; backgroundColor?: string }>()

const customData = computed(() => props.promotion.customData)
const headlineParts = computed(() => customData?.value.headlineParts)
const scheduledTo = computed(() => props.promotion.schedule.to)

const categoryLink = computed(() => customData.value.category?.to)
const componentName = computed(() => (categoryLink.value ? SFLink : 'div'))

const attributes = computed(() => ({
  ...(categoryLink.value && { raw: true, to: categoryLink.value }),
}))
</script>
