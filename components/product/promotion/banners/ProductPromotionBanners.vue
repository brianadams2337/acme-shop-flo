<template>
  <component :is="divOrTransition" class="w-full">
    <PromotionHurryToSaveBanners
      v-if="areHurryToSaveBannersShown"
      :product="product"
      class="mt-2 w-full xs:hidden md:flex"
    />
    <ProductPromotionDefaultBanners
      v-else
      :product="product"
      class="mt-2 xs:hidden md:flex"
    />
  </component>
</template>

<script setup lang="ts">
import { useMounted } from '@vueuse/core'
import { computed } from 'vue'
import type { Product } from '@scayle/storefront-nuxt'
import { useProductPromotions } from '~/composables'
import { SFFadeInTransition } from '#components'

const props = defineProps<{ product: Product }>()

const { areHurryToSaveBannersShown } = useProductPromotions(props.product)

const isMounted = useMounted()
const divOrTransition = computed(() => {
  return !isMounted.value ? 'div' : SFFadeInTransition
})
</script>
