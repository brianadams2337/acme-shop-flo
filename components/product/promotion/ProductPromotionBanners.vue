<template>
  <div class="flex w-full flex-col">
    <template
      v-for="{ id, customData, schedule, priority } in applicablePromotions"
      :key="id"
    >
      <component
        :is="getComponentName(customData)"
        v-bind="getAttributes(customData)"
      >
        <PromotionItemContent
          :key="id"
          v-bind="{ customData, schedule }"
          :is-priority-badge-shown="isHighestPriority(priority)"
          class="mb-2 w-full"
        />
      </component>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@scayle/storefront-nuxt'

const props = defineProps<{ product: Product }>()

const { applicablePromotions, isHighestPriority } = await useProductPromotions(
  props.product,
)

const getComponentName = ({ category }: Promotion['customData']) => {
  return category?.to ? resolveComponent('DefaultLink') : 'div'
}

const getAttributes = ({ category }: Promotion['customData']) => ({
  ...(category?.to && { raw: true, to: category?.to }),
})
</script>
