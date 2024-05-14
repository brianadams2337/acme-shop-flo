<template>
  <SFColorChip
    v-if="colorCode"
    :key="`color-picker-color-${color.value}`"
    :data-color-id="color.id"
    v-bind="{ colorCode, size, isActive, rounded }"
  />
</template>

<script setup lang="ts">
import type { ProductColor } from '@scayle/storefront-nuxt'
import { Size, ColorChipRoundedType } from '#storefront-ui'

type Props = {
  color: ProductColor
  size?: Size
  isActive?: boolean
  rounded?: ColorChipRoundedType
}

const props = withDefaults(defineProps<Props>(), {
  size: Size.MD,
  isActive: false,
  rounded: ColorChipRoundedType.DEFAULT,
})

const colorCode = computed<ProductColorCode | undefined>(() => {
  return getColorCodeById(props.color.id)
})
</script>
